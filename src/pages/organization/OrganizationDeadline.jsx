import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  FileText,
  Building2,
  Bell,
  Download,
  Plus,
  Calendar,
  TrendingUp,
  Info,
} from "lucide-react";

const OrganizationDeadline = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const stats = [
    {
      id: "overdue",
      label: "Overdue",
      value: 1,
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      description: "Requires immediate action",
    },
    {
      id: "due-soon",
      label: "Due Soon",
      value: 3,
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      description: "Within next 30 days",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      value: 8,
      icon: CalendarClock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      description: "Next 90 days",
    },
    {
      id: "completed",
      label: "Completed",
      value: 24,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      description: "This year",
    },
  ];

  const deadlines = [
    {
      id: 1,
      title: "MTD VAT Return",
      company: "Demo Ltd",
      companyNumber: "45678912",
      dueDate: "20 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      type: "VAT",
      period: "Q3 2026",
      estimatedTime: "15 min",
    },
    {
      id: 2,
      title: "Corporation Tax (CT600)",
      company: "ABC Trading Ltd",
      companyNumber: "12345678",
      dueDate: "30 Sep 2026",
      daysLeft: 8,
      urgency: "high",
      type: "Corporation Tax",
      period: "FY 2025/26",
      estimatedTime: "45 min",
    },
    {
      id: 3,
      title: "Confirmation Statement (CS01)",
      company: "XYZ Limited",
      companyNumber: "87654321",
      dueDate: "05 Oct 2026",
      daysLeft: 13,
      urgency: "medium",
      type: "Confirmation",
      period: "Annual",
      estimatedTime: "10 min",
    },
    {
      id: 4,
      title: "Annual Accounts",
      company: "XYZ Limited",
      companyNumber: "87654321",
      dueDate: "12 Oct 2026",
      daysLeft: 20,
      urgency: "medium",
      type: "Accounts",
      period: "FY 2025/26",
      estimatedTime: "60 min",
    },
    {
      id: 5,
      title: "Self Assessment (SA100)",
      company: "John Smith (Personal)",
      companyNumber: "N/A",
      dueDate: "31 Jan 2027",
      daysLeft: 131,
      urgency: "low",
      type: "Self Assessment",
      period: "2025/26",
      estimatedTime: "30 min",
    },
    {
      id: 6,
      title: "Confirmation Statement (CS01)",
      company: "Bright Solutions Ltd",
      companyNumber: "11223344",
      dueDate: "05 Nov 2026",
      daysLeft: 44,
      urgency: "low",
      type: "Confirmation",
      period: "Annual",
      estimatedTime: "10 min",
    },
    {
      id: 7,
      title: "MTD VAT Return",
      company: "ABC Trading Ltd",
      companyNumber: "12345678",
      dueDate: "07 Nov 2026",
      daysLeft: 46,
      urgency: "low",
      type: "VAT",
      period: "Q4 2026",
      estimatedTime: "15 min",
    },
    {
      id: 8,
      title: "Corporation Tax (CT600)",
      company: "Green Energy Co",
      companyNumber: "99887766",
      dueDate: "15 Dec 2026",
      daysLeft: 84,
      urgency: "low",
      type: "Corporation Tax",
      period: "FY 2025/26",
      estimatedTime: "45 min",
    },
  ];

  // =========================================================
  // FILTERS
  // =========================================================

  const timeFilterOptions = [
    { value: "all", label: "All Deadlines" },
    { value: "overdue", label: "Overdue" },
    { value: "7days", label: "Next 7 days" },
    { value: "30days", label: "Next 30 days" },
    { value: "90days", label: "Next 90 days" },
  ];

  const typeFilterOptions = [
    { value: "all", label: "All Types" },
    { value: "VAT", label: "MTD VAT" },
    { value: "Corporation Tax", label: "Corporation Tax" },
    { value: "Accounts", label: "Annual Accounts" },
    { value: "Self Assessment", label: "Self Assessment" },
    { value: "Confirmation", label: "Confirmation Statement" },
  ];

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter((deadline) => {
      const matchesSearch =
        deadline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deadline.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deadline.companyNumber.includes(searchQuery);

      let matchesTime = true;
      if (timeFilter === "overdue") {
        matchesTime = deadline.daysLeft < 0;
      } else if (timeFilter === "7days") {
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 7;
      } else if (timeFilter === "30days") {
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 30;
      } else if (timeFilter === "90days") {
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 90;
      }

      const matchesType =
        typeFilter === "all" || deadline.type === typeFilter;

      return matchesSearch && matchesTime && matchesType;
    });
  }, [searchQuery, timeFilter, typeFilter]);

  // Group deadlines by urgency
  const groupedDeadlines = useMemo(() => {
    return {
      overdue: filteredDeadlines.filter((d) => d.urgency === "overdue"),
      high: filteredDeadlines.filter((d) => d.urgency === "high"),
      medium: filteredDeadlines.filter((d) => d.urgency === "medium"),
      low: filteredDeadlines.filter((d) => d.urgency === "low"),
    };
  }, [filteredDeadlines]);

  // =========================================================
  // HELPERS
  // =========================================================

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "overdue":
        return {
          border: "border-l-rose-500",
          bg: "bg-rose-50",
          text: "text-rose-700",
          badge: "bg-rose-100 text-rose-700",
          dot: "bg-rose-500",
        };
      case "high":
        return {
          border: "border-l-amber-500",
          bg: "bg-amber-50",
          text: "text-amber-700",
          badge: "bg-amber-100 text-amber-700",
          dot: "bg-amber-500",
        };
      case "medium":
        return {
          border: "border-l-blue-500",
          bg: "bg-blue-50",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-700",
          dot: "bg-blue-500",
        };
      default:
        return {
          border: "border-l-emerald-500",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          badge: "bg-emerald-100 text-emerald-700",
          dot: "bg-emerald-500",
        };
    }
  };

  const getDaysLabel = (daysLeft) => {
    if (daysLeft < 0) return `${Math.abs(daysLeft)} days overdue`;
    if (daysLeft === 0) return "Due today";
    if (daysLeft === 1) return "Due tomorrow";
    return `${daysLeft} days left`;
  };

  const getDaysColor = (urgency) => {
    switch (urgency) {
      case "overdue":
        return "text-rose-600";
      case "high":
        return "text-amber-600";
      case "medium":
        return "text-blue-600";
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
            Deadlines
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Track and manage all your compliance deadlines in one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

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
            <Bell className="h-4 w-4" />
            <span>Reminders</span>
          </button>

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
            <Plus className="h-4 w-4" />
            <span>Add Deadline</span>
          </button>

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
                  <p className="mt-2 text-2xl font-bold text-heading sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 hidden text-[11px] text-text-muted sm:block">
                    {stat.description}
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
          ALERT BANNER - Overdue
      ====================================================== */}

      {groupedDeadlines.overdue.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 sm:p-5">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100">
            <AlertCircle className="h-5 w-5 text-rose-500" strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-bold text-rose-900">
                  {groupedDeadlines.overdue.length} deadline
                  {groupedDeadlines.overdue.length > 1 ? "s" : ""} overdue
                </p>
                <p className="mt-0.5 text-xs text-rose-700">
                  Take action now to avoid penalties from HMRC.
                </p>
              </div>

              <Link
                to="/dashboard/filings"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-1.5
                  self-start
                  rounded-lg
                  bg-rose-500
                  px-3.5
                  py-2
                  text-[11px]
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-rose-600
                  sm:self-auto
                "
              >
                <span>Fix now</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          FILTERS BAR
      ====================================================== */}

      <div className="rounded-xl border border-border-light bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* Search */}
          <div className="relative flex-1">

            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search deadlines, companies or numbers..."
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

          {/* Time filter */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowTimeDropdown((prev) => !prev);
                setShowTypeDropdown(false);
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

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {timeFilterOptions.find((o) => o.value === timeFilter)?.label}
                </span>
              </div>

              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showTimeDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showTimeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

                {timeFilterOptions.map((option) => (
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
                      hover:bg-primary-light
                      ${
                        timeFilter === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {timeFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
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

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>
                  {typeFilterOptions.find((o) => o.value === typeFilter)?.label}
                </span>
              </div>

              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showTypeDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showTypeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

                {typeFilterOptions.map((option) => (
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
                      hover:bg-primary-light
                      ${
                        typeFilter === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {typeFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          DEADLINES LIST
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              All Deadlines
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredDeadlines.length}
            </span>
          </div>

          <p className="hidden text-[11px] text-text-muted sm:block">
            Sorted by urgency
          </p>

        </div>

        {/* Deadline items */}
        {filteredDeadlines.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <CalendarClock className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>

            <p className="mt-4 text-sm font-bold text-heading">
              No deadlines found
            </p>

            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {searchQuery || timeFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your search or filters."
                : "You're all caught up. No upcoming deadlines."}
            </p>

            {(searchQuery || timeFilter !== "all" || typeFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setTimeFilter("all");
                  setTypeFilter("all");
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
        ) : (
          <div className="divide-y divide-border-light">

            {filteredDeadlines.map((deadline) => {
              const styles = getUrgencyStyles(deadline.urgency);

              return (
                <div
                  key={deadline.id}
                  className="
                    group
                    relative
                    flex
                    flex-col
                    gap-4
                    px-5
                    py-4
                    transition-colors
                    hover:bg-background-soft
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:gap-6
                  "
                >

                  {/* Left: Urgency indicator + Info */}
                  <div className="flex min-w-0 flex-1 items-start gap-4">

                    {/* Urgency bar */}
                    <div
                      className={`
                        absolute
                        left-0
                        top-0
                        h-full
                        w-1
                        ${styles.border.replace("border-l-", "bg-")}
                      `}
                    />

                    {/* Icon */}
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        ${styles.bg}
                      `}
                    >
                      <FileText
                        className={`h-5 w-5 ${styles.text}`}
                        strokeWidth={2.2}
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-bold text-heading">
                          {deadline.title}
                        </h3>

                        <span
                          className={`
                            rounded-full
                            px-2
                            py-0.5
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wide
                            ${styles.badge}
                          `}
                        >
                          {deadline.urgency === "overdue" ? "Overdue" : deadline.type}
                        </span>

                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted">

                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {deadline.company}
                        </span>

                        {deadline.companyNumber !== "N/A" && (
                          <span className="font-mono">
                            #{deadline.companyNumber}
                          </span>
                        )}

                        <span className="rounded-full bg-background-soft px-2 py-0.5">
                          {deadline.period}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Middle: Date + Days left */}
                  <div className="flex items-center gap-6 pl-15 sm:pl-0">

                    <div className="text-left sm:text-right">

                      <div className="flex items-center gap-1.5 text-xs font-bold text-heading">
                        <Calendar className="h-3.5 w-3.5 text-text-muted" />
                        <span>{deadline.dueDate}</span>
                      </div>

                      <p className={`mt-1 text-[11px] font-semibold ${getDaysColor(deadline.urgency)}`}>
                        {getDaysLabel(deadline.daysLeft)}
                      </p>

                    </div>

                  </div>

                  {/* Right: Action */}
                  <div className="flex shrink-0 items-center gap-2 pl-15 sm:pl-0">

                    <Link
                      to={`/dashboard/filings/new?type=${encodeURIComponent(deadline.type)}`}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-primary
                        px-3.5
                        py-2
                        text-[11px]
                        font-bold
                        text-white
                        shadow-sm
                        transition-all
                        duration-200
                        hover:bg-primary-hover
                        hover:-translate-y-0.5
                      "
                    >
                      <span>Start filing</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    <button
                      type="button"
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-border
                        bg-white
                        text-text-muted
                        transition-all
                        duration-200
                        hover:border-primary
                        hover:text-primary
                      "
                      aria-label="More options"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* =====================================================
          LEGEND / INFO CARD
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            label: "Overdue",
            description: "Past the deadline",
            color: "bg-rose-500",
            bg: "bg-rose-50",
            border: "border-rose-200",
          },
          {
            label: "High priority",
            description: "Due within 14 days",
            color: "bg-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-200",
          },
          {
            label: "Medium priority",
            description: "Due within 30 days",
            color: "bg-blue-500",
            bg: "bg-blue-50",
            border: "border-blue-200",
          },
          {
            label: "Low priority",
            description: "More than 30 days",
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
              <p className="text-xs font-bold text-heading">
                {item.label}
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                {item.description}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* =====================================================
          BOTTOM CTA BANNER
      ====================================================== */}

      <div className="relative overflow-hidden rounded-xl border border-primary-soft bg-gradient-to-r from-primary-light via-primary-soft to-primary-light p-6 sm:p-7">

        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Bell className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                Never miss a deadline
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                Enable automatic reminders
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Get email and SMS notifications before every filing deadline.
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
            <Bell className="h-3.5 w-3.5" />
            <span>Set up reminders</span>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrganizationDeadline;