# Static Pages

# Static Pages Module (index.html & inspirations.html)

## 1. Purpose
The **Static Pages** module provides the public‑facing website for *Hiezy Web Solutions*.  
It is a pure‑HTML/CSS/JS bundle that:

* Renders the home, services, and contact sections.
* Drives UI interactions (preloader, navigation, mobile sheet, 3‑D tilt, video overlay, form wizard, scroll‑based progress bar, back‑to‑top button, scroll‑reveal animations, and the Design Inspirations hub).
* Pulls brand assets and dynamic content from `data/content.js` via the global `HIEZY` object.
* Loads third‑party widgets (Google Translate, GTranslate, Aminos chat) **after** the preloader finishes.

Because the pages are static, there is no server‑side routing or API layer; all navigation is handled by hash anchors (`#home`, `#services`, `#contact`, etc.).

---

## 2. High‑Level Architecture

```mermaid
flowchart TD
    A[HTML (index.html)] --> B[CSS (Tailwind + style.css)]
    A --> C[JS Core]
    C -->|preloader| P[Preloader Logic]
    C -->|nav| N[IntersectionObserver + active‑underline]
    C -->|mobile| M[Mobile Bottom Sheet]
    C -->|tilt| T[Physics‑based 3D Tilt & Lift]
    C -->|video| V[Intro Video Overlay]
    C -->|inspirations| I[Design Inspirations Hub]
    C -->|form| F[Quote Form Wizard]
    C -->|progress| R[Perimeter Scroll Progress Bar]
    C -->|back‑to‑top| BTT[Back‑to‑Top Button]
    C -->|reveal| SR[Scroll‑Reveal (IntersectionObserver)]
    C -->|third‑party| TP[Load GTranslate & Aminos after preloader]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
```

*Only the JavaScript block (`<script>` tags) contains the runtime logic; the rest is declarative markup.*

---

## 3. Key Components

### 3.1. Global Assets (loaded from `data/content.js`)
```js
// Example structure (actual file not shown)
window.HIEZY = {
  brand: {
    logo:      "assets/images/brand/hiezy-logo.png",
    logoAlt:   "Hiezy Logo",
    favicon:   "assets/images/brand/favicon.png"
  },
  inspirations: {
    landing: [{title, description, img1, img2, tags}, …],
    ecommerce: [{…}],
    dashboards: [{…}]
  }
};
```
* The script `data/content.js` is loaded **before** any UI code, allowing the page to inject logos, favicons, and the inspiration gallery data at runtime.

### 3.2. Preloader (`#preloader`)
* **Elements**: logo image, progress bar (`#preloader-bar`), knob (`#preloader-knob`), percentage text.
* **Logic** (`preloader` IIFE):
  1. Starts at **20 %** to give immediate feedback.
  2. Tracks all `<img>` and `<video>` elements; each successful load increments `loadedAssets`.
  3. `targetProgress = 20 + (loaded/total) * 75` → smooth LERP animation toward 95 % while assets load.
  4. On `window.load` → `targetProgress = 100`; when the animation reaches ~99.5 % the preloader slides out (`transform: translateY(-100%)`).
  5. After a short delay, **third‑party scripts** (GTranslate, Aminos chat) are injected.

### 3.3. Header & Sticky Navigation
* **HTML**: `<header>` with logo (`#nav-logo`) and three navigation links (`data-nav="home|services|contact"`).
* **JS** (`IntersectionObserver`):
  * Observes the three main sections (`#home`, `#services`, `#contact`).
  * Adds `active-underline` + `text-ink` to the link whose section has the highest intersection ratio.
* **Accessibility**: `aria-controls`, `aria-expanded` on the mobile menu button.

### 3.4. Mobile Bottom Sheet
* **Elements**: `#mobileOverlay`, `#mobileSheet`, `#sheetHandle`, navigation links (`.sheet-link`).
* **Open/Close**:
  * `menuBtn` toggles the sheet (`translateY(0)` vs `translateY(100%)`).
  * Overlay click, link click, or swipe‑down gesture (touch events on `#sheetHandle`) close the sheet.
* **State**: `sheetOpen` boolean, body overflow locked while open.

### 3.5. 3‑D Tilt & Lift Effects
* **`setupTiltEffect(cardId, tiltIntensity, liftAmount)`** – attaches mousemove, mouseenter, mouseleave listeners to a card.
  * Uses a physics‑based LERP loop (`requestAnimationFrame`) to smoothly interpolate rotation (`rotateX/Y`) and vertical lift (`translateY`).
  * Applied to:
    * `#tilt-card` (the “Most popular” service card) – `tiltIntensity = 10`, `liftAmount = -8`.
    * `#hero-tilt-group` – lower intensity for the whole hero mock‑up.
