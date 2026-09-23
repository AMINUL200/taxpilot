import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  X,
  CheckCircle2,
  Building2,
  CalendarDays,
  Clock3,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";

/* ============================================================
   STATUS BADGE
============================================================ */

const StatusBadge = ({ status }) => {
  const isDue = status.toLowerCase().includes("due");
  const isOverdue = status.toLowerCase().includes("overdue");
  const isFiled = status.toLowerCase().includes("filed");

  let bg = "bg-[#F1F4F3]";
  let text = "text-[#687B78]";

  if (isOverdue) {
    bg = "bg-rose-100";
    text = "text-rose-700";
  } else if (isDue) {
    bg = "bg-amber-100";
    text = "text-amber-700";
  } else if (isFiled) {
    bg = "bg-emerald-100";
    text = "text-emerald-700";
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-bold
        ${bg}
        ${text}
      `}
    >
      {status}
    </span>
  );
};

/* ============================================================
   COMPANY ROW (Desktop)
============================================================ */

const CompanyRow = ({ company, onClick }) => {
  return (
    <tr
      onClick={() => onClick(company)}
      className="
        group
        cursor-pointer
        border-b
        border-[#DDEAE6]
        transition-colors
        last:border-b-0
        hover:bg-[#F5FCF9]
      "
    >
      {/* Company */}
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
            <p className="mt-0.5 font-mono text-[11px] text-[#687B78]">
              {company.companyNumber}
            </p>
          </div>
        </div>
      </td>

      {/* Statement Date */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <CalendarDays
            className="h-3.5 w-3.5 text-[#687B78]"
            strokeWidth={2.2}
          />
          <span className="text-xs font-semibold text-[#09263A]">
            {company.statementDate}
          </span>
        </div>
      </td>

      {/* Filing Deadline */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Clock3
            className="h-3.5 w-3.5 text-[#687B78]"
            strokeWidth={2.2}
          />
          <span className="text-xs font-semibold text-[#09263A]">
            {company.filingDeadline}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={company.status} />
      </td>

      {/* Filing Opens */}
      <td className="px-5 py-4 text-right">
        <div className="inline-flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
            Filing opens
          </span>
          <span className="mt-0.5 text-xs font-semibold text-[#09263A]">
            {company.filingOpens}
          </span>
        </div>
      </td>
    </tr>
  );
};

/* ============================================================
   COMPANY CARD (Mobile)
============================================================ */

const CompanyCard = ({ company, onClick }) => {
  return (
    <div
      onClick={() => onClick(company)}
      className="
        cursor-pointer
        border-b
        border-[#DDEAE6]
        bg-white
        p-4
        transition-colors
        last:border-b-0
        hover:bg-[#F5FCF9]
      "
    >
      {/* Header */}
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
              <p className="mt-0.5 font-mono text-[11px] text-[#687B78]">
                {company.companyNumber}
              </p>
            </div>
            <StatusBadge status={company.status} />
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[#F5FCF9] px-3 py-2.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
            Statement
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
            {company.statementDate}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
            Deadline
          </p>
          <p className="mt-0.5 text-[11px] font-bold text-[#09263A]">
            {company.filingDeadline}
          </p>
        </div>
      </div>

      {/* Filing opens */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
          Filing opens
        </span>
        <span className="text-[11px] font-bold text-[#09263A]">
          {company.filingOpens}
        </span>
      </div>
    </div>
  );
};

/* ============================================================
   TOAST
============================================================ */

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="
        fixed
        bottom-6
        left-1/2
        z-[600]
        -translate-x-1/2
        animate-in
        fade-in
        slide-in-from-bottom-2
        duration-300
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#DDEAE6]
          bg-white
          px-4
          py-3
          shadow-[0_12px_40px_rgba(9,38,58,0.15)]
        "
      >
        <CheckCircle2 className="h-4 w-4 text-[#087F5B]" strokeWidth={2.4} />
        <span className="text-xs font-semibold text-[#09263A]">
          {message}
        </span>
      </div>
    </div>
  );
};

/* ============================================================
   ADD COMPANY MODAL
============================================================ */

const AddCompanyModal = ({
  isOpen,
  onClose,
  availableCompanies,
  existingCompanies,
  onAdd,
}) => {
  const [modalSearch, setModalSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState("");
  const searchInputRef = useRef(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setModalSearch("");
      setSelectedCompany(null);
      setError("");
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Filter available companies
  const filteredResults = useMemo(() => {
    if (!modalSearch.trim()) return availableCompanies;

    const query = modalSearch.toLowerCase();
    return availableCompanies.filter(
      (c) =>
        c.companyName.toLowerCase().includes(query) ||
        c.companyNumber.includes(query)
    );
  }, [modalSearch, availableCompanies]);

  // Handle select
  const handleSelect = (company) => {
    setSelectedCompany(company);
    setError("");
  };

  // Handle add
  const handleAdd = () => {
    if (!selectedCompany) return;

    // Duplicate check
    const alreadyExists = existingCompanies.some(
      (c) => c.companyNumber === selectedCompany.companyNumber
    );

    if (alreadyExists) {
      setError("This company has already been added.");
      return;
    }

    onAdd(selectedCompany);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#09263A]/40 backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          flex
          max-h-[90vh]
          w-full
          max-w-[520px]
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-[#DDEAE6]
          bg-white
          shadow-[0_24px_80px_rgba(9,38,58,0.20)]
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ====================================================
            HEADER
        ==================================================== */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#DDEAE6] px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F8F2]">
              <Building2
                className="h-5 w-5 text-[#087F5B]"
                strokeWidth={2.2}
              />
            </div>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-base font-bold text-[#09263A]">
                Add a company
              </h3>
              <p className="mt-0.5 text-xs text-[#687B78]">
                Add a company to manage its Confirmation Statement.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-[#687B78]
              transition-colors
              hover:bg-[#F5FCF9]
              hover:text-[#09263A]
            "
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ====================================================
            BODY
        ==================================================== */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {/* Search input */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
              Company name or registration number
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
              <input
                ref={searchInputRef}
                type="text"
                value={modalSearch}
                onChange={(e) => {
                  setModalSearch(e.target.value);
                  setError("");
                }}
                placeholder="Search Companies House..."
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
          </div>

          {/* Selected company card */}
          {selectedCompany && (
            <div className="mt-4">
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border-2
                  border-[#087F5B]
                  bg-[#E8F8F2]
                  p-3.5
                "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#087F5B]">
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                    Company selected
                  </p>
                  <p className="mt-0.5 truncate text-sm font-bold text-[#09263A]">
                    {selectedCompany.companyName}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#687B78]">
                    {selectedCompany.companyNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCompany(null)}
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-[#687B78]
                    transition-colors
                    hover:bg-white
                    hover:text-[#09263A]
                  "
                  aria-label="Remove selection"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Search results */}
          {!selectedCompany && (
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                {modalSearch.trim()
                  ? `${filteredResults.length} ${
                      filteredResults.length === 1 ? "result" : "results"
                    }`
                  : "Suggested companies"}
              </p>

              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((company) => (
                    <div
                      key={company.companyNumber}
                      className="
                        rounded-xl
                        border
                        border-[#DDEAE6]
                        bg-white
                        p-3.5
                        transition-colors
                        hover:border-[#087F5B]/40
                      "
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[#09263A]">
                            {company.companyName}
                          </p>
                          <p className="mt-0.5 font-mono text-[11px] text-[#687B78]">
                            Company number: {company.companyNumber}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelect(company)}
                        className="
                          mt-3
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          border
                          border-[#087F5B]
                          bg-white
                          px-3
                          py-1.5
                          text-[11px]
                          font-bold
                          text-[#087F5B]
                          transition-all
                          duration-200
                          hover:bg-[#087F5B]
                          hover:text-white
                        "
                      >
                        <Plus className="h-3 w-3" />
                        Select company
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#DDEAE6] bg-[#F5FCF9] px-5 py-8 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F2]">
                    <Search className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#09263A]">
                    No matching companies found.
                  </p>
                  <p className="mt-1 text-[11px] text-[#687B78]">
                    Try a different company name or number.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-rose-500"
                strokeWidth={2.2}
              />
              <p className="text-xs font-semibold text-rose-700">{error}</p>
            </div>
          )}
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}
        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              border
              border-[#DDEAE6]
              bg-white
              px-5
              py-2.5
              text-xs
              font-bold
              text-[#09263A]
              transition-all
              duration-200
              hover:border-[#087F5B]
              hover:text-[#087F5B]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedCompany}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
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
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:bg-[#087F5B]
            "
          >
            <Plus className="h-3.5 w-3.5" />
            Add Company
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN PAGE COMPONENT
============================================================ */

const OrganizationConfirmationStatements = () => {
  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Demo companies (initially in the table)
  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: "IMPERIAL THERMAL LTD",
      companyNumber: "14803890",
      statementDate: "07/06/2027",
      filingDeadline: "21/06/2027",
      status: "Due in 270 days",
      filingOpens: "07/06/2027",
    },
    {
      id: 2,
      companyName: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
      statementDate: "20/07/2027",
      filingDeadline: "03/08/2027",
      status: "Due in 313 days",
      filingOpens: "20/07/2027",
    },
  ]);

  // Available Companies House companies (simulated)
  const availableCompanies = [
    {
      companyName: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
    },
    {
      companyName: "IMPERIAL THERMAL LTD",
      companyNumber: "14803890",
    },
    {
      companyName: "GREEN TECH LTD",
      companyNumber: "07895432",
    },
    {
      companyName: "BRIGHT IDEAS LTD",
      companyNumber: "11223344",
    },
    {
      companyName: "DIGITAL SOLUTIONS LTD",
      companyNumber: "99887766",
    },
    {
      companyName: "OCEAN VIEW LTD",
      companyNumber: "66778899",
    },
  ];

  /* ============================================================
     TOAST AUTO-HIDE
  ============================================================ */

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  /* ============================================================
     FILTERED COMPANIES
  ============================================================ */

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return companies;

    return companies.filter((company) =>
      `${company.companyName} ${company.companyNumber}`
        .toLowerCase()
        .includes(query)
    );
  }, [search, companies]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleCompanyClick = (company) => {
    console.log("Open company:", company);
    // Later:
    // navigate(`/organization/products/confirmation-statements/${company.companyNumber}`);
  };

  const handleAddCompany = (selected) => {
    // Build a new company object with demo dates
    const newCompany = {
      id: Date.now(),
      companyName: selected.companyName,
      companyNumber: selected.companyNumber,
      statementDate: "—",
      filingDeadline: "—",
      status: "Due in — days",
      filingOpens: "—",
    };

    setCompanies((prev) => [...prev, newCompany]);
    setIsModalOpen(false);
    setToast("Company added successfully.");
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ======================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Title */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F2]">
                <CheckCircle2
                  className="h-5 w-5 text-[#087F5B]"
                  strokeWidth={2.2}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
                  Confirmation Statements
                </h1>
                <p className="mt-0.5 text-sm text-[#687B78]">
                  Manage your Companies House confirmation statements
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sync + Refresh */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-3 py-2 text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[#687B78]">Synced 14d ago</span>
            </div>

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
                py-2
                text-xs
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
                className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* ======================================================
            TOOLBAR
        ====================================================== */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies..."
              className="
                w-full
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
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
                focus:ring-2
                focus:ring-[#087F5B]/10
              "
            />
          </div>

          {/* Add Company */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#087F5B]
              px-5
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
              lg:shrink-0
            "
          >
            <Plus className="h-4 w-4" />
            <span>Add Company</span>
          </button>
        </div>

        {/* ======================================================
            COMPANY TABLE
        ====================================================== */}
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          {/* Table header info */}
          <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#087F5B]" />
              <h2 className="text-sm font-bold text-[#09263A]">
                All Companies
              </h2>
              <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                {filteredCompanies.length}
              </span>
            </div>
            <p className="text-[11px] text-[#687B78]">
              Click a row to view details
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Company
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Statement Date
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Filing Deadline
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Action / Information
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCompanies.map((company) => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    onClick={handleCompanyClick}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={handleCompanyClick}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <Building2
                  className="h-7 w-7 text-[#087F5B]"
                  strokeWidth={2}
                />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No companies found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                Try searching using a company name or company number.
              </p>
            </div>
          )}
        </div>

        {/* Bottom note */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#E8F8F2]/50 p-4">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]"
            strokeWidth={2.2}
          />
          <p className="text-[11px] leading-6 text-[#687B78]">
            Confirmation statements must be filed with Companies House at least
            once every 12 months. Even if nothing has changed, you still need to
            file — it takes just a few minutes.
          </p>
        </div>
      </div>

      {/* ======================================================
          ADD COMPANY MODAL
      ====================================================== */}
      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableCompanies={availableCompanies}
        existingCompanies={companies}
        onAdd={handleAddCompany}
      />

      {/* ======================================================
          TOAST
      ====================================================== */}
      <Toast message={toast} />
    </div>
  );
};

export default OrganizationConfirmationStatements;