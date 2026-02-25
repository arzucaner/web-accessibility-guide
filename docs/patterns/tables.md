# Tables

> **Last reviewed:** 2026-02-16

## Intro

Use tables for real tabular data: rows, columns, and meaningful relationships between values.
Do not use tables for page layout. Layout tables make keyboard and screen reader navigation harder.

## Baseline semantics

Use real table elements: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th>`, and `<td>`.

```html
<table>
  <caption>Quarterly revenue by region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>North</td>
      <td>$120k</td>
      <td>$145k</td>
    </tr>
    <tr>
      <td>South</td>
      <td>$98k</td>
      <td>$110k</td>
    </tr>
  </tbody>
</table>
```

## Row headers and complex associations

For row labels, use `<th scope="row">`.

```html
<table>
  <caption>Team task assignments</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Tasks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Amara</th>
      <td>Developer</td>
      <td>12</td>
    </tr>
  </tbody>
</table>
```

Use `scope` for simple tables. Use `headers` + `id` when a cell needs more explicit associations (for example grouped headers or merged cells).

```html
<table>
  <caption>Sales by region and quarter</caption>
  <thead>
    <tr>
      <th id="region" scope="col">Region</th>
      <th id="q1" scope="col">Q1</th>
      <th id="q2" scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="north" scope="row">North</th>
      <td headers="north q1">$120k</td>
      <td headers="north q2">$145k</td>
    </tr>
  </tbody>
</table>
```

## Sortable tables

To make sorting accessible:

- Put a button (or other real focusable control) inside the header cell.
- Keep a visible sort indicator for sighted users.
- Set sort state with `aria-sort` on the `<th>`, not on the button.
- Typically only one column should use `aria-sort` at a time.

```html
<table>
  <caption>Project backlog</caption>
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending">
        <button type="button" aria-label="Sort by name">
          Name <span aria-hidden="true">▲</span>
        </button>
      </th>
      <th scope="col" aria-sort="none">
        <button type="button" aria-label="Sort by priority">
          Priority
        </button>
      </th>
      <th scope="col" aria-sort="none">Owner</th>
    </tr>
  </thead>
</table>
```

Common values are `none`, `ascending`, and `descending`.

## Responsive / small screens

Keep table semantics on small screens.

- Prefer horizontal scrolling over rewriting table markup into `div`s.
- Do not remove headers.
- If you use a stacked layout, keep header context available for each value and test with a screen reader.

```css
.table-scroll {
  overflow-x: auto;
}
```

```html
<div class="table-scroll">
  <table>
    <caption>Quarterly revenue by region</caption>
    <!-- table content -->
  </table>
</div>
```

## Keyboard behavior

- Normal table reading is not "Tab through every cell."
- Tabbing should reach interactive controls inside cells (links, buttons, inputs).
- If you add custom grid-style key navigation, document supported keys and avoid reinventing this unless truly needed.

## Screen reader notes

- Captions help users understand what the table is about before reading cells.
- Correct header associations make each data cell understandable in context.
- Interactive controls in cells should have clear accessible names.

## Common pitfalls

- Missing caption for data-heavy tables.
- Using `<td>` instead of `<th>` for headers.
- No header association strategy for complex tables.
- Sort state shown only with icon/color and not programmatically.
- `aria-sort` on the wrong element, or on multiple columns at once.
- Converting tables to `div` layouts on mobile and losing semantics.

## Quick test steps

1. **Screen reader sanity check:** Move through rows/columns and confirm headers are announced with each data cell.
2. **Keyboard test:** Reach all interactive controls in cells and verify visible focus.
3. **Zoom/reflow test:** At 200% zoom and narrow width, table remains usable (including horizontal scroll when needed).
4. **Contrast test:** Sort indicator is visible without relying on color alone.
