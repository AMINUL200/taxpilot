import React, { useState } from "react";
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

export default CorporationTaxFAQ;