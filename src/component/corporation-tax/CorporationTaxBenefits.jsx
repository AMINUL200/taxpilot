import React from "react";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Save time on compliance",
  "Reduce manual calculations",
  "Avoid unnecessary paperwork",
  "File online from anywhere",
  "Keep your company information organised",
  "Know what you need to file and when",
];

const CorporationTaxBenefits = () => {
  return (
    <section className="relative overflow-hidden bg-[#004646]">
      <div className="pointer-events-none absolute right-[-120px] top-[-140px] h-[380px] w-[380px] rounded-full bg-[#65D9BB] opacity-[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-[340px] w-[340px] rounded-full bg-[#65D9BB] opacity-[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left content */}
          <div>
            <h2 className="max-w-[420px] text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl">
              Why businesses choose ComplyTax
            </h2>

            <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#9FBBB0]">
              Built to take the manual work out of Corporation Tax, so you can
              file accurately and move on with running your business.
            </p>
          </div>

          {/* Benefits checklist cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#65D9BB]/15 text-[#65D9BB]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxBenefits;