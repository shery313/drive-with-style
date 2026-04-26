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

  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "Our Fleet", to: "/fleet" },
    { name: "About Us", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "Book Now", to: "/book" },
  ];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <footer className="border-t border-white/8 bg-[#040912] text-white">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="border-b border-white/8 bg-[linear-gradient(180deg,rgba(10,20,35,0.9),rgba(6,11,20,0.86))] px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {[
              {
                icon: CarFront,
                title: "Premium fleet",
                body: "Luxury sedans, SUVs, hatchbacks, and event-ready vehicles maintained to a high standard.",
              },
              {
                icon: ShieldCheck,
                title: "Fully insured",
                body: "Peace of mind with safety-focused operations, trusted drivers, and a protected rental experience.",
              },
              {
                icon: Clock3,
                title: "24/7 response",
                body: "From airport pickups to last-minute plans, our team is available when your schedule changes.",
              },
            ].map((item) => (
              <div key={item.title} className="dws-glass rounded-[26px] p-5">
                <item.icon className="h-6 w-6 text-amber-300" />
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.7fr_0.95fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/18 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.18))] text-amber-100">
                  <CarFront className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xl font-semibold tracking-tight text-white">
                    Drive With Style
                  </span>
                  <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">
                    Premium Car Rentals
                  </span>
                </div>
              </Link>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-400">
                Drive With Style delivers refined vehicle rental experiences in Islamabad with
                premium cars, polished service, and flexible booking options for business,
                weddings, family travel, and airport transfers.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
                <BadgeCheck className="h-4 w-4" />
                Trusted, insured, and available every day
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Quick Links
              </h4>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-300 transition hover:text-amber-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Contact
              </h4>
              <div className="mt-5 space-y-4">
                <div className="dws-glass rounded-[24px] p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-amber-200" />
                    <div>
                      <p className="text-sm font-medium text-white">Phone</p>
                      <a
                        href="tel:+923125430959"
                        className="mt-1 block text-sm text-slate-400 transition hover:text-amber-200"
                      >
                        +92 312 5430959
                      </a>
                    </div>
                  </div>
                </div>

                <div className="dws-glass rounded-[24px] p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-4 w-4 text-amber-200" />
                    <div>
                      <p className="text-sm font-medium text-white">Email</p>
                      <a
                        href="mailto:DrivewithstyleRAC@gmail.com"
                        className="mt-1 block text-sm text-slate-400 transition hover:text-amber-200"
                      >
                        DrivewithstyleRAC@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="dws-glass rounded-[24px] p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-amber-200" />
                    <div>
                      <p className="text-sm font-medium text-white">Office</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Block#08 Flat#02, PHA Red Flat, G-10/2 Islamabad
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-amber-200">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">
                      Premium support for weddings, business, and family travel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/8 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>Copyright 2026 Drive With Style. Premium car rental experiences in Islamabad.</p>
            <p>Luxury vehicles, trusted service, and smooth journeys from booking to drop-off.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
