# IEEE PELS VIT Vellore — Recruitment Portal 2026

A modern, high-performance web application built for the IEEE Power Electronics Society (PELS) at VIT Vellore. This portal allows candidates to securely retrieve their personalized interview schedules, admit passes, and Google Meet links for the Junior Core Recruitment drive.

## 🚀 Features

- **Secure Private Lookup**: Candidates can only retrieve their own specific schedule via a typo-tolerant registration number search.
- **Real-time Countdown**: Live countdown timers to the exact interview slot.
- **Dynamic Admit Pass**: Beautiful, editorial-style admit passes that can be downloaded as high-resolution PNGs.
- **Interactive UI**: Custom fluid water-ripple background animation and subtle audio feedback.
- **Search Logging**: Anonymous, secure logging of search attempts for administrative tracking.

## ️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Canvas API (Custom fluid physics), [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## 📦 Getting Started

First, clone the repository and install dependencies:

```bash
npm install
# or
yarn install
```

Next, create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛡️ Security & Privacy

- Candidate data is protected via Supabase Row Level Security (RLS).
- The public interface only allows single-row lookups via a secure PostgreSQL RPC function, preventing bulk data scraping.
- Environment variables are strictly managed and excluded from version control via `.gitignore`.

## 📄 License

© 2026 IEEE Power Electronics Society (PELS) — VIT Vellore. All rights reserved.
