import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
    ],
    buttonText: "Choose Standard",
    path: "/book?plan=standard",
  },
  {
    title: "Business Class",
    price: "PKR 9,999",
    duration: "per day",
    features: [
      "Luxury Sedan",
      "Professional Driver",
      "Air Conditioning",
      "Premium Insurance",
    ],
    buttonText: "Choose Business",
    path: "/book?plan=business",
    highlight: true,
  },
  {
    title: "Elite Experience",
    price: "PKR 19,999",
    duration: "per day",
    features: [
      "Luxury SUV or Limousine",
      "Chauffeur Service",
      "Wi-Fi & Beverages",
      "Full VIP Package",
    ],
    buttonText: "Choose Elite",
    path: "/book?plan=elite",
  },
];

const Pricing = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 md:px-20 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Our Pricing Plans</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Flexible and affordable rental plans tailored to suit your travel needs and luxury preferences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-xl shadow-lg ${
              plan.highlight
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
            <p className="text-3xl font-bold mb-1">{plan.price}</p>
            <p className="text-sm mb-6">{plan.duration}</p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to={plan.path}
              className={`inline-block text-center w-full px-6 py-3 rounded-lg font-semibold transition ${
                plan.highlight
                  ? "bg-white text-blue-600 hover:bg-gray-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Pricing;
