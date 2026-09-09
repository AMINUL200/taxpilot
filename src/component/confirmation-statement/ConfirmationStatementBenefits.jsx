import React from "react";
import { CheckCircle2 } from "lucide-react";

const ConfirmationStatementBenefits = () => {
  const benefits = [
    "Save time on annual company filings",
    "Keep important company information organised",
    "Reduce manual paperwork",
    "Review your information before filing",
    "Make Companies House filing easier",
    "Manage your company compliance online",
  ];

  const checklist = [
    "Company details",
    "Directors",
    "Shareholders",
    "PSC information",
    "Confirmation Statement",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#004646]">
      <div className="pointer-events-none absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full bg-[#65D9BB] opacity-[0.08] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-180px] left-[-120px] h-[400px] w-[400px] rounded-full bg-[#65D9BB] opacity-[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT — TEXT */}
          <div>
            <h2 className="max-w-[440px] text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">
              Make company compliance easier
            </h2>

            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#65D9BB]" />
                  <span className="text-sm leading-5 text-white/90">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — COMPLIANCE STATUS VISUAL */}
          <div className="mx-auto w-full max-w-[400px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-sm font-bold text-white">
                Company Compliance
              </p>

              <div className="mt-4 space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-white/80">{item}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#65D9BB]" />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  Status
                </span>
                <span className="rounded-full bg-[#65D9BB] px-3 py-1 text-[11px] font-bold text-[#004646]">
                  Ready to file
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementBenefits;