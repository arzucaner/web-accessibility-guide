# Navigation & Landmarks

> **Last reviewed:** 2026-02-16

## Intro

This page shows a practical pattern for skip links and semantic landmarks. It helps keyboard and screen reader users move through pages faster and with less guesswork. Use it as a quick implementation and QA reference.

## Skip link pattern

A skip link is a "skip to main content" link near the top of the page. It should be visually hidden by default, then become visible when focused so keyboard users can find it.

This helps keyboard users skip repeated navigation, and gives screen reader users an early, reliable jump point.

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header>
    <nav aria-label="Primary navigation">
      <a href="/">Home</a>
      <a href="/guides">Guides</a>
      <a href="/about">About</a>
    </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h1>Page title</h1>
    <p>Main page content...</p>
  </main>

  <footer>...</footer>
</body>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
}

.skip-link:focus {
  left: 8px;
  top: 8px;
  padding: 8px 12px;
  background: #000;
  color: #fff;
  z-index: 1000;
}
```

The target must exist (`href="#main-content"` and `id="main-content"` must match), and in practice the target should be focusable or landable (for example with `tabindex="-1"`).

## Landmarks and page structure

Use semantic regions so assistive tech can expose page structure without extra ARIA:

- `<header>` for site/page banner content
- `<nav>` for navigation blocks
- `<main>` for the page's primary content (normally one `<main>` per page)
- `<footer>` for page/site footer content
- `<aside>` for secondary or complementary content (optional)

```html
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header>
    <h1>Accessibility Guide</h1>
    <nav aria-label="Primary navigation">
      <a href="/patterns">Patterns</a>
      <a href="/testing">Testing</a>
    </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h2>Navigation and landmarks</h2>
    <p>...</p>
  </main>

  <aside aria-label="Related resources">
    <a href="/checklist">Quick checklist</a>
  </aside>

  <footer>
    <nav aria-label="Footer navigation">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </nav>
  </footer>
</body>
```

If you have multiple navigation landmarks, label each one clearly (for example `aria-label="Primary navigation"` and `aria-label="Footer navigation"`).

## Keyboard behavior

- Skip link should be the first or one of the earliest Tab stops.
- Focus states must stay visible for links, buttons, and menu controls.
- Navigation menus must not create keyboard traps.
- If a menu collapses/expands, users must still be able to open, move through, and close it using the keyboard.

## Screen reader notes

- Landmarks let users jump quickly between page regions.
- Headings and landmarks should complement each other, not compete.
- If there are multiple navigation regions, each should have a clear unique label.

## Common pitfalls

- Missing skip link target `id` (link points nowhere).
- Skip link is hidden and never becomes visible on focus.
- Multiple `<main>` elements on one page.
- Generic `div` containers used instead of semantic regions.
- Focus outline removed (`outline: none`) with no equivalent visible style.
- Multiple unlabeled `<nav>` landmarks.

## Quick test steps

1. **Keyboard-only test:** Press Tab from the top of the page. Confirm skip link appears early, activates with Enter, and moves to main content.
2. **Focus visibility test:** Tab through header/nav/main/footer controls and verify a clear visible focus indicator at each step.
3. **Screen reader landmarks sanity check:** Open landmarks list and confirm regions are present and multiple nav landmarks are uniquely labeled.
4. **Zoom/reflow quick check:** At 200% zoom (and narrow viewport), confirm skip link and navigation remain usable without hidden or unreachable controls.
