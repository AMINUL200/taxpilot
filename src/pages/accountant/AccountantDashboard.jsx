import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
  CalendarClock,
  CheckCircle2,
  Activity,
  TrendingUp,
  Bell,
  Sparkles,
} from "lucide-react";

const AccountantDashboard = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      path: "/accountant/clients",
    },
    {
      id: "companies",
      label: "Companies",
      value: 68,
      change: "Across 42 clients",
      changeType: "neutral",
      icon: Building2,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
      path: "/accountant/companies",
    },
    {
      id: "due-soon",
      label: "Due Soon",
      value: 8,
      change: "Next 30 days",
      changeType: "warning",
      icon: Clock,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
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
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
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
      iconBg: "bg-success-light",
      iconColor: "text-success",
      path: "/accountant/filings",
    },
    {
      id: "awaiting",
      label: "Awaiting Client",
      value: 7,
      change: "Documents / approval",
      changeType: "neutral",
      icon: UserCheck,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
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
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    {
      id: 2,
      title: "Client uploaded documents",
      description: "SKIL FOUR LIMITED · 4 files",
      time: "5 hours ago",
      icon: FileText,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: 3,
      title: "New client added",
      description: "GREEN TECH LTD",
      time: "1 day ago",
      icon: Users,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      id: 4,
      title: "Awaiting approval",
      description: "BRIGHT IDEAS LTD · CT600 draft",
      time: "2 days ago",
      icon: UserCheck,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
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
      color: "bg-primary",
    },
    {
      id: 2,
      name: "John Smith",
      initials: "JS",
      role: "Accountant",
      activeTasks: 11,
      color: "bg-sky",
    },
    {
      id: 3,
      name: "Sarah Martin",
      initials: "SM",
      role: "Accountant",
      activeTasks: 9,
      color: "bg-secondary",
    },
    {
      id: 4,
      name: "David Chen",
      initials: "DC",
      role: "Junior Accountant",
      activeTasks: 6,
      color: "bg-warning",
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
          bg: "bg-danger-light",
          border: "border-danger/20",
          text: "text-danger",
          dot: "bg-danger",
        };
      case "high":
        return {
          bg: "bg-warning-light",
          border: "border-warning/20",
          text: "text-warning",
          dot: "bg-warning",
        };
      case "medium":
        return {
          bg: "bg-primary-light",
          border: "border-primary/20",
          text: "text-primary",
          dot: "bg-primary",
        };
      default:
        return {
          bg: "bg-success-light",
          border: "border-success/20",
          text: "text-success",
          dot: "bg-success",
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

  const listItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: premiumEase },
    },
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
          WELCOME HEADER
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {getGreeting()}, {user.firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Here's what's happening across your clients today.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              to="/accountant/clients/new"
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
                hover:bg-primary-light
                hover:text-primary
              "
            >
              <Plus className="h-4 w-4" strokeWidth={2.4} />
              <span>Add Client</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              to="/accountant/filings/new"
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
              <FileText className="h-4 w-4" strokeWidth={2.4} />
              <span>Start Filing</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ======================================================
          FILTERS
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="flex flex-wrap items-center gap-3"
      >
        {/* Client filter */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => {
              setShowClientDropdown((prev) => !prev);
              setShowPeriodDropdown(false);
            }}
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
              py-2
              text-xs
              font-semibold
              text-heading
              transition-colors
              duration-200
              hover:border-primary
              hover:text-primary
            "
          >
            <Users className="h-3.5 w-3.5 text-text-secondary" strokeWidth={2.2} />
            <span>{clientFilter}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-text-secondary transition-transform duration-200 ${
                showClientDropdown ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <AnimatePresence>
            {showClientDropdown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="
                  absolute
                  left-0
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
                {clientOptions.map((option, index) => (
                  <motion.button
                    key={option}
                    type="button"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: -6 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.04,
                      duration: 0.3,
                      ease: premiumEase,
                    }}
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
                      hover:bg-primary-light
                      ${
                        clientFilter === option
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-heading"
                      }
                    `}
                  >
                    <span>{option}</span>
                    {clientFilter === option && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Period filter */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => {
              setShowPeriodDropdown((prev) => !prev);
              setShowClientDropdown(false);
            }}
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
              py-2
              text-xs
              font-semibold
              text-heading
              transition-colors
              duration-200
              hover:border-primary
              hover:text-primary
            "
          >
            <CalendarClock
              className="h-3.5 w-3.5 text-text-secondary"
              strokeWidth={2.2}
            />
            <span>{periodFilter}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-text-secondary transition-transform duration-200 ${
                showPeriodDropdown ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <AnimatePresence>
            {showPeriodDropdown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="
                  absolute
                  left-0
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
                {periodOptions.map((option, index) => (
                  <motion.button
                    key={option}
                    type="button"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: -6 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.04,
                      duration: 0.3,
                      ease: premiumEase,
                    }}
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
                      hover:bg-primary-light
                      ${
                        periodFilter === option
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-heading"
                      }
                    `}
                  >
                    <span>{option}</span>
                    {periodFilter === option && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ======================================================
          STATS CARDS (6)
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
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
            >
              <Link
                to={stat.path}
                className={`
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-xl
                  border
                  bg-background
                  p-4
                  shadow-card
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:shadow-card-hover
                  ${
                    stat.highlight && stat.id === "overdue"
                      ? "border-danger/30"
                      : stat.highlight && stat.id === "due-soon"
                        ? "border-warning/30"
                        : "border-border"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-heading">
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
                        ? "text-danger"
                        : stat.changeType === "warning"
                          ? "text-warning"
                          : stat.changeType === "up"
                            ? "text-success"
                            : "text-text-secondary"
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
                    bg-primary
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ======================================================
          URGENT DEADLINES + RECENT ACTIVITY
      ====================================================== */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* URGENT DEADLINES (2/3) */}
        <motion.div
          variants={fadeUpVariants}
          className="
            lg:col-span-2
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-background
            shadow-card
          "
        >
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                <CalendarClock
                  className="h-4 w-4 text-primary"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-heading">
                  Urgent Deadlines
                </h2>
                <p className="text-[10px] text-text-secondary">
                  Next filings across all clients
                </p>
              </div>
              <span className="rounded-full bg-danger-light px-2 py-0.5 text-[10px] font-bold text-danger">
                {urgentDeadlines.filter((d) => d.daysLeft <= 7).length} urgent
              </span>
            </div>

            <Link
              to="/accountant/deadlines"
              className="
                group
                inline-flex
                items-center
                gap-1
                text-xs
                font-semibold
                text-primary
                transition-colors
                hover:text-primary-hover
              "
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Deadline list */}
          <div className="divide-y divide-border">
            {urgentDeadlines.map((deadline, index) => {
              const styles = getUrgencyStyles(deadline.urgency);

              return (
                <motion.div
                  key={deadline.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, x: -8 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    duration: 0.45,
                    ease: premiumEase,
                  }}
                  className="
                    group
                    flex
                    flex-col
                    gap-3
                    px-5
                    py-4
                    transition-colors
                    hover:bg-background-soft
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
                        <p className="truncate text-sm font-bold text-heading">
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

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-text-secondary">
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
                      <p className="text-xs font-bold text-heading">
                        {deadline.dueDate}
                      </p>
                      <p
                        className={`mt-0.5 text-[10px] font-bold ${styles.text}`}
                      >
                        {getDaysLabel(deadline.daysLeft)}
                      </p>
                    </div>

                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -1, transition: { duration: 0.2 } }
                      }
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.98 }
                      }
                    >
                      <Link
                        to={`/accountant/filings/new?client=${deadline.companyNumber}`}
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-lg
                          bg-primary
                          px-3
                          py-2
                          text-[10px]
                          font-bold
                          text-text-white
                          shadow-button
                          transition-colors
                          duration-200
                          hover:bg-primary-hover
                        "
                      >
                        <span>File</span>
                        <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RECENT ACTIVITY (1/3) */}
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
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                <Activity
                  className="h-4 w-4 text-primary"
                  strokeWidth={2.2}
                />
              </div>
              <h2 className="text-sm font-bold text-heading">
                Recent Activity
              </h2>
            </div>

            <Link
              to="/accountant/activity"
              className="
                text-[10px]
                font-semibold
                text-primary
                transition-colors
                hover:text-primary-hover
              "
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <motion.div
                  key={activity.id}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, x: -8 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    duration: 0.45,
                    ease: premiumEase,
                  }}
                  className="
                    flex
                    items-start
                    gap-3
                    px-5
                    py-3.5
                    transition-colors
                    hover:bg-background-soft
                  "
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
                    <p className="truncate text-xs font-bold text-heading">
                      {activity.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-[10px] text-text-secondary">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ======================================================
          TEAM WORKLOAD + QUICK LINKS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* TEAM WORKLOAD (2/3) */}
        <motion.div
          variants={fadeUpVariants}
          className="
            lg:col-span-2
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-background
            shadow-card
          "
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                <Users
                  className="h-4 w-4 text-primary"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h2 className="text-sm font-bold text-heading">
                  Team Workload
                </h2>
                <p className="text-[10px] text-text-secondary">
                  Active tasks per team member
                </p>
              </div>
            </div>

            <Link
              to="/accountant/team"
              className="
                group
                inline-flex
                items-center
                gap-1
                text-xs
                font-semibold
                text-primary
                transition-colors
                hover:text-primary-hover
              "
            >
              <span>Manage</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-border">
            {teamWorkload.map((member, index) => {
              const maxTasks = Math.max(
                ...teamWorkload.map((m) => m.activeTasks)
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
                  className="
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    transition-colors
                    hover:bg-background-soft
                  "
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
                      text-text-white
                      shadow-button
                      ${member.color}
                    `}
                  >
                    {member.initials}
                  </div>

                  {/* Info + bar */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-heading">
                          {member.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-secondary">
                          {member.role}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-heading">
                        {member.activeTasks} tasks
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background-soft">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { width: 0 }
                        }
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          ease: premiumEase,
                          delay: shouldReduceMotion ? 0 : 0.2 + index * 0.06,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* QUICK LINKS (1/3) */}
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
              <Sparkles
                className="h-4 w-4 text-primary"
                strokeWidth={2.2}
              />
            </div>
            <h2 className="text-sm font-bold text-heading">
              Quick Links
            </h2>
          </div>

          <div className="space-y-1 p-2">
            {[
              {
                label: "All Clients",
                icon: Users,
                path: "/accountant/clients",
              },
              {
                label: "Companies",
                icon: Building2,
                path: "/accountant/companies",
              },
              {
                label: "All Filings",
                icon: FileText,
                path: "/accountant/filings",
              },
              {
                label: "Tasks",
                icon: CheckCircle2,
                path: "/accountant/tasks",
              },
              {
                label: "Documents",
                icon: FileText,
                path: "/accountant/documents",
              },
              {
                label: "Billing",
                icon: TrendingUp,
                path: "/accountant/billing",
              },
            ].map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.label}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, x: -6 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.04,
                    duration: 0.4,
                    ease: premiumEase,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { x: 2, transition: { duration: 0.2 } }
                  }
                >
                  <Link
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
                      text-heading
                      transition-colors
                      hover:bg-primary-light
                      hover:text-primary
                    "
                  >
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-background-soft
                        text-text-secondary
                        transition-colors
                        group-hover:bg-primary
                        group-hover:text-text-white
                      "
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    <span className="flex-1">{link.label}</span>
                    <ArrowRight className="h-3 w-3 text-text-secondary transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

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
              <Bell className="h-5 w-5 text-text-white" strokeWidth={2.2} />
            </motion.div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Never miss a filing
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                Enable client deadline alerts
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Get notified before every client deadline. Customise reminders
                per client or per filing type.
              </p>
            </div>
          </div>

          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="shrink-0 self-start sm:self-auto"
          >
            <Link
              to="/accountant/settings"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
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
              "
            >
              <Bell className="h-3.5 w-3.5" strokeWidth={2.6} />
              <span>Set up alerts</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountantDashboard;