import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserPlus,
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
  Building2,
  Shield,
  ChevronLeft,
  ChevronRight,
  Copy,
  RefreshCw,
  Key,
  MessageSquare,
  Star,
  Crown,
  Briefcase,
} from "lucide-react";

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================================
  // STATS
  // =========================================================

  const stats = [
    {
      id: "total",
      label: "Total Users",
      value: "3,842",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "+84 this week",
    },
    {
      id: "active",
      label: "Active",
      value: "3,510",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      change: "91.4% of total",
    },
    {
      id: "pending",
      label: "Pending",
      value: "241",
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      change: "6.3% of total",
    },
    {
      id: "suspended",
      label: "Suspended",
      value: "91",
      icon: Ban,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
      change: "2.4% of total",
    },
  ];

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@abctrading.co.uk",
      initials: "JS",
      organization: "ABC Trading Ltd",
      organizationId: 1,
      role: "Owner",
      status: "Active",
      lastActive: "Today",
      joinedDate: "12 Sep 2026",
      avatarColor: "bg-primary",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@greentech.co.uk",
      initials: "SJ",
      organization: "Green Tech Ltd",
      organizationId: 2,
      role: "Admin",
      status: "Active",
      lastActive: "Today",
      joinedDate: "08 Sep 2026",
      avatarColor: "bg-emerald-500",
    },
    {
      id: 3,
      name: "David Smith",
      email: "david@smithconsulting.co.uk",
      initials: "DS",
      organization: "Smith Consulting",
      organizationId: 3,
      role: "Employee",
      status: "Trial",
      lastActive: "Yesterday",
      joinedDate: "05 Sep 2026",
      avatarColor: "bg-blue-500",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@xyzgroup.co.uk",
      initials: "EW",
      organization: "XYZ Group Holdings",
      organizationId: 4,
      role: "Admin",
      status: "Pending",
      lastActive: "18 Sep",
      joinedDate: "18 Sep 2026",
      avatarColor: "bg-purple-500",
    },
    {
      id: 5,
      name: "Michael Chen",
      email: "michael@harbor.co.uk",
      initials: "MC",
      organization: "Harbor Accounting",
      organizationId: 5,
      role: "Owner",
      status: "Active",
      lastActive: "2 hours ago",
      joinedDate: "01 Sep 2026",
      avatarColor: "bg-amber-500",
    },
    {
      id: 6,
      name: "Laura Taylor",
      email: "laura@brightsol.co.uk",
      initials: "LT",
      organization: "Bright Solutions Ltd",
      organizationId: 6,
      role: "Admin",
      status: "Active",
      lastActive: "Today",
      joinedDate: "28 Aug 2026",
      avatarColor: "bg-rose-500",
    },
    {
      id: 7,
      name: "James Brown",
      email: "james@northerntraders.co.uk",
      initials: "JB",
      organization: "Northern Traders Ltd",
      organizationId: 7,
      role: "Employee",
      status: "Active",
      lastActive: "3 days ago",
      joinedDate: "22 Aug 2026",
      avatarColor: "bg-cyan-500",
    },
    {
      id: 8,
      name: "Sophie Martin",
      email: "sophie@coastal.co.uk",
      initials: "SM",
      organization: "Coastal Services",
      organizationId: 8,
      role: "Employee",
      status: "Trial",
      lastActive: "5 days ago",
      joinedDate: "18 Aug 2026",
      avatarColor: "bg-indigo-500",
    },
    {
      id: 9,
      name: "Robert Davis",
      email: "robert@summitpartners.co.uk",
      initials: "RD",
      organization: "Summit Partners",
      organizationId: 9,
      role: "Owner",
      status: "Active",
      lastActive: "Yesterday",
      joinedDate: "15 Aug 2026",
      avatarColor: "bg-teal-500",
    },
    {
      id: 10,
      name: "Anna White",
      email: "anna@riverside.co.uk",
      initials: "AW",
      organization: "Riverside Consulting",
      organizationId: 10,
      role: "Admin",
      status: "Suspended",
      lastActive: "10 Sep",
      joinedDate: "10 Aug 2026",
      avatarColor: "bg-orange-500",
    },
  ];

  // =========================================================
  // FILTERS
  // =========================================================

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "owner", label: "Owner" },
    { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" },
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses", color: null },
    { value: "active", label: "Active", color: "emerald" },
    { value: "trial", label: "Trial", color: "amber" },
    { value: "pending", label: "Pending", color: "blue" },
    { value: "suspended", label: "Suspended", color: "rose" },
  ];

  const orgOptions = [
    { value: "all", label: "All Organizations" },
    { value: "1", label: "ABC Trading Ltd" },
    { value: "2", label: "Green Tech Ltd" },
    { value: "3", label: "Smith Consulting" },
    { value: "4", label: "XYZ Group Holdings" },
    { value: "5", label: "Harbor Accounting" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.organization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "all" ||
        user.role.toLowerCase() === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        user.status.toLowerCase() === statusFilter;

      const matchesOrg =
        orgFilter === "all" ||
        user.organizationId.toString() === orgFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesOrg;
    });
  }, [searchQuery, roleFilter, statusFilter, orgFilter]);

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
      case "Pending":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          dot: "bg-blue-500",
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
      case "Employee":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
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

  const totalPages = 385; // Demo value

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
            Users
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage all users across the TaxPilot UK platform.
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

          {/* Add User */}
          <Link
            to="/admin/users/new"
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
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
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
              placeholder="Search by name, email or organization..."
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

          {/* Role filter */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowRoleDropdown((prev) => !prev);
                setShowStatusDropdown(false);
                setShowOrgDropdown(false);
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
                <Shield className="h-3.5 w-3.5 text-text-muted" />
                <span>
                  {roleOptions.find((o) => o.value === roleFilter)?.label}
                </span>
              </div>

              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showRoleDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

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
                      hover:bg-primary-light
                      ${
                        roleFilter === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {roleFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
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
                setShowOrgDropdown(false);
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
                                : option.color === "blue"
                                ? "bg-blue-500"
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

          {/* Organization filter */}
          <div className="relative">

            <button
              type="button"
              onClick={() => {
                setShowOrgDropdown((prev) => !prev);
                setShowRoleDropdown(false);
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
                <Building2 className="h-3.5 w-3.5 text-text-muted" />
                <span className="max-w-[120px] truncate">
                  {orgOptions.find((o) => o.value === orgFilter)?.label}
                </span>
              </div>

              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-muted
                  transition-transform
                  duration-200
                  ${showOrgDropdown ? "rotate-180 text-primary" : ""}
                `}
              />

            </button>

            {showOrgDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-border-light bg-white shadow-xl">

                {orgOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setOrgFilter(option.value);
                      setShowOrgDropdown(false);
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
                        orgFilter === option.value
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {orgFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          USERS TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Table header info */}
        <div className="flex flex-col gap-3 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              All Users
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredUsers.length}
            </span>
          </div>

          <p className="text-[11px] text-text-muted">
            Showing 1–{filteredUsers.length} of 3,842 users
          </p>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border-light bg-background-soft">

                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  User
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Organization
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Role
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Last Active
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">

              {filteredUsers.map((user) => {
                const statusStyles = getStatusStyles(user.status);
                const roleStyles = getRoleStyles(user.role);
                const RoleIcon = roleStyles.icon;

                return (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-background-soft"
                  >

                    {/* User */}
                    <td className="px-5 py-4">

                      <Link
                        to={`/admin/users/${user.id}`}
                        className="flex items-center gap-3"
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
                            ${user.avatarColor}
                          `}
                        >
                          {user.initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {user.name}
                          </p>
                          <p className="mt-0.5 truncate text-[10px] text-text-muted">
                            {user.email}
                          </p>
                        </div>

                      </Link>

                    </td>

                    {/* Organization */}
                    <td className="px-5 py-4">

                      <Link
                        to={`/admin/organizations/${user.organizationId}`}
                        className="flex items-center gap-2 transition-colors hover:text-primary"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Building2 className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
                        </div>

                        <span className="truncate text-xs font-semibold text-heading">
                          {user.organization}
                        </span>

                      </Link>

                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${roleStyles.bg} ${roleStyles.text}`}>
                        <RoleIcon className="h-3 w-3" strokeWidth={2.4} />
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`} />
                        {user.status}
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-text-secondary">
                        {user.lastActive}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">

                      <div className="relative inline-flex items-center gap-1">

                        <Link
                          to={`/admin/users/${user.id}`}
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
                          onClick={() => setOpenRowMenu(openRowMenu === user.id ? null : user.id)}
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

                        {openRowMenu === user.id && (
                          <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border-light bg-white py-1 shadow-xl">

                            <Link
                              to={`/admin/users/${user.id}`}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View profile</span>
                            </Link>

                            <Link
                              to={`/admin/users/${user.id}/edit`}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              <span>Edit user</span>
                            </Link>

                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                              <Mail className="h-3.5 w-3.5" />
                              <span>Send email</span>
                            </button>

                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                              <Key className="h-3.5 w-3.5" />
                              <span>Reset password</span>
                            </button>

                            <div className="my-1 border-t border-border-light" />

                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                              <Ban className="h-3.5 w-3.5" />
                              <span>Suspend user</span>
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

          {filteredUsers.map((user) => {
            const statusStyles = getStatusStyles(user.status);
            const roleStyles = getRoleStyles(user.role);

            return (
              <Link
                key={user.id}
                to={`/admin/users/${user.id}`}
                className="block p-4 transition-colors hover:bg-background-soft"
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
                      rounded-full
                      text-xs
                      font-bold
                      text-white
                      ${user.avatarColor}
                    `}
                  >
                    {user.initials}
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {user.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-text-muted">
                          {user.email}
                        </p>
                      </div>

                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                        {user.status}
                      </span>

                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-background-soft px-3 py-2">

                      <div className="min-w-0">
                        <p className="text-[10px] text-text-muted">Organization</p>
                        <p className="mt-0.5 truncate text-[11px] font-bold text-heading">
                          {user.organization}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[10px] text-text-muted">Role</p>
                        <p className={`mt-0.5 text-[11px] font-bold ${roleStyles.text}`}>
                          {user.role}
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
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Users className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>

            <p className="mt-4 text-sm font-bold text-heading">
              No users found
            </p>

            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {searchQuery || roleFilter !== "all" || statusFilter !== "all" || orgFilter !== "all"
                ? "Try adjusting your search or filters."
                : "No users have been added yet."}
            </p>

            {(searchQuery || roleFilter !== "all" || statusFilter !== "all" || orgFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                  setOrgFilter("all");
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

      {filteredUsers.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-text-muted">
            Showing{" "}
            <span className="font-bold text-heading">1</span>–
            <span className="font-bold text-heading">{filteredUsers.length}</span>{" "}
            of <span className="font-bold text-heading">3,842</span> users
          </p>

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
                onClick={() => setCurrentPage(385)}
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
                385
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

export default AdminUsersPage;