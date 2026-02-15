import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Fuel, Users, Settings, Star, ArrowLeft, Shield, MapPin, Clock, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../constant";

// Car type based on your API response
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

const FleetDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URL}/api/v1/fleet/${slug}/`);
        setCar(response.data);
        setError(null);
      } catch (err) {
        setError("Vehicle not found or may have been removed.");
        console.error("Error fetching car details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCarDetail();
    }
  }, [slug]);

  // Generate SEO data based on car
  const generateSeoData = (car: CarType) => {
    const baseUrl = "https://drivewithstyles.com";
    return {
      title: `Rent ${car.name} in Islamabad | ${car.vehicle_type} Rental | Drive With Style`,
      description: `${car.description.substring(0, 155)}... Book now for Rs. ${car.price_per_day}/day.`,
      keywords: `${car.name} rental Islamabad, ${car.vehicle_type.toLowerCase()} car rental, ${car.fuel_type} vehicle Islamabad, ${car.transmission} transmission car`,
      canonical: `${baseUrl}/fleet/${car.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Car",
        "name": car.name,
        "description": car.description,
        "image": car.image,
        "vehicleType": car.vehicle_type,
        "brand": {
          "@type": "Brand",
          "name": car.name.split(' ')[0]
        },
        "seatingCapacity": car.seats,
        "fuelType": car.fuel_type,
        "vehicleTransmission": car.transmission,
        "offers": {
          "@type": "Offer",
          "price": car.price_per_day.replace('Rs. ', '').replace('/day', ''),
          "priceCurrency": "PKR",
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/fleet/${car.slug}`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": car.rating.toString(),
          "bestRating": "5",
          "ratingCount": "25"
        }
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-4">Loading Vehicle Details</h1>
          <p className="text-gray-600">Getting the best car for your journey...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Car className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "The vehicle you're looking for doesn't exist or may have been removed."}
          </p>
          <Link 
            to="/fleet" 
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
          >
            <ArrowLeft size={16} />
            Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  const seoData = generateSeoData(car);
  const additionalImages = [car.image, car.image, car.image]; // Replace with actual additional images from API if available

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={car.image} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={car.image} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      </Helmet>

      <section className="min-h-screen bg-gray-50 text-gray-800" itemScope itemType="https://schema.org/Car">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-blue-600 hover:underline">Home</Link>
              <span className="text-gray-400">/</span>
              <Link to="/fleet" className="text-blue-600 hover:underline">Our Fleet</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600" itemProp="name">{car.name}</span>
            </div>
          </div>
        </motion.nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Link 
              to="/fleet" 
              className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
            >
              <ArrowLeft size={16} />
              Back to All Vehicles
            </Link>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="rounded-xl overflow-hidden bg-white shadow-lg">
                <img
                  src={car.image}
                  alt={`${car.name} - ${car.vehicle_type} available for rent in Islamabad`}
                  className="w-full h-96 object-cover"
                  loading="eager"
                  itemProp="image"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {additionalImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg overflow-hidden bg-white shadow h-24 cursor-pointer border-2 ${
                      currentImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${car.name} view ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                    car.vehicle_type === "Luxury" 
                      ? "bg-purple-100 text-purple-800" 
                      : car.vehicle_type === "SUV"
                      ? "bg-green-100 text-green-800"
                      : car.vehicle_type === "Sedan"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}>
                    {car.vehicle_type}
                  </span>
                  <h1 className="text-3xl font-bold" itemProp="name">{car.name}</h1>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={20} fill="currentColor" />
                  <span className="font-medium" itemProp="aggregateRating">{car.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-lg text-gray-600" itemProp="description">
                {car.description}
              </p>

              {/* Key Specifications */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
                  <Users size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm font-medium" itemProp="seatingCapacity">{car.seats} Seats</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
                  <Fuel size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm font-medium" itemProp="fuelType">{car.fuel_type}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow">
                  <Settings size={24} className="text-blue-600 mb-2" />
                  <span className="text-sm font-medium" itemProp="vehicleTransmission">{car.transmission}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-white rounded-lg p-6 shadow">
                <h2 className="text-xl font-semibold mb-4">Vehicle Specifications</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Seating Capacity:</span>
                    <span className="ml-2">{car.seats} persons</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Fuel Type:</span>
                    <span className="ml-2">{car.fuel_type}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Transmission:</span>
                    <span className="ml-2">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Luggage Capacity:</span>
                    <span className="ml-2">{car.luggage_capacity} bags</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Air Conditioning:</span>
                    <span className="ml-2">{car.air_conditioning ? "Climate Control" : "Manual AC"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">Insurance:</span>
                    <span className="ml-2">{car.insurance_coverage ? "Comprehensive Coverage" : "Basic Coverage"}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Premium Features & Amenities</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    {car.air_conditioning ? "Climate Control AC" : "Air Conditioning"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Bluetooth Connectivity
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Music System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Power Windows
                  </li>
                  {car.vehicle_type === "Luxury" || car.vehicle_type === "SUV" ? (
                    <>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Leather Seats
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        Premium Audio System
                      </li>
                    </>
                  ) : null}
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    24/7 Roadside Assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Safety Features & Airbags
                  </li>
                </ul>
              </div>

              {/* Pricing & Booking */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600" itemProp="offers">
                      Rs. {car.price_per_day}<span className="text-sm font-normal text-gray-500">/day</span>
                    </p>
                  </div>
                  <Link to={`/book?car=${car.slug}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl transform hover:scale-105">
                      Book This Vehicle
                    </button>
                  </Link>
                </div>

                {/* Included Features */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Shield size={18} />
                    Everything Included in Your Rental:
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      Unlimited mileage throughout Pakistan
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      {car.insurance_coverage ? "Comprehensive insurance" : "Basic insurance coverage"}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      24/7 customer support & roadside assistance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      Free cancellation up to 24 hours before pickup
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} />
                      Regular maintenance & safety checks
                    </li>
                  </ul>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <Zap size={20} className="text-green-500 mb-1" />
                    <span className="text-xs text-gray-600">Instant Booking</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <MapPin size={20} className="text-red-500 mb-1" />
                    <span className="text-xs text-gray-600">Islamabad Delivery</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <Clock size={20} className="text-purple-500 mb-1" />
                    <span className="text-xs text-gray-600">24/7 Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section for SEO */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">What documents do I need to rent this {car.name}?</h3>
                <p className="text-gray-600">You'll need a valid driver's license, CNIC, and a security deposit. International renters require a valid passport and international driving permit.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Is there a mileage limit for this rental?</h3>
                <p className="text-gray-600">No, all our rentals include unlimited mileage so you can explore Pakistan without restrictions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Can I get the car delivered to my location in Islamabad?</h3>
                <p className="text-gray-600">Yes, we offer free delivery to most locations in Islamabad. Contact us for specific delivery arrangements.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What is the fuel policy for this {car.name} rental?</h3>
                <p className="text-gray-600">The vehicle comes with a full tank and should be returned with a full tank. We provide the nearest fuel station locations for your convenience.</p>
              </div>
            </div>
          </motion.section>
        </div>
      </section>
    </>
  );
};

export default FleetDetail;