import React, { useState, useMemo } from "react";
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
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  UserPlus,
  Download,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Hash,
  Check,
  Send,
  Archive,
  Star,
} from "lucide-react";

const AccountantClients = () => {
  const navigate = useNavigate();

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
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "active",
      label: "Active",
      value: 38,
      change: "90% of total",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "onboarding",
      label: "Onboarding",
      value: 3,
      change: "In progress",
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "overdue",
      label: "With Overdue",
      value: 4,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
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
      avatarColor: "bg-[#087F5B]",
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
      avatarColor: "bg-emerald-500",
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
      avatarColor: "bg-amber-500",
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
      avatarColor: "bg-blue-500",
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
      avatarColor: "bg-purple-500",
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
      avatarColor: "bg-cyan-500",
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
      avatarColor: "bg-rose-500",
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
      avatarColor: "bg-indigo-500",
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
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        };
      case "Onboarding":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
            Clients
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage your client portfolio and relationships
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-[#DDEAE6]
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#09263A]
              transition-all
              duration-200
              hover:border-[#087F5B]
              hover:text-[#087F5B]
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
          </button>

          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-[#DDEAE6]
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#09263A]
              transition-all
              duration-200
              hover:border-[#087F5B]
              hover:text-[#087F5B]
            "
          >
            <Download className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <Link
            to="/accountant/clients/new"
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-[#087F5B]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#005E45]
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            <span>Add Client</span>
          </Link>
        </div>
      </div>

      {/* ======================================================
          STATS CARDS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                border
                border-[#DDEAE6]
                bg-white
                p-5
                shadow-[0_3px_14px_rgba(16,42,67,0.035)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-semibold text-[#687B78]">
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
            </div>
          );
        })}
      </div>

      {/* ======================================================
          FILTERS BAR
      ====================================================== */}
      <div className="rounded-xl border border-[#DDEAE6] bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients by name, contact, company number or email..."
              className="
                w-full
                rounded-lg
                border
                border-[#DDEAE6]
                bg-[#F5FCF9]
                py-2.5
                pl-10
                pr-4
                text-sm
                text-[#09263A]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#687B78]
                focus:border-[#087F5B]
                focus:bg-white
                focus:ring-2
                focus:ring-[#087F5B]/10
              "
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowTypeDropdown(false);
              }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
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
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showStatusDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
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
                      hover:bg-[#E8F8F2]
                      ${
                        statusFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {statusFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown((prev) => !prev);
                setShowStatusDropdown(false);
              }}
              className="
                inline-flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
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
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showTypeDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showTypeDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
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
                      hover:bg-[#E8F8F2]
                      ${
                        typeFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {typeFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#687B78]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
              "
            >
              <Filter className="h-3.5 w-3.5" strokeWidth={2.2} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================
          CLIENTS TABLE
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Table header info */}
        <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-[#09263A]">
              All Clients
            </h2>
            <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
              {filteredClients.length}
            </span>
          </div>
          <p className="text-[11px] text-[#687B78]">
            Click a client to view details
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Client
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Contact
                </th>
                <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Companies
                </th>
                <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Open
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#DDEAE6]">
              {filteredClients.map((client) => {
                const statusStyles = getStatusStyles(client.status);
                const hasOverdue = client.overdueFilings > 0;

                return (
                  <tr
                    key={client.id}
                    onClick={() =>
                      navigate(`/accountant/clients/${client.id}`)
                    }
                    className="group cursor-pointer transition-colors hover:bg-[#F5FCF9]"
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
                            text-white
                            ${client.avatarColor}
                          `}
                        >
                          {client.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                            {client.clientName}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                            #{client.companyNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-[#09263A]">
                          {client.contactPerson}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-[#687B78]">
                          {client.email}
                        </p>
                      </div>
                    </td>

                    {/* Companies */}
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[11px] font-bold text-[#09263A]">
                        <Building2
                          className="h-3 w-3 text-[#687B78]"
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
                                ? "bg-rose-100 text-rose-700"
                                : "bg-[#F5FCF9] text-[#09263A]"
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
                          <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600">
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
                            border-[#DDEAE6]
                            bg-white
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            text-[#09263A]
                            transition-all
                            duration-200
                            hover:border-[#087F5B]
                            hover:bg-[#E8F8F2]
                            hover:text-[#087F5B]
                          "
                        >
                          <Eye className="h-3 w-3" strokeWidth={2.4} />
                          <span>View</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenRowMenu(
                              openRowMenu === client.id ? null : client.id
                            )
                          }
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            text-[#687B78]
                            transition-colors
                            hover:bg-[#E8F8F2]
                            hover:text-[#087F5B]
                          "
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>

                        {openRowMenu === client.id && (
                          <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View details</span>
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              <span>Edit client</span>
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            >
                              <Send className="h-3.5 w-3.5" />
                              <span>Send message</span>
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>Start filing</span>
                            </button>
                            <div className="my-1 border-t border-[#DDEAE6]" />
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50"
                            >
                              <Archive className="h-3.5 w-3.5" />
                              <span>Archive client</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="divide-y divide-[#DDEAE6] lg:hidden">
          {filteredClients.map((client) => {
            const statusStyles = getStatusStyles(client.status);
            const hasOverdue = client.overdueFilings > 0;

            return (
              <div
                key={client.id}
                onClick={() => navigate(`/accountant/clients/${client.id}`)}
                className="cursor-pointer p-4 transition-colors hover:bg-[#F5FCF9]"
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
                      text-white
                      ${client.avatarColor}
                    `}
                  >
                    {client.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#09263A]">
                          {client.clientName}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
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

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-[#687B78]">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{client.email}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2">
                      <div>
                        <p className="text-[10px] text-[#687B78]">
                          Companies
                        </p>
                        <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
                          {client.companiesCount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-[#687B78]">Open</p>
                        <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
                          {client.openFilings}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#687B78]">
                          Overdue
                        </p>
                        <p
                          className={`mt-0.5 text-[11px] font-bold ${
                            hasOverdue ? "text-rose-600" : "text-[#09263A]"
                          }`}
                        >
                          {client.overdueFilings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredClients.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
              <Users className="h-7 w-7 text-[#087F5B]" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-[#09263A]">
              No clients found
            </p>
            <p className="mt-1 max-w-xs text-xs text-[#687B78]">
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
                  border-[#DDEAE6]
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#09263A]
                  transition-all
                  duration-200
                  hover:border-[#087F5B]
                  hover:text-[#087F5B]
                "
              >
                <Filter className="h-3 w-3" strokeWidth={2.4} />
                <span>Clear filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <UserPlus className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                Grow your practice
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Onboard a new client in minutes
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Add client details, link companies and set up filing
                permissions — all in one place.
              </p>
            </div>
          </div>

          <Link
            to="/accountant/clients/new"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              self-start
              rounded-lg
              bg-[#087F5B]
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#005E45]
              hover:-translate-y-0.5
              hover:shadow-md
              sm:self-auto
            "
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Add new client</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantClients;