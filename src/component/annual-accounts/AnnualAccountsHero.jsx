import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  FileCheck2,
  Building2,
  ClipboardCheck,
} from "lucide-react";

const AnnualAccountsHero = () => {
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

  const floatCardRight = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 24, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: premiumEase, delay: 1.2 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-background">
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

      {/* Subtle mid-left navy glow */}
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10">

          {/* ============================================================
              LEFT CONTENT
          ============================================================ */}

          <motion.div
            className="max-w-xl"
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
                Annual Accounts
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUpVariants}
              className="
                text-[40px]
                font-bold
                leading-[1.08]
                tracking-[-0.03em]
                text-heading
                sm:text-[48px]
                lg:text-[54px]
              "
            >
              Annual Accounts{" "}
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
                max-w-[520px]
                text-[15px]
                leading-6
                text-text-secondary
                sm:text-base
              "
            >
              Prepare and file your company's annual accounts with less
              paperwork and fewer headaches. TaxPilot helps you organise
              your financial information and keep your company accounts
              compliant.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
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
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2
                    whitespace-nowrap
                    px-6
                    text-sm
                  "
                >
                  <span>Prepare your accounts</span>
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
                    group
                    inline-flex
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2
                    whitespace-nowrap
                    rounded-lg
                    border
                    border-border
                    bg-background
                    px-6
                    text-sm
                    font-semibold
                    text-heading
                    transition-all
                    duration-200
                    hover:border-primary
                    hover:text-primary
                  "
                >
                  <PlayCircle className="h-4 w-4 text-primary" />
                  <span>See how it works</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={fadeUpVariants}
              className="
                mt-6
                flex
                items-center
                gap-2
                text-xs
                font-medium
                text-text-secondary
              "
            >
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Secure online filing · Built for UK businesses</span>
            </motion.div>
          </motion.div>

          {/* ============================================================
              RIGHT VISUAL — Dashboard Mockup
          ============================================================ */}

          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto">

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
                p-5
                shadow-card
              "
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-heading">
                    Annual Accounts
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    ABC Consulting Ltd · Year ending 31 Mar 2026
                  </p>
                </div>

                {/* Status badge */}
                <motion.span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-primary-light
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    text-primary
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, scale: 0.85 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.9,
                    duration: 0.4,
                    ease: premiumEase,
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <motion.span
                      className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
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
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Ready to file
                </motion.span>
              </div>

              {/* Info rows */}
              <div className="mb-4 flex flex-col gap-2.5">
                {[
                  {
                    icon: Building2,
                    label: "Accounting period",
                    right: (
                      <span className="text-[10px] font-semibold text-text-secondary">
                        Apr 2025 – Mar 2026
                      </span>
                    ),
                  },
                  {
                    icon: FileCheck2,
                    label: "Accounts status",
                    right: <CheckCircle2 className="h-4 w-4 text-primary" />,
                  },
                  {
                    icon: ClipboardCheck,
                    label: "Companies House",
                    right: (
                      <span className="text-[10px] font-semibold text-text-secondary">
                        Prepared
                      </span>
                    ),
                  },
                ].map((row, index) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={row.label}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        bg-background-soft
                        px-3
                        py-2.5
                      "
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: -12 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.65 + index * 0.12,
                        duration: 0.5,
                        ease: premiumEase,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-heading">
                          {row.label}
                        </span>
                      </div>
                      {row.right}
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA button */}
              <motion.button
                type="button"
                className="
                  group
                  btn-dark
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4
                  py-3.5
                  text-sm
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
                whileHover={
                  shouldReduceMotion ? undefined : { scale: 1.01 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.99 }
                }
              >
                <span>Review accounts</span>
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

            {/* ============================================================
                FLOATING CARDS
            ============================================================ */}

            <motion.div
              variants={floatCardTopLeft}
              initial="hidden"
              animate="visible"
              className="
                absolute
                -left-6
                -top-6
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-background
                px-3
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
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </motion.span>
              <span className="text-xs font-semibold text-heading">
                Accounts prepared
              </span>
            </motion.div>

            <motion.div
              variants={floatCardBottomRight}
              initial="hidden"
              animate="visible"
              className="
                absolute
                -bottom-5
                -right-4
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-background
                px-3
                py-2.5
                shadow-card
                sm:flex
              "
            >
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-heading">
                Companies House
              </span>
            </motion.div>

            <motion.div
              variants={floatCardRight}
              initial="hidden"
              animate="visible"
              className="
                absolute
                -right-8
                top-1/3
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-background
                px-3
                py-2.5
                shadow-card
                lg:flex
              "
            >
              <FileCheck2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-heading">
                Filing ready
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnualAccountsHero;