import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Edit3,
  Ban,
  MoreVertical,
  Briefcase,
  Users,
  CreditCard,
  FileText,
  User,
  Mail,
  Calendar,
  Crown,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Eye,
  ChevronRight,
  Shield,
  RefreshCw,
  Download,
  Copy,
  ExternalLink,
  UserPlus,
  Trash2,
  Activity,
  TrendingUp,
} from "lucide-react";

const AdminOrganizationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const organization = {
    id: id || 1,
    name: "ABC Trading Ltd",
    type: "Company",
    status: "Active",
    joinedDate: "12 Sep 2026",
    owner: {
      name: "John Smith",
      email: "john@abctrading.co.uk",
      initials: "JS",
    },
    companyNumber: "12345678",
    vatNumber: "GB123456789",
    address: "123 High Street, London, EC1A 1AA",
  };

  const stats = [
    {
      id: "companies",
      label: "Companies",
      value: 3,
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "#companies",
    },
    {
      id: "users",
      label: "Users",
      value: 4,
      icon: Users,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      path: "#users",
    },
    {
      id: "subscription",
      label: "Subscription",
      value: "Solo",
      icon: Crown,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "#subscription",
    },
    {
      id: "filings",
      label: "Filings",
      value: 8,
      icon: FileText,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      path: "/admin/filings",
    },
  ];

  const subscription = {
    planName: "Solo",
    price: 59,
    interval: "year",
    status: "Active",
    nextBilling: "12 Sep 2027",
  };

  const companies = [
    {
      id: 1,
      name: "ABC Trading Ltd",
      number: "12345678",
      status: "Active",
      nextFiling: "Corporation Tax",
      nextFilingDate: "30 Sep 2026",
    },
    {
      id: 2,
      name: "XYZ Services Ltd",
      number: "87654321",
      status: "Active",
      nextFiling: "Annual Accounts",
      nextFilingDate: "12 Oct 2026",
    },
    {
      id: 3,
      name: "Green Energy Ltd",
      number: "45678912",
      status: "Action Required",
      nextFiling: "MTD VAT",
      nextFilingDate: "20 Sep 2026",
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@abctrading.co.uk",
      role: "Owner",
      initials: "JS",
      roleColor: "bg-purple-100 text-purple-700",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@abctrading.co.uk",
      role: "Admin",
      initials: "SS",
      roleColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "David Jones",
      email: "david@abctrading.co.uk",
      role: "Employee",
      initials: "DJ",
      roleColor: "bg-gray-100 text-gray-700",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@abctrading.co.uk",
      role: "Employee",
      initials: "EW",
      roleColor: "bg-gray-100 text-gray-700",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Filing started",
      description: "Corporation Tax for ABC Trading Ltd",
      time: "2 hours ago",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Company added",
      description: "Green Energy Ltd was registered",
      time: "Yesterday",
      icon: Building2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: 3,
      title: "User invited",
      description: "Emma Wilson joined as Employee",
      time: "3 days ago",
      icon: UserPlus,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Subscription renewed",
      description: "Solo Plan · £59/year",
      time: "1 week ago",
      icon: CreditCard,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  // =========================================================
  // HELPERS
  // =========================================================

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        };
      case "Action Required":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          dot: "bg-rose-500",
        };
      case "Trial":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link
          to="/admin/organizations"
          className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Organizations</span>
        </Link>
      </div>

      {/* =====================================================
          ORGANIZATION HERO CARD
      ====================================================== */}

      <div className="relative overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-soft opacity-30 blur-3xl" />

        <div className="relative flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: Org Info */}
          <div className="flex items-start gap-4">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-light">
              <Building2 className="h-8 w-8 text-primary" strokeWidth={2} />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                  {organization.name}
                </h1>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    px-2.5
                    py-1
                    text-[10px]
                    font-bold
                    ${getStatusStyles(organization.status).bg}
                    ${getStatusStyles(organization.status).text}
                  `}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${getStatusStyles(organization.status).dot}`} />
                  {organization.status}
                </span>

              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">

                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  {organization.type}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {organization.joinedDate}
                </span>

                <span className="flex items-center gap-1.5 font-mono">
                  #{organization.companyNumber}
                </span>

              </div>

            </div>

          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-2">

            <Link
              to={`/admin/organizations/${organization.id}/edit`}
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
              <span>Edit</span>
            </Link>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-rose-200
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-rose-600
                transition-all
                duration-200
                hover:bg-rose-500
                hover:text-white
              "
            >
              <Ban className="h-3.5 w-3.5" />
              <span>Suspend</span>
            </button>

            {/* More menu */}
            <div className="relative">

              <button
                type="button"
                onClick={() => setOpenMenu((prev) => !prev)}
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
                aria-label="More actions"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {openMenu && (
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-lg border border-border-light bg-white py-1 shadow-xl">

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send email</span>
                  </button>

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset password</span>
                  </button>

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export data</span>
                  </button>

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy ID</span>
                  </button>

                  <div className="my-1 border-t border-border-light" />

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete organization</span>
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          STATS CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;
          const isSubscription = stat.id === "subscription";

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
                hover:-translate-y-0.5
                hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]
              "
            >

              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    sm:h-11
                    sm:w-11
                    ${stat.iconBg}
                  `}
                >
                  <Icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.iconColor}`}
                    strokeWidth={2.2}
                  />
                </div>

              </div>

            </Link>
          );
        })}

      </div>

      {/* =====================================================
          INFO + SUBSCRIPTION
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">

        {/* =================================================
            ORGANIZATION INFORMATION
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Organization Information
            </h2>
          </div>

          <div className="divide-y divide-border-light">

            {/* Owner */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <User className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Owner
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    {organization.owner.name}
                  </p>
                </div>

              </div>

            </div>

            {/* Email */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Mail className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    {organization.owner.email}
                  </p>
                </div>

              </div>

              <a
                href={`mailto:${organization.owner.email}`}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-text-muted
                  transition-colors
                  hover:bg-primary-light
                  hover:text-primary
                "
                aria-label="Send email"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

            </div>

            {/* Type */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Briefcase className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Organization Type
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    {organization.type}
                  </p>
                </div>

              </div>

            </div>

            {/* VAT */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Shield className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    VAT Number
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold text-heading">
                    {organization.vatNumber}
                  </p>
                </div>

              </div>

            </div>

            {/* Created */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Calendar className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Created
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    {organization.joinedDate}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            SUBSCRIPTION
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <CreditCard className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Subscription
            </h2>
          </div>

          <div className="p-5">

            {/* Plan hero */}
            <div className="relative overflow-hidden rounded-xl border border-primary-soft bg-gradient-to-br from-primary-light via-white to-primary-soft p-5">

              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary opacity-[0.08] blur-2xl" />

              <div className="relative">

                <div className="flex items-start justify-between gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5 text-white" strokeWidth={2.2} />
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {subscription.status}
                  </span>

                </div>

                <h3 className="mt-4 text-lg font-bold text-heading">
                  {subscription.planName} Plan
                </h3>

                <p className="mt-1">
                  <span className="text-2xl font-bold text-heading">
                    £{subscription.price}
                  </span>
                  <span className="text-xs text-text-muted">
                    {" "}/ {subscription.interval}
                  </span>
                </p>

              </div>

            </div>

            {/* Next billing */}
            <div className="mt-4 rounded-lg border border-border-light bg-background-soft p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-text-muted" />
                  <p className="text-[11px] font-semibold text-text-muted">
                    Next billing
                  </p>
                </div>

                <p className="text-xs font-bold text-heading">
                  {subscription.nextBilling}
                </p>

              </div>

            </div>

            {/* Manage button */}
            <button
              type="button"
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
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
              <span>Manage Subscription</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          COMPANIES
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex flex-col gap-3 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Companies
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {companies.length}
            </span>
          </div>

          <Link
            to="/admin/companies"
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
                  Company
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Number
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

              {companies.map((company) => {
                const statusStyles = getStatusStyles(company.status);

                return (
                  <tr
                    key={company.id}
                    className="group transition-colors hover:bg-background-soft"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Building2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
                        </div>

                        <p className="text-sm font-bold text-heading">
                          {company.name}
                        </p>

                      </div>

                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-text-secondary">
                        #{company.number}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`} />
                        {company.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-heading">
                          {company.nextFiling}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-muted">
                          {company.nextFilingDate}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">

                      <Link
                        to={`/admin/companies/${company.id}`}
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
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border-light md:hidden">

          {companies.map((company) => {
            const statusStyles = getStatusStyles(company.status);

            return (
              <Link
                key={company.id}
                to={`/admin/companies/${company.id}`}
                className="block p-4 transition-colors hover:bg-background-soft"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                      <Building2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-heading">
                        {company.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                        #{company.number}
                      </p>
                    </div>

                  </div>

                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                    {company.status}
                  </span>

                </div>

                <div className="mt-3 flex items-center justify-between rounded-lg bg-background-soft px-3 py-2">

                  <div>
                    <p className="text-[10px] text-text-muted">Next Filing</p>
                    <p className="mt-0.5 text-[11px] font-bold text-heading">
                      {company.nextFiling}
                    </p>
                  </div>

                  <p className="text-[10px] text-text-muted">
                    {company.nextFilingDate}
                  </p>

                </div>

              </Link>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          USERS + RECENT ACTIVITY
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* =================================================
            ORGANIZATION USERS
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">
                Organization Users
              </h2>
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                {users.length}
              </span>
            </div>

          </div>

          <div className="divide-y divide-border-light">

            {users.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="group flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-background-soft"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {user.initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-heading">
                      {user.name}
                    </p>
                    <p className="truncate text-[10px] text-text-muted">
                      {user.email}
                    </p>
                  </div>

                </div>

                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${user.roleColor}`}>
                  {user.role}
                </span>

              </div>
            ))}

          </div>

          <div className="border-t border-border-light p-3">

            <Link
              to="/admin/users"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-border
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:bg-primary-light
                hover:text-primary
              "
            >
              <span>View All Users</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

          </div>

        </div>

        {/* =================================================
            RECENT ACTIVITY
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Recent Activity
            </h2>
          </div>

          <div className="divide-y divide-border-light">

            {recentActivity.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 px-5 py-3.5"
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
                      ${activity.iconBg}
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 ${activity.iconColor}`}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-xs font-bold text-heading">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 text-[11px] text-text-secondary line-clamp-1">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-[10px] text-text-muted">
                      {activity.time}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="border-t border-border-light p-3">

            <Link
              to="/admin/activity"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-border
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:bg-primary-light
                hover:text-primary
              "
            >
              <span>View All Activity</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminOrganizationDetailsPage;