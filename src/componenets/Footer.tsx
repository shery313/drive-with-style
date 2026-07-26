import { Link } from "react-router-dom";
import {
  BadgeCheck,
  CarFront,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "Our Fleet", to: "/fleet" },
  { name: "About Us", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Book Now", to: "/book" },
];

const serviceNotes = [
  {
    icon: CarFront,
    title: "Prepared fleet",
    body: "Sedans, SUVs, hatchbacks, and event-ready vehicles presented with care.",
  },
  {
    icon: ShieldCheck,
    title: "Insured travel",
    body: "Safety-focused operations, dependable drivers, and clear rental coordination.",
  },
  {
    icon: Clock3,
    title: "Fast response",
    body: "Airport pickups, wedding plans, and last-minute bookings handled daily.",
  },
];

const Footer = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Drive With Style",
    description:
      "Premium car rental service in Islamabad offering luxury vehicles, family SUVs, and professional chauffeur support.",
    url: "https://drivewithstyles.com",
    telephone: "+92-312-5430959",
    email: "DrivewithstyleRAC@gmail.com",
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <footer className="border-t border-black/10 bg-[#eef3ef] text-[#121714]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="border-b border-black/10 px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {serviceNotes.map((item) => (
              <div key={item.title} className="rounded-lg border border-black/10 bg-[#fffdf7] p-5 shadow-[0_16px_44px_rgba(18,23,20,0.08)]">
                <item.icon className="h-6 w-6 text-[#006d77]" />
                <h3 className="mt-4 text-lg font-semibold text-[#121714]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#69746f]">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.7fr_0.95fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white">
                  <img className="h-full w-full object-cover" src="/logo.png" alt="" />
                </div>
                <div>
                  <span className="block text-xl font-semibold tracking-tight text-[#121714]">
                    Drive With Style
                  </span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-[#69746f]">
                    Premium Car Rentals
                  </span>
                </div>
              </Link>

              <p className="mt-5 max-w-xl text-sm leading-8 text-[#69746f]">
                Refined vehicle rental experiences in Islamabad for business travel,
                weddings, airport transfers, and family plans.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2f7d5c]/20 bg-[#2f7d5c]/10 px-4 py-2 text-sm font-medium text-[#2f7d5c]">
                <BadgeCheck className="h-4 w-4" />
                Trusted, insured, and available every day
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#69746f]">
                Quick Links
              </h4>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#24302b] transition hover:text-[#006d77]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#69746f]">
                Contact
              </h4>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-[#f05a28]" />
                    <div>
                      <p className="text-sm font-medium text-[#121714]">Phone</p>
                      <a
                        href="tel:+923125430959"
                        className="mt-1 block text-sm text-[#69746f] transition hover:text-[#006d77]"
                      >
                        +92 312 5430959
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-[#f05a28]" />
                    <div>
                      <p className="text-sm font-medium text-[#121714]">Email</p>
                      <a
                        href="mailto:DrivewithstyleRAC@gmail.com"
                        className="mt-1 block text-sm text-[#69746f] transition hover:text-[#006d77]"
                      >
                        DrivewithstyleRAC@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-black/10 bg-[#fffdf7] p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-[#f05a28]" />
                    <div>
                      <p className="text-sm font-medium text-[#121714]">Office</p>
                      <p className="mt-1 text-sm text-[#69746f]">
                        Block#08 Flat#02, PHA Red Flat, G-10/2 Islamabad
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-[#f05a28]/20 bg-[#f05a28]/10 p-4">
                  <div className="flex items-center gap-2 text-[#9a3412]">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">
                      Premium support for weddings, business, and family travel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-black/10 pt-6 text-sm text-[#69746f] md:flex-row md:items-center md:justify-between">
            <p>Copyright 2026 Drive With Style.</p>
            <p>Luxury vehicles, trusted service, and smooth journeys from booking to drop-off.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
