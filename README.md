# 🌌 StudyFlow

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-react/lucide/main/icons/graduation-cap.svg" width="80" height="80" alt="StudyFlow Logo" style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 16px; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);" />
</p>

<h3 align="center">StudyFlow</h3>

<p align="center">
  <strong>Accelerate your learning. Track your retention. Master any subject.</strong>
</p>

<p align="center">
  A premium, world-class flashcard learning platform built with a modern SaaS-style frontend, detailed cognitive analytics, and a secure Express API backend.
</p>

<p align="center">
  <a href="#-key-features"><strong>Explore Features</strong></a> ·
  <a href="#-screenshots-gallery"><strong>View Gallery</strong></a> ·
  <a href="#-installation--setup"><strong>Quick Start</strong></a> ·
  <a href="#-api-overview"><strong>API Docs</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express-4.21-blue?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-16.0-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 🚀 Product Overview

StudyFlow is designed for students, professionals, and lifelong learners who want a structured, high-performance study environment. Combining the principles of active recall and spaced repetition with deep visual telemetry, StudyFlow transforms simple study cards into an intelligent exam-preparation engine. 

### Key Value Propositions
*   **Active Recall Loop**: Push facts from short-term memory to long-term retention using customizable card runs.
*   **Cognitive Analytics**: Go beyond simple correct/incorrect tracking with detailed retention estimations and mastery graphs.
*   **Developer-First Architecture**: Built on a solid Next.js App Router frontend, TypeScript backend, and structured PostgreSQL schema with an automatic memory-fallback for local development.

---

## ✨ Key Features

### 📚 Flashcard Library
*   **Filter & Find**: Dynamic search bar, subject filter tabs, and difficulty dropdowns.
*   **Interactive Controls**: Star your favorite cards to build custom review lists, or adjust difficulty ratings ('Easy', 'Medium', 'Hard') on the fly.
*   **Actionable Cards**: Quick-action buttons to instantly duplicate or delete cards from the list view.

### ✍️ Premium Card Editor
*   **Live Markdown Preview**: See exactly how your question and answer cards will look before saving them to the database.
*   **Category Integration**: Dynamically categorize cards under subjects (e.g. Polity, Economy, Geography) to automatically color-code them.
*   **Clean Forms**: Modern, interactive input fields with validation and feedback alerts.

### 📖 Dynamic Study Session
*   **Flexible Study Modes**: Choose between Standard, Recall Quiz, and Weakness Review modes in a unified interface.
*   **Smooth Navigation**: Integrated progress indicator bars, card flipping gestures, and instant keyboard shortcuts.
*   **Session Metrics**: Real-time timer and recall rate metrics updated during active study.

### 📊 Performance Telemetry
*   **Estimated Retention**: An algorithm-backed recall-strength gauge reflecting the durability of your study progress.
*   **Weekly Study Activity**: Visual bar charts tracking total sessions, durations, and accuracy trends over time.
*   **Mastery Heatmaps**: Category-by-category breakdown showing accuracy percentages across Polity, Economy, History, and more.

---

## 📸 Screenshots Gallery

### 🖥️ Main Study Dashboard
A centralized dashboard aggregating active streaks, daily session statistics, practice duration, and deck progress.
![StudyFlow Dashboard](./screenshots/dashboard.png)

### 📚 Interactive Flashcard Library
Search, sort, filter, and organize every flashcard card dynamically with quick-actions.
![StudyFlow Library](./screenshots/library.png)

### ✍️ Flashcard Creator & Live Preview Editor
Create polished cards with subject categories, difficulty ratings, and immediate preview rendering.
![StudyFlow Editor](./screenshots/editor.png)

### 📖 Focused Study Session Interface
An immersive, distraction-free environment for reviewing cards with card flipping mechanics.
![StudyFlow Study Session](./screenshots/study.png)

### 📈 Detailed Performance Analytics
In-depth metrics including estimated cognitive retention, category mastery levels, and daily streak tracking.
![StudyFlow Analytics](./screenshots/analytics.png)

---

## 🎨 Design System & Aesthetics

StudyFlow is styled according to elite SaaS design principles inspired by Vercel, Stripe, and Linear:
*   **Dark-Mode Aesthetics**: Midnight backgrounds (`#09090b`) contrasted with sleek dark cards and clean borders (`#27272a`).
*   **Vibrant HSL Accents**: Sophisticated purple (`#8b5cf6`) and indigo (`#6366f1`) gradients for focal indicators.
*   **Apple-Level Simplicity**: Generous spacing, clean typography (using standard sans-serif system fonts), and subtle micro-animations powered by Framer Motion.
*   **Responsive Fluidity**: Adaptive layouts for everything from ultra-wide monitors down to standard smartphone screens.

---

## 🔄 User Journey & Core Workflow

The typical StudyFlow loop is designed to maximize learning efficiency:

```mermaid
graph TD
    A[User Registers / Logs In] --> B[Dashboard Hub]
    B --> C[Create new Category & Flashcards in Editor]
    C --> D[View Decks in Library]
    D --> E[Initiate Study Session]
    E -->|Flip Card & Assess| F[Select Study Mode: Standard, Quiz, or Review]
    F -->|Submit Result| G[Save Session Stats to Database]
    G --> H[Update Performance Analytics Dashboard]
    H --> B
```

