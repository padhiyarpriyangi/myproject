# UniSphere · To-Do Task Board

Kanban To-Do Task Board — React, TypeScript, Vite, Zustand, Tailwind CSS, shadcn/ui, TanStack Router (file-based), React Hook Form, Zod. Package manager: **Bun**.

## Run
```
bun install
bun run dev      # http://localhost:5173  (auto-generates src/routeTree.gen.ts)
```

## Flow
`/` → `/register` (data saved) → `/login` (email + password) → `/dashboard`

## File-based routes (`src/routes`)
| File | URL |
|---|---|
| `__root.tsx` | root layout |
| `index.tsx` | `/` (redirect) |
| `register.tsx` | `/register` |
| `login.tsx` | `/login` |
| `dashboard.tsx` | `/dashboard` (protected) |
| `tasks.new.tsx` | `/tasks/new` (Create Task) |
| `tasks.$taskId.edit.tsx` | `/tasks/:taskId/edit` (Edit Task) |

## Features
Registration & Login · user-specific dashboard with stats · Create / Read / Update / Delete tasks · board columns
To Do · In Progress · Review · Completed · drag & drop between columns · tasks tied to the logged-in user ·
responsive UI · Zod validation with error messages.

Data lives in localStorage (demo only; passwords are not hashed).
