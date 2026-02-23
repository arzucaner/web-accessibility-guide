# Accessibility Testing Playbook

> **Last reviewed:** 2026-02-20

This is the default testing workflow for this repository.
Use it for feature work, bug fixes, and pull request QA.

## How to use this playbook

- Run this checklist before opening a PR.
- Start with keyboard and screen reader checks, then run automated checks.
- Record what you tested in your PR description.

---

## 1) Keyboard-only pass (required)

- Navigate the page using **Tab**, **Shift+Tab**, **Enter**, **Space**, and **Escape** only.
- Confirm focus order is logical and does not jump unexpectedly.
- Confirm every interactive control can be reached and activated.
- Confirm no keyboard traps (you can always leave a component).
- Confirm skip link appears on focus and moves focus to main content.

### Pass criteria

- All controls are reachable and operable without a mouse.
- Visible focus indicator exists on each focusable control.

---

## 2) Screen reader sanity check (required)

Test at least one screen reader:

- **Windows:** NVDA (recommended)
- **macOS/iOS:** VoiceOver
- **Android:** TalkBack

Check:

- Headings are announced in correct hierarchy.
- Landmark navigation shows expected regions (banner/navigation/main/contentinfo).
- Form fields have labels and error announcements.
- Icon buttons have clear accessible names.
- Dynamic updates (toasts/status) are announced via live regions.

### Pass criteria

- Labels, roles, and states are announced clearly.
- No unlabeled buttons/links or silent critical updates.

---

## 3) Zoom, reflow, and contrast checks

- Test at **200% zoom** in browser.
- Check at narrow width (~320 CSS px) for horizontal overflow.
- Verify text remains readable and controls remain usable.
- Verify color is not the only meaning (errors, statuses, selected state).
- Verify contrast meets at least WCAG AA targets.

### Pass criteria

- No clipped/overlapped critical content.
- No horizontal scrolling required for core reading/action flows.

---

## 4) Motion and interaction checks

- Enable `prefers-reduced-motion` and verify non-essential motion is reduced.
- Check modals/menus: focus trap, Escape to close, return focus to trigger.
- Check route/section changes: focus is moved to meaningful content.

### Pass criteria

- Motion does not block use.
- Focus behavior is predictable before, during, and after overlays/navigation.

---

## 5) Automated checks

### Repo CI baseline

This repo already runs:

- **pa11y-ci** (`.pa11yci.json` + `.github/workflows/a11y-ci.yml`)
- **linkinator** for broken-link checks

Run locally when possible:

```bash
npx http-server -p 8080 -c-1 .
npx pa11y-ci http://127.0.0.1:8080/index.html
npx linkinator http://127.0.0.1:8080 --recurse --silent --timeout=10000
```

### Optional framework linting/tests

If working in framework subprojects, also run:

- `eslint-plugin-jsx-a11y`
- `axe-core` integration checks

See `docs/tooling.md` and `docs/frameworks/react-next.md`.

---

## PR checklist snippet

Copy this into PRs:

- [ ] Keyboard-only navigation tested
- [ ] Screen reader sanity check completed
- [ ] Focus states verified (`:focus-visible`)
- [ ] Form labels/errors verified
- [ ] Live region announcements verified
- [ ] Zoom/reflow checked at 200%
- [ ] Automated checks passed (pa11y-ci/linkinator)

---

## Related docs

- `docs/quick-checklist.md`
- `docs/common-bugs.md`
- `docs/standards.md`
- `docs/tooling.md`
