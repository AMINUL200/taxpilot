import React from "react";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronDown,
  FileText,
  BarChart2,
  Percent,
  ClipboardList,
} from "lucide-react";

// =========================================================
// HERO IMAGE
// Royalty-free stock photo (Unsplash License — free for
// commercial use, no attribution required).
// Swap this src for your own brand photography whenever
// you have one; nothing else needs to change.
// =========================================================
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1562935345-5080389daccd?fm=jpg&q=80&w=1200&auto=format&fit=crop";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div
          className="
            grid
            min-h-[650px]
            grid-cols-1
            items-center
            gap-10
            py-14

            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-4
            lg:py-16
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="relative z-10 max-w-xl">
            {/* Small Label */}
            <div
              className="
                mb-5
                inline-flex
                items-center
                rounded-full
                border
                border-[#D8E9E2]
                bg-[#F5FCF9]
                px-3
                py-1.5
              "
            >
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-primary
                "
              >
                UK Tax & Compliance Platform
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-[590px]

                text-[48px]
                font-bold
                leading-[1.02]
                tracking-[-0.035em]

                text-heading

                sm:text-[56px]

                lg:text-[60px]
                xl:text-[64px]
              "
            >
              Focus on your
              <br />
              business.
              <br />
              <span className="text-primary">
                We'll handle
                <br />
                the compliance.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-[530px]

                text-[15px]
                leading-6

                text-text-secondary

                sm:text-base
              "
            >
              Prepare, review and file your Corporation Tax,
              Accounts, VAT and more — all in one simple platform.
              Built for UK businesses, contractors and accountants.
            </p>

            {/* Buttons */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
              "
            >
              {/* Primary */}

              <button type="button" className="btn-primary min-h-[46px] px-6 whitespace-nowrap">
                <span>Get started for free</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Secondary */}

              <button type="button" className="btn-secondary min-h-[46px] px-6 whitespace-nowrap">
                <span
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-white
                  "
                >
                  <Play className="ml-[1px] h-2.5 w-2.5 fill-current" />
                </span>

                <span>Watch how it works</span>
              </button>
            </div>

            {/* =================================================
                TRUST ROW
            ================================================== */}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              {/* Avatar Group */}

              <div className="flex items-center">
                <div
                  className="
                    flex h-9 w-9 items-center justify-center overflow-hidden
                    rounded-full border-2 border-white bg-[#D9F6EB]
                    text-xs font-bold text-primary
                  "
                >
                  A
                </div>

                <div
                  className="
                    -ml-2 flex h-9 w-9 items-center justify-center overflow-hidden
                    rounded-full border-2 border-white bg-[#B8ECD9]
                    text-xs font-bold text-primary
                  "
                >
                  J
                </div>

                <div
                  className="
                    -ml-2 flex h-9 w-9 items-center justify-center overflow-hidden
                    rounded-full border-2 border-white bg-[#8CDEC3]
                    text-xs font-bold text-primary
                  "
                >
                  S
                </div>

                <div
                  className="
                    -ml-2 flex h-9 w-9 items-center justify-center overflow-hidden
                    rounded-full border-2 border-white bg-[#5ACBA8]
                    text-xs font-bold text-white
                  "
                >
                  M
                </div>
              </div>

              {/* Trust Text */}

              <div>
                <p className="!m-0 text-[11px] font-medium text-text-secondary">
                  Trusted by 10,000+ UK businesses
                </p>

                <div className="mt-0.5 flex items-center gap-2">
                  <div className="flex gap-0.5 text-[#E8A317]">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <span className="text-[10px] text-text-muted">
                    4.9/5 from 1,000+ reviews
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT HERO IMAGE + FLOATING UI CARDS
          ====================================================== */}

          <div
            className="
              relative
              flex
              min-h-[480px]
              items-center
              justify-center

              lg:min-h-[600px]
              lg:justify-end
            "
          >
            {/* Soft background shape */}

            <div
              className="
                absolute
                right-[-5%]
                top-[6%]

                h-[390px]
                w-[390px]

                rounded-[45%]

                bg-[#ECFAF5]

                blur-[1px]

                lg:h-[500px]
                lg:w-[500px]
              "
            />

            {/* Additional mint glow */}

            <div
              className="
                absolute
                right-[15%]
                top-[16%]

                h-[300px]
                w-[300px]

                rounded-full

                bg-[#D9F6EB]

                opacity-70
                blur-3xl
              "
            />

            {/* Hand-drawn annotation */}

            <div
              className="
                absolute
                left-0
                top-12
                z-20
                hidden
                max-w-[190px]
                -rotate-2
                sm:block
              "
            >
              <p
                className="text-[19px] leading-6 text-heading"
                style={{ fontFamily: "'Segoe Script', 'Bradley Hand', cursive" }}
              >
                Everything you need in one place
              </p>

              <svg
                width="90"
                height="60"
                viewBox="0 0 90 60"
                fill="none"
                className="mt-1 ml-8 text-heading"
              >
                <path
                  d="M4 4C20 8 36 20 44 36C48 44 52 50 62 52"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M52 47L63 53L59 41"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Hero photo */}

            <img
              src="/public/image/hero.png"
              alt="Smiling business owner using the TaxPilot UK platform"
              className="
                relative
                z-10

                h-[420px]
                w-[340px]

                rounded-[40px]

                object-cover

                drop-shadow-[0_20px_35px_rgba(16,42,67,0.15)]

                sm:h-[460px]
                sm:w-[370px]

                lg:h-[540px]
                lg:w-[430px]
                lg:-mr-6
              "
            />

            {/* Card 1 — File with confidence */}

            <div
              className="
                absolute
                bottom-[10%]
                left-[-4%]
                z-20

                w-[220px]

                rounded-2xl
                border
                border-border-light
                bg-white
                p-4

                shadow-[0_18px_40px_rgba(16,42,67,0.14)]

                sm:left-[-8%]
                sm:w-[240px]
              "
            >
              <p className="mb-3 text-sm font-bold text-heading">
                File with confidence
              </p>

              <ul className="flex flex-col gap-2.5">
                {["HMRC recognised", "Companies House ready", "Secure & compliant"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[13px] font-medium text-text-secondary">
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Card 2 — Your business at a glance */}

            <div
              className="
                absolute
                bottom-[-6%]
                right-0
                z-20

                w-[260px]

                rounded-2xl
                border
                border-border-light
                bg-white
                p-4

                shadow-[0_18px_45px_rgba(16,42,67,0.16)]

                sm:w-[290px]
                sm:p-5

                lg:right-[-4%]
                lg:w-[300px]
              "
            >
              <p className="mb-3 text-sm font-bold text-heading">
                Your business at a glance
              </p>

              {/* Company row */}
              <div className="mb-3 flex items-center justify-between rounded-xl bg-background-soft px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                    AB
                  </span>
                  <div>
                    <p className="!m-0 text-xs font-semibold text-heading">
                      ABC Consulting Ltd
                    </p>
                    <p className="!m-0 text-[10px] text-text-muted">12345678</p>
                  </div>
                </div>

                <span className="flex items-center gap-0.5 rounded-md border border-border-light bg-white px-2 py-1 text-[10px] font-medium text-text-secondary">
                  Switch
                  <ChevronDown className="h-3 w-3" />
                </span>
              </div>

              {/* Status rows */}
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-text-secondary">
                    <FileText className="h-3.5 w-3.5 text-text-muted" />
                    Corporation Tax
                  </span>
                  <span className="rounded-full bg-[#E4F8EE] px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Ready to file
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-text-secondary">
                    <BarChart2 className="h-3.5 w-3.5 text-text-muted" />
                    Annual Accounts
                  </span>
                  <span className="rounded-full bg-[#E7EEFC] px-2 py-0.5 text-[10px] font-semibold text-[#3B5FCB]">
                    In progress
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-text-secondary">
                    <Percent className="h-3.5 w-3.5 text-text-muted" />
                    VAT Return
                  </span>
                  <span className="rounded-full bg-[#FDF1DC] px-2 py-0.5 text-[10px] font-semibold text-[#B4790B]">
                    Due in 12 days
                  </span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[12px] font-medium text-text-secondary">
                    <ClipboardList className="h-3.5 w-3.5 text-text-muted" />
                    Confirmation Statement
                  </span>
                  <span className="rounded-full bg-background-soft px-2 py-0.5 text-[10px] font-semibold text-text-muted">
                    Not started
                  </span>
                </li>
              </ul>

              <button
                type="button"
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-2.5
                  text-[13px]
                  font-semibold
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-primary-hover
                "
              >
                Continue filing
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;