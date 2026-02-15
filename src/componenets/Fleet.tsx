import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Fuel, Users, Settings, Star, ChevronDown, Search, Filter, Car, 
  Sparkles, ArrowRight, Phone, MessageSquare,
 Clock, CheckCircle, X, ChevronLeft, ChevronRight,
   TrendingUp, ShieldCheck
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { SERVER_URL } from "../constant";

type CarType = {
  id: number;
  name: string;
  vehicle_type: "Hatchback" | "Sedan" | "SUV" | "Luxury";
  image: string;
  description: string;
  price_per_day: string;
  price_per_month: string;
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
  const [sortBy, setSortBy] = useState<"price_low" | "price_high" | "rating" | "seats">("price_low");
  
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const carsPerPage = 9;

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
        setLoading(true);
        const response = await axios.get(`${SERVER_URL}/api/v1/fleet/`);
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

  // Filter and sort logic
  const filteredCars = cars
    .filter(car => {
      if (selectedCategory !== "All" && car.vehicle_type !== selectedCategory) return false;
      if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return parseInt(a.price_per_day) - parseInt(b.price_per_day);
        case "price_high":
          return parseInt(b.price_per_day) - parseInt(a.price_per_day);
        case "rating":
          return b.rating - a.rating;
        case "seats":
          return b.seats - a.seats;
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const toggleExpand = (id: number) => {
    setExpandedCarId(expandedCarId === id ? null : id);
  };

  const handleCarClick = (car: CarType) => {
    navigate(`/fleet/${car.slug}`);
  };

  const handleViewDetails = (car: CarType, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/fleet/${car.slug}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Fleet | Drive With Style | Premium Car Rentals Islamabad</title>
          <meta name="description" content="Loading our premium fleet of luxury vehicles for rent in Islamabad" />
        </Helmet>
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
                </div>
                <div className="relative">
                  <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-600 mx-auto mb-8"></div>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Discovering Premium Vehicles</h1>
              <p className="text-gray-600">Loading our exclusive collection...</p>
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
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 sm:p-12 max-w-xl mx-auto shadow-xl border border-gray-100">
              <div className="bg-red-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Unable to Load Fleet</h1>
              <p className="text-gray-600 mb-8">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Try Again
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
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

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white" itemScope itemType="https://schema.org/ItemList">
        {/* Hero Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-24">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 mb-6 border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide">EXCLUSIVE FLEET</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" itemProp="name">
                Premium Vehicle 
                <span className="block mt-2">
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Collection
                  </span>
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed" itemProp="description">
                Discover our curated selection of premium vehicles in Islamabad. Each car is maintained to the highest standards for your luxury experience.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/book"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <a
                  href="tel:+923125430959"
                  className="group bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    Get Assistance
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Car, label: "Premium Vehicles", value: `${cars.length}+`, color: "bg-blue-500" },
              { icon: ShieldCheck, label: "Fully Insured", value: "100%", color: "bg-green-500" },
              { icon: TrendingUp, label: "Client Satisfaction", value: "99%", color: "bg-amber-500" },
              { icon: Clock, label: "Availability", value: "24/7", color: "bg-purple-500" },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 w-full lg:max-w-lg">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search vehicles by name, type, or features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="seats">Most Seats</option>
                </select>
              </div>
            </div>

            {/* Filter Categories */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <Filter className="w-4 h-4" />
                  Filter:
                </div>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          >
            <div>
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredCars.length}</span> vehicles
                {selectedCategory !== "All" && (
                  <span> in <span className="font-semibold text-blue-600">{selectedCategory}</span></span>
                )}
                {searchQuery && (
                  <span> matching "<span className="font-semibold text-blue-600">{searchQuery}</span>"</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </motion.div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <AnimatePresence>
              {currentCars.length > 0 ? (
                currentCars.map((car, index) => (
                  <motion.article
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                    onClick={() => handleCarClick(car)}
                    itemScope
                    itemType="https://schema.org/Car"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                      {/* Image Section */}
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={car.image}
                          alt={`${car.name} - Premium ${car.vehicle_type} rental in Islamabad`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          itemProp="image"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                            car.vehicle_type === "Luxury" 
                              ? "bg-purple-600/90 text-white" 
                              : car.vehicle_type === "SUV"
                              ? "bg-green-600/90 text-white"
                              : car.vehicle_type === "Sedan"
                              ? "bg-blue-600/90 text-white"
                              : "bg-amber-600/90 text-white"
                          }`}>
                            {car.vehicle_type}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                            <span className="text-xs font-semibold text-white">{car.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="name">{car.name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4" itemProp="description">
                            {car.description.length > 100 ? `${car.description.substring(0, 100)}...` : car.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="text-center">
                            <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700" itemProp="seatingCapacity">{car.seats} Seats</span>
                          </div>
                          <div className="text-center">
                            <div className="bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Fuel className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700" itemProp="fuelType">{car.fuel_type}</span>
                          </div>
                          <div className="text-center">
                            <div className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2">
                              <Settings className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700" itemProp="vehicleTransmission">{car.transmission}</span>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="mt-auto border-t border-gray-100 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <div className="text-2xl font-bold text-blue-600" itemProp="price">
                                Rs. {Math.round(parseInt(car.price_per_day))}
                              </div>
                              <div className="text-xs text-gray-500">per day</div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(car.id);
                              }}
                              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
                            >
                              {expandedCarId === car.id ? 'Show Less' : 'More Details'}
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
                                <div className="mb-4">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Premium Features
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                      {car.air_conditioning ? "Climate Control" : "Manual AC"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                      Premium Audio
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                      Navigation System
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                      {car.luggage_capacity} Bags
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                      {car.insurance_coverage ? "Full Coverage" : "Basic Insurance"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                      24/7 Roadside
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <Link to={`/book/${car.slug}`} className="flex-1">
                                    <button 
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center"
                                    >
                                      Book Now
                                    </button>
                                  </Link>
                                  <button 
                                    onClick={(e) => handleViewDetails(car, e)}
                                    className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex-1"
                                  >
                                    Details
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Quick Book Button (when not expanded) */}
                          {expandedCarId !== car.id && (
                            <Link to={`/book/${car.slug}`}>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center mt-2"
                              >
                                Quick Book
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 max-w-md mx-auto border border-gray-200">
                    <Car className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No vehicles found</h3>
                    <p className="text-gray-600 mb-8">
                      {searchQuery 
                        ? `No vehicles match "${searchQuery}" in ${selectedCategory !== "All" ? selectedCategory : "our fleet"}.`
                        : `We don't have any ${selectedCategory.toLowerCase()} vehicles available at the moment.`
                      }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => {
                          setSelectedCategory("All");
                          setSearchQuery("");
                        }}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        View All Vehicles
                      </button>
                      <Link
                        to="/contact"
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 text-center"
                      >
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-2 mb-16"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === pageNumber
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Need Help Choosing?</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Our experts are ready to help you select the perfect vehicle for your needs in Islamabad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+923125430959"
                  className="group inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now: +92 312 5430959
                </a>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Send Message
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default Fleet;