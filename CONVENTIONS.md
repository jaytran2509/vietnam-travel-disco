# Project Conventions & Best Practices

This document outlines the coding standards, project structure, and best practices for the Vietnam Travel Disco project.

## 1. Project Structure & Documentation
- **Feature Documentation**: Every major feature MUST have its own dedicated folder in `docs/<feature-name>/`.
  - Example: `docs/env-integration/`, `docs/auth-flow/`.
  - Include implementation plans, guides, and architectural decisions.
- **Root Directory**: Keep the root clean. Only essential config files (vite, tailwind, tsconfig) and this `CONVENTIONS.md`.

## 2. Environment Variables
- **Usage**: Use `import.meta.env.VITE_VARIABLE_NAME`.
- **Naming**: Client-side variables MUST start with `VITE_`.
- **Type Safety**: Maintain `src/vite-env.d.ts` for IntelliSense.
- **Secrets**: NEVER commit `.env`. Use `.env.example` for templates.

## 3. Tech Stack & Coding Standards
- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: TailwindCSS v4.
- **Components**:
  - Use Functional Components with Hooks.
  - PascalCase for component filenames (e.g., `user-profile.tsx` -> `UserProfile.tsx` or `index.tsx` inside a folder).
  - Prefer named exports.
- **State Management**: React Query (TanStack Query) for server state.

## 4. Git & Workflow
- **Commits**: Use conventional commits (feat, fix, docs, chore).
- **Branches**: descriptive names (e.g., `feat/add-login`, `fix/nav-bug`).

## 5. General Rules
- **Clean Code**: Prioritize readability over cleverness.
- **No Hardcoding**: Use constants or env variables for magic strings/numbers.
- **Absolute Imports**: Use `@/` alias where configured (or stick to consistent relative if not).
