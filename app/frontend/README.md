# Zync Frontend

This is the frontend application for the Zync automation platform. It's built with [Next.js](https://nextjs.org) and is part of the Zync monorepo.

## Overview

The Zync frontend provides a user interface for:
- Creating and managing automation workflows
- Connecting different services and applications
- Monitoring the execution of automated tasks
- Managing user account and settings

## Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **next-themes**: Theme management (light/dark mode)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

Since this is part of a monorepo, you can install all dependencies from the root:

```bash
# From the root directory
npm install
```

Or install only the frontend dependencies:

```bash
# From the frontend directory
npm install
```

### Development

Run the development server:

```bash
# From the root directory
npm run dev --workspace=frontend

# Or from the frontend directory
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
# From the root directory
npm run build --workspace=frontend

# Or from the frontend directory
npm run build
```

## Integration with Backend

The frontend communicates with the Zync backend API for:
- User authentication
- Fetching and storing automation workflows
- Executing automation tasks

API endpoints are defined in the backend service and documented in the root README.

## Folder Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utility functions and hooks
│   └── types/        # TypeScript type definitions
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
