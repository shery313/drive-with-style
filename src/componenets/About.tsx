import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 md:px-20 py-16">
      {/* Intro Section */}
      <motion.section
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-4">About Drive With Style</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          At Drive With Style, we blend sophistication and convenience to bring you an unmatched car rental experience. Whether you need a luxurious ride for a business trip or a stylish drive for a night out — we’ve got you covered.
        </p>
      </motion.section>

      {/* Mission and Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-20">
        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To redefine luxury transportation by offering exceptional service, elegant vehicles, and professional drivers who value your time and comfort.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To be the leading premium car rental and chauffeur service in the region — recognized for our professionalism, style, and commitment to excellence.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <motion.section
        className="bg-blue-600 text-white p-10 rounded-xl text-center shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          We combine luxury vehicles, skilled drivers, and 24/7 support to give you a hassle-free, elegant experience every single time.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          <div>
            <h4 className="font-semibold text-lg mb-2">✨ Luxury Fleet</h4>
            <p>We handpick only premium cars to ensure your comfort and style.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">🕒 On-Time Guarantee</h4>
            <p>Reliable and punctual service, always. Never be late again.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">💼 Professional Drivers</h4>
            <p>Our trained chauffeurs prioritize your safety, comfort & privacy.</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default About;
