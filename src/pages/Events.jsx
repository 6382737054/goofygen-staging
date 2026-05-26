import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEvents } from "../context/EventsContext.jsx";

export default function Events() {
  const { events } = useEvents();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-end justify-between mb-20"
      >
        <div>
          <p className="eyebrow mb-8">All events</p>
          <h1 className="font-medium text-ink-900 tracking-tightest leading-[1.05] text-[clamp(2.5rem,6vw,5rem)]">
            The <span className="italic text-gradient-gold">programme.</span>
          </h1>
        </div>
        <p className="hidden md:block text-sm text-ink-400 tabular-nums">
          {String(sorted.length).padStart(2, "0")} listed
        </p>
      </motion.div>

      {sorted.length === 0 ? (
        <p className="text-ink-400 italic text-lg">Nothing scheduled — yet.</p>
      ) : (
        <ul className="divide-y divide-ink-100 border-y border-ink-100">
          {sorted.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                to={`/events/${e.id}`}
                className="group grid grid-cols-12 gap-6 py-10 items-center hover:bg-white/40 transition-colors duration-500 px-2 -mx-2 rounded-2xl"
              >
                <div className="col-span-12 md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold-500 tabular-nums">
                    {e.date}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <h3 className="text-2xl md:text-3xl font-medium text-ink-900 tracking-tight group-hover:text-gold-600 transition-colors duration-500">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-400 leading-relaxed line-clamp-1">
                    {e.description}
                  </p>
                </div>
                <div className="col-span-6 md:col-span-2 text-sm text-ink-500">
                  {e.location}
                </div>
                <div className="col-span-6 md:col-span-2 flex items-center justify-end gap-6 text-xs text-ink-400 tabular-nums">
                  <span>
                    {e.speakers.length}{" "}
                    <span className="text-ink-300">speakers</span>
                  </span>
                  <span className="w-9 h-9 rounded-full border border-ink-200 flex items-center justify-center text-ink-400 group-hover:bg-ink-900 group-hover:text-gold-300 group-hover:border-ink-900 transition-all duration-500">
                    →
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
