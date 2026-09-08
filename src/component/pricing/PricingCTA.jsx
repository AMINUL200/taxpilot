import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#004646] py-20 sm:py-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#65D9BB]/10" />
      <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full border border-[#65D9BB]/10" />

      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full border border-[#65D9BB]/10" />
      <div className="pointer-events-none absolute -bottom-16 -right-8 h-52 w-52 rounded-full border border-[#65D9BB]/10" />

      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute left-[15%] top-10 h-32 w-32 rounded-full bg-[#65D9BB]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[15%] h-40 w-40 rounded-full bg-[#65D9BB]/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">

        {/* Eyebrow */}
        <div className="mb-5 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-[#65D9BB]/25 bg-[#65D9BB]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#65D9BB]">
            Ready to get started?
          </span>
        </div>

        {/* Heading */}
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Choose the plan that works
          <span className="text-[#65D9BB]"> for you.</span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
          Get your UK tax and company compliance sorted with simple,
          transparent pricing. No complicated contracts. No hidden surprises.
        </p>

        {/* Benefits */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {[
            "No hidden fees",
            "Cancel anytime",
            "Secure online filing",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-xs font-medium text-white/75"
            >
              <CheckCircle2 className="h-4 w-4 text-[#65D9BB]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#65D9BB] px-6 py-3.5 text-sm font-bold text-[#004646] shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-200 hover:bg-[#7BE5C9] hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          >
            Get started for free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/help"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/5"
          >
            Talk to our team
          </Link>
        </div>

        {/* Small reassurance */}
        <p className="mt-6 text-[11px] text-white/40">
          Set up your account in minutes and start managing your compliance
          online.
        </p>
      </div>
    </section>
  );
};

export default PricingCTA;