import React from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  FileText,
  FolderOpen,
  Home,
  Plus,
  Search,
  Send,
  Settings,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export default function AudienceSection() {
  const shouldReduceMotion = useReducedMotion();

  // =========================================================
  // SIDEBAR ITEMS
  // =========================================================

  const sidebarItems = [
    {
      label: "Home",
      icon: Home,
    },
    {
      label: "Clients",
      icon: UsersRound,
      active: true,
    },
    {
      label: "Filings",
      icon: FileText,
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
  // CLIENTS
  // =========================================================

  const clients = [
    {
      initials: "ET",
      name: "Example Trading Ltd",
      type: "Limited company",
      corporation: "Draft",
      vat: "In review",
      payroll: "Ready to review",
    },
    {
      initials: "DS",
      name: "Demo Services Ltd",
      type: "Limited company",
      corporation: "Draft",
      vat: "Draft",
      payroll: "Ready to review",
    },
  ];

  // =========================================================
  // MAIN SECTION ANIMATION
  // =========================================================

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // LEFT CONTENT ANIMATION
  // =========================================================

  const leftVariants = {
    hidden: {
      opacity: 0,
      x: -45,
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const leftChildVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // RIGHT DASHBOARD
  //
  // Dashboard itself appears FIRST.
  // Internal elements have their own delays.
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
  // DASHBOARD INTERNAL ANIMATION
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
        ease: [0.22, 1, 0.36, 1],
        delay: 0.75,
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
        ease: [0.22, 1, 0.36, 1],
        delay: 0.78,
      },
    },
  };

  // =========================================================
  // SIDEBAR LOGO
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
        ease: [0.22, 1, 0.36, 1],
        delay: 0.95,
      },
    },
  };

  // =========================================================
  // SIDEBAR MENU
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
        delay: 1.05 + index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // CLIENTS HEADING
  // 1.10s
  // =========================================================

  const clientsHeadingVariants = {
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
  // CLIENT CARD
  //
  // First  = 1.25s
  // Second = 1.90s
  // =========================================================

  const clientCardVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      scale: 0.97,
    },

    visible: (clientIndex) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: clientIndex === 0 ? 1.25 : 1.9,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // CLIENT AVATAR
  //
  // First  = 1.45s
  // Second = 2.10s
  // =========================================================

  const avatarVariants = {
    hidden: {
      opacity: 0,
      scale: 0.65,
      y: 5,
    },

    visible: (clientIndex) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 20,
        delay: clientIndex === 0 ? 1.45 : 2.1,
      },
    }),
  };

  // =========================================================
  // CORPORATION TAX
  //
  // First  = 1.55s
  // Second = 2.20s
  // =========================================================

  const corporationVariants = {
    hidden: {
      opacity: 0,
      y: 5,
      scale: 0.9,
    },

    visible: (clientIndex) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        delay: clientIndex === 0 ? 1.55 : 2.2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // VAT
  //
  // First  = 1.65s
  // Second = 2.30s
  // =========================================================

  const vatVariants = {
    hidden: {
      opacity: 0,
      y: 5,
      scale: 0.9,
    },

    visible: (clientIndex) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        delay: clientIndex === 0 ? 1.65 : 2.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // =========================================================
  // PAYROLL
  //
  // First  = 1.75s
  // Second = 2.40s
  // =========================================================

  const payrollVariants = {
    hidden: {
      opacity: 0,
      y: 5,
      scale: 0.9,
    },

    visible: (clientIndex) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        delay: clientIndex === 0 ? 1.75 : 2.4,
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

    visible: (clientIndex) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: clientIndex === 0 ? 1.82 : 2.47,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="section-white overflow-hidden">
      <div className="container-custom mx-auto px-4 py-14 md:py-16">
        <motion.div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.78fr_1.22fr]
            lg:gap-12
          "
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >
          {/* =====================================================
              LEFT CONTENT
              ===================================================== */}

          <motion.div
            className="max-w-[520px]"
            variants={leftVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {/* Label */}

            <motion.div
              variants={leftChildVariants}
              className="
                text-[12px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[var(--primary)]
              "
            >
              For accountants
            </motion.div>

            {/* Heading */}

            <motion.h2
              variants={leftChildVariants}
              className="
                mt-3
                text-[36px]
                font-extrabold
                leading-[1.08]
                tracking-[-0.035em]
                text-[var(--heading)]
                sm:text-[42px]
                lg:text-[43px]
              "
            >
              Every client. One clear view.
            </motion.h2>

            {/* Description */}

            <motion.p
              variants={leftChildVariants}
              className="
                mt-4
                max-w-[500px]
                text-[16px]
                leading-[1.55]
                text-[var(--text-secondary)]
              "
            >
              Bring client records, deadlines and reviews into one organised
              workspace.
            </motion.p>

            {/* CTA */}

            <motion.button
              type="button"
              variants={leftChildVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -2,
                      scale: 1.02,
                      boxShadow:
                        "0 10px 25px rgba(37,99,235,0.25)",
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
              className="
                group
                mt-6
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
                shadow-[0_6px_18px_rgba(37,99,235,0.20)]
              "
            >
              <span>Explore accountant tools</span>

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
                <ArrowRight
                  size={20}
                  strokeWidth={2}
                />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* =====================================================
              RIGHT ACCOUNTANT DASHBOARD
              ===================================================== */}

          <motion.div
            className="relative"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {/* =================================================
                BACKGROUND GLOW
                ================================================= */}

            <motion.div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-24
                h-[350px]
                w-[350px]
                rounded-full
                bg-[#edf5ff]
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: [0, 12, 0, -12, 0],
                      y: [0, -8, 0, 8, 0],
                      scale: [1, 1.03, 1, 0.98, 1],
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
                -bottom-20
                left-[-50px]
                h-[220px]
                w-[220px]
                rounded-full
                bg-[#f4f8fd]
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: [0, -8, 0, 8, 0],
                      y: [0, 7, 0, -7, 0],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                DASHBOARD CARD
                0.00s
                ================================================= */}

            <motion.div
              className="
                relative
                z-10
                overflow-hidden
                rounded-[16px]
                border
                border-[#d8e2ef]
                bg-white
                shadow-[0_18px_45px_rgba(15,39,71,0.13)]
              "
              variants={dashboardVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={
                shouldReduceMotion ? undefined : "visible"
              }
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
              {/* =================================================
                  TOP BAR
                  0.75s
                  ================================================= */}

              <div
                className="
                  flex
                  h-[57px]
                  items-center
                  justify-between
                  border-b
                  border-[#e4eaf2]
                  bg-white
                  px-4
                  sm:px-5
                "
              >
                {/* TaxPilot logo */}

                <motion.div
                  className="flex items-center gap-2"
                  variants={topBarLeftVariants}
                  initial={
                    shouldReduceMotion ? false : "hidden"
                  }
                  whileInView={
                    shouldReduceMotion ? undefined : "visible"
                  }
                  viewport={{
                    once: true,
                  }}
                >
                  <div
                    className="
                      flex
                      h-[30px]
                      w-[30px]
                      items-center
                      justify-center
                      rounded-[7px]
                      bg-[#0F2747]
                    "
                  >
                    <Send
                      size={15}
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
                      text-[13px]
                      font-bold
                      text-[#0F2747]
                    "
                  >
                    TaxPilot
                  </span>
                </motion.div>

                {/* Search + Add Client */}

                <motion.div
                  className="flex items-center gap-2"
                  variants={topBarRightVariants}
                  initial={
                    shouldReduceMotion ? false : "hidden"
                  }
                  whileInView={
                    shouldReduceMotion ? undefined : "visible"
                  }
                  viewport={{
                    once: true,
                  }}
                >
                  <div
                    className="
                      hidden
                      h-[32px]
                      w-[145px]
                      items-center
                      gap-2
                      rounded-[7px]
                      border
                      border-[#e0e7f0]
                      bg-[#fbfdff]
                      px-3
                      sm:flex
                    "
                  >
                    <Search
                      size={13}
                      className="text-[#94A3B8]"
                    />

                    <span className="text-[10px] text-[#94A3B8]">
                      Search clients...
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.04,
                          }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.96,
                          }
                    }
                    className="
                      flex
                      h-[33px]
                      items-center
                      gap-1.5
                      rounded-[6px]
                      bg-[#2563EB]
                      px-3
                      text-[10px]
                      font-semibold
                      text-white
                      shadow-[0_4px_10px_rgba(37,99,235,0.18)]
                    "
                  >
                    <Plus
                      size={14}
                      strokeWidth={2.5}
                    />

                    <span className="hidden sm:inline">
                      Add client
                    </span>
                  </motion.button>
                </motion.div>
              </div>

              {/* =================================================
                  DASHBOARD BODY
                  ================================================= */}

              <div className="grid grid-cols-[112px_1fr] sm:grid-cols-[136px_1fr]">

                {/* =================================================
                    SIDEBAR
                    ================================================= */}

                <aside
                  className="
                    min-h-[260px]
                    bg-[#0F2747]
                    px-2
                    py-4
                    sm:px-3
                  "
                >
                  {/* Sidebar Logo - 0.95s */}

                  <motion.div
                    className="mb-5 flex items-center gap-2 px-2"
                    variants={sidebarLogoVariants}
                    initial={
                      shouldReduceMotion ? false : "hidden"
                    }
                    whileInView={
                      shouldReduceMotion ? undefined : "visible"
                    }
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
                        hidden
                        text-[11px]
                        font-bold
                        text-white
                        sm:inline
                      "
                    >
                      TaxPilot
                    </span>
                  </motion.div>

                  {/* Navigation */}

                  <div className="space-y-1">
                    {sidebarItems.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.label}
                          custom={index}
                          variants={sidebarItemVariants}
                          initial={
                            shouldReduceMotion
                              ? false
                              : "hidden"
                          }
                          whileInView={
                            shouldReduceMotion
                              ? undefined
                              : "visible"
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
                                : "text-[#c7d4e5]"
                            }
                          `}
                        >
                          <Icon
                            size={14}
                            strokeWidth={1.8}
                          />

                          <span className="hidden sm:inline">
                            {item.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Settings */}

                  <motion.div
                    className="
                      mt-5
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
                      delay: 1.4,
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

                      <span className="hidden sm:inline">
                        Settings
                      </span>
                    </div>
                  </motion.div>
                </aside>

                {/* =================================================
                    CLIENT CONTENT
                    ================================================= */}

                <main className="bg-[#fbfdff] p-4 sm:p-5">

                  {/* Clients heading - 1.10s */}

                  <motion.div
                    className="mb-4"
                    variants={clientsHeadingVariants}
                    initial={
                      shouldReduceMotion
                        ? false
                        : "hidden"
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : "visible"
                    }
                    viewport={{
                      once: true,
                    }}
                  >
                    <h3
                      className="
                        text-[17px]
                        font-bold
                        tracking-[-0.02em]
                        text-[#10233F]
                        sm:text-[19px]
                      "
                    >
                      Clients
                    </h3>
                  </motion.div>

                  {/* Client rows */}

                  <div className="space-y-2">
                    {clients.map((client, clientIndex) => (
                      <motion.div
                        key={client.name}
                        custom={clientIndex}
                        variants={clientCardVariants}
                        initial={
                          shouldReduceMotion
                            ? false
                            : "hidden"
                        }
                        whileInView={
                          shouldReduceMotion
                            ? undefined
                            : "visible"
                        }
                        viewport={{
                          once: true,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -2,
                                boxShadow:
                                  "0 7px 18px rgba(15,39,71,0.07)",
                              }
                        }
                        className="
                          group
                          rounded-[9px]
                          border
                          border-[#e1e8f1]
                          bg-white
                          px-3
                          py-3
                        "
                      >
                        <div
                          className="
                            grid
                            grid-cols-[1fr]
                            gap-3
                            md:grid-cols-[1.4fr_1fr_1fr_1fr_18px]
                            md:items-center
                          "
                        >
                          {/* =================================================
                              CLIENT
                              ================================================= */}

                          <div className="flex items-center gap-2.5">

                            {/* Avatar */}

                            <motion.div
                              custom={clientIndex}
                              variants={avatarVariants}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : "hidden"
                              }
                              whileInView={
                                shouldReduceMotion
                                  ? undefined
                                  : "visible"
                              }
                              viewport={{
                                once: true,
                              }}
                              className="
                                flex
                                h-[34px]
                                w-[34px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#E8F1FF]
                                text-[10px]
                                font-bold
                                text-[#2563EB]
                              "
                            >
                              {client.initials}
                            </motion.div>

                            <div className="min-w-0">
                              <div
                                className="
                                  truncate
                                  text-[11px]
                                  font-bold
                                  text-[#10233F]
                                  sm:text-[12px]
                                "
                              >
                                {client.name}
                              </div>

                              <div
                                className="
                                  mt-0.5
                                  text-[9px]
                                  text-[#94A3B8]
                                "
                              >
                                {client.type}
                              </div>
                            </div>

                          </div>

                          {/* =================================================
                              CORPORATION TAX
                              ================================================= */}

                          <div className="flex items-center justify-between md:block">

                            <span
                              className="
                                text-[9px]
                                text-[#64748B]
                                md:mb-1
                                md:block
                              "
                            >
                              Corporation Tax
                            </span>

                            <motion.span
                              custom={clientIndex}
                              variants={corporationVariants}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : "hidden"
                              }
                              whileInView={
                                shouldReduceMotion
                                  ? undefined
                                  : "visible"
                              }
                              viewport={{
                                once: true,
                              }}
                              className="
                                inline-flex
                                rounded-[5px]
                                bg-[#EEF5FF]
                                px-2
                                py-1
                                text-[8px]
                                font-semibold
                                text-[#2563EB]
                              "
                            >
                              {client.corporation}
                            </motion.span>

                          </div>

                          {/* =================================================
                              VAT
                              ================================================= */}

                          <div className="flex items-center justify-between md:block">

                            <span
                              className="
                                text-[9px]
                                text-[#64748B]
                                md:mb-1
                                md:block
                              "
                            >
                              VAT return
                            </span>

                            <motion.span
                              custom={clientIndex}
                              variants={vatVariants}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : "hidden"
                              }
                              whileInView={
                                shouldReduceMotion
                                  ? undefined
                                  : "visible"
                              }
                              viewport={{
                                once: true,
                              }}
                              className="
                                inline-flex
                                rounded-[5px]
                                bg-[#EEF5FF]
                                px-2
                                py-1
                                text-[8px]
                                font-semibold
                                text-[#2563EB]
                              "
                            >
                              {client.vat}
                            </motion.span>

                          </div>

                          {/* =================================================
                              PAYROLL
                              ================================================= */}

                          <div className="flex items-center justify-between md:block">

                            <span
                              className="
                                text-[9px]
                                text-[#64748B]
                                md:mb-1
                                md:block
                              "
                            >
                              Payroll
                            </span>

                            <motion.span
                              custom={clientIndex}
                              variants={payrollVariants}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : "hidden"
                              }
                              whileInView={
                                shouldReduceMotion
                                  ? undefined
                                  : "visible"
                              }
                              viewport={{
                                once: true,
                              }}
                              className="
                                inline-flex
                                rounded-[5px]
                                bg-[#EEF5FF]
                                px-2
                                py-1
                                text-[8px]
                                font-semibold
                                text-[#2563EB]
                              "
                            >
                              {client.payroll}
                            </motion.span>

                          </div>

                          {/* =================================================
                              ARROW
                              ================================================= */}

                          <motion.div
                            custom={clientIndex}
                            variants={arrowVariants}
                            initial={
                              shouldReduceMotion
                                ? false
                                : "hidden"
                            }
                            whileInView={
                              shouldReduceMotion
                                ? undefined
                                : "visible"
                            }
                            viewport={{
                              once: true,
                            }}
                            className="hidden md:block"
                          >
                            <ChevronRight
                              size={15}
                              className="
                                text-[#94A3B8]
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                              "
                            />
                          </motion.div>

                        </div>
                      </motion.div>
                    ))}
                  </div>

                </main>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}