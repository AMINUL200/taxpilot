import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is included in each pricing plan?",
      answer:
        "Each plan includes the compliance services shown in the comparison table above. The Solo plan covers one trading company, while Portfolio and Portfolio Plus are designed for businesses managing multiple companies.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes. You can change your plan as your business needs change. If you need to manage more companies or require additional features, you can move to a higher plan.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes. There are no long-term contracts. You can cancel your subscription whenever you need to.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No. Our pricing is designed to be simple and transparent. Any applicable additional charges will always be clearly communicated before you proceed.",
    },
    {
      question: "Do I need to pay for every product separately?",
      answer:
        "Not necessarily. Our plans bundle core compliance services together. If you only need a specific service, you can also choose an individual product instead of taking a full plan.",
    },
    {
      question: "What happens if I have multiple companies?",
      answer:
        "If you manage multiple companies, the Portfolio plan supports up to 12 companies, while Portfolio Plus supports up to 150 companies.",
    },
    {
      question: "Is VAT included in the prices?",
      answer:
        "Prices are shown excluding VAT where applicable. Any applicable VAT will be displayed during the checkout process.",
    },
    {
      question: "Do you offer support?",
      answer:
        "Yes. All plans include standard support. Portfolio Plus also includes priority support for businesses that need faster assistance.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F5FCF9] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-[#E5F7F0] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#087F5B]">
            Pricing FAQ
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#09263A] sm:text-4xl">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#687B78] sm:text-base">
            Everything you need to know about our plans, pricing and
            subscriptions.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border bg-white transition-all duration-200 ${
                  isOpen
                    ? "border-[#B8DED1] shadow-[0_8px_25px_rgba(0,62,62,0.06)]"
                    : "border-[#DDEAE6]"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span
                    className={`text-sm font-semibold transition-colors sm:text-[15px] ${
                      isOpen ? "text-[#087F5B]" : "text-[#09263A]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isOpen
                        ? "bg-[#087F5B] text-white"
                        : "bg-[#E5F7F0] text-[#087F5B]"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#EDF3F1] px-5 pb-5 pt-4 sm:px-6">
                      <p className="max-w-3xl text-sm leading-7 text-[#687B78]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#687B78]">
            Still have questions?{" "}
            <a
              href="/help"
              className="font-semibold text-[#087F5B] transition-colors hover:text-[#005E45]"
            >
              Visit our Help Centre →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;