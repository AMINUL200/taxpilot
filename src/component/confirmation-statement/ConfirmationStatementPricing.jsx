import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const ConfirmationStatementPricing = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const features = [
    "Confirmation Statement preparation",
    "Company information review",
    "Companies House filing",
    "Secure online account",
  ];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Heading reveal */
  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  /* Card: slides up with a subtle scale */
  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 32, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: premiumEase, delay: 0.15 },
    },
  };

  /* Feature list: stagger children */
  const listVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.5,
      },
    },
  };

  /* Each feature item: slides in from the left */
  const featureItemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: premiumEase },
    },
  };

  /* Check icon pop-in */
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

  /* CTA button reveal */
  const ctaVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase, delay: 0.9 },
    },
  };

  /* Footer note reveal */
  const footerVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase, delay: 0.35 },
    },
  };

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* ============================================================
            HEADING
        ============================================================ */}
        <motion.h2
          className="
            text-center
            text-3xl
            font-bold
            leading-[1.1]
            tracking-[-0.02em]
            text-heading
            sm:text-4xl
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5, margin: "-50px" }}
          variants={headingVariants}
        >
          Simple Confirmation Statement pricing
        </motion.h2>

        {/* ============================================================
            PRICING CARD
        ============================================================ */}
        <motion.div
          className="
            mx-auto
            mt-10
            max-w-md
            rounded-2xl
            border
            border-border
            bg-background-soft
            p-8
            shadow-card
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          {/* Plan name */}
          <p className="text-sm font-bold text-heading">
            Confirmation Statement
          </p>

          {/* Price */}
          <div className="mt-3 flex items-end gap-1">
            <span
              className="
                text-4xl
                font-bold
                tracking-[-0.02em]
                text-heading
              "
            >
              £74
            </span>
            <span className="pb-1 text-sm text-text-secondary">/year</span>
          </div>

          {/* Feature list */}
          <motion.ul
            className="mt-6 space-y-3"
            variants={listVariants}
          >
            {features.map((feature) => (
              <motion.li
                key={feature}
                variants={featureItemVariants}
                className="flex items-start gap-2.5"
              >
                <motion.span
                  variants={checkIconVariants}
                  className="mt-0.5 shrink-0"
                >
                  <CheckCircle2
                    className="h-4 w-4 text-primary"
                    strokeWidth={2.4}
                  />
                </motion.span>
                <span className="text-sm leading-5 text-heading">
                  {feature}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA button */}
          <motion.div variants={ctaVariants}>
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -2, transition: { duration: 0.2 } }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : { scale: 0.98, transition: { duration: 0.15 } }
              }
            >
              <Link
                to="/register"
                className="
                  group
                  btn-primary
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  py-3
                  text-sm
                "
              >
                <span>Get started</span>
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
          </motion.div>
        </motion.div>

        {/* ============================================================
            FOOTER NOTE
        ============================================================ */}
        <motion.div
          className="mx-auto mt-8 max-w-md text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={footerVariants}
        >
          <p className="text-sm leading-6 text-text-secondary">
            Need Corporation Tax and Annual Accounts too? Explore our
            complete business compliance plans.
          </p>

          <Link
            to="/pricing"
            className="
              group
              mt-2
              inline-flex
              items-center
              gap-1
              text-sm
              font-semibold
              text-primary
              transition-all
              duration-200
              hover:gap-2.5
              hover:text-primary-hover
            "
          >
            <span>View all plans</span>
            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConfirmationStatementPricing;