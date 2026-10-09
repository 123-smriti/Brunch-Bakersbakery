import { useState } from "react";
import SectionTitle from "../components/common/SectionTitle";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters";
    setErrors(err);
    if (!Object.keys(err).length) { setSent(true); setForm({ name: "", email: "", message: "" }); }
  };

  return (
    <section className="wrap narrow">
      <SectionTitle>Contact Us</SectionTitle>
      {sent && <p className="ok">Thanks! We'll get back to you soon.</p>}
      <form className="form" onSubmit={submit} noValidate>
        <label>Name<input value={form.name} onChange={set("name")} />{errors.name && <small className="err">{errors.name}</small>}</label>
        <label>Email<input type="email" value={form.email} onChange={set("email")} />{errors.email && <small className="err">{errors.email}</small>}</label>
        <label>Message<textarea rows="4" value={form.message} onChange={set("message")} />{errors.message && <small className="err">{errors.message}</small>}</label>
        <button className="btn dark" type="submit">Send</button>
      </form>
    </section>
  );
}
