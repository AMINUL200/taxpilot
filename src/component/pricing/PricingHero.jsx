import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const PricingHero = () => {
  const [billing, setBilling] = useState("yearly");

  return (
    <section className="relative overflow-hidden bg-[#F5FCF9]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#DDF5EC] opacity-70 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[#E7F8F2] opacity-80 blur-3xl" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute right-[12%] top-[20%] hidden h-20 w-20 rounded-full border border-[#C9EDE1] lg:block" />

      <div className="pointer-events-none absolute bottom-[15%] left-[10%] hidden h-12 w-12 rounded-full border border-[#C9EDE1] lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">

          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9EDE1] bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#087F5B]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#087F5B]">
              Simple Pricing
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[38px] font-bold leading-[1.12] tracking-[-0.035em] text-[#09263A] sm:text-[48px] lg:text-[54px]">
            Plans for{" "}
            <span className="text-[#087F5B]">
              every business
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-7 text-[#687B78] sm:text-[15px]">
            Choose the right plan for your needs. Simple, transparent
            pricing with no hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-xl border border-[#D7E7E2] bg-white p-1.5 shadow-[0_6px_20px_rgba(0,62,62,0.06)]">

              {/* Monthly */}
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`rounded-lg px-5 py-2.5 text-[12px] font-semibold transition-all duration-200 ${
                  billing === "monthly"
                    ? "bg-[#087F5B] text-white shadow-sm"
                    : "text-[#607773] hover:text-[#087F5B]"
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
                    ? "bg-[#087F5B] text-white shadow-sm"
                    : "text-[#607773] hover:text-[#087F5B]"
                }`}
              >
                Yearly
              </button>

              {/* Save badge */}
              <div className="ml-2 flex items-center gap-1.5 rounded-lg bg-[#E5F7F0] px-3 py-2">
                <Check className="h-3.5 w-3.5 text-[#087F5B]" />

                <span className="text-[11px] font-bold text-[#087F5B]">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* Small reassurance */}
          <p className="mt-5 text-[11px] text-[#8A9B97]">
            No contracts · No hidden fees · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;