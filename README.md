# Vishal Singh Portfolio

A modern personal portfolio website built with Next.js, React, TypeScript, Tailwind CSS, Supabase, Motion, and EmailJS. The site showcases Vishal Singh's profile, experience, projects, credentials, skills, bookshelf, story, resume, contact form, and realtime guestbook.

**Live Demo:** https://vishalsinghbuilds.vercel.app  
**Repository:** https://github.com/vishal-singh-web/portfolio

## Features

- Dynamic homepage powered by Supabase.
- Hero section with profile data, quote, profile photo, and "Now" sticky note.
- Floating resume button that links to a hosted resume PDF.
- Experience section sorted by `order_index`.
- Featured projects with tech stack badges and automatic image fallback.
- Dedicated projects page with project cards, detail modals, live links, and GitHub links.
- Certificate gallery with grid and list layouts.
- Certificate image preview modals.
- Interactive skill constellation page grouped by skill category.
- Digital bookshelf with animated book covers and hover-to-reveal lessons.
- Story timeline with scroll-based path animation.
- Realtime guestbook section on the homepage.
- Full guestbook archive page with live entry count and realtime updates.
- Contact form with React Hook Form, Zod validation, and EmailJS email sending.
- Responsive sticky navbar with desktop and mobile navigation.
- Loading screen, empty states, retryable error UI, and Supabase fetch handling.
- Supabase Storage image fallback convention for profile, project, certificate, and book images.
- Dynamic metadata helper for SEO and social previews.

## Pages

| Route | Description |
| --- | --- |
| `/` | Main portfolio page with hero, experience, featured projects, certificates, guestbook, footer, and contact form |
| `/projects` | Full project gallery with clickable detail modals |
| `/experience` | Experience timeline |
| `/credentials` | Certificate gallery |
| `/skills` | Animated skill constellation grouped by categories |
| `/bookshelf` | Digital bookshelf with book lessons on hover |
| `/story` | Personal story timeline |
| `/guestbook` | Full guestbook archive with realtime updates |

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Supabase Realtime
- Supabase Storage
- EmailJS
- React Hook Form
- Zod
- Motion / Framer Motion
- Lucide React
- Vercel

## Supabase Tables

The portfolio data is loaded from Supabase using the `usePortfolioData` hook.

Required tables:

- `profile`
- `experience`
- `projects`
- `certificates`
- `skills`
- `bookshelf`
- `story_milestones`
- `now_items`
- `guestbook`

Most list-based tables use `order_index` to control display order from the database.

## Image Naming Convention

If an image URL is missing in Supabase, the app can generate a storage URL automatically.

| Asset Type | File Name Format |
| --- | --- |
| Profile | `profile_main.jpg` |
| Project | `proj_Project-Title.jpg` |
| Certificate | `cert_Certificate-Title.jpg` |
| Book | `book_Book-Title.jpg` |

Examples:

```txt
proj_Ecommerce-App.jpg
cert_AWS-Cloud.jpg
book_Atomic-Habits.jpg
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The contact form uses EmailJS inside `components/ContactForm.tsx`. Update the EmailJS public key, service ID, and template ID there if you connect your own EmailJS account.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/vishal-singh-web/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production server after building.

```bash
npm run lint
```

Runs the lint command configured for the project.

## Project Structure

```txt
portfolio/
├── app/
│   ├── bookshelf/
│   ├── credentials/
│   ├── experience/
│   ├── guestbook/
│   ├── projects/
│   ├── skills/
│   ├── story/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CertificateCard.tsx
│   ├── ContactForm.tsx
│   ├── ErrorFallback.tsx
│   ├── FAB.tsx
│   ├── Footer.tsx
│   ├── Guestbook.tsx
│   ├── HeroDynamic.tsx
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectsClient.tsx
│   └── Timeline.tsx
├── hooks/
│   └── usePortfolioData.ts
├── lib/
│   ├── assets.ts
│   ├── metadata.ts
│   ├── projects.ts
│   └── supabase.ts
├── public/
├── package.json
├── next.config.js
├── postcss.config.mjs
└── tsconfig.json
```

## Deployment

This project is deployed on Vercel.

To deploy your own version:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add the Supabase environment variables.
4. Deploy the app.

## Notes

- Portfolio content is managed through Supabase.
- The guestbook uses Supabase Realtime for new messages.
- Resume, project, certificate, profile, and book images can be hosted in Supabase Storage.
- The contact form depends on EmailJS configuration.

## Author

Vishal Singh

## License

This project is for personal portfolio and learning purposes. Add a license file if you want to define open-source usage terms.
