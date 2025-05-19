# Dinder

Dinder is a responsive web application for discovering dinner recipes, built with SvelteKit. It leverages the Spoonacular API (via a SvelteKit backend proxy) to present users with random recipe suggestions through an interactive, "like" or "dislike" interface.

Favorited recipes are saved using client-side `localStorage`, and direct links to the original recipe sources are provided.

## Core Features:

- Random dinner recipe fetching (Spoonacular API).
- Interactive like/dislike decision mechanism.
- Client-side favorites stored in `localStorage`.
- Direct links to full recipe sources.

## Technology Stack:

- **Frontend & Backend Proxy:** SvelteKit, TypeScript
- **Styling:** Tailwind CSS
- **Recipe Data:** Spoonacular API
- **Runtime/Build:** Bun
