<div align="center">
  <h1>🚀 NestJS Clean Architecture Boilerplate</h1>
  <p>A production-ready starting point for your NestJS applications using Fastify, Prisma ORM, and rigorous Clean Architecture design patterns.</p>
</div>

<br />

## ✨ Features

This boilerplate resolves common NestJS anti-patterns out of the box, ensuring scalable, secure, and easily testable enterprise foundations:

- **Strict Clean Architecture**: Absolute decoupling of database ORMs from domain logic. Custom repositories and mappers translate Prisma models into raw Typescript Domain entities transparently.
- **Advanced Authentication (JWT)**: Fully configured Dual-Token Passport system (Access Tokens & Refresh Tokens). Stateful sessions handled gracefully with hashed cross-verification.
- **Role-Based Access Control (RBAC)**: Secure any route immediately using built-in `@Roles('ADMIN')`, stacked natively atop an `AccessTokenGuard`.
- **Global Wrappers**: Enforces a strict REST contract. All successful endpoint responses arrive cleanly wrapped via a `TransformInterceptor` and all errors are caught and sanitized by a centralized `AllExceptionsFilter`.
- **Auto API Documentation**: Swagger (`@nestjs/swagger`) bundled and automatically mapped alongside Fastify.
- **Joi Configuration**: Crashes at startup if `.env` criteria aren't precisely met, avoiding silent failures in clustered deployments. 
- **Soft Deletion & Pagination**: Handled out the box cleanly skipping standard toxic destructive deletes.

---

## 🏗 Directory Structure

Code is strictly bounded by layered boundaries. Dependency injection forces communication exclusively `Inwards` towards the Domain layer.

```text
src/
├── app.module.ts
├── main.ts
├── config/              # Joi Schemas & App wide validation
├── common/              # Shared elements across layers
│   ├── decorators/      # Roles decorators
│   ├── filters/         # Central Exception standardizer
│   ├── guards/          # JWT Strategies & RBAC Enforcement
│   └── interceptors/    # Format output interceptor
├── domain/              # Deepest Layer - NO OUTSIDE COUPLING
│   ├── entities/        # Pure TS domain classes
│   └── repositories/    # Abstract interfaces specifying storage rules
├── application/         # Core Use Cases
│   ├── dtos/            # In/Out boundaries
│   ├── auth/            # Auth business services
│   └── user/            # User business services
├── presentation/        # Communication layer
│   ├── auth/            # Exposes endpoints
│   └── user/            # Exposes endpoints
└── infrastructure/      # Adapter layer handling dirty IO operations 
    └── prisma/          
        ├── schema.prisma                  # Postgres Schema
        └── repositories/                  # Implementation of domain rules
            └── prisma-user.repository.ts  # Database Mappers
```

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Remote or Local Docker)

### 2. Environment Variables
Create a root `.env` file containing your configurations:
```env
# Server details
PORT=3000

# Database target (Postgres connection string)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Token security (Make these entirely arbitrary 64 char long strings)
JWT_ACCESS_SECRET="super_secret_access_key_phrase"
JWT_REFRESH_SECRET="super_secret_refresh_key_phrase"
```

### 3. Install & Sync

Install all project dependencies:
```bash
npm install
```

Synchronize your schema securely up to your PostgreSQL database target and generate TypeScript bindings:
```bash
npx prisma db push
npx prisma generate
```

### 4. Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## 📖 Swagger Documentation

Once the application safely boots locally, hit the swagger route to interactively monitor and query the backend operations effortlessly:

🔗 **`http://localhost:3000/api/docs`**

> **Hint:** Use the `/auth/register` endpoints on the swagger dashboard to yield standard Bearer tokens, then click `Authorize` on Swagger to unlock `/user` capabilities.
