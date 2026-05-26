import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow mb-8">Contact</p>
          <h1 className="font-medium text-ink-900 tracking-tightest leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)]">
            Say <span className="italic text-gradient-gold">hello.</span>
          </h1>
          <p className="mt-8 text-lg text-ink-500 leading-relaxed font-light max-w-md">
            Got a question, a talk you want to give, or just want to be on the
            list — we read every note.
          </p>

          <div className="mt-16 space-y-6">
            <Detail label="Email" value="hello@divyaforum.com" />
            <Detail label="Based in" value="Bangalore, India" />
            <Detail label="Reply within" value="48 hours, usually less" />
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="card p-10 space-y-8"
        >
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl bg-gold-100/60 border border-gold-300/50 text-ink-700 text-sm"
              >
                Thank you — we'll be in touch soon.
              </motion.div>
            )}
          </AnimatePresence>

          <Field label="Your name" name="name" value={form.name} onChange={onChange} required />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-ink-400 font-medium mb-3">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              required
              className="w-full bg-transparent border-b border-ink-200 pb-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors duration-300 resize-none"
            />
          </div>
          <button type="submit" className="btn-primary !w-full">
            <span>Send message</span>
            <span aria-hidden>→</span>
          </button>
        </motion.form>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-ink-400 font-medium mb-3">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-ink-200 pb-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors duration-300"
      />
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-1.5">
        {label}
      </p>
      <p className="text-ink-900">{value}</p>
    </div>
  );
}
