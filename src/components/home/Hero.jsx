import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SLIDES } from "../../data/constants";
import useSlider from "../../hooks/useSlider";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// subtle desktop parallax only: a real pointer, a two-column layout and no reduced-motion preference
const canParallax = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (min-width: 861px) and (prefers-reduced-motion: no-preference)").matches;

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);
  const { index, go, next, prev } = useSlider(SLIDES.length, { delay: 7000, paused: hovered || tabHidden || reduceMotion });
  const visual = useRef(null);
  const touchX = useRef(null);

  // Stop autoplay while the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const shift = (x, y) => {
    visual.current?.style.setProperty("--px", x.toFixed(1));
    visual.current?.style.setProperty("--py", y.toFixed(1));
  };
  const onMove = (e) => {
    if (!canParallax()) return;
    const r = e.currentTarget.getBoundingClientRect();
    shift(-((e.clientX - r.left) / r.width - 0.5) * 16, -((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <section
      className={`hero${SLIDES[index].dark ? " is-dark" : ""}`}
      ref={visual}
      onMouseMove={onMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Brunch Bakers highlights"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); shift(0, 0); }}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onKeyDown={onKeyDown}
    >
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Freshly Baked</p>
          <h1 className="hero-title">Own a Slice<br />of the oven.</h1>
          <p className="hero-sub">From celebration cakes to everyday cravings,{" "}<br />freshly baked with love.</p>
          <div className="hero-ctas">
            <Link className="hero-btn primary" to="/products">View Menu</Link>
            <Link className="hero-btn outline" to="/franchise">Become a Franchisee</Link>
          </div>
          <p className="hero-meta">Pure Veg Bakery · Baked fresh every day</p>
        </div>
      </div>

      <div className="hero-bg">
        {SLIDES.map((s, i) => {
          const active = i === index;
          const eager = i === 0;
          return (
            <figure
              key={s.label}
              className={`hero-slide${active ? " is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}: ${s.label}`}
              aria-hidden={!active}
            >
              <div className="hero-shift">
                <img
                  className="hero-img"
                  src={s.src}
                  srcSet={s.srcSet}
                  sizes="100vw"
                  width={s.width}
                  height={s.height}
                  alt={s.alt}
                  style={{ "--pos": s.pos, "--pos-m": s.posM }}
                  loading={eager ? "eager" : "lazy"}
                  fetchpriority={eager ? "high" : "auto"}
                  decoding="async"
                  draggable="false"
                />
              </div>
            </figure>
          );
        })}

        <div className="hero-controls" role="group" aria-label="Choose slide">
          <span className="hero-label" aria-live={hovered ? "polite" : "off"}>{SLIDES[index].label}</span>
          <div className="hero-bars">
            {SLIDES.map((s, k) => (
              <button
                key={s.label}
                type="button"
                className={k === index ? "on" : ""}
                onClick={() => go(k)}
                aria-label={`Show ${s.label}`}
                aria-current={k === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
