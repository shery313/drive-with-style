import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Car, Shield, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Fleet", to: "/fleet" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  // Structured Data for Navigation
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Drive With Style",
    "url": "https://drivewithstyles.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://drivewithstyles.com/fleet?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 shadow-lg" role="banner">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className="flex items-center rounded-xl p-2 transition-all hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Drive with Style Home"
              >
                <img 
                  src="/logo.png" 
                  className="h-10 w-auto md:h-12" 
                  alt="Drive with Style - Premium Car Rentals Islamabad" 
                  width={120}
                  height={56}
                  loading="eager"
                />
                <div className="hidden md:block ml-2">
                  <span className="block text-lg font-bold text-white">Drive with Style</span>
                  <span className="block text-xs text-gray-300 font-medium">Premium Car Rentals</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <ul className="flex items-center space-x-1" role="menubar">
                {navLinks.map((link) => (
                  <li key={link.to} role="none">
                    <Link
                      to={link.to}
                      className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        location.pathname === link.to 
                          ? "text-white bg-gray-800 font-semibold"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                      role="menuitem"
                      aria-current={location.pathname === link.to ? "page" : undefined}
                    >
                      {link.name}
                      {location.pathname === link.to && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-0 rounded-xl bg-blue-500/20 border border-blue-400/30"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact & CTA */}
              <div className="ml-6 flex items-center space-x-3 border-l border-gray-700 pl-6">
                <a 
                  href="tel:+923125430959" 
                  className="flex items-center space-x-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Call us at +92 312 5430959"
                >
                  <Phone size={16} />
                  <span>+92 312 5430959</span>
                </a>

                <Link to="/book">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="ml-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label="Book a vehicle now"
                  >
                    Book Now
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link to="/book">
                <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                  Book
                </button>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
                aria-controls="mobile-menu"
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
              className="lg:hidden border-t border-gray-700 bg-gray-900/98 backdrop-blur-xl"
              id="mobile-menu"
              role="menu"
            >
              <div className="px-4 pb-6 pt-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                      location.pathname === link.to
                        ? "bg-blue-500/20 text-white border border-blue-400/30"
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    }`}
                    role="menuitem"
                    aria-current={location.pathname === link.to ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Contact Section */}
                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <a 
                    href="tel:+923125430959"
                    className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Call us at +92 312 5430959"
                  >
                    <Phone size={18} />
                    <span>+92 312 5430959</span>
                  </a>
                  
                  {/* Trust Badges for Mobile */}
                  <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-gray-800/50 rounded-xl">
                    <div className="text-center">
                      <Car size={16} className="mx-auto text-blue-400 mb-1" />
                      <span className="text-xs text-gray-300">50+ Cars</span>
                    </div>
                    <div className="text-center">
                      <Shield size={16} className="mx-auto text-green-400 mb-1" />
                      <span className="text-xs text-gray-300">Insured</span>
                    </div>
                    <div className="text-center">
                      <Star size={16} className="mx-auto text-yellow-400 mb-1" />
                      <span className="text-xs text-gray-300">Rated</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Schema.org Breadcrumb for Current Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://drivewithstyles.com"
                },
                ...(location.pathname !== "/" ? [{
                  "@type": "ListItem",
                  "position": 2,
                  "name": navLinks.find(link => link.to === location.pathname)?.name || "Page",
                  "item": `https://drivewithstyles.com${location.pathname}`
                }] : [])
              ]
            })
          }}
        />
      </header>
    </>
  );
};

export default Navbar;