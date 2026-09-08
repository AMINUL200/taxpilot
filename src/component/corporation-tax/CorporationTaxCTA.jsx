import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CorporationTaxCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#004646]">
      <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-[340px] w-[340px] rounded-full bg-[#65D9BB] opacity-[0.08] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-150px] left-[10%] h-[300px] w-[300px] rounded-full bg-[#65D9BB] opacity-[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl">
          Ready to take the hassle out of Corporation Tax?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#9FBBB0] sm:text-[15px]">
          Prepare, calculate and file your Corporation Tax return with
          ComplyTax.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#65D9BB] px-6 text-sm font-semibold text-[#004646] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            <span>Start your Corporation Tax return</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/pricing"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <span>View pricing</span>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-[#9FBBB0]">
          <ShieldCheck className="h-4 w-4 text-[#65D9BB]" />
          <span>No complicated setup · Secure online filing · Built for UK businesses</span>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxCTA;