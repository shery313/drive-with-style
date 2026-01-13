import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Calendar, Clock, User, MapPin, CreditCard, Check, Upload, Banknote, 
  ArrowLeft, Car, Shield, Phone, Search, Filter, ChevronRight, 
  Mail, MessageSquare, Star, CheckCircle, Info, X, Loader2,
  CalendarDays, Navigation, CreditCard as CardIcon, FileText,
  ShieldCheck, Sparkles, BadgeCheck, Receipt,
  Users,
  Fuel
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Helmet } from "react-helmet-async";

interface Vehicle {
  id: number;
  slug: string;
  name: string;
  vehicle_type: string;
  price_per_day: number;
  image: string;
  description: string;
  seats: number;
  fuel_type: string;
  transmission: string;
  rating: number;
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
  termsAccepted: boolean;
}

const VEHICLE_CATEGORIES = [
  { id: "all", name: "All Vehicles", icon: "🚗", color: "from-blue-500 to-cyan-500" },
  { id: "sedan", name: "Sedans", icon: "🚙", color: "from-indigo-500 to-purple-500" },
  { id: "suv", name: "SUVs", icon: "🚗", color: "from-emerald-500 to-green-500" },
  { id: "luxury", name: "Luxury", icon: "⭐", color: "from-amber-500 to-orange-500" },
  { id: "hatchback", name: "Hatchbacks", icon: "🚗", color: "from-pink-500 to-rose-500" },
  { id: "premium", name: "Premium", icon: "✨", color: "from-violet-500 to-purple-500" }
];

const PAYMENT_METHODS = [
  { 
    id: "bank-transfer", 
    name: "Bank Transfer", 
    icon: Banknote,
    description: "Transfer directly to our bank account",
    details: "Account details will be provided"
  },
  { 
    id: "cash", 
    name: "Cash Payment", 
    icon: CreditCard,
    description: "Pay in cash on vehicle delivery",
    details: "Exact change recommended"
  },
  { 
    id: "easypaisa", 
    name: "EasyPaisa/JazzCash", 
    icon: CreditCard,
    description: "Mobile wallet payment",
    details: "Use our registered number"
  }
];

const BookingPage = () => {
  const { slug } = useParams();
  const [step, setStep] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    booking_reference: `DWS${Math.floor(Math.random() * 900000) + 100000}`,
    termsAccepted: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().split('T')[0];

  // Filter vehicles based on category and search
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesCategory = selectedCategory === "all" || 
      vehicle.vehicle_type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      vehicle.name.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesSearch = searchTerm === "" || 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Vehicle counts by category
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

  // Calculate rental duration in days
  const calculateDuration = () => {
    if (!formData.pickup_date || !formData.return_date) return 0;
    const start = new Date(formData.pickup_date);
    const end = new Date(formData.return_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedVehicle) return 0;
    const duration = calculateDuration();
    return selectedVehicle.price_per_day * duration;
  };

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
    "@type": "ReservationService",
    "name": "Premium Car Rental Booking",
    "description": seoData.description,
    "provider": {
      "@type": "Organization",
      "name": "Drive With Style",
      "url": "https://drivewithstyles.com"
    },
    "areaServed": {
      "@type": "City",
      "name": "Islamabad"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://drivewithstyles.com/book"
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get("https://drivewithstyle.up.railway.app/api/v1/fleet/");
        const response = await axios.get("http://127.0.0.1:8000/api/v1/fleet/");
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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size too large. Please upload a file smaller than 5MB.");
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
      }
      setFormData(prev => ({ ...prev, paymentScreenshot: file }));
    }
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData(prev => ({
      ...prev,
      vehicle: vehicle.id
    }));
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
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

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.vehicle && formData.pickupLocation && formData.pickup_date && formData.pickup_time && formData.return_date;
      case 2:
        return formData.fullName && formData.email && formData.phone;
      case 3:
        if (formData.paymentMethod === "bank-transfer") {
          return formData.transactionId && formData.paymentScreenshot && formData.termsAccepted;
        }
        return formData.termsAccepted;
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      
      const formPayload = new FormData();
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'paymentScreenshot' && value) {
          formPayload.append('payment_proof', value);
        } else if (value !== null && value !== undefined) {
          formPayload.append(key, value.toString());
        }
      });
      
      // Append additional required fields
      formPayload.append('customer_name', formData.fullName);
      formPayload.append('customer_email', formData.email);
      formPayload.append('customer_phone', formData.phone);
      formPayload.append('pickup_location', formData.pickupLocation);
      formPayload.append('dropoff_location', formData.dropoffLocation || formData.pickupLocation);
      formPayload.append('total_amount', calculateTotalPrice().toString());
      
      // const response = await axios.post(
      //   "https://drivewithstyle.up.railway.app/api/v1/booking/", 
      //   formPayload,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      // );
      
      console.log("Booking payload:", Object.fromEntries(formPayload));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      nextStep(); // Go to confirmation
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("There was an error submitting your booking. Please try again or contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartNewBooking = () => {
    setFormData({
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
      booking_reference: `DWS${Math.floor(Math.random() * 900000) + 100000}`,
      termsAccepted: false
    });
    setSelectedVehicle(null);
    setStep(1);
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Booking | Drive With Style | Premium Car Rentals</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
              </div>
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-600 mx-auto mb-8"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Premium Vehicles</h2>
            <p className="text-gray-600">Preparing your booking experience...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Error Loading Booking | Drive With Style</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 sm:p-12 max-w-md mx-auto shadow-xl border border-gray-100 text-center">
            <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Booking</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Try Again
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
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
        
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonical} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white" itemScope itemType="https://schema.org/Service">
        {/* Hero Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-20">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5 mb-6 border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide">SECURE BOOKING</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" itemProp="name">
                Reserve Your 
                <span className="block mt-2">
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Premium Vehicle
                  </span>
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed" itemProp="description">
                Complete our secure booking process to reserve your luxury vehicle in Islamabad
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          {/* Back Button */}
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link 
                to={step === 1 ? "/fleet" : "#"} 
                onClick={step > 1 ? prevStep : undefined}
                className="group inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {step === 1 ? "Back to Fleet" : "Back"}
              </Link>
            </motion.div>
          )}

          {/* Progress Steps */}
          {step < 4 && (
            <nav aria-label="Booking progress" className="mb-12">
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -z-10"></div>
                <div 
                  className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 transition-all duration-500"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>

                <div className="flex justify-between relative">
                  {[
                    { number: 1, label: "Trip Details", icon: CalendarDays },
                    { number: 2, label: "Your Information", icon: User },
                    { number: 3, label: "Payment", icon: CreditCard },
                    { number: 4, label: "Confirmation", icon: CheckCircle }
                  ].map((stepInfo) => (
                    <div key={stepInfo.number} className="flex flex-col items-center">
                      <button
                        onClick={() => stepInfo.number < step && setStep(stepInfo.number)}
                        disabled={stepInfo.number > step}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                          stepInfo.number <= step
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25 transform scale-110'
                            : stepInfo.number === step
                            ? 'bg-white border-4 border-blue-600 text-blue-600 shadow-lg'
                            : 'bg-white border-4 border-gray-200 text-gray-400'
                        }`}
                        aria-current={stepInfo.number === step ? 'step' : undefined}
                      >
                        {stepInfo.number < step ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <stepInfo.icon className="w-6 h-6" />
                        )}
                      </button>
                      <span className={`mt-3 text-sm font-medium ${
                        stepInfo.number <= step ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {stepInfo.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          )}

          {/* Main Form Container */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: step > 1 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Trip Details */}
                  {step === 1 && (
                    <div className="p-8">
                      <header className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                          <CalendarDays className="text-blue-600" size={28} />
                          Trip Details
                        </h2>
                        <p className="text-gray-600">Provide your travel information and select your preferred vehicle</p>
                      </header>
                      
                      <div className="space-y-8">
                        {/* Location Section */}
                        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Navigation className="text-blue-600" />
                            Location Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-3">
                                Pickup Location *
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="text"
                                  id="pickupLocation"
                                  name="pickupLocation"
                                  value={formData.pickupLocation}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                                  placeholder="Enter address in Islamabad"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-3">
                                Dropoff Location
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="text"
                                  id="dropoffLocation"
                                  name="dropoffLocation"
                                  value={formData.dropoffLocation}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                                  placeholder="Same as pickup (optional)"
                                />
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Date & Time Section */}
                        <section className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="text-emerald-600" />
                            Date & Time
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <label htmlFor="pickup_date" className="block text-sm font-medium text-gray-700 mb-3">
                                Pickup Date *
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="date"
                                  id="pickup_date"
                                  name="pickup_date"
                                  value={formData.pickup_date}
                                  onChange={handleChange}
                                  min={today}
                                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="pickup_time" className="block text-sm font-medium text-gray-700 mb-3">
                                Pickup Time *
                              </label>
                              <div className="relative">
                                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="time"
                                  id="pickup_time"
                                  name="pickup_time"
                                  value={formData.pickup_time}
                                  onChange={handleChange}
                                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-3">
                                Return Date *
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="date"
                                  id="return_date"
                                  name="return_date"
                                  value={formData.return_date}
                                  onChange={handleChange}
                                  min={formData.pickup_date || today}
                                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* Vehicle Selection Section */}
                        <section className="rounded-2xl border border-gray-200 p-6">
                          <div className="flex flex-col lg:flex-row gap-8">
                            {/* Vehicle Categories Sidebar */}
                            <div className="lg:w-1/4">
                              <div className="sticky top-6 space-y-4">
                                {/* Search */}
                                <div className="relative">
                                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                  <input
                                    type="text"
                                    placeholder="Search vehicles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                  />
                                </div>

                                {/* Categories */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <Filter size={18} />
                                    Vehicle Type
                                  </h4>
                                  {vehicleCounts.map((category) => (
                                    <button
                                      key={category.id}
                                      onClick={() => setSelectedCategory(category.id)}
                                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                                        selectedCategory === category.id
                                          ? 'bg-gradient-to-r border border-transparent text-white shadow-lg'
                                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                                      } ${selectedCategory === category.id ? category.color : ''}`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-xl">{category.icon}</span>
                                        <span className="font-medium">{category.name}</span>
                                      </div>
                                      <span className={`text-sm px-2.5 py-1 rounded-full ${
                                        selectedCategory === category.id
                                          ? 'bg-white/30 text-white'
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
                              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Select Your Vehicle *
                              </h3>
                              
                              <AnimatePresence>
                                {filteredVehicles.length === 0 ? (
                                  <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 bg-gray-50 rounded-2xl"
                                  >
                                    <Car className="mx-auto text-gray-400 mb-4" size={48} />
                                    <p className="text-gray-500 mb-4">No vehicles found matching your criteria.</p>
                                    <button
                                      onClick={() => {
                                        setSelectedCategory("all");
                                        setSearchTerm("");
                                      }}
                                      className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                      Clear all filters
                                    </button>
                                  </motion.div>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredVehicles.map((vehicle) => (
                                      <motion.div
                                        key={vehicle.id}
                                        whileHover={{ scale: 1.02 }}
                                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
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
                                            {vehicle.rating && (
                                              <div className="flex items-center gap-1 mt-1">
                                                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                                <span className="text-sm text-gray-600">{vehicle.rating.toFixed(1)}</span>
                                              </div>
                                            )}
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
                                            <div className="flex items-center gap-2">
                                              <Users className="w-4 h-4" />
                                              <span>{vehicle.seats} Seats</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                              <Fuel className="w-4 h-4" />
                                              <span>{vehicle.fuel_type}</span>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="text-lg font-bold text-blue-600">
                                              Rs. {Math.round(parseInt(vehicle.price_per_day.toLocaleString()))}
                                            </div>
                                            <div className="text-sm text-gray-500">per day</div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </section>
                      </div>

                      <div className="mt-10 pt-8 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!validateStep()}
                          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            validateStep()
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:shadow-blue-500/25 text-white transform hover:scale-[1.02]'
                              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                          }`}
                        >
                          Continue to Your Information
                          <ChevronRight className="inline-block ml-2 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Your Information */}
                  {step === 2 && (
                    <div className="p-8">
                      <header className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                          <User className="text-blue-600" size={28} />
                          Your Information
                        </h2>
                        <p className="text-gray-600">Provide your contact details for the booking</p>
                      </header>
                      
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <User className="text-blue-600" />
                              Personal Details
                            </h3>
                            <div className="space-y-6">
                              <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-3">
                                  Full Name *
                                </label>
                                <div className="relative">
                                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                  <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                                  Phone Number *
                                </label>
                                <div className="relative">
                                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                  <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+92 3XX XXXXXXX"
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                                  Email Address *
                                </label>
                                <div className="relative">
                                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                  <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                              <MessageSquare className="text-emerald-600" />
                              Additional Information
                            </h3>
                            <div>
                              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-3">
                                Special Requests
                              </label>
                              <textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Any special requirements or notes for your booking..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!validateStep()}
                          className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                            validateStep()
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:shadow-blue-500/25 text-white'
                              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                          }`}
                        >
                          Continue to Payment
                          <ChevronRight className="inline-block ml-2 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <div className="p-8">
                      <header className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                          <CreditCard className="text-blue-600" size={28} />
                          Payment Details
                        </h2>
                        <p className="text-gray-600">Complete your booking with secure payment</p>
                      </header>
                      
                      <div className="space-y-8">
                        {/* Selected Vehicle Summary */}
                        {selectedVehicle && (
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                                  <Car className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900">{selectedVehicle.name}</h4>
                                  <p className="text-sm text-gray-600">{selectedVehicle.vehicle_type}</p>
                                </div>
                              </div>
                              <div className="flex flex-col justify-center">
                                <div className="text-sm text-gray-600">Duration</div>
                                <div className="font-bold text-gray-900">{calculateDuration()} days</div>
                              </div>
                              <div className="flex flex-col justify-center">
                                <div className="text-sm text-gray-600">Total Amount</div>
                                <div className="text-2xl font-bold text-blue-600">
                                  Rs. {calculateTotalPrice().toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment Methods */}
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <CardIcon className="text-emerald-600" />
                            Select Payment Method
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {PAYMENT_METHODS.map((method) => (
                              <label
                                key={method.id}
                                className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                                  formData.paymentMethod === method.id
                                    ? 'border-blue-500 bg-white shadow-lg shadow-blue-500/10'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    formData.paymentMethod === method.id
                                      ? 'bg-blue-100 text-blue-600'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <method.icon className="w-6 h-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-bold text-gray-900">{method.name}</span>
                                      <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={formData.paymentMethod === method.id}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-blue-600"
                                      />
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                                    <p className="text-xs text-gray-500">{method.details}</p>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>

                          {/* Transaction Details */}
                          {formData.paymentMethod === "bank-transfer" && (
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Receipt className="text-blue-600" />
                                Transaction Details
                              </h4>
                              <div className="space-y-4">
                                <div>
                                  <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Transaction ID / Reference Number *
                                  </label>
                                  <input
                                    type="text"
                                    id="transactionId"
                                    name="transactionId"
                                    value={formData.transactionId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your transaction ID"
                                    required={formData.paymentMethod === "bank-transfer"}
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Proof (Screenshot) *
                                  </label>
                                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors">
                                    <input
                                      type="file"
                                      ref={fileInputRef}
                                      onChange={handleFileChange}
                                      accept="image/*"
                                      className="hidden"
                                    />
                                    
                                    {formData.paymentScreenshot ? (
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <FileText className="w-8 h-8 text-blue-600" />
                                          <div>
                                            <p className="font-medium text-gray-900">{formData.paymentScreenshot.name}</p>
                                            <p className="text-sm text-gray-500">
                                              {(formData.paymentScreenshot.size / 1024).toFixed(2)} KB
                                            </p>
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={removeScreenshot}
                                          className="text-red-600 hover:text-red-700"
                                        >
                                          <X className="w-5 h-5" />
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-2">Upload payment screenshot</p>
                                        <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 5MB</p>
                                        <button
                                          type="button"
                                          onClick={triggerFileInput}
                                          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                          Choose File
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <input
                                type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                                required
                                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor="termsAccepted" className="font-medium text-gray-900 cursor-pointer">
                                I agree to the Terms & Conditions and Privacy Policy *
                              </label>
                              <p className="text-sm text-gray-600 mt-2">
                                By proceeding, you confirm that all provided information is accurate and you agree to our booking policies and cancellation terms.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!validateStep() || submitting}
                          className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                            validateStep() && !submitting
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl hover:shadow-blue-500/25 text-white'
                              : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                          }`}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Complete Booking
                              <Check className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Right Column - Summary & Support */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Receipt className="text-blue-600" />
                  Booking Summary
                </h3>
                
                {selectedVehicle ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Car className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{selectedVehicle.name}</h4>
                        <p className="text-sm text-gray-600">{selectedVehicle.vehicle_type}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Rate</span>
                        <span className="font-medium">Rs. {selectedVehicle.price_per_day.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rental Duration</span>
                        <span className="font-medium">{calculateDuration()} days</span>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                          <span className="text-2xl font-bold text-blue-600">
                            Rs. {calculateTotalPrice().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Select a vehicle to see summary</p>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Secure SSL Encrypted Booking</span>
                  </div>
                </div>
              </motion.div>

              {/* Support Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Need Assistance?</h4>
                    <p className="text-blue-100 text-sm">Our team is here to help</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+923125430959"
                    className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">+92 312 5430959</div>
                      <div className="text-sm text-blue-200">Call us directly</div>
                    </div>
                  </a>

                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <div>
                      <div className="font-semibold">Send Message</div>
                      <div className="text-sm text-blue-200">Get instant support</div>
                    </div>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Your data is 100% secure</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Support Footer */}
          {step !== 4 && (
            <footer className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 text-gray-600 bg-white rounded-2xl px-8 py-4 shadow-sm border border-gray-100">
                <Info className="w-5 h-5 text-blue-600" />
                <span>Need help with your booking? Call us at</span>
                <a href="tel:+923125430959" className="text-blue-600 font-semibold hover:underline">
                  +92 312 5430959
                </a>
              </div>
            </footer>
          )}
        </div>

        {/* Step 4: Confirmation */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                  <p className="text-emerald-100">Your premium vehicle has been successfully reserved</p>
                </div>

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-4">
                      <BadgeCheck className="w-4 h-4" />
                      <span className="font-semibold">BOOKING REFERENCE</span>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{formData.booking_reference}</div>
                    <p className="text-gray-600">Save this number for your records</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">Booking Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-medium">{selectedVehicle?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup Date:</span>
                        <span className="font-medium">{formData.pickup_date} at {formData.pickup_time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup Location:</span>
                        <span className="font-medium">{formData.pickupLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-blue-600">Rs. {calculateTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Confirmation email sent to {formData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Our team will contact you within 30 minutes</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>24/7 customer support available</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleStartNewBooking}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      Book Another Vehicle
                    </button>
                    <Link
                      to="/"
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold text-center hover:bg-gray-50 transition-all duration-300"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default BookingPage;