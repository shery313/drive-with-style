import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock,  MapPin,  Check, ArrowLeft, Car, Phone, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

interface Vehicle {
  id: number;
  slug: string;
  name: string;
  vehicle_type: string;
  price_per_day: number;
  image: string;
  features: string[];
}

interface BookingFormData {
  vehicle: number | null;
  pickupLocation: string;
  dropoffLocation: string;
  pickup_date: string;
  pickup_time: string;
  return_date: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: string;
  transactionId: string;
  paymentScreenshot: File | null;
  booking_reference: string;
}

// Vehicle categories for better organization
const VEHICLE_CATEGORIES = [
  { id: "all", name: "All Vehicles", icon: "🚗" },
  { id: "sedan", name: "Sedans", icon: "🚙" },
  { id: "suv", name: "SUVs", icon: "🚗" },
  { id: "luxury", name: "Luxury", icon: "⭐" },
  { id: "premium", name: "Premium", icon: "✨" },
  { id: "van", name: "Vans", icon: "🚐" }
];

const BookingPage = () => {
  const { slug } = useParams();
  const [step, setStep] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState<BookingFormData>({
    vehicle: null,
    pickupLocation: "",
    dropoffLocation: "",
    pickup_date: "",
    pickup_time: "",
    return_date: "",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "bank-transfer",
    transactionId: "",
    paymentScreenshot: null,
    booking_reference: `#PK${Math.floor(Math.random() * 9000) + 1000}`
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter vehicles based on category and search
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesCategory = selectedCategory === "all" || 
      vehicle.vehicle_type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesSearch = searchTerm === "" || 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Group vehicles by type for category counts
  const vehicleCounts = VEHICLE_CATEGORIES.map(category => {
    if (category.id === "all") {
      return { ...category, count: vehicles.length };
    }
    
    const count = vehicles.filter(vehicle => 
      vehicle.vehicle_type.toLowerCase().includes(category.id.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(category.id.toLowerCase())
    ).length;
    
    return { ...category, count };
  });

  // SEO Meta Data
  const seoData = {
    title: "Book Premium Car Rental in Islamabad | Drive With Style | Luxury Vehicles",
    description: "Reserve your luxury vehicle in Islamabad with Drive With Style. Easy 3-step booking process for premium car rentals with professional chauffeurs. Secure payment options available.",
    keywords: "book car rental islamabad, luxury car booking, premium vehicle rental, reserve car islamabad, chauffeur service booking",
    canonical: "https://drivewithstyles.com/book"
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Premium Car Rental Booking",
    "description": seoData.description,
    "provider": {
      "@type": "Organization",
      "name": "Drive With Style",
      "url": "https://drivewithstyles.com"
    },
    "areaServed": "Islamabad, Pakistan",
    "serviceType": "Car Rental Booking",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://drivewithstyles.com/book"
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://drivewithstyle.up.railway.app/api/v1/fleet/");
        setVehicles(response.data);
        
        if (slug) {
          const vehicle = response.data.find((v: Vehicle) => v.slug === slug);
          if (vehicle) {
            setSelectedVehicle(vehicle);
            setFormData(prev => ({
              ...prev,
              vehicle: vehicle.id
            }));
          }
        }
      } catch (err) {
        setError("Failed to load vehicles. Please try again later.");
        console.error("Error fetching vehicles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentScreenshot: e.target.files![0] }));
    }
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData(prev => ({
      ...prev,
      vehicle: vehicle.id
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formPayload = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'paymentScreenshot' && value) {
          formPayload.append('payment_proof', value);
        } else if (value !== null) {
          formPayload.append(key, value.toString());
        }
      });
      
      formPayload.append('customer_name', formData.fullName);
      formPayload.append('customer_email', formData.email);
      formPayload.append('customer_phone', formData.phone);
      formPayload.append('pickup_location', formData.pickupLocation);
      formPayload.append('dropoff_location', formData.dropoffLocation);
      
      const response = await axios.post(
        "https://drivewithstyle.up.railway.app/api/v1/booking/", 
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log("Booking created:", response.data);
      nextStep();
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("There was an error submitting your booking. Please try again.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeScreenshot = () => {
    setFormData(prev => ({ ...prev, paymentScreenshot: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading premium vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoData.canonical} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <main className="min-h-screen bg-gray-50" itemScope itemType="https://schema.org/Service">
        {/* Header Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <Car className="w-4 h-4" />
                <span className="text-sm font-medium">Secure Car Rental Booking</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4" itemProp="name">
                Book Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Premium</span> Vehicle
              </h1>
              <p className="text-xl text-gray-300" itemProp="description">
                Complete our secure 3-step booking form to reserve your luxury vehicle in Islamabad
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          {/* Back button for steps 1-3 */}
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link 
                to={step === 1 ? "/fleet" : "#"} 
                onClick={step > 1 ? prevStep : undefined}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                aria-label={step === 1 ? "Back to vehicle fleet" : "Back to previous step"}
              >
                <ArrowLeft size={16} />
                {step === 1 ? "Back to Fleet" : "Back"}
              </Link>
            </motion.div>
          )}

          {/* Progress Steps */}
          {step < 4 && (
            <nav aria-label="Booking progress">
              <div className="mb-12">
                <h2 className="sr-only">Booking Steps</h2>
                <div className="flex justify-between relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transition-all duration-300"
                    style={{ width: `${(step - 1) * 50}%` }}
                  ></div>

                  {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center">
                      <button
                        onClick={() => stepNumber < step && setStep(stepNumber)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium transition-all ${
                          stepNumber <= step 
                            ? 'bg-blue-600 shadow-lg shadow-blue-500/25' 
                            : 'bg-gray-400'
                        }`}
                        disabled={stepNumber > step}
                        aria-label={`Go to step ${stepNumber}: ${stepNumber === 1 ? 'Trip Details' : stepNumber === 2 ? 'Your Information' : 'Payment'}`}
                        aria-current={stepNumber === step ? 'step' : undefined}
                      >
                        {stepNumber < step ? <Check size={20} /> : stepNumber}
                      </button>
                      <span className={`mt-3 text-sm font-medium ${
                        stepNumber <= step ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {stepNumber === 1 && 'Trip Details'}
                        {stepNumber === 2 && 'Your Info'}
                        {stepNumber === 3 && 'Payment'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          )}

          {/* Booking Form */}
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: step > 1 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <form onSubmit={handleSubmit} itemScope itemType="https://schema.org/Reservation">
              {/* Step 1: Trip Details */}
              {step === 1 && (
                <div className="p-8">
                  <header className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <MapPin className="text-blue-600" size={28} aria-hidden="true" />
                      Trip Details & Vehicle Selection
                    </h2>
                    <p className="text-gray-600">Provide your travel information and choose your preferred luxury vehicle</p>
                  </header>
                  
                  <div className="space-y-8">
                    <section aria-labelledby="location-heading">
                      <h3 id="location-heading" className="sr-only">Location Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-3">
                            Pickup Location <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                            <input
                              type="text"
                              id="pickupLocation"
                              name="pickupLocation"
                              value={formData.pickupLocation}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Enter pickup address in Islamabad"
                              required
                              aria-required="true"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-3">
                            Dropoff Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                            <input
                              type="text"
                              id="dropoffLocation"
                              name="dropoffLocation"
                              value={formData.dropoffLocation}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Same as pickup or different location"
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    <section aria-labelledby="datetime-heading">
                      <h3 id="datetime-heading" className="sr-only">Date and Time Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="pickup_date" className="block text-sm font-medium text-gray-700 mb-3">
                            Pickup Date <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                            <input
                              type="date"
                              id="pickup_date"
                              name="pickup_date"
                              value={formData.pickup_date}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              required
                              aria-required="true"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="pickup_time" className="block text-sm font-medium text-gray-700 mb-3">
                            Pickup Time <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                            <input
                              type="time"
                              id="pickup_time"
                              name="pickup_time"
                              value={formData.pickup_time}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              required
                              aria-required="true"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-3">
                            Return Date <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                            <input
                              type="date"
                              id="return_date"
                              name="return_date"
                              value={formData.return_date}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              required
                              aria-required="true"
                              min={formData.pickup_date || new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                      </div>
                    </section>

                    <section aria-labelledby="vehicle-selection-heading">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Vehicle Categories Sidebar */}
                        <div className="lg:w-1/4">
                          <div className="sticky top-6 space-y-4">
                            {/* Search Box */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <input
                                type="text"
                                placeholder="Search vehicles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>

                            {/* Category Filters */}
                            <div className="space-y-2">
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <Filter size={16} />
                                Vehicle Type
                              </h4>
                              {vehicleCounts.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => setSelectedCategory(category.id)}
                                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                                    selectedCategory === category.id
                                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-lg">{category.icon}</span>
                                    <span className="font-medium">{category.name}</span>
                                  </div>
                                  <span className={`text-sm px-2 py-1 rounded-full ${
                                    selectedCategory === category.id
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    {category.count}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Vehicle Grid */}
                        <div className="lg:w-3/4">
                          <h3 id="vehicle-selection-heading" className="block text-sm font-medium text-gray-700 mb-4">
                            Select Your Premium Vehicle <span className="text-red-500">*</span>
                          </h3>
                          
                          {filteredVehicles.length === 0 ? (
                            <div className="text-center py-12">
                              <Car className="mx-auto text-gray-400 mb-4" size={48} />
                              <p className="text-gray-500">No vehicles found matching your criteria.</p>
                              <button
                                onClick={() => {
                                  setSelectedCategory("all");
                                  setSearchTerm("");
                                }}
                                className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Clear filters
                              </button>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredVehicles.map((vehicle) => (
                                <motion.div
                                  key={vehicle.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                    formData.vehicle === vehicle.id
                                      ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10'
                                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                  }`}
                                  onClick={() => handleVehicleSelect(vehicle)}
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-bold text-gray-900 text-lg">{vehicle.name}</h4>
                                      <p className="text-gray-600 text-sm">{vehicle.vehicle_type}</p>
                                    </div>
                                    <input
                                      type="radio"
                                      name="vehicle"
                                      value={vehicle.id}
                                      checked={formData.vehicle === vehicle.id}
                                      onChange={() => handleVehicleSelect(vehicle)}
                                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 mt-1"
                                      required
                                    />
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                      {vehicle.features?.slice(0, 2).map((feature, index) => (
                                        <span key={index} className="block">✓ {feature}</span>
                                      ))}
                                      {vehicle.features && vehicle.features.length > 2 && (
                                        <span className="text-blue-600">+{vehicle.features.length - 2} more</span>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-blue-600">
                                        Rs. {vehicle.price_per_day.toLocaleString()}
                                      </div>
                                      <div className="text-sm text-gray-500">per day</div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.vehicle}
                      whileHover={{ scale: !formData.vehicle ? 1 : 1.02 }}
                      whileTap={{ scale: !formData.vehicle ? 1 : 0.98 }}
                      className={`px-8 py-4 rounded-xl font-semibold shadow-lg transition-all ${
                        formData.vehicle 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25' 
                          : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                      }`}
                      aria-disabled={!formData.vehicle}
                    >
                      Continue to Your Information
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Steps 2, 3, and 4 remain the same as your original code */}
              {/* ... rest of your existing code for steps 2, 3, and 4 ... */}
            </form>
          </motion.div>

          {/* Support Info */}
          {step !== 4 && (
            <footer className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-600 bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-100">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Need help with your car rental booking? Call us at </span>
                <a href="tel:+923125430959" className="text-blue-600 font-semibold hover:underline">
                  +92 312 5430959
                </a>
              </div>
            </footer>
          )}
        </div>
      </main>
    </>
  );
};

export default BookingPage;