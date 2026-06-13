"use client";

import { create } from "zustand";
import { Category, Flashcard, initialCards } from "@/lib/sample-data";
import { upscQuestions } from "@/lib/upsc-questions";

// Date-based seeded pseudo-random number generator (Mulberry32)
function seedRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    let t = h += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generates 10 dynamic UPSC questions for a specific date string
export function getDailyCardsForDate(dateStr: string): Flashcard[] {
  const rng = seedRandom(dateStr);
  const shuffled = [...upscQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  
  return shuffled.slice(0, 10).map((q, idx) => ({
    id: `daily-${dateStr.replace(/\s+/g, "-")}-${idx}`,
    question: q.question,
    answer: q.answer,
    category: q.category,
    favorite: false,
    difficulty: q.difficulty,
    studied: 0,
    isDaily: true
  }));
}

type StudyResult = {
  cardId: string;
  correct: boolean;
};

type FlashcardState = {
  cards: Flashcard[];
  sessions: number;
  minutes: number;
  results: StudyResult[];
  lastUpdatedDate: string | null;
  initializeStore: () => void;
  syncCurrentAffairs: () => boolean; // returns true if new card added
  addCard: (card: Omit<Flashcard, "id" | "studied">) => void;
  updateCard: (id: string, updates: Partial<Flashcard>) => void;
  deleteCard: (id: string) => void;
  duplicateCard: (id: string) => void;
  toggleFavorite: (id: string) => void;
  recordResult: (cardId: string, correct: boolean) => void;
  restartSession: () => void;
  filteredCards: (query: string, category: Category | "All") => Flashcard[];
};

const saveStoreToLocalStorage = (state: Omit<FlashcardState, "initializeStore" | "syncCurrentAffairs" | "addCard" | "updateCard" | "deleteCard" | "duplicateCard" | "toggleFavorite" | "recordResult" | "restartSession" | "filteredCards">) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("studyflow_store", JSON.stringify(state));
  }
};

export const useFlashcards = create<FlashcardState>((set, get) => ({
  cards: initialCards,
  sessions: 42,
  minutes: 386,
  results: [
    { cardId: "card-1", correct: true },
    { cardId: "card-2", correct: true },
    { cardId: "card-3", correct: false },
    { cardId: "card-4", correct: true }
  ],
  lastUpdatedDate: null,

  initializeStore: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("studyflow_store");
    const todayStr = new Date().toDateString();

    let loadedState: any = null;
    if (stored) {
      try {
        loadedState = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse store state", e);
      }
    }

    if (loadedState) {
      if (loadedState.lastUpdatedDate !== todayStr) {
        // Remove non-favorited daily cards from yesterday
        // Promote favorited daily cards to custom cards (isDaily = false) so the user keeps them
        const customAndFavoritedCards = loadedState.cards.map((c: any) => {
          if (c.isDaily && c.favorite) {
            return { ...c, isDaily: false };
          }
          return c;
        }).filter((c: any) => !c.isDaily);

        const newDaily = getDailyCardsForDate(todayStr);
        const mergedCards = [...newDaily, ...customAndFavoritedCards];

        const newState = {
          cards: mergedCards,
          sessions: loadedState.sessions ?? 42,
          minutes: loadedState.minutes ?? 386,
          results: loadedState.results ?? [],
          lastUpdatedDate: todayStr
        };

        set(newState);
        saveStoreToLocalStorage(newState);
      } else {
        // Same day, load cached state
        set({
          cards: loadedState.cards ?? initialCards,
          sessions: loadedState.sessions ?? 42,
          minutes: loadedState.minutes ?? 386,
          results: loadedState.results ?? [],
          lastUpdatedDate: loadedState.lastUpdatedDate ?? todayStr
        });
      }
    } else {
      // First time load
      const daily = getDailyCardsForDate(todayStr);
      const newState = {
        cards: [...daily, ...initialCards],
        sessions: 42,
        minutes: 386,
        results: [
          { cardId: "card-1", correct: true },
          { cardId: "card-2", correct: true },
          { cardId: "card-3", correct: false },
          { cardId: "card-4", correct: true }
        ],
        lastUpdatedDate: todayStr
      };

      set(newState);
      saveStoreToLocalStorage(newState);
    }
  },

  syncCurrentAffairs: () => {
    const liveUpdates = [
      {
        question: "Which nation launched the 'Aditya-L1' spacecraft to study the Sun's corona?",
        answer: "India",
        category: "Science" as const,
        difficulty: "Easy" as const
      },
      {
        question: "Who was elected as the new Secretary-General of the United Nations?",
        answer: "António Guterres",
        category: "Current Affairs" as const,
        difficulty: "Easy" as const
      },
      {
        question: "Which Indian state has officially declared the Gangetic Dolphin as its state aquatic animal?",
        answer: "Uttar Pradesh",
        category: "Geography" as const,
        difficulty: "Medium" as const
      },
      {
        question: "Which country has recently launched the world's first carbon border tax?",
        answer: "European Union",
        category: "Economy" as const,
        difficulty: "Hard" as const
      }
    ];

    let added = false;
    set((state) => {
      // Pick one randomly
      const randomQ = liveUpdates[Math.floor(Math.random() * liveUpdates.length)];
      
      const exists = state.cards.some(c => c.question === randomQ.question);
      if (exists) return {};

      const newCard: Flashcard = {
        id: `sync-${Date.now()}`,
        question: randomQ.question,
        answer: randomQ.answer,
        category: randomQ.category,
        favorite: false,
        difficulty: randomQ.difficulty,
        studied: 0,
        isDaily: true
      };

      const updatedCards = [newCard, ...state.cards];
      const nextState = {
        cards: updatedCards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: state.results,
        lastUpdatedDate: state.lastUpdatedDate
      };
      
      saveStoreToLocalStorage(nextState);
      added = true;
      return { cards: updatedCards };
    });

    return added;
  },

  addCard: (card) =>
    set((state) => {
      const updatedCards = [{ ...card, id: crypto.randomUUID(), studied: 0 }, ...state.cards];
      const nextState = {
        cards: updatedCards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: state.results,
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return { cards: updatedCards };
    }),

  updateCard: (id, updates) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => (card.id === id ? { ...card, ...updates } : card));
      const nextState = {
        cards: updatedCards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: state.results,
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return { cards: updatedCards };
    }),

  deleteCard: (id) =>
    set((state) => {
      const updatedCards = state.cards.filter((card) => card.id !== id);
      const nextState = {
        cards: updatedCards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: state.results,
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return { cards: updatedCards };
    }),

  duplicateCard: (id) =>
    set((state) => {
      const source = state.cards.find((card) => card.id === id);
      if (!source) return {};
      const updatedCards = [{ ...source, id: crypto.randomUUID(), question: `${source.question} (copy)` }, ...state.cards];
      const nextState = {
        cards: updatedCards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: state.results,
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return { cards: updatedCards };
    }),

  toggleFavorite: (id) =>
    set((state) => {
      const updatedCards = state.cards.map((card) => (card.id === id ? { ...card, favorite: !card.favorite } : card));
      const nextState = {
        cards: updatedCards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: state.results,
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return { cards: updatedCards };
    }),

  recordResult: (cardId, correct) =>
    set((state) => {
      const updatedResults = [...state.results, { cardId, correct }];
      const nextSessions = state.sessions + (state.results.length % 5 === 0 ? 1 : 0);
      const nextMinutes = state.minutes + 2;
      const nextState = {
        cards: state.cards,
        sessions: nextSessions,
        minutes: nextMinutes,
        results: updatedResults,
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return {
        results: updatedResults,
        sessions: nextSessions,
        minutes: nextMinutes
      };
    }),

  restartSession: () =>
    set((state) => {
      const nextState = {
        cards: state.cards,
        sessions: state.sessions,
        minutes: state.minutes,
        results: [],
        lastUpdatedDate: state.lastUpdatedDate
      };
      saveStoreToLocalStorage(nextState);
      return { results: [] };
    }),

  filteredCards: (query, category) => {
    const normalized = query.trim().toLowerCase();
    return get().cards.filter((card) => {
      const matchesCategory = category === "All" || card.category === category;
      const matchesQuery = !normalized || `${card.question} ${card.answer}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }
}));
