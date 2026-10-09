import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV } from "../../data/constants";
import logo from "../../assets/logo-header.webp"; // same artwork as logo.png, about 4x its display size
import { useCart } from "../../context/CartContext";
import { useDeliveryLocation } from "../../context/LocationContext";
import { PROMOS } from "../../data/promos";

// One icon family (Lucide-style outlines), drawn inline so no dependency is added.
const icon = { viewBox: "0 0 24 24", width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" };
const SearchIcon = () => <svg {...icon}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
const CloseIcon = () => <svg {...icon}><path d="M18 6 6 18M6 6l12 12" /></svg>;
const MenuIcon = () => <svg {...icon}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;

const CALC_HASH = "#investment-calculator";

// "Franchise" and "Investment Calculator" share a page, so tell them apart by the hash.
const isActive = (to, pathname, hash) => {
  const [path, frag] = to.split("#");
  if (pathname !== path) return false;
  if (path === "/franchise") return frag ? hash === `#${frag}` : hash !== CALC_HASH;
  return true;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef(null);
  const burger = useRef(null);
  const hdrRef = useRef(null);
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const { subtotal, applyPromo, promo } = useCart();
  const { openModal } = useDeliveryLocation();
  const [applyOpen, setApplyOpen] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const applyRef = useRef(null);

  useEffect(() => { if (searching) input.current?.focus(); }, [searching]);

  // sticky header: soften into a white bar with a shadow once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // side menu: close on Escape (focus returns to the button), lock page scroll while it is open
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); burger.current?.focus(); } };
    const onResize = () => { if (window.innerWidth > 1100) setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // promo popover: close on outside click or Escape (the buttons that open it manage themselves)
  useEffect(() => {
    if (!applyOpen) return undefined;
    const onDown = (e) => {
      if (e.target.closest?.("[data-code-toggle]")) return;
      if (!applyRef.current?.contains(e.target)) setApplyOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setApplyOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [applyOpen]);

  const tryCode = (raw) => {
    const p = applyPromo(raw);
    if (!p) return setMsg("That code isn't valid. Pick one below.");
    setCode(p.code);
    setMsg(subtotal < p.min ? `${p.code} saved. Add ₹${p.min - subtotal} more to unlock ${p.label}.` : `${p.code} applied: ${p.label} ${p.desc}.`);
  };

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setSearching(false);
    setQuery("");
  };

  const toggleCode = () => { setApplyOpen((o) => !o); setSearching(false); setOpen(false); };
  const codeLabel = promo ? `${promo.code} applied` : "Have a promo code?";

  const links = NAV.map(([label, to]) => {
    if (!to) {
      return <button key={label} type="button" className="nav-link" onClick={() => { setOpen(false); openModal(); }}>{label}</button>;
    }
    const active = isActive(to, pathname, hash);
    return <Link key={label} to={to} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>;
  });

  return (
    <>
      <div className="hdr-ann">
        <p><strong>First order?</strong> Enjoy ₹200 off · Terms apply</p>
        <button type="button" className="ann-code" data-code-toggle onClick={toggleCode} aria-expanded={applyOpen} aria-haspopup="dialog">{codeLabel}</button>
      </div>

      <header className={`hdr${scrolled ? " is-scrolled" : ""}`} ref={hdrRef}>
        <div className="hdr-main">
          <Link className="logo" to="/" aria-label="Brunch Bakers - home">
            <img src={logo} alt="Brunch Bakers - Pure Veg Bakery" width="320" height="320" />
          </Link>

          <nav className="hdr-nav" aria-label="Primary">{links}</nav>

          <div className="hdr-tools">
            <button type="button" className="icon-btn" onClick={() => { setSearching((s) => !s); setApplyOpen(false); setOpen(false); }} aria-label={searching ? "Close search" : "Search"} aria-expanded={searching}>
              {searching ? <CloseIcon /> : <SearchIcon />}
            </button>
            <button type="button" className="cta-order" data-code-toggle onClick={toggleCode} aria-expanded={applyOpen} aria-haspopup="dialog">Apply</button>
            <button ref={burger} type="button" className="icon-btn burger" onClick={() => { setOpen((o) => !o); setSearching(false); setApplyOpen(false); }} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu">
              <MenuIcon />
            </button>
          </div>

          {applyOpen && (
            <div className="hdr-pop" ref={applyRef} role="dialog" aria-label="Apply promo code">
              <h4>Have a promo code?</h4>
              <form onSubmit={(e) => { e.preventDefault(); tryCode(code); }}>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" aria-label="Promo code" autoFocus />
                <button type="submit" className="hdr-btn">Apply</button>
              </form>
              {msg && <small role="status">{msg}</small>}
              <div className="codes">{PROMOS.map((p) => <button type="button" key={p.code} onClick={() => tryCode(p.code)}>{p.code}</button>)}</div>
            </div>
          )}
        </div>

        {searching && (
          <form className="hdr-search" role="search" onSubmit={submit} onKeyDown={(e) => e.key === "Escape" && setSearching(false)}>
            <div className="hdr-search-in">
              <input ref={input} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for cakes, brownies, flavours…" aria-label="Search products" />
              <button type="submit" className="hdr-btn">Search</button>
            </div>
          </form>
        )}

        <div className={`mnav-scrim${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
        <aside id="mobile-menu" className={`mnav${open ? " open" : ""}`} aria-label="Menu">
          <div className="mnav-head">
            <span>Menu</span>
            <button type="button" className="icon-btn" onClick={() => { setOpen(false); burger.current?.focus(); }} aria-label="Close menu"><CloseIcon /></button>
          </div>
          <nav aria-label="Mobile">{links}</nav>
          <div className="mnav-foot">
            <button type="button" className="cta-order" data-code-toggle onClick={toggleCode}>Apply</button>
          </div>
        </aside>
      </header>
    </>
  );
}
