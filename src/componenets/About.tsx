import { motion } from "framer-motion";
import { Car, Clock, Shield, Star, Award, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Car className="w-8 h-8 text-blue-600" />,
      title: "Premium Fleet",
      description: "Impeccably maintained luxury vehicles for every occasion"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "24/7 Availability",
      description: "Round-the-clock service whenever you need transportation"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Fully Insured",
      description: "Comprehensive coverage for complete peace of mind"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "5-Star Service",
      description: "Exceptional customer experience from start to finish"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Award-Winning",
      description: "Recognized for excellence in luxury transportation"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Professional Team",
      description: "Highly trained chauffeurs with years of experience"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            About Drive With Style
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Redefining luxury transportation with exceptional service, elegant vehicles, and professional chauffeurs who value your comfort and time.
          </p>
        </motion.section>

        {/* Mission and Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16 md:mb-24">
          <motion.div
            className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To transform every journey into an extraordinary experience by combining premium vehicles, professional service, and personalized attention to detail.
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To become the most trusted name in premium transportation, setting new standards for luxury, reliability, and customer satisfaction across the region.
            </p>
          </motion.div>
        </section>

        {/* Our Story */}
        <motion.section
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Founded in 2015, Drive With Style began with a single luxury sedan and a vision to revolutionize transportation services in Islamabad. 
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  What started as a small operation has grown into a premier fleet of luxury vehicles, serving corporate clients, weddings, and special events throughout Pakistan.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Our commitment to excellence has earned us recognition as one of the most reliable luxury transportation providers in the region.
                </p>
              </div>
              <div className="hidden md:block bg-gray-100 dark:bg-gray-700">
                <img 
                  src="/logo1.jpg" 
                  alt="Drive With Style fleet" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose Drive With Style</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We go beyond transportation to deliver an experience that exceeds expectations every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 md:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Commitment to You</h2>
            <p className="text-lg mb-6 opacity-90">
              At Drive With Style, we don't just provide cars - we provide peace of mind. Our team of professionals is dedicated to ensuring every aspect of your journey is flawless, from the moment you book until you reach your destination.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm opacity-90">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-sm opacity-90">Vehicles</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">5★</div>
                <div className="text-sm opacity-90">Ratings</div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default About;