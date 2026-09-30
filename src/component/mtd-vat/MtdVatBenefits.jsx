import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, FileCheck2 } from "lucide-react";

const benefits = [
  "Spend less time preparing VAT returns",
  "Reduce manual calculations",
  "Keep digital VAT records organised",
  "Make HMRC submissions easier",
  "See your VAT position clearly",
  "Manage VAT online from anywhere",
];

const complianceItems = [
  "Digital records",
  "VAT calculations",
  "Return prepared",
  "HMRC submission",
];

const MtdVatBenefits = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Left column: heading, description, status card — cascade */
  const leftColumnVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
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

  const statusCardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  /* Right column: checklist cards — one by one */
  const checklistVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const benefitCardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 18, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  const checkIconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.5, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark">
      {/* ============================================================
          DECORATIVE BACKGROUND GLOWS
      ============================================================ */}

      {/* Top-right blue glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[-140px]
          h-[380px]
          w-[380px]
          rounded-full
          bg-sky
          opacity-[0.10]
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.08, 0.14, 0.08],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-left blue glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[-160px]
          left-[-100px]
          h-[340px]
          w-[340px]
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
                opacity: [0.07, 0.12, 0.07],
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

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          py-16
          sm:px-6
          sm:py-20
          lg:px-8
          lg:py-24
        "
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* ============================================================
              LEFT CONTENT
          ============================================================ */}

          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Heading */}
            <motion.h2
              variants={headingVariants}
              className="
                max-w-[420px]
                text-3xl
                font-bold
                leading-[1.1]
                tracking-[-0.03em]
                text-text-white
                sm:text-4xl
              "
            >
              Make VAT compliance{" "}
              <span className="relative inline-block">
                <span className="relative z-10">less complicated</span>
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

            {/* Description */}
            <motion.p
              variants={headingVariants}
              className="
                mt-4
                max-w-[420px]
                text-sm
                leading-6
                text-dark-muted
              "
            >
              Built to keep every VAT period on track, with your digital
              records and filings organised in one place.
            </motion.p>

            {/* VAT compliance status card */}
            <motion.div
              variants={statusCardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                      transition: { duration: 0.25 },
                    }
              }
              className="
                mt-8
                max-w-[360px]
                rounded-2xl
                border
                border-text-white/10
                bg-text-white/[0.04]
                p-5
                backdrop-blur-sm
                transition-colors
                duration-300
                hover:border-primary/40
                hover:bg-text-white/[0.06]
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-text-white">
                  VAT Compliance
                </span>

                {/* Status badge with pulse */}
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-primary/20
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-sky
                  "
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <motion.span
                      className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        rounded-full
                        bg-sky
                        opacity-75
                      "
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { scale: [1, 2.2], opacity: [0.75, 0] }
                      }
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky" />
                  </span>
                  READY
                </span>
              </div>

              <ul className="flex flex-col gap-2.5">
                {complianceItems.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex items-center justify-between"
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -10 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      ease: premiumEase,
                      delay: 0.6 + index * 0.1,
                    }}
                  >
                    <span className="text-xs text-dark-muted">{item}</span>
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
                        delay: 0.65 + index * 0.1,
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-sky" />
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ============================================================
              RIGHT — BENEFITS CHECKLIST (appear one by one)
          ============================================================ */}

          <motion.div
            variants={checklistVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit}
                variants={benefitCardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.25 },
                      }
                }
                className="
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-text-white/10
                  bg-text-white/[0.04]
                  px-4
                  py-3.5
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-primary/40
                  hover:bg-text-white/[0.07]
                "
              >
                {/* Check icon */}
                <motion.span
                  variants={checkIconVariants}
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/20
                    text-sky
                    transition-colors
                    duration-300
                    group-hover:bg-primary
                    group-hover:text-text-white
                    group-hover:shadow-button
                  "
                >
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
                </motion.span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-text-white
                    transition-colors
                    duration-200
                    group-hover:text-sky
                  "
                >
                  {benefit}
                </span>

                {/* Bottom accent line — draws in on hover */}
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-gradient-to-r
                    from-primary
                    to-sky
                    transition-[width]
                    duration-500
                    ease-out
                    group-hover:w-full
                  "
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MtdVatBenefits;