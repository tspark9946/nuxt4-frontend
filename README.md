# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Package List

```bash
# nuxt4
npm create nuxt@latest .

# eslint
npx nuxi module add eslint
npm i -D @antfu/eslint-config
npm i -D eslint-plugin-format

# husky
npm install husky --save-dev
npx huskt init
npm i -D lint-staged

# tailwind, daisyUI, Nuxt Icon
npm install tailwindcss @tailwindcss/vite
npm i -D daisyui@latest
npx nuxi module add icon
npx nuxi module add color-mode
```
