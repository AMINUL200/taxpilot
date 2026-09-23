import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Crown,
  Shield,
  Briefcase,
  Edit3,
  LogIn,
  MoreVertical,
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  Activity,
  CheckCircle2,
  AlertCircle,
  Ban,
  Key,
  Trash2,
  FileText,
  UserPlus,
  Settings,
  Send,
  RefreshCw,
  Eye,
  History,
  Lock,
  MessageSquare,
  Download,
  ArrowRight,
} from "lucide-react";

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  // =========================================================
  // DUMMY DATA - Replace with API
  // =========================================================

  const user = {
    id: id || 1,
    firstName: "John",
    lastName: "Smith",
    fullName: "John Smith",
    email: "john@abctrading.co.uk",
    phone: "+44 20 7946 0958",
    initials: "JS",
    role: "Owner",
    status: "Active",
    joinedDate: "12 Sep 2026",
    lastActive: "Today",
    avatarColor: "bg-primary",
    address: {
      line1: "25 King Street",
      city: "London",
      postcode: "EC2V 8AU",
      country: "United Kingdom",
    },
  };

  const organization = {
    id: 1,
    name: "ABC Trading Ltd",
    type: "Company",
    plan: "Solo",
  };

  const stats = [
    {
      id: "organization",
      label: "Organization",
      value: organization.name,
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      truncate: true,
    },
    {
      id: "role",
      label: "User Role",
      value: user.role,
      icon: Crown,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "companies",
      label: "Companies",
      value: 3,
      icon: Briefcase,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "last-active",
      label: "Last Active",
      value: user.lastActive,
      icon: Clock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  const accountInfo = [
    {
      id: "status",
      label: "Status",
      value: user.status,
      badge: true,
    },
    {
      id: "created",
      label: "Created",
      value: user.joinedDate,
    },
    {
      id: "lastLogin",
      label: "Last Login",
      value: user.lastActive,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Corporation Tax filing started",
      description: "ABC Trading Ltd",
      time: "2 hours ago",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Company added",
      description: "Green Energy Ltd was registered",
      time: "Yesterday",
      icon: Building2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: 3,
      title: "Profile updated",
      description: "Changed contact details",
      time: "3 days ago",
      icon: Edit3,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Logged in",
      description: "From London, UK",
      time: "5 days ago",
      icon: LogIn,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  const accountActions = [
    {
      id: "suspend",
      label: "Suspend User",
      description: "Temporarily disable account access",
      icon: Ban,
      variant: "warning",
    },
    {
      id: "reset",
      label: "Reset Password",
      description: "Send password reset link to user",
      icon: Key,
      variant: "default",
    },
  ];

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

  const statusStyles = getStatusStyles(user.status);
  const roleStyles = getRoleStyles(user.role);
  const RoleIcon = roleStyles.icon;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          BREADCRUMB
      ====================================================== */}

      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Users</span>
        </Link>
      </div>

      {/* =====================================================
          USER HERO CARD
      ====================================================== */}

      <div className="relative overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-soft opacity-30 blur-3xl" />

        <div className="relative flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: User Info */}
          <div className="flex items-start gap-4">

            <div
              className={`
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                text-lg
                font-bold
                text-white
                ${user.avatarColor}
              `}
            >
              {user.initials}
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                  {user.fullName}
                </h1>

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
                  {user.status}
                </span>

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
                  {user.role}
                </span>

              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">

                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {user.joinedDate}
                </span>

              </div>

            </div>

          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-2">

            <Link
              to={`/admin/users/${user.id}/edit`}
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
                text-xs
                font-semibold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Link>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-primary
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-primary
                transition-all
                duration-200
                hover:bg-primary
                hover:text-white
              "
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Login as User</span>
            </button>

            {/* More menu */}
            <div className="relative">

              <button
                type="button"
                onClick={() => setOpenMenu((prev) => !prev)}
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
                aria-label="More actions"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {openMenu && (
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-lg border border-border-light bg-white py-1 shadow-xl">

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <Send className="h-3.5 w-3.5" />
                    <span>Send email</span>
                  </button>

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset password</span>
                  </button>

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy user ID</span>
                  </button>

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export data</span>
                  </button>

                  <div className="my-1 border-t border-border-light" />

                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete user</span>
                  </button>

                </div>
              )}

            </div>

          </div>

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
                  <p
                    className={`
                      mt-2
                      text-lg
                      font-bold
                      tracking-tight
                      text-heading
                      sm:text-xl
                      ${stat.truncate ? "truncate" : ""}
                    `}
                  >
                    {stat.value}
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
          USER INFO + ORGANIZATION
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">

        {/* =================================================
            USER INFORMATION
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              User Information
            </h2>
          </div>

          <div className="divide-y divide-border-light">

            {/* Full Name */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <User className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  {user.fullName}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <Mail className="h-4 w-4 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    {user.email}
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${user.email}`}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-text-muted
                  transition-colors
                  hover:bg-primary-light
                  hover:text-primary
                "
                aria-label="Send email"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <Phone className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Phone
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  {user.phone}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <Crown className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Role
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  {user.role}
                </p>
              </div>
            </div>

            {/* Joined */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <Calendar className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Joined
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  {user.joinedDate}
                </p>
              </div>
            </div>

            {/* Last Active */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <Clock className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Last Active
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  {user.lastActive}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* =================================================
            ORGANIZATION
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Organization
            </h2>
          </div>

          <div className="p-5">

            {/* Org hero */}
            <Link
              to={`/admin/organizations/${organization.id}`}
              className="
                group
                block
                rounded-xl
                border
                border-primary-soft
                bg-gradient-to-br
                from-primary-light
                via-white
                to-primary-soft
                p-5
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >

              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary opacity-[0.08] blur-2xl" />

              <div className="relative">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary">
                    <Building2 className="h-5 w-5 text-white" strokeWidth={2.2} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-heading">
                      {organization.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-text-muted">
                      {organization.type}
                    </p>
                  </div>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border-light pt-4">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Plan
                    </p>
                    <p className="mt-1 text-xs font-bold text-heading">
                      {organization.plan}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Companies
                    </p>
                    <p className="mt-1 text-xs font-bold text-heading">
                      3
                    </p>
                  </div>

                </div>

              </div>

            </Link>

            <Link
              to={`/admin/organizations/${organization.id}`}
              className="
                mt-4
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
                text-xs
                font-bold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:bg-primary-light
                hover:text-primary
              "
            >
              <span>View Organization</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          ADDRESS + ACCOUNT INFORMATION
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* =================================================
            ADDRESS
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <MapPin className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Address
            </h2>
          </div>

          <div className="p-5">

            <div className="rounded-lg border border-border-light bg-background-soft p-4">

              <div className="space-y-1.5">
                <p className="text-sm font-bold text-heading">
                  {user.address.line1}
                </p>
                <p className="text-xs text-text">
                  {user.address.city}
                </p>
                <p className="text-xs font-mono text-text">
                  {user.address.postcode}
                </p>
                <p className="text-xs text-text-muted">
                  {user.address.country}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ACCOUNT INFORMATION
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <Lock className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Account Information
            </h2>
          </div>

          <div className="divide-y divide-border-light">

            {accountInfo.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >

                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  {item.label}
                </p>

                {item.badge ? (
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles.bg} ${statusStyles.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`} />
                    {item.value}
                  </span>
                ) : (
                  <p className="text-xs font-bold text-heading">
                    {item.value}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT ACTIVITY
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Recent Activity
            </h2>
          </div>

          <Link
            to={`/admin/users/${user.id}/activity`}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
          >
            <span>View all</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>

        </div>

        <div className="divide-y divide-border-light">

          {recentActivity.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-background-soft"
              >

                <div
                  className={`
                    flex
                    h-10
                    w-10
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

                  <p className="text-sm font-bold text-heading">
                    {activity.title}
                  </p>

                  <p className="mt-0.5 text-[11px] text-text-secondary">
                    {activity.description}
                  </p>

                </div>

                <div className="shrink-0 text-right">

                  <p className="text-[11px] font-semibold text-text-muted">
                    {activity.time}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          ACCOUNT ACTIONS (DANGER ZONE)
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex items-center gap-2 border-b border-amber-200 px-5 py-4">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <h2 className="text-sm font-bold text-amber-900">
            Account Actions
          </h2>
        </div>

        <div className="p-5">

          <p className="text-xs leading-5 text-amber-800">
            These actions affect this user's access to TaxPilot UK. Please
            use them carefully.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            {/* Suspend User */}
            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-amber-300
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                text-amber-700
                transition-all
                duration-200
                hover:border-amber-500
                hover:bg-amber-100
              "
            >
              <Ban className="h-3.5 w-3.5" />
              <span>Suspend User</span>
            </button>

            {/* Reset Password */}
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
                text-xs
                font-bold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >
              <Key className="h-3.5 w-3.5" />
              <span>Reset Password</span>
            </button>

            {/* Send Password Reset Email */}
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
                text-xs
                font-bold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Reset Link</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminUserDetails;