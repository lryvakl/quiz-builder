## Quick orientation for AI coding agents

This repo is a small Quiz Builder split into two folders: `backend/` (Node + Express + TypeScript + Prisma) and `frontend/` (Next.js + React + TypeScript + Tailwind).

Keep suggestions and edits focused, minimal, and tied to these concrete files and patterns below.

### Big picture
- Backend: `backend/src/server.ts` boots the app (`backend/src/app.ts`). Routes live under `backend/src/routes/*.ts` and business logic in `backend/src/services/*.ts` (e.g. `quizzes.service.ts`). Prisma models are in `backend/prisma/schema.prisma` and migrations in `backend/prisma/migrations/`.
- Frontend: `frontend/pages/*` are Next pages and `frontend/components/*` are UI. API calls use `frontend/services/quizzes.ts` which reads `process.env.NEXT_PUBLIC_API_URL`.

### Important conventions and gotchas (project-specific)
- Source is TypeScript but Node ESM imports include `.js` extensions in runtime imports (e.g. `import app from './app.js'` in `server.ts`). Keep `.js` in compiled imports or update build when changing module targets.
- Prisma models use `Json?` fields for `options` and `correctAnswers`. The backend service uses `Prisma.JsonNull` when values are intentionally absent; keep that pattern when modifying create/update logic.
- Controllers follow a minimal try/catch pattern and return 500 with `error.message`. Services throw Errors for not-found/validation; controllers map to HTTP responses.

### Key commands (how devs run the project)
- Backend (from repo root):
  - cd backend && npm install
  - Set environment variables: at minimum `DATABASE_URL` (Postgres) and optionally `PORT`.
  - Development: `npm run dev` (uses `nodemon`).
  - Build: `npm run build` → `npm start` runs `node dist/server.js`.
  - Prisma: migrations exist in `backend/prisma/migrations/`; to update schema use `npx prisma migrate dev` and `npx prisma generate` after setting `DATABASE_URL`.
- Frontend (from repo root):
  - cd frontend && npm install
  - Set `NEXT_PUBLIC_API_URL` to point at the backend (e.g. `http://localhost:4000`).
  - Development: `npm run dev` (Next dev server).

### API surface (concrete examples)
- POST /quizzes → payload shape (see `frontend/services/quizzes.ts` `QuizPayload`):
  { title: string, questions: [{ text, type: 'BOOLEAN'|'INPUT'|'CHECKBOX', options?: string[], correctAnswers?: string[] }] }
- GET /quizzes → returns summaries: [{ id, title, questionsCount }]
- GET /quizzes/:id → returns quiz details with ordered questions
- DELETE /quizzes/:id → deletes quiz

### Where to change behavior
- Add/modify fields or constraints: update `backend/prisma/schema.prisma` then create a migration and run `prisma generate`.
- Change validation/business rules: edit `backend/src/services/quizzes.service.ts`.
- Change route wiring: edit `backend/src/routes/quizzes.routes.ts` and controller files in `backend/src/controllers/quizzes/`.
- Change front-end UI or form shape: edit `frontend/components/QuizForm.tsx` and `frontend/services/quizzes.ts` to keep payloads in sync.

### Tests & CI
- No tests or CI scripts are present in the repo. Prefer small, targeted unit tests around `quizzes.service.ts` if adding tests.

### Examples to reference while editing
- Backend entry: `backend/src/server.ts` and `backend/src/app.ts` (middleware, route mounting).
- Service layer: `backend/src/services/quizzes.service.ts` — includes all core DB logic and patterns for returning domain shapes.
- Frontend API client: `frontend/services/quizzes.ts` — shows fetch usage and exact request/response types.

If any of the above sections are unclear or you want more examples (e.g., a sample migration, a unit test for a service, or a small e2e dev script), tell me which part and I will update this file accordingly.
