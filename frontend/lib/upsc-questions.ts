import { Category } from "./sample-data";

export type RawQuestion = {
  question: string;
  answer: string;
  category: Category;
  difficulty: "Easy" | "Medium" | "Hard";
};

export const upscQuestions: RawQuestion[] = [
  // --- Polity & Governance ---
  {
    question: "Under which Article of the Constitution can the President of India declare a Financial Emergency?",
    answer: "Article 360",
    category: "Polity",
    difficulty: "Medium"
  },
  {
    question: "Which schedule of the Indian Constitution contains provisions regarding anti-defection?",
    answer: "10th Schedule",
    category: "Polity",
    difficulty: "Easy"
  },
  {
    question: "Which body has the final power to interpret the Constitution of India?",
    answer: "Supreme Court of India",
    category: "Polity",
    difficulty: "Easy"
  },
  {
    question: "Which amendment introduced the Panchayati Raj system in India?",
    answer: "73rd Amendment",
    category: "Polity",
    difficulty: "Medium"
  },
  {
    question: "Which fundamental right cannot be suspended even during a National Emergency?",
    answer: "Right to Life (Article 21)",
    category: "Polity",
    difficulty: "Hard"
  },
  {
    question: "Who acts as the ex-officio Chairman of the Rajya Sabha?",
    answer: "Vice-President of India",
    category: "Polity",
    difficulty: "Easy"
  },
  {
    question: "Which Article guarantees the Right to Equality in the Indian Constitution?",
    answer: "Article 14",
    category: "Polity",
    difficulty: "Easy"
  },
  {
    question: "Who appoints the Chief Election Commissioner of India?",
    answer: "President of India",
    category: "Polity",
    difficulty: "Medium"
  },
  {
    question: "What is the maximum strength of the Lok Sabha as per the Constitution?",
    answer: "552 members",
    category: "Polity",
    difficulty: "Medium"
  },
  {
    question: "Which constitutional body is responsible for recommending the distribution of taxes between the Union and States?",
    answer: "Finance Commission",
    category: "Polity",
    difficulty: "Hard"
  },

  // --- Indian Economy ---
  {
    question: "Which organization is responsible for compiling the Wholesale Price Index (WPI) in India?",
    answer: "Office of the Economic Adviser",
    category: "Economy",
    difficulty: "Hard"
  },
  {
    question: "What is the primary objective of the monetary policy committee (MPC) in India?",
    answer: "Inflation targeting",
    category: "Economy",
    difficulty: "Medium"
  },
  {
    question: "Which five-year plan in India was based on the Mahalanobis model?",
    answer: "Second Five-Year Plan",
    category: "Economy",
    difficulty: "Medium"
  },
  {
    question: "What is the largest tax revenue source for the Central Government in India?",
    answer: "GST",
    category: "Economy",
    difficulty: "Easy"
  },
  {
    question: "Which body estimates the National Income in India?",
    answer: "National Statistical Office (NSO)",
    category: "Economy",
    difficulty: "Medium"
  },
  {
    question: "Who is the ex-officio Chairperson of the NITI Aayog?",
    answer: "Prime Minister of India",
    category: "Economy",
    difficulty: "Easy"
  },
  {
    question: "What type of unemployment is characterized by marginal productivity of labor being zero?",
    answer: "Disguised unemployment",
    category: "Economy",
    difficulty: "Hard"
  },
  {
    question: "Which curve represents the relationship between tax rates and tax revenues?",
    answer: "Laffer Curve",
    category: "Economy",
    difficulty: "Medium"
  },
  {
    question: "What is the base year for the calculation of the Consumer Price Index (CPI) in India?",
    answer: "2012",
    category: "Economy",
    difficulty: "Easy"
  },
  {
    question: "Which statutory body regulates the securities market in India?",
    answer: "SEBI",
    category: "Economy",
    difficulty: "Easy"
  },

  // --- History & Culture ---
  {
    question: "Who was the founder of the Gupta Empire?",
    answer: "Sri Gupta",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "The famous Indus Valley site Harappa is located on the banks of which river?",
    answer: "Ravi River",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Who was the first Governor-General of Bengal?",
    answer: "Warren Hastings",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "In which year did the Battle of Plassey take place?",
    answer: "1757",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Who founded the Arya Samaj in 1875?",
    answer: "Swami Dayananda Saraswati",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which Mauryan Emperor renounced violence and embraced Buddhism after the Kalinga War?",
    answer: "Ashoka",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "What was the capital of the Vijayanagara Empire?",
    answer: "Hampi",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Who was the leader of the Revolt of 1857 in Jhansi?",
    answer: "Rani Lakshmibai",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which Viceroy was responsible for the Partition of Bengal in 1905?",
    answer: "Lord Curzon",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "In which session of the Indian National Congress was the resolution for 'Purna Swaraj' passed?",
    answer: "Lahore Session (1929)",
    category: "History",
    difficulty: "Hard"
  },

  // --- Geography & Environment ---
  {
    question: "Which state is the largest producer of bauxite in India?",
    answer: "Odisha",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    question: "Which pass connects Srinagar to Leh?",
    answer: "Zoji La Pass",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the active volcano located in the Andaman and Nicobar Islands?",
    answer: "Barren Island",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which river is known as the 'Dakshin Ganga'?",
    answer: "Godavari",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Where is the headquarter of the International Solar Alliance (ISA) located?",
    answer: "Gurugram, India",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which national park is famous for the conservation of the One-horned Rhinoceros?",
    answer: "Kaziranga National Park",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the name of the boundary line between India and China?",
    answer: "McMahon Line",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    question: "Which soil type is most suitable for cotton cultivation in India?",
    answer: "Black Soil (Regur)",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "In which state is the famous Loktak Lake located?",
    answer: "Manipur",
    category: "Geography",
    difficulty: "Hard"
  },
  {
    question: "Which biosphere reserve is famous for the Nilgiri Tahr?",
    answer: "Nilgiri Biosphere Reserve",
    category: "Geography",
    difficulty: "Hard"
  },

  // --- Science & Technology ---
  {
    question: "What is the name of India's first satellite launched in 1975?",
    answer: "Aryabhata",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which indigenous missile system of India is an Intercontinental Ballistic Missile (ICBM)?",
    answer: "Agni-V",
    category: "Science",
    difficulty: "Medium"
  },
  {
    question: "Which technique is used to sequence the complete DNA of an organism?",
    answer: "Whole Genome Sequencing",
    category: "Science",
    difficulty: "Hard"
  },
  {
    question: "What is the name of India's first solar mission launched by ISRO?",
    answer: "Aditya-L1",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What does the term 'Li-Fi' stand for in wireless communication?",
    answer: "Light Fidelity",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the chemical name of Vitamin C?",
    answer: "Ascorbic Acid",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the primary fuel used in nuclear power reactors in India?",
    answer: "Uranium",
    category: "Science",
    difficulty: "Medium"
  },
  {
    question: "Which ISRO mission successfully landed a rover near the South Pole of the Moon?",
    answer: "Chandrayaan-3",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the main greenhouse gas responsible for ocean acidification?",
    answer: "Carbon Dioxide",
    category: "Science",
    difficulty: "Medium"
  },
  {
    question: "Which company developed the indigenous COVID-19 vaccine Covaxin in India?",
    answer: "Bharat Biotech",
    category: "Science",
    difficulty: "Easy"
  },

  // --- Current Affairs (Daily News) ---
  {
    question: "Which Indian city was declared the cleanest city for the 7th consecutive year in Swachh Survekshan?",
    answer: "Indore",
    category: "Current Affairs",
    difficulty: "Easy"
  },
  {
    question: "Which country became the 31st member of NATO in 2023?",
    answer: "Finland",
    category: "Current Affairs",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the new parliament building inaugurated in New Delhi?",
    answer: "Sansad Bhavan",
    category: "Current Affairs",
    difficulty: "Easy"
  },
  {
    question: "Who won the Nobel Peace Prize in 2023 for her fight against the oppression of women in Iran?",
    answer: "Narges Mohammadi",
    category: "Current Affairs",
    difficulty: "Hard"
  },
  {
    question: "Which Indian state has become the first to implement the Uniform Civil Code (UCC) post-independence?",
    answer: "Uttarakhand",
    category: "Current Affairs",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the joint military exercise between India and the USA held in Alaska?",
    answer: "Yudh Abhyas",
    category: "Current Affairs",
    difficulty: "Medium"
  },
  {
    question: "Which portal was launched by the RBI to search for unclaimed deposits across multiple banks?",
    answer: "UDGAM Portal",
    category: "Current Affairs",
    difficulty: "Hard"
  },
  {
    question: "What is the theme of India's G20 Presidency?",
    answer: "Vasudhaiva Kutumbakam",
    category: "Current Affairs",
    difficulty: "Easy"
  },
  {
    question: "Which Indian film's song won the Oscar for Best Original Song in 2023?",
    answer: "RRR",
    category: "Current Affairs",
    difficulty: "Easy"
  },
  {
    question: "Which country officially launched the Global Biofuels Alliance at the G20 Summit?",
    answer: "India",
    category: "Current Affairs",
    difficulty: "Medium"
  }
];
