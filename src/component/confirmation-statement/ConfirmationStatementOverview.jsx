import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Building2 } from "lucide-react";

const ConfirmationStatementOverview = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const points = [
    "Review company information",
    "Check registered office details",
    "Review directors and officers",
    "Review shareholders and share information",
    "Check people with significant control",
    "Review company information before filing",
    "Prepare your Confirmation Statement",
    "Submit it to Companies House",
    "Keep filing records organised",
  ];

  /* Company information rows — staggered */
  const companyRows = [
    { label: "Company name", value: "ABC LIMITED", delay: 0.55 },
    { label: "Registered office", value: "London, UK", delay: 0.65 },
    { label: "Directors", value: "2", delay: 0.75 },
    { label: "Shareholders", value: "3", delay: 0.85 },
  ];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
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
      : { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: premiumEase },
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

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ============================================================
              LEFT — TEXT CONTENT
          ============================================================ */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Heading with underline accent */}
            <motion.h2
              variants={fadeUpVariants}
              className="
                max-w-[480px]
                text-3xl
                font-bold
                leading-[1.1]
                tracking-[-0.02em]
                text-heading
                sm:text-4xl
              "
            >
              Keep your company{" "}
              <span className="relative inline-block">
                <span className="relative z-10">
                  information up to date
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
              className="
                mt-4
                max-w-[480px]
                text-sm
                leading-6
                text-text-secondary
                sm:text-base
              "
            >
              ComplyTax UK helps you stay on top of your annual company
              filing requirements, from checking your details to submitting
              your statement.
            </motion.p>

            {/* Points grid */}
            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {points.map((point) => (
                <motion.li
                  key={point}
                  variants={listItemVariants}
                  className="flex items-start gap-2.5"
                >
                  {/* Check icon */}
                  <motion.span
                    variants={checkIconVariants}
                    className="mt-0.5 shrink-0"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={2.4} />
                  </motion.span>

                  <span className="text-sm leading-5 text-heading">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ============================================================
              RIGHT — COMPANY INFORMATION CARD
          ============================================================ */}

          <div className="mx-auto w-full max-w-[420px]">

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
                bg-background-soft
                p-6
                shadow-card
                sm:p-7
              "
            >
              {/* Card header */}
              <div className="mb-4 flex items-center gap-3">
                <motion.span
                  className="
                    flex
                    h-10
                    w-10
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
                  <Building2 className="h-5 w-5" strokeWidth={2.2} />
                </motion.span>

                <p className="text-sm font-bold text-heading">
                  Company information
                </p>
              </div>

              {/* Rows */}
              <div className="mt-2 space-y-3 text-sm">
                {companyRows.map((row) => (
                  <motion.div
                    key={row.label}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-border
                      pb-3
                    "
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: 12 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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

                {/* PSC records row */}
                <motion.div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-border
                    pb-3
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, x: 12 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.95,
                    duration: 0.5,
                    ease: premiumEase,
                  }}
                >
                  <span className="text-text-secondary">PSC records</span>
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
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 1.05,
                    }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Reviewed
                  </motion.span>
                </motion.div>

                {/* Status row */}
                <motion.div
                  className="flex items-center justify-between"
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 8 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.15,
                    duration: 0.5,
                    ease: premiumEase,
                  }}
                >
                  <span className="text-text-secondary">Status</span>
                  <motion.span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-primary/20
                      px-2.5
                      py-1
                      text-[11px]
                      font-bold
                      text-primary
                    "
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.85 }
                    }
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 1.25,
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
                          bg-primary
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
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    Up to date
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementOverview;