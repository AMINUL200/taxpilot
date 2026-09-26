import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Eye,
  MoreVertical,
  Edit3,
  Archive,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  RefreshCw,
  Building2,
  Users,
  Calendar,
  Send,
  ExternalLink,
  TrendingUp,
  Layers,
  Check,
  X,
  Play,
  PauseCircle,
  FileCheck2,
  Inbox,
  Timer,
  UserCheck,
} from "lucide-react";

const AccountantFilings = () => {
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
      id: "all",
      label: "All Filings",
      value: 48,
      change: "This period",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "in-progress",
      label: "In Progress",
      value: 12,
      change: "Active filings",
      icon: Timer,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "awaiting",
      label: "Awaiting Client",
      value: 7,
      change: "Documents / approval",
      icon: UserCheck,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "submitted",
      label: "Submitted",
      value: 26,
      change: "Awaiting HMRC",
      icon: FileCheck2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
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
     FILINGS DATA
  ============================================================ */

  const filings = [
    {
      id: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      type: "VAT Return",
      period: "Q3 2026",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      status: "Overdue",
      urgency: "overdue",
      assignee: "Alice J.",
      progress: 45,
    },
    {
      id: 2,
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      client: "Digital Solutions Ltd",
      clientId: 4,
      type: "Corporation Tax",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      status: "In Progress",
      urgency: "high",
      assignee: "John S.",
      progress: 60,
    },
    {
      id: 3,
      company: "Skil Four Ltd",
      companyNumber: "05513948",
      client: "Skil Four Ltd",
      clientId: 3,
      type: "Corporation Tax",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      status: "Awaiting Client",
      urgency: "high",
      assignee: "Sarah M.",
      progress: 30,
    },
    {
      id: 4,
      company: "Green Tech Ltd",
      companyNumber: "07895432",
      client: "Green Tech Ltd",
      clientId: 2,
      type: "Confirmation Statement",
      period: "Annual",
      dueDate: "12 Oct 2026",
      daysLeft: 10,
      status: "In Progress",
      urgency: "medium",
      assignee: "Alice J.",
      progress: 75,
    },
    {
      id: 5,
      company: "Sunrise Trading Ltd",
      companyNumber: "44556677",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      type: "VAT Return",
      period: "Q3 2026",
      dueDate: "07 Nov 2026",
      daysLeft: 46,
      status: "Not Started",
      urgency: "low",
      assignee: "Unassigned",
      progress: 0,
    },
    {
      id: 6,
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      type: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Dec 2026",
      daysLeft: 84,
      status: "Not Started",
      urgency: "low",
      assignee: "Unassigned",
      progress: 0,
    },
    {
      id: 7,
      company: "Ocean View Ltd",
      companyNumber: "66778899",
      client: "Ocean View Ltd",
      clientId: 6,
      type: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "30 Dec 2026",
      daysLeft: 99,
      status: "Submitted",
      urgency: "low",
      assignee: "Alice J.",
      progress: 100,
    },
    {
      id: 8,
      company: "Bright Ideas Ltd",
      companyNumber: "11223344",
      client: "Bright Ideas Ltd",
      clientId: 5,
      type: "Self Assessment",
      period: "2025/26",
      dueDate: "31 Jan 2027",
      daysLeft: 131,
      status: "Awaiting Client",
      urgency: "low",
      assignee: "John S.",
      progress: 20,
    },
    {
      id: 9,
      company: "Imperial Properties Ltd",
      companyNumber: "14803945",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      type: "Corporation Tax",
      period: "FY 2025/26",
      dueDate: "05 Nov 2026",
      daysLeft: 44,
      status: "In Progress",
      urgency: "medium",
      assignee: "Alice J.",
      progress: 55,
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Awaiting Client", label: "Awaiting Client" },
    { value: "Submitted", label: "Submitted" },
    { value: "Overdue", label: "Overdue" },
  ];

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "VAT Return", label: "VAT Return" },
    { value: "Corporation Tax", label: "Corporation Tax" },
    { value: "Annual Accounts", label: "Annual Accounts" },
    { value: "Confirmation Statement", label: "Confirmation Statement" },
    { value: "Self Assessment", label: "Self Assessment" },
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
     FILTERED FILINGS
  ============================================================ */

  const filteredFilings = useMemo(() => {
    return filings.filter((filing) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${filing.company} ${filing.companyNumber} ${filing.client} ${filing.type}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || filing.status === statusFilter;

      const matchesType =
        typeFilter === "All" || filing.type === typeFilter;

      const matchesClient =
        clientFilter === "All" || filing.client === clientFilter;

      return matchesSearch && matchesStatus && matchesType && matchesClient;
    });
  }, [filings, search, statusFilter, typeFilter, clientFilter]);

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
      case "Submitted":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          icon: CheckCircle2,
        };
      case "In Progress":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          dot: "bg-blue-500",
          icon: Timer,
        };
      case "Awaiting Client":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
          icon: UserCheck,
        };
      case "Overdue":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          dot: "bg-rose-500",
          icon: AlertCircle,
        };
      case "Not Started":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          dot: "bg-gray-500",
          icon: Clock3,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
          icon: Clock3,
        };
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case "VAT Return":
        return "bg-purple-100 text-purple-700";
      case "Corporation Tax":
        return "bg-blue-100 text-blue-700";
      case "Annual Accounts":
        return "bg-emerald-100 text-emerald-700";
      case "Confirmation Statement":
        return "bg-amber-100 text-amber-700";
      case "Self Assessment":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
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
            Filings
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Track and manage all filings across your client portfolio
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
            to="/accountant/filings/new"
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
            <span>Start Filing</span>
          </Link>
        </div>
      </div>

      {/* ======================================================
          STATS CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isOverdue = stat.id === "overdue";

          return (
            <div
              key={stat.id}
              className={`
                group
                relative
                overflow-hidden
                rounded-xl
                border
                bg-white
                p-4
                shadow-[0_3px_14px_rgba(16,42,67,0.035)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]
                ${isOverdue ? "border-rose-200" : "border-[#DDEAE6]"}
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    {stat.label}
                  </p>
                  <p className="mt-1.5 text-2xl font-bold tracking-tight text-[#09263A]">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${stat.iconBg}
                  `}
                >
                  <Icon
                    className={`h-4 w-4 ${stat.iconColor}`}
                    strokeWidth={2.2}
                  />
                </div>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-[#687B78]">
                {stat.change}
              </p>
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
              placeholder="Search by company, client or filing type..."
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
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
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
          FILINGS TABLE
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Table header info */}
        <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-[#09263A]">
              All Filings
            </h2>
            <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
              {filteredFilings.length}
            </span>
          </div>
          <p className="text-[11px] text-[#687B78]">
            Click a filing to view details
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
                  Filing
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Client
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Due
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Progress
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
              {filteredFilings.map((filing) => {
                const statusStyles = getStatusStyles(filing.status);
                const StatusIcon = statusStyles.icon;
                const urgency = getUrgencyStyles(filing.urgency);

                return (
                  <tr
                    key={filing.id}
                    onClick={() =>
                      navigate(`/accountant/filings/${filing.id}`)
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
                            {filing.company}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                            #{filing.companyNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Filing */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-[#09263A]">
                          {filing.type}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#687B78]">
                          {filing.period}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4">
                      <Link
                        to={`/accountant/clients/${filing.clientId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09263A] transition-colors hover:text-[#087F5B]"
                      >
                        <Users
                          className="h-3.5 w-3.5 text-[#687B78]"
                          strokeWidth={2.2}
                        />
                        <span className="truncate max-w-[140px]">
                          {filing.client}
                        </span>
                      </Link>
                    </td>

                    {/* Due */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-[#09263A]">
                          {filing.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(filing.daysLeft)}
                        </p>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-5 py-4">
                      <div className="min-w-[100px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-[#09263A]">
                            {filing.progress}%
                          </span>
                          <span className="text-[10px] text-[#687B78]">
                            {filing.assignee}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F5]">
                          <div
                            className="h-full rounded-full bg-[#087F5B] transition-all duration-500"
                            style={{ width: `${filing.progress}%` }}
                          />
                        </div>
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
                        <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                        {filing.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="relative px-5 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-flex items-center gap-1">
                        <Link
                          to={`/accountant/filings/${filing.id}`}
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
                              openRowMenu === filing.id ? null : filing.id
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

                        {openRowMenu === filing.id && (
                          <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Eye className="h-3.5 w-3.5" />
                              <span>View details</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Play className="h-3.5 w-3.5" />
                              <span>Continue filing</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <PauseCircle className="h-3.5 w-3.5" />
                              <span>Pause filing</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Send className="h-3.5 w-3.5" />
                              <span>Send to client</span>
                            </button>
                            <div className="my-1 border-t border-[#DDEAE6]" />
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                              <Archive className="h-3.5 w-3.5" />
                              <span>Archive filing</span>
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
          {filteredFilings.map((filing) => {
            const statusStyles = getStatusStyles(filing.status);
            const StatusIcon = statusStyles.icon;
            const urgency = getUrgencyStyles(filing.urgency);

            return (
              <div
                key={filing.id}
                onClick={() => navigate(`/accountant/filings/${filing.id}`)}
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
                          {filing.company}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                          #{filing.companyNumber}
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
                          ${getTypeStyles(filing.type)}
                        `}
                      >
                        {filing.type}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#687B78]">
                      <Users className="h-3 w-3" strokeWidth={2.2} />
                      <span className="truncate">{filing.client}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Due
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
                          {filing.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(filing.daysLeft)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Status
                        </p>
                        <span
                          className={`
                            mt-1
                            inline-flex
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
                          <StatusIcon className="h-2.5 w-2.5" strokeWidth={2.4} />
                          {filing.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold text-[#687B78]">
                          {filing.assignee}
                        </span>
                        <span className="text-[10px] font-bold text-[#09263A]">
                          {filing.progress}%
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F5]">
                        <div
                          className="h-full rounded-full bg-[#087F5B] transition-all duration-500"
                          style={{ width: `${filing.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredFilings.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
              <FileText
                className="h-7 w-7 text-[#087F5B]"
                strokeWidth={2}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-[#09263A]">
              No filings found
            </p>
            <p className="mt-1 max-w-xs text-xs text-[#687B78]">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Start a new filing to see it here."}
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
                Bulk filing
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                File multiple returns in one flow
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Group similar filings across clients and submit them
                together — perfect for VAT quarters and year-end batches.
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
            <span>Start bulk filing</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantFilings;