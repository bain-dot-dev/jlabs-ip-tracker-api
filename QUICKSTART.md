# Quick Start Guide

Get the IP Tracker API running in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- PostgreSQL installed (or use Prisma Postgres)

## Quick Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

The [.env](.env) file is already configured with Prisma Postgres. You're ready to go!

To use your own PostgreSQL database, edit [.env](.env):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ip_tracker"
```

### Step 3: Setup Database

**Option A - Using Prisma Postgres (Easiest)**

```bash
# Terminal 1: Start Prisma database
npx prisma dev

# Terminal 2: Run migrations and seed
npx prisma migrate dev --name init
npx prisma db seed
```

**Option B - Using Your PostgreSQL**

```bash
# Create database
createdb ip_tracker

# Run migrations and seed
npx prisma migrate dev --name init
npx prisma db seed
```

### Step 4: Start Server

```bash
npm run dev
```

Server runs at: **http://localhost:8000**

## Test It!

### 1. Health Check

```bash
curl http://localhost:8000/health
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Save the token from the response!**

### 3. Create History Entry

```bash
curl -X POST http://localhost:8000/api/history \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "ip_address": "8.8.8.8",
    "geo_data": {
      "city": "Mountain View",
      "region": "California",
      "country": "US"
    }
  }'
```

### 4. Get History

```bash
curl http://localhost:8000/api/history \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Test Credentials

| Email | Password |
|-------|----------|
| test@example.com | password123 |
| admin@example.com | admin123 |
| user@example.com | user123 |

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | /health | No | Health check |
| POST | /api/login | No | User login |
| POST | /api/register | No | Register user |
| GET | /api/history | Yes | Get search history |
| POST | /api/history | Yes | Save search |
| DELETE | /api/history | Yes | Delete searches |

## What's Next?

- Read full [README.md](README.md) for detailed documentation
- See [SETUP.md](SETUP.md) for advanced configuration
- Use Postman/Thunder Client for easier API testing
- View database with `npx prisma studio`

## Common Issues

**Database connection error**: Make sure Prisma dev is running or PostgreSQL is started

**Port in use**: Change PORT in [.env](.env)

**Token expired**: Login again to get a new token

## Project Files

- [src/server.js](src/server.js) - Express server
- [src/controllers/](src/controllers/) - API logic
- [src/routes/](src/routes/) - API routes
- [prisma/schema.prisma](prisma/schema.prisma) - Database schema
- [.env](.env) - Configuration

Happy coding!
