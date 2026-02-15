# Quick Accessibility Checklist

> **Last reviewed:** 2026-02-15

## How to use

- Run through each section when building or reviewing a page.
- Check items manually — automated tools miss many of these.
- Pair with a screen reader or keyboard-only test for best coverage.

---

## 1. Keyboard & Focus

- [ ] Every interactive element is reachable with **Tab** / **Shift+Tab**.
- [ ] Focus order follows a logical reading sequence.
- [ ] A visible **focus indicator** is present on all focusable elements.
- [ ] Modals trap focus inside and return it to the trigger on close.
- [ ] **Skip to main content** link is the first focusable element.
- [ ] No keyboard traps — users can always move away from any element.

## 2. Forms & Errors

- [ ] Every input has a visible `<label>` linked via `for`/`id`.
- [ ] Required fields are marked visually **and** programmatically (`required` or `aria-required`).
- [ ] Error messages identify the field and describe the problem in text.
- [ ] Errors are linked to their field with `aria-describedby`.
- [ ] Focus moves to the first error on submission (or errors use `aria-live`).
- [ ] Autocomplete attributes are set for common fields (name, email, address).

## 3. Headings & Landmarks

- [ ] The page has exactly one `<h1>`.
- [ ] Heading levels don't skip (h1 → h2 → h3, not h1 → h3).
- [ ] Major page areas use landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`).
- [ ] Repeated landmarks have unique labels (`aria-label` or `aria-labelledby`).

## 4. Images & Media

- [ ] Every `<img>` has an `alt` attribute (empty `alt=""` for decorative images).
- [ ] Alt text is concise and describes **purpose**, not appearance.
- [ ] Complex images (charts, diagrams) have a longer text alternative nearby.
- [ ] Videos have captions; audio has transcripts.
- [ ] No content is conveyed only through images of text.

## 5. Color & Contrast

- [ ] Text contrast is at least **4.5:1** (normal text) or **3:1** (large text / UI components).
- [ ] Color is **never the only** way to convey information (add icons, text, or patterns).
- [ ] Links are distinguishable from surrounding text (underline or 3:1 contrast + non-color cue).
- [ ] UI works in **high contrast mode** and with custom colors.

## 6. Responsive / Zoom / Reflow

- [ ] Content reflows into a single column at **320 CSS px** wide (no horizontal scroll).
- [ ] Page is usable at **200% browser zoom** with no content loss or overlap.
- [ ] Touch targets are at least **44 × 44 CSS px**.
- [ ] No information depends on a specific orientation (portrait or landscape).

## 7. Motion & Animations

- [ ] All non-essential animation is disabled when `prefers-reduced-motion: reduce` is active.
- [ ] No content flashes more than **3 times per second**.
- [ ] Auto-playing content can be **paused, stopped, or hidden**.
- [ ] Parallax, carousels, and auto-scrolling have user controls.

## 8. Notifications (aria-live)

- [ ] Status messages use `aria-live="polite"` (or `role="status"`).
- [ ] Urgent alerts use `aria-live="assertive"` (or `role="alert"`).
- [ ] Live regions exist in the DOM **before** content is injected.
- [ ] Notifications are concise — screen readers announce the full content.
- [ ] Toast / snackbar messages are not the **only** way to confirm an action.
