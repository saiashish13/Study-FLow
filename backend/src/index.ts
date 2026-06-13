import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { authRouter } from "./routes/auth";
import { flashcardsRouter } from "./routes/flashcards";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

const frontendOrigin = process.env.FRONTEND_URL ?? "http://localhost:3000";
const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? true : frontendOrigin
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/auth", authRouter);
app.use("/flashcards", flashcardsRouter);

app.listen(port, () => {
  console.log(`StudyFlow API listening on ${port}`);
});
