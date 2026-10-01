import React, { useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarClock,
  Plus,
  Search,
  Filter,
  ChevronDown,
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
  FileText,
  Timer,
  UserCheck,
  Zap,
  Send,
  Archive,
  Play,
} from "lucide-react";

const AccountantDeadlines = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tableRef = useRef(null);
  const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "overdue",
      label: "Overdue",
      value: 3,
      change: "Requires immediate action",
      icon: AlertCircle,
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
      highlight: true,
      highlightColor: "border-danger/30",
    },
    {
      id: "due-week",
      label: "Due This Week",
      value: 5,
      change: "Next 7 days",
      icon: Clock3,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
      highlight: true,
      highlightColor: "border-warning/30",
    },
    {
      id: "due-month",
      label: "Due This Month",
      value: 12,
      change: "Next 30 days",
      icon: CalendarClock,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      value: 24,
      change: "Next 90 days",
      icon: TrendingUp,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      id: "completed",
      label: "Completed",
      value: 156,
      change: "This year",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
  ];

  /* ============================================================
     DEADLINES DATA
  ============================================================ */

  const deadlines = [
    {
      id: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "VAT Return",
      period: "Q3 2026",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      status: "Overdue",
      assignee: "Alice J.",
      estimatedTime: "15 min",
    },
    {
      id: 2,
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      client: "Digital Solutions Ltd",
      clientId: 4,
      filing: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      urgency: "high",
      status: "In Progress",
      assignee: "John S.",
      estimatedTime: "45 min",
    },
    {
      id: 3,
      company: "Skil Four Ltd",
      companyNumber: "05513948",
      client: "Skil Four Ltd",
      clientId: 3,
      filing: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      urgency: "high",
      status: "Awaiting Client",
      assignee: "Sarah M.",
      estimatedTime: "45 min",
    },
    {
      id: 4,
      company: "Green Tech Ltd",
      companyNumber: "07895432",
      client: "Green Tech Ltd",
      clientId: 2,
      filing: "Confirmation Statement",
      period: "Annual",
      dueDate: "12 Oct 2026",
      daysLeft: 10,
      urgency: "medium",
      status: "In Progress",
      assignee: "Alice J.",
      estimatedTime: "10 min",
    },
    {
      id: 5,
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Oct 2026",
      daysLeft: 13,
      urgency: "medium",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "60 min",
    },
    {
      id: 6,
      company: "Imperial Properties Ltd",
      companyNumber: "14803945",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Nov 2026",
      daysLeft: 34,
      urgency: "low",
      status: "In Progress",
      assignee: "Alice J.",
      estimatedTime: "45 min",
    },
    {
      id: 7,
      company: "Sunrise Trading Ltd",
      companyNumber: "44556677",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      filing: "VAT Return",
      period: "Q3 2026",
      dueDate: "07 Nov 2026",
      daysLeft: 36,
      urgency: "low",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "15 min",
    },
    {
      id: 8,
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      filing: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Dec 2026",
      daysLeft: 74,
      urgency: "low",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "60 min",
    },
    {
      id: 9,
      company: "Ocean View Ltd",
      companyNumber: "66778899",
      client: "Ocean View Ltd",
      clientId: 6,
      filing: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "30 Dec 2026",
      daysLeft: 89,
      urgency: "low",
      status: "Not Started",
      assignee: "Unassigned",
      estimatedTime: "60 min",
    },
    {
      id: 10,
      company: "Bright Ideas Ltd",
      companyNumber: "11223344",
      client: "Bright Ideas Ltd",
      clientId: 5,
      filing: "Self Assessment",
      period: "2025/26",
      dueDate: "31 Jan 2027",
      daysLeft: 121,
      urgency: "low",
      status: "Not Started",
      assignee: "John S.",
      estimatedTime: "30 min",
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const timeOptions = [
    { value: "All", label: "All Deadlines" },
    { value: "overdue", label: "Overdue" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "Next 90 Days" },
  ];

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "VAT Return", label: "VAT Return" },
    { value: "Corporation Tax (CT600)", label: "Corporation Tax" },
    { value: "Annual Accounts", label: "Annual Accounts" },
    { value: "Confirmation Statement", label: "Confirmation Statement" },
    { value: "Self Assessment", label: "Self Assessment" },
  ];

  const clientOptions = [
    { value: "All", label: "All Clients" },
    { value: "Imperial Thermal Ltd", label: "Imperial Thermal Ltd" },
    { value: "Green Tech Ltd", label: "Green Tech Ltd" },
    { value: "Skil Four Ltd", label: "Skil Four Ltd" },
    { value: "Digital Solutions Ltd", label: "Digital Solutions Ltd" },
    { value: "Bright Ideas Ltd", label: "Bright Ideas Ltd" },
  ];

  /* ============================================================
     FILTERED DEADLINES
  ============================================================ */

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter((deadline) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${deadline.company} ${deadline.companyNumber} ${deadline.client} ${deadline.filing}`
          .toLowerCase()
          .includes(query);

      let matchesTime = true;
      if (timeFilter === "overdue") matchesTime = deadline.daysLeft < 0;
      else if (timeFilter === "week")
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 7;
      else if (timeFilter === "month")
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 30;
      else if (timeFilter === "quarter")
        matchesTime = deadline.daysLeft >= 0 && deadline.daysLeft <= 90;

      const matchesType =
        typeFilter === "All" || deadline.filing === typeFilter;

      const matchesClient =
        clientFilter === "All" || deadline.client === clientFilter;

      return matchesSearch && matchesTime && matchesType && matchesClient;
    });
  }, [deadlines, search, timeFilter, typeFilter, clientFilter]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const clearFilters = () => {
    setSearch("");
    setTimeFilter("All");
    setTypeFilter("All");
    setClientFilter("All");
  };

  const hasActiveFilters =
    search ||
    timeFilter !== "All" ||
    typeFilter !== "All" ||
    clientFilter !== "All";

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

  const getStatusStyles = (status) => {
    switch (status) {
      case "In Progress":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          icon: Timer,
        };
      case "Awaiting Client":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          icon: UserCheck,
        };
      case "Overdue":
        return {
          bg: "bg-danger-light",
          text: "text-danger",
          icon: AlertCircle,
        };
      case "Not Started":
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          icon: Clock3,
        };
      default:
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          icon: Clock3,
        };
    }
  };

  const getFilingTypeStyles = (type) => {
    switch (type) {
      case "VAT Return":
        return "bg-secondary-light text-secondary";
      case "Corporation Tax (CT600)":
        return "bg-primary-light text-primary";
      case "Annual Accounts":
        return "bg-success-light text-success";
      case "Confirmation Statement":
        return "bg-warning-light text-warning";
      case "Self Assessment":
        return "bg-danger-light text-danger";
      default:
        return "bg-background-soft text-text-secondary";
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

  const rowVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
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
            Deadlines
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Track upcoming and overdue deadlines across your clients
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
            <Bell className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Reminders</span>
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
            <Download className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Export</span>
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
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            <span>Add Deadline</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ======================================================
          STATS CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
              className={`
                group
                relative
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
                  stat.highlight ? stat.highlightColor : "border-border"
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
              <p className="mt-2 text-[10px] font-semibold text-text-secondary">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ======================================================
          OVERDUE ALERT BANNER
      ====================================================== */}
      <AnimatePresence>
        {filteredDeadlines.filter((d) => d.daysLeft < 0).length > 0 && (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.98,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.45, ease: premiumEase }}
            className="
              flex
              flex-col
              gap-3
              rounded-xl
              border
              border-danger/20
              bg-danger-light
              p-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-start gap-3">
              <motion.div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-danger/15
                "
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [1, 1.08, 1] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AlertCircle
                  className="h-5 w-5 text-danger"
                  strokeWidth={2.4}
                />
              </motion.div>
              <div>
                <p className="text-sm font-bold text-danger">
                  {filteredDeadlines.filter((d) => d.daysLeft < 0).length}{" "}
                  deadline
                  {filteredDeadlines.filter((d) => d.daysLeft < 0).length > 1
                    ? "s"
                    : ""}{" "}
                  overdue
                </p>
                <p className="mt-0.5 text-xs text-danger/80">
                  Take action now to avoid HMRC penalties for your clients.
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => setTimeFilter("overdue")}
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
                bg-danger
                px-4
                py-2.5
                text-xs
                font-bold
                text-text-white
                shadow-button
                transition-colors
                duration-200
                hover:bg-danger/90
                sm:self-auto
              "
            >
              <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
              <span>View overdue only</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

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
              placeholder="Search by company, client or filing type..."
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

          {/* Time filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowTimeDropdown((prev) => !prev);
                setShowTypeDropdown(false);
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
                <Calendar
                  className="h-3.5 w-3.5 text-text-secondary"
                  strokeWidth={2.2}
                />
                <span>
                  {timeOptions.find((o) => o.value === timeFilter)?.label}
                </span>
              </div>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-secondary
                  transition-transform
                  duration-200
                  ${showTimeDropdown ? "rotate-180" : ""}
                `}
              />
            </motion.button>

            <AnimatePresence>
              {showTimeDropdown && (
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
                  {timeOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => {
                        setTimeFilter(option.value);
                        setShowTimeDropdown(false);
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
                          timeFilter === option.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-heading"
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      {timeFilter === option.value && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Type filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowTypeDropdown((prev) => !prev);
                setShowTimeDropdown(false);
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
                <FileText
                  className="h-3.5 w-3.5 text-text-secondary"
                  strokeWidth={2.2}
                />
                <span>
                  {typeOptions.find((o) => o.value === typeFilter)?.label}
                </span>
              </div>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-secondary
                  transition-transform
                  duration-200
                  ${showTypeDropdown ? "rotate-180" : ""}
                `}
              />
            </motion.button>

            <AnimatePresence>
              {showTypeDropdown && (
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
                  {typeOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => {
                        setTypeFilter(option.value);
                        setShowTypeDropdown(false);
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
                          typeFilter === option.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-heading"
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      {typeFilter === option.value && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Client filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowClientDropdown((prev) => !prev);
                setShowTimeDropdown(false);
                setShowTypeDropdown(false);
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
                <Users
                  className="h-3.5 w-3.5 text-text-secondary"
                  strokeWidth={2.2}
                />
                <span className="truncate max-w-[120px]">
                  {clientOptions.find((o) => o.value === clientFilter)?.label}
                </span>
              </div>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-text-secondary
                  transition-transform
                  duration-200
                  ${showClientDropdown ? "rotate-180" : ""}
                `}
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
                    right-0
                    top-full
                    z-30
                    mt-2
                    w-64
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
                      key={option.value}
                      type="button"
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => {
                        setClientFilter(option.value);
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
                          clientFilter === option.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-heading"
                        }
                      `}
                    >
                      <span className="truncate">{option.label}</span>
                      {clientFilter === option.value && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
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
                <Filter className="h-3.5 w-3.5" strokeWidth={2.2} />
                <span>Clear</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ======================================================
          DEADLINES LIST
      ====================================================== */}
      <motion.div
        ref={tableRef}
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
        {/* Table header info */}
        <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock
              className="h-4 w-4 text-primary"
              strokeWidth={2.2}
            />
            <h2 className="text-sm font-bold text-heading">
              All Deadlines
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredDeadlines.length}
            </span>
          </div>
          <p className="text-[11px] text-text-secondary">
            Sorted by urgency
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-border bg-background-soft">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Company
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Filing
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Client
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Due Date
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
              {filteredDeadlines.map((deadline, index) => {
                const urgency = getUrgencyStyles(deadline.urgency);
                const statusStyles = getStatusStyles(deadline.status);
                const StatusIcon = statusStyles.icon;

                return (
                  <motion.tr
                    key={deadline.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate={isTableInView ? "visible" : "hidden"}
                    onClick={() =>
                      navigate(`/accountant/filings/${deadline.id}`)
                    }
                    className={`
                      group
                      cursor-pointer
                      transition-colors
                      hover:bg-background-soft
                      ${deadline.daysLeft < 0 ? "bg-danger-light/30" : "bg-background"}
                    `}
                  >
                    {/* Company */}
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
                            rounded-lg
                            ${urgency.bg}
                            border
                            ${urgency.border}
                          `}
                        >
                          <Building2
                            className={`h-4 w-4 ${urgency.text}`}
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {deadline.company}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                            #{deadline.companyNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Filing */}
                    <td className="px-5 py-4">
                      <div>
                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-bold
                            ${getFilingTypeStyles(deadline.filing)}
                          `}
                        >
                          {deadline.filing}
                        </span>
                        <p className="mt-1 text-[10px] text-text-secondary">
                          {deadline.period} · {deadline.estimatedTime}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4">
                      <Link
                        to={`/accountant/clients/${deadline.clientId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-xs
                          font-semibold
                          text-heading
                          transition-colors
                          hover:text-primary
                        "
                      >
                        <Users
                          className="h-3.5 w-3.5 text-text-secondary"
                          strokeWidth={2.2}
                        />
                        <span className="truncate max-w-[140px]">
                          {deadline.client}
                        </span>
                      </Link>
                    </td>

                    {/* Due Date */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-heading">
                          {deadline.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(deadline.daysLeft)}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
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
                          {deadline.status}
                        </span>
                        <span className="text-[10px] text-text-secondary">
                          {deadline.assignee}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td
                      className="relative px-5 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-flex items-center gap-1">
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
                            to={`/accountant/filings/new?company=${deadline.companyNumber}`}
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              bg-primary
                              px-3.5
                              py-2
                              text-[11px]
                              font-bold
                              text-text-white
                              shadow-button
                              transition-colors
                              duration-200
                              hover:bg-primary-hover
                            "
                          >
                            <Play className="h-3 w-3" strokeWidth={2.6} />
                            <span>File</span>
                          </Link>
                        </motion.div>

                        <motion.button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu(
                              openRowMenu === deadline.id ? null : deadline.id
                            )
                          }
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : { scale: 1.1, transition: { duration: 0.15 } }
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
                            hover:bg-primary-light
                            hover:text-primary
                          "
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </motion.button>

                        <AnimatePresence>
                          {openRowMenu === deadline.id && (
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
                                w-48
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
                                <span>View details</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                <Send className="h-3.5 w-3.5" />
                                <span>Send reminder</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                <UserCheck className="h-3.5 w-3.5" />
                                <span>Reassign</span>
                              </button>
                              <div className="my-1 border-t border-border" />
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light">
                                <Archive className="h-3.5 w-3.5" />
                                <span>Dismiss</span>
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

        {/* Mobile Card List */}
        <div className="divide-y divide-border lg:hidden">
          {filteredDeadlines.map((deadline, index) => {
            const urgency = getUrgencyStyles(deadline.urgency);
            const statusStyles = getStatusStyles(deadline.status);
            const StatusIcon = statusStyles.icon;

            return (
              <motion.div
                key={deadline.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate={isTableInView ? "visible" : "hidden"}
                onClick={() => navigate(`/accountant/filings/${deadline.id}`)}
                className={`
                  cursor-pointer
                  p-4
                  transition-colors
                  hover:bg-background-soft
                  ${deadline.daysLeft < 0 ? "bg-danger-light/30" : "bg-background"}
                `}
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
                      rounded-lg
                      border
                      ${urgency.bg}
                      ${urgency.border}
                    `}
                  >
                    <Building2
                      className={`h-5 w-5 ${urgency.text}`}
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {deadline.company}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                          #{deadline.companyNumber}
                        </p>
                      </div>
                      <span
                        className={`
                          shrink-0
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-bold
                          ${urgency.badge}
                        `}
                      >
                        {deadline.daysLeft < 0
                          ? "Overdue"
                          : deadline.daysLeft <= 7
                            ? "Urgent"
                            : "Upcoming"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-full
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold
                          ${getFilingTypeStyles(deadline.filing)}
                        `}
                      >
                        {deadline.filing}
                      </span>
                      <span className="text-[10px] text-text-secondary">
                        {deadline.period}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-background-soft px-3 py-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Due
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {deadline.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(deadline.daysLeft)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Status
                        </p>
                        <span
                          className={`
                            mt-1
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
                          <StatusIcon
                            className="h-2.5 w-2.5"
                            strokeWidth={2.4}
                          />
                          {deadline.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                        <Users className="h-3 w-3" strokeWidth={2.2} />
                        <span className="truncate">{deadline.assignee}</span>
                      </div>

                      <Link
                        to={`/accountant/filings/new?company=${deadline.companyNumber}`}
                        onClick={(e) => e.stopPropagation()}
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-lg
                          bg-primary
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          text-text-white
                          shadow-button
                          transition-colors
                          hover:bg-primary-hover
                        "
                      >
                        <Play className="h-3 w-3" strokeWidth={2.6} />
                        <span>File now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredDeadlines.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="flex flex-col items-center justify-center px-5 py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <CalendarClock
                className="h-7 w-7 text-primary"
                strokeWidth={2}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No deadlines found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-secondary">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "You're all caught up. No upcoming deadlines."}
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
                <Filter className="h-3 w-3" strokeWidth={2.4} />
                <span>Clear filters</span>
              </button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* ======================================================
          LEGEND
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          {
            label: "Overdue",
            desc: "Past the deadline",
            color: "bg-danger",
            bg: "bg-danger-light",
            border: "border-danger/20",
          },
          {
            label: "Urgent",
            desc: "Due within 7 days",
            color: "bg-warning",
            bg: "bg-warning-light",
            border: "border-warning/20",
          },
          {
            label: "Upcoming",
            desc: "Due within 30 days",
            color: "bg-primary",
            bg: "bg-primary-light",
            border: "border-primary/20",
          },
          {
            label: "Planned",
            desc: "More than 30 days",
            color: "bg-success",
            bg: "bg-success-light",
            border: "border-success/20",
          },
        ].map((item) => (
          <motion.div
            key={item.label}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -2, transition: { duration: 0.2 } }
            }
            className={`
              flex
              items-center
              gap-3
              rounded-xl
              border
              ${item.border}
              ${item.bg}
              px-4
              py-3
              transition-[border-color,box-shadow]
              duration-200
              hover:shadow-card
            `}
          >
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
            />
            <div>
              <p className="text-xs font-bold text-heading">{item.label}</p>
              <p className="mt-0.5 text-[10px] text-text-secondary">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
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
              <Bell className="h-5 w-5 text-text-white" strokeWidth={2.2} />
            </motion.div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Never miss a deadline
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                Enable automatic deadline reminders
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Get email and SMS alerts before every filing deadline —
                customisable per client or per filing type.
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
              <span>Set up reminders</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountantDeadlines;