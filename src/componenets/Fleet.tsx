import { useState } from "react";
import { motion } from "framer-motion";

type Car = {
  id: number;
  name: string;
  type: "SUV" | "Sedan" | "Luxury" | "Economy";
  image: string;
  description: string;
  pricePerDay: string;
};

const cars: Car[] = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    type: "Luxury",
    image: "car1.jpg",
    description: "Premium class luxury for VIP experience.",
    pricePerDay: "Rs. 25,000/day",
  },
  {
    id: 2,
    name: "Toyota Land Cruiser",
    type: "SUV",
    image: "car2.jpg",
    description: "A tough yet comfortable SUV for any terrain.",
    pricePerDay: "Rs. 18,500/day",
  },
  {
    id: 3,
    name: "Honda Civic 2024",
    type: "Sedan",
    image: "car3.jpg",
    description: "Stylish sedan for business and casual trips.",
    pricePerDay: "Rs. 9,500/day",
  },
  {
    id: 4,
    name: "Suzuki Alto",
    type: "Economy",
    image: "car4.jpg",
    description: "Budget-friendly daily commuter.",
    pricePerDay: "Rs. 4,500/day",
  },
  {
    id: 5,
    name: "KIA Sportage",
    type: "SUV",
    image: "car2.jpg",
    description: "Modern SUV with comfort and style.",
    pricePerDay: "Rs. 11,500/day",
  },
];

const categories = ["All", "SUV", "Sedan", "Luxury", "Economy"] as const;
type Category = (typeof categories)[number];

const Fleet = () => {
  const [selected, setSelected] = useState<Category>("All");

  const filteredCars =
    selected === "All" ? cars : cars.filter((car) => car.type === selected);

  return (
    <section className="min-h-screen px-6 md:px-20 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Explore Our Fleet</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Choose the perfect ride for your journey
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full border transition ${
              selected === category
                ? "bg-blue-600 text-white"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <motion.div
            key={car.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {car.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-semibold">
                  {car.pricePerDay}
                </span>
                <button className="text-sm px-3 py-1 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No cars found in this category.
        </p>
      )}
    </section>
  );
};

export default Fleet;
