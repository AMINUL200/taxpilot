import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Corporation Tax?",
    answer:
      "Corporation Tax is the tax UK limited companies pay on their taxable profits, including profits from trading, investments and the sale of assets.",
  },
  {
    question: "Who needs to file a Corporation Tax return?",
    answer:
      "Every UK limited company registered with Companies House needs to file a Corporation Tax return, even if it made no profit or is dormant.",
  },
  {
    question: "When is my Corporation Tax return due?",
    answer:
      "Your Corporation Tax return is due 12 months after the end of your accounting period, though the tax itself is usually payable earlier.",
  },
  {
    question: "When does Corporation Tax need to be paid?",
    answer:
      "Corporation Tax is normally due 9 months and 1 day after the end of your accounting period, ahead of the return filing deadline.",
  },
  {
    question: "Can ComplyTax calculate my Corporation Tax?",
    answer:
      "Yes. ComplyTax calculates your taxable profit and Corporation Tax liability automatically from the figures you provide.",
  },
  {
    question: "Can I file my Corporation Tax return online?",
    answer:
      "Yes. Once your return is ready, you can submit it electronically to HMRC directly from ComplyTax.",
  },
  {
    question: "What information do I need to complete my return?",
    answer:
      "You'll need your company accounts, accounting period dates, and details of income, expenses and any reliefs or allowances you're claiming.",
  },
  {
    question: "Can accountants use ComplyTax for multiple companies?",
    answer:
      "Yes. Accountants can manage Corporation Tax filing for multiple companies from a single ComplyTax account.",
  },
];

const CorporationTaxFAQ = () => {
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
    <section className="bg-background-mint-pale">
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
              text-plum
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
                      : "border-border-light"
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
                      ${isOpen ? "text-primary" : "text-plum"}
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

export default CorporationTaxFAQ;