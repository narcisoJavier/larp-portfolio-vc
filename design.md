---
colors:
  canvas: "#08080a"
  surface: "#0f0f13"
  surface_raised: "#16161c"
  surface_soft: "#121217"
  ink: "#f4f4f5"
  ink_muted: "#a1a1aa"
  ink_subtle: "#71717a"
  border: "rgba(255, 255, 255, 0.07)"
  border_strong: "rgba(255, 255, 255, 0.22)"
  accent: "#ffffff"
  accent_secondary: "#00ADD8"
typography:
  display: "Syne, Arial, sans-serif"
  body: "Geist, Arial, sans-serif"
  code: "Geist Mono, monospace"
spacing:
  base_unit: "4px"
  content_max_width: "1720px"
  section_padding: "48px"
motion:
  ease_standard: "cubic-bezier(0.22, 1, 0.36, 1)"
  duration_fast: "160ms"
  duration_normal: "380ms"
---

# Design specification — Monochrome Studio

## Visual identity

The portfolio uses its original monochrome studio language: black matte surfaces, sharp white type, and controlled technical color inside real project diagrams. Syne carries display hierarchy; Geist and Geist Mono keep body copy and metadata readable.

Motion is reserved for the loading sequence, project carousel, skill graph, real-project visuals, and navigation feedback. It never implies a system status, score, or capability that has not been verified.

## Composition

- First viewport: animated name, focus areas, clear actions, a subtle Three.js constellation, and a rotating reel of real project work.
- About: an engineering statement, academic background, and credentials.
- Skills: a force-directed map grounded in `resumeData` and project evidence.
- Work: six verified projects in a draggable spring deck with expandable evidence.
- Contact: direct channels and a standard HTML inquiry form.

WebMCP, agent controls, synthetic telemetry, unverified scores, and fabricated live-status labels are absent from the runtime.

## Motion and 3D

`src/components/3d/HeroThreeBackground.tsx` is a lightweight, client-only constellation that responds gently to pointer movement. It caps device pixel ratio, pauses when out of view, and uses a static fallback when WebGL is unavailable.

The skill graph and project deck expose controls for keyboard and pointer use. Project claims remain sourced from `projectEvidence` rather than animation labels.

## Interaction rules

- Every interactive control has visible keyboard focus.
- Forms use 16px-or-larger controls on narrow screens.
- Status messages use `aria-live` and preserve user input on failure.
- Reduced-motion users receive equivalent static states.
- Motion communicates reveal, selection, or feedback only.
