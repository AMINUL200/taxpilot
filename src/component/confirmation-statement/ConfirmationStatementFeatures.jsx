import React from "react";
import {
  Building2,
  Users,
  BadgePoundSterling,
  UserCheck,
  FileCheck,
  Send,
} from "lucide-react";

const ConfirmationStatementFeatures = () => {
  const features = [
    {
      title: "Company information",
      description:
        "Review the key information held about your company before filing.",
      icon: Building2,
    },
    {
      title: "Director details",
      description:
        "Check your company's director and officer information.",
      icon: Users,
    },
    {
      title: "Shareholder information",
      description: "Review relevant shareholder and share information.",
      icon: BadgePoundSterling,
    },
    {
      title: "PSC information",
      description:
        "Review your people with significant control information.",
      icon: UserCheck,
    },
    {
      title: "Confirmation Statement",
      description:
        "Prepare your annual Confirmation Statement with a simple online process.",
      icon: FileCheck,
    },
    {
      title: "Companies House filing",
      description:
        "Submit your Confirmation Statement electronically to Companies House.",
      icon: Send,
    },
  ];

  return (
    <section className="w-full bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-4xl">
          Everything you need to keep your company records up to date
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col rounded-2xl border border-[#DDEAE6] bg-white p-6 shadow-[0_3px_14px_rgba(9,38,58,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#087F5B]/20 hover:shadow-[0_10px_25px_rgba(9,38,58,0.08)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F7F0]">
                  <Icon className="h-5 w-5 text-[#087F5B]" strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-bold text-[#09263A]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#687B78]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementFeatures;