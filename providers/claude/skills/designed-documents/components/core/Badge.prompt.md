Badge — compact uppercase label for categories, counts, regions or emphasis. Soft (tinted) by default; use solid for stronger presence.

```jsx
<Badge tone="blue">Logistics</Badge>
<Badge tone="orange" soft={false}>Urgent</Badge>
<Badge tone="info">Kharkiv</Badge>
```

Tones: `neutral | blue | orange | yellow | info`. For operational lifecycle status (Need → Delivered) prefer `StatusBadge` instead.
