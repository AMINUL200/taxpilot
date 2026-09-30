import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are annual accounts?",
    answer:
      "Annual accounts are a company's yearly financial statements, showing its income, expenses, assets and liabilities, filed with Companies House.",
  },
  {
    question: "Who needs to file annual accounts?",
    answer:
      "Every UK limited company registered with Companies House must file annual accounts, even if the company is dormant or made no profit.",
  },
  {
    question: "When do annual accounts need to be filed?",
    answer:
      "Annual accounts are normally due 9 months after your company's accounting reference date, or 21 months after incorporation for your first accounts.",
  },
  {
    question: "What information is needed to prepare annual accounts?",
    answer:
      "You'll need your company's income and expenses, assets and liabilities, and any relevant transactions for the accounting period.",
  },
  {
    question: "Can ComplyTax prepare my annual accounts?",
    answer:
      "Yes. ComplyTax organises your financial information and prepares filing-ready annual accounts for your company.",
  },
  {
    question: "Can ComplyTax file accounts with Companies House?",
    answer:
      "Yes. Once your accounts are ready, you can submit them electronically to Companies House directly from ComplyTax.",
  },
  {
    question: "Do annual accounts and Corporation Tax returns need to be filed separately?",
    answer:
      "Yes, they're separate filings to different bodies, but ComplyTax keeps the information linked so nothing has to be entered twice.",
  },
  {
    question: "Can accountants manage annual accounts for multiple companies?",
    answer:
      "Yes. Accountants can prepare and file annual accounts for multiple companies from a single ComplyTax account.",
  },
];

const AnnualAccountsFAQ = () => {
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
    <section className="bg-background-soft">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* ============================================================
            HEADING
        ============================================================ */}
        <motion.div
          className="mb-10 text-center"
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
            Frequently asked questions
          </h2>
        </motion.div>

        {/* ============================================================
            FAQ LIST — staggered reveal
        ============================================================ */}
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className={`
                  overflow-hidden
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
                    transition-colors
                    duration-200
                  "
                  aria-expanded={isOpen}
                >
                  <span
                    className={`
                      text-sm
                      font-semibold
                      transition-colors
                      duration-200
                      ${isOpen ? "text-primary" : "text-heading"}
                    `}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`
                      h-4
                      w-4
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
                  className={`
                    grid
                    transition-all
                    duration-300
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[13px] leading-6 text-text-secondary">
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

export default AnnualAccountsFAQ;