Card — structured surface for grouping content; minimal hairline border by default, tint with `tone` for report/info sections, lift with `raised`.

```jsx
<Card>Default white card</Card>
<Card tone="info" pad="lg">Light grey-blue report block</Card>
<Card tone="calm">Soft peach, calm background</Card>
<Card raised>Lifted card with subtle shadow</Card>
```

Tones: `default | subtle | info (grey-blue) | calm (peach) | inverse (black)`. Pad: `none | sm | md | lg`. Use `as` to change the element (e.g. `as="article"`).
