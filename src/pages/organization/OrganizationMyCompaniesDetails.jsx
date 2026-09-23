import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Info,
  Search,
  ShieldCheck,
  User,
  Users,
  Building2,
  CalendarDays,
  MapPin,
  MoreHorizontal,
  X,
  Briefcase,
  TrendingUp,
  Clock,
  AlertCircle,
  FileCheck2,
  Eye,
  ArrowRight,
  Hash,
  Globe,
  Landmark,
  UserCheck,
  Award,
} from "lucide-react";

const OrganizationMyCompaniesDetails = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();

  // =========================================================
  // COMPANY DATA
  // =========================================================

  const company = {
    id: companyId || "1",
    name: "SKIL FOUR LIMITED",
    companyNumber: "05513948",
    status: "Active",
    registeredOffice:
      "Suite 602, 6th Floor, 252 - 262 Romford Road, London, England, E7 9HZ",
    companyType: "Private limited Company",
    incorporatedOn: "7 September 2022",
    accounts: {
      nextMadeUpTo: "30 September 2026",
      nextDueBy: "30 June 2027",
      lastMadeUpTo: "30 September 2025",
    },
    confirmationStatement: {
      nextStatementDate: "6 September 2027",
      nextDueBy: "20 September 2027",
      lastStatementDate: "6 September 2026",
    },
    sicCodes: [
      "62012 - Business and domestic software development",
      "74909 - Other professional, scientific and technical activities not elsewhere classified",
      "78300 - Human resources provision and management of human resources functions",
    ],
  };

  // =========================================================
  // TABS
  // =========================================================

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "filing-history", label: "Filing history", icon: FileText },
    { id: "people", label: "People", icon: Users },
    { id: "more", label: "More", icon: MoreHorizontal },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  // =========================================================
  // FILING HISTORY
  // =========================================================

  const filingHistory = [
    {
      id: 1,
      date: "11 Sep 2026",
      category: "Confirmation statements",
      type: "Confirmation statement",
      description: "made on 6 September 2026 with no updates",
      documents: [{ label: "View PDF (3 pages)", type: "pdf" }],
    },
    {
      id: 2,
      date: "27 Jun 2026",
      category: "Accounts",
      type: "Micro company accounts",
      description: "made up to 30 September 2025",
      documents: [
        { label: "View PDF (3 pages)", type: "pdf" },
        { label: "Download iXBRL", type: "ixbrl" },
      ],
    },
    {
      id: 3,
      date: "24 Nov 2025",
      category: "Registered office",
      type: "Registered office address changed",
      description:
        "from G21, Unit 3 Triangle Centre 399 Uxbridge Road Southall UB1 3EJ England to Suite 602, 6th Floor, 252 - 262 Romford Road London E7 9HZ on 24 November 2025",
      documents: [{ label: "View PDF (1 page)", type: "pdf" }],
    },
    {
      id: 4,
      date: "22 Sep 2025",
      category: "Confirmation statements",
      type: "Confirmation statement",
      description: "made on 6 September 2025 with no updates",
      documents: [{ label: "View PDF (3 pages)", type: "pdf" }],
    },
    {
      id: 5,
      date: "31 May 2025",
      category: "Accounts",
      type: "Micro company accounts",
      description: "made up to 30 September 2024",
      documents: [
        { label: "View PDF (3 pages)", type: "pdf" },
        { label: "Download iXBRL", type: "ixbrl" },
      ],
    },
    {
      id: 6,
      date: "31 Jan 2025",
      category: "Officers",
      type: "Change of details",
      description:
        "for Mr Abdul Al Salim as a person with significant control on 21 January 2025",
      documents: [{ label: "View PDF (2 pages)", type: "pdf" }],
    },
    {
      id: 7,
      date: "30 Jan 2025",
      category: "Officers",
      type: "Director's details changed",
      description: "for Mr Abdul Al Salim on 21 January 2025",
      documents: [{ label: "View PDF (2 pages)", type: "pdf" }],
    },
    {
      id: 8,
      date: "19 Sep 2024",
      category: "Confirmation statements",
      type: "Confirmation statement",
      description: "made on 6 September 2024 with updates",
      documents: [{ label: "View PDF (3 pages)", type: "pdf" }],
    },
    {
      id: 9,
      date: "19 Jun 2024",
      category: "Registered office",
      type: "Registered office address changed",
      description:
        "from 167-169 Great Portland Street 5th Floor London W1W 5PF England to G21, Unit 3 Triangle Centre 399 Uxbridge Road Southall UB1 3EJ",
      documents: [{ label: "View PDF (1 page)", type: "pdf" }],
    },
    {
      id: 10,
      date: "19 May 2024",
      category: "Accounts",
      type: "Micro company accounts",
      description: "made up to 30 September 2023",
      documents: [
        { label: "View PDF (3 pages)", type: "pdf" },
        { label: "Download iXBRL", type: "ixbrl" },
      ],
    },
  ];

  // =========================================================
  // PEOPLE
  // =========================================================

  const officers = [
    {
      id: 1,
      name: "SALIM, Abdul Al",
      role: "Director",
      status: "ACTIVE",
      correspondenceAddress:
        "Flat 29 Salisbury House, Hobday Street, London, England, E14 6AY",
      dateOfBirth: "May 1987",
      appointedOn: "7 September 2022",
      nationality: "British",
      countryOfResidence: "England",
      verificationStatus: "Verification requirements complete",
    },
  ];

  const peopleWithSignificantControl = [
    {
      id: 1,
      name: "Abdul Al Salim",
      status: "ACTIVE",
      control: "Ownership of shares - More than 25% but not more than 50%",
    },
  ];

  // =========================================================
  // FILING FILTER STATE
  // =========================================================

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilingType, setShowFilingType] = useState(false);

  const filingCategories = [
    "Accounts",
    "Capital",
    "Charges",
    "Confirmation statements / Annual returns",
    "Incorporation",
    "Officers",
  ];

  // =========================================================
  // FILTER FILING HISTORY
  // =========================================================

  const filteredFilings = useMemo(() => {
    if (selectedCategories.length === 0) {
      return filingHistory;
    }
    return filingHistory.filter((item) => selectedCategories.includes(item.category));
  }, [selectedCategories]);

  // =========================================================
  // CATEGORY TOGGLE
  // =========================================================

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }
      return [...prev, category];
    });
  };

  // =========================================================
  // TAB CHANGE
  // =========================================================

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {
    navigate("/organization/companies");
  };

  // =========================================================
  // DOCUMENT ACTION
  // =========================================================

  const handleDocumentAction = (document, filing) => {
    if (document.type === "ixbrl") {
      console.log("Download iXBRL for filing:", filing);
      return;
    }
    console.log("Open PDF for filing:", filing);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-background-soft">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-border-light bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8">

          {/* Back */}
          <button
            type="button"
            onClick={handleBack}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-text-muted
              transition-colors
              hover:text-primary
            "
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to My Companies</span>
          </button>

          {/* Company header */}
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

            {/* Left: Company info */}
            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light">
                <Building2 className="h-7 w-7 text-primary" strokeWidth={2} />
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                    {company.name}
                  </h1>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {company.status}
                  </span>

                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">

                  <span className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5" />
                    <span className="font-mono font-semibold">
                      {company.companyNumber}
                    </span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    {company.companyType}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Incorporated {company.incorporatedOn}
                  </span>

                </div>

              </div>

            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-border
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-text
                  transition-all
                  duration-200
                  hover:border-primary
                  hover:text-primary
                "
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </button>

              <Link
                to="/dashboard/filings/new"
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
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-primary-hover
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Start filing</span>
              </Link>

            </div>

          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

            <div className="rounded-lg border border-border-light bg-background-soft p-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Next Accounts
                </p>
              </div>
              <p className="mt-1.5 text-xs font-bold text-heading">
                {company.accounts.nextDueBy}
              </p>
            </div>

            <div className="rounded-lg border border-border-light bg-background-soft p-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Next Confirmation
                </p>
              </div>
              <p className="mt-1.5 text-xs font-bold text-heading">
                {company.confirmationStatement.nextDueBy}
              </p>
            </div>

            <div className="rounded-lg border border-border-light bg-background-soft p-3">
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Officers
                </p>
              </div>
              <p className="mt-1.5 text-xs font-bold text-heading">
                {officers.length}
              </p>
            </div>

            <div className="rounded-lg border border-border-light bg-background-soft p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Filings
                </p>
              </div>
              <p className="mt-1.5 text-xs font-bold text-heading">
                {filingHistory.length}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          TABS
      ====================================================== */}

      <div className="border-b border-border-light bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="flex gap-1 overflow-x-auto">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
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
                    ${isActive ? "text-primary" : "text-text-muted hover:text-primary"}
                  `}
                >

                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                  <span>{tab.label}</span>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-primary" />
                  )}

                </button>
              );
            })}

          </div>

        </div>
      </div>

      {/* =====================================================
          TAB CONTENT
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {activeTab === "overview" && <OverviewTab company={company} />}

        {activeTab === "filing-history" && (
          <FilingHistoryTab
            filingHistory={filteredFilings}
            filingCategories={filingCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            showFilingType={showFilingType}
            setShowFilingType={setShowFilingType}
            handleDocumentAction={handleDocumentAction}
          />
        )}

        {activeTab === "people" && (
          <PeopleTab
            officers={officers}
            peopleWithSignificantControl={peopleWithSignificantControl}
          />
        )}

        {activeTab === "more" && <MoreTab />}

      </div>

    </div>
  );
};

/* ============================================================
   OVERVIEW TAB
============================================================ */

const OverviewTab = ({ company }) => {
  return (
    <div className="space-y-6">

      {/* =====================================================
          COMPANY INFORMATION
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
          <Building2 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold text-heading">
            Company Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:p-6">

          {/* Registered office */}
          <div className="sm:col-span-2">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <MapPin className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Registered office address
                </p>
                <p className="mt-1.5 text-sm font-semibold leading-6 text-heading">
                  {company.registeredOffice}
                </p>
              </div>

            </div>

          </div>

          {/* Company status */}
          <div>

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Company status
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {company.status}
                </span>
              </div>

            </div>

          </div>

          {/* Company type */}
          <div>

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <Briefcase className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Company type
                </p>
                <p className="mt-1.5 text-sm font-bold text-heading">
                  {company.companyType}
                </p>
              </div>

            </div>

          </div>

          {/* Incorporated on */}
          <div className="sm:col-span-2">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <CalendarDays className="h-4 w-4 text-primary" strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Incorporated on
                </p>
                <p className="mt-1.5 text-sm font-bold text-heading">
                  {company.incorporatedOn}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          ACCOUNTS + CONFIRMATION STATEMENT
      ====================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Accounts */}
        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <FileCheck2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Accounts
            </h2>
          </div>

          <div className="space-y-4 p-5">

            {/* Next accounts */}
            <div className="rounded-lg border border-primary-soft bg-primary-light/50 p-4">

              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Next accounts
              </p>

              <div className="mt-2 space-y-1">

                <p className="text-xs text-text">
                  Made up to{" "}
                  <span className="font-bold text-heading">
                    {company.accounts.nextMadeUpTo}
                  </span>
                </p>

                <p className="text-xs text-text">
                  Due by{" "}
                  <span className="font-bold text-primary">
                    {company.accounts.nextDueBy}
                  </span>
                </p>

              </div>

            </div>

            {/* Last accounts */}
            <div className="rounded-lg border border-border-light bg-background-soft p-4">

              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Last accounts
              </p>

              <p className="mt-2 text-xs text-text">
                Made up to{" "}
                <span className="font-bold text-heading">
                  {company.accounts.lastMadeUpTo}
                </span>
              </p>

            </div>

          </div>

        </div>

        {/* Confirmation Statement */}
        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Confirmation Statement
            </h2>
          </div>

          <div className="space-y-4 p-5">

            {/* Next statement */}
            <div className="rounded-lg border border-primary-soft bg-primary-light/50 p-4">

              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Next statement
              </p>

              <div className="mt-2 space-y-1">

                <p className="text-xs text-text">
                  Date{" "}
                  <span className="font-bold text-heading">
                    {company.confirmationStatement.nextStatementDate}
                  </span>
                </p>

                <p className="text-xs text-text">
                  Due by{" "}
                  <span className="font-bold text-primary">
                    {company.confirmationStatement.nextDueBy}
                  </span>
                </p>

              </div>

            </div>

            {/* Last statement */}
            <div className="rounded-lg border border-border-light bg-background-soft p-4">

              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Last statement
              </p>

              <p className="mt-2 text-xs text-text">
                Dated{" "}
                <span className="font-bold text-heading">
                  {company.confirmationStatement.lastStatementDate}
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          NATURE OF BUSINESS (SIC)
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex items-center gap-2 border-b border-border-light px-5 py-4">
          <Globe className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold text-heading">
            Nature of Business (SIC)
          </h2>
        </div>

        <div className="divide-y divide-border-light">

          {company.sicCodes.map((sic, index) => (
            <div
              key={index}
              className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-background-soft"
            >

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-light text-[10px] font-bold text-primary">
                {index + 1}
              </div>

              <p className="text-xs leading-6 text-text">
                {sic}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

/* ============================================================
   FILING HISTORY TAB
============================================================ */

const FilingHistoryTab = ({
  filingHistory,
  filingCategories,
  selectedCategories,
  toggleCategory,
  showFilingType,
  setShowFilingType,
  handleDocumentAction,
}) => {
  return (
    <div className="space-y-6">

      {/* =====================================================
          FILTER
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Filter by category
            </h2>
          </div>

          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={() => selectedCategories.forEach((c) => toggleCategory(c))}
              className="text-[11px] font-semibold text-primary hover:text-primary-hover"
            >
              Clear all
            </button>
          )}

        </div>

        <div className="p-5">

          {/* Show filing type toggle */}
          <label className="flex cursor-pointer items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                checked={showFilingType}
                onChange={(e) => setShowFilingType(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className="
                  h-5
                  w-9
                  rounded-full
                  bg-border
                  transition-colors
                  peer-checked:bg-primary
                "
              />
              <div
                className="
                  absolute
                  left-0.5
                  top-0.5
                  h-4
                  w-4
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-transform
                  peer-checked:translate-x-4
                "
              />
            </div>
            <span className="text-xs font-semibold text-heading">
              Show filing type
            </span>
          </label>

          {/* Categories */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {filingCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`
                    flex
                    items-center
                    gap-2.5
                    rounded-lg
                    border
                    px-3.5
                    py-2.5
                    text-left
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border bg-white text-text hover:border-primary/30 hover:bg-primary-light/50"
                    }
                  `}
                >
                  <div
                    className={`
                      flex
                      h-4
                      w-4
                      shrink-0
                      items-center
                      justify-center
                      rounded
                      border
                      transition-colors
                      ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-border"
                      }
                    `}
                  >
                    {isSelected && (
                      <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                  <span className="truncate">{category}</span>
                </button>
              );
            })}

          </div>

        </div>

      </div>

      {/* =====================================================
          FILING TABLE
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex items-center justify-between border-b border-border-light px-5 py-4">

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-heading">
              Filing History
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filingHistory.length}
            </span>
          </div>

        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-border-light bg-background-soft">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Date
                </th>
                {showFilingType && (
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Filing type
                  </th>
                )}
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Description
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Documents
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">

              {filingHistory.map((filing) => (
                <tr
                  key={filing.id}
                  className="group align-top transition-colors hover:bg-background-soft"
                >
                  {/* Date */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold text-heading">
                      {filing.date}
                    </span>
                  </td>

                  {/* Filing type */}
                  {showFilingType && (
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                        {filing.type}
                      </span>
                    </td>
                  )}

                  {/* Description */}
                  <td className="px-5 py-4">
                    <p className="text-xs leading-6 text-text">
                      <strong className="font-bold text-heading">
                        {filing.type}
                      </strong>{" "}
                      {filing.description}
                    </p>
                  </td>

                  {/* Documents */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex flex-col items-end gap-2">
                      {filing.documents.map((document, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDocumentAction(document, filing)}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-border
                            bg-white
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            text-primary
                            transition-all
                            duration-200
                            hover:border-primary
                            hover:bg-primary-light
                          "
                        >
                          {document.type === "ixbrl" ? (
                            <Download className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                          <span>{document.label}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-border-light lg:hidden">

          {filingHistory.map((filing) => (
            <div key={filing.id} className="p-4">

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <FileText className="h-4 w-4 text-primary" strokeWidth={2.2} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-heading">
                      {filing.type}
                    </p>
                    <p className="mt-0.5 text-[10px] text-text-muted">
                      {filing.date}
                    </p>
                  </div>

                </div>

              </div>

              <p className="mt-3 text-xs leading-6 text-text">
                {filing.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {filing.documents.map((document, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDocumentAction(document, filing)}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      border
                      border-border
                      bg-white
                      px-3
                      py-1.5
                      text-[11px]
                      font-semibold
                      text-primary
                      transition-all
                      hover:border-primary
                      hover:bg-primary-light
                    "
                  >
                    {document.type === "ixbrl" ? (
                      <Download className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                    <span>{document.label}</span>
                  </button>
                ))}
              </div>

            </div>
          ))}

        </div>

        {/* Empty state */}
        {filingHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <FileText className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>

            <p className="mt-4 text-sm font-bold text-heading">
              No filing history found
            </p>

            <p className="mt-1 max-w-xs text-xs text-text-muted">
              No filings match the selected categories. Try adjusting your filters.
            </p>

            {selectedCategories.length > 0 && (
              <button
                type="button"
                onClick={() => selectedCategories.forEach((c) => toggleCategory(c))}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-border
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-text
                  transition-all
                  hover:border-primary
                  hover:text-primary
                "
              >
                Clear filters
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

/* ============================================================
   PEOPLE TAB
============================================================ */

const PeopleTab = ({ officers, peopleWithSignificantControl }) => {
  const [peopleTab, setPeopleTab] = useState("officers");

  const peopleTabs = [
    { id: "officers", label: "Officers", count: officers.length },
    { id: "psc", label: "Persons with significant control", count: peopleWithSignificantControl.length },
  ];

  return (
    <div className="space-y-6">

      {/* =====================================================
          INNER PEOPLE TABS
      ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

        <div className="flex gap-1 overflow-x-auto border-b border-border-light px-5">

          {peopleTabs.map((tab) => {
            const active = peopleTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPeopleTab(tab.id)}
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
                  ${active ? "text-primary" : "text-text-muted hover:text-primary"}
                `}
              >

                <span>{tab.label}</span>

                <span
                  className={`
                    rounded-full
                    px-1.5
                    py-0.5
                    text-[9px]
                    font-bold
                    ${active ? "bg-primary text-white" : "bg-background-soft text-text-muted"}
                  `}
                >
                  {tab.count}
                </span>

                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-primary" />
                )}

              </button>
            );
          })}

        </div>

        {/* =================================================
            OFFICERS
        ================================================== */}

        {peopleTab === "officers" && (
          <div className="p-5 sm:p-6">

            <div className="space-y-5">

              {officers.map((officer) => (
                <OfficerCard key={officer.id} officer={officer} />
              ))}

            </div>

          </div>
        )}

        {/* =================================================
            PSC
        ================================================== */}

        {peopleTab === "psc" && (
          <div className="p-5 sm:p-6">

            <div className="space-y-5">

              {peopleWithSignificantControl.map((person) => (
                <div
                  key={person.id}
                  className="rounded-xl border border-border-light bg-white p-5"
                >

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-bold text-heading">
                          {person.name}
                        </h3>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                          <span className="h-1 w-1 rounded-full bg-emerald-500" />
                          {person.status}
                        </span>

                      </div>

                      <div className="mt-3 rounded-lg border border-border-light bg-background-soft p-3">

                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                          Nature of control
                        </p>
                        <p className="mt-1.5 text-xs leading-6 text-text">
                          {person.control}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

/* ============================================================
   OFFICER CARD
============================================================ */

const OfficerCard = ({ officer }) => {
  const details = [
    { label: "Date of birth", value: officer.dateOfBirth, icon: CalendarDays },
    { label: "Appointed on", value: officer.appointedOn, icon: CheckCircle2 },
    { label: "Nationality", value: officer.nationality, icon: Globe },
    { label: "Place of residence", value: officer.countryOfResidence, icon: MapPin },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border-light bg-white">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border-light bg-gradient-to-r from-primary-light/50 to-white p-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {officer.name.split(", ")[0].split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-bold text-heading">
                {officer.name}
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                {officer.status}
              </span>
            </div>

            <p className="mt-0.5 text-xs text-text-muted">
              {officer.role}
            </p>

          </div>

        </div>

        {/* Verification badge */}
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold text-emerald-700 sm:self-auto">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
          <span>{officer.verificationStatus}</span>
        </div>

      </div>

      {/* Body */}
      <div className="p-5">

        {/* Address */}
        <div className="rounded-lg border border-border-light bg-background-soft p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <MapPin className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Correspondence address
              </p>
              <p className="mt-1.5 text-xs font-semibold leading-6 text-heading">
                {officer.correspondenceAddress}
              </p>
            </div>

          </div>

        </div>

        {/* Details grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <div
                key={detail.label}
                className="rounded-lg border border-border-light bg-white p-3"
              >

                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2.2} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {detail.label}
                  </p>
                </div>

                <p className="mt-1.5 text-xs font-bold text-heading">
                  {detail.value}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

/* ============================================================
   MORE TAB
============================================================ */

const MoreTab = () => {
  const sections = [
    {
      title: "Company snapshot",
      description:
        "View a summary of the company's information and registration details.",
      buttonLabel: "View company information snapshot",
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Order a company certificate",
      description:
        "Use this service to order a company certificate with certified information about the company. A certificate can be used to prove that a company is incorporated, and that no action is being taken to remove the company from the register.",
      buttonLabel: "Order company certificate",
      icon: ShieldCheck,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Order a certified document",
      description:
        "Use this service to order a certified copy of a document from the company's filing history. You can also use this service to order an incorporation package, which includes the documents that were issued when the company was formed.",
      buttonLabel: "Order certified document",
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-5">

      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div
            key={section.title}
            className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]"
          >

            <div className="p-5 sm:p-6">

              <div className="flex items-start gap-4">

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${section.iconBg}
                  `}
                >
                  <Icon className={`h-5 w-5 ${section.iconColor}`} strokeWidth={2.2} />
                </div>

                <div className="min-w-0 flex-1">

                  <h2 className="text-base font-bold text-heading">
                    {section.title}
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-text-secondary">
                    {section.description}
                  </p>

                  <button
                    type="button"
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-primary
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-white
                      shadow-sm
                      transition-all
                      duration-200
                      hover:bg-primary-hover
                      hover:-translate-y-0.5
                      hover:shadow-md
                    "
                  >
                    <span>{section.buttonLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                </div>

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default OrganizationMyCompaniesDetails;