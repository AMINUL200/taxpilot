import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("yearly");

  const plans = [
    {
      name: "Dormant",
      monthlyPrice: 25,
      yearlyPrice: 20,
      description: "1 dormant company",
      popular: false,
      features: [
        "Annual confirmation statement",
        "Companies House filing",
        "Basic compliance support",
      ],
    },
    {
      name: "Solo",
      monthlyPrice: 69,
      yearlyPrice: 59,
      description: "1 trading company",
      popular: true,
      features: [
        "Corporation Tax filing",
        "Annual accounts",
        "Confirmation statement",
        "Priority support",
      ],
    },
    {
      name: "Portfolio",
      monthlyPrice: 219,
      yearlyPrice: 189,
      description: "Up to 12 companies",
      popular: false,
      features: [
        "Multiple company management",
        "Corporation Tax filing",
        "Annual accounts",
        "Priority support",
      ],
    },
    {
      name: "Portfolio Plus",
      monthlyPrice: 599,
      yearlyPrice: 549,
      description: "Up to 150 companies",
      popular: false,
      features: [
        "Up to 150 companies",
        "Advanced compliance tools",
        "Dedicated support",
        "Multi-company management",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF8]">

      {/* =====================================================
          SECTION
      ====================================================== */}

      <div
        className="
          mx-auto
          max-w-7xl

          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6

            md:flex-row
            md:items-end
            md:justify-between
          "
        >

          {/* LEFT */}

          <div>

            {/* Label */}

            <div
              className="
                mb-3
                inline-flex
                items-center

                rounded-full

                border
                border-primary-soft

                bg-primary-light

                px-3
                py-1
              "
            >
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-primary
                "
              >
                Simple Pricing
              </span>
            </div>


            {/* Heading */}

            <h2
              className="
                text-3xl
                font-bold
                leading-[1.05]
                tracking-[-0.035em]

                text-heading

                sm:text-4xl

                lg:text-[42px]
              "
            >
              Plans for every business
            </h2>


            {/* Description */}

            <p
              className="
                mt-3

                text-sm
                leading-6

                text-text-secondary

                sm:text-[15px]
              "
            >
              Choose the right plan for your needs. No hidden fees.
              Cancel anytime.
            </p>

          </div>


          {/* =================================================
              BILLING TOGGLE
          ================================================== */}

          <div
            className="
              inline-flex
              w-fit
              items-center

              rounded-full

              border
              border-primary/30

              bg-white

              p-0.5

              shadow-sm
            "
          >

            {/* Monthly */}

            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`
                rounded-full
                px-4
                py-1.5

                text-[11px]
                font-semibold

                transition-all
                duration-200

                ${
                  billingCycle === "monthly"
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-primary"
                }
              `}
            >
              Monthly
            </button>


            {/* Yearly */}

            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`
                rounded-full
                px-4
                py-1.5

                text-[11px]
                font-semibold

                transition-all
                duration-200

                ${
                  billingCycle === "yearly"
                    ? "bg-dark text-white shadow-sm"
                    : "text-text-secondary hover:text-primary"
                }
              `}
            >
              Yearly
            </button>


            {/* Save */}

            <span
              className="
                px-3

                text-[10px]
                font-bold

                text-primary
              "
            >
              Save 20%
            </span>

          </div>

        </div>


        {/* ===================================================
            PRICING CARDS
        ==================================================== */}

        <div
          className="
            mt-10

            grid
            grid-cols-1
            gap-4

            sm:grid-cols-2

            lg:grid-cols-4
            lg:gap-5
          "
        >

          {plans.map((plan) => {

            const price =
              billingCycle === "yearly"
                ? plan.yearlyPrice
                : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`
                  group
                  relative

                  flex
                  min-h-[285px]
                  flex-col

                  rounded-xl

                  bg-white

                  p-5

                  transition-all
                  duration-300

                  ${
                    plan.popular
                      ? `
                        border
                        border-primary

                        shadow-[0_10px_30px_rgba(8,127,91,0.08)]

                        lg:-translate-y-1
                      `
                      : `
                        border
                        border-[#EDF1EF]

                        shadow-[0_5px_20px_rgba(16,42,67,0.035)]

                        hover:-translate-y-1
                        hover:border-primary/30
                        hover:shadow-[0_12px_30px_rgba(16,42,67,0.07)]
                      `
                  }
                `}
              >

                {/* =================================================
                    MOST POPULAR
                ================================================== */}

                {plan.popular && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-0

                      -translate-x-1/2
                      -translate-y-1/2

                      whitespace-nowrap

                      rounded-full

                      bg-dark

                      px-4
                      py-1

                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wide

                      text-white

                      shadow-sm
                    "
                  >
                    Most popular
                  </div>
                )}


                {/* =================================================
                    PLAN NAME
                ================================================== */}

                <div>

                  <h3
                    className={`
                      text-[15px]
                      font-semibold

                      ${
                        plan.popular
                          ? "text-heading"
                          : "text-text-secondary"
                      }
                    `}
                  >
                    {plan.name}
                  </h3>


                  {/* PRICE */}

                  <div className="mt-2 flex items-baseline">

                    <span
                      className="
                        text-[30px]
                        font-bold
                        leading-none
                        tracking-[-0.03em]

                        text-heading
                      "
                    >
                      £{price}
                    </span>

                    <span
                      className="
                        ml-1

                        text-[10px]
                        font-medium

                        text-text-muted
                      "
                    >
                      /year
                    </span>

                  </div>


                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-2

                      text-[11px]

                      text-text-secondary
                    "
                  >
                    {plan.description}
                  </p>

                </div>


                {/* =================================================
                    FEATURES
                ================================================== */}

                <div
                  className="
                    mt-5
                    space-y-2
                  "
                >

                  {plan.features.slice(0, 3).map((feature) => (
                    <div
                      key={feature}
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center

                          rounded-full

                          bg-primary-light

                          text-primary
                        "
                      >
                        <Check className="h-2.5 w-2.5" />
                      </span>

                      <span
                        className="
                          text-[10px]
                          text-text-secondary
                        "
                      >
                        {feature}
                      </span>
                    </div>
                  ))}

                </div>


                {/* =================================================
                    CTA
                ================================================== */}

                <div className="mt-auto pt-6">

                  <button
                    type="button"
                    className={`
                      flex
                      w-full

                      items-center
                      justify-center
                      gap-2

                      rounded-md

                      py-2.5

                      text-[11px]
                      font-semibold

                      transition-all
                      duration-200

                      ${
                        plan.popular
                          ? `
                            bg-primary
                            text-white

                            border
                            border-primary

                            hover:bg-primary-hover
                            hover:border-primary-hover

                            hover:-translate-y-0.5
                          `
                          : `
                            bg-white
                            text-primary

                            border
                            border-primary/60

                            hover:bg-primary
                            hover:text-white

                            hover:-translate-y-0.5
                          `
                      }
                    `}
                  >
                    <span>
                      Get started
                    </span>

                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                </div>

              </div>
            );
          })}

        </div>


        {/* ===================================================
            SMALL TRUST NOTE
        ==================================================== */}

        <p
          className="
            mt-7

            text-center

            text-[11px]

            text-text-muted
          "
        >
          All plans include secure filing and UK-based support.
          No long-term contracts.
        </p>

      </div>

    </section>
  );
};

export default PricingSection;