import React from "react";
import { Building2, FileCheck2, Lock, ShieldCheck } from "lucide-react";

const items = [
  { icon: Building2, label: "Companies House filing" },
  { icon: FileCheck2, label: "Accurate accounts" },
  { icon: Lock, label: "Secure online platform" },
  { icon: ShieldCheck, label: "Built for UK companies" },
];

const AnnualAccountsTrust = () => {
  return (
    <section className="border-y border-[#DDEAE6] bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-semibold text-[#09263A] sm:text-left">
          Everything you need for your annual accounts
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

export default AnnualAccountsTrust;