---

## 🏗️ System Architecture

StudyFlow implements a modern decoupled architecture:

```mermaid
graph LR
    subgraph Frontend [Client - Next.js App Router]
        UI[React Components / Tailwind CSS]
        Store[Zustand State Management]
        Charts[Recharts Engine]
    end

    subgraph Backend [API - Express.js Node Server]
        Router[API Routes /auth & /flashcards]
        AuthMW[JWT Authorization Middleware]
        GoogleOAuth[Google OAuth Exchange]
    end

    subgraph Database [Storage Layer]
        PGDB[(PostgreSQL Database)]
        MemoryDB[(In-Memory Database Fallback)]
    end

    UI --> Store
    Store --> Router
    Router --> AuthMW
    AuthMW --> PGDB
    Router -.->|Fallback if DB offline| MemoryDB
```

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 15](https://nextjs.org/) | React Server Components & App Router framework |
| | [React 19](https://react.dev/) | Component-driven UI library |
| | [Zustand](https://github.com/pmndrs/zustand) | Ultra-light, hook-based client state management |
| | [Framer Motion](https://www.framer.com/motion/) | Production-ready animations and gestures |
| | [Recharts](https://recharts.org/) | Composited charting library for dashboard telemetry |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling framework |
| | [Radix UI](https://www.radix-ui.com/) | Primitive unstyled, accessible UI components |
| | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |
| **Backend** | [Express](https://expressjs.com/) | Robust, minimalist web framework |
| | [TypeScript](https://www.typescriptlang.org/) | Strongly typed JavaScript variant |
| | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Secure, stateless JWT verification |
| | [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) | Secure password hashing algorithm |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Enterprise-grade relational SQL database |
| | [pg Node Client](https://node-postgres.com/) | Non-blocking PostgreSQL client driver for Node.js |
| **Tooling** | [tsx](https://github.com/privatenumber/tsx) | Fast TypeScript execution module for dev server |

---

## 📂 Project Structure

```text
.
├── backend/                       # Express Node.js Server
│   ├── db/
│   │   ├── memory.ts              # In-memory mock DB fallback configuration
│   │   ├── pool.ts                # PostgreSQL connection pooling config
│   │   └── schema.sql             # DB initialization schema & indexes
│   ├── middleware/
│   │   └── auth.ts                # Route protection JWT verification middleware
│   ├── routes/
│   │   ├── auth.ts                # Authentication endpoints & Google OAuth handler
│   │   └── flashcards.ts          # Flashcard & Session CRUD endpoints
│   ├── src/
│   │   └── index.ts               # Server entry point, middleware setup, port listener
│   ├── tsconfig.json              # TypeScript compilation rules
│   └── package.json               # Backend dependencies & dev scripts
│
├── frontend/                      # Next.js Client
│   ├── app/                       # Page routes (Dashboard, Library, Editor, Study, Analytics)
│   │   ├── layout.tsx             # Global layout wrapper
│   │   └── page.tsx               # Client landing page
│   ├── components/                # Reusable UI primitives (Dialog, Tab, Toast, Progress)
│   ├── lib/                       # Utility helpers & API client instances
│   ├── store/                     # Zustand state management files
│   ├── tailwind.config.ts         # Custom styling colors, grids, fonts, & animations
│   ├── tsconfig.json              # Client-side compilation parameters
│   └── package.json               # Client dependencies, scripts, & dev servers
│
├── screenshots/                   # Production-ready visual assets & screenshots
│   ├── analytics.png
│   ├── dashboard.png
│   ├── editor.png
│   ├── library.png
│   └── study.png
│
├── start_app.bat                  # Root startup script to run both servers concurrently
└── README.md                      # Documentation manual (this file)
```

---

## ⚙️ Environment Setup

### Backend Environment (`backend/.env`)
Create a `.env` file inside the `backend/` directory based on the following configurations:

| Key | Example Value | Description | Required |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5432/studyflow` | PostgreSQL database connection string | Yes (Or defaults to In-Memory DB) |
| `JWT_SECRET` | `your-secure-jwt-signature-secret-key` | Signature key for encryption tokens | Yes |
| `PORT` | `4000` | Port for the Express backend API server | Yes |
| `FRONTEND_URL` | `http://localhost:3000` | Allowed CORS origin (Next.js server) | Yes |
| `BACKEND_URL` | `http://localhost:4000` | Origin address of the Express backend server | Yes |
| `GOOGLE_CLIENT_ID` | `27429632...googleusercontent.com` | Google Console OAuth Client ID | No (Fallback to email sign-in) |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-yoursecretcode` | Google Console OAuth Client Secret | No (Fallback to email sign-in) |
| `GOOGLE_REDIRECT_URI` | `http://localhost:4000/auth/google/callback` | OAuth redirect landing callback | No |

### Frontend Environment (`frontend/.env.local` or environment variables)
The frontend uses the following environment variable to locate the API backend:

| Key | Default Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Direct location of the running Express API server |

---

## 💾 Database Schema

StudyFlow uses PostgreSQL for durable data structures. The schema contains optimized indexes on high-query paths:

```sql
-- Core User Profiles
create table users (
  id uuid primary key,
  name text not null,
  email text not null unique,
  password_hash text,
  google_id text unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subject Categories
create table categories (
  id uuid primary key,
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  color text not null default '#0f766e',
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

-- Flashcards Data Structure
create table flashcards (
  id uuid primary key,
  user_id uuid not null references users(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  question text not null,
  answer text not null,
  favorite boolean not null default false,
  difficulty text not null default 'Medium',
  studied_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for performance
create index flashcards_user_category_idx on flashcards(user_id, category_id);
```

---

## ⚡ Installation & Setup

### Prerequisites
*   [Node.js (v20 or higher)](https://nodejs.org/)
*   [npm (v10 or higher)](https://www.npmjs.com/)
*   [PostgreSQL (v15 or higher)](https://www.postgresql.org/)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/studyflow.git
cd studyflow
```

### Step 2: Database Initialization
If you have PostgreSQL installed:
1. Create a database named `studyflow`.
2. Apply the schema file:
```bash
psql "postgres://username:password@localhost:5432/studyflow" -f backend/db/schema.sql
```
> 💡 *Note: If PostgreSQL is not configured, the backend automatically falls back to an in-memory storage array. Your data will persist as long as the backend process runs.*

---

### Step 3: Run the Services

#### Option A: Automatic Concurrent Launch (Recommended)
We include a root-level batch script that launches both the frontend and backend servers in separate Windows command windows. Just double-click `start_app.bat` or run:
```bash
.\start_app.bat
```

#### Option B: Manual Setup

1. **Backend Server Setup**:
```bash
cd backend
npm install
# Configure your .env file
npm run dev
```

2. **Frontend Client Setup**:
```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start using StudyFlow.

---

## 🔌 API Overview

### Authentication Routes (`/auth`)
*   `POST /auth/register` - Create a new user profile.
*   `POST /auth/login` - Securely log in via Email/Password. Returns user details & Bearer JWT token.
*   `GET /auth/google` - Redirect to Google OAuth Consent Page.
*   `GET /auth/google/callback` - Receive authorization code from Google API.

### Flashcard CRUD Routes (`/flashcards`)
*   `GET /flashcards` - Retrieve all flashcards associated with the authorized user.
*   `POST /flashcards` - Create a new flashcard.
*   `PATCH /flashcards/:id` - Update an existing flashcard (change question, answer, difficulty, favorite status).
*   `DELETE /flashcards/:id` - Permanently remove a flashcard.

> 🔒 *Security Note: All `/flashcards` requests must include an `Authorization: Bearer <JWT_TOKEN>` header.*

---

## 🛡️ Authentication & Security

1.  **Stateless JWT Security**: The server issues standard cryptographic JWT tokens upon registration or login. The tokens expire in 7 days, maintaining a secure user state.
2.  **Password Protection**: Native user passwords are encrypted using bcrypt hashing rounds before insertion, preventing plain-text exposures.
3.  **Google OAuth Integration**: Offers passwordless authentication using Google accounts.
4.  **SQL Injection Prevention**: The PostgreSQL client utilizes parameterized queries for all client operations.

---

## 🚀 Performance & Scalability

*   **Connection Pooling**: Uses connection pool management (`pg.Pool`) to share active database processes and eliminate connection overhead.
*   **Custom Indexing**: Tables are indexed on composite keys (`user_id` + `category_id`) to accelerate query lookups during dashboard aggregation.
*   **React Optimization**: The frontend utilizes lightweight Zustand stores for modular, slice-based state subscription, reducing unnecessary DOM updates.
*   **Next.js Optimization**: Compiles server side where possible and utilizes static/client chunks to minimize JavaScript payloads.

---

## 🗺️ Future Roadmap

- [ ] **Spaced Repetition Integration**: Implementing the SuperMemo-2 (SM-2) algorithm to predict exact review intervals.
- [ ] **Collaborative Decks**: Group features to allow study partners to share, fork, and rate community card decks.
- [ ] **WebSockets Review Groups**: Synchronous live card games and quizzes with peers.
- [ ] **Offline Sync**: PWA capabilities caching session metrics inside IndexedDB and syncing when back online.

---

## 🤝 Contributing

We welcome open-source contributions to StudyFlow!
1. **Fork** the project.
2. Create a feature branch: `git checkout -b feature/amazing-improvement`.
3. **Commit** changes using clear messages: `git commit -m 'feat: add spaced repetition tracking'`.
4. **Push** to the branch: `git push origin feature/amazing-improvement`.
5. Open a **Pull Request**.

---

## 📄 License & Credits

Distributed under the MIT License. See `LICENSE` for more information.

Developed by [N. Sai Ashish](https://github.com/nsaiashish135). 

---

<p align="center">
  Made with ❤️ by the StudyFlow Team.
</p>
