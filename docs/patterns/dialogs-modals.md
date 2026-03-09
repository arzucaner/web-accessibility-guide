# Dialogs & Modals

> **Last reviewed:** 2026-02-16

## Required semantics

- Use `role="dialog"` on the modal container.
- Use `aria-modal="true"` so assistive tech treats background content as inert.
- Provide an accessible name with `aria-labelledby` pointing to a visible title.
- If a visible title is not possible, use `aria-label` with a clear name.
- Keep one clear dialog title and one clear close control.
- Keep dialog content inside the same dialog container.
- Use semantic controls (`button`, `input`, `a`) inside the dialog.
- Avoid adding redundant roles when native elements already provide semantics.

## Focus behavior

- Move focus into the dialog when it opens (usually first focusable control).
- Keep focus trapped inside the dialog while open.
- `Escape` closes the dialog.
- Return focus to the trigger button when the dialog closes.
- Keep tab order logical (forward and backward with `Tab` / `Shift+Tab`).
- Avoid autofocus jumps to hidden elements.
- Ensure close button is always keyboard reachable.
- Do not allow focus to land behind the modal overlay.

## Minimal example

```html
<button id="open-dialog" type="button">Open settings</button>

<div id="dialog-overlay" hidden></div>

<div
  id="settings-dialog"
  role="dialog"
  aria-modal="true"
  aria-labelledby="settings-title"
  hidden
>
  <h2 id="settings-title">Settings</h2>
  <p>Update your preferences, then save or close.</p>

  <label for="name">Display name</label>
  <input id="name" type="text" />

  <div>
    <button id="save-settings" type="button">Save</button>
    <button id="close-dialog" type="button">Close</button>
  </div>
</div>
```

```js
const openBtn = document.getElementById('open-dialog');
const closeBtn = document.getElementById('close-dialog');
const dialog = document.getElementById('settings-dialog');
const overlay = document.getElementById('dialog-overlay');

let lastTrigger = null;

function getFocusable() {
  return dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

function openDialog() {
  lastTrigger = document.activeElement;
  dialog.hidden = false;
  overlay.hidden = false;
  getFocusable()[0]?.focus();
}

function closeDialog() {
  dialog.hidden = true;
  overlay.hidden = true;
  lastTrigger?.focus();
}

openBtn.addEventListener('click', openDialog);
closeBtn.addEventListener('click', closeDialog);

dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeDialog();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = [...getFocusable()];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (!first || !last) return;

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});
```

## Common pitfalls

- Missing `aria-labelledby` (or `aria-label`) so the dialog has no clear name.
- Not moving focus when opening, leaving users on background controls.
- Allowing `Tab` to escape the dialog.
- No `Escape` handling for close.
- Not returning focus to the opener on close.
- Close button is missing, hidden, or not keyboard accessible.
- Using clickable `div` elements instead of real buttons.
- Overlay visually blocks page but background remains focusable.
- Multiple dialogs open at once with conflicting focus handling.
- Removing focus styles, making keyboard position unclear.

## Quick test steps

1. **Keyboard open/close:** Tab to trigger, press Enter/Space to open, press Escape to close.
2. **Focus placement:** On open, focus lands inside the dialog (not behind it).
3. **Focus trap:** Use Tab and Shift+Tab; focus cycles only within dialog controls.
4. **Focus return:** On close, focus returns to the original trigger button.
5. **Screen reader sanity:** Dialog is announced with role and title (for example, "Settings dialog").
6. **Screen reader navigation:** Dialog content and controls are reachable in expected order.
7. **Zoom/reflow check:** At 200% zoom, dialog content remains readable and close button remains reachable.
