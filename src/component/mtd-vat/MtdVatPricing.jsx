import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Digital VAT records",
  "VAT return preparation",
  "HMRC submission",
  "Secure online account",
];

const MtdVatPricing = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ============================================================
            HEADING
        ============================================================ */}
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center"
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
            Simple MTD VAT pricing
          </h2>
        </motion.div>

        {/* ============================================================
            PRICING CARD
        ============================================================ */}
        <motion.div
          className="
            mx-auto
            max-w-md
            rounded-2xl
            border
            border-border
            bg-background
            p-8
            shadow-card-hover
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
        >
          {/* Plan name */}
          <p className="text-sm font-bold text-heading">MTD VAT</p>

          {/* Price */}
          <div className="mt-3 flex items-end gap-1.5">
            <span
              className="
                text-[44px]
                font-bold
                leading-none
                tracking-[-0.02em]
                text-heading
              "
            >
              £29
            </span>
            <span className="pb-1 text-sm font-medium text-text-secondary">
              /year
            </span>
          </div>

          {/* Feature list */}
          <motion.ul
            className="mt-6 flex flex-col gap-3"
            variants={listVariants}
          >
            {features.map((feature) => (
              <motion.li
                key={feature}
                variants={featureItemVariants}
                className="flex items-center gap-2.5"
              >
                <motion.span variants={checkIconVariants}>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                </motion.span>
                <span className="text-sm font-medium text-heading">
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
                  min-h-[46px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  px-6
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
          className="
            mx-auto
            mt-8
            flex
            max-w-md
            flex-col
            items-center
            gap-2
            text-center
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={footerVariants}
        >
          <p className="text-sm text-text-secondary">
            Need more than MTD VAT? Explore our complete business compliance
            plans.
          </p>

          <Link
            to="/pricing"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-semibold
              text-primary
              transition-all
              duration-200
              hover:gap-2.5
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

export default MtdVatPricing;