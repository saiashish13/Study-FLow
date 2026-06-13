"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chrome, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!email.trim()) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      setLoading(false);
      return;
    }

    if (tab === "register" && !name.trim()) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = tab === "register" ? "/auth/register" : "/auth/login";
      const body = tab === "register" ? { name, email, password } : { email, password };
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Authentication failed.");
      }

      localStorage.setItem("studyflow_token", data.token);
      localStorage.setItem("studyflow_user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          setError("Unable to contact authentication server. Make sure backend is running on http://localhost:4000.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${apiBase}/auth/google`;
  };

  return (
    <main className="grid min-h-screen bg-background text-foreground lg:grid-cols-[1fr_520px]">
      <section className="hidden rounded-[2rem] border border-border bg-card/80 p-10 shadow-soft backdrop-blur-lg lg:flex lg:flex-col lg:justify-between">
        <div>
          <Sparkles size={42} />
          <h1 className="mt-8 text-5xl font-semibold">StudyFlow</h1>
          <p className="mt-4 max-w-lg text-lg leading-8 text-muted-foreground">Safe, stylish authentication for focused decks. Sign in to continue your study streak and keep your flashcards synced.</p>
        </div>
        <div className="mt-10 space-y-4 rounded-3xl bg-background/90 p-6 shadow-soft">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              <li>• Fast login with Google or email</li>
              <li>• Quick deck creation and review</li>
              <li>• Progress tracking across sessions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-3">
            <div>
              <CardTitle>{tab === "login" ? "Welcome back" : "Create account"}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">Use your account or Google to sign in quickly.</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1">
              {(["login", "register"] as const).map((item) => (
                <Button
                  key={item}
                  variant={tab === item ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setTab(item);
                    setError(null);
                    setMessage(null);
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {tab === "register" && (
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              )}
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />

              {error && <p className="text-sm text-red-500">{error}</p>}
              {message && <p className="text-sm text-green-500">{message}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Please wait…" : tab === "register" ? "Register" : "Login"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <p className="relative mx-auto w-fit bg-card px-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">or</p>
            </div>

            <Button type="button" variant="secondary" className="w-full" onClick={handleGoogleSignIn}>
              <Chrome size={17} /> Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/auth" className="text-primary">Use email login</Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
