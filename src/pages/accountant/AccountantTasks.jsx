import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckSquare,
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
  Flag,
  MessageSquare,
  Edit3,
  Trash2,
  Check,
  Circle,
  LayoutGrid,
  List,
  User,
  Briefcase,
} from "lucide-react";

const AccountantTasks = () => {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [viewMode, setViewMode] = useState("list"); // "list" | "board"
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "all",
      label: "All Tasks",
      value: 42,
      change: "This period",
      icon: CheckSquare,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 5,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      highlight: true,
      highlightColor: "border-rose-200",
    },
    {
      id: "in-progress",
      label: "In Progress",
      value: 12,
      change: "Currently active",
      icon: Timer,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "completed",
      label: "Completed",
      value: 24,
      change: "This week",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "awaiting",
      label: "Awaiting Client",
      value: 6,
      change: "Pending input",
      icon: UserCheck,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  /* ============================================================
     TASKS DATA
  ============================================================ */

  const tasks = [
    {
      id: 1,
      title: "Review Q3 VAT return figures",
      description:
        "Check VAT boxes 1-9 against bank statements and sales reports.",
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      status: "In Progress",
      priority: "high",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      assignee: "Alice Johnson",
      assigneeInitials: "AJ",
      assigneeColor: "bg-[#087F5B]",
      tags: ["VAT", "Q3"],
      subtasks: { completed: 3, total: 5 },
      comments: 4,
    },
    {
      id: 2,
      title: "Prepare CT600 draft for client review",
      description:
        "Complete Corporation Tax return draft and send for approval.",
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      client: "Digital Solutions Ltd",
      clientId: 4,
      status: "In Progress",
      priority: "high",
      dueDate: "03 Oct 2026",
      daysLeft: 1,
      assignee: "John Smith",
      assigneeInitials: "JS",
      assigneeColor: "bg-blue-500",
      tags: ["CT600", "Tax"],
      subtasks: { completed: 2, total: 4 },
      comments: 2,
    },
    {
      id: 3,
      title: "Chase missing bank statements",
      description:
        "Client has not uploaded September bank statements yet.",
      company: "Skil Four Ltd",
      companyNumber: "05513948",
      client: "Skil Four Ltd",
      clientId: 3,
      status: "Awaiting Client",
      priority: "high",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      assignee: "Sarah Martin",
      assigneeInitials: "SM",
      assigneeColor: "bg-purple-500",
      tags: ["Documents", "Follow-up"],
      subtasks: { completed: 0, total: 2 },
      comments: 6,
    },
    {
      id: 4,
      title: "Complete confirmation statement",
      description: "Review and file CS01 for the annual update.",
      company: "Green Tech Ltd",
      companyNumber: "07895432",
      client: "Green Tech Ltd",
      clientId: 2,
      status: "In Progress",
      priority: "medium",
      dueDate: "10 Oct 2026",
      daysLeft: 8,
      assignee: "Alice Johnson",
      assigneeInitials: "AJ",
      assigneeColor: "bg-[#087F5B]",
      tags: ["CS01", "Annual"],
      subtasks: { completed: 1, total: 3 },
      comments: 1,
    },
    {
      id: 5,
      title: "Reconcile year-end accounts",
      description:
        "Complete reconciliation for FY 2025/26 annual accounts.",
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      status: "Not Started",
      priority: "medium",
      dueDate: "15 Oct 2026",
      daysLeft: 13,
      assignee: "Unassigned",
      assigneeInitials: "?",
      assigneeColor: "bg-gray-400",
      tags: ["Accounts", "Year-end"],
      subtasks: { completed: 0, total: 6 },
      comments: 0,
    },
    {
      id: 6,
      title: "File Q3 VAT return with HMRC",
      description: "Submit final VAT return once client approval is received.",
      company: "Sunrise Trading Ltd",
      companyNumber: "44556677",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      status: "Not Started",
      priority: "medium",
      dueDate: "07 Nov 2026",
      daysLeft: 36,
      assignee: "John Smith",
      assigneeInitials: "JS",
      assigneeColor: "bg-blue-500",
      tags: ["VAT", "HMRC"],
      subtasks: { completed: 0, total: 2 },
      comments: 0,
    },
    {
      id: 7,
      title: "Review self assessment draft",
      description: "Check personal tax return figures for accuracy.",
      company: "Bright Ideas Ltd",
      companyNumber: "11223344",
      client: "Bright Ideas Ltd",
      clientId: 5,
      status: "Awaiting Client",
      priority: "low",
      dueDate: "31 Jan 2027",
      daysLeft: 121,
      assignee: "Sarah Martin",
      assigneeInitials: "SM",
      assigneeColor: "bg-purple-500",
      tags: ["Self Assessment"],
      subtasks: { completed: 2, total: 3 },
      comments: 3,
    },
    {
      id: 8,
      title: "Send quarterly summary to client",
      description: "Prepare and send Q3 financial summary.",
      company: "Ocean View Ltd",
      companyNumber: "66778899",
      client: "Ocean View Ltd",
      clientId: 6,
      status: "Completed",
      priority: "low",
      dueDate: "25 Sep 2026",
      daysLeft: -7,
      assignee: "Alice Johnson",
      assigneeInitials: "AJ",
      assigneeColor: "bg-[#087F5B]",
      tags: ["Reporting", "Q3"],
      subtasks: { completed: 3, total: 3 },
      comments: 2,
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
    { value: "Completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "All", label: "All Priorities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const assigneeOptions = [
    { value: "All", label: "All Assignees" },
    { value: "Alice Johnson", label: "Alice Johnson" },
    { value: "John Smith", label: "John Smith" },
    { value: "Sarah Martin", label: "Sarah Martin" },
    { value: "Unassigned", label: "Unassigned" },
  ];

  /* ============================================================
     FILTERED TASKS
  ============================================================ */

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${task.title} ${task.company} ${task.companyNumber} ${task.client}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      const matchesAssignee =
        assigneeFilter === "All" || task.assignee === assigneeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee
      );
    });
  }, [tasks, search, statusFilter, priorityFilter, assigneeFilter]);

  /* ============================================================
     GROUPED TASKS (for board view)
  ============================================================ */

  const groupedTasks = useMemo(() => {
    return {
      "Not Started": filteredTasks.filter((t) => t.status === "Not Started"),
      "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
      "Awaiting Client": filteredTasks.filter(
        (t) => t.status === "Awaiting Client"
      ),
      Completed: filteredTasks.filter((t) => t.status === "Completed"),
    };
  }, [filteredTasks]);

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
    setPriorityFilter("All");
    setAssigneeFilter("All");
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    assigneeFilter !== "All";

  /* ============================================================
     HELPERS
  ============================================================ */

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          dot: "bg-rose-500",
          border: "border-l-rose-500",
          label: "High",
        };
      case "medium":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
          border: "border-l-amber-500",
          label: "Medium",
        };
      default:
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          border: "border-l-emerald-500",
          label: "Low",
        };
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
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
      case "Not Started":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          dot: "bg-gray-500",
          icon: Circle,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
          icon: Circle,
        };
    }
  };

  const getDaysLabel = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  const getDaysColor = (days) => {
    if (days < 0) return "text-rose-600";
    if (days <= 3) return "text-amber-600";
    if (days <= 7) return "text-blue-600";
    return "text-emerald-600";
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
            Tasks
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage workflow tasks across your client portfolio
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

          <Link
            to="/accountant/tasks/new"
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
            <span>Add Task</span>
          </Link>
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
          FILTERS + VIEW TOGGLE
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
              placeholder="Search tasks, companies or clients..."
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
                setShowPriorityDropdown(false);
                setShowAssigneeDropdown(false);
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

          {/* Priority filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowPriorityDropdown((prev) => !prev);
                setShowStatusDropdown(false);
                setShowAssigneeDropdown(false);
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
                {priorityOptions.find((o) => o.value === priorityFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showPriorityDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showPriorityDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setPriorityFilter(option.value);
                      setShowPriorityDropdown(false);
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
                        priorityFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {priorityFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignee filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowAssigneeDropdown((prev) => !prev);
                setShowStatusDropdown(false);
                setShowPriorityDropdown(false);
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
                {assigneeOptions.find((o) => o.value === assigneeFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showAssigneeDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showAssigneeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {assigneeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setAssigneeFilter(option.value);
                      setShowAssigneeDropdown(false);
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
                        assigneeFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {assigneeFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
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

          {/* View toggle */}
          <div className="hidden rounded-lg border border-[#DDEAE6] bg-white p-1 lg:flex">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-3
                py-1.5
                text-xs
                font-bold
                transition-all
                ${
                  viewMode === "list"
                    ? "bg-[#087F5B] text-white"
                    : "text-[#687B78] hover:bg-[#F5FCF9]"
                }
              `}
            >
              <List className="h-3.5 w-3.5" strokeWidth={2.4} />
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("board")}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-3
                py-1.5
                text-xs
                font-bold
                transition-all
                ${
                  viewMode === "board"
                    ? "bg-[#087F5B] text-white"
                    : "text-[#687B78] hover:bg-[#F5FCF9]"
                }
              `}
            >
              <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2.4} />
              Board
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          LIST VIEW
      ====================================================== */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare
                className="h-4 w-4 text-[#087F5B]"
                strokeWidth={2.2}
              />
              <h2 className="text-sm font-bold text-[#09263A]">
                All Tasks
              </h2>
              <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                {filteredTasks.length}
              </span>
            </div>
            <p className="text-[11px] text-[#687B78]">
              Sorted by priority and deadline
            </p>
          </div>

          {/* Tasks list */}
          {filteredTasks.length > 0 ? (
            <div className="divide-y divide-[#DDEAE6]">
              {filteredTasks.map((task) => {
                const priority = getPriorityStyles(task.priority);
                const status = getStatusStyles(task.status);
                const StatusIcon = status.icon;

                return (
                  <div
                    key={task.id}
                    onClick={() =>
                      navigate(`/accountant/tasks/${task.id}`)
                    }
                    className={`
                      group
                      cursor-pointer
                      border-l-4
                      px-5
                      py-4
                      transition-colors
                      hover:bg-[#F5FCF9]
                      ${priority.border}
                      ${task.status === "Completed" ? "opacity-60" : ""}
                    `}
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      {/* Left: Checkbox + Title */}
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          className={`
                            mt-0.5
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            border-2
                            transition-all
                            ${
                              task.status === "Completed"
                                ? "border-[#087F5B] bg-[#087F5B]"
                                : "border-[#DDEAE6] hover:border-[#087F5B]"
                            }
                          `}
                        >
                          {task.status === "Completed" && (
                            <Check
                              className="h-3 w-3 text-white"
                              strokeWidth={3}
                            />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          {/* Title row */}
                          <div className="flex flex-wrap items-center gap-2">
                            <p
                              className={`
                                truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]
                                ${
                                  task.status === "Completed"
                                    ? "line-through"
                                    : ""
                                }
                              `}
                            >
                              {task.title}
                            </p>

                            {/* Priority badge */}
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
                                ${priority.bg}
                                ${priority.text}
                              `}
                            >
                              <Flag className="h-2.5 w-2.5" strokeWidth={3} />
                              {priority.label}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="mt-1 line-clamp-1 text-xs text-[#687B78]">
                            {task.description}
                          </p>

                          {/* Meta row */}
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#687B78]">
                            <Link
                              to={`/accountant/companies/${task.companyNumber}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 font-semibold transition-colors hover:text-[#087F5B]"
                            >
                              <Building2
                                className="h-3 w-3"
                                strokeWidth={2.2}
                              />
                              <span className="truncate max-w-[160px]">
                                {task.company}
                              </span>
                            </Link>

                            {/* Tags */}
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-[#F5FCF9] px-2 py-0.5 text-[9px] font-semibold text-[#687B78]"
                              >
                                #{tag}
                              </span>
                            ))}

                            {/* Subtasks */}
                            {task.subtasks.total > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <CheckCircle2
                                  className="h-3 w-3"
                                  strokeWidth={2.2}
                                />
                                {task.subtasks.completed}/
                                {task.subtasks.total}
                              </span>
                            )}

                            {/* Comments */}
                            {task.comments > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <MessageSquare
                                  className="h-3 w-3"
                                  strokeWidth={2.2}
                                />
                                {task.comments}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Status + Assignee + Due + Actions */}
                      <div
                        className="flex flex-wrap items-center gap-3 pl-8 lg:pl-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Status */}
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
                            ${status.bg}
                            ${status.text}
                          `}
                        >
                          <StatusIcon
                            className="h-3 w-3"
                            strokeWidth={2.4}
                          />
                          {task.status}
                        </span>

                        {/* Due date */}
                        <div className="text-right">
                          <p className="text-[11px] font-bold text-[#09263A]">
                            {task.dueDate}
                          </p>
                          <p
                            className={`mt-0.5 text-[10px] font-bold ${getDaysColor(
                              task.daysLeft
                            )}`}
                          >
                            {getDaysLabel(task.daysLeft)}
                          </p>
                        </div>

                        {/* Assignee */}
                        <div
                          className={`
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-[10px]
                            font-bold
                            text-white
                            ${task.assigneeColor}
                          `}
                          title={task.assignee}
                        >
                          {task.assigneeInitials}
                        </div>

                        {/* Menu */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowMenu(
                                openRowMenu === task.id ? null : task.id
                              )
                            }
                            className="
                              flex
                              h-8
                              w-8
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

                          {openRowMenu === task.id && (
                            <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Eye className="h-3.5 w-3.5" />
                                <span>View details</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit task</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <UserCheck className="h-3.5 w-3.5" />
                                <span>Reassign</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Send className="h-3.5 w-3.5" />
                                <span>Send reminder</span>
                              </button>
                              <div className="my-1 border-t border-[#DDEAE6]" />
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Delete task</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <CheckSquare
                  className="h-7 w-7 text-[#087F5B]"
                  strokeWidth={2}
                />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No tasks found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                {hasActiveFilters
                  ? "Try adjusting your search or filters."
                  : "Create your first task to get started."}
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
      )}

      {/* ======================================================
          BOARD VIEW
      ====================================================== */}
      {viewMode === "board" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(groupedTasks).map(([status, tasksInColumn]) => {
            const statusStyles = getStatusStyles(status);
            const StatusIcon = statusStyles.icon;

            return (
              <div
                key={status}
                className="flex flex-col rounded-xl border border-[#DDEAE6] bg-[#F5FCF9]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between gap-2 border-b border-[#DDEAE6] bg-white px-4 py-3 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <StatusIcon
                      className={`h-4 w-4 ${statusStyles.text}`}
                      strokeWidth={2.4}
                    />
                    <h3 className="text-xs font-bold text-[#09263A]">
                      {status}
                    </h3>
                  </div>
                  <span
                    className={`
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      font-bold
                      ${statusStyles.bg}
                      ${statusStyles.text}
                    `}
                  >
                    {tasksInColumn.length}
                  </span>
                </div>

                {/* Tasks column */}
                <div className="flex-1 space-y-2 overflow-y-auto p-3">
                  {tasksInColumn.map((task) => {
                    const priority = getPriorityStyles(task.priority);

                    return (
                      <div
                        key={task.id}
                        onClick={() =>
                          navigate(`/accountant/tasks/${task.id}`)
                        }
                        className={`
                          cursor-pointer
                          rounded-lg
                          border
                          border-[#DDEAE6]
                          border-l-4
                          bg-white
                          p-3
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:shadow-md
                          ${priority.border}
                          ${task.status === "Completed" ? "opacity-60" : ""}
                        `}
                      >
                        {/* Title + priority */}
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`
                              line-clamp-2 text-xs font-bold text-[#09263A]
                              ${task.status === "Completed" ? "line-through" : ""}
                            `}
                          >
                            {task.title}
                          </p>
                          <span
                            className={`
                              inline-flex
                              h-4
                              w-4
                              shrink-0
                              items-center
                              justify-center
                              rounded
                              ${priority.bg}
                              ${priority.text}
                            `}
                            title={`${priority.label} priority`}
                          >
                            <Flag className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                        </div>

                        {/* Company */}
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-[#687B78]">
                          <Building2 className="h-3 w-3" strokeWidth={2.2} />
                          <span className="truncate">{task.company}</span>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 flex items-center justify-between gap-2">
                          {/* Due */}
                          <span
                            className={`text-[10px] font-bold ${getDaysColor(task.daysLeft)}`}
                          >
                            {getDaysLabel(task.daysLeft)}
                          </span>

                          {/* Assignee */}
                          <div
                            className={`
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              text-[9px]
                              font-bold
                              text-white
                              ${task.assigneeColor}
                            `}
                            title={task.assignee}
                          >
                            {task.assigneeInitials}
                          </div>
                        </div>

                        {/* Subtasks + comments progress */}
                        {(task.subtasks.total > 0 || task.comments > 0) && (
                          <div className="mt-3 flex items-center gap-3 border-t border-[#DDEAE6] pt-2 text-[10px] text-[#687B78]">
                            {task.subtasks.total > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <CheckCircle2
                                  className="h-3 w-3"
                                  strokeWidth={2.2}
                                />
                                {task.subtasks.completed}/
                                {task.subtasks.total}
                              </span>
                            )}
                            {task.comments > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <MessageSquare
                                  className="h-3 w-3"
                                  strokeWidth={2.2}
                                />
                                {task.comments}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {tasksInColumn.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#DDEAE6] bg-white/50 px-3 py-6 text-center">
                      <p className="text-[10px] font-semibold text-[#687B78]">
                        No tasks
                      </p>
                    </div>
                  )}

                  {/* Add task button */}
                  <button
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      border-2
                      border-dashed
                      border-[#DDEAE6]
                      bg-white/50
                      px-3
                      py-2
                      text-[10px]
                      font-semibold
                      text-[#687B78]
                      transition-all
                      duration-200
                      hover:border-[#087F5B]
                      hover:bg-white
                      hover:text-[#087F5B]
                    "
                  >
                    <Plus className="h-3 w-3" strokeWidth={2.6} />
                    Add task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                Boost productivity
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Automate routine tasks
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Create task templates for recurring work and assign them
                automatically to team members.
              </p>
            </div>
          </div>

          <Link
            to="/accountant/tasks/templates"
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
            <span>Task templates</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantTasks;