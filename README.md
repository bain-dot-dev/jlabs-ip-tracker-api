# IP Tracker REST API

A robust Node.js REST API built with Express.js, TypeScript, Prisma ORM, and Zod validation for tracking IP address search history with user authentication.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js v5
- **ORM**: Prisma v7
- **Database**: PostgreSQL
- **Validation**: Zod
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs (10 salt rounds)
- **Logging**: Morgan
- **Environment Variables**: dotenv
- **CORS**: Enabled with configurable origins

## Features

- ✅ User authentication with JWT
- ✅ Secure password hashing with bcrypt (10 salt rounds)
- ✅ UUID-based primary keys for better scalability
- ✅ IP search history tracking with geolocation data
- ✅ CRUD operations for search history
- ✅ **NEW**: Individual history item retrieval (for click-to-view feature)
- ✅ **NEW**: Bulk deletion support (for checkbox multi-select feature)
- ✅ **NEW**: Map-ready geolocation data (lat/lng coordinates)
- ✅ Zod schema validation for type-safe input validation
- ✅ TypeScript for type safety
- ✅ Comprehensive error handling
- ✅ Request logging
- ✅ Database connection pooling
- ✅ Graceful server shutdown

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) or use Prisma Postgres
- **npm** or **yarn** package manager

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ip-tracker-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

The [.env](.env) file is already configured with Prisma Postgres. For your own PostgreSQL database, update it:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/ip_tracker"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=8000
NODE_ENV="development"

# CORS Configuration
CORS_ORIGIN="*"
```

**Important**: Replace `JWT_SECRET` with a strong random string in production!

## Database Setup

### Option 1: Using Prisma Postgres (Recommended for Development)

```bash
# Terminal 1: Start Prisma database
npx prisma dev

# Terminal 2: Run migrations
npx prisma migrate dev --name init

# Seed the database
npx prisma db seed
```

### Option 2: Using Your PostgreSQL Database

```bash
# Create database
createdb ip_tracker

# Update DATABASE_URL in .env to your PostgreSQL connection

# Run migrations
npx prisma migrate dev --name init

# Seed the database
npx prisma db seed
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Production Mode

```bash
npm start
```

The server will start on **http://localhost:8000**

## API Documentation

### Base URL

```
http://localhost:8000
```

### Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

### Endpoints

#### 1. Health Check

Check if the server is running.

**Endpoint**: `GET /health`

**Access**: Public

**Response**:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-22T10:30:00.000Z"
}
```

---

#### 2. User Login

Authenticate user and receive JWT token.

**Endpoint**: `POST /api/login`

**Access**: Public

**Request Body**:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Validation**:

- `email`: Must be a valid email format
- `password`: Must be at least 6 characters

**Success Response** (200):

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "test@example.com"
    }
  }
}
```

**Error Response** (401):

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Validation Error** (400):

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

#### 3. User Registration

Register a new user account.

**Endpoint**: `POST /api/register`

**Access**: Public

**Request Body**:

```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123"
}
```

**Validation**:

- `email`: Must be a valid email format
- `password`: Must be at least 6 characters

**Success Response** (201):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "email": "newuser@example.com"
    }
  }
}
```

**Error Response** (409):

```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

#### 4. Get All Search History

Retrieve authenticated user's IP search history.

**Endpoint**: `GET /api/history`

**Access**: Private (requires authentication)

**Headers**:

```
Authorization: Bearer <your-jwt-token>
```

**Success Response** (200):

```json
{
  "success": true,
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "ipAddress": "8.8.8.8",
      "geoData": {
        "ip": "8.8.8.8",
        "city": "Mountain View",
        "region": "California",
        "country": "US",
        "loc": "37.4056,-122.0775",
        "org": "Google LLC",
        "timezone": "America/Los_Angeles"
      },
      "searchedAt": "2025-01-22T10:30:00.000Z"
    }
  ]
}
```

---

#### 5. Get Single History Item (NEW) ⭐

Retrieve detailed information for a specific history entry by ID.

**Endpoint**: `GET /api/history/:id`

**Access**: Private (requires authentication)

**Headers**:

```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters**:

- `id`: UUID of the history entry

**Success Response** (200):

```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "ipAddress": "8.8.8.8",
    "geoData": {
      "ip": "8.8.8.8",
      "city": "Mountain View",
      "region": "California",
      "country": "US",
      "loc": "37.4056,-122.0775",
      "org": "Google LLC",
      "postal": "94043",
      "timezone": "America/Los_Angeles"
    },
    "searchedAt": "2025-01-22T10:30:00.000Z"
  }
}
```

**Error Response** (404):

```json
{
  "success": false,
  "message": "History entry not found"
}
```

**Error Response** (403):

```json
{
  "success": false,
  "message": "You do not have permission to access this history entry"
}
```

---

#### 5. Get Single History Item (NEW) ⭐

Retrieve detailed information for a specific history entry by ID.

**Endpoint**: `GET /api/history/:id`

**Access**: Private (requires authentication)

**Headers**:

```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters**:

