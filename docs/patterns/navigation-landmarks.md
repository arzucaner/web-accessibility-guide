# Navigation & Landmarks

> **Last reviewed:** 2026-02-16

Landmarks and skip links give keyboard and screen reader users a fast way to move around a page. Get these right and every other accessibility pattern becomes easier to use.

---

## Skip to content

A skip link is the first focusable element on the page. It lets keyboard users jump past repeated navigation straight to the main content.

```html
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header>…</header>
  <nav>…</nav>

  <main id="main" tabindex="-1">
    <!-- page content -->
  </main>

  <footer>…</footer>
</body>
```

Key points:

- The link **must** be visible on focus (it can be visually hidden off-screen until focused).
- The `href` target (`#main`) must match the `id` of the main content container.
- Add `tabindex="-1"` to the target so it receives focus programmatically in all browsers.

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  z-index: 1000;
}

.skip-link:focus {
  position: fixed;
  top: 8px;
  left: 8px;
  padding: 12px 16px;
  background: #000;
  color: #fff;
  font-size: 16px;
  z-index: 10000;
}
```

---

## Landmarks

Use semantic HTML elements so assistive tech can expose the page structure automatically — no extra ARIA needed.

### Good structure example

```html
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header>
    <p>Site tagline</p>
    <nav aria-label="Main">
      <a href="/about">About</a>
      <a href="/guides">Guides</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <div class="layout">
    <aside aria-label="Sidebar">
      <h2>Quick links</h2>
      <!-- sidebar content -->
    </aside>

    <main id="main" tabindex="-1">
      <h1>Page title</h1>
      <!-- primary content -->
    </main>
  </div>

  <footer>
    <p>&copy; 2026 Example. All rights reserved.</p>
    <nav aria-label="Footer">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </nav>
  </footer>
</body>
```

### Landmark mapping

| HTML element | Implicit ARIA role | Notes |
|---|---|---|
| `<header>` (top-level) | `banner` | One per page (top-level only) |
| `<nav>` | `navigation` | Label each if there are multiple |
| `<main>` | `main` | Exactly one per page |
| `<aside>` | `complementary` | Label if more than one |
| `<footer>` (top-level) | `contentinfo` | One per page (top-level only) |
| `<section>` with label | `region` | Only becomes a landmark when labelled |

### Labelling multiple landmarks

When a page has more than one `<nav>` or `<aside>`, give each a unique label so screen reader users can tell them apart.

```html
<nav aria-label="Main">…</nav>
<nav aria-label="Footer">…</nav>
```

---

## Keyboard behavior

- **Tab** moves between focusable elements in DOM order.
- The skip link is the **first** Tab stop. Pressing Enter jumps focus to `<main>`.
- After that, Tab moves through nav links, then into the main content.
- Within `<main>`, Tab follows the DOM order of interactive elements.
- Landmark navigation is primarily a **screen reader** feature (keyboard shortcut), not Tab-based.

Expected tab order for the example above:

1. Skip link
2. About (nav)
3. Guides (nav)
4. Contact (nav)
5. Sidebar links (aside)
6. Main content interactive elements
7. Footer links

---

## Screen reader notes

### Landmarks list

Screen readers let users list all landmarks on a page:

- **NVDA:** Insert + F7 → Elements list → Landmarks
- **VoiceOver (macOS):** Rotor → Landmarks (VO + U, then arrow to Landmarks)
- **JAWS:** Insert + Ctrl + ; (semicolon) — or Insert + F3

If landmarks are correctly labelled, the list looks like:

```
banner
navigation "Main"
complementary "Sidebar"
main
contentinfo
navigation "Footer"
```

### Headings

Landmarks and headings work together. Screen reader users often navigate by headings **within** a landmark. Make sure:

- `<main>` starts with the page `<h1>`.
- Each landmark section has an appropriate heading if it has significant content.

---

## Common pitfalls

### Multiple `<main>` elements

Only one `<main>` should be visible at a time. If you use `showSection()`-style toggling, every section lives inside a single `<main>` — don't wrap each section in its own `<main>`.

### Missing skip link target

If the `href="#main"` points to an `id` that doesn't exist, the skip link does nothing. Always verify the `id` matches.

### Target not focusable

Some browsers don't move focus to a non-focusable element on hash navigation. Add `tabindex="-1"` to the skip link target so focus actually moves there.

### Skip link hidden permanently

The skip link must become **visible on focus**. Using `display: none` or `visibility: hidden` removes it from the focus order entirely — use off-screen positioning instead.

### No landmark labels on duplicates

Two `<nav>` elements without labels both appear as "navigation" in the landmarks list. Users can't tell them apart.

### Focus styles removed

Landmarks are navigated by screen readers, but skip links are navigated by keyboard. If `outline: none` is applied globally, the skip link becomes invisible when focused.

---

## Quick test

1. **Tab from the top of the page.** Is the skip link the first thing focused? Is it visible on focus?
2. **Press Enter on the skip link.** Does focus move to the main content area?
3. **Open the screen reader landmarks list.** Are all landmarks present? Are duplicate landmarks labelled uniquely?
4. **Tab through the full page.** Does focus order follow a logical reading sequence?
5. **Check for exactly one `<main>`.** Inspect the DOM — only one should be present (or visible).
6. **Verify headings inside landmarks.** Does `<main>` start with `<h1>`? Do other landmark sections have headings?
