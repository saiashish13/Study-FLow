"use client";

import Link from "next/link";
import { 
  ArrowRight, Brain, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Custom Infinity Brain Geometric SVG Logo
function InfinityBrainLogo() {
  return (
    <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" className="opacity-10 fill-accent/5" />
      <path d="M7 12C7 9.5 9.5 7.5 12 7.5C14.5 7.5 17 9.5 17 12C17 14.5 14.5 16.5 12 16.5C9.5 16.5 7 14.5 7 12Z" />
      <path d="M12 7.5V16.5" className="opacity-40" />
      <path d="M9 12.5C9.5 10 14.5 10 15 12.5" className="opacity-75 stroke-accent" />
    </svg>
  );
}

export default function LandingPage() {
  const handleLaunchDashboard = () => {
    window.location.href = `${apiBase}/auth/google`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden grid-bg-dots">
      {/* Radial highlight glows */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[52rem] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.09),transparent_50%)]" />
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      {/* Global Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <InfinityBrainLogo />
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              StudyFlow
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-5 text-sm font-semibold text-muted-foreground">
              <a href="#overview" className="hover:text-foreground transition-colors">Overview</a>
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            </div>
          </nav>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 lg:pt-36 lg:pb-24 text-center space-y-8 z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent backdrop-blur-sm shadow-glow animate-pulse">
          <span className="flex h-2 w-2 rounded-full bg-accent" />
          Core Spaced Repetition v2.0
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-8.5xl leading-[1.04] gradient-text">
            Retain what you learn.<br />Build what you love.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-muted-foreground">
            A lightweight, keyboard-first memory engine designed for developers and technical minds. Turn complex topics into permanent recall loops with zero cognitive load.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <Button 
            className="shadow-glow text-sm font-semibold h-11 px-8"
            onClick={handleLaunchDashboard}
          >
            Launch Dashboard <ArrowRight size={15} />
          </Button>
        </div>

        {/* Micro Stats */}
        <div className="grid grid-cols-3 gap-6 pt-12 border-t border-border/20 max-w-xl mx-auto">
          <div>
            <p className="text-2xl md:text-3.5xl font-extrabold tracking-tight">2.4M+</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Cards Studied</p>
          </div>
          <div>
            <p className="text-2xl md:text-3.5xl font-extrabold tracking-tight">99.4%</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Retention Rate</p>
          </div>
          <div>
            <p className="text-2xl md:text-3.5xl font-extrabold tracking-tight">45k+</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Active Learners</p>
          </div>
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW & FEATURES (Based on README.md) */}
      <section id="overview" className="mx-auto max-w-5xl px-6 py-16 space-y-16 border-t border-border/20 relative z-10 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-bold">PROJECT OVERVIEW</span>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">
            Designed for Modern Workflows
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            A polished flashcard quiz SaaS prototype built for modern study workflows. StudyFlow combines an intuitive Next.js UI, curated learning flows, and a secure Express/PostgreSQL backend so learners can create, review, and analyze flashcards with confidence.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-border/10 bg-card/10 hover:border-border/30 hover:bg-card/25 transition-all space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Brain size={18} />
            </div>
            <h3 className="font-bold text-lg tracking-tight">Curated Learning Flows</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              StudyFlow is designed as a learning platform for students and teams. It features multiple study modes, including Standard Mode for structured reviews, Quiz Mode for score-based recall, and Review Mode to focus on weak cards or favorites.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/10 bg-card/10 hover:border-border/30 hover:bg-card/25 transition-all space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Layers size={18} />
            </div>
            <h3 className="font-bold text-lg tracking-tight">Structured Relational Schema</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Backed by an Express and PostgreSQL persistence layer, StudyFlow stores accounts with hashed passwords, user-specific card categories, study sessions, and results for exact, long-term analytics.
            </p>
          </div>
        </div>

        {/* Project Overview Details from README */}
        <div id="features" className="border border-border/25 rounded-3xl p-6 md:p-8 bg-card/25 backdrop-blur-sm space-y-6 scroll-mt-20">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-accent font-bold">PLATFORM OFFERINGS</span>
            <h3 className="text-xl font-bold tracking-tight">Key Project Features</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              StudyFlow is designed as a production-ready learning platform for students and teams, offering a complete set of features for optimized visual recall:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-muted/10 transition-colors">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold mt-0.5">✓</span>
              <div>
                <h4 className="font-bold">Refined SaaS Dashboard</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Includes advanced performance analytics, consecutive study streaks, and dashboard widgets.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-muted/10 transition-colors">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold mt-0.5">✓</span>
              <div>
                <h4 className="font-bold">Organized Library</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Enables browse structure with custom categories, favorites toggling, and card difficulty ratings.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-muted/10 transition-colors">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold mt-0.5">✓</span>
              <div>
                <h4 className="font-bold">Flexible Card Editor</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Supports rapid flashcard creation, updates, deletions, and single-click duplicates.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-muted/10 transition-colors">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold mt-0.5">✓</span>
              <div>
                <h4 className="font-bold">Multiple Study Modes</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Supports linear standard reviews, score-based quiz mode, and targeted review practices.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-muted/10 transition-colors sm:col-span-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold mt-0.5">✓</span>
              <div>
                <h4 className="font-bold">Secure JWT Backend Persistence</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Express API backed by secure JWT token authentication with raw database storage using PostgreSQL schema.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground font-medium border-t border-border/10 pt-4 max-w-xl mx-auto italic leading-relaxed">
            "Whether you want a polished demo or a strong foundation for a real product, StudyFlow delivers a compelling developer-first experience."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-10 bg-card/20 text-xs text-muted-foreground relative z-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <InfinityBrainLogo />
            <span className="font-bold text-foreground text-sm">StudyFlow</span>
          </div>
          <p>
            StudyFlow © {new Date().getFullYear()} · Minimal design. Optimized recall scheduling.
          </p>
        </div>
      </footer>
    </main>
  );
}
