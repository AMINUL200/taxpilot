import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  "Digital VAT records",
  "VAT return preparation",
  "HMRC submission",
  "Secure online account",
];

const MtdVatPricing = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
            Simple MTD VAT pricing
          </h2>
        </div>

        <div className="mx-auto max-w-md rounded-2xl border border-[#DDEAE6] bg-white p-8 shadow-[0_20px_45px_rgba(9,38,58,0.08)]">
          <p className="text-sm font-bold text-[#09263A]">MTD VAT</p>

          <div className="mt-3 flex items-end gap-1.5">
            <span className="text-[44px] font-bold leading-none tracking-[-0.02em] text-[#09263A]">
              £29
            </span>
            <span className="pb-1 text-sm font-medium text-[#71827F]">/year</span>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#087F5B]" />
                <span className="text-sm font-medium text-[#09263A]">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/register"
            className="mt-7 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#005E45]"
          >
            <span>Get started</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-2 text-center">
          <p className="text-sm text-[#687B78]">
            Need more than MTD VAT? Explore our complete business compliance
            plans.
          </p>

          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F5B] transition-all duration-200 hover:gap-2.5"
          >
            <span>View all plans</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MtdVatPricing;