import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEvents } from "../context/EventsContext.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Home() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <div>
      {/* Viewport-wide ambient background */}
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

      {/* All page content sits above the ambient layer */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-2 sm:pb-4 lg:pb-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-ink-500 font-medium mb-6 sm:mb-8"
              >
                <span className="w-8 h-px bg-gold-400" />
                <span>A community forum</span>
                <span className="w-1 h-1 rounded-full bg-gold-400" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="display text-ink-900 leading-[0.95] text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal"
              >
                <span className="block">Conversations,</span>
                <span className="block mt-1 text-gradient-gold font-light">
                  gathered with&nbsp;care.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="mt-8 sm:mt-10 lg:mt-12 max-w-xl text-ink-600 text-base sm:text-[1.0625rem] leading-[1.75] sm:leading-[1.8] font-light"
              >
                A quiet corner of the internet for talks, meetups, and the
                people who like to listen as much as they like to speak.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
              >
                <Link
                  to="/events"
                  className="btn-primary w-full sm:w-auto justify-center"
                >
                  <span>Browse events</span>
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 px-2 sm:px-0 text-sm font-medium tracking-wide text-ink-700 hover:text-gold-600 transition-colors duration-300 group self-start sm:self-auto"
                >
                  <span className="link-underline">Read our story</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT: 3D rotating carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:-mt-10 xl:-mt-16"
            >
              <HeroCarousel />
            </motion.div>
          </div>
        </section>

        {/* CONTRIBUTE */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
          <div className="mb-10 sm:mb-14 lg:mb-16 text-center">
            <p className="inline-flex items-center gap-3 text-[12px] sm:text-[13px] uppercase tracking-[0.3em] text-gold-600 font-semibold">
              <span className="w-8 h-px bg-gold-400" />
              How you can contribute
              <span className="w-8 h-px bg-gold-400" />
            </p>
            <div className="hairline mt-6 max-w-xs mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.18, delayChildren: 0.1 },
              },
            }}
            className="grid sm:grid-cols-2 gap-px bg-ink-100 border border-ink-100 rounded-2xl overflow-hidden"
          >
            {[
              {
                title: "Be a Speaker",
                body: "Bring your expertise to a session or debate.",
              },
              {
                title: "Be a Partner",
                body: "Offer your space, institution, or network to host sessions, promote events, or connect us to communities that need it.",
              },
              {
                title: "Join the Core Team",
                body: "If you believe in this and want to help build it — as an organiser, researcher, designer, or coordinator — reach out. We are assembling the founding team.",
              },
              {
                title: "Be a Messenger",
                body: "Share this brief with one person who should be in the room. We grow through trust, not advertising.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="group relative bg-ink-50 hover:bg-white transition-colors duration-500 p-7 sm:p-9 lg:p-10 flex flex-col gap-3 overflow-hidden"
              >
                {/* Gold sweep on entry */}
                <motion.span
                  aria-hidden
                  variants={{
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: 1,
                      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="absolute top-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
                />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: 0.25 },
                    },
                  }}
                  className="flex items-center gap-3 mb-1"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-medium tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-gold-300/60 to-transparent" />
                </motion.div>

                <motion.h3
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="display text-2xl sm:text-[1.75rem] font-normal text-ink-900 leading-tight"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="text-ink-600 text-[15px] leading-[1.7] font-light"
                >
                  {item.body}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* UPCOMING */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
          <div className="mb-10 sm:mb-14 lg:mb-16 text-center">
            <p className="inline-flex items-center gap-3 text-[12px] sm:text-[13px] uppercase tracking-[0.3em] text-gold-600 font-semibold">
              <span className="w-8 h-px bg-gold-400" />
              Upcoming gatherings
              <span className="w-8 h-px bg-gold-400" />
            </p>
            <div className="hairline mt-6 max-w-xs mx-auto" />
          </div>

          {upcoming.length === 0 ? (
            <p className="text-ink-500 text-center">Nothing scheduled — yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {upcoming.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          )}

          <div className="mt-10 sm:mt-14 flex justify-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm text-ink-700 hover:text-gold-500 transition-colors group"
            >
              <span className="link-underline">View all events</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* CLOSING LINE */}
        <section className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 py-20 sm:py-28 lg:py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display text-2xl sm:text-3xl lg:text-4xl font-light text-ink-700 leading-[1.4]"
          >
            The best conversations happen when no one's keeping score
            <span className="block mt-4 text-gradient-gold">
              — just listening.
            </span>
          </motion.p>
        </section>
      </div>
    </div>
  );
}

function EventCard({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/events/${event.id}`} className="card group block p-8 h-full">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-500 font-medium">
            {event.date}
          </span>
          <span className="w-9 h-9 rounded-full border border-ink-200 flex items-center justify-center text-ink-500 group-hover:bg-ink-900 group-hover:text-gold-300 group-hover:border-ink-900 transition-all duration-500">
            →
          </span>
        </div>
        <h3 className="display text-2xl font-normal text-ink-900 leading-[1.15]">
          {event.title}
        </h3>
        <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-2">
          {event.description}
        </p>
        <div className="mt-8 pt-6 border-t border-ink-100 flex items-center justify-between text-xs text-ink-500">
          <span>{event.location}</span>
          <span className="tabular-nums">
            {event.speakers.length} · {event.audience.length}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
