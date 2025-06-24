# Zync ⚡

Zync is a modern automation platform inspired by Zapier. It lets users connect apps and services together using triggers and actions—no manual work needed.

This is a monorepo for the project, containing multiple packages that share common code and configurations.

## Project Structure

```
zync/
├── app/
│   └── backend/       # Backend service with authentication
├── packages/
│   ├── hooks/         # Webhook receiver service
│   ├── processor/     # Data processing service
│   └── shared/        # Shared code and Prisma schema
├── package.json       # Root package.json with workspaces
└── tsconfig.json      # Base TypeScript configuration
```

## Packages

- **@zync/backend**: Backend service with authentication
- **@zync/hooks**: Webhook receiver service
- **@zync/processor**: Data processing service
- **@zync/shared**: Shared code, including Prisma client and schema

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Generate Prisma client:
   ```
   npm run prisma:generate
   ```

3. Build all packages:
   ```
   npm run build
   ```

4. Start services:
   ```
   npm run start:hooks     # Start the hooks service
   npm run start:processor # Start the processor service
   npm run start:backend   # Start the backend service
   npm run dev:backend     # Start the backend service in development mode
   ```

## Development

- Each package can be developed independently
- Shared code is in the `@zync/shared` package
- TypeScript configurations extend from the root `tsconfig.json`
- Prisma schema is maintained in a single location at `packages/shared/prisma/schema.prisma`

## Backend API

The backend service provides authentication endpoints and protected routes:

### Authentication Endpoints

- **POST /auth/signup**
  - Creates a new user account
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: User data and JWT token

- **POST /auth/signin**
  - Authenticates a user
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: User data and JWT token

### Protected Endpoints

- **GET /api/profile**
  - Returns the authenticated user's profile
  - Requires Authorization header: `Bearer <token>`
  - Response: User data

### Health Check

- **GET /health**
  - Returns the status of the backend service
  - Response: `{ "status": "ok" }`
