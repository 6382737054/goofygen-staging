import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvents } from "../context/EventsContext.jsx";

const empty = { title: "", description: "", date: "", location: "" };

export default function Admin() {
  const { events, addEvent, deleteEvent } = useEvents();
  const [form, setForm] = useState(empty);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return;
    addEvent(form);
    setForm(empty);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink-400 font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          Admin
        </div>
        <h1 className="font-medium text-ink-900 tracking-tightest leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)]">
          Curate the <span className="italic text-gradient-gold">programme.</span>
        </h1>
        <p className="mt-6 text-ink-500 text-sm">
          Add new gatherings or retire old ones. Data is local for now —
          backend wiring comes next.
        </p>
      </motion.div>

      <div className="hairline my-16" />

      <div className="grid lg:grid-cols-5 gap-16">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          <h2 className="text-2xl font-medium text-ink-900 tracking-tight">
            New event
          </h2>

          <Field label="Title" name="title" value={form.title} onChange={onChange} required />
          <Field label="Date" name="date" type="date" value={form.date} onChange={onChange} required />
          <Field label="Location" name="location" value={form.location} onChange={onChange} />

          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-ink-400 font-medium mb-3">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={onChange}
              className="w-full bg-transparent border-b border-ink-200 pb-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors duration-300 resize-none"
            />
          </div>

          <button type="submit" className="btn-primary">
            <span>Add to programme</span>
            <span aria-hidden>+</span>
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-medium text-ink-900 tracking-tight">
              All events
            </h2>
            <span className="text-xs text-ink-400 tabular-nums">
              {String(events.length).padStart(2, "0")}
            </span>
          </div>

          {events.length === 0 ? (
            <p className="text-ink-400 italic text-sm">No events yet.</p>
          ) : (
            <ul className="divide-y divide-ink-100 border-y border-ink-100">
              <AnimatePresence>
                {events.map((e) => (
                  <motion.li
                    key={e.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="py-5 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-ink-900 truncate">
                        {e.title}
                      </p>
                      <p className="text-xs text-ink-400 mt-1">
                        {e.date} · {e.location || "—"} · {e.speakers.length}{" "}
                        speakers · {e.audience.length} audience
                      </p>
                    </div>
                    <button
                      onClick={() => deleteEvent(e.id)}
                      className="shrink-0 text-xs uppercase tracking-[0.15em] text-ink-400 hover:text-red-600 transition-colors px-3 py-2"
                    >
                      Remove
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </motion.div>
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
