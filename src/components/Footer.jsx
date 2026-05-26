import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-ink-100 bg-ink-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-full bg-ink-900 flex items-center justify-center text-gold-300 text-sm">
                D
              </span>
              <span className="font-medium tracking-tight text-ink-900">
                Divya<span className="text-gold-500">.</span>Forum
              </span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed max-w-xs">
              A quiet space for ideas, conversation, and the people who care to
              show up.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/events", label: "Events" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ink-500 hover:text-ink-900 transition-colors link-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="space-y-3 text-sm">
              {["Twitter", "Instagram", "LinkedIn"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-ink-500 hover:text-ink-900 transition-colors link-underline"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-400">
          <p>© {new Date().getFullYear()} Divya Forum — All rights reserved.</p>
          <p className="tracking-widest uppercase">Crafted with intention</p>
        </div>
      </div>
    </footer>
  );
}
