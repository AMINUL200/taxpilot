import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  CalendarDays,
  AlertCircle,
  ChevronRight,
  MoreHorizontal,
  Building2,
  FileText,
  Calculator,
  Receipt,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  Filter,
  RefreshCw,
  UserPlus,
  BriefcaseBusiness,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

const OrganizationAccountPage = () => {
  const shouldReduceMotion = useReducedMotion();

  const premiumEase = [0.22, 1, 0.36, 1];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All clients");
  const [openMenu, setOpenMenu] = useState(null);

  /* ============================================================
     CLIENT DATA
  ============================================================ */

  const [clients] = useState([
    {
      id: 1,
      name: "SKIL FOUR LIMITED",
      number: "05513948",
      contact: "John Smith",
      email: "john@skilfour.co.uk",
      services: ["Corporation Tax", "Annual Accounts", "VAT"],
      deadline: "01 Jan 2027",
      deadlineLabel: "Corporation Tax",
      tasks: 2,
      status: "Active",
      initials: "SF",
    },
    {
      id: 2,
      name: "GREEN TECH LTD",
      number: "07895432",
      contact: "Sarah Wilson",
      email: "sarah@greentech.co.uk",
      services: ["Annual Accounts", "VAT"],
      deadline: "15 Nov 2026",
      deadlineLabel: "Annual Accounts",
      tasks: 1,
      status: "Active",
      initials: "GT",
    },
    {
      id: 3,
      name: "BRIGHT IDEAS LTD",
      number: "11223344",
      contact: "David Brown",
      email: "david@brightideas.co.uk",
      services: ["Corporation Tax", "Annual Accounts"],
      deadline: "20 Nov 2026",
      deadlineLabel: "Accounts",
      tasks: 0,
      status: "Active",
      initials: "BI",
    },
    {
      id: 4,
      name: "DIGITAL SOLUTIONS LTD",
      number: "99887766",
      contact: "Emma Taylor",
      email: "emma@digitalsolutions.co.uk",
      services: ["Corporation Tax", "VAT", "Payroll"],
      deadline: "18 Oct 2026",
      deadlineLabel: "VAT Return",
      tasks: 4,
      status: "Action Required",
      initials: "DS",
    },
    {
      id: 5,
      name: "OCEAN VIEW LTD",
      number: "66778899",
      contact: "Michael Green",
      email: "michael@oceanview.co.uk",
      services: ["Annual Accounts"],
      deadline: "12 Dec 2026",
      deadlineLabel: "Annual Accounts",
      tasks: 0,
      status: "Active",
      initials: "OV",
    },
    {
      id: 6,
      name: "SUNRISE TRADING LTD",
      number: "44556677",
      contact: "James Wilson",
      email: "james@sunrisetrading.co.uk",
      services: ["Corporation Tax", "VAT"],
      deadline: "22 Dec 2026",
      deadlineLabel: "VAT Return",
      tasks: 1,
      status: "Active",
      initials: "ST",
    },
  ]);

  /* ============================================================
     FILTER CLIENTS
  ============================================================ */

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        client.name.toLowerCase().includes(query) ||
        client.number.includes(query) ||
        client.contact.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All clients" ||
        client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const activeClients = clients.filter(
      (client) => client.status === "Active"
    ).length;

    const actionRequired = clients.filter(
      (client) => client.status === "Action Required"
    ).length;

    const filingsDue = clients.reduce(
      (total, client) => total + client.tasks,
      0
    );

    return [
      {
        id: "clients",
        label: "Total Clients",
        value: clients.length,
        icon: Users,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      },
      {
        id: "active",
        label: "Active Clients",
        value: activeClients,
        icon: UserCheck,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "filings",
        label: "Open Tasks",
        value: filingsDue,
        icon: FileText,
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
     ANIMATION
  ============================================================ */

  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
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

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 14,
          scale: 0.98,
        },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: premiumEase,
      },
    },
  };

  /* ============================================================
     ACTIONS
  ============================================================ */

  const handleAddClient = () => {
    console.log("Add client");
  };

  const handleViewClient = (client) => {
    console.log("View client:", client);
  };

  const handleRefresh = () => {
    console.log("Refreshing accountant workspace...");
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
              <BriefcaseBusiness
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
                Accountant Workspace
              </h1>

              <p className="mt-0.5 text-sm text-text-secondary">
                Manage your clients, compliance work and
                upcoming deadlines from one place.
              </p>
            </div>

          </div>


          <div className="flex items-center gap-3">

            {/* Sync */}

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
                Workspace synced
              </span>
            </div>


            {/* Refresh */}

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
              <span>Refresh</span>
            </motion.button>


            {/* Add client */}

            <motion.button
              type="button"
              onClick={handleAddClient}
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
                bg-primary
                px-4
                py-2
                text-xs
                font-semibold
                text-text-white
                shadow-button
                transition-colors
                duration-200
                hover:bg-primary-hover
              "
            >
              <Plus className="h-4 w-4" />
              <span>Add Client</span>
            </motion.button>

          </div>

        </motion.div>


        {/* ======================================================
            STATS
        ====================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
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
                  transition-[border-color,box-shadow]
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
            MAIN GRID
        ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">


          {/* ====================================================
              CLIENT WORKSPACE
          ==================================================== */}

          <motion.div
            variants={fadeUp}
            className="
              min-w-0
              rounded-xl
              border
              border-border
              bg-background
              shadow-card
            "
          >

            {/* Header */}

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

                <Users className="h-4 w-4 text-primary" />

                <h2 className="text-sm font-bold text-heading">
                  Client Workspace
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
                Manage your client portfolio
              </p>

            </div>


            {/* Filters */}

            <div
              className="
                flex
                flex-col
                gap-3
                border-b
                border-border
                p-4
                lg:flex-row
              "
            >

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
                  placeholder="Search clients..."
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


              <div className="relative">

                <Filter
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    h-3.5
                    w-3.5
                    -translate-y-1/2
                    text-text-secondary
                  "
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="
                    h-10
                    min-w-[160px]
                    cursor-pointer
                    appearance-none
                    rounded-lg
                    border
                    border-border
                    bg-background
                    pl-9
                    pr-8
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
                  <option>All clients</option>
                  <option>Active</option>
                  <option>Action Required</option>
                </select>

              </div>

            </div>


            {/* Desktop table */}

            <div className="hidden overflow-x-auto lg:block">

              <table className="w-full min-w-[900px]">

                <thead>

                  <tr className="border-b border-border bg-background-soft">

                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Client
                    </th>

                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Services
                    </th>

                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Next Deadline
                    </th>

                    <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Tasks
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

                  {filteredClients.map(
                    (client, index) => (
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
                          delay: shouldReduceMotion
                            ? 0
                            : index * 0.04,
                          duration: 0.35,
                          ease: premiumEase,
                        }}
                        className="
                          group
                          cursor-pointer
                          transition-colors
                          hover:bg-primary-light/30
                        "
                        onClick={() =>
                          handleViewClient(client)
                        }
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
                                text-xs
                                font-bold
                                text-primary
                              "
                            >
                              {client.initials}
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
                                {client.name}
                              </p>

                              <p
                                className="
                                  mt-0.5
                                  font-mono
                                  text-[10px]
                                  text-text-secondary
                                "
                              >
                                #{client.number}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Services */}

                        <td className="px-5 py-4">

                          <div className="flex flex-wrap gap-1.5">

                            {client.services
                              .slice(0, 2)
                              .map((service) => (
                                <span
                                  key={service}
                                  className="
                                    rounded-full
                                    border
                                    border-border
                                    bg-background-soft
                                    px-2
                                    py-1
                                    text-[9px]
                                    font-semibold
                                    text-text-secondary
                                  "
                                >
                                  {service}
                                </span>
                              ))}

                            {client.services.length > 2 && (
                              <span
                                className="
                                  rounded-full
                                  bg-primary-light
                                  px-2
                                  py-1
                                  text-[9px]
                                  font-bold
                                  text-primary
                                "
                              >
                                +{client.services.length - 2}
                              </span>
                            )}

                          </div>

                        </td>


                        {/* Deadline */}

                        <td className="px-5 py-4">

                          <div>

                            <p className="text-xs font-bold text-heading">
                              {client.deadline}
                            </p>

                            <p className="mt-0.5 text-[10px] text-text-secondary">
                              {client.deadlineLabel}
                            </p>

                          </div>

                        </td>


                        {/* Tasks */}

                        <td className="px-5 py-4 text-center">

                          <span
                            className={`
                              inline-flex
                              min-w-7
                              items-center
                              justify-center
                              rounded-full
                              px-2
                              py-1
                              text-[10px]
                              font-bold
                              ${
                                client.tasks > 0
                                  ? "bg-warning-light text-warning"
                                  : "bg-success-light text-success"
                              }
                            `}
                          >
                            {client.tasks}
                          </span>

                        </td>


                        {/* Status */}

                        <td className="px-5 py-4">

                          {client.status === "Action Required" ? (
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-danger-light
                                px-2.5
                                py-1
                                text-[10px]
                                font-bold
                                text-danger
                              "
                            >
                              <AlertCircle className="h-3 w-3" />
                              Action Required
                            </span>
                          ) : (
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
                              <CheckCircle2 className="h-3 w-3" />
                              Active
                            </span>
                          )}

                        </td>


                        {/* Action */}

                        <td
                          className="px-5 py-4 text-right"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          <button
                            type="button"
                            onClick={() =>
                              handleViewClient(client)
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
                              transition-colors
                              hover:bg-primary-hover
                            "
                          >
                            Open
                            <ArrowUpRight className="h-3 w-3" />
                          </button>

                        </td>

                      </motion.tr>
                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* Mobile */}

            <div className="divide-y divide-border lg:hidden">

              {filteredClients.map((client) => (

                <div
                  key={client.id}
                  onClick={() =>
                    handleViewClient(client)
                  }
                  className="
                    cursor-pointer
                    p-4
                    transition-colors
                    hover:bg-primary-light/30
                  "
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
                        text-xs
                        font-bold
                        text-primary
                      "
                    >
                      {client.initials}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-2">

                        <div>

                          <p className="text-sm font-bold text-heading">
                            {client.name}
                          </p>

                          <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                            #{client.number}
                          </p>

                        </div>

                        {client.status ===
                          "Action Required" && (
                          <span
                            className="
                              shrink-0
                              rounded-full
                              bg-danger-light
                              px-2
                              py-1
                              text-[9px]
                              font-bold
                              text-danger
                            "
                          >
                            Action
                          </span>
                        )}

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
                            Deadline
                          </p>

                          <p className="mt-0.5 text-[11px] font-bold text-heading">
                            {client.deadline}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] text-text-secondary">
                            Open Tasks
                          </p>

                          <p className="mt-0.5 text-[11px] font-bold text-heading">
                            {client.tasks}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

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
                  <Users className="h-6 w-6 text-primary" />
                </div>

                <p className="mt-4 text-sm font-bold text-heading">
                  No clients found
                </p>

                <p className="mt-1 text-xs text-text-secondary">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </motion.div>


          {/* ====================================================
              RIGHT SIDEBAR
          ==================================================== */}

          <div className="space-y-6">


            {/* Upcoming deadlines */}

            <motion.div
              variants={fadeUp}
              className="
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-background
                shadow-card
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-border
                  px-4
                  py-4
                "
              >

                <div className="flex items-center gap-2">

                  <CalendarDays className="h-4 w-4 text-primary" />

                  <h2 className="text-sm font-bold text-heading">
                    Upcoming Deadlines
                  </h2>

                </div>

                <button
                  type="button"
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  View all
                </button>

              </div>


              <div className="divide-y divide-border">

                {clients
                  .slice(0, 4)
                  .map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() =>
                        handleViewClient(client)
                      }
                      className="
                        group
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3.5
                        text-left
                        transition-colors
                        hover:bg-primary-light/40
                      "
                    >

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-primary-light
                        "
                      >
                        <CalendarDays
                          className="h-3.5 w-3.5 text-primary"
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[11px] font-bold text-heading">
                          {client.name}
                        </p>

                        <p className="mt-0.5 text-[10px] text-text-secondary">
                          {client.deadlineLabel}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-[10px] font-bold text-heading">
                          {client.deadline}
                        </p>

                        <ChevronRight
                          className="
                            ml-auto
                            mt-1
                            h-3
                            w-3
                            text-text-secondary
                            transition-transform
                            group-hover:translate-x-0.5
                            group-hover:text-primary
                          "
                        />

                      </div>

                    </button>
                  ))}

              </div>

            </motion.div>


            {/* Quick actions */}

            <motion.div
              variants={fadeUp}
              className="
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-background
                shadow-card
              "
            >

              <div
                className="
                  border-b
                  border-border
                  px-4
                  py-4
                "
              >

                <h2 className="text-sm font-bold text-heading">
                  Quick Actions
                </h2>

                <p className="mt-0.5 text-[10px] text-text-secondary">
                  Common accountant tasks
                </p>

              </div>


              <div>

                <QuickAction
                  icon={UserPlus}
                  title="Add a new client"
                  description="Create a client profile and assign services."
                  onClick={handleAddClient}
                />

                <QuickAction
                  icon={FileText}
                  title="Review filings"
                  description="See filings that need your attention."
                  onClick={() =>
                    console.log("Review filings")
                  }
                />

                <QuickAction
                  icon={CalendarDays}
                  title="View deadlines"
                  description="Review upcoming compliance deadlines."
                  onClick={() =>
                    console.log("View deadlines")
                  }
                />

                <QuickAction
                  icon={Users}
                  title="Manage team"
                  description="Manage accountants and team members."
                  onClick={() =>
                    console.log("Manage team")
                  }
                  last
                />

              </div>

            </motion.div>


            {/* Workspace summary */}

            <motion.div
              variants={fadeUp}
              className="
                rounded-xl
                border
                border-primary/10
                bg-primary-light/60
                p-4
              "
            >

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary
                    text-text-white
                  "
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>

                <div>

                  <p className="text-xs font-bold text-heading">
                    Accountant workspace
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-text-secondary">
                    Keep client records, services and
                    compliance work organised in one place.
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};


/* ============================================================
   QUICK ACTION
============================================================ */

const QuickAction = ({
  icon: Icon,
  title,
  description,
  onClick,
  last = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-center
        gap-3
        px-4
        py-3.5
        text-left
        transition-colors
        hover:bg-primary-light
        ${!last ? "border-b border-border" : ""}
      `}
    >

      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-primary-light
          text-primary
          transition-colors
          group-hover:bg-primary
          group-hover:text-white
        "
      >
        <Icon
          className="h-4 w-4"
          strokeWidth={2.2}
        />
      </span>

      <span className="min-w-0 flex-1">

        <span className="block text-xs font-bold text-heading">
          {title}
        </span>

        <span className="mt-0.5 block text-[10px] leading-4 text-text-secondary">
          {description}
        </span>

      </span>

      <ChevronRight
        className="
          h-4
          w-4
          shrink-0
          text-text-secondary
          transition-all
          group-hover:translate-x-0.5
          group-hover:text-primary
        "
      />

    </button>
  );
};

export default OrganizationAccountPage;