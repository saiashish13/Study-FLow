"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { FlashcardPlayer } from "@/components/flashcard-player";
import { Button } from "@/components/ui/button";
import { useFlashcards } from "@/store/use-flashcards";

export default function StudyPage() {
  const [mode, setMode] = useState<"standard" | "quiz" | "review">("standard");
  const cards = useFlashcards((state) => state.cards);
  const results = useFlashcards((state) => state.results);
  const incorrectIds = useMemo(
    () => new Set(results.filter((result) => !result.correct).map((result) => result.cardId)),
    [results]
  );
  const activeCards = useMemo(
    () => (mode === "review" ? cards.filter((card) => incorrectIds.has(card.id)) : cards),
    [cards, incorrectIds, mode]
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold">Study Session</h1>
            <p className="mt-2 text-sm text-muted-foreground">Standard, quiz, and review modes in one focused flow.</p>
          </div>
          <div className="flex rounded-md border border-border bg-card p-1">
            {(["standard", "quiz", "review"] as const).map((item) => (
              <Button key={item} variant={mode === item ? "primary" : "ghost"} size="sm" onClick={() => setMode(item)}>{item}</Button>
            ))}
          </div>
        </div>
        <FlashcardPlayer key={mode} cards={activeCards} mode={mode} />
      </div>
    </AppShell>
  );
}
