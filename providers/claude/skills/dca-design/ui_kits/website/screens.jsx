/* DCA Website UI kit — screens: Home, Donate, Report.
   Composes DS primitives + shared parts. */

const DS = window.DesignSystem_cf89c3;

const APPEALS = [
  { id: "gen", eyebrow: "Urgent appeal", tone: "orange", title: "Winter generators — Kharkiv", body: "Four hospitals need backup power before temperatures drop. Generators sourced; transport funding short.", raised: "€12,400", goal: "€20,000", value: 12400, max: 20000, tag: ["orange", "Urgent"] },
  { id: "fuel", eyebrow: "Logistics", tone: "blue", title: "Evacuation fuel fund", body: "Diesel keeps evacuation transport running for frontline communities. Funds cover the next operational window.", raised: "€4,800", goal: "€6,000", value: 4800, max: 6000, tag: ["blue", "In progress"] },
  { id: "med", eyebrow: "Delivered", tone: "delivered", title: "Medical supplies — Sumy", body: "Trauma and first-aid kits requested by two clinics. Delivery completed; restock planned for April.", raised: "€9,000", goal: "€9,000", value: 9000, max: 9000, tag: ["info", "Delivered"] },
];

function SectionHead({ eyebrow, title, lede, color }) {
  const { Eyebrow } = DS;
  return (
    <div style={{ maxWidth: 720, marginBottom: "var(--space-6)" }}>
      <Eyebrow color={color || "blue"}>{eyebrow}</Eyebrow>
      <h2 style={{ fontSize: "var(--text-h2)", margin: "var(--space-3) 0 var(--space-3)" }}>{title}</h2>
      {lede && <p style={{ fontSize: "var(--text-lead)", color: "var(--text-body)", margin: 0 }}>{lede}</p>}
    </div>
  );
}

function AppealCard({ a, onNav }) {
  const { Card, Badge, Progress, Button } = DS;
  return (
    <Card raised style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", padding: 0, overflow: "hidden" }}>
      <PhotoBlock label="Operational photo" height={150} radius="0" />
      <div style={{ padding: "0 var(--space-5) var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-4)", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <Badge tone={a.tag[0]}>{a.tag[1]}</Badge>
        </div>
        <h3 style={{ fontSize: "var(--text-h3)", margin: 0 }}>{a.title}</h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", margin: 0, flex: 1 }}>{a.body}</p>
        <Progress raised={a.raised} goal={a.goal} value={a.value} max={a.max} tone={a.tone} showPercent={false} />
        <Button variant={a.value >= a.max ? "secondary" : "primary"} fullWidth onClick={() => onNav("donate")}>
          {a.value >= a.max ? "View report" : "Support this appeal"}
        </Button>
      </div>
    </Card>
  );
}

function HomeScreen({ onNav }) {
  const { Eyebrow, Button, Stat, Trace, Card } = DS;
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "var(--space-8) var(--gutter-page)", background: "var(--surface-page)" }}>
        <div style={{ maxWidth: "var(--container-page)", margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "var(--space-8)", alignItems: "center" }}>
          <div>
            <Eyebrow color="orange">Civilian humanitarian logistics</Eyebrow>
            <h1 style={{ fontSize: "var(--text-display)", margin: "var(--space-4) 0 var(--space-4)", lineHeight: 1.02 }}>
              Support that stays traceable from need to impact.
            </h1>
            <p style={{ fontSize: "var(--text-lead)", color: "var(--text-body)", maxWidth: 520, margin: "0 0 var(--space-6)" }}>
              We move real aid to frontline communities in Ukraine — logistics, evacuations and direct delivery — and we show you exactly how it connects.
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-7)" }}>
              <Button variant="accent" size="lg" onClick={() => onNav("donate")} iconLeft={<Icon name="heart" size={18} />}>Donate now</Button>
              <Button variant="secondary" size="lg" onClick={() => onNav("reports")} iconLeft={<Icon name="file-text" size={18} />}>Read a report</Button>
            </div>
            <div style={{ display: "flex", gap: "var(--space-7)" }}>
              <Stat value="1,240" label="Boxes delivered" context="Last 30 days" />
              <Stat value="38" label="Operations" accent="orange" context="2026 to date" />
              <Stat value="100%" label="Traceable" accent="delivered" context="Need → Impact" />
            </div>
          </div>
          <PhotoBlock label="Loading · Rotterdam depot" height={420} />
        </div>
      </section>

      {/* Traceability band */}
      <section style={{ padding: "var(--section-y) var(--gutter-page)", background: "var(--surface-info)" }}>
        <div style={{ maxWidth: "var(--container-page)", margin: "0 auto" }}>
          <SectionHead eyebrow="How it works" title="Every delivery, traced end to end" lede="We connect each operation through one structure, so support never becomes an abstraction." />
          <Card style={{ padding: "var(--space-6)" }}>
            <Trace steps={[
              { stage: "Need", detail: "Kharkiv hospital needed 4 generators before winter.", status: "need" },
              { stage: "Action", detail: "Sourced in Rotterdam and loaded over two days.", status: "progress" },
              { stage: "Delivery", detail: "Convoy completed delivery on 18 March.", status: "delivered" },
              { stage: "Impact", detail: "Generators operational; fuel support continues.", status: "impact" },
            ]} />
          </Card>
        </div>
      </section>

      {/* Appeals */}
      <section style={{ padding: "var(--section-y) var(--gutter-page)" }}>
        <div style={{ maxWidth: "var(--container-page)", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--space-4)" }}>
            <SectionHead eyebrow="Current appeals" title="Where support is needed now" />
            <Button variant="ghost" onClick={() => onNav("appeals")} iconRight={<Icon name="arrow-right" size={16} />} style={{ marginBottom: "var(--space-6)" }}>All appeals</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-5)" }}>
            {APPEALS.map((a) => <AppealCard key={a.id} a={a} onNav={onNav} />)}
          </div>
        </div>
      </section>

      {/* Impact band */}
      <section style={{ padding: "var(--section-y) var(--gutter-page)", background: "var(--dca-black)", color: "#fff" }}>
        <div style={{ maxWidth: "var(--container-page)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)", alignItems: "center" }}>
          <div>
            <Eyebrow color="yellow">Transparency first</Eyebrow>
            <h2 style={{ fontSize: "var(--text-h2)", color: "#fff", margin: "var(--space-3) 0 var(--space-4)" }}>“Fuel funding supported evacuation transport for the past 7 days.”</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--text-body-lg)", margin: 0 }}>
              We report what actually happened — concrete numbers, real locations, real operations. Specificity is how trust is earned.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
            <Stat value="€184k" label="Funds deployed" context="2026 to date" accent="orange" style={{ color: "#fff" }} />
            <Stat value="22" label="Partner orgs" accent="blue" />
            <Stat value="9" label="Regions reached" accent="delivered" />
            <Stat value="14" label="Reports published" accent="orange" />
          </div>
        </div>
      </section>
    </main>
  );
}

function DonateScreen({ onNav }) {
  const { Eyebrow, Button, Input, Card, Trace, Badge } = DS;
  const [amount, setAmount] = React.useState(50);
  const [freq, setFreq] = React.useState("once");
  const chips = [25, 50, 100, 250];
  return (
    <main style={{ padding: "var(--space-7) var(--gutter-page) var(--section-y)", background: "var(--surface-subtle)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <button onClick={() => onNav("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 14, marginBottom: "var(--space-5)" }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: "var(--space-7)", alignItems: "start" }}>
          {/* Form */}
          <Card raised style={{ padding: "var(--space-6)" }}>
            <Eyebrow color="orange">Urgent appeal</Eyebrow>
            <h1 style={{ fontSize: "var(--text-h2)", margin: "var(--space-3) 0 var(--space-2)" }}>Winter generators — Kharkiv</h1>
            <p style={{ color: "var(--text-body)", margin: "0 0 var(--space-6)" }}>Your support funds transport for generators already sourced and ready to move.</p>

            <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-5)" }}>
              {[["once", "One-time"], ["monthly", "Monthly"]].map(([k, l]) => (
                <button key={k} onClick={() => setFreq(k)} style={{
                  flex: 1, height: 44, cursor: "pointer", borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 15,
                  border: `2px solid ${freq === k ? "var(--dca-blue)" : "var(--border-default)"}`,
                  background: freq === k ? "var(--dca-blue-050)" : "transparent",
                  color: freq === k ? "var(--dca-blue-900)" : "var(--text-body)",
                }}>{l}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
              {chips.map((c) => (
                <button key={c} onClick={() => setAmount(c)} style={{
                  height: 52, cursor: "pointer", borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18,
                  border: `2px solid ${amount === c ? "var(--dca-orange)" : "var(--border-default)"}`,
                  background: amount === c ? "var(--dca-orange-050)" : "transparent",
                  color: "var(--text-strong)",
                }}>€{c}</button>
              ))}
            </div>
            <Input label="Other amount" lead="€" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ marginBottom: "var(--space-5)" }} />
            <Input label="Email for receipt" type="email" placeholder="you@example.com" style={{ marginBottom: "var(--space-6)" }} />
            <Button variant="accent" size="lg" fullWidth iconLeft={<Icon name="heart" size={18} />}>
              Donate €{amount} {freq === "monthly" ? "/ month" : ""}
            </Button>
            <p style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", fontSize: 13, color: "var(--text-muted)", margin: "var(--space-4) 0 0" }}>
              <Icon name="shield-check" size={14} /> Funds are tracked to specific operations.
            </p>
          </Card>

          {/* Where it goes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <Card tone="info" style={{ padding: "var(--space-6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
                <Eyebrow color="muted">This operation</Eyebrow>
                <Badge tone="orange">Urgent</Badge>
              </div>
              <Trace orientation="vertical" steps={[
                { stage: "Need", detail: "4 generators requested by Kharkiv hospitals.", status: "need" },
                { stage: "Action", detail: "Sourced; awaiting transport funding.", status: "progress" },
                { stage: "Delivery", detail: "Convoy planned once funded.", status: "planned" },
              ]} />
            </Card>
            <Card style={{ padding: "var(--space-5)" }}>
              <p style={{ margin: 0, fontSize: 14, color: "var(--text-body)", lineHeight: 1.6 }}>
                <strong style={{ color: "var(--text-strong)" }}>What your donation does.</strong> €50 funds roughly one operational hour of convoy transport. We report delivery and impact once complete.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function ReportScreen({ onNav }) {
  const { Eyebrow, Stat, Trace, Badge, Card } = DS;
  const log = [
    ["2026-03-12", "Sourced", "4× diesel generators (Rotterdam)", "progress", "In progress"],
    ["2026-03-14", "Loaded", "Convoy DCA-0421 prepared", "progress", "In progress"],
    ["2026-03-16", "In transit", "Border crossing cleared", "progress", "In progress"],
    ["2026-03-18", "Delivered", "Handover to Kharkiv hospital", "delivered", "Delivered"],
  ];
  return (
    <main style={{ padding: "var(--space-7) var(--gutter-page) var(--section-y)" }}>
      <div style={{ maxWidth: "var(--container-md)", margin: "0 auto" }}>
        <button onClick={() => onNav("home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 14, marginBottom: "var(--space-5)" }}>
          <Icon name="arrow-left" size={16} /> All reports
        </button>
        <Eyebrow>Operational report</Eyebrow>
        <h1 style={{ fontSize: "var(--text-h1)", margin: "var(--space-3) 0 var(--space-3)" }}>Winter generators delivered to Kharkiv</h1>
        <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 13, marginBottom: "var(--space-6)" }}>
          <span>REF #DCA-0421</span><span>·</span><span>Published 20 Mar 2026</span><span>·</span><Badge tone="info">Delivered</Badge>
        </div>
        <PhotoBlock label="Delivery · Kharkiv hospital" height={300} style={{ marginBottom: "var(--space-6)" }} />

        <p style={{ fontSize: "var(--text-lead)", color: "var(--text-strong)", marginBottom: "var(--space-5)" }}>
          Four hospitals in the Kharkiv region requested backup power before winter. Generators were sourced, transported and handed over within nine days.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-5)", margin: "var(--space-6) 0" }}>
          <Stat value="4" label="Generators" />
          <Stat value="9 days" label="Need to delivery" accent="orange" />
          <Stat value="€18,200" label="Operation cost" accent="delivered" />
        </div>

        <Card tone="info" style={{ padding: "var(--space-6)", margin: "var(--space-6) 0" }}>
          <Eyebrow color="muted">Traceability</Eyebrow>
          <div style={{ marginTop: "var(--space-4)" }}>
            <Trace steps={[
              { stage: "Need", detail: "4 generators requested", status: "need" },
              { stage: "Action", detail: "Sourced & loaded", status: "delivered" },
              { stage: "Delivery", detail: "Handover 18 Mar", status: "delivered" },
              { stage: "Impact", detail: "Power restored", status: "impact" },
            ]} />
          </div>
        </Card>

        <h2 style={{ fontSize: "var(--text-h3)", margin: "var(--space-6) 0 var(--space-4)" }}>Delivery log</h2>
        <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {log.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 110px 1fr auto", gap: "var(--space-4)", alignItems: "center", padding: "var(--space-4) var(--space-5)", borderTop: i ? "1px solid var(--border-subtle)" : "none", background: i % 2 ? "var(--neutral-050)" : "#fff" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)" }}>{r[0]}</span>
              <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 14, color: "var(--text-strong)" }}>{r[1]}</span>
              <span style={{ fontSize: 14, color: "var(--text-body)" }}>{r[2]}</span>
              <Badge tone={r[3] === "delivered" ? "info" : "blue"}>{r[4]}</Badge>
            </div>
          ))}
        </div>

        <Card tone="calm" style={{ padding: "var(--space-5)", marginTop: "var(--space-6)" }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--text-body)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text-strong)" }}>Continuation.</strong> The generators are operational. Continued fuel support is still needed to keep them running through winter.
          </p>
        </Card>
      </div>
    </main>
  );
}

Object.assign(window, { HomeScreen, DonateScreen, ReportScreen });
