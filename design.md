---
colors:
  canvas: "#0c0d0b"
  surface: "#121411"
  surface_raised: "#181b16"
  surface_soft: "#20241d"
  ink: "#f1f2e9"
  ink_muted: "#a5aa9e"
  ink_subtle: "#747b6f"
  border: "rgba(241, 242, 233, 0.13)"
  border_strong: "rgba(241, 242, 233, 0.28)"
  accent: "#c6f36b"
typography:
  display: "Newsreader, Georgia, serif"
  body: "Geist, Arial, sans-serif"
  code: "Geist Mono, monospace"
spacing:
  base_unit: "4px"
  content_max_width: "1320px"
  section_padding: "clamp(72px, 9vw, 128px)"
motion:
  ease_standard: "cubic-bezier(0.22, 1, 0.36, 1)"
  duration_fast: "160ms"
  duration_normal: "380ms"
---

# Design specification — Refined Dark Studio

## Visual identity

The portfolio is a quiet, evidence-led engineering portfolio. Dark matte surfaces create focus. Newsreader gives the work a human editorial voice. Geist keeps explanations readable. Geist Mono marks only technical metadata.

The acid-lime accent has one job: focus, action, and selected route state. No competing cyan, violet, amber, or emerald status palette.

## Composition

- First viewport: name, focus areas, clear actions, and the interactive route proof.
- About: one narrative, current focus, education, and credentials.
- Skills: four readable groups sourced from `resumeData`.
- Work: six project case-study cards with verified evidence.
- Contact: direct channels and one clear inquiry form.

Avoid decorative HUDs, fake telemetry, repeated corner marks, full-page grids, and interface labels without a user-facing job.

## Three.js route proof

`src/components/3d/PathfindingLab.tsx` visualizes a deterministic graph inspired by the Campus Navigator shortest-path service. Users select start and destination nodes through native controls or click a destination node in the scene. The calculated route appears in both the scene and an accessible route list.

The canvas is client-only, lazy-loaded, capped to a low-power device-pixel ratio, paused outside the viewport where possible, and replaced by a semantic route list when WebGL is unavailable.

## Interaction rules

- Every interactive control has visible keyboard focus.
- Forms use 16px-or-larger controls on narrow screens.
- Status messages use `aria-live` and preserve user input on failure.
- Reduced-motion users receive equivalent static states.
- Motion communicates reveal, selection, or feedback only.
