Progress — fundraising / goal progress bar; pairs a calm filled track with concrete raised-vs-goal figures in mono numerals (specificity builds trust).

```jsx
<Progress label="Winter generators appeal" raised="€12,400" goal="€20,000" value={12400} max={20000} />
<Progress value={70} max={100} tone="blue" />
```

Props: `value`/`max`, `label`, `raised`/`goal` (formatted strings shown top-right), `tone` (orange | blue | yellow | delivered), `showPercent`.
