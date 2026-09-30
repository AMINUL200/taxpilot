import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import { CheckCircle2, Receipt, TrendingUp } from "lucide-react";

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

const points = [
  "Keep VAT information organised",
  "Track sales and purchases",
  "Calculate VAT",
  "Prepare VAT returns",
  "Review VAT figures",
  "Submit VAT returns to HMRC",
  "Keep digital records",
];

const MtdVatOverview = () => {
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
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  const listItemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -14 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  const iconCircleVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.34, 1.56, 0.64, 1],
      },
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
      transition: { duration: 0.85, ease: premiumEase, delay: 0.2 },
    },
  };

  const rowVariants = (index) => ({
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: premiumEase,
        delay: 0.55 + index * 0.1,
      },
    },
  });

  /* VAT rows with count-up values */
  const vatRows = [
    { label: "Output VAT", value: 5420.0, delay: 0.55 },
    { label: "Input VAT", value: 2180.0, delay: 0.65 },
    { label: "VAT liability", value: 3240.0, delay: 0.75 },
  ];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ============================================================
              LEFT — TEXT CONTENT
          ============================================================ */}

          <motion.div
            className="max-w-lg"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Heading with underline accent */}
            <motion.h2
              variants={fadeUpVariants}
              className="
                text-3xl
                font-bold
                leading-[1.1]
                tracking-[-0.03em]
                text-heading
                sm:text-4xl
              "
            >
              VAT compliance{" "}
              <span className="relative inline-block">
                <span className="relative z-10">
                  without the spreadsheet headache
                </span>
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
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.85,
                    ease: premiumEase,
                    delay: 0.7,
                  }}
                />
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="mt-4 text-[15px] leading-6 text-text-secondary"
            >
              ComplyTax keeps your VAT information in one place, so preparing
              and submitting your return doesn't mean piecing figures
              together from scratch each quarter.
            </motion.p>

            {/* Points list */}
            <ul className="mt-7 flex flex-col gap-3.5">
              {points.map((point) => (
                <motion.li
                  key={point}
                  variants={listItemVariants}
                  className="flex items-center gap-3"
                >
                  {/* Check circle */}
                  <motion.span
                    variants={iconCircleVariants}
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary-light
                      text-primary
                    "
                  >
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
                  </motion.span>

                  <span className="text-sm font-medium text-heading">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ============================================================
              RIGHT — VAT SUMMARY CARD
          ============================================================ */}

          <div className="relative mx-auto w-full max-w-[440px]">

            {/* Decorative glow */}
            <motion.div
              className="
                absolute
                -right-6
                -top-6
                h-40
                w-40
                rounded-full
                bg-background-soft
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
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
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
              "
            >
              {/* Card header */}
              <div className="mb-5 flex items-center gap-3">
                <motion.span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-primary-light
                    text-primary
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { scale: 0.6, rotate: -12, opacity: 0 }
                  }
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: 0.4,
                  }}
                >
                  <Receipt className="h-5 w-5" strokeWidth={2.2} />
                </motion.span>

                <div>
                  <p className="text-sm font-bold text-heading">
                    VAT Summary
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    Current VAT period
                  </p>
                </div>
              </div>

              {/* Figures list — staggered + counting */}
              <div className="mb-5 flex flex-col gap-3">
                {vatRows.map((row, index) => (
                  <React.Fragment key={row.label}>
                    <motion.div
                      variants={rowVariants(index)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-center justify-between text-xs"
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

                    {index < vatRows.length - 1 && (
                      <motion.div
                        className="h-px w-full bg-border"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { scaleX: 0, originX: 0 }
                        }
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
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

              {/* Status bar */}
              <motion.div
                className="
                  flex
                  items-center
                  gap-2
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: premiumEase,
                  delay: 0.95,
                }}
              >
                {/* Animated trend icon */}
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, -2, 0] }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <TrendingUp
                    className="h-4 w-4 text-primary"
                    strokeWidth={2.4}
                  />
                </motion.span>

                <span className="text-[11px] font-medium text-heading">
                  Return status: Ready to submit
                </span>

                {/* Pulsing dot */}
                <span className="relative ml-auto flex h-1.5 w-1.5">
                  <motion.span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      rounded-full
                      bg-primary
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
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MtdVatOverview;