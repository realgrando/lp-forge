# lp-forge

Visual landing page builder and static site engine designed for rapid, zero-config edge deployments. 

Built originally as internal tooling to bridge the gap between design and production—allowing non-technical designers to assemble, customize, and ship high-conversion landing pages to Vercel/Cloudflare without writing code or relying on bloated CMS platforms.

> **Status (`v0` Prototype):** This repository contains the initial proof-of-concept engine used to validate custom state-to-DOM rendering and live block composition. A `v1` architectural rewrite focusing on strict TypeScript AST/JSON schemas, decoupled state management, and serialized static export is planned.

## Architecture & Engineering Choices

Instead of wrapping heavy third-party page builder frameworks (like GrapesJS or Craft.js), **lp-forge** implements a custom, lightweight composition layer from scratch:

- **Zero Builder Dependencies:** Block orchestration, live property mutation, and layout composition are handled directly through React 19 state primitives.
- **Dynamic Styling Pipeline:** Uses `tailwind-merge` and `clsx` at runtime to resolve style overrides and variant collisions cleanly as designers tweak components visually.
- **Declarative Motion:** Integrates `framer-motion` directly into block schemas, enabling complex scroll and entry animations without manual keyframe coding.
- **Rust-backed Bundling (`rolldown-vite`):** Powered by `rolldown-vite` instead of standard Rollup, ensuring near-instant HMR during visual editing and fast production builds.

## Tech Stack

- **Core:** React 19, React Router v7
- **Bundler:** Vite (`rolldown-vite` Rust engine)
- **Styling & UI:** Tailwind CSS, `tailwind-merge`, `clsx`, Lucide Icons
- **Animation:** Framer Motion

## Local Development

```bash
# Install dependencies
npm install

# Run development server (exposed on local network)
npm run dev

# Build static production bundle
npm run build
