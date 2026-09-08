import React from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPlans = ({ billing = "yearly" }) => {
  const plans = [
    {
      name: "Dormant",
      description: "For dormant companies",
      monthlyPrice: 2,
      yearlyPrice: 20,
      period: "year",
      companies: "1 dormant company",
      features: [
        "Dormant accounts",
        "Corporation Tax return",
        "Companies House filing",
        "Secure online account",
      ],
      button: "Choose Dormant",
      popular: false,
    },

    {
      name: "Solo",
      description: "For one trading company",
      monthlyPrice: 6,
      yearlyPrice: 59,
      period: "year",
      companies: "1 trading company",
      features: [
        "Corporation Tax",
        "Annual Accounts",
        "Companies House filing",
        "HMRC filing",
        "Tax computation",
        "iXBRL accounts",
      ],
      button: "Get started",
      popular: true,
    },

    {
      name: "Portfolio",
      description: "For multiple companies",
      monthlyPrice: 19,
      yearlyPrice: 189,
      period: "year",
      companies: "Up to 12 companies",
      features: [
        "Corporation Tax",
        "Annual Accounts",
        "Companies House filing",
        "Multi-company dashboard",
        "Tax computations",
        "iXBRL accounts",
      ],
      button: "Choose Portfolio",
      popular: false,
    },

    {
      name: "Portfolio Plus",
      description: "For growing practices",
      monthlyPrice: 55,
      yearlyPrice: 549,
      period: "year",
      companies: "Up to 150 companies",
      features: [
        "Everything in Portfolio",
        "Multi-client dashboard",
        "Centralised management",
        "Client management",
        "Priority support",
      ],
      button: "Choose Portfolio Plus",
      popular: false,
    },
  ];

  return (
    <section className="bg-[#F5FCF9] pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">
            Choose your plan
          </p>

          <h2 className="text-[30px] font-bold tracking-[-0.025em] text-[#09263A] sm:text-[34px]">
            Simple plans. No surprises.
          </h2>

          <p className="mt-3 text-[14px] leading-6 text-[#71827F]">
            Everything you need to manage your UK tax and compliance
            in one simple platform.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          {plans.map((plan) => {
            const price =
              billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-6 transition-all duration-200 ${
                  plan.popular
                    ? "border-2 border-[#087F5B] shadow-[0_15px_40px_rgba(8,127,91,0.12)]"
                    : "border border-[#DDEAE6] shadow-[0_8px_25px_rgba(0,62,62,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,62,62,0.08)]"
                }`}
              >

                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#087F5B] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </div>
                )}

                {/* Plan name */}
                <div>
                  <h3 className="text-[19px] font-bold tracking-[-0.015em] text-[#09263A]">
                    {plan.name}
                  </h3>

                  <p className="mt-1.5 min-h-[20px] text-[12px] text-[#71827F]">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-end gap-1">

                    <span className="text-[38px] font-bold leading-none tracking-[-0.04em] text-[#09263A]">
                      £{price}
                    </span>

                    <span className="mb-1 text-[11px] text-[#8A9B97]">
                      /{plan.period}
                    </span>

                  </div>

                  {billing === "monthly" && (
                    <p className="mt-2 text-[10px] text-[#8A9B97]">
                      Billed monthly
                    </p>
                  )}

                  {billing === "yearly" && (
                    <p className="mt-2 text-[10px] font-medium text-[#087F5B]">
                      Billed annually
                    </p>
                  )}
                </div>

                {/* Company count */}
                <div className="mt-5 rounded-lg bg-[#F5FCF9] px-3 py-2.5">
                  <p className="text-[12px] font-semibold text-[#314D4A]">
                    {plan.companies}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-[#E6EEEB]" />

                {/* Features */}
                <div className="flex-1">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8A9B97]">
                    Includes
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5"
                      >
                        <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E5F7F0]">
                          <Check className="h-2.5 w-2.5 text-[#087F5B]" />
                        </div>

                        <span className="text-[11px] leading-5 text-[#526966]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  to="/register"
                  className={`group mt-7 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[12px] font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-[#087F5B] text-white shadow-[0_5px_15px_rgba(8,127,91,0.16)] hover:bg-[#005E45]"
                      : "border border-[#087F5B] bg-white text-[#087F5B] hover:bg-[#087F5B] hover:text-white"
                  }`}
                >
                  <span>{plan.button}</span>

                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>
            );
          })}

        </div>

        {/* Bottom reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <div className="flex items-center gap-2 text-[11px] text-[#71827F]">
            <Check className="h-3.5 w-3.5 text-[#087F5B]" />
            No hidden fees
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#71827F]">
            <Check className="h-3.5 w-3.5 text-[#087F5B]" />
            Cancel anytime
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#71827F]">
            <Check className="h-3.5 w-3.5 text-[#087F5B]" />
            Secure payments
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#71827F]">
            <Check className="h-3.5 w-3.5 text-[#087F5B]" />
            UK-focused support
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingPlans;