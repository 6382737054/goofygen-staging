import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEvents } from "../context/EventsContext.jsx";

export default function EventDetail() {
  const { id } = useParams();
  const { events, joinEvent } = useEvents();
  const event = events.find((e) => e.id === id);

  const [name, setName] = useState("");
  const [role, setRole] = useState("audience");
  const [joined, setJoined] = useState(null);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <p className="eyebrow justify-center mb-6">404</p>
        <h1 className="text-4xl font-medium text-ink-900 tracking-tight">
          Event not found.
        </h1>
        <Link to="/events" className="btn-ghost mt-10">
          ← Back to events
        </Link>
      </div>
    );
  }

  const onJoin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    joinEvent(event.id, role, name.trim());
    setJoined(`You're in as ${role}.`);
    setName("");
    setTimeout(() => setJoined(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/events"
          className="text-sm text-ink-400 hover:text-ink-900 transition-colors inline-flex items-center gap-2 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          All events
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <p className="eyebrow !text-gold-500 mb-8">
          {event.date} · {event.location}
        </p>
        <h1 className="font-medium text-ink-900 tracking-tightest leading-[1.02] text-[clamp(2.5rem,7vw,6rem)]">
          {event.title}
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-ink-500 leading-relaxed font-light">
          {event.description}
        </p>
      </motion.div>

      <div className="hairline my-20" />

      <div className="grid lg:grid-cols-5 gap-12">
        {/* JOIN FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <p className="eyebrow mb-6">Join</p>
          <h2 className="text-3xl font-medium text-ink-900 tracking-tight mb-3">
            Take part.
          </h2>
          <p className="text-sm text-ink-500 leading-relaxed mb-10">
            Come listen, or step up to speak. Either way, you're welcome here.
          </p>

          <form onSubmit={onJoin} className="space-y-8">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-ink-400 font-medium mb-3">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-ink-200 pb-3 text-ink-900 focus:outline-none focus:border-ink-900 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-ink-400 font-medium mb-3">
                Joining as
              </label>
              <div className="flex gap-2">
                {["audience", "speaker"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 px-5 py-3 rounded-full border text-sm font-medium capitalize transition-all duration-300 ${
                      role === r
                        ? "bg-ink-900 text-gold-300 border-ink-900"
                        : "bg-transparent text-ink-500 border-ink-200 hover:border-ink-900 hover:text-ink-900"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary !w-full">
              <span>Confirm</span>
              <span aria-hidden>→</span>
            </button>

            <AnimatePresence>
              {joined && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm text-gold-600 italic"
                >
                  ✦ {joined}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* PARTICIPANTS */}
        <div className="lg:col-span-3 space-y-10">
          <ParticipantList title="Speakers" items={event.speakers} />
          <ParticipantList title="Audience" items={event.audience} />
        </div>
      </div>
    </div>
  );
}

function ParticipantList({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-baseline justify-between mb-6">
        <p className="eyebrow">{title}</p>
        <span className="text-xs text-ink-400 tabular-nums">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-400 italic">
          No one yet — be the first.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 py-3 border-b border-ink-100"
            >
              <span className="w-10 h-10 rounded-full bg-ink-100 text-ink-700 flex items-center justify-center text-sm font-medium">
                {p.name[0]?.toUpperCase()}
              </span>
              <span className="text-ink-900">{p.name}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
