# Accessibility Tooling

> **Last reviewed:** 2026-02-19

Lint rules catch accessibility issues before they reach production. This doc covers the two most useful plugins and a minimal config to get started.

> **Disclaimer:** Every project is different. Treat these configs as a starting point — add, remove, or adjust rules to match your stack and requirements.

---

## eslint-plugin-jsx-a11y

A static analysis plugin for JSX. It catches common accessibility mistakes at development time, right in your editor.

### What it catches

- `<img>` without `alt` (or with `alt="image"`)
- Click handlers on non-interactive elements (`<div onClick>`) without `role` and keyboard support
- Invalid or misspelled `aria-*` attributes
- `aria-hidden="true"` on focusable elements
- Missing accessible names on interactive elements (buttons, links)
- Redundant ARIA roles that duplicate native semantics (`<nav role="navigation">`)
- `<label>` without a matching `htmlFor` / nested input
- Autofocus usage warnings

### Install

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

### Config

```json
{
  "extends": ["plugin:jsx-a11y/recommended"]
}
```

The `recommended` preset enables all stable rules as errors. For a gentler start use `strict` (fewer rules, stricter enforcement) or `recommended` and downgrade noisy rules to warnings as needed.

---

## Stylelint (optional)

Stylelint doesn't have a dedicated accessibility plugin, but you can use its built-in rules to guard against common CSS anti-patterns that break keyboard accessibility.

### What to watch for

- **Removed focus outlines** — `outline: none` or `outline: 0` without a replacement. Stylelint can't enforce "has a replacement," but a custom regex rule or code review convention can flag it.
- **Missing `:focus-visible`** — If your codebase uses `:focus` overrides, check that `:focus-visible` is also defined so keyboard focus remains visible while mouse focus stays clean.

### Useful config

There is no single rule that says "don't remove focus outlines." A practical approach is to use `declaration-property-value-disallowed-list` to flag the most common offenders and require a review:

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "outline": ["none", "0"],
      "outline-width": ["0"]
    }
  }
}
```

This will flag `outline: none` and `outline: 0` anywhere in your stylesheets. If a rule genuinely needs to suppress the outline (and provides a replacement), disable the lint inline with a comment explaining why.

---

## Recommended minimal config

A single `.eslintrc.json` that combines JSX accessibility linting with standard practices. Copy this as a starting point.

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "rules": {
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/no-autofocus": "warn"
  }
}
```

**Why these overrides:**

- `anchor-is-valid` is set to `warn` because `next/link` and router `<Link>` components sometimes trigger false positives.
- `no-autofocus` is set to `warn` because autofocus is occasionally intentional (e.g., search dialogs) — review each case instead of blocking outright.

If you also use Stylelint, add the outline guard from the section above to your `.stylelintrc.json`.

---

## Beyond linting

Lint rules catch roughly 30–50% of accessibility issues. They're a safety net, not a substitute for:

- **Keyboard testing** — Tab through every page.
- **Screen reader testing** — NVDA, VoiceOver, or TalkBack.
- **axe-core in CI** — Run automated audits in integration tests. See [React & Next.js notes](frameworks/react-next.md#testing) for setup.
- **Manual review** — Complex interactions (modals, drag-and-drop, custom widgets) need human judgment.
