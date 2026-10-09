import { useRef, useState } from "react";
import { PROMOS } from "../../data/promos";

export default function Promos() {
  const [copied, setCopied] = useState("");
  const [active, setActive] = useState(0);
  const track = useRef(null);

  const copy = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(""), 1500);
  };
  // cards are one card width plus the 20px gap apart
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 20 : 1;
    setActive(Math.round(el.scrollLeft / step));
  };
  const goTo = (i) => {
    const el = track.current;
    const card = el?.firstElementChild;
    if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="sec mint promos" aria-labelledby="promos-title">
      <div className="sec-in">
        <header className="sec-head">
          <h2 id="promos-title">Promos</h2>
        </header>
        <div className="promo-track" ref={track} onScroll={onScroll}>
          {PROMOS.map((p) => (
            <div key={p.code} className="promo">
              <h3>{p.label}</h3>
              <p>{p.desc}</p>
              <button type="button" onClick={() => copy(p.code)}>{copied === p.code ? "Copied!" : `Use Code ${p.code}`}</button>
            </div>
          ))}
        </div>
        <div className="promo-dots">
          {PROMOS.map((p, i) => (
            <button key={p.code} type="button" className={i === active ? "on" : ""} onClick={() => goTo(i)} aria-label={`Show offer ${i + 1}`} aria-current={i === active ? "true" : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
