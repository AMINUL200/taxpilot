import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Hash,
  Users,
  Calendar,
  Clock3,
  FileText,
  CheckCircle2,
  AlertCircle,
  Edit3,
  MoreVertical,
  Plus,
  Play,
  PauseCircle,
  Send,
  Download,
  Upload,
  Archive,
  Eye,
  Receipt,
  Copy,
  Check,
  ChevronRight,
  Timer,
  UserCheck,
  MessageSquare,
  Paperclip,
  History,
  Save,
  Info,
} from "lucide-react";

const AccountantFilingsDetails = () => {
  const { filingId } = useParams();
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

  const filing = {
    id: filingId || 1,
    type: "VAT Return",
    period: "Q3 2026",
    status: "In Progress",
    progress: 45,
    dueDate: "30 September 2026",
    daysLeft: 7,
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    assigneeEmail: "alice@taxpilot.co.uk",
    createdAt: "15 Aug 2026",
    lastUpdated: "2 hours ago",
    company: {
      id: 1,
      name: "Imperial Thermal Ltd",
      number: "14803890",
      vrn: "GB449519458",
    },
    client: {
      id: 1,
      name: "Imperial Thermal Ltd",
      contactPerson: "James Mitchell",
      email: "james@imperialthermal.co.uk",
      initials: "IM",
      avatarColor: "bg-primary",
    },
  };

  /* ============================================================
     VAT BOXES
  ============================================================ */

  const vatBoxes = [
    {
      box: 1,
      label: "VAT due on sales and other outputs",
      value: "£12,450.00",
      editable: true,
    },
    {
      box: 2,
      label: "VAT due on EC acquisitions",
      value: "£0.00",
      editable: true,
    },
    {
      box: 3,
      label: "Total VAT due (Box 1 + Box 2)",
      value: "£12,450.00",
      isTotal: true,
    },
    {
      box: 4,
      label: "VAT reclaimed on purchases",
      value: "£8,320.00",
      editable: true,
    },
    {
      box: 5,
      label: "Net VAT (Box 3 − Box 4)",
      value: "£4,130.00",
      isTotal: true,
      highlight: true,
    },
    {
      box: 6,
      label: "Total sales (excl. VAT)",
      value: "£62,250.00",
      editable: true,
    },
    {
      box: 7,
      label: "Total purchases (excl. VAT)",
      value: "£41,600.00",
      editable: true,
    },
    {
      box: 8,
      label: "Goods supplied to EC (excl. VAT)",
      value: "£0.00",
      editable: true,
    },
    {
      box: 9,
      label: "Acquisitions from EC (excl. VAT)",
      value: "£0.00",
      editable: true,
    },
  ];

  /* ============================================================
     TIMELINE
  ============================================================ */

  const timeline = [
    {
      id: 1,
      title: "Filing created",
      description: "VAT Return Q3 2026 started",
      time: "15 Aug 2026, 10:24",
      icon: Plus,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      actor: "Alice Johnson",
    },
    {
      id: 2,
      title: "Documents uploaded",
      description: "3 files uploaded by client",
      time: "20 Aug 2026, 14:11",
      icon: Paperclip,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
      actor: "James Mitchell",
    },
    {
      id: 3,
      title: "Figures entered",
      description: "VAT boxes 1-7 completed",
      time: "22 Aug 2026, 09:47",
      icon: Edit3,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
      actor: "Alice Johnson",
    },
    {
      id: 4,
      title: "Awaiting client approval",
      description: "Draft sent to client for review",
      time: "23 Aug 2026, 16:32",
      icon: UserCheck,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
      actor: "Alice Johnson",
    },
    {
      id: 5,
      title: "Client approved",
      description: "Client confirmed figures are correct",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
      actor: "James Mitchell",
    },
  ];

  /* ============================================================
     ATTACHMENTS
  ============================================================ */

  const attachments = [
    {
      id: 1,
      name: "Q3-bank-statements.pdf",
      size: "2.4 MB",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
    },
    {
      id: 2,
      name: "Q3-sales-report.xlsx",
      size: "842 KB",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
    },
    {
      id: 3,
      name: "Q3-purchase-invoices.zip",
      size: "5.1 MB",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
    },
  ];

  /* ============================================================
     NOTES
  ============================================================ */

  const notes = [
    {
      id: 1,
      author: "Alice Johnson",
      initials: "AJ",
      color: "bg-primary",
      time: "2 days ago",
      text: "Bank statements reconciled. All figures look consistent with the quarterly report.",
    },
    {
      id: 2,
      author: "James Mitchell",
      initials: "JM",
      color: "bg-sky",
      time: "1 day ago",
      text: "Confirmed figures. Ready to submit whenever you are.",
    },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "boxes", label: "VAT Boxes", icon: Receipt },
    {
      id: "attachments",
      label: "Attachments",
      icon: Paperclip,
      count: attachments.length,
    },
    { id: "timeline", label: "Timeline", icon: History },
  ];

  /* ============================================================
     HELPERS
  ============================================================ */

  const getStatusStyles = (status) => {
    switch (status) {
      case "Submitted":
        return {
          bg: "bg-success-light",
          text: "text-success",
          dot: "bg-success",
          icon: CheckCircle2,
        };
      case "In Progress":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          dot: "bg-primary",
          icon: Timer,
        };
      case "Awaiting Client":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          dot: "bg-warning",
          icon: UserCheck,
        };
      case "Overdue":
        return {
          bg: "bg-danger-light",
          text: "text-danger",
          dot: "bg-danger",
          icon: AlertCircle,
        };
      default:
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          dot: "bg-text-secondary",
          icon: Clock3,
        };
    }
  };

  const statusStyles = getStatusStyles(filing.status);
  const StatusIcon = statusStyles.icon;

  const getUrgencyStyles = (days) => {
    if (days < 0) {
      return {
        bg: "bg-danger-light",
        text: "text-danger",
        badge: "bg-danger-light text-danger",
        label: `${Math.abs(days)} days overdue`,
      };
    }
    if (days <= 7) {
      return {
        bg: "bg-warning-light",
        text: "text-warning",
        badge: "bg-warning-light text-warning",
        label: `${days} days left`,
      };
    }
    if (days <= 30) {
      return {
        bg: "bg-primary-light",
        text: "text-primary",
        badge: "bg-primary-light text-primary",
        label: `${days} days left`,
      };
    }
    return {
      bg: "bg-success-light",
      text: "text-success",
      badge: "bg-success-light text-success",
      label: `${days} days left`,
    };
  };

  const urgency = getUrgencyStyles(filing.daysLeft);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const tabContentVariants = {
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
          BREADCRUMB
      ====================================================== */}
      <motion.div variants={fadeUpVariants}>
        <motion.button
          type="button"
          onClick={() => navigate("/accountant/filings")}
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
          <span>Back to Filings</span>
        </motion.button>
      </motion.div>

      {/* ======================================================
          FILING HERO CARD
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
                <FileText className="h-8 w-8 text-text-white" strokeWidth={2} />
              </motion.div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                    {filing.type}
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
                    <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                    {filing.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="h-3.5 w-3.5" />
                    Period: {filing.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    Due {filing.dueDate}
                  </span>
                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      font-bold
                      ${urgency.badge}
                    `}
                  >
                    {urgency.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
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
                <Save className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Save Draft</span>
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
                <Send className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Send to Client</span>
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
                  text-xs
                  font-bold
                  text-text-white
                  shadow-button
                  transition-colors
                  duration-200
                  hover:bg-primary-hover
                "
              >
                <Play className="h-3.5 w-3.5" strokeWidth={2.6} />
                <span>Submit to HMRC</span>
              </motion.button>

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
                        <PauseCircle className="h-3.5 w-3.5" />
                        <span>Pause filing</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                        <span>Export draft</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Send message</span>
                      </button>
                      <div className="my-1 border-t border-border" />
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light">
                        <Archive className="h-3.5 w-3.5" />
                        <span>Archive filing</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 border-t border-border pt-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-[11px]
                    font-bold
                    text-text-white
                    shadow-button
                  "
                >
                  {filing.assigneeInitials}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Assigned to
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-heading">
                    {filing.assignee}
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Progress
                  </p>
                  <p className="text-xs font-bold text-heading">
                    {filing.progress}%
                  </p>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-background-soft">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={
                      shouldReduceMotion ? false : { width: 0 }
                    }
                    animate={{ width: `${filing.progress}%` }}
                    transition={{
                      duration: 1,
                      ease: premiumEase,
                      delay: shouldReduceMotion ? 0 : 0.4,
                    }}
                  />
                </div>
              </div>
            </div>
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
                    layoutId="filing-tab-indicator"
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

        {/* TAB CONTENT */}
        <div className="p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Company + Client cards */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Company */}
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
                        Company
                      </h3>
                    </div>

                    <div className="p-5">
                      <Link
                        to={`/accountant/companies/${filing.company.id}`}
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
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary shadow-button">
                          <Building2
                            className="h-6 w-6 text-text-white"
                            strokeWidth={2}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {filing.company.name}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-text-secondary">
                            <span className="font-mono">
                              #{filing.company.number}
                            </span>
                            <span>·</span>
                            <span className="font-mono">
                              VRN {filing.company.vrn}
                            </span>
                          </div>
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
                        to={`/accountant/clients/${filing.client.id}`}
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
                            ${filing.client.avatarColor}
                          `}
                        >
                          {filing.client.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {filing.client.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                            {filing.client.contactPerson}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                            {filing.client.email}
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

                {/* Filing Info grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoCard
                    icon={FileText}
                    iconBg="bg-primary-light"
                    iconColor="text-primary"
                    label="Filing Type"
                    value={filing.type}
                  />
                  <InfoCard
                    icon={Calendar}
                    iconBg="bg-secondary-light"
                    iconColor="text-secondary"
                    label="Period"
                    value={filing.period}
                  />
                  <InfoCard
                    icon={Clock3}
                    iconBg="bg-warning-light"
                    iconColor="text-warning"
                    label="Due Date"
                    value={filing.dueDate}
                  />
                  <InfoCard
                    icon={Hash}
                    iconBg="bg-success-light"
                    iconColor="text-success"
                    label="Filing ID"
                    value={`#${filing.id}`}
                  />
                </div>

                {/* Notes */}
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
                      <MessageSquare
                        className="h-4 w-4 text-primary"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-heading">
                      Notes
                    </h3>
                  </div>

                  <div className="divide-y divide-border">
                    {notes.map((note, idx) => (
                      <motion.div
                        key={note.id}
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
                        className="flex items-start gap-3 px-5 py-4"
                      >
                        <div
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-[10px]
                            font-bold
                            text-text-white
                            ${note.color}
                          `}
                        >
                          {note.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-xs font-bold text-heading">
                              {note.author}
                            </p>
                            <span className="text-[10px] text-text-secondary">
                              {note.time}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-5 text-text-secondary">
                            {note.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-border p-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add a note..."
                        className="
                          flex-1
                          rounded-lg
                          border
                          border-border
                          bg-background-soft
                          px-3
                          py-2
                          text-xs
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
                        <span>Post</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* VAT BOXES */}
            {activeTab === "boxes" && (
              <motion.div
                key="boxes"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">
                      VAT Return Figures
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      All 9 HMRC boxes for the MTD VAT Return
                    </p>
                  </div>
                  <div
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
                    <Info className="h-3 w-3" strokeWidth={2.4} />
                    Values are editable
                  </div>
                </div>

                {/* Boxes */}
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                  "
                >
                  <div className="divide-y divide-border">
                    {vatBoxes.map((item, idx) => (
                      <motion.div
                        key={item.box}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, x: -6 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : idx * 0.04,
                          duration: 0.4,
                          ease: premiumEase,
                        }}
                        className={`
                          flex
                          items-center
                          justify-between
                          gap-4
                          px-5
                          py-3.5
                          transition-colors
                          hover:bg-background-soft
                          ${item.isTotal ? "bg-primary-light/40" : ""}
                          ${item.highlight ? "bg-primary-light" : ""}
                        `}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-md
                              text-[11px]
                              font-bold
                              ${
                                item.isTotal
                                  ? "bg-primary text-text-white"
                                  : "bg-primary-light text-primary"
                              }
                            `}
                          >
                            {item.box}
                          </span>
                          <p
                            className={`
                              truncate text-xs
                              ${
                                item.isTotal
                                  ? "font-bold text-heading"
                                  : "font-medium text-heading"
                              }
                            `}
                          >
                            {item.label}
                          </p>
                        </div>

                        {item.editable ? (
                          <input
                            type="text"
                            defaultValue={item.value}
                            className="
                              w-[130px]
                              rounded-lg
                              border
                              border-border
                              bg-background
                              px-3
                              py-1.5
                              text-right
                              font-mono
                              text-xs
                              font-bold
                              text-heading
                              outline-none
                              transition-all
                              duration-200
                              focus:border-primary
                              focus:ring-2
                              focus:ring-primary/10
                            "
                          />
                        ) : (
                          <span
                            className={`
                              shrink-0
                              font-mono
                              text-xs
                              font-bold
                              ${
                                item.highlight
                                  ? "text-primary"
                                  : "text-heading"
                              }
                            `}
                          >
                            {item.value}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Info banner */}
                <div
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-border
                    bg-primary-light/50
                    p-4
                  "
                >
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    strokeWidth={2.2}
                  />
                  <p className="text-[11px] leading-6 text-text-secondary">
                    Boxes 3 and 5 are calculated automatically. Only enter values
                    for the other boxes. All amounts should be in GBP and rounded
                    to the nearest penny.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ATTACHMENTS */}
            {activeTab === "attachments" && (
              <motion.div
                key="attachments"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">
                      Attachments
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {attachments.length} files associated with this filing
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
                    <Upload className="h-3.5 w-3.5" strokeWidth={2.6} />
                    Upload
                  </motion.button>
                </div>

                {/* Dropzone */}
                <motion.div
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: premiumEase }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          borderColor: "var(--color-primary)",
                          transition: { duration: 0.2 },
                        }
                  }
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-dashed
                    border-border
                    bg-background-soft
                    px-5
                    py-8
                    text-center
                    transition-colors
                    duration-200
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-primary-light
                      text-primary
                    "
                  >
                    <Upload className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <p className="mt-3 text-xs font-bold text-heading">
                    Drag and drop files here
                  </p>
                  <p className="mt-1 text-[11px] text-text-secondary">
                    or{" "}
                    <button className="font-semibold text-primary underline-offset-2 hover:underline">
                      browse
                    </button>
                  </p>
                  <p className="mt-2 text-[10px] text-text-secondary">
                    PDF, Excel, CSV, ZIP up to 25 MB
                  </p>
                </motion.div>

                {/* File list */}
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                  "
                >
                  <div className="divide-y divide-border">
                    {attachments.map((file, idx) => (
                      <motion.div
                        key={file.id}
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
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                            <FileText
                              className="h-4 w-4 text-primary"
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-heading">
                              {file.name}
                            </p>
                            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[10px] text-text-secondary">
                              <span>{file.size}</span>
                              <span>·</span>
                              <span>Uploaded by {file.uploadedBy}</span>
                              <span>·</span>
                              <span>{file.uploadedAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <motion.button
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
                            <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </motion.button>
                          <motion.button
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
                            <Download
                              className="h-3.5 w-3.5"
                              strokeWidth={2.4}
                            />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TIMELINE */}
            {activeTab === "timeline" && (
              <motion.div
                key="timeline"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-bold text-heading">
                    Filing Timeline
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Complete history of this filing
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-border" />

                  <div className="space-y-4">
                    {timeline.map((event, idx) => {
                      const Icon = event.icon;
                      return (
                        <motion.div
                          key={event.id}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, x: -8 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: shouldReduceMotion ? 0 : idx * 0.06,
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
                              ${event.iconBg}
                            `}
                            style={{ zIndex: 1 }}
                          >
                            <Icon
                              className={`h-4 w-4 ${event.iconColor}`}
                              strokeWidth={2.4}
                            />
                          </div>

                          <div className="min-w-0 flex-1 pb-2">
                            <div className="rounded-xl border border-border bg-background p-3.5">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-heading">
                                    {event.title}
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-text-secondary">
                                    {event.description}
                                  </p>
                                </div>
                                <span className="shrink-0 text-[10px] font-semibold text-text-secondary">
                                  {event.time}
                                </span>
                              </div>
                              {event.actor && (
                                <p className="mt-2 text-[10px] text-text-secondary">
                                  by{" "}
                                  <span className="font-semibold">
                                    {event.actor}
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
   INFO CARD (Reusable)
============================================================ */

const InfoCard = ({ icon: Icon, iconBg, iconColor, label, value }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -2, transition: { duration: 0.2 } }
      }
      className="
        flex
        items-center
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
          ${iconBg}
        `}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
          {label}
        </p>
        <p className="mt-0.5 truncate text-xs font-bold text-heading">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default AccountantFilingsDetails;