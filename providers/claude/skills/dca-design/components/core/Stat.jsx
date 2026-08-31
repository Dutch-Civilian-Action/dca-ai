import React from "react";

/**
 * DCA Stat — a single operational figure with label and optional context.
 * Figures use Roboto Mono with tabular numerals so numbers stay aligned and
 * read as concrete, traceable data. Specificity builds trust.
 */
export function Stat({ value, label, context, accent = "blue", align = "left", style = {}, ...rest }) {
  const accents = {
    blue: "var(--dca-blue)",
    orange: "var(--dca-orange)",
    black: "var(--dca-black)",
    delivered: "var(--status-delivered)",
  };
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: "var(--weight-bold)",
          fontVariantNumeric: "tabular-nums",
          fontSize: "clamp(2rem, 1.2rem + 2.4vw, 3rem)",
          lineHeight: 1,
          color: accents[accent],
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-condensed)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--text-sm)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--text-strong)",
        }}
      >
        {label}
      </div>
      {context && (
        <div style={{ marginTop: "var(--space-1)", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
          {context}
        </div>
      )}
    </div>
  );
}
