"use client";

import { Copy, Grid2X2, List, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories, Category } from "@/lib/sample-data";
import { useFlashcards } from "@/store/use-flashcards";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const filteredCards = useFlashcards((state) => state.filteredCards);
  const toggleFavorite = useFlashcards((state) => state.toggleFavorite);
  const duplicateCard = useFlashcards((state) => state.duplicateCard);
  const deleteCard = useFlashcards((state) => state.deleteCard);
  const cards = useMemo(() => filteredCards(query, category), [filteredCards, query, category]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold">Flashcard Library</h1>
            <p className="mt-2 text-sm text-muted-foreground">Search, filter, duplicate, favorite, and organize every card.</p>
          </div>
          <div className="flex gap-2">
            <Button variant={view === "grid" ? "primary" : "secondary"} size="icon" aria-label="Grid view" onClick={() => setView("grid")}><Grid2X2 size={17} /></Button>
            <Button variant={view === "list" ? "primary" : "secondary"} size="icon" aria-label="List view" onClick={() => setView("list")}><List size={17} /></Button>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="relative"><Search className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={17} /><Input className="pl-10" placeholder="Search cards instantly" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          <select className="h-11 rounded-md border border-border bg-card px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value as Category | "All")}>
            <option>All</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <section className={view === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}>
          {cards.map((card) => (
            <Card key={card.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">{card.category}</span>
                    <h2 className="mt-4 text-lg font-semibold">{card.question}</h2>
                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{card.answer}</p>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Favorite" onClick={() => toggleFavorite(card.id)}><Star className={card.favorite ? "fill-accent text-accent" : ""} size={18} /></Button>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{card.studied} reviews · {card.difficulty}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" aria-label="Duplicate" onClick={() => duplicateCard(card.id)}><Copy size={17} /></Button>
                    <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => deleteCard(card.id)}><Trash2 size={17} /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