* **Side‑card lift** (`.js-lift-card`):
  * Same LERP engine, but only vertical translation (`translateY(-8px)` on hover).

### 3.6. Hero Video Overlay
* **Elements**: `<video id="introVideo">`, overlay div `#videoOverlay`, play button `#playIcon`.
* **Behaviour**:
  * Click overlay → `introVideo.play()` and hide overlay (`opacity-0`, `pointer-events:none`).
  * Click video → pause and show overlay again.
  * `ended` event resets the video (loads first frame) and restores overlay.

### 3.7. Design Inspirations Hub
* **Data source**: `HIEZY.inspirations` (categories: `landing`, `ecommerce`, `dashboards`).
* **Controls**:
  * Tab buttons (`.inspiration-tab`) call `switchInspiration(category)`.
  * Carousel arrows inside the rendered content call `cycleProject(direction)`.
* **Rendering** (`renderInspiration()`):
  1. Adds an exit class (`inspiration-exit`) → CSS transition for fade out.
  2. After 400 ms, replaces innerHTML of `#inspiration-content` with the new project markup.
  3. Double `requestAnimationFrame` triggers the entrance transition.
* **Initialisation**: runs on `DOMContentLoaded`, injects brand logos, sets up the container’s transition classes, and renders the first landing‑page project.

### 3.8. Quote Form Wizard
* **Structure**: two steps (`#step1`, `#step2`) with a step indicator (`#stepIndicator`) and progress dots (`#dot1`, `#dot2`).
* **Validation**:
  * Live validation on all inputs (`input`, `textarea`) – shows a green check icon when the field is valid.
  * `nextBtn` validates required fields (`name`, `business`, `email`) before advancing.
* **Navigation**:
  * `nextBtn` → fades out step 1, fades in step 2, updates indicator and dot colours.
  * `backBtn` → reverse transition.
* **Submission** (`quoteForm.submit`):
  1. Validates the goal textarea.
  2. Shows a spinner on the submit button.
  3. After a simulated 800 ms delay, builds a `mailto:` URL with all form values and redirects the browser.
  4. Shows a success message (`#formMsg`) and hides the wizard UI.

### 3.9. Perimeter Scroll Progress Bar
* **Elements**: four thin divs (`#progress-top`, `#progress-right`, `#progress-bottom`, `#progress-left`) forming a rectangle around the viewport.
* **Algorithm**:
  1. Compute total perimeter `2*(W+H)`.
  2. Map scroll percentage to a length along the perimeter.
  3. Adjust the width/height of the four bars accordingly.
* **Updates** on `scroll` and `resize` (passive listeners).

### 3.10. Back‑to‑Top Button
* **Visibility**: appears only when the user scrolls within **100 px of the page bottom** (`opacity-0` → `opacity-100`).
* **Action**: smooth scroll to top on click.

### 3.11. Scroll‑Reveal
* Elements with class `reveal-init` (added by the script) are observed.
* When intersecting (`threshold: 0.1`) the class `active-reveal` is added, triggering the CSS transition defined in `<style>` (fade‑in + translateY).

### 3.12. Footer
* Dynamically injects the current year (`#year`) and brand logos (`#footer-logo`).
* Contains contact info, quick links, and a “Brands that trusted” marquee (cloned for seamless looping).

---

## 4. Interaction Flow Summary

1. **Page Load**
   * `data/content.js` → global `HIEZY`.
   * Preloader starts at 20 %.
   * Asset tracking begins; progress bar updates.
2. **When all assets are loaded (`window.load`)**
   * Preloader animates to 100 % → slides out.
   * Third‑party scripts are injected.
3. **User Navigation**
   * Sticky header stays visible.
   * IntersectionObserver updates active link.
   * Mobile users can open the bottom sheet; swipe down to dismiss.
4. **Hero Section**
   * Mouse movement over `#hero-tilt-group` tilts the mock‑up.
   * Click on the overlay plays/pauses the intro video.
5. **Design Inspirations**
   * Tab click → `switchInspiration()` → re‑render with exit/enter animation.
   * Arrow click → `cycleProject()` → next/previous project in the same category.
6. **Quote Form**
   * Step 1 → validation → Step 2.
   * Step 2 → validation → `mailto:` redirect.
   * Success message displayed; form UI hidden.
7. **Scrolling**
   * Perimeter progress bar updates continuously.
   * Elements with `reveal-init` fade in as they enter the viewport.
   * When near the bottom, the back‑to‑top button appears.
8. **Footer**
   * Year auto‑updates.
   * Logos are populated from `HIEZY.brand`.

---

## 5. Extending / Maintaining the Module

| Area | What to modify | Impact |
|------|----------------|--------|
| **Brand assets** | Update `HIEZY.brand` in `data/content.js` or replace the image files. | Changes logo/favicons across header, footer, preloader, quote form, and trusted‑brand section. |
| **Design Inspirations** | Edit `HIEZY.inspirations` JSON structure (add/remove projects, change tags, images). | New projects appear instantly; no HTML changes required. |
| **Service cards** | Edit the markup inside the three `<article>` elements under `#services`. | Visual changes only; tilt/lift effects are automatically applied via the `.js-lift-card` class. |
| **Form fields** | Add/remove inputs in `#quoteForm` and adjust validation arrays (`req1`, etc.). | Ensure new fields are added to the `mailto:` body construction. |
| **Scroll‑reveal** | Add `reveal-init` class to any new section or element. | It will fade in automatically. |
| **Preloader behaviour** | Adjust `targetProgress` calculations or the initial bump (currently 20 %). | Affects perceived loading speed; be careful not to hide real asset loading. |
| **Third‑party widgets** | Modify `loadThirdPartyScripts()` to add/remove scripts. | Widgets load only after the preloader finishes, preserving the initial UX. |
| **Responsive breakpoints** | Tailwind utility classes are used throughout; change them in the markup or extend `tailwind.config` in the inline script. | Affects layout on different screen sizes. |
| **Accessibility** | Ensure any new interactive element receives appropriate `aria-` attributes and focus styles (`focus-ring`). | Keeps the site WCAG‑compliant. |

---

## 6. Dependencies & External Resources

| Resource | Purpose | Load Timing |
|----------|---------|-------------|
| `https://cdn.tailwindcss.com` | Utility‑first CSS framework (runtime compilation). | Immediately (head). |
| `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css` | Icon font used throughout the UI. | Immediately (head). |
| Google Fonts (`Plus Jakarta Sans`, `Source Serif 4`) | Typography. | Immediately (head). |
| `data/content.js` | Global `HIEZY` object (brand + inspiration data). | Immediately (head). |
| `css/style.css` | Custom overrides (root variables, scroll‑reveal, preloader, etc.). | Immediately (head). |
| `https://platform.aminos.ai/w/chat_plugin.js` (bot 8335) | AI chat widget – loaded **after** preloader. |
| `https://cdn.gtranslate.net/widgets/latest/dropdown.js` | Google Translate dropdown – loaded **after** preloader. |
| `https://cdn.gtranslate.net/widgets/latest/dropdown.js` (via `window.gtranslateSettings`) | Configures GTranslate widget. | After preloader. |

---

## 7. Testing Checklist

1. **Preloader** – Verify the bar reaches 100 % and slides away on slow network (use throttling).  
2. **Navigation** – Active link updates when scrolling between sections; mobile sheet opens/closes and swipe works on touch devices.  
3. **Tilt/Lift** – Hover over the middle service card and hero mock‑up; ensure smooth rotation and lift.  
4. **Video** – Click overlay → video plays; click video → pauses; ends → overlay reappears.  
5. **Inspirations** – Switch tabs, cycle projects, and confirm exit/enter animations.  
6. **Form Wizard** – Required fields block “Next”; live validation icons appear; back button works; final submission opens mail client with correct data.  
7. **Scroll Progress** – Observe the perimeter bar as you scroll; it should follow the rectangle path.  
8. **Back‑to‑Top** – Scroll to the very bottom; button appears and scrolls smoothly to top.  
9. **Scroll‑Reveal** – Elements fade in when entering the viewport.  
10. **Responsive** – Test on mobile (≤ 640 px) and desktop; ensure the mobile sheet, hidden nav, and responsive typography behave correctly.  

---

## 8. File Overview

| File | Role |
|------|------|
| `index.html` | Main landing page – contains all sections, UI scripts, and markup. |
| `inspirations.html` | Placeholder page for the full gallery (currently “Coming Soon”). |
| `data/content.js` | Global data store (`window.HIEZY`). |
| `css/style.css` | Custom CSS (root variables, preloader, scroll‑reveal, custom scrollbar, etc.). |
| External assets (`assets/...`) | Images, videos, icons used throughout the UI. |

--- 

*End of documentation.*