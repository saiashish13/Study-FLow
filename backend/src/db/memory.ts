import { randomUUID } from "crypto";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
};

export type StoredFlashcard = {
  id: string;
  user_id: string;
  category_id: string | null;
  question: string;
  answer: string;
  difficulty: string;
  favorite: boolean;
  created_at: string;
  updated_at: string | null;
};

export const memoryUsers: StoredUser[] = [];
export const memoryFlashcards: StoredFlashcard[] = [];

export function createMemoryFlashcard(data: {
  user_id: string;
  category_id?: string | null;
  question: string;
  answer: string;
  difficulty?: string;
}) {
  return {
    id: randomUUID(),
    user_id: data.user_id,
    category_id: data.category_id ?? null,
    question: data.question,
    answer: data.answer,
    difficulty: data.difficulty ?? "Medium",
    favorite: false,
    created_at: new Date().toISOString(),
    updated_at: null
  };
}
