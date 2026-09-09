import React from "react";

const ConfirmationStatementHowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Review your company details",
      description:
        "Check your company information and make sure everything is accurate and up to date.",
    },
    {
      number: "02",
      title: "Confirm your information",
      description:
        "Review your directors, shareholders, PSC information and other relevant company details.",
    },
    {
      number: "03",
      title: "File with Companies House",
      description:
        "Submit your Confirmation Statement electronically and keep your filing records organised.",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="mx-auto max-w-xl text-center text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-4xl">
          File your Confirmation Statement in 3 simple steps
        </h2>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {/* Connecting line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-[#DDEAE6] sm:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col">
              <span className="relative z-10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#DDEAE6] bg-white text-sm font-bold text-[#087F5B]">
                {step.number}
              </span>
              <h3 className="text-base font-bold text-[#09263A]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[280px] text-sm leading-6 text-[#687B78]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementHowItWorks;