import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const ConfirmationStatementCTA = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Container: orchestrates the stagger */
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  /* Heading reveal */
  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  /* Description reveal */
  const descriptionVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  /* Button group reveal */
  const buttonsVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

  /* Trust line reveal */
  const trustVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  /* Shield icon pop-in */
  const shieldIconVariants = {
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
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-dark">
      {/* ============================================================
          DECORATIVE BACKGROUND GLOWS
      ============================================================ */}

      {/* Top-center glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-160px]
          h-[380px]
          w-[380px]
          -translate-x-1/2
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

      {/* Bottom-right glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-[-160px]
          h-[320px]
          w-[320px]
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
          MAIN CONTENT
      ============================================================ */}
      <motion.div
        className="
          relative
          mx-auto
          max-w-3xl
          px-5
          py-16
          text-center
          sm:px-6
          sm:py-20
          lg:px-8
          lg:py-24
        "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          variants={headingVariants}
          className="
            text-3xl
            font-bold
            leading-[1.1]
            tracking-[-0.02em]
            text-text-white
            sm:text-4xl
          "
        >
          Ready to keep your company compliant?
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={descriptionVariants}
          className="
            mx-auto
            mt-4
            max-w-xl
            text-sm
            leading-6
            text-text-white/80
            sm:text-base
          "
        >
          Review your company information and file your Confirmation
          Statement with Companies House through a simple online process.
        </motion.p>

        {/* ============================================================
            CTA BUTTONS — appear one by one
        ============================================================ */}
        <motion.div
          variants={buttonsVariants}
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:flex-row
          "
        >
          {/* Primary CTA */}
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
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-sky
                px-6
                py-3.5
                text-sm
                font-semibold
                text-dark
                shadow-button
                transition-colors
                duration-200
                hover:bg-text-white
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

          {/* Secondary CTA */}
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
              to="/pricing"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-text-white/25
                px-6
                py-3.5
                text-sm
                font-semibold
                text-text-white
                transition-colors
                duration-200
                hover:bg-text-white/10
              "
            >
              <span>View pricing</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ============================================================
            TRUST LINE
        ============================================================ */}
        <motion.p
          variants={trustVariants}
          className="
            mt-6
            text-xs
            font-medium
            uppercase
            tracking-[0.08em]
            text-text-white/50
          "
        >
          Secure online filing · Simple company compliance · Built for UK
          businesses
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ConfirmationStatementCTA;