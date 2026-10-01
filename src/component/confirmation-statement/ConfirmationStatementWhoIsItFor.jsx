import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Building, UserRound, TrendingUp, Users2 } from "lucide-react";

const ConfirmationStatementWhoIsItFor = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const cards = [
    {
      title: "Small businesses",
      description:
        "Keep your annual company information and filing requirements organised.",
      icon: Building,
    },
    {
      title: "Company directors",
      description:
        "Manage your company's Confirmation Statement without complicated paperwork.",
      icon: UserRound,
    },
    {
      title: "Growing companies",
      description:
        "Keep company information organised as your business changes and grows.",
      icon: TrendingUp,
    },
    {
      title: "Accountants",
      description:
        "Manage Confirmation Statements and company filing requirements for multiple clients.",
      icon: Users2,
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
    <section className="w-full bg-background-soft">
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
          Built for UK companies
        </motion.h2>

        {/* ============================================================
            AUDIENCE CARDS — staggered one-by-one reveal
        ============================================================ */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
            margin: "0px 0px -60px 0px",
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -4, transition: { duration: 0.25 } }
                }
                className="
                  group
                  flex
                  flex-col
                  rounded-2xl
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
                  {card.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ConfirmationStatementWhoIsItFor;