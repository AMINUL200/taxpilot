import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  FileText,
  CalendarClock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Plus,
  Briefcase,
  TrendingUp,
  Clock,
  ChevronRight,
  PoundSterling,
} from "lucide-react";

const OrganizationDashboard = () => {
  // =========================================================
  // DUMMY DATA - Replace with API data
  // =========================================================

  const user = {
    firstName: "John",
    lastName: "Smith",
  };

  const stats = [
    {
      id: "companies",
      label: "Companies",
      value: 2,
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/dashboard/companies",
    },
    {
      id: "due",
      label: "Due Soon",
      value: 3,
      icon: AlertCircle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      path: "/dashboard/deadlines",
    },
    {
      id: "filed",
      label: "Filed",
      value: 8,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      path: "/dashboard/filings",
    },
    {
      id: "actions",
      label: "Actions",
      value: 1,
      icon: Clock,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      path: "/dashboard/actions",
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Corporation Tax",
      company: "ABC Ltd",
      dueDate: "30 Sep 2026",
      daysLeft: 15,
      type: "tax",
      urgency: "high",
    },
    {
      id: 2,
      title: "Annual Accounts",
      company: "XYZ Ltd",
      dueDate: "15 Oct 2026",
      daysLeft: 30,
      type: "accounts",
      urgency: "medium",
    },
    {
      id: 3,
      title: "MTD VAT Return",
      company: "ABC Ltd",
      dueDate: "07 Nov 2026",
      daysLeft: 53,
      type: "vat",
      urgency: "low",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "ABC Ltd",
      companyNumber: "12345678",
      status: "Active",
      nextFiling: "Corporation Tax",
      nextFilingDate: "30 Sep 2026",
    },
    {
      id: 2,
      name: "XYZ Ltd",
      companyNumber: "87654321",
      status: "Active",
      nextFiling: "Annual Accounts",
      nextFilingDate: "15 Oct 2026",
    },
  ];

  const quickActions = [
    {
      id: "add-company",
      label: "Add Company",
      description: "Register a new company",
      icon: Plus,
      path: "/dashboard/companies/add",
      variant: "primary",
    },
    {
      id: "start-filing",
      label: "Start Filing",
      description: "Begin a new submission",
      icon: FileText,
      path: "/dashboard/filings/new",
      variant: "secondary",
    },
    {
      id: "view-companies",
      label: "View Companies",
      description: "Manage your companies",
      icon: Building2,
      path: "/dashboard/companies",
      variant: "secondary",
    },
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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "border-rose-200 bg-rose-50";
      case "medium":
        return "border-amber-200 bg-amber-50";
      default:
        return "border-emerald-200 bg-emerald-50";
    }
  };

  const getUrgencyTextColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "text-rose-600";
      case "medium":
        return "text-amber-600";
      default:
        return "text-emerald-600";
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {getGreeting()}, {user.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Here's what needs your attention today.
          </p>
        </div>

        <Link
          to="/dashboard/companies/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            bg-primary
            px-5
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
            sm:self-auto
          "
        >
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
        </Link>

      </div>

      {/* =====================================================
          STATS CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

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

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-heading">
                    {stat.value}
                  </p>
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
          MAIN GRID - DEADLINES + QUICK ACTIONS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* =================================================
            UPCOMING DEADLINES
        ================================================== */}

        <div className="lg:col-span-2 rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">
                Upcoming Deadlines
              </h2>
            </div>

            <Link
              to="/dashboard/deadlines"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>

          </div>

          {/* Deadline List */}
          <div className="divide-y divide-border-light">

            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-5
                  py-4
                  transition-colors
                  hover:bg-background-soft
                "
              >

                <div className="flex items-center gap-3 min-w-0">

                  {/* Urgency indicator */}
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      ${getUrgencyColor(deadline.urgency)}
                    `}
                  >
                    <FileText
                      className={`h-4 w-4 ${getUrgencyTextColor(deadline.urgency)}`}
                      strokeWidth={2.2}
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-heading truncate">
                      {deadline.title}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted truncate">
                      {deadline.company}
                    </p>
                  </div>

                </div>

                {/* Date + Days Left */}
                <div className="flex shrink-0 items-center gap-4 text-right">

                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-heading">
                      {deadline.dueDate}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] font-medium ${getUrgencyTextColor(
                        deadline.urgency
                      )}`}
                    >
                      {deadline.daysLeft} days left
                    </p>
                  </div>

                  <ChevronRight
                    className="
                      h-4
                      w-4
                      text-text-muted
                      transition-transform
                      group-hover:translate-x-0.5
                      group-hover:text-primary
                    "
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          {/* Header */}
          <div className="border-b border-border-light px-5 py-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">
                Quick Actions
              </h2>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 p-3">

            {quickActions.map((action) => {
              const Icon = action.icon;
              const isPrimary = action.variant === "primary";

              return (
                <Link
                  key={action.id}
                  to={action.path}
                  className={`
                    group
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-4
                    py-3
                    transition-all
                    duration-200
                    ${
                      isPrimary
                        ? "bg-primary text-white hover:bg-primary-hover"
                        : "bg-background-soft text-heading hover:bg-primary-light"
                    }
                  `}
                >

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${
                        isPrimary
                          ? "bg-white/20"
                          : "bg-white"
                      }
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isPrimary ? "text-white" : "text-primary"
                      }`}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isPrimary ? "text-white" : "text-heading"
                      }`}
                    >
                      {action.label}
                    </p>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        isPrimary ? "text-white/80" : "text-text-muted"
                      }`}
                    >
                      {action.description}
                    </p>
                  </div>

                  <ChevronRight
                    className={`
                      h-4
                      w-4
                      shrink-0
                      transition-transform
                      group-hover:translate-x-0.5
                      ${
                        isPrimary
                          ? "text-white/80"
                          : "text-text-muted group-hover:text-primary"
                      }
                    `}
                  />

                </Link>
              );
            })}

          </div>

        </div>

      </div>

      {/* =====================================================
          MY COMPANIES TABLE
      ====================================================== */}

      <div className="rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              My Companies
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {companies.length}
            </span>
          </div>

          <Link
            to="/dashboard/companies"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border-light bg-background-soft">

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Company
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Next Filing
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">

              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="group transition-colors hover:bg-background-soft"
                >

                  {/* Company */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-heading">
                          {company.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-text-muted">
                          #{company.companyNumber}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-emerald-100
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-emerald-700
                      "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {company.status}
                    </span>
                  </td>

                  {/* Next Filing */}
                  <td className="px-5 py-4">

                    <div>
                      <p className="text-xs font-semibold text-heading">
                        {company.nextFiling}
                      </p>
                      <p className="mt-0.5 text-[11px] text-text-muted">
                        {company.nextFilingDate}
                      </p>
                    </div>

                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">

                    <button
                      type="button"
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
                      Manage
                      <ChevronRight className="h-3 w-3" />
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Empty state (shown when no companies) */}
        {companies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-4 text-sm font-semibold text-heading">
              No companies yet
            </p>
            <p className="mt-1 text-xs text-text-muted">
              Add your first company to get started.
            </p>
          </div>
        )}

      </div>

      {/* =====================================================
          BOTTOM CTA / TIP BANNER
      ====================================================== */}

      <div className="relative overflow-hidden rounded-xl border border-primary-soft bg-gradient-to-r from-primary-light via-primary-soft to-primary-light p-6 sm:p-7">

        {/* Decoration */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
              <PoundSterling className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                Pro tip
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                Save time with automatic reminders
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Get notified before every deadline so you never miss a filing.
              </p>
            </div>

          </div>

          <Link
            to="/dashboard/settings"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              self-start
              rounded-lg
              bg-primary
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              transition-all
              duration-200
              hover:bg-primary-hover
              hover:-translate-y-0.5
              sm:self-auto
            "
          >
            <span>Enable reminders</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrganizationDashboard;