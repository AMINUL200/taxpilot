import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  Briefcase,
  PoundSterling,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Activity,
  UserPlus,
  Building,
  CreditCard,
  Star,
  Zap,
  Crown,
  Download,
  RefreshCw,
} from "lucide-react";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const admin = {
    firstName: "Admin",
    lastName: "User",
  };

  const stats = [
    {
      id: "organizations",
      label: "Organizations",
      value: "1,248",
      change: "+12",
      changeLabel: "this week",
      trend: "up",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/admin/organizations",
    },
    {
      id: "users",
      label: "Users",
      value: "3,842",
      change: "+84",
      changeLabel: "this week",
      trend: "up",
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      path: "/admin/users",
    },
    {
      id: "companies",
      label: "Companies",
      value: "2,156",
      change: "+31",
      changeLabel: "this week",
      trend: "up",
      icon: Briefcase,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/admin/companies",
    },
    {
      id: "revenue",
      label: "Monthly Revenue",
      value: "£48,290",
      change: "+8.4%",
      changeLabel: "vs last month",
      trend: "up",
      icon: PoundSterling,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      path: "/admin/revenue",
    },
  ];

  const subscriptionData = [
    {
      id: "solo",
      name: "Solo",
      count: 682,
      percentage: 54.6,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-100",
      icon: UserPlus,
      price: "£9",
    },
    {
      id: "portfolio",
      name: "Portfolio",
      count: 284,
      percentage: 22.8,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      icon: Briefcase,
      price: "£29",
    },
    {
      id: "portfolio-plus",
      name: "Portfolio Plus",
      count: 91,
      percentage: 7.3,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-100",
      icon: Crown,
      price: "£99",
    },
    {
      id: "dormant",
      name: "Dormant",
      count: 191,
      percentage: 15.3,
      color: "bg-gray-400",
      textColor: "text-gray-600",
      bgColor: "bg-gray-100",
      icon: Clock,
      price: "—",
    },
  ];

  const recentOrganizations = [
    {
      id: 1,
      name: "ABC Trading Ltd",
      plan: "Solo",
      planColor: "bg-blue-100 text-blue-700",
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-700",
      joinedDate: "18 Sep 2026",
      users: 2,
      companies: 1,
    },
    {
      id: 2,
      name: "Green Tech Ltd",
      plan: "Portfolio",
      planColor: "bg-emerald-100 text-emerald-700",
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-700",
      joinedDate: "17 Sep 2026",
      users: 4,
      companies: 3,
    },
    {
      id: 3,
      name: "Smith Consulting",
      plan: "Solo",
      planColor: "bg-blue-100 text-blue-700",
      status: "Pending",
      statusColor: "bg-amber-100 text-amber-700",
      joinedDate: "16 Sep 2026",
      users: 1,
      companies: 1,
    },
    {
      id: 4,
      name: "Bright Solutions Ltd",
      plan: "Portfolio Plus",
      planColor: "bg-purple-100 text-purple-700",
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-700",
      joinedDate: "15 Sep 2026",
      users: 8,
      companies: 12,
    },
    {
      id: 5,
      name: "Harbor Accounting",
      plan: "Portfolio",
      planColor: "bg-emerald-100 text-emerald-700",
      status: "Active",
      statusColor: "bg-emerald-100 text-emerald-700",
      joinedDate: "14 Sep 2026",
      users: 6,
      companies: 24,
    },
  ];

  const systemHealth = [
    {
      id: "api",
      label: "API",
      status: "operational",
      uptime: "99.98%",
    },
    {
      id: "database",
      label: "Database",
      status: "operational",
      uptime: "99.99%",
    },
    {
      id: "hmrc",
      label: "HMRC Gateway",
      status: "operational",
      uptime: "99.95%",
    },
    {
      id: "companies-house",
      label: "Companies House",
      status: "degraded",
      uptime: "98.20%",
    },
  ];

  const timeRangeOptions = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
    { value: "12months", label: "Last 12 months" },
  ];

  // =========================================================
  // HELPERS
  // =========================================================

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {getGreeting()}, {admin.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Here's what's happening across TaxPilot UK today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* Time Range Selector */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setShowTimeDropdown((prev) => !prev)}
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
                text-sm
                font-semibold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >

              <Calendar className="h-4 w-4" />
              <span>{timeRangeOptions.find((o) => o.value === timeRange)?.label}</span>

              <ChevronDown
                className={`
                  h-3.5
                  w-3.5
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showTimeDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showTimeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTimeRange(option.value);
                      setShowTimeDropdown(false);
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      px-4
                      py-2.5
                      text-left
                      text-sm
                      transition-colors
                      hover:bg-primary-light
                      ${
                        timeRange === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {timeRange === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* Refresh */}
          <button
            type="button"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-border
              bg-white
              text-text
              transition-all
              duration-200
              hover:border-primary
              hover:text-primary
            "
            aria-label="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {/* Export */}
          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-primary-hover
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export report</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          STATS CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <Link
              key={stat.id}
              to={stat.path}
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                border
                border-border-light
                bg-white
                p-5
                shadow-[0_3px_14px_rgba(16,42,67,0.035)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/20
                hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]
              "
            >

              <div className="flex items-start justify-between">

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted sm:text-xs">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                    {stat.value}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5">

                    <span
                      className={`
                        flex
                        items-center
                        gap-0.5
                        rounded-full
                        px-1.5
                        py-0.5
                        text-[10px]
                        font-bold
                        ${
                          stat.trend === "up"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }
                      `}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {stat.change}
                    </span>

                    <span className="text-[10px] text-text-muted">
                      {stat.changeLabel}
                    </span>

                  </div>

                </div>

                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${stat.iconBg}
                  `}
                >
                  <Icon
                    className={`h-5 w-5 ${stat.iconColor}`}
                    strokeWidth={2.2}
                  />
                </div>

              </div>

              {/* Hover indicator */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-0.5
                  w-0
                  bg-primary
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />

            </Link>
          );
        })}

      </div>

      {/* =====================================================
          REVENUE + SUBSCRIPTION OVERVIEW
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">

        {/* =================================================
            REVENUE OVERVIEW
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">
                Revenue Overview
              </h2>
            </div>

            <div className="flex items-center gap-2">

              <span className="hidden rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 sm:inline-flex sm:items-center sm:gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +8.4%
              </span>

              <Link
                to="/admin/revenue"
                className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
              >
                <span>Details</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>

            </div>

          </div>

          {/* Chart */}
          <div className="p-5 sm:p-6">

            {/* Big number */}
            <div className="flex items-baseline justify-between">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Total revenue
                </p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                  £48,290
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  +£3,742 compared to last month
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Avg. MRR
                </p>
                <p className="mt-1 text-lg font-bold text-heading">
                  £1,609
                </p>
              </div>

            </div>

            {/* SVG Chart */}
            <div className="mt-6">

              <svg
                viewBox="0 0 600 200"
                className="h-32 w-full sm:h-40"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 50}
                    x2="600"
                    y2={i * 50}
                    stroke="#E8F1EE"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                ))}

                {/* Gradient fill */}
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#087F5B" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#087F5B" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                  d="M0,150 C50,140 100,120 150,115 C200,110 250,130 300,100 C350,70 400,85 450,60 C500,40 550,50 600,30 L600,200 L0,200 Z"
                  fill="url(#revenueGradient)"
                />

                {/* Line */}
                <path
                  d="M0,150 C50,140 100,120 150,115 C200,110 250,130 300,100 C350,70 400,85 450,60 C500,40 550,50 600,30"
                  fill="none"
                  stroke="#087F5B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data points */}
                {[
                  { x: 0, y: 150 },
                  { x: 150, y: 115 },
                  { x: 300, y: 100 },
                  { x: 450, y: 60 },
                  { x: 600, y: 30 },
                ].map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="white"
                    stroke="#087F5B"
                    strokeWidth="2.5"
                  />
                ))}

              </svg>

              {/* X-axis labels */}
              <div className="mt-3 flex justify-between text-[10px] font-medium text-text-muted">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            SUBSCRIPTION OVERVIEW
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">
                Subscriptions
              </h2>
            </div>

            <span className="rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-bold text-primary">
              1,248 total
            </span>

          </div>

          {/* Subscription list */}
          <div className="divide-y divide-border-light">

            {subscriptionData.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-background-soft"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        ${plan.bgColor}
                      `}
                    >
                      <Icon className={`h-4 w-4 ${plan.textColor}`} strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-heading">
                        {plan.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-text-muted">
                        {plan.price}/month
                      </p>
                    </div>

                  </div>

                  <div className="flex shrink-0 items-center gap-3">

                    <div className="text-right">
                      <p className="text-sm font-bold text-heading">
                        {plan.count}
                      </p>
                      <p className="mt-0.5 text-[10px] text-text-muted">
                        {plan.percentage}%
                      </p>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Total bar */}
          <div className="border-t border-border-light bg-background-soft px-5 py-4">

            <div className="flex items-center justify-between">

              <p className="text-xs font-semibold text-text-secondary">
                Total MRR
              </p>

              <p className="text-sm font-bold text-heading">
                £48,290
              </p>

            </div>

            {/* Bar chart */}
            <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-white">

              {subscriptionData.map((plan) => (
                <div
                  key={plan.id}
                  className={`${plan.color} transition-all duration-500`}
                  style={{ width: `${plan.percentage}%` }}
                  title={`${plan.name}: ${plan.percentage}%`}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT ORGANIZATIONS
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Recent Organizations
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {recentOrganizations.length}
            </span>
          </div>

          <Link
            to="/admin/organizations"
            className="group inline-flex items-center gap-1 self-start text-xs font-semibold text-primary hover:text-primary-hover sm:self-auto"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border-light bg-background-soft">

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Organization
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Plan
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Users
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Joined
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">

              {recentOrganizations.map((org) => (
                <tr
                  key={org.id}
                  className="group transition-colors hover:bg-background-soft"
                >

                  {/* Organization */}
                  <td className="px-5 py-4">

                    <Link
                      to={`/admin/organizations/${org.id}`}
                      className="flex items-center gap-3"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                        <Building2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-heading group-hover:text-primary transition-colors">
                          {org.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-muted">
                          {org.companies} {org.companies === 1 ? "company" : "companies"}
                        </p>
                      </div>

                    </Link>

                  </td>

                  {/* Plan */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold ${org.planColor}`}>
                      {org.plan}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${org.statusColor}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                      {org.status}
                    </span>
                  </td>

                  {/* Users */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold text-text">
                      {org.users}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4">
                    <span className="text-xs text-text-secondary">
                      {org.joinedDate}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">

                    <Link
                      to={`/admin/organizations/${org.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-lg
                        border
                        border-border
                        bg-white
                        px-3
                        py-1.5
                        text-[11px]
                        font-semibold
                        text-text
                        transition-all
                        duration-200
                        hover:border-primary
                        hover:bg-primary-light
                        hover:text-primary
                      "
                    >
                      <Eye className="h-3 w-3" />
                      <span>View</span>
                    </Link>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border-light md:hidden">

          {recentOrganizations.map((org) => (
            <Link
              key={org.id}
              to={`/admin/organizations/${org.id}`}
              className="block p-4 transition-colors hover:bg-background-soft"
            >

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Building2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-2">

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-heading">
                        {org.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-text-muted">
                        {org.joinedDate}
                      </p>
                    </div>

                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${org.statusColor}`}>
                      {org.status}
                    </span>

                  </div>

                  <div className="mt-3 flex items-center justify-between rounded-lg bg-background-soft px-3 py-2">

                    <div>
                      <p className="text-[10px] text-text-muted">Plan</p>
                      <p className="mt-0.5 text-[11px] font-bold text-heading">
                        {org.plan}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-text-muted">Users</p>
                      <p className="mt-0.5 text-[11px] font-bold text-heading">
                        {org.users}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

      {/* =====================================================
          SYSTEM HEALTH + QUICK ACTIONS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* =================================================
            SYSTEM HEALTH
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">
                System Health
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems
            </span>

          </div>

          <div className="divide-y divide-border-light">

            {systemHealth.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between gap-3 px-5 py-3.5"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <span
                    className={`
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      ${
                        service.status === "operational"
                          ? "bg-emerald-500"
                          : service.status === "degraded"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }
                    `}
                  />

                  <p className="truncate text-xs font-semibold text-heading">
                    {service.label}
                  </p>

                </div>

                <div className="flex shrink-0 items-center gap-2">

                  <span className="text-[11px] font-bold text-text-secondary">
                    {service.uptime}
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-0.5
                      text-[9px]
                      font-bold
                      uppercase
                      ${
                        service.status === "operational"
                          ? "bg-emerald-100 text-emerald-700"
                          : service.status === "degraded"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }
                    `}
                  >
                    {service.status}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <Zap className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 p-5">

            {[
              {
                id: "add-org",
                label: "Add Organization",
                description: "Create new",
                icon: Building2,
                path: "/admin/organizations/new",
              },
              {
                id: "add-user",
                label: "Invite User",
                description: "Send invite",
                icon: UserPlus,
                path: "/admin/users/invite",
              },
              {
                id: "view-revenue",
                label: "Revenue Report",
                description: "View analytics",
                icon: TrendingUp,
                path: "/admin/revenue",
              },
              {
                id: "manage-plans",
                label: "Manage Plans",
                description: "Edit pricing",
                icon: CreditCard,
                path: "/admin/plans",
              },
            ].map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.id}
                  to={action.path}
                  className="
                    group
                    flex
                    flex-col
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-border-light
                    bg-background-soft
                    p-4
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-primary/30
                    hover:bg-primary-light
                    hover:shadow-md
                  "
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm transition-colors group-hover:bg-primary">
                    <Icon
                      className="h-4 w-4 text-primary transition-colors group-hover:text-white"
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-heading">
                      {action.label}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">
                      {action.description}
                    </p>
                  </div>

                </Link>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;