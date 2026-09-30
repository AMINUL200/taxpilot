import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Building2,
  UsersRound,
  Check,
  ArrowRight,
} from "lucide-react";

export default function PricingSection() {
  const shouldReduceMotion = useReducedMotion();

  const cards = [
    {
      badge: "For business owners and directors.",
      title: "Business",
      icon: Building2,
      features: [
        "Prepare and manage your business filings",
        "Keep your records organised",
        "Track deadlines in one place",
      ],
      cta: "Register interest",
    },
    {
      badge: "For accountants and bookkeepers.",
      title: "Accountant",
      icon: UsersRound,
      features: [
        "Manage multiple clients",
        "Keep track of deadlines and reviews",
        "A dedicated workspace for your practice",
      ],
      cta: "Register interest",
      featured: false,
    },
  ];

  // =========================================================
  // SECTION ANIMATION
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
        staggerChildren: 0.12,
      },
    },
  };

  // =========================================================
  // HEADER ANIMATION
  // =========================================================

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // =========================================================
  // CARD ANIMATION
  // =========================================================

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.97,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section-warm overflow-hidden">
      <div className="container-custom mx-auto px-4 py-14 md:py-16">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <motion.div
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="text-center"
        >

          <motion.h2
            variants={headerVariants}
            className="
              text-3xl
              font-extrabold
              tracking-[-0.035em]
              text-[var(--heading)]
              md:text-4xl
            "
          >
            A plan for the way you work.
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="
              mx-auto
              mt-3
              max-w-2xl
              leading-relaxed
              text-muted
            "
          >
            Simple, transparent plans for businesses and accountants.
          </motion.p>

        </motion.div>


        {/* =====================================================
            PRICING CARDS
            ===================================================== */}

        <motion.div
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mt-10
            grid
            gap-6
            md:grid-cols-2
          "
        >

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -7,
                        transition: {
                          duration: 0.25,
                          ease: "easeOut",
                        },
                      }
                }
                className={`
                  pricing-card
                  group
                  relative
                  overflow-hidden
                  ${
                    card.featured
                      ? "featured"
                      : ""
                  }
                `}
              >

                {/* =================================================
                    SUBTLE CARD LIGHT EFFECT
                    ================================================= */}

                <motion.div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-[#EEF5FF]
                    opacity-0
                  "
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          scale: 1.3,
                        }
                  }
                  transition={{
                    duration: 0.45,
                  }}
                />


                {/* =================================================
                    CARD CONTENT
                    ================================================= */}

                <div className="relative z-10">

                  {/* Header */}

                  <div className="flex items-start gap-4">

                    {/* Icon */}

                    <motion.div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[var(--bg-blue)]
                        text-[var(--primary)]
                      "
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: 1.08,
                              rotate: -4,
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 18,
                      }}
                    >
                      <Icon
                        size={27}
                        strokeWidth={1.8}
                      />
                    </motion.div>


                    {/* Title content */}

                    <div className="min-w-0">

                      <motion.div
                        className="
                          text-xs
                          font-bold
                          uppercase
                          tracking-widest
                          text-[var(--primary)]
                        "
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -8,
                              }
                        }
                        whileInView={
                          shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                x: 0,
                              }
                        }
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + index * 0.08,
                        }}
                      >
                        Pricing to be announced
                      </motion.div>


                      <h3
                        className="
                          mt-2
                          text-xl
                          font-extrabold
                          text-[var(--heading)]
                        "
                      >
                        {card.title}
                      </h3>


                      <p className="mt-1 text-sm text-muted">
                        {card.badge}
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      FEATURES
                      ================================================= */}

                  <div className="mt-6 space-y-3">

                    {card.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -12,
                              }
                        }
                        whileInView={
                          shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                x: 0,
                              }
                        }
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay:
                            0.25 +
                            index * 0.12 +
                            featureIndex * 0.09,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          flex
                          items-start
                          gap-3
                          text-sm
                          text-muted
                        "
                      >

                        {/* Check */}

                        <motion.span
                          className="
                            check-icon
                            mt-[1px]
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#EEF5FF]
                            text-[var(--primary)]
                          "
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  scale: 0,
                                }
                          }
                          whileInView={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  scale: 1,
                                }
                          }
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 18,
                            delay:
                              0.25 +
                              index * 0.12 +
                              featureIndex * 0.09,
                          }}
                        >
                          <Check
                            size={13}
                            strokeWidth={2.5}
                          />
                        </motion.span>


                        <span className="leading-relaxed">
                          {feature}
                        </span>

                      </motion.div>
                    ))}

                  </div>


                  {/* =================================================
                      CTA
                      ================================================= */}

                  <motion.button
                    type="button"
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
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.55 + index * 0.1,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.015,
                          }
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.98,
                          }
                    }
                    className="
                      group/btn
                      mt-7
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-[7px]
                      border
                      border-[var(--primary)]
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-[var(--primary)]
                      transition-colors
                      duration-200
                      hover:bg-[var(--primary)]
                      hover:text-white
                    "
                  >

                    <span>
                      {card.cta}
                    </span>

                    <motion.span
                      className="inline-flex"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              x: [0, 3, 0],
                            }
                      }
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight
                        size={16}
                        strokeWidth={2}
                      />
                    </motion.span>

                  </motion.button>

                </div>

              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
}