import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { pool } from "../db/pool";
import { memoryUsers } from "../db/memory";

dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4000";
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI ?? `${backendUrl}/auth/google/callback`;

async function safeDbQuery<T>(text: string, params: any[]) {
  if (!pool) return null;

  try {
    return await pool.query<T>(text, params);
  } catch (err: any) {
    if (err?.code === "ECONNREFUSED" || err?.code === "57P01" || err?.code === "ENOTFOUND") {
      return null;
    }
    throw err;
  }
}

function findMemoryUser(email: string) {
  return memoryUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function getUserByEmail(email: string) {
  const result = await safeDbQuery<{ id: string; name: string; email: string; password_hash: string }>(
    "select id, name, email, password_hash from users where lower(email) = lower($1)",
    [email]
  );

  if (result) {
    return result.rows[0];
  }

  return findMemoryUser(email);
}

export async function createUser(name: string, email: string, passwordHash: string) {
  const result = await safeDbQuery<{ id: string; name: string; email: string }>(
    "insert into users (id, name, email, password_hash) values ($1, $2, $3, $4) returning id, name, email",
    [randomUUID(), name, email, passwordHash]
  );

  if (result) {
    return result.rows[0];
  }

  const user = { id: randomUUID(), name, email, password_hash: passwordHash };
  memoryUsers.push(user);
  return { id: user.id, name: user.name, email: user.email };
}

function decodeGoogleIdToken(idToken: string) {
  const decoded = jwt.decode(idToken) as Record<string, any> | null;
  if (!decoded || typeof decoded !== "object") return null;

  const email = decoded.email;
  const name = decoded.name;
  const emailVerified = decoded.email_verified === true || decoded.email_verified === "true";

  if (!email || !emailVerified) return null;
  return { email: String(email), name: String(name ?? email.split("@")[0]) };
}

async function exchangeGoogleCode(code: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: googleClientId ?? "",
      client_secret: googleClientSecret ?? "",
      code,
      grant_type: "authorization_code",
      redirect_uri: googleRedirectUri
    })
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export const authRouter = Router();

authRouter.get("/google-config", (_req, res) => {
  res.json({
    googleClientId: !!googleClientId,
    googleClientSecret: !!googleClientSecret,
    backendUrl,
    frontendUrl,
    googleRedirectUri,
    debugClientId: googleClientId ?? null
  });
});

authRouter.get("/google", (req, res) => {
  if (!googleClientId || !googleClientSecret) {
    return res.status(500).json({ error: "Google OAuth is not configured on the server." });
  }

  const params = new URLSearchParams({
    client_id: googleClientId,
    redirect_uri: googleRedirectUri,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
    access_type: "offline"
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  console.log("Google OAuth request URL:", authUrl);
  console.log("Using redirect URI:", googleRedirectUri);

  res.redirect(authUrl);
});

authRouter.get("/google/callback", async (req, res) => {
  const code = String(req.query.code || "");
  if (!code) {
    return res.status(400).json({ error: "Missing authorization code." });
  }

  const tokenResponse = await exchangeGoogleCode(code);
  if (!tokenResponse || !tokenResponse.id_token) {
    return res.status(400).json({ error: "Unable to exchange Google authorization code." });
  }

  const googleProfile = decodeGoogleIdToken(tokenResponse.id_token);
  if (!googleProfile) {
    return res.status(400).json({ error: "Unable to verify Google account." });
  }

  let user = await getUserByEmail(googleProfile.email);
  if (!user) {
    const passwordHash = await bcrypt.hash(randomUUID(), 12);
    user = await createUser(googleProfile.name, googleProfile.email, passwordHash);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? "dev-secret", { expiresIn: "7d" });
  const userPayload = encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email }));

  res.redirect(`${frontendUrl}/auth/google-callback?token=${encodeURIComponent(token)}&user=${userPayload}`);
});

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: "Email already in use." });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await createUser(name, email, passwordHash);
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? "dev-secret", { expiresIn: "7d" });
  res.status(201).json({ user, token });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET ?? "dev-secret", { expiresIn: "7d" });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});
