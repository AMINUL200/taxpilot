import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Self Assessment?",
    answer:
      "Self Assessment is HMRC's system for reporting your income and calculating the tax you owe if it isn't automatically deducted through PAYE.",
  },
  {
    question: "Who needs to complete a Self Assessment tax return?",
    answer:
      "You typically need to file if you're self-employed, a company director, a landlord, or have income from sources HMRC hasn't already taxed.",
  },
  {
    question: "When is my Self Assessment tax return due?",
    answer:
      "The online filing deadline is 31 January following the end of the tax year, with tax also normally due by the same date.",
  },
  {
    question: "What income do I need to include?",
    answer:
      "You'll need to include income from employment, self-employment, property, savings, dividends and any other taxable sources.",
  },
  {
    question: "What expenses can I include?",
    answer:
      "You can typically include allowable business expenses that are wholly and exclusively for your trade, such as costs directly related to earning your income.",
  },
  {
    question: "Can ComplyTax calculate my Self Assessment tax?",
    answer:
      "Yes. ComplyTax calculates your taxable income and estimated tax based on the income and expenses you add.",
  },
  {
    question: "Can I submit my tax return to HMRC through ComplyTax?",
    answer:
      "Yes. Once your return is ready, you can submit it electronically to HMRC directly from ComplyTax.",
  },
  {
    question: "Can I use ComplyTax if I am self-employed?",
    answer:
      "Yes. ComplyTax is built to help self-employed people organise income and expenses and complete their Self Assessment return.",
  },
];

const SelfAssessmentFAQ = () => {
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

export default SelfAssessmentFAQ;