import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Star, Car, Calendar, Smile } from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-12">
        <motion.div
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Rent Cars in Style & Comfort
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Experience luxury and convenience with our premium vehicles and professional drivers. Available 24/7 to serve you across the city.
          </p>
          <div className="flex gap-4">
            <Link
              to="/fleet"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition"
            >
              View Fleet
            </Link>
            <Link
              to="/contact"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 shadow-lg transition"
            >
              Book Now
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/car1.jpg"
            alt="Luxury Car"
            className="w-full rounded-xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Choose Your Car", desc: "Select from our fleet of luxury and executive cars.", icon: Car },
            { title: "Make A Booking", desc: "Fill out the form or call us to reserve your ride.", icon: Calendar },
            { title: "Ride in Style", desc: "Our professional drivers will get you there in comfort.", icon: Smile },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
            >
              <div className="flex justify-center mb-4 text-blue-600">
                <step.icon size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fleet Preview Section */}
      <section className="px-6 md:px-20 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">Top Vehicles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[2, 3, 4].map((id) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={`car${id}.jpg`}
                alt={`Car ${id}`}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Car Model {id}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Stylish, comfortable, and perfect for business or leisure rides.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/fleet"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition"
          >
            View All Vehicles
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-800 px-6 md:px-20 py-20">
        <h2 className="text-4xl font-bold text-center mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Ali Khan",
              review: "Absolutely amazing service. Driver was professional and the car was spotless.",
              rating: 5,
            },
            {
              name: "Sarah Ahmed",
              review: "Booked for my wedding — luxury at its finest. Thank you for making it perfect!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
            >
              <div className="mb-3 flex gap-1 text-yellow-500">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.review}"</p>
              <h4 className="font-semibold">{testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-20 py-20 bg-white dark:bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              q: "Do you provide a driver with the car?",
              a: "Yes, all of our rentals come with a professional chauffeur.",
            },
            {
              q: "What cities do you operate in?",
              a: "We currently operate in Karachi, Lahore, and Islamabad.",
            },
            {
              q: "Is fuel included in the price?",
              a: "Fuel charges are separate and based on distance traveled.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
              <h3 className="font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Ride in Style?</h2>
        <p className="mb-6 text-lg">
          Book your next ride with us and enjoy a hassle-free luxury experience.
        </p>
        <Link
          to="/contact"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg transition"
        >
          Contact Us <Phone className="inline-block ml-2" size={18} />
        </Link>
      </section>

      
    </main>
  );
};

export default Home;
