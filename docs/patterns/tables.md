# Accessible Tables

> **Last reviewed:** 2026-02-16

Tables are the right tool for tabular data — rows, columns, relationships. This doc covers how to make them accessible to screen readers, how to handle responsive layouts, and how to add sorting without breaking the experience.

---

## Caption

Every data table should have a `<caption>` that describes what the table contains. Screen readers announce it when a user enters the table.

```html
<table>
  <caption>Quarterly revenue by region (2025)</caption>
  <thead>…</thead>
  <tbody>…</tbody>
</table>
```

If you need the caption to be visually hidden, apply a `visually-hidden` class to it — but keep the element in the DOM. Don't remove it.

---

## Headers and scope

### Simple tables

For straightforward tables, use `<th>` with `scope` to indicate whether the header applies to a column or a row.

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
    <tr>
      <th scope="row">Leo</th>
      <td>Designer</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
```

Screen reader announcement for cell "12":

> "Amara, Tasks, 12"

### Complex tables (merged cells)

When cells span multiple rows or columns, `scope` alone isn't enough. Use `headers` and `id` to create explicit associations.

```html
<table>
  <caption>Sales by region and quarter</caption>
  <thead>
    <tr>
      <td></td>
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
    <tr>
      <th id="south" scope="row">South</th>
      <td headers="south q1">$98k</td>
      <td headers="south q2">$110k</td>
    </tr>
  </tbody>
</table>
```

Each `<td>` lists the `id` values of the headers that describe it, separated by spaces.

---

## Responsive tables

Tables often overflow on small screens. Here are accessible approaches — avoid turning the table into `<div>` soup.

### Horizontal scroll wrapper

Wrap the table in a scrollable container. Add `tabindex="0"` and a label so keyboard users can scroll it and screen readers announce the region.

```html
<div class="table-wrapper" tabindex="0" role="region"
     aria-label="Quarterly revenue table">
  <table>
    <caption>Quarterly revenue by region</caption>
    …
  </table>
</div>
```

```css
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-wrapper:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

### Stacked layout (use carefully)

At very narrow widths, some designs reflow each row into a vertical card. If you do this:

- **Keep the `<table>` element** in the DOM — don't replace it with divs.
- Use CSS (`display: block` on `tr`, `td`) to reflow visually.
- Use `data-label` attributes and CSS `::before` pseudo-elements to show column headers next to each value.
- Test with a screen reader — the table semantics should still be announced.

```css
@media (max-width: 600px) {
  table, thead, tbody, tr, th, td {
    display: block;
  }
  thead { position: absolute; left: -9999px; }
  td::before {
    content: attr(data-label);
    font-weight: bold;
    display: block;
  }
}
```

```html
<td data-label="Role">Developer</td>
```

> **Caution:** Some screen readers lose table navigation in stacked mode. Prefer the horizontal scroll approach when possible.

---

## Sorting and filtering

Interactive tables with sortable columns need extra care.

### Announce sort state

Use `aria-sort` on the active `<th>` to indicate the current sort direction.

```html
<th scope="col" aria-sort="ascending">
  <button type="button">
    Name
    <span aria-hidden="true">▲</span>
  </button>
</th>
<th scope="col" aria-sort="none">
  <button type="button">Role</button>
</th>
```

Valid `aria-sort` values: `ascending`, `descending`, `none`, `other`.

### Sort button inside the header

Put a `<button>` inside the `<th>` so the sort action is keyboard-accessible. Don't make the entire `<th>` clickable with JavaScript alone.

### Announce updates

After sorting or filtering, announce the result via a live region:

```html
<div aria-live="polite" aria-atomic="true" class="sr-only"
     id="table-status"></div>
```

```js
document.getElementById('table-status').textContent =
  'Table sorted by Name, ascending.';
```

### Filter inputs

If the table has a search/filter input, associate it with the table using `aria-controls`.

```html
<label for="table-filter">Filter team members</label>
<input id="table-filter" type="search" aria-controls="team-table">

<table id="team-table">…</table>
```

---

## Quick tests

1. **Enter the table with a screen reader.** Is the caption announced? Can you navigate cell by cell (Ctrl+Alt+arrows in NVDA/JAWS, VO+arrows in VoiceOver)?
2. **Check header announcements.** When you move to a data cell, does the screen reader read the column and/or row header?
3. **Resize to mobile width.** Can you still read all data? If it scrolls, can you scroll with keyboard (Tab into wrapper, then arrow keys)?
4. **Sort a column.** Does `aria-sort` update? Does the screen reader announce the new sort state?
5. **Inspect the DOM.** Is there exactly one `<caption>`? Does every `<th>` have `scope` (or do complex cells use `headers`/`id`)?
6. **Grayscale check.** If sort direction uses an icon, is there also a text or ARIA indication — not just an arrow color change?
