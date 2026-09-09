import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2, Landmark } from "lucide-react";

const ConfirmationStatementHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-[#DDEAE6] bg-[#E5F7F0] px-3 py-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#087F5B]">
                Confirmation Statement
              </span>
            </div>

            <h1 className="max-w-[560px] text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-5xl lg:text-[52px]">
              Confirmation Statement made simple
            </h1>

            <p className="mt-5 max-w-[500px] text-base leading-7 text-[#687B78] sm:text-lg">
              Keep your company information up to date and file your
              Confirmation Statement with Companies House without the
              paperwork headache.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#005E45]"
              >
                File your Confirmation Statement
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/help"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-6 py-3.5 text-sm font-semibold text-[#09263A] transition-colors duration-200 hover:border-[#087F5B]/30 hover:bg-[#F5FCF9]"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* RIGHT — DASHBOARD VISUAL */}
          <div className="relative mx-auto w-full max-w-[440px]">
            {/* Floating tag: Companies House */}
            <div className="absolute -left-4 -top-5 z-20 hidden items-center gap-2 rounded-xl border border-[#DDEAE6] bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(9,38,58,0.08)] sm:flex">
              <Landmark className="h-4 w-4 text-[#087F5B]" />
              <span className="text-xs font-semibold text-[#09263A]">
                Companies House
              </span>
            </div>

            {/* Main card */}
            <div className="relative rounded-2xl border border-[#DDEAE6] bg-white p-6 shadow-[0_20px_50px_rgba(9,38,58,0.1)] sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#DDEAE6] pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5F7F0]">
                  <Building2 className="h-5 w-5 text-[#087F5B]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#09263A]">
                    Confirmation Statement
                  </p>
                  <p className="text-xs text-[#71827F]">ABC LIMITED</p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#687B78]">Company</span>
                  <span className="font-semibold text-[#09263A]">
                    ABC LIMITED
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#687B78]">Company number</span>
                  <span className="font-semibold text-[#09263A]">
                    12345678
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#687B78]">Statement date</span>
                  <span className="font-semibold text-[#09263A]">
                    30 September 2026
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#687B78]">Company information</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#087F5B]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Up to date
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#687B78]">PSC information</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#087F5B]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Reviewed
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#F5FCF9] px-3 py-2.5">
                  <span className="text-[#687B78]">Filing status</span>
                  <span className="rounded-full bg-[#087F5B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Ready to file
                  </span>
                </div>
              </div>

              <button className="mt-5 w-full rounded-lg bg-[#004646] py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#005E45]">
                Review statement
              </button>
            </div>

            {/* Floating tag: Confirmation Statement READY */}
            <div className="absolute -bottom-5 -right-4 z-20 hidden items-center gap-2 rounded-xl border border-[#DDEAE6] bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(9,38,58,0.08)] sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#65D9BB]" />
              <span className="text-xs font-semibold text-[#09263A]">
                Confirmation Statement READY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementHero;