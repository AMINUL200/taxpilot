import React from "react";
import { Check, Minus } from "lucide-react";

const CompareFeatures = () => {
  const features = [
    {
      category: "Core compliance",
      items: [
        {
          name: "Corporation Tax return",
          dormant: true,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "Annual Accounts",
          dormant: false,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "Companies House filing",
          dormant: true,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "HMRC filing",
          dormant: false,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "Tax computation",
          dormant: false,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "iXBRL accounts",
          dormant: false,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
      ],
    },
    {
      category: "Company management",
      items: [
        {
          name: "Secure online account",
          dormant: true,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "Multi-company dashboard",
          dormant: false,
          solo: false,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "Multi-client dashboard",
          dormant: false,
          solo: false,
          portfolio: false,
          portfolioPlus: true,
        },
        {
          name: "Centralised management",
          dormant: false,
          solo: false,
          portfolio: false,
          portfolioPlus: true,
        },
        {
          name: "Client management",
          dormant: false,
          solo: false,
          portfolio: false,
          portfolioPlus: true,
        },
      ],
    },
    {
      category: "Support",
      items: [
        {
          name: "Standard support",
          dormant: true,
          solo: true,
          portfolio: true,
          portfolioPlus: true,
        },
        {
          name: "Priority support",
          dormant: false,
          solo: false,
          portfolio: false,
          portfolioPlus: true,
        },
      ],
    },
  ];

  const renderStatus = (available) => {
    return available ? (
      <div className="flex justify-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5F7F0]">
          <Check className="h-3.5 w-3.5 text-[#087F5B]" strokeWidth={2.5} />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <Minus className="h-4 w-4 text-[#B7C8C4]" />
      </div>
    );
  };

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-[#E5F7F0] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#087F5B]">
            Compare plans
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#09263A] sm:text-4xl">
            Compare features
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#687B78] sm:text-base">
            Everything you need to stay compliant, clearly laid out so you can
            choose the plan that works best for you.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-[#DDEAE6] bg-white shadow-[0_10px_40px_rgba(0,62,62,0.06)] md:block">

          {/* Table Header */}
          <div className="grid grid-cols-[minmax(260px,1.7fr)_repeat(4,minmax(130px,1fr))] border-b border-[#DDEAE6]">

            <div className="flex items-center px-6 py-5">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#71827F]">
                Features
              </span>
            </div>

            <div className="px-4 py-5 text-center">
              <p className="text-sm font-bold text-[#09263A]">
                Dormant
              </p>
              <p className="mt-1 text-[11px] text-[#71827F]">
                1 company
              </p>
            </div>

            {/* Highlighted Plan */}
            <div className="relative bg-[#F5FCF9] px-4 py-5 text-center">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#087F5B] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                Popular
              </div>

              <p className="text-sm font-bold text-[#087F5B]">
                Solo
              </p>
              <p className="mt-1 text-[11px] text-[#71827F]">
                1 company
              </p>
            </div>

            <div className="px-4 py-5 text-center">
              <p className="text-sm font-bold text-[#09263A]">
                Portfolio
              </p>
              <p className="mt-1 text-[11px] text-[#71827F]">
                Up to 12
              </p>
            </div>

            <div className="px-4 py-5 text-center">
              <p className="text-sm font-bold text-[#09263A]">
                Portfolio Plus
              </p>
              <p className="mt-1 text-[11px] text-[#71827F]">
                Up to 150
              </p>
            </div>
          </div>

          {/* Table Body */}
          {features.map((group, groupIndex) => (
            <div key={group.category}>

              {/* Category */}
              <div className="grid grid-cols-[minmax(260px,1.7fr)_repeat(4,minmax(130px,1fr))] bg-[#F8FCFA]">
                <div className="px-6 py-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#087F5B]">
                    {group.category}
                  </span>
                </div>

                <div />
                <div className="bg-[#F5FCF9]" />
                <div />
                <div />
              </div>

              {/* Features */}
              {group.items.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-[minmax(260px,1.7fr)_repeat(4,minmax(130px,1fr))] ${
                    groupIndex === features.length - 1 &&
                    index === group.items.length - 1
                      ? ""
                      : "border-b border-[#EDF3F1]"
                  }`}
                >
                  <div className="flex items-center px-6 py-4">
                    <span className="text-sm text-[#4F6460]">
                      {feature.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4">
                    {renderStatus(feature.dormant)}
                  </div>

                  <div className="flex items-center justify-center bg-[#F5FCF9] px-4 py-4">
                    {renderStatus(feature.solo)}
                  </div>

                  <div className="flex items-center justify-center px-4 py-4">
                    {renderStatus(feature.portfolio)}
                  </div>

                  <div className="flex items-center justify-center px-4 py-4">
                    {renderStatus(feature.portfolioPlus)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-5 md:hidden">
          {[
            {
              name: "Dormant",
              description: "1 dormant company",
              key: "dormant",
            },
            {
              name: "Solo",
              description: "1 trading company",
              key: "solo",
              popular: true,
            },
            {
              name: "Portfolio",
              description: "Up to 12 companies",
              key: "portfolio",
            },
            {
              name: "Portfolio Plus",
              description: "Up to 150 companies",
              key: "portfolioPlus",
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`overflow-hidden rounded-2xl border ${
                plan.popular
                  ? "border-[#087F5B] shadow-[0_8px_30px_rgba(8,127,91,0.12)]"
                  : "border-[#DDEAE6]"
              }`}
            >
              {/* Plan Header */}
              <div
                className={`relative px-5 py-5 ${
                  plan.popular ? "bg-[#F5FCF9]" : "bg-white"
                }`}
              >
                {plan.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#087F5B] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </span>
                )}

                <h3
                  className={`text-base font-bold ${
                    plan.popular
                      ? "text-[#087F5B]"
                      : "text-[#09263A]"
                  }`}
                >
                  {plan.name}
                </h3>

                <p className="mt-1 text-xs text-[#71827F]">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="divide-y divide-[#EDF3F1]">
                {features.map((group) => (
                  <div key={group.category}>

                    <div className="bg-[#F8FCFA] px-5 py-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087F5B]">
                        {group.category}
                      </span>
                    </div>

                    {group.items.map((feature) => (
                      <div
                        key={feature.name}
                        className="flex items-center justify-between px-5 py-3.5"
                      >
                        <span className="pr-4 text-xs text-[#4F6460]">
                          {feature.name}
                        </span>

                        {renderStatus(feature[plan.key])}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-8 flex items-center justify-center text-center">
          <p className="text-xs leading-6 text-[#71827F]">
            Need help choosing a plan?{" "}
            <a
              href="/help"
              className="font-semibold text-[#087F5B] transition-colors hover:text-[#005E45]"
            >
              Visit our Help Centre →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompareFeatures;