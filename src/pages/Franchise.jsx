import { useState } from "react";
import showcase from "../assets/hero/hero-showcase.jpg";
import "../styles/franchise.css";

const PERKS = [
  ["🍰", "Proven Menu", "Best-selling cakes, bakes and savouries"],
  ["🎓", "Full Training", "Recipes, hygiene and store operations"],
  ["📣", "Brand & Marketing", "Launch campaigns and ready-made creatives"],
  ["🚚", "Steady Supply", "Quality ingredients delivered to your store"],
];

const FACTS = [
  ["Rs. 25-60L", "Investment"],
  ["600-1200 sq ft", "Shop size"],
  ["18-24 mo", "Break-even"],
  ["22-30%", "Return"],
];

const STEPS = [
  ["Send an Enquiry", "Fill in the form below with your details and the city you want to open in."],
  ["Discovery Call", "Our team walks you through the model, costs and what to expect."],
  ["Location Review", "We help you evaluate and approve the right shop location."],
  ["Agreement", "Sign the franchise agreement and complete your onboarding."],
  ["Setup & Training", "Store fit-out, equipment and hands-on training for you and your team."],
  ["Grand Opening", "Launch with our marketing support, and we stay by your side after."],
];

const SUPPORT = [
  ["🎓", "Training & Onboarding", "Recipes, baking standards, food safety and day-to-day store management."],
  ["🎨", "Store Design & Branding", "Layout guidance, signage and packaging so every outlet looks like Brunch Bakers."],
  ["🥚", "Ingredients & Supply", "Reliable supply of quality ingredients and packaging, with consistent standards."],
  ["📣", "Marketing & Launch", "Opening campaigns, offers, social media content and local promotion ideas."],
  ["💻", "Billing & Online Ordering", "Help setting up billing and getting your store onto delivery and ordering channels."],
  ["🤝", "Ongoing Support", "A point of contact for questions, new menu launches and operational help."],
];

const FAQS = [
  ["How much investment is needed to open a store?", "The total investment typically ranges from Rs. 25-60 lakh, depending on shop size, location and fit-out. Our team shares a detailed cost breakup on the discovery call."],
  ["What shop size do I need?", "Most of our stores are between 600 and 1200 sq ft. If you already have a location in mind, we will help you check whether it suits the model."],
  ["How long does it take to break even?", "Partners usually reach break-even in about 18-24 months, though this varies with location, footfall and how the store is run."],
  ["Do I need prior experience in baking or food business?", "No. We provide complete training on recipes, baking standards, food safety and store operations, so you can start without a food background."],
  ["Will you help me find and approve a location?", "Yes. Our team reviews your proposed shop and helps you evaluate footfall, visibility and accessibility before you sign anything."],
  ["What support do I get after the store opens?", "You get a dedicated point of contact for operations, new menu launches, marketing ideas and supply, so you are never on your own."],
  ["How long does the whole process take?", "From your first enquiry to grand opening, the timeline depends mainly on finding the location and the store fit-out. We will give you a clear schedule during the discovery call."],
];

const empty = { name: "", phone: "", email: "", city: "", message: "" };

export default function Franchise() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) err.phone = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (!form.city.trim()) err.city = "Tell us which city you are interested in";
    setErrors(err);
    if (!Object.keys(err).length) { setSent(true); setForm(empty); }
  };

  return (
    <div className="fr-page">
      {/* Hero */}
      <section className="fr-hero">
        <div className="fr-hero-in">
          <div className="fr-hero-copy">
            <p className="eyebrow">Why partner with us</p>
            <h1>Open a Brunch Bakers in Your City</h1>
            <p>Join a pure-veg bakery brand people love. We give you the recipes, training and support, so you can focus on serving fresh bakes.</p>
            <div className="fr-btns">
              <a className="fr-btn" href="#enquire">Enquire Now <span aria-hidden="true">→</span></a>
              <a className="fr-btn ghost" href="#process">See How It Works</a>
            </div>
          </div>
          <div className="fr-hero-img"><img src={showcase} alt="Cakes, tarts and macarons from the Brunch Bakers menu" /></div>
          <ul className="fr-perks">
            {PERKS.map(([i, t, d]) => (
              <li key={t}><span className="ico" aria-hidden="true">{i}</span><div><b>{t}</b><small>{d}</small></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Key numbers */}
      <section className="fr-sec wrap fr-facts-sec" aria-label="Franchise at a glance">
        <ul className="fr-facts">
          {FACTS.map(([v, l]) => (
            <li key={l}><b>{v}</b><span>{l}</span></li>
          ))}
        </ul>
      </section>

      {/* Joining process */}
      <section className="fr-sec wrap" id="process">
        <p className="eyebrow dark">How it works</p>
        <h2 className="fr-h2">Your Joining Process</h2>
        <ol className="fr-steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}>
              <span className="num">{i + 1}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Support */}
      <section className="fr-sec wrap" id="support">
        <p className="eyebrow dark">We're with you</p>
        <h2 className="fr-h2">Support We Provide</h2>
        <div className="fr-support">
          {SUPPORT.map(([i, t, d]) => (
            <article key={t}>
              <span className="ico" aria-hidden="true">{i}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="fr-sec wrap" id="faqs" aria-labelledby="fr-faq-title">
        <p className="eyebrow dark">Got questions?</p>
        <h2 className="fr-h2" id="fr-faq-title">Frequently Asked Questions</h2>
        <div className="fr-faqs">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Enquiry */}
      <section className="fr-enquire" id="enquire">
        <div className="fr-enquire-in wrap">
          <div className="fr-enquire-copy">
            <p className="eyebrow">Become a franchise partner</p>
            <h2>Make Every Moment Sweeter, in Your Own Store</h2>
            <p>Share your details and our franchise team will get back to you to talk through the next steps.</p>
          </div>
          <form className="fr-form" onSubmit={submit} noValidate>
            {sent && <p className="fr-ok" role="status">Thank you! Our franchise team will contact you soon.</p>}
            <label>Full name<input value={form.name} onChange={set("name")} autoComplete="name" />{errors.name && <small className="err">{errors.name}</small>}</label>
            <div className="row2">
              <label>Phone<input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />{errors.phone && <small className="err">{errors.phone}</small>}</label>
              <label>Email<input type="email" value={form.email} onChange={set("email")} autoComplete="email" />{errors.email && <small className="err">{errors.email}</small>}</label>
            </div>
            <label>City you want to open in<input value={form.city} onChange={set("city")} />{errors.city && <small className="err">{errors.city}</small>}</label>
            <label>Anything else? (optional)<textarea rows="3" value={form.message} onChange={set("message")} /></label>
            <button type="submit" className="fr-btn">Submit Enquiry <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </section>
    </div>
  );
}
