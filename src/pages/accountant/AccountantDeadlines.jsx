import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarClock,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Eye,
  MoreVertical,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  RefreshCw,
  Building2,
  Users,
  Calendar,
  Bell,
  TrendingUp,
  Layers,
  FileText,
  Timer,
  UserCheck,
  Zap,
  Send,
  Archive,
  Play,
  Info,
} from "lucide-react";

const AccountantDeadlines = () => {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "overdue",
      label: "Overdue",
      value: 3,
      change: "Requires immediate action",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      highlight: true,
      highlightColor: "border-rose-200",
    },
    {
      id: "due-week",
      label: "Due This Week",
      value: 5,
      change: "Next 7 days",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      highlight: true,
      highlightColor: "border-amber-200",
    },
    {
      id: "due-month",
      label: "Due This Month",
      value: 12,
      change: "Next 30 days",
      icon: CalendarClock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      value: 24,
      change: "Next 90 days",
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "completed",
      label: "Completed",
      value: 156,
      change: "This year",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  /* ============================================================
     DEADLINES DATA
  ============================================================ */

  const deadlines = [
    {
      id: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "VAT Return",
      period: "Q3 2026",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      status: "Overdue",
      assignee: "Alice J.",
      estimatedTime: "15 min",
    },
    {
      id: 2,
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      client: "Digital Solutions Ltd",
      clientId: 4,
      filing: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      urgency: "high",
      status: "In Progress",
      assignee: "John S.",
      estimatedTime: "45 min",
    },
    {
      id: 3,
      company: "Skil Four Ltd",
      companyNumber: "05513948",
      client: "Skil Four Ltd",
      clientId: 3,
      filing: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      urgency: "high",
      status: "Awaiting Client",
      assignee: "Sarah M.",
      estimatedTime: "45 min",
    },
    {
      id: 4,
      company: "Green Tech Ltd",
      companyNumber: "07895432",
      client: "Green Tech Ltd",
      clientId: 2,
      filing: "Confirmation Statement",
      period: "Annual",
      dueDate: "12 Oct 2026",
      daysLeft: 10,
      urgency: "medium",
      status: "In Progress",
      assignee: "Alice J.",
      estimatedTime: "10 min",
    },
    {
      id: 5,
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Oct 2026",
      daysLeft: 13,
      urgency: "medium",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "60 min",
    },
    {
      id: 6,
      company: "Imperial Properties Ltd",
      companyNumber: "14803945",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Nov 2026",
      daysLeft: 34,
      urgency: "low",
      status: "In Progress",
      assignee: "Alice J.",
      estimatedTime: "45 min",
    },
    {
      id: 7,
      company: "Sunrise Trading Ltd",
      companyNumber: "44556677",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      filing: "VAT Return",
      period: "Q3 2026",
      dueDate: "07 Nov 2026",
      daysLeft: 36,
      urgency: "low",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "15 min",
    },
    {
      id: 8,
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Dec 2026",
      daysLeft: 74,
      urgency: "low",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "60 min",
    },
    {
      id: 9,
      company: "Ocean View Ltd",
      companyNumber: "66778899",
      client: "Ocean View Ltd",
      clientId: 6,
      filing: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "30 Dec 2026",
      daysLeft: 89,
      urgency: "low",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "60 min",
    },
    {
      id: 10,
      company: "Bright Ideas Ltd",
      companyNumber: "11223344",
      client: "Bright Ideas Ltd",
      clientId: 5,
      filing: "Self Assessment",
      period: "2025/26",
      dueDate: "31 Jan 2027",
      daysLeft: 121,
      urgency: "low",
      status: "Not Started",
      assignee: "John S.",
      estimatedTime: "30 min",
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const timeOptions = [
    { value: "All", label: "All Deadlines" },
    { value: "overdue", label: "Overdue" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "Next 90 Days" },
  ];

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "VAT Return", label: "VAT Return" },
    { value: "Corporation Tax (CT600)", label: "Corporation Tax" },
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
     FILTERED DEADLINES
  ============================================================ */

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter((deadline) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${deadline.company} ${deadline.companyNumber} ${deadline.client} ${deadline.filing}`
          .toLowerCase()
          .includes(query);

      let matchesTime = true;
      if (timeFilter === "overdue") matchesTime = deadline.daysLeft < 0;
      else if (timeFilter === "week")
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 7;
      else if (timeFilter === "month")
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 30;
      else if (timeFilter === "quarter")
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 90;

      const matchesType =
        typeFilter === "All" || deadline.filing === typeFilter;

      const matchesClient =
        clientFilter === "All" || deadline.client === clientFilter;

      return matchesSearch && matchesTime && matchesType && matchesClient;
    });
  }, [deadlines, search, timeFilter, typeFilter, clientFilter]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const clearFilters = () => {
    setSearch("");
    setTimeFilter("All");
    setTypeFilter("All");
    setClientFilter("All");
  };

  const hasActiveFilters =
    search ||
    timeFilter !== "All" ||
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
          border: "border-rose-200",
          text: "text-rose-700",
          badge: "bg-rose-100 text-rose-700",
          dot: "bg-rose-500",
        };
      case "high":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          badge: "bg-amber-100 text-amber-700",
          dot: "bg-amber-500",
        };
      case "medium":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-700",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
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
      case "In Progress":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: Timer,
        };
      case "Awaiting Client":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          icon: UserCheck,
        };
      case "Overdue":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          icon: AlertCircle,
        };
      case "Not Started":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: Clock3,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          icon: Clock3,
        };
    }
  };

  const getFilingTypeStyles = (type) => {
    switch (type) {
      case "VAT Return":
        return "bg-purple-100 text-purple-700";
      case "Corporation Tax (CT600)":
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
            Deadlines
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Track upcoming and overdue deadlines across your clients
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
            <Bell className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Reminders</span>
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

          <button
            type="button"
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
            <span>Add Deadline</span>
          </button>
        </div>
      </div>

      {/* ======================================================
          STATS CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
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
                ${
                  stat.highlight
                    ? stat.highlightColor
                    : "border-[#DDEAE6]"
                }
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
          OVERDUE ALERT BANNER
      ====================================================== */}
      {filteredDeadlines.filter((d) => d.daysLeft < 0).length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100">
              <AlertCircle
                className="h-5 w-5 text-rose-500"
                strokeWidth={2.4}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-rose-900">
                {filteredDeadlines.filter((d) => d.daysLeft < 0).length}{" "}
                deadline
                {filteredDeadlines.filter((d) => d.daysLeft < 0).length > 1
                  ? "s"
                  : ""}{" "}
                overdue
              </p>
              <p className="mt-0.5 text-xs text-rose-700">
                Take action now to avoid HMRC penalties for your clients.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTimeFilter("overdue")}
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              self-start
              rounded-lg
              bg-rose-500
              px-4
              py-2.5
              text-xs
              font-bold
              text-white
              transition-all
              duration-200
              hover:bg-rose-600
              sm:self-auto
            "
          >
            <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>View overdue only</span>
          </button>
        </div>
      )}

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

          {/* Time filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTimeDropdown((prev) => !prev);
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
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
                <span>
                  {timeOptions.find((o) => o.value === timeFilter)?.label}
                </span>
              </div>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showTimeDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showTimeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTimeFilter(option.value);
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
                      hover:bg-[#E8F8F2]
                      ${
                        timeFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {timeFilter === option.value && (
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
                setShowTimeDropdown(false);
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
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
                <span>
                  {typeOptions.find((o) => o.value === typeFilter)?.label}
                </span>
              </div>
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
                setShowTimeDropdown(false);
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
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
                <span className="truncate max-w-[120px]">
                  {clientOptions.find((o) => o.value === clientFilter)?.label}
                </span>
              </div>
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
          DEADLINES LIST
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Table header info */}
        <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock
              className="h-4 w-4 text-[#087F5B]"
              strokeWidth={2.2}
            />
            <h2 className="text-sm font-bold text-[#09263A]">
              All Deadlines
            </h2>
            <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
              {filteredDeadlines.length}
            </span>
          </div>
          <p className="text-[11px] text-[#687B78]">
            Sorted by urgency
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
                  Due Date
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#DDEAE6]">
              {filteredDeadlines.map((deadline) => {
                const urgency = getUrgencyStyles(deadline.urgency);
                const statusStyles = getStatusStyles(deadline.status);
                const StatusIcon = statusStyles.icon;

                return (
                  <tr
                    key={deadline.id}
                    onClick={() =>
                      navigate(`/accountant/filings/${deadline.id}`)
                    }
                    className={`
                      group
                      cursor-pointer
                      transition-colors
                      hover:bg-[#F5FCF9]
                      ${deadline.daysLeft < 0 ? "bg-rose-50/30" : "bg-white"}
                    `}
                  >
                    {/* Company */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            ${urgency.bg}
                            border
                            ${urgency.border}
                          `}
                        >
                          <Building2
                            className={`h-4 w-4 ${urgency.text}`}
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                            {deadline.company}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                            #{deadline.companyNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Filing */}
                    <td className="px-5 py-4">
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${getFilingTypeStyles(deadline.filing)}`}
                        >
                          {deadline.filing}
                        </span>
                        <p className="mt-1 text-[10px] text-[#687B78]">
                          {deadline.period} · {deadline.estimatedTime}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4">
                      <Link
                        to={`/accountant/clients/${deadline.clientId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09263A] transition-colors hover:text-[#087F5B]"
                      >
                        <Users
                          className="h-3.5 w-3.5 text-[#687B78]"
                          strokeWidth={2.2}
                        />
                        <span className="truncate max-w-[140px]">
                          {deadline.client}
                        </span>
                      </Link>
                    </td>

                    {/* Due Date */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-[#09263A]">
                          {deadline.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(deadline.daysLeft)}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
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
                          {deadline.status}
                        </span>
                        <span className="text-[10px] text-[#687B78]">
                          {deadline.assignee}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td
                      className="relative px-5 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-flex items-center gap-1">
                        <Link
                          to={`/accountant/filings/new?company=${deadline.companyNumber}`}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-[#087F5B]
                            px-3.5
                            py-2
                            text-[11px]
                            font-bold
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:bg-[#005E45]
                            hover:-translate-y-0.5
                          "
                        >
                          <Play className="h-3 w-3" strokeWidth={2.6} />
                          <span>File</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu(
                              openRowMenu === deadline.id ? null : deadline.id
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

                        {openRowMenu === deadline.id && (
                          <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Eye className="h-3.5 w-3.5" />
                              <span>View details</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Send className="h-3.5 w-3.5" />
                              <span>Send reminder</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <UserCheck className="h-3.5 w-3.5" />
                              <span>Reassign</span>
                            </button>
                            <div className="my-1 border-t border-[#DDEAE6]" />
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                              <Archive className="h-3.5 w-3.5" />
                              <span>Dismiss</span>
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
          {filteredDeadlines.map((deadline) => {
            const urgency = getUrgencyStyles(deadline.urgency);
            const statusStyles = getStatusStyles(deadline.status);
            const StatusIcon = statusStyles.icon;

            return (
              <div
                key={deadline.id}
                onClick={() => navigate(`/accountant/filings/${deadline.id}`)}
                className={`
                  cursor-pointer
                  p-4
                  transition-colors
                  hover:bg-[#F5FCF9]
                  ${deadline.daysLeft < 0 ? "bg-rose-50/30" : "bg-white"}
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      ${urgency.bg}
                      ${urgency.border}
                    `}
                  >
                    <Building2
                      className={`h-5 w-5 ${urgency.text}`}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#09263A]">
                          {deadline.company}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                          #{deadline.companyNumber}
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
                          ${urgency.badge}
                        `}
                      >
                        {deadline.daysLeft < 0
                          ? "Overdue"
                          : deadline.daysLeft <= 7
                          ? "Urgent"
                          : "Upcoming"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${getFilingTypeStyles(deadline.filing)}`}
                      >
                        {deadline.filing}
                      </span>
                      <span className="text-[10px] text-[#687B78]">
                        {deadline.period}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Due
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
                          {deadline.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(deadline.daysLeft)}
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
                          {deadline.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#687B78]">
                        <Users className="h-3 w-3" strokeWidth={2.2} />
                        <span className="truncate">{deadline.assignee}</span>
                      </div>

                      <Link
                        to={`/accountant/filings/new?company=${deadline.companyNumber}`}
                        onClick={(e) => e.stopPropagation()}
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-lg
                          bg-[#087F5B]
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          text-white
                          transition-all
                          hover:bg-[#005E45]
                        "
                      >
                        <Play className="h-3 w-3" strokeWidth={2.6} />
                        <span>File now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredDeadlines.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
              <CalendarClock
                className="h-7 w-7 text-[#087F5B]"
                strokeWidth={2}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-[#09263A]">
              No deadlines found
            </p>
            <p className="mt-1 max-w-xs text-xs text-[#687B78]">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "You're all caught up. No upcoming deadlines."}
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
          LEGEND
      ====================================================== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Overdue",
            desc: "Past the deadline",
            color: "bg-rose-500",
            bg: "bg-rose-50",
            border: "border-rose-200",
          },
          {
            label: "Urgent",
            desc: "Due within 7 days",
            color: "bg-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-200",
          },
          {
            label: "Upcoming",
            desc: "Due within 30 days",
            color: "bg-blue-500",
            bg: "bg-blue-50",
            border: "border-blue-200",
          },
          {
            label: "Planned",
            desc: "More than 30 days",
            color: "bg-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-200",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`
              flex
              items-center
              gap-3
              rounded-xl
              border
              ${item.border}
              ${item.bg}
              px-4
              py-3
            `}
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} />
            <div>
              <p className="text-xs font-bold text-[#09263A]">{item.label}</p>
              <p className="mt-0.5 text-[10px] text-[#687B78]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <Bell className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                Never miss a deadline
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Enable automatic deadline reminders
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Get email and SMS alerts before every filing deadline —
                customisable per client or per filing type.
              </p>
            </div>
          </div>

          <Link
            to="/accountant/settings"
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
            <Bell className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Set up reminders</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantDeadlines;