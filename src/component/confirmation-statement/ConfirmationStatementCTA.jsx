import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ConfirmationStatementCTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#004646]">
      <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#65D9BB] opacity-[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-[-160px] h-[320px] w-[320px] rounded-full bg-[#65D9BB] opacity-[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl">
          Ready to keep your company compliant?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
          Review your company information and file your Confirmation
          Statement with Companies House through a simple online process.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#65D9BB] px-6 py-3.5 text-sm font-semibold text-[#004646] transition-colors duration-200 hover:bg-white"
          >
            File your Confirmation Statement
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            View pricing
          </Link>
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.08em] text-white/50">
          Secure online filing · Simple company compliance · Built for UK
          businesses
        </p>
      </div>
    </section>
  );
};

export default ConfirmationStatementCTA;