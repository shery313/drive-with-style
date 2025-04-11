import { motion } from "framer-motion";
import { CheckCircle, Zap, Briefcase, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    title: "Standard Ride",
    price: "PKR 4,999",
    duration: "per day",
    features: [
      "Economy or Compact Car",
      "Fuel Efficient",
      "Free 100 KM",
      "Basic Insurance",
      "24/7 Roadside Assistance",
      "Free Cancellation"
    ],
    buttonText: "Choose Standard",
    path: "/book?plan=standard",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    popular: false
  },
  {
    title: "Business Class",
    price: "PKR 9,999",
    duration: "per day",
    features: [
      "Luxury Sedan (Mercedes E-Class)",
      "Professional Driver",
      "Air Conditioning",
      "Premium Insurance",
      "Free 200 KM",
      "Priority Booking"
    ],
    buttonText: "Choose Business",
    path: "/book?plan=business",
    icon: <Briefcase className="w-6 h-6 text-blue-500" />,
    popular: true
  },
  {
    title: "Elite Experience",
    price: "PKR 19,999",
    duration: "per day",
    features: [
      "Luxury SUV or Limousine",
      "Personal Chauffeur",
      "Complimentary Wi-Fi & Beverages",
      "Full VIP Insurance",
      "Unlimited Mileage",
      "Concierge Service"
    ],
    buttonText: "Choose Elite",
    path: "/book?plan=elite",
    icon: <Crown className="w-6 h-6 text-purple-500" />,
    popular: false
  },
];

const Pricing = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl p-3 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Our Pricing Plans
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect rental package for your journey with our flexible and transparent pricing options.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 transform md:scale-105"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-6 md:p-8 ${plan.popular ? "bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white" : "bg-white dark:bg-gray-800"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {plan.icon}
                    <h2 className="text-xl md:text-2xl font-bold">{plan.title}</h2>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-3xl md:text-4xl font-bold mb-1">{plan.price}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{plan.duration}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle 
                        className={`flex-shrink-0 mt-0.5 ${plan.popular ? "text-blue-200" : "text-green-500"}`} 
                        size={18} 
                      />
                      <span className={plan.popular ? "text-blue-100" : "text-gray-700 dark:text-gray-300"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.path}
                  className={`block text-center w-full px-6 py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Need something special?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact us for custom packages, long-term rentals, or special event arrangements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Custom Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Pricing;