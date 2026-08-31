/* @ds-bundle: {"format":3,"namespace":"DesignSystem_cf89c3","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Progress","sourcePath":"components/feedback/Progress.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Trace","sourcePath":"components/operational/Trace.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"da33e53455f3","components/core/Button.jsx":"4e7fbda90ea3","components/core/Card.jsx":"ff85cd58a6e9","components/core/Eyebrow.jsx":"66352163b42d","components/core/Stat.jsx":"e5a7f78a5c4e","components/feedback/Progress.jsx":"3c96904a14c4","components/forms/Input.jsx":"32c996bbe764","components/operational/Trace.jsx":"64f5d9e6b5ec","ui_kits/website/parts.jsx":"fcf019d3cf8c","ui_kits/website/screens.jsx":"a7db7dff3b19"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_cf89c3 = window.DesignSystem_cf89c3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Badge — compact label for categories, counts and emphasis.
 * `tone` selects a brand colour; `soft` uses a tinted background with dark
 * text (preferred for dense layouts), otherwise a solid fill.
 */
function Badge({
  children,
  tone = "neutral",
  soft = true,
  style = {},
  ...rest
}) {
  const map = {
    neutral: {
      solid: {
        bg: "var(--neutral-700)",
        fg: "#fff"
      },
      soft: {
        bg: "var(--neutral-100)",
        fg: "var(--neutral-700)"
      }
    },
    blue: {
      solid: {
        bg: "var(--dca-blue)",
        fg: "#fff"
      },
      soft: {
        bg: "var(--dca-blue-100)",
        fg: "var(--dca-blue-900)"
      }
    },
    orange: {
      solid: {
        bg: "var(--dca-orange)",
        fg: "var(--dca-black)"
      },
      soft: {
        bg: "var(--dca-orange-100)",
        fg: "var(--dca-orange-700)"
      }
    },
    yellow: {
      solid: {
        bg: "var(--dca-yellow)",
        fg: "var(--dca-black)"
      },
      soft: {
        bg: "var(--dca-yellow-100)",
        fg: "var(--dca-yellow-700)"
      }
    },
    info: {
      solid: {
        bg: "var(--dca-blue)",
        fg: "#fff"
      },
      soft: {
        bg: "var(--light-grey-blue)",
        fg: "var(--dca-blue-900)"
      }
    }
  };
  const c = map[tone][soft ? "soft" : "solid"];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Button — primary action control.
 * Variants map to brand intent: `primary` (DCA Blue, operational trust),
 * `accent` (DCA Orange, calls to action / urgency), `secondary` (outlined),
 * `ghost` (low-emphasis). Calm hover/press states, no bounce.
 */
function Button({
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
    sm: {
      padding: "0 var(--space-3)",
      height: 36,
      fontSize: "var(--text-sm)"
    },
    md: {
      padding: "0 var(--space-5)",
      height: 44,
      fontSize: "var(--text-base)"
    },
    lg: {
      padding: "0 var(--space-6)",
      height: 52,
      fontSize: "var(--text-body-lg)"
    }
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
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--text-inverse)",
      borderColor: "var(--action-primary)"
    },
    accent: {
      background: "var(--action-accent)",
      color: "var(--dca-black)",
      borderColor: "var(--action-accent)"
    },
    secondary: {
      background: "transparent",
      color: "var(--text-strong)",
      borderColor: "var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--action-primary)",
      borderColor: "transparent"
    }
  };
  const hoverFor = {
    primary: (e, on) => {
      e.currentTarget.style.background = on ? "var(--action-primary-hover)" : "var(--action-primary)";
      e.currentTarget.style.borderColor = on ? "var(--action-primary-hover)" : "var(--action-primary)";
    },
    accent: (e, on) => {
      e.currentTarget.style.background = on ? "var(--action-accent-hover)" : "var(--action-accent)";
      e.currentTarget.style.borderColor = on ? "var(--action-accent-hover)" : "var(--action-accent)";
    },
    secondary: (e, on) => {
      e.currentTarget.style.background = on ? "var(--neutral-050)" : "transparent";
    },
    ghost: (e, on) => {
      e.currentTarget.style.background = on ? "var(--dca-blue-050)" : "transparent";
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => !disabled && hoverFor[variant](e, true),
    onMouseLeave: e => !disabled && hoverFor[variant](e, false),
    onMouseDown: e => !disabled && (e.currentTarget.style.transform = "translateY(1px)"),
    onMouseUp: e => !disabled && (e.currentTarget.style.transform = "none")
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Card — structured content surface. Minimal by default (hairline border,
 * subtle shadow on `raised`). Use `tone` to tint with supporting colours for
 * report sections and info blocks.
 */
function Card({
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
    lg: "var(--space-6)"
  };
  const tones = {
    default: {
      background: "var(--surface-card)",
      borderColor: "var(--border-subtle)"
    },
    subtle: {
      background: "var(--surface-subtle)",
      borderColor: "var(--border-subtle)"
    },
    info: {
      background: "var(--surface-info)",
      borderColor: "transparent"
    },
    calm: {
      background: "var(--surface-calm)",
      borderColor: "transparent"
    },
    inverse: {
      background: "var(--surface-inverse)",
      borderColor: "transparent",
      color: "var(--text-inverse)"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      border: "var(--border-width) solid",
      padding: pads[pad],
      boxShadow: raised ? "var(--shadow-md)" : "var(--shadow-none)",
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Eyebrow — small uppercase overline label that sits above headings to
 * signal section / domain (Logistics, Operations, Fundraising…). Optional
 * leading colour tick reinforces the operational domain.
 */
function Eyebrow({
  children,
  color = "blue",
  tick = true,
  style = {},
  ...rest
}) {
  const colors = {
    blue: "var(--dca-blue)",
    orange: "var(--dca-orange)",
    yellow: "var(--dca-yellow-700)",
    muted: "var(--text-muted)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-condensed)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-eyebrow)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: colors[color],
      ...style
    }
  }, rest), tick && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 3,
      background: colors[color],
      borderRadius: 1,
      display: "inline-block"
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Stat — a single operational figure with label and optional context.
 * Figures use Roboto Mono with tabular numerals so numbers stay aligned and
 * read as concrete, traceable data. Specificity builds trust.
 */
function Stat({
  value,
  label,
  context,
  accent = "blue",
  align = "left",
  style = {},
  ...rest
}) {
  const accents = {
    blue: "var(--dca-blue)",
    orange: "var(--dca-orange)",
    black: "var(--dca-black)",
    delivered: "var(--status-delivered)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--weight-bold)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "clamp(2rem, 1.2rem + 2.4vw, 3rem)",
      lineHeight: 1,
      color: accents[accent],
      letterSpacing: "-0.01em"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-condensed)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-sm)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-strong)"
    }
  }, label), context && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-1)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, context));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Progress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Progress — fundraising / goal progress bar. Shows a concrete raised vs
 * goal figure (specificity builds trust) with a calm filled track. Numbers use
 * Roboto Mono tabular numerals.
 */
