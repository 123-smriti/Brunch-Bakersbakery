import { Link } from "react-router-dom";
import { CITIES } from "../../data/constants";
import logo from "../../assets/logo.png";

const COLUMNS = [
  ["Know Us", [["Our Story", "/about"], ["Contact Us", "/contact"], ["Store Locator", "/contact"]]],
  ["Need Help", [["FAQs", "/contact"], ["Refund Policy", "#top"], ["Privacy Policy", "#top"], ["Terms & Conditions", "#top"]]],
  ["More Info", [["Menu", "/products"], ["Franchise", "/franchise"], ["Coupons & Offers", "/"], ["Nutritional Info", "#top"]]],
];

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const SOCIALS = [
  ["Facebook", <svg viewBox="0 0 24 24" key="f"><path {...stroke} d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>],
  ["Instagram", <svg viewBox="0 0 24 24" key="i"><rect {...stroke} x="3" y="3" width="18" height="18" rx="5" /><circle {...stroke} cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>],
  ["X", <svg viewBox="0 0 24 24" key="x"><path {...stroke} d="M4 4l16 16M20 4L4 20" /></svg>],
  ["YouTube", <svg viewBox="0 0 24 24" key="y"><rect {...stroke} x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>],
];

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-body">
        <div className="foot-in">
          <div className="foot-main">
            <div className="foot-brand">
              <img src={logo} alt="Brunch Bakers" />
              <p>© 2026 Brunch Bakers. All rights reserved.</p>
              <div className="socials">
                {SOCIALS.map(([n, icon]) => <a key={n} href="#top" aria-label={n}>{icon}</a>)}
              </div>
            </div>
            <div className="foot-cols">
              {COLUMNS.map(([title, links]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  {links.map(([l, to]) => (to.startsWith("#") ? <a key={l} href={to}>{l}</a> : <Link key={l} to={to}>{l}</Link>))}
                </div>
              ))}
            </div>
          </div>

          <p className="cities"><b>Our stores:</b> {CITIES.join(" | ")}</p>
        </div>
      </div>
    </footer>
  );
}
