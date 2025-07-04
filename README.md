# Zync ⚡

Zync is a modern automation platform inspired by Zapier. It lets users connect apps and services together using triggers and actions—no manual work needed.

This is a monorepo for the project, containing multiple packages that share common code and configurations.

## Project Structure

```
zync/
├── app/
│   ├── frontend/      # Next.js frontend application
│   └── backend/       # Backend service with authentication
├── packages/
│   ├── hooks/         # Webhook receiver service
│   ├── processor/     # Data processing service
│   └── shared/        # Shared code and Prisma schema
├── package.json       # Root package.json with workspaces
└── tsconfig.json      # Base TypeScript configuration
```

## Packages

- **@zync/frontend**: Next.js frontend application
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
   npm run start:frontend  # Start the frontend in production mode
   npm run start:backend   # Start the backend service
   npm run dev:frontend    # Start the frontend in development mode
   npm run dev:backend     # Start the backend service in development mode
   ```

## Development

- Each package can be developed independently
- Shared code is in the `@zync/shared` package
- TypeScript configurations extend from the root `tsconfig.json`
- Prisma schema is maintained in a single location at `packages/shared/prisma/schema.prisma`
