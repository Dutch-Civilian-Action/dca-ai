import React from "react";

/**
 * DCA Eyebrow — small uppercase overline label that sits above headings to
 * signal section / domain (Logistics, Operations, Fundraising…). Optional
 * leading colour tick reinforces the operational domain.
 */
export function Eyebrow({ children, color = "blue", tick = true, style = {}, ...rest }) {
  const colors = {
    blue: "var(--dca-blue)",
    orange: "var(--dca-orange)",
    yellow: "var(--dca-yellow-700)",
    muted: "var(--text-muted)",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--text-eyebrow)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: colors[color],
        ...style,
      }}
      {...rest}
    >
      {tick && (
        <span style={{ width: 18, height: 3, background: colors[color], borderRadius: 1, display: "inline-block" }} />
      )}
      {children}
    </span>
  );
}
