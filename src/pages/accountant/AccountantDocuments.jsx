import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Eye,
  MoreVertical,
  Edit3,
  Archive,
  Download,
  RefreshCw,
  Building2,
  Users,
  Calendar,
  FileText,
  File,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Upload,
  Trash2,
  Copy,
  Send,
  FolderPlus,
  Grid3x3,
  List,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Link2,
  User,
  Star,
  Info,
  X,
} from "lucide-react";

const AccountantDocuments = () => {
  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [openRowMenu, setOpenRowMenu] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "all",
      label: "All Documents",
      value: 248,
      change: "+12 this week",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "recent",
      label: "Recently Added",
      value: 18,
      change: "Last 7 days",
      icon: Clock3,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "pending",
      label: "Pending Review",
      value: 6,
      change: "Awaiting action",
      icon: AlertCircle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "shared",
      label: "Shared with Clients",
      value: 42,
      change: "Active shares",
      icon: Link2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  /* ============================================================
     DOCUMENTS DATA
  ============================================================ */

  const documents = [
    {
      id: 1,
      name: "Q3-bank-statements.pdf",
      type: "pdf",
      size: "2.4 MB",
      category: "Bank Statements",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
      uploadedTime: "14:11",
      status: "Reviewed",
    },
    {
      id: 2,
      name: "Q3-sales-report.xlsx",
      type: "excel",
      size: "842 KB",
      category: "Sales Reports",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
      uploadedTime: "14:12",
      status: "Reviewed",
    },
    {
      id: 3,
      name: "CT600-draft-2025.pdf",
      type: "pdf",
      size: "1.8 MB",
      category: "Tax Filings",
      client: "Digital Solutions Ltd",
      clientId: 4,
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      uploadedBy: "Alice Johnson",
      uploadedAt: "22 Aug 2026",
      uploadedTime: "09:47",
      status: "Awaiting Review",
    },
    {
      id: 4,
      name: "purchase-invoices-Q3.zip",
      type: "archive",
      size: "5.1 MB",
      category: "Invoices",
      client: "Imperial Thermal Ltd",
      clientId: 1,
      company: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
      uploadedTime: "14:15",
      status: "Reviewed",
    },
    {
      id: 5,
      name: "company-logo.png",
      type: "image",
      size: "124 KB",
      category: "Branding",
      client: "Green Tech Ltd",
      clientId: 2,
      company: "Green Tech Ltd",
      companyNumber: "07895432",
      uploadedBy: "Sarah Roberts",
      uploadedAt: "18 Aug 2026",
      uploadedTime: "11:20",
      status: "Reviewed",
    },
    {
      id: 6,
      name: "2025-26-annual-accounts.pdf",
      type: "pdf",
      size: "3.2 MB",
      category: "Annual Accounts",
      client: "Skil Four Ltd",
      clientId: 3,
      company: "Skil Four Ltd",
      companyNumber: "05513948",
      uploadedBy: "Alice Johnson",
      uploadedAt: "15 Aug 2026",
      uploadedTime: "16:32",
      status: "Approved",
    },
    {
      id: 7,
      name: "expenses-summary.xlsx",
      type: "excel",
      size: "1.1 MB",
      category: "Expenses",
      client: "Bright Ideas Ltd",
      clientId: 5,
      company: "Bright Ideas Ltd",
      companyNumber: "11223344",
      uploadedBy: "David Chen",
      uploadedAt: "12 Aug 2026",
      uploadedTime: "10:05",
      status: "Reviewed",
    },
    {
      id: 8,
      name: "VAT-registration.pdf",
      type: "pdf",
      size: "524 KB",
      category: "VAT",
      client: "Sunrise Trading Ltd",
      clientId: 7,
      company: "Sunrise Trading Ltd",
      companyNumber: "44556677",
      uploadedBy: "Laura Taylor",
      uploadedAt: "08 Aug 2026",
      uploadedTime: "15:45",
      status: "Approved",
    },
    {
      id: 9,
      name: "bank-feed-connection.png",
      type: "image",
      size: "256 KB",
      category: "Screenshots",
      client: "Ocean View Ltd",
      clientId: 6,
      company: "Ocean View Ltd",
      companyNumber: "66778899",
      uploadedBy: "Michael Brown",
      uploadedAt: "05 Aug 2026",
      uploadedTime: "09:30",
      status: "Reviewed",
    },
    {
      id: 10,
      name: "supplier-contracts.zip",
      type: "archive",
      size: "8.4 MB",
      category: "Contracts",
      client: "Digital Solutions Ltd",
      clientId: 4,
      company: "Digital Solutions Ltd",
      companyNumber: "99887766",
      uploadedBy: "Emma Wilson",
      uploadedAt: "02 Aug 2026",
      uploadedTime: "13:15",
      status: "Awaiting Review",
    },
  ];

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const typeOptions = [
    { value: "All", label: "All Types" },
    { value: "pdf", label: "PDF" },
    { value: "excel", label: "Excel" },
    { value: "image", label: "Image" },
    { value: "archive", label: "Archive" },
  ];

  const clientOptions = [
    { value: "All", label: "All Clients" },
    { value: "Imperial Thermal Ltd", label: "Imperial Thermal Ltd" },
    { value: "Green Tech Ltd", label: "Green Tech Ltd" },
    { value: "Skil Four Ltd", label: "Skil Four Ltd" },
    { value: "Digital Solutions Ltd", label: "Digital Solutions Ltd" },
    { value: "Bright Ideas Ltd", label: "Bright Ideas Ltd" },
  ];

  const categoryOptions = [
    { value: "All", label: "All Categories" },
    { value: "Bank Statements", label: "Bank Statements" },
    { value: "Tax Filings", label: "Tax Filings" },
    { value: "Annual Accounts", label: "Annual Accounts" },
    { value: "Invoices", label: "Invoices" },
    { value: "VAT", label: "VAT" },
    { value: "Contracts", label: "Contracts" },
  ];

  /* ============================================================
     FILTERED DOCUMENTS
  ============================================================ */

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${doc.name} ${doc.client} ${doc.company} ${doc.category}`
          .toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "All" || doc.type === typeFilter;

      const matchesClient =
        clientFilter === "All" || doc.client === clientFilter;

      const matchesCategory =
        categoryFilter === "All" || doc.category === categoryFilter;

      return (
        matchesSearch && matchesType && matchesClient && matchesCategory
      );
    });
  }, [documents, search, typeFilter, clientFilter, categoryFilter]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setClientFilter("All");
    setCategoryFilter("All");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log("Dropped files:", Array.from(files));
    }
  };

  const hasActiveFilters =
    search ||
    typeFilter !== "All" ||
    clientFilter !== "All" ||
    categoryFilter !== "All";

  /* ============================================================
     HELPERS
  ============================================================ */

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return { icon: FileText, bg: "bg-rose-100", color: "text-rose-600" };
      case "excel":
        return {
          icon: FileSpreadsheet,
          bg: "bg-emerald-100",
          color: "text-emerald-600",
        };
      case "image":
        return { icon: FileImage, bg: "bg-purple-100", color: "text-purple-600" };
      case "archive":
        return { icon: FileArchive, bg: "bg-amber-100", color: "text-amber-600" };
      default:
        return { icon: File, bg: "bg-blue-100", color: "text-blue-600" };
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          icon: CheckCircle2,
        };
      case "Reviewed":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: Check,
        };
      case "Awaiting Review":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          icon: Clock3,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          icon: FileText,
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
            Documents
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage all client documents in one secure place
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
            <FolderPlus className="h-4 w-4" strokeWidth={2.2} />
            <span className="hidden sm:inline">New Folder</span>
          </button>

          <button
            type="button"
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
            <Upload className="h-4 w-4" strokeWidth={2.4} />
            <span>Upload</span>
          </button>
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
          UPLOAD DROPZONE
      ====================================================== */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex
          flex-col
          items-center
          justify-center
          rounded-xl
          border-2
          border-dashed
          px-5
          py-6
          text-center
          transition-all
          duration-200
          ${
            isDragging
              ? "border-[#087F5B] bg-[#E8F8F2]"
              : "border-[#DDEAE6] bg-white hover:border-[#087F5B]/40"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition-colors
              ${
                isDragging
                  ? "bg-[#087F5B] text-white"
                  : "bg-[#E8F8F2] text-[#087F5B]"
              }
            `}
          >
            <Upload className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-[#09263A]">
              Drag and drop files here to upload
            </p>
            <p className="mt-0.5 text-[11px] text-[#687B78]">
              or{" "}
              <button className="font-semibold text-[#087F5B] underline-offset-2 hover:underline">
                browse files
              </button>{" "}
              · PDF, Excel, CSV, Image, ZIP up to 25 MB
            </p>
          </div>
        </div>
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
              placeholder="Search documents by name, client or category..."
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

          {/* Type filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown((prev) => !prev);
                setShowClientDropdown(false);
                setShowCategoryDropdown(false);
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
              <div className="absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
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

          {/* Category filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowCategoryDropdown((prev) => !prev);
                setShowTypeDropdown(false);
                setShowClientDropdown(false);
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
                {categoryOptions.find((o) => o.value === categoryFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showCategoryDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showCategoryDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(option.value);
                      setShowCategoryDropdown(false);
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
                        categoryFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {categoryFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 text-[#087F5B]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Client filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowClientDropdown((prev) => !prev);
                setShowTypeDropdown(false);
                setShowCategoryDropdown(false);
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
              <span className="truncate max-w-[140px]">
                {clientOptions.find((o) => o.value === clientFilter)?.label}
              </span>
              <ChevronDown
                className={`
                  h-4
                  w-4
                  text-[#687B78]
                  transition-transform
                  duration-200
                  ${showClientDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {showClientDropdown && (
              <div className="absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-2xl">
                {clientOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
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
                      hover:bg-[#E8F8F2]
                      ${
                        clientFilter === option.value
                          ? "bg-[#E8F8F2] font-semibold text-[#087F5B]"
                          : "text-[#09263A]"
                      }
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {clientFilter === option.value && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#087F5B]" />
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
              <X className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span>Clear</span>
            </button>
          )}

          {/* View toggle */}
          <div className="hidden rounded-lg border border-[#DDEAE6] bg-white p-1 lg:flex">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-3
                py-1.5
                text-xs
                font-bold
                transition-all
                ${
                  viewMode === "list"
                    ? "bg-[#087F5B] text-white"
                    : "text-[#687B78] hover:bg-[#F5FCF9]"
                }
              `}
            >
              <List className="h-3.5 w-3.5" strokeWidth={2.4} />
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-md
                px-3
                py-1.5
                text-xs
                font-bold
                transition-all
                ${
                  viewMode === "grid"
                    ? "bg-[#087F5B] text-white"
                    : "text-[#687B78] hover:bg-[#F5FCF9]"
                }
              `}
            >
              <Grid3x3 className="h-3.5 w-3.5" strokeWidth={2.4} />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          DOCUMENTS - LIST VIEW
      ====================================================== */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen
                className="h-4 w-4 text-[#087F5B]"
                strokeWidth={2.2}
              />
              <h2 className="text-sm font-bold text-[#09263A]">
                All Documents
              </h2>
              <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                {filteredDocuments.length}
              </span>
            </div>
            <p className="text-[11px] text-[#687B78]">
              Sorted by upload date
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Document
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Client
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Uploaded
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
                {filteredDocuments.map((doc) => {
                  const fileStyle = getFileIcon(doc.type);
                  const FileIcon = fileStyle.icon;
                  const statusStyles = getStatusStyles(doc.status);
                  const StatusIcon = statusStyles.icon;

                  return (
                    <tr
                      key={doc.id}
                      className="group cursor-pointer transition-colors hover:bg-[#F5FCF9]"
                    >
                      {/* Document */}
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
                              ${fileStyle.bg}
                            `}
                          >
                            <FileIcon
                              className={`h-5 w-5 ${fileStyle.color}`}
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                              {doc.name}
                            </p>
                            <p className="mt-0.5 text-[10px] text-[#687B78]">
                              {doc.size}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[10px] font-semibold text-[#687B78]">
                          {doc.category}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="px-5 py-4">
                        <Link
                          to={`/accountant/clients/${doc.clientId}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09263A] transition-colors hover:text-[#087F5B]"
                        >
                          <Users
                            className="h-3.5 w-3.5 text-[#687B78]"
                            strokeWidth={2.2}
                          />
                          <span className="truncate max-w-[140px]">
                            {doc.client}
                          </span>
                        </Link>
                      </td>

                      {/* Uploaded */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-xs font-semibold text-[#09263A]">
                            {doc.uploadedAt}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#687B78]">
                            by {doc.uploadedBy}
                          </p>
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
                          {doc.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        className="relative px-5 py-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-flex items-center gap-1">
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                            <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </button>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                            <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowMenu(
                                openRowMenu === doc.id ? null : doc.id
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            aria-label="More actions"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>

                          {openRowMenu === doc.id && (
                            <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Eye className="h-3.5 w-3.5" />
                                <span>Preview</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Download className="h-3.5 w-3.5" />
                                <span>Download</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Link2 className="h-3.5 w-3.5" />
                                <span>Copy share link</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Send className="h-3.5 w-3.5" />
                                <span>Send to client</span>
                              </button>
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Rename</span>
                              </button>
                              <div className="my-1 border-t border-[#DDEAE6]" />
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Delete</span>
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
            {filteredDocuments.map((doc) => {
              const fileStyle = getFileIcon(doc.type);
              const FileIcon = fileStyle.icon;
              const statusStyles = getStatusStyles(doc.status);
              const StatusIcon = statusStyles.icon;

              return (
                <div
                  key={doc.id}
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
                        rounded-lg
                        ${fileStyle.bg}
                      `}
                    >
                      <FileIcon
                        className={`h-5 w-5 ${fileStyle.color}`}
                        strokeWidth={2.2}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#09263A]">
                            {doc.name}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#687B78]">
                            {doc.size} · {doc.category}
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
                          {doc.status}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#687B78]">
                        <Users className="h-3 w-3" strokeWidth={2.2} />
                        <span className="truncate">{doc.client}</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-[10px] text-[#687B78]">
                          {doc.uploadedAt}
                        </span>

                        <div className="flex items-center gap-1">
                          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                            <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                            <Download
                              className="h-3.5 w-3.5"
                              strokeWidth={2.4}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredDocuments.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <FolderOpen
                  className="h-7 w-7 text-[#087F5B]"
                  strokeWidth={2}
                />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No documents found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                {hasActiveFilters
                  ? "Try adjusting your search or filters."
                  : "Upload your first document to get started."}
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
                  <X className="h-3 w-3" strokeWidth={2.4} />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================
          DOCUMENTS - GRID VIEW
      ====================================================== */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.map((doc) => {
            const fileStyle = getFileIcon(doc.type);
            const FileIcon = fileStyle.icon;
            const statusStyles = getStatusStyles(doc.status);
            const StatusIcon = statusStyles.icon;

            return (
              <div
                key={doc.id}
                className="
                  group
                  relative
                  flex
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#DDEAE6]
                  bg-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-[#087F5B]/30
                  hover:shadow-md
                "
              >
                {/* File icon header */}
                <div
                  className={`
                    flex
                    items-center
                    justify-center
                    py-8
                    ${fileStyle.bg}
                  `}
                >
                  <FileIcon
                    className={`h-10 w-10 ${fileStyle.color}`}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-bold text-[#09263A] group-hover:text-[#087F5B]">
                      {doc.name}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenRowMenu(openRowMenu === doc.id ? null : doc.id)
                      }
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#F5FCF9] px-2 py-0.5 text-[9px] font-semibold text-[#687B78]">
                      {doc.category}
                    </span>
                    <span
                      className={`
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
                      <StatusIcon className="h-2.5 w-2.5" strokeWidth={2.4} />
                      {doc.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#687B78]">
                    <Users className="h-3 w-3" strokeWidth={2.2} />
                    <span className="truncate">{doc.client}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <div className="text-[10px] text-[#687B78]">
                      <p>{doc.uploadedAt}</p>
                      <p className="mt-0.5">{doc.size}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                        <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty state for grid */}
          {filteredDocuments.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-[#DDEAE6] bg-white px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <FolderOpen
                  className="h-7 w-7 text-[#087F5B]"
                  strokeWidth={2}
                />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No documents found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                {hasActiveFilters
                  ? "Try adjusting your search or filters."
                  : "Upload your first document to get started."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================
          BOTTOM CTA BANNER
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2] via-[#F5FCF9] to-white p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#087F5B] opacity-[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
              <FolderPlus className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
                Request documents
              </p>
              <h3 className="mt-1 text-base font-bold text-[#09263A]">
                Automatically request files from clients
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                Set up document request templates and let your clients upload
                files directly to the right folders.
              </p>
            </div>
          </div>

          <Link
            to="/accountant/documents/requests"
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
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.6} />
            <span>Document requests</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantDocuments;