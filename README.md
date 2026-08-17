# GraphHub

**v0.1.0 | GraphQL Backend**

A GraphQL backend for managing users, repositories, and issues. Built with **Node.js, TypeScript, Apollo Server, Prisma, and Neon PostgreSQL**.

## Features

* **Authentication:** Secure user registration and login using JWT.
* **Repositories:** Manage users and their repositories.
* **Issues:** Create and track repository issues.
* **DataLoaders:** Prevent N+1 queries and optimize nested GraphQL requests.
* **Type Safety:** End-to-end type safety with TypeScript and Prisma.
* **Database:** Serverless PostgreSQL powered by Neon.

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd GraphHub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="your_neon_postgres_connection_string"
JWT_SECRET="your_secret_key"
```

### 4. Sync the database

```bash
npx prisma db push
```

### 5. Build and start the server

```bash
npm run build
npm start
```

## Usage

Once the server is running, open:

```text
http://localhost:4000/graphql
```

Use the `Authorization` header for protected operations:

```text
Authorization: Bearer <your-jwt-token>
```

## Architecture

```text
Client → Apollo Server → JWT Auth → Resolvers → DataLoaders → Prisma → Neon PostgreSQL
```

## Tech Stack

**Node.js · TypeScript · GraphQL · Apollo Server · Prisma · PostgreSQL · Neon · JWT**
