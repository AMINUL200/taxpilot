import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
  Mail,
  Phone,
  Calendar,
  Building2,
  Shield,
  Crown,
  UserCog,
  CheckCircle2,
  Clock3,
  TrendingUp,
  RefreshCw,
  Send,
  UserCheck,
  Trash2,
  Key,
  BarChart3,
  Zap,
  Layers,
  User,
  X,
  MapPin,
} from "lucide-react";

const AccountantTeam = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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
  const [viewMode, setViewMode] = useState("grid");

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
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "active",
      label: "Active",
      value: 7,
      change: "87.5% of total",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    {
      id: "pending",
      label: "Pending Invites",
      value: 1,
      change: "Awaiting acceptance",
      icon: Clock3,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
    {
      id: "workload",
      label: "Avg. Workload",
      value: "12",
      change: "Tasks per member",
      icon: TrendingUp,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
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
      avatarColor: "bg-primary",
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
      avatarColor: "bg-sky",
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
      avatarColor: "bg-secondary",
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
      avatarColor: "bg-warning",
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
      avatarColor: "bg-danger",
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
      avatarColor: "bg-sky",
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
      avatarColor: "bg-primary",
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
      avatarColor: "bg-sky",
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

      const matchesRole =
        roleFilter === "All" || member.role === roleFilter;
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
          bg: "bg-secondary-light",
          text: "text-secondary",
          icon: Crown,
        };
      case "Admin":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          icon: Shield,
        };
      case "Accountant":
        return {
          bg: "bg-success-light",
          text: "text-success",
          icon: UserCheck,
        };
      case "Junior Accountant":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          icon: User,
        };
      default:
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          icon: User,
        };
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-success-light",
          text: "text-success",
          dot: "bg-success",
        };
      case "Pending":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          dot: "bg-warning",
        };
      default:
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          dot: "bg-text-secondary",
        };
    }
  };

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  const statCardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  const gridCardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.96 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: premiumEase,
        delay: shouldReduceMotion ? 0 : index * 0.05,
      },
    }),
  };

  const rowVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: premiumEase,
        delay: shouldReduceMotion ? 0 : index * 0.05,
      },
    }),
  };

  const dropdownVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -8, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.22, ease: premiumEase },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -6,
          scale: 0.97,
          transition: { duration: 0.15 },
        },
  };

  const menuItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -6 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: premiumEase,
        delay: shouldReduceMotion ? 0 : index * 0.04,
      },
    }),
  };

  const viewContentVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: premiumEase },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          transition: { duration: 0.2, ease: premiumEase },
        },
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Team
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your practice team members and permissions
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            whileHover={
              shouldReduceMotion || isRefreshing
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={
              shouldReduceMotion || isRefreshing
                ? undefined
                : { scale: 0.98 }
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-4
              py-2.5
              text-sm
              font-semibold
              text-heading
              transition-colors
              duration-200
              hover:border-primary
              hover:text-primary
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
          </motion.button>

          <motion.button
            type="button"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-4
              py-2.5
              text-sm
              font-semibold
              text-heading
              transition-colors
              duration-200
              hover:border-primary
              hover:text-primary
            "
          >
            <Shield className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Permissions</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
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
              text-text-white
              shadow-button
              transition-colors
              duration-200
              hover:bg-primary-hover
            "
          >
            <UserPlus className="h-4 w-4" strokeWidth={2.4} />
            <span>Invite Member</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ======================================================
          STATS CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              variants={statCardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -3, transition: { duration: 0.25 } }
              }
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-background
                p-5
                shadow-card
                transition-[border-color,box-shadow]
                duration-300
                hover:border-primary/20
                hover:shadow-card-hover
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold text-text-secondary">
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
            </motion.div>
          );
        })}
      </div>

      {/* ======================================================
          SEATS USAGE BANNER
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="
          flex
          flex-col
          gap-4
          rounded-xl
          border
          border-border
          bg-gradient-to-r
          from-primary-light
          via-background-soft
          to-background
          p-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-start gap-4">
          <motion.div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-primary
              shadow-button
            "
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.6, rotate: -12 }
            }
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <Zap className="h-5 w-5 text-text-white" strokeWidth={2.2} />
          </motion.div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Team seats
            </p>
            <p className="mt-1 text-sm font-bold text-heading">
              8 of 10 seats used
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">
              2 seats remaining on your Practice Pro plan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-2 w-32 overflow-hidden rounded-full bg-border sm:block">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={shouldReduceMotion ? false : { width: 0 }}
              whileInView={{ width: "80%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: premiumEase,
                delay: shouldReduceMotion ? 0 : 0.4,
              }}
            />
          </div>
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              to="/accountant/settings"
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-4
                py-2.5
                text-xs
                font-bold
                text-text-white
                shadow-button
                transition-colors
                duration-200
                hover:bg-primary-hover
              "
            >
              <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
              <span>Upgrade plan</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ======================================================
          FILTERS BAR
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="rounded-xl border border-border bg-background p-4 shadow-card"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team by name, email or role..."
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
                placeholder:text-text-secondary
                focus:border-primary
                focus:bg-background
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Role filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowRoleDropdown((prev) => !prev);
                setShowStatusDropdown(false);
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                font-semibold
                text-heading
                transition-colors
                duration-200
                hover:border-primary
                hover:text-primary
                lg:w-auto
              "
            >
              <div className="flex items-center gap-2">
                <Shield
                  className="h-3.5 w-3.5 text-text-secondary"
                  strokeWidth={2.2}
                />
                <span>
                  {roleOptions.find((o) => o.value === roleFilter)?.label}
                </span>
              </div>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-secondary
                  transition-transform
                  duration-200
                  ${showRoleDropdown ? "rotate-180" : ""}
                `}
              />
            </motion.button>

            <AnimatePresence>
              {showRoleDropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="
                    absolute
                    right-0
                    top-full
                    z-30
                    mt-2
                    w-56
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  {roleOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
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
                            : "text-heading"
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      {roleFilter === option.value && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowRoleDropdown(false);
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                font-semibold
                text-heading
                transition-colors
                duration-200
                hover:border-primary
                hover:text-primary
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
                  text-text-secondary
                  transition-transform
                  duration-200
                  ${showStatusDropdown ? "rotate-180" : ""}
                `}
              />
            </motion.button>

            <AnimatePresence>
              {showStatusDropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  {statusOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
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
                            : "text-heading"
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      {statusFilter === option.value && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear filters */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                type="button"
                onClick={clearFilters}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-text-secondary
                  transition-colors
                  duration-200
                  hover:border-primary
                  hover:text-primary
                "
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Clear</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* View toggle */}
          <div className="hidden rounded-lg border border-border bg-background p-1 lg:flex">
            <motion.button
              type="button"
              onClick={() => setViewMode("grid")}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-3
                py-1.5
                text-xs
                font-bold
                transition-colors
                duration-200
                ${
                  viewMode === "grid"
                    ? "bg-primary text-text-white shadow-button"
                    : "text-text-secondary hover:bg-background-soft"
                }
              `}
            >
              <Layers className="h-3.5 w-3.5" strokeWidth={2.4} />
              Cards
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setViewMode("list")}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-3
                py-1.5
                text-xs
                font-bold
                transition-colors
                duration-200
                ${
                  viewMode === "list"
                    ? "bg-primary text-text-white shadow-button"
                    : "text-text-secondary hover:bg-background-soft"
                }
              `}
            >
              <Users className="h-3.5 w-3.5" strokeWidth={2.4} />
              List
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          VIEW SWITCH
      ====================================================== */}
      <AnimatePresence initial={false} mode="sync">
        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <motion.div
            key="grid"
            variants={viewContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTeam.map((member, index) => {
              const roleStyles = getRoleStyles(member.role);
              const RoleIcon = roleStyles.icon;
              const statusStyles = getStatusStyles(member.status);

              return (
                <motion.div
                  key={member.id}
                  custom={index}
                  variants={gridCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.25 } }
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                    transition-[border-color,box-shadow]
                    duration-300
                    hover:border-primary/30
                    hover:shadow-card-hover
                  "
                >
                  {/* Header */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      border-b
                      border-border
                      bg-gradient-to-r
                      from-primary-light/60
                      to-background
                      p-5
                    "
                  >
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
                          text-text-white
                          shadow-button
                          ${member.avatarColor}
                        `}
                      >
                        {member.initials}
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="truncate text-sm font-bold text-heading">
                          {member.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-text-secondary">
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
                            <RoleIcon
                              className="h-2.5 w-2.5"
                              strokeWidth={2.6}
                            />
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
                      <motion.button
                        type="button"
                        onClick={() =>
                          setOpenRowMenu(
                            openRowMenu === member.id ? null : member.id
                          )
                        }
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                scale: 1.1,
                                transition: { duration: 0.15 },
                              }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.95 }
                        }
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          text-text-secondary
                          transition-colors
                          hover:bg-background
                          hover:text-primary
                        "
                        aria-label="More actions"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </motion.button>

                      <AnimatePresence>
                        {openRowMenu === member.id && (
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? false
                                : { opacity: 0, y: -6, scale: 0.96 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -4, scale: 0.97 }
                            }
                            transition={{
                              duration: 0.2,
                              ease: premiumEase,
                            }}
                            className="
                              absolute
                              right-0
                              top-full
                              z-20
                              mt-1
                              w-44
                              overflow-hidden
                              rounded-lg
                              border
                              border-border
                              bg-background
                              py-1
                              shadow-card-hover
                            "
                          >
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                              <Eye className="h-3.5 w-3.5" />
                              <span>View profile</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                              <Edit3 className="h-3.5 w-3.5" />
                              <span>Edit details</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                              <Mail className="h-3.5 w-3.5" />
                              <span>Send message</span>
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                              <Key className="h-3.5 w-3.5" />
                              <span>Reset password</span>
                            </button>
                            <div className="my-1 border-t border-border" />
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light">
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove member</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Mail
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2.2}
                        />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <MapPin
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2.2}
                        />
                        <span className="truncate">{member.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Calendar
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2.2}
                        />
                        <span>Joined {member.joinedDate}</span>
                      </div>
                    </div>

                    <div
                      className="
                        mt-4
                        grid
                        grid-cols-3
                        gap-3
                        rounded-lg
                        border
                        border-border
                        bg-background-soft
                        px-3
                        py-2.5
                      "
                    >
                      <div className="text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Clients
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-heading">
                          {member.clients}
                        </p>
                      </div>
                      <div className="border-x border-border text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Tasks
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-heading">
                          {member.activeTasks}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Done
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-heading">
                          {member.completedThisMonth}
                        </p>
                      </div>
                    </div>

                    {member.specialities.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Specialities
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {member.specialities.map((spec) => (
                            <span
                              key={spec}
                              className="
                                rounded-full
                                bg-primary-light
                                px-2
                                py-0.5
                                text-[10px]
                                font-semibold
                                text-primary
                              "
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -1, transition: { duration: 0.2 } }
                        }
                        className="flex-1"
                      >
                        <Link
                          to={`/accountant/team/${member.id}`}
                          className="
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            border
                            border-border
                            bg-background
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-heading
                            transition-colors
                            duration-200
                            hover:border-primary
                            hover:bg-primary-light
                            hover:text-primary
                          "
                        >
                          <Eye className="h-3 w-3" strokeWidth={2.4} />
                          View profile
                        </Link>
                      </motion.div>
                      <motion.button
                        type="button"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -1, transition: { duration: 0.2 } }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.98 }
                        }
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          bg-primary
                          px-3
                          py-2
                          text-xs
                          font-bold
                          text-text-white
                          shadow-button
                          transition-colors
                          duration-200
                          hover:bg-primary-hover
                        "
                      >
                        <Send className="h-3 w-3" strokeWidth={2.6} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredTeam.length === 0 && (
              <motion.div
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="
                  col-span-full
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-border
                  bg-background
                  px-5
                  py-16
                  text-center
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                  <Users className="h-7 w-7 text-primary" strokeWidth={2} />
                </div>
                <p className="mt-4 text-sm font-bold text-heading">
                  No team members found
                </p>
                <p className="mt-1 max-w-xs text-xs text-text-secondary">
                  {hasActiveFilters
                    ? "Try adjusting your search or filters."
                    : "Invite your first team member to get started."}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <motion.div
            key="list"
            variants={viewContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              overflow-hidden
              rounded-xl
              border
              border-border
              bg-background
              shadow-card
            "
          >
            <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" strokeWidth={2.2} />
                <h2 className="text-sm font-bold text-heading">
                  All Team Members
                </h2>
                <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                  {filteredTeam.length}
                </span>
              </div>
              <p className="text-[11px] text-text-secondary">
                Click a member to view details
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-border bg-background-soft">
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Member
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Role
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Location
                    </th>
                    <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Clients
                    </th>
                    <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Tasks
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredTeam.map((member, index) => {
                    const roleStyles = getRoleStyles(member.role);
                    const RoleIcon = roleStyles.icon;
                    const statusStyles = getStatusStyles(member.status);

                    return (
                      <motion.tr
                        key={member.id}
                        custom={index}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={() =>
                          navigate(`/accountant/team/${member.id}`)
                        }
                        className="
                          group
                          cursor-pointer
                          transition-colors
                          hover:bg-background-soft
                        "
                      >
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
                                text-text-white
                                shadow-button
                                ${member.avatarColor}
                              `}
                            >
                              {member.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                                {member.name}
                              </p>
                              <p className="mt-0.5 truncate text-[10px] text-text-secondary">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </td>

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
                            <RoleIcon
                              className="h-3 w-3"
                              strokeWidth={2.4}
                            />
                            {member.role}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <MapPin
                              className="h-3.5 w-3.5"
                              strokeWidth={2.2}
                            />
                            <span className="truncate">{member.location}</span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span
                            className="
                              inline-flex
                              items-center
                              rounded-full
                              bg-background-soft
                              px-2.5
                              py-1
                              text-[11px]
                              font-bold
                              text-heading
                            "
                          >
                            {member.clients}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span
                            className="
                              inline-flex
                              items-center
                              rounded-full
                              bg-background-soft
                              px-2.5
                              py-1
                              text-[11px]
                              font-bold
                              text-heading
                            "
                          >
                            {member.activeTasks}
                          </span>
                        </td>

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
                                border-border
                                bg-background
                                px-3
                                py-1.5
                                text-[11px]
                                font-semibold
                                text-heading
                                transition-colors
                                duration-200
                                hover:border-primary
                                hover:bg-primary-light
                                hover:text-primary
                              "
                            >
                              <Eye className="h-3 w-3" strokeWidth={2.4} />
                              <span>View</span>
                            </Link>

                            <motion.button
                              type="button"
                              onClick={() =>
                                setOpenRowMenu(
                                  openRowMenu === member.id
                                    ? null
                                    : member.id
                                )
                              }
                              whileHover={
                                shouldReduceMotion
                                  ? undefined
                                  : {
                                      scale: 1.1,
                                      transition: { duration: 0.15 },
                                    }
                              }
                              whileTap={
                                shouldReduceMotion
                                  ? undefined
                                  : { scale: 0.95 }
                              }
                              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                text-text-secondary
                                transition-colors
                                hover:bg-primary-light
                                hover:text-primary
                              "
                              aria-label="More actions"
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </motion.button>

                            <AnimatePresence>
                              {openRowMenu === member.id && (
                                <motion.div
                                  initial={
                                    shouldReduceMotion
                                      ? false
                                      : {
                                          opacity: 0,
                                          y: -6,
                                          scale: 0.96,
                                        }
                                  }
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={
                                    shouldReduceMotion
                                      ? { opacity: 0 }
                                      : {
                                          opacity: 0,
                                          y: -4,
                                          scale: 0.97,
                                        }
                                  }
                                  transition={{
                                    duration: 0.2,
                                    ease: premiumEase,
                                  }}
                                  className="
                                    absolute
                                    right-0
                                    top-full
                                    z-20
                                    mt-1
                                    w-44
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-border
                                    bg-background
                                    py-1
                                    shadow-card-hover
                                  "
                                >
                                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View profile</span>
                                  </button>
                                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                    <Edit3 className="h-3.5 w-3.5" />
                                    <span>Edit details</span>
                                  </button>
                                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                    <Send className="h-3.5 w-3.5" />
                                    <span>Send message</span>
                                  </button>
                                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                    <Key className="h-3.5 w-3.5" />
                                    <span>Reset password</span>
                                  </button>
                                  <div className="my-1 border-t border-border" />
                                  <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light">
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Remove member</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredTeam.length === 0 && (
              <motion.div
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  px-5
                  py-16
                  text-center
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                  <Users className="h-7 w-7 text-primary" strokeWidth={2} />
                </div>
                <p className="mt-4 text-sm font-bold text-heading">
                  No team members found
                </p>
                <p className="mt-1 max-w-xs text-xs text-text-secondary">
                  {hasActiveFilters
                    ? "Try adjusting your search or filters."
                    : "Invite your first team member to get started."}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          WORKLOAD SUMMARY
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-background
          shadow-card
        "
      >
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
            <BarChart3
              className="h-4 w-4 text-primary"
              strokeWidth={2.2}
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-heading">
              Team Workload
            </h3>
            <p className="text-[10px] text-text-secondary">
              Active tasks per team member
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          {filteredTeam
            .filter((m) => m.status === "Active")
            .sort((a, b) => b.activeTasks - a.activeTasks)
            .map((member, index) => {
              const maxTasks = Math.max(
                ...team.map((m) => m.activeTasks),
                1
              );
              const percentage = (member.activeTasks / maxTasks) * 100;

              return (
                <motion.div
                  key={member.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 8 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    duration: 0.5,
                    ease: premiumEase,
                  }}
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
                      text-text-white
                      shadow-button
                      ${member.avatarColor}
                    `}
                  >
                    {member.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-heading">
                          {member.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-secondary">
                          {member.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-heading">
                        {member.activeTasks} tasks
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background-soft">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={
                          shouldReduceMotion ? false : { width: 0 }
                        }
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          ease: premiumEase,
                          delay: shouldReduceMotion
                            ? 0
                            : 0.2 + index * 0.06,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </motion.div>

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-gradient-to-r
          from-primary-light
          via-background-soft
          to-background
          p-6
          sm:p-7
        "
      >
        <motion.div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-primary
            opacity-[0.06]
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <motion.div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary
                shadow-button
              "
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.6, rotate: -12 }
              }
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <UserPlus
                className="h-5 w-5 text-text-white"
                strokeWidth={2.2}
              />
            </motion.div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Grow your practice
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                Invite team members in seconds
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Add accountants to your practice, assign them clients and
                control what each member can access.
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
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
              text-text-white
              shadow-button
              transition-colors
              duration-200
              hover:bg-primary-hover
              sm:self-auto
            "
          >
            <UserPlus className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Invite member</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountantTeam;