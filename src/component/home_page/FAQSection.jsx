import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Who is TaxPilot for?",
    a: "TaxPilot is for UK businesses and accountants who want a clearer way to manage filings and reviews.",
  },
  {
    q: "Can I manage multiple companies?",
    a: "Yes. Accountants can manage multiple clients in one workspace with shared review visibility.",
  },
  {
    q: "Which filings will be supported?",
    a: "Your workspace will support core UK business filings, including Corporation Tax, VAT, Payroll, and Companies House.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // =========================================================
  // SECTION ANIMATION
  // =========================================================

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
      },
    },
  };

  // =========================================================
  // ITEM ANIMATION
  // =========================================================

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section-white">
      <div className="container-custom mx-auto px-4 py-14">

        <motion.div
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          {/* =================================================
              HEADER
              ================================================= */}

          <motion.div
            variants={itemVariants}
            className="
              flex
              items-center
              justify-between
              gap-5
            "
          >

            <h2
              className="
                text-3xl
                font-extrabold
                tracking-[-0.03em]
                text-[var(--heading)]
                md:text-4xl
              "
            >
              Frequently asked questions.
            </h2>

            <motion.a
              href="#"
              className="
                hidden
                shrink-0
                text-sm
                font-semibold
                text-[var(--primary)]
                md:block
              "
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 3,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              View all FAQs →
            </motion.a>

          </motion.div>


          {/* =================================================
              FAQ LIST
              ================================================= */}

          <motion.div
            variants={sectionVariants}
            className="
              mt-8
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border-light)]
            "
          >

            {faqs.map((item, idx) => {
              const open = idx === openIdx;

              return (
                <motion.div
                  key={item.q}
                  variants={itemVariants}
                  className="
                    faq-item
                    border-b
                    border-[var(--border-light)]
                    last:border-b-0
                  "
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          backgroundColor: "#FBFDFF",
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                >

                  {/* =========================================
                      QUESTION
                      ========================================= */}

                  <motion.button
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-5
                      px-5
                      py-5
                      text-left
                    "
                    onClick={() =>
                      setOpenIdx(open ? -1 : idx)
                    }
                    whileTap={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 0.995,
                          }
                    }
                  >

                    <motion.div
                      className="
                        faq-question
                        text-[14px]
                        font-semibold
                        text-[var(--heading)]
                        md:text-[15px]
                      "
                      animate={{
                        x: open ? 2 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      {item.q}
                    </motion.div>


                    {/* Animated Chevron */}

                    <motion.div
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[var(--primary)]
                      "
                      animate={{
                        rotate: open ? 180 : 0,
                        backgroundColor: open
                          ? "rgba(37,99,235,0.08)"
                          : "rgba(37,99,235,0)",
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                      />
                    </motion.div>

                  </motion.button>


                  {/* =========================================
                      ANSWER
                      ========================================= */}

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="answer"
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{
                            y: -8,
                          }}
                          animate={{
                            y: 0,
                          }}
                          exit={{
                            y: -8,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="
                            px-5
                            pb-5
                            pr-12
                          "
                        >
                          <div
                            className="
                              faq-answer
                              text-[14px]
                              leading-[1.65]
                              text-[var(--text-secondary)]
                            "
                          >
                            {item.a}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}

          </motion.div>


          {/* =================================================
              MOBILE VIEW ALL
              ================================================= */}

          <motion.div
            variants={itemVariants}
            className="mt-5 md:hidden"
          >
            <a
              href="#"
              className="
                inline-flex
                items-center
                text-sm
                font-semibold
                text-[var(--primary)]
              "
            >
              View all FAQs →
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}