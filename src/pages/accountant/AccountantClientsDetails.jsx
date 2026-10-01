import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit3,
  MoreVertical,
  Plus,
  FileText,
  CheckCircle2,
  AlertCircle,
  Users,
  Hash,
  Briefcase,
  Activity,
  FolderOpen,
  Send,
  Download,
  UserPlus,
  Archive,
  Shield,
  Key,
  Eye,
  MessageSquare,
  Receipt,
  CreditCard,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const AccountantClientsDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("overview");
  const [openMenu, setOpenMenu] = useState(false);

  /* ============================================================
     DEMO DATA
  ============================================================ */

  const client = {
    id: clientId || 1,
    clientName: "Imperial Thermal Ltd",
    contactPerson: "James Mitchell",
    jobTitle: "Managing Director",
    email: "james@imperialthermal.co.uk",
    phone: "+44 20 7946 0123",
    website: "https://imperialthermal.co.uk",
    companyNumber: "14803890",
    type: "Limited Company",
    status: "Active",
    vatNumber: "GB449519458",
    utrNumber: "1234567890",
    incorporatedOn: "7 September 2022",
    joinedDate: "12 March 2024",
    initials: "IM",
    avatarColor: "bg-primary",
    registeredAddress: {
      line1: "25 King Street",
      line2: "London",
      postcode: "EC2V 8AU",
      country: "United Kingdom",
    },
    accountant: {
      name: "Alice Johnson",
      role: "Senior Accountant",
      initials: "AJ",
      email: "alice@taxpilot.co.uk",
    },
  };

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "companies",
      label: "Companies",
      value: 3,
      icon: Building2,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "open-filings",
      label: "Open Filings",
      value: 2,
      icon: FileText,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 1,
      icon: AlertCircle,
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
    },
    {
      id: "tasks",
      label: "Open Tasks",
      value: 4,
      icon: CheckCircle2,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
  ];

  /* ============================================================
     LINKED COMPANIES
  ============================================================ */

  const companies = [
    {
      id: 1,
      name: "Imperial Thermal Ltd",
      number: "14803890",
      type: "Private limited Company",
      status: "Active",
      nextFiling: "VAT Return",
      nextFilingDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
    },
    {
      id: 2,
      name: "Imperial Holdings Ltd",
      number: "14803912",
      type: "Private limited Company",
      status: "Active",
      nextFiling: "Annual Accounts",
      nextFilingDate: "15 Dec 2026",
      daysLeft: 84,
      urgency: "low",
    },
    {
      id: 3,
      name: "Imperial Properties Ltd",
      number: "14803945",
      type: "Private limited Company",
      status: "Active",
      nextFiling: "Corporation Tax",
      nextFilingDate: "05 Nov 2026",
      daysLeft: 44,
      urgency: "medium",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "VAT return submitted",
      description: "Q2 2026 · Imperial Thermal Ltd",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
      actor: "Alice J.",
    },
    {
      id: 2,
      title: "Documents uploaded",
      description: "4 files uploaded by client",
      time: "5 hours ago",
      icon: FolderOpen,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      actor: "James M.",
    },
    {
      id: 3,
      title: "Email sent",
      description: "Reminder for Q3 VAT return",
      time: "1 day ago",
      icon: Send,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
      actor: "Alice J.",
    },
    {
      id: 4,
      title: "Note added",
      description: "Waiting on bank statements",
      time: "2 days ago",
      icon: MessageSquare,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
      actor: "John S.",
    },
    {
      id: 5,
      title: "Company added",
      description: "Imperial Properties Ltd linked",
      time: "5 days ago",
      icon: Building2,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      actor: "Alice J.",
    },
  ];

  /* ============================================================
     TASKS
  ============================================================ */

  const tasks = [
    {
      id: 1,
      title: "Review Q3 VAT return",
      status: "In Progress",
      dueDate: "01 Oct 2026",
      assignee: "Alice J.",
      priority: "high",
    },
    {
      id: 2,
      title: "Confirm year-end accounts",
      status: "Awaiting Client",
      dueDate: "15 Oct 2026",
      assignee: "John S.",
      priority: "medium",
    },
    {
      id: 3,
      title: "Chase outstanding invoices",
      status: "Pending",
      dueDate: "20 Oct 2026",
      assignee: "Alice J.",
      priority: "low",
    },
    {
      id: 4,
      title: "Update VAT registration details",
      status: "In Progress",
      dueDate: "05 Nov 2026",
      assignee: "Sarah M.",
      priority: "medium",
    },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    {
      id: "companies",
      label: "Companies",
      icon: Briefcase,
      count: companies.length,
    },
    { id: "tasks", label: "Tasks", icon: CheckCircle2, count: tasks.length },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  /* ============================================================
     HELPERS
  ============================================================ */

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "overdue":
        return {
          bg: "bg-danger-light",
          text: "text-danger",
          dot: "bg-danger",
          badge: "bg-danger-light text-danger",
        };
      case "high":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          dot: "bg-warning",
          badge: "bg-warning-light text-warning",
        };
      case "medium":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          dot: "bg-primary",
          badge: "bg-primary-light text-primary",
        };
      default:
        return {
          bg: "bg-success-light",
          text: "text-success",
          dot: "bg-success",
          badge: "bg-success-light text-success",
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
      case "Active":
        return {
          bg: "bg-success-light",
          text: "text-success",
          dot: "bg-success",
        };
      case "In Progress":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          dot: "bg-primary",
        };
      case "Awaiting Client":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          dot: "bg-warning",
        };
      case "Pending":
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          dot: "bg-text-secondary",
        };
      default:
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          dot: "bg-text-secondary",
        };
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-danger-light text-danger";
      case "medium":
        return "bg-warning-light text-warning";
      default:
        return "bg-success-light text-success";
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
      : { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: premiumEase },
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

  const menuVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -6, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: premiumEase },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -4,
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
          BREADCRUMB
      ====================================================== */}
      <motion.div variants={fadeUpVariants}>
        <motion.button
          type="button"
          onClick={() => navigate("/accountant/clients")}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { x: -2, transition: { duration: 0.2 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className="
            inline-flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-text-secondary
            transition-colors
            hover:text-primary
          "
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
          <span>Back to Clients</span>
        </motion.button>
      </motion.div>

      {/* ======================================================
          CLIENT HERO CARD
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-background
          shadow-card
        "
      >
        {/* Decorative background */}
        <motion.div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-primary-light
            opacity-50
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative p-6 sm:p-7">
          {/* Top row */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Avatar + identity */}
            <div className="flex items-start gap-4">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.6, rotate: -12 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.15,
                }}
                className={`
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  text-xl
                  font-bold
                  text-text-white
                  shadow-button
                  ${client.avatarColor}
                `}
              >
                {client.initials}
              </motion.div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                    {client.clientName}
                  </h1>
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-success-light
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      text-success
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    {client.status}
                  </span>
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-background-soft
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      text-text-secondary
                    "
                  >
                    {client.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                  <span className="flex items-center gap-1.5 font-mono font-semibold">
                    <Hash className="h-3.5 w-3.5" />
                    {client.companyNumber}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserPlus className="h-3.5 w-3.5" />
                    {client.contactPerson}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Client since {client.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  to={`/accountant/clients/${client.id}/edit`}
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
                    text-xs
                    font-semibold
                    text-heading
                    transition-colors
                    duration-200
                    hover:border-primary
                    hover:bg-primary-light
                    hover:text-primary
                  "
                >
                  <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
                  <span>Edit</span>
                </Link>
              </motion.div>

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
                  border-primary
                  bg-background
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-primary
                  transition-colors
                  duration-200
                  hover:bg-primary
                  hover:text-text-white
                "
              >
                <Send className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Send Message</span>
              </motion.button>

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
                    text-xs
                    font-bold
                    text-text-white
                    shadow-button
                    transition-colors
                    duration-200
                    hover:bg-primary-hover
                  "
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                  <span>Start Filing</span>
                </Link>
              </motion.div>

              {/* More menu */}
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => setOpenMenu((prev) => !prev)}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.05, transition: { duration: 0.15 } }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.95 }
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-border
                    bg-background
                    text-heading
                    transition-colors
                    duration-200
                    hover:border-primary
                    hover:text-primary
                  "
                  aria-label="More actions"
                >
                  <MoreVertical className="h-4 w-4" />
                </motion.button>

                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="
                        absolute
                        right-0
                        top-full
                        z-30
                        mt-2
                        w-52
                        overflow-hidden
                        rounded-xl
                        border
                        border-border
                        bg-background
                        py-1
                        shadow-card-hover
                      "
                    >
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Receipt className="h-3.5 w-3.5" />
                        <span>View invoices</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Permissions</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Key className="h-3.5 w-3.5" />
                        <span>Reset access</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                        <span>Export data</span>
                      </button>
                      <div className="my-1 border-t border-border" />
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light">
                        <Archive className="h-3.5 w-3.5" />
                        <span>Archive client</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  variants={statCardVariants}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2, transition: { duration: 0.2 } }
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    border
                    border-border
                    bg-background-soft
                    p-3
                    transition-colors
                    duration-200
                    hover:border-primary/20
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
                      ${stat.iconBg}
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 ${stat.iconColor}`}
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-heading">
                      {stat.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          TABS
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="
          rounded-xl
          border
          border-border
          bg-background
          shadow-card
        "
      >
        <div className="flex gap-1 overflow-x-auto border-b border-border px-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className={`
                  group
                  relative
                  flex
                  shrink-0
                  items-center
                  gap-2
                  px-4
                  py-4
                  text-sm
                  font-semibold
                  transition-colors
                  ${
                    isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  }
                `}
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`
                      rounded-full
                      px-1.5
                      py-0.5
                      text-[9px]
                      font-bold
                      ${
                        isActive
                          ? "bg-primary text-text-white"
                          : "bg-background-soft text-text-secondary"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <motion.span
                    layoutId="client-tab-indicator"
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      h-0.5
                      rounded-t-full
                      bg-primary
                    "
                    transition={{
                      duration: 0.3,
                      ease: premiumEase,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ======================================================
            TAB CONTENT
        ====================================================== */}
        <div className="p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {/* ================================================
                OVERVIEW
            ================================================ */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.35, ease: premiumEase }}
                className="space-y-6"
              >
                {/* Contact + Company details grid */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Contact Information */}
                  <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-background
                    "
                  >
                    <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                        <Mail
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Contact Information
                      </h3>
                    </div>

                    <div className="divide-y divide-border">
                      <InfoRow
                        icon={UserPlus}
                        label="Contact Person"
                        value={client.contactPerson}
                        hint={client.jobTitle}
                      />
                      <InfoRow
                        icon={Mail}
                        label="Email"
                        value={client.email}
                        action="mailto"
                        href={`mailto:${client.email}`}
                      />
                      <InfoRow
                        icon={Phone}
                        label="Phone"
                        value={client.phone}
                        action="phone"
                        href={`tel:${client.phone}`}
                      />
                      <InfoRow
                        icon={Globe}
                        label="Website"
                        value={client.website}
                        action="external"
                        href={client.website}
                      />
                    </div>
                  </motion.div>

                  {/* Company Details */}
                  <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-background
                    "
                  >
                    <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                        <Building2
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Company Details
                      </h3>
                    </div>

                    <div className="divide-y divide-border">
                      <InfoRow
                        icon={Hash}
                        label="Company Number"
                        value={client.companyNumber}
                        isMono
                      />
                      <InfoRow
                        icon={Receipt}
                        label="VAT Number"
                        value={client.vatNumber}
                        isMono
                      />
                      <InfoRow
                        icon={CreditCard}
                        label="UTR Number"
                        value={client.utrNumber}
                        isMono
                      />
                      <InfoRow
                        icon={Calendar}
                        label="Incorporated On"
                        value={client.incorporatedOn}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Registered Address + Accountant */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Address */}
                  <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-background
                    "
                  >
                    <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                        <MapPin
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Registered Address
                      </h3>
                    </div>

                    <div className="p-5">
                      <div className="rounded-lg border border-border bg-background-soft p-4">
                        <p className="text-sm font-bold text-heading">
                          {client.registeredAddress.line1}
                        </p>
                        <p className="mt-1 text-xs text-heading">
                          {client.registeredAddress.line2}
                        </p>
                        <p className="mt-1 font-mono text-xs text-heading">
                          {client.registeredAddress.postcode}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          {client.registeredAddress.country}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Accountant */}
                  <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-background
                    "
                  >
                    <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                        <Users
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Assigned Accountant
                      </h3>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-4 rounded-lg border border-border bg-background-soft p-4">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-primary
                            text-sm
                            font-bold
                            text-text-white
                            shadow-button
                          "
                        >
                          {client.accountant.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-heading">
                            {client.accountant.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                            {client.accountant.role}
                          </p>
                          <a
                            href={`mailto:${client.accountant.email}`}
                            className="
                              mt-1
                              inline-flex
                              items-center
                              gap-1
                              truncate
                              text-[11px]
                              font-semibold
                              text-primary
                              transition-colors
                              hover:text-primary-hover
                            "
                          >
                            {client.accountant.email}
                          </a>
                        </div>
                      </div>

                      <motion.button
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -1, transition: { duration: 0.2 } }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.98 }
                        }
                        className="
                          mt-4
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
                        <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
                        <span>Reassign</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ================================================
                COMPANIES
            ================================================ */}
            {activeTab === "companies" && (
              <motion.div
                key="companies"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.35, ease: premiumEase }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">
                      Linked Companies
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {companies.length} companies registered under this client
                    </p>
                  </div>
                  <motion.button
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
                      gap-2
                      self-start
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
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                    Link Company
                  </motion.button>
                </div>

                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                  "
                >
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b border-border bg-background-soft">
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Company
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Type
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Next Filing
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Status
                          </th>
                          <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {companies.map((company, index) => {
                          const urgency = getUrgencyStyles(company.urgency);
                          return (
                            <motion.tr
                              key={company.id}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : { opacity: 0, y: 8 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: shouldReduceMotion
                                  ? 0
                                  : index * 0.06,
                                duration: 0.45,
                                ease: premiumEase,
                              }}
                              className="
                                transition-colors
                                hover:bg-background-soft
                              "
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                                    <Building2
                                      className="h-4 w-4 text-primary"
                                      strokeWidth={2.2}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-heading">
                                      {company.name}
                                    </p>
                                    <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                                      #{company.number}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <span className="text-xs text-text-secondary">
                                  {company.type}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <div>
                                  <p className="text-xs font-semibold text-heading">
                                    {company.nextFiling}
                                  </p>
                                  <p
                                    className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                                  >
                                    {company.nextFilingDate} ·{" "}
                                    {getDaysLabel(company.daysLeft)}
                                  </p>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <span
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    bg-success-light
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-bold
                                    text-success
                                  "
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                  {company.status}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <Link
                                  to={`/accountant/companies/${company.id}`}
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
                                  <Eye
                                    className="h-3 w-3"
                                    strokeWidth={2.4}
                                  />
                                  <span>View</span>
                                </Link>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================================================
                TASKS
            ================================================ */}
            {activeTab === "tasks" && (
              <motion.div
                key="tasks"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.35, ease: premiumEase }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">
                      Open Tasks
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {tasks.length} tasks associated with this client
                    </p>
                  </div>
                  <motion.button
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
                      gap-2
                      self-start
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
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                    New Task
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {tasks.map((task, index) => {
                    const statusStyles = getStatusStyles(task.status);
                    return (
                      <motion.div
                        key={task.id}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, x: -8 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : index * 0.06,
                          duration: 0.45,
                          ease: premiumEase,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -2, transition: { duration: 0.2 } }
                        }
                        className="
                          flex
                          flex-col
                          gap-3
                          rounded-xl
                          border
                          border-border
                          bg-background
                          p-4
                          transition-[border-color,box-shadow]
                          duration-200
                          hover:border-primary/30
                          hover:shadow-card
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                            <CheckCircle2
                              className="h-4 w-4 text-primary"
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-bold text-heading">
                                {task.title}
                              </p>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getPriorityStyles(
                                  task.priority,
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-text-secondary">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {task.dueDate}
                              </span>
                              <span className="hidden sm:inline">·</span>
                              <span>Assignee: {task.assignee}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
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
                            {task.status}
                          </span>
                          <button
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              text-text-secondary
                              transition-colors
                              hover:bg-primary-light
                              hover:text-primary
                            "
                          >
                            <ChevronRight
                              className="h-4 w-4"
                              strokeWidth={2.4}
                            />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ================================================
                ACTIVITY
            ================================================ */}
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.35, ease: premiumEase }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-sm font-bold text-heading">
                    Recent Activity
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Latest actions and updates from this client
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-border" />

                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <motion.div
                          key={activity.id}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, x: -8 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: shouldReduceMotion ? 0 : index * 0.06,
                            duration: 0.45,
                            ease: premiumEase,
                          }}
                          className="relative flex gap-4"
                        >
                          <div
                            className={`
                              relative
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border-4
                              border-background
                              ${activity.iconBg}
                            `}
                            style={{ zIndex: 1 }}
                          >
                            <Icon
                              className={`h-4 w-4 ${activity.iconColor}`}
                              strokeWidth={2.4}
                            />
                          </div>

                          <div className="min-w-0 flex-1 pb-2">
                            <div className="rounded-xl border border-border bg-background p-3.5">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-heading">
                                    {activity.title}
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-text-secondary">
                                    {activity.description}
                                  </p>
                                </div>
                                <span className="shrink-0 text-[10px] font-semibold text-text-secondary">
                                  {activity.time}
                                </span>
                              </div>
                              {activity.actor && (
                                <p className="mt-2 text-[10px] text-text-secondary">
                                  by{" "}
                                  <span className="font-semibold">
                                    {activity.actor}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <motion.button
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
                    <Activity className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>View all activity</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   INFO ROW (Reusable)
============================================================ */

const InfoRow = ({ icon: Icon, label, value, hint, isMono, action, href }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : { x: 2, transition: { duration: 0.2 } }
      }
      className="
        flex
        items-center
        justify-between
        gap-4
        px-5
        py-3.5
        transition-colors
        hover:bg-background-soft
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background-soft">
          <Icon className="h-3.5 w-3.5 text-text-secondary" strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            {label}
          </p>
          <p
            className={`
              mt-0.5 truncate text-sm font-semibold text-heading
              ${isMono ? "font-mono" : ""}
            `}
          >
            {value}
          </p>
          {hint && (
            <p className="mt-0.5 truncate text-[10px] text-text-secondary">
              {hint}
            </p>
          )}
        </div>
      </div>

      {(action === "external" ||
        action === "mailto" ||
        action === "phone") && (
        <a
          href={href}
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-text-secondary
            transition-colors
            hover:bg-primary-light
            hover:text-primary
          "
          aria-label={`Open ${label}`}
        >
          {action === "external" ? (
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.4} />
          ) : (
            <Send className="h-3.5 w-3.5" strokeWidth={2.4} />
          )}
        </a>
      )}
    </motion.div>
  );
};

export default AccountantClientsDetails;