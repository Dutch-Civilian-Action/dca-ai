import React from "react";

/**
 * DCA Card — structured content surface. Minimal by default (hairline border,
 * subtle shadow on `raised`). Use `tone` to tint with supporting colours for
 * report sections and info blocks.
 */
export function Card({
  children,
  tone = "default",
  raised = false,
  pad = "md",
  as: Tag = "div",
  style = {},
  ...rest
}) {
  const pads = {
    none: 0,
    sm: "var(--space-4)",
    md: "var(--space-5)",
    lg: "var(--space-6)",
  };
  const tones = {
    default: { background: "var(--surface-card)", borderColor: "var(--border-subtle)" },
    subtle:  { background: "var(--surface-subtle)", borderColor: "var(--border-subtle)" },
    info:    { background: "var(--surface-info)", borderColor: "transparent" },
    calm:    { background: "var(--surface-calm)", borderColor: "transparent" },
    inverse: { background: "var(--surface-inverse)", borderColor: "transparent", color: "var(--text-inverse)" },
  };
  return (
    <Tag
      style={{
        borderRadius: "var(--radius-lg)",
        border: "var(--border-width) solid",
        padding: pads[pad],
        boxShadow: raised ? "var(--shadow-md)" : "var(--shadow-none)",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
