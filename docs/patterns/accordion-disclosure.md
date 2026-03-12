# Accordion & Disclosure

> **Last reviewed:** 2026-02-16

## What this pattern is

- A **disclosure** is a control that shows or hides a related content region.
- An **accordion** is a group of disclosures, sometimes allowing only one panel open at a time.
- Both patterns depend on clear button semantics and predictable keyboard behavior.

## Baseline structure

- Use a real `<button>` as the trigger (not a clickable `div` or `span`).
- Put `aria-expanded="false"` on the button when collapsed.
- Update `aria-expanded` to `"true"` when expanded.
- Add `aria-controls="panel-id"` on the button.
- Give the controlled region a matching `id`.
- Show/hide the region in a way that also removes hidden interactive content from tab flow.
- Keep heading + button structure for better scanability.
- Keep trigger text clear and stable (for example, "Shipping details").

## Minimal HTML example (single disclosure)

```html
<h3>
  <button
    type="button"
    id="shipping-toggle"
    aria-expanded="false"
    aria-controls="shipping-panel"
  >
    Shipping details
  </button>
</h3>

<div id="shipping-panel" hidden>
  <p>Orders ship in 2-3 business days.</p>
  <a href="/shipping-policy">Read full shipping policy</a>
</div>

<script>
  const button = document.getElementById('shipping-toggle');
  const panel = document.getElementById('shipping-panel');

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
</script>
```

## Keyboard behavior

- `Tab` / `Shift+Tab` should move focus to and from the disclosure button naturally.
- `Enter` toggles expanded/collapsed state.
- `Space` also toggles expanded/collapsed state.
- Focus should stay on the same button after toggle.
- If panel content is expanded, users can tab into the revealed controls in logical order.
- If panel is collapsed, controls inside it should not be tabbable.
- Optional: add arrow-key navigation only if implementing a full roving tabindex pattern.
- Do not invent extra keyboard shortcuts unless documented and tested.

## Common pitfalls

- Using clickable `div` or `span` instead of a button.
- `aria-expanded` never updates when the panel state changes.
- `aria-controls` value does not match a real region `id`.
- Multiple triggers pointing to the same panel by mistake.
- Hiding with CSS only while leaving inner links/inputs tabbable.
- Removing focus outlines (`outline: none`) without a visible replacement.
- Trigger text is vague (for example, only "More") and unclear out of context.
- Auto-scrolling or moving focus unexpectedly after toggle.
- Making panel animation block user input or confuse state updates.

## Quick tests

- Keyboard toggle works with `Enter` and `Space` on every trigger.
- Focus stays sensible: toggle action does not jump focus unexpectedly.
- Screen reader announces button name + expanded/collapsed state.
- Collapsed panel content is not tabbable.
- Expanded panel links/inputs are reachable in order.
- `aria-controls` target exists and maps to the correct panel.
- Visible focus indicator appears on trigger and panel controls.
- At 200% zoom/narrow width, trigger text and panel content remain readable and operable.