- `id`: UUID of the history entry

**Success Response** (200):

```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "ipAddress": "8.8.8.8",
    "geoData": {
      "ip": "8.8.8.8",
      "city": "Mountain View",
      "region": "California",
      "country": "US",
      "loc": "37.4056,-122.0775",
      "org": "Google LLC",
      "postal": "94043",
      "timezone": "America/Los_Angeles"
    },
    "searchedAt": "2025-01-22T10:30:00.000Z"
  }
}
```

**Error Response** (404):

```json
{
  "success": false,
  "message": "History entry not found"
}
```

**Error Response** (403):

```json
{
  "success": false,
  "message": "You do not have permission to access this history entry"
}
```

---

#### 6. Save Search History

Save a new IP search to user's history.

**Endpoint**: `POST /api/history`

**Access**: Private (requires authentication)

**Headers**:

```
Authorization: Bearer <your-jwt-token>
```

**Request Body**:

```json
{
  "ip_address": "8.8.8.8",
  "geo_data": {
    "ip": "8.8.8.8",
    "hostname": "dns.google",
    "city": "Mountain View",
    "region": "California",
    "country": "US",
    "loc": "37.4056,-122.0775",
    "org": "AS15169 Google LLC",
    "postal": "94043",
    "timezone": "America/Los_Angeles"
  }
}
```

**Validation**:

- `ip_address`: Must be a valid IPv4 or IPv6 address
- `geo_data`: Must match geolocation data schema

**Success Response** (201):

```json
{
  "success": true,
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "ipAddress": "8.8.8.8",
    "geoData": { ... },
    "searchedAt": "2025-01-22T10:35:00.000Z"
  }
}
```

---

#### 7. Delete Search History (Enhanced) ⭐

Delete multiple history entries by their UUIDs (supports bulk deletion for checkbox feature).

**Endpoint**: `DELETE /api/history`

**Access**: Private (requires authentication)

**Headers**:

```
Authorization: Bearer <your-jwt-token>
```

**Request Body**:

```json
{
  "ids": [
    "770e8400-e29b-41d4-a716-446655440002",
    "880e8400-e29b-41d4-a716-446655440003"
  ]
}
```

**Validation**:

- `ids`: Must be an array of valid UUIDs (at least one required)

**Success Response** (200):

```json
{
  "success": true,
  "message": "Successfully deleted 2 history entries",
  "deletedCount": 2
}
```

**Error Response** (403):

```json
{
  "success": false,
  "message": "You do not have permission to delete these entries"
}
```

**Error Response** (404):

```json
{
  "success": false,
  "message": "Some history entries were not found"
}
```

---

## Frontend Integration

For complete frontend integration guides with all three requested features:

### 📚 Comprehensive Documentation

1. **[BACKEND_IMPLEMENTATION_SUMMARY.md](BACKEND_IMPLEMENTATION_SUMMARY.md)** - Backend architecture and implementation details
2. **[FRONTEND_INTEGRATION_GUIDE.md](FRONTEND_INTEGRATION_GUIDE.md)** - Complete frontend integration guide with examples
3. **[QUICKSTART_FRONTEND.md](QUICKSTART_FRONTEND.md)** - 30-minute quick start guide
4. **[IMPLEMENTATION_EXAMPLE.md](IMPLEMENTATION_EXAMPLE.md)** - Production-ready code examples

### ⭐ Implemented Features

#### 1. Click History to Display Geo Information

- **Backend**: `GET /api/history/:id` endpoint
- **Frontend**: Click handler fetches and displays detailed geo data
- **Documentation**: Full React implementation with hooks

#### 2. Multiple History Deletion with Checkboxes

- **Backend**: Enhanced `DELETE /api/history` with bulk deletion
- **Frontend**: Checkbox selection with select-all functionality
- **Documentation**: Complete React components with state management

#### 3. Map Integration with Location Pinning

- **Backend**: Geo data with `loc` field in "lat,lng" format
- **Frontend**: Leaflet/Mapbox/Google Maps integration examples
- **Documentation**: Step-by-step implementation for all major map libraries

### 🚀 Quick Frontend Setup

```bash
# Install dependencies
npm install leaflet react-leaflet

# Create your component
# See QUICKSTART_FRONTEND.md for complete code
```

### 📋 API Integration Example

```typescript
// Fetch all history
const history = await fetch("/api/history", {
  headers: { Authorization: `Bearer ${token}` },
});

// Get single history item (for click feature)
const item = await fetch(`/api/history/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});

// Delete multiple items (for checkbox feature)
await fetch("/api/history", {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ids: ["uuid1", "uuid2"] }),
});
```

---

## Project Structure

```
ip-tracker-api/
├── prisma/
│   ├── migrations/         # Database migrations
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.ts            # Database seeder
├── src/
│   ├── controllers/
│   │   ├── authController.ts      # Authentication logic
│   │   └── historyController.ts   # History CRUD operations
│   ├── middleware/
│   │   ├── auth.ts               # JWT verification middleware
│   │   ├── validate.ts           # Zod validation middleware
│   │   └── errorHandler.ts       # Global error handler
│   ├── routes/
│   │   ├── auth.ts               # Auth routes
│   │   └── history.ts            # History routes
│   ├── schemas/
│   │   └── validation.ts         # Zod validation schemas
│   ├── utils/
│   │   ├── prisma.ts             # Prisma client singleton
│   │   ├── jwt.ts                # JWT helper functions
│   │   └── password.ts           # Password hashing utilities
│   └── server.ts                 # Express app setup
├── dist/                   # Compiled JavaScript (after build)
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── prisma.config.ts        # Prisma configuration
└── README.md              # This file
```

## Database Schema

### Users Table

| Column    | Type     | Constraints                   |
| --------- | -------- | ----------------------------- |
| id        | UUID     | Primary Key, Default: uuid()  |
| email     | String   | Unique, Required              |
| password  | String   | Required (hashed with bcrypt) |
| createdAt | DateTime | Default: now()                |

### SearchHistory Table

| Column     | Type     | Constraints                     |
| ---------- | -------- | ------------------------------- |
| id         | UUID     | Primary Key, Default: uuid()    |
| userId     | UUID     | Foreign Key (users.id), Indexed |
| ipAddress  | String   | Required                        |
| geoData    | JSON     | Required (geolocation data)     |
| searchedAt | DateTime | Default: now()                  |

**Relationships:**

- User → SearchHistory (One-to-Many)
- SearchHistory deletion cascades when User is deleted

## Zod Validation Schemas

All endpoints use Zod schemas for validation:

- **loginSchema**: Email + Password validation
- **registerSchema**: Email + Password validation
- **createHistorySchema**: IP address + Geolocation data validation
- **deleteHistorySchema**: Array of UUIDs validation
- **geolocationDataSchema**: Full ipinfo.io data structure

See [src/schemas/validation.ts](src/schemas/validation.ts) for complete schema definitions.

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [...]  // Optional array for validation errors
}
```

**Common HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Validation Error / Bad Request
- `401` - Authentication Error
- `403` - Forbidden
- `404` - Not Found
- `409` - Duplicate / Conflict
- `500` - Server Error

## Testing with Postman/Thunder Client

### 1. Set Environment Variables

- `base_url`: http://localhost:8000
- `token`: (will be set after login)

### 2. Test Workflow

1. **Health Check**: GET `{{base_url}}/health`
2. **Register**: POST `{{base_url}}/api/register`
3. **Login**: POST `{{base_url}}/api/login` (save the token)
4. **Get All History**: GET `{{base_url}}/api/history` (add Bearer token)
5. **Get Single History**: GET `{{base_url}}/api/history/:id` (add Bearer token)
6. **Create History**: POST `{{base_url}}/api/history` (add Bearer token)
7. **Delete History**: DELETE `{{base_url}}/api/history` (add Bearer token)

## Prisma Studio

View and edit your database data using Prisma Studio:

```bash
npx prisma studio
```

Access at: **http://localhost:5555**

## Useful Commands

```bash
# Development
npm run dev              # Start development server with hot reload
npm run build            # Compile TypeScript to JavaScript
npm start                # Run production server
npm run seed             # Seed database with test data

# Prisma
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create and apply migration
npx prisma migrate reset # Reset database (WARNING: Deletes all data)
npx prisma studio        # Open Prisma Studio
npx prisma format        # Format schema file
npx prisma validate      # Validate schema file
npx prisma dev           # Start local Prisma Postgres database
```

## Production Deployment

### Environment Variables for Production

1. Change `NODE_ENV` to `"production"`
2. Generate a strong random `JWT_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. Use a production PostgreSQL database
4. Set specific `CORS_ORIGIN` instead of `"*"`

### Deployment Steps

```bash
# Install production dependencies
npm ci --only=production

# Build TypeScript
npm run build

# Run database migrations
npx prisma migrate deploy

# Start the server
npm start
```

## Security Best Practices

- Always use HTTPS in production
- Keep `JWT_SECRET` secure and never commit to git
- Use environment-specific CORS origins (not `"*"`)
- Regularly update dependencies for security patches
- Use rate limiting for auth endpoints (consider `express-rate-limit`)
- Implement request size limits
- UUID primary keys provide better security than sequential integers
- Passwords hashed with 10 salt rounds (configurable in `src/utils/password.ts`)

## Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npx prisma db pull

# Check if PostgreSQL is running
pg_isready

# Start Prisma Postgres
npx prisma dev
```

### TypeScript Compilation Errors

```bash
# Clean build
rm -rf dist/
npm run build
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npx prisma generate
```

### Port Already in Use

Change `PORT` in [.env](.env) or kill the process:

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

## Test Credentials

After seeding:

| Email            | Password    |
| ---------------- | ----------- |
| test@example.com | password123 |

## License

ISC

## Support

For issues or questions, please open an issue in the repository.

---

**Built with Node.js, TypeScript, Express, Prisma, and Zod**
