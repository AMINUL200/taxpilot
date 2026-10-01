import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Building2,
  Users,
  BadgePoundSterling,
  UserCheck,
  FileCheck,
  Send,
} from "lucide-react";

const ConfirmationStatementFeatures = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const features = [
    {
      title: "Company information",
      description:
        "Review the key information held about your company before filing.",
      icon: Building2,
    },
    {
      title: "Director details",
      description:
        "Check your company's director and officer information.",
      icon: Users,
    },
    {
      title: "Shareholder information",
      description: "Review relevant shareholder and share information.",
      icon: BadgePoundSterling,
    },
    {
      title: "PSC information",
      description:
        "Review your people with significant control information.",
      icon: UserCheck,
    },
    {
      title: "Confirmation Statement",
      description:
        "Prepare your annual Confirmation Statement with a simple online process.",
      icon: FileCheck,
    },
    {
      title: "Companies House filing",
      description:
        "Submit your Confirmation Statement electronically to Companies House.",
      icon: Send,
    },
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

  /* Grid container: orchestrates the stagger */
  const gridVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  /* Each card: slides up smoothly */
  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  /* Icon pop-in slightly after card starts */
  const iconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.5, rotate: -14 },
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

  return (
    <section className="w-full bg-background-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* ============================================================
            HEADING
        ============================================================ */}
        <motion.h2
          className="
            mx-auto
            max-w-2xl
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
          Everything you need to keep your company records up to date
        </motion.h2>

        {/* ============================================================
            FEATURE CARDS — staggered one-by-one reveal
        ============================================================ */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
            margin: "0px 0px -80px 0px",
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: { duration: 0.25, ease: premiumEase },
                      }
                }
                className="
                  group
                  relative
                  flex
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  p-6
                  shadow-card
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:border-primary/20
                  hover:shadow-card-hover
                "
              >
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className="
                    mb-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-primary-light
                   text-[var(--primary)]
                    transition-all
                    duration-300
                    group-hover:bg-primary
                    group-hover:text-white
                    group-hover:shadow-button
                  "
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </motion.div>

                {/* Title */}
                <h3
                  className="
                    text-base
                    font-bold
                    text-heading
                    transition-colors
                    duration-200
                    group-hover:text-primary
                  "
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {feature.description}
                </p>

                {/* Bottom accent line — draws in on hover */}
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[3px]
                    w-0
                    bg-gradient-to-r
                    from-primary
                    to-sky
                    transition-[width]
                    duration-500
                    ease-out
                    group-hover:w-full
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ConfirmationStatementFeatures;