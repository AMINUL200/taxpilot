import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Footer = () => {
  const footerLinks = [
    {
      name: "Product",
      url: "/products",
    },
    {
      name: "Support",
      url: "/support",
    },
    {
      name: "Privacy",
      url: "/privacy",
    },
    {
      name: "Terms",
      url: "/terms",
    },
  ];

  // =========================================================
  // TAXPILOT LOGO
  // =========================================================

  const TaxPilotLogo = () => {
    return (
      <Link to="/" className="group inline-flex items-center gap-2.5">
        <motion.svg
          width="42"
          height="42"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
          whileHover={{
            y: -3,
            rotate: -4,
            scale: 1.04,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
          }}
        >
          <path
            d="M44 5L5 21.5L21.5 27L27 43L44 5Z"
            fill="white"
          />

          <path
            d="M5 21.5L44 5L21.5 27"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M21.5 27L27 43L44 5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        <motion.span
          className="
            text-[27px]
            font-extrabold
            leading-none
            tracking-[-0.045em]
            text-white
          "
          whileHover={{ x: 2 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          TaxPilot
        </motion.span>
      </Link>
    );
  };

  return (
    <motion.footer
      className="
        w-full
        border-t
        border-[#274264]
        bg-[#102A4C]
      "
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="
          mx-auto
          flex
          min-h-[105px]
          max-w-[1320px]
          items-center
          justify-between
          px-5
          sm:px-7
          lg:px-10
        "
      >

        {/* ===================================================
            LOGO
            =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            delay: 0.1,
          }}
        >
          <TaxPilotLogo />
        </motion.div>


        {/* ===================================================
            CENTER LINKS
            =================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-10
            md:flex
          "
        >
          {footerLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: 0.15 + index * 0.08,
              }}
            >
              <Link
                to={link.url}
                className="
                  relative
                  text-[14px]
                  font-medium
                  text-white/85
                  transition-colors
                  duration-200
                  hover:text-white
                "
              >
                {link.name}

                {/* Animated underline */}

                <motion.span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-[1px]
                    w-full
                    origin-left
                    bg-white
                  "
                  initial={{
                    scaleX: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>


        {/* ===================================================
            DESIGN CONCEPT
            =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
          whileHover={{
            x: -3,
          }}
          className="
            shrink-0
            cursor-default
            text-[13px]
            font-medium
            text-white/80
          "
        >
          Design concept
        </motion.div>

      </div>


      {/* =====================================================
          MOBILE LINKS
          ===================================================== */}

      <motion.div
        className="
          border-t
          border-white/10
          px-5
          py-4
          md:hidden
        "
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.25,
        }}
      >
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.url}
              className="
                text-[12px]
                font-medium
                text-white/80
                transition-colors
                duration-200
                hover:text-white
              "
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;