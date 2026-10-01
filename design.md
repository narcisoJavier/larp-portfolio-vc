---
colors:
  canvas: "#08090e"
  surface: "#10131b"
  surface_raised: "#161b26"
  surface_soft: "#202838"
  ink: "#f2f6ff"
  ink_muted: "#aeb9cc"
  ink_subtle: "#77839a"
  border: "rgba(216, 229, 255, 0.14)"
  border_strong: "rgba(216, 229, 255, 0.32)"
  accent: "#67d8ff"
  accent_secondary: "#a78bfa"
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

The portfolio is an evidence-led engineering portfolio with a tactile, kinetic feel. Midnight surfaces create depth. Newsreader gives the work a human editorial voice. Geist keeps explanations readable. Geist Mono marks only technical metadata.

Cool cyan carries focus, action, and selected route state. Violet adds depth inside motion previews only. Color never substitutes for labels, evidence, or controls.

## Composition

- First viewport: name, focus areas, clear actions, and the interactive route proof.
- About: one narrative, current focus, education, and credentials.
- Skills: four readable groups sourced from `resumeData`.
- Work: six verified projects in a draggable spring deck; select a card to reveal evidence without leaving the shelf.
- Contact: direct channels and one clear inquiry form.

Avoid decorative HUDs, fake telemetry, and interface labels without a user-facing job. Keep meaningful movement: spring dragging, card selection, project-diagram animation, and clear navigation transitions.

## Three.js route proof

`src/components/3d/PathfindingLab.tsx` visualizes a deterministic graph inspired by the Campus Navigator shortest-path service. Users select start and destination nodes through native controls or click a destination node in the scene. The calculated route appears in both the scene and an accessible route list.

The canvas is client-only, lazy-loaded, capped to a low-power device-pixel ratio, paused outside the viewport where possible, and replaced by a semantic route list when WebGL is unavailable.

## Interaction rules

- Every interactive control has visible keyboard focus.
- Forms use 16px-or-larger controls on narrow screens.
- Status messages use `aria-live` and preserve user input on failure.
- Reduced-motion users receive equivalent static states.
- Motion communicates reveal, selection, or feedback only.
