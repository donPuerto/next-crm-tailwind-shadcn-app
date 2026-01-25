# Next.js App

A modern Next.js application built with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Package Manager:** Bun
- **Fonts:** Geist Sans & Geist Mono

## Project Structure

```
app/
├── hooks/          # Custom React hooks
├── layout.tsx      # Root layout
├── page.tsx        # Homepage
└── globals.css     # Global styles

components/
└── ui/             # Reusable UI components

lib/                # Utility functions

agents/             # Agent instructions for AI-assisted development
```

## Agent Guidance

This project includes structured agent instructions to maintain code quality and consistency. See [agents/README.md](agents/README.md) for details.

## Getting Started

Install dependencies and run the development server:

```bash
bun install
bun dev
```

Or with npm/yarn:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- ✅ Next.js App Router with Server Components
- ✅ TypeScript for type safety
- ✅ Tailwind CSS v4 for styling
- ✅ Dark mode support
- ✅ Optimized fonts with next/font
- ✅ Structured folder organization
- ✅ Agent-guided development workflow

## Development Guidelines

- Follow the agent instructions in the `agents/` folder
- Keep components small and well-typed
- Add comments for beginners
- Use Server Components by default
- Run `bun run lint` before committing

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
