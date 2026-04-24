# Born To Win (B2W) Platform - Elite Setup Guide

Welcome to the **Born To Win (B2W)** platform repository. This guide provides a step-by-step walkthrough to perfectly configure, seed, and run both the robust Laravel backend and the high-fidelity Next.js frontend.

---

## 🏗️ Architecture Overview

The platform is divided into two distinct applications:
1. **Backend (`b2w_laravel`)**: A Laravel 11.x RESTful API powered by Laravel Passport for secure OAuth2 authentication.
2. **Frontend (`b2w_front`)**: A Next.js 14 (App Router) application utilizing Tailwind CSS, Framer Motion, and a customized premium design system.

---

## 🛠️ Prerequisites

Before you begin, ensure your local environment meets the following requirements:
- **PHP**: `^8.2`
- **Composer**: `v2.x`
- **Node.js**: `v18.x` or higher
- **Database**: MySQL or SQLite (configured in your `.env`)

---

## 🚀 Step 1: Backend Setup (`b2w_laravel`)

The backend serves as the source of truth for the platform, handling user authentication, competition data, and dashboard metrics.

### 1. Install Dependencies
Navigate to the backend directory and install the PHP dependencies:
```bash
cd b2w_laravel
composer install
```

### 2. Environment Configuration
Copy the example environment file and generate your application key:
```bash
cp .env.example .env
php artisan key:generate
```
*Note: Ensure your `.env` is properly configured with your database credentials (e.g., `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).*

### 3. Database Migration & Seeding (Crucial Step)
To ensure the platform functions perfectly, you must run the migrations, install the Passport encryption keys, and seed the database with the initial required data. 

Run this exact command to execute the full pipeline:
```bash
php artisan migrate:fresh && php artisan passport:client --personal && php artisan db:seed
```
*What this does:*
- `migrate:fresh`: Drops all tables and re-runs all migrations to ensure a clean state.
- `passport:client --personal`: Generates the OAuth personal access client required for frontend API authentication.
- `db:seed`: Populates the database with default administrative users, CMS content, departments, and competition (Race) data.

### 4. Start the API Server
Launch the Laravel development server:
```bash
php artisan serve
```
The backend will now be accessible at: `http://localhost:8000`

---

## 🎨 Step 2: Frontend Setup (`b2w_front`)

The frontend is a highly responsive, premium Next.js application that consumes the Laravel API.

### 1. Install Dependencies
Open a new terminal window, navigate to the frontend directory, and install the Node modules:
```bash
cd b2w_front
npm install
```

### 2. Environment Configuration
Copy the environment variables template:
```bash
cp .env.example .env.local
```
Ensure your `.env.local` contains the correct API URL pointing to your Laravel backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Start the Development Server
Launch the Next.js application:
```bash
npm run dev
```
The frontend will now be accessible at: `http://localhost:3000`

---

## 🔑 Default Credentials

After running the database seeder, you can log into the application using the following default administrative credentials:

- **Email**: `admin@b2w.com`
- **Password**: `password`

---

## 💡 Troubleshooting

- **401 Unauthorized Errors**: Ensure you ran the `passport:client --personal` command. If the frontend is still failing to authenticate, check that the `NEXT_PUBLIC_API_URL` in your Next.js `.env.local` matches the Laravel server's URL.
- **Database Connection Refused**: Verify your database service (MySQL/SQLite) is running and the `.env` credentials in `b2w_laravel` are absolutely correct.
- **Hydration Mismatches**: If you see React hydration warnings regarding randomized UI elements (like particles), ensure you are letting the client handle the randomization via `useEffect` hooks.

---
*Developed for the Born To Win Initiative. Engineered for Elite Performance.*
