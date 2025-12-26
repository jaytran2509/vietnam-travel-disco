# Environment Variable Integration Plan

## Goal
Enable environment variable management using `.env` files, following Vite best practices.

## User Review Required
> [!NOTE]
> No breaking changes. This simply adds configuration files.

## Proposed Changes

### Configuration Files
#### [NEW] [.env](file:///Users/tranthaituan/Desktop/Workspace/vietnam-travel-disco/.env)
- Create a local `.env` file for development secrets/configuration.
- **Note**: This file is already gitignored.

#### [NEW] [.env.example](file:///Users/tranthaituan/Desktop/Workspace/vietnam-travel-disco/.env.example)
- Create an example file to commit to git, serving as a template for other developers.

### Source Code
#### [MODIFY] [src/vite-env.d.ts](file:///Users/tranthaituan/Desktop/Workspace/vietnam-travel-disco/src/vite-env.d.ts) (if exists, or create)
- Add TypeScript definitions for environment variables to ensure type safety.

## Verification Plan

### Manual Verification
1.  Add a temporary `console.log(import.meta.env.VITE_API_URL)` in `App.tsx`.
2.  Run `pnpm dev`.
3.  Verify the value appears in the browser console.
