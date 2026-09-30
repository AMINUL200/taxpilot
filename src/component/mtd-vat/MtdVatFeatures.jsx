import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileCheck,
  Calculator,
  Receipt,
  Send,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Digital VAT records",
    description:
      "Keep your VAT information organised digitally and ready when you need it.",
    icon: FileCheck,
  },
  {
    title: "VAT calculations",
    description:
      "Calculate your VAT position from your sales and purchase information.",
    icon: Calculator,
  },
  {
    title: "VAT return preparation",
    description:
      "Prepare your VAT return with a clear view of the figures you're submitting.",
    icon: Receipt,
  },
  {
    title: "HMRC submission",
    description:
      "Submit your VAT return electronically through the HMRC-compatible process.",
    icon: Send,
  },
  {
    title: "VAT period tracking",
    description:
      "Keep track of your VAT periods and upcoming filing requirements.",
    icon: CalendarDays,
  },
  {
    title: "Secure online records",
    description:
      "Keep your VAT information securely organised in one place.",
    icon: ShieldCheck,
  },
];

const MtdVatFeatures = () => {
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
    <section className="bg-background-soft">
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
            Everything you need to manage VAT
          </h2>
        </motion.div>

        {/* ============================================================
            FEATURE CARDS — staggered one-by-one reveal
        ============================================================ */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
            margin: "0px 0px -80px 0px",
          }}
        >
          {features.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
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
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-background
                p-6
                shadow-card
                transition-[border-color,box-shadow]
                duration-300
                hover:border-primary/25
                hover:shadow-card-hover
              "
            >
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className="
                  mb-4
                  flex
                  h-12
                  w-12
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
                <Icon className="h-6 w-6" strokeWidth={2.1} />
              </motion.div>

              {/* Title */}
              <h3
                className="
                  text-[15px]
                  font-bold
                  leading-5
                  text-heading
                  transition-colors
                  duration-200
                  group-hover:text-primary
                "
              >
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-[13px] leading-5 text-text-secondary">
                {description}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MtdVatFeatures;