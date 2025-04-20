import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Star, Car, Calendar, Smile, Shield, MapPin, Clock, Fuel } from "lucide-react";
import TrustedBy from "./TrustedBy";

const Home = () => {
  return (
    <main className=" min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-6 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden ">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-12 max-w-7xl mx-auto">
          <motion.div
            className="md:w-1/2 z-10"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Premium Car Rentals in <span className="whitespace-nowrap">Islamabad</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Experience luxury and convenience with our premium fleet of vehicles and professional chauffeurs. Available 24/7 for business, weddings, and special occasions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/fleet"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="View our vehicle fleet"
              >
                View Fleet
              </Link>
              <Link
                to="/book"
                className="border-2 border-blue-600 text-blue-600 dark:text-white px-6 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 shadow-lg transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Book a vehicle now"
              >
                Book Now
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="text-green-500" size={20} />
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={20} fill="currentColor" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-red-500" size={20} />
                <span>Multiple Locations</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <video
              className="rounded-xl shadow-lg w-full h-auto "
              width={600}
              height={400}
              controls
              autoPlay
              preload="none"
              muted
            // poster="/ch.jpg"
            >
              <source src="/df.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* 
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-purple-500 rounded-full opacity-20"></div> */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12 dark:bg-blue-700 ">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
              className="flex flex-col items-center"
            >
              <stat.icon className="mb-2" size={32} />
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20  md:px-20 bg-white dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl  font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">How Our Car Rental Service Works</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Getting your premium rental car is simple and straightforward with our 3-step process
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Select Your Vehicle",
                desc: "Browse our luxury fleet and choose your preferred make and model.",
                icon: Car
              },
              {
                title: "Book Your Ride",
                desc: "Reserve online or call us directly. We offer flexible booking options.",
                icon: Calendar
              },
              {
                title: "Enjoy Your Journey",
                desc: "Your chauffeur will arrive on time for a seamless experience.",
                icon: Smile
              },
            ].map((step, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full">
                    <step.icon className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Our Premium Fleet
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
            >
              Explore our selection of vehicles for every need and budget
            </motion.p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {
                id: 4,
                model: "Honda Civic",
                type: "Sedan",
                price: "Rs. 10,000/day",
                desc: "Iconic sedan with sporty design and reliable performance.",
                features: ["5 Seats", "Petrol", "Automatic"],
                image: "/hondacivic.jpg"
              },
              {
                id: 5,
                model: "Kia Picanto",
                type: "Hatchback",
                price: "Rs. 4,800/day",
                desc: "Stylish automatic hatchback with modern features.",
                features: ["5 Seats", "Petrol", "Automatic"],
                image: "/kiapicanto.jpg"
              },
              {
                id: 6,
                model: "Suzuki Alto VXL",
                type: "Hatchback",
                price: "Rs. 4,500/day",
                desc: "Compact automatic perfect for city driving with great fuel efficiency.",
                features: ["4 Seats", "Petrol", "Automatic"],
                image: "/altovxl.jpg"
              }
            ].map((vehicle) => (
              <motion.article
                key={vehicle.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.model} for rent`}
                    className="w-full h-60 object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {vehicle.type}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{vehicle.model}</h3>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {vehicle.price}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{vehicle.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {vehicle.features.map((feature, i) => (
                      <span key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/fleet#car-${vehicle.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline group"
                    aria-label={`View details for ${vehicle.model}`}
                  >
                    View Details
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/fleet"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View all vehicles in our fleet"
            >
              View Complete Fleet
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Client Testimonials</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Don't just take our word for it - hear what our clients say
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                name: "Ali Khan",
                role: "Business Executive",
                review: "I've used Drive with Style for all my corporate travel needs. The service is impeccable and the vehicles are always in perfect condition. Highly recommend for business professionals.",
                rating: 5,
                date: "January 2024"
              },
              {
                name: "Sarah Ahmed",
                role: "Wedding Client",
                review: "Booked the Mercedes S-Class for my wedding day and it was absolutely perfect. The chauffeur was extremely professional and the car arrived spotless. Made our special day even more memorable!",
                rating: 5,
                date: "December 2023"
              },
            ].map((testimonial, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm"
              >
                <div className="mb-4 flex gap-1 text-yellow-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.review}"</p>
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role} • {testimonial.date}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 ">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src="/ch.jpg"
                alt="Professional chauffeur opening car door"
                className="rounded-xl shadow-lg w-full"
                width={600}
                height={400}
                loading="lazy"
              />
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl  font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Why Choose Our Service</h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Professional Chauffeurs",
                    desc: "Our drivers are experienced, licensed, and trained in customer service.",
                    icon: <Smile className="text-blue-600 dark:text-blue-400" size={24} />
                  },
                  {
                    title: "Premium Vehicles",
                    desc: "Only the latest models with full maintenance and cleanliness standards.",
                    icon: <Car className="text-blue-600 dark:text-blue-400" size={24} />
                  },
                  {
                    title: "24/7 Availability",
                    desc: "We're available round the clock for your convenience.",
                    icon: <Clock className="text-blue-600 dark:text-blue-400" size={24} />
                  },
                  {
                    title: "Transparent Pricing",
                    desc: "No hidden fees with clear, competitive rates.",
                    icon: <Fuel className="text-blue-600 dark:text-blue-400" size={24} />
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-20 bg-white dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl  mb-4 font-extrabold  leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" >Frequently Asked Questions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Find answers to common questions about our car rental service
            </p>
          </header>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "What is included in the rental price?",
                a: "Our rental prices include the vehicle, professional chauffeur, and basic insurance. Fuel costs are calculated separately based on distance traveled."
              },
              {
                q: "How far in advance should I book?",
                a: "We recommend booking at least 48 hours in advance for standard rentals. For special events like weddings, 1-2 weeks notice is ideal."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept cash, credit/debit cards, and bank transfers. Corporate accounts can be set up for regular clients."
              },
              {
                q: "Can I request a specific vehicle model?",
                a: "Absolutely! When booking, you can specify your preferred make and model. We'll confirm availability with you."
              },
              {
                q: "What safety measures do you have in place?",
                a: "All vehicles undergo regular maintenance, and our chauffeurs are trained in defensive driving. We also provide contactless service options."
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-gray-50 dark:bg-gray-800 p-5 rounded-lg cursor-pointer"
              >
                <summary className="flex justify-between items-center font-semibold list-none">
                  <span>{item.q}</span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Experience Premium Car Rental?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Contact us today to book your luxury vehicle or ask any questions
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/book"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg transition flex items-center gap-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              aria-label="Contact us for booking"
            >
              <Phone size={20} /> Book Now
            </Link>
            <a
              href="tel:+92 312 5430959"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 shadow-lg transition flex items-center gap-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              aria-label="Call us directly"
            >
              <Phone size={20} /> Call: +92 312 5430959
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges/Logos Section */}
      <TrustedBy />

    </main>
  );
};

export default Home;