import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Eye,
  MoreVertical,
  Archive,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  RefreshCw,
  Building2,
  Users,
  Send,
  Layers,
  Play,
  PauseCircle,
  FileCheck2,
  Timer,
  UserCheck,
} from "lucide-react";

const AccountantFilings = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
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
      id: "all",
      label: "All Filings",
      value: 48,
      change: "This period",
      icon: FileText,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "in-progress",
      label: "In Progress",
      value: 12,
      change: "Active filings",
      icon: Timer,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      id: "awaiting",
      label: "Awaiting Client",
      value: 7,
      change: "Documents / approval",
      icon: UserCheck,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
    {
      id: "submitted",
      label: "Submitted",
      value: 26,
      change: "Awaiting HMRC",
      icon: FileCheck2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 3,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
    },
  ];

  /* ============================================================
     FILINGS DATA
  ============================================================ */

  const filings = [
    {
      id: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      type: "VAT Return",
      period: "Q3 2026",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      status: "Overdue",
      urgency: "overdue",
      assignee: "Alice J.",
      progress: 45,
    },
    {
      id: 2,
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      client: "Digital Solutions Ltd",
      clientId: 4,
      type: "Corporation Tax",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      status: "In Progress",
      urgency: "high",
      assignee: "John S.",
      progress: 60,
    },
    {
      id: 3,
      company: "Skil Four Ltd",
      companyNumber: "05513948",
      client: "Skil Four Ltd",
      clientId: 3,
      type: "Corporation Tax",
      period: "FY 2025/26",
      dueDate: "05 Oct 2026",
      daysLeft: 3,
      status: "Awaiting Client",
      urgency: "high",
      assignee: "Sarah M.",
      progress: 30,
    },
    {
      id: 4,
      company: "Green Tech Ltd",
      companyNumber: "07895432",
      client: "Green Tech Ltd",
      clientId: 2,
      type: "Confirmation Statement",
      period: "Annual",
      dueDate: "12 Oct 2026",
      daysLeft: 10,
      status: "In Progress",
      urgency: "medium",
      assignee: "Alice J.",
      progress: 75,
    },
    {
      id: 5,
      company: "Sunrise Trading Ltd",
      companyNumber: "44556677",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      type: "VAT Return",
      period: "Q3 2026",
      dueDate: "07 Nov 2026",
      daysLeft: 46,
      status: "Not Started",
      urgency: "low",
      assignee: "Unassigned",
      progress: 0,
    },
    {
      id: 6,
      company: "Imperial Holdings Ltd",
      companyNumber: "14803912",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      type: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Dec 2026",
      daysLeft: 84,
      status: "Not Started",
      urgency: "low",
      assignee: "Unassigned",
      progress: 0,
    },
    {
      id: 7,
      company: "Ocean View Ltd",
      companyNumber: "66778899",
      client: "Ocean View Ltd",
      clientId: 6,
      type: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "30 Dec 2026",
      daysLeft: 99,
      status: "Submitted",
      urgency: "low",
      assignee: "Alice J.",
      progress: 100,
    },
    {
      id: 8,
      company: "Bright Ideas Ltd",
      companyNumber: "11223344",
      client: "Bright Ideas Ltd",
      clientId: 5,
      type: "Self Assessment",
      period: "2025/26",
      dueDate: "31 Jan 2027",
      daysLeft: 131,
      status: "Awaiting Client",
      urgency: "low",
      assignee: "John S.",
      progress: 20,
    },
    {
      id: 9,
      company: "Imperial Properties Ltd",
      companyNumber: "14803945",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      type: "Corporation Tax",
      period: "FY 2025/26",
      dueDate: "05 Nov 2026",
      daysLeft: 44,
      status: "In Progress",
      urgency: "medium",
      assignee: "Alice J.",
      progress: 55,
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Awaiting Client", label: "Awaiting Client" },
    { value: "Submitted", label: "Submitted" },
    { value: "Overdue", label: "Overdue" },
  ];

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "VAT Return", label: "VAT Return" },
    { value: "Corporation Tax", label: "Corporation Tax" },
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
     FILTERED FILINGS
  ============================================================ */

  const filteredFilings = useMemo(() => {
    return filings.filter((filing) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${filing.company} ${filing.companyNumber} ${filing.client} ${filing.type}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || filing.status === statusFilter;

      const matchesType =
        typeFilter === "All" || filing.type === typeFilter;

      const matchesClient =
        clientFilter === "All" || filing.client === clientFilter;

      return matchesSearch && matchesStatus && matchesType && matchesClient;
    });
  }, [filings, search, statusFilter, typeFilter, clientFilter]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setClientFilter("All");
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "All" ||
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
          text: "text-danger",
          badge: "bg-danger-light text-danger",
          dot: "bg-danger",
        };
      case "high":
        return {
          bg: "bg-warning-light",
          text: "text-warning",
          badge: "bg-warning-light text-warning",
          dot: "bg-warning",
        };
      case "medium":
        return {
          bg: "bg-primary-light",
          text: "text-primary",
          badge: "bg-primary-light text-primary",
          dot: "bg-primary",
        };
      default:
        return {
          bg: "bg-success-light",
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
      case "Not Started":
        return {
          bg: "bg-background-soft",
          text: "text-text-secondary",
          dot: "bg-text-secondary",
          icon: Clock3,
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

  const getTypeStyles = (type) => {
    switch (type) {
      case "VAT Return":
        return "bg-secondary-light text-secondary";
      case "Corporation Tax":
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
            Filings
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Track and manage all filings across your client portfolio
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
            <Download className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Export</span>
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
              <span>Start Filing</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ======================================================
          STATS CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isOverdue = stat.id === "overdue";

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
                ${isOverdue ? "border-danger/30" : "border-border"}
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

          {/* Status filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
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
                    w-56
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

          {/* Type filter */}
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => {
                setShowTypeDropdown((prev) => !prev);
                setShowStatusDropdown(false);
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
              <span>
                {typeOptions.find((o) => o.value === typeFilter)?.label}
              </span>
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
                setShowStatusDropdown(false);
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
              <span className="truncate max-w-[140px]">
                {clientOptions.find((o) => o.value === clientFilter)?.label}
              </span>
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
          FILINGS TABLE
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
            <FileText className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              All Filings
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredFilings.length}
            </span>
          </div>
          <p className="text-[11px] text-text-secondary">
            Click a filing to view details
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
                  Due
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Progress
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
              {filteredFilings.map((filing, index) => {
                const statusStyles = getStatusStyles(filing.status);
                const StatusIcon = statusStyles.icon;
                const urgency = getUrgencyStyles(filing.urgency);

                return (
                  <motion.tr
                    key={filing.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate={isTableInView ? "visible" : "hidden"}
                    onClick={() =>
                      navigate(`/accountant/filings/${filing.id}`)
                    }
                    className="
                      group
                      cursor-pointer
                      transition-colors
                      hover:bg-background-soft
                    "
                  >
                    {/* Company */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Building2
                            className="h-4 w-4 text-primary"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {filing.company}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                            #{filing.companyNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Filing */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-bold text-heading">
                          {filing.type}
                        </p>
                        <p className="mt-0.5 text-[10px] text-text-secondary">
                          {filing.period}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4">
                      <Link
                        to={`/accountant/clients/${filing.clientId}`}
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
                          {filing.client}
                        </span>
                      </Link>
                    </td>

                    {/* Due */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-heading">
                          {filing.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(filing.daysLeft)}
                        </p>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="px-5 py-4">
                      <div className="min-w-[100px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-heading">
                            {filing.progress}%
                          </span>
                          <span className="text-[10px] text-text-secondary">
                            {filing.assignee}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-background-soft">
                          <motion.div
                            className="h-full rounded-full bg-primary"
                            initial={
                              shouldReduceMotion
                                ? false
                                : { width: 0 }
                            }
                            animate={{
                              width: isTableInView
                                ? `${filing.progress}%`
                                : 0,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: premiumEase,
                              delay: shouldReduceMotion
                                ? 0
                                : 0.3 + index * 0.05,
                            }}
                          />
                        </div>
                      </div>
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
                        <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                        {filing.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="relative px-5 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-flex items-center gap-1">
                        <Link
                          to={`/accountant/filings/${filing.id}`}
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
                              openRowMenu === filing.id ? null : filing.id
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
                          {openRowMenu === filing.id && (
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
                                <Play className="h-3.5 w-3.5" />
                                <span>Continue filing</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                <PauseCircle className="h-3.5 w-3.5" />
                                <span>Pause filing</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary">
                                <Send className="h-3.5 w-3.5" />
                                <span>Send to client</span>
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
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-border lg:hidden">
          {filteredFilings.map((filing, index) => {
            const statusStyles = getStatusStyles(filing.status);
            const StatusIcon = statusStyles.icon;
            const urgency = getUrgencyStyles(filing.urgency);

            return (
              <motion.div
                key={filing.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate={isTableInView ? "visible" : "hidden"}
                onClick={() => navigate(`/accountant/filings/${filing.id}`)}
                className="
                  cursor-pointer
                  p-4
                  transition-colors
                  hover:bg-background-soft
                "
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Building2
                      className="h-5 w-5 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {filing.company}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                          #{filing.companyNumber}
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
                          ${getTypeStyles(filing.type)}
                        `}
                      >
                        {filing.type}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary">
                      <Users className="h-3 w-3" strokeWidth={2.2} />
                      <span className="truncate">{filing.client}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-background-soft px-3 py-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          Due
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {filing.dueDate}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                        >
                          {getDaysLabel(filing.daysLeft)}
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
                          {filing.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold text-text-secondary">
                          {filing.assignee}
                        </span>
                        <span className="text-[10px] font-bold text-heading">
                          {filing.progress}%
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-background-soft">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={
                            shouldReduceMotion ? false : { width: 0 }
                          }
                          animate={{
                            width: isTableInView
                              ? `${filing.progress}%`
                              : 0,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: premiumEase,
                            delay: shouldReduceMotion
                              ? 0
                              : 0.3 + index * 0.05,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredFilings.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="flex flex-col items-center justify-center px-5 py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <FileText
                className="h-7 w-7 text-primary"
                strokeWidth={2}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No filings found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-secondary">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Start a new filing to see it here."}
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
              <Layers
                className="h-5 w-5 text-text-white"
                strokeWidth={2.2}
              />
            </motion.div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Bulk filing
              </p>
              <h3 className="mt-1 text-base font-bold text-heading">
                File multiple returns in one flow
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Group similar filings across clients and submit them
                together — perfect for VAT quarters and year-end batches.
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
              to="/accountant/filings/bulk"
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
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
              <span>Start bulk filing</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountantFilings;