# Buttons, Links & Icon Controls

> **Last reviewed:** 2026-02-16

## Choose the right element

- **Link = navigation**: use `<a href="...">` when the user goes to a new URL, page, or location.
- **Button = action**: use `<button>` for submit, open/close modal, toggle UI, filter, save, delete, or run JS behavior.
- If it changes location, it should be a link.
- If it changes state or data, it should be a button.
- Prefer native elements over `div`/`span` with click handlers.

## Icon-only controls (accessible name)

- Icon-only controls still need a clear accessible name.
- Use either:
  - `aria-label` on the button, or
  - visually-hidden text inside the button.
- Keep decorative icons hidden from assistive tech with `aria-hidden="true"`.

Example A: `aria-label`

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="M6 6L18 18M6 18L18 6"></path>
  </svg>
</button>
```

Example B: visually-hidden text

```html
<button type="button">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="M3 6h18M3 12h18M3 18h18"></path>
  </svg>
  <span class="sr-only">Open menu</span>
</button>
```

## Toggle buttons

- Use a real `<button>` for toggles.
- Reflect state with `aria-pressed="true"` or `aria-pressed="false"`.
- Keep the accessible name stable and let `aria-pressed` communicate on/off state.

```html
<button type="button" aria-pressed="false" id="mute-toggle">
  Mute notifications
</button>
```

## Good vs bad snippets

Bad: clickable `div` used as a button

```html
<div onclick="saveSettings()">Save</div>
```

Good: native button for action

```html
<button type="button" onclick="saveSettings()">Save</button>
```

Bad: link used for in-page action

```html
<a href="#" onclick="openModal()">Open settings</a>
```

Good: button used for in-page action

```html
<button type="button" onclick="openModal()">Open settings</button>
```

Bad: icon-only button with no name

```html
<button type="button">
  <svg viewBox="0 0 24 24"><path d="..."></path></svg>
</button>
```

Good: icon-only button with accessible name

```html
<button type="button" aria-label="Search">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="..."></path></svg>
</button>
```

## Quick tests

- **Keyboard behavior**
  - Use `Tab`/`Shift+Tab` to reach every control.
  - Press `Enter` on links to navigate.
  - Press `Enter` and `Space` on buttons to activate.
- **Screen reader sanity**
  - Each control announces a meaningful name and correct role ("link" or "button").
  - Toggle buttons announce pressed/not pressed state.
- **Focus visibility**
  - Every focused link/button has a visible focus indicator.
  - Do not remove outline unless a clear replacement is provided.
