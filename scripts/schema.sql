-- D1 SQLite Schema for Upstartica (pp-app)

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  password TEXT,
  role TEXT DEFAULT 'learner',
  created_at TEXT
);

-- 2. Waitlist Table
CREATE TABLE IF NOT EXISTS waitlist (
  doc_id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER,
  foundation_importance_rating INTEGER,
  foundational_knowledge_rating INTEGER,
  business_idea TEXT,
  willing_to_launch_2027 TEXT,
  business_potential_reason TEXT,
  can_give_three_hours TEXT,
  submitted_at TEXT NOT NULL
);

-- 3. Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  submitted_at TEXT
);

-- 4. Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  author TEXT,
  date TEXT,
  category TEXT,
  read_time TEXT,
  image TEXT,
  created_at TEXT
);

-- 5. Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image TEXT,
  hours REAL,
  author TEXT,
  description TEXT,
  full_description TEXT,
  students INTEGER,
  rating REAL,
  stars INTEGER,
  price REAL,
  details_json TEXT
);

-- 6. Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course TEXT,
  assign_to TEXT,
  assign_type TEXT,
  deadline TEXT,
  due_date TEXT,
  points INTEGER,
  status TEXT DEFAULT 'active',
  created_at TEXT,
  updated_at TEXT
);

-- 7. Task Submissions Table
CREATE TABLE IF NOT EXISTS task_submissions (
  id TEXT PRIMARY KEY,
  task_id TEXT,
  task_title TEXT,
  learner_name TEXT,
  description TEXT,
  attachment_name TEXT,
  status TEXT DEFAULT 'submitted',
  submitted_at TEXT
);

-- 8. Meetings Table
CREATE TABLE IF NOT EXISTS meetings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  scheduled_date TEXT,
  scheduled_time TEXT,
  attendees INTEGER,
  meet_code TEXT,
  password TEXT
);

-- 9. Community Posts Table
CREATE TABLE IF NOT EXISTS community_posts (
  id TEXT PRIMARY KEY,
  author TEXT,
  author_role TEXT,
  avatar TEXT,
  content TEXT,
  image TEXT,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments_json TEXT,
  created_at TEXT
);

-- 10. Key-Value Store for Dynamic App State (Dashboards, Resources, etc.)
CREATE TABLE IF NOT EXISTS kv_store (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT
);
