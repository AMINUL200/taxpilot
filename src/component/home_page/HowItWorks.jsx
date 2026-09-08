import React from "react";
import {
  Search,
  FileText,
  ArrowUpRight,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Find your company",
      shortTitle: "Find",
      description:
        "Search by company name or number and we'll automatically find your business details.",
      icon: Search,
      features: [
        "Companies House lookup",
        "Company details retrieved automatically",
        "No manual searching",
      ],
    },
    {
      number: "02",
      title: "Enter your information",
      shortTitle: "Enter",
      description:
        "Answer a few simple questions or import your trial balance. Our guided process keeps everything straightforward.",
      icon: FileText,
      features: [
        "Simple guided questions",
        "Import your financial data",
        "AI-assisted information entry",
      ],
    },
    {
      number: "03",
      title: "Review and file",
      shortTitle: "Review",
      description:
        "Check your documents, make any final changes, then securely submit everything directly to HMRC and Companies House.",
      icon: ArrowUpRight,
      features: [
        "Review everything before filing",
        "Secure submission",
        "HMRC & Companies House ready",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[400px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-primary-light
          opacity-40
          blur-3xl
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl

          px-5
          py-16

          sm:px-6
          sm:py-20

          lg:px-8
          lg:py-24
        "
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          {/* Label */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-primary-soft

              bg-primary-light

              px-3
              py-1.5
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-primary
              "
            >
              How it works
            </span>

          </div>


          {/* Heading */}

          <h2
            className="
              text-3xl
              font-bold
              leading-[1.08]
              tracking-[-0.035em]

              text-heading

              sm:text-4xl

              lg:text-[46px]
            "
          >
            Get your tax done in{" "}
            <span className="text-primary">
              3 simple steps
            </span>
          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl

              text-sm
              leading-6

              text-text-secondary

              sm:text-base
            "
          >
            No accounting knowledge needed. Just follow the steps
            and we'll take care of the rest.
          </p>

        </div>


        {/* =================================================
            STEPS
        ================================================== */}

        <div
          className="
            relative
            mt-14

            grid
            grid-cols-1
            gap-6

            md:grid-cols-3
            md:gap-5

            lg:mt-16
            lg:gap-7
          "
        >

          {/* =================================================
              CONNECTING LINE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute

              left-[16.66%]
              right-[16.66%]
              top-[48px]

              hidden
              h-px

              bg-gradient-to-r
              from-primary/20
              via-primary
              to-primary/20

              md:block
            "
          />


          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative"
              >

                {/* =================================================
                    STEP CARD
                ================================================== */}

                <div
                  className="
                    group
                    relative
                    h-full

                    rounded-2xl

                    border
                    border-border-light

                    bg-white

                    p-6

                    shadow-[0_8px_30px_rgba(16,42,67,0.045)]

                    transition-all
                    duration-300

                    hover:-translate-y-2
                    hover:border-primary/20
                    hover:shadow-[0_20px_45px_rgba(16,42,67,0.09)]

                    sm:p-7

                    lg:p-8
                  "
                >

                  {/* =================================================
                      TOP ROW
                  ================================================== */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >

                    {/* Number */}

                    <div
                      className="
                        relative
                        z-10

                        flex
                        h-12
                        w-12
                        items-center
                        justify-center

                        rounded-full

                        bg-primary-soft

                        text-lg
                        font-bold

                        text-primary

                        ring-8
                        ring-white

                        transition-all
                        duration-300

                        group-hover:bg-primary
                        group-hover:text-white
                      "
                    >
                      {index + 1}
                    </div>


                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center

                        rounded-xl

                        bg-primary-light

                        text-primary

                        transition-all
                        duration-300

                        group-hover:bg-primary
                        group-hover:text-white
                      "
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                      />
                    </div>

                  </div>


                  {/* =================================================
                      STEP LABEL
                  ================================================== */}

                  <div className="mt-7">

                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]

                        text-primary
                      "
                    >
                      Step {step.number}
                    </p>


                    {/* Title */}

                    <h3
                      className="
                        mt-2

                        text-xl
                        font-bold
                        tracking-tight

                        text-heading

                        transition-colors
                        duration-200

                        group-hover:text-primary
                      "
                    >
                      {step.title}
                    </h3>


                    {/* Description */}

                    <p
                      className="
                        mt-3

                        text-sm
                        leading-6

                        text-text-secondary
                      "
                    >
                      {step.description}
                    </p>

                  </div>


                  {/* =================================================
                      FEATURES
                  ================================================== */}

                  <div
                    className="
                      mt-6
                      space-y-3

                      border-t
                      border-border-light

                      pt-5
                    "
                  >

                    {step.features.map((feature) => (
                      <div
                        key={feature}
                        className="
                          flex
                          items-start
                          gap-2.5
                        "
                      >

                        <span
                          className="
                            mt-0.5
                            flex
                            h-4
                            w-4
                            shrink-0

                            items-center
                            justify-center

                            rounded-full

                            bg-primary

                            text-white
                          "
                        >
                          <Check
                            className="h-2.5 w-2.5"
                            strokeWidth={3}
                          />
                        </span>

                        <span
                          className="
                            text-xs
                            leading-5
                            text-text-secondary
                          "
                        >
                          {feature}
                        </span>

                      </div>
                    ))}

                  </div>


                  {/* =================================================
                      BOTTOM STEP INDICATOR
                  ================================================== */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-semibold
                        text-text-muted
                      "
                    >
                      {step.shortTitle}
                    </span>


                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-full

                        bg-background-soft

                        text-text-secondary

                        transition-all
                        duration-300

                        group-hover:bg-primary
                        group-hover:text-white
                      "
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>

                  </div>

                </div>


                {/* =================================================
                    MOBILE CONNECTOR
                ================================================== */}

                {index < steps.length - 1 && (
                  <div
                    className="
                      flex
                      justify-center

                      py-2

                      md:hidden
                    "
                  >
                    <div
                      className="
                        h-8
                        w-px

                        bg-primary/30
                      "
                    />
                  </div>
                )}

              </div>
            );
          })}

        </div>


        {/* =================================================
            BOTTOM TRUST MESSAGE
        ================================================== */}

        <div
          className="
            mx-auto
            mt-10

            flex
            max-w-2xl

            flex-col
            items-center
            justify-center
            gap-2

            rounded-xl

            border
            border-primary/10

            bg-primary-light

            px-5
            py-4

            text-center

            sm:flex-row
          "
        >

          <Sparkles
            className="
              h-4
              w-4
              shrink-0
              text-primary
            "
          />

          <p
            className="
              text-xs
              leading-5
              text-text-secondary
            "
          >
            From company lookup to filing, everything is designed
            to make tax compliance simple.
          </p>

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;