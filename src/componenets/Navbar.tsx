import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CarFront, Menu, Phone, Shield, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Fleet", to: "/fleet" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Drive With Style",
    url: "https://drivewithstyles.com",
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07111d]/80 backdrop-blur-2xl">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-20 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/6"
              aria-label="Drive With Style home"
            >
              <div className="flex h-15 w-15 items-center justify-center rounded-2xl border border-amber-300/18 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.2))] text-amber-100 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
                <img className="" src="/logo.png" alt="" />
              </div>
              <div>
                <span className="block text-lg font-semibold tracking-tight text-white">
                  Drive With Style
                </span>
                <span className="block text-xs uppercase tracking-[0.24em] text-slate-400">
                  Premium Car Rentals
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-4 lg:flex">
              <ul className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.04] px-2 py-2">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition ${
                          active ? "text-white" : "text-slate-300 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full border border-amber-300/18 bg-amber-300/10"
                            transition={{ type: "spring", duration: 0.55, bounce: 0.18 }}
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 xl:flex">
                <Shield className="h-4 w-4" />
                Fully insured fleet
              </div>

              <a
                href="tel:+923125430959"
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] xl:flex"
              >
                <Phone className="h-4 w-4 text-amber-200" />
                +92 312 5430959
              </a>

              <Link to="/book" className="dws-button-primary px-5 py-3 text-sm">
                Book now
              </Link>
            </div>

            <button
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-200 transition hover:bg-white/[0.08] lg:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/8 bg-[#07111d]/96 px-4 pb-6 pt-4 backdrop-blur-2xl lg:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium transition ${
                        active
                          ? "border border-amber-300/18 bg-amber-300/10 text-white"
                          : "bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                    <Shield className="mx-auto h-5 w-5 text-emerald-300" />
                    <p className="mt-2 text-sm font-medium text-white">Insured</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.04] p-4 text-center">
                    <Star className="mx-auto h-5 w-5 text-amber-300" />
                    <p className="mt-2 text-sm font-medium text-white">5-Star Service</p>
                  </div>
                </div>

                <a
                  href="tel:+923125430959"
                  className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-100"
                >
                  <Phone className="h-4 w-4 text-amber-200" />
                  +92 312 5430959
                </a>

                <Link
                  to="/book"
                  onClick={() => setIsOpen(false)}
                  className="dws-button-primary mt-4 w-full px-4 py-3 text-sm"
                >
                  Book now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
