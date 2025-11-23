import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Clock, User, MapPin, CreditCard, Check, Upload, Banknote, ArrowLeft, Car, Shield, Phone } from "lucide-react";
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

const BookingPage = () => {
  const { slug } = useParams();
  const [step, setStep] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
      {/* SEO Meta Tags - Add to your main layout or use React Helmet */}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
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
                      <h3 id="vehicle-selection-heading" className="block text-sm font-medium text-gray-700 mb-4">
                        Select Your Premium Vehicle <span className="text-red-500">*</span>
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {vehicles.map((vehicle) => (
                          <div key={vehicle.id} className="flex items-center">
                            <input
                              id={`vehicle-${vehicle.id}`}
                              name="vehicle"
                              type="radio"
                              value={vehicle.id}
                              checked={formData.vehicle === vehicle.id}
                              onChange={() => handleVehicleSelect(vehicle)}
                              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                              required
                              aria-required="true"
                            />
                            <label htmlFor={`vehicle-${vehicle.id}`} className="ml-4 flex justify-between w-full items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                              <div>
                                <span className="block text-lg font-semibold text-gray-900">
                                  {vehicle.name}
                                </span>
                                <span className="block text-sm text-gray-600">
                                  {vehicle.vehicle_type} - Luxury Car Rental
                                </span>
                              </div>
                              <span className="text-lg font-bold text-blue-600">
                                Rs. {vehicle.price_per_day.toLocaleString()}/day
                              </span>
                            </label>
                          </div>
                        ))}
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

              {/* Step 2: Your Information */}
              {step === 2 && (
                <div className="p-8">
                  <header className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <User className="text-blue-600" size={28} aria-hidden="true" />
                      Your Contact Information
                    </h2>
                    <p className="text-gray-600">Provide your details so we can confirm your luxury car rental booking</p>
                  </header>
                  
                  <div className="space-y-8">
                    <section aria-labelledby="personal-info-heading">
                      <h3 id="personal-info-heading" className="sr-only">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-3">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                            required
                            aria-required="true"
                            itemProp="customer_name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="your@email.com"
                            required
                            aria-required="true"
                            itemProp="customer_email"
                          />
                        </div>
                      </div>
                    </section>

                    <section aria-labelledby="contact-heading">
                      <h3 id="contact-heading" className="sr-only">Contact Details</h3>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="+92 312 3456789"
                          required
                          aria-required="true"
                          itemProp="customer_phone"
                        />
                      </div>
                    </section>

                    <section aria-labelledby="special-requests-heading">
                      <h3 id="special-requests-heading" className="block text-sm font-medium text-gray-700 mb-3">
                        Special Requests (Optional)
                      </h3>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Child seats, extra stops, special requirements for your luxury car rental..."
                        aria-describedby="special-requests-description"
                      />
                      <p id="special-requests-description" className="text-sm text-gray-500 mt-2">
                        Let us know any special requirements for your premium vehicle rental in Islamabad
                      </p>
                    </section>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 text-gray-700 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Back to Trip Details
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                    >
                      Continue to Secure Payment
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="p-8">
                  <header className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <CreditCard className="text-blue-600" size={28} aria-hidden="true" />
                      Secure Payment Information
                    </h2>
                    <p className="text-gray-600">Choose your preferred payment method to complete your luxury car rental booking</p>
                  </header>
                  
                  <div className="space-y-8">
                    <section aria-labelledby="payment-method-heading">
                      <h3 id="payment-method-heading" className="block text-sm font-medium text-gray-700 mb-4">
                        Select Payment Method <span className="text-red-500">*</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            id="bank-transfer"
                            name="paymentMethod"
                            type="radio"
                            value="bank-transfer"
                            checked={formData.paymentMethod === "bank-transfer"}
                            onChange={handleChange}
                            className="peer hidden"
                            required
                          />
                          <label
                            htmlFor="bank-transfer"
                            className="block p-6 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-gray-300"
                          >
                            <div className="flex items-center gap-4">
                              <Banknote className="text-gray-600" size={24} aria-hidden="true" />
                              <div>
                                <span className="font-semibold text-gray-900">Bank Transfer</span>
                                <p className="text-sm text-gray-600 mt-1">Secure online banking transfer</p>
                              </div>
                            </div>
                          </label>
                        </div>

                        <div>
                          <input
                            id="cash"
                            name="paymentMethod"
                            type="radio"
                            value="cash"
                            checked={formData.paymentMethod === "cash"}
                            onChange={handleChange}
                            className="peer hidden"
                            required
                          />
                          <label
                            htmlFor="cash"
                            className="block p-6 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-gray-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">$</span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-900">Cash on Delivery</span>
                                <p className="text-sm text-gray-600 mt-1">Pay when you receive the vehicle</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </section>

                    {formData.paymentMethod === "bank-transfer" && (
                      <>
                        <section aria-labelledby="bank-details-heading">
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 id="bank-details-heading" className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                              <Shield className="w-5 h-5" aria-hidden="true" />
                              Secure Bank Transfer Details
                            </h3>
                            <div className="space-y-3 text-sm text-blue-800">
                              <div className="flex justify-between">
                                <span>Bank Name:</span>
                                <span className="font-medium">Habib Bank Limited (HBL)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Account Title:</span>
                                <span className="font-medium">Drive With Style</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Account Number:</span>
                                <span className="font-medium">53307000024155</span>
                              </div>
                              <div className="flex justify-between">
                                <span>IBAN:</span>
                                <span className="font-medium">PK36HABB0012345678901234</span>
                              </div>
                              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                                <p className="text-xs text-blue-700">
                                  Please include your booking reference <strong>{formData.booking_reference}</strong> in the transaction description for faster processing of your car rental booking.
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="transaction-info-heading">
                          <div>
                            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-3">
                              Transaction ID/Reference <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="transactionId"
                              name="transactionId"
                              value={formData.transactionId}
                              onChange={handleChange}
                              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Enter your bank transaction reference number"
                              required
                              aria-required="true"
                            />
                          </div>
                        </section>

                        <section aria-labelledby="payment-proof-heading">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Payment Proof (Screenshot) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              className="hidden"
                              accept="image/*,.pdf"
                              required
                              aria-required="true"
                            />
                            {formData.paymentScreenshot ? (
                              <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                      <Check className="text-green-600" size={20} aria-hidden="true" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        {formData.paymentScreenshot.name}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {(formData.paymentScreenshot.size / 1024).toFixed(2)} KB
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={removeScreenshot}
                                    className="text-red-600 hover:text-red-700 font-medium"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <motion.button
                                type="button"
                                onClick={triggerFileInput}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100"
                              >
                                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                                  <Upload size={32} aria-hidden="true" />
                                  <div>
                                    <span className="font-medium">Click to upload payment screenshot</span>
                                    <p className="text-sm mt-1">JPG, PNG or PDF (Max 5MB)</p>
                                  </div>
                                </div>
                              </motion.button>
                            )}
                          </div>
                        </section>
                      </>
                    )}

                    {/* Booking Summary */}
                    <section aria-labelledby="booking-summary-heading" className="bg-gray-50 rounded-xl p-6">
                      <h3 id="booking-summary-heading" className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vehicle:</span>
                          <span className="font-medium text-gray-900">
                            {selectedVehicle ? `${selectedVehicle.name} (${selectedVehicle.vehicle_type})` : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pickup Date & Time:</span>
                          <span className="font-medium text-gray-900">
                            {formData.pickup_date} at {formData.pickup_time}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Return Date:</span>
                          <span className="font-medium text-gray-900">
                            {formData.return_date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Locations:</span>
                          <span className="font-medium text-gray-900 text-right">
                            {formData.pickupLocation} → {formData.dropoffLocation || "Same"}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 my-3"></div>
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Estimated Total:</span>
                          <span>
                            {selectedVehicle ? `Rs. ${selectedVehicle.price_per_day.toLocaleString()}` : "Select vehicle"}
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 text-gray-700 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      Back to Your Information
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                    >
                      {formData.paymentMethod === "cash" ? "Confirm Car Rental Booking" : "Submit Payment & Complete Booking"}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8"
                  >
                    <Check className="h-10 w-10 text-green-600" aria-hidden="true" />
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {formData.paymentMethod === "cash" ? "Luxury Car Booking Confirmed!" : "Payment Received Successfully!"}
                  </h2>
                  
                  <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    {formData.paymentMethod === "cash" 
                      ? "Your premium vehicle booking has been confirmed. Our representative will contact you shortly to finalize details for your luxury car rental in Islamabad."
                      : "Thank you for your payment. We've received your transaction and will verify it shortly. You'll receive a confirmation for your luxury car rental soon."}
                  </p>
                  
                  {/* Booking Details Card */}
                  <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto text-left mb-8">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Booking Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference:</span>
                        <span className="font-medium text-gray-900">{formData.booking_reference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-medium text-gray-900">
                          {selectedVehicle?.name} ({selectedVehicle?.vehicle_type})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-medium text-gray-900">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup:</span>
                        <span className="font-medium text-gray-900 text-right">
                          {formData.pickup_date} at {formData.pickup_time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      to="/fleet"
                      className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                    >
                      View Our Luxury Fleet
                    </Link>
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                      Back to Homepage
                    </Link>
                  </div>
                </div>
              )}
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