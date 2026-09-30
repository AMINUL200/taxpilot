import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Making Tax Digital for VAT?",
    answer:
      "Making Tax Digital for VAT is HMRC's requirement for VAT-registered businesses to keep digital VAT records and submit VAT returns using compatible software.",
  },
  {
    question: "Who needs to follow Making Tax Digital for VAT?",
    answer:
      "All VAT-registered businesses in the UK need to follow Making Tax Digital rules, keeping digital records and filing returns through compatible software.",
  },
  {
    question: "Can ComplyTax help me prepare my VAT return?",
    answer:
      "Yes. ComplyTax organises your sales and purchase information and calculates your VAT position to prepare your return.",
  },
  {
    question: "Can I submit my VAT return to HMRC through ComplyTax?",
    answer:
      "Yes. Once your return is ready, you can submit it electronically to HMRC directly through ComplyTax's HMRC-compatible process.",
  },
  {
    question: "What are digital VAT records?",
    answer:
      "Digital VAT records are your VAT transaction data kept and maintained digitally, rather than on paper, as required under Making Tax Digital.",
  },
  {
    question: "How often do I need to submit my VAT return?",
    answer:
      "Most VAT-registered businesses submit a VAT return every 3 months, though some file monthly or annually depending on their VAT scheme.",
  },
  {
    question: "Can I use ComplyTax for multiple VAT-registered businesses?",
    answer:
      "Yes. You can manage VAT records and returns for more than one VAT-registered business from your ComplyTax account.",
  },
  {
    question: "Can my accountant manage my VAT returns?",
    answer:
      "Yes. Accountants can manage VAT filing workflows for multiple clients from a single ComplyTax account.",
  },
];

const MtdVatFAQ = () => {
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

export default MtdVatFAQ;