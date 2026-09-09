import React from "react";
import { Building2, UserRound, TrendingUp, Users } from "lucide-react";

const audiences = [
  {
    title: "Small businesses",
    description: "Prepare annual accounts without complicated accounting software.",
    icon: Building2,
  },
  {
    title: "Company directors",
    description: "Keep your company's annual filing organised and on track.",
    icon: UserRound,
  },
  {
    title: "Growing companies",
    description: "Make recurring annual accounts preparation easier as your business grows.",
    icon: TrendingUp,
  },
  {
    title: "Accountants",
    description: "Manage annual accounts and filing workflows for multiple companies.",
    icon: Users,
  },
];

const AnnualAccountsWhoIsItFor = () => {
  return (
    <section className="bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
            Built for businesses that need to file annual accounts
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-[#DDEAE6] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#087F5B]/25 hover:shadow-[0_12px_28px_rgba(9,38,58,0.08)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F7F0] text-[#087F5B]">
                <Icon className="h-5 w-5" strokeWidth={2.1} />
              </div>

              <h3 className="text-sm font-bold text-[#09263A]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#687B78]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnualAccountsWhoIsItFor;