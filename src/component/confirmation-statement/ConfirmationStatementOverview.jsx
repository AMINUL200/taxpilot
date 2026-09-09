import React from "react";
import { CheckCircle2 } from "lucide-react";

const ConfirmationStatementOverview = () => {
  const points = [
    "Review company information",
    "Check registered office details",
    "Review directors and officers",
    "Review shareholders and share information",
    "Check people with significant control",
    "Review company information before filing",
    "Prepare your Confirmation Statement",
    "Submit it to Companies House",
    "Keep filing records organised",
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — TEXT */}
          <div>
            <h2 className="max-w-[480px] text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-4xl">
              Keep your company information up to date
            </h2>

            <p className="mt-4 max-w-[480px] text-sm leading-6 text-[#687B78] sm:text-base">
              ComplyTax UK helps you stay on top of your annual company
              filing requirements, from checking your details to submitting
              your statement.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
                  <span className="text-sm leading-5 text-[#09263A]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — COMPANY INFORMATION VISUAL */}
          <div className="mx-auto w-full max-w-[420px]">
            <div className="rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-6 shadow-[0_10px_30px_rgba(9,38,58,0.06)] sm:p-7">
              <p className="text-sm font-bold text-[#09263A]">
                Company information
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-[#DDEAE6] pb-3">
                  <span className="text-[#687B78]">Company name</span>
                  <span className="font-semibold text-[#09263A]">
                    ABC LIMITED
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[#DDEAE6] pb-3">
                  <span className="text-[#687B78]">Registered office</span>
                  <span className="font-semibold text-[#09263A]">
                    London, UK
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[#DDEAE6] pb-3">
                  <span className="text-[#687B78]">Directors</span>
                  <span className="font-semibold text-[#09263A]">2</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#DDEAE6] pb-3">
                  <span className="text-[#687B78]">Shareholders</span>
                  <span className="font-semibold text-[#09263A]">3</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#DDEAE6] pb-3">
                  <span className="text-[#687B78]">PSC records</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#087F5B]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Reviewed
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#687B78]">Status</span>
                  <span className="rounded-full bg-[#E5F7F0] px-2.5 py-1 text-[11px] font-bold text-[#087F5B]">
                    Up to date
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementOverview;