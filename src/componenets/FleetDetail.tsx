import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Car,
  CheckCircle,
  Clock,
  Fuel,
  MapPin,
  Settings,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { SERVER_URL } from "../constant";

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
  gallery_images: {
    id: number;
    image: string;
    alt_text: string;
    caption: string;
    sort_order: number;
  }[];
};

const getVehicleTone = (vehicleType: CarType["vehicle_type"]) => {
  switch (vehicleType) {
    case "Luxury":
      return "border-amber-300/20 bg-amber-300/10 text-amber-100";
    case "SUV":
      return "border-emerald-300/20 bg-emerald-300/10 text-emerald-100";
    case "Sedan":
      return "border-sky-300/20 bg-sky-300/10 text-sky-100";
    default:
      return "border-orange-300/20 bg-orange-300/10 text-orange-100";
  }
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
        console.error("Error fetching car details:", err);
        setError("Vehicle not found or may have been removed.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCarDetail();
    }
  }, [slug]);

  const generateSeoData = (vehicle: CarType) => {
    const baseUrl = "https://drivewithstyles.com";
    const currentYear = new Date().getFullYear();

    return {
      title: `Rent ${vehicle.name} in Islamabad | ${vehicle.vehicle_type} Rental | Drive With Style`,
      description: `${vehicle.description.substring(0, 155)}... Book now for Rs. ${vehicle.price_per_day}/day.`,
      keywords: `${vehicle.name} rental Islamabad, ${vehicle.vehicle_type.toLowerCase()} car rental, ${vehicle.fuel_type} vehicle Islamabad, ${vehicle.transmission} transmission car`,
      canonical: `${baseUrl}/fleet/${vehicle.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Car",
        name: vehicle.name,
        description: vehicle.description,
        image: vehicle.image,
        vehicleType: vehicle.vehicle_type,
        brand: {
          "@type": "Brand",
          name: vehicle.name.split(" ")[0],
        },
        seatingCapacity: vehicle.seats,
        fuelType: vehicle.fuel_type,
        vehicleTransmission: vehicle.transmission,
        offers: {
          "@type": "Offer",
          price: vehicle.price_per_day,
          priceCurrency: "PKR",
          priceValidUntil: `${currentYear}-12-31`,
          availability: "https://schema.org/InStock",
          url: `${baseUrl}/fleet/${vehicle.slug}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vehicle.rating.toString(),
          bestRating: "5",
          ratingCount: "25",
        },
      },
    };
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Vehicle Details | Drive With Style</title>
          <meta
            name="description"
            content="Loading premium vehicle details from Drive With Style."
          />
        </Helmet>
        <section className="dws-page min-h-screen px-4 py-24 text-slate-100 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-center">
            <div className="dws-glass rounded-[32px] px-10 py-12 text-center">
              <div className="mx-auto h-20 w-20 animate-spin rounded-full border-2 border-white/12 border-t-amber-300" />
              <h1 className="mt-8 text-3xl font-semibold text-white">Loading vehicle details</h1>
              <p className="mt-3 text-sm text-slate-400">
                Preparing specs, pricing, and booking information for your selected car.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error || !car) {
    return (
      <>
        <Helmet>
          <title>Vehicle Not Found | Drive With Style</title>
          <meta
            name="description"
            content="The requested vehicle could not be found in the Drive With Style fleet."
          />
        </Helmet>
        <section className="dws-page min-h-screen px-4 py-24 text-slate-100 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-center">
            <div className="dws-glass rounded-[32px] px-10 py-12 text-center">
              <Car className="mx-auto h-20 w-20 text-slate-500" />
              <h1 className="mt-8 text-3xl font-semibold text-white">Vehicle not found</h1>
              <p className="mt-3 text-sm text-slate-400">
                {error || "The selected vehicle may have been removed or is temporarily unavailable."}
              </p>
              <Link to="/fleet" className="dws-button-primary mt-8 px-6 py-4 text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to fleet
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const seoData = generateSeoData(car);
  const galleryImages = [
    {
      id: 0,
      image: car.image,
      alt_text: `${car.name} cover image`,
      caption: "Cover",
    },
    ...(car.gallery_images || []),
  ];
  const displayedImage = galleryImages[currentImage]?.image || car.image;
  const displayedAlt = galleryImages[currentImage]?.alt_text || `${car.name} available for rent in Islamabad`;
  const vehicleTone = getVehicleTone(car.vehicle_type);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={car.image} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={car.image} />
        <script type="application/ld+json">{JSON.stringify(seoData.structuredData)}</script>
      </Helmet>

      <main className="dws-page min-h-screen text-slate-100" itemScope itemType="https://schema.org/Car">
        <section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 text-sm text-slate-400">
            <Link to="/" className="transition hover:text-amber-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/fleet" className="transition hover:text-amber-200">
              Fleet
            </Link>
            <span>/</span>
            <span className="text-slate-200" itemProp="name">
              {car.name}
            </span>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all vehicles
              </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="space-y-5"
              >
                <div className="dws-glass overflow-hidden rounded-[34px] p-4">
                  <div className="overflow-hidden rounded-[28px]">
                    <img
                      src={displayedImage}
                      alt={displayedAlt}
                      className="h-[460px] w-full object-cover"
                      loading="eager"
                      itemProp="image"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {galleryImages.map((galleryImage, index) => (
                    <button
                      key={`${car.slug}-${galleryImage.id}-${index}`}
                      type="button"
                      onClick={() => setCurrentImage(index)}
                      className={`overflow-hidden rounded-[22px] border p-2 transition ${
                        currentImage === index
                          ? "border-amber-300/28 bg-amber-300/10"
                          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                      }`}
                      aria-label={`View ${galleryImage.alt_text || `${car.name} image ${index + 1}`}`}
                    >
                      <img
                        src={galleryImage.image}
                        alt={galleryImage.alt_text || `${car.name} preview ${index + 1}`}
                        className="h-24 w-full rounded-[18px] object-cover"
                      />
                      {galleryImage.caption && (
                        <span className="mt-2 block truncate text-xs font-medium text-slate-500">
                          {galleryImage.caption}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="space-y-6"
              >
                <div className="dws-glass rounded-[34px] p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${vehicleTone}`}>
                        <Sparkles className="h-4 w-4" />
                        {car.vehicle_type}
                      </div>
                      <h1 className="mt-5 text-4xl font-semibold text-white">{car.name}</h1>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-amber-200">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{car.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-8 text-slate-300" itemProp="description">
                    {car.description}
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[
                      { icon: Users, label: `${car.seats} Seats`, value: car.seats },
                      { icon: Fuel, label: car.fuel_type, value: car.fuel_type },
                      { icon: Settings, label: car.transmission, value: car.transmission },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-center"
                      >
                        <item.icon className="mx-auto h-5 w-5 text-sky-200" />
                        <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dws-glass rounded-[34px] p-8">
                  <h2 className="text-2xl font-semibold text-white">Vehicle specifications</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Seating capacity", value: `${car.seats} persons` },
                      { label: "Fuel type", value: car.fuel_type },
                      { label: "Transmission", value: car.transmission },
                      { label: "Luggage capacity", value: `${car.luggage_capacity} bags` },
                      {
                        label: "Air conditioning",
                        value: car.air_conditioning ? "Climate control" : "Manual AC",
                      },
                      {
                        label: "Insurance",
                        value: car.insurance_coverage
                          ? "Comprehensive coverage"
                          : "Basic coverage",
                      },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
                      >
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{spec.label}</p>
                        <p className="mt-2 text-base font-medium text-slate-100">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dws-glass rounded-[34px] p-8">
                  <h2 className="text-2xl font-semibold text-white">Included with your rental</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      car.air_conditioning ? "Climate control AC" : "Air conditioning",
                      "Bluetooth connectivity",
                      "Music system",
                      "Power windows",
                      "24/7 roadside assistance",
                      "Safety features and airbags",
                      car.vehicle_type === "Luxury" || car.vehicle_type === "SUV"
                        ? "Premium interior finish"
                        : "Comfort-focused cabin",
                      car.insurance_coverage
                        ? "Comprehensive insurance support"
                        : "Included insurance coverage",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4">
                        <CheckCircle className="h-5 w-5 text-emerald-300" />
                        <span className="text-sm text-slate-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.18))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Starting from</p>
                      <p className="mt-2 text-4xl font-semibold text-white">
                        Rs. {car.price_per_day}
                        <span className="ml-1 text-base font-normal text-slate-300">/day</span>
                      </p>
                    </div>
                    <Link to={`/book/${car.slug}`} className="dws-button-primary px-6 py-4 text-sm">
                      Book this vehicle
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-4 text-center">
                      <Zap className="mx-auto h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-sm font-medium text-white">Fast booking response</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-4 text-center">
                      <MapPin className="mx-auto h-5 w-5 text-amber-200" />
                      <p className="mt-3 text-sm font-medium text-white">Islamabad delivery support</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.08] p-4 text-center">
                      <Clock className="mx-auto h-5 w-5 text-sky-200" />
                      <p className="mt-3 text-sm font-medium text-white">Available every day</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="dws-glass mt-12 rounded-[34px] p-8"
            >
              <h2 className="text-2xl font-semibold text-white">Frequently asked questions</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold text-white">
                    What documents do I need to rent this {car.name}?
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    A valid driving license, CNIC, and the required security details are typically needed.
                    International renters should also carry passport and permit documents where applicable.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold text-white">Is delivery available in Islamabad?</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Yes. We can coordinate delivery or pickup arrangements depending on timing and location.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold text-white">What is included in the rental?</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Vehicle preparation, support coordination, and the relevant insurance arrangement are included
                    according to the package and vehicle type.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold text-white">Can I book this vehicle for events or airport transfers?</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Absolutely. This vehicle can be arranged for weddings, business schedules, airport pickups,
                    and private travel depending on availability.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </section>
      </main>
    </>
  );
};

export default FleetDetail;
