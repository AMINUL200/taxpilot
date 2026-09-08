import React from "react";
import { ArrowRight, FileText, BarChart3, Percent, UserRound, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProductPricing = () => {
  const products = [
    {
      icon: FileText,
      iconBg: "bg-[#E8F8F2]",
      iconColor: "text-[#087F5B]",
      title: "Corporation Tax",
      description:
        "Prepare and file your Company Tax Return with HMRC.",
      price: "£59",
      period: "/year",
      note: "From",
      link: "/corporation-tax",
    },
    {
      icon: BarChart3,
      iconBg: "bg-[#EEF7FF]",
      iconColor: "text-[#2878B8]",
      title: "Annual Accounts",
      description:
        "Prepare and file your statutory accounts with Companies House.",
      price: "£59",
      period: "/year",
      note: "From",
      link: "/annual-accounts",
    },
    {
      icon: Percent,
      iconBg: "bg-[#FFF1F1]",
      iconColor: "text-[#D65C5C]",
      title: "MTD VAT",
      description:
        "Submit your VAT returns digitally to HMRC with ease.",
      price: "£29",
      period: "/year",
      note: "",
      link: "/mtd-vat",
    },
    {
      icon: Building2,
      iconBg: "bg-[#FFF7E6]",
      iconColor: "text-[#C98A16]",
      title: "Confirmation Statement",
      description:
        "Keep your company information up to date with Companies House.",
      price: "£74",
      period: "/year",
      note: "",
      link: "/confirmation-statement",
    },
    {
      icon: UserRound,
      iconBg: "bg-[#F3EEFF]",
      iconColor: "text-[#7856C7]",
      title: "Self Assessment",
      description:
        "Prepare your Self Assessment tax return quickly and simply.",
      price: "£49",
      period: "/year",
      note: "From",
      link: "/self-assessment",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">
            Individual products
          </p>

          <h2 className="text-[30px] font-bold tracking-[-0.025em] text-[#09263A] sm:text-[36px]">
            Only pay for what you need
          </h2>

          <p className="mt-3 text-[14px] leading-6 text-[#71827F]">
            Need just one service? Choose an individual product and
            get everything you need to stay compliant.
          </p>

        </div>

        {/* =====================================================
            PRODUCT CARDS
        ====================================================== */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {products.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.title}
                className="group flex flex-col rounded-2xl border border-[#DDEAE6] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#BFDDD3] hover:shadow-[0_12px_35px_rgba(0,62,62,0.08)]"
              >

                {/* Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${product.iconBg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${product.iconColor}`}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-5 min-h-[24px] text-[15px] font-bold leading-5 text-[#09263A]">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mt-2 min-h-[72px] text-[12px] leading-5 text-[#71827F]">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mt-5">

                  {product.note && (
                    <p className="mb-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#8A9B97]">
                      {product.note}
                    </p>
                  )}

                  <div className="flex items-end gap-1">

                    <span className="text-[27px] font-bold leading-none tracking-[-0.03em] text-[#09263A]">
                      {product.price}
                    </span>

                    <span className="mb-0.5 text-[10px] text-[#8A9B97]">
                      {product.period}
                    </span>

                  </div>

                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-[#E7EFEC]" />

                {/* Learn more */}
                <Link
                  to={product.link}
                  className="group/link mt-auto flex items-center gap-2 text-[11px] font-semibold text-[#087F5B]"
                >
                  <span>Learn more</span>

                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </Link>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM NOTE
        ====================================================== */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-[#8A9B97]">
            All prices are shown excluding VAT where applicable.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ProductPricing;