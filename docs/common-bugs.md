# Common Accessibility Bugs & Fixes

> **Last reviewed:** 2026-02-16

A practical reference for developers and QA. Each entry explains what goes wrong, why it matters, and exactly how to fix it. Keep this page bookmarked — these bugs show up in almost every audit.

---

## Table of contents

1. [Clickable div/span instead of button or link](#1-clickable-divspan-instead-of-button-or-link)
2. [Link vs button confusion](#2-link-vs-button-confusion)
3. [Missing or incorrect form labels](#3-missing-or-incorrect-form-labels)
4. [Error messages not connected to fields](#4-error-messages-not-connected-to-fields)
5. [Focus not visible / outline removed](#5-focus-not-visible--outline-removed)
6. [Modal focus trap missing](#6-modal-focus-trap-missing)
7. [Incorrect heading structure](#7-incorrect-heading-structure)
8. [Missing accessible name for icon-only buttons](#8-missing-accessible-name-for-icon-only-buttons)
9. [Misuse of ARIA](#9-misuse-of-aria)
10. [Keyboard trap](#10-keyboard-trap)
11. [Color-only meaning](#11-color-only-meaning)
12. [Live region misuse or missing](#12-live-region-misuse-or-missing)

---

## 1. Clickable div/span instead of button or link

### Symptoms

- A `<div>` or `<span>` with an `onclick` handler looks interactive but can't be reached by keyboard.
- Screen readers announce it as generic text, not an action.

### Why it matters

- Keyboard users can't activate it at all.
- Screen readers don't expose it as interactive.

### How to fix

Use a real `<button>` (for actions) or `<a>` (for navigation). They give you keyboard access, focus, and correct role for free.

```html
<!-- Bad -->
<div class="btn" onclick="save()">Save</div>

<!-- Good -->
<button type="button" onclick="save()">Save</button>
```

### Quick test

Tab to the element. Can you activate it with **Enter** or **Space**? Does a screen reader announce "Save, button"?

---

## 2. Link vs button confusion

### Symptoms

- A `<button>` navigates to a new page, or an `<a href="#">` performs an in-page action.
- Screen reader users expect one behavior but get another.

### Why it matters

- Links navigate; buttons act. Mixing them breaks user expectations.
- Screen readers announce "link" or "button" — the wrong label is confusing.

### How to fix

- Use `<a href="...">` when the user goes somewhere.
- Use `<button>` when the user triggers an action (open modal, submit, toggle).

```html
<!-- Bad: link that acts like a button -->
<a href="#" onclick="openModal()">Settings</a>

<!-- Good -->
<button type="button" onclick="openModal()">Settings</button>
```

### Quick test

Activate the element. Does it navigate or perform an action? Match the element to the behavior.

---

## 3. Missing or incorrect form labels

### Symptoms

- Inputs rely on `placeholder` as the only label.
- Screen readers announce "edit text, blank" with no field name.
- The placeholder disappears when the user starts typing.

### Why it matters

- Users can't identify the field once they start typing.
- Screen readers need a programmatic label to announce the field.

### How to fix

Add a visible `<label>` linked to the input with `for`/`id`.

```html
<!-- Bad -->
<input type="email" placeholder="Email">

<!-- Good -->
<label for="email">Email</label>
<input id="email" type="email" placeholder="you@example.com">
```

### Quick test

Click the label text. Does focus move to the input? Does a screen reader announce the label when the input is focused?

---

## 4. Error messages not connected to fields

### Symptoms

- An error message appears on screen but the screen reader doesn't announce it when the field is focused.
- Users don't know which field the error belongs to.

### Why it matters

- Sighted users can visually associate errors with fields. Screen reader users cannot unless the connection is programmatic.

### How to fix

Link the error to its field with `aria-describedby`. Use `aria-live` or `role="alert"` so the error is announced when it appears.

```html
<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-error">
<div id="email-error" role="alert" aria-live="assertive">
  Please enter a valid email address.
</div>
```

### Quick test

Submit an invalid form. Does the screen reader announce the error message? When you Tab to the field, is the error read as part of the field description?

---

## 5. Focus not visible / outline removed

### Symptoms

- `outline: none` or `outline: 0` in CSS with no replacement style.
- Keyboard users can't tell which element is focused.

### Why it matters

- Focus visibility is a WCAG 2.2 Level AA requirement (2.4.7 / 2.4.11).
- Without it, keyboard navigation is unusable.

### How to fix

Never remove the outline without providing a clear replacement. Use `:focus-visible` so the indicator shows for keyboard but not mouse clicks.

```css
/* Bad */
button:focus { outline: none; }

/* Good */
button:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

### Quick test

Tab through the page. Can you always tell which element has focus?

---

## 6. Modal focus trap missing

### Symptoms

- A modal opens but Tab moves focus to elements behind the overlay.
- Pressing Escape does nothing.
- After closing, focus jumps to the top of the page instead of returning to the trigger.

### Why it matters

- Keyboard users get lost behind the modal.
- Screen reader users may not realize a modal is open.

### How to fix

1. Move focus into the modal on open.
2. Trap Tab/Shift+Tab inside the modal.
3. Close on Escape.
4. Return focus to the trigger element on close.

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm action</h2>
  <p>Are you sure?</p>
  <button type="button">Yes</button>
  <button type="button" id="modal-close">Cancel</button>
</div>
```

### Quick test

Open the modal. Press Tab repeatedly — does focus stay inside? Press Escape — does the modal close? Is focus back on the button that opened it?

---

## 7. Incorrect heading structure

### Symptoms

- Multiple `<h1>` elements on one page.
- Heading levels skip (e.g., h1 → h3 with no h2).
- Headings chosen for visual size, not document structure.

### Why it matters

- Screen reader users navigate by headings. Skipped levels create confusion about the page hierarchy.
- A single `<h1>` establishes the page topic.

### How to fix

Use one `<h1>` per page. Nest headings sequentially: h1 → h2 → h3. Use CSS for visual sizing.

```html
<!-- Bad -->
<h1>Welcome</h1>
<h1>About us</h1>
<h4>Our team</h4>

<!-- Good -->
<h1>Welcome</h1>
<h2>About us</h2>
<h3>Our team</h3>
```

### Quick test

Open the screen reader heading list (NVDA: **Insert+F7**, VoiceOver: **Rotor → Headings**). Is the structure logical?

---

## 8. Missing accessible name for icon-only buttons

### Symptoms

- A button contains only an SVG or icon font — no text.
- Screen readers announce "button" with no label.

### Why it matters

- Users have no way to know what the button does.

### How to fix

Add `aria-label` to the button and `aria-hidden="true"` to the icon.

```html
<!-- Bad -->
<button><svg>…</svg></button>

<!-- Good -->
<button aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>
```

### Quick test

Focus the button with a screen reader. Does it announce a meaningful name (e.g., "Close dialog, button")?

---

## 9. Misuse of ARIA

### Symptoms

- `aria-label` duplicates visible text, causing screen readers to announce the text twice.
- `aria-hidden="true"` is set on a focusable element, making it invisible to screen readers but still keyboard-reachable.
- `role="button"` on a `<div>` without keyboard handling.

### Why it matters

- Bad ARIA is worse than no ARIA — it overrides native semantics with incorrect information.

### How to fix

- Don't add `aria-label` if the visible text is already the label.
- Never put `aria-hidden="true"` on an element that can receive focus.
- Prefer native elements over ARIA roles.

```html
<!-- Bad: aria-label duplicates visible text -->
<button aria-label="Save">Save</button>

<!-- Good: visible text IS the accessible name -->
<button>Save</button>

<!-- Bad: aria-hidden on focusable -->
<button aria-hidden="true">X</button>

<!-- Good: remove from tab order too, or don't hide it -->
<button aria-label="Close">X</button>
```

### Quick test

Run axe or Lighthouse. Check for "ARIA hidden element is focusable" and "Elements have identical accessible name and visible text" warnings.

---

## 10. Keyboard trap

### Symptoms

- Focus enters a component (e.g., embedded widget, video player) and Tab/Escape cannot move it out.
- The user is stuck.

### Why it matters

- WCAG 2.1.2 (Level A): there must be no keyboard trap.
- It makes the page completely unusable for keyboard users.

### How to fix

Ensure every component allows Tab or Escape to move focus out. If focus is intentionally trapped (e.g., a modal), provide a clear exit (close button + Escape key).

### Quick test

Tab into the component. Can you Tab or Escape out without using a mouse?

---

## 11. Color-only meaning

### Symptoms

- Errors are shown only with a red border — no icon, no text.
- Required fields are indicated only by a colored asterisk with no label.
- Chart data relies on color alone to distinguish series.

### Why it matters

- Color-blind users can't distinguish the colors.
- Low-vision users or those in bright sunlight may miss the cue entirely.

### How to fix

Add a non-color indicator: text, icon, pattern, or underline.

```html
<!-- Bad: only color signals the error -->
<input style="border-color: red;">

<!-- Good: color + text + icon -->
<input aria-describedby="name-error" aria-invalid="true"
       style="border-color: red;">
<div id="name-error" role="alert">
  ⚠ Name is required.
</div>
```

### Quick test

View the page in grayscale (browser DevTools → Rendering → Emulate vision deficiency → Achromatopsia). Can you still understand all information?

---

## 12. Live region misuse or missing

### Symptoms

- A toast notification appears but screen readers don't announce it.
- An `aria-live` region is injected dynamically into the DOM — but live regions must exist *before* content is added.
- Using `aria-live="assertive"` for low-priority messages interrupts the user.

### Why it matters

- Screen reader users miss important updates entirely, or get interrupted by trivial ones.

### How to fix

1. Place the live region in the DOM on page load (empty is fine).
2. Update its text content when the message appears.
3. Use `polite` for status updates, `assertive` only for urgent errors.

```html
<!-- In your HTML (on page load, empty) -->
<div id="toast-region" aria-live="polite" aria-atomic="true"></div>

<!-- In JS, when a toast fires -->
<script>
document.getElementById('toast-region').textContent =
  'Your changes have been saved.';
</script>
```

### Quick test

Trigger the notification with a screen reader running. Is the message announced? Does it interrupt what the user was doing (assertive) or wait (polite)?
