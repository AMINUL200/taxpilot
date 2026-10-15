import React, { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  X,
  Building2,
  FileText,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  CalendarDays,
  PoundSterling,
  Eye,
  Pencil,
  Send,
  History,
  ExternalLink,
  Calculator,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { useNavigate } from "react-router-dom";

const OrganizationCorporationTaxPage = () => {
    const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const premiumEase = [0.22, 1, 0.36, 1];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [periodFilter, setPeriodFilter] = useState("All periods");
  const [openMenu, setOpenMenu] = useState(null);

  /* ============================================================
     CLIENT / CORPORATION TAX DATA
  ============================================================ */

  const [clients] = useState([
    {
      id: 1,
      clientName: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
      contact: "John Smith",

      periodStart: "01 Apr 2025",
      periodEnd: "31 Mar 2026",

      taxableProfit: "£42,500",
      corporationTax: "£8,075",

      dueDate: "01 Jan 2027",

      status: "Ready to file",

      ct600: "Prepared",

      lastUpdated: "02 Oct 2026",
    },

    {
      id: 2,
      clientName: "GREEN TECH LTD",
      companyNumber: "07895432",
      contact: "Sarah Wilson",

      periodStart: "01 Jul 2025",
      periodEnd: "30 Jun 2026",

      taxableProfit: "£68,200",
      corporationTax: "£12,958",

      dueDate: "31 Mar 2027",

      status: "In progress",

      ct600: "Draft",

      lastUpdated: "01 Oct 2026",
    },

    {
      id: 3,
      clientName: "BRIGHT IDEAS LTD",
      companyNumber: "11223344",
      contact: "David Brown",

      periodStart: "01 Jan 2025",
      periodEnd: "31 Dec 2025",

      taxableProfit: "£31,800",
      corporationTax: "£6,042",

      dueDate: "01 Oct 2026",

      status: "Action Required",

      ct600: "Missing information",

      lastUpdated: "28 Sep 2026",
    },

    {
      id: 4,
      clientName: "DIGITAL SOLUTIONS LTD",
      companyNumber: "99887766",
      contact: "Emma Taylor",

      periodStart: "01 Jul 2024",
      periodEnd: "30 Jun 2025",

      taxableProfit: "£91,400",
      corporationTax: "£17,366",

      dueDate: "01 Apr 2026",

      status: "Overdue",

      ct600: "Not started",

      lastUpdated: "20 Sep 2026",
    },

    {
      id: 5,
      clientName: "OCEAN VIEW LTD",
      companyNumber: "66778899",
      contact: "Michael Green",

      periodStart: "01 Apr 2026",
      periodEnd: "31 Mar 2027",

      taxableProfit: "—",
      corporationTax: "—",

      dueDate: "01 Jan 2028",

      status: "Too early",

      ct600: "Not available",

      lastUpdated: "30 Sep 2026",
    },

    {
      id: 6,
      clientName: "SUNRISE TRADING LTD",
      companyNumber: "44556677",
      contact: "James Wilson",

      periodStart: "01 Jan 2026",
      periodEnd: "31 Dec 2026",

      taxableProfit: "£54,700",
      corporationTax: "£10,393",

      dueDate: "01 Oct 2027",

      status: "In progress",

      ct600: "Draft",

      lastUpdated: "29 Sep 2026",
    },
  ]);

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        client.clientName
          .toLowerCase()
          .includes(query) ||
        client.companyNumber.includes(query) ||
        client.contact
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All statuses" ||
        client.status === statusFilter;

      const matchesPeriod =
        periodFilter === "All periods" ||
        client.periodEnd === periodFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPeriod
      );
    });
  }, [
    clients,
    search,
    statusFilter,
    periodFilter,
  ]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const ready = clients.filter(
      (client) =>
        client.status === "Ready to file"
    ).length;

    const inProgress = clients.filter(
      (client) =>
        client.status === "In progress"
    ).length;

    const actionRequired = clients.filter(
      (client) =>
        client.status === "Action Required" ||
        client.status === "Overdue"
    ).length;

    const totalTax = clients.reduce(
      (total, client) => {
        const value = Number(
          client.corporationTax
            .replace("£", "")
            .replace(",", "")
        );

        return total + (Number.isNaN(value) ? 0 : value);
      },
      0
    );

    return [
      {
        id: "clients",
        label: "Corporation Tax Clients",
        value: clients.length,
        icon: Building2,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      },
      {
        id: "ready",
        label: "Ready to File",
        value: ready,
        icon: FileCheck2,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "progress",
        label: "In Progress",
        value: inProgress,
        icon: Clock3,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
      },
      {
        id: "action",
        label: "Action Required",
        value: actionRequired,
        icon: AlertCircle,
        iconBg: "bg-danger-light",
        iconColor: "text-danger",
      },
    ];
  }, [clients]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    console.log("Refresh corporation tax data");
  };

  const handleAction = (action, client) => {
    setOpenMenu(null);

    console.log(
      `Corporation Tax action: ${action}`,
      client
    );

    switch (action) {
      case "prepare":
        console.log(
          "Prepare CT600:",
          client.companyNumber
        );
        break;

      case "continue":
        console.log(
          "Continue CT600:",
          client.companyNumber
        );
        break;

      case "view":
        console.log(
          "View CT600:",
          client.companyNumber
        );
        break;

      case "file":
        console.log(
          "File CT600:",
          client.companyNumber
        );
        navigate(`/organization/products/ct600/${client.companyNumber}/file`);
        break;

      case "elsewhere":
        console.log(
          "CT600 filed elsewhere:",
          client.companyNumber
        );
        break;

      case "amend":
        console.log(
          "Amend CT600:",
          client.companyNumber
        );
        break;

      case "history":
        console.log(
          "CT600 history:",
          client.companyNumber
        );
        break;

      default:
        break;
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setPeriodFilter("All periods");
  };

  const hasFilters =
    search ||
    statusFilter !== "All statuses" ||
    periodFilter !== "All periods";

  /* ============================================================
     ANIMATION
  ============================================================ */

  const pageVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: shouldReduceMotion
          ? 0
          : 0.06,

        delayChildren: shouldReduceMotion
          ? 0
          : 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: shouldReduceMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          y: 18,
        },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
        ease: premiumEase,
      },
    },
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="relative min-h-full bg-background-soft">

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="
          mx-auto
          max-w-7xl
          px-5
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
        "
      >

        {/* ======================================================
            HEADER
        ====================================================== */}

        <motion.div
          variants={fadeUp}
          className="
            mb-6
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary-light
              "
            >
              <Calculator
                className="h-5 w-5 text-primary"
                strokeWidth={2.2}
              />
            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-heading
                  sm:text-3xl
                "
              >
                Corporation Tax
              </h1>

              <p className="mt-0.5 text-sm text-text-secondary">
                Manage CT600 returns and corporation
                tax filings for your clients.
              </p>

            </div>

          </div>


          <div className="flex items-center gap-3">

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-3
                py-2
                text-xs
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-success
                "
              />

              <span className="text-text-secondary">
                HMRC data synced
              </span>
            </div>


            <motion.button
              type="button"
              onClick={handleRefresh}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -1,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.98,
                    }
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
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </motion.button>

          </div>

        </motion.div>


        {/* ======================================================
            STAT CARDS
        ====================================================== */}

        <div
          className="
            mb-6
            grid
            grid-cols-2
            gap-4
            lg:grid-cols-4
          "
        >

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                      }
                }
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-border
                  bg-background
                  p-4
                  shadow-card
                  transition-all
                  duration-300
                  hover:border-primary/20
                  hover:shadow-card-hover
                "
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-text-secondary
                      "
                    >
                      {stat.label}
                    </p>

                    <p
                      className="
                        mt-1.5
                        text-2xl
                        font-bold
                        tracking-tight
                        text-heading
                      "
                    >
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

              </motion.div>
            );
          })}

        </div>


        {/* ======================================================
            CLIENT LIST
        ====================================================== */}

        <motion.div
          variants={fadeUp}
          className="
            overflow-visible
            rounded-xl
            border
            border-border
            bg-background
            shadow-card
          "
        >

          {/* Table header */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-border
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="flex items-center gap-2">

              <FileText className="h-4 w-4 text-primary" />

              <h2 className="text-sm font-bold text-heading">
                Corporation Tax Clients
              </h2>

              <span
                className="
                  rounded-full
                  bg-primary-light
                  px-2
                  py-0.5
                  text-[10px]
                  font-bold
                  text-primary
                "
              >
                {filteredClients.length}
              </span>

            </div>

            <p className="text-[11px] text-text-secondary">
              CT600 filings only
            </p>

          </div>


          {/* ====================================================
              FILTER BAR
          ==================================================== */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-border
              p-4
              lg:flex-row
              lg:items-center
            "
          >

            {/* Search */}

            <div className="relative flex-1">

              <Search
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-text-secondary
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search client, company number or contact..."
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


            {/* Status */}

            <div className="relative">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="
                  h-10
                  min-w-[170px]
                  cursor-pointer
                  appearance-none
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-4
                  pr-9
                  text-sm
                  font-semibold
                  text-heading
                  outline-none
                  transition-colors
                  hover:border-primary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              >
                <option>All statuses</option>
                <option>Ready to file</option>
                <option>In progress</option>
                <option>Action Required</option>
                <option>Overdue</option>
                <option>Too early</option>
              </select>

              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-text-secondary
                "
              />

            </div>


            {/* Period */}

            <div className="relative">

              <select
                value={periodFilter}
                onChange={(e) =>
                  setPeriodFilter(e.target.value)
                }
                className="
                  h-10
                  min-w-[170px]
                  cursor-pointer
                  appearance-none
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-4
                  pr-9
                  text-sm
                  font-semibold
                  text-heading
                  outline-none
                  transition-colors
                  hover:border-primary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              >
                <option>All periods</option>

                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.periodEnd}
                  >
                    {client.periodEnd}
                  </option>
                ))}

              </select>

              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-text-secondary
                "
              />

            </div>


            {/* Clear */}

            <AnimatePresence>

              {hasFilters && (
                <motion.button
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  type="button"
                  onClick={clearFilters}
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
                    hover:border-primary
                    hover:text-primary
                  "
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </motion.button>
              )}

            </AnimatePresence>

          </div>


          {/* ====================================================
              DESKTOP TABLE
          ==================================================== */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full min-w-[1050px]">

              <thead>

                <tr className="border-b border-border bg-background-soft">

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Client
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Accounting Period
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Taxable Profit
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Corporation Tax
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    CT600
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Due Date
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-border">

                {filteredClients.map(
                  (client, index) => {
                    const isOverdue =
                      client.status === "Overdue";

                    const isAction =
                      client.status ===
                      "Action Required";

                    return (
                      <motion.tr
                        key={client.id}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 8,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: shouldReduceMotion
                            ? 0
                            : index * 0.04,
                          ease: premiumEase,
                        }}
                        className={`
                          group
                          transition-colors
                          hover:bg-primary-light/20

                          ${
                            isOverdue
                              ? "bg-danger-light/20"
                              : isAction
                              ? "bg-warning-light/20"
                              : "bg-background"
                          }
                        `}
                      >

                        {/* Client */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-primary-light
                              "
                            >
                              <Building2
                                className="h-4 w-4 text-primary"
                                strokeWidth={2.2}
                              />
                            </div>

                            <div className="min-w-0">

                              <p
                                className="
                                  truncate
                                  text-sm
                                  font-bold
                                  text-heading
                                  transition-colors
                                  group-hover:text-primary
                                "
                              >
                                {client.clientName}
                              </p>

                              <p
                                className="
                                  mt-0.5
                                  font-mono
                                  text-[10px]
                                  text-text-secondary
                                "
                              >
                                #{client.companyNumber}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Period */}

                        <td className="px-5 py-4">

                          <p className="text-xs font-bold text-heading">
                            {client.periodEnd}
                          </p>

                          <p className="mt-0.5 text-[10px] text-text-secondary">
                            {client.periodStart}
                            {" → "}
                            {client.periodEnd}
                          </p>

                        </td>


                        {/* Profit */}

                        <td className="px-5 py-4 text-right">

                          <span className="text-xs font-semibold text-heading">
                            {client.taxableProfit}
                          </span>

                        </td>


                        {/* Tax */}

                        <td className="px-5 py-4 text-right">

                          <span className="text-xs font-bold text-heading">
                            {client.corporationTax}
                          </span>

                        </td>


                        {/* CT600 */}

                        <td className="px-5 py-4">

                          <CT600Status
                            status={client.ct600}
                          />

                        </td>


                        {/* Due */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2">

                            <CalendarDays
                              className={`
                                h-3.5
                                w-3.5

                                ${
                                  isOverdue
                                    ? "text-danger"
                                    : "text-text-secondary"
                                }
                              `}
                            />

                            <span
                              className={`
                                text-xs
                                font-semibold

                                ${
                                  isOverdue
                                    ? "text-danger"
                                    : "text-heading"
                                }
                              `}
                            >
                              {client.dueDate}
                            </span>

                          </div>

                        </td>


                        {/* Actions */}

                        <td
                          className="
                            relative
                            px-5
                            py-4
                            text-right
                          "
                        >

                          <div className="relative inline-block">

                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu === client.id
                                    ? null
                                    : client.id
                                )
                              }
                              className={`
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                border
                                px-3
                                py-2
                                text-[11px]
                                font-bold
                                transition-all
                                duration-200

                                ${
                                  openMenu === client.id
                                    ? "border-primary bg-primary-light text-primary"
                                    : "border-border bg-background text-heading hover:border-primary hover:text-primary"
                                }
                              `}
                            >
                              Actions

                              <ChevronDown
                                className={`
                                  h-3.5
                                  w-3.5
                                  transition-transform
                                  ${
                                    openMenu === client.id
                                      ? "rotate-180"
                                      : ""
                                  }
                                `}
                              />
                            </button>


                            <AnimatePresence>

                              {openMenu === client.id && (
                                <CT600ActionMenu
                                  client={client}
                                  onAction={
                                    handleAction
                                  }
                                />
                              )}

                            </AnimatePresence>

                          </div>

                        </td>

                      </motion.tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>


          {/* ====================================================
              MOBILE CLIENT LIST
          ==================================================== */}

          <div className="divide-y divide-border lg:hidden">

            {filteredClients.map((client) => {

              const isOverdue =
                client.status === "Overdue";

              return (
                <div
                  key={client.id}
                  className={`
                    p-4
                    ${
                      isOverdue
                        ? "bg-danger-light/20"
                        : "bg-background"
                    }
                  `}
                >

                  <div className="flex items-start gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-primary-light
                      "
                    >
                      <Building2
                        className="h-4 w-4 text-primary"
                      />
                    </div>


                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p className="text-sm font-bold text-heading">
                            {client.clientName}
                          </p>

                          <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                            #{client.companyNumber}
                          </p>

                        </div>

                        <CT600Status
                          status={client.ct600}
                        />

                      </div>


                      <div
                        className="
                          mt-3
                          grid
                          grid-cols-2
                          gap-2
                          rounded-lg
                          bg-background-soft
                          p-3
                        "
                      >

                        <div>

                          <p className="text-[10px] text-text-secondary">
                            Period End
                          </p>

                          <p className="mt-0.5 text-[11px] font-bold text-heading">
                            {client.periodEnd}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-[10px] text-text-secondary">
                            CT600 Due
                          </p>

                          <p
                            className={`
                              mt-0.5
                              text-[11px]
                              font-bold

                              ${
                                isOverdue
                                  ? "text-danger"
                                  : "text-heading"
                              }
                            `}
                          >
                            {client.dueDate}
                          </p>

                        </div>

                      </div>


                      <div className="mt-3 flex justify-end">

                        <div className="relative">

                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === client.id
                                  ? null
                                  : client.id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              bg-primary
                              px-3
                              py-2
                              text-[10px]
                              font-bold
                              text-text-white
                              shadow-button
                            "
                          >
                            Actions

                            <ChevronDown className="h-3 w-3" />
                          </button>


                          <AnimatePresence>

                            {openMenu === client.id && (
                              <CT600ActionMenu
                                client={client}
                                onAction={
                                  handleAction
                                }
                                mobile
                              />
                            )}

                          </AnimatePresence>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>


          {/* Empty */}

          {filteredClients.length === 0 && (
            <div className="px-5 py-16 text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-primary-light
                "
              >
                <Calculator
                  className="h-6 w-6 text-primary"
                />
              </div>

              <p className="mt-4 text-sm font-bold text-heading">
                No Corporation Tax clients found
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </motion.div>


        {/* ======================================================
            INFO NOTE
        ====================================================== */}

        <motion.div
          variants={fadeUp}
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-primary/10
            bg-primary-light/50
            p-4
          "
        >

          <Calculator
            className="
              mt-0.5
              h-4
              w-4
              shrink-0
              text-primary
            "
          />

          <p className="text-[11px] leading-6 text-text-secondary">
            This workspace is dedicated to Corporation Tax
            and CT600 returns. Annual Accounts, VAT and
            other services are managed from their respective
            product areas.
          </p>

        </motion.div>

      </motion.div>

    </div>
  );
};


/* ============================================================
   CT600 STATUS
============================================================ */

const CT600Status = ({ status }) => {
  const config = {
    Prepared: {
      icon: FileCheck2,
      bg: "bg-success-light",
      color: "text-success",
    },

    Draft: {
      icon: FileText,
      bg: "bg-warning-light",
      color: "text-warning",
    },

    "Missing information": {
      icon: AlertCircle,
      bg: "bg-danger-light",
      color: "text-danger",
    },

    "Not started": {
      icon: Clock3,
      bg: "bg-background-soft",
      color: "text-text-secondary",
    },

    "Not available": {
      icon: Clock3,
      bg: "bg-background-soft",
      color: "text-text-secondary",
    },
  };

  const current =
    config[status] || config["Not started"];

  const Icon = current.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        ${current.bg}
        px-2.5
        py-1
        text-[10px]
        font-bold
        ${current.color}
      `}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
};


/* ============================================================
   CT600 ACTION MENU
============================================================ */

const CT600ActionMenu = ({
  client,
  onAction,
  mobile = false,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -6,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -4,
        scale: 0.97,
      }}
      transition={{
        duration: 0.18,
      }}
      className={`
        absolute
        ${
          mobile
            ? "right-0 top-[calc(100%+6px)]"
            : "right-0 top-[calc(100%+6px)]"
        }
        z-[200]
        w-[260px]
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-background
        text-left
        shadow-card-hover
      `}
    >

      {/* Menu header */}

      <div
        className="
          border-b
          border-border
          bg-background-soft
          px-4
          py-3
        "
      >

        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            text-text-secondary
          "
        >
          CT600 actions
        </p>

        <p
          className="
            mt-1
            truncate
            text-xs
            font-bold
            text-heading
          "
        >
          {client.clientName}
        </p>

      </div>


      {/* Main action */}

      {client.ct600 === "Not started" && (
        <ActionItem
          icon={Calculator}
          label="Prepare CT600"
          description="Start a new Corporation Tax return"
          onClick={() =>
            onAction("prepare", client)
          }
          primary
        />
      )}


      {client.ct600 === "Draft" && (
        <ActionItem
          icon={FileText}
          label="Continue CT600"
          description="Continue preparing the return"
          onClick={() =>
            onAction("continue", client)
          }
          primary
        />
      )}


      {client.ct600 === "Missing information" && (
        <ActionItem
          icon={AlertCircle}
          label="Complete CT600"
          description="Review missing information"
          onClick={() =>
            onAction("continue", client)
          }
          primary
        />
      )}


      {client.ct600 === "Prepared" && (
        <ActionItem
          icon={FileCheck2}
          label="Review CT600"
          description="Review the completed return"
          onClick={() =>
            onAction("view", client)
          }
          primary
        />
      )}


      {/* Common actions */}

      <ActionItem
        icon={Eye}
        label="View CT600"
        description="View return details"
        onClick={() =>
          onAction("view", client)
        }
      />


      <ActionItem
        icon={Send}
        label="File CT600"
        description="Submit the return to HMRC"
        onClick={() =>
          onAction("file", client)
        }
      />


      <ActionItem
        icon={ExternalLink}
        label="CT600 filed elsewhere"
        description="Record an external filing"
        onClick={() =>
          onAction("elsewhere", client)
        }
      />


      <ActionItem
        icon={Pencil}
        label="Amend CT600"
        description="Amend a previously filed return"
        onClick={() =>
          onAction("amend", client)
        }
      />


      <div className="border-t border-border" />


      <ActionItem
        icon={History}
        label="Filing history"
        description="View previous CT600 returns"
        onClick={() =>
          onAction("history", client)
        }
      />

    </motion.div>
  );
};


/* ============================================================
   ACTION ITEM
============================================================ */

const ActionItem = ({
  icon: Icon,
  label,
  description,
  onClick,
  primary = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        px-4
        py-3
        text-left
        transition-colors
        duration-150
        hover:bg-primary-light
      "
    >

      <span
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            primary
              ? "bg-primary text-text-white"
              : "bg-primary-light text-primary"
          }

          transition-colors
          duration-200
          group-hover:bg-primary
          group-hover:text-text-white
        `}
      >
        <Icon
          className="h-3.5 w-3.5"
          strokeWidth={2.2}
        />
      </span>


      <span className="min-w-0 flex-1">

        <span
          className="
            block
            text-xs
            font-bold
            text-heading
          "
        >
          {label}
        </span>

        <span
          className="
            mt-0.5
            block
            text-[10px]
            leading-4
            text-text-secondary
          "
        >
          {description}
        </span>

      </span>


      <ChevronRight
        className="
          h-3.5
          w-3.5
          shrink-0
          text-text-secondary
          transition-transform
          group-hover:translate-x-0.5
          group-hover:text-primary
        "
      />

    </button>
  );
};


export default OrganizationCorporationTaxPage;