import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, User, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // SEO Meta Data
  const seoData = {
    title: "Contact Drive With Style | Luxury Car Rentals Islamabad | 24/7 Support",
    description: "Get in touch with Drive With Style for premium car rentals in Islamabad. Call +92-312-5430959 for 24/7 luxury vehicle bookings, inquiries, and customer support.",
    keywords: "contact drive with style, islamabad car rental contact, luxury car booking islamabad, premium vehicles contact, 24/7 car rental support, chauffeur service contact",
    canonical: "https://drivewithstyles.com/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Drive With Style",
      "description": "Premium Car Rental Service in Islamabad",
      "publisher": {
        "@type": "Organization",
        "name": "Drive With Style",
        "url": "https://drivewithstyles.com",
        "logo": "https://drivewithstyle.up.railway.app/media/vehicles/logo1.jpg",
        "sameAs": [
          "https://facebook.com/drivewithstyle",
          "https://instagram.com/drivewithstyle"
        ]
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Drive With Style",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Block#08 Flate#02, PHA Red Flate",
          "addressLocality": "Islamabad",
          "addressRegion": "Islamabad Capital Territory",
          "postalCode": "46000",
          "addressCountry": "PK"
        },
        "telephone": "+92-312-5430959",
        "email": "DrivewithstyleRAC@gmail.com",
        "openingHours": "Mo-Su 08:00-22:00",
        "areaServed": "Islamabad and surrounding areas",
        "serviceType": "Luxury Car Rentals"
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post("https://drivewithstyle.up.railway.app/api/v1/contact/", formData);
      
      if (response.status === 201) {
        setSubmitStatus({
          success: true,
          message: "Thank you for your message! We'll get back to you soon."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Booking Question" },
    { value: "payment", label: "Payment Issue" },
    { value: "complaint", label: "Complaint" },
    { value: "other", label: "Other" },
  ];

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
        <meta property="og:image" content="https://drivewithstyles.com/contact-og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.canonical} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content="https://drivewithstyles.com/contact-twitter-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white" itemScope itemType="https://schema.org/ContactPage">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Get In Touch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" itemProp="headline">
                Contact <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Our Team</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto" itemProp="description">
                We're here to assist you 24/7. Reach out for luxury car bookings, inquiries, or any assistance with our premium vehicle rentals in Islamabad.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contact Info and Form Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <motion.section
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300"
                itemProp="mainEntity"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                    <a href="tel:+923125430959" className="text-gray-600 hover:text-blue-600 transition-colors text-lg font-medium" itemProp="telephone">
                      +92 312 5430959
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <img src="w.png" alt="WhatsApp" className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <a 
                      href="https://wa.me/923125430959" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 transition-colors text-lg font-medium"
                    >
                      +92 312 5430959
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Quick responses</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                    <a 
                      href="mailto:DrivewithstyleRAC@gmail.com" 
                      className="text-gray-600 hover:text-purple-600 transition-colors text-lg font-medium"
                      itemProp="email"
                    >
                      DrivewithstyleRAC@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Typically respond within 2 hours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Office Address</h4>
                    <p className="text-gray-600 leading-relaxed" itemProp="streetAddress">
                      Block#08 Flate#02, PHA Red Flate, G-10/2 Islamabad
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                      <Clock className="w-4 h-4" />
                      <span itemProp="openingHours">Mon-Sun: 8:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-300"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible for your luxury car rental needs in Islamabad.
                </p>
              </div>
              
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    submitStatus.success 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  <CheckCircle className={`w-5 h-5 ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`} />
                  <span className="font-medium">{submitStatus.message}</span>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6" itemScope itemType="https://schema.org/ContactPoint">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                        <User size={20} />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                        <Phone size={20} />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 text-gray-400">
                      <MessageSquare size={20} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your luxury car rental needs, preferred vehicle type, dates, and any special requirements..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.section>

          {/* Map Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Visit Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Location</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find us easily at our conveniently located office in Islamabad for premium car rental services
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="w-full h-80 md:h-96">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d212559.2251951987!2d73.04080567007671!3d33.65099730644122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x38dfbfecb1d94b4b%3A0xc4fa9cfcc5e12579!2sBlock%2308%20Flate%2302%2C%20PHA%20Red%20Flate%2C%20G-10%2F2%20Islamabad%2C%2046000!3m2!1d33.677075699999996!2d73.0113938!5e0!3m2!1sen!2s!4v1744348520977!5m2!1sen!2s"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Drive with Style Luxury Car Rentals Islamabad Location"
                ></iframe>
              </div>
            </div>
          </motion.section>

          {/* Quick Contact CTA */}
          <motion.section
            className="text-center py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Need Immediate Assistance for Car Rental?
              </h3>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
                Our luxury car rental team is available 24/7 to help you with premium vehicle bookings, inquiries, and VIP support in Islamabad.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:+923125430959"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/923125430959"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg"
                >
                  <img src="w.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Contact;