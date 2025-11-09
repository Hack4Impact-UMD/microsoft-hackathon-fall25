# RISE DC App

## Features

- **Adaptive Digital Cookbook** (`/cookbook`) - Digital cookbook for users with cognitive and literacy challenges
- **Visual Scheduling & Daily Routines** (`/scheduler`) - Scheduling interface for users with first-grade or below reading/math levels

## Development

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/     # Global components (Navbar)
├── pages/          # Feature pages (Cookbook, Scheduler)
├── shared/         # Shared resources between teams
│   ├── components/ # Reusable UI components
│   ├── styles/     # Shared styling/theme
│   ├── utils/      # Common utility functions
│   ├── hooks/      # Reusable React hooks
│   └── constants/  # App-wide constants
```

## Team Guidelines

- **Cookbook Team**: Work in `/src/pages/Cookbook.tsx` and related components
- **Scheduler Team**: Work in `/src/pages/Scheduler.tsx` and related components
- **Both Teams**: Use `/src/shared/` for any reusable code to prevent duplication
- Maintain consistent styling across features using shared components

## Tech Stack

- React 18
- Vite
- React Router
