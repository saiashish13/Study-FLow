# StudyFlow

A polished, full-stack flashcard learning platform for students, professionals, and exam aspirants who want structured review, measurable progress, and a clean study experience.

<p align="center">
  <img src="screenshots/dashboard.png" alt="StudyFlow dashboard preview" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/License-Pending-lightgrey" alt="License" />
  <img src="https://img.shields.io/badge/Build-Not%20Configured-lightgrey" alt="Build" />
  <img src="https://img.shields.io/badge/Stack-Next.js%20%2B%20Express-5C5CFF" alt="Stack" />
  <img src="https://img.shields.io/badge/Status-Active%20Development-brightgreen" alt="Status" />
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technical Highlights](#technical-highlights)
- [Performance](#performance)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [CI/CD](#cicd)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgements](#acknowledgements)
- [Support](#support)
- [Missing Information](#missing-information)

---

## Overview

StudyFlow exists to make studying more deliberate, measurable, and efficient. It combines a modern web interface with a secure backend so users can create flashcards, review them in structured study modes, and track performance over time.

### Why it exists

Many learners rely on scattered notes, static documents, or fragmented apps that do not turn study activity into a repeatable system. StudyFlow addresses that gap by combining:

- active recall workflows
- a focused flashcard editor
- dashboard analytics
- a simple authentication and persistence layer

### Real-world use cases

- exam preparation for competitive exams and certifications
- daily revision for technical concepts and professional learning
- spaced review for long-term retention
- personal knowledge management for students and professionals

### Target users

- students
- educators and study groups
- software engineers reviewing technical topics
- professionals building a personal knowledge base

### Key advantages

- clean, modern interface
- fast local development workflow
- structured data model for cards, categories, and sessions
- PostgreSQL-backed persistence with an in-memory fallback for local development

---

## Features

### Learning experience

- 📚 Flashcard library with search, filtering, favorites, duplicate, and delete actions
- ✍️ Card editor with question/answer fields and category selection
- 🧠 Study modes for standard review, quiz-style practice, and targeted review
- 📈 Analytics views for accuracy, study time, streaks, and category performance

### Product experience

- 🧭 Responsive dashboard layout for overview and daily progress
- 🔍 Command-style search and navigation patterns
- 🎨 Dark-mode-friendly UI with a polished SaaS-style design
- ⚡ Fast state updates using a lightweight client store

### Platform engineering

- 🔐 JWT-based authentication and Google OAuth support
- 🗄️ PostgreSQL persistence with SQL schema definitions
- 🛡️ Backend middleware for route protection and secure request handling
- 🔁 Graceful fallback to in-memory storage when the database is unavailable

---

## Architecture

StudyFlow follows a simple layered architecture:

```mermaid
flowchart LR
    A[Next.js Frontend] --> B[Express API]
    B --> C[Auth Middleware]
    B --> D[Flashcard Routes]
    B --> E[PostgreSQL Database]
    B -. fallback .-> F[In-Memory Store]
```

### Component responsibilities

- Frontend: route-based pages for dashboard, library, editor, study, analytics, and settings
- Backend: request handling, authentication, flashcard CRUD operations, and health checks
- Database layer: persistent storage for users, categories, flashcards, study sessions, and results
- Middleware: JWT verification and request authentication

### Data flow

1. A user signs in or registers.
2. The frontend calls the backend API with a bearer token.
3. The backend validates the token and reads or writes flashcard data.
4. The application updates the UI based on the returned state.

### Design decisions

- TypeScript is used throughout the stack for safer development and clearer contracts.
- The backend is intentionally modular with separate auth and flashcard route files.
- The app can run locally without a database by using the in-memory fallback.

---

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js, React, Tailwind CSS, Radix UI, Framer Motion, Recharts |
| Backend | Express.js, TypeScript, Node.js |
| Database | PostgreSQL, pg client |
| Authentication | JWT, bcryptjs, Google OAuth |
| APIs | REST JSON APIs |
| AI/ML | Not currently implemented |
| DevOps | Basic local scripts and environment-based configuration |
| Deployment | Planned for container or cloud deployment |
| Cloud Services | Google OAuth, optional managed PostgreSQL |
| Testing | No automated test suite is currently checked in |
| Programming Languages | TypeScript, JavaScript |
| Frameworks | Next.js, Express |
| Libraries | Zustand, Lucide React, clsx, tailwind-merge |

---

## Installation

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 15+ (recommended for persistent storage)

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Study\ FLow
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Create environment files

Create a file named `.env` in the backend directory:

```env
PORT=4000
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/studyflow
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback
```

Create a frontend environment file if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Initialize the database

If PostgreSQL is available, create a database named `studyflow` and load the schema:

```bash
psql "postgres://postgres:postgres@localhost:5432/studyflow" -f backend/db/schema.sql
```

> If the database is unavailable, the backend will fall back to its in-memory store for local development.

### 5. Run locally

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Open http://localhost:3000 to view the app.

### Windows convenience script

The repository includes a root-level launcher for Windows:

```powershell
./start_app.bat
```

---

## Environment Variables

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| `PORT` | Yes | Backend port | `4000` |
| `JWT_SECRET` | Yes | Secret used to sign JWTs | `super-secret-key` |
| `FRONTEND_URL` | Yes | Allowed frontend origin for CORS | `http://localhost:3000` |
| `BACKEND_URL` | Yes | Public backend URL for OAuth redirects | `http://localhost:4000` |
| `DATABASE_URL` | No for local fallback | PostgreSQL connection string | `postgres://postgres:postgres@localhost:5432/studyflow` |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID | `...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret | `...` |
| `GOOGLE_REDIRECT_URI` | No | OAuth callback URI | `http://localhost:4000/auth/google/callback` |
| `NEXT_PUBLIC_API_URL` | Yes for frontend | Frontend API base URL | `http://localhost:4000` |

---

## Usage Guide

### Typical user workflow

1. Register or sign in with email or Google OAuth.
2. Open the dashboard to review progress and active study themes.
3. Create or edit flashcards in the editor.
4. Visit the library to search, favorite, duplicate, or organize cards.
5. Start a study session in standard, quiz, or review mode.
6. Review analytics to see accuracy, study time, and category trends.

### Example experience

- A learner creates cards for constitutional law and economics.
- The learner reviews them in short sessions and marks difficult cards as favorites.
- The dashboard highlights activity and the analytics page reflects progression over time.

### Screenshots

The repository already includes representative screenshots in the screenshots folder:

- Dashboard
- Library
- Editor
- Study session
- Analytics

---

## API Documentation

The backend currently exposes a small REST API for authentication and flashcards.

### Health check

```http
GET /health
```

Response:

```json
{
  "ok": true
}
```

### Authentication

#### Register a user

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "name": "Ada",
  "email": "ada@example.com",
  "password": "secure-password"
}
```

Response:

```json
{
  "user": {
    "id": "...",
    "name": "Ada",
    "email": "ada@example.com"
  },
  "token": "jwt-token"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "ada@example.com",
  "password": "secure-password"
}
```

### Flashcards

All flashcard routes require a bearer token.

```http
GET /flashcards
Authorization: Bearer <token>
```

```http
POST /flashcards
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "question": "What is a closure in JavaScript?",
  "answer": "A function that captures variables from its parent scope.",
  "categoryId": "...",
  "difficulty": "Medium"
}
```

```http
PATCH /flashcards/:id
Authorization: Bearer <token>
```

```http
DELETE /flashcards/:id
Authorization: Bearer <token>
```

### Error handling

Common error responses include:

- `400` for missing input or malformed requests
- `401` for invalid or missing credentials
- `404` for missing flashcards
- `409` when a user already exists during registration

---

## Project Structure

```text
project/
├── backend/
│   ├── db/
│   │   ├── memory.ts
│   │   ├── pool.ts
│   │   └── schema.sql
│   ├── middleware/
│   │   └── auth.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── flashcards.ts
│   └── src/
│       └── index.ts
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── store/
├── screenshots/
├── start_app.bat
└── README.md
```

### Folder overview

- backend: API server, middleware, and database access layer
- backend/db: schema and connection helpers
- backend/routes: auth and flashcard route implementations
- frontend/app: route-level pages and app shell structure
- frontend/components: reusable UI elements and page widgets
- frontend/lib: utility code and sample data
- frontend/store: state management for flashcards and study data
- screenshots: project screenshots used in documentation

---

## Technical Highlights

- Type-safe development with TypeScript on both frontend and backend
- REST endpoint separation for authentication and flashcards
- Component-driven UI architecture with reusable UI primitives
- Secure password hashing and JWT-based session handling
- Database-backed persistence with a local fallback mode
- Clear separation between presentation, state, and API concerns

### Best practices reflected in the codebase

- environment-based configuration
- parameterized SQL queries
- route-level authentication checks
- modular organization for future scaling
- use of modern React and Next.js patterns

---

## Performance

The current implementation is lightweight and suitable for local development and small-to-medium user loads.

### Observed optimizations

- connection pooling for PostgreSQL access
- indexed schema design for flashcards and study results
- lightweight client-side store for UI state
- responsive UI with minimal page-level complexity

### Notes

- No formal benchmark suite is currently published.
- Performance characteristics will depend on the deployed database and hosting environment.

---

## Security

Security is treated as a first-class concern in the backend design.

- Authentication uses JWT tokens for protected routes.
- Passwords are hashed with bcrypt before being stored.
- Google OAuth is supported as an optional sign-in path.
- CORS is configured from environment settings.
- SQL queries use parameterized statements.
- Sensitive values should remain in environment variables and never be committed to source control.

---

## Testing

### Current state

No automated test suite is currently present in the repository.

### Recommended strategy

- unit tests for auth helpers and route behavior
- integration tests for flashcard CRUD flows
- end-to-end tests for login, card creation, and study flows
- coverage reporting in CI once the suite is introduced

---

## Deployment

### Docker

Docker support is not yet configured in the repository. A production deployment would typically containerize the frontend and backend separately.

### Docker Compose

A compose setup could be introduced to run:

- the frontend
- the backend
- PostgreSQL

### Vercel / Netlify

The Next.js frontend is a good fit for Vercel or Netlify. The backend should be deployed separately for API traffic.

### Railway / Render

These platforms are well suited for hosting the Express backend and linking to a managed PostgreSQL instance.

### AWS / Azure / GCP

A cloud deployment could use:

- App Runner, ECS, or Azure Container Apps
- Cloud Run or App Service for the API
- managed PostgreSQL or a managed database service

---

## CI/CD

No GitHub Actions workflow files are currently present in the repository. A production-ready setup should include:

- linting
- build verification
- automated tests
- deployment automation for main branches

---

## Screenshots

### Dashboard

![Dashboard screenshot](screenshots/dashboard.png)

### Library

![Library screenshot](screenshots/library.png)

### Editor

![Editor screenshot](screenshots/editor.png)

### Study Session

![Study session screenshot](screenshots/study.png)

### Analytics

![Analytics screenshot](screenshots/analytics.png)

---

## Future Improvements

- [ ] Add a true spaced-repetition engine
- [ ] Add collaborative decks and shared study spaces
- [ ] Add offline-friendly behavior and caching
- [ ] Add a mobile-first experience
- [ ] Add automated tests and CI pipelines
- [ ] Add OpenAPI documentation for the REST API

---

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your change with clear, focused commits.
4. Open a pull request with a summary of the change.

Preferred commit style:

```bash
git checkout -b feature/my-improvement
git commit -m "feat: add new study workflow"
```

---

## License

A license file has not yet been added to this repository. Before publishing publicly, add an appropriate license such as MIT or Apache-2.0 and update this section accordingly.

---

## Author

Name: Your Name

- LinkedIn: https://www.linkedin.com/in/nakshatram-saiashish-85a166338/
- GitHub: https://github.com/nsaiashish135
- Email: nsaiashish2@gmail.com

---

## Acknowledgements

This project builds on excellent open-source tools including Next.js, Express, PostgreSQL, Tailwind CSS, Radix UI, and TypeScript.

---

## Support

If you encounter issues or want to request a feature, please open a GitHub issue with:

- a clear summary of the problem
- steps to reproduce it
- expected behavior
- relevant screenshots or logs if available

---

## Missing Information

The following items are not currently defined in the repository and should be added for a more production-ready release:

- a license file
- automated tests
- CI/CD workflow
- Dockerfiles and Docker Compose configuration
- OpenAPI or Swagger documentation
- deployment configuration for production hosting
- a maintained changelog and release process
