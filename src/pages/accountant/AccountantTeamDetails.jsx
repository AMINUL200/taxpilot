import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  MoreVertical,
  Plus,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Building2,
  Briefcase,
  Activity,
  Send,
  Download,
  UserPlus,
  Star,
  Shield,
  Key,
  Eye,
  Copy,
  Check,
  Crown,
  UserCheck,
  User,
  BarChart3,
  Award,
  Globe,
  Trash2,
  ExternalLink,
} from "lucide-react";

const AccountantTeamDetails = () => {
  const { memberId } = useParams();
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

  const member = {
    id: memberId || 1,
    name: "Alice Johnson",
    email: "alice@taxpilot.co.uk",
    phone: "+44 20 7946 0958",
    role: "Owner",
    title: "Senior Accountant",
    status: "Active",
    initials: "AJ",
    avatarColor: "bg-primary",
    joinedDate: "15 January 2023",
    lastActive: "Today, 09:24",
    location: "London, UK",
    timezone: "Europe/London",
    bio: "Senior accountant with 10+ years of experience in UK tax compliance. Specialises in VAT returns, Corporation Tax and advisory services for growing businesses.",
    specialities: ["VAT", "CT600", "Advisory", "Payroll"],
    manager: {
      name: "Self",
      role: "Owner",
    },
  };

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "clients",
      label: "Clients",
      value: 18,
      change: "+2 this month",
      icon: Users,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "tasks",
      label: "Active Tasks",
      value: 14,
      change: "3 due soon",
      icon: FileText,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
    {
      id: "completed",
      label: "Completed",
      value: 22,
      change: "This month",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 1,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
    },
  ];

  /* ============================================================
     ASSIGNED CLIENTS
  ============================================================ */

  const assignedClients = [
    {
      id: 1,
      name: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      vrn: "GB449519458",
      type: "Limited Company",
      activeTasks: 3,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Green Tech Ltd",
      companyNumber: "07895432",
      vrn: "GB123456789",
      type: "Limited Company",
      activeTasks: 2,
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      name: "Skil Four Ltd",
      companyNumber: "05513948",
      vrn: "",
      type: "Limited Company",
      activeTasks: 4,
      lastActivity: "5 hours ago",
    },
    {
      id: 4,
      name: "Digital Solutions Ltd",
      companyNumber: "99887766",
      vrn: "GB887766554",
      type: "Limited Company",
      activeTasks: 3,
      lastActivity: "Yesterday",
    },
    {
      id: 5,
      name: "Bright Ideas Ltd",
      companyNumber: "11223344",
      vrn: "GB112233445",
      type: "Limited Company",
      activeTasks: 2,
      lastActivity: "3 hours ago",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "Filed VAT Return for Imperial Thermal Ltd",
      description: "Q3 2026 · HMRC accepted",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    {
      id: 2,
      title: "Created task: Prepare CT600 draft",
      description: "Digital Solutions Ltd · Due 5 Oct",
      time: "5 hours ago",
      icon: FileText,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: 3,
      title: "Sent reminder to Skil Four Ltd",
      description: "Missing bank statements",
      time: "Yesterday",
      icon: Send,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      id: 4,
      title: "Added new client",
      description: "Bright Ideas Ltd",
      time: "3 days ago",
      icon: UserPlus,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
    {
      id: 5,
      title: "Updated profile information",
      description: "Changed phone number and bio",
      time: "1 week ago",
      icon: Edit3,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
  ];

  /* ============================================================
     PERFORMANCE DATA
  ============================================================ */

  const performanceData = [
    { month: "Apr", filings: 18, tasks: 24 },
    { month: "May", filings: 22, tasks: 28 },
    { month: "Jun", filings: 25, tasks: 30 },
    { month: "Jul", filings: 20, tasks: 26 },
    { month: "Aug", filings: 24, tasks: 32 },
    { month: "Sep", filings: 22, tasks: 30 },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    {
      id: "clients",
      label: "Clients",
      icon: Users,
      count: assignedClients.length,
    },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "performance", label: "Performance", icon: BarChart3 },
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
      default:
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          icon: User,
        };
    }
  };

  const roleStyles = getRoleStyles(member.role);
  const RoleIcon = roleStyles.icon;

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
          onClick={() => navigate("/accountant/team")}
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
          <span>Back to Team</span>
        </motion.button>
      </motion.div>

      {/* ======================================================
          MEMBER HERO CARD
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
                  ${member.avatarColor}
                `}
              >
                {member.initials}
              </motion.div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                    {member.name}
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
                      ${roleStyles.bg}
                      ${roleStyles.text}
                    `}
                  >
                    <RoleIcon className="h-3 w-3" strokeWidth={2.4} />
                    {member.role}
                  </span>
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
                    {member.status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-text-secondary">
                  {member.title}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                  <button
                    type="button"
                    onClick={() => handleCopy(member.email)}
                    className="
                      flex
                      items-center
                      gap-1.5
                      font-semibold
                      transition-colors
                      hover:text-primary
                    "
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {member.email}
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
                    <MapPin className="h-3.5 w-3.5" />
                    {member.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {member.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
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
                  to={`/accountant/team/${member.id}/edit`}
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
                <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                <span>Assign Task</span>
              </motion.button>

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
                        <Key className="h-3.5 w-3.5" />
                        <span>Reset password</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Change permissions</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                        <span>Export data</span>
                      </button>
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                        <Clock3 className="h-3.5 w-3.5" />
                        <span>View activity log</span>
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
                    <p className="text-[10px] text-text-secondary">
                      {stat.change}
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
                    layoutId="member-tab-indicator"
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
                {/* Bio */}
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
                      <User
                        className="h-4 w-4 text-primary"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-heading">
                      About {member.name.split(" ")[0]}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-xs leading-6 text-text-secondary">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>

                {/* Contact + Work info */}
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
                        icon={Mail}
                        label="Email"
                        value={member.email}
                        action="mailto"
                        href={`mailto:${member.email}`}
                      />
                      <InfoRow
                        icon={Phone}
                        label="Phone"
                        value={member.phone}
                        action="phone"
                        href={`tel:${member.phone}`}
                      />
                      <InfoRow
                        icon={MapPin}
                        label="Location"
                        value={member.location}
                      />
                      <InfoRow
                        icon={Globe}
                        label="Timezone"
                        value={member.timezone}
                      />
                    </div>
                  </motion.div>

                  {/* Work Information */}
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
                        <Briefcase
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Work Information
                      </h3>
                    </div>

                    <div className="divide-y divide-border">
                      <InfoRow
                        icon={Briefcase}
                        label="Job Title"
                        value={member.title}
                      />
                      <InfoRow
                        icon={RoleIcon}
                        label="Role"
                        value={member.role}
                      />
                      <InfoRow
                        icon={Calendar}
                        label="Joined"
                        value={member.joinedDate}
                      />
                      <InfoRow
                        icon={Clock3}
                        label="Last Active"
                        value={member.lastActive}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Specialities + Manager */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {/* Specialities */}
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
                        <Award
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Specialities
                      </h3>
                    </div>

                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {member.specialities.map((spec, idx) => (
                          <motion.span
                            key={spec}
                            initial={
                              shouldReduceMotion
                                ? false
                                : { opacity: 0, scale: 0.8 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : idx * 0.06,
                              duration: 0.35,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              bg-primary-light
                              px-3
                              py-1.5
                              text-xs
                              font-bold
                              text-primary
                            "
                          >
                            <Star
                              className="h-3 w-3 fill-current"
                              strokeWidth={2.4}
                            />
                            {spec}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Manager */}
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
                        <UserCheck
                          className="h-4 w-4 text-primary"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-heading">
                        Reporting To
                      </h3>
                    </div>

                    <div className="p-5">
                      <div
                        className="
                          flex
                          items-center
                          gap-4
                          rounded-lg
                          border
                          border-border
                          bg-background-soft
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-secondary
                            text-sm
                            font-bold
                            text-text-white
                            shadow-button
                          "
                        >
                          {member.manager.name === "Self" ? "★" : "MR"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-heading">
                            {member.manager.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                            {member.manager.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* CLIENTS */}
            {activeTab === "clients" && (
              <motion.div
                key="clients"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-heading">
                      Assigned Clients
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {assignedClients.length} clients currently managed by{" "}
                      {member.name}
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
                    Assign Client
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
                            Client
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            VRN
                          </th>
                          <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Active Tasks
                          </th>
                          <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Last Activity
                          </th>
                          <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {assignedClients.map((client, index) => (
                          <motion.tr
                            key={client.id}
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
                              group
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
                                  <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                                    {client.name}
                                  </p>
                                  <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                                    #{client.companyNumber}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-mono text-xs text-text-secondary">
                                {client.vrn || "—"}
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
                                {client.activeTasks}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-xs text-text-secondary">
                                {client.lastActivity}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <Link
                                to={`/accountant/clients/${client.id}`}
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
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ACTIVITY */}
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-bold text-heading">
                    Recent Activity
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Latest actions and updates from {member.name}
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
                            <div
                              className="
                                rounded-xl
                                border
                                border-border
                                bg-background
                                p-3.5
                              "
                            >
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

            {/* PERFORMANCE */}
            {activeTab === "performance" && (
              <motion.div
                key="performance"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5"
              >
                <div>
                  <h3 className="text-sm font-bold text-heading">
                    Performance Overview
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Filings and tasks completed over the last 6 months
                  </p>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Total Filings",
                      value: 131,
                      change: "+12%",
                      icon: FileText,
                      iconBg: "bg-primary-light",
                      iconColor: "text-primary",
                    },
                    {
                      label: "Tasks Completed",
                      value: 170,
                      change: "+18%",
                      icon: CheckCircle2,
                      iconBg: "bg-success-light",
                      iconColor: "text-success",
                    },
                    {
                      label: "Avg. Response Time",
                      value: "4.2h",
                      change: "-15%",
                      icon: Clock3,
                      iconBg: "bg-warning-light",
                      iconColor: "text-warning",
                    },
                  ].map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : idx * 0.06,
                          duration: 0.5,
                          ease: premiumEase,
                        }}
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
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            ${metric.iconBg}
                          `}
                        >
                          <Icon
                            className={`h-4 w-4 ${metric.iconColor}`}
                            strokeWidth={2.2}
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            {metric.label}
                          </p>
                          <div className="mt-0.5 flex items-baseline gap-2">
                            <p className="text-xl font-bold text-heading">
                              {metric.value}
                            </p>
                            <span className="text-[10px] font-bold text-success">
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Chart */}
                <div
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
                      <BarChart3
                        className="h-4 w-4 text-primary"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-heading">
                      Monthly Performance
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        <span className="text-[10px] font-semibold text-text-secondary">
                          Filings
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-sky" />
                        <span className="text-[10px] font-semibold text-text-secondary">
                          Tasks
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {performanceData.map((data, idx) => {
                        const maxValue = Math.max(
                          ...performanceData.flatMap((d) => [
                            d.filings,
                            d.tasks,
                          ]),
                        );
                        const filingsPercent =
                          (data.filings / maxValue) * 100;
                        const tasksPercent = (data.tasks / maxValue) * 100;

                        return (
                          <motion.div
                            key={data.month}
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
                            className="flex items-center gap-4"
                          >
                            <span className="w-8 shrink-0 text-xs font-bold text-heading">
                              {data.month}
                            </span>

                            <div className="flex-1 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 overflow-hidden rounded-full bg-background-soft">
                                  <motion.div
                                    className="h-full rounded-full bg-primary"
                                    initial={
                                      shouldReduceMotion
                                        ? false
                                        : { width: 0 }
                                    }
                                    animate={{
                                      width: `${filingsPercent}%`,
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      ease: premiumEase,
                                      delay: shouldReduceMotion
                                        ? 0
                                        : 0.2 + idx * 0.06,
                                    }}
                                  />
                                </div>
                                <span className="w-8 text-right text-[10px] font-bold text-heading">
                                  {data.filings}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 overflow-hidden rounded-full bg-background-soft">
                                  <motion.div
                                    className="h-full rounded-full bg-sky"
                                    initial={
                                      shouldReduceMotion
                                        ? false
                                        : { width: 0 }
                                    }
                                    animate={{ width: `${tasksPercent}%` }}
                                    transition={{
                                      duration: 0.8,
                                      ease: premiumEase,
                                      delay: shouldReduceMotion
                                        ? 0
                                        : 0.25 + idx * 0.06,
                                    }}
                                  />
                                </div>
                                <span className="w-8 text-right text-[10px] font-bold text-heading">
                                  {data.tasks}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
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

const InfoRow = ({ icon: Icon, label, value, action, href, isMono }) => {
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

export default AccountantTeamDetails;