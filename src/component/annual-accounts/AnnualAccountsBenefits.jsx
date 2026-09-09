import React from "react";
import { CheckCircle2, FileCheck2 } from "lucide-react";

const benefits = [
  "Save time preparing company accounts",
  "Reduce manual paperwork",
  "Keep financial information organised",
  "Make Companies House filing easier",
  "Know what needs to be filed",
  "Manage everything online",
];

const AnnualAccountsBenefits = () => {
  return (
    <section className="relative overflow-hidden bg-[#004646]">
      <div className="pointer-events-none absolute right-[-120px] top-[-140px] h-[380px] w-[380px] rounded-full bg-[#65D9BB] opacity-[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-[340px] w-[340px] rounded-full bg-[#65D9BB] opacity-[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left content */}
          <div>
            <h2 className="max-w-[420px] text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl">
              Take the stress out of annual accounts
            </h2>

            <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#9FBBB0]">
              Built to keep annual accounts preparation simple, so your
              company stays filed on time, every year.
            </p>

            {/* Accounts status visual */}
            <div className="mt-8 max-w-[360px] rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Accounts status</span>
                <span className="rounded-full bg-[#65D9BB]/15 px-2.5 py-1 text-[10px] font-semibold text-[#65D9BB]">
                  Ready to file
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#65D9BB]/15 text-[#65D9BB]">
                  <FileCheck2 className="h-4 w-4" />
                </span>
                <span className="text-xs text-[#9FBBB0]">
                  ABC Consulting Ltd · Year ending 31 Mar 2026
                </span>
              </div>
            </div>
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

export default AnnualAccountsBenefits;