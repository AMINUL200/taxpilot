import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Eye,
  MoreVertical,
  Edit3,
  Archive,
  Mail,
  Phone,
  Calendar,
  Building2,
  Briefcase,
  Shield,
  Crown,
  UserCog,
  Star,
  Check,
  CheckCircle2,
  Clock3,
  AlertCircle,
  TrendingUp,
  Download,
  RefreshCw,
  Send,
  UserCheck,
  Trash2,
  Key,
  Copy,
  Activity,
  Target,
  BarChart3,
  Zap,
  Layers,
  User,
  Settings,
  Plus,
  X,
  MessageSquare,
  Award,
  MapPin,
  Globe,
} from "lucide-react";

const AccountantTeam = () => {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "total",
      label: "Team Members",
      value: 8,
      change: "of 10 seats",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "active",
      label: "Active",
      value: 7,
      change: "87.5% of total",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "pending",
      label: "Pending Invites",
      value: 1,
      change: "Awaiting acceptance",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "workload",
      label: "Avg. Workload",
      value: "12",
      change: "Tasks per member",
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  /* ============================================================
     TEAM DATA
  ============================================================ */

  const team = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@taxpilot.co.uk",
      phone: "+44 20 7946 0958",
      role: "Owner",
      title: "Senior Accountant",
      status: "Active",
      initials: "AJ",
      avatarColor: "bg-[#087F5B]",
      joinedDate: "15 Jan 2023",
      lastActive: "Today",
      location: "London, UK",
      clients: 18,
      activeTasks: 14,
      completedThisMonth: 22,
      specialities: ["VAT", "CT600", "Advisory"],
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@taxpilot.co.uk",
      phone: "+44 20 7946 0123",
      role: "Admin",
      title: "Accountant",
      status: "Active",
      initials: "JS",
      avatarColor: "bg-blue-500",
      joinedDate: "20 Mar 2023",
      lastActive: "2 hours ago",
      location: "Manchester, UK",
      clients: 12,
      activeTasks: 11,
      completedThisMonth: 18,
      specialities: ["Self Assessment", "Payroll"],
    },
    {
      id: 3,
      name: "Sarah Martin",
      email: "sarah@taxpilot.co.uk",
      phone: "+44 20 7946 0456",
      role: "Accountant",
      title: "Accountant",
      status: "Active",
      initials: "SM",
      avatarColor: "bg-purple-500",
      joinedDate: "05 Jun 2023",
      lastActive: "Today",
      location: "Birmingham, UK",
      clients: 9,
      activeTasks: 9,
      completedThisMonth: 15,
      specialities: ["Accounts", "Bookkeeping"],
    },
    {
      id: 4,
      name: "David Chen",
      email: "david@taxpilot.co.uk",
      phone: "+44 20 7946 0789",
      role: "Junior Accountant",
      title: "Junior Accountant",
      status: "Active",
      initials: "DC",
      avatarColor: "bg-amber-500",
      joinedDate: "12 Aug 2024",
      lastActive: "1 hour ago",
      location: "London, UK",
      clients: 5,
      activeTasks: 6,
      completedThisMonth: 10,
      specialities: ["Bookkeeping"],
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma@taxpilot.co.uk",
      phone: "+44 20 7946 0321",
      role: "Accountant",
      title: "Accountant",
      status: "Active",
      initials: "EW",
      avatarColor: "bg-rose-500",
      joinedDate: "22 Oct 2024",
      lastActive: "3 hours ago",
      location: "Leeds, UK",
      clients: 8,
      activeTasks: 7,
      completedThisMonth: 12,
      specialities: ["VAT", "Payroll"],
    },
    {
      id: 6,
      name: "Michael Brown",
      email: "michael@taxpilot.co.uk",
      phone: "+44 20 7946 0654",
      role: "Junior Accountant",
      title: "Junior Accountant",
      status: "Active",
      initials: "MB",
      avatarColor: "bg-cyan-500",
      joinedDate: "15 Jan 2025",
      lastActive: "Yesterday",
      location: "Bristol, UK",
      clients: 4,
      activeTasks: 5,
      completedThisMonth: 8,
      specialities: ["Bookkeeping"],
    },
    {
      id: 7,
      name: "Laura Taylor",
      email: "laura@taxpilot.co.uk",
      phone: "+44 20 7946 0987",
      role: "Accountant",
      title: "Accountant",
      status: "Active",
      initials: "LT",
      avatarColor: "bg-indigo-500",
      joinedDate: "03 Apr 2025",
      lastActive: "5 hours ago",
      location: "Edinburgh, UK",
      clients: 6,
      activeTasks: 8,
      completedThisMonth: 11,
      specialities: ["CT600", "Advisory"],
    },
    {
      id: 8,
      name: "James Mitchell",
      email: "james@taxpilot.co.uk",
      phone: "+44 20 7946 0147",
      role: "Accountant",
      title: "Accountant",
      status: "Pending",
      initials: "JM",
      avatarColor: "bg-teal-500",
      joinedDate: "22 Sep 2026",
      lastActive: "Invite sent",
      location: "London, UK",
      clients: 0,
      activeTasks: 0,
      completedThisMonth: 0,
      specialities: [],
      invitePending: true,
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const roleOptions = [
    { value: "All", label: "All Roles" },
    { value: "Owner", label: "Owner" },
    { value: "Admin", label: "Admin" },
    { value: "Accountant", label: "Accountant" },
    { value: "Junior Accountant", label: "Junior Accountant" },
  ];

  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
  ];

  /* ============================================================
     FILTERED TEAM
  ============================================================ */

  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${member.name} ${member.email} ${member.title} ${member.role}`
          .toLowerCase()
          .includes(query);

      const matchesRole = roleFilter === "All" || member.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [team, search, roleFilter, statusFilter]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

  const hasActiveFilters =
    search || roleFilter !== "All" || statusFilter !== "All";

  /* ============================================================
     HELPERS
  ============================================================ */

  const getRoleStyles = (role) => {
    switch (role) {
      case "Owner":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: Crown,
        };
      case "Admin":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: Shield,
        };
      case "Accountant":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          icon: UserCheck,
        };
      case "Junior Accountant":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          icon: User,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          icon: User,
        };
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        };
      case "Pending":
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
            Team
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage your practice team members and permissions
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
            <Shield className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Permissions</span>
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
            <UserPlus className="h-4 w-4" strokeWidth={2.4} />
            <span>Invite Member</span>
          </button>
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
          SEATS USAGE BANNER
      ====================================================== */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
              Team seats
            </p>
            <p className="mt-1 text-sm font-bold text-[#09263A]">
              8 of 10 seats used
            </p>
            <p className="mt-0.5 text-xs text-[#687B78]">
              2 seats remaining on your Practice Pro plan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-2 w-32 overflow-hidden rounded-full bg-[#DDEAE6] sm:block">
            <div
              className="h-full rounded-full bg-[#087F5B] transition-all duration-500"
              style={{ width: "80%" }}
            />
          </div>
          <Link
            to="/accountant/settings"
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-lg
              bg-[#087F5B]
              px-4
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#005E45]
            "
          >
            <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Upgrade plan</span>
          </Link>
        </div>
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
              placeholder="Search team by name, email or role..."
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

          {/* Role filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowRoleDropdown((prev) => !prev);
                setShowStatusDropdown(false);
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
                <Shield className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
                <span>
                  {roleOptions.find((o) => o.value === roleFilter)?.label}
                </span>
              </div>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showRoleDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setRoleFilter(option.value);
                      setShowRoleDropdown(false);
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
                        roleFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {roleFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowRoleDropdown(false);
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
              <X className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span>Clear</span>
            </button>
          )}

          {/* View toggle */}
          <div className="hidden rounded-lg border border-[#DDEAE6] bg-white p-1 lg:flex">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
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
                  viewMode === "grid"
                    ? "bg-[#087F5B] text-white"
                    : "text-[#687B78] hover:bg-[#F5FCF9]"
                }
              `}
            >
              <Layers className="h-3.5 w-3.5" strokeWidth={2.4} />
              Cards
            </button>
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
              <Users className="h-3.5 w-3.5" strokeWidth={2.4} />
              List
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          TEAM - GRID VIEW
      ====================================================== */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeam.map((member) => {
            const roleStyles = getRoleStyles(member.role);
            const RoleIcon = roleStyles.icon;
            const statusStyles = getStatusStyles(member.status);

            return (
              <div
                key={member.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#DDEAE6]
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#087F5B]/30
                  hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]
                "
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 border-b border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2]/60 to-white p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-lg
                        font-bold
                        text-white
                        shadow-sm
                        ${member.avatarColor}
                      `}
                    >
                      {member.initials}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="truncate text-sm font-bold text-[#09263A]">
                        {member.name}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                        {member.title}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
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
                            ${roleStyles.bg}
                            ${roleStyles.text}
                          `}
                        >
                          <RoleIcon className="h-2.5 w-2.5" strokeWidth={2.6} />
                          {member.role}
                        </span>
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
                            ${statusStyles.bg}
                            ${statusStyles.text}
                          `}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${statusStyles.dot}`}
                          />
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenRowMenu(
                          openRowMenu === member.id ? null : member.id
                        )
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-white hover:text-[#087F5B]"
                      aria-label="More actions"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>

                    {openRowMenu === member.id && (
                      <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <Eye className="h-3.5 w-3.5" />
                          <span>View profile</span>
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit details</span>
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Send message</span>
                        </button>
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <Key className="h-3.5 w-3.5" />
                          <span>Reset password</span>
                        </button>
                        <div className="my-1 border-t border-[#DDEAE6]" />
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove member</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#687B78]">
                      <Mail
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={2.2}
                      />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#687B78]">
                      <MapPin
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={2.2}
                      />
                      <span className="truncate">{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#687B78]">
                      <Calendar
                        className="h-3.5 w-3.5 shrink-0"
                        strokeWidth={2.2}
                      />
                      <span>Joined {member.joinedDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] px-3 py-2.5">
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                        Clients
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[#09263A]">
                        {member.clients}
                      </p>
                    </div>
                    <div className="border-x border-[#DDEAE6] text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                        Tasks
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[#09263A]">
                        {member.activeTasks}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                        Done
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-[#09263A]">
                        {member.completedThisMonth}
                      </p>
                    </div>
                  </div>

                  {/* Specialities */}
                  {member.specialities.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                        Specialities
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {member.specialities.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-semibold text-[#087F5B]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/accountant/team/${member.id}`}
                      className="
                        inline-flex
                        flex-1
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        border
                        border-[#DDEAE6]
                        bg-white
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-[#09263A]
                        transition-all
                        duration-200
                        hover:border-[#087F5B]
                        hover:bg-[#E8F8F2]
                        hover:text-[#087F5B]
                      "
                    >
                      <Eye className="h-3 w-3" strokeWidth={2.4} />
                      View profile
                    </Link>
                    <button
                      type="button"
                      className="                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        bg-[#087F5B]
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#005E45]
                      "
                    >
                      <Send className="h-3 w-3" strokeWidth={2.6} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty state for grid */}
          {filteredTeam.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-[#DDEAE6] bg-white px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <Users className="h-7 w-7 text-[#087F5B]" strokeWidth={2} />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No team members found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                {hasActiveFilters
                  ? "Try adjusting your search or filters."
                  : "Invite your first team member to get started."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================
          TEAM - LIST VIEW
      ====================================================== */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
              <h2 className="text-sm font-bold text-[#09263A]">
                All Team Members
              </h2>
              <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                {filteredTeam.length}
              </span>
            </div>
            <p className="text-[11px] text-[#687B78]">
              Click a member to view details
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Member
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Role
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Location
                  </th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Clients
                  </th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Tasks
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
                {filteredTeam.map((member) => {
                  const roleStyles = getRoleStyles(member.role);
                  const RoleIcon = roleStyles.icon;
                  const statusStyles = getStatusStyles(member.status);

                  return (
                    <tr
                      key={member.id}
                      onClick={() =>
                        navigate(`/accountant/team/${member.id}`)
                      }
                      className="group cursor-pointer transition-colors hover:bg-[#F5FCF9]"
                    >
                      {/* Member */}
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
                              rounded-full
                              text-[11px]
                              font-bold
                              text-white
                              ${member.avatarColor}
                            `}
                          >
                            {member.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                              {member.name}
                            </p>
                            <p className="mt-0.5 truncate text-[10px] text-[#687B78]">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
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
                            ${roleStyles.bg}
                            ${roleStyles.text}
                          `}
                        >
                          <RoleIcon className="h-3 w-3" strokeWidth={2.4} />
                          {member.role}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#687B78]">
                          <MapPin
                            className="h-3.5 w-3.5"
                            strokeWidth={2.2}
                          />
                          <span className="truncate">{member.location}</span>
                        </div>
                      </td>

                      {/* Clients */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[11px] font-bold text-[#09263A]">
                          {member.clients}
                        </span>
                      </td>

                      {/* Tasks */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[11px] font-bold text-[#09263A]">
                          {member.activeTasks}
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
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
                          />
                          {member.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        className="relative px-5 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-flex items-center gap-1">
                          <Link
                            to={`/accountant/team/${member.id}`}
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
                                openRowMenu === member.id ? null : member.id
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            aria-label="More actions"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>

                          {openRowMenu === member.id && (
                            <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Eye className="h-3.5 w-3.5" />
                                <span>View profile</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit details</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Send className="h-3.5 w-3.5" />
                                <span>Send message</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Key className="h-3.5 w-3.5" />
                                <span>Reset password</span>
                              </button>
                              <div className="my-1 border-t border-[#DDEAE6]" />
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Remove member</span>
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

          {/* Empty state for list */}
          {filteredTeam.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <Users className="h-7 w-7 text-[#087F5B]" strokeWidth={2} />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No team members found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                {hasActiveFilters
                  ? "Try adjusting your search or filters."
                  : "Invite your first team member to get started."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================
          WORKLOAD SUMMARY
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
            <BarChart3
              className="h-4 w-4 text-[#087F5B]"
              strokeWidth={2.2}
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#09263A]">
              Team Workload
            </h3>
            <p className="text-[10px] text-[#687B78]">
              Active tasks per team member
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          {filteredTeam
            .filter((m) => m.status === "Active")
            .sort((a, b) => b.activeTasks - a.activeTasks)
            .map((member) => {
              const maxTasks = Math.max(
                ...team.map((m) => m.activeTasks),
                1
              );
              const percentage = (member.activeTasks / maxTasks) * 100;

              return (
                <div
                  key={member.id}
                  className="flex items-center gap-4"
                >
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-[11px]
                      font-bold
                      text-white
                      ${member.avatarColor}
                    `}
                  >
                    {member.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#09263A]">
                          {member.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#687B78]">
                          {member.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-[#09263A]">
                        {member.activeTasks} tasks
                      </span>
                    </div>

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

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <UserPlus className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                Grow your practice
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Invite team members in seconds
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Add accountants to your practice, assign them clients and
                control what each member can access.
              </p>
            </div>
          </div>

          <button
            type="button"
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
            <UserPlus className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Invite member</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountantTeam;