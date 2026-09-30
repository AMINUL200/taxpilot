import React from "react";
import { ArrowRight, Send } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion();

  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.985,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
      },
    },
  };

  const contentVariants = {
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

  const buttonVariants = {
    hidden: {
      opacity: 0,
      x: 18,
      scale: 0.96,
    },

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="container-custom mx-auto px-4 py-8 md:py-10">

      {/* =====================================================
          CTA CONTAINER
          ===================================================== */}

      <motion.div
        className="
          cta-section
          relative
          min-h-[125px]
          overflow-hidden
          rounded-[18px]
          px-7
          py-6
          md:px-11
          md:py-7
        "
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -2,
                transition: {
                  duration: 0.25,
                  ease: "easeOut",
                },
              }
        }
      >

        {/* ===================================================
            DECORATIVE CURVE 01
            =================================================== */}

        <motion.div
          className="
            absolute
            right-[250px]
            top-[-120px]
            h-[330px]
            w-[330px]
            rounded-full
            border-[70px]
            border-[#173B70]
            opacity-80
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 6, 0, -6, 0],
                  x: [0, 8, 0, -8, 0],
                  y: [0, 4, 0, -4, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        {/* ===================================================
            DECORATIVE CURVE 02
            =================================================== */}

        <motion.div
          className="
            absolute
            right-[125px]
            top-[-105px]
            h-[300px]
            w-[300px]
            rounded-full
            border-[55px]
            border-[#1E4C8F]
            opacity-70
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, -7, 0, 7, 0],
                  x: [0, -6, 0, 6, 0],
                }
          }
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        {/* ===================================================
            DECORATIVE CURVE 03
            =================================================== */}

        <motion.div
          className="
            absolute
            right-[25px]
            top-[-90px]
            h-[280px]
            w-[280px]
            rounded-full
            border-[45px]
            border-[#255BA8]
            opacity-40
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: [0, 8, 0, -8, 0],
                  scale: [1, 1.025, 1, 0.975, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        {/* ===================================================
            SUBTLE LIGHT SHINE
            =================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            -left-[120px]
            top-0
            h-full
            w-[120px]
            skew-x-[-18deg]
            bg-white/5
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: ["0%", "900%"],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />


        {/* ===================================================
            CONTENT
            =================================================== */}

        <motion.div
          className="
            relative
            z-10
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
          variants={containerVariants}
        >

          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <div className="max-w-[720px]">

            <motion.h3
              variants={contentVariants}
              className="
                text-[25px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.02em]
                text-white
                md:text-[28px]
              "
            >
              Make room for your business.
            </motion.h3>


            <motion.p
              variants={contentVariants}
              className="
                mt-2
                text-[14px]
                leading-[1.5]
                text-[#D7E2F1]
                md:text-[15px]
              "
            >
              Take control of your tax and compliance, with a platform built
              for what&apos;s next.
            </motion.p>

          </div>


          {/* =================================================
              RIGHT CONTENT
              ================================================= */}

          <motion.div
            variants={contentVariants}
            className="
              relative
              z-20
              flex
              shrink-0
              items-center
              gap-7
            "
          >

            {/* ===============================================
                CTA BUTTON
                =============================================== */}

            <motion.button
              type="button"
              variants={buttonVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.035,
                      y: -2,
                      boxShadow:
                        "0 12px 28px rgba(37,99,235,0.38)",
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                      y: 0,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
              className="
                group
                inline-flex
                h-[56px]
                min-w-[190px]
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
                shadow-[0_6px_18px_rgba(37,99,235,0.28)]
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
                <ArrowRight
                  size={20}
                  strokeWidth={2}
                />
              </motion.span>
            </motion.button>


            {/* ===============================================
                TAXPILOT PAPER PLANE
                =============================================== */}

            <motion.div
              className="
                hidden
                items-center
                justify-center
                md:flex
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -7, 0, 5, 0],
                      rotate: [-12, -8, -12, -15, -12],
                    }
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.12,
                      rotate: -18,
                    }
              }
            >
              <Send
                size={58}
                strokeWidth={1.5}
                className="
                  rotate-[-12deg]
                
                  drop-shadow-[0_5px_10px_rgba(37,99,235,0.25)]
                "
              />
            </motion.div>

          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}