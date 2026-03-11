# Images & Media: Text Alternatives

> **Last reviewed:** 2026-02-16

## Alt text decision guide

- **Informative image:** write alt text that explains the image's purpose in this context.
- **Decorative image:** use empty `alt=""` so screen readers skip it.
- **Functional image (icon as control):** ensure the control has an accessible name.
- Keep alt text short and specific; avoid "image of" unless needed for meaning.
- If nearby text already gives the same information, use empty `alt=""`.
- For logos in links, alt should describe destination or brand purpose.

## Minimal HTML examples

Decorative image (`alt=""`)

```html
<img src="/images/divider-wave.svg" alt="" />
```

Informative image

```html
<img src="/images/team-photo.jpg" alt="Support team members at the help desk" />
```

Linked image (alt describes destination/purpose)

```html
<a href="/pricing">
  <img src="/images/pricing-card.png" alt="View pricing plans" />
</a>
```

`figure` / `figcaption` when caption adds context

```html
<figure>
  <img src="/images/release-stats.png" alt="Monthly active users increased over six months" />
  <figcaption>Product growth trend from January to June 2026.</figcaption>
</figure>
```

## Complex images (short guidance)

- Add a brief summary near the image so users understand the key takeaway quickly.
- If details are dense (charts, maps, diagrams), provide or link to a longer description.
- Keep the short alt concise, and place full explanation in nearby text.

```html
<img src="/images/sales-chart.png" alt="Quarterly sales trend, Q2 highest" />
<p>Sales rise each quarter, peaking in Q2.</p>
<p><a href="/reports/sales-chart-description.html">Read full chart description</a></p>
```

## Video/audio baseline

- Provide captions for video content with speech.
- Provide a transcript for audio-only and video content when needed.
- Avoid autoplay whenever possible.
- If media can play, provide pause/stop and volume controls.
- Ensure media controls are keyboard accessible and visibly focused.
- Do not rely on sound alone for important information.

## Quick QA checks

- Every meaningful `<img>` has an alt text that matches its purpose.
- Decorative images have empty `alt=""` (not missing alt, not filler text).
- Linked image alt describes where the link goes or what action it performs.
- Complex charts/diagrams include a nearby summary and longer description path.
- Video captions are available and synchronized.
- Audio/video has transcript coverage where appropriate.
- Media controls are reachable by keyboard (`Tab`) and activatable (`Enter`/`Space`).
- Focus indicators are visible on media controls and links.
