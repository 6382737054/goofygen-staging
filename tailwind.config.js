/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f6f5f2",
          100: "#ebe9e2",
          200: "#c9c2b5",
          300: "#6b5e51",
          400: "#4f4338",
          500: "#3d322a",
          600: "#2e251e",
          700: "#241c16",
          800: "#15110d",
          900: "#0a0907",
        },
        gold: {
          100: "#f3e9d2",
          200: "#e6d2a3",
          300: "#d4b878",
          400: "#c9a96e",
          500: "#b6924f",
          600: "#8b6f3a",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,9,7,0.04), 0 8px 24px -8px rgba(10,9,7,0.08)",
        lift: "0 2px 4px rgba(10,9,7,0.06), 0 20px 50px -12px rgba(10,9,7,0.18)",
        glow: "0 0 0 1px rgba(201,169,110,0.25), 0 10px 40px -10px rgba(201,169,110,0.35)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};
