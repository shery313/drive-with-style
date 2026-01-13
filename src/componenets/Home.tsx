import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, Star, Car, Calendar, Smile, Shield, Clock, 
  ArrowRight, CheckCircle, Sparkles, Users, Award, Zap,
  ChevronRight, BadgeCheck, ShieldCheck, TrendingUp
} from "lucide-react";
import TrustedBy from "./TrustedBy";
import axios from "axios";

// Vehicle type interface
interface Vehicle {
  id: number;
  name: string;
  vehicle_type: string;
  price_per_day: string;
  image: string;
  description: string;
  seats: number;
  fuel_type: string;
  transmission: string;
  slug: string;
};

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://drivewithstyle.up.railway.app/api/v1/fleet/');
        const vehicles = response.data.slice(0, 3);
        setFeaturedVehicles(vehicles);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 p-4">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/50">
        {/* Modern background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pr-8"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700 tracking-wide">
                  PREMIUM CAR RENTALS IN ISLAMABAD
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Experience Luxury
                <span className="block mt-2">
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Redefined
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                  </span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Drive With Style offers unparalleled premium vehicle rentals with professional chauffeurs. 
                Experience sophistication and comfort for every occasion in Islamabad.
              </p>

              <div className="flex md:flex-wrap md:gap-4 gap-2 mb-12">
                <Link
                  to="/book"
                  className="group relative inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                  aria-label="Book your premium vehicle now"
                >
                  <span className="flex items-center gap-3">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/fleet"
                  className="group inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                  aria-label="View our complete vehicle fleet"
                >
                  <span className="flex items-center gap-2">
                    Explore Fleet
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              {/* Trust indicators - Modern */}
              <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-gray-100">
                {[
                  { icon: ShieldCheck, text: "Fully Insured", color: "text-green-600" },
                  { icon: BadgeCheck, text: "Verified Chauffeurs", color: "text-blue-600" },
                  { icon: TrendingUp, text: "5.0 Rating", color: "text-yellow-600" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`${item.color} bg-gray-50 p-2 rounded-lg`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
                <video
                  className="w-full h-auto rounded-3xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Luxury car rental service showcase"
                >
                  <source src="/df.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-2 md:-right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50+</p>
                    <p className="text-sm text-gray-600 font-medium">Premium Vehicles</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section aria-labelledby="stats-heading" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Satisfied Clients", icon: Users, color: "from-blue-500 to-cyan-500" },
              { value: "50+", label: "Premium Vehicles", icon: Car, color: "from-indigo-500 to-purple-500" },
              { value: "24/7", label: "Service Available", icon: Clock, color: "from-emerald-500 to-green-500" },
              { value: "5.0", label: "Customer Rating", icon: Star, color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2 text-center">{stat.value}</p>
                  <p className="text-gray-600 font-medium text-center">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Modern Design */}
      <section aria-labelledby="how-it-works-heading" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">PROCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Seamless</span> Booking
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our streamlined booking process designed for your convenience
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Select Your Vehicle",
                  desc: "Browse our curated collection of premium vehicles and choose your perfect match.",
                  icon: Car,
                  color: "blue"
                },
                {
                  step: "02",
                  title: "Book & Confirm",
                  desc: "Secure your booking with our easy online system or direct call. Flexible options available.",
                  icon: Calendar,
                  color: "indigo"
                },
                {
                  step: "03",
                  title: "Enjoy The Journey",
                  desc: "Your professional chauffeur arrives punctually for an unforgettable experience.",
                  icon: Smile,
                  color: "purple"
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`bg-${step.color}-50 text-${step.color}-600 w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold`}>
                        {step.step}
                      </div>
                      <div className={`bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fleet Section */}
      <section aria-labelledby="fleet-preview-heading" className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full px-4 py-2 mb-4">
              <Car className="w-4 h-4" />
              <span className="text-sm font-semibold">PREMIUM FLEET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Curated <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Luxury</span> Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium vehicles for every occasion
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading premium vehicles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <motion.article
                  key={vehicle.id}
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.name} - ${vehicle.vehicle_type} rental in Islamabad`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full">
                          {vehicle.vehicle_type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">Rs. {Math.round(parseInt(vehicle.price_per_day))}</p>
                          <p className="text-xs text-gray-500">per day</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 line-clamp-2">{vehicle.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium">
                          {vehicle.seats} Seats
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                          {vehicle.fuel_type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                          {vehicle.transmission}
                        </span>
                      </div>

                      <Link
                        to={`/fleet/${vehicle.slug}`}
                        className="inline-flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-4 py-3 rounded-xl transition-colors duration-300 group/link"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/fleet"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              Explore Full Fleet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section aria-labelledby="features-heading" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="/ch.jpeg"
                  alt="Professional chauffeur service in Islamabad"
                  className="rounded-2xl shadow-xl w-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">100%</p>
                      <p className="text-sm text-gray-600">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-semibold">WHY CHOOSE US</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Unmatched <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Premium</span> Experience
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Professional Chauffeurs",
                    desc: "Expertly trained, licensed drivers with exceptional customer service skills.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "Immaculate Fleet",
                    desc: "Regularly maintained, latest models with premium amenities and cleanliness.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "24/7 Dedicated Support",
                    desc: "Round-the-clock assistance for reservations, changes, and emergencies.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: "Transparent Pricing",
                    desc: "No hidden charges with clear, all-inclusive competitive rates.",
                    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-heading" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">EXPERIENCE LUXURY</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready for an <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Unforgettable</span> Journey?
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Book your premium vehicle today and experience luxury travel redefined
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book"
                className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  Book Your Ride
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href="tel:+923125430959"
                className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Phone className="w-4 h-4" />
                  +92 312 5430959
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustedBy />
    </main>
  );
};

export default Home;