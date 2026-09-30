import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import {
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  const shouldReduceMotion = useReducedMotion();

  // =========================================================
  // SCROLL
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // NAVIGATION LINKS
  // =========================================================

  const navLinks = [
    {
      id: "features",
      label: "Features",
      dropdown: [
        {
          id: "corporation-tax",
          label: "Corporation Tax",
          path: "/corporation-tax",
        },
        {
          id: "annual-accounts",
          label: "Annual Accounts",
          path: "/annual-accounts",
        },
        {
          id: "mtd-vat",
          label: "MTD VAT",
          path: "/mtd-vat",
        },
        {
          id: "self-assessment",
          label: "Self Assessment",
          path: "/self-assessment",
        },
        {
          id: "confirmation-statement",
          label: "Confirmation Statement",
          path: "/confirmation-statement",
        },
      ],
    },

    {
      id: "accountants",
      label: "For accountants",
      path: "/accountants",
    },

    {
      id: "pricing",
      label: "Pricing",
      path: "/pricing",
    },

    {
      id: "resources",
      label: "Resources",
      dropdown: [
        {
          id: "help",
          label: "Help",
          path: "/help",
        },
      ],
    },
  ];

  // =========================================================
  // DROPDOWN
  // =========================================================

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // =========================================================
  // CLICK OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInside = false;

      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedInside = true;
        }
      });

      if (!clickedInside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavigation = (path) => {
    setOpenDropdown(null);
    navigate(path);
  };

  // =========================================================
  // LOGO
  // =========================================================

  const TaxPilotLogo = () => {
    return (
      <motion.div
        className="
          flex
          cursor-pointer
          items-center
          gap-2.5
        "
        onClick={() => navigate("/")}
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                x: -20,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                x: 2,
              }
        }
      >
        {/* Paper Plane */}
        <motion.svg
          width="43"
          height="43"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: -4,
                  scale: 1.04,
                }
          }
          transition={{
            duration: 0.25,
          }}
        >
          <path
            d="M44 5L5 21.5L21.5 27L27 43L44 5Z"
            fill="#2563EB"
          />

          <path
            d="M5 21.5L44 5L21.5 27"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M21.5 27L27 43L44 5"
            stroke="#1D4ED8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Brand */}
        <span
          className="
            text-[28px]
            font-extrabold
            leading-none
            tracking-[-0.045em]
            text-[#10233F]
          "
        >
          TaxPilot
        </span>
      </motion.div>
    );
  };

  // =========================================================
  // DROPDOWN
  // =========================================================

  const renderDropdown = (item) => {
    if (!item.dropdown) return null;

    return (
      <AnimatePresence>
        {openDropdown === item.id && (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -6,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -5,
                    scale: 0.97,
                  }
            }
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-1/2
              top-full
              z-50
              mt-4
              w-[235px]
              -translate-x-1/2
              overflow-hidden
              rounded-[12px]
              border
              border-[#DFE7F0]
              bg-white
              p-2
              shadow-[0_15px_40px_rgba(15,39,71,0.13)]
            "
          >
            {item.dropdown.map((dropdownItem, index) => (
              <motion.div
                key={dropdownItem.id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -6,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.2,
                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.04,
                }}
              >
                <RouterLink
                  to={dropdownItem.path}
                  onClick={() => setOpenDropdown(null)}
                  className="
                    block
                    rounded-[7px]
                    px-4
                    py-2.5
                    text-[13px]
                    font-medium
                    text-[#334155]
                    transition-colors
                    duration-150
                    hover:bg-[#EEF5FF]
                    hover:text-[#2563EB]
                  "
                >
                  {dropdownItem.label}
                </RouterLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // =========================================================
  // DESKTOP NAV ITEM
  // =========================================================

  const renderNavItem = (item, index) => {
    const hasDropdown =
      item.dropdown && item.dropdown.length > 0;

    const isOpen = openDropdown === item.id;

    const isActive =
      item.path && location.pathname === item.path;

    return (
      <motion.div
        key={item.id}
        ref={(el) => {
          dropdownRefs.current[item.id] = el;
        }}
        className="relative"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: -10,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: shouldReduceMotion
            ? 0
            : 0.18 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {hasDropdown ? (
          <>
            <button
              type="button"
              onClick={() => toggleDropdown(item.id)}
              className={`
                group
                flex
                items-center
                gap-1
                whitespace-nowrap
                px-2
                py-2
                text-[13px]
                font-semibold
                tracking-[-0.01em]
                transition-colors
                duration-200
                ${
                  isOpen
                    ? "text-[#2563EB]"
                    : "text-[#10233F] hover:text-[#2563EB]"
                }
              `}
            >
              {item.label}

              <ChevronDown
                size={13}
                strokeWidth={2}
                className={`
                  transition-transform
                  duration-200
                  ${
                    isOpen
                      ? "rotate-180 text-[#2563EB]"
                      : "text-[#64748B] group-hover:text-[#2563EB]"
                  }
                `}
              />
            </button>

            {renderDropdown(item)}
          </>
        ) : (
          <button
            type="button"
            onClick={() => handleNavigation(item.path)}
            className={`
              relative
              whitespace-nowrap
              px-2
              py-2
              text-[13px]
              font-semibold
              tracking-[-0.01em]
              transition-colors
              duration-200
              ${
                isActive
                  ? "text-[#2563EB]"
                  : "text-[#10233F] hover:text-[#2563EB]"
              }
            `}
          >
            {item.label}

            {/* Active / hover underline */}
            <span
              className={`
                absolute
                bottom-0
                left-2
                right-2
                h-[2px]
                origin-left
                rounded-full
                bg-[#2563EB]
                transition-transform
                duration-250
                ${
                  isActive
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }
              `}
            />
          </button>
        )}
      </motion.div>
    );
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <motion.header
      className={`
        fixed
        left-0
        right-0
        top-0
        z-50
        w-full
        bg-white
        transition-all
        duration-300
        ${
          scrolled
            ? "border-b border-[#E5EBF2] shadow-[0_4px_18px_rgba(15,39,71,0.05)]"
            : "border-b border-transparent"
        }
      `}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: -12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* =====================================================
          DESKTOP / MAIN CONTAINER
          ===================================================== */}

      <div
        className="
          mx-auto
          grid
          h-[70px]
          w-full
          max-w-[1320px]
          grid-cols-[1fr_auto_1fr]
          items-center
          px-5
          sm:px-7
          lg:px-10
        "
      >

        {/* ===================================================
            LEFT - LOGO
            =================================================== */}

        <div className="flex items-center justify-start">
          <TaxPilotLogo />
        </div>


        {/* ===================================================
            CENTER - NAVIGATION
            =================================================== */}

        <nav
          className="
            hidden
            items-center
            justify-center
            gap-7
            lg:flex
          "
        >
          {navLinks.map((item, index) =>
            renderNavItem(item, index)
          )}
        </nav>


        {/* ===================================================
            RIGHT - LOGIN + GET STARTED
            =================================================== */}

        <div
          className="
            hidden
            items-center
            justify-end
            gap-5
            lg:flex
          "
        >

          {/* Login */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 10,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.45,
              delay: shouldReduceMotion ? 0 : 0.48,
            }}
          >
            <RouterLink
              to="/login"
              className="
                whitespace-nowrap
                text-[13px]
                font-semibold
                text-[#10233F]
                transition-colors
                duration-200
                hover:text-[#2563EB]
              "
            >
              Log in
            </RouterLink>
          </motion.div>


          {/* Get Started */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 15,
                    scale: 0.96,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.56,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RouterLink
              to="/register"
              className="
                group
                inline-flex
                h-[48px]
                min-w-[123px]
                items-center
                justify-center
                gap-2
                rounded-[7px]
                bg-[#2563EB]
                px-5
                text-[13px]
                font-semibold
                text-white
                shadow-[0_5px_14px_rgba(37,99,235,0.20)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:bg-[#1D4ED8]
                hover:shadow-[0_7px_18px_rgba(37,99,235,0.28)]
              "
            >
              <span>Get started</span>

              <ArrowRight
                size={16}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </RouterLink>
          </motion.div>

        </div>


        {/* ===================================================
            MOBILE
            =================================================== */}

        <motion.div
          className="
            col-start-3
            flex
            items-center
            justify-end
            gap-2
            lg:hidden
          "
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 10,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.45,
            delay: shouldReduceMotion ? 0 : 0.35,
          }}
        >

          {/* Mobile Login */}

          <RouterLink
            to="/login"
            className="
              hidden
              rounded-[6px]
              px-3
              py-2
              text-[13px]
              font-semibold
              text-[#10233F]
              transition-colors
              duration-200
              hover:text-[#2563EB]
              sm:block
            "
          >
            Log in
          </RouterLink>


          {/* Mobile menu */}

          <motion.button
            type="button"
            onClick={toggleMenu}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[7px]
              text-[#10233F]
              transition-colors
              hover:bg-[#EEF5FF]
              hover:text-[#2563EB]
            "
            aria-label="Open menu"
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.92,
                  }
            }
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.04,
                  }
            }
          >
            <Menu size={23} />
          </motion.button>

        </motion.div>

      </div>
    </motion.header>
  );
};

export default Navbar;