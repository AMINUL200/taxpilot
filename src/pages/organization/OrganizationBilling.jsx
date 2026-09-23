import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Download,
  Plus,
  Check,
  CheckCircle2,
  AlertCircle,
  Crown,
  Zap,
  Building2,
  TrendingUp,
  Calendar,
  FileText,
  Receipt,
  Trash2,
  Edit3,
  ArrowRight,
  Shield,
  Info,
  MoreVertical,
  Eye,
  Star,
} from "lucide-react";

const OrganizationBilling = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCancelModal, setShowCancelModal] = useState(false);

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const currentPlan = {
    name: "Business Pro",
    price: 29,
    interval: "month",
    status: "Active",
    nextBilling: "15 Oct 2026",
    seats: 5,
    usedSeats: 2,
    features: [
      "Unlimited companies",
      "All tax products",
      "Priority support",
      "Advanced reporting",
      "API access",
    ],
  };

  const paymentMethod = {
    brand: "Visa",
    last4: "4242",
    expiry: "12/2027",
    isDefault: true,
  };

  const usageStats = [
    {
      id: "companies",
      label: "Companies",
      used: 12,
      limit: "Unlimited",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "filings",
      label: "Filings this month",
      used: 8,
      limit: "Unlimited",
      icon: FileText,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "seats",
      label: "Team seats",
      used: 2,
      limit: 5,
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      percentage: 40,
    },
  ];

  const invoices = [
    {
      id: "INV-2026-009",
      date: "15 Sep 2026",
      amount: "£29.00",
      status: "Paid",
      period: "Sep 15 - Oct 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-008",
      date: "15 Aug 2026",
      amount: "£29.00",
      status: "Paid",
      period: "Aug 15 - Sep 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-007",
      date: "15 Jul 2026",
      amount: "£29.00",
      status: "Paid",
      period: "Jul 15 - Aug 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-006",
      date: "15 Jun 2026",
      amount: "£29.00",
      status: "Paid",
      period: "Jun 15 - Jul 14, 2026",
      method: "Visa •••• 4242",
    },
  ];

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 9,
      interval: "month",
      description: "Perfect for sole traders and single companies",
      features: [
        "1 company",
        "Corporation Tax filing",
        "Confirmation Statement",
        "Email support",
      ],
      isCurrent: false,
      isPopular: false,
    },
    {
      id: "business-pro",
      name: "Business Pro",
      price: 29,
      interval: "month",
      description: "Best for growing businesses and accountants",
      features: [
        "Unlimited companies",
        "All tax products",
        "Priority support",
        "Advanced reporting",
        "API access",
      ],
      isCurrent: true,
      isPopular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      interval: "month",
      description: "For large firms with custom requirements",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "White-label options",
      ],
      isCurrent: false,
      isPopular: false,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: CreditCard },
    { id: "invoices", label: "Invoices", icon: Receipt },
    { id: "plans", label: "Plans", icon: Crown },
  ];

  // =========================================================
  // RENDER OVERVIEW TAB
  // =========================================================

  const renderOverview = () => (
    <div className="space-y-6">

      {/* Current Plan Card */}
      <div className="relative overflow-hidden rounded-xl border border-primary-soft bg-gradient-to-br from-primary-light via-white to-primary-soft p-6 sm:p-7">

        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary opacity-[0.08] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: Plan info */}
          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Crown className="h-6 w-6 text-white" strokeWidth={2.2} />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  Current plan
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {currentPlan.status}
                </span>
              </div>

              <h2 className="mt-1.5 text-2xl font-bold text-heading">
                {currentPlan.name}
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                <span className="text-2xl font-bold text-heading">
                  £{currentPlan.price}
                </span>
                <span className="text-sm text-text-muted">/{currentPlan.interval}</span>
                {" · "}
                <span>Next billing on {currentPlan.nextBilling}</span>
              </p>

            </div>

          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={() => setActiveTab("plans")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-primary-hover
                hover:-translate-y-0.5
              "
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Upgrade plan</span>
            </button>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Manage</span>
            </button>

          </div>

        </div>

      </div>

      {/* Usage Stats */}
      <div>

        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          Usage this month
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {usageStats.map((stat) => {
            const Icon = stat.icon;
            const isLimited = typeof stat.limit === "number";
            const percentage = isLimited
              ? Math.round((stat.used / stat.limit) * 100)
              : null;

            return (
              <div
                key={stat.id}
                className="rounded-xl border border-border-light bg-white p-5 shadow-[0_3px_14px_rgba(16,42,67,0.035)]"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                    <Icon
                      className="h-4 w-4 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </span>

                </div>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-heading">
                    {stat.used}
                  </p>
                  <p className="mt-0.5 text-[11px] text-text-muted">
                    of {stat.limit}
                  </p>
                </div>

                {percentage !== null && (
                  <div className="mt-3">

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-soft">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p className="mt-2 text-[10px] font-semibold text-text-muted">
                      {percentage}% used
                    </p>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* Payment Method */}
      <div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Payment method
          </h3>
          <button
            type="button"
            className="text-[11px] font-semibold text-primary hover:text-primary-hover"
          >
            + Add new
          </button>
        </div>

        <div className="rounded-xl border border-border-light bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-border bg-white">
                <span className="font-bold text-sm tracking-wider text-[#1A1F71]">
                  VISA
                </span>
              </div>

              <div>

                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-heading">
                    •••• •••• •••• {paymentMethod.last4}
                  </p>
                  {paymentMethod.isDefault && (
                    <span className="rounded-full bg-primary-light px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-0.5 text-[11px] text-text-muted">
                  Expires {paymentMethod.expiry}
                </p>

              </div>

            </div>

            <button
              type="button"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-border
                bg-white
                text-text-muted
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
              aria-label="Edit payment method"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>

          </div>

        </div>

      </div>

      {/* Billing Information */}
      <div>

        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          Billing information
        </h3>

        <div className="rounded-xl border border-border-light bg-white p-5 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Billing name
              </p>
              <p className="mt-1.5 text-sm font-semibold text-heading">
                ABC Trading Ltd
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Billing email
              </p>
              <p className="mt-1.5 text-sm font-semibold text-heading">
                billing@abctrading.co.uk
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Billing address
              </p>
              <p className="mt-1.5 text-sm text-text">
                123 High Street, London, EC1A 1AA, United Kingdom
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                VAT number
              </p>
              <p className="mt-1.5 text-sm font-semibold text-heading">
                GB123456789
              </p>
            </div>

          </div>

          <button
            type="button"
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-text
              transition-all
              duration-200
              hover:border-primary
              hover:text-primary
            "
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit billing details</span>
          </button>

        </div>

      </div>

      {/* Danger zone */}
      <div>

        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-danger">
          Cancel subscription
        </h3>

        <div className="rounded-xl border border-danger/30 bg-danger-light p-5">

          <div className="flex items-start gap-4">

            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-bold text-heading">
                Cancel your subscription
              </p>

              <p className="mt-1 text-xs leading-5 text-text-secondary">
                You'll keep access until the end of your current billing
                period on {currentPlan.nextBilling}. After that, your
                account will be downgraded.
              </p>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-danger
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-danger
                  transition-all
                  duration-200
                  hover:bg-danger
                  hover:text-white
                "
              >
                <span>Cancel subscription</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

  // =========================================================
  // RENDER INVOICES TAB
  // =========================================================

  const renderInvoices = () => (
    <div className="space-y-6">

      {/* Header actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-sm font-bold text-heading">
            Invoice history
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Download past invoices for your records
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            self-start
            rounded-lg
            border
            border-border
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-text
            transition-all
            duration-200
            hover:border-primary
            hover:text-primary
          "
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download all</span>
        </button>

      </div>

      {/* Invoices list */}
      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border-light bg-background-soft">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Invoice
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">

              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group transition-colors hover:bg-background-soft"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                        <Receipt className="h-4 w-4 text-primary" strokeWidth={2.2} />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-heading">
                          {invoice.id}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-muted">
                          {invoice.period}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-heading">
                      {invoice.date}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-heading">
                      {invoice.amount}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">
                      {invoice.method}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      <Check className="h-3 w-3" />
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">

                    <div className="flex items-center justify-end gap-1">

                      <button
                        type="button"
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          text-text-muted
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                        aria-label="View invoice"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          text-text-muted
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                        aria-label="Download invoice"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border-light md:hidden">

          {invoices.map((invoice) => (
            <div key={invoice.id} className="p-4">

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Receipt className="h-4 w-4 text-primary" strokeWidth={2.2} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-heading">
                      {invoice.id}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">
                      {invoice.date}
                    </p>
                  </div>

                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                  <Check className="h-2.5 w-2.5" />
                  {invoice.status}
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg bg-background-soft px-3 py-2">

                <div>
                  <p className="text-[10px] text-text-muted">Amount</p>
                  <p className="mt-0.5 text-sm font-bold text-heading">
                    {invoice.amount}
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-border
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-text
                    transition-all
                    hover:border-primary
                    hover:text-primary
                  "
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );

  // =========================================================
  // RENDER PLANS TAB
  // =========================================================

  const renderPlans = () => (
    <div className="space-y-6">

      <div className="text-center">
        <h2 className="text-lg font-bold text-heading">
          Choose the right plan for your business
        </h2>
        <p className="mt-1 text-xs text-text-muted">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative
              overflow-hidden
              rounded-2xl
              border-2
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              ${
                plan.isCurrent
                  ? "border-primary bg-primary-light/30 shadow-lg"
                  : plan.isPopular
                  ? "border-primary/30 bg-white shadow-md"
                  : "border-border-light bg-white hover:border-primary/30"
              }
            `}
          >

            {/* Popular badge */}
            {plan.isPopular && !plan.isCurrent && (
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  Popular
                </span>
              </div>
            )}

            {/* Current badge */}
            {plan.isCurrent && (
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                  <Check className="h-2.5 w-2.5" />
                  Current
                </span>
              </div>
            )}

            {/* Icon */}
            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                ${
                  plan.isCurrent
                    ? "bg-primary text-white"
                    : plan.isPopular
                    ? "bg-primary-light text-primary"
                    : "bg-background-soft text-text"
                }
              `}
            >
              {plan.id === "starter" && <Zap className="h-6 w-6" strokeWidth={2.2} />}
              {plan.id === "business-pro" && <Crown className="h-6 w-6" strokeWidth={2.2} />}
              {plan.id === "enterprise" && <Building2 className="h-6 w-6" strokeWidth={2.2} />}
            </div>

            {/* Plan name */}
            <h3 className="mt-4 text-lg font-bold text-heading">
              {plan.name}
            </h3>

            <p className="mt-1 text-xs text-text-muted">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-heading">
                £{plan.price}
              </span>
              <span className="text-xs text-text-muted">
                /{plan.interval}
              </span>
            </div>

            {/* CTA button */}
            <button
              type="button"
              disabled={plan.isCurrent}
              className={`
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                px-4
                py-3
                text-xs
                font-bold
                transition-all
                duration-200
                ${
                  plan.isCurrent
                    ? "cursor-default bg-primary-light text-primary"
                    : plan.isPopular
                    ? "bg-primary text-white shadow-sm hover:bg-primary-hover hover:-translate-y-0.5"
                    : "border border-border bg-white text-text hover:border-primary hover:bg-primary-light hover:text-primary"
                }
              `}
            >
              {plan.isCurrent ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Current plan</span>
                </>
              ) : (
                <>
                  <span>{plan.price > 29 ? "Upgrade" : "Downgrade"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>

            {/* Features */}
            <ul className="mt-6 space-y-3 border-t border-border-light pt-5">

              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">

                  <div
                    className={`
                      mt-0.5
                      flex
                      h-4
                      w-4
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${plan.isCurrent ? "bg-primary" : "bg-primary-light"}
                    `}
                  >
                    <Check
                      className={`h-2.5 w-2.5 ${
                        plan.isCurrent ? "text-white" : "text-primary"
                      }`}
                      strokeWidth={3}
                    />
                  </div>

                  <span className="text-xs text-text">
                    {feature}
                  </span>

                </li>
              ))}

            </ul>

          </div>
        ))}

      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-primary-soft bg-primary-light p-4">

        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

        <div>
          <p className="text-xs font-bold text-heading">
            Need a custom plan?
          </p>
          <p className="mt-1 text-[11px] leading-5 text-text-secondary">
            For accounting firms managing 50+ companies or custom
            requirements, contact us at{" "}
            <a
              href="mailto:sales@taxpilotuk.com"
              className="font-semibold text-primary hover:text-primary-hover"
            >
              sales@taxpilotuk.com
            </a>
          </p>
        </div>

      </div>

    </div>
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Billing & Subscription
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your plan, payment methods and invoices.
          </p>
        </div>

        <Link
          to="/organization/settings"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            border
            border-border
            bg-white
            px-5
            py-2.5
            text-sm
            font-semibold
            text-text
            transition-all
            duration-200
            hover:border-primary
            hover:text-primary
            sm:self-auto
          "
        >
          <Shield className="h-4 w-4" />
          <span>Security</span>
        </Link>

      </div>

      {/* =====================================================
          TABS
      ====================================================== */}

      <div className="flex gap-2 overflow-x-auto border-b border-border-light pb-0">

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                group
                relative
                flex
                shrink-0
                items-center
                gap-2
                px-4
                py-3
                text-sm
                font-semibold
                transition-colors
                ${isActive ? "text-primary" : "text-text-muted hover:text-primary"}
              `}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              <span>{tab.label}</span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-primary" />
              )}

            </button>
          );
        })}

      </div>

      {/* =====================================================
          TAB CONTENT
      ====================================================== */}

      {activeTab === "overview" && renderOverview()}
      {activeTab === "invoices" && renderInvoices()}
      {activeTab === "plans" && renderPlans()}

      {/* =====================================================
          CANCEL MODAL (Demo)
      ====================================================== */}

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCancelModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border-light bg-white shadow-2xl">

            <div className="p-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <AlertCircle className="h-6 w-6 text-rose-500" strokeWidth={2.2} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-heading">
                Cancel your subscription?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                You'll lose access to all premium features at the end of
                your billing period on {currentPlan.nextBilling}. Your
                data will be retained for 30 days.
              </p>

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3">

                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                  <p className="text-[11px] leading-5 text-amber-800">
                    Consider downgrading to Starter instead of cancelling
                    to keep your data and filings.
                  </p>
                </div>

              </div>

            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border-light bg-background-soft px-6 py-4 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  bg-white
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  text-text
                  transition-all
                  duration-200
                  hover:border-primary
                  hover:text-primary
                  sm:w-auto
                "
              >
                Keep subscription
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCancelModal(false);
                  setActiveTab("plans");
                }}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-rose-500
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-rose-600
                  sm:w-auto
                "
              >
                <span>Cancel anyway</span>
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default OrganizationBilling;