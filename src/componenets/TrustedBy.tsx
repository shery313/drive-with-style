import Slider from "react-slick";
import { motion } from "framer-motion";
import { Star, Award, Shield, Users } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrustedBy = () => {
  const companies = [
    {
      logo: "https://osomehygiene.com/cdn/shop/files/osome_logo_brand_page-0001-1-21-25.jpg?v=1737454351",
      name: "Osome Hygiene",
      website: "https://osomehygiene.com"
    },
    {
      logo: "https://d3fyizz0b46qgr.cloudfront.net/global/x_new/logo.svg",
      name: "Global X",
      website: "https://globalx.com"
    },
    {
      logo: "https://bejaanhygiene.com/wp-content/uploads/2024/05/Bejaan-Logo-min.png",
      name: "Bejaan Hygiene",
      website: "https://bejaanhygiene.com"
    },
    {
      logo: "/infinix.jpg",
      name: "Infinix",
      website: "https://infinixmobility.com"
    },
    {
      logo: "/itel.jpg",
      name: "Itel",
      website: "https://itel-mobile.com"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
      name: "Nike",
      website: "https://nike.com"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      name: "Amazon",
      website: "https://amazon.com"
    }
  ];

  // Enhanced slider settings with better performance
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Star, value: "4.9/5", label: "Customer Rating" },
    { icon: Award, value: "8+", label: "Years Experience" },
    { icon: Shield, value: "100%", label: "Insured Fleet" }
  ];

  // Handle image error with proper TypeScript typing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    
    // Safely access next sibling with proper typing
    const nextSibling = target.nextSibling as HTMLElement;
    if (nextSibling && nextSibling.style) {
      nextSibling.style.display = 'block';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" aria-labelledby="trusted-by-heading">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Drive With Style",
            "description": "Premium car rental service trusted by leading brands in Islamabad",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "500"
            },
            "knowsAbout": [
              "Luxury Car Rentals",
              "Premium Vehicle Services",
              "Corporate Transportation",
              "Wedding Car Services"
            ]
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4" fill="currentColor" />
            Trusted by Industry Leaders
          </motion.div>

          <h2 
            id="trusted-by-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leading Brands</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of satisfied clients and industry leaders who trust Drive With Style 
            for their premium transportation needs in Islamabad and across Pakistan.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
            >
              <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="px-2 sm:px-4 lg:px-8">
            <Slider {...settings}>
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 focus:outline-none"
                >
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    aria-label={`Visit ${company.name} website`}
                  >
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 h-32 flex items-center justify-center border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} - Trusted partner of Drive With Style`}
                        className="max-h-16 max-w-32 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={128}
                        height={64}
                        onError={handleImageError}
                      />
                      {/* Fallback text */}
                      <div 
                        className="hidden text-gray-500 dark:text-gray-400 font-semibold text-sm text-center"
                        style={{ display: 'none' }}
                      >
                        {company.name}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </Slider>
          </div>

          {/* Gradient overlays for better UX */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience Premium Service?
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Join our growing list of satisfied clients and discover why leading brands 
              choose Drive With Style for their luxury transportation needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = '/contact'}
            >
              Become Our Client
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;