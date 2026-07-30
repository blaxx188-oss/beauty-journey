# Installation Guide

Follow these steps to set up the Beauty Journey project for local development.

## Prerequisites
- **Node.js:** 18.x or higher (20.x recommended)
- **npm:** 9.x or higher
- **Git:** For version control

## Setup Steps

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd beauty-journey

# Install dependencies
npm install
```

### 2. Configure Environment
Copy the example environment file and fill in your credentials:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Supabase and Paymob credentials.

### 3. Run Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Available Scripts
- `npm run dev`: Start development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code quality.
- `npm run test`: Run unit tests with Vitest.
- `npm run format`: Format code with Prettier.

## Common Issues
- **Missing Env Vars:** If the app fails to start, check `src/utils/env-validation.ts` to see which variables are missing.
- **Node Version:** Ensure you are using a compatible Node.js version. Use `node -v` to check.
