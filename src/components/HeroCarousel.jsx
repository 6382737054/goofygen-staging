import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Placeholder images — swap with your own assets when ready
const slides = [
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    alt: "A speaker at a community meetup",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    alt: "Audience listening intently",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    alt: "Open mic night",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    alt: "Quiet conversation in a warm room",
  },
];

const COUNT = slides.length;
const INTERVAL = 3800;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % COUNT), INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] select-none"
      style={{ perspective: "1600px" }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {slides.map((s, i) => {
          // Compute relative position (-2,-1,0,1,2,...) around active
          let offset = i - active;
          // Wrap to shortest path
          if (offset > COUNT / 2) offset -= COUNT;
          if (offset < -COUNT / 2) offset += COUNT;

          const isActive = offset === 0;
          const abs = Math.abs(offset);

          // 3D transform values
          const x = offset * 110; // horizontal offset in px
          const z = -abs * 260; // depth (further back if not active)
          const rotateY = offset * -22; // slight tilt
          const scale = isActive ? 1 : 1 - abs * 0.08;
          const opacity = abs > 2 ? 0 : 1 - abs * 0.2;
          const blur = isActive ? 0 : Math.min(abs * 1.5, 4);

          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center",
              }}
              animate={{
                x: `calc(-50% + ${x}px)`,
                y: "-50%",
                z,
                rotateY,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: 100 - abs,
              }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={`relative w-[280px] h-[380px] sm:w-[310px] sm:h-[430px] lg:w-[340px] lg:h-[470px] rounded-2xl overflow-hidden bg-ink-200 transition-shadow duration-700 ${
                  isActive ? "shadow-lift ring-1 ring-gold-300/40" : "shadow-soft"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* warm overlay for inactive */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? "opacity-0"
                      : "opacity-30 bg-gradient-to-br from-ink-900/40 to-ink-700/20"
                  }`}
                />
                {/* gold inner edge on active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-white/10" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}
