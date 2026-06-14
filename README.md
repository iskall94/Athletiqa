# Athletiqa


Athletiqa is a platform designed to connect athletes with sponsors in a more transparent and community-driven way.
The platform allows athletes to showcase their goals, progress, and stories while enabling sponsors to support them directly and follow their journey.

The project was developed as part of the Chas Challenge 2026 with the theme Tech for Good.

## Features
- Athlete and sponsor platform
- Authentication and user accounts
- Sponsor-athlete matching
- Image upload with Cloudinary
- Stripe payment integration
- Email testing with Mailpit
- Responsive frontend
- Kubernetes deployment
- Automated CI/CD pipelines

## Tech Stack
### Frontend
- React
- Vite
- JavaScript
- Backend
- ASP.NET Core
- Entity Framework
- SQL Server
- DevOps & Infrastructure
- Docker
- GitLab CI/CD
- Kubernetes
- Traefik Ingress
- Mailpit


## Live Demo
### Frontend
```
https://athletiqa.cc.k3s.chas-lab.dev
```
### Backend API
```
https://api-athletiqa.cc.k3s.chas-lab.dev
```
### Mailpit
```
https://mailpit-athletiqa.cc.k3s.chas-lab.dev
```
## Demo Login

### Athlete Account
Email: demo@athletiqa.com
Password: ********

### Sponsor Account
Email: sponsor@athletiqa.com
Password: ********

Athletiqa is a platform that enables athletes to find and create connections with sponsors. Athletes post updates and start campaigns showcasing a hint into their sport-life, and sponsors donate, earn medals and chat with athletes through messages and notifications.
## Project Overview
Athletiqa is a platform that enables athletes to find and create connections with sponsors. Athletes post updates and start campaigns showcasing a hint into their sport-life, and sponsors donate, earn medals and chat with athletes through messages and notifications.

This is our school project for Chas Academy by Ninetech (Group 9)

## What's in this repo?

- `backend/` - .NET API with SQL Server, Identity Auth, Carter for Endpoints, MediatR for handlers.
- `frontend/` - React + Vite app utilizing a Feature-Sliced Design folder layout.
- `docker-compose.yml` - Spins up SQL Server, backend, frontend and Mailpit for local dev.
- `k8s/`, `deploy`, `monitoring/` - Deployment and monitoring

## Tech stack

**Backend:** .NET, EF Core, SQL server, Carter, MediatR, FluentValidation, SignalR, Stripe, Cloudinary
**Frontend:** React, Vite, Tailwind CSS
**Infra:** Docker, Kubernetes

## Getting started

The easiest way to run the porject is through Docker. Call on the Docker Compose command in your terminal pointing at the directory the project is located in.


## Running the Project Locally
### Clone repository

```
git clone https://git.chas-lab.dev/chas-challenge-2026/grupp-9/ninetech.git
cd ninetech
```
### Start with Docker

```
docker compose up --build
```

### CI/CD Pipeline

The project uses GitLab CI/CD for:

- Docker image builds
- Automated testing
- Kubernetes deployments
- TLS/URL health checks
- Review environments

Deployments are automatically managed through Kubernetes using Traefik ingress routing.

## Kubernetes

The application is deployed on Kubernetes with:

- Frontend deployment
- Backend deployment
- Database service
- Ingress routing
- Automated deployment pipelines

## Branching Strategy

The team used a Git workflow based on:

feature branches - Dev - main

Feature work was developed in isolated branches before being merged into the shared development branch.

## Project Goal

The goal of Athletiqa is to create stronger connections between athletes and sponsors while increasing transparency, engagement, and local community support.
Backend
Frontend
Database
Then open:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Mailpit (for emails): http://localhost:8025
- SQL Server: `localhost:11433`

## How to run the backend

```bash
dotnet build backend
dotnet ef database update --project backend
```

## Running the frontend

```bash
cd frontend
npm install
npm run dev     # dev server (http://localhost:5173)
npm run build   # production build
npm run lint    # linter
```

### How the backend is organized

For the backend we utilize a vertical-slice and CQRS layout. Each feature has its own endpoint, command/query, handler and validators.

- `backend/Program.cs` – Service registration, middleware, routes, SignalR, health checks, seeding
- `backend/Domain/Entities` – EF Core entities
- `backend/Domain/Enums` – Shared enums (`Gender`, `MediaType`, `SponsorCategory`, …)
- `backend/Features` – The actual feature slices
- `backend/Infrastructure/Database` – `AthletiqaDbContext` and `DatabaseSeeder`
- `backend/Infrastructure/Services` – external services (Cloudinary etc.)
- `backend/Migrations` – EF Core migrations
- `backend/Monitoring` – Tracing and metrics

### Main endpoint groups

- Auth: `/login`, `/api/auth/register`, `/api/auth/logout`, `/api/users/me`
- Athlete profiles: `/api/athletes/{publicProfileId}`, `/posts`, `/campaigns`
- Sponsor profiles: `/api/sponsors/{publicProfileId}`, `/donations`
- Settings: `/api/user/athlete/profile`, `/api/user/sponsor/profile`
- Posts & comments: `/api/posts`, `/api/posts/{postId}/comments`, `/api/users/me/posts`
- Donation campaigns: `/api/donation-campaigns`, `/api/users/me/donation-campaigns`
- Uploads: `/api/uploads/signature` (signed Cloudinary upload)
- Stripe: under `Features/Stripe`

Public routes always utilize the `PublicProfileId` set on AthleteProfile/SponsorProfile, never the internal `UserId` set on the AspNet user.

## How the frontend is organized

We utilize Feature-Sliced Design, layers only import downwards.

```
pages → widgets → enteties → shared
```

(Yes, 'enteties' is misspelled. Please don't rename it, it'll break everything.)

- `app/` - Bootstrap, router, providers, global styles
- `pages/` - Route screens
- `widgets/` - Bigger composed UI blocks
- `features/` - User actions like login, create post, like post
- `enteties/` - Domain entities with API calls and cards
- `shared/` - UI kit, API helpers, hooks, assets

### Import pages

- `/` – home
- `/login`, `/register`, forgot/reset password
- `/explore`
- `/athlete-profile` and `/athlete-profile/:id`
- `/sponsor-profile` and `/sponsor-profile/:id`
- `/campaign/:id`
- `/settings`
- `/post/:postId/edit`

### Useful shared stuff

- `shared/ui` - `Button`, `Avatar`, `Modal`, `Tabs`, `Carousel`, `Input`, `FileUploadButton`, etc
- `shared/api/base/apiClient.js` - Shared API helper
- `shared/lib/AuthProvider.jsx` + `useAuth.js` - Auth started
- `shared/lib/useCurrentUser.js` - Current user hook

## Styling

- Tailwind everywhere
- Use `rem` not raw `px`
- Use theme tokens like `bg-bg`, `text-primary`, `bg-accent` instead of hardcoded colors.
- Use the shared UI components instead of raw `<button>` / `<input>´ etc.

## Auth & roles

Three roles:
- `Athlete`
- `SponsorUser`
- `SponsorCompanyUser`

### Seed users for local login

Use these seeded test accounts when running the app locally:

| User | Role | Email | Password |
| ---- | ---- | ----- | -------- |
| Alice| Athlete | `alice.seed@athletiqa.local` | `Seed123!` |
| Bob  | Sponsor | `bob.seed@athletiqa.local` | `Seed123!` |



Logged in profile pages live at `/athlete-profile` and `/sponsor-profile`. Public ones are the same routes with a `publicProfileId` at the end.

## Uploads (Cloudinary)

We use direct uploads so files don't pass through our backend, we decided on utilizing Cloudinary's services for this:

1. Frontend validates the files
2. Frontend asks backend for `/api/uploads/signature`
3. Backend signs the request with the Cloudinary secret
4. Frontend uploads straight to Cloudinary
5. Frontend sends the returned URL + public id to the normal create/update endpoint

The Cloudinary `ApiSecret` must **never** end up in the frontend.

Stuff we know about, just so nobody's surprised:

- Some frontend API calls still hardcode `http://localhost:5000` instead of using the shared client
- A few comments still mention mock data even though it's wired to the backend now
- Follow/block and parts of settings are still TODO
- `checkRole` is a hook but named like a regular function
- `AuthProvider` and `checkRole` can both call `/api/users/me`, so it sometimes double-fetches
- Some files have old commented-out component versions left behind

## Contributing notes

- Keep changes scoped to what was asked
- Don't move stuff across FSD layers in a way that makes `shared` depend on higher layers
- Keep new backend logic inside the right `Features/<Area>/<UseCase>` slice
- Keep API calls and DTO mapping close to the entity/feature that owns them
- Don't rename `enteties` 🙂
