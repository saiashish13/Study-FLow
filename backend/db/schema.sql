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

create table categories (
  id uuid primary key,
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  color text not null default '#0f766e',
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

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

create table study_sessions (
  id uuid primary key,
  user_id uuid not null references users(id) on delete cascade,
  mode text not null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer not null default 0
);

create table study_results (
  id uuid primary key,
  session_id uuid not null references study_sessions(id) on delete cascade,
  flashcard_id uuid not null references flashcards(id) on delete cascade,
  correct boolean not null,
  answered_at timestamptz not null default now()
);

create index flashcards_user_category_idx on flashcards(user_id, category_id);
create index study_results_session_idx on study_results(session_id);
