import React, { useState } from "react";
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

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="bg-[#F5FCF9]">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden rounded-xl border bg-white
                  transition-colors duration-200
                  ${isOpen ? "border-[#087F5B]/30" : "border-[#DDEAE6]"}
                `}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-semibold ${
                      isOpen ? "text-[#087F5B]" : "text-[#09263A]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#71827F] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#087F5B]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[13px] leading-6 text-[#687B78]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelfAssessmentFAQ;