import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fuel, Users, Settings, Star, ChevronDown, Search, Filter, Car, Sparkles, ArrowRight, Shield, Zap, MapPin, Phone, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

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
  const navigate = useNavigate();

  // SEO Meta Data
  const seoData = {
    title: "Premium Car Fleet Islamabad | Luxury Vehicles for Rent | Drive With Style",
    description: "Explore our premium fleet of luxury cars, SUVs, sedans & hatchbacks in Islamabad. Best rates, 24/7 support, and professional chauffeur services. Book your perfect vehicle today!",
    keywords: "car fleet islamabad, luxury car rental fleet, premium vehicles islamabad, suv rental islamabad, sedan cars for rent, hatchback rental, luxury vehicle fleet, drive with style cars",
    canonical: "https://drivewithstyles.com/fleet",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Premium Car Rental Fleet - Drive With Style",
      "description": "Luxury and premium vehicles available for rent in Islamabad",
      "url": "https://drivewithstyles.com/fleet",
      "numberOfItems": cars.length,
      "itemListElement": cars.map((car, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Car",
          "name": car.name,
          "description": car.description,
          "image": car.image,
          "vehicleType": car.vehicle_type,
          "seatingCapacity": car.seats,
          "fuelType": car.fuel_type,
          "transmission": car.transmission,
          "url": `https://drivewithstyles.com/fleet/${car.slug}`
        }
      }))
    }
  };

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

  const handleCarClick = (car: CarType) => {
    navigate(`/fleet/${car.slug}`);
  };

  const handleViewDetails = (car: CarType, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/fleet/${car.slug}`);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Fleet | Drive With Style | Premium Car Rentals Islamabad</title>
          <meta name="description" content="Loading our premium fleet of luxury vehicles for rent in Islamabad" />
        </Helmet>
        <section className="min-h-screen bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Loading Our Fleet</h1>
              <p className="text-gray-600">Discovering premium vehicles for you...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Fleet Unavailable | Drive With Style | Car Rentals Islamabad</title>
          <meta name="description" content="Temporary issue loading our vehicle fleet. Please try again." />
        </Helmet>
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
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content="https://drivewithstyles.com/fleet-og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.canonical} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content="https://drivewithstyles.com/fleet-twitter-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      </Helmet>

      <section className="min-h-screen bg-gray-50" itemScope itemType="https://schema.org/ItemList">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" itemProp="name">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Premium</span> Fleet
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto" itemProp="description">
                Choose from our diverse collection of premium vehicles for every need and budget in Islamabad. Luxury cars, SUVs, sedans, and hatchbacks available for rent.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Fleet Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{cars.length}+</div>
              <div className="text-sm text-gray-600">Premium Vehicles</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Fully Insured</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">Islamabad</div>
              <div className="text-sm text-gray-600">Service Area</div>
            </div>
          </div>
        </motion.div>

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
                    placeholder="Search luxury cars, SUVs, sedans in Islamabad..."
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
                    className="group cursor-pointer"
                    onClick={() => handleCarClick(car)}
                    itemScope
                    itemType="https://schema.org/Car"
                  >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={car.image}
                          alt={`${car.name} - Luxury ${car.vehicle_type} rental in Islamabad`}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          itemProp="image"
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
                          <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="name">{car.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed" itemProp="description">{car.description}</p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-xs font-medium text-gray-700" itemProp="seatingCapacity">{car.seats} Seats</span>
                          </div>
                          <div className="text-center">
                            <div className="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Fuel className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-xs font-medium text-gray-700" itemProp="fuelType">{car.fuel_type}</span>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-50 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Settings className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-xs font-medium text-gray-700" itemProp="vehicleTransmission">{car.transmission}</span>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="border-t border-gray-100 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Starting from</p>
                              <p className="text-2xl font-bold text-blue-600" itemProp="price">Rs. {car.price_per_day}<span className="text-sm font-normal text-gray-500">/day</span></p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(car.id);
                              }}
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
                                <div className="flex gap-3">
                                  <Link to={`/book/${car.slug}`}>
                                    <button 
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center"
                                    >
                                      Book Now
                                    </button>
                                  </Link>
                                  <button 
                                    onClick={(e) => handleViewDetails(car, e)}
                                    className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                                  >
                                    View Details
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
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

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Can't Find Your Perfect Vehicle?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact our team for personalized recommendations and special vehicle requests in Islamabad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+923125430959"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call for Assistance
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Inquiry
              </Link>
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
};

export default Fleet;