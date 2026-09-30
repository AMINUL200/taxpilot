import React from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  FileText,
  FolderOpen,
  Home,
  Search,
  Send,
  Settings,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // =========================================================
  // SIDEBAR ITEMS
  // =========================================================

  const sidebarItems = [
    {
      label: "Home",
      icon: Home,
      active: true,
    },
    {
      label: "Filings",
      icon: FileText,
    },
    {
      label: "Clients",
      icon: UsersRound,
    },
    {
      label: "Documents",
      icon: FolderOpen,
    },
    {
      label: "Deadlines",
      icon: CalendarDays,
    },
    {
      label: "Reports",
      icon: BarChart3,
    },
  ];

  // =========================================================
  // FILING ITEMS
  // =========================================================

  const filingItems = [
    {
      title: "Corporation Tax",
      description: "Prepare your return and supporting accounts.",
      status: "Draft",
    },
    {
      title: "VAT return",
      description: "Organise your records and review your return.",
      status: "In review",
    },
    {
      title: "Payroll",
      description: "Manage pay runs and employee records.",
      status: "Ready to review",
    },
  ];

  // =========================================================
  // LEFT HERO ANIMATION
  // =========================================================

  const heroLeftVariants = {
    hidden: {
      opacity: 0,
      x: -35,
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
      },
    },
  };

  const heroChildVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // RIGHT DASHBOARD
  //
  // 0.00s Dashboard
  // =========================================================

  const dashboardVariants = {
    hidden: {
      opacity: 0,
      x: 55,
      scale: 0.94,
    },

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // TOP BAR
  //
  // 0.75s
  // =========================================================

  const topBarLeftVariants = {
    hidden: {
      opacity: 0,
      x: -12,
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        delay: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const topBarRightVariants = {
    hidden: {
      opacity: 0,
      x: 12,
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // SIDEBAR LOGO
  //
  // 0.95s
  // =========================================================

  const sidebarLogoVariants = {
    hidden: {
      opacity: 0,
      x: -12,
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.95,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // SIDEBAR ITEMS
  //
  // 1.05s+
  // =========================================================

  const sidebarItemVariants = {
    hidden: {
      opacity: 0,
      x: -12,
    },

    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        delay: 1.05 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // DASHBOARD HEADING
  //
  // 1.10s
  // =========================================================

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // FILING CARD
  //
  // Corporation Tax = 1.25s
  // VAT            = 1.90s
  // Payroll        = 2.55s
  // =========================================================

  const filingCardVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      scale: 0.97,
    },

    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index === 0 ? 1.25 : index === 1 ? 1.9 : 2.55,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // FILING ICON
  //
  // Corporation Tax = 1.45s
  // VAT            = 2.10s
  // Payroll        = 2.75s
  // =========================================================

  const filingIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.65,
      y: 5,
    },

    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        delay: index === 0 ? 1.45 : index === 1 ? 2.1 : 2.75,
      },
    }),
  };

  // =========================================================
  // FILING CONTENT
  //
  // Corporation Tax = 1.55s
  // VAT            = 2.20s
  // Payroll        = 2.85s
  // =========================================================

  const filingContentVariants = {
    hidden: {
      opacity: 0,
      x: 10,
    },

    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: index === 0 ? 1.55 : index === 1 ? 2.2 : 2.85,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // FILING STATUS
  //
  // Corporation Tax = 1.65s
  // VAT            = 2.30s
  // Payroll        = 2.95s
  // =========================================================

  const filingStatusVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 5,
    },

    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.35,
        delay: index === 0 ? 1.65 : index === 1 ? 2.3 : 2.95,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // ARROW
  // =========================================================

  const arrowVariants = {
    hidden: {
      opacity: 0,
      x: -5,
    },

    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: index === 0 ? 1.7 : index === 1 ? 2.35 : 3.0,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="hero-section relative overflow-hidden pt-24">
      {/* =====================================================
          BACKGROUND DECORATION
          ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[-120px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#dceaff]
          opacity-90
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 12, 0, -12, 0],
                y: [0, -8, 0, 8, 0],
                scale: [1, 1.025, 1, 0.985, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[21%]
          bottom-[20px]
          h-[250px]
          w-[250px]
          rounded-full
          bg-[#edf5ff]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -8, 0, 8, 0],
                y: [0, 6, 0, -6, 0],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[35%]
          bottom-[-130px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#e8f2ff]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 8, 0, -8, 0],
                scale: [1, 1.02, 1, 0.98, 1],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          MAIN HERO
          ===================================================== */}

      <div className="container-custom relative z-10 mx-auto px-4">
        <div
          className="
            grid
            min-h-[500px]
            items-center
            gap-8
            py-10
            md:grid-cols-[0.82fr_1.18fr]
            md:gap-5
            md:py-5
            lg:min-h-[505px]
          "
        >
          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <motion.div
            className="relative z-20 max-w-[540px]"
            variants={heroLeftVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{
              once: true,
              amount: 0.3,
            }}
          >
            {/* Heading */}

            <motion.h1
              variants={heroChildVariants}
              className="
                text-[46px]
                font-extrabold
                leading-[1.02]
                tracking-[-0.045em]
                text-[var(--heading)]
                sm:text-[54px]
                md:text-[50px]
                lg:text-[58px]
              "
            >
              Your tax.
              <br />
              Clearly in control.
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={heroChildVariants}
              className="
                mt-5
                max-w-[510px]
                text-[18px]
                leading-[1.45]
                text-[var(--text-secondary)]
                sm:text-[19px]
              "
            >
              Prepare, review and manage your business filings in one place.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={heroChildVariants}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              {/* Get Started */}

              <motion.button
                type="button"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.02,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                className="
                  group
                  inline-flex
                  h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-[7px]
                  border
                  border-[#2563EB]
                  bg-[#2563EB]
                  px-7
                  text-[15px]
                  font-semibold
                  text-white
                  shadow-[0_7px_18px_rgba(37,99,235,0.22)]
                  transition-colors
                  duration-200
                  hover:bg-[#1D4ED8]
                "
              >
                <span>Get started</span>

                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: [0, 3, 0],
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={19} strokeWidth={2} />
                </motion.span>
              </motion.button>

              {/* Explore */}

              <motion.button
                type="button"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        backgroundColor: "#EEF5FF",
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                className="
                  inline-flex
                  h-[54px]
                  items-center
                  justify-center
                  rounded-[7px]
                  border
                  border-[#2563EB]
                  bg-white
                  px-7
                  text-[15px]
                  font-semibold
                  text-[#2563EB]
                "
              >
                Explore the platform
              </motion.button>
            </motion.div>

            {/* Supporting text */}

            <motion.p
              variants={heroChildVariants}
              className="
                mt-5
                text-[14px]
                font-medium
                text-[#64748B]
              "
            >
              For businesses and accountants
            </motion.p>
          </motion.div>

          {/* =================================================
              RIGHT PRODUCT MOCKUP
              ================================================= */}

          <div className="relative z-10 mt-5 md:mt-0">
            {/* Large blue circle */}

            <motion.div
              className="
                pointer-events-none
                absolute
                -right-[40px]
                -top-[80px]
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#d9e8fb]
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: [0, 10, 0, -10, 0],
                      y: [0, -7, 0, 7, 0],
                      scale: [1, 1.025, 1, 0.985, 1],
                    }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Secondary circle */}

            <motion.div
              className="
                pointer-events-none
                absolute
                -bottom-[70px]
                left-[10px]
                h-[180px]
                w-[180px]
                rounded-full
                bg-[#eef5ff]
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: [0, -7, 0, 7, 0],
                      y: [0, 5, 0, -5, 0],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =============================================
                DASHBOARD WINDOW
                0.00s
                ============================================= */}

            <motion.div
              className="
                relative
                z-20
                ml-auto
                w-full
                max-w-[700px]
                overflow-hidden
                rounded-[16px]
                border
                border-[#d8e2ef]
                bg-white
                shadow-[0_24px_60px_rgba(15,39,71,0.16)]
              "
              variants={dashboardVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }
              }
            >
              {/* =============================================
                  DASHBOARD TOPBAR
                  ============================================= */}

              <div
                className="
                  flex
                  h-[58px]
                  items-center
                  justify-between
                  border-b
                  border-[#e5ebf3]
                  bg-white
                  px-4
                  sm:px-5
                "
              >
                {/* Logo */}

                <motion.div
                  className="flex items-center gap-2"
                  variants={topBarLeftVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={{
                    once: true,
                  }}
                >
                  <div
                    className="
                      flex
                      h-[31px]
                      w-[31px]
                      items-center
                      justify-center
                      rounded-[7px]
                      bg-[#0F2747]
                    "
                  >
                    <Send
                      size={16}
                      strokeWidth={2}
                      className="
                        rotate-[-12deg]
                        fill-white
                        text-white
                      "
                    />
                  </div>

                  <span
                    className="
                      text-[14px]
                      font-bold
                      text-[#0F2747]
                    "
                  >
                    TaxPilot
                  </span>
                </motion.div>

                {/* Search + profile */}

                <motion.div
                  className="flex items-center gap-3"
                  variants={topBarRightVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={{
                    once: true,
                  }}
                >
                  <div
                    className="
                      hidden
                      h-[32px]
                      w-[150px]
                      items-center
                      gap-2
                      rounded-[7px]
                      border
                      border-[#e1e8f1]
                      bg-[#fbfdff]
                      px-3
                      sm:flex
                    "
                  >
                    <Search size={13} className="text-[#94A3B8]" />

                    <span className="text-[10px] text-[#94A3B8]">
                      Search...
                    </span>
                  </div>

                  <motion.div
                    className="
                      flex
                      h-[31px]
                      w-[31px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#dceaff]
                      text-[11px]
                      font-bold
                      text-[#1D4ED8]
                    "
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 0.7,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            scale: 1,
                          }
                    }
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.85,
                    }}
                  >
                    A
                  </motion.div>
                </motion.div>
              </div>

              {/* =============================================
                  DASHBOARD BODY
                  ============================================= */}

              <div className="grid grid-cols-[118px_1fr] sm:grid-cols-[145px_1fr]">
                {/* =========================================
                    SIDEBAR
                    ========================================= */}

                <aside
                  className="
                    min-h-[365px]
                    bg-[#0F2747]
                    px-2.5
                    py-4
                    sm:px-3
                  "
                >
                  {/* Sidebar Logo - 0.95s */}

                  <motion.div
                    className="
                      mb-5
                      flex
                      items-center
                      gap-2
                      px-2
                    "
                    variants={sidebarLogoVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{
                      once: true,
                    }}
                  >
                    <Send
                      size={14}
                      strokeWidth={2}
                      className="
                        rotate-[-12deg]
                        fill-white
                        text-white
                      "
                    />

                    <span
                      className="
                        text-[11px]
                        font-bold
                        text-white
                      "
                    >
                      TaxPilot
                    </span>
                  </motion.div>

                  {/* Sidebar Navigation */}

                  <div className="space-y-1">
                    {sidebarItems.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.label}
                          custom={index}
                          variants={sidebarItemVariants}
                          initial={shouldReduceMotion ? false : "hidden"}
                          whileInView={
                            shouldReduceMotion ? undefined : "visible"
                          }
                          viewport={{
                            once: true,
                          }}
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  x: 2,
                                }
                          }
                          className={`
                            flex
                            h-[34px]
                            items-center
                            gap-2
                            rounded-[6px]
                            px-2
                            text-[10px]
                            font-medium
                            ${
                              item.active
                                ? "bg-[#2563EB] text-white"
                                : "text-[#c7d4e5] hover:bg-white/10"
                            }
                          `}
                        >
                          <Icon size={14} strokeWidth={1.8} />

                          <span className="hidden sm:inline">{item.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Sidebar bottom */}

                  <motion.div
                    className="
                      mt-8
                      border-t
                      border-white/10
                      pt-3
                    "
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                          }
                    }
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 1.45,
                    }}
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        px-2
                        text-[10px]
                        text-[#c7d4e5]
                      "
                    >
                      <Settings size={13} />

                      <span className="hidden sm:inline">Settings</span>
                    </div>
                  </motion.div>
                </aside>

                {/* =========================================
                    MAIN DASHBOARD
                    ========================================= */}

                <main className="bg-[#fbfdff] p-4 sm:p-5">
                  {/* Heading - 1.10s */}

                  <motion.div
                    className="mb-4 flex items-center justify-between"
                    variants={headingVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{
                      once: true,
                    }}
                  >
                    <div>
                      <h2
                        className="
                          text-[17px]
                          font-bold
                          tracking-[-0.02em]
                          text-[#10233F]
                          sm:text-[19px]
                        "
                      >
                        Your business overview
                      </h2>
                    </div>
                  </motion.div>

                  {/* =========================================
                      FILING CARDS
                      ========================================= */}

                  <div className="space-y-2.5">
                    {filingItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        custom={index}
                        variants={filingCardVariants}
                        initial={shouldReduceMotion ? false : "hidden"}
                        whileInView={shouldReduceMotion ? undefined : "visible"}
                        viewport={{
                          once: true,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -2,
                                boxShadow: "0 7px 18px rgba(15,39,71,0.07)",
                              }
                        }
                        className="
                          group
                          flex
                          min-h-[82px]
                          items-center
                          gap-3
                          rounded-[10px]
                          border
                          border-[#e1e8f1]
                          bg-white
                          px-3
                          py-3
                          shadow-[0_2px_8px_rgba(15,39,71,0.03)]
                          transition-colors
                          duration-200
                          hover:border-[#cbdcf1]
                          sm:px-4
                        "
                      >
                        {/* Filing icon */}

                        <motion.div
                          custom={index}
                          variants={filingIconVariants}
                          initial={shouldReduceMotion ? false : "hidden"}
                          whileInView={
                            shouldReduceMotion ? undefined : "visible"
                          }
                          viewport={{
                            once: true,
                          }}
                          className="
                            flex
                            h-[38px]
                            w-[38px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-[8px]
                            bg-[#EEF5FF]
                            text-[#2563EB]
                          "
                        >
                          <FileText size={20} strokeWidth={1.8} />
                        </motion.div>

                        {/* Text */}

                        <motion.div
                          className="min-w-0 flex-1"
                          custom={index}
                          variants={filingContentVariants}
                          initial={shouldReduceMotion ? false : "hidden"}
                          whileInView={
                            shouldReduceMotion ? undefined : "visible"
                          }
                          viewport={{
                            once: true,
                          }}
                        >
                          <h3
                            className="
                              truncate
                              text-[12px]
                              font-bold
                              text-[#10233F]
                              sm:text-[13px]
                            "
                          >
                            {item.title}
                          </h3>

                          <p
                            className="
                              mt-1
                              max-w-[290px]
                              text-[9px]
                              leading-[1.35]
                              text-[#64748B]
                              sm:text-[10px]
                            "
                          >
                            {item.description}
                          </p>
                        </motion.div>

                        {/* Status */}

                        <motion.div
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-1.5
                          "
                          custom={index}
                          variants={filingStatusVariants}
                          initial={shouldReduceMotion ? false : "hidden"}
                          whileInView={
                            shouldReduceMotion ? undefined : "visible"
                          }
                          viewport={{
                            once: true,
                          }}
                        >
                          <span
                            className="
                              hidden
                              rounded-[5px]
                              bg-[#EEF5FF]
                              px-2
                              py-1
                              text-[8px]
                              font-semibold
                              text-[#2563EB]
                              sm:inline-block
                            "
                          >
                            {item.status}
                          </span>

                          <motion.span
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : {
                                    x: [0, 2, 0],
                                  }
                            }
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut",
                            }}
                          >
                            <ChevronRight
                              size={14}
                              className="
                                text-[#94A3B8]
                                transition-transform
                                duration-200
                                group-hover:translate-x-0.5
                              "
                            />
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </main>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =====================================================
    BOTTOM PRODUCT STRIP
    ===================================================== */}

      <motion.div
        className="
    relative
    z-20
    border-t
    border-[#dfe8f3]
    bg-[#eef5ff]
  "
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 10,
              }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="
      container-custom
      mx-auto
      flex
      min-h-[54px]
      items-center
      justify-center
      gap-5
      px-4
      text-[12px]
      font-medium
      text-[#64748B]
      sm:gap-7
      sm:text-[13px]
      md:gap-8
    "
        >
          {/* Corporation Tax */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Corporation Tax
          </motion.span>

          {/* Separator */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.5,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.3,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#94A3B8]"
          >
            /
          </motion.span>

          {/* VAT */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            VAT
          </motion.span>

          {/* Separator */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.5,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.3,
              delay: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#94A3B8]"
          >
            /
          </motion.span>

          {/* Payroll */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              delay: 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Payroll
          </motion.span>

          {/* Separator */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.5,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.3,
              delay: 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[#94A3B8]"
          >
            /
          </motion.span>

          {/* Companies House */}

          <motion.span
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              delay: 1.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Companies House
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
