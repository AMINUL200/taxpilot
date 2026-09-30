import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Building2, TrendingUp, UserRound, Users } from "lucide-react";

const audiences = [
  {
    title: "Small businesses",
    description:
      "Manage your VAT records and returns without complicated processes.",
    icon: Building2,
  },
  {
    title: "Growing businesses",
    description:
      "Keep VAT compliance organised as your transaction volume grows.",
    icon: TrendingUp,
  },
  {
    title: "Company directors",
    description:
      "Stay on top of your company's VAT responsibilities online.",
    icon: UserRound,
  },
  {
    title: "Accountants",
    description:
      "Manage VAT filing workflows for multiple clients from one place.",
    icon: Users,
  },
];

const MtdVatWhoIsItFor = () => {
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

  /* Container: orchestrates the stagger */
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  /* Each card slides up smoothly */
  const cardVariants = {
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

  /* Icon circle: pop-in slightly after card starts */
  const iconVariants = {
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
            Built for VAT-registered businesses
          </h2>
        </motion.div>

        {/* ============================================================
            AUDIENCE CARDS — staggered one-by-one reveal
        ============================================================ */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
            margin: "0px 0px -60px 0px",
          }}
        >
          {audiences.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.25 } }
              }
              className="
                group
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
              {/* Icon circle */}
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
                <Icon className="h-5 w-5" strokeWidth={2.1} />
              </motion.div>

              {/* Title */}
              <h3
                className="
                  text-sm
                  font-bold
                  text-heading
                  transition-colors
                  duration-200
                  group-hover:text-primary
                "
              >
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-5 text-text-secondary">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MtdVatWhoIsItFor;