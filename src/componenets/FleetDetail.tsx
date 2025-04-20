import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Fuel, Users, Settings, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Reuse the Car type and data from your fleet page
type Car = {
  id: number;
  name: string;
  type: "Hatchback" | "Sedan" | "SUV" | "Luxury";
  image: string;
  description: string;
  pricePerDay: string;
  features: {
    seats: number;
    fuelType: string;
    transmission: string;
    rating: number;
  };
};

const cars: Car[] = [
  // Hatchbacks
  {
    id: 1,
    name: "Suzuki Alto VXL",
    type: "Hatchback",
    image: "/altovxl.jpg",
    description: "Compact automatic hatchback perfect for city driving with great fuel efficiency.",
    pricePerDay: "Rs. 4,500/day",
    features: {
      seats: 4,
      fuelType: "Petrol",
      transmission: "Automatic",
      rating: 4.2
    }
  },
  // ... (rest of your car data)
];

const FleetDetail = () => {
  const { carName } = useParams<{ carName: string }>();
  const decodedCarName = carName ? decodeURIComponent(carName) : '';
  const car = cars.find(c => c.name === decodedCarName);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The vehicle you're looking for doesn't exist or may have been removed.
          </p>
          <Link 
            to="/fleet" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Link 
            to="/fleet" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Fleet
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
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-96 object-cover"
                loading="eager"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/* Placeholder for additional images - you can add more images to your car data if needed */}
              <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow h-24">
                <img src={car.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow h-24">
                <img src={car.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow h-24">
                <img src={car.image} alt="" className="w-full h-full object-cover" />
              </div>
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
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2">
                  {car.type}
                </span>
                <h1 className="text-3xl font-bold">{car.name}</h1>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={20} fill="currentColor" />
                <span className="font-medium">{car.features.rating}</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300">{car.description}</p>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Users size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium">{car.features.seats} Seats</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Fuel size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium">{car.features.fuelType}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Settings size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium">{car.features.transmission}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Climate control
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Bluetooth connectivity
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Navigation system
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Keyless entry
                </li>
                {car.type === "Luxury" || car.type === "SUV" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span> Leather seats
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span> Sunroof
                    </li>
                  </>
                ) : null}
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> 24/7 roadside assistance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> Airbags
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{car.pricePerDay}</p>
                </div>
                <Link to={`/book?car=${encodeURIComponent(car.name)}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                </Link>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Included in your rental:</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Unlimited mileage</li>
                  <li>• Comprehensive insurance</li>
                  <li>• 24/7 customer support</li>
                  <li>• Free cancellation up to 24 hours before pickup</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FleetDetail;