function Progress({
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
  const pct = Math.max(0, Math.min(100, max ? value / max * 100 : 0));
  const fills = {
    orange: "var(--dca-orange)",
    blue: "var(--dca-blue)",
    yellow: "var(--dca-yellow)",
    delivered: "var(--status-delivered)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), (label || raised != null && goal != null) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-3)",
      marginBottom: "var(--space-2)"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-sm)",
      color: "var(--text-strong)"
    }
  }, label), raised != null && goal != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)"
    }
  }, raised), " / ", goal)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 10,
      background: "var(--neutral-100)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      width: `${pct}%`,
      background: fills[tone],
      borderRadius: "var(--radius-pill)",
      transition: "width var(--duration-slow) var(--ease-out)"
    }
  })), showPercent && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, Math.round(pct), "% funded"));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Progress.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Input — text field for forms (donation, contact, operational entry).
 * Calm, clear, readable. Supports label, hint, error and a leading adornment
 * (e.g. a currency symbol for donation amounts).
 */
function Input({
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
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: fullWidth ? "block" : "inline-block",
      width: fullWidth ? "100%" : "auto",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "var(--space-2)",
      fontFamily: "var(--font-condensed)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-sm)",
      color: "var(--text-strong)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: 44,
      padding: "0 var(--space-4)",
      background: "var(--neutral-000)",
      border: `var(--border-width) solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
    }
  }, lead && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontWeight: 700
    }
  }, lead), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    onFocus: e => {
      e.currentTarget.parentElement.style.borderColor = "var(--focus-ring)";
      e.currentTarget.parentElement.style.boxShadow = "var(--shadow-focus)";
    },
    onBlur: e => {
      e.currentTarget.parentElement.style.borderColor = borderColor;
      e.currentTarget.parentElement.style.boxShadow = "none";
    },
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-strong)"
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "var(--space-2)",
      fontSize: "var(--text-sm)",
      color: error ? "var(--status-need)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/operational/Trace.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DCA Trace — the signature operational flow: Need → Action → Delivery →
 * Impact (→ Continuation). Makes humanitarian work traceable from reality to
 * outcome. Each step shows a status tick and a short concrete line.
 */

const STATUS = {
  need: {
    color: "var(--status-need)",
    soft: "var(--status-need-soft)"
  },
  planned: {
    color: "var(--status-planned)",
    soft: "var(--neutral-100)"
  },
  progress: {
    color: "var(--status-progress)",
    soft: "var(--status-progress-soft)"
  },
  delivered: {
    color: "var(--status-delivered)",
    soft: "var(--status-delivered-soft)"
  },
  impact: {
    color: "var(--status-impact)",
    soft: "var(--dca-yellow-100)"
  }
};
function Trace({
  steps = [],
  orientation = "horizontal",
  style = {},
  ...rest
}) {
  const horizontal = orientation === "horizontal";
  return /*#__PURE__*/React.createElement("ol", _extends({
    style: {
      display: "flex",
      flexDirection: horizontal ? "row" : "column",
      gap: horizontal ? "var(--space-2)" : "var(--space-4)",
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, rest), steps.map((s, i) => {
    const st = STATUS[s.status] || STATUS.planned;
    const last = i === steps.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        flex: horizontal ? 1 : "none",
        display: "flex",
        flexDirection: horizontal ? "column" : "row",
        gap: "var(--space-3)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        alignItems: "center",
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        width: 28,
        height: 28,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-pill)",
        background: st.soft,
        border: `var(--border-width-thick) solid ${st.color}`,
        color: st.color,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: "var(--text-sm)",
        lineHeight: 1
      }
    }, i + 1), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: horizontal ? 1 : "none",
        background: "var(--border-default)",
        ...(horizontal ? {
          height: 2,
          marginLeft: "var(--space-2)",
          marginRight: "var(--space-2)"
        } : {
          width: 2,
          height: 24,
          marginTop: "var(--space-2)",
          marginBottom: "var(--space-2)"
        })
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: horizontal ? 0 : last ? 0 : "var(--space-1)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-condensed)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--text-eyebrow)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: st.color,
        marginBottom: "var(--space-1)"
      }
    }, s.stage), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--text-sm)",
        color: "var(--text-body)",
        lineHeight: "var(--leading-normal)"
      }
    }, s.detail)));
  }));
}
Object.assign(__ds_scope, { Trace });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/operational/Trace.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/parts.jsx
try { (() => {
/* DCA Website UI kit — shared parts (Header, Footer, PhotoBlock, Icon).
   Composes design-system primitives from window.DesignSystem_cf89c3.
   Icons: Lucide (CDN) — substituted; DCA brand defines no icon set. */

const {
  Button: DcaButton,
  Badge: DcaBadge
} = window.DesignSystem_cf89c3;

/* Lucide icon helper — renders <i data-lucide> and hydrates after mount. */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const el = document.createElement("i");
      el.setAttribute("data-lucide", name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          stroke: color,
          "stroke-width": strokeWidth
        }
      });
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: "inline-flex",
      width: size,
      height: size,
      ...style
    }
  });
}
function SiteHeader({
  route,
  onNav
}) {
  const links = [["operations", "Operations"], ["reports", "Reports"], ["appeals", "Appeals"], ["about", "About"]];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 var(--gutter-page)",
      height: 72,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/dca-mark.png",
    alt: "DCA",
    style: {
      height: 34,
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 900,
      fontSize: 18,
      letterSpacing: "-0.01em",
      color: "var(--text-strong)",
      lineHeight: 1
    }
  }, "Dutch Civilian Action")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)"
    }
  }, links.map(([key, label]) => /*#__PURE__*/React.createElement("a", {
    key: key,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(key);
    },
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 15,
      color: route === key ? "var(--dca-blue)" : "var(--text-body)",
      textDecoration: "none"
    }
  }, label)), /*#__PURE__*/React.createElement(DcaButton, {
    variant: "accent",
    size: "sm",
    onClick: () => onNav("donate"),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 16
    })
  }, "Donate")));
}

/* Documentary-style photo placeholder. Brand prefers real operational photos;
   swap these for real imagery in production. */
function PhotoBlock({
  label = "Operational photo",
  height = 320,
  tone = "dark",
  radius = "var(--radius-lg)",
  style = {}
}) {
  const bg = tone === "dark" ? "var(--neutral-800)" : "var(--light-grey-blue)";
  const fg = tone === "dark" ? "rgba(255,255,255,0.55)" : "var(--neutral-500)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      borderRadius: radius,
      background: bg,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-2)",
      color: fg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 28,
    color: fg,
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase"
    }
  }, label)));
}
function SiteFooter({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--dca-black)",
      color: "rgba(255,255,255,0.7)",
      padding: "var(--space-8) var(--gutter-page) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-page)",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-7)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/dca-mark.png",
    alt: "DCA",
    style: {
      height: 38,
      marginBottom: "var(--space-4)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      margin: 0,
      color: "rgba(255,255,255,0.6)"
    }
  }, "A civilian humanitarian organisation supporting Ukraine through logistics, operations and transparent reporting.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-8)",
      flexWrap: "wrap"
    }
  }, [["Organisation", ["About", "Operations", "Partnerships"]], ["Transparency", ["Reports", "Finance", "Appeals"]], ["Connect", ["Volunteer", "Contact", "Newsletter"]]].map(([head, items]) => /*#__PURE__*/React.createElement("div", {
    key: head
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "#fff",
      marginBottom: "var(--space-3)"
    }
  }, head), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: "rgba(255,255,255,0.6)",
      fontSize: 14,
      textDecoration: "none"
    }
  }, i))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-page)",
      margin: "var(--space-7) auto 0",
      paddingTop: "var(--space-5)",
      borderTop: "1px solid rgba(255,255,255,0.12)",
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      color: "rgba(255,255,255,0.45)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Dutch Civilian Action"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "Need \u2192 Action \u2192 Delivery \u2192 Impact")));
}
Object.assign(window, {
  Icon,
  SiteHeader,
  SiteFooter,
  PhotoBlock
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens.jsx
try { (() => {
/* DCA Website UI kit — screens: Home, Donate, Report.
   Composes DS primitives + shared parts. */

const DS = window.DesignSystem_cf89c3;
const APPEALS = [{
  id: "gen",
  eyebrow: "Urgent appeal",
  tone: "orange",
  title: "Winter generators — Kharkiv",
  body: "Four hospitals need backup power before temperatures drop. Generators sourced; transport funding short.",
  raised: "€12,400",
  goal: "€20,000",
  value: 12400,
  max: 20000,
  tag: ["orange", "Urgent"]
}, {
  id: "fuel",
  eyebrow: "Logistics",
  tone: "blue",
  title: "Evacuation fuel fund",
  body: "Diesel keeps evacuation transport running for frontline communities. Funds cover the next operational window.",
  raised: "€4,800",
  goal: "€6,000",
  value: 4800,
  max: 6000,
  tag: ["blue", "In progress"]
}, {
  id: "med",
  eyebrow: "Delivered",
  tone: "delivered",
  title: "Medical supplies — Sumy",
  body: "Trauma and first-aid kits requested by two clinics. Delivery completed; restock planned for April.",
  raised: "€9,000",
  goal: "€9,000",
  value: 9000,
  max: 9000,
  tag: ["info", "Delivered"]
}];
function SectionHead({
  eyebrow,
  title,
  lede,
  color
}) {
  const {
    Eyebrow
  } = DS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: color || "blue"
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      margin: "var(--space-3) 0 var(--space-3)"
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lead)",
      color: "var(--text-body)",
      margin: 0
    }
  }, lede));
}
function AppealCard({
  a,
  onNav
}) {
  const {
    Card,
    Badge,
    Progress,
    Button
  } = DS;
  return /*#__PURE__*/React.createElement(Card, {
    raised: true,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(PhotoBlock, {
    label: "Operational photo",
    height: 150,
    radius: "0"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-5) var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: a.tag[0]
  }, a.tag[1])), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-h3)",
      margin: 0
    }
  }, a.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      margin: 0,
      flex: 1
    }
  }, a.body), /*#__PURE__*/React.createElement(Progress, {
    raised: a.raised,
    goal: a.goal,
    value: a.value,
    max: a.max,
    tone: a.tone,
    showPercent: false
  }), /*#__PURE__*/React.createElement(Button, {
    variant: a.value >= a.max ? "secondary" : "primary",
    fullWidth: true,
    onClick: () => onNav("donate")
  }, a.value >= a.max ? "View report" : "Support this appeal")));
}
function HomeScreen({
  onNav
}) {
  const {
    Eyebrow,
    Button,
    Stat,
    Trace,
    Card
  } = DS;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-8) var(--gutter-page)",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-page)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: "var(--space-8)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "orange"
  }, "Civilian humanitarian logistics"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-display)",
      margin: "var(--space-4) 0 var(--space-4)",
      lineHeight: 1.02
    }
  }, "Support that stays traceable from need to impact."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lead)",
      color: "var(--text-body)",
      maxWidth: 520,
      margin: "0 0 var(--space-6)"
    }
  }, "We move real aid to frontline communities in Ukraine \u2014 logistics, evacuations and direct delivery \u2014 and we show you exactly how it connects."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => onNav("donate"),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 18
    })
  }, "Donate now"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav("reports"),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "file-text",
      size: 18
    })
  }, "Read a report")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "1,240",
    label: "Boxes delivered",
    context: "Last 30 days"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "38",
    label: "Operations",
    accent: "orange",
    context: "2026 to date"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "100%",
    label: "Traceable",
    accent: "delivered",
    context: "Need \u2192 Impact"
  }))), /*#__PURE__*/React.createElement(PhotoBlock, {
    label: "Loading \xB7 Rotterdam depot",
    height: 420
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-page)",
      background: "var(--surface-info)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-page)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "How it works",
    title: "Every delivery, traced end to end",
    lede: "We connect each operation through one structure, so support never becomes an abstraction."
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Trace, {
    steps: [{
      stage: "Need",
      detail: "Kharkiv hospital needed 4 generators before winter.",
      status: "need"
    }, {
      stage: "Action",
      detail: "Sourced in Rotterdam and loaded over two days.",
      status: "progress"
    }, {
      stage: "Delivery",
      detail: "Convoy completed delivery on 18 March.",
      status: "delivered"
    }, {
      stage: "Impact",
      detail: "Generators operational; fuel support continues.",
      status: "impact"
    }]
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-page)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Current appeals",
    title: "Where support is needed now"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onNav("appeals"),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    style: {
      marginBottom: "var(--space-6)"
    }
  }, "All appeals")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-5)"
    }
  }, APPEALS.map(a => /*#__PURE__*/React.createElement(AppealCard, {
    key: a.id,
    a: a,
    onNav: onNav
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-page)",
      background: "var(--dca-black)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-page)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-8)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "yellow"
  }, "Transparency first"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h2)",
      color: "#fff",
      margin: "var(--space-3) 0 var(--space-4)"
    }
  }, "\u201CFuel funding supported evacuation transport for the past 7 days.\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "rgba(255,255,255,0.7)",
      fontSize: "var(--text-body-lg)",
      margin: 0
    }
  }, "We report what actually happened \u2014 concrete numbers, real locations, real operations. Specificity is how trust is earned.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "\u20AC184k",
    label: "Funds deployed",
    context: "2026 to date",
    accent: "orange",
    style: {
      color: "#fff"
    }
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "22",
    label: "Partner orgs",
    accent: "blue"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "9",
    label: "Regions reached",
    accent: "delivered"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "14",
    label: "Reports published",
    accent: "orange"
  })))));
}
function DonateScreen({
  onNav
}) {
  const {
    Eyebrow,
    Button,
    Input,
    Card,
    Trace,
    Badge
  } = DS;
  const [amount, setAmount] = React.useState(50);
  const [freq, setFreq] = React.useState("once");
  const chips = [25, 50, 100, 250];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "var(--space-7) var(--gutter-page) var(--section-y)",
      background: "var(--surface-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("home"),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 14,
      marginBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 0.9fr",
      gap: "var(--space-7)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    raised: true,
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "orange"
  }, "Urgent appeal"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-h2)",
      margin: "var(--space-3) 0 var(--space-2)"
    }
  }, "Winter generators \u2014 Kharkiv"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-body)",
      margin: "0 0 var(--space-6)"
    }
  }, "Your support funds transport for generators already sourced and ready to move."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      marginBottom: "var(--space-5)"
    }
  }, [["once", "One-time"], ["monthly", "Monthly"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setFreq(k),
    style: {
      flex: 1,
      height: 44,
      cursor: "pointer",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 15,
      border: `2px solid ${freq === k ? "var(--dca-blue)" : "var(--border-default)"}`,
      background: freq === k ? "var(--dca-blue-050)" : "transparent",
      color: freq === k ? "var(--dca-blue-900)" : "var(--text-body)"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--space-2)",
      marginBottom: "var(--space-4)"
    }
  }, chips.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setAmount(c),
    style: {
      height: 52,
      cursor: "pointer",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-mono)",
      fontWeight: 700,
      fontSize: 18,
      border: `2px solid ${amount === c ? "var(--dca-orange)" : "var(--border-default)"}`,
      background: amount === c ? "var(--dca-orange-050)" : "transparent",
      color: "var(--text-strong)"
    }
  }, "\u20AC", c))), /*#__PURE__*/React.createElement(Input, {
    label: "Other amount",
    lead: "\u20AC",
    type: "number",
    value: amount,
    onChange: e => setAmount(e.target.value),
    style: {
      marginBottom: "var(--space-5)"
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email for receipt",
    type: "email",
    placeholder: "you@example.com",
    style: {
      marginBottom: "var(--space-6)"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 18
    })
  }, "Donate \u20AC", amount, " ", freq === "monthly" ? "/ month" : ""), /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      justifyContent: "center",
      fontSize: 13,
      color: "var(--text-muted)",
      margin: "var(--space-4) 0 0"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 14
  }), " Funds are tracked to specific operations.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "info",
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "muted"
  }, "This operation"), /*#__PURE__*/React.createElement(Badge, {
    tone: "orange"
  }, "Urgent")), /*#__PURE__*/React.createElement(Trace, {
    orientation: "vertical",
    steps: [{
      stage: "Need",
      detail: "4 generators requested by Kharkiv hospitals.",
      status: "need"
    }, {
      stage: "Action",
      detail: "Sourced; awaiting transport funding.",
      status: "progress"
    }, {
      stage: "Delivery",
      detail: "Convoy planned once funded.",
      status: "planned"
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "var(--text-body)",
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)"
    }
  }, "What your donation does."), " \u20AC50 funds roughly one operational hour of convoy transport. We report delivery and impact once complete."))))));
}
function ReportScreen({
  onNav
}) {
  const {
    Eyebrow,
    Stat,
    Trace,
    Badge,
    Card
  } = DS;
  const log = [["2026-03-12", "Sourced", "4× diesel generators (Rotterdam)", "progress", "In progress"], ["2026-03-14", "Loaded", "Convoy DCA-0421 prepared", "progress", "In progress"], ["2026-03-16", "In transit", "Border crossing cleared", "progress", "In progress"], ["2026-03-18", "Delivered", "Handover to Kharkiv hospital", "delivered", "Delivered"]];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "var(--space-7) var(--gutter-page) var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-md)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("home"),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 14,
      marginBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 16
  }), " All reports"), /*#__PURE__*/React.createElement(Eyebrow, null, "Operational report"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--text-h1)",
      margin: "var(--space-3) 0 var(--space-3)"
    }
  }, "Winter generators delivered to Kharkiv"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center",
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "REF #DCA-0421"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Published 20 Mar 2026"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "Delivered")), /*#__PURE__*/React.createElement(PhotoBlock, {
    label: "Delivery \xB7 Kharkiv hospital",
    height: 300,
    style: {
      marginBottom: "var(--space-6)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lead)",
      color: "var(--text-strong)",
      marginBottom: "var(--space-5)"
    }
  }, "Four hospitals in the Kharkiv region requested backup power before winter. Generators were sourced, transported and handed over within nine days."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-5)",
      margin: "var(--space-6) 0"
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "4",
    label: "Generators"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "9 days",
    label: "Need to delivery",
    accent: "orange"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "\u20AC18,200",
    label: "Operation cost",
    accent: "delivered"
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "info",
    style: {
      padding: "var(--space-6)",
      margin: "var(--space-6) 0"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "muted"
  }, "Traceability"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Trace, {
    steps: [{
      stage: "Need",
      detail: "4 generators requested",
      status: "need"
    }, {
      stage: "Action",
      detail: "Sourced & loaded",
      status: "delivered"
    }, {
      stage: "Delivery",
      detail: "Handover 18 Mar",
      status: "delivered"
    }, {
      stage: "Impact",
      detail: "Power restored",
      status: "impact"
    }]
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-h3)",
      margin: "var(--space-6) 0 var(--space-4)"
    }
  }, "Delivery log"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, log.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: "120px 110px 1fr auto",
      gap: "var(--space-4)",
      alignItems: "center",
      padding: "var(--space-4) var(--space-5)",
      borderTop: i ? "1px solid var(--border-subtle)" : "none",
      background: i % 2 ? "var(--neutral-050)" : "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-strong)"
    }
  }, r[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-body)"
    }
  }, r[2]), /*#__PURE__*/React.createElement(Badge, {
    tone: r[3] === "delivered" ? "info" : "blue"
  }, r[4])))), /*#__PURE__*/React.createElement(Card, {
    tone: "calm",
    style: {
      padding: "var(--space-5)",
      marginTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "var(--text-body)",
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)"
    }
  }, "Continuation."), " The generators are operational. Continued fuel support is still needed to keep them running through winter."))));
}
Object.assign(window, {
  HomeScreen,
  DonateScreen,
  ReportScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Trace = __ds_scope.Trace;

})();
