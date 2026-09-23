import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  FileText,
  CalendarClock,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  TrendingUp,
  Briefcase,
  Users,
} from "lucide-react";

const OrganizationMyCompanies = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const stats = [
    {
      id: "total",
      label: "Total Companies",
      value: 12,
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "active",
      label: "Active",
      value: 10,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "action",
      label: "Action Required",
      value: 2,
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "ABC Trading Ltd",
      number: "12345678",
      status: "Active",
      nextFiling: "Corporation Tax",
      nextFilingDate: "30 Sep 2026",
      daysLeft: 15,
      urgency: "high",
      type: "Company",
    },
    {
      id: 2,
      name: "XYZ Limited",
      number: "87654321",
      status: "Active",
      nextFiling: "Annual Accounts",
      nextFilingDate: "12 Oct 2026",
      daysLeft: 27,
      urgency: "medium",
      type: "Company",
    },
    {
      id: 3,
      name: "Demo Ltd",
      number: "45678912",
      status: "Action Required",
      nextFiling: "MTD VAT",
      nextFilingDate: "20 Sep 2026",
      daysLeft: 5,
      urgency: "high",
      type: "Company",
    },
    {
      id: 4,
      name: "Bright Solutions Ltd",
      number: "11223344",
      status: "Active",
      nextFiling: "Confirmation Statement",
      nextFilingDate: "05 Nov 2026",
      daysLeft: 51,
      urgency: "low",
      type: "Company",
    },
    {
      id: 5,
      name: "Green Energy Co",
      number: "99887766",
      status: "Active",
      nextFiling: "Self Assessment",
      nextFilingDate: "31 Jan 2027",
      daysLeft: 138,
      urgency: "low",
      type: "Company",
    },
  ];

  // =========================================================
  // FILTERED COMPANIES
  // =========================================================

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.number.includes(searchQuery);

      const matchesStatus =
        statusFilter === "all" ||
        company.status.toLowerCase().replace(/\s+/g, "-") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

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
      case "Inactive":
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
    }
  };

  const getUrgencyColor = (urgency) => {
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
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            My Companies
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your companies and compliance filings in one place.
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

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

            </div>
          );
        })}

      </div>

      {/* =====================================================
          FILTERS BAR
      ====================================================== */}

      <div className="rounded-xl border border-border-light bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-text-muted
              "
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name or number..."
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

          {/* Status Filter */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowFilterDropdown(false);
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
                sm:w-auto
              "
            >

              <span className="capitalize">
                {statusFilter === "all" ? "Status" : statusFilter.replace(/-/g, " ")}
              </span>

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
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-30
                  mt-2
                  w-48
                  overflow-hidden
                  rounded-xl
                  border
                  border-border-light
                  bg-white
                  shadow-xl
                "
              >

                {[
                  { value: "all", label: "All Statuses" },
                  { value: "active", label: "Active" },
                  { value: "action-required", label: "Action Required" },
                  { value: "inactive", label: "Inactive" },
                ].map((option) => (
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
                    <span>{option.label}</span>
                    {statusFilter === option.value && (
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
            onClick={() => {
              setShowFilterDropdown((prev) => !prev);
              setShowStatusDropdown(false);
            }}
            className="
              flex
              w-full
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
              sm:w-auto
            "
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>

        </div>

      </div>

      {/* =====================================================
          COMPANIES TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Table header info */}
        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              All Companies
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredCompanies.length}
            </span>
          </div>

          <p className="hidden text-[11px] text-text-muted sm:block">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>

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
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">

              {filteredCompanies.map((company) => {
                const statusStyles = getStatusStyles(company.status);

                return (
                  <tr
                    key={company.id}
                    className="group transition-colors hover:bg-background-soft"
                  >

                    {/* Company */}
                    <td className="px-5 py-4">

                      <Link
                        to={`/dashboard/companies/${company.id}`}
                        className="flex items-center gap-3"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Building2 className="h-4.5 w-4.5 text-primary" strokeWidth={2.2} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading group-hover:text-primary transition-colors">
                            {company.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-text-muted">
                            {company.type}
                          </p>
                        </div>

                      </Link>

                    </td>

                    {/* Number */}
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-medium text-text-secondary">
                        #{company.number}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
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
                          ${statusStyles.bg}
                          ${statusStyles.text}
                        `}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`} />
                        {company.status}
                      </span>
                    </td>

                    {/* Next Filing */}
                    <td className="px-5 py-4">

                      <div>
                        <p className="text-xs font-semibold text-heading">
                          {company.nextFiling}
                        </p>
                        <p className={`mt-0.5 text-[11px] font-medium ${getUrgencyColor(company.urgency)}`}>
                          {company.nextFilingDate} · {company.daysLeft} days left
                        </p>
                      </div>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">

                      <div className="flex items-center justify-end gap-1">

                        <Link
                          to={`/organization/companies/${company.id}`}
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

                        {/* More menu */}
                        <div className="relative">

                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowMenu(openRowMenu === company.id ? null : company.id)
                            }
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

                          {openRowMenu === company.id && (
                            <div
                              className="
                                absolute
                                right-0
                                top-full
                                z-20
                                mt-1
                                w-40
                                overflow-hidden
                                rounded-lg
                                border
                                border-border-light
                                bg-white
                                py-1
                                shadow-xl
                              "
                            >

                              <Link
                                to={`/dashboard/companies/${company.id}/edit`}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit</span>
                              </Link>

                              <button
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-danger-light hover:text-danger"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Remove</span>
                              </button>

                            </div>
                          )}

                        </div>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border-light md:hidden">

          {filteredCompanies.map((company) => {
            const statusStyles = getStatusStyles(company.status);

            return (
              <Link
                key={company.id}
                to={`/dashboard/companies/${company.id}`}
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
                          {company.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-text-muted">
                          #{company.number}
                        </p>
                      </div>

                      <span
                        className={`
                          inline-flex
                          shrink-0
                          items-center
                          gap-1
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-bold
                          ${statusStyles.bg}
                          ${statusStyles.text}
                        `}
                      >
                        <span className={`h-1 w-1 rounded-full ${statusStyles.dot}`} />
                        {company.status}
                      </span>

                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-background-soft px-3 py-2">

                      <div>
                        <p className="text-[10px] text-text-muted">
                          Next Filing
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {company.nextFiling}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className={`text-[11px] font-bold ${getUrgencyColor(company.urgency)}`}>
                          {company.nextFilingDate}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-muted">
                          {company.daysLeft} days left
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
        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Building2 className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>

            <p className="mt-4 text-sm font-bold text-heading">
              No companies found
            </p>

            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Get started by adding your first company."}
            </p>

            {(searchQuery || statusFilter !== "all") ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
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
            ) : (
              <Link
                to="/dashboard/companies/add"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-primary-hover
                "
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Company</span>
              </Link>
            )}

          </div>
        )}

      </div>

      {/* =====================================================
          BOTTOM CTA BANNER
      ====================================================== */}

      <div className="relative overflow-hidden rounded-xl border border-primary-soft bg-gradient-to-r from-primary-light via-primary-soft to-primary-light p-6 sm:p-7">

        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
              <TrendingUp className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                Pro tip
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                Add all your companies to get a complete view
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Track filings, deadlines and compliance across every company you manage.
              </p>
            </div>

          </div>

          <Link
            to="/dashboard/companies/add"
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
            <Plus className="h-3.5 w-3.5" />
            <span>Add another company</span>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrganizationMyCompanies;