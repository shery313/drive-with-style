import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Fleet", to: "/fleet" },
    { name: "Pricing", to: "/pricing" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="shadow-md sticky w-full top-0 bg-black text-white dark:bg-gray-900 dark:text-white z-50 transition-colors duration-300">
      <nav className="flex justify-between items-center px-6 py-4 md:px-10">
        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          <Link to="/"><img src="logo.png" className="h-20" alt="" /></Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center font-medium">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </Link>
            </li>
          ))}



        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white text-black dark:bg-gray-900 px-6 py-4 space-y-3 border-t dark:border-gray-800"
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}


          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
