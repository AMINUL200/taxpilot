import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const PricingHero = () => {
  const [billing, setBilling] = useState("yearly");

  return (
    <section className="relative overflow-hidden bg-background-mint-pale">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-mint opacity-70 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-accent-soft opacity-80 blur-3xl" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute right-[12%] top-[20%] hidden h-20 w-20 rounded-full border border-accent-light lg:block" />

      <div className="pointer-events-none absolute bottom-[15%] left-[10%] hidden h-12 w-12 rounded-full border border-accent-light lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">

          {/* Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-light bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              Simple Pricing
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[38px] font-bold leading-[1.12] tracking-[-0.035em] text-plum sm:text-[48px] lg:text-[54px]">
            Plans for{" "}
            <span className="text-primary">
              every business
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-[14px] leading-7 text-text-secondary sm:text-[15px]">
            Choose the right plan for your needs. Simple, transparent
            pricing with no hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
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

              {/* Save badge */}
              <div className="ml-2 flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-2">
                <Check className="h-3.5 w-3.5 text-accent" />

                <span className="text-[11px] font-bold text-accent-hover">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* Small reassurance */}
          <p className="mt-5 text-[11px] text-text-muted">
            No contracts · No hidden fees · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;