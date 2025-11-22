import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Star, Car, Calendar, Smile, Shield, MapPin, Clock, Fuel, ArrowRight, CheckCircle } from "lucide-react";
import TrustedBy from "./TrustedBy";

const Home = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - Modern Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm text-white font-medium">Premium Car Rentals in Islamabad</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Drive with 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Style</span>
                <br />& Comfort
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience luxury and convenience with our premium fleet of vehicles and professional chauffeurs. 
                Available 24/7 for business, weddings, and special occasions.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/book"
                  className="group relative bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <span className="flex items-center gap-2">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/fleet"
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View Our Fleet
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 text-white/80">
                {[
                  { icon: Shield, text: "Fully Insured" },
                  { icon: Star, text: "5-Star Rated" },
                  { icon: MapPin, text: "Multiple Locations" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                >
                  <source src="/df.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50+</p>
                    <p className="text-sm text-gray-600">Premium Vehicles</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Happy Clients", icon: Smile },
              { value: "50+", label: "Vehicles", icon: Car },
              { value: "24/7", label: "Availability", icon: Clock },
              { value: "100%", label: "Satisfaction", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Modern */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting your premium rental car is simple and straightforward with our 3-step process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select Your Vehicle",
                desc: "Browse our luxury fleet and choose your preferred make and model.",
                icon: Car
              },
              {
                step: "02",
                title: "Book Your Ride",
                desc: "Reserve online or call us directly. We offer flexible booking options.",
                icon: Calendar
              },
              {
                step: "03",
                title: "Enjoy Your Journey",
                desc: "Your chauffeur will arrive on time for a seamless experience.",
                icon: Smile
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                  <div className="text-6xl font-bold text-gray-200 absolute top-4 right-4 group-hover:text-blue-200 transition-colors">
                    {step.step}
                  </div>
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview - Modern */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium</span> Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our selection of vehicles for every need and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                model: "Toyota Land Cruiser V8",
                type: "Luxury",
                price: "Rs. 26,000/day",
                desc: "Ultimate luxury SUV with powerful performance and premium comfort.",
                features: ["7 Seats", "Petrol", "Automatic"],
                image: "/Toyotalandcruiser.jpg"
              },
              {
                id: 2,
                model: "Haval H6",
                type: "SUV",
                price: "Rs. 20,000/day",
                desc: "Premium SUV with spacious interior and advanced features.",
                features: ["5 Seats", "Petrol", "Automatic"],
                image: "/Havalh6.jpg"
              },
              {
                id: 3,
                model: "Hyundai Elantra",
                type: "Sedan",
                price: "Rs. 12,000/day",
                desc: "Elegant sedan with premium features and comfortable ride.",
                features: ["5 Seats", "Petrol", "Automatic"],
                image: "/Hyndaielantra.jpg"
              },
            ].map((vehicle) => (
              <motion.div
                key={vehicle.id}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {vehicle.type}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{vehicle.model}</h3>
                      <p className="text-lg font-bold text-blue-600">{vehicle.price}</p>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{vehicle.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {vehicle.features.map((feature, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/fleet#car-${vehicle.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group/link"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/fleet"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
            >
              View Complete Fleet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features/Benefits - Modern */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/ch.jpg"
                alt="Professional chauffeur service"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
                Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Service</span>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Professional Chauffeurs",
                    desc: "Our drivers are experienced, licensed, and trained in customer service.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "Premium Vehicles",
                    desc: "Only the latest models with full maintenance and cleanliness standards.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "24/7 Availability",
                    desc: "We're available round the clock for your convenience.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "Transparent Pricing",
                    desc: "No hidden fees with clear, competitive rates.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA - Modern */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Ready to Experience Premium?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-gray-300"
          >
            Contact us today to book your luxury vehicle or ask any questions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/book"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Book Now
            </Link>
            <a
              href="tel:+923125430959"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call: +92 312 5430959
            </a>
          </motion.div>
        </div>
      </section>

      <TrustedBy />
    </main>
  );
};

export default Home;