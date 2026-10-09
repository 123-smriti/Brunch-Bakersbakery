import { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { TESTIMONIALS } from "../../data/constants";

export default function Testimonials() {
  const [i, setI] = useState(0);
  return (
    <section className="sec testi" aria-labelledby="testi-title">
      <div className="sec-in">
        <header className="sec-head">
          <SectionTitle id="testi-title">Testimonials</SectionTitle>
        </header>
        <blockquote aria-live="polite">“{TESTIMONIALS[i][0]}”<cite>{TESTIMONIALS[i][1]}</cite></blockquote>
        <div className="testi-dots">
          {TESTIMONIALS.map((t, k) => (
            <button key={t[1]} type="button" className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Show review ${k + 1} of ${TESTIMONIALS.length}`} aria-current={k === i ? "true" : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
