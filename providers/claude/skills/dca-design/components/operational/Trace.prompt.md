Trace — the signature DCA operational flow that makes work traceable: Need → Action → Delivery → Impact. Use on campaign, report and delivery-confirmation views.

```jsx
<Trace steps={[
  { stage: "Need", detail: "Kharkiv hospital needed 4 generators", status: "need" },
  { stage: "Action", detail: "Sourced and loaded in Rotterdam", status: "progress" },
  { stage: "Delivery", detail: "Convoy completed 18 Mar", status: "delivered" },
  { stage: "Impact", detail: "Generators operational; support continues", status: "impact" },
]} />
```

Each step: `stage`, `detail`, `status` (need | planned | progress | delivered | impact). `orientation` horizontal (default) or vertical. Keep details concrete and specific.
