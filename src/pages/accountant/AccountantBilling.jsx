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
  Users,
  Briefcase,
  Clock3,
  Search,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";

const AccountantBilling = () => {
  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("overview");
  const [showCancelModal, setShowCancelModal] = useState(false);

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: CreditCard },
    { id: "invoices", label: "Invoices", icon: Receipt },
    { id: "plans", label: "Plans", icon: Crown },
  ];

  /* ============================================================
     CURRENT PLAN DATA
  ============================================================ */

  const currentPlan = {
    name: "Practice Pro",
    price: 149,
    interval: "month",
    status: "Active",
    nextBilling: "15 October 2026",
    startedOn: "15 January 2025",
    seats: 10,
    usedSeats: 8,
    features: [
      "Unlimited clients",
      "Unlimited companies",
      "All tax products",
      "Priority support",
      "API access",
      "Client portal",
      "Team management",
    ],
  };

  /* ============================================================
     USAGE STATS
  ============================================================ */

  const usageStats = [
    {
      id: "clients",
      label: "Clients",
      used: 42,
      limit: "Unlimited",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "companies",
      label: "Companies",
      used: 68,
      limit: "Unlimited",
      icon: Building2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "seats",
      label: "Team seats",
      used: 8,
      limit: 10,
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      percentage: 80,
    },
    {
      id: "filings",
      label: "Filings this month",
      used: 48,
      limit: "Unlimited",
      icon: FileText,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  /* ============================================================
     INVOICES
  ============================================================ */

  const invoices = [
    {
      id: "INV-2026-009",
      date: "15 Sep 2026",
      amount: "£149.00",
      status: "Paid",
      period: "Sep 15 - Oct 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-008",
      date: "15 Aug 2026",
      amount: "£149.00",
      status: "Paid",
      period: "Aug 15 - Sep 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-007",
      date: "15 Jul 2026",
      amount: "£149.00",
      status: "Paid",
      period: "Jul 15 - Aug 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-006",
      date: "15 Jun 2026",
      amount: "£149.00",
      status: "Paid",
      period: "Jun 15 - Jul 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-005",
      date: "15 May 2026",
      amount: "£149.00",
      status: "Paid",
      period: "May 15 - Jun 14, 2026",
      method: "Visa •••• 4242",
    },
    {
      id: "INV-2026-004",
      date: "15 Apr 2026",
      amount: "£149.00",
      status: "Paid",
      period: "Apr 15 - May 14, 2026",
      method: "Visa •••• 4242",
    },
  ];

  /* ============================================================
     PLANS
  ============================================================ */

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 49,
      interval: "month",
      description: "Perfect for sole practitioners starting out",
      features: [
        "Up to 10 clients",
        "Up to 20 companies",
        "Corporation Tax filing",
        "VAT Returns",
        "Email support",
      ],
      isCurrent: false,
      isPopular: false,
    },
    {
      id: "practice-pro",
      name: "Practice Pro",
      price: 149,
      interval: "month",
      description: "Best for growing accountancy practices",
      features: [
        "Unlimited clients",
        "Unlimited companies",
        "All tax products",
        "Priority support",
        "API access",
        "Client portal",
        "Team management (10 seats)",
      ],
      isCurrent: true,
      isPopular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 499,
      interval: "month",
      description: "For large firms with custom requirements",
      features: [
        "Everything in Practice Pro",
        "Unlimited team seats",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
        "White-label options",
        "Advanced reporting",
      ],
      isCurrent: false,
      isPopular: false,
    },
  ];

  /* ============================================================
     PAYMENT METHOD
  ============================================================ */

  const paymentMethod = {
    brand: "Visa",
    last4: "4242",
    expiry: "12/2027",
    isDefault: true,
  };

  /* ============================================================
     BILLING INFO
  ============================================================ */

  const billingInfo = {
    name: "TaxPilot Accountants Ltd",
    email: "billing@taxpilot.co.uk",
    address: "25 King Street, London, EC2V 8AU, United Kingdom",
    vatNumber: "GB123456789",
    companyNumber: "12345678",
  };

  /* ============================================================
     RENDER OVERVIEW TAB
  ============================================================ */

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="relative overflow-hidden rounded-xl border border-[#C9EDE1] bg-gradient-to-br from-[#E8F8F2] via-white to-[#E8F8F2] p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.08] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <Crown className="h-6 w-6 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087F5B]">
                  Current plan
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {currentPlan.status}
                </span>
              </div>

              <h2 className="mt-1.5 text-2xl font-bold text-[#09263A]">
                {currentPlan.name}
              </h2>

              <p className="mt-1 text-sm text-[#687B78]">
                <span className="text-2xl font-bold text-[#09263A]">
                  £{currentPlan.price}
                </span>
                <span className="text-sm">/{currentPlan.interval}</span>
                {" · "}
                <span>Next billing on {currentPlan.nextBilling}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("plans")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-[#087F5B]
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-[#005E45]
                hover:-translate-y-0.5
              "
            >
              <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
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
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
              "
            >
              <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span>Manage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#687B78]">
          Usage this month
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usageStats.map((stat) => {
            const Icon = stat.icon;
            const isLimited = typeof stat.limit === "number";
            const percentage = isLimited
              ? Math.round((stat.used / stat.limit) * 100)
              : null;

            return (
              <div
                key={stat.id}
                className="rounded-xl border border-[#DDEAE6] bg-white p-5 shadow-[0_3px_14px_rgba(16,42,67,0.035)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F2]">
                    <Icon className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#687B78]">
                    {stat.label}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-[#09263A]">
                    {stat.used}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#687B78]">
                    of {stat.limit}
                  </p>
                </div>

                {percentage !== null && (
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F5]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          percentage > 80 ? "bg-amber-500" : "bg-[#087F5B]"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p
                      className={`mt-2 text-[10px] font-semibold ${
                        percentage > 80 ? "text-amber-600" : "text-[#687B78]"
                      }`}
                    >
                      {percentage}% used
                      {percentage > 80 && " · Consider upgrading"}
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
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687B78]">
            Payment method
          </h3>
          <button className="text-[11px] font-semibold text-[#087F5B] hover:text-[#005E45]">
            + Add new
          </button>
        </div>

        <div className="rounded-xl border border-[#DDEAE6] bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-[#DDEAE6] bg-white">
                <span className="font-bold text-sm tracking-wider text-[#1A1F71]">
                  VISA
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#09263A]">
                    •••• •••• •••• {paymentMethod.last4}
                  </p>
                  {paymentMethod.isDefault && (
                    <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#087F5B]">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-0.5 text-[11px] text-[#687B78]">
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
                border-[#DDEAE6]
                bg-white
                text-[#687B78]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
              "
              aria-label="Edit payment method"
            >
              <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#687B78]">
            Billing information
          </h3>
          <button className="text-[11px] font-semibold text-[#087F5B] hover:text-[#005E45]">
            Edit
          </button>
        </div>

        <div className="rounded-xl border border-[#DDEAE6] bg-white p-5 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                Billing name
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#09263A]">
                {billingInfo.name}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                Billing email
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#09263A]">
                {billingInfo.email}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                Billing address
              </p>
              <p className="mt-1.5 text-sm text-[#09263A]">
                {billingInfo.address}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                VAT number
              </p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-[#09263A]">
                {billingInfo.vatNumber}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                Company number
              </p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-[#09263A]">
                {billingInfo.companyNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-rose-600">
          Cancel subscription
        </h3>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
          <div className="flex items-start gap-4">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-rose-500"
              strokeWidth={2.2}
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#09263A]">
                Cancel your subscription
              </p>

              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                You'll keep access until the end of your current billing period
                on {currentPlan.nextBilling}. After that, your account will be
                downgraded and you'll lose access to premium features.
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
                  border-rose-300
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-rose-600
                  transition-all
                  duration-200
                  hover:bg-rose-600
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

  /* ============================================================
     RENDER INVOICES TAB
  ============================================================ */

  const renderInvoices = () => (
    <div className="space-y-6">
      {/* Header actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#09263A]">
            Invoice history
          </h2>
          <p className="mt-0.5 text-xs text-[#687B78]">
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
            border-[#DDEAE6]
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-[#09263A]
            transition-all
            duration-200
            hover:border-[#087F5B]
            hover:text-[#087F5B]
          "
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
          <span>Download all</span>
        </button>
      </div>

      {/* Invoices list */}
      <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Invoice
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#DDEAE6]">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="group transition-colors hover:bg-[#F5FCF9]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                        <Receipt
                          className="h-4 w-4 text-[#087F5B]"
                          strokeWidth={2.2}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#09263A]">
                          {invoice.id}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#687B78]">
                          {invoice.period}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-[#09263A]">
                      {invoice.date}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-[#09263A]">
                      {invoice.amount}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#687B78]">
                      {invoice.method}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                      <Check className="h-3 w-3" strokeWidth={3} />
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                        aria-label="View invoice"
                      >
                        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                        aria-label="Download invoice"
                      >
                        <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-[#DDEAE6] md:hidden">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <Receipt
                      className="h-4 w-4 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#09263A]">
                      {invoice.id}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#687B78]">
                      {invoice.date}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  {invoice.status}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg bg-[#F5FCF9] px-3 py-2">
                <div>
                  <p className="text-[10px] text-[#687B78]">Amount</p>
                  <p className="mt-0.5 text-sm font-bold text-[#09263A]">
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
                    border-[#DDEAE6]
                    bg-white
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-[#09263A]
                    transition-all
                    hover:border-[#087F5B]
                    hover:text-[#087F5B]
                  "
                >
                  <Download className="h-3 w-3" strokeWidth={2.4} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ============================================================
     RENDER PLANS TAB
  ============================================================ */

  const renderPlans = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-[#09263A]">
          Choose the right plan for your practice
        </h2>
        <p className="mt-1 text-xs text-[#687B78]">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.isCurrent;
          const isPopular = plan.isPopular;
          const isUpgrade = plan.price > currentPlan.price;
          const isDowngrade = plan.price < currentPlan.price;

          return (
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
                  isCurrent
                    ? "border-[#087F5B] bg-[#E8F8F2]/30 shadow-lg"
                    : isPopular
                    ? "border-[#087F5B]/30 bg-white shadow-md"
                    : "border-[#DDEAE6] bg-white hover:border-[#087F5B]/30"
                }
              `}
            >
              {isPopular && !isCurrent && (
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#087F5B] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Popular
                  </span>
                </div>
              )}

              {isCurrent && (
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    Current
                  </span>
                </div>
              )}

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  ${
                    isCurrent
                      ? "bg-[#087F5B] text-white"
                      : isPopular
                      ? "bg-[#E8F8F2] text-[#087F5B]"
                      : "bg-[#F5FCF9] text-[#687B78]"
                  }
                `}
              >
                {plan.id === "starter" && (
                  <Zap className="h-6 w-6" strokeWidth={2.2} />
                )}
                {plan.id === "practice-pro" && (
                  <Crown className="h-6 w-6" strokeWidth={2.2} />
                )}
                {plan.id === "enterprise" && (
                  <Building2 className="h-6 w-6" strokeWidth={2.2} />
                )}
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#09263A]">
                {plan.name}
              </h3>

              <p className="mt-1 text-xs text-[#687B78]">
                {plan.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#09263A]">
                  £{plan.price}
                </span>
                <span className="text-xs text-[#687B78]">
                  /{plan.interval}
                </span>
              </div>

              <button
                type="button"
                disabled={isCurrent}
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
                    isCurrent
                      ? "cursor-default bg-[#E8F8F2] text-[#087F5B]"
                      : isPopular
                      ? "bg-[#087F5B] text-white shadow-sm hover:bg-[#005E45] hover:-translate-y-0.5"
                      : "border border-[#DDEAE6] bg-white text-[#09263A] hover:border-[#087F5B] hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                  }
                `}
              >
                {isCurrent ? (
                  <>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    <span>Current plan</span>
                  </>
                ) : (
                  <>
                    <span>
                      {isUpgrade
                        ? "Upgrade"
                        : isDowngrade
                        ? "Downgrade"
                        : "Switch"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </>
                )}
              </button>

              <ul className="mt-6 space-y-3 border-t border-[#DDEAE6] pt-5">
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
                        ${isCurrent ? "bg-[#087F5B]" : "bg-[#E8F8F2]"}
                      `}
                    >
                      <Check
                        className={`h-2.5 w-2.5 ${
                          isCurrent ? "text-white" : "text-[#087F5B]"
                        }`}
                        strokeWidth={3}
                      />
                    </div>

                    <span className="text-xs text-[#09263A]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#C9EDE1] bg-[#E8F8F2] p-4">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]"
          strokeWidth={2.2}
        />
        <div>
          <p className="text-xs font-bold text-[#09263A]">
            Need a custom plan?
          </p>
          <p className="mt-1 text-[11px] leading-5 text-[#687B78]">
            For large accounting firms or custom requirements, contact our
            sales team at{" "}
            <a
              href="mailto:sales@taxpilotuk.com"
              className="font-semibold text-[#087F5B] hover:text-[#005E45]"
            >
              sales@taxpilotuk.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
            Billing & Subscription
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage your practice plan, payment methods and invoices
          </p>
        </div>

        <Link
          to="/accountant/settings"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            border
            border-[#DDEAE6]
            bg-white
            px-5
            py-2.5
            text-sm
            font-semibold
            text-[#09263A]
            transition-all
            duration-200
            hover:border-[#087F5B]
            hover:text-[#087F5B]
            sm:self-auto
          "
        >
          <Shield className="h-4 w-4" strokeWidth={2.2} />
          <span>Security</span>
        </Link>
      </div>

      {/* ======================================================
          TABS
      ====================================================== */}
      <div className="flex gap-2 overflow-x-auto border-b border-[#DDEAE6]">
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
                ${
                  isActive
                    ? "text-[#087F5B]"
                    : "text-[#687B78] hover:text-[#087F5B]"
                }
              `}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              <span>{tab.label}</span>

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-[#087F5B]" />
              )}
            </button>
          );
        })}
      </div>

      {/* ======================================================
          TAB CONTENT
      ====================================================== */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "invoices" && renderInvoices()}
      {activeTab === "plans" && renderPlans()}

      {/* ======================================================
          CANCEL MODAL
      ====================================================== */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#09263A]/40 backdrop-blur-[2px]"
            onClick={() => setShowCancelModal(false)}
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#DDEAE6] bg-white shadow-[0_24px_80px_rgba(9,38,58,0.20)]">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                <AlertCircle
                  className="h-6 w-6 text-rose-500"
                  strokeWidth={2.2}
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#09263A]">
                Cancel your subscription?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#687B78]">
                You'll lose access to all premium features at the end of your
                billing period on {currentPlan.nextBilling}. Your data will be
                retained for 30 days.
              </p>

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-start gap-2">
                  <Info
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600"
                    strokeWidth={2.4}
                  />
                  <p className="text-[11px] leading-5 text-amber-800">
                    Consider downgrading to Starter instead of cancelling to
                    keep your data and filings.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-6 py-4 sm:flex-row sm:justify-end">
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
                  border-[#DDEAE6]
                  bg-white
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#09263A]
                  transition-all
                  duration-200
                  hover:border-[#087F5B]
                  hover:text-[#087F5B]
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

export default AccountantBilling;