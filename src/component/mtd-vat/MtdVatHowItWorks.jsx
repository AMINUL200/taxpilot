import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Connect your VAT information",
    description:
      "Bring your sales and purchase information together in one place.",
  },
  {
    number: "02",
    title: "Review your VAT return",
    description:
      "Review your VAT figures and check your return before submission.",
  },
  {
    number: "03",
    title: "Submit to HMRC",
    description:
      "Complete your VAT filing through the HMRC-compatible process.",
  },
];

/* ============================================================
   TIMING CONFIG — single source of truth
   The line and the step highlights share these values so they
   stay perfectly in sync as the line travels left → right.
============================================================ */
const LINE_DELAY = 0.4; // seconds before the line starts
const LINE_DURATION = 1.6; // how long the line takes end-to-end

const MtdVatHowItWorks = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  /* ============================================================
     STEP HIGHLIGHT SEQUENCE
     Each step turns blue exactly when the line passes over it.
  ============================================================ */

  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setActiveStep(steps.length);
      return;
    }

    const start = LINE_DELAY * 1000;
    const duration = LINE_DURATION * 1000;

    /* Each step is centered at (index + 0.5) / totalSteps of the
       grid width. That's where the circle actually sits visually. */
    const total = steps.length;

    const stepTriggerTimes = steps.map((_, index) => {
      const positionAlongLine = (index + 0.5) / total;
      return start + positionAlongLine * duration;
    });

    /* Always ensure the last step fires before the line fully
       completes, so it never gets skipped. */
    const finalTime = Math.min(
      stepTriggerTimes[stepTriggerTimes.length - 1],
      start + duration - 50
    );
    stepTriggerTimes[stepTriggerTimes.length - 1] = finalTime;

    const timers = stepTriggerTimes.map((time, index) =>
      setTimeout(() => setActiveStep(index), time)
    );

    /* Safety net: guarantee all steps are active once the line
       has finished drawing, regardless of any timer drift. */
    timers.push(
      setTimeout(() => setActiveStep(steps.length), start + duration + 50)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [isInView, shouldReduceMotion]);

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  const stepVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

  const numberCircleVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.5, rotate: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1],
        delay: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const baseLineVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scaleX: 0, originX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: LINE_DURATION,
        ease: premiumEase,
        delay: shouldReduceMotion ? 0 : LINE_DELAY,
      },
    },
  };

  const progressLineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: LINE_DURATION,
        ease: premiumEase,
        delay: shouldReduceMotion ? 0 : LINE_DELAY,
      },
    },
  };

  return (
    <section className="bg-background" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ============================================================
            HEADING
        ============================================================ */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5, margin: "-50px" }}
          variants={headingVariants}
        >
          <h2
            className="
              text-3xl
              font-bold
              leading-[1.1]
              tracking-[-0.03em]
              text-heading
              sm:text-4xl
            "
          >
            Manage your VAT in 3 simple steps
          </h2>
        </motion.div>

        {/* ============================================================
            STEPS GRID — staggered reveal + progressive highlight
        ============================================================ */}
        <motion.div
          className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
        >
          {/* ========================================================
              CONNECTING LINE — desktop only
              Two layers:
                1. base faint line (bg-border) draws in
                2. primary progress line draws over it, left → right
          ======================================================== */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px sm:block">
            {/* Base faint line */}
            <motion.div
              className="absolute inset-0 h-px bg-border"
              variants={baseLineVariants}
            />

            {/* Primary progress line */}
            <motion.div
              className="absolute inset-0 h-px bg-primary"
              variants={progressLineVariants}
            />
          </div>

          {steps.map((step, index) => {
            const isActive = index < activeStep;

            return (
              <motion.div
                key={step.number}
                variants={stepVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -4, transition: { duration: 0.25 } }
                }
                className="relative flex flex-col items-start"
              >
                {/* ====================================================
                    STEP NUMBER CIRCLE
                    Inactive: white bg, primary text, border ring
                    Active:   primary bg, white text, primary border
                ==================================================== */}
                <motion.span
                  variants={numberCircleVariants}
                  animate={{
                    backgroundColor: isActive
                      ? "var(--primary)"
                      : "var(--background)",
                    color: isActive
                      ? "#ffffff"
                      : "var(--primary)",
                    borderColor: isActive
                      ? "var(--primary)"
                      : "var(--border)",
                    boxShadow: isActive
                      ? "0 6px 18px rgba(37, 99, 235, 0.28)"
                      : "0 4px 18px rgba(15, 39, 71, 0.06)",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: premiumEase,
                  }}
                  className="
                    relative
                    z-10
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-sm
                    font-bold
                  "
                >
                  {step.number}
                </motion.span>

                {/* Title */}
                <h3 className="text-base font-bold text-heading">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-[260px] text-sm leading-6 text-text-secondary">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MtdVatHowItWorks;