import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, Shield, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import AnnouncementBar from "./AnnouncementBar";

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

      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fffdf7]/90 shadow-[0_14px_40px_rgba(18,23,20,0.08)] backdrop-blur-xl">
        <AnnouncementBar />
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-[76px] items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-black/[0.04]"
              aria-label="Drive With Style home"
            >
              <div className="flex h-14 w-14  items-center  justify-center overflow-hidden rounded-1xl border border-black/10 p-1">
                <img className="h-full w-full " src="/logo1.jpg" alt="drive with style logo" />
              </div>
              <div>
                <span className="block text-lg font-semibold tracking-tight text-[#121714] font-serif">
                  Drive with style                </span>
                <span className="block text-xs uppercase font-serif tracking-[0.18em] text-[#69746f]">
                  Islamabad / Pakistan
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-4 lg:flex">
              <ul className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2 py-2">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;

                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition ${
                          active ? "text-[#121714]" : "text-[#69746f] hover:text-[#121714]"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full border border-[#006d77]/20 bg-[#006d77]/10"
                            transition={{ type: "spring", duration: 0.55, bounce: 0.18 }}
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="hidden items-center gap-2 rounded-full border border-[#2f7d5c]/20 bg-[#2f7d5c]/10 px-4 py-2 text-sm font-medium text-[#2f7d5c] xl:flex">
                <Shield className="h-4 w-4" />
                Fully insured fleet
              </div>

              <a
                href="tel:+923125430959"
                className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-[#24302b] transition hover:bg-white xl:flex"
              >
                <Phone className="h-4 w-4 text-[#f05a28]" />
                +92 312 5430959
              </a>

              <Link to="/book" className="dws-button-primary px-5 py-3 text-sm">
                Book now
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white/70 p-2.5 text-[#121714] transition hover:bg-white lg:hidden"
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
              className="border-t border-black/10 bg-[#fffdf7]/96 px-4 pb-6 pt-4 backdrop-blur-xl lg:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition ${
                        active
                          ? "border border-[#006d77]/20 bg-[#006d77]/10 text-[#121714]"
                          : "bg-black/[0.03] text-[#69746f] hover:bg-black/[0.06] hover:text-[#121714]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 rounded-lg border border-black/10 bg-white/70 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#2f7d5c]/10 p-4 text-center">
                    <Shield className="mx-auto h-5 w-5 text-[#2f7d5c]" />
                    <p className="mt-2 text-sm font-medium text-[#121714]">Insured</p>
                  </div>
                  <div className="rounded-lg bg-[#f05a28]/10 p-4 text-center">
                    <Star className="mx-auto h-5 w-5 text-[#f05a28]" />
                    <p className="mt-2 text-sm font-medium text-[#121714]">5-Star Service</p>
                  </div>
                </div>

                <a
                  href="tel:+923125430959"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-medium text-[#121714]"
                >
                  <Phone className="h-4 w-4 text-[#f05a28]" />
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
