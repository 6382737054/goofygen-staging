import { motion } from "framer-motion";

const values = [
  {
    n: "01",
    title: "Quiet by default",
    body: "No notifications, no leaderboards, no growth hacks. Just events you want to attend.",
  },
  {
    n: "02",
    title: "Speak or listen",
    body: "Show up however you want. Audience one week, speaker the next — it's all the same room.",
  },
  {
    n: "03",
    title: "No transactions",
    body: "We don't sell tickets. We don't sell you. Free to join, free to leave, free to be.",
  },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="eyebrow mb-8"
      >
        About
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-medium text-ink-900 tracking-tightest leading-[1.05] text-[clamp(2.5rem,6vw,5rem)] max-w-3xl"
      >
        A forum for the kind of <span className="italic text-gradient-gold">conversations</span> that don't fit on a feed.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-12 max-w-2xl text-lg text-ink-500 leading-relaxed font-light"
      >
        Divya Forum started as a quiet group chat and grew into something a
        little larger. We host community talks and meetups for people who'd
        rather think out loud than scroll in silence. There's no membership
        tier, no algorithm, no pitch deck.
      </motion.p>

      <div className="hairline my-24" />

      <div className="grid md:grid-cols-3 gap-12">
        {values.map((v, i) => (
          <motion.div
            key={v.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <p className="text-xs tracking-[0.3em] text-gold-500 mb-4">
              {v.n}
            </p>
            <h3 className="text-xl font-medium text-ink-900 mb-3 tracking-tight">
              {v.title}
            </h3>
            <p className="text-sm text-ink-500 leading-relaxed">{v.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
