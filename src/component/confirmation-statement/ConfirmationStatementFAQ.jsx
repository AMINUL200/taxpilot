import React, { useState } from "react";
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

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full bg-[#F5FCF9]">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border bg-white transition-colors duration-200 ${
                  isOpen ? "border-[#087F5B]/30" : "border-[#DDEAE6]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span
                    className={`text-sm font-semibold sm:text-base ${
                      isOpen ? "text-[#087F5B]" : "text-[#09263A]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#087F5B] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-[#687B78] sm:px-6 sm:pb-6">
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

export default ConfirmationStatementFAQ;