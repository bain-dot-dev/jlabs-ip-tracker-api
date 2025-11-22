# IP Tracker API - Setup Guide

This guide will help you set up and run the IP Tracker API with Prisma.

## Current Setup Status

The project has been initialized with:
- Express.js server configured
- Prisma ORM with PostgreSQL
- JWT authentication
- All controllers and middleware
- API routes
- Database schema defined
- Seed file for test users

## Database Configuration

The project is currently configured to use **Prisma Postgres** (a local development database provided by Prisma). The `.env` file contains a connection string that starts with `prisma+postgres://`.

### Option 1: Using Prisma Postgres (Recommended for Development)

1. Start the Prisma local database:
   ```bash
   npx prisma dev
   ```

2. In a new terminal, run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Seed the database:
   ```bash
   npx prisma db seed
   ```

### Option 2: Using Your Own PostgreSQL Database

If you prefer to use your own PostgreSQL database:

1. Install PostgreSQL on your system

2. Create a new database:
   ```bash
   createdb ip_tracker
   ```

3. Update the [.env](.env) file with your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ip_tracker"
   ```

4. Update [prisma.config.ts](prisma.config.ts):
   ```typescript
   import "dotenv/config";
   import { defineConfig, env } from "prisma/config";

   export default defineConfig({
     schema: "prisma/schema.prisma",
     migrations: {
       path: "prisma/migrations",
     },
     seed: {
       path: "prisma/seed.ts",
     },
     datasource: {
       url: env("DATABASE_URL"),
     },
   });
   ```

5. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

6. Seed the database:
   ```bash
   npx prisma db seed
   ```

## Running the Server

Once the database is set up:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will be available at: `http://localhost:8000`

3. Test the health endpoint:
   ```bash
   curl http://localhost:8000/health
   ```

## Test Users

After seeding, these users are available:

| Email | Password |
|-------|----------|
| test@example.com | password123 |
| admin@example.com | admin123 |
| user@example.com | user123 |

## Testing the API

### 1. Login

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Copy the `token` from the response.

### 2. Get History

```bash
curl -X GET http://localhost:8000/api/history \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Create History Entry

```bash
curl -X POST http://localhost:8000/api/history \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "ip_address": "8.8.8.8",
    "geo_data": {
      "city": "Mountain View",
      "region": "California",
      "country": "US",
      "loc": "37.4056,-122.0775",
      "org": "Google LLC",
      "timezone": "America/Los_Angeles"
    }
  }'
```

### 4. Delete History Entries

```bash
curl -X DELETE http://localhost:8000/api/history \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"ids": [1, 2]}'
```

## Project Structure

```
ip-tracker-api/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.ts            # Database seeder
│   └── migrations/        # Database migrations
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   └── historyController.js
│   ├── middleware/        # Express middleware
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   └── history.js
│   ├── utils/            # Utility functions
│   │   ├── prisma.js
│   │   └── jwt.js
│   └── server.js         # Express app
├── .env                  # Environment variables
├── .env.example          # Environment template
├── package.json          # Dependencies
└── README.md            # Documentation
```

## Troubleshooting

### Issue: "Can't reach database server"

**Solution**: Make sure either:
- Prisma dev is running (`npx prisma dev`)
- Or your PostgreSQL server is running

### Issue: "Prisma Client not generated"

**Solution**:
```bash
npx prisma generate
```

### Issue: "Port 8000 already in use"

**Solution**: Change the PORT in [.env](.env) or kill the process:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: Migration errors

**Solution**: Reset the database and start fresh:
```bash
npx prisma migrate reset
```

## Next Steps

1. Set up your database (Prisma Postgres or PostgreSQL)
2. Run migrations
3. Seed the database
4. Start the server
5. Test the API endpoints

For detailed API documentation, see [README.md](README.md).

## Production Deployment

For production:

1. Use a production PostgreSQL database (not Prisma Postgres)
2. Generate a secure JWT_SECRET
3. Set NODE_ENV to "production"
4. Configure specific CORS origins
5. Use environment variables from your hosting platform

See [README.md](README.md) for more production deployment details.
