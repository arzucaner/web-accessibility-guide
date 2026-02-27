# Alerts, Toasts & Live Regions

> **Last reviewed:** 2026-02-16

## Intro

Use this page to choose the right announcement pattern when UI content changes without moving focus.
The goal is simple: users should hear important updates once, clearly, and at the right urgency level.
Keep messages short, specific, and tied to the action that triggered them.

## When to use what

- Use `role="alert"` for urgent errors that need immediate attention (for example, "Payment failed").
- Use `aria-live="polite"` for non-urgent updates (for example, "Draft saved").
- Avoid `aria-live` on huge containers (`<main>`, full lists, large panels); it causes noisy announcements.
- Avoid announcing purely decorative or redundant visual changes.
- Prefer one small, dedicated live region per message type.

## Minimal examples

### A) Inline form error (`aria-invalid` + `aria-describedby`)

```html
<form novalidate>
  <label for="email">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" role="alert">Enter a valid email address.</p>

  <button type="submit">Submit</button>
</form>
```

- Keep error text near the field.
- Use `aria-describedby` so the field and error are read together.
- Optional: on submit, move focus to the first invalid field.

### B) Polite status region (`aria-live="polite"`)

```html
<button type="button">Save settings</button>

<div id="save-status" aria-live="polite" aria-atomic="true">
  Settings saved.
</div>
```

- Keep the status region small and specific.
- Inject short, plain messages (for example, "Saved", "Upload complete").

### C) Toast with dismiss button (no focus stealing)

```html
<div aria-live="polite" aria-atomic="true">
  <div role="status">
    <p>Profile updated.</p>
    <button type="button" aria-label="Dismiss notification">Dismiss</button>
  </div>
</div>
```

- Toasts should not take focus automatically in most cases.
- If actions exist in a toast, they must be reachable by keyboard in normal tab order.
- Do not auto-dismiss too quickly; users need enough time to read and dismiss.

## Common pitfalls

- `aria-live` placed on large containers, causing announcement spam.
- `role="alert"` used for non-urgent status updates.
- Multiple live regions firing at the same time.
- Toast disappears too fast or cannot be dismissed.
- Icon-only dismiss button with no accessible name.
- Re-announcing the same message repeatedly with no user value.
- Replacing/remounting the live region element too aggressively, so updates are not announced.
- Announcing changes that are already obvious and create noise.

## Quick test steps

1. Trigger success and error flows; confirm announcements happen with the right urgency.
2. Keyboard test: tab to toast actions and dismiss control; verify visible focus.
3. Screen reader sanity check: each message is announced once and is understandable.
4. Repeat the same action twice; confirm it still announces predictably.
5. Zoom/reflow check: toast does not block critical UI or become unreachable.
