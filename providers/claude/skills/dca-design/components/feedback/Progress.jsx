import React from "react";

/**
 * DCA Progress — fundraising / goal progress bar. Shows a concrete raised vs
 * goal figure (specificity builds trust) with a calm filled track. Numbers use
 * Roboto Mono tabular numerals.
 */
export function Progress({
  value = 0,
  max = 100,
  label,
  raised,
  goal,
  tone = "orange",
  showPercent = true,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
  const fills = {
    orange: "var(--dca-orange)",
    blue: "var(--dca-blue)",
    yellow: "var(--dca-yellow)",
    delivered: "var(--status-delivered)",
  };
  return (
    <div style={style} {...rest}>
      {(label || (raised != null && goal != null)) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
          {label && (
            <span style={{ fontFamily: "var(--font-condensed)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-sm)", color: "var(--text-strong)" }}>
              {label}
            </span>
          )}
          {raised != null && goal != null && (
            <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
              <strong style={{ color: "var(--text-strong)" }}>{raised}</strong> / {goal}
            </span>
          )}
        </div>
      )}
      <div style={{ position: "relative", height: 10, background: "var(--neutral-100)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          inset: 0,
          width: `${pct}%`,
          background: fills[tone],
          borderRadius: "var(--radius-pill)",
          transition: "width var(--duration-slow) var(--ease-out)",
        }} />
      </div>
      {showPercent && (
        <div style={{ marginTop: "var(--space-2)", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
          {Math.round(pct)}% funded
        </div>
      )}
    </div>
  );
}
