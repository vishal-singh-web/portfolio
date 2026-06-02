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
