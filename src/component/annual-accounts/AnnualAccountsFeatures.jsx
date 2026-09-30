import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  Building2,
  Database,
  Link2,
  FolderLock,
  LifeBuoy,
} from "lucide-react";

const features = [
  {
    title: "Annual accounts preparation",
    description: "Prepare professional annual accounts for your UK company.",
    icon: FileText,
  },
  {
    title: "Companies House filing",
    description:
      "Get your accounts ready for electronic filing with Companies House.",
    icon: Building2,
  },
  {
    title: "Financial information",
    description:
      "Organise the financial information needed for your company's accounts.",
    icon: Database,
  },
  {
    title: "Tax-ready information",
    description:
      "Keep your accounts organised alongside your Corporation Tax compliance.",
    icon: Link2,
  },
  {
    title: "Digital records",
    description:
      "Keep your company accounting information securely organised online.",
    icon: FolderLock,
  },
  {
    title: "Filing support",
    description:
      "Make the annual filing process easier with clear guidance and a simple workflow.",
    icon: LifeBuoy,
  },
];

const AnnualAccountsFeatures = () => {
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
      transition: {
        duration: 0.7,
        ease: premiumEase,
      },
    },
  };

  /* Grid container: just orchestrates the stagger */
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
      : {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: premiumEase,
      },
    },
  };

  /* Icon pop-in (runs a bit after card starts) */
  const iconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.5,
          rotate: -14,
        },
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
    <section className="relative overflow-hidden bg-background-soft">
      {/* ============================================================
          DECORATIVE BACKGROUND GLOWS
      ============================================================ */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -top-20
          right-[-80px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-primary/[0.05]
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-[-80px]
          h-[280px]
          w-[280px]
          rounded-full
          bg-secondary/[0.03]
          blur-3xl
        "
      />

      {/* ============================================================
          MAIN CONTAINER
      ============================================================ */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ============================================================
            HEADING — its own independent animation
        ============================================================ */}

        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
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
            Everything you need to prepare{" "}
            <span className="relative inline-block">
              <span className="relative z-10">your accounts</span>
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
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.85,
                  ease: premiumEase,
                  delay: 0.5,
                }}
              />
            </span>
          </h2>
        </motion.div>

        {/* ============================================================
            FEATURE CARDS — smooth one-by-one reveal
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
                      transition: {
                        duration: 0.25,
                        ease: premiumEase,
                      },
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

              {/* Bottom accent line */}
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

export default AnnualAccountsFeatures;
