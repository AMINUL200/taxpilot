import React from "react";
import {
  FileText,
  BarChart3,
  Percent,
  FileCheck2,
  UserRound,
  ArrowRight,
  Zap,
  ShieldCheck,
  PoundSterling,
  Headphones,
} from "lucide-react";

const ProductsSection = () => {
  const products = [
    {
      title: "Corporation Tax",
      description: "Prepare and file your CT600 with ease.",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      linkColor: "text-blue-600",
      path: "/corporation-tax",
    },
    {
      title: "Annual Accounts",
      description: "Create and file your statutory accounts.",
      icon: BarChart3,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      linkColor: "text-emerald-600",
      path: "/annual-accounts",
    },
    {
      title: "MTD VAT",
      description: "Submit your VAT returns quickly and accurately.",
      icon: Percent,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      linkColor: "text-rose-500",
      path: "/mtd-vat",
    },
    {
      title: "Confirmation Statement",
      description: "File your CS01 with Companies House.",
      icon: FileCheck2,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      linkColor: "text-amber-600",
      path: "/confirmation-statement",
    },
    {
      title: "Self Assessment",
      description: "File your self assessment tax return online.",
      icon: UserRound,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      linkColor: "text-purple-600",
      path: "/self-assessment",
    },
  ];

  const benefits = [
    {
      title: "Save time",
      description: "Automate your filings and reduce admin.",
      icon: Zap,
    },
    {
      title: "Stay compliant",
      description: "HMRC recognised and fully secure.",
      icon: ShieldCheck,
    },
    {
      title: "Transparent pricing",
      description: "No hidden fees. Know exactly what you pay.",
      icon: PoundSterling,
    },
    {
      title: "Expert support",
      description: "Our UK-based team is here to help.",
      icon: Headphones,
    },
  ];

  return (
    <section className="w-full overflow-hidden">

      {/* =====================================================
          PRODUCTS SECTION
      ====================================================== */}

      <div className="relative bg-background-mint">

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

          {/* =================================================
              SECTION HEADER
          ================================================== */}

          <div
            className="
              mb-8
              flex
              flex-col
              gap-5

              sm:mb-10

              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            {/* Left */}

            <div className="max-w-xl">

              {/* Small Label */}

              <div
                className="
                  mb-3
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-primary-soft
                  bg-primary-soft
                  px-3
                  py-1
                "
              >
                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-primary
                  "
                >
                  Our Products
                </span>
              </div>

              {/* Heading */}

              <h2
                className="
                  max-w-[560px]

                  text-3xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.03em]

                  text-heading

                  sm:text-4xl

                  lg:text-[42px]
                "
              >
                Complete compliance
                <br />
                for UK businesses
              </h2>

              {/* Description */}

              <p
                className="
                  mt-3
                  max-w-[560px]

                  text-sm
                  leading-5

                  text-text-secondary

                  sm:text-[15px]
                "
              >
                All the tools you need to stay compliant with HMRC
                and Companies House.
              </p>

            </div>

            {/* View all button */}

            <a
              href="/products"
              className="
                btn-secondary

                shrink-0

                self-start

                px-5
                py-2.5

                text-xs

                md:self-end
              "
            >
              <span>
                View all products
              </span>

              <ArrowRight className="h-3.5 w-3.5" />
            </a>

          </div>

          {/* =================================================
              PRODUCT CARDS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2

              lg:grid-cols-5
              lg:gap-4
            "
          >

            {products.map((product) => {
              const Icon = product.icon;

              return (
                <a
                  href={product.path}
                  key={product.title}
                  className="
                    group
                    flex
                    min-h-[190px]
                    flex-col

                    rounded-xl

                    border
                    border-white/80

                    bg-white

                    p-5

                    shadow-[0_3px_14px_rgba(16,42,67,0.035)]

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-primary/20
                    hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]
                  "
                >

                  {/* Icon */}

                  <div
                    className={`
                      mb-4
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      ${product.iconBg}
                    `}
                  >
                    <Icon
                      className={`
                        h-6
                        w-6
                        ${product.iconColor}
                      `}
                      strokeWidth={2.2}
                    />
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      text-[15px]
                      font-bold
                      leading-5
                      text-heading
                    "
                  >
                    {product.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-text-secondary
                    "
                  >
                    {product.description}
                  </p>

                  {/* Learn More */}

                  <div
                    className={`
                      mt-auto
                      pt-4

                      flex
                      items-center
                      gap-1

                      text-xs
                      font-semibold

                      ${product.linkColor}

                      transition-all
                      duration-200

                      group-hover:gap-2
                    `}
                  >
                    <span>
                      Learn more
                    </span>

                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>

                </a>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            WAVE DIVIDER
        ====================================================== */}

        <div className="relative w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,80 1200,60 L1200,120 L0,120 Z"
              fill="#003f3f"
            />
            <path
              d="M0,70 C300,130 600,10 900,70 C1050,100 1150,90 1200,70 L1200,120 L0,120 Z"
              fill="#003f3f"
              opacity="0.3"
            />
          </svg>
        </div>

      </div>

      {/* =====================================================
          WHY CHOOSE SECTION
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          bg-dark
        "
      >

        {/* subtle background decoration */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-100px]
            top-[-150px]

            h-[400px]
            w-[400px]

            rounded-full

            bg-primary

            opacity-[0.08]

            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[-120px]
            bottom-[-180px]

            h-[400px]
            w-[400px]

            rounded-full

            bg-primary

            opacity-[0.06]

            blur-3xl
          "
        />

        <div
          className="
            relative
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

          <div
            className="
              grid
              grid-cols-1

              gap-12

              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-center
              lg:gap-20
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div>

              {/* Label */}

              <p
                className="
                  mb-4

                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]

                  text-primary-soft
                "
              >
                Why choose TaxPilot UK
              </p>

              {/* Heading */}

              <h2
                className="
                  max-w-[470px]

                  text-3xl
                  font-bold
                  leading-[1.08]
                  tracking-[-0.03em]

                  text-white

                  sm:text-4xl

                  lg:text-[42px]
                "
              >
                A simpler, smarter way
                <br />
                to stay compliant
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-[480px]

                  text-sm
                  leading-6

                  text-dark-muted
                "
              >
                Powerful features, transparent pricing and expert
                support — so you can save time and focus on what
                matters.
              </p>

              {/* CTA */}

              <a
                href="/register"
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2

                  rounded-lg

                  bg-primary-soft
                  px-5
                  py-3

                  text-sm
                  font-semibold

                  text-dark

                  transition-all
                  duration-200

                  hover:bg-white
                  hover:-translate-y-0.5

                  shadow-sm
                "
              >
                <span>
                  Get started today
                </span>

                <ArrowRight className="h-4 w-4" />
              </a>

            </div>

            {/* =================================================
                BENEFITS
            ================================================== */}

            <div
              className="
                grid
                grid-cols-1
                gap-x-8
                gap-y-9

                sm:grid-cols-2
              "
            >

              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="
                      flex
                      items-start
                      gap-4
                    "
                  >

                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        bg-primary

                        text-white
                      "
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Content */}

                    <div>

                      <h3
                        className="
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {benefit.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-[190px]

                          text-xs
                          leading-5

                          text-dark-muted
                        "
                      >
                        {benefit.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM WAVE DIVIDER (Optional - if you need another wave)
        ====================================================== */}

        <div className="relative w-full overflow-hidden leading-[0]">
         
        </div>

      </div>

    </section>
  );
};

export default ProductsSection;