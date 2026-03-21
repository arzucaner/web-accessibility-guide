# Glossary

> **Last reviewed:** 2026-02-16

Short definitions for common accessibility terms. Use this alongside [Standards baseline](standards.md) and [Quick checklist](quick-checklist.md).

---

**Accessible name** — The text assistive technologies use to identify a control or region (from visible text, `aria-label`, `aria-labelledby`, or `alt`).  
*Example:* A button with only an icon needs an accessible name via `aria-label` or visually hidden text.

**Role** — What kind of element something is to assistive tech (button, link, dialog, navigation). Native HTML often provides roles; ARIA can supplement when needed.

**State** — Current condition of a control (expanded, pressed, checked, disabled). Expose it with native attributes or ARIA (`aria-expanded`, `aria-pressed`, etc.).

**Focus order** — The sequence in which interactive elements receive keyboard focus when using Tab / Shift+Tab. It should follow a logical reading order.

**Focus visible** — A clear visual indicator showing which element has keyboard focus (outline, ring, or equivalent—not removed without replacement).

**Keyboard trap** — When focus cannot leave a region with normal keyboard actions (Tab, Escape). Modals may trap focus intentionally; the rest of the page should not.

**Landmark** — A major page region (banner, navigation, main, contentinfo) that screen readers can list and jump to—often from elements like `<header>`, `<nav>`, `<main>`, `<footer>`.

**Reflow** — How layout adapts when zoomed or narrowed; content should stay usable without needing two-dimensional scrolling for core reading (see WCAG reflow guidance).

**Screen reader** — Software that reads screen content aloud and lets users navigate by structure (headings, landmarks, links). Examples: NVDA, VoiceOver, TalkBack.

**Semantic HTML** — Using elements for their meaning (`button`, `nav`, `main`) instead of generic `div`/`span` so browsers and assistive tech get the right defaults.

**ARIA** — Accessible Rich Internet Applications: attributes that extend semantics when HTML alone isn’t enough. Prefer native HTML first; use ARIA to fill gaps.

**aria-label** — Sets an accessible name when visible text isn’t suitable or doesn’t exist (e.g., icon-only button). Avoid duplicating visible text unnecessarily.

**aria-describedby** — Points to another element whose text provides extra description (often help text or error messages linked to a field).

**aria-expanded** — Indicates whether a collapsible region is expanded (`true`) or collapsed (`false`); common on disclosure and menu triggers.

**Contrast ratio** — The luminance difference between text and background; WCAG specifies minimum ratios for normal and large text and for UI graphics.

**Captions vs transcript** — Captions are timed text for video (speech and key sounds). A transcript is a text version of audio or video content, often full and searchable.

**Decorative image** — An image that adds no information; use `alt=""` so screen readers skip it. Don’t use empty alt for images that convey meaning.

**WCAG** — Web Content Accessibility Guidelines: international recommendations for making web content accessible, organized by principles and testable success criteria.

**Level A / AA** — Conformance levels: **A** is the minimum set; **AA** adds stricter criteria (common legal and policy target). **AAA** is the most stringent and optional for many sites.

**Live region** — A part of the page whose updates can be announced by screen readers (`aria-live`, `role="status"` / `alert`) without moving focus.

**Assistive technology** — Tools people use to interact with content (screen readers, screen magnifiers, speech input, switch devices). Design for compatibility with these.

**Skip link** — A link at the start of the page that jumps keyboard users past repeated navigation to main content.

**Perceivable / Operable / Understandable / Robust (POUR)** — The four WCAG principles: users must be able to perceive content, operate controls, understand information, and use content with current and future tech.

**Success criterion** — A specific, testable rule in WCAG (for example, minimum contrast for text). Each criterion is tagged Level A, AA, or AAA.

**Name, role, value** — Expected information exposed for many UI components: a clear name, correct role, and current value or state so assistive tech can present them accurately.
