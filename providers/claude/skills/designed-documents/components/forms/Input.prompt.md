Input — labelled text field for DCA forms (donation, contact, operational entry); calm focus ring, optional leading adornment, hint and error states.

```jsx
<Input label="Full name" placeholder="Jane de Vries" />
<Input label="Amount" lead="€" type="number" placeholder="50" hint="One-time donation" />
<Input label="Email" error="Enter a valid email address" />
```

Props: `label`, `hint`, `error` (overrides hint, turns red), `lead` (adornment), `fullWidth` (default true). Forwards all native input props (`type`, `placeholder`, `value`, `onChange`…).
