# HIEZY Design Tokens

This file translates the current HIEZY visual direction into implementation-ready tokens for future design and front-end work.

## Base Tokens

```css
:root {
  --ink: #0b1220;
  --paper: #fbfbfc;
  --slate: #64748b;
  --slate-2: #475569;
  --border: rgba(15, 23, 42, 0.10);
  --brand-blue: #0ea5e9;
  --accent: #1d4ed8;
}
```

## Semantic Roles

- `--ink`: primary headlines, key copy, strong icon color
- `--paper`: primary page background
- `--slate`: secondary text
- `--slate-2`: stronger support text and UI metadata
- `--border`: low-noise dividers and card outlines
- `--brand-blue`: primary logo and signature brand blue
- `--accent`: darker action blue for CTAs, active states, and trust highlights

## Typography Tokens

```css
:root {
  --font-display: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Source Serif 4", ui-serif, Georgia, serif;
}
```

## Radius Tokens

```css
:root {
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;
}
```

## Shadow Tokens

```css
:root {
  --shadow-soft: 0 1px 0 rgba(15, 23, 42, 0.05), 0 16px 40px rgba(15, 23, 42, 0.08);
  --shadow-soft-hover: 0 1px 0 rgba(15, 23, 42, 0.06), 0 24px 60px rgba(15, 23, 42, 0.12);
}
```

## Focus Token

```css
:root {
  --focus-ring: 0 0 0 4px rgba(29, 78, 216, 0.20);
}
```

## Surface Guidance

- Primary surfaces: white or near-white with soft borders
- Elevated surfaces: translucent white with blur only when contrast remains strong
- Blue surfaces: use brand-blue tint washes rather than dense, saturated backgrounds for large areas

## Spacing Guidance

Use a 4px base spacing rhythm. Favor generous vertical spacing in marketing pages.

Suggested scale:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64
- 96

## Component Mapping

- Primary button: `--accent` background, white text, `--radius-md`, visible focus ring
- Secondary button: white or translucent background, `--border`, `--ink` text
- Section container: `--paper` base with selective glow or gradient wash
- Card: white surface, subtle border, soft shadow, rounded corners

## Usage Notes

- HIEZY's primary brand and logo color is `#0EA5E9`.
- The token system should stay restrained. The brand wins through hierarchy and clarity, not a high number of decorative values.
- Add new tokens only when a repeated pattern appears in multiple screens.
- Prefer semantic token naming once the design system expands into product UI.
