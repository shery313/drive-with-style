import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Car, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Footer = () => {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Drive With Style",
    "description": "Premium car rental service in Islamabad offering luxury vehicles, SUVs, sedans, and hatchbacks with 24/7 customer support.",
    "url": "https://drivewithstyles.com",
    "logo": "https://drivewithstyles.com/logo.png",
    "telephone": "+92-312-5430959",
    "email": "DrivewithstyleRAC@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Block#08 Flate#02, PHA Red Flate",
      "addressLocality": "Islamabad",
      "addressRegion": "Islamabad Capital Territory",
      "postalCode": "46000",
      "addressCountry": "PK"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "areaServed": "Islamabad and surrounding areas",
    "sameAs": [
      "https://web.facebook.com/profile.php?id=100070930261981",
      "https://instagram.com/drivewithstyle",
      "https://twitter.com/drivewithstyle"
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <footer className="bg-gray-900 text-white" itemScope itemType="https://schema.org/Organization">
        {/* Trust Badges Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-600 py-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Car className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">Premium Fleet</h3>
                <p className="text-blue-100 text-sm">50+ Well-Maintained Vehicles</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">Fully Insured</h3>
                <p className="text-blue-100 text-sm">Comprehensive Coverage</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-blue-100 text-sm">Always Available</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Company Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-1"
              >
                <div className="text-2xl font-bold mb-4" itemProp="name">
                  <Link to="/" aria-label="Drive With Style Home">
                    <img 
                      src="/logo.png" 
                      className="h-20 w-auto" 
                      alt="Drive With Style - Premium Car Rentals Islamabad"
                      itemProp="logo"
                    />
                  </Link>
                </div>
                <p className="text-sm text-gray-400 mb-4" itemProp="description">
                  Premium car rental service in Islamabad offering luxury vehicles, SUVs, sedans, and hatchbacks. 
                  Available 24/7 to make your travel experience exceptional and stress-free.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online 24/7</span>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link 
                      to="/" 
                      className="hover:text-blue-400 transition-colors duration-200 hover:underline"
                      aria-label="Home Page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/fleet" 
                      className="hover:text-blue-400 transition-colors duration-200 hover:underline"
                      aria-label="View Our Vehicle Fleet"
                    >
                      Our Fleet
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className="hover:text-blue-400 transition-colors duration-200 hover:underline"
                      aria-label="About Drive With Style"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className="hover:text-blue-400 transition-colors duration-200 hover:underline"
                      aria-label="Contact Us"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/book" 
                      className="hover:text-blue-400 transition-colors duration-200 hover:underline"
                      aria-label="Book a Vehicle"
                    >
                      Book Now
                    </Link>
                  </li>
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                    <div>
                      <a 
                        href="tel:+923125430959" 
                        className="hover:text-blue-400 transition-colors duration-200"
                        itemProp="telephone"
                      >
                        +92 312 5430959
                      </a>
                      <p className="text-xs text-gray-500 mt-1">24/7 Customer Support</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                    <div>
                      <a 
                        href="mailto:DrivewithstyleRAC@gmail.com" 
                        className="hover:text-blue-400 transition-colors duration-200 break-all"
                        itemProp="email"
                      >
                        DrivewithstyleRAC@gmail.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Quick Response</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                    <div>
                      <span itemProp="streetAddress">
                        Block#08 Flate#02, PHA Red Flate
                      </span>
                      <br />
                      <span itemProp="addressLocality">G-10/2 Islamabad</span>
                      <p className="text-xs text-gray-500 mt-1">Office Location</p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Social Media & Services */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
                <div className="flex gap-4 mb-6">
                  <a 
                    href="https://web.facebook.com/profile.php?id=100070930261981" 
                    className="hover:text-blue-400 transition-colors duration-200 p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                    aria-label="Follow us on Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="https://instagram.com/drivewithstyle" 
                    className="hover:text-pink-400 transition-colors duration-200 p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                    aria-label="Follow us on Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://twitter.com/drivewithstyle" 
                    className="hover:text-sky-400 transition-colors duration-200 p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                    aria-label="Follow us on Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h5 className="font-semibold mb-3 text-white">Our Services</h5>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Luxury Car Rentals</li>
                    <li>• SUV & Family Vehicles</li>
                    <li>• Wedding Car Services</li>
                    <li>• Corporate Rentals</li>
                    <li>• Airport Transfers</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-12 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500 text-center md:text-left">
                  © {new Date().getFullYear()} Drive With Style. All rights reserved. | 
                  <span className="mx-2">Premium Car Rentals Islamabad</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                  <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/sitemap" className="hover:text-blue-400 transition-colors">
                    Sitemap
                  </Link>
                </div>
              </div>
              
              {/* SEO Keywords - Hidden but accessible to screen readers */}
              <div className="sr-only" aria-hidden="true">
                Drive With Style - Premium car rental service in Islamabad, luxury vehicles for rent, 
                SUV rentals, sedan cars, hatchback rentals, wedding car services, corporate car rentals, 
                airport transfer services, 24/7 car rental support, best car rental company in Islamabad.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;