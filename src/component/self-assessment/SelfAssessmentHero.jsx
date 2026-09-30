import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useInView } from "motion/react";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Wallet,
  Calculator,
} from "lucide-react";

/* ============================================================
   NUMBER COUNTER COMPONENT
   Smoothly counts from 0 → target when it enters view.
============================================================ */
const CountUp = ({
  value,
  prefix = "£",
  duration = 1.4,
  delay = 0,
  shouldReduceMotion,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    let frame;
    let startTime = null;

    const startDelay = setTimeout(() => {
      const animate = (timestamp) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // easeOutExpo — fast start, gentle settle
        const eased =
          progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setDisplay(value * eased);

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setDisplay(value);
        }
      };

      frame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(startDelay);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isInView, value, duration, delay, shouldReduceMotion]);

  const formatted = display.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
    </span>
  );
};

const SelfAssessmentHero = () => {
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

  /* Tax rows with count-up values */
  const taxRows = [
    { label: "Total income", value: 48620.0, delay: 0.55 },
    { label: "Allowable expenses", value: 8450.0, delay: 0.65 },
    { label: "Taxable income", value: 40170.0, delay: 0.75 },
    { label: "Estimated tax", value: 7840.0, delay: 0.85 },
  ];

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
                Self Assessment
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
              Self Assessment{" "}
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
              Complete your UK Self Assessment tax return with less stress.
              Organise your income and expenses, calculate your tax and
              submit your return to HMRC online.
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
                  <span>Start your tax return</span>
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
              RIGHT VISUAL — Self Assessment Dashboard Mockup
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
                    Self Assessment
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    Tax year: 2025/26
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
                  Return ready
                </motion.span>
              </div>

              {/* Figures list — staggered + counting */}
              <div className="mb-4 flex flex-col gap-3">
                {taxRows.map((row, index) => (
                  <React.Fragment key={row.label}>
                    <motion.div
                      className="flex items-center justify-between text-xs"
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
                      <span className="text-text-secondary">
                        {row.label}
                      </span>
                      <span className="font-semibold text-heading">
                        <CountUp
                          value={row.value}
                          delay={row.delay + 0.1}
                          duration={1.4}
                          shouldReduceMotion={shouldReduceMotion}
                        />
                      </span>
                    </motion.div>

                    {index < taxRows.length - 1 && (
                      <motion.div
                        className="h-px w-full bg-border"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { scaleX: 0, originX: 0 }
                        }
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: premiumEase,
                          delay: row.delay + 0.05,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
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
                <span>Review tax return</span>
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

            {/* Top-left: Income added */}
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
                <Wallet className="h-4 w-4 text-primary" />
              </motion.span>
              <span className="text-xs font-semibold text-heading">
                Income added
              </span>
            </motion.div>

            {/* Bottom-right: Tax calculation complete */}
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
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-heading">
                Tax calculation complete
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfAssessmentHero;