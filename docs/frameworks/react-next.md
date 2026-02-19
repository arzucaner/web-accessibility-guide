# React & Next.js Accessibility Notes

> **Last reviewed:** 2026-02-19

Practical patterns and pitfalls for keeping React and Next.js apps accessible. Everything here works with plain React, but Next.js-specific guidance is called out where relevant.

---

## Table of contents

1. [Labels and useId](#labels-and-useid)
2. [Accessible names for icon buttons](#accessible-names-for-icon-buttons)
3. [SPA route changes and focus management](#spa-route-changes-and-focus-management)
4. [Modals and menus](#modals-and-menus)
5. [Testing](#testing)

---

## Labels and useId

Every form input needs a programmatic label. In React, `htmlFor` replaces HTML's `for` attribute. The challenge is generating **unique, stable IDs** — especially when the same component renders multiple times on a page.

### useId (React 18+)

`useId` generates a unique ID per component instance that is stable across server and client renders (no hydration mismatch in Next.js).

```jsx
import { useId } from 'react';

function EmailField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}
```

### Linking errors to fields

Use the same `useId` base to create related IDs for `aria-describedby`.

```jsx
function EmailField({ error }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input
        id={id}
        type="email"
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
      />
      {error && (
        <div id={errorId} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
```

### Grouped fields

For radio groups or checkbox groups, use `<fieldset>` and `<legend>` — they work in JSX the same way.

```jsx
function ColorPicker() {
  const id = useId();

  return (
    <fieldset>
      <legend>Choose a color</legend>
      <label>
        <input type="radio" name={`${id}-color`} value="red" />
        Red
      </label>
      <label>
        <input type="radio" name={`${id}-color`} value="blue" />
        Blue
      </label>
    </fieldset>
  );
}
```

---

## Accessible names for icon buttons

Buttons that contain only an icon (SVG, emoji, or icon font) need an explicit accessible name.

### Pattern: aria-label on the button

```jsx
function CloseButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} aria-label="Close dialog">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" />
      </svg>
    </button>
  );
}
```

Key rules:

- **`aria-label` goes on the `<button>`**, not on the SVG.
- **`aria-hidden="true"`** on the icon prevents the screen reader from attempting to read the SVG markup.
- **`focusable="false"`** on the SVG prevents IE/Edge legacy from adding it to the tab order.
- If the button has visible text alongside the icon, drop the `aria-label` — the visible text is the accessible name.

### Pattern: visually-hidden text

If you prefer real text over `aria-label` (better for translation and search):

```jsx
function MenuButton({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <svg aria-hidden="true" focusable="false">…</svg>
      <span className="sr-only">Open menu</span>
    </button>
  );
}
```

---

## SPA route changes and focus management

In a multi-page site the browser resets focus on navigation. In a single-page app (React Router, Next.js App Router), route changes swap DOM content without a page reload — so **focus stays where it was**, which is confusing for screen reader and keyboard users.

### The problem

1. User clicks a nav link.
2. React swaps the page content.
3. Focus remains on the old nav link (which may now be styled as "active").
4. Screen reader user has no indication that new content appeared.

### Fix: move focus to the new page heading

After the route transition, move focus to the `<h1>` of the new page.

```jsx
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Next.js App Router

function PageHeading({ children }) {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.focus();
  }, [pathname]);

  return (
    <h1 ref={ref} tabIndex={-1}>
      {children}
    </h1>
  );
}
```

- `tabIndex={-1}` makes the heading focusable programmatically without adding it to the tab order.
- Focusing the heading causes screen readers to announce it — the user knows they're on a new page.

### Next.js-specific notes

- **App Router** doesn't manage focus on route change by default. You need to handle it yourself (pattern above).
- **Pages Router** with `next/link` also doesn't move focus. The same `useEffect` approach works with `useRouter().asPath`.
- Update `document.title` on route change so the new page title is announced. In Next.js App Router, use the `metadata` export or `<title>` in `head.js`.

### Announce route changes with a live region

An alternative (or complement) to moving focus is a visually-hidden live region that announces the new page name:

```jsx
function RouteAnnouncer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setAnnouncement(`Navigated to ${document.title}`);
  }, [pathname]);

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
}
```

---

## Modals and menus

### Common pitfalls with headless UI libraries

Libraries like Headless UI, Radix, and React Aria handle many accessibility concerns, but only if you use them correctly.

**1. Missing focus trap**

Most headless modal components provide focus trapping automatically — but only if you use their provided wrapper. If you render your own portal and skip the wrapper, focus escapes.

```jsx
// Radix Dialog — correct usage
<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content aria-describedby={undefined}>
      <Dialog.Title>Confirm</Dialog.Title>
      <p>Are you sure?</p>
      <Dialog.Close asChild>
        <button>Close</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**2. Missing accessible name**

Every modal needs a title. Use the library's title component or add `aria-label` / `aria-labelledby`.

```jsx
// Bad: no accessible name
<Dialog.Content>
  <p>Are you sure?</p>
</Dialog.Content>

// Good: title provides the accessible name
<Dialog.Content>
  <Dialog.Title>Confirm deletion</Dialog.Title>
  <p>Are you sure?</p>
</Dialog.Content>
```

**3. Focus not returned on close**

Headless UI and Radix handle this automatically. If you build a modal from scratch or use a portal, you must return focus to the trigger element on close.

```jsx
function useModal() {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
    // Return focus to trigger after DOM updates
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return { triggerRef, open, setOpen, close };
}
```

**4. Dropdown menus and roving tabindex**

Menu components (`<Menu>` in Headless UI, `<DropdownMenu>` in Radix) use **roving tabindex** or `aria-activedescendant` internally. Don't add your own `tabIndex` to menu items — it will conflict.

Arrow keys move between items. Enter/Space activates. Escape closes.

**5. Scroll lock without `aria-modal`**

When a modal is open, background content should be inert. If your library doesn't set `aria-modal="true"` and trap focus, screen reader users can read behind the overlay. Verify with a screen reader: when the modal is open, can you navigate to page content behind it?

---

## Testing

### Linting: eslint-plugin-jsx-a11y

Catches common issues at development time — missing alt text, invalid ARIA attributes, non-interactive elements with handlers.

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
{
  "extends": ["plugin:jsx-a11y/recommended"]
}
```

Key rules it catches:

- `img` without `alt`
- `onClick` on non-interactive element without `role` and keyboard handler
- Invalid `aria-*` attributes
- `aria-hidden="true"` on focusable elements

### Automated: axe-core

Run axe in tests to catch structural accessibility issues.

**With Jest / Testing Library:**

```bash
npm install --save-dev jest-axe
```

```jsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('form has no accessibility violations', async () => {
  const { container } = render(<ContactForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**With Playwright:**

```bash
npm install --save-dev @axe-core/playwright
```

```js
import AxeBuilder from '@axe-core/playwright';

test('home page passes axe', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

### Manual testing checklist

Automated tools catch roughly 30–50% of issues. Always complement with:

1. **Keyboard test** — Tab through the entire page. Can you reach and operate everything? Is focus visible?
2. **Screen reader test** — Navigate with NVDA (Windows) or VoiceOver (macOS). Are labels, roles, and states announced correctly?
3. **Zoom test** — Set the browser to 200% zoom. Does the layout reflow without horizontal scrolling?
4. **Route change test** — Navigate between pages. Does focus move to the new content? Is the page title updated?
5. **Modal test** — Open a modal. Is focus trapped? Does Escape close it? Does focus return to the trigger?
