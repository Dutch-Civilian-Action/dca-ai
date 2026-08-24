import React from "react";

/**
 * DCA Input — text field for forms (donation, contact, operational entry).
 * Calm, clear, readable. Supports label, hint, error and a leading adornment
 * (e.g. a currency symbol for donation amounts).
 */
export function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  lead = null,
  fullWidth = true,
  style = {},
  ...rest
}) {
  const fieldId = id || (label ? `in-${String(label).toLowerCase().replace(/\s+/g, "-")}` : undefined);
  const borderColor = error ? "var(--status-need)" : "var(--border-default)";
  return (
    <label htmlFor={fieldId} style={{ display: fullWidth ? "block" : "inline-block", width: fullWidth ? "100%" : "auto", ...style }}>
      {label && (
        <span style={{
          display: "block",
          marginBottom: "var(--space-2)",
          fontFamily: "var(--font-condensed)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--text-sm)",
          color: "var(--text-strong)",
        }}>
          {label}
        </span>
      )}
      <span style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        height: 44,
        padding: "0 var(--space-4)",
        background: "var(--neutral-000)",
        border: `var(--border-width) solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
      }}>
        {lead && <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{lead}</span>}
        <input
          id={fieldId}
          type={type}
          onFocus={(e) => { e.currentTarget.parentElement.style.borderColor = "var(--focus-ring)"; e.currentTarget.parentElement.style.boxShadow = "var(--shadow-focus)"; }}
          onBlur={(e) => { e.currentTarget.parentElement.style.borderColor = borderColor; e.currentTarget.parentElement.style.boxShadow = "none"; }}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-base)",
            color: "var(--text-strong)",
          }}
          {...rest}
        />
      </span>
      {(hint || error) && (
        <span style={{
          display: "block",
          marginTop: "var(--space-2)",
          fontSize: "var(--text-sm)",
          color: error ? "var(--status-need)" : "var(--text-muted)",
        }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}
