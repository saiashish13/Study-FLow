"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, Library, BookOpen, Brain, BarChart3, Settings, Moon, Sun, PlusCircle, Command, CornerDownLeft } from "lucide-react";
import { useFlashcards } from "@/store/use-flashcards";

type PaletteItem = {
  label: string;
  sublabel?: string;
  href?: string;
  action?: () => void;
  icon: React.ComponentType<any>;
  category: string;
};

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  isDark: boolean;
};

export function CommandPalette({ isOpen, onClose, toggleTheme, isDark }: CommandPaletteProps) {
  const router = useRouter();
  const cards = useFlashcards((state) => state.cards);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown listeners for Ctrl+K/Cmd+K and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Navigation actions
  const navigationItems: PaletteItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: Home, category: "Navigation" },
    { label: "Library", href: "/library", icon: Library, category: "Navigation" },
    { label: "Editor", href: "/editor", icon: BookOpen, category: "Navigation" },
    { label: "Study Session", href: "/study", icon: Brain, category: "Navigation" },
    { label: "Analytics", href: "/analytics", icon: BarChart3, category: "Navigation" },
    { label: "Settings", href: "/settings", icon: Settings, category: "Navigation" },
  ];

  // Quick Action commands
  const actionItems: PaletteItem[] = [
    { label: "Create New Flashcard", action: () => router.push("/editor"), icon: PlusCircle, category: "Actions" },
    { label: `Toggle ${isDark ? "Light" : "Dark"} Mode`, action: toggleTheme, icon: isDark ? Sun : Moon, category: "Actions" },
  ];

  // Search flashcards matching query
  const searchedCards = useMemo<PaletteItem[]>(() => {
    if (!query.trim()) return [];
    const normalized = query.toLowerCase();
    return cards
      .filter(card => 
        card.question.toLowerCase().includes(normalized) || 
        card.answer.toLowerCase().includes(normalized) ||
        card.category.toLowerCase().includes(normalized)
      )
      .slice(0, 5)
      .map((card): PaletteItem => ({
        label: card.question,
        sublabel: `${card.category} · ${card.difficulty}`,
        action: () => router.push(`/library?query=${encodeURIComponent(card.question)}`),
        icon: Brain,
        category: "Flashcards"
      }));
  }, [query, cards, router]);

  // Combined searchable items list
  const filteredItems = useMemo<PaletteItem[]>(() => {
    const defaultActions = [...navigationItems, ...actionItems];
    if (!query.trim()) {
      return defaultActions;
    }
    const filteredDefaults = defaultActions.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    );
    return [...filteredDefaults, ...searchedCards];
  }, [query, searchedCards, navigationItems, actionItems]);

  // Keyboard navigation within list
  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    }
  };

  const executeItem = (item: any) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-background/60 p-4 pt-[12vh] backdrop-blur-sm transition-all duration-300">
      <div 
        className="absolute inset-0 bg-transparent" 
        onClick={onClose}
      />
      <div 
        className="glass-strong relative w-full max-w-xl rounded-2xl border border-border shadow-soft overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onKeyDown={handleKeyDownList}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm"
            placeholder="Type a command or search flashcards..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground select-none">
            ESC
          </kbd>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No results found for <span className="font-medium text-foreground">"{query}"</span>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Group items by category for visual organization */}
              {Array.from(new Set(filteredItems.map(i => i.category))).map(cat => {
                const catItems = filteredItems.filter(i => i.category === cat);
                return (
                  <div key={cat} className="space-y-1">
                    <h3 className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                      {cat}
                    </h3>
                    {catItems.map((item) => {
                      const globalIndex = filteredItems.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none transition-all duration-150 ${
                            isSelected 
                              ? "bg-primary text-background font-medium" 
                              : "text-foreground hover:bg-muted/50"
                          }`}
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? "text-background" : "text-muted-foreground"}`} />
                            <div className="truncate">
                              <span>{item.label}</span>
                              {"sublabel" in item && (
                                <span className={`ml-2 text-xs truncate ${isSelected ? "text-background/80" : "text-muted-foreground"}`}>
                                  {item.sublabel}
                                </span>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <CornerDownLeft className="h-4 w-4 opacity-70" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-muted/40 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Use</span>
            <span className="rounded bg-muted px-1 py-0.5 border border-border">↑↓</span>
            <span>to navigate</span>
            <span className="ml-1">and</span>
            <span className="rounded bg-muted px-1.5 py-0.5 border border-border">Enter</span>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Command className="h-3 w-3" />
            <span>StudyFlow Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}
