# Accessibility Audit Template

> **Last reviewed:** 2026-02-16

Copy this document for each audit. Replace bracketed placeholders with real values.

> **Not legal advice.** This template is for documentation and quality practice only. Legal compliance depends on jurisdiction and context—consult qualified professionals when needed.

---

## 1) Overview

- **Product / project name:** [Project]
- **Audit date(s):** [Date] — [Date]
- **Auditor(s):** [Name(s)]
- **Scope (pages / flows tested):**
  - [Page or flow 1 — e.g., Home, checkout]
  - [Page or flow 2]
  - [Add or remove rows]
- **Environments:**
  - **Browsers:** [e.g., Chrome 120, Firefox 121, Safari 17]
  - **OS:** [e.g., Windows 11, macOS 14]
  - **Assistive tech (if used):** [e.g., NVDA 2024.x, VoiceOver]

---

## 2) Standards baseline

- **Target:** WCAG **2.2 Level AA** (see project baseline in [Standards baseline](standards.md)).
- **Notes:** [Optional: partial scope, exceptions, or third-party content called out here.]

---

## 3) Method

### Manual checks

- [ ] Keyboard: Tab / Shift+Tab order, Enter / Space / Escape, no unintended traps
- [ ] Focus visible on all interactive controls
- [ ] Zoom / reflow: e.g., 200% zoom, narrow viewport (~320 CSS px) where relevant

### Screen reader sanity checks

- [ ] At least one of: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- [ ] Landmarks, headings, form labels, and dynamic updates verified where applicable

### Automated tools (optional)

- **Tool(s):** [e.g., pa11y, axe DevTools, Lighthouse]
- **Scope:** [URLs or components scanned]
- **Notes:** [False positives / limitations]

---

## 4) Findings

| ID | Issue summary | WCAG reference | Severity (Low/Med/High) | Affected pages/components | Steps to reproduce | Recommended fix | Status (Open/Fixed/Retest) |
|----|---------------|----------------|-------------------------|----------------------------|------------------|-------------------|----------------------------|
| 1 | [Short description] | [e.g., 2.4.7 Focus Visible] | [Low/Med/High] | [URL or component] | [1. … 2. …] | [Concrete fix] | Open |
| 2 | | | | | | | |
| 3 | | | | | | | |

_Add rows as needed._

---

## 5) Retest plan

- **What will be retested:** [e.g., all High/Med findings, or IDs 1–3]
- **Retested by:** [Name or role]
- **Target date:** [Date]
- **Verification method:** [e.g., same keyboard + SR checks, spot-check automated scan]

---

## 6) Appendix (optional)

### Tools / versions

| Tool | Version | Notes |
|------|---------|--------|
| [Tool name] | [x.y.z] | |

### Notes

- [Free-form: sample accounts, staging URLs, known issues out of scope, etc.]
