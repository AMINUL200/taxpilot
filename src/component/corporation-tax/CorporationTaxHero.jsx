import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, CheckCircle2, FileCheck2, Send, Calculator } from "lucide-react";

const CorporationTaxHero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative mint shapes */}
      <div className="pointer-events-none absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-[#E5F7F0] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-[320px] w-[320px] rounded-full bg-[#F5FCF9]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#DDEAE6] bg-[#F5FCF9] px-3 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#087F5B]">
                Corporation Tax
              </span>
            </div>

            <h1 className="text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-[#09263A] sm:text-[48px] lg:text-[54px]">
              Corporation Tax made simple
            </h1>

            <p className="mt-5 max-w-[520px] text-[15px] leading-6 text-[#687B78] sm:text-base">
              Prepare and file your UK Corporation Tax return without the
              paperwork headache. ComplyTax helps you calculate your tax,
              prepare your return and submit it to HMRC.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#087F5B] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#005E45]"
              >
                <span>Start your Corporation Tax return</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/help"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#DDEAE6] bg-white px-6 text-sm font-semibold text-[#09263A] transition-colors duration-200 hover:border-[#087F5B]/40"
              >
                <PlayCircle className="h-4 w-4 text-[#087F5B]" />
                <span>See how it works</span>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#71827F]">
              <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
              <span>Secure online filing · Built for UK businesses</span>
            </div>
          </div>

          {/* Right visual — dashboard mockup */}
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto">
            <div className="relative rounded-2xl border border-[#DDEAE6] bg-white p-5 shadow-[0_20px_45px_rgba(9,38,58,0.09)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#09263A]">Corporation Tax</p>
                  <p className="text-[11px] text-[#71827F]">Year ending 31 Mar 2026</p>
                </div>
                <span className="rounded-full bg-[#E5F7F0] px-2.5 py-1 text-[10px] font-semibold text-[#087F5B]">
                  Ready to file
                </span>
              </div>

              <div className="mb-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between rounded-xl bg-[#F5FCF9] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-[#087F5B]" />
                    <span className="text-xs font-medium text-[#09263A]">Tax calculation complete</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#F5FCF9] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-[#087F5B]" />
                    <span className="text-xs font-medium text-[#09263A]">Tax return ready</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#F5FCF9] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-[#71827F]" />
                    <span className="text-xs font-medium text-[#09263A]">HMRC filing</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#71827F]">Pending</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#004646] px-4 py-3.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#65D9BB]">
                  Amount due
                </p>
                <p className="mt-1 text-2xl font-bold text-white">£4,280.00</p>
              </div>
            </div>

            {/* small floating accent */}
            <div className="absolute -left-6 -top-6 hidden h-16 w-16 items-center justify-center rounded-2xl border border-[#DDEAE6] bg-white shadow-[0_10px_25px_rgba(9,38,58,0.1)] sm:flex">
              <FileCheck2 className="h-7 w-7 text-[#087F5B]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxHero;