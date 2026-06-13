export type Category = "Polity" | "Economy" | "History" | "Geography" | "Science" | "Current Affairs";

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  category: Category;
  favorite: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
  studied: number;
  isDaily?: boolean;
};

export const categories: Category[] = ["Polity", "Economy", "History", "Geography", "Science", "Current Affairs"];

export const initialCards: Flashcard[] = [
  {
    id: "card-1",
    question: "Under which Article of the Constitution can the President of India declare a Financial Emergency?",
    answer: "Article 360",
    category: "Polity",
    favorite: true,
    difficulty: "Medium",
    studied: 12
  },
  {
    id: "card-2",
    question: "Which organization is responsible for compiling the Wholesale Price Index (WPI) in India?",
    answer: "Office of the Economic Adviser",
    category: "Economy",
    favorite: false,
    difficulty: "Hard",
    studied: 9
  },
  {
    id: "card-3",
    question: "Who was the founder of the Gupta Empire?",
    answer: "Sri Gupta",
    category: "History",
    favorite: false,
    difficulty: "Easy",
    studied: 8
  },
  {
    id: "card-4",
    question: "Which state is the largest producer of bauxite in India?",
    answer: "Odisha",
    category: "Geography",
    favorite: true,
    difficulty: "Medium",
    studied: 11
  },
  {
    id: "card-5",
    question: "What is the name of India's first satellite launched in 1975?",
    answer: "Aryabhata",
    category: "Science",
    favorite: false,
    difficulty: "Easy",
    studied: 10
  },
  {
    id: "card-6",
    question: "Which Indian city was declared the cleanest city for the 7th consecutive year in Swachh Survekshan?",
    answer: "Indore",
    category: "Current Affairs",
    favorite: false,
    difficulty: "Easy",
    studied: 14
  },
  {
    id: "card-7",
    question: "Which schedule of the Indian Constitution contains provisions regarding anti-defection?",
    answer: "10th Schedule",
    category: "Polity",
    favorite: false,
    difficulty: "Easy",
    studied: 7
  },
  {
    id: "card-8",
    question: "What is the primary objective of the monetary policy committee (MPC) in India?",
    answer: "Inflation targeting",
    category: "Economy",
    favorite: false,
    difficulty: "Medium",
    studied: 13
  },
  {
    id: "card-9",
    question: "The famous Indus Valley site Harappa is located on the banks of which river?",
    answer: "Ravi River",
    category: "History",
    favorite: true,
    difficulty: "Medium",
    studied: 6
  },
  {
    id: "card-10",
    question: "Which pass connects Srinagar to Leh?",
    answer: "Zoji La Pass",
    category: "Geography",
    favorite: false,
    difficulty: "Medium",
    studied: 15
  }
];

export const trendData = [
  { day: "Mon", accuracy: 72, minutes: 24 },
  { day: "Tue", accuracy: 78, minutes: 31 },
  { day: "Wed", accuracy: 83, minutes: 29 },
  { day: "Thu", accuracy: 81, minutes: 42 },
  { day: "Fri", accuracy: 88, minutes: 37 },
  { day: "Sat", accuracy: 91, minutes: 48 },
  { day: "Sun", accuracy: 93, minutes: 44 }
];

export const testimonials = [
  {
    quote: "This app made civil services revision incredibly efficient. The daily current affairs rotation is exactly what IAS candidates need.",
    name: "Riya Sharma",
    role: "UPSC CSE 2024 Rank 14"
  },
  {
    quote: "The single-answer recall format is perfect for memorizing key constitutional articles, committee names, and daily news updates.",
    name: "Devin Lee",
    role: "IPS Officer (2025 Batch)"
  },
  {
    quote: "I love how the categories align directly with the General Studies syllabus. The retention gauge keeps me focused on my weakest subjects.",
    name: "Tara Nguyen",
    role: "Group 1 Aspirant"
  }
];
