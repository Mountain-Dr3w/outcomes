# Drew McFarland Portfolio

Portfolio webapp for Drew McFarland.

Thesis: concrete work should make the result obvious without naming it too hard.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Motion for restrained interaction
- Phosphor icons

## Routes

- `/`
- `/work/velveteen`
- `/work/sbir-radar`
- `/work/missionos-core`

Writing lives on the home page under `#writing` and links out to Seams.

## Local Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Docker

```bash
docker build -t outcomes .
docker run --rm -p 3000:3000 outcomes
```

The app uses `output: "standalone"` so the production image runs the generated Next server directly.
