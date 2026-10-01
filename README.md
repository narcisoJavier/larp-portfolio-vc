# Narciso III Javier — Portfolio

Personal engineering portfolio for Narciso III Javier, a Computer Science student focused on systems, backend services, tooling, and game development.

## Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS v4
- Framer Motion for restrained transitions
- Three.js and React Three Fiber for the interactive route proof
- Resend-backed inquiry form

## Local development

```sh
npm ci --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`.

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Portfolio page |
| `/admin` | Local content override editor |
| `/api/chat` | OpenRouter chatbot endpoint |
| `/api/github-stats` | GitHub contribution image proxy |
| `/api/inquiry` | Contact form delivery endpoint |
| `/api/resume` | Resume download redirect |

## Design direction

The live portfolio uses a kinetic midnight studio system: matte blue-black surfaces, Newsreader display type, Geist body text, Geist Mono metadata, cyan focus states, and restrained violet depth accents.

The Three.js route proof demonstrates deterministic shortest-path routing inspired by the Campus Navigator CS312 project. It includes HTML controls and a non-WebGL fallback so the visual is useful without requiring WebGL.

## Data and content

`src/data/resumeData.ts` is the source of truth for profile, skills, credentials, and projects. Runtime content overrides use `localStorage['resume-content-overrides']` through the `/admin` page and `useContent` hook.

Project claims are reviewed in `src/data/projectEvidence.ts`. Do not add unsupported framework, performance, or employment claims.

Archived WebMCP challenge media and historical notes remain in their original folders for reference. They are not part of the live portfolio runtime.
