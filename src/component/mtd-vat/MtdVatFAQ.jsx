import React, { useState } from "react";
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

export default MtdVatFAQ;