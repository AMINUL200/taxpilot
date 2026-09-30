import React from "react";
import { Check } from "lucide-react";

const BillingToggle = ({ billing, setBilling }) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center rounded-xl border border-border-light bg-white p-1.5 shadow-[0_6px_20px_rgba(32,21,22,0.06)]">

        {/* Monthly */}
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          className={`rounded-lg px-5 py-2.5 text-[12px] font-semibold transition-all duration-200 ${
            billing === "monthly"
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:text-primary"
          }`}
        >
          Monthly
        </button>

        {/* Yearly */}
        <button
          type="button"
          onClick={() => setBilling("yearly")}
          className={`rounded-lg px-5 py-2.5 text-[12px] font-semibold transition-all duration-200 ${
            billing === "yearly"
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:text-primary"
          }`}
        >
          Yearly
        </button>

        {/* Save 20% */}
        <div className="ml-2 flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-2">
          <Check className="h-3.5 w-3.5 text-accent" />

          <span className="text-[11px] font-bold whitespace-nowrap text-accent-hover">
            Save 20%
          </span>
        </div>
      </div>
    </div>
  );
};

export default BillingToggle;