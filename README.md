# Library Management System

This repository is a JavaScript monorepo with separate backend and frontend applications:

```text
backend/   NestJS API and Prisma database schema
frontend/  React + Vite web application
```

## Getting started

Install dependencies for both applications from the repository root:

```sh
npm install
```

Start either application:

```sh
npm run dev:backend
npm run dev:frontend
```

The backend has its own setup and database instructions in [backend/README.md](backend/README.md). The frontend runs on Vite's local development server.

## Workspace commands

```sh
npm run build          # build both apps
npm run build:backend  # build the NestJS API
npm run build:frontend # build the web app
```
