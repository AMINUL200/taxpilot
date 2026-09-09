import React from "react";
import { Landmark, ClipboardCheck, ShieldCheck, CalendarCheck2 } from "lucide-react";

const ConfirmationStatementTrust = () => {
  const items = [
    {
      title: "Companies House filing",
      icon: Landmark,
    },
    {
      title: "Company information checks",
      icon: ClipboardCheck,
    },
    {
      title: "Secure online account",
      icon: ShieldCheck,
    },
    {
      title: "Simple annual compliance",
      icon: CalendarCheck2,
    },
  ];

  return (
    <section className="w-full border-y border-[#DDEAE6] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-xl font-bold text-[#09263A] sm:text-2xl">
          Everything you need for your Confirmation Statement
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F7F0]">
                  <Icon className="h-5 w-5 text-[#087F5B]" />
                </div>
                <span className="text-xs font-semibold leading-5 text-[#09263A] sm:text-sm">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConfirmationStatementTrust;