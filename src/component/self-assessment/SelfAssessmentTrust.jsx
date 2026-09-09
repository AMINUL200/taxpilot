import React from "react";
import { ShieldCheck, Calculator, Lock, UserRound } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "HMRC-compatible filing" },
  { icon: Calculator, label: "Simple tax calculations" },
  { icon: Lock, label: "Secure online account" },
  { icon: UserRound, label: "Built for UK taxpayers" },
];

const SelfAssessmentTrust = () => {
  return (
    <section className="border-y border-[#DDEAE6] bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-semibold text-[#09263A] sm:text-left">
          Everything you need for your Self Assessment
        </p>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#087F5B] ring-1 ring-[#DDEAE6]">
                <Icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="text-xs font-medium leading-tight text-[#09263A]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelfAssessmentTrust;