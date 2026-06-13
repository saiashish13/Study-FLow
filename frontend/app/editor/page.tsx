"use client";

import { Eye, Save, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { categories, Category } from "@/lib/sample-data";
import { useFlashcards } from "@/store/use-flashcards";

export default function EditorPage() {
  const addCard = useFlashcards((state) => state.addCard);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState<Category>("Polity");

  function save(event: FormEvent) {
    event.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    addCard({ question, answer, category, favorite: false, difficulty: "Medium" });
    setQuestion("");
    setAnswer("");
  }

  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-8 lg:grid-cols-[1fr_420px]">
        <form onSubmit={save} className="space-y-5">
          <div>
            <h1 className="text-3xl font-semibold">Flashcard Editor</h1>
            <p className="mt-2 text-sm text-muted-foreground">Create polished cards with a live preview.</p>
          </div>
          <Card>
            <CardHeader><CardTitle>Card details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <label className="block text-sm font-medium">Question<Input className="mt-2" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="What do you want to remember?" /></label>
              <label className="block text-sm font-medium">Answer<Textarea className="mt-2" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Write a concise answer." /></label>
              <label className="block text-sm font-medium">Category
                <select className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value as Category)}>
                  {categories.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <div className="flex gap-2">
                <Button type="submit"><Save size={17} /> Save</Button>
                <Button type="button" variant="secondary"><Eye size={17} /> Preview</Button>
                <Button type="button" variant="ghost" onClick={() => { setQuestion(""); setAnswer(""); }}><Trash2 size={17} /> Clear</Button>
              </div>
            </CardContent>
          </Card>
        </form>
        <aside className="space-y-4">
          <Card className="min-h-[360px]">
            <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-background p-6">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{category}</span>
                <h2 className="mt-10 text-2xl font-semibold">{question || "Your question appears here"}</h2>
                <p className="mt-8 text-muted-foreground">{answer || "Your answer preview appears here."}</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
