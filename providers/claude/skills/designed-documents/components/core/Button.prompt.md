Button — the standard DCA action control; use `accent` (orange) for the single primary call-to-action, `primary` (blue) for trusted/operational actions, `secondary`/`ghost` for lower emphasis.

```jsx
<Button variant="accent" size="lg">Donate now</Button>
<Button variant="primary">View operations</Button>
<Button variant="secondary">Download report</Button>
<Button variant="ghost" iconLeft={<Icon name="arrow-right" />}>Read more</Button>
```

Variants: `primary` (DCA Blue fill), `accent` (DCA Orange fill — reserve for CTAs), `secondary` (outlined), `ghost` (text-only). Sizes: `sm | md | lg`. Supports `fullWidth`, `disabled`, `iconLeft`, `iconRight`. Hover darkens the fill; press nudges down 1px — calm, no bounce.
