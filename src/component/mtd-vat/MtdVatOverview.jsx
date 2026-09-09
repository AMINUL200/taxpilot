import React from "react";
import { CheckCircle2, Receipt, TrendingUp } from "lucide-react";

const points = [
  "Keep VAT information organised",
  "Track sales and purchases",
  "Calculate VAT",
  "Prepare VAT returns",
  "Review VAT figures",
  "Submit VAT returns to HMRC",
  "Keep digital records",
];

const MtdVatOverview = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left text */}
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
              VAT compliance without the spreadsheet headache
            </h2>

            <p className="mt-4 text-[15px] leading-6 text-[#687B78]">
              ComplyTax keeps your VAT information in one place, so preparing
              and submitting your return doesn't mean piecing figures
              together from scratch each quarter.
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

          {/* Right visual — VAT summary */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-[#F5FCF9]" />

            <div className="relative rounded-2xl border border-[#DDEAE6] bg-white p-6 shadow-[0_18px_40px_rgba(9,38,58,0.08)]">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F7F0] text-[#087F5B]">
                  <Receipt className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#09263A]">VAT Summary</p>
                  <p className="text-[11px] text-[#71827F]">Current VAT period</p>
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#71827F]">Output VAT</span>
                  <span className="font-semibold text-[#09263A]">£5,420.00</span>
                </div>
                <div className="h-px w-full bg-[#DDEAE6]" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#71827F]">Input VAT</span>
                  <span className="font-semibold text-[#09263A]">£2,180.00</span>
                </div>
                <div className="h-px w-full bg-[#DDEAE6]" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#71827F]">VAT liability</span>
                  <span className="font-semibold text-[#09263A]">£3,240.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2.5">
                <TrendingUp className="h-4 w-4 text-[#087F5B]" />
                <span className="text-[11px] font-medium text-[#09263A]">
                  Return status: Ready to submit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MtdVatOverview;