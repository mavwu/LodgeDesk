# LodgeDesk

A full-stack lodge booking and administration MVP built as a simple monorepo.

## Stack

- Frontend: React + Vite + JavaScript
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma ORM
- Auth: JWT + bcrypt

## Project structure

```text
backend/
frontend/
```

## What is included

- Public rooms listing page
- Room details page
- Booking request form
- Admin login
- Admin dashboard overview
- Admin room management
- Admin booking management
- Booking status updates
- Basic dashboard stats

## Backend setup

1. Copy [`backend/.env.example`](backend/.env.example) to `backend/.env`.
2. Update `DATABASE_URL` in `backend/.env` to match your PostgreSQL host, port, username, password, and database.
3. From `backend/`, install dependencies:
   `npm install`
4. Generate the Prisma client:
   `npx prisma generate`
5. Push the schema to PostgreSQL:
   `npx prisma db push`
6. Seed demo rooms and the admin user:
   `npm run prisma:seed`
7. Start the backend API:
   `npm run dev`

## Frontend setup

1. Copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env`.
2. Update `VITE_API_BASE_URL` in `frontend/.env` if your backend is not running at `http://localhost:5000/api`.
3. From `frontend/`, install dependencies:
   `npm install`
4. Start the frontend:
   `npm run dev`

## Demo admin login

- Email: `admin@lodgedesk.demo`
- Password: `admin123`

These are created by the seed script and can be changed through `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env` before seeding.

> [!WARNING]
> The included credentials and JWT secret are for local demonstration only. Replace them before deploying the application or exposing it to the internet.

## API routes

### Public routes

- `GET /api/rooms`
- `GET /api/rooms/:slug`
- `POST /api/bookings`
- `POST /api/auth/login`

### Admin routes

- `GET /api/admin/dashboard`
- `GET /api/admin/rooms`
- `POST /api/admin/rooms`
- `PUT /api/admin/rooms/:id`
- `DELETE /api/admin/rooms/:id`
- `GET /api/admin/bookings`
- `PATCH /api/admin/bookings/:id/status`

## Manual testing checklist

1. Load the public rooms page and confirm rooms are listed from the API.
2. Open a room details page and submit a booking request.
3. Log in with the demo admin credentials.
4. Confirm dashboard cards and recent bookings load.
5. Add a room, edit it, then delete it.
6. Open booking management and change a booking status.

## License

This project is available under the [MIT License](LICENSE).
