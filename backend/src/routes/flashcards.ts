import { Router } from "express";
import { randomUUID } from "crypto";
import { pool } from "../db/pool";
import { memoryFlashcards, createMemoryFlashcard } from "../db/memory";
import { AuthRequest, requireAuth } from "../middleware/auth";

export const flashcardsRouter = Router();

flashcardsRouter.use(requireAuth);

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

flashcardsRouter.get("/", async (req: AuthRequest, res) => {
  const result = await safeDbQuery<any>(
    "select * from flashcards where user_id = $1 order by created_at desc",
    [req.user?.id]
  );

  if (result) {
    return res.json(result.rows);
  }

  return res.json(memoryFlashcards.filter((card) => card.user_id === req.user?.id));
});

flashcardsRouter.post("/", async (req: AuthRequest, res) => {
  const { question, answer, categoryId, difficulty } = req.body;
  const id = randomUUID();
  const result = await safeDbQuery<any>(
    "insert into flashcards (id, user_id, category_id, question, answer, difficulty) values ($1, $2, $3, $4, $5, $6) returning *",
    [id, req.user?.id, categoryId, question, answer, difficulty ?? "Medium"]
  );

  if (result) {
    return res.status(201).json(result.rows[0]);
  }

  const flashcard = createMemoryFlashcard({
    user_id: req.user?.id ?? "",
    category_id: categoryId,
    question,
    answer,
    difficulty
  });

  memoryFlashcards.unshift(flashcard);
  return res.status(201).json(flashcard);
});

flashcardsRouter.patch("/:id", async (req: AuthRequest, res) => {
  const { question, answer, favorite, difficulty } = req.body;
  const result = await safeDbQuery<any>(
    "update flashcards set question = coalesce($1, question), answer = coalesce($2, answer), favorite = coalesce($3, favorite), difficulty = coalesce($4, difficulty), updated_at = now() where id = $5 and user_id = $6 returning *",
    [question, answer, favorite, difficulty, req.params.id, req.user?.id]
  );

  if (result) {
    return res.json(result.rows[0]);
  }

  const flashcard = memoryFlashcards.find((card) => card.id === req.params.id && card.user_id === req.user?.id);
  if (!flashcard) {
    return res.status(404).json({ error: "Flashcard not found." });
  }

  if (question !== undefined) flashcard.question = question;
  if (answer !== undefined) flashcard.answer = answer;
  if (favorite !== undefined) flashcard.favorite = favorite;
  if (difficulty !== undefined) flashcard.difficulty = difficulty;
  flashcard.updated_at = new Date().toISOString();

  return res.json(flashcard);
});

flashcardsRouter.delete("/:id", async (req: AuthRequest, res) => {
  const result = await safeDbQuery<any>("delete from flashcards where id = $1 and user_id = $2", [req.params.id, req.user?.id]);

  if (result) {
    return res.status(204).send();
  }

  const index = memoryFlashcards.findIndex((card) => card.id === req.params.id && card.user_id === req.user?.id);
  if (index >= 0) {
    memoryFlashcards.splice(index, 1);
  }

  return res.status(204).send();
});
