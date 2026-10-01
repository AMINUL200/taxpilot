import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Landmark,
  ClipboardCheck,
  ShieldCheck,
  CalendarCheck2,
} from "lucide-react";

const ConfirmationStatementTrust = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const items = [
    {
      title: "Companies House filing",
      icon: Landmark,
    },
    {
      title: "Company information checks",
      icon: ClipboardCheck,
    },
    {
      title: "Secure online account",
      icon: ShieldCheck,
    },
    {
      title: "Simple annual compliance",
      icon: CalendarCheck2,
    },
  ];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Heading reveal */
  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

  /* Container: orchestrates the stagger */
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  /* Each item */
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
    <section className="relative w-full overflow-hidden border-y border-border bg-background">
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

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        {/* ============================================================
            HEADING
        ============================================================ */}
        <motion.h2
          className="
            mb-8
            text-center
            text-xl
            font-bold
            text-heading
            sm:text-2xl
          "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5, margin: "-50px" }}
          variants={headingVariants}
        >
          Everything you need for your Confirmation Statement
        </motion.h2>

        {/* ============================================================
            TRUST ITEMS — appear one by one
        ============================================================ */}
        <motion.div
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, transition: { duration: 0.2 } }
                }
                className="
                  group
                  flex
                  flex-col
                  items-center
                  gap-3
                  text-center
                  cursor-default
                "
              >
                {/* Icon circle */}
                <motion.div
                  variants={iconVariants}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-primary-light
                    ring-1
                    ring-border
                    shadow-card
                    transition-all
                    duration-300
                    group-hover:bg-primary
                    group-hover:ring-primary
                    group-hover:shadow-button
                  "
                >
                  <Icon
                    className="
                      h-5
                      w-5
                      text-[var(--primary)]
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                  />
                </motion.div>

                {/* Label */}
                <span
                  className="
                    text-xs
                    font-semibold
                    leading-5
                    text-heading
                    transition-colors
                    duration-200
                    group-hover:text-primary
                    sm:text-sm
                  "
                >
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ConfirmationStatementTrust;