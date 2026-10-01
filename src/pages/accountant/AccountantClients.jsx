import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Building2,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MoreVertical,
  Eye,
  Edit3,
  Send,
  Download,
  RefreshCw,
  UserPlus,
  Archive,
} from "lucide-react";

const AccountantClients = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tableRef = useRef(null);
  const isTableInView = useInView(tableRef, { once: true, amount: 0.1 });

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "total",
      label: "Total Clients",
      value: 42,
      change: "+3 this month",
      icon: Users,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      id: "active",
      label: "Active",
      value: 38,
      change: "90% of total",
      icon: CheckCircle2,
      iconBg: "bg-success-light",
      iconColor: "text-success",
    },
    {
      id: "onboarding",
      label: "Onboarding",
      value: 3,
      change: "In progress",
      icon: Clock3,
      iconBg: "bg-warning-light",
      iconColor: "text-warning",
    },
    {
      id: "overdue",
      label: "With Overdue",
      value: 4,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-danger-light",
      iconColor: "text-danger",
    },
  ];

  /* ============================================================
     CLIENTS DATA
  ============================================================ */

  const [clients] = useState([
    {
      id: 1,
      clientName: "Imperial Thermal Ltd",
      contactPerson: "James Mitchell",
      email: "james@imperialthermal.co.uk",
      phone: "+44 20 7946 0123",
      companyNumber: "14803890",
      type: "Limited Company",
      status: "Active",
      companiesCount: 3,
      openFilings: 2,
      overdueFilings: 1,
      joinedDate: "12 Mar 2024",
      lastActivity: "2 hours ago",
      initials: "IM",
      avatarColor: "bg-primary",
    },
    {
      id: 2,
      clientName: "Green Tech Ltd",
      contactPerson: "Sarah Roberts",
      email: "sarah@greentech.co.uk",
      phone: "+44 20 7946 0456",
      companyNumber: "07895432",
      type: "Limited Company",
      status: "Active",
      companiesCount: 2,
      openFilings: 1,
      overdueFilings: 0,
      joinedDate: "05 Aug 2024",
      lastActivity: "1 day ago",
      initials: "GT",
      avatarColor: "bg-success",
    },
    {
      id: 3,
      clientName: "Bright Ideas Ltd",
      contactPerson: "David Chen",
      email: "david@brightideas.co.uk",
      phone: "+44 20 7946 0789",
      companyNumber: "11223344",
      type: "Limited Company",
      status: "Onboarding",
      companiesCount: 1,
      openFilings: 3,
      overdueFilings: 0,
      joinedDate: "20 Sep 2026",
      lastActivity: "3 hours ago",
      initials: "BI",
      avatarColor: "bg-warning",
    },
    {
      id: 4,
      clientName: "Skil Four Ltd",
      contactPerson: "Abdul Al Salim",
      email: "abdul@skilfour.co.uk",
      phone: "+44 20 7946 0321",
      companyNumber: "05513948",
      type: "Limited Company",
      status: "Active",
      companiesCount: 1,
      openFilings: 2,
      overdueFilings: 2,
      joinedDate: "18 Jan 2024",
      lastActivity: "5 hours ago",
      initials: "SF",
      avatarColor: "bg-sky",
    },
    {
      id: 5,
      clientName: "Digital Solutions Ltd",
      contactPerson: "Emma Wilson",
      email: "emma@digitalsolutions.co.uk",
      phone: "+44 20 7946 0654",
      companyNumber: "99887766",
      type: "Limited Company",
      status: "Active",
      companiesCount: 4,
      openFilings: 5,
      overdueFilings: 1,
      joinedDate: "08 Nov 2023",
      lastActivity: "Yesterday",
      initials: "DS",
      avatarColor: "bg-secondary",
    },
    {
      id: 6,
      clientName: "Ocean View Ltd",
      contactPerson: "Michael Brown",
      email: "michael@oceanview.co.uk",
      phone: "+44 20 7946 0987",
      companyNumber: "66778899",
      type: "Limited Company",
      status: "Active",
      companiesCount: 2,
      openFilings: 0,
      overdueFilings: 0,
      joinedDate: "14 Jun 2024",
      lastActivity: "2 days ago",
      initials: "OV",
      avatarColor: "bg-sky",
    },
    {
      id: 7,
      clientName: "Sunrise Trading Ltd",
      contactPerson: "Laura Taylor",
      email: "laura@sunrisetrading.co.uk",
      phone: "+44 20 7946 0147",
      companyNumber: "44556677",
      type: "Limited Company",
      status: "Active",
      companiesCount: 3,
      openFilings: 1,
      overdueFilings: 0,
      joinedDate: "22 Feb 2024",
      lastActivity: "3 days ago",
      initials: "ST",
      avatarColor: "bg-danger",
    },
    {
      id: 8,
      clientName: "Northern Traders Ltd",
      contactPerson: "James Brown",
      email: "james@northerntraders.co.uk",
      phone: "+44 20 7946 0258",
      companyNumber: "33445566",
      type: "Sole Trader",
      status: "Active",
      companiesCount: 1,
      openFilings: 0,
      overdueFilings: 0,
      joinedDate: "10 Apr 2024",
      lastActivity: "1 week ago",
      initials: "NT",
      avatarColor: "bg-primary",
    },
  ]);

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const statusOptions = [
    { value: "All", label: "All Statuses" },
    { value: "Active", label: "Active" },
    { value: "Onboarding", label: "Onboarding" },
    { value: "Inactive", label: "Inactive" },
  ];

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "Limited Company", label: "Limited Company" },
    { value: "Sole Trader", label: "Sole Trader" },
    { value: "Partnership", label: "Partnership" },
  ];

  /* ============================================================
     FILTERED CLIENTS
  ============================================================ */

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${client.clientName} ${client.companyNumber} ${client.contactPerson} ${client.email}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" || client.status === statusFilter;

      const matchesType = typeFilter === "All" || client.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [clients, search, statusFilter, typeFilter]);

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
  };

  const hasActiveFilters =
    search || statusFilter !== "All" || typeFilter !== "All";

  /* ============================================================
     HELPERS
  ============================================================ */

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-success-light",
          text: "text-success",
          dot: "bg-success",
        };
      case "Onboarding":
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

  /* Row reveal — staggered one by one with 0.05s delay */
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
            Clients
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your client portfolio and relationships
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
              to="/accountant/clients/new"
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
              <span>Add Client</span>
            </Link>
          </motion.div>
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
              placeholder="Search clients by name, contact, company number or email..."
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
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: -6 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : index * 0.04,
                        duration: 0.3,
                        ease: premiumEase,
                      }}
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
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, x: -6 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : index * 0.04,
                        duration: 0.3,
                        ease: premiumEase,
                      }}
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
          CLIENTS TABLE
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
            <Users className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              All Clients
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredClients.length}
            </span>
          </div>
          <p className="text-[11px] text-text-secondary">
            Click a client to view details
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-border bg-background-soft">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Client
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Contact
                </th>
                <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Companies
                </th>
                <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  Open
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
              {filteredClients.map((client, index) => {
                const statusStyles = getStatusStyles(client.status);
                const hasOverdue = client.overdueFilings > 0;

                return (
                  <motion.tr
                    key={client.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate={isTableInView ? "visible" : "hidden"}
                    onClick={() =>
                      navigate(`/accountant/clients/${client.id}`)
                    }
                    className="
                      group
                      cursor-pointer
                      transition-colors
                      hover:bg-background-soft
                    "
                  >
                    {/* Client */}
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
                            ${client.avatarColor}
                          `}
                        >
                          {client.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                            {client.clientName}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                            #{client.companyNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-heading">
                          {client.contactPerson}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-text-secondary">
                          {client.email}
                        </p>
                      </div>
                    </td>

                    {/* Companies */}
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-background-soft px-2.5 py-1 text-[11px] font-bold text-heading">
                        <Building2
                          className="h-3 w-3 text-text-secondary"
                          strokeWidth={2.4}
                        />
                        {client.companiesCount}
                      </span>
                    </td>

                    {/* Open filings */}
                    <td className="px-5 py-4 text-center">
                      <div className="inline-flex flex-col items-center gap-1">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            ${
                              hasOverdue
                                ? "bg-danger-light text-danger"
                                : "bg-background-soft text-heading"
                            }
                          `}
                        >
                          {hasOverdue ? (
                            <AlertCircle
                              className="h-3 w-3"
                              strokeWidth={2.4}
                            />
                          ) : (
                            <FileText
                              className="h-3 w-3"
                              strokeWidth={2.4}
                            />
                          )}
                          {client.openFilings}
                        </span>
                        {hasOverdue && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-danger">
                            {client.overdueFilings} overdue
                          </span>
                        )}
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
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
                        />
                        {client.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="relative px-5 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-flex items-center gap-1">
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

                        <motion.button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu(
                              openRowMenu === client.id ? null : client.id
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
                          {openRowMenu === client.id && (
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
                              <button
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>View details</span>
                              </button>
                              <button
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit client</span>
                              </button>
                              <button
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary"
                              >
                                <Send className="h-3.5 w-3.5" />
                                <span>Send message</span>
                              </button>
                              <button
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-heading transition-colors hover:bg-primary-light hover:text-primary"
                              >
                                <FileText className="h-3.5 w-3.5" />
                                <span>Start filing</span>
                              </button>
                              <div className="my-1 border-t border-border" />
                              <button
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light"
                              >
                                <Archive className="h-3.5 w-3.5" />
                                <span>Archive client</span>
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
          {filteredClients.map((client, index) => {
            const statusStyles = getStatusStyles(client.status);
            const hasOverdue = client.overdueFilings > 0;

            return (
              <motion.div
                key={client.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate={isTableInView ? "visible" : "hidden"}
                onClick={() =>
                  navigate(`/accountant/clients/${client.id}`)
                }
                className="
                  cursor-pointer
                  p-4
                  transition-colors
                  hover:bg-background-soft
                "
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
                      text-text-white
                      shadow-button
                      ${client.avatarColor}
                    `}
                  >
                    {client.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {client.clientName}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                          #{client.companyNumber}
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
                          ${statusStyles.bg}
                          ${statusStyles.text}
                        `}
                      >
                        {client.status}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-text-secondary">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{client.email}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-background-soft px-3 py-2">
                      <div>
                        <p className="text-[10px] text-text-secondary">
                          Companies
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {client.companiesCount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-text-secondary">
                          Open
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-heading">
                          {client.openFilings}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-text-secondary">
                          Overdue
                        </p>
                        <p
                          className={`mt-0.5 text-[11px] font-bold ${
                            hasOverdue ? "text-danger" : "text-heading"
                          }`}
                        >
                          {client.overdueFilings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredClients.length === 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="flex flex-col items-center justify-center px-5 py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Users className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No clients found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-secondary">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by adding your first client."}
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
                Onboard a new client in minutes
              </h3>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Add client details, link companies and set up filing
                permissions — all in one place.
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
              to="/accountant/clients/new"
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
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              <span>Add new client</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountantClients;