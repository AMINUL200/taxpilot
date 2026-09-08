import React from "react";
import { CheckCircle2, FileText, BarChart3 } from "lucide-react";

const points = [
  "Calculate taxable profits",
  "Prepare Corporation Tax returns",
  "Generate tax computations",
  "Submit returns to HMRC",
  "Keep compliance information organised",
];

const CorporationTaxOverview = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left text */}
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
              Your Corporation Tax return, without the hassle
            </h2>

            <p className="mt-4 text-[15px] leading-6 text-[#687B78]">
              ComplyTax brings everything your business needs for Corporation
              Tax into one place, so nothing gets missed and nothing needs a
              spreadsheet.
            </p>

            <ul className="mt-7 flex flex-col gap-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E5F7F0] text-[#087F5B]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-[#09263A]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#F5FCF9]" />

            <div className="relative rounded-2xl border border-[#DDEAE6] bg-white p-6 shadow-[0_18px_40px_rgba(9,38,58,0.08)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F7F0] text-[#087F5B]">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#09263A]">CT600 return</p>
                  <p className="text-[11px] text-[#71827F]">Auto-prepared from your figures</p>
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#71827F]">Taxable profit</span>
                  <span className="font-semibold text-[#09263A]">£22,400.00</span>
                </div>
                <div className="h-px w-full bg-[#DDEAE6]" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#71827F]">Corporation Tax rate</span>
                  <span className="font-semibold text-[#09263A]">19%</span>
                </div>
                <div className="h-px w-full bg-[#DDEAE6]" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#71827F]">Tax due</span>
                  <span className="font-semibold text-[#09263A]">£4,256.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2.5">
                <BarChart3 className="h-4 w-4 text-[#087F5B]" />
                <span className="text-[11px] font-medium text-[#09263A]">
                  Computation generated automatically
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxOverview;