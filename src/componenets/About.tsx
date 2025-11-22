import { motion } from "framer-motion";
import { Car, Clock, Shield, Star, Award, Users, Phone, Mail, MapPin, Quote } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Car className="w-6 h-6 text-blue-600" />,
      title: "Premium Fleet",
      description: "Impeccably maintained luxury vehicles for every occasion"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "24/7 Availability",
      description: "Round-the-clock service whenever you need transportation"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Fully Insured",
      description: "Comprehensive coverage for complete peace of mind"
    },
    {
      icon: <Star className="w-6 h-6 text-blue-600" />,
      title: "5-Star Service",
      description: "Exceptional customer experience from start to finish"
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: "Award-Winning",
      description: "Recognized for excellence in luxury transportation"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Professional Team",
      description: "Highly trained chauffeurs with years of experience"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Drive With Style</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Redefining luxury transportation with exceptional service, elegant vehicles, and professional chauffeurs who value your comfort and time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To transform every journey into an extraordinary experience by combining premium vehicles, professional service, and personalized attention to detail.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm border border-gray-100"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the most trusted name in premium transportation, setting new standards for luxury, reliability, and customer satisfaction across the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Users className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Adnan Sajjad Satti</h3>
                    <p className="text-blue-100">Founder & CEO</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-200" />
                    <span className="text-blue-100">+92 312 5430959</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-200" />
                    <span className="text-blue-100">adnan@drivewithstyle.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-200" />
                    <span className="text-blue-100">Islamabad, Pakistan</span>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <blockquote className="text-lg italic text-blue-100 leading-relaxed">
                    "Our commitment goes beyond transportation. We're dedicated to creating memorable experiences 
                    where every journey feels special, safe, and sophisticated. Your trust is our most valuable asset."
                  </blockquote>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-gray-900">8+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Vehicles</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Founder</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Adnan Sajjad Satti founded Drive With Style in 2015 with a vision to revolutionize luxury transportation in Pakistan. 
                  With over 8 years of experience in the automotive and service industry, Adnan has built the company from a single 
                  luxury sedan into Islamabad's premier car rental service.
                </p>
                <p className="text-lg leading-relaxed">
                  His hands-on approach and commitment to excellence ensure that every client receives personalized attention 
                  and service that exceeds expectations. Under his leadership, Drive With Style has become synonymous with 
                  reliability, luxury, and professional service.
                </p>
                <p className="text-lg leading-relaxed">
                  Adnan personally oversees fleet maintenance, chauffeur training, and customer service operations, 
                  ensuring that the company's high standards are maintained across all aspects of the business.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Journey</h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg leading-relaxed">
                    Founded in 2015 by Adnan Sajjad Satti, Drive With Style began with a single luxury sedan and a vision to 
                    revolutionize transportation services in Islamabad.
                  </p>
                  <p className="text-lg leading-relaxed">
                    What started as a small operation has grown into a premier fleet of luxury vehicles, serving corporate clients, 
                    weddings, and special events throughout Pakistan.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our commitment to excellence has earned us recognition as one of the most reliable luxury transportation 
                    providers in the region, with a reputation built on trust, quality, and exceptional service.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 min-h-96 lg:min-h-full">
                <img 
                  src="/logo1.jpg" 
                  alt="Drive With Style fleet" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Drive With Style</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond transportation to deliver an experience that exceeds expectations every time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Our Commitment to Excellence</h2>
            <p className="text-xl mb-12 max-w-4xl mx-auto opacity-90">
              At Drive With Style, we don't just provide cars - we provide peace of mind. Our team of professionals is dedicated 
              to ensuring every aspect of your journey is flawless, from the moment you book until you reach your destination.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-blue-100 font-medium">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100 font-medium">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100 font-medium">Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5★</div>
                <div className="text-blue-100 font-medium">Ratings</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;