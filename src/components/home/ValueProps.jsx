import { Link } from "react-router-dom";
import { VALUES } from "../../data/constants";
import "../../styles/story.css";
import photo from "../../assets/signature/desserts.webp";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// "Our Story" split section: copy on the left, blob-masked photo and a handwritten note on the right.
// showCta hides the button where it would just link back to the page you are already on (About).
// showValues adds the four brand values underneath (used on About).
export default function ValueProps({ showCta = true, showValues = false }) {
  return (
    <section className="ourstory" aria-labelledby="story-title">
      {/* clip path shared by the photo, defined once in bounding-box units so it scales with the image */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="story-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.12,0.16 C0.2,0.02 0.42,0 0.6,0.03 C0.8,0.06 0.95,0.1 0.985,0.3 C1,0.5 0.97,0.7 0.9,0.84 C0.82,0.97 0.62,1 0.44,0.99 C0.24,0.98 0.07,0.94 0.02,0.76 C-0.03,0.58 0.04,0.3 0.12,0.16 Z" />
          </clipPath>
        </defs>
      </svg>

      <svg className="ourstory-curve" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <path d="M2 198 C10 110 60 40 198 6" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="ourstory-in">
        <div className="ourstory-copy">
          <p className="ourstory-eyebrow">Our Story</p>
          <h2 id="story-title">Born From A Love For Chocolate</h2>
          <p>
            At Cocoa Haus, we believe chocolate is more than a flavour — it's an emotion. Our journey began with a simple dream:
            to create the most delicious, handcrafted brownies using the finest ingredients, made with love.
          </p>
          {showCta && (
            <Link to="/about" className="ourstory-btn">
              Discover Our Story <Arrow />
            </Link>
          )}
        </div>

        <div className="ourstory-visual">
          <span className="ourstory-shape" aria-hidden="true" />
          <img
            className="ourstory-photo"
            src={photo}
            alt="Layered chocolate dessert topped with white chocolate swirls"
            width="560"
            height="448"
            loading="lazy"
            decoding="async"
          />
          <div className="ourstory-note" aria-hidden="true">
            <span>Handcrafted<br />with Love <i>♡</i></span>
            <svg viewBox="0 0 60 40" width="52" height="34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <path d="M6 30 C4 20 14 14 20 20 C26 27 14 34 12 26 C10 18 30 8 50 10" />
              <path d="M44 6 L51 10 L45 15" />
            </svg>
          </div>
        </div>
      </div>

      {showValues && (
        <ul className="ourstory-values">
          {VALUES.map(([, t, d]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
