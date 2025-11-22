import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fuel, Users, Settings, Star, ChevronDown, Search, Filter, Car, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

type CarType = {
  id: number;
  name: string;
  vehicle_type: "Hatchback" | "Sedan" | "SUV" | "Luxury";
  image: string;
  description: string;
  price_per_day: string;
  seats: number;
  fuel_type: string;
  transmission: string;
  rating: number;
  air_conditioning: boolean;
  luggage_capacity: number;
  insurance_coverage: boolean;
  slug: string;
};

const categories = ["All", "Hatchback", "Sedan", "SUV", "Luxury"] as const;
type Category = (typeof categories)[number];

const Fleet = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [expandedCarId, setExpandedCarId] = useState<number | null>(null);
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://drivewithstyle.up.railway.app/api/v1/fleet/");
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch vehicles. Please try again later.");
        setLoading(false);
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = selectedCategory === "All" 
    ? cars.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cars.filter((car) => 
        car.vehicle_type === selectedCategory && (
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

  const toggleExpand = (id: number) => {
    setExpandedCarId(expandedCarId === id ? null : id);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Loading Our Fleet</h1>
            <p className="text-gray-600">Discovering premium vehicles for you...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Fleet</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Premium Fleet</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Premium</span> Fleet
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our diverse collection of premium vehicles for every need and budget
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search vehicles by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Filter className="w-4 h-4" />
                Filter:
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredCars.length}</span> vehicles
            {selectedCategory !== "All" && (
              <span> in <span className="font-semibold text-blue-600">{selectedCategory}</span></span>
            )}
            {searchQuery && (
              <span> matching "<span className="font-semibold text-blue-600">{searchQuery}</span>"</span>
            )}
          </p>
        </motion.div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <motion.article
                  key={car.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          car.vehicle_type === "Luxury" 
                            ? "bg-purple-600 text-white" 
                            : car.vehicle_type === "SUV"
                            ? "bg-green-600 text-white"
                            : car.vehicle_type === "Sedan"
                            ? "bg-blue-600 text-white"
                            : "bg-orange-600 text-white"
                        }`}>
                          {car.vehicle_type}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                          <span className="text-xs font-medium text-white">{car.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{car.seats} Seats</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <Fuel className="w-6 h-6 text-green-600" />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{car.fuel_type}</span>
                        </div>
                        <div className="text-center">
                          <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                            <Settings className="w-6 h-6 text-purple-600" />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{car.transmission}</span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Starting from</p>
                            <p className="text-2xl font-bold text-blue-600">Rs. {car.price_per_day}<span className="text-sm font-normal text-gray-500">/day</span></p>
                          </div>
                          <button
                            onClick={() => toggleExpand(car.id)}
                            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                          >
                            {expandedCarId === car.id ? 'Less' : 'More'}
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform ${
                                expandedCarId === car.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Expandable Details */}
                        <AnimatePresence>
                          {expandedCarId === car.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-100 pt-4"
                            >
                              <h4 className="font-semibold text-gray-900 mb-3">Premium Features</h4>
                              <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  {car.air_conditioning ? "Climate Control" : "Manual AC"}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  Bluetooth
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  Navigation
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  {car.luggage_capacity} Bags
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  {car.insurance_coverage ? "Full Insurance" : "Basic Insurance"}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  24/7 Support
                                </div>
                              </div>
                              <Link to={`/book/${car.slug}`}>
                                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                                  Book This Vehicle
                                </button>
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Car className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No vehicles found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {searchQuery 
                    ? `No vehicles match "${searchQuery}" in ${selectedCategory !== "All" ? selectedCategory : "our fleet"}.`
                    : `We don't have any ${selectedCategory.toLowerCase()} vehicles available at the moment.`
                  }
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setSelectedCategory("All")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View All Vehicles
                  </button>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Fleet;