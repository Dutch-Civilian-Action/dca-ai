import React from "react";

/**
 * DCA Button — primary action control.
 * Variants map to brand intent: `primary` (DCA Blue, operational trust),
 * `accent` (DCA Orange, calls to action / urgency), `secondary` (outlined),
 * `ghost` (low-emphasis). Calm hover/press states, no bounce.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "0 var(--space-3)", height: 36, fontSize: "var(--text-sm)" },
    md: { padding: "0 var(--space-5)", height: 44, fontSize: "var(--text-base)" },
    lg: { padding: "0 var(--space-6)", height: 52, fontSize: "var(--text-body-lg)" },
  };

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-condensed)",
    fontWeight: "var(--weight-bold)",
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    border: "var(--border-width-thick) solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
    WebkitTapHighlightColor: "transparent",
    ...sizes[size],
  };

  const variants = {
    primary: { background: "var(--action-primary)", color: "var(--text-inverse)", borderColor: "var(--action-primary)" },
    accent:  { background: "var(--action-accent)", color: "var(--dca-black)", borderColor: "var(--action-accent)" },
    secondary: { background: "transparent", color: "var(--text-strong)", borderColor: "var(--border-strong)" },
    ghost: { background: "transparent", color: "var(--action-primary)", borderColor: "transparent" },
  };

  const hoverFor = {
    primary: (e, on) => { e.currentTarget.style.background = on ? "var(--action-primary-hover)" : "var(--action-primary)"; e.currentTarget.style.borderColor = on ? "var(--action-primary-hover)" : "var(--action-primary)"; },
    accent:  (e, on) => { e.currentTarget.style.background = on ? "var(--action-accent-hover)" : "var(--action-accent)"; e.currentTarget.style.borderColor = on ? "var(--action-accent-hover)" : "var(--action-accent)"; },
    secondary: (e, on) => { e.currentTarget.style.background = on ? "var(--neutral-050)" : "transparent"; },
    ghost: (e, on) => { e.currentTarget.style.background = on ? "var(--dca-blue-050)" : "transparent"; },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => !disabled && hoverFor[variant](e, true)}
      onMouseLeave={(e) => !disabled && hoverFor[variant](e, false)}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = "none")}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
