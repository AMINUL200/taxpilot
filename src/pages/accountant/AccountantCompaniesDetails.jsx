import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Hash,
  MapPin,
  Calendar,
  ExternalLink,
  Edit3,
  MoreVertical,
  Plus,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Users,
  Briefcase,
  Activity,
  FolderOpen,
  Send,
  Download,
  Archive,
  Eye,
  Receipt,
  CreditCard,
  Shield,
  Copy,
  Check,
  ChevronRight,
  Landmark,
  Globe,
  ArrowRight,
} from "lucide-react";

const AccountantCompaniesDetails = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("overview");
  const [openMenu, setOpenMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ============================================================
     DEMO DATA
  ============================================================ */

  const company = {
    id: companyId || 1,
    name: "Imperial Thermal Ltd",
    number: "14803890",
    type: "Private limited Company",
    status: "Active",
    incorporatedOn: "07 September 2022",
    vrn: "GB449519458",
    utrNumber: "1234567890",
    sicCodes: [
      "43220 - Plumbing, heat and air-conditioning installation",
      "46740 - Wholesale of hardware, plumbing and heating equipment",
    ],
    registeredOffice: {
      line1: "25 King Street",
      line2: "London",
      postcode: "EC2V 8AU",
      country: "United Kingdom",
    },
    client: {
      id: 1,
      name: "Imperial Thermal Ltd",
      contactPerson: "James Mitchell",
      email: "james@imperialthermal.co.uk",
      initials: "IM",
      avatarColor: "bg-primary",
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
      id: "filings",
      label: "Filings This Year",
      value: 8,
      icon: FileText,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "open",
      label: "Open Filings",
      value: 2,
      icon: Clock3,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
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
      id: "officers",
      label: "Officers",
      value: 2,
      icon: Users,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
  ];

  /* ============================================================
     NEXT FILINGS
  ============================================================ */

  const nextFilings = [
    {
      id: 1,
      type: "VAT Return",
      period: "Q3 2026",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      status: "Overdue",
    },
    {
      id: 2,
      type: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Nov 2026",
      daysLeft: 44,
      urgency: "medium",
      status: "Ready to file",
    },
    {
      id: 3,
      type: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Dec 2026",
      daysLeft: 84,
      urgency: "low",
      status: "Not started",
    },
  ];

  /* ============================================================
     FILING HISTORY
  ============================================================ */

  const filingHistory = [
    {
      id: 1,
      date: "02 Jul 2026",
      type: "VAT Return",
      period: "Q2 2026",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 2,
      date: "15 Jun 2026",
      type: "Corporation Tax (CT600)",
      period: "FY 2024/25",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 3,
      date: "28 Apr 2026",
      type: "Annual Accounts",
      period: "FY 2024/25",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 4,
      date: "05 Apr 2026",
      type: "VAT Return",
      period: "Q1 2026",
      status: "Filed",
      filedBy: "John S.",
    },
    {
      id: 5,
      date: "20 Jan 2026",
      type: "VAT Return",
      period: "Q4 2025",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 6,
      date: "15 Dec 2025",
      type: "Confirmation Statement",
      period: "Annual",
      status: "Filed",
      filedBy: "Sarah M.",
    },
  ];

  /* ============================================================
     OFFICERS
  ============================================================ */

  const officers = [
    {
      id: 1,
      name: "James Mitchell",
      role: "Director",
      status: "Active",
      appointedOn: "07 Sep 2022",
      nationality: "British",
      dateOfBirth: "March 1985",
      initials: "JM",
      avatarColor: "bg-primary",
      email: "james@imperialthermal.co.uk",
    },
    {
      id: 2,
      name: "Sophie Mitchell",
      role: "Secretary",
      status: "Active",
      appointedOn: "07 Sep 2022",
      nationality: "British",
      dateOfBirth: "August 1987",
      initials: "SM",
      avatarColor: "bg-sky",
      email: "sophie@imperialthermal.co.uk",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "VAT return submitted",
      description: "Q2 2026 · HMRC accepted",
      time: "2 days ago",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
      actor: "Alice J.",
    },
    {
      id: 2,
      title: "Documents uploaded",
      description: "Bank statements for Q3",
      time: "5 days ago",
      icon: FolderOpen,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      actor: "James M.",
    },
    {
      id: 3,
      title: "CT600 draft created",
      description: "Awaiting approval",
      time: "1 week ago",
      icon: FileText,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
      actor: "Alice J.",
    },
    {
      id: 4,
      title: "VAT number verified",
      description: "HMRC name: IMPERIAL THERMAL LTD",
      time: "2 weeks ago",
      icon: Shield,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
      actor: "System",
    },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    {
      id: "filings",
      label: "Filings",
      icon: FileText,
      count: filingHistory.length,
    },
    { id: "officers", label: "Officers", icon: Users, count: officers.length },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          badge: "bg-danger-light text-danger",
          dot: "bg-danger",
        };
      case "high":
        return {
          bg: "bg-warning-light",
          border: "border-warning/20",
          text: "text-warning",
          badge: "bg-warning-light text-warning",
          dot: "bg-warning",
        };
      case "medium":
        return {
          bg: "bg-primary-light",
          border: "border-primary/20",
          text: "text-primary",
          badge: "bg-primary-light text-primary",
          dot: "bg-primary",
        };
      default:
        return {
          bg: "bg-success-light",
          border: "border-success/20",
          text: "text-success",
          badge: "bg-success-light text-success",
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
          onClick={() => navigate("/accountant/companies")}
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
          <span>Back to Companies</span>
        </motion.button>
      </motion.div>

      {/* ======================================================
          COMPANY HERO CARD
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
        {/* Decorative glow */}
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
            {/* Left: identity */}
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
                className="
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary
                  shadow-button
                "
              >
                <Building2 className="h-8 w-8 text-text-white" strokeWidth={2} />
              </motion.div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                    {company.name}
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
                    {company.status}
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
                    {company.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                  <button
                    type="button"
                    onClick={() => handleCopy(company.number)}
                    className="
                      flex
                      items-center
                      gap-1.5
                      font-mono
                      font-semibold
                      transition-colors
                      hover:text-primary
                    "
                  >
                    <Hash className="h-3.5 w-3.5" />
                    {company.number}
                    {copied ? (
                      <Check
                        className="h-3 w-3 text-success"
                        strokeWidth={3}
                      />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Incorporated {company.incorporatedOn}
                  </span>
                  <a
                    href={`https://find-and-update.company-information.service.gov.uk/company/${company.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-1.5
                      font-semibold
                      text-primary
                      transition-colors
                      hover:text-primary-hover
                    "
                  >
                    <ExternalLink className="h-3 w-3" />
                    Companies House
                  </a>
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
                  to={`/accountant/companies/${company.id}/edit`}
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

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <Link
                  to={`/accountant/filings/new?company=${company.number}`}
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
                        <Download className="h-3.5 w-3.5" />
                        <span>Export data</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <FolderOpen className="h-3.5 w-3.5" />
                        <span>Manage documents</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Permissions</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <RefreshCwIcon className="h-3.5 w-3.5" />
                        <span>Sync from CH</span>
                      </button>
                      <div className="my-1 border-t border-border" />
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light">
                        <Archive className="h-3.5 w-3.5" />
                        <span>Archive company</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
            {stats.map((stat) => {
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
                    layoutId="company-tab-indicator"
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      h-0.5
                      rounded-t-full
                      bg-primary
                    "
                    transition={{ duration: 0.3, ease: premiumEase }}
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
                {/* Next Filings */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light">
                      <Clock3
                        className="h-4 w-4 text-primary"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-heading">
                      Upcoming Filings
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {nextFilings.map((filing, index) => {
                      const urgency = getUrgencyStyles(filing.urgency);
                      return (
                        <motion.div
                          key={filing.id}
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
                          className={`
                            flex
                            flex-col
                            gap-3
                            rounded-xl
                            border
                            p-4
                            transition-[border-color,box-shadow]
                            duration-200
                            hover:shadow-card
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            ${urgency.bg}
                            ${urgency.border}
                          `}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-background
                                border
                                ${urgency.border}
                              `}
                            >
                              <FileText
                                className={`h-4 w-4 ${urgency.text}`}
                                strokeWidth={2.2}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-heading">
                                {filing.type}
                              </p>
                              <p className="mt-0.5 text-[11px] text-text-secondary">
                                {filing.period}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-4 pl-13 sm:pl-0">
                            <div className="text-right">
                              <p className="text-xs font-bold text-heading">
                                {filing.dueDate}
                              </p>
                              <p
                                className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                              >
                                {getDaysLabel(filing.daysLeft)}
                              </p>
                            </div>
                            <motion.div
                              whileHover={
                                shouldReduceMotion
                                  ? undefined
                                  : { y: -1, transition: { duration: 0.2 } }
                              }
                              whileTap={
                                shouldReduceMotion
                                  ? undefined
                                  : { scale: 0.98 }
                              }
                            >
                              <Link
                                to="/accountant/filings/new"
                                className="
                                  inline-flex
                                  items-center
                                  gap-1
                                  rounded-lg
                                  bg-primary
                                  px-3.5
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
                                <ArrowRight
                                  className="h-3 w-3"
                                  strokeWidth={2.6}
                                />
                              </Link>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Company Information */}
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
                        <Landmark
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Company Information
                      </h3>
                    </div>

                    <div className="divide-y divide-border">
                      <InfoRow
                        icon={Hash}
                        label="Company Number"
                        value={company.number}
                        isMono
                        onCopy={() => handleCopy(company.number)}
                      />
                      <InfoRow
                        icon={Receipt}
                        label="VAT Number"
                        value={company.vrn}
                        isMono
                        onCopy={() => handleCopy(company.vrn)}
                      />
                      <InfoRow
                        icon={CreditCard}
                        label="UTR Number"
                        value={company.utrNumber}
                        isMono
                      />
                      <InfoRow
                        icon={Briefcase}
                        label="Company Type"
                        value={company.type}
                      />
                      <InfoRow
                        icon={Calendar}
                        label="Incorporated On"
                        value={company.incorporatedOn}
                      />
                    </div>
                  </motion.div>

                  {/* Registered Office + Client */}
                  <div className="space-y-5">
                    {/* Registered Office */}
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
                          Registered Office
                        </h3>
                      </div>

                      <div className="p-5">
                        <div className="rounded-lg border border-border bg-background-soft p-4">
                          <p className="text-sm font-bold text-heading">
                            {company.registeredOffice.line1}
                          </p>
                          <p className="mt-1 text-xs text-heading">
                            {company.registeredOffice.line2}
                          </p>
                          <p className="mt-1 font-mono text-xs text-heading">
                            {company.registeredOffice.postcode}
                          </p>
                          <p className="mt-1 text-xs text-text-secondary">
                            {company.registeredOffice.country}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Client */}
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
                          Client
                        </h3>
                      </div>

                      <div className="p-5">
                        <Link
                          to={`/accountant/clients/${company.client.id}`}
                          className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-lg
                            border
                            border-border
                            bg-background-soft
                            p-4
                            transition-[border-color,box-shadow]
                            duration-200
                            hover:border-primary/30
                            hover:shadow-card
                          "
                        >
                          <div
                            className={`
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              text-sm
                              font-bold
                              text-text-white
                              shadow-button
                              ${company.client.avatarColor}
                            `}
                          >
                            {company.client.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                              {company.client.name}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                              {company.client.contactPerson}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                              {company.client.email}
                            </p>
                          </div>
                          <ChevronRight
                            className="
                              h-4
                              w-4
                              shrink-0
                              text-text-secondary
                              transition-all
                              duration-200
                              group-hover:translate-x-0.5
                              group-hover:text-primary
                            "
                            strokeWidth={2.4}
                          />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* SIC Codes */}
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
                      <Globe
                        className="h-4 w-4 text-primary"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-heading">
                      Nature of Business (SIC Codes)
                    </h3>
                  </div>

                  <div className="divide-y divide-border">
                    {company.sicCodes.map((sic, idx) => (
                      <motion.div
                        key={idx}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, x: -6 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : idx * 0.06,
                          duration: 0.4,
                          ease: premiumEase,
                        }}
                        className="flex items-start gap-3 px-5 py-3.5"
                      >
                        <span
                          className="
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            bg-primary-light
                            text-[10px]
                            font-bold
                            text-primary
                          "
                        >
                          {idx + 1}
                        </span>
                        <p className="text-xs leading-5 text-heading">
                          {sic}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ================================================
                FILINGS
            ================================================ */}
            {activeTab === "filings" && (
              <motion.div
                key="filings"
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
                      Filing History
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {filingHistory.length} filings submitted
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
                      hover:text-primary
                    "
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>Export</span>
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
                            Date
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Filing
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Period
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Status
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Filed By
                          </th>
                          <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filingHistory.map((filing, index) => (
                          <motion.tr
                            key={filing.id}
                            initial={
                              shouldReduceMotion
                                ? false
                                : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: shouldReduceMotion
                                ? 0
                                : index * 0.05,
                              duration: 0.45,
                              ease: premiumEase,
                            }}
                            className="
                              transition-colors
                              hover:bg-background-soft
                            "
                          >
                            <td className="px-5 py-4">
                              <span className="text-xs font-semibold text-heading">
                                {filing.date}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                                  <FileText
                                    className="h-3.5 w-3.5 text-primary"
                                    strokeWidth={2.2}
                                  />
                                </div>
                                <span className="text-xs font-semibold text-heading">
                                  {filing.type}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-xs text-text-secondary">
                                {filing.period}
                              </span>
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
                                <CheckCircle2
                                  className="h-3 w-3"
                                  strokeWidth={2.4}
                                />
                                {filing.status}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-xs text-text-secondary">
                                {filing.filedBy}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button
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
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================================================
                OFFICERS
            ================================================ */}
            {activeTab === "officers" && (
              <motion.div
                key="officers"
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
                      Company Officers
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      Directors, secretaries and persons with significant
                      control
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {officers.map((officer, index) => (
                    <motion.div
                      key={officer.id}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : index * 0.08,
                        duration: 0.5,
                        ease: premiumEase,
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -2, transition: { duration: 0.2 } }
                      }
                      className="
                        overflow-hidden
                        rounded-xl
                        border
                        border-border
                        bg-background
                        transition-[border-color,box-shadow]
                        duration-200
                        hover:border-primary/30
                        hover:shadow-card
                      "
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between gap-4 border-b border-border bg-background-soft p-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              text-sm
                              font-bold
                              text-text-white
                              shadow-button
                              ${officer.avatarColor}
                            `}
                          >
                            {officer.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-bold text-heading">
                                {officer.name}
                              </p>
                              <span
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  bg-success-light
                                  px-2
                                  py-0.5
                                  text-[9px]
                                  font-bold
                                  text-success
                                "
                              >
                                <span className="h-1 w-1 rounded-full bg-success" />
                                {officer.status}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] text-text-secondary">
                              {officer.role}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="divide-y divide-border">
                        <InfoRow
                          icon={Calendar}
                          label="Appointed On"
                          value={officer.appointedOn}
                        />
                        <InfoRow
                          icon={Calendar}
                          label="Date of Birth"
                          value={officer.dateOfBirth}
                        />
                        <InfoRow
                          icon={Globe}
                          label="Nationality"
                          value={officer.nationality}
                        />
                        <InfoRow
                          icon={Send}
                          label="Email"
                          value={officer.email}
                          action="mailto"
                          href={`mailto:${officer.email}`}
                        />
                      </div>
                    </motion.div>
                  ))}
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
                    Latest actions and updates for this company
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

const InfoRow = ({
  icon: Icon,
  label,
  value,
  isMono,
  action,
  href,
  onCopy,
}) => {
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
        </div>
      </div>

      {onCopy && (
        <motion.button
          type="button"
          onClick={onCopy}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { scale: 1.1, transition: { duration: 0.15 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
          aria-label={`Copy ${label}`}
        >
          <Copy className="h-3.5 w-3.5" strokeWidth={2.4} />
        </motion.button>
      )}

      {(action === "external" || action === "mailto" || action === "phone") && (
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

/* Small inline fallback icon for RefreshCw */
const RefreshCwIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export default AccountantCompaniesDetails;