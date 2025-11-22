import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Fleet", to: "/fleet" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center rounded-xl p-2 transition-all hover:bg-gray-800/50">
              <img 
                src="/logo.png" 
                className="h-10 w-auto md:h-12" 
                alt="Drive with Style Logo" 
                width={120}
                height={56}
              />
              <div className="hidden md:block ml-2">
                <span className="block text-lg font-bold text-white">Drive with Style</span>
                <span className="block text-xs text-gray-300 font-medium">Premium Rentals</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                      location.pathname === link.to 
                        ? "text-white bg-gray-800 font-semibold"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.to && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-0 rounded-xl bg-blue-500/20 border border-blue-400/30"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact & CTA */}
            <div className="ml-6 flex items-center space-x-3 border-l border-gray-700 pl-6">
              <a 
                href="tel:+1234567890" 
                className="flex items-center space-x-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white"
              >
                <Phone size={16} />
                <span>Contact</span>
              </a>

              <Link to="/book">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700"
                >
                  Book Now
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link to="/book">
              <button className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25">
                Book
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden border-t border-gray-700 bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="px-4 pb-6 pt-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ${
                    location.pathname === link.to
                      ? "bg-blue-500/20 text-white border border-blue-400/30"
                      : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <a 
                  href="tel:+1234567890"
                  className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white"
                >
                  <Phone size={18} />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;