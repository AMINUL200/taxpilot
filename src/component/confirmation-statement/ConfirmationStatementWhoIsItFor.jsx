import React from "react";
import { Building, UserRound, TrendingUp, Users2 } from "lucide-react";

const ConfirmationStatementWhoIsItFor = () => {
  const cards = [
    {
      title: "Small businesses",
      description:
        "Keep your annual company information and filing requirements organised.",
      icon: Building,
    },
    {
      title: "Company directors",
      description:
        "Manage your company's Confirmation Statement without complicated paperwork.",
      icon: UserRound,
    },
    {
      title: "Growing companies",
      description:
        "Keep company information organised as your business changes and grows.",
      icon: TrendingUp,
    },
    {
      title: "Accountants",
      description:
        "Manage Confirmation Statements and company filing requirements for multiple clients.",
      icon: Users2,
    },
  ];

  return (
    <section className="w-full bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#09263A] sm:text-4xl">
          Built for UK companies
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl border border-[#DDEAE6] bg-white p-6 shadow-[0_3px_14px_rgba(9,38,58,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(9,38,58,0.08)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F7F0]">
                  <Icon className="h-5 w-5 text-[#087F5B]" strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-bold text-[#09263A]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#687B78]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementWhoIsItFor;