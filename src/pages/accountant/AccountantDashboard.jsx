import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  Clock,
  AlertCircle,
  FileText,
  UserCheck,
  Plus,
  Search,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Activity,
  TrendingUp,
  Bell,
  MessageSquare,
  Sparkles,
  Filter,
} from "lucide-react";

const AccountantDashboard = () => {
  /* ============================================================
     STATE
  ============================================================ */

  const [clientFilter, setClientFilter] = useState("All Clients");
  const [periodFilter, setPeriodFilter] = useState("This Month");
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  /* ============================================================
     GREETING
  ============================================================ */

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const user = { firstName: "John" };

  /* ============================================================
     STATS — 6 CARDS
  ============================================================ */

  const stats = [
    {
      id: "clients",
      label: "Total Clients",
      value: 42,
      change: "+3 this month",
      changeType: "up",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      path: "/accountant/clients",
    },
    {
      id: "companies",
      label: "Companies",
      value: 68,
      change: "Across 42 clients",
      changeType: "neutral",
      icon: Building2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/accountant/companies",
    },
    {
      id: "due-soon",
      label: "Due Soon",
      value: 8,
      change: "Next 30 days",
      changeType: "warning",
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      path: "/accountant/deadlines",
      highlight: true,
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 3,
      change: "Requires attention",
      changeType: "danger",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      path: "/accountant/deadlines?filter=overdue",
      highlight: true,
    },
    {
      id: "in-progress",
      label: "In Progress",
      value: 12,
      change: "Active filings",
      changeType: "neutral",
      icon: FileText,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      path: "/accountant/filings",
    },
    {
      id: "awaiting",
      label: "Awaiting Client",
      value: 7,
      change: "Documents / approval",
      changeType: "neutral",
      icon: UserCheck,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      path: "/accountant/tasks",
    },
  ];

  /* ============================================================
     URGENT DEADLINES
  ============================================================ */

  const urgentDeadlines = [
    {
      id: 1,
      client: "IMPERIAL THERMAL LTD",
      companyNumber: "14803890",
      filing: "VAT Return (Q3)",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      owner: "Alice J.",
    },
    {
      id: 2,
      client: "DIGITAL SOLUTIONS LTD",
      companyNumber: "99887766",
      filing: "Corporation Tax (CT600)",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      urgency: "high",
      owner: "John S.",
    },
    {
      id: 3,
      client: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
      filing: "Confirmation Statement",
      dueDate: "12 Oct 2026",
      daysLeft: 10,
      urgency: "medium",
      owner: "Sarah M.",
    },
    {
      id: 4,
      client: "GREEN TECH LTD",
      companyNumber: "07895432",
      filing: "Annual Accounts",
      dueDate: "18 Oct 2026",
      daysLeft: 16,
      urgency: "medium",
      owner: "Alice J.",
    },
    {
      id: 5,
      client: "BRIGHT IDEAS LTD",
      companyNumber: "11223344",
      filing: "Self Assessment",
      dueDate: "31 Jan 2027",
      daysLeft: 121,
      urgency: "low",
      owner: "John S.",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "VAT return submitted",
      description: "IMPERIAL THERMAL LTD · Q2 2026",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: 2,
      title: "Client uploaded documents",
      description: "SKIL FOUR LIMITED · 4 files",
      time: "5 hours ago",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "New client added",
      description: "GREEN TECH LTD",
      time: "1 day ago",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Awaiting approval",
      description: "BRIGHT IDEAS LTD · CT600 draft",
      time: "2 days ago",
      icon: UserCheck,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  /* ============================================================
     TEAM WORKLOAD
  ============================================================ */

  const teamWorkload = [
    {
      id: 1,
      name: "Alice Johnson",
      initials: "AJ",
      role: "Senior Accountant",
      activeTasks: 14,
      color: "bg-[#087F5B]",
    },
    {
      id: 2,
      name: "John Smith",
      initials: "JS",
      role: "Accountant",
      activeTasks: 11,
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Sarah Martin",
      initials: "SM",
      role: "Accountant",
      activeTasks: 9,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "David Chen",
      initials: "DC",
      role: "Junior Accountant",
      activeTasks: 6,
      color: "bg-amber-500",
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const clientOptions = [
    "All Clients",
    "Active Only",
    "With Overdue",
    "New This Month",
  ];

  const periodOptions = [
    "This Month",
    "This Quarter",
    "This Year",
    "Last 30 Days",
  ];

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
          dot: "bg-rose-500",
        };
      case "high":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      case "medium":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
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

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          WELCOME HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
            {getGreeting()}, {user.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Here's what's happening across your clients today.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <Link
            to="/accountant/clients/new"
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
              hover:bg-[#E8F8F2]
              hover:text-[#087F5B]
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            <span>Add Client</span>
          </Link>

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
            <FileText className="h-4 w-4" strokeWidth={2.4} />
            <span>Start Filing</span>
          </Link>
        </div>
      </div>

      {/* ======================================================
          FILTERS
      ====================================================== */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Client filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowClientDropdown((prev) => !prev);
              setShowPeriodDropdown(false);
            }}
            className="
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
            <Users className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
            <span>{clientFilter}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-[#687B78] transition-transform duration-200 ${
                showClientDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showClientDropdown && (
            <div className="absolute left-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
              {clientOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setClientFilter(option);
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
                      clientFilter === option
                        ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                        : "text-[#09263A]"
                    }
                  `}
                >
                  <span>{option}</span>
                  {clientFilter === option && (
                    <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Period filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowPeriodDropdown((prev) => !prev);
              setShowClientDropdown(false);
            }}
            className="
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
            <CalendarClock className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
            <span>{periodFilter}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-[#687B78] transition-transform duration-200 ${
                showPeriodDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showPeriodDropdown && (
            <div className="absolute left-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
              {periodOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPeriodFilter(option);
                    setShowPeriodDropdown(false);
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
                      periodFilter === option
                        ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                        : "text-[#09263A]"
                    }
                  `}
                >
                  <span>{option}</span>
                  {periodFilter === option && (
                    <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          STATS CARDS (6)
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.id}
              to={stat.path}
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
                  stat.highlight && stat.id === "overdue"
                    ? "border-rose-200"
                    : stat.highlight && stat.id === "due-soon"
                    ? "border-amber-200"
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

              <p
                className={`
                  mt-3 text-[10px] font-semibold
                  ${
                    stat.changeType === "danger"
                      ? "text-rose-600"
                      : stat.changeType === "warning"
                      ? "text-amber-600"
                      : stat.changeType === "up"
                      ? "text-emerald-600"
                      : "text-[#687B78]"
                  }
                `}
              >
                {stat.change}
              </p>

              {/* Hover indicator */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-0.5
                  w-0
                  bg-[#087F5B]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </Link>
          );
        })}
      </div>

      {/* ======================================================
          URGENT DEADLINES + RECENT ACTIVITY
      ====================================================== */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* ================================================
            URGENT DEADLINES (2/3)
        ================================================ */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                <CalendarClock
                  className="h-4 w-4 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#09263A]">
                  Urgent Deadlines
                </h2>
                <p className="text-[10px] text-[#687B78]">
                  Next filings across all clients
                </p>
              </div>
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                {urgentDeadlines.filter((d) => d.daysLeft <= 7).length} urgent
              </span>
            </div>

            <Link
              to="/accountant/deadlines"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#087F5B] hover:text-[#005E45]"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Deadline list */}
          <div className="divide-y divide-[#DDEAE6]">
            {urgentDeadlines.map((deadline) => {
              const styles = getUrgencyStyles(deadline.urgency);

              return (
                <div
                  key={deadline.id}
                  className="
                    group
                    flex
                    flex-col
                    gap-3
                    px-5
                    py-4
                    transition-colors
                    hover:bg-[#F5FCF9]
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* Left */}
                  <div className="flex min-w-0 flex-1 items-start gap-3">
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
                        ${styles.bg}
                        ${styles.border}
                      `}
                    >
                      <FileText
                        className={`h-4 w-4 ${styles.text}`}
                        strokeWidth={2.2}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-bold text-[#09263A]">
                          {deadline.client}
                        </p>
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1
                            rounded-full
                            px-2
                            py-0.5
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            ${styles.bg}
                            ${styles.text}
                          `}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${styles.dot}`}
                          />
                          {deadline.daysLeft < 0 ? "Overdue" : deadline.filing}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#687B78]">
                        <span className="font-mono">
                          #{deadline.companyNumber}
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span>{deadline.filing}</span>
                        <span className="hidden sm:inline">·</span>
                        <span>Owner: {deadline.owner}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex shrink-0 items-center gap-4 pl-13 sm:pl-0">
                    <div className="text-right">
                      <p className="text-xs font-bold text-[#09263A]">
                        {deadline.dueDate}
                      </p>
                      <p className={`mt-0.5 text-[10px] font-bold ${styles.text}`}>
                        {getDaysLabel(deadline.daysLeft)}
                      </p>
                    </div>

                    <Link
                      to={`/accountant/filings/new?client=${deadline.companyNumber}`}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-lg
                        bg-[#087F5B]
                        px-3
                        py-2
                        text-[10px]
                        font-bold
                        text-white
                        shadow-sm
                        transition-all
                        duration-200
                        hover:bg-[#005E45]
                        hover:-translate-y-0.5
                      "
                    >
                      <span>File</span>
                      <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================
            RECENT ACTIVITY (1/3)
        ================================================ */}
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#DDEAE6] px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                <Activity
                  className="h-4 w-4 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <h2 className="text-sm font-bold text-[#09263A]">
                Recent Activity
              </h2>
            </div>

            <Link
              to="/accountant/activity"
              className="text-[10px] font-semibold text-[#087F5B] hover:text-[#005E45]"
            >
              View all
            </Link>
          </div>

          {/* Activity list */}
          <div className="divide-y divide-[#DDEAE6]">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-[#F5FCF9]"
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
                    <p className="truncate text-xs font-bold text-[#09263A]">
                      {activity.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-[10px] text-[#687B78]">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================
          TEAM WORKLOAD + QUICK LINKS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* ================================================
            TEAM WORKLOAD (2/3)
        ================================================ */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex items-center justify-between border-b border-[#DDEAE6] px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                <Users
                  className="h-4 w-4 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#09263A]">
                  Team Workload
                </h2>
                <p className="text-[10px] text-[#687B78]">
                  Active tasks per team member
                </p>
              </div>
            </div>

            <Link
              to="/accountant/team"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#087F5B] hover:text-[#005E45]"
            >
              <span>Manage</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#DDEAE6]">
            {teamWorkload.map((member) => {
              const maxTasks = Math.max(...teamWorkload.map((m) => m.activeTasks));
              const percentage = (member.activeTasks / maxTasks) * 100;

              return (
                <div
                  key={member.id}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#F5FCF9]"
                >
                  {/* Avatar */}
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-xs
                      font-bold
                      text-white
                      ${member.color}
                    `}
                  >
                    {member.initials}
                  </div>

                  {/* Info + bar */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#09263A]">
                          {member.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#687B78]">
                          {member.role}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-[#09263A]">
                        {member.activeTasks} tasks
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F5]">
                      <div
                        className="h-full rounded-full bg-[#087F5B] transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================
            QUICK LINKS / SHORTCUTS (1/3)
        ================================================ */}
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
              <Sparkles
                className="h-4 w-4 text-[#087F5B]"
                strokeWidth={2.2}
              />
            </div>
            <h2 className="text-sm font-bold text-[#09263A]">
              Quick Links
            </h2>
          </div>

          <div className="space-y-1 p-2">
            {[
              { label: "All Clients", icon: Users, path: "/accountant/clients" },
              { label: "Companies", icon: Building2, path: "/accountant/companies" },
              { label: "All Filings", icon: FileText, path: "/accountant/filings" },
              { label: "Tasks", icon: CheckCircle2, path: "/accountant/tasks" },
              { label: "Documents", icon: FileText, path: "/accountant/documents" },
              { label: "Billing", icon: TrendingUp, path: "/accountant/billing" },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-xs
                    font-semibold
                    text-[#09263A]
                    transition-colors
                    hover:bg-[#E8F8F2]
                    hover:text-[#087F5B]
                  "
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5FCF9] text-[#687B78] transition-colors group-hover:bg-[#087F5B] group-hover:text-white">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="flex-1">{link.label}</span>
                  <ArrowRight className="h-3 w-3 text-[#687B78] transition-all group-hover:translate-x-0.5 group-hover:text-[#087F5B]" />
                </Link>
              );
            })}
          </div>
        </div>
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
                Never miss a filing
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Enable client deadline alerts
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Get notified before every client deadline. Customise reminders
                per client or per filing type.
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
            <span>Set up alerts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantDashboard;