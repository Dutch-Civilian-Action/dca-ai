Stat — display one concrete operational figure (mono numerals, tabular) with an uppercase label and optional context. Use real numbers, not vague impact claims.

```jsx
<Stat value="1,240" label="Generators delivered" context="Since Jan 2025" accent="delivered" />
<Stat value="7 days" label="Evacuation fuel funded" accent="orange" />
```

Props: `value`, `label`, `context?`, `accent` (`blue | orange | black | delivered`), `align` (`left | center`). Group several in a flex/grid row for an operations summary.
