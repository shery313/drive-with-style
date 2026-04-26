import Slider from "react-slick";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Shield, Star, Users } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const companies = [
  {
    logo: "https://osomehygiene.com/cdn/shop/files/osome_logo_brand_page-0001-1-21-25.jpg?v=1737454351",
    name: "Osome Hygiene",
    website: "https://osomehygiene.com",
  },
  {
    logo: "https://d3fyizz0b46qgr.cloudfront.net/global/x_new/logo.svg",
    name: "Global X",
    website: "https://globalx.com",
  },
  {
    logo: "https://bejaanhygiene.com/wp-content/uploads/2024/05/Bejaan-Logo-min.png",
    name: "Bejaan Hygiene",
    website: "https://bejaanhygiene.com",
  },
  {
    logo: "/infinix.jpg",
    name: "Infinix",
    website: "https://infinixmobility.com",
  },
  {
    logo: "/itel.jpg",
    name: "Itel",
    website: "https://itel-mobile.com",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
    name: "Nike",
    website: "https://nike.com",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    name: "Amazon",
    website: "https://amazon.com",
  },
];

const stats = [
  { icon: Users, value: "500+", label: "happy clients" },
  { icon: Star, value: "4.9/5", label: "average service rating" },
  { icon: Award, value: "8+", label: "years of experience" },
  { icon: Shield, value: "100%", label: "insured fleet coverage" },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 950,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3600,
  pauseOnHover: true,
  arrows: false,
  cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const TrustedBy = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";

    const nextSibling = target.nextSibling as HTMLElement;
    if (nextSibling && nextSibling.style) {
      nextSibling.style.display = "flex";
    }
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="trusted-by-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Drive With Style",
            description: "Premium car rental service trusted by leading brands in Islamabad",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "500",
            },
            knowsAbout: [
              "Luxury Car Rentals",
              "Premium Vehicle Services",
              "Corporate Transportation",
              "Wedding Car Services",
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="dws-label">
            <BadgeCheck className="h-4 w-4" />
            Trusted across business and private travel
          </div>
          <h2 id="trusted-by-heading" className="mt-6 text-4xl font-semibold text-white sm:text-5xl">
            Trusted by clients who expect premium service.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            From corporate movement to weddings and executive schedules, Drive With Style is chosen
            for dependable coordination, polished vehicles, and a smooth customer experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="dws-glass rounded-[28px] p-6 text-center"
            >
              <stat.icon className="mx-auto h-7 w-7 text-amber-200" />
              <div className="mt-4 text-3xl font-semibold text-white">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mt-12"
        >
          <div className="absolute left-0 top-0 z-10 hidden h-full w-20 bg-gradient-to-r from-[#07111d] to-transparent lg:block" />
          <div className="absolute right-0 top-0 z-10 hidden h-full w-20 bg-gradient-to-l from-[#07111d] to-transparent lg:block" />

          <Slider {...settings}>
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-3"
              >
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Visit ${company.name} website`}
                >
                  <div className="dws-glass flex h-36 items-center justify-center rounded-[28px] border border-white/8 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-300/16">
                    <img
                      src={company.logo}
                      alt={`${company.name} trusted client of Drive With Style`}
                      className="max-h-16 max-w-32 object-contain brightness-95 contrast-125 saturate-75 transition duration-300 hover:saturate-100"
                      loading="lazy"
                      width={128}
                      height={64}
                      onError={handleImageError}
                    />
                    <div
                      className="hidden h-full w-full items-center justify-center text-center text-sm font-semibold text-slate-300"
                      style={{ display: "none" }}
                    >
                      {company.name}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </Slider>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          viewport={{ once: true }}
          className="mt-14 rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(217,119,6,0.18),rgba(37,99,235,0.18))] p-8 text-center sm:p-12"
        >
          <h3 className="text-3xl font-semibold text-white">
            Want a rental partner that reflects your brand or event standard?
          </h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-200">
            We help businesses, event planners, families, and private clients arrange polished transportation
            with reliable coordination and premium presentation.
          </p>
          <button
            type="button"
            className="dws-button-primary mt-8 px-6 py-4 text-sm"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Talk to our team
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
