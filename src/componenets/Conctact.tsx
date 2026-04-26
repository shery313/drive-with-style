import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import { SERVER_URL } from "../constant";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "booking", label: "Booking Question" },
  { value: "payment", label: "Payment Issue" },
  { value: "complaint", label: "Complaint" },
  { value: "other", label: "Other" },
];

const contactCards = [
  {
    icon: Phone,
    title: "Phone support",
    value: "+92 312 5430959",
    href: "tel:+923125430959",
    detail: "Speak directly with our team",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "+92 312 5430959",
    href: "https://wa.me/923125430959",
    detail: "Fast replies for urgent bookings",
  },
  {
    icon: Mail,
    title: "Email",
    value: "DrivewithstyleRAC@gmail.com",
    href: "mailto:DrivewithstyleRAC@gmail.com",
    detail: "Detailed quotes and rental questions",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Block#08 Flate#02, PHA Red Flate, G-10/2 Islamabad",
    href: undefined,
    detail: "Mon-Sun: 8:00 AM - 10:00 PM",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const seoData = {
    title: "Contact Drive With Style | Luxury Car Rentals Islamabad | 24/7 Support",
    description:
      "Get in touch with Drive With Style for premium car rentals in Islamabad. Call +92-312-5430959 for 24/7 luxury vehicle bookings, inquiries, and customer support.",
    keywords:
      "contact drive with style, islamabad car rental contact, luxury car booking islamabad, premium vehicles contact, 24/7 car rental support, chauffeur service contact",
    canonical: "https://drivewithstyles.com/contact",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Drive With Style",
      description: "Premium Car Rental Service in Islamabad",
      publisher: {
        "@type": "Organization",
        name: "Drive With Style",
        url: "https://drivewithstyles.com",
        logo: "https://res.cloudinary.com/dy05jtbao/image/upload/v1763999745/uwm2q7mlfyvczxdnwzry.png",
        sameAs: ["https://facebook.com/drivewithstyle", "https://instagram.com/drivewithstyle"],
      },
      mainEntity: {
        "@type": "Organization",
        name: "Drive With Style",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Block#08 Flate#02, PHA Red Flate",
          addressLocality: "Islamabad",
          addressRegion: "Islamabad Capital Territory",
          postalCode: "46000",
          addressCountry: "PK",
        },
        telephone: "+92-312-5430959",
        email: "DrivewithstyleRAC@gmail.com",
        openingHours: "Mo-Su 08:00-22:00",
        areaServed: "Islamabad and surrounding areas",
        serviceType: "Luxury Car Rentals",
      },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${SERVER_URL}/api/v1/contact/`, formData);

      if (response.status === 201) {
        setSubmitStatus({
          success: true,
          message: "Thank you for your message. Our team will get back to you shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "We could not send your message right now. Please try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <meta property="og:image" content="https://drivewithstyles.com/contact-og-image.jpg" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.canonical} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content="https://drivewithstyles.com/contact-twitter-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(seoData.structuredData)}</script>
      </Helmet>

      <main className="dws-page min-h-screen text-slate-100" itemScope itemType="https://schema.org/ContactPage">
        <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="dws-label">
                  <Sparkles className="h-4 w-4" />
                  Contact Drive With Style
                </div>
                <h1 className="mt-8 text-4xl font-semibold leading-tight text-white sm:text-6xl" itemProp="headline">
                  Reach the team behind your next premium ride.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300" itemProp="description">
                  From quick availability checks to custom event transport, we are here to help
                  you book confidently and travel smoothly in Islamabad.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {contactCards.map((card) => (
                  <motion.div
                    key={card.title}
                    whileHover={{ y: -4 }}
                    className="dws-glass rounded-[28px] p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-amber-300/20 bg-amber-300/10">
                      <card.icon className="h-5 w-5 text-amber-200" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
                    {card.href ? (
                      <a
                        href={card.href}
                        target={card.href.startsWith("http") ? "_blank" : undefined}
                        rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-2 block text-sm font-medium text-slate-200 transition hover:text-amber-200"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm font-medium leading-7 text-slate-200">{card.value}</p>
                    )}
                    <p className="mt-2 text-sm text-slate-400">{card.detail}</p>
                  </motion.div>
                ))}
              </div>

              <div className="dws-glass rounded-[30px] p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-emerald-300" />
                  <p className="text-sm font-medium text-white">Direct support for bookings, event transport, and premium rental planning</p>
                </div>
                <div className="mt-5 flex items-center gap-3 text-sm text-slate-300">
                  <Clock className="h-4 w-4 text-amber-200" />
                  Available every day, 8:00 AM to 10:00 PM
                </div>
              </div>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="dws-glass rounded-[34px] p-6 sm:p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white">Send us a message</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  Share your travel dates, preferred vehicle, pickup details, or anything else
                  we should know. We will respond as soon as possible.
                </p>
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 flex items-center gap-3 rounded-[22px] border px-4 py-4 ${
                    submitStatus.success
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                      : "border-rose-400/20 bg-rose-400/10 text-rose-100"
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{submitStatus.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" itemScope itemType="https://schema.org/ContactPoint">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-3 block text-sm font-semibold text-slate-200">
                      Full Name <span className="text-amber-300">*</span>
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="dws-field pl-12 pr-4 py-4"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-3 block text-sm font-semibold text-slate-200">
                      Email <span className="text-amber-300">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="dws-field pl-12 pr-4 py-4"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-3 block text-sm font-semibold text-slate-200">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className="dws-field pl-12 pr-4 py-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-3 block text-sm font-semibold text-slate-200">
                      Subject <span className="text-amber-300">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="dws-field px-4 py-4"
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
                  <label htmlFor="message" className="mb-3 block text-sm font-semibold text-slate-200">
                    Message <span className="text-amber-300">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-500" />
                    <textarea
                      id="message"
                      name="message"
                      rows={7}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your preferred vehicle, rental dates, destination, or event requirements."
                      className="dws-field resize-none pl-12 pr-4 py-4"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="dws-button-primary w-full px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-3">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending your message
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-3">
                      <Send className="h-5 w-5" />
                      Send message
                    </span>
                  )}
                </button>
              </form>
            </motion.section>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dws-glass overflow-hidden rounded-[34px]"
            >
              <div className="border-b border-white/8 px-6 py-6 sm:px-8">
                <h2 className="text-3xl font-semibold text-white">Visit our Islamabad location</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  Meet the team, confirm your booking details, or coordinate pickup arrangements in person.
                </p>
              </div>
              <div className="h-80 md:h-[430px]">
                <iframe
                  className="h-full w-full"
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d212559.2251951987!2d73.04080567007671!3d33.65099730644122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x38dfbfecb1d94b4b%3A0xc4fa9cfcc5e12579!2sBlock%2308%20Flate%2302%2C%20PHA%20Red%20Flate%2C%20G-10%2F2%20Islamabad%2C%2046000!3m2!1d33.677075699999996!2d73.0113938!5e0!3m2!1sen!2s!4v1744348520977!5m2!1sen!2s"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Drive With Style office location in Islamabad"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.18))] p-8 text-center sm:p-12"
            >
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Need a vehicle quickly?
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-200">
                Call or WhatsApp us for urgent rental requests, airport pickups, wedding cars,
                and premium travel planning across Islamabad.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a href="tel:+923125430959" className="dws-button-primary px-6 py-4 text-sm">
                  Call now
                </a>
                <a
                  href="https://wa.me/923125430959"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dws-button-secondary px-6 py-4 text-sm"
                >
                  Message on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
