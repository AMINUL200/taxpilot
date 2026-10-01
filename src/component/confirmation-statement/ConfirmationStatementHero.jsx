import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Building2, CheckCircle2, Landmark } from "lucide-react";

const ConfirmationStatementHero = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: premiumEase, delay: 0.35 },
    },
  };

  const floatCardTopLeft = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -20, y: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: premiumEase, delay: 0.9 },
    },
  };

  const floatCardBottomRight = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 20, y: 10, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: premiumEase, delay: 1.05 },
    },
  };

  /* Statement rows — staggered with dividers */
  const statementRows = [
    { label: "Company", value: "ABC LIMITED", delay: 0.55 },
    { label: "Company number", value: "12345678", delay: 0.65 },
    { label: "Statement date", value: "30 September 2026", delay: 0.75 },
  ];

  const checkRows = [
    { label: "Company information", value: "Up to date", delay: 0.85 },
    { label: "PSC information", value: "Reviewed", delay: 0.95 },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background-soft">
      {/* ============================================================
          DECORATIVE BACKGROUND GLOWS
      ============================================================ */}

      {/* Top-right glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -top-24
          right-[-120px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-primary/10
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-left glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[-160px]
          left-[-100px]
          h-[320px]
          w-[320px]
          rounded-full
          bg-primary-light
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* Subtle mid navy glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/3
          top-1/2
          h-[280px]
          w-[280px]
          rounded-full
          bg-secondary/5
          blur-3xl
        "
      />

      {/* ============================================================
          MAIN CONTAINER
      ============================================================ */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ============================================================
              LEFT CONTENT
          ============================================================ */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUpVariants}
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-border
                bg-primary-light
                px-3
                py-1.5
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
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
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.10em] text-primary">
                Confirmation Statement
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="
                max-w-[560px]
                text-4xl
                font-bold
                leading-[1.1]
                tracking-[-0.02em]
                text-heading
                sm:text-5xl
                lg:text-[52px]
              "
            >
              Confirmation Statement{" "}
              <span className="relative inline-block">
                <span className="relative z-10">made simple</span>
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
                    bg-primary/15
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { scaleX: 0 }
                  }
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.85,
                    ease: premiumEase,
                    delay: 0.7,
                  }}
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="
                mt-5
                max-w-[500px]
                text-base
                leading-7
                text-text-secondary
                sm:text-lg
              "
            >
              Keep your company information up to date and file your
              Confirmation Statement with Companies House without the
              paperwork headache.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/register"
                  className="
                    group
                    btn-primary
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    px-6
                    py-3.5
                    text-sm
                  "
                >
                  <span>File your Confirmation Statement</span>
                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/help"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-border
                    bg-background
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-heading
                    transition-colors
                    duration-200
                    hover:border-primary/30
                    hover:bg-background-soft
                  "
                >
                  See how it works
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ============================================================
              RIGHT — DASHBOARD VISUAL
          ============================================================ */}

          <div className="relative mx-auto w-full max-w-[440px]">

            {/* Floating tag: Companies House */}
            <motion.div
              variants={floatCardTopLeft}
              initial="hidden"
              animate="visible"
              className="
                absolute
                -left-4
                -top-5
                z-20
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-background
                px-3.5
                py-2.5
                shadow-card
                sm:flex
              "
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Landmark className="h-4 w-4 text-primary" />
              </motion.span>
              <span className="text-xs font-semibold text-heading">
                Companies House
              </span>
            </motion.div>

            {/* Main card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.25 } }
              }
              className="
                relative
                rounded-2xl
                border
                border-border
                bg-background
                p-6
                shadow-card-hover
                sm:p-7
              "
            >
              {/* Card header */}
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <motion.div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary-light
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { scale: 0.6, rotate: -12, opacity: 0 }
                  }
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: 0.4,
                  }}
                >
                  <Building2 className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-heading">
                    Confirmation Statement
                  </p>
                  <p className="text-xs text-text-secondary">ABC LIMITED</p>
                </div>
              </div>

              {/* Statement rows */}
              <div className="mt-4 space-y-3 text-sm">
                {statementRows.map((row) => (
                  <motion.div
                    key={row.label}
                    className="flex items-center justify-between"
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -12 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: row.delay,
                      duration: 0.5,
                      ease: premiumEase,
                    }}
                  >
                    <span className="text-text-secondary">{row.label}</span>
                    <span className="font-semibold text-heading">
                      {row.value}
                    </span>
                  </motion.div>
                ))}

                {/* Check rows with spring icon */}
                {checkRows.map((row) => (
                  <motion.div
                    key={row.label}
                    className="flex items-center justify-between"
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: -12 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: row.delay,
                      duration: 0.5,
                      ease: premiumEase,
                    }}
                  >
                    <span className="text-text-secondary">{row.label}</span>
                    <motion.span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        font-semibold
                        text-primary
                      "
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.6 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.45,
                        ease: [0.34, 1.56, 0.64, 1],
                        delay: row.delay + 0.1,
                      }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {row.value}
                    </motion.span>
                  </motion.div>
                ))}

                {/* Filing status row */}
                <motion.div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    bg-background-soft
                    px-3
                    py-2.5
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.05,
                    duration: 0.5,
                    ease: premiumEase,
                  }}
                >
                  <span className="text-text-secondary">Filing status</span>
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-primary
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-text-white
                    "
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <motion.span
                        className="absolute inline-flex h-full w-full rounded-full bg-text-white opacity-75"
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
                  </span>
                </motion.div>
              </div>

              {/* CTA button */}
              <motion.button
                type="button"
                className="
                  group
                  btn-dark
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  py-3
                  text-sm
                "
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.15,
                  duration: 0.5,
                  ease: premiumEase,
                }}
                whileHover={
                  shouldReduceMotion ? undefined : { scale: 1.01 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.99 }
                }
              >
                <span>Review statement</span>
                <ArrowRight
                  className="
                    h-4
                    w-4
                    text-sky
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </motion.button>
            </motion.div>

            {/* Floating tag: Confirmation Statement READY */}
            <motion.div
              variants={floatCardBottomRight}
              initial="hidden"
              animate="visible"
              className="
                absolute
                -bottom-5
                -right-4
                z-20
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-background
                px-3.5
                py-2.5
                shadow-card
                sm:flex
              "
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-sky"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [1, 1.3, 1] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-xs font-semibold text-heading">
                Confirmation Statement READY
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementHero;