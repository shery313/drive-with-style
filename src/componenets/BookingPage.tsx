import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, MapPin, CreditCard, Check, Upload, Banknote, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    carType: "",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "bank-transfer",
    transactionId: "",
    paymentScreenshot: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const carTypes = [
    { id: "hatchback", name: "Hatchback (Suzuki Alto)", price: "Rs. 4,500/day" },
    { id: "sedan", name: "Sedan (Toyota Yaris)", price: "Rs. 7,000/day" },
    { id: "suv", name: "SUV (Hyundai Tucson)", price: "Rs. 15,000/day" },
    { id: "luxury", name: "Luxury (Toyota Land Cruiser)", price: "Rs. 26,000/day" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentScreenshot: e.target.files![0] }));
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    nextStep();
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft size={16} />
              {step === 1 ? "Back to Fleet" : "Back"}
            </Link>
          </motion.div>
        )}

        {/* Booking Header */}
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Book Your Vehicle
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete the form below to reserve your vehicle
          </p>
        </header>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="mb-12">
            <div className="flex justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-600 dark:bg-blue-500 -z-10 transition-all duration-300"
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>

              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <button
                    onClick={() => stepNumber < step && setStep(stepNumber)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${stepNumber <= step ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-400 dark:bg-gray-600'} transition-colors`}
                    disabled={stepNumber > step}
                    aria-label={`Go to step ${stepNumber}`}
                  >
                    {stepNumber < step ? <Check size={18} /> : stepNumber}
                  </button>
                  <span className={`mt-2 text-sm font-medium ${stepNumber <= step ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
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
          exit={{ opacity: 0, x: step > 1 ? -50 : 50 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                  Trip Details
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pickup Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="pickupLocation"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter address or location"
                          required
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Dropoff Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="dropoffLocation"
                          name="dropoffLocation"
                          value={formData.dropoffLocation}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Same as pickup or different"
                          required
                        />
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pickup Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="pickupDate"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pickup Time
                      </label>
                      <div className="relative">
                        <select
                          id="pickupTime"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
                          required
                        >
                          <option value="">Select time</option>
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = i % 12 || 12;
                            const ampm = i < 12 ? 'AM' : 'PM';
                            const time = `${hour}:00 ${ampm}`;
                            return (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            );
                          })}
                        </select>
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="carType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Vehicle Type
                    </label>
                    <div className="space-y-3">
                      {carTypes.map((car) => (
                        <div key={car.id} className="flex items-center">
                          <input
                            id={`car-${car.id}`}
                            name="carType"
                            type="radio"
                            value={car.id}
                            checked={formData.carType === car.id}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            required
                          />
                          <label htmlFor={`car-${car.id}`} className="ml-3 flex justify-between w-full">
                            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {car.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {car.price}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Your Information */}
            {step === 2 && (
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <User className="text-blue-600 dark:text-blue-400" size={24} />
                  Your Information
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="+92 312 3456789"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Child seats, extra stops, etc."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CreditCard className="text-blue-600 dark:text-blue-400" size={24} />
                  Payment Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
                          className="block p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:peer-checked:border-blue-400 dark:peer-checked:ring-blue-400"
                        >
                          <div className="flex items-center gap-3">
                            <Banknote className="text-gray-500 dark:text-gray-400" size={20} />
                            <span className="font-medium">Bank Transfer</span>
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
                          className="block p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:peer-checked:border-blue-400 dark:peer-checked:ring-blue-400"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span className="font-medium">Cash on Delivery</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === "bank-transfer" && (
                    <>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Bank Account Details</h3>
                        <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                          <p><strong>Bank Name:</strong> Habib Bank Limited (HBL)</p>
                          <p><strong>Account Title:</strong> Your Company Name</p>
                          <p><strong>Account Number:</strong> 1234567890123</p>
                          <p><strong>IBAN:</strong> PK36HABB0012345678901234</p>
                          <p className="mt-2 text-xs">Please include your booking reference in the transaction description.</p>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Transaction ID/Reference
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter transaction reference number"
                          required={formData.paymentMethod === "bank-transfer"}
                        />
                      </div>

                      <div>
                        <label htmlFor="paymentScreenshot" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Payment Proof (Screenshot)
                        </label>
                        <input
                          type="file"
                          id="paymentScreenshot"
                          name="paymentScreenshot"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf"
                          required={formData.paymentMethod === "bank-transfer"}
                        />
                        {formData.paymentScreenshot ? (
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                                  <Upload className="text-gray-500 dark:text-gray-400" size={20} />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-700 dark:text-gray-300">
                                    {formData.paymentScreenshot.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {(formData.paymentScreenshot.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={removeScreenshot}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={triggerFileInput}
                            className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                              <Upload size={24} />
                              <span className="font-medium">Click to upload screenshot</span>
                              <span className="text-xs">JPG, PNG or PDF (Max 5MB)</span>
                            </div>
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Vehicle:</span>
                        <span className="font-medium">
                          {carTypes.find(car => car.id === formData.carType)?.name || "Not selected"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pickup Date:</span>
                        <span className="font-medium">
                          {formData.pickupDate || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pickup Time:</span>
                        <span className="font-medium">
                          {formData.pickupTime || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span className="font-medium">
                          {formData.pickupLocation || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span className="font-medium">
                          {formData.dropoffLocation || "Not specified"}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                      <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                        <span>Estimated Total:</span>
                        <span>
                          {formData.carType === "hatchback" ? "Rs. 4,500" :
                           formData.carType === "sedan" ? "Rs. 7,000" :
                           formData.carType === "suv" ? "Rs. 15,000" :
                           formData.carType === "luxury" ? "Rs. 26,000" : "Select vehicle"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {formData.paymentMethod === "cash" ? "Confirm Booking" : "Submit Payment Proof"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="p-6 sm:p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {formData.paymentMethod === "cash" ? "Booking Confirmed!" : "Payment Received!"}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  {formData.paymentMethod === "cash" 
                    ? "Your booking has been confirmed. Our representative will contact you shortly to finalize details."
                    : "Thank you for your payment. We've received your transaction and will verify it shortly. You'll receive a confirmation email once processed."}
                </p>
                
                {formData.paymentMethod === "bank-transfer" && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-w-md mx-auto text-left mb-6">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Details</h3>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Transaction ID:</span>
                        <span className="font-medium">{formData.transactionId || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium">Bank Transfer</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-w-md mx-auto text-left mb-8">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Booking Reference: #PK{Math.floor(Math.random() * 9000) + 1000}</h3>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-medium">
                        {carTypes.find(car => car.id === formData.carType)?.name || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup Date:</span>
                      <span className="font-medium">
                        {formData.pickupDate || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup Time:</span>
                      <span className="font-medium">
                        {formData.pickupTime || "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer:</span>
                      <span className="font-medium">
                        {formData.fullName || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/fleet"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Our Fleet
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Need help? Call our support team at <a href="tel:+923125430959" className="text-blue-600 dark:text-blue-400 hover:underline">+92 312 5430959</a></p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingPage;