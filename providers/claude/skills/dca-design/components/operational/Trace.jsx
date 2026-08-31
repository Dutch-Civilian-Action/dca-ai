import React from "react";

/**
 * DCA Trace — the signature operational flow: Need → Action → Delivery →
 * Impact (→ Continuation). Makes humanitarian work traceable from reality to
 * outcome. Each step shows a status tick and a short concrete line.
 */

const STATUS = {
  need:      { color: "var(--status-need)",      soft: "var(--status-need-soft)" },
  planned:   { color: "var(--status-planned)",   soft: "var(--neutral-100)" },
  progress:  { color: "var(--status-progress)",  soft: "var(--status-progress-soft)" },
  delivered: { color: "var(--status-delivered)", soft: "var(--status-delivered-soft)" },
  impact:    { color: "var(--status-impact)",    soft: "var(--dca-yellow-100)" },
};

export function Trace({ steps = [], orientation = "horizontal", style = {}, ...rest }) {
  const horizontal = orientation === "horizontal";
  return (
    <ol
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        gap: horizontal ? "var(--space-2)" : "var(--space-4)",
        listStyle: "none",
        margin: 0,
        padding: 0,
        ...style,
      }}
      {...rest}
    >
      {steps.map((s, i) => {
        const st = STATUS[s.status] || STATUS.planned;
        const last = i === steps.length - 1;
        return (
          <li key={i} style={{ flex: horizontal ? 1 : "none", display: "flex", flexDirection: horizontal ? "column" : "row", gap: "var(--space-3)", position: "relative" }}>
            <div style={{ display: "flex", flexDirection: horizontal ? "row" : "column", alignItems: "center", gap: 0 }}>
              <span style={{
                flex: "none",
                width: 28, height: 28,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                borderRadius: "var(--radius-pill)",
                background: st.soft,
                border: `var(--border-width-thick) solid ${st.color}`,
                color: st.color,
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--text-sm)",
                lineHeight: 1,
              }}>
                {i + 1}
              </span>
              {!last && (
                <span style={{
                  flex: horizontal ? 1 : "none",
                  background: "var(--border-default)",
                  ...(horizontal
                    ? { height: 2, marginLeft: "var(--space-2)", marginRight: "var(--space-2)" }
                    : { width: 2, height: 24, marginTop: "var(--space-2)", marginBottom: "var(--space-2)" }),
                }} />
              )}
            </div>
            <div style={{ paddingBottom: horizontal ? 0 : (last ? 0 : "var(--space-1)") }}>
              <div style={{
                fontFamily: "var(--font-condensed)", fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-eyebrow)", letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase", color: st.color, marginBottom: "var(--space-1)",
              }}>
                {s.stage}
              </div>
              <div style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>
                {s.detail}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
