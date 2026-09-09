import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const ConfirmationStatementPricing = () => {
  const features = [
    "Confirmation Statement preparation",
    "Company information review",
    "Companies House filing",
    "Secure online account",
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-4xl">
          Simple Confirmation Statement pricing
        </h2>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-8 shadow-[0_10px_30px_rgba(9,38,58,0.06)]">
          <p className="text-sm font-bold text-[#09263A]">
            Confirmation Statement
          </p>

          <div className="mt-3 flex items-end gap-1">
            <span className="text-4xl font-bold tracking-[-0.02em] text-[#09263A]">
              £74
            </span>
            <span className="pb-1 text-sm text-[#687B78]">/year</span>
          </div>

          <ul className="mt-6 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
                <span className="text-sm leading-5 text-[#09263A]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/register"
            className="mt-7 flex w-full items-center justify-center rounded-lg bg-[#087F5B] py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#005E45]"
          >
            Get started
          </Link>
        </div>

        <div className="mx-auto mt-8 max-w-md text-center">
          <p className="text-sm leading-6 text-[#687B78]">
            Need Corporation Tax and Annual Accounts too? Explore our
            complete business compliance plans.
          </p>
          <Link
            to="/pricing"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#087F5B] hover:text-[#005E45]"
          >
            View all plans
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementPricing;