import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          <Link to="/"><img src="logo.png" className="h-20" alt="" /></Link>
        </div>
          <p className="text-sm text-gray-400">
            Elevate your journey with our premium car rental service. Available 24/7 to make your travel stress-free.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/fleet" className="hover:underline">Our Fleet</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +92 312 5430959
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> pakiidol@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Block#08 Flate#02, PHA Red Flate, G-10/2 Islamabad.
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://web.facebook.com/profile.php?id=100070930261981" className="hover:text-blue-400">
              <Facebook />
            </a>
            <a href="#" className="hover:text-pink-400">
              <Instagram />
            </a>
            <a href="#" className="hover:text-sky-400">
              <Twitter />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Drive with Style. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
