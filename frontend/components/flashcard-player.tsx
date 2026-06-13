"use client";

import { ArrowLeft, ArrowRight, Check, RotateCcw, Shuffle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flashcard } from "@/lib/sample-data";
import { cn } from "@/lib/utils";
import { useFlashcards } from "@/store/use-flashcards";

export function FlashcardPlayer({ cards, mode = "standard" }: { cards: Flashcard[]; mode?: "standard" | "quiz" | "review" }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState(cards);
  const recordResult = useFlashcards((state) => state.recordResult);

  const active = deck[index] ?? cards[0];
  const progress = useMemo(() => ((index + 1) / Math.max(deck.length, 1)) * 100, [index, deck.length]);

  useEffect(() => {
    if (cards !== deck) {
      setDeck(cards);
      setIndex(0);
      setFlipped(false);
    }
  }, [cards]);

  function move(nextIndex: number) {
    setFlipped(false);
    setIndex(Math.min(Math.max(nextIndex, 0), deck.length - 1));
  }

  function shuffle() {
    setDeck((current) => [...current].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
  }

  if (!active) {
    return <Card className="p-8 text-center text-muted-foreground">No cards available for this mode.</Card>;
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Card {index + 1} of {deck.length}</p>
          <p className="text-xs text-muted-foreground">{active.category} deck</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" aria-label="Shuffle cards" onClick={shuffle}>
            <Shuffle size={17} />
          </Button>
          <Button variant="secondary" size="icon" aria-label="Restart deck" onClick={() => move(0)}>
            <RotateCcw size={17} />
          </Button>
          <select
            aria-label="Jump to card"
            className="h-10 rounded-md border border-border bg-card px-3 text-sm"
            value={index}
            onChange={(event) => move(Number(event.target.value))}
          >
            {deck.map((card, cardIndex) => (
              <option key={card.id} value={cardIndex}>Card {cardIndex + 1}</option>
            ))}
          </select>
        </div>
      </div>
      <Progress value={progress} />
      <div className="flip-scene min-h-[360px]">
        <button
          className="flip-card relative h-[360px] w-full rounded-lg text-left transition-transform duration-700"
          data-flipped={flipped}
          onClick={() => setFlipped((value) => !value)}
          aria-label="Flip flashcard"
        >
          <Card className="flip-face absolute inset-0 flex flex-col justify-between overflow-hidden p-7">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Question</span>
              <span className="text-xs text-muted-foreground">{active.difficulty}</span>
            </div>
            <h2 className="max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">{active.question}</h2>
            <p className="text-sm text-muted-foreground">Tap or use Show Answer</p>
          </Card>
          <Card className="flip-face flip-back absolute inset-0 flex flex-col justify-between overflow-hidden border-primary/30 bg-primary p-7 text-background">
            <span className="w-fit rounded-full bg-background/15 px-3 py-1 text-xs font-medium">Answer</span>
            <p className="max-w-3xl text-xl leading-relaxed md:text-3xl">{active.answer}</p>
            <p className="text-sm text-background/75">Tap to return to question</p>
          </Card>
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" onClick={() => move(index - 1)} disabled={index === 0}>
          <ArrowLeft size={17} /> Previous
        </Button>
        <div className={cn("flex gap-2", mode === "standard" && "hidden")}>
          <Button variant="secondary" onClick={() => { recordResult(active.id, false); move(index + 1); }}>
            <X size={17} /> Incorrect
          </Button>
          <Button onClick={() => { recordResult(active.id, true); move(index + 1); }}>
            <Check size={17} /> Correct
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setFlipped(true)}>Show Answer</Button>
          <Button onClick={() => move(index + 1)} disabled={index === deck.length - 1}>
            Next <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    </section>
  );
}
