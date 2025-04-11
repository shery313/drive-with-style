import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Fuel, Users, Settings, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

type Car = {
  id: number;
  name: string;
  type: "SUV" | "Sedan" | "Luxury" | "Economy";
  image: string;
  description: string;
  pricePerDay: string;
  features: {
    seats: number;
    fuelType: string;
    transmission: string;
    rating: number;
  };
};

const cars: Car[] = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    type: "Luxury",
    image: "/car1.jpg",
    description: "Premium class luxury with executive seating and cutting-edge technology for VIP experiences.",
    pricePerDay: "Rs. 25,000/day",
    features: {
      seats: 4,
      fuelType: "Premium",
      transmission: "Automatic",
      rating: 4.9
    }
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    type: "SUV",
    image: "/car2.jpg",
    description: "A rugged yet refined SUV capable of handling any terrain with premium comfort.",
    pricePerDay: "Rs. 18,500/day",
    features: {
      seats: 7,
      fuelType: "Diesel",
      transmission: "Automatic",
      rating: 4.7
    }
  },
  {
    id: 3,
    name: "Honda Civic 2024",
    type: "Sedan",
    image: "/car3.jpg",
    description: "Stylish and efficient sedan perfect for business meetings or weekend getaways.",
    pricePerDay: "Rs. 9,500/day",
    features: {
      seats: 5,
      fuelType: "Petrol",
      transmission: "CVT",
      rating: 4.5
    }
  },
  {
    id: 4,
    name: "Suzuki Alto",
    type: "Economy",
    image: "/car4.jpg",
    description: "Compact and fuel-efficient for city commuting and daily errands.",
    pricePerDay: "Rs. 4,500/day",
    features: {
      seats: 4,
      fuelType: "Petrol",
      transmission: "Manual",
      rating: 4.2
    }
  },
  {
    id: 5,
    name: "KIA Sportage",
    type: "SUV",
    image: "/car5.jpg",
    description: "Modern SUV with advanced safety features and spacious interior.",
    pricePerDay: "Rs. 11,500/day",
    features: {
      seats: 5,
      fuelType: "Petrol",
      transmission: "Automatic",
      rating: 4.6
    }
  },
  {
    id: 6,
    name: "BMW 7 Series",
    type: "Luxury",
    image: "/car6.jpg",
    description: "The epitome of luxury with handcrafted details and powerful performance.",
    pricePerDay: "Rs. 28,000/day",
    features: {
      seats: 4,
      fuelType: "Premium",
      transmission: "Automatic",
      rating: 4.9
    }
  },
];

const categories = ["All", "SUV", "Sedan", "Luxury", "Economy"] as const;
type Category = (typeof categories)[number];

const Fleet = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedCarId, setExpandedCarId] = useState<number | null>(null);

  const filteredCars = selectedCategory === "All" 
    ? cars 
    : cars.filter((car) => car.type === selectedCategory);

  const toggleExpand = (id: number) => {
    setExpandedCarId(expandedCarId === id ? null : id);
  };

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Our Premium Fleet
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Choose from our diverse collection of luxury, executive, and economy vehicles for every occasion
          </motion.p>
        </header>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
              aria-label={`Filter by ${category} vehicles`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <motion.article
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={`${car.name} for rent`}
                      className="w-full h-60 object-cover"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {car.type}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{car.features.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">{car.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col items-center">
                        <Users size={20} className="text-blue-600 dark:text-blue-400 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{car.features.seats} Seats</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Fuel size={20} className="text-blue-600 dark:text-blue-400 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{car.features.fuelType}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Settings size={20} className="text-blue-600 dark:text-blue-400 mb-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{car.features.transmission}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{car.pricePerDay}</p>
                        </div>
                        <button
                          onClick={() => toggleExpand(car.id)}
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                          aria-expanded={expandedCarId === car.id}
                        >
                          {expandedCarId === car.id ? 'Less details' : 'More details'}
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform ${expandedCarId === car.id ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {expandedCarId === car.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                          >
                            <h4 className="font-semibold mb-2">Features:</h4>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                              <li className="flex items-center gap-2">
                                <span className="text-blue-500">•</span> Climate control
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-blue-500">•</span> Bluetooth connectivity
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-blue-500">•</span> Navigation system
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-blue-500">•</span> Leather seats
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-blue-500">•</span> 24/7 roadside assistance
                              </li>
                            </ul>
                            <Link to="/book" className="w-full">
                            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition">
                              Book This Vehicle
                            </button>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We don't have any {selectedCategory.toLowerCase()} vehicles in our fleet currently.
                  Please check back later or try another category.
                </p>
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  View all vehicles
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Fleet;