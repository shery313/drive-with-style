import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-6 md:px-20 py-16">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We’re here to assist you. Get in touch with us for bookings, inquiries, or feedback.
        </p>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section
        className="grid md:grid-cols-2 gap-10 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition">
          <h3 className="text-3xl font-bold mb-4 text-blue-600">Get in Touch</h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Have questions or ready to make a booking? Reach out to us through any of the channels below.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600" size={28} />
              <span className="text-lg font-medium">+92 312 5430959</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" size={28} />
              <span className="text-lg font-medium">pakiidol@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" size={28} />
              <span className="text-lg font-medium">Block#08 Flate#02, PHA Red Flate, G-10/2 Islamabad.</span>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition">
          <h3 className="text-3xl font-bold mb-4 text-blue-600">Send Us a Message</h3>
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-lg font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-lg font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-lg font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Our Location</h2>
        <div className="w-full h-96 bg-gray-300 dark:bg-gray-600 rounded-xl shadow-lg overflow-hidden">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d212559.2251951987!2d73.04080567007671!3d33.65099730644122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x38dfbfecb1d94b4b%3A0xc4fa9cfcc5e12579!2sBlock%2308%20Flate%2302%2C%20PHA%20Red%20Flate%2C%20G-10%2F2%20Islamabad%2C%2046000!3m2!1d33.677075699999996!2d73.0113938!5e0!3m2!1sen!2s!4v1744348520977!5m2!1sen!2s"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </motion.section>
    </main>
  );
};

export default Contact;