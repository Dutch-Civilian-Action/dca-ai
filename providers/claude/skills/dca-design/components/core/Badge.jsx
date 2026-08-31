import React from "react";

/**
 * DCA Badge — compact label for categories, counts and emphasis.
 * `tone` selects a brand colour; `soft` uses a tinted background with dark
 * text (preferred for dense layouts), otherwise a solid fill.
 */
export function Badge({ children, tone = "neutral", soft = true, style = {}, ...rest }) {
  const map = {
    neutral: { solid: { bg: "var(--neutral-700)", fg: "#fff" }, soft: { bg: "var(--neutral-100)", fg: "var(--neutral-700)" } },
    blue:    { solid: { bg: "var(--dca-blue)", fg: "#fff" },    soft: { bg: "var(--dca-blue-100)", fg: "var(--dca-blue-900)" } },
    orange:  { solid: { bg: "var(--dca-orange)", fg: "var(--dca-black)" }, soft: { bg: "var(--dca-orange-100)", fg: "var(--dca-orange-700)" } },
    yellow:  { solid: { bg: "var(--dca-yellow)", fg: "var(--dca-black)" }, soft: { bg: "var(--dca-yellow-100)", fg: "var(--dca-yellow-700)" } },
    info:    { solid: { bg: "var(--dca-blue)", fg: "#fff" }, soft: { bg: "var(--light-grey-blue)", fg: "var(--dca-blue-900)" } },
  };
  const c = map[tone][soft ? "soft" : "solid"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1)",
        height: 22,
        padding: "0 var(--space-2)",
        borderRadius: "var(--radius-sm)",
        background: c.bg,
        color: c.fg,
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--text-xs)",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
