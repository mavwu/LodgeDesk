# LodgeDesk: implementation guide

A React and Express/PostgreSQL booking-request MVP with public room pages and administrator room, booking, and dashboard workflows.

## Scope

**Repository role:** Full-stack MVP.

Requests are not guaranteed reservations. Booking dates, capacity, room status, and concurrent availability require further validation. Default seed credentials are for development only.

## Local evaluation

Follow the root README to configure the two applications independently:

1. In `backend/`, configure PostgreSQL, `JWT_SECRET`, and administrator seed settings using `.env.example`.
2. Install backend dependencies, generate Prisma, initialize a **fresh development** schema, and optionally seed demo rooms.
3. In `frontend/`, configure `VITE_API_BASE_URL`, install dependencies, and run `npm run dev`.

The backend defaults to port 5000. The Vite frontend runs separately. Never use the documented demo administrator password for a public deployment. Schema push and demo seeding are development operations, not a production migration or backup strategy.

## Code map

| Path | Responsibility |
| --- | --- |
| `backend` | Backend service and persistence boundary |
| `frontend` | Browser UI application |

## Configuration

`backend/.env.example`: `PORT`, `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`

`frontend/.env.example`: `VITE_API_BASE_URL`

Example files document variable names, not production values. Keep credentials and operator keys outside Git.

## Walkthrough

Seed a new development database, submit a guest booking request, sign in as the test administrator, and review its status in the admin workspace.

## Verification

From `frontend`: `npm run build`.

These are evaluation commands, not a claim that all checks passed. See the pull request validation for checks actually executed in this maintenance pass.

## Evidence for a case study

Describe this repository as a **full-stack mvp**. A useful case study explains the problem above, traces the walkthrough to its source, names a concrete implementation decision, and records a repeatable evaluation. Separate implemented behavior from roadmap work. Capture screenshots using synthetic data and identify the demonstrated commit.
