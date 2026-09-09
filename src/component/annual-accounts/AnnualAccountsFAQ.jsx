import React, { useState } from "react";
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

export default AnnualAccountsFAQ;