import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "companies",
      label: "Companies",
      used: 68,
      limit: "Unlimited",
      icon: Building2,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      id: "seats",
      label: "Team seats",
      used: 8,
      limit: 10,
      icon: Users,
      iconBg: "bg-success-light",
      iconColor: "text-success",
      percentage: 80,
    },
    {
      id: "filings",
      label: "Filings this month",
      used: 48,
      limit: "Unlimited",
      icon: FileText,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
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
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  const listItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: premiumEase },
    },
  };

  const planCardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 20, scale: 0.96 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: premiumEase,
        delay: shouldReduceMotion ? 0 : index * 0.08,
      },
    }),
  };

  const tabContentVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: premiumEase },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          transition: { duration: 0.2, ease: premiumEase },
        },
  };

  /* ============================================================
     RENDER OVERVIEW TAB
  ============================================================ */

  const renderOverview = () => (
    <motion.div
      key="overview"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Current Plan Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-primary/20
          bg-gradient-to-br
          from-primary-light
          via-background
          to-primary-light
          p-6
          sm:p-7
        "
      >
        <motion.div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-primary
            opacity-[0.08]
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <motion.div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary
                shadow-button
              "
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.6, rotate: -12 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.15,
              }}
            >
              <Crown className="h-6 w-6 text-text-white" strokeWidth={2.2} />
            </motion.div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  Current plan
                </p>
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-success-light
                    px-2
                    py-0.5
                    text-[10px]
                    font-bold
                    text-success
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
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
                <span className="text-sm">/{currentPlan.interval}</span>
                {" · "}
                <span>Next billing on {currentPlan.nextBilling}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              onClick={() => setActiveTab("plans")}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
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
                text-text-white
                shadow-button
                transition-colors
                duration-200
                hover:bg-primary-hover
              "
            >
              <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
              <span>Upgrade plan</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-xs
                font-semibold
                text-heading
                transition-colors
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >
              <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span>Manage</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Usage Stats */}
      <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
          Usage this month
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {usageStats.map((stat, index) => {
            const Icon = stat.icon;
            const isLimited = typeof stat.limit === "number";
            const percentage = isLimited
              ? Math.round((stat.used / stat.limit) * 100)
              : null;

            return (
              <motion.div
                key={stat.id}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: 0.5,
                  ease: premiumEase,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, transition: { duration: 0.25 } }
                }
                className="
                  rounded-xl
                  border
                  border-border
                  bg-background
                  p-5
                  shadow-card
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:border-primary/20
                  hover:shadow-card-hover
                "
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    {stat.label}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-2xl font-bold text-heading">
                    {stat.used}
                  </p>
                  <p className="mt-0.5 text-[11px] text-text-secondary">
                    of {stat.limit}
                  </p>
                </div>

                {percentage !== null && (
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-soft">
                      <motion.div
                        className={`h-full rounded-full ${
                          percentage > 80 ? "bg-warning" : "bg-primary"
                        }`}
                        initial={
                          shouldReduceMotion ? false : { width: 0 }
                        }
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          duration: 0.9,
                          ease: premiumEase,
                          delay: shouldReduceMotion
                            ? 0
                            : 0.3 + index * 0.06,
                        }}
                      />
                    </div>
                    <p
                      className={`mt-2 text-[10px] font-semibold ${
                        percentage > 80 ? "text-warning" : "text-text-secondary"
                      }`}
                    >
                      {percentage}% used
                      {percentage > 80 && " · Consider upgrading"}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Payment Method */}
      <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Payment method
          </h3>
          <button className="text-[11px] font-semibold text-primary transition-colors hover:text-primary-hover">
            + Add new
          </button>
        </div>

        <div
          className="
            rounded-xl
            border
            border-border
            bg-background
            p-4
            shadow-card
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-border bg-background">
                <span className="font-bold text-sm tracking-wider text-heading">
                  VISA
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-heading">
                    •••• •••• •••• {paymentMethod.last4}
                  </p>
                  {paymentMethod.isDefault && (
                    <span
                      className="
                        rounded-full
                        bg-primary-light
                        px-2
                        py-0.5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-primary
                      "
                    >
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-0.5 text-[11px] text-text-secondary">
                  Expires {paymentMethod.expiry}
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.05, transition: { duration: 0.15 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
                bg-background
                text-text-secondary
                transition-colors
                duration-200
                hover:border-primary
                hover:text-primary
              "
              aria-label="Edit payment method"
            >
              <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Billing Information */}
      <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Billing information
          </h3>
          <button className="text-[11px] font-semibold text-primary transition-colors hover:text-primary-hover">
            Edit
          </button>
        </div>

        <div
          className="
            rounded-xl
            border
            border-border
            bg-background
            p-5
            shadow-card
          "
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Billing name
              </p>
              <p className="mt-1.5 text-sm font-semibold text-heading">
                {billingInfo.name}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Billing email
              </p>
              <p className="mt-1.5 text-sm font-semibold text-heading">
                {billingInfo.email}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Billing address
              </p>
              <p className="mt-1.5 text-sm text-heading">
                {billingInfo.address}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                VAT number
              </p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-heading">
                {billingInfo.vatNumber}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Company number
              </p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-heading">
                {billingInfo.companyNumber}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Danger zone */}
      <motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-danger">
          Cancel subscription
        </h3>

        <div className="rounded-xl border border-danger/20 bg-danger-light p-5">
          <div className="flex items-start gap-4">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-danger"
              strokeWidth={2.2}
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-heading">
                Cancel your subscription
              </p>

              <p className="mt-1 text-xs leading-5 text-text-secondary">
                You'll keep access until the end of your current billing period
                on {currentPlan.nextBilling}. After that, your account will be
                downgraded and you'll lose access to premium features.
              </p>

              <motion.button
                type="button"
                onClick={() => setShowCancelModal(true)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-danger/30
                  bg-background
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-danger
                  transition-colors
                  duration-200
                  hover:bg-danger
                  hover:text-text-white
                "
              >
                <span>Cancel subscription</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  /* ============================================================
     RENDER INVOICES TAB
  ============================================================ */

  const renderInvoices = () => (
    <motion.div
      key="invoices"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-heading">
            Invoice history
          </h2>
          <p className="mt-0.5 text-xs text-text-secondary">
            Download past invoices for your records
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={
            shouldReduceMotion
              ? undefined
              : { y: -1, transition: { duration: 0.2 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className="
            inline-flex
            items-center
            gap-2
            self-start
            rounded-lg
            border
            border-border
            bg-background
            px-4
            py-2.5
            text-xs
            font-semibold
            text-heading
            transition-colors
            duration-200
            hover:border-primary
            hover:text-primary
          "
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
          <span>Download all</span>
        </motion.button>
      </div>

      {/* Invoices list */}
      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-background
          shadow-card
        "
      >
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background-soft">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Invoice
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {invoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, x: -8 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    duration: 0.45,
                    ease: premiumEase,
                  }}
                  className="group transition-colors hover:bg-background-soft"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                        <Receipt
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-heading">
                          {invoice.id}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-secondary">
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
                    <p className="mt-0.5 text-[10px] text-text-secondary">
                      {invoice.method}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-success-light
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-success
                      "
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <motion.button
                        type="button"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                scale: 1.1,
                                transition: { duration: 0.15 },
                              }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.95 }
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          text-text-secondary
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                        aria-label="View invoice"
                      >
                        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                scale: 1.1,
                                transition: { duration: 0.15 },
                              }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.95 }
                        }
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          text-text-secondary
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                        aria-label="Download invoice"
                      >
                        <Download
                          className="h-3.5 w-3.5"
                          strokeWidth={2.4}
                        />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border md:hidden">
          {invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : index * 0.05,
                duration: 0.45,
                ease: premiumEase,
              }}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Receipt
                      className="h-4 w-4 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-heading">
                      {invoice.id}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-secondary">
                      {invoice.date}
                    </p>
                  </div>
                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-success-light
                    px-2
                    py-0.5
                    text-[9px]
                    font-bold
                    text-success
                  "
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  {invoice.status}
                </span>
              </div>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  bg-background-soft
                  px-3
                  py-2
                "
              >
                <div>
                  <p className="text-[10px] text-text-secondary">Amount</p>
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
                    bg-background
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-heading
                    transition-colors
                    hover:border-primary
                    hover:text-primary
                  "
                >
                  <Download className="h-3 w-3" strokeWidth={2.4} />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  /* ============================================================
     RENDER PLANS TAB
  ============================================================ */

  const renderPlans = () => (
    <motion.div
      key="plans"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <h2 className="text-lg font-bold text-heading">
          Choose the right plan for your practice
        </h2>
        <p className="mt-1 text-xs text-text-secondary">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const isCurrent = plan.isCurrent;
          const isPopular = plan.isPopular;
          const isUpgrade = plan.price > currentPlan.price;
          const isDowngrade = plan.price < currentPlan.price;

          return (
            <motion.div
              key={plan.id}
              custom={index}
              variants={planCardVariants}
              initial="hidden"
              animate="visible"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.25 } }
              }
              className={`
                relative
                overflow-hidden
                rounded-2xl
                border-2
                p-6
                transition-[border-color,box-shadow]
                duration-300
                ${
                  isCurrent
                    ? "border-primary bg-primary-light/30 shadow-card-hover"
                    : isPopular
                      ? "border-primary/30 bg-background shadow-card"
                      : "border-border bg-background hover:border-primary/30"
                }
              `}
            >
              {isPopular && !isCurrent && (
                <div className="absolute right-4 top-4">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-primary
                      px-2.5
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-text-white
                    "
                  >
                    <Star className="h-2.5 w-2.5 fill-current" />
                    Popular
                  </span>
                </div>
              )}

              {isCurrent && (
                <div className="absolute right-4 top-4">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-success-light
                      px-2.5
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-success
                    "
                  >
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
                      ? "bg-primary text-text-white"
                      : isPopular
                        ? "bg-primary-light text-primary"
                        : "bg-background-soft text-text-secondary"
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

              <h3 className="mt-4 text-lg font-bold text-heading">
                {plan.name}
              </h3>

              <p className="mt-1 text-xs text-text-secondary">
                {plan.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-heading">
                  £{plan.price}
                </span>
                <span className="text-xs text-text-secondary">
                  /{plan.interval}
                </span>
              </div>

              <motion.button
                type="button"
                disabled={isCurrent}
                whileHover={
                  shouldReduceMotion || isCurrent
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={
                  shouldReduceMotion || isCurrent
                    ? undefined
                    : { scale: 0.98 }
                }
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
                  transition-colors
                  duration-200
                  ${
                    isCurrent
                      ? "cursor-default bg-primary-light text-primary"
                      : isPopular
                        ? "bg-primary text-text-white shadow-button hover:bg-primary-hover"
                        : "border border-border bg-background text-heading hover:border-primary hover:bg-primary-light hover:text-primary"
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
              </motion.button>

              <ul className="mt-6 space-y-3 border-t border-border pt-5">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: -6 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion
                        ? 0
                        : index * 0.08 + featureIndex * 0.04,
                      duration: 0.4,
                      ease: premiumEase,
                    }}
                    className="flex items-start gap-2.5"
                  >
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
                        ${isCurrent ? "bg-primary" : "bg-primary-light"}
                      `}
                    >
                      <Check
                        className={`h-2.5 w-2.5 ${
                          isCurrent ? "text-text-white" : "text-primary"
                        }`}
                        strokeWidth={3}
                      />
                    </div>

                    <span className="text-xs text-heading">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="
          flex
          items-start
          gap-3
          rounded-xl
          border
          border-primary/20
          bg-primary-light
          p-4
        "
      >
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
          strokeWidth={2.2}
        />
        <div>
          <p className="text-xs font-bold text-heading">
            Need a custom plan?
          </p>
          <p className="mt-1 text-[11px] leading-5 text-text-secondary">
            For large accounting firms or custom requirements, contact our
            sales team at{" "}
            <a
              href="mailto:sales@taxpilotuk.com"
              className="font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              sales@taxpilotuk.com
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Billing & Subscription
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your practice plan, payment methods and invoices
          </p>
        </div>

        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : { y: -1, transition: { duration: 0.2 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className="self-start sm:self-auto"
        >
          <Link
            to="/accountant/settings"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-5
              py-2.5
              text-sm
              font-semibold
              text-heading
              transition-colors
              duration-200
              hover:border-primary
              hover:text-primary
            "
          >
            <Shield className="h-4 w-4" strokeWidth={2.2} />
            <span>Security</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* ======================================================
          TABS
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="flex gap-2 overflow-x-auto border-b border-border"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
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
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                }
              `}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              <span>{tab.label}</span>

              {isActive && (
                <motion.span
                  layoutId="billing-tab-indicator"
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-0.5
                    rounded-t-full
                    bg-primary
                  "
                  transition={{ duration: 0.3, ease: premiumEase }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* ======================================================
          TAB CONTENT
      ====================================================== */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "invoices" && renderInvoices()}
        {activeTab === "plans" && renderPlans()}
      </AnimatePresence>

      {/* ======================================================
          CANCEL MODAL
      ====================================================== */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[400] flex items-center justify-center px-4"
          >
            <div
              className="absolute inset-0 bg-dark/40 backdrop-blur-[2px]"
              onClick={() => setShowCancelModal(false)}
            />

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 20, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, scale: 0.97 }
              }
              transition={{ duration: 0.28, ease: premiumEase }}
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background
                shadow-card-hover
              "
            >
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-light">
                  <AlertCircle
                    className="h-6 w-6 text-danger"
                    strokeWidth={2.2}
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-heading">
                  Cancel your subscription?
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  You'll lose access to all premium features at the end of your
                  billing period on {currentPlan.nextBilling}. Your data will be
                  retained for 30 days.
                </p>

                <div
                  className="
                    mt-5
                    rounded-lg
                    border
                    border-warning/20
                    bg-warning-light
                    p-3
                  "
                >
                  <div className="flex items-start gap-2">
                    <Info
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning"
                      strokeWidth={2.4}
                    />
                    <p className="text-[11px] leading-5 text-warning">
                      Consider downgrading to Starter instead of cancelling to
                      keep your data and filings.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-2
                  border-t
                  border-border
                  bg-background-soft
                  px-6
                  py-4
                  sm:flex-row
                  sm:justify-end
                "
              >
                <motion.button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.2 } }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-border
                    bg-background
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    text-heading
                    transition-colors
                    duration-200
                    hover:border-primary
                    hover:text-primary
                    sm:w-auto
                  "
                >
                  Keep subscription
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    setShowCancelModal(false);
                    setActiveTab("plans");
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.2 } }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
                  className="
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-danger
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    text-text-white
                    shadow-button
                    transition-colors
                    duration-200
                    hover:bg-danger/90
                    sm:w-auto
                  "
                >
                  <span>Cancel anyway</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccountantBilling;