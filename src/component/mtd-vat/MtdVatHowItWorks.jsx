import React from "react";

const steps = [
  {
    number: "01",
    title: "Connect your VAT information",
    description: "Bring your sales and purchase information together in one place.",
  },
  {
    number: "02",
    title: "Review your VAT return",
    description: "Review your VAT figures and check your return before submission.",
  },
  {
    number: "03",
    title: "Submit to HMRC",
    description: "Complete your VAT filing through the HMRC-compatible process.",
  },
];

const MtdVatHowItWorks = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
            Manage your VAT in 3 simple steps
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {/* connecting line — desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-[#DDEAE6] sm:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start">
              <span className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-[#087F5B] ring-1 ring-[#DDEAE6]">
                {step.number}
              </span>

              <h3 className="text-base font-bold text-[#09263A]">{step.title}</h3>
              <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#687B78]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MtdVatHowItWorks;