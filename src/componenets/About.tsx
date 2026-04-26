import { motion } from "framer-motion";
import {
  Award,
  Car,
  Clock,
  Mail,
  MapPin,
  Phone,
  Quote,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Car,
    title: "Premium fleet",
    description: "Luxury sedans, family SUVs, and refined city cars maintained for comfort and presentation.",
  },
  {
    icon: Clock,
    title: "Flexible support",
    description: "Round-the-clock booking help for airport transfers, business travel, weddings, and urgent plans.",
  },
  {
    icon: Shield,
    title: "Trusted operations",
    description: "Insured vehicles, safety-first processes, and dependable service from booking to drop-off.",
  },
  {
    icon: Star,
    title: "Polished experience",
    description: "A hospitality-driven approach designed to make every trip smooth, calm, and memorable.",
  },
  {
    icon: Award,
    title: "Attention to detail",
    description: "Clean interiors, professional presentation, and high standards across every customer touchpoint.",
  },
  {
    icon: Users,
    title: "People-first team",
    description: "Experienced drivers and responsive support focused on reliability, courtesy, and discretion.",
  },
];

const founderStats = [
  { value: "8+", label: "Years of experience" },
  { value: "500+", label: "Satisfied clients" },
  { value: "50+", label: "Vehicles managed" },
];

const journeySteps = [
  {
    year: "2021",
    title: "The beginning",
    description:
      "Drive With Style launched in Islamabad with a clear goal: offer premium rentals with the service quality of a private concierge.",
  },
  {
    year: "2023",
    title: "Fleet expansion",
    description:
      "The brand grew into a broader lineup of sedans, SUVs, and luxury options serving weddings, corporate travel, and family trips.",
  },
  {
    year: "Today",
    title: "Trusted local name",
    description:
      "The company now focuses on dependable bookings, polished customer care, and a premium look-and-feel from first contact onward.",
  },
];

const About = () => {
  const seoData = {
    title: "About Drive With Style | Premium Car Rentals in Islamabad | Luxury Vehicles",
    description:
      "Meet Drive With Style - Islamabad's premier luxury car rental service. Learn about our mission, founder Adnan Sajjad Satti, and why we're the trusted choice for premium vehicle rentals in Pakistan.",
    keywords:
      "about drive with style, luxury car rentals islamabad, premium vehicles pakistan, about our car rental service, Adnan Sajjad Satti, professional chauffeur service",
    canonical: "https://drivewithstyles.com/about",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Drive With Style",
    description: seoData.description,
    publisher: {
      "@type": "Organization",
      name: "Drive With Style",
      description: "Premium Car Rental Service in Islamabad",
      url: "https://drivewithstyles.com",
      logo: "https://res.cloudinary.com/dy05jtbao/image/upload/v1763999745/uwm2q7mlfyvczxdnwzry.png",
      sameAs: ["https://facebook.com/drivewithstyle", "https://instagram.com/drivewithstyle"],
    },
    mainEntity: {
      "@type": "Organization",
      name: "Drive With Style",
      foundingDate: "2021",
      founder: {
        "@type": "Person",
        name: "Adnan Sajjad Satti",
        jobTitle: "Founder & CEO",
        telephone: "+92-312-5430959",
        email: "adnan@drivewithstyle.com",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Block#08 Flate#02, PHA Red Flate",
        addressLocality: "Islamabad",
        addressRegion: "Islamabad Capital Territory",
        postalCode: "46000",
        addressCountry: "PK",
      },
      areaServed: "Islamabad and surrounding areas",
      serviceType: "Luxury Car Rentals",
    },
  };

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seoData.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content="https://drivewithstyles.com/about-og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.canonical} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content="https://drivewithstyles.com/about-twitter-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="dws-page min-h-screen text-slate-100" itemScope itemType="https://schema.org/AboutPage">
        <section className="relative overflow-hidden px-4 pb-18 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="dws-label">
                <Sparkles className="h-4 w-4" />
                About Drive With Style
              </div>

              <h1 className="mt-8 text-4xl font-semibold leading-tight text-white sm:text-6xl">
                Premium transport,
                <span className="mt-3 block dws-title-gradient">built around trust and presentation.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300" itemProp="description">
                Drive With Style was created to make car rental in Islamabad feel refined,
                dependable, and genuinely customer-focused. We combine a polished fleet,
                responsive support, and service discipline that respects your time.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/fleet" className="dws-button-primary px-6 py-4 text-sm">
                  Explore our fleet
                </Link>
                <Link to="/book" className="dws-button-secondary px-6 py-4 text-sm">
                  Start booking
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="dws-glass rounded-[32px] p-5"
            >
              <div className="overflow-hidden rounded-[26px]">
                <img
                  src="/logo1.jpg"
                  alt="Drive With Style luxury fleet in Islamabad"
                  className="h-full min-h-[420px] w-full object-cover"
                  loading="lazy"
                  itemProp="image"
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {founderStats.map((stat) => (
                  <div key={stat.label} className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4 text-center">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="mission-vision-heading">
          <div className="mx-auto max-w-7xl">
            <h2 id="mission-vision-heading" className="sr-only">
              Our Mission and Vision
            </h2>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.article
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="dws-glass rounded-[30px] p-8"
                itemProp="mission"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-amber-300/20 bg-amber-300/10">
                  <Car className="h-8 w-8 text-amber-200" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-white">Our Mission</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  To transform every journey into a premium experience through well-kept
                  vehicles, calm booking support, and service standards that feel more
                  boutique than transactional.
                </p>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="dws-glass rounded-[30px] p-8"
                itemProp="slogan"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-sky-300/20 bg-sky-300/10">
                  <Shield className="h-8 w-8 text-sky-200" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-white">Our Vision</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  To become the most trusted premium car rental name in Pakistan by pairing
                  luxury presentation with dependable operations, transparent communication,
                  and consistently strong customer care.
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="founder-heading">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dws-glass rounded-[32px] p-8"
              itemScope
              itemType="https://schema.org/Person"
              itemProp="founder"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,rgba(217,119,6,0.2),rgba(37,99,235,0.22))] text-amber-100">
                  <Users className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white" itemProp="name">
                    Adnan Sajjad Satti
                  </h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-400" itemProp="jobTitle">
                    Founder & CEO
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-amber-200" />
                  <span itemProp="telephone">+92 312 5430959</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-amber-200" />
                  <span itemProp="email">adnan@drivewithstyle.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-amber-200" />
                  <span itemProp="address">Islamabad, Pakistan</span>
                </div>
              </div>

              <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <Quote className="h-8 w-8 text-amber-200" />
                <blockquote className="mt-4 text-lg leading-8 text-slate-200" itemProp="description">
                  Our goal is simple: every customer should feel that the vehicle, the
                  service, and the overall experience were handled with care, precision,
                  and respect for their occasion.
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="dws-glass rounded-[32px] p-8">
                <h2 id="founder-heading" className="text-4xl font-semibold text-white">
                  Leadership with a service mindset
                </h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
                  <p>
                    <strong className="text-white">Adnan Sajjad Satti</strong> founded Drive
                    With Style in 2021 with the belief that premium transportation should feel
                    smooth, composed, and personal from the first inquiry onward.
                  </p>
                  <p>
                    With years of experience in automotive operations and customer service, he
                    has grown the business from a single luxury sedan into a respected rental
                    brand serving corporate clients, weddings, airport transfers, and private travel.
                  </p>
                  <p>
                    He remains closely involved in fleet quality, presentation standards, and
                    customer care so the brand stays consistent as it grows.
                  </p>
                </div>
              </div>

              <div className="dws-glass rounded-[32px] p-8">
                <h3 className="text-2xl font-semibold text-white">Our journey</h3>
                <div className="mt-6 space-y-5">
                  {journeySteps.map((step) => (
                    <div key={step.title} className="grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[112px_1fr]">
                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                        {step.year}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-slate-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="why-choose-us-heading">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <div className="dws-label">Why clients choose us</div>
              <h2 id="why-choose-us-heading" className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
                A premium rental brand should feel reliable at every step.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                We focus on the practical details that matter most: vehicle quality, support
                speed, communication, safety, and presentation.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="dws-glass rounded-[28px] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-sky-300/14 bg-sky-300/10">
                    <feature.icon className="h-5 w-5 text-sky-200" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.18))] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-12"
            >
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Ready to travel with more style and less friction?
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-200">
                Whether you need a wedding car, airport transfer, executive ride, or family
                SUV, Drive With Style is built to deliver a polished experience from booking to arrival.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/book" className="dws-button-primary px-6 py-4 text-sm">
                  Book your vehicle
                </Link>
                <Link to="/contact" className="dws-button-secondary px-6 py-4 text-sm">
                  Talk to our team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://drivewithstyles.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: "https://drivewithstyles.com/about",
              },
            ],
          })}
        </script>
      </main>
    </>
  );
};

export default About;
