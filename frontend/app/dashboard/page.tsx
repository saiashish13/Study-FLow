"use client";

import Link from "next/link";
import { 
  BarChart3, Clock, Flame, Library, Target, Timer, 
  Search, Filter, ChevronUp, ChevronDown, Plus, Sparkles, 
  Settings, CheckCircle, RefreshCw, Star, Copy, Trash2, ArrowUpRight,
  TrendingUp, Calendar, ChevronRight, Layers, FileText,
  Shield, Globe, BookOpen, Cpu, Landmark, Compass, Newspaper
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { AccuracyChart, TimeChart } from "@/components/charts";
import { MetricCard } from "@/components/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatMinutes } from "@/lib/utils";
import { useFlashcards } from "@/store/use-flashcards";
import { Category, categories } from "@/lib/sample-data";

export default function DashboardPage() {
  const cards = useFlashcards((state) => state.cards);
  const sessions = useFlashcards((state) => state.sessions);
  const minutes = useFlashcards((state) => state.minutes);
  const results = useFlashcards((state) => state.results);
  
  // Zustand mutations
  const toggleFavorite = useFlashcards((state) => state.toggleFavorite);
  const duplicateCard = useFlashcards((state) => state.duplicateCard);
  const deleteCard = useFlashcards((state) => state.deleteCard);
  const restartSession = useFlashcards((state) => state.restartSession);
  const initializeStore = useFlashcards((state) => state.initializeStore);
  const syncCurrentAffairs = useFlashcards((state) => state.syncCurrentAffairs);

  // States
  const [chartTab, setChartTab] = useState<"accuracy" | "time">("accuracy");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [tabFilter, setTabFilter] = useState<"all" | "favorites" | "hard" | "easy">("all");
  const [sortColumn, setSortColumn] = useState<"question" | "category" | "difficulty" | "studied">("question");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [syncing, setSyncing] = useState(false);

  // Initialize store from localStorage on mount (hydration-safe)
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  // Computed metrics
  const correct = useMemo(() => results.filter((result) => result.correct).length, [results]);
  const accuracy = useMemo(() => Math.round((correct / Math.max(results.length, 1)) * 100), [correct, results.length]);
  const reviewedThisSession = Math.min(cards.length, 10);
  const progressPct = cards.length === 0 ? 0 : Math.round((reviewedThisSession / Math.max(cards.length, 1)) * 100);

  // Sparkline data configurations for Metric Cards
  const totalCardsSparkline = useMemo(() => cards.map(c => c.studied), [cards]);
  const sessionsSparkline = [2, 4, 8, 5, 12, 9, 14];
  const accuracySparkline = [62, 70, 75, 72, 85, 82, accuracy];
  const timeSparkline = [20, 35, 42, 30, 50, 45, 60];

  // Deck category statistics helper
  const categoryStats = useMemo(() => {
    return categories.map(cat => {
      const catCards = cards.filter(c => c.category === cat);
      const reviewsCount = catCards.reduce((acc, c) => acc + c.studied, 0);
      return {
        name: cat,
        count: catCards.length,
        reviews: reviewsCount,
        mastery: catCards.length > 0 ? Math.round((catCards.filter(c => c.difficulty !== "Hard").length / catCards.length) * 100) : 0
      };
    });
  }, [cards]);

  // Sorting helper mapping
  const difficultyWeight = { Easy: 1, Medium: 2, Hard: 3 };

  // Filter & Sort flashcards list
  const filteredAndSortedCards = useMemo(() => {
    return cards
      .filter((card) => {
        const matchesCategory = categoryFilter === "All" || card.category === categoryFilter;
        
        const matchesTab = 
          tabFilter === "all" ? true :
          tabFilter === "favorites" ? card.favorite :
          tabFilter === "hard" ? card.difficulty === "Hard" :
          card.difficulty === "Easy";

        const matchesSearch = 
          card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.answer.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        let valA: any = a[sortColumn];
        let valB: any = b[sortColumn];

        if (sortColumn === "difficulty") {
          valA = difficultyWeight[a.difficulty];
          valB = difficultyWeight[b.difficulty];
        }

        if (typeof valA === "string") {
          return sortDirection === "asc" 
            ? valA.localeCompare(valB) 
            : valB.localeCompare(valA);
        } else {
          return sortDirection === "asc"
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
        }
      });
  }, [cards, searchQuery, categoryFilter, tabFilter, sortColumn, sortDirection]);

  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSyncNews = () => {
    setSyncing(true);
    setTimeout(() => {
      const added = syncCurrentAffairs();
      setSyncing(false);
      if (added) {
        alert("Success: Synced latest daily UPSC current affairs flashcard updates!");
      } else {
        alert("Info: All latest daily current affairs cards are already up to date.");
      }
    }, 1200);
  };

  const timelineLogs = [
    { text: "Reviewed Indian Polity Fundamental Rights", date: "Today, 4:10 PM", badge: "Polity" },
    { text: "Achieved 8-day daily target streak!", date: "Today, 11:30 AM", badge: "Achievement" },
    { text: "Mastered 4 new Economy terms (WPI, CPI, MPC)", date: "Yesterday, 3:45 PM", badge: "Economy" },
    { text: "Created custom 'Article 356' flashcard", date: "June 11, 2026", badge: "Editor" }
  ];

  return (
    <AppShell>
      <div className="space-y-8 py-2">
        {/* Sleek User Welcome Header */}
        <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/40 p-6 md:p-8 backdrop-blur-md shadow-glow transition-all duration-300">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.06),transparent_50%)]" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3.5 py-1 text-xs font-semibold text-accent backdrop-blur-sm shadow-glow animate-pulse">
                  <Flame size={13} className="text-accent fill-accent" /> Streak Focus Level Active
                </div>
                
                <button
                  onClick={handleSyncNews}
                  disabled={syncing}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/85 hover:bg-accent/10 hover:text-accent hover:border-accent/40 px-3.5 py-1 text-xs font-bold transition-all duration-300 shadow-sm disabled:opacity-60 active:scale-95"
                >
                  <RefreshCw size={11} className={syncing ? "animate-spin" : ""} />
                  {syncing ? "Syncing News..." : "Sync Daily Current Affairs"}
                </button>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl md:text-4.5xl font-extrabold tracking-tight">Your Group 1 Exam Engine.</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Consolidated memory recall loops for Polity, Economy, History, Geography, Science, and daily Current Affairs. Tailored for IAS and IPS aspirants.
                </p>
              </div>
            </div>

            {/* Micro Session Progress Box */}
            <div className="w-full md:w-80 rounded-2xl border border-border/30 bg-background/45 p-4 space-y-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground uppercase tracking-wider">Session Progress</span>
                <span className="text-accent bg-accent/15 px-2 py-0.5 rounded-full font-extrabold">
                  Streak: 8 Days
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted border border-border/10">
                  <div 
                    className="h-full rounded-full bg-accent transition-all duration-500 shadow-glow" 
                    style={{ width: `${progressPct}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-semibold pt-1">
                  <span>Reviewed: {reviewedThisSession} / {Math.max(reviewedThisSession, cards.length)}</span>
                  <span>Accuracy: {accuracy}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Metric Cards Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            label="Total Cards" 
            value={String(cards.length)} 
            hint="Active exam cards" 
            icon={Library}
            trend={{ value: "+10 cards today", isPositive: true }}
            sparkline={totalCardsSparkline}
          />
          <MetricCard 
            label="Daily Sessions" 
            value={String(sessions)} 
            hint="Recorded recall runs" 
            icon={BarChart3} 
            trend={{ value: "+8%", isPositive: true }}
            sparkline={sessionsSparkline}
          />
          <MetricCard 
            label="Global Accuracy" 
            value={`${accuracy}%`} 
            hint={`${correct} correct answers`} 
            icon={Target} 
            trend={{ value: "+3% vs Mon", isPositive: true }}
            sparkline={accuracySparkline}
          />
          <MetricCard 
            label="Practice Time" 
            value={formatMinutes(minutes)} 
            hint="Total active recall minutes" 
            icon={Clock} 
            trend={{ value: "+24m this wk", isPositive: true }}
            sparkline={timeSparkline}
          />
        </section>

        {/* Interactive Decks Selector Slider */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Select Decks</h3>
            <span className="text-[11px] font-semibold text-muted-foreground">Click card to filter table</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
            {/* All Cards Deck Card */}
            <div 
              onClick={() => setCategoryFilter("All")}
              className={`snap-start flex-shrink-0 w-44 rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                categoryFilter === "All" 
                  ? "border-accent bg-accent/5 shadow-glow" 
                  : "border-border/40 bg-card/25 hover:border-border/70 hover:bg-card/45"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="p-2.5 rounded-xl bg-accent/10 text-accent font-bold"><Layers size={16} /></span>
                <span className="text-xs font-extrabold text-foreground">{cards.length} Cards</span>
              </div>
              <h4 className="font-extrabold text-sm tracking-tight mt-6">All Subject Decks</h4>
              <p className="text-[10px] text-muted-foreground mt-1">Full library syllabus</p>
            </div>

            {/* Individual Deck Category Cards */}
            {categoryStats.map(stat => (
              <div 
                key={stat.name}
                onClick={() => setCategoryFilter(stat.name)}
                className={`snap-start flex-shrink-0 w-44 rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                  categoryFilter === stat.name 
                    ? "border-accent bg-accent/5 shadow-glow" 
                    : "border-border/40 bg-card/25 hover:border-border/70 hover:bg-card/45"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="p-2.5 rounded-xl bg-accent/10 text-accent font-bold">
                    {stat.name === "Polity" ? <Shield size={16} /> : 
                     stat.name === "Economy" ? <TrendingUp size={16} /> : 
                     stat.name === "History" ? <Landmark size={16} /> : 
                     stat.name === "Geography" ? <Compass size={16} /> : 
                     stat.name === "Science" ? <Cpu size={16} /> : <Newspaper size={16} />}
                  </span>
                  <span className="text-xs font-extrabold text-foreground">{stat.count} Cards</span>
                </div>
                <h4 className="font-extrabold text-sm tracking-tight mt-6">{stat.name}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">Mastery: {stat.mastery}%</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Column Dashboard Main Section */}
        <section className="grid lg:grid-cols-[1.8fr_1fr] gap-6">
          
          {/* Column 1: Performance Charts & Stripe Ledger Table */}
          <div className="space-y-6">
            
            {/* Performance charts card */}
            <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4 mb-2 px-6">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Performance Metrics
                </CardTitle>
                <div className="flex rounded-lg border border-border/60 bg-background/50 p-0.5 shadow-sm">
                  <button
                    onClick={() => setChartTab("accuracy")}
                    className={`px-3.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      chartTab === "accuracy" 
                        ? "bg-primary text-background" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Accuracy (%)
                  </button>
                  <button
                    onClick={() => setChartTab("time")}
                    className={`px-3.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      chartTab === "time" 
                        ? "bg-primary text-background" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Study time (m)
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-2 px-6">
                {chartTab === "accuracy" ? <AccuracyChart /> : <TimeChart />}
              </CardContent>
            </Card>

            {/* Flashcards Library Table Card */}
            <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
              <CardHeader className="space-y-4 pb-4 border-b border-border/30 px-6">
                
                {/* Section header title */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Syllabus Library
                  </CardTitle>
                  <span className="text-[10px] text-muted-foreground font-semibold px-2 py-0.5 bg-muted/50 border border-border/20 rounded-md">
                    Showing {filteredAndSortedCards.length} cards
                  </span>
                </div>
                
                {/* Search query box and Category select */}
                <div className="grid sm:grid-cols-[1fr_160px] gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-muted-foreground h-3.5 w-3.5 pointer-events-none" />
                    <Input 
                      className="pl-9 h-9 text-xs rounded-xl border border-border/40 bg-background/40 focus-visible:ring-accent/40 focus-visible:border-accent/40" 
                      placeholder="Search questions, answers, or categories..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative flex items-center">
                    <Filter className="absolute left-2.5 text-muted-foreground h-3.5 w-3.5 pointer-events-none" />
                    <select 
                      className="pl-8 h-9 w-full text-xs rounded-xl border border-border/40 bg-background/40 text-foreground outline-none cursor-pointer hover:bg-muted/10 focus:border-accent"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as Category | "All")}
                    >
                      <option value="All">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ledger Quick-Filter Tabs */}
                <div className="flex border-b border-border/20 gap-2 pb-1 text-xs">
                  {([
                    { id: "all", label: "All Cards" },
                    { id: "favorites", label: "Favorites ★" },
                    { id: "hard", label: "Needs Focus (Hard)" },
                    { id: "easy", label: "Easy Cards" }
                  ] as const).map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setTabFilter(tab.id)}
                      className={`pb-2 px-1 font-semibold transition-all relative ${
                        tabFilter === tab.id 
                          ? "text-accent border-b-2 border-accent" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </CardHeader>

              {/* Ledger Table Container */}
              <div className="overflow-x-auto">
                {filteredAndSortedCards.length === 0 ? (
                  <div className="p-10 text-center space-y-3.5">
                    {/* Visual SVG Empty State Illustration */}
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/5 text-accent border border-accent/10">
                      <Sparkles size={24} className="opacity-75" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">No flashcards match filters</p>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        Try resetting active search fields or click below to launch the editor and create a new study card.
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => { setSearchQuery(""); setCategoryFilter("All"); setTabFilter("all"); }}
                      className="text-xs border-border/60"
                    >
                      Reset active filters
                    </Button>
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border/20 text-muted-foreground font-bold bg-muted/10 select-none">
                        <th className="p-3.5 cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("question")}>
                          <div className="flex items-center gap-1.5">
                            Question Details
                            {sortColumn === "question" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                          </div>
                        </th>
                        <th className="p-3.5 cursor-pointer hover:text-foreground transition-colors w-28" onClick={() => handleSort("category")}>
                          <div className="flex items-center gap-1.5">
                            Category
                            {sortColumn === "category" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                          </div>
                        </th>
                        <th className="p-3.5 cursor-pointer hover:text-foreground transition-colors w-24" onClick={() => handleSort("difficulty")}>
                          <div className="flex items-center gap-1.5">
                            Difficulty
                            {sortColumn === "difficulty" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                          </div>
                        </th>
                        <th className="p-3.5 cursor-pointer hover:text-foreground transition-colors w-20" onClick={() => handleSort("studied")}>
                          <div className="flex items-center gap-1.5">
                            Reviews
                            {sortColumn === "studied" && (sortDirection === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                          </div>
                        </th>
                        <th className="p-3.5 text-right w-24">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/15">
                      {filteredAndSortedCards.map((card) => (
                        <tr key={card.id} className="hover:bg-muted/15 transition-colors group">
                          <td className="p-3.5 font-medium text-foreground max-w-xs md:max-w-md truncate">
                            <div className="flex items-center gap-2">
                              {card.isDaily && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-extrabold bg-accent/15 text-accent border border-accent/20 uppercase tracking-wide">
                                  Daily
                                </span>
                              )}
                              <span>{card.question}</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className="inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent border border-accent/10">
                              {card.category}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className={`inline-flex rounded px-1.5 py-0.5 text-[9px] font-bold ${
                              card.difficulty === "Easy" ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/10" :
                              card.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/10" :
                              "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10"
                            }`}>
                              {card.difficulty}
                            </span>
                          </td>
                          <td className="p-3.5 text-muted-foreground font-semibold">
                            {card.studied} review{card.studied !== 1 && "s"}
                          </td>
                          <td className="p-3.5 text-right">
                            {/* Floating ledger actions appearing on hover */}
                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                              <button 
                                onClick={() => toggleFavorite(card.id)}
                                className="p-1 rounded-lg border border-border/20 bg-background/40 hover:bg-muted text-muted-foreground hover:text-accent shadow-sm active:scale-95 transition-all"
                                title="Favorite"
                              >
                                <Star className={`h-3.5 w-3.5 ${card.favorite ? "fill-accent text-accent" : ""}`} />
                              </button>
                              <button 
                                onClick={() => duplicateCard(card.id)}
                                className="p-1 rounded-lg border border-border/20 bg-background/40 hover:bg-muted text-muted-foreground hover:text-foreground shadow-sm active:scale-95 transition-all"
                                  title="Duplicate"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                              <button 
                                onClick={() => deleteCard(card.id)}
                                className="p-1 rounded-lg border border-border/20 bg-background/40 hover:bg-danger/10 text-muted-foreground hover:text-danger shadow-sm active:scale-95 transition-all"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </Card>
          </div>

          {/* Column 2: Linear-Style Sidebar Action Widgets */}
          <div className="space-y-6">
            
            {/* Quick Actions widget */}
            <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
              <CardHeader className="pb-3 border-b border-border/20 px-6">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 px-6">
                <Link href="/study" className="w-full block">
                  <Button className="w-full h-10 text-xs justify-between group rounded-xl shadow-glow">
                    Launch Review Session
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link href="/editor" className="w-full block">
                  <Button variant="secondary" className="w-full h-10 text-xs justify-start gap-2 rounded-xl border-border/60">
                    <Plus size={14} className="text-muted-foreground" /> Add new Flashcard
                  </Button>
                </Link>
                <button 
                  onClick={() => {
                    restartSession();
                    alert("Study results statistics cleared.");
                  }}
                  className="w-full flex items-center justify-center gap-2 h-9 rounded-xl border border-dashed border-border bg-background/30 text-[11px] font-semibold text-muted-foreground hover:border-danger hover:text-danger hover:bg-danger/5 transition-all duration-200"
                >
                  <RefreshCw size={12} /> Reset Study Session Logs
                </button>
              </CardContent>
            </Card>

            {/* Smart Insight Advice Widget */}
            <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
              <CardHeader className="pb-2 border-b border-border/20 px-6">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles size={13} className="text-accent fill-accent" /> AI Study Insight
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 px-6">
                <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                  Your consistency is outstanding. Accuracy on <span className="font-semibold text-foreground">Economy</span> is slightly lower (74%) than your overall average.
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                  We suggest launching a short <span className="font-semibold text-foreground">Review session</span> targeting only Polity and Economy incorrect items to solidify recall.
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity Timeline Feed */}
            <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
              <CardHeader className="pb-3 border-b border-border/20 px-6">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Recent Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 px-6">
                <div className="relative pl-4 space-y-6 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-border/60">
                  {timelineLogs.map((log, idx) => (
                    <div key={idx} className="relative space-y-1 group/item">
                      {/* Timeline point */}
                      <span className="absolute -left-[17px] top-1.5 h-2 w-2 rounded-full border border-background bg-accent transition-transform duration-300 group-hover/item:scale-125" />
                      
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-foreground leading-tight">
                          {log.text}
                        </p>
                        <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider px-1.5 py-0.5 bg-muted/60 border border-border/20 rounded select-none">
                          {log.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium">{log.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
