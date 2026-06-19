import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";

import TrustedBy from "./TrustedBy";
import { SERVER_URL } from "../constant";

type Vehicle = {
  id: number;
  name: string;
  vehicle_type: string;
  price_per_day: string;
  image: string;
  description: string;
  seats: number;
  fuel_type: string;
  transmission: string;
  slug: string;
};

const servicePillars = [
  {
    icon: ShieldCheck,
    title: "Fully insured rides",
    description: "Premium vehicles with peace-of-mind coverage and well-managed operations.",
  },
  {
    icon: Clock3,
    title: "Always available",
    description: "Airport transfers, weddings, business trips, and late-night travel support.",
  },
  {
    icon: BadgeCheck,
    title: "Professional service",
    description: "A polished booking experience with dependable support and careful attention to detail.",
  },
];

const experienceStats = [
  { value: "500+", label: "Satisfied clients" },
  { value: "50+", label: "Premium vehicles" },
  { value: "24/7", label: "Support and bookings" },
  { value: "5.0", label: "Service standard" },
];

const bookingSteps = [
  {
    title: "Choose your vehicle",
    description: "Select from hatchbacks, sedans, SUVs, and luxury options suited to your occasion.",
  },
  {
    title: "Confirm your schedule",
    description: "Share pickup details, return timing, and any special requirements through our booking flow.",
  },
  {
    title: "Drive with confidence",
    description: "Receive a smooth, secure, and premium travel experience from start to finish.",
  },
];

const Home = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const seoData = {
    title: "Drive With Style | Premium Car Rentals in Islamabad",
    description:
      "Luxury and premium car rentals in Islamabad with trusted service, flexible booking, and a refined fleet for business, weddings, airport transfers, and family travel.",
    keywords:
      "Drive With Style, premium car rental Islamabad, luxury cars for rent, wedding cars Islamabad, SUV rental, airport transfer, chauffeur service",
    canonical: "https://drivewithstyles.com/",
  };

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${SERVER_URL}/api/v1/fleet/`);
        setFeaturedVehicles(response.data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Unable to load featured vehicles right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonical} />
      </Helmet>

      <main className="dws-page min-h-screen text-slate-100">
        <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-3xl"
            >
              <div className="dws-label">
                <Sparkles className="h-4 w-4" />
                Islamabad premium car rentals
              </div>

              <h1 className="mt-8 text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl xl:text-7xl">
                Travel with elegance,
                <span className="mt-3 block dws-title-gradient">comfort, and confidence.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Drive With Style brings together luxury vehicles, family-friendly options,
                polished support, and reliable booking for weddings, business travel,
                airport pickups, and everyday premium mobility in Islamabad.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/book" className="dws-button-primary px-6 py-4 text-sm">
                  Book your ride
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/fleet" className="dws-button-secondary px-6 py-4 text-sm">
                  Explore the fleet
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, text: "Fully insured fleet" },
                  { icon: Clock3, text: "24/7 support" },
                  { icon: BadgeCheck, text: "Premium service standard" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="dws-glass rounded-[24px] p-4"
                  >
                    <item.icon className="h-5 w-5 text-amber-300" />
                    <p className="mt-4 text-sm font-medium text-white">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative"
            >
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-amber-400/18 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-sky-400/14 blur-3xl" />

              <div className="dws-glass relative overflow-hidden rounded-[32px] p-5">
                <div className="relative overflow-hidden rounded-[26px]">
                  <video
                    className="h-[380px] w-full rounded-[26px] object-cover sm:h-[430px] lg:h-[500px]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Premium car rental showcase"
                  >
                    <source src="/df.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/45 via-[#050b14]/5 to-transparent" />
                </div>

                <div className="mt-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_0.72fr]">
                    <div className="rounded-[24px] border border-white/10 bg-[#07111d]/78 p-5 backdrop-blur-2xl">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                            Signature experience
                          </p>
                          <p className="mt-2 text-2xl font-semibold text-white">
                            Luxury travel, tailored for your schedule
                          </p>
                        </div>
                        <div className="rounded-2xl bg-amber-300/12 p-3 text-amber-200">
                          <CarFront className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-[#07111d]/78 p-5 backdrop-blur-2xl">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Popular uses
                      </p>
                      <div className="mt-4 space-y-3 text-sm text-slate-200">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-amber-200" />
                          Wedding and event bookings
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-amber-200" />
                          Family and executive travel
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock3 className="h-4 w-4 text-amber-200" />
                          Airport pickups and urgent trips
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {experienceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="dws-glass rounded-[28px] p-6 text-center"
              >
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-3 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <div className="dws-label">
                <ShieldCheck className="h-4 w-4" />
                Why choose Drive With Style
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
                Premium vehicles backed by a calm, reliable service experience.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                We focus on the details that matter most: vehicle quality, trust,
                availability, and a booking experience that feels smooth from the first call
                to the final drop-off.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {servicePillars.map((pillar, index) => (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="dws-glass rounded-[30px] p-6"
                >
                  <pillar.icon className="h-6 w-6 text-amber-300" />
                  <h3 className="mt-5 text-2xl font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{pillar.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="dws-label">
                  <CarFront className="h-4 w-4" />
                  Featured vehicles
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
                  A curated fleet for weddings, business, and daily premium travel.
                </h2>
              </div>
              <Link to="/fleet" className="dws-button-secondary px-6 py-4 text-sm">
                View full fleet
              </Link>
            </div>

            <div className="mt-12">
              {loading ? (
                <div className="dws-glass rounded-[28px] p-10 text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-amber-300" />
                  <p className="mt-4 text-slate-400">Loading featured vehicles...</p>
                </div>
              ) : error ? (
                <div className="dws-glass rounded-[28px] p-10 text-center">
                  <p className="text-lg font-medium text-white">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="dws-button-primary mt-6 px-5 py-3 text-sm"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-3">
                  {featuredVehicles.map((vehicle, index) => (
                    <motion.article
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="dws-glass overflow-hidden rounded-[30px]"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/10 to-transparent" />
                        <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                          {vehicle.vehicle_type}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-white">{vehicle.name}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">
                              {vehicle.description.slice(0, 110)}...
                            </p>
                          </div>
                          <div className="flex items-center gap-1 rounded-full border border-amber-300/15 bg-amber-300/10 px-3 py-1 text-sm font-medium text-amber-200">
                            <Star className="h-4 w-4 fill-current" />
                            5.0
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                          <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 text-center">
                            <p className="text-slate-500">Seats</p>
                            <p className="mt-2 font-medium text-white">{vehicle.seats}</p>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 text-center">
                            <p className="text-slate-500">Fuel</p>
                            <p className="mt-2 font-medium text-white">{vehicle.fuel_type}</p>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 text-center">
                            <p className="text-slate-500">Gear</p>
                            <p className="mt-2 font-medium text-white">{vehicle.transmission}</p>
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-slate-500">Starting from</p>
                            <p className="text-2xl font-semibold text-amber-200">
                              Rs. {vehicle.price_per_day}
                              <span className="ml-1 text-sm font-normal text-slate-400">/ day</span>
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Link to={`/fleet/${vehicle.slug}`} className="dws-button-secondary px-4 py-3 text-sm">
                              Details
                            </Link>
                            <Link to={`/book/${vehicle.slug}`} className="dws-button-primary px-4 py-3 text-sm">
                              Book
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="dws-label">
                <BadgeCheck className="h-4 w-4" />
                Booking process
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
                Simple steps, premium service, and zero confusion.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                Whether you’re booking for a wedding convoy, executive pickup, or family trip,
                our process is designed to be clear, fast, and dependable.
              </p>
            </div>

            <div className="space-y-5">
              {bookingSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="dws-glass rounded-[28px] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/16 bg-amber-300/10 text-sm font-semibold text-amber-100">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <TrustedBy />

        <section className="px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-amber-300/12 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.18),rgba(6,11,20,0.92))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <div className="dws-label">
                  <CheckCircle2 className="h-4 w-4" />
                  Ready when you are
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-white sm:text-5xl">
                  Reserve your next premium ride with Drive With Style.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Tell us your route, occasion, and timing. We’ll help you find the right vehicle
                  for a smooth and elevated travel experience in Islamabad.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link to="/book" className="dws-button-primary px-6 py-4 text-sm">
                  Start booking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/contact" className="dws-button-secondary px-6 py-4 text-sm">
                  Contact our team
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default Home;
