import React from "react";

const TrustedBrands = () => {
  const brands = [
    {
      name: "Xero",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/xero.svg",
    },
    {
      name: "QuickBooks",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/quickbooks.svg",
    },
    {
      name: "Sage",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sage.svg",
    },
    {
      name: "Stripe",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg",
    },
    {
      name: "Google",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg",
    },
    {
      name: "Tesco",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tesco.svg",
    },
    {
      name: "Revolut",
      imageUrl: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/revolut.svg",
    },
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="w-full overflow-hidden bg-white py-5 sm:py-6">
      <div className="mb-4 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-text-secondary sm:text-[9px]">
          Trusted by businesses across the UK
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`brand-${index}`}
              className="flex items-center justify-center w-[150px] shrink-0 px-4 sm:w-[180px] lg:w-[200px]"
            >
              <img
                src={brand.imageUrl}
                alt={brand.name}
                className="h-10 w-auto object-contain transition-all duration-300 hover:scale-110 hover:opacity-80 sm:h-12 lg:h-14"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedBrands;