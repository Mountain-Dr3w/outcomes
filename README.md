# Outcomes

Portfolio webapp for Drew McFarland.

Thesis: Drew ships outcomes. Products are the vehicle.

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
- `/work/seams`

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
