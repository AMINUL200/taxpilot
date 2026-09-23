import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  X,
  Check,
  FileText,
  Upload,
  CalendarDays,
  Pencil,
  ExternalLink,
  Archive,
  Building2,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Info,
  ArrowRight,
  Hash,
  ShieldCheck,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  PauseCircle,
  User,
  UserCheck,
  Send,
  Plus,
  Eye,
  Briefcase,
} from "lucide-react";

/* ============================================================
   CORPORATION TAX PAGE
============================================================ */

const OrganizationCorporationTax = () => {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [periodFilter, setPeriodFilter] = useState("All periods");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [openFilingMenu, setOpenFilingMenu] = useState(null);
  const [showAllPeriods, setShowAllPeriods] = useState(false);
  const [reminders, setReminders] = useState({
    ct600: true,
    accounts: true,
    confirmation: true,
  });

  // Modal state
  const [activeModal, setActiveModal] = useState(null);
  // Values: null | "sent-status" | "pause-reminders" | "who-sent" | "hmrc-request" | "remove-period"

  // Years sidebar
  const [showYearsSidebar, setShowYearsSidebar] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  // Simulated action state (replace with API later)
  const [actionState, setActionState] = useState({});

  const rowMenuRef = useRef(null);

  /* ============================================================
     COMPANY DATA
  ============================================================ */

  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
      status: "Active",
      periodEnd: "31 Mar 2026",
      periodStart: "1 Apr 2025",
      profit: "—",
      tax: "—",
      accountsFiled: true,
      ct600Filed: false,
      nextDue: "CT600 in 6 months",
      dueType: "normal",
      periods: [
        {
          id: 101,
          periodEnd: "31 Mar 2026",
          periodStart: "1 Apr 2025",
          profit: "—",
          tax: "—",
          accountsFiled: true,
          ct600Filed: false,
          status: "Ready to file",
        },
        {
          id: 102,
          periodEnd: "31 Mar 2025",
          periodStart: "1 Apr 2024",
          profit: "—",
          tax: "—",
          accountsFiled: true,
          ct600Filed: false,
          status: "Ready to file",
        },
        {
          id: 103,
          periodEnd: "31 Mar 2024",
          periodStart: "1 Apr 2023",
          profit: "—",
          tax: "—",
          accountsFiled: true,
          ct600Filed: false,
          status: "Ready to file",
        },
      ],
      accountsOutside: true,
    },
    {
      id: 2,
      companyName: "GREEN TECH LTD",
      companyNumber: "07895432",
      status: "Active",
      periodEnd: "30 Jun 2026",
      periodStart: "1 Jul 2025",
      profit: "—",
      tax: "—",
      accountsFiled: false,
      ct600Filed: false,
      nextDue: "Accounts in 1.3 years",
      dueType: "early",
      periods: [
        {
          id: 201,
          periodEnd: "30 Jun 2026",
          periodStart: "1 Jul 2025",
          profit: "—",
          tax: "—",
          accountsFiled: false,
          ct600Filed: false,
          status: "Too early",
        },
      ],
      accountsOutside: false,
    },
    {
      id: 3,
      companyName: "BRIGHT IDEAS LTD",
      companyNumber: "11223344",
      status: "Active",
      periodEnd: "31 Dec 2025",
      periodStart: "1 Jan 2025",
      profit: "—",
      tax: "—",
      accountsFiled: true,
      ct600Filed: false,
      nextDue: "CT600 in 4 months",
      dueType: "normal",
      periods: [
        {
          id: 301,
          periodEnd: "31 Dec 2025",
          periodStart: "1 Jan 2025",
          profit: "—",
          tax: "—",
          accountsFiled: true,
          ct600Filed: false,
          status: "Ready to file",
        },
      ],
      accountsOutside: false,
    },
    {
      id: 4,
      companyName: "DIGITAL SOLUTIONS LTD",
      companyNumber: "99887766",
      status: "Action Required",
      periodEnd: "30 Jun 2025",
      periodStart: "1 Jul 2024",
      profit: "—",
      tax: "—",
      accountsFiled: false,
      ct600Filed: false,
      nextDue: "Overdue 12 days",
      dueType: "overdue",
      periods: [
        {
          id: 401,
          periodEnd: "30 Jun 2025",
          periodStart: "1 Jul 2024",
          profit: "—",
          tax: "—",
          accountsFiled: false,
          ct600Filed: false,
          status: "Overdue",
        },
      ],
      accountsOutside: false,
    },
    {
      id: 5,
      companyName: "OCEAN VIEW LTD",
      companyNumber: "66778899",
      status: "Active",
      periodEnd: "31 Mar 2027",
      periodStart: "1 Apr 2026",
      profit: "—",
      tax: "—",
      accountsFiled: false,
      ct600Filed: false,
      nextDue: "Accounts in 1.8 years",
      dueType: "early",
      periods: [
        {
          id: 501,
          periodEnd: "31 Mar 2027",
          periodStart: "1 Apr 2026",
          profit: "—",
          tax: "—",
          accountsFiled: false,
          ct600Filed: false,
          status: "Too early",
        },
      ],
      accountsOutside: false,
    },
    {
      id: 6,
      companyName: "SUNRISE TRADING LTD",
      companyNumber: "44556677",
      status: "Active",
      periodEnd: "31 Dec 2026",
      periodStart: "1 Jan 2026",
      profit: "—",
      tax: "—",
      accountsFiled: false,
      ct600Filed: false,
      nextDue: "CT600 in 9 months",
      dueType: "normal",
      periods: [
        {
          id: 601,
          periodEnd: "31 Dec 2026",
          periodStart: "1 Jan 2026",
          profit: "—",
          tax: "—",
          accountsFiled: false,
          ct600Filed: false,
          status: "Ready to file",
        },
      ],
      accountsOutside: false,
    },
  ]);

  /* ============================================================
     YEARS DATA (for View All Years sidebar)
  ============================================================ */

  const years = [
    {
      id: 1,
      period: "01 Apr 2025 – 31 Mar 2026",
      status: "Due",
      dueDate: "01 Jan 2027",
      type: "Corporation Tax",
    },
    {
      id: 2,
      period: "01 Apr 2024 – 31 Mar 2025",
      status: "Filed",
      dueDate: "01 Jan 2026",
      type: "Corporation Tax",
    },
    {
      id: 3,
      period: "01 Apr 2023 – 31 Mar 2024",
      status: "Filed",
      dueDate: "01 Jan 2025",
      type: "Corporation Tax",
    },
  ];

  /* ============================================================
     FILTERED COMPANIES
  ============================================================ */

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.companyName.toLowerCase().includes(search.toLowerCase()) ||
        company.companyNumber.includes(search);
      const matchesStatus =
        statusFilter === "All statuses" || company.status === statusFilter;
      const matchesPeriod =
        periodFilter === "All periods" || company.periodEnd === periodFilter;
      return matchesSearch && matchesStatus && matchesPeriod;
    });
  }, [companies, search, statusFilter, periodFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const readyToFile = companies.filter((c) => c.dueType === "normal").length;
    const overdue = companies.filter((c) => c.dueType === "overdue").length;
    const tooEarly = companies.filter((c) => c.dueType === "early").length;
    const total = companies.length;

    return [
      {
        id: "total",
        label: "Total Companies",
        value: total,
        icon: Building2,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        id: "ready",
        label: "Ready to File",
        value: readyToFile,
        icon: FileCheck2,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        id: "overdue",
        label: "Overdue",
        value: overdue,
        icon: AlertCircle,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-500",
      },
      {
        id: "early",
        label: "Too Early",
        value: tooEarly,
        icon: Clock3,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
    ];
  }, [companies]);

  /* ============================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (rowMenuRef.current && !rowMenuRef.current.contains(event.target)) {
        setOpenRowMenu(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  /* ============================================================
     TOAST HELPER
  ============================================================ */

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const openCompanyDrawer = (company) => {
    setSelectedCompany(company);
    setOpenRowMenu(null);
    setOpenFilingMenu(null);
    setShowAllPeriods(false);
  };

  const closeDrawer = () => {
    setSelectedCompany(null);
    setOpenFilingMenu(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setPeriodFilter("All periods");
  };

  const toggleReminder = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ============================================================
     MODAL HANDLERS
  ============================================================ */

  const closeModal = () => setActiveModal(null);

  const handleSentToHmrc = (company) => {
    setSelectedCompany(company);
    setActiveModal("sent-status");
  };

  const handlePauseReminders = (months) => {
    const state = {
      companyNumber: selectedCompany.companyNumber,
      remindersPaused: true,
      pauseMonths: months,
    };
    setActionState((prev) => ({
      ...prev,
      [selectedCompany.companyNumber]: state,
    }));
    console.log("Reminders paused:", state);
    setToast(
      `CT600 reminders paused for ${months} month${months > 1 ? "s" : ""}.`,
    );
    closeModal();
  };

  const handleWhoSent = (sentBy) => {
    const state = {
      companyNumber: selectedCompany.companyNumber,
      sentToHmrc: true,
      sentBy,
    };
    setActionState((prev) => ({
      ...prev,
      [selectedCompany.companyNumber]: state,
    }));
    console.log("CT600 sent:", state);
    setToast("Recorded. Thank you.");
    closeModal();
  };

  const handleHmrcRequest = (received) => {
    const state = {
      companyNumber: selectedCompany.companyNumber,
      hmrcNoticeReceived: received,
    };
    setActionState((prev) => ({
      ...prev,
      [selectedCompany.companyNumber]: state,
    }));
    console.log("HMRC notice:", state);
    setToast(
      received ? "Notice recorded. Return still due." : "No notice recorded.",
    );
    closeModal();
  };

  const handleRemovePeriod = () => {
    setCompanies((prev) => prev.filter((c) => c.id !== selectedCompany.id));
    console.log("Removed period for:", selectedCompany.companyNumber);
    setToast("Period removed from dashboard.");
    closeModal();
    setSelectedCompany(null);
  };

  /* ============================================================
     ROW ACTION HANDLER
  ============================================================ */

  const handleRowAction = (action, company) => {
    setOpenRowMenu(null);

    switch (action) {
      case "ct600":
        // Real page navigation
        navigate(
          `/organization/products/corporation-tax/ct600/${company.companyNumber}`,
        );
        break;

      case "sent":
        handleSentToHmrc(company);
        break;

      case "requested":
        setSelectedCompany(company);
        setActiveModal("hmrc-request");
        break;

      case "years":
        setSelectedCompany(company);
        break;

      case "remove":
        setSelectedCompany(company);
        setActiveModal("remove-period");
        break;

      default:
        break;
    }
  };

  const handleFilingAction = (action, period) => {
    setOpenFilingMenu(null);
    console.log("Filing action:", action, period);
  };

  const hasActiveFilters =
    search || statusFilter !== "All statuses" || periodFilter !== "All periods";

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="relative min-h-full bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ====================================================
            PAGE HEADER
        ===================================================== */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F2]">
              <FileText className="h-5 w-5 text-[#087F5B]" strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
                Corporation Tax &amp; Accounts
              </h1>
              <p className="mt-0.5 text-sm text-[#687B78]">
                Manage your corporation tax returns and annual accounts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-3 py-2 text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[#687B78]">Synced 12d ago</span>
            </div>

            <button
              type="button"
              onClick={() => console.log("Refreshing...")}
              className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2 text-xs font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* ====================================================
            STATS CARDS
        ===================================================== */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(16,42,67,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-[#09263A]">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                  >
                    <Icon
                      className={`h-4 w-4 ${stat.iconColor}`}
                      strokeWidth={2.2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ====================================================
            FILTER BAR
        ===================================================== */}
        <div className="mb-5 rounded-xl border border-[#DDEAE6] bg-white p-4 shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company name or number..."
                className="w-full rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] py-2.5 pl-10 pr-4 text-sm text-[#09263A] outline-none transition-all duration-200 placeholder:text-[#687B78] focus:border-[#087F5B] focus:bg-white focus:ring-2 focus:ring-[#087F5B]/10"
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 w-full min-w-[160px] cursor-pointer appearance-none rounded-lg border border-[#DDEAE6] bg-white px-4 pr-10 text-sm font-semibold text-[#09263A] outline-none transition-all duration-200 hover:border-[#087F5B] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10 lg:w-auto"
              >
                <option>All statuses</option>
                <option>Active</option>
                <option>Action Required</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            </div>

            <div className="relative">
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="h-10 w-full min-w-[160px] cursor-pointer appearance-none rounded-lg border border-[#DDEAE6] bg-white px-4 pr-10 text-sm font-semibold text-[#09263A] outline-none transition-all duration-200 hover:border-[#087F5B] focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/10 lg:w-auto"
              >
                <option>All periods</option>
                <option>31 Mar 2026</option>
                <option>30 Jun 2026</option>
                <option>31 Dec 2025</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 text-sm font-semibold text-[#687B78] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
              >
                <X className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => console.log("Add company")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#005E45] hover:-translate-y-0.5 hover:shadow-md lg:ml-auto"
            >
              <Building2 className="h-4 w-4" />
              <span>Add Company</span>
            </button>
          </div>
        </div>

        {/* ====================================================
            COMPANY TABLE
        ===================================================== */}
        <div className="rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#087F5B]" />
              <h2 className="text-sm font-bold text-[#09263A]">Companies</h2>
              <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                {filteredCompanies.length}
              </span>
            </div>
            <p className="text-[11px] text-[#687B78]">
              Select a row to view details
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Company
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Period End
                  </th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Profit
                  </th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Tax
                  </th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Accounts
                  </th>
                  <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    CT600
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Next Due
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDEAE6]">
                {filteredCompanies.map((company) => {
                  const isSelected = selectedCompany?.id === company.id;
                  const isOverdue = company.dueType === "overdue";
                  const isEarly = company.dueType === "early";

                  return (
                    <tr
                      key={company.id}
                      onClick={() => openCompanyDrawer(company)}
                      className={`group cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#E8F8F2]/50"
                          : isEarly
                            ? "bg-amber-50/40"
                            : "bg-white"
                      } hover:bg-[#E8F8F2]/30`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                            <Building2
                              className="h-4 w-4 text-[#087F5B]"
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                              {company.companyName}
                            </p>
                            <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                              #{company.companyNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-xs font-bold text-[#09263A]">
                            {company.periodEnd}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#687B78]">
                            from {company.periodStart}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="text-xs text-[#687B78]">
                          {company.profit}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="text-xs text-[#687B78]">
                          {company.tax}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <StatusCircle completed={company.accountsFiled} />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <StatusCircle completed={company.ct600Filed} />
                      </td>
                      <td className="px-5 py-4">
                        <NextDue
                          type={company.dueType}
                          text={company.nextDue}
                        />
                      </td>
                      <td
                        className="relative px-5 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          ref={openRowMenu === company.id ? rowMenuRef : null}
                          className="relative inline-block"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowMenu(
                                openRowMenu === company.id ? null : company.id,
                              )
                            }
                            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11px] font-bold transition-all duration-200 ${
                              company.dueType === "normal"
                                ? "bg-[#087F5B] text-white shadow-sm hover:bg-[#005E45] hover:-translate-y-0.5"
                                : "border border-[#DDEAE6] bg-white text-[#09263A] hover:border-[#087F5B] hover:text-[#087F5B]"
                            }`}
                          >
                            {isEarly
                              ? "Too early"
                              : isOverdue
                                ? "Start Filing"
                                : "Continue"}
                            <ChevronDown className="h-3 w-3" />
                          </button>

                          {openRowMenu === company.id && (
                            <RowActionMenu
                              company={company}
                              onAction={handleRowAction}
                            />
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
            {filteredCompanies.map((company) => {
              const isEarly = company.dueType === "early";
              const isOverdue = company.dueType === "overdue";

              return (
                <div
                  key={company.id}
                  onClick={() => openCompanyDrawer(company)}
                  className={`cursor-pointer p-4 transition-colors ${
                    isEarly ? "bg-amber-50/40" : "bg-white"
                  } hover:bg-[#E8F8F2]/30`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Building2
                        className="h-5 w-5 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#09263A]">
                            {company.companyName}
                          </p>
                          <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                            #{company.companyNumber}
                          </p>
                        </div>
                        {isOverdue && (
                          <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-bold text-rose-700">
                            Overdue
                          </span>
                        )}
                        {isEarly && (
                          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                            Too early
                          </span>
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2">
                        <div>
                          <p className="text-[10px] text-[#687B78]">Period</p>
                          <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
                            {company.periodEnd}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-[#687B78]">Accounts</p>
                          <div className="mt-1 flex justify-center">
                            <StatusCircle completed={company.accountsFiled} />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#687B78]">CT600</p>
                          <div className="mt-1 flex justify-end">
                            <StatusCircle completed={company.ct600Filed} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <NextDue
                          type={company.dueType}
                          text={company.nextDue}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg bg-[#087F5B] px-3 py-1.5 text-[10px] font-bold text-white transition-all hover:bg-[#005E45]"
                        >
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <Building2 className="h-7 w-7 text-[#087F5B]" strokeWidth={2} />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No companies found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                {hasActiveFilters
                  ? "Try adjusting your search or filters."
                  : "No companies have been added yet."}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2 text-xs font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
                >
                  <X className="h-3 w-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom note */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#E8F8F2]/50 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
          <p className="text-[11px] leading-6 text-[#687B78]">
            This dashboard shows your corporation tax and annual accounts
            periods across all companies. Select a company to view filing
            history and available actions.
          </p>
        </div>
      </div>

      {/* ======================================================
          COMPANY DRAWER
      ======================================================= */}
      {selectedCompany && !showYearsSidebar && (
        <CompanyDrawer
          company={selectedCompany}
          closeDrawer={closeDrawer}
          reminders={reminders}
          toggleReminder={toggleReminder}
          openFilingMenu={openFilingMenu}
          setOpenFilingMenu={setOpenFilingMenu}
          handleFilingAction={handleFilingAction}
          showAllPeriods={showAllPeriods}
          setShowAllPeriods={setShowAllPeriods}
        />
      )}

      {/* ======================================================
          YEARS SIDEBAR (View all years)
      ======================================================= */}
      {showYearsSidebar && selectedCompany && (
        <YearsSidebar
          company={selectedCompany}
          years={years}
          onClose={() => setShowYearsSidebar(false)}
        />
      )}

      {/* ======================================================
          MODALS
      ======================================================= */}

      {activeModal === "sent-status" && selectedCompany && (
        <SentStatusModal
          company={selectedCompany}
          onClose={closeModal}
          onNo={() => setActiveModal("pause-reminders")}
          onYes={() => setActiveModal("who-sent")}
        />
      )}

      {activeModal === "pause-reminders" && selectedCompany && (
        <PauseRemindersModal
          company={selectedCompany}
          onClose={closeModal}
          onPause={handlePauseReminders}
        />
      )}

      {activeModal === "who-sent" && selectedCompany && (
        <WhoSentModal
          company={selectedCompany}
          onClose={closeModal}
          onSelect={handleWhoSent}
        />
      )}

      {activeModal === "hmrc-request" && selectedCompany && (
        <HmrcRequestModal
          company={selectedCompany}
          onClose={closeModal}
          onSelect={handleHmrcRequest}
        />
      )}

      {activeModal === "remove-period" && selectedCompany && (
        <RemovePeriodModal
          company={selectedCompany}
          onClose={closeModal}
          onRemove={handleRemovePeriod}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[600] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 rounded-xl border border-[#DDEAE6] bg-white px-4 py-3 shadow-[0_12px_40px_rgba(9,38,58,0.15)]">
            <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
            <span className="text-xs font-semibold text-[#09263A]">
              {toast}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   STATUS CIRCLE
============================================================ */

const StatusCircle = ({ completed }) => {
  if (completed) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#087F5B] text-white shadow-sm">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 rounded-full border-2 border-dashed border-[#DDEAE6]" />
  );
};

/* ============================================================
   NEXT DUE
============================================================ */

const NextDue = ({ type, text }) => {
  if (type === "overdue") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-bold text-rose-700">
        <AlertCircle className="h-3 w-3" strokeWidth={2.4} />
        {text}
      </span>
    );
  }
  if (type === "early") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700">
        <Clock3 className="h-3 w-3" strokeWidth={2.4} />
        {text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
      <CheckCircle2 className="h-3 w-3" strokeWidth={2.4} />
      {text}
    </span>
  );
};

/* ============================================================
   ROW ACTION MENU
============================================================ */

const RowActionMenu = ({ company, onAction }) => {
  return (
    <div className="absolute right-0 top-[calc(100%+6px)] z-[100] w-[300px] overflow-hidden rounded-xl border border-[#DDEAE6] bg-white text-left shadow-2xl">
      <div className="border-b border-[#DDEAE6] bg-[#F5FCF9] px-4 py-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
          Filing options
        </p>
      </div>

      <MenuItem
        label="CT600 only"
        onClick={() => onAction("ct600", company)}
        icon={FileText}
      />
      <MenuItem
        label="Has this CT600 been sent to HMRC?"
        onClick={() => onAction("sent", company)}
        icon={Upload}
      />
      <MenuItem
        label="Has HMRC asked for a CT600?"
        onClick={() => onAction("requested", company)}
        icon={ShieldCheck}
      />
      <MenuItem
        label="View all years"
        onClick={() => onAction("years", company)}
        icon={CalendarDays}
      />

      <div className="my-1 border-t border-[#DDEAE6]" />

      <MenuItem
        label="Remove this period from dashboard"
        danger
        onClick={() => onAction("remove", company)}
        icon={Archive}
      />
    </div>
  );
};

/* ============================================================
   MENU ITEM
============================================================ */

const MenuItem = ({ label, onClick, danger = false, icon: Icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-medium transition-colors ${
        danger
          ? "text-rose-600 hover:bg-rose-50"
          : "text-[#09263A] hover:bg-[#E8F8F2] hover:text-[#087F5B]"
      }`}
    >
      {Icon && (
        <Icon
          className={`h-3.5 w-3.5 shrink-0 ${danger ? "text-rose-500" : "text-[#687B78]"}`}
          strokeWidth={2.2}
        />
      )}
      <span>{label}</span>
    </button>
  );
};

/* ============================================================
   MODAL OVERLAY (Reusable)
============================================================ */

const ModalOverlay = ({ children, onClose, maxWidth = "max-w-[520px]" }) => {
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#09263A]/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full ${maxWidth} overflow-hidden rounded-2xl border border-[#DDEAE6] bg-white shadow-[0_24px_80px_rgba(9,38,58,0.20)] animate-in fade-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

/* ============================================================
   MODAL HEADER (Reusable)
============================================================ */

const ModalHeader = ({
  title,
  onClose,
  icon: Icon,
  iconBg = "bg-[#E8F8F2]",
  iconColor = "text-[#087F5B]",
}) => {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#DDEAE6] px-5 py-4 sm:px-6">
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2.2} />
          </div>
        )}
        <div className="min-w-0 pt-0.5">
          <h3 className="text-base font-bold text-[#09263A]">{title}</h3>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#F5FCF9] hover:text-[#09263A]"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

/* ============================================================
   MODAL 1: SENT STATUS
============================================================ */

const SentStatusModal = ({ company, onClose, onNo, onYes }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader
        title="Has this Company Tax Return been sent to HMRC?"
        onClose={onClose}
        icon={Send}
      />

      <div className="px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-[#09263A]">
          This is about the{" "}
          <strong className="font-semibold">CT600 itself</strong>, not your
          accounts. Having accounts accepted by Companies House is not the same
          as filing a Corporation Tax return with HMRC.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
          <p className="text-xs leading-5 text-[#687B78]">
            If you are not sure, close this. Nothing changes and we will keep
            reminding you, which is the safe option.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onNo}
          className="inline-flex items-center justify-center rounded-lg border border-[#DDEAE6] bg-white px-5 py-2.5 text-xs font-bold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
        >
          No, not yet
        </button>

        <button
          type="button"
          onClick={onYes}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#005E45]"
        >
          Yes, it has been sent
        </button>
      </div>
    </ModalOverlay>
  );
};

/* ============================================================
   MODAL 2: PAUSE REMINDERS
============================================================ */

const PauseRemindersModal = ({ company, onClose, onPause }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader
        title="Pause CT600 reminders?"
        onClose={onClose}
        icon={PauseCircle}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
      />

      <div className="px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-[#09263A]">
          The return is still due and this does{" "}
          <strong className="font-semibold">not</strong> file anything or mark
          the period complete — it only pauses our reminders while you get to
          it.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
          <p className="text-xs leading-5 text-[#687B78]">
            You can resume reminders at any time from the same menu.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-4 sm:flex-row sm:px-6">
        <button
          type="button"
          onClick={() => onPause(1)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-5 py-2.5 text-xs font-bold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Pause for 1 month
        </button>

        <button
          type="button"
          onClick={() => onPause(3)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#005E45]"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Pause for 3 months
        </button>
      </div>
    </ModalOverlay>
  );
};

/* ============================================================
   MODAL 3: WHO SENT IT
============================================================ */

const WhoSentModal = ({ company, onClose, onSelect }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader
        title="Who sent it?"
        onClose={onClose}
        icon={UserCheck}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />

      <div className="px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-[#09263A]">
          We record this so support can see where the return came from if there
          is ever a query. We cannot verify it, so it is stored as your account
          of what happened.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-3.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
          <p className="text-xs leading-5 text-[#687B78]">
            This will mark the CT600 as sent. You can change this later.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-4 sm:flex-row sm:px-6">
        <button
          type="button"
          onClick={() => onSelect("self")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-5 py-2.5 text-xs font-bold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
        >
          <User className="h-3.5 w-3.5" />I did, another way
        </button>

        <button
          type="button"
          onClick={() => onSelect("accountant")}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#005E45]"
        >
          <Briefcase className="h-3.5 w-3.5" />
          My accountant
        </button>
      </div>
    </ModalOverlay>
  );
};

/* ============================================================
   MODAL 4: HMRC REQUEST
============================================================ */

const HmrcRequestModal = ({ company, onClose, onSelect }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader
        title="Has HMRC asked you for a Company Tax Return?"
        onClose={onClose}
        icon={ShieldCheck}
        iconBg="bg-purple-100"
        iconColor="text-purple-600"
      />

      <div className="px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-[#09263A]">
          HMRC sends a{" "}
          <strong className="font-semibold">
            "notice to deliver a Company Tax Return"
          </strong>{" "}
          (form CT603) when it expects a CT600 for an accounting period. If you
          have had one for this period, a return is due even if the company was
          dormant.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
          <p className="text-xs leading-5 text-[#687B78]">
            If you are not sure, close this. We will keep treating the return as
            due and keep reminding you, which is the safe option — this answer
            does not file anything or mark the period complete.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-4 sm:flex-row sm:px-6">
        <button
          type="button"
          onClick={() => onSelect(false)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-5 py-2.5 text-xs font-bold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
        >
          No notice has arrived
        </button>

        <button
          type="button"
          onClick={() => onSelect(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#005E45]"
        >
          Yes, I have a notice
        </button>
      </div>
    </ModalOverlay>
  );
};

/* ============================================================
   MODAL 5: REMOVE PERIOD
============================================================ */

const RemovePeriodModal = ({ company, onClose, onRemove }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader
        title="Remove this period?"
        onClose={onClose}
        icon={AlertTriangle}
        iconBg="bg-rose-100"
        iconColor="text-rose-600"
      />

      <div className="px-5 py-5 sm:px-6">
        <p className="text-sm leading-6 text-[#09263A]">
          This will remove this accounting period from your dashboard. It will{" "}
          <strong className="font-semibold">not</strong> delete the company's
          records or file anything with HMRC.
        </p>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <p className="text-xs leading-5 text-rose-700">
            You can re-add the period later from the company settings.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-lg border border-[#DDEAE6] bg-white px-5 py-2.5 text-xs font-bold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-rose-600"
        >
          <Archive className="h-3.5 w-3.5" />
          Remove period
        </button>
      </div>
    </ModalOverlay>
  );
};

/* ============================================================
   YEARS SIDEBAR (View all years)
============================================================ */
// No need for a modal years sidebar

/* ============================================================
   COMPANY DRAWER (existing, simplified)
============================================================ */

/* ============================================================
   COMPANY DRAWER (Polished)
============================================================ */

const CompanyDrawer = ({
  company,
  closeDrawer,
  reminders,
  toggleReminder,
  openFilingMenu,
  setOpenFilingMenu,
  handleFilingAction,
  showAllPeriods,
  setShowAllPeriods,
}) => {
  const visiblePeriods = showAllPeriods
    ? company.periods
    : company.periods.slice(0, 3);

  return (
    <>
      {/* ============================================================
          BACKDROP
      ============================================================ */}
      <div
        className="
          fixed
          inset-0
          z-[200]
          bg-[#09263A]/40
          backdrop-blur-[3px]
          transition-opacity
          duration-300
        "
        onClick={closeDrawer}
      />

      {/* ============================================================
          DRAWER PANEL
      ============================================================ */}
      <aside
        className="
          fixed
          right-0
          top-0
          z-[210]
          flex
          h-screen
          w-full
          max-w-[600px]
          flex-col
          border-l
          border-[#DDEAE6]
          bg-white
          shadow-[-20px_0_60px_rgba(9,38,58,0.15)]
          animate-in
          slide-in-from-right
          duration-300
        "
      >
        {/* ============================================================
            HEADER
        ============================================================ */}
        <div
          className="
            relative
            shrink-0
            border-b
            border-[#DDEAE6]
            bg-gradient-to-br
            from-[#E8F8F2]
            via-[#F5FCF9]
            to-white
            px-5
            py-5
            sm:px-6
          "
        >
          {/* Decorative dot */}
          <div
            className="
              pointer-events-none
              absolute
              -right-8
              -top-8
              h-32
              w-32
              rounded-full
              bg-[#087F5B]
              opacity-[0.06]
              blur-3xl
            "
          />

          <div className="relative flex items-start justify-between gap-4">
            {/* Left: Company info */}
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#087F5B]
                  shadow-sm
                "
              >
                <Building2 className="h-6 w-6 text-white" strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-bold tracking-tight text-[#09263A] sm:text-lg">
                  {company.companyName}
                </h2>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#687B78]">
                  <span className="flex items-center gap-1 font-mono font-semibold">
                    <Hash className="h-3 w-3" />
                    {company.companyNumber}
                  </span>

                  <span className="flex items-center gap-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                      <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} />
                      {company.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Close */}
            <button
              type="button"
              onClick={closeDrawer}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-[#687B78]
                transition-all
                duration-200
                hover:bg-white
                hover:text-[#09263A]
                hover:shadow-sm
              "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ============================================================
            SCROLLABLE CONTENT
        ============================================================ */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          {/* ============================================================
              FILING HISTORY
          ============================================================ */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                <FileText
                  className="h-4 w-4 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#09263A]">
                  Filing History
                </h3>
                <p className="text-[10px] text-[#687B78]">
                  {company.periods.length} periods
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAllPeriods(!showAllPeriods)}
              className="
                shrink-0
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-3
                py-1.5
                text-[10px]
                font-bold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:bg-[#E8F8F2]
                hover:text-[#087F5B]
              "
            >
              {showAllPeriods
                ? "Show fewer"
                : `Show all ${company.periods.length}`}
            </button>
          </div>

          {/* Filing Table Wrapper — using relative for dropdown positioning */}
          <div className="relative rounded-xl border border-[#DDEAE6] bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Period
                  </th>
                  <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Profit
                  </th>
                  <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Tax
                  </th>
                  <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Acc.
                  </th>
                  <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    CT600
                  </th>
                  <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#DDEAE6]">
                {visiblePeriods.map((period, index) => {
                  const isMenuOpen = openFilingMenu === period.id;

                  return (
                    <tr
                      key={period.id}
                      className={`
                        relative
                        transition-colors
                        ${isMenuOpen ? "z-30" : "z-0"}
                        ${index === 0 ? "bg-[#E8F8F2]/40" : "bg-white"}
                        hover:bg-[#F5FCF9]
                      `}
                    >
                      {/* Period */}
                      <td className="px-3 py-3.5">
                        <div>
                          <p className="text-xs font-bold text-[#09263A]">
                            {period.periodEnd}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#687B78]">
                            from {period.periodStart}
                          </p>
                        </div>
                      </td>

                      {/* Profit */}
                      <td className="px-3 py-3.5 text-center text-xs text-[#687B78]">
                        {period.profit}
                      </td>

                      {/* Tax */}
                      <td className="px-3 py-3.5 text-center text-xs text-[#687B78]">
                        {period.tax}
                      </td>

                      {/* Accounts */}
                      <td className="px-3 py-3.5 text-center">
                        <StatusCircle completed={period.accountsFiled} />
                      </td>

                      {/* CT600 */}
                      <td className="px-3 py-3.5 text-center">
                        <StatusCircle completed={period.ct600Filed} />
                      </td>

                      {/* Actions */}
                      <td className="relative px-3 py-3.5 text-right">
                        <div className="relative inline-flex">
                          {/* Start Filing button */}
                          <button
                            type="button"
                            onClick={() =>
                              setOpenFilingMenu(isMenuOpen ? null : period.id)
                            }
                            className={`
                              inline-flex
                              items-center
                              gap-1
                              rounded-lg
                              px-3
                              py-2
                              text-[10px]
                              font-bold
                              transition-all
                              duration-200
                              ${
                                isMenuOpen
                                  ? "bg-[#005E45] text-white shadow-md"
                                  : "bg-[#087F5B] text-white hover:bg-[#005E45] hover:shadow-sm"
                              }
                            `}
                          >
                            Start
                            <ChevronDown
                              className={`
                                h-3
                                w-3
                                transition-transform
                                duration-200
                                ${isMenuOpen ? "rotate-180" : ""}
                              `}
                            />
                          </button>

                          {/* Filign action menu — floats to the LEFT of button, never clips */}
                          {isMenuOpen && (
                            <FilingActionMenu
                              period={period}
                              onAction={handleFilingAction}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ============================================================
              ACCOUNTS OUTSIDE BANNER
          ============================================================ */}
          {company.accountsOutside && (
            <div
              className="
                mt-5
                overflow-hidden
                rounded-xl
                border
                border-[#C9EDE1]
                bg-[#E8F8F2]
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
                    bg-[#087F5B]
                  "
                >
                  <ShieldCheck
                    className="h-4 w-4 text-white"
                    strokeWidth={2.2}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold text-[#09263A]">
                      Accounts filed outside TaxPilot
                    </p>
                    <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      Verified
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => console.log("Open Companies House")}
                    className="
                      mt-2
                      inline-flex
                      items-center
                      gap-1
                      text-[11px]
                      font-semibold
                      text-[#087F5B]
                      transition-colors
                      hover:text-[#005E45]
                      hover:underline
                    "
                  >
                    View on Companies House
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              DIVIDER
          ============================================================ */}
          <div className="my-6 border-t border-[#DDEAE6]" />

          {/* ============================================================
              EMAIL REMINDERS
          ============================================================ */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                <ShieldCheck
                  className="h-4 w-4 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <h3 className="text-sm font-bold text-[#09263A]">
                Email Reminders
              </h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
              <ReminderToggle
                checked={reminders.ct600}
                onChange={() => toggleReminder("ct600")}
                label="CT600 reminder emails"
              />
              <ReminderToggle
                checked={reminders.accounts}
                onChange={() => toggleReminder("accounts")}
                label="Accounts reminder emails"
              />
              <ReminderToggle
                checked={reminders.confirmation}
                onChange={() => toggleReminder("confirmation")}
                label="Confirmation statement reminder emails"
                last
              />
            </div>
          </section>

          {/* ============================================================
              DIVIDER
          ============================================================ */}
          <div className="my-6 border-t border-[#DDEAE6]" />

          {/* ============================================================
              QUICK ACTIONS
          ============================================================ */}
          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                <TrendingUp
                  className="h-4 w-4 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <h3 className="text-sm font-bold text-[#09263A]">
                Quick Actions
              </h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
              <QuickAction
                icon={FileText}
                title="CT600 only"
                description="File a CT600 return without accounts"
                onClick={() => console.log("CT600 only")}
              />
              <QuickAction
                icon={Upload}
                title="CT600 Filed Elsewhere"
                description="Mark as filed if you submitted directly to HMRC"
                onClick={() => console.log("CT600 Filed Elsewhere")}
              />
              <QuickAction
                icon={CalendarDays}
                title="CT600 with custom dates"
                description="Set custom accounting period dates"
                onClick={() => console.log("Custom dates")}
              />
              <QuickAction
                icon={Pencil}
                title="Amend Accounts"
                description="Make changes to existing accounts"
                onClick={() => console.log("Amend accounts")}
                last
              />
            </div>
          </section>
        </div>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <div
          className="
            flex
            shrink-0
            flex-wrap
            items-center
            gap-2
            border-t
            border-[#DDEAE6]
            bg-[#F5FCF9]
            px-5
            py-4
            sm:px-6
          "
        >
          <button
            type="button"
            onClick={() => console.log("Refresh from Companies House")}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-[#DDEAE6]
              bg-white
              px-3.5
              py-2
              text-xs
              font-semibold
              text-[#09263A]
              transition-all
              duration-200
              hover:border-[#087F5B]
              hover:bg-white
              hover:text-[#087F5B]
            "
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => console.log("Archive company")}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-rose-200
              bg-white
              px-3.5
              py-2
              text-xs
              font-semibold
              text-rose-600
              transition-all
              duration-200
              hover:bg-rose-500
              hover:text-white
            "
          >
            <Archive className="h-3.5 w-3.5" />
            <span>Archive</span>
          </button>
        </div>
      </aside>
    </>
  );
};

/* ============================================================
   FILING ACTION MENU
============================================================ */

/* ============================================================
   FILING ACTION MENU
   — Floats to the LEFT of the Start button
============================================================ */

const FilingActionMenu = ({ period, onAction }) => {
  return (
    <div
      className="
        absolute
        right-[calc(100%+8px)]
        top-1/2
        z-[300]
        w-[240px]
        -translate-y-1/2
        overflow-hidden
        rounded-xl
        border
        border-[#DDEAE6]
        bg-white
        text-left
        shadow-[0_16px_48px_rgba(9,38,58,0.18)]
        animate-in
        fade-in
        slide-in-from-right-2
        duration-150
      "
    >
      {/* Small arrow pointer on the right edge */}
      <div
        className="
          absolute
          -right-[6px]
          top-1/2
          h-3
          w-3
          -translate-y-1/2
          rotate-45
          border-r
          border-t
          border-[#DDEAE6]
          bg-white
        "
      />

      {/* Header */}
      <div className="relative border-b border-[#DDEAE6] bg-[#F5FCF9] px-3 py-2">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#687B78]">
          Filing options
        </p>
      </div>

      {/* Items */}
      <MenuItem
        label="CT600 only"
        onClick={() => onAction("CT600 only", period)}
        icon={FileText}
      />
      <MenuItem
        label="CT600 Filed Elsewhere"
        onClick={() => onAction("CT600 Filed Elsewhere", period)}
        icon={Upload}
      />
      <MenuItem
        label="CT600 with custom dates"
        onClick={() => onAction("CT600 with custom dates", period)}
        icon={CalendarDays}
      />
      <MenuItem
        label="Amend Accounts"
        onClick={() => onAction("Amend Accounts", period)}
        icon={Pencil}
      />
    </div>
  );
};

/* ============================================================
   REMINDER TOGGLE
============================================================ */

const ReminderToggle = ({ checked, onChange, label, last = false }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#F5FCF9] ${
        !last ? "border-b border-[#DDEAE6]" : ""
      }`}
    >
      <span className="text-xs font-semibold text-[#09263A]">{label}</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-[#087F5B]" : "bg-[#DDEAE6]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
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
      className={`group flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#E8F8F2] ${
        !last ? "border-b border-[#DDEAE6]" : ""
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2] text-[#087F5B] transition-colors group-hover:bg-[#087F5B] group-hover:text-white">
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold text-[#09263A]">{title}</span>
        <span className="mt-0.5 block text-[10px] leading-4 text-[#687B78]">
          {description}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#687B78] transition-all group-hover:translate-x-0.5 group-hover:text-[#087F5B]" />
    </button>
  );
};

export default OrganizationCorporationTax;
