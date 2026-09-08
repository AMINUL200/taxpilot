import React, { useState } from "react";
import { Quote, Star, ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";

const Testimonial = () => {
  // Single fixed photo shown beside every review — swap this for your real image.
  const photo = "https://picsum.photos/seed/complytax-hero/500/560";

  const reviews = [
    {
      quote:
        "ComplyTax UK has made our filings so easy. I save hours every year and the support team are brilliant.",
      name: "James R.",
      role: "Director, Bright Future Ltd",
    },
    {
      quote:
        "Filing our VAT return used to take a whole afternoon. Now it takes ten minutes and I know it's right.",
      name: "Priya S.",
      role: "Founder, Priya Consulting",
    },
    {
      quote:
        "Straightforward, reliable, and the pricing is exactly what it says on the tin. Couldn't ask for more.",
      name: "Tom H.",
      role: "Owner, Harlow & Co",
    },
  ];

  const [active, setActive] = useState(0);

  const goPrev = () =>
    setActive((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const goNext = () =>
    setActive((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  const current = reviews[active];

  return (
    <section className="w-full overflow-hidden bg-[#FBF5EA]">
      <div
        className="
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
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12

            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-16
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div>
            {/* Small Label */}

            <div
              className="
                mb-4
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
                Customer stories
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                max-w-[420px]

                text-3xl
                font-bold
                leading-[1.1]
                tracking-[-0.03em]

                text-heading

                sm:text-4xl

                lg:text-[40px]
              "
            >
              Trusted by business owners and accountants
            </h2>

            {/* Description */}

            <p
              className="
                mt-4
                max-w-[380px]

                text-sm
                leading-6

                text-text-secondary

                sm:text-[15px]
              "
            >
              Join thousands of UK businesses already using ComplyTax UK.
            </p>

            {/* CTA */}

            <a
              href="/reviews"
              className="
                btn-secondary

                mt-7
                inline-flex
                w-fit

                px-5
                py-2.5

                text-xs
              "
            >
              <span>See all reviews</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* =================================================
              RIGHT — TESTIMONIAL CAROUSEL
          ================================================== */}

          <div className="relative">
            {/* Handwritten-style annotation */}

            <div
              className="
                pointer-events-none
                absolute
                -top-8
                right-6

                hidden
                max-w-[130px]
                -rotate-3
                text-right

                text-sm
                italic
                leading-tight
                text-heading

                sm:block
              "
            >
              Built for UK businesses like yours
              <svg
                className="ml-auto mt-1 h-10 w-14 -scale-x-100"
                viewBox="0 0 60 40"
                fill="none"
              >
                <path
                  d="M4 4C10 20 22 30 40 32"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M40 32L31 27M40 32L36 40"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              className="
                relative
                mx-auto
                flex
                max-w-[560px]
                items-center
                gap-4
              "
            >
              {/* Prev arrow */}

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous review"
                className="
                  hidden
                  shrink-0
                  items-center
                  justify-center

                  h-11
                  w-11

                  rounded-full

                  bg-white

                  text-primary

                  shadow-[0_4px_16px_rgba(16,42,67,0.08)]

                  transition-colors
                  duration-200

                  hover:bg-primary-soft

                  sm:flex
                "
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              {/* Card + photo */}

              <div
                className="
                  relative
                  flex
                  w-full
                  items-stretch
                "
              >
                {/* Quote card — this is the only part that changes between reviews */}

                <div
                  key={active}
                  className="
                    relative
                    z-10
                    flex
                    w-[60%]
                    flex-col

                    rounded-2xl

                    bg-white

                    p-6

                    shadow-[0_10px_30px_rgba(16,42,67,0.08)]

                    animate-[fadeSlide_0.35s_ease-out]

                    sm:p-7
                  "
                >
                  <Quote
                    className="h-7 w-7 text-primary"
                    fill="currentColor"
                    strokeWidth={0}
                  />

                  <p
                    className="
                      mt-3

                      text-sm
                      leading-6

                      text-heading
                    "
                  >
                    "{current.quote}"
                  </p>

                  <div className="mt-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 text-amber-400"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-sm font-bold text-heading">
                    {current.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {current.role}
                  </p>
                </div>

                {/* Photo — fixed, always the same image regardless of active review */}

                <div
                  className="
                    -ml-10
                    w-[55%]

                    overflow-hidden

                    rounded-2xl

                    shadow-[0_10px_30px_rgba(16,42,67,0.1)]
                  "
                >
                  <img
                    src={photo}
                    alt="ComplyTax UK customer"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <style>{`
                @keyframes fadeSlide {
                  from { opacity: 0; transform: translateY(6px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

              {/* Next arrow (kept for symmetry / interaction, screenshot shows only prev) */}

              <button
                type="button"
                onClick={goNext}
                aria-label="Next review"
                className="
                  hidden
                  shrink-0
                  items-center
                  justify-center

                  h-11
                  w-11

                  rounded-full

                  bg-white

                  text-primary

                  shadow-[0_4px_16px_rgba(16,42,67,0.08)]

                  transition-colors
                  duration-200

                  hover:bg-primary-soft

                  lg:flex
                "
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Dots */}

            <div className="mt-6 flex items-center justify-center gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`
                    h-1.5
                    rounded-full

                    transition-all
                    duration-200

                    ${
                      i === active
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-primary/25"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;