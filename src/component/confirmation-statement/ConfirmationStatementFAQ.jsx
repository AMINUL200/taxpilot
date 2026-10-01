import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a Confirmation Statement?",
    answer:
      "A Confirmation Statement is an annual filing that confirms the information Companies House holds about your company is accurate, including your registered office, directors, shareholders and people with significant control.",
  },
  {
    question: "Who needs to file a Confirmation Statement?",
    answer:
      "Every UK limited company and LLP registered with Companies House must file a Confirmation Statement, even if the company is dormant or has had no changes during the year.",
  },
  {
    question: "How often do I need to file a Confirmation Statement?",
    answer:
      "You need to file at least once every 12 months, based on your company's review period. You can also file early if your company information changes.",
  },
  {
    question: "What information is included in a Confirmation Statement?",
    answer:
      "It includes your registered office address, directors and officers, shareholders and share information, and details of people with significant control (PSC).",
  },
  {
    question: "Do I need to update my company information before filing?",
    answer:
      "Yes. Before filing, you should check that your registered office, directors, shareholders and PSC details are all accurate and up to date.",
  },
  {
    question: "Can ComplyTax prepare my Confirmation Statement?",
    answer:
      "Yes. ComplyTax UK guides you through reviewing your company information and prepares your Confirmation Statement ready for filing.",
  },
  {
    question: "Can ComplyTax file my Confirmation Statement with Companies House?",
    answer:
      "Yes. Once you've reviewed and confirmed your information, ComplyTax UK submits your Confirmation Statement to Companies House electronically.",
  },
  {
    question: "Can accountants manage Confirmation Statements for multiple companies?",
    answer:
      "Yes. Accountants can use ComplyTax UK to manage Confirmation Statements and company filing requirements for all of their clients from one account.",
  },
];

const ConfirmationStatementFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

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
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  /* Each FAQ item slides up smoothly */
  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  return (
    <section className="w-full bg-background-soft">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
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
          Frequently asked questions
        </motion.h2>

        {/* ============================================================
            FAQ LIST — staggered reveal
        ============================================================ */}
        <motion.div
          className="mt-10 space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
            margin: "0px 0px -60px 0px",
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className={`
                  rounded-xl
                  border
                  bg-background
                  transition-colors
                  duration-300
                  ${
                    isOpen
                      ? "border-primary/30 shadow-card"
                      : "border-border"
                  }
                `}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    text-left
                    sm:px-6
                    sm:py-5
                  "
                >
                  <span
                    className={`
                      text-sm
                      font-semibold
                      transition-colors
                      duration-200
                      sm:text-base
                      ${isOpen ? "text-primary" : "text-heading"}
                    `}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`
                      h-5
                      w-5
                      shrink-0
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180 text-primary"
                          : "text-text-secondary"
                      }
                    `}
                  />
                </button>

                {/* Answer — smooth expand/collapse */}
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-text-secondary sm:px-6 sm:pb-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ConfirmationStatementFAQ;