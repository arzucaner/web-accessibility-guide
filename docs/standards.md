# Standards & References

> **Last reviewed:** 2026-02-12

This document describes the accessibility standards and specifications the Web Accessibility Guide follows. It is the single source of truth for the project's standards baseline.

---

## Standards baseline

### WCAG 2.2 (primary)

This guide primarily follows **WCAG 2.2**, aiming for **Level AA** compliance unless otherwise stated. WCAG 2.2 builds on WCAG 2.1 and adds criteria around focus appearance, dragging movements, consistent help, and redundant entry — all of which improve the experience for people with cognitive and motor disabilities.

WCAG 2.1 is still widely referenced and remains a W3C Recommendation, but we use **WCAG 2.2 as our baseline** because it represents the most current stable standard.

### WCAG 3.0 (future)

WCAG 3.0 (also known as "W3C Accessibility Guidelines 3.0") is still in an early **Working Draft** stage. It introduces a new conformance model and scoring approach, but it is **not yet a stable replacement** for WCAG 2.x. We track its progress and may adopt relevant concepts as the spec matures, but WCAG 2.2 remains our actionable baseline today.

---

## ARIA guidance

We reference **WAI-ARIA 1.2** as the stable ARIA specification.

Key principles this guide follows:

- **Prefer native HTML semantics.** ARIA should supplement, not replace, semantic elements like `<button>`, `<nav>`, `<label>`, and `<input>`. The first rule of ARIA is: if you can use a native HTML element with the semantics you need, do so.
- **Accessible names matter.** Every interactive element should have a clear, descriptive accessible name — whether through visible text, `<label>`, `aria-label`, or `aria-labelledby`.
- **Focus management is critical.** Moving focus intentionally (e.g., into a modal on open, back to the trigger on close) is essential for keyboard and screen reader users across all patterns.

---

## Evaluation methodology

Automated tools catch only a fraction of accessibility issues. We recommend a layered approach:

1. **Automated scans** — Tools like axe, Lighthouse, or pa11y can catch structural issues (missing alt text, contrast violations, missing labels).
2. **Manual testing** — Navigate every page with keyboard only. Check focus order, visible focus indicators, and interactive behavior.
3. **Assistive technology checks** — Test with at least one screen reader (NVDA on Windows, VoiceOver on macOS/iOS, TalkBack on Android). Verify announcements, navigation, and form interactions.
4. **WCAG-EM (Evaluation Methodology)** — For structured audits, follow the [WCAG-EM](https://www.w3.org/TR/WCAG-EM/) process: define scope, explore the site, select a sample, audit the sample, and report findings.

---

## Not legal advice

This guide is an educational resource. It does not constitute legal advice. Accessibility requirements vary by jurisdiction (ADA, EN 301 549, EAA, etc.). Consult a qualified professional for legal compliance questions.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — W3C Recommendation (current baseline)
- [What's new in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/) — Summary of new criteria
- [WCAG 3 Introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/) — Overview of the evolving next-generation standard
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) — Accessible Rich Internet Applications specification
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/aria-practices/) — Patterns and guidance for using ARIA
- [WCAG-EM](https://www.w3.org/TR/WCAG-EM/) — Website Accessibility Conformance Evaluation Methodology
