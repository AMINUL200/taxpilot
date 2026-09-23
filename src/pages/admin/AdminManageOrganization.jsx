import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Ban,
  Download,
  Mail,
  User,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  RefreshCw,
  Star,
  Crown,
  Zap,
} from "lucide-react";

const AdminManageOrganization = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================================
  // STATS
  // =========================================================

  const stats = [
    {
      id: "total",
      label: "Total Organizations",
      value: "1,248",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+12 this week",
    },
    {
      id: "active",
      label: "Active",
      value: "982",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      change: "78.7% of total",
    },
    {
      id: "trial",
      label: "Trial",
      value: "184",
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      change: "14.7% of total",
    },
    {
      id: "suspended",
      label: "Suspended",
      value: "82",
      icon: Ban,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      change: "6.6% of total",
    },
  ];

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const organizations = [
    {
      id: 1,
      name: "ABC Trading Ltd",
      owner: "John Smith",
      ownerEmail: "john@abctrading.co.uk",
      plan: "Solo",
      companies: 3,
      users: 2,
      status: "Active",
      joinedDate: "18 Sep 2026",
      mrr: "£9",
    },
    {
      id: 2,
      name: "Green Tech Ltd",
      owner: "Sarah Johnson",
      ownerEmail: "sarah@greentech.co.uk",
      plan: "Portfolio",
      companies: 12,
      users: 4,
      status: "Active",
      joinedDate: "17 Sep 2026",
      mrr: "£29",
    },
    {
      id: 3,
      name: "Smith Consulting",
      owner: "David Smith",
      ownerEmail: "david@smithconsulting.co.uk",
      plan: "Solo",
      companies: 1,
      users: 1,
      status: "Trial",
      joinedDate: "16 Sep 2026",
      mrr: "£0",
    },
    {
      id: 4,
      name: "XYZ Group Holdings",
      owner: "Emma Wilson",
      ownerEmail: "emma@xyzgroup.co.uk",
      plan: "Portfolio Plus",
      companies: 24,
      users: 8,
      status: "Suspended",
      joinedDate: "15 Sep 2026",
      mrr: "£0",
    },
    {
      id: 5,
      name: "Harbor Accounting",
      owner: "Michael Chen",
      ownerEmail: "michael@harbor.co.uk",
      plan: "Portfolio",
      companies: 34,
      users: 6,
      status: "Active",
      joinedDate: "14 Sep 2026",
      mrr: "£29",
    },
    {
      id: 6,
      name: "Bright Solutions Ltd",
      owner: "Laura Taylor",
      ownerEmail: "laura@brightsol.co.uk",
      plan: "Portfolio Plus",
      companies: 18,
      users: 5,
      status: "Active",
      joinedDate: "13 Sep 2026",
      mrr: "£99",
    },
    {
      id: 7,
      name: "Northern Traders Ltd",
      owner: "James Brown",
      ownerEmail: "james@northerntraders.co.uk",
      plan: "Solo",
      companies: 2,
      users: 1,
      status: "Active",
      joinedDate: "12 Sep 2026",
      mrr: "£9",
    },
    {
      id: 8,
      name: "Coastal Services",
      owner: "Sophie Martin",
      ownerEmail: "sophie@coastal.co.uk",
      plan: "Portfolio",
      companies: 8,
      users: 3,
      status: "Trial",
      joinedDate: "11 Sep 2026",
      mrr: "£0",
    },
    {
      id: 9,
      name: "Summit Partners",
      owner: "Robert Davis",
      ownerEmail: "robert@summitpartners.co.uk",
      plan: "Portfolio Plus",
      companies: 42,
      users: 12,
      status: "Active",
      joinedDate: "10 Sep 2026",
      mrr: "£99",
    },
    {
      id: 10,
      name: "Riverside Consulting",
      owner: "Anna White",
      ownerEmail: "anna@riverside.co.uk",
      plan: "Solo",
      companies: 1,
      users: 1,
      status: "Active",
      joinedDate: "09 Sep 2026",
      mrr: "£9",
    },
  ];

  // =========================================================
  // FILTERS
  // =========================================================

  const statusOptions = [
    { value: "all", label: "All Statuses", color: null },
    { value: "active", label: "Active", color: "emerald" },
    { value: "trial", label: "Trial", color: "amber" },
    { value: "suspended", label: "Suspended", color: "rose" },
  ];

  const planOptions = [
    { value: "all", label: "All Plans" },
    { value: "solo", label: "Solo" },
    { value: "portfolio", label: "Portfolio" },
    { value: "portfolio-plus", label: "Portfolio Plus" },
  ];

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        org.status.toLowerCase() === statusFilter;

      const matchesPlan =
        planFilter === "all" ||
        org.plan.toLowerCase().replace(/\s+/g, "-") === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [searchQuery, statusFilter, planFilter]);

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
      case "Trial":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      case "Suspended":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          dot: "bg-rose-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
    }
  };

  const getPlanStyles = (plan) => {
    switch (plan) {
      case "Solo":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: Zap,
        };
      case "Portfolio":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          icon: Briefcase,
        };
      case "Portfolio Plus":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: Crown,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          icon: Building2,
        };
    }
  };

  const totalPages = 125; // Demo value

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Organizations
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage all organizations registered on TaxPilot UK.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

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
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Add Org */}
          <Link
            to="/admin/organizations/new"
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
            <Plus className="h-4 w-4" />
            <span>Add Organization</span>
          </Link>

        </div>

      </div>

      {/* =====================================================
          STATS CARDS
      ====================================================== */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
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
                  <p className="mt-1 hidden text-[10px] text-text-muted sm:block">
                    {stat.change}
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

            </div>
          );
        })}

      </div>

      {/* =====================================================
          FILTERS BAR
      ====================================================== */}

      <div className="rounded-xl border border-border-light bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          {/* Search */}
          <div className="relative flex-1">

            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by organization, owner or email..."
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-background-soft
                py-2.5
                pl-10
                pr-4
                text-sm
                text-heading
                outline-none
                transition-all
                duration-200
                placeholder:text-text-muted
                focus:border-primary
                focus:bg-white
                focus:ring-2
                focus:ring-primary/10
              "
            />

          </div>

          {/* Status filter */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowPlanDropdown(false);
              }}
              className="
                flex
                w-full
                items-center
                justify-between
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
                lg:w-auto
              "
            >

              <div className="flex items-center gap-2">
                <span>
                  {statusOptions.find((o) => o.value === statusFilter)?.label}
                </span>
              </div>

              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showStatusDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setStatusFilter(option.value);
                      setShowStatusDropdown(false);
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
                        statusFilter === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {option.color && (
                        <span
                          className={`
                            h-2
                            w-2
                            rounded-full
                            ${
                              option.color === "emerald"
                                ? "bg-emerald-500"
                                : option.color === "amber"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }
                          `}
                        />
                      )}
                      <span>{option.label}</span>
                    </div>
                    {statusFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* Plan filter */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowPlanDropdown((prev) => !prev);
                setShowStatusDropdown(false);
              }}
              className="
                flex
                w-full
                items-center
                justify-between
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
                lg:w-auto
              "
            >

              <div className="flex items-center gap-2">
                <span>
                  {planOptions.find((o) => o.value === planFilter)?.label}
                </span>
              </div>

              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showPlanDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showPlanDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

                {planOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setPlanFilter(option.value);
                      setShowPlanDropdown(false);
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
                        planFilter === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {planFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* Filter button */}
          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
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
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">More</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          ORGANIZATIONS TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Table header info */}
        <div className="flex flex-col gap-3 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              All Organizations
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredOrganizations.length}
            </span>
          </div>

          <p className="text-[11px] text-text-muted">
            Showing 1–{filteredOrganizations.length} of 1,248 organizations
          </p>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border-light bg-background-soft">

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Organization
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Owner
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Plan
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Companies
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  MRR
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

              {filteredOrganizations.map((org) => {
                const statusStyles = getStatusStyles(org.status);
                const planStyles = getPlanStyles(org.plan);
                const PlanIcon = planStyles.icon;

                return (
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

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {org.name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-text-muted">
                            Joined {org.joinedDate}
                          </p>
                        </div>

                      </Link>

                    </td>

                    {/* Owner */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                          {org.owner.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-heading">
                            {org.owner}
                          </p>
                          <p className="truncate text-[10px] text-text-muted">
                            {org.ownerEmail}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Plan */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${planStyles.bg} ${planStyles.text}`}>
                        <PlanIcon className="h-3 w-3" strokeWidth={2.4} />
                        {org.plan}
                      </span>
                    </td>

                    {/* Companies */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-heading">
                        {org.companies}
                      </span>
                    </td>

                    {/* MRR */}
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold text-heading">
                        {org.mrr}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`} />
                        {org.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">

                      <div className="relative inline-flex items-center gap-1">

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

                        <button
                          type="button"
                          onClick={() => setOpenRowMenu(openRowMenu === org.id ? null : org.id)}
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            text-text-muted
                            transition-colors
                            hover:bg-primary-light
                            hover:text-primary
                          "
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>

                        {openRowMenu === org.id && (
                          <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border-light bg-white py-1 shadow-xl">

                            <Link
                              to={`/admin/organizations/${org.id}`}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View details</span>
                            </Link>

                            <Link
                              to={`/admin/organizations/${org.id}/edit`}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </Link>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              <span>Send email</span>
                            </button>

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                            >
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy ID</span>
                            </button>

                            <div className="my-1 border-t border-border-light" />

                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50"
                            >
                              <Ban className="h-3.5 w-3.5" />
                              <span>Suspend</span>
                            </button>

                          </div>
                        )}

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border-light lg:hidden">

          {filteredOrganizations.map((org) => {
            const statusStyles = getStatusStyles(org.status);
            const planStyles = getPlanStyles(org.plan);

            return (
              <Link
                key={org.id}
                to={`/admin/organizations/${org.id}`}
                className="block p-4 transition-colors hover:bg-background-soft"
              >

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Building2 className="h-5 w-5 text-primary" strokeWidth={2.2} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {org.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-text-muted">
                          {org.owner}
                        </p>
                      </div>

                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                        {org.status}
                      </span>

                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-background-soft px-3 py-2">

                      <div>
                        <p className="text-[10px] text-text-muted">Plan</p>
                        <p className={`mt-0.5 text-[11px] font-bold ${planStyles.text}`}>
                          {org.plan}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-[10px] text-text-muted">Companies</p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {org.companies}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] text-text-muted">MRR</p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {org.mrr}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

        {/* Empty State */}
        {filteredOrganizations.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Building2 className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>

            <p className="mt-4 text-sm font-bold text-heading">
              No organizations found
            </p>

            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {searchQuery || statusFilter !== "all" || planFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No organizations have been registered yet."}
            </p>

            {(searchQuery || statusFilter !== "all" || planFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setPlanFilter("all");
                }}
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
                <span>Clear filters</span>
              </button>
            )}

          </div>
        )}

      </div>

      {/* =====================================================
          PAGINATION
      ====================================================== */}

      {filteredOrganizations.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Page info */}
          <p className="text-xs text-text-muted">
            Showing{" "}
            <span className="font-bold text-heading">1</span>–
            <span className="font-bold text-heading">{filteredOrganizations.length}</span>{" "}
            of <span className="font-bold text-heading">1,248</span> organizations
          </p>

          {/* Pagination controls */}
          <div className="flex items-center gap-1">

            {/* Previous */}
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="
                flex
                h-9
                w-9
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
                disabled:opacity-40
                disabled:cursor-not-allowed
                disabled:hover:border-border
                disabled:hover:text-text
              "
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page numbers */}
            <div className="hidden items-center gap-1 sm:flex">

              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`
                    flex
                    h-9
                    min-w-[36px]
                    items-center
                    justify-center
                    rounded-lg
                    border
                    px-2
                    text-xs
                    font-bold
                    transition-all
                    duration-200
                    ${
                      currentPage === page
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-text hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <span className="px-2 text-xs text-text-muted">...</span>

              <button
                type="button"
                onClick={() => setCurrentPage(125)}
                className="
                  flex
                  h-9
                  min-w-[36px]
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  bg-white
                  px-2
                  text-xs
                  font-bold
                  text-text
                  transition-all
                  duration-200
                  hover:border-primary
                  hover:text-primary
                "
              >
                125
              </button>

            </div>

            {/* Mobile page indicator */}
            <div className="flex h-9 min-w-[60px] items-center justify-center rounded-lg border border-border bg-white px-3 text-xs font-bold text-heading sm:hidden">
              {currentPage} / {totalPages}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="
                flex
                h-9
                w-9
                items-center                justify-center
                rounded-lg
                border
                border-border
                bg-white
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
                disabled:opacity-40
                disabled:cursor-not-allowed
                disabled:hover:border-border
                disabled:hover:text-text
              "
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminManageOrganization;