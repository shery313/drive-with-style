import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrustedBy = () => {
  const companies = [
    {
      logo: "https://osomehygiene.com/cdn/shop/files/osome_logo_brand_page-0001-1-21-25.jpg?v=1737454351",
      name: "Osome Hygiene"
    },
    {
      logo: "https://d3fyizz0b46qgr.cloudfront.net/global/x_new/logo.svg",
      name: "Global X"
    },
    {
      logo: "https://bejaanhygiene.com/wp-content/uploads/2024/05/Bejaan-Logo-min.png",
      name: "Bejaan Hygiene"
    },
    {
      logo: "/infinix.jpg",
      name: "Infinix"
    },
    {
      logo: "/itel.jpg",
      name: "Itel"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
      name: "Nike"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      name: "Amazon"
    }
  ];

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-sm font-extrabold leading-tight text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Trusted By Leading Brands
          </h3>
          <h2 className="text-3xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600  dark:text-white">
            We Work With The Best
          </h2>
        </motion.div>

        <div className="px-4 sm:px-8">
          <Slider {...settings}>
            {companies.map((company, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-2 focus:outline-none"
              >
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all h-24 flex items-center justify-center mx-auto">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="max-h-16 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;