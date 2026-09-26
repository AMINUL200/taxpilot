import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Eye,
  MoreVertical,
  Edit3,
  Archive,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  RefreshCw,
  Hash,
  Briefcase,
  Users,
  Calendar,
  Send,
  ExternalLink,
  TrendingUp,
  Layers,
  Check,
} from "lucide-react";

const AccountantCompanies = () => {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "total",
      label: "Total Companies",
      value: 68,
      change: "Across 42 clients",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "active",
      label: "Active",
      value: 61,
      change: "90% of total",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "filing",
      label: "Filing Due",
      value: 8,
      change: "Next 30 days",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 3,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
    },
  ];

  /* ============================================================
     COMPANIES DATA
  ============================================================ */

  const companies = [
    {
      id: 1,
      name: "Imperial Thermal Ltd",
      number: "14803890",
      type: "Private limited Company",
      status: "Active",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      incorporatedOn: "07 Sep 2022",
      nextFiling: "VAT Return",
      nextFilingDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      vrn: "449519458",
    },
    {
      id: 2,
      name: "Imperial Holdings Ltd",
      number: "14803912",
      type: "Private limited Company",
      status: "Active",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      incorporatedOn: "15 Nov 2022",
      nextFiling: "Annual Accounts",
      nextFilingDate: "15 Dec 2026",
      daysLeft: 84,
      urgency: "low",
      vrn: "449519459",
    },
    {
      id: 3,
      name: "Imperial Properties Ltd",
      number: "14803945",
      type: "Private limited Company",
      status: "Active",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      incorporatedOn: "20 Jan 2023",
      nextFiling: "Corporation Tax",
      nextFilingDate: "05 Nov 2026",
      daysLeft: 44,
      urgency: "medium",
      vrn: "449519460",
    },
    {
      id: 4,
      name: "Green Tech Ltd",
      number: "07895432",
      type: "Private limited Company",
      status: "Active",
      client: "Green Tech Ltd",
      clientId: 2,
      incorporatedOn: "12 Mar 2018",
      nextFiling: "Confirmation Statement",
      nextFilingDate: "12 Oct 2026",
      daysLeft: 20,
      urgency: "medium",
      vrn: "123456789",
    },
    {
      id: 5,
      name: "Green Innovations Ltd",
      number: "09876543",
      type: "Private limited Company",
      status: "Active",
      client: "Green Tech Ltd",
      clientId: 2,
      incorporatedOn: "08 Jun 2019",
      nextFiling: "VAT Return",
      nextFilingDate: "07 Nov 2026",
      daysLeft: 46,
      urgency: "low",
      vrn: "987654321",
    },
    {
      id: 6,
      name: "Skil Four Ltd",
      number: "05513948",
      type: "Private limited Company",
      status: "Active",
      client: "Skil Four Ltd",
      clientId: 3,
      incorporatedOn: "07 Sep 2022",
      nextFiling: "Corporation Tax",
      nextFilingDate: "05 Oct 2026",
      daysLeft: 13,
      urgency: "high",
      vrn: "",
    },
    {
      id: 7,
      name: "Digital Solutions Ltd",
      number: "99887766",
      type: "Private limited Company",
      status: "Active",
      client: "Digital Solutions Ltd",
      clientId: 4,
      incorporatedOn: "22 Feb 2020",
      nextFiling: "Corporation Tax",
      nextFilingDate: "05 Oct 2026",
      daysLeft: 13,
      urgency: "high",
      vrn: "887766554",
    },
    {
      id: 8,
      name: "Bright Ideas Ltd",
      number: "11223344",
      type: "Private limited Company",
      status: "Onboarding",
      client: "Bright Ideas Ltd",
      clientId: 5,
      incorporatedOn: "14 Aug 2024",
      nextFiling: "Self Assessment",
      nextFilingDate: "31 Jan 2027",
      daysLeft: 131,
      urgency: "low",
      vrn: "112233445",
    },
    {
      id: 9,
      name: "Ocean View Ltd",
      number: "66778899",
      type: "Private limited Company",
      status: "Active",
      client: "Ocean View Ltd",
      clientId: 6,
      incorporatedOn: "10 Apr 2021",
      nextFiling: "Annual Accounts",
      nextFilingDate: "30 Dec 2026",
      daysLeft: 99,
      urgency: "low",
      vrn: "667788990",
    },
    {
      id: 10,
      name: "Sunrise Trading Ltd",
      number: "44556677",
      type: "Private limited Company",
      status: "Active",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      incorporatedOn: "05 Jul 2020",
      nextFiling: "Corporation Tax",
      nextFilingDate: "15 Nov 2026",
      daysLeft: 54,
      urgency: "medium",
      vrn: "445566778",
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Onboarding", label: "Onboarding" },
    { value: "Dormant", label: "Dormant" },
    { value: "Dissolved", label: "Dissolved" },
  ];

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "Private limited Company", label: "Private Limited" },
    { value: "Public limited Company", label: "Public Limited" },
    { value: "LLP", label: "LLP" },
    { value: "Sole Trader", label: "Sole Trader" },
  ];

  const clientOptions = [
    { value: "All", label: "All Clients" },
    { value: "Imperial Thermal Ltd", label: "Imperial Thermal Ltd" },
    { value: "Green Tech Ltd", label: "Green Tech Ltd" },
    { value: "Skil Four Ltd", label: "Skil Four Ltd" },
    { value: "Digital Solutions Ltd", label: "Digital Solutions Ltd" },
    { value: "Bright Ideas Ltd", label: "Bright Ideas Ltd" },
  ];

  /* ============================================================
     FILTERED COMPANIES
  ============================================================ */

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${company.name} ${company.number} ${company.client}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || company.status === statusFilter;

      const matchesType =
        typeFilter === "All" || company.type === typeFilter;

      const matchesClient =
        clientFilter === "All" || company.client === clientFilter;

      return matchesSearch && matchesStatus && matchesType && matchesClient;
    });
  }, [companies, search, statusFilter, typeFilter, clientFilter]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setClientFilter("All");
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "All" ||
    typeFilter !== "All" ||
    clientFilter !== "All";

  /* ============================================================
     HELPERS
  ============================================================ */

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "overdue":
        return {
          bg: "bg-rose-50",
          text: "text-rose-700",
          badge: "bg-rose-100 text-rose-700",
          dot: "bg-rose-500",
        };
      case "high":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          badge: "bg-amber-100 text-amber-700",
          dot: "bg-amber-500",
        };
      case "medium":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-700",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          badge: "bg-emerald-100 text-emerald-700",
          dot: "bg-emerald-500",
        };
    }
  };

  const getDaysLabel = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        };
      case "Onboarding":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      case "Dormant":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          dot: "bg-gray-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
            Companies
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage all companies across your client portfolio
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
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
              text-sm
              font-semibold
              text-[#09263A]
              transition-all
              duration-200
              hover:border-[#087F5B]
              hover:text-[#087F5B]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              strokeWidth={2.2}
            />
            <span className="hidden sm:inline">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
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
              text-sm
              font-semibold
              text-[#09263A]
              transition-all
              duration-200
              hover:border-[#087F5B]
              hover:text-[#087F5B]
            "
          >
            <Download className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <Link
            to="/accountant/companies/new"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-[#087F5B]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#005E45]
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            <span>Add Company</span>
          </Link>
        </div>
      </div>

      {/* ======================================================
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
                border-[#DDEAE6]
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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold text-[#687B78]">
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

      {/* ======================================================
          FILTERS BAR
      ====================================================== */}
      <div className="rounded-xl border border-[#DDEAE6] bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies by name, number or client..."
              className="
                w-full
                rounded-lg
                border
                border-[#DDEAE6]
                bg-[#F5FCF9]
                py-2.5
                pl-10
                pr-4
                text-sm
                text-[#09263A]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#687B78]
                focus:border-[#087F5B]
                focus:bg-white
                focus:ring-2
                focus:ring-[#087F5B]/10
              "
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowTypeDropdown(false);
                setShowClientDropdown(false);
              }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
                lg:w-auto
              "
            >
              <span>
                {statusOptions.find((o) => o.value === statusFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showStatusDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
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
                      hover:bg-[#E8F8F2]
                      ${
                        statusFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {statusFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown((prev) => !prev);
                setShowStatusDropdown(false);
                setShowClientDropdown(false);
              }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
                lg:w-auto
              "
            >
              <span>
                {typeOptions.find((o) => o.value === typeFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showTypeDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showTypeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTypeFilter(option.value);
                      setShowTypeDropdown(false);
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
                      hover:bg-[#E8F8F2]
                      ${
                        typeFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {typeFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Client filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowClientDropdown((prev) => !prev);
                setShowStatusDropdown(false);
                setShowTypeDropdown(false);
              }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
                lg:w-auto
              "
            >
              <span className="truncate max-w-[140px]">
                {clientOptions.find((o) => o.value === clientFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showClientDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showClientDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {clientOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setClientFilter(option.value);
                      setShowClientDropdown(false);
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
                      hover:bg-[#E8F8F2]
                      ${
                        clientFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {clientFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#687B78]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
              "
            >
              <Filter className="h-3.5 w-3.5" strokeWidth={2.2} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================
          COMPANIES TABLE
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Table header info */}
        <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-[#09263A]">
              All Companies
            </h2>
            <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
              {filteredCompanies.length}
            </span>
          </div>
          <p className="text-[11px] text-[#687B78]">
            Click a company to view details
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Company
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Client
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Type
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Next Filing
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
              {filteredCompanies.map((company) => {
                const statusStyles = getStatusStyles(company.status);
                const urgency = getUrgencyStyles(company.urgency);

                return (
                  <tr
                    key={company.id}
                    onClick={() =>
                      navigate(`/accountant/companies/${company.id}`)
                    }
                    className="group cursor-pointer transition-colors hover:bg-[#F5FCF9]"
                  >
                    {/* Company */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                          <Building2
                            className="h-4 w-4 text-[#087F5B]"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                            {company.name}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                            #{company.number}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4">
                      <Link
                        to={`/accountant/clients/${company.clientId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09263A] transition-colors hover:text-[#087F5B]"
                      >
                        <Users
                          className="h-3.5 w-3.5 text-[#687B78]"
                          strokeWidth={2.2}
                        />
                        <span className="truncate max-w-[160px]">
                          {company.client}
                        </span>
                      </Link>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-[#687B78]">
                        {company.type === "Private limited Company"
                          ? "Private Ltd"
                          : company.type}
                      </span>
                    </td>

                    {/* Next Filing */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-[#09263A]">
                          {company.nextFiling}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {company.nextFilingDate} ·{" "}
                          {getDaysLabel(company.daysLeft)}
                        </p>
                      </div>
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
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
                        />
                        {company.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="relative px-5 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-flex items-center gap-1">
                        <Link
                          to={`/accountant/companies/${company.id}`}
                          className="
                            inline-flex
                            items-center
                            gap-1
                            rounded-lg
                            border
                            border-[#DDEAE6]
                            bg-white
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            text-[#09263A]
                            transition-all
                            duration-200
                            hover:border-[#087F5B]
                            hover:bg-[#E8F8F2]
                            hover:text-[#087F5B]
                          "
                        >
                          <Eye className="h-3 w-3" strokeWidth={2.4} />
                          <span>View</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu(
                              openRowMenu === company.id ? null : company.id
                            )
                          }
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            text-[#687B78]
                            transition-colors
                            hover:bg-[#E8F8F2]
                            hover:text-[#087F5B]
                          "
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>

                        {openRowMenu === company.id && (
                          <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Eye className="h-3.5 w-3.5" />
                              <span>View details</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Edit3 className="h-3.5 w-3.5" />
                              <span>Edit company</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <FileText className="h-3.5 w-3.5" />
                              <span>Start filing</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <ExternalLink className="h-3.5 w-3.5" />
                              <span>View on Companies House</span>
                            </button>
                            <div className="my-1 border-t border-[#DDEAE6]" />
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                              <Archive className="h-3.5 w-3.5" />
                              <span>Archive company</span>
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
        <div className="divide-y divide-[#DDEAE6] lg:hidden">
          {filteredCompanies.map((company) => {
            const statusStyles = getStatusStyles(company.status);
            const urgency = getUrgencyStyles(company.urgency);

            return (
              <div
                key={company.id}
                onClick={() =>
                  navigate(`/accountant/companies/${company.id}`)
                }
                className="cursor-pointer p-4 transition-colors hover:bg-[#F5FCF9]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <Building2
                      className="h-5 w-5 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#09263A]">
                          {company.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                          #{company.number}
                        </p>
                      </div>
                      <span
                        className={`
                          shrink-0
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-bold
                          ${statusStyles.bg}
                          ${statusStyles.text}
                        `}
                      >
                        {company.status}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#687B78]">
                      <Users className="h-3 w-3" strokeWidth={2.2} />
                      <span className="truncate">{company.client}</span>
                    </div>

                    <div className="mt-3 rounded-lg bg-[#F5FCF9] px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                        Next Filing
                      </p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className="text-[11px] font-bold text-[#09263A]">
                          {company.nextFiling}
                        </p>
                        <p
                          className={`text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(company.daysLeft)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
              <Building2
                className="h-7 w-7 text-[#087F5B]"
                strokeWidth={2}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-[#09263A]">
              No companies found
            </p>
            <p className="mt-1 max-w-xs text-xs text-[#687B78]">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Add your first company to get started."}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#DDEAE6]
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#09263A]
                  transition-all
                  duration-200
                  hover:border-[#087F5B]
                  hover:text-[#087F5B]
                "
              >
                <Filter className="h-3 w-3" strokeWidth={2.4} />
                <span>Clear filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <Layers className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                Bulk actions
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Manage multiple companies at once
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                File VAT returns, chase deadlines or run compliance
                checks across all companies in a single flow.
              </p>
            </div>
          </div>

          <Link
            to="/accountant/filings/bulk"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              self-start
              rounded-lg
              bg-[#087F5B]
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#005E45]
              hover:-translate-y-0.5
              hover:shadow-md
              sm:self-auto
            "
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Bulk filing</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantCompanies;