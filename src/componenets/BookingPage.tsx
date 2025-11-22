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
  // const navigate = useNavigate();
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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
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
        "http://127.0.0.1:8000/api/v1/booking/", 
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
          <p className="text-gray-600">Loading vehicles...</p>
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
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Car className="w-4 h-4" />
              <span className="text-sm font-medium">Book Your Ride</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Book Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Premium</span> Vehicle
            </h1>
            <p className="text-xl text-gray-300">
              Complete the form below to reserve your luxury vehicle
            </p>
          </motion.div>
        </div>
      </div>

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
            >
              <ArrowLeft size={16} />
              {step === 1 ? "Back to Fleet" : "Back"}
            </Link>
          </motion.div>
        )}

        {/* Progress Steps */}
        {step < 4 && (
          <div className="mb-12">
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
        )}

        {/* Booking Form */}
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: step > 1 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <MapPin className="text-blue-600" size={28} />
                  Trip Details
                </h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-3">
                        Pickup Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="pickupLocation"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter address or location"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-3">
                        Dropoff Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="dropoffLocation"
                          name="dropoffLocation"
                          value={formData.dropoffLocation}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Same as pickup or different"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="pickup_date" className="block text-sm font-medium text-gray-700 mb-3">
                        Pickup Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="date"
                          id="pickup_date"
                          name="pickup_date"
                          value={formData.pickup_date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pickup_time" className="block text-sm font-medium text-gray-700 mb-3">
                        Pickup Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="time"
                          id="pickup_time"
                          name="pickup_time"
                          value={formData.pickup_time}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-3">
                        Return Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="date"
                          id="return_date"
                          name="return_date"
                          value={formData.return_date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                          min={formData.pickup_date || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Vehicle
                    </label>
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
                          />
                          <label htmlFor={`vehicle-${vehicle.id}`} className="ml-4 flex justify-between w-full items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                            <div>
                              <span className="block text-lg font-semibold text-gray-900">
                                {vehicle.name}
                              </span>
                              <span className="block text-sm text-gray-600">
                                {vehicle.vehicle_type}
                              </span>
                            </div>
                            <span className="text-lg font-bold text-blue-600">
                              Rs. {vehicle.price_per_day.toLocaleString()}/day
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  >
                    Continue to Your Info
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 2: Your Information */}
            {step === 2 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <User className="text-blue-600" size={28} />
                  Your Information
                </h2>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number
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
                    />
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-3">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Child seats, extra stops, special requirements..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 text-gray-700 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                  >
                    Continue to Payment
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <CreditCard className="text-blue-600" size={28} />
                  Payment Information
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Payment Method
                    </label>
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
                        />
                        <label
                          htmlFor="bank-transfer"
                          className="block p-6 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-gray-300"
                        >
                          <div className="flex items-center gap-4">
                            <Banknote className="text-gray-600" size={24} />
                            <div>
                              <span className="font-semibold text-gray-900">Bank Transfer</span>
                              <p className="text-sm text-gray-600 mt-1">Secure online transfer</p>
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
                              <p className="text-sm text-gray-600 mt-1">Pay when you receive</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === "bank-transfer" && (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Bank Account Details
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
                            <span className="font-medium">1234567890123</span>
                          </div>
                          <div className="flex justify-between">
                            <span>IBAN:</span>
                            <span className="font-medium">PK36HABB0012345678901234</span>
                          </div>
                          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                            <p className="text-xs text-blue-700">
                              Please include your booking reference <strong>{formData.booking_reference}</strong> in the transaction description.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-3">
                          Transaction ID/Reference
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter transaction reference number"
                          required={formData.paymentMethod === "bank-transfer"}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Payment Proof (Screenshot)
                        </label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf"
                          required={formData.paymentMethod === "bank-transfer"}
                        />
                        {formData.paymentScreenshot ? (
                          <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                  <Check className="text-green-600" size={20} />
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
                              <Upload size={32} />
                              <div>
                                <span className="font-medium">Click to upload screenshot</span>
                                <p className="text-sm mt-1">JPG, PNG or PDF (Max 5MB)</p>
                              </div>
                            </div>
                          </motion.button>
                        )}
                      </div>
                    </>
                  )}

                  {/* Booking Summary */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
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
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 text-gray-700 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all"
                  >
                    {formData.paymentMethod === "cash" ? "Confirm Booking" : "Submit Payment Proof"}
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
                  <Check className="h-10 w-10 text-green-600" />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {formData.paymentMethod === "cash" ? "Booking Confirmed!" : "Payment Received!"}
                </h2>
                
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                  {formData.paymentMethod === "cash" 
                    ? "Your booking has been confirmed. Our representative will contact you shortly to finalize details."
                    : "Thank you for your payment. We've received your transaction and will verify it shortly."}
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
                    View Our Fleet
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </form>
        </motion.div>

        {/* Support Info */}
        {step !== 4 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-gray-600 bg-white rounded-xl px-6 py-3 shadow-sm border border-gray-100">
              <Phone className="w-4 h-4" />
              <span>Need help? Call us at </span>
              <a href="tel:+923125430959" className="text-blue-600 font-semibold hover:underline">
                +92 312 5430959
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingPage;