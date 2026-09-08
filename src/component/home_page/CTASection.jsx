import React from "react";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#004646]">
      {/* Decorative background lines */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-10 top-[-40px] h-32 w-72 rotate-[18deg] rounded-[50%] border border-[#3bbfa3]" />
        <div className="absolute -left-5 top-[-10px] h-28 w-64 rotate-[25deg] rounded-[50%] border border-[#3bbfa3]" />

        <div className="absolute right-[18%] top-[-60px] h-40 w-80 rotate-[8deg] rounded-[50%] border border-[#3bbfa3]" />
        <div className="absolute right-[15%] top-[-20px] h-32 w-72 rotate-[12deg] rounded-[50%] border border-[#3bbfa3]" />
      </div>

      {/* Main content */}
      <div className="relative mx-auto flex min-h-[175px] max-w-[1100px] items-center px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex w-full items-center justify-between gap-8">
          
          {/* Left content */}
          <div className="min-w-0">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#35c7a7]">
              Ready to get started?
            </p>

            <h2 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[25px]">
              Join thousands of UK businesses
            </h2>

            <p className="mt-2 text-[13px] leading-5 text-white/85 sm:text-[14px]">
              Simple, secure and compliant. Start your free account today.
            </p>
          </div>

          {/* Right CTA area */}
          <div className="relative flex shrink-0 items-center">
            <button
              type="button"
              className="
                group
                flex
                h-[45px]
                min-w-[178px]
                items-center
                justify-center
                gap-2
                rounded-[8px]
                bg-[#65d9bb]
                px-5
                text-[12px]
                font-semibold
                text-[#003e3e]
                shadow-[0_5px_18px_rgba(0,0,0,0.12)]
                transition-all
                duration-200
                hover:bg-[#7de3c8]
                hover:shadow-[0_7px_22px_rgba(0,0,0,0.18)]
              "
            >
              <span>Get started for free</span>

              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            {/* Handwritten annotation */}
            <div className="absolute -right-[145px] -top-[38px] hidden w-[140px] sm:block">
              <p
                className="
                  rotate-[-4deg]
                  text-center
                  font-['Comic_Sans_MS',_'Bradley_Hand',_cursive]
                  text-[13px]
                  leading-[1.15]
                  text-white
                "
              >
                Your compliance
                <br />
                journey starts here
              </p>

              {/* Curved hand-drawn arrow */}
              <svg
                className="absolute -bottom-[28px] -left-[2px]"
                width="82"
                height="42"
                viewBox="0 0 82 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M76 3C73 18 59 30 40 32C25 34 13 30 5 22"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />

                <path
                  d="M5 22L11 21"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />

                <path
                  d="M5 22L8 27"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;