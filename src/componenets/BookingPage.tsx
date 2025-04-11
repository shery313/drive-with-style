import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, MapPin, CreditCard, Check } from "lucide-react";
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
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const carTypes = [
    { id: "sedan", name: "Luxury Sedan (Mercedes E-Class)", price: "$120/day" },
    { id: "suv", name: "Premium SUV (Range Rover)", price: "$180/day" },
    { id: "s-class", name: "Executive (Mercedes S-Class)", price: "$250/day" },
    { id: "limo", name: "Limousine", price: "$350/day" },
  ];

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log("Form submitted:", formData);
    nextStep();
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Booking Header */}
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Book Your Premium Ride
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete the form below to reserve your luxury vehicle
          </p>
        </header>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-600 dark:bg-blue-500 -z-10 transition-all duration-300"
              style={{ width: `${(step - 1) * 33.33}%` }}
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
                  {stepNumber === 2 && 'Your Information'}
                  {stepNumber === 3 && 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>

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
                          placeholder="Enter address or airport"
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
                          placeholder="Enter address or airport"
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
                        <input
                          type="time"
                          id="pickupTime"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                        />
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
                      placeholder="+1 (555) 123-4567"
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
                          id="credit-card"
                          name="paymentMethod"
                          type="radio"
                          value="credit-card"
                          checked={formData.paymentMethod === "credit-card"}
                          onChange={handleChange}
                          className="peer hidden"
                        />
                        <label
                          htmlFor="credit-card"
                          className="block p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:peer-checked:border-blue-400 dark:peer-checked:ring-blue-400"
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="text-gray-500 dark:text-gray-400" size={20} />
                            <span className="font-medium">Credit Card</span>
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

                  {formData.paymentMethod === "credit-card" && (
                    <>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="1234 5678 9012 3456"
                          required={formData.paymentMethod === "credit-card"}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="MM/YY"
                            required={formData.paymentMethod === "credit-card"}
                          />
                        </div>

                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="123"
                            required={formData.paymentMethod === "credit-card"}
                          />
                        </div>
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
                        <span>Pickup:</span>
                        <span className="font-medium">
                          {formData.pickupDate ? `${formData.pickupDate} at ${formData.pickupTime}` : "Not specified"}
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
                        <span>$250.00</span>
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
                    Confirm Booking
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
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  Thank you for your booking. We've sent a confirmation to <span className="font-medium">{formData.email}</span>. Your chauffeur will contact you before pickup.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-w-md mx-auto text-left mb-8">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Booking Reference: #DW2023-4567</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-medium">
                        {carTypes.find(car => car.id === formData.carType)?.name || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pickup:</span>
                      <span className="font-medium">
                        {formData.pickupDate ? `${formData.pickupDate} at ${formData.pickupTime}` : "Not specified"}
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
            <p>Need help? Call our support team at <a href="tel:+923125430959" className="text-blue-600 dark:text-blue-400 hover:underline">(123) 456-7890</a></p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingPage;