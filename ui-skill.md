# Snapsec / Clutch Website UI Design System (ui-skill.md)

This document provides complete instructions, visual standards, and code structures for creating new pages or components for the Snapsec/Clutch website clone. It defines the layout patterns, colors, typography, spacing, buttons, and micro-interactions to ensure any AI-generated page matches the existing pages pixel-for-pixel.

---

## 1. Core Visual Principles & Layout Grid

The website design uses a **retro-futuristic, high-contrast, technical grid aesthetic**. It is structured around clean layout containers, thin borders, high-contrast typography, and smooth micro-animations.

### Section Border Grid Pattern
All sections in the main content must align to a strict vertical grid. Each section follows this structure:
```jsx
export default function NewSection() {
  return (
    <section className="overflow-hidden">
      <div className="container">
        {/* The wrapper div defines left/right borders and top border to continue the grid lines */}
        <div className="section-border section-border-top px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px">
          {/* Section content goes here */}
        </div>
      </div>
    </section>
  );
}
```
*   **`.container`**: Limits width and centers the layout across standard breakpoints.
*   **`.section-border`**: Adds left and right borders: `border-left: 0.5px solid #D9D9D9; border-right: 0.5px solid #D9D9D9;` (using gray-600).
*   **`.section-border-top`**: Adds a top border: `border-top: 0.5px solid #D9D9D9;` to separate vertical blocks cleanly.

---

## 2. Spacing & Responsive Padding

All spacing, padding, and margins are managed using custom theme variables in Tailwind v4. The system defines standard responsive breakpoints and spacing scales.

### Breakpoint Specifications
*   **Mobile (`sm`)**: `< 768px` (default)
*   **Tablet (`md`)**: `768px - 1000px`
*   **Desktop (`lg`)**: `1000px - 1150px`
*   **Widescreen (`xl`)**: `1300px - 1460px`
*   **Max Container Width**: `1460px` (centered via `margin: 0 auto;`)

### Standard Padding Scale
Always use the following padding definitions for sections and components:
*   **Section Inner Padding**: `px-sm py-xxl` (Mobile) $\rightarrow$ `sm:px-xl` (Tablet) $\rightarrow$ `lg:px-80px lg:py-88px` (Desktop)
*   **Spacing Values (from theme variables)**:
    *   `xxs`: `4px`
    *   `xs`: `8px`
    *   `midsm`: `12px`
    *   `sm`: `16px`
    *   `midmd`: `20px`
    *   `md`: `24px`
    *   `lg`: `32px`
    *   `xl`: `40px`
    *   `xxl`: `48px`
    *   `64px`: `64px`
    *   `72px`: `72px`
    *   `80px`: `80px`
    *   `88px`: `88px`
    *   `96px`: `96px`

---

## 3. Color Palette & Typography

The site uses a clean, high-contrast, dual-font design. High-importance headers use **Space Grotesk** (monospaced/technical-style geometric sans-serif), while body text uses **Inter** (neutral legibility).

### Color Tokens
```css
--color-primary: #004DFF;       /* Vibrant Electric Blue */
--color-secondary: #FFD600;     /* Warning Yellow */
--color-lightRose: #E6C5F7;     /* Soft Lavender/Pink Accent */
--color-accent: #D9E4FF;        /* Light Ice Blue Background */
--color-white: #FFFFFF;         /* Page Base Background */
--color-black: #000000;         /* Primary Text & Dark Panels */

/* Neutral Grays */
--color-gray-50: #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #EEEEEE;
--color-gray-300: #F0F0F0;
--color-gray-400: #DFDFDF;
--color-gray-500: #BDBDBD;
--color-gray-600: #D9D9D9;      /* Default border color */
--color-gray-700: #C4C4C4;
--color-gray-800: #757575;
--color-gray-900: #6E6E6E;      /* Secondary body text color */
--color-gray-1000: #333333;
```

### Typography Classes
Always use the predefined CSS typography classes rather than manual sizing:

| CSS Class Name | Font Family | Default Weight | Description & Size Behavior |
| :--- | :--- | :--- | :--- |
| **`.heading-hero`** | Space Grotesk | `600` | Fluid hero headers (`40px` to `68px` clamp) |
| **`.heading-h1`** | Space Grotesk | `600` | Section/main page headers (`36px` to `56px` clamp) |
| **`.heading-h2`** | Space Grotesk | `600` | Mid-page core section headings (`32px` to `50px` clamp) |
| **`.heading-h3`** | Space Grotesk | `600` | Subsection headings (`28px` to `46px` clamp) |
| **`.heading-h4`** | Space Grotesk | `600` | Smaller panel or card group headers (`24px` to `40px` clamp) |
| **`.heading-h5`** | Space Grotesk | `600` | Small block titles (`22px` to `32px` clamp) |
| **`.heading-h6`** | Space Grotesk | `600` | Card label titles (`20px` to `26px` clamp) |
| **`.body-heading-xl`** | Space Grotesk | `600` | Large label/value headers (`24px`) |
| **`.body-heading-m`** | Space Grotesk | `600` | Standard card/interactive section title (`20px`) |
| **`.body-text-l`** | Inter | `400` | Large body reading copy (`17px`, line-height `150%`) |
| **`.body-text-m`** | Inter | `400` | Standard body description (`16px`, line-height `150%`) |
| **`.body-text-s`** | Inter | `400` | Smaller description details (`15px`, line-height `150%`) |
| **`.body-text-xs`** | Inter | `400` | Metadata / small print / sub-labels (`14px`) |
| **`.subtitle-m`** | Space Grotesk | `400` | Elegant paragraph intro texts (`20px`, tracking `0.02em`) |
| **`.large-paragraph-m`** | Space Grotesk | `400` | High-impact callout quotes (`24px` to `38px` clamp) |
| **`.label-text-m`** | Space Grotesk | `500` | Small uppercase tags / tags text (`12px`, tracking `0.16em`) |

---

## 4. UI Component Blueprints

### 4.1 Buttons
Buttons have strict dimensions, border-radii, and hover transitions. 

#### A. Black Primary Button (Solid Gradient)
Used for primary call-to-actions (e.g., "Request Demo").
```jsx
<a href="/target" className="button-primary-m">
  <span>Label Text</span>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</a>
```
*   *CSS Properties*: Background is a gradient from `#191919` to `#000`. Overlays a subtle white glow opacity on hover. Height is `44px` (or `38px` for `.button-primary-s`).

#### B. Outline/Ghost Button
Used for secondary actions.
```jsx
<a href="/target" className="button-ghost-m">
  <span>Secondary Label</span>
</a>
```
*   *CSS Properties*: `border: 1px solid #000; background: transparent; color: #000;` On hover, it flips to `background: #000; color: #fff;`.

#### C. Accent Blue Button
```jsx
<button className="button-cta-m">
  <span>Primary Blue Action</span>
</button>
```
*   *CSS Properties*: `background-color: #004DFF; color: #FFFFFF;` Height is `44px`. On hover, opacity lowers to `0.8`.

---

## 5. Micro-Animations & Interactivity

The site utilizes `framer-motion` and `react-intersection-observer` to activate layout elements smoothly as the user scrolls.

### Scroll-Triggered Fade-In-Up Pattern
Wrap list items or text components in scroll animations to make the page feel reactive and alive:
```jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FadeInBlock({ children }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
```

### Hover Effects
1.  **`.hover-lift`**: Elevates card items by applying an offset translation and casting a stark solid black shadow:
    `transform: translate(-2px, -2px); box-shadow: 3px 3.5px 0 0 #000;`
2.  **`.underline-link`**: Creates a sleek anchor underline that matches the text color. The line smoothly shrinks to zero width on hover.

---

## 6. Structure Blueprint: Creating a New Page Section

To create a new section matching the layout (e.g., an About Us leadership row or Features list):

1.  **Outer Wrap**: Establish the `section` tag and `.container` boundary.
2.  **Visual Grid lines**: Set `.section-border` (and `.section-border-top` if it sits under another block).
3.  **Section Padding**: Apply `px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px`.
4.  **Layout Splits**: For columns, use a grid layout. Standard column templates include:
    *   **2 Columns (Split 50/50)**: `grid grid-cols-1 lg:grid-cols-2 gap-xl`
    *   **3 Columns (Equal Cards)**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg`
5.  **Headers**: Pair a small colored category label tag (using `.label-text-m`) with a large heading (using `.heading-h2`).
6.  **Dividers**: Separate long card lists or rows using `border-bottom: 0.5px solid #000;` (e.g. leadership list or expert rows).

Use these patterns systematically to maintain absolute visual consistency across all pages.
