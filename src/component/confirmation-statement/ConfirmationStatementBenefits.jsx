import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const ConfirmationStatementBenefits = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const benefits = [
    "Save time on annual company filings",
    "Keep important company information organised",
    "Reduce manual paperwork",
    "Review your information before filing",
    "Make Companies House filing easier",
    "Manage your company compliance online",
  ];

  const checklist = [
    "Company details",
    "Directors",
    "Shareholders",
    "PSC information",
    "Confirmation Statement",
  ];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Left column: heading + benefit list — cascade */
  const leftColumnVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  const benefitItemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  const checkIconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.5, rotate: -18 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.45,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  /* Right column: compliance card */
  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: premiumEase, delay: 0.2 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-dark">
      {/* ============================================================
          DECORATIVE BACKGROUND GLOWS
      ============================================================ */}

      {/* Top-right glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          right-[-100px]
          top-[-150px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-sky
          opacity-[0.08]
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.08, 0.14, 0.08],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-left glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-[-120px]
          h-[400px]
          w-[400px]
          rounded-full
          bg-sky
          opacity-[0.06]
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.06, 0.12, 0.06],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* ============================================================
          MAIN CONTAINER
      ============================================================ */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* ============================================================
              LEFT — BENEFITS LIST
          ============================================================ */}

          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Heading */}
            <motion.h2
              variants={headingVariants}
              className="
                max-w-[440px]
                text-3xl
                font-bold
                leading-[1.1]
                tracking-[-0.02em]
                text-text-white
                sm:text-4xl
              "
            >
              Make company{" "}
              <span className="relative inline-block">
                <span className="relative z-10">compliance easier</span>
                <motion.span
                  className="
                    absolute
                    bottom-1
                    left-0
                    z-0
                    h-[10px]
                    w-full
                    origin-left
                    rounded-sm
                    bg-primary/40
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { scaleX: 0 }
                  }
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    ease: premiumEase,
                    delay: 0.5,
                  }}
                />
              </span>
            </motion.h2>

            {/* Benefits grid */}
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <motion.li
                  key={benefit}
                  variants={benefitItemVariants}
                  className="flex items-start gap-2.5"
                >
                  {/* Check icon */}
                  <motion.span
                    variants={checkIconVariants}
                    className="mt-0.5 shrink-0"
                  >
                    <CheckCircle2
                      className="h-4 w-4 text-sky"
                      strokeWidth={2.4}
                    />
                  </motion.span>

                  <span className="text-sm leading-5 text-text-white/90">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ============================================================
              RIGHT — COMPLIANCE STATUS CARD
          ============================================================ */}

          <div className="mx-auto w-full max-w-[400px]">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.25 } }
              }
              className="
                rounded-2xl
                border
                border-text-white/10
                bg-text-white/5
                p-6
                backdrop-blur-sm
                transition-colors
                duration-300
                hover:border-primary/40
                sm:p-7
              "
            >
              {/* Card heading */}
              <motion.p
                className="text-sm font-bold text-text-white"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 10 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: premiumEase,
                  delay: 0.4,
                }}
              >
                Company Compliance
              </motion.p>

              {/* Checklist rows */}
              <div className="mt-4 space-y-3">
                {checklist.map((item, index) => (
                  <motion.div
                    key={item}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-text-white/10
                      pb-3
                      text-sm
                      last:border-0
                      last:pb-0
                    "
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -12 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      ease: premiumEase,
                      delay: 0.5 + index * 0.1,
                    }}
                  >
                    <span className="text-text-white/80">{item}</span>
                    <motion.span
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.5, rotate: -18 }
                      }
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        ease: [0.34, 1.56, 0.64, 1],
                        delay: 0.55 + index * 0.1,
                      }}
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-sky"
                        strokeWidth={2.4}
                      />
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Status row */}
              <motion.div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  bg-text-white/10
                  px-4
                  py-3
                "
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 10 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: premiumEase,
                  delay: 1.15,
                }}
              >
                <span
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-text-white/70
                  "
                >
                  Status
                </span>
                <motion.span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-primary
                    px-3
                    py-1
                    text-[11px]
                    font-bold
                    text-text-white
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, scale: 0.85 }
                  }
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.3,
                    duration: 0.4,
                    ease: premiumEase,
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <motion.span
                      className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        rounded-full
                        bg-text-white
                        opacity-75
                      "
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { scale: [1, 2], opacity: [0.75, 0] }
                      }
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-text-white" />
                  </span>
                  Ready to file
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementBenefits;