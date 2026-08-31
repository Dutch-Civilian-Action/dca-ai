/* DCA Website UI kit — shared parts (Header, Footer, PhotoBlock, Icon).
   Composes design-system primitives from window.DesignSystem_cf89c3.
   Icons: Lucide (CDN) — substituted; DCA brand defines no icon set. */

const { Button: DcaButton, Badge: DcaBadge } = window.DesignSystem_cf89c3;

/* Lucide icon helper — renders <i data-lucide> and hydrates after mount. */
function Icon({ name, size = 20, color = "currentColor", strokeWidth = 2, style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = "";
      const el = document.createElement("i");
      el.setAttribute("data-lucide", name);
      ref.current.appendChild(el);
      window.lucide.createIcons({ attrs: { width: size, height: size, stroke: color, "stroke-width": strokeWidth } });
    }
  });
  return <span ref={ref} style={{ display: "inline-flex", width: size, height: size, ...style }} />;
}

function SiteHeader({ route, onNav }) {
  const links = [
    ["operations", "Operations"],
    ["reports", "Reports"],
    ["appeals", "Appeals"],
    ["about", "About"],
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 10,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 var(--gutter-page)", height: 72,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border-subtle)",
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNav("home"); }} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <img src="../../assets/logos/dca-mark.png" alt="DCA" style={{ height: 34, width: "auto" }} />
        <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 900, fontSize: 18, letterSpacing: "-0.01em", color: "var(--text-strong)", lineHeight: 1 }}>
          Dutch Civilian Action
        </span>
      </a>
      <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-6)" }}>
        {links.map(([key, label]) => (
          <a key={key} href="#" onClick={(e) => { e.preventDefault(); onNav(key); }}
            style={{
              fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 15,
              color: route === key ? "var(--dca-blue)" : "var(--text-body)",
              textDecoration: "none",
            }}>
            {label}
          </a>
        ))}
        <DcaButton variant="accent" size="sm" onClick={() => onNav("donate")} iconLeft={<Icon name="heart" size={16} />}>
          Donate
        </DcaButton>
      </nav>
    </header>
  );
}

/* Documentary-style photo placeholder. Brand prefers real operational photos;
   swap these for real imagery in production. */
function PhotoBlock({ label = "Operational photo", height = 320, tone = "dark", radius = "var(--radius-lg)", style = {} }) {
  const bg = tone === "dark" ? "var(--neutral-800)" : "var(--light-grey-blue)";
  const fg = tone === "dark" ? "rgba(255,255,255,0.55)" : "var(--neutral-500)";
  return (
    <div style={{
      position: "relative", height, borderRadius: radius, background: bg, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center", ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px)",
      }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", color: fg }}>
        <Icon name="image" size={28} color={fg} strokeWidth={1.6} />
        <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 12, letterSpacing: "var(--tracking-label)", textTransform: "uppercase" }}>{label}</span>
      </div>
    </div>
  );
}

function SiteFooter({ onNav }) {
  return (
    <footer style={{ background: "var(--dca-black)", color: "rgba(255,255,255,0.7)", padding: "var(--space-8) var(--gutter-page) var(--space-6)" }}>
      <div style={{ maxWidth: "var(--container-page)", margin: "0 auto", display: "flex", justifyContent: "space-between", gap: "var(--space-7)", flexWrap: "wrap" }}>
        <div style={{ maxWidth: 320 }}>
          <img src="../../assets/logos/dca-mark.png" alt="DCA" style={{ height: 38, marginBottom: "var(--space-4)" }} />
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: "rgba(255,255,255,0.6)" }}>
            A civilian humanitarian organisation supporting Ukraine through logistics, operations and transparent reporting.
          </p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-8)", flexWrap: "wrap" }}>
          {[["Organisation", ["About", "Operations", "Partnerships"]], ["Transparency", ["Reports", "Finance", "Appeals"]], ["Connect", ["Volunteer", "Contact", "Newsletter"]]].map(([head, items]) => (
            <div key={head}>
              <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: 12, letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "#fff", marginBottom: "var(--space-3)" }}>{head}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {items.map((i) => <a key={i} href="#" onClick={(e) => e.preventDefault()} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>{i}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: "var(--container-page)", margin: "var(--space-7) auto 0", paddingTop: "var(--space-5)", borderTop: "1px solid rgba(255,255,255,0.12)", display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
        <span>© 2026 Dutch Civilian Action</span>
        <span style={{ fontFamily: "var(--font-mono)" }}>Need → Action → Delivery → Impact</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, SiteHeader, SiteFooter, PhotoBlock });
