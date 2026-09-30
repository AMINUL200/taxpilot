import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Database, Send, Lock } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "HMRC compatible" },
  { icon: Database, label: "Digital VAT records" },
  { icon: Send, label: "Online VAT filing" },
  { icon: Lock, label: "Secure cloud platform" },
];

const MtdVatTrust = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Heading reveal */
  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  /* Container: orchestrates the stagger */
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  /* Each trust item */
  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  /* Icon circle pop-in */
  const iconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.6, rotate: -12 },
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
    <section className="border-y border-border bg-background-soft">
      {/* ============================================================
          SUBTLE BACKGROUND DETAIL
      ============================================================ */}

      {/* Soft blue glow top-right */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -top-24
          right-[-80px]
          h-[240px]
          w-[240px]
          rounded-full
          bg-primary/[0.05]
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft navy glow bottom-left */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-[-60px]
          h-[220px]
          w-[220px]
          rounded-full
          bg-secondary/[0.03]
          blur-3xl
        "
      />

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <motion.div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          py-8
          sm:px-6
          lg:px-8
        "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section heading */}
        <motion.p
          variants={headingVariants}
          className="
            mb-6
            text-center
            text-sm
            font-semibold
            text-heading
            sm:text-left
          "
        >
          Everything you need for Making Tax Digital
        </motion.p>

        {/* ============================================================
            TRUST ITEMS — appear one by one
        ============================================================ */}

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {items.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -3, transition: { duration: 0.2 } }
              }
              className="
                group
                flex
                items-center
                gap-2.5
                cursor-default
              "
            >
              {/* Icon circle */}
              <motion.span
                variants={iconVariants}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-background
                  text-primary
                  ring-1
                  ring-border
                  shadow-card
                  transition-all
                  duration-200
                  group-hover:ring-primary/40
                  group-hover:shadow-card-hover
                "
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
              </motion.span>

              {/* Label */}
              <span
                className="
                  text-xs
                  font-medium
                  leading-tight
                  text-heading
                  transition-colors
                  duration-200
                  group-hover:text-primary
                "
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MtdVatTrust;