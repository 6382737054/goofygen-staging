import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEvents } from "../context/EventsContext.jsx";

export default function Events() {
  const { events } = useEvents();
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      {/* Ambient background — same as Home */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute -top-[20vh] -right-[20vw] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.16) 0%, rgba(201,169,110,0) 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.3 }}
          className="absolute -bottom-[25vh] -left-[20vw] w-[60vw] h-[60vw] max-w-[760px] max-h-[760px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(10,9,7,0.06) 0%, rgba(10,9,7,0) 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-6 sm:pt-10 lg:pt-14 pb-20 sm:pb-28 lg:pb-32">
        {/* Heading — uniform with Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16 lg:mb-20 text-center"
        >
          <p className="inline-flex items-center gap-3 text-[12px] sm:text-[13px] uppercase tracking-[0.3em] text-gold-600 font-semibold">
            <span className="w-8 h-px bg-gold-400" />
            The programme
            <span className="w-8 h-px bg-gold-400" />
          </p>
          <h1 className="display text-ink-900 text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] mt-6">
            All <span className="text-gradient-gold font-light">gatherings.</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-ink-500 text-[15px] sm:text-base leading-[1.7] font-light">
            Curated sessions, talks and meetups. Show up to listen, or step up
            to speak.
          </p>
          <div className="hairline mt-8 max-w-xs mx-auto" />
        </motion.div>

        {/* Event list */}
        {sorted.length === 0 ? (
          <p className="text-ink-500 italic text-center text-lg">
            Nothing scheduled — yet.
          </p>
        ) : (
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            className="divide-y divide-ink-100 border-y border-ink-100"
          >
            {sorted.map((e, i) => (
              <EventRow key={e.id} event={e} index={i} />
            ))}
          </motion.ul>
        )}

        {/* Footer count */}
        {sorted.length > 0 && (
          <p className="mt-10 sm:mt-14 text-center text-[11px] uppercase tracking-[0.3em] text-ink-400">
            {String(sorted.length).padStart(2, "0")} listed
          </p>
        )}
      </div>
    </div>
  );
}

function EventRow({ event, index }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <Link
        to={`/events/${event.id}`}
        className="group relative grid grid-cols-12 gap-4 sm:gap-6 py-8 sm:py-10 items-center px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl transition-colors duration-500 hover:bg-white/50"
      >
        {/* Index */}
        <div className="col-span-12 sm:col-span-1 flex sm:block items-center gap-2 sm:gap-0">
          <span className="display text-2xl sm:text-3xl font-light text-ink-300 group-hover:text-gold-500 transition-colors duration-500 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Date */}
        <div className="col-span-12 sm:col-span-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold-500 font-medium tabular-nums">
            {event.date}
          </p>
        </div>

        {/* Title + description */}
        <div className="col-span-12 sm:col-span-6">
          <h3 className="display text-2xl sm:text-3xl lg:text-[2rem] font-normal text-ink-900 leading-[1.15] group-hover:text-gold-600 transition-colors duration-500">
            {event.title}
          </h3>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed line-clamp-1 font-light">
            {event.description}
          </p>
        </div>

        {/* Location */}
        <div className="col-span-6 sm:col-span-2 text-sm text-ink-500 font-light">
          {event.location}
        </div>

        {/* Arrow */}
        <div className="col-span-6 sm:col-span-1 flex justify-end">
          <span className="w-10 h-10 rounded-full border border-ink-200 flex items-center justify-center text-ink-400 group-hover:bg-ink-900 group-hover:text-gold-300 group-hover:border-ink-900 transition-all duration-500 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
