import React from "react";
import { FileCheck, Calculator, Receipt, Send, CalendarDays, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Digital VAT records",
    description: "Keep your VAT information organised digitally and ready when you need it.",
    icon: FileCheck,
  },
  {
    title: "VAT calculations",
    description: "Calculate your VAT position from your sales and purchase information.",
    icon: Calculator,
  },
  {
    title: "VAT return preparation",
    description: "Prepare your VAT return with a clear view of the figures you're submitting.",
    icon: Receipt,
  },
  {
    title: "HMRC submission",
    description: "Submit your VAT return electronically through the HMRC-compatible process.",
    icon: Send,
  },
  {
    title: "VAT period tracking",
    description: "Keep track of your VAT periods and upcoming filing requirements.",
    icon: CalendarDays,
  },
  {
    title: "Secure online records",
    description: "Keep your VAT information securely organised in one place.",
    icon: ShieldCheck,
  },
];

const MtdVatFeatures = () => {
  return (
    <section className="bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-[#09263A] sm:text-4xl">
            Everything you need to manage VAT
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-xl border border-[#DDEAE6] bg-white p-6 shadow-[0_3px_14px_rgba(9,38,58,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#087F5B]/25 hover:shadow-[0_12px_28px_rgba(9,38,58,0.08)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F7F0] text-[#087F5B]">
                <Icon className="h-6 w-6" strokeWidth={2.1} />
              </div>

              <h3 className="text-[15px] font-bold leading-5 text-[#09263A]">{title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-[#687B78]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MtdVatFeatures;