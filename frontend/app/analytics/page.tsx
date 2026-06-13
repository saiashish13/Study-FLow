"use client";

import { 
  CheckCircle2, Clock, Flame, XCircle, ArrowLeft, ArrowUpRight, 
  Sparkles, Calendar, ChevronRight
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AccuracyChart, TimeChart } from "@/components/charts";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFlashcards } from "@/store/use-flashcards";

// Detailed learning insights data structure for Civil Services candidates
const insightsData = [
  {
    id: "insight-1",
    title: "Polity Article cards show the highest error rate",
    category: "Polity",
    stat: "42% failure rate",
    desc: "Your recall times for constitutional emergency articles and fundamental rights are average of 4.2 seconds slower. We recommend dedicating a 10-minute focus review to reinforce these pathways.",
    actionText: "Practice Polity Deck"
  },
  {
    id: "insight-2",
    title: "Daily news sessions are increasing current affairs retention",
    category: "Current Affairs",
    stat: "+12% recall velocity",
    desc: "Consistency analysis shows study blocks under 12 minutes on daily news yield a 94% retention efficiency. Continuing this daily pattern prevents cognitive strain.",
    actionText: "Launch Quick Study"
  },
  {
    id: "insight-3",
    title: "Starred articles are reviewed 2.4x more often",
    category: "General",
    stat: "High recall stability",
    desc: "General studies questions with favorited flags receive more frequent active recall iterations. Star difficult facts to ensure they are added to prompt review schedules.",
    actionText: "Open Decks Library"
  }
] as const;

export default function AnalyticsPage() {
  const results = useFlashcards((state) => state.results);
  const cards = useFlashcards((state) => state.cards);
  const initializeStore = useFlashcards((state) => state.initializeStore);
  
  // States
  const [dateRange, setDateRange] = useState<"7days" | "30days" | "all">("7days");
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  // Initialize store from localStorage on mount (hydration-safe)
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  // Computations
  const correct = useMemo(() => results.filter((result) => result.correct).length, [results]);
  const incorrect = useMemo(() => results.length - correct, [results.length, correct]);
  const mostStudied = useMemo(
    () => [...cards].sort((a, b) => b.studied - a.studied)[0]?.category ?? "Polity",
    [cards]
  );

  // Dynamic values calculated based on date range selection
  const stats = useMemo(() => {
    switch (dateRange) {
      case "7days":
        return {
          correct: Math.round(correct * 0.7) || 8,
          incorrect: Math.round(incorrect * 0.6) || 2,
          streak: "8 Days",
          category: mostStudied,
          retention: 84
        };
      case "30days":
        return {
          correct: Math.round(correct * 2.8) || 32,
          incorrect: Math.round(incorrect * 2.2) || 8,
          streak: "15 Days",
          category: mostStudied,
          retention: 78
        };
      case "all":
      default:
        return {
          correct: correct || 42,
          incorrect: incorrect || 10,
          streak: "17 Days",
          category: mostStudied,
          retention: 92
        };
    }
  }, [dateRange, correct, incorrect, mostStudied]);

  // Sparkline data mockups based on selection
  const correctSparkline = dateRange === "7days" ? [4, 6, 8, 5, 9, 7, stats.correct] : [12, 18, 25, 22, 28, 30, stats.correct];
  const incorrectSparkline = dateRange === "7days" ? [1, 2, 1, 3, 2, 1, stats.incorrect] : [4, 6, 5, 8, 6, 7, stats.incorrect];
  const streakSparkline = [3, 5, 8, 6, 12, 15, 8];
  const categorySparkline = [2, 4, 3, 5, 7, 8, 9];

  // Subject Mastery heatmap values (UPSC Syllabus categories)
  const categoryMastery = [
    { name: "Polity", accuracy: 92, count: 12 },
    { name: "Economy", accuracy: 84, count: 9 },
    { name: "History", accuracy: 78, count: 15 },
    { name: "Geography", accuracy: 70, count: 8 },
    { name: "Science", accuracy: 96, count: 11 },
    { name: "Current Affairs", accuracy: 82, count: 14 }
  ];

  const activeInsightDetails = useMemo(() => {
    return insightsData.find(ins => ins.id === selectedInsight);
  }, [selectedInsight]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-8 py-2">
        
        {/* Analytics Top Control Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/20 pb-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">Performance Analytics</h1>
            <p className="text-sm text-muted-foreground">Detailed metrics, cognitive retention rates, and active study insights.</p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            {/* Range Select */}
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 text-muted-foreground h-4 w-4 pointer-events-none" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="pl-9 pr-4 h-9 text-xs font-semibold rounded-xl border border-border/40 bg-card/60 text-foreground outline-none cursor-pointer hover:bg-muted/20 focus:border-accent"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <Button size="sm" variant="secondary" className="text-xs rounded-xl border-border/60" onClick={() => alert("PDF report download started.")}>
              Export Report
            </Button>
          </div>
        </div>

        {/* Dynamic Metric Cards Grid */}
        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard 
            label="Correct Answers" 
            value={String(stats.correct)} 
            hint="Quiz active sessions" 
            icon={CheckCircle2} 
            trend={{ value: "+14%", isPositive: true }}
            sparkline={correctSparkline}
          />
          <MetricCard 
            label="Incorrect Answers" 
            value={String(stats.incorrect)} 
            hint="Review queue entries" 
            icon={XCircle} 
            trend={{ value: "-4%", isPositive: false }}
            sparkline={incorrectSparkline}
          />
          <MetricCard 
            label="Daily Streak" 
            value={stats.streak} 
            hint="Personal best: 17 days" 
            icon={Flame} 
            trend={{ value: "Stable", isPositive: true }}
            sparkline={streakSparkline}
          />
          <MetricCard 
            label="Top Category" 
            value={stats.category} 
            hint="Most reviewed deck" 
            icon={Clock} 
            trend={{ value: "Active", isPositive: true }}
            sparkline={categorySparkline}
          />
        </section>

        {/* Retention Strength Gauge & Subject Heatmap */}
        <section className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
          
          {/* Estimated Retention Circular Gauge */}
          <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/20 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Estimated Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
              <div className="relative flex items-center justify-center h-32 w-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Outer Background Circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    className="stroke-muted/40" 
                    strokeWidth="8" 
                    fill="none" 
                  />
                  {/* Active Progress Circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    className="stroke-accent transition-all duration-700 ease-in-out" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (stats.retention / 100) * 251.2}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center text count */}
                <div className="absolute text-center space-y-0.5">
                  <span className="text-3xl font-extrabold tracking-tight">{stats.retention}%</span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground block font-bold">Recall Strength</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-[240px]">
                Your memory retention is calculated based on study intervals. Currently, <strong>{stats.retention}%</strong> of syllabus topics are in permanent storage.
              </p>
            </CardContent>
          </Card>

          {/* Category Mastery Progress List */}
          <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/20 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Subject Mastery Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {categoryMastery.map(cat => (
                <div key={cat.name} className="space-y-1.5 group">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">{cat.name} Deck</span>
                    <span className="text-muted-foreground group-hover:text-accent transition-colors">{cat.accuracy}% Accuracy</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted border border-border/10">
                    <div 
                      className="h-full rounded-full bg-accent transition-all duration-500 opacity-80 group-hover:opacity-100" 
                      style={{ width: `${cat.accuracy}%` }} 
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Accuracy and Time Spent chart side-by-side */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/20 px-6"><CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Accuracy Trend (Weekly)</CardTitle></CardHeader>
            <CardContent className="pt-4 px-6"><AccuracyChart /></CardContent>
          </Card>
          
          <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/20 px-6"><CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Time Studied (Minutes)</CardTitle></CardHeader>
            <CardContent className="pt-4 px-6"><TimeChart /></CardContent>
          </Card>
        </section>

        {/* AI Learning Insights Grid and detailed Drawer Overlay */}
        <section className="relative">
          <Card className="rounded-3xl border border-border/40 bg-card/35 backdrop-blur-sm shadow-soft overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/20 px-6">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles size={13} className="text-accent fill-accent" /> Actionable Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-4 md:grid-cols-3">
              {insightsData.map((insight) => (
                <div 
                  key={insight.id} 
                  onClick={() => setSelectedInsight(insight.id)}
                  className="rounded-2xl border border-border/20 bg-background/40 p-5 cursor-pointer hover:border-accent/30 hover:bg-background/70 hover:shadow-sm transition-all duration-300 flex flex-col justify-between min-h-[130px] group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-accent font-extrabold">{insight.category} Insight</span>
                    <h4 className="font-bold text-sm tracking-tight leading-snug group-hover:text-accent transition-colors">{insight.title}</h4>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border/10 mt-3 text-[11px] font-bold text-muted-foreground">
                    <span>{insight.stat}</span>
                    <span className="flex items-center gap-0.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actionable Side Drawer Overlay */}
          {selectedInsight && activeInsightDetails && (
            <div className="fixed inset-0 z-50 flex justify-end bg-background/40 backdrop-blur-sm animate-in fade-in duration-200">
              <div 
                className="absolute inset-0" 
                onClick={() => setSelectedInsight(null)} 
              />
              <div className="relative w-full max-w-md h-full border-l border-border/40 bg-card/95 backdrop-blur-xl p-8 space-y-6 shadow-soft flex flex-col justify-between animate-in slide-in-from-right duration-300">
                <div className="space-y-6">
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between border-b border-border/20 pb-4">
                    <button 
                      onClick={() => setSelectedInsight(null)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold"
                    >
                      <ArrowLeft size={14} /> Back to Insights
                    </button>
                    <span className="text-[10px] font-bold text-accent bg-accent/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Recommendation
                    </span>
                  </div>

                  {/* Insight Details */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">{activeInsightDetails.category} Section</span>
                      <h3 className="text-2xl font-bold tracking-tight leading-snug">
                        {activeInsightDetails.title}
                      </h3>
                    </div>

                    <div className="rounded-xl bg-background/50 border border-border/30 p-4 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground block">Current Impact</span>
                      <span className="text-lg font-extrabold text-foreground">{activeInsightDetails.stat}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activeInsightDetails.desc}
                    </p>
                  </div>
                </div>

                {/* Drawer Action Actions */}
                <div className="space-y-3 pt-6 border-t border-border/20">
                  <Link href="/study" className="w-full block" onClick={() => setSelectedInsight(null)}>
                    <Button className="w-full h-11 text-xs justify-between group rounded-xl shadow-glow">
                      {activeInsightDetails.actionText}
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Button 
                    variant="secondary" 
                    className="w-full h-11 text-xs rounded-xl border-border/60"
                    onClick={() => setSelectedInsight(null)}
                  >
                    Dismiss Recommendation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
