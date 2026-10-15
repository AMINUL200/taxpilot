import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  ChevronDown,
  Save,
  X,
  Layers,
  Hash,
  Inbox,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Landmark,
  ShieldCheck,
  Briefcase,
  Info,
} from "lucide-react";
import api from "../../../services/api";
import useAuthStore from "../../../stores/authStore";

/* ============================================================
   CONSTANTS
============================================================ */

const SUBJECT_TYPE_OPTIONS = [
  { value: "organisation", label: "Organisation" },
  { value: "company", label: "Company" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const SUBJECT_TYPE_STYLES = {
  organisation: {
    bg: "bg-primary-light",
    text: "text-primary",
    icon: Building2,
    label: "Organisation",
  },
  company: {
    bg: "bg-info-light",
    text: "text-info",
    icon: Briefcase,
    label: "Company",
  },
};

const STATUS_STYLES = {
  active: {
    bg: "bg-success-light",
    text: "text-success",
    dot: "bg-success",
    label: "Active",
  },
  inactive: {
    bg: "bg-danger-light",
    text: "text-danger",
    dot: "bg-danger",
    label: "Inactive",
  },
};

const COMPANY_TYPE_OPTIONS = [
  { value: "", label: "Select type..." },
  { value: "Private Limited Company", label: "Private Limited Company" },
  { value: "Public Limited Company", label: "Public Limited Company" },
  { value: "Limited Liability Partnership", label: "Limited Liability Partnership" },
  { value: "Sole Trader", label: "Sole Trader" },
  { value: "Partnership", label: "Partnership" },
  { value: "Other", label: "Other" },
];

/* ============================================================
   ORG MANAGE FILING SUBJECT
============================================================ */

const OrgManageFillingSubject = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     AUTH — organisation id
  ============================================================ */

  const selectedOrganisation = useAuthStore((s) => s.selectedOrganisation);
  const organisationId = selectedOrganisation?.id;

  /* ============================================================
     STATE
  ============================================================ */

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingSubject, setDeletingSubject] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH FILING SUBJECTS
  ============================================================ */

  const fetchSubjects = useCallback(
    async (isRefresh = false) => {
      if (!organisationId) {
        setError("No organisation selected.");
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/organisations/${organisationId}/filing-subjects`
        );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load filing subjects."
          );
        }

        const data = response.data.data || [];
        setSubjects(data);
      } catch (err) {
        console.error("Fetch filing subjects error:", err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [organisationId]
  );

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowTypeDropdown(false);
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTERED
  ============================================================ */

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        s.name?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        s.company_number?.toLowerCase().includes(query) ||
        s.utr_number?.toLowerCase().includes(query) ||
        s.vat_number?.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "all" || s.subject_type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || s.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [subjects, search, typeFilter, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const total = subjects.length;
    const active = subjects.filter((s) => s.status === "active").length;
    const inactive = total - active;
    const organisations = subjects.filter(
      (s) => s.subject_type === "organisation"
    ).length;

    return [
      {
        id: "total",
        label: "Total Subjects",
        value: total,
        icon: Layers,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      },
      {
        id: "active",
        label: "Active",
        value: active,
        icon: CheckCircle2,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "inactive",
        label: "Inactive",
        value: inactive,
        icon: XCircle,
        iconBg: "bg-danger-light",
        iconColor: "text-danger",
      },
      {
        id: "organisations",
        label: "Organisations",
        value: organisations,
        icon: Building2,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [subjects]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingSubject(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSaveSubject = async (payload) => {
    if (!organisationId) {
      throw new Error("No organisation selected.");
    }

    if (editingSubject) {
      const response = await api.put(
        `/organisations/${organisationId}/filing-subjects/${editingSubject.id}`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to update filing subject."
        );
      }

      setSubjects((prev) =>
        prev.map((s) =>
          s.id === editingSubject.id ? response.data.data : s
        )
      );
    } else {
      const response = await api.post(
        `/organisations/${organisationId}/filing-subjects`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to create filing subject."
        );
      }

      setSubjects((prev) => [...prev, response.data.data]);
    }

    setShowFormModal(false);
    setEditingSubject(null);
  };

  /* ============================================================
     HANDLERS — DELETE
  ============================================================ */

  const openDeleteModal = (subject) => {
    setDeletingSubject(subject);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingSubject || !organisationId) return;

    await api.delete(
      `/organisations/${organisationId}/filing-subjects/${deletingSubject.id}`
    );

    setSubjects((prev) => prev.filter((s) => s.id !== deletingSubject.id));
    setShowDeleteModal(false);
    setDeletingSubject(null);
  };

  /* ============================================================
     HELPERS
  ============================================================ */

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAddress = (address) => {
    if (!address) return "—";
    const parts = [
      address.line_1,
      address.line_2,
      address.city,
      address.county,
      address.postcode,
      address.country,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "—";
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    search || typeFilter !== "all" || statusFilter !== "all";

  const getSubjectTypeStyles = (type) =>
    SUBJECT_TYPE_STYLES[type] || SUBJECT_TYPE_STYLES.company;

  const getStatusStyles = (status) =>
    STATUS_STYLES[status] || STATUS_STYLES.inactive;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
            <User className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Filing Subjects
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage organisations and companies used as filing subjects
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fetchSubjects(true)}
            disabled={refreshing}
            className="
              inline-flex items-center gap-2 rounded-lg border border-border
              bg-background px-4 py-2.5 text-sm font-semibold text-heading
              transition-all duration-200 hover:border-primary hover:text-primary
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              strokeWidth={2.2}
            />
            <span className="hidden sm:inline">
              {refreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="
              inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5
              text-sm font-semibold text-text-white shadow-button
              transition-all duration-200 hover:bg-primary-hover
              hover:-translate-y-0.5
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
            <span>Add Filing Subject</span>
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="
                rounded-xl border border-border-light bg-background p-4
                shadow-card transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-card-hover
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-1.5 text-2xl font-bold text-heading">
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

      {/* ERROR BANNER */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-danger-light bg-danger-light px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
          <div className="flex-1">
            <p className="text-xs font-bold text-heading">
              Something went wrong
            </p>
            <p className="mt-0.5 text-[11px] text-text-secondary">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-text-muted hover:text-heading"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {/* FILTERS */}
      <div className="rounded-xl border border-border-light bg-background p-4 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company no., UTR or VAT..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Type Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown((p) => !p);
                setShowStatusDropdown(false);
              }}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span className="truncate max-w-[140px]">
                {typeFilter === "all"
                  ? "All Types"
                  : SUBJECT_TYPE_OPTIONS.find((t) => t.value === typeFilter)
                      ?.label || "Type"}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
                  showTypeDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showTypeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className="
                    absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden
                    rounded-xl border border-border bg-background
                    shadow-card-hover
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setTypeFilter("all");
                      setShowTypeDropdown(false);
                    }}
                    className={`
                      flex w-full items-center justify-between px-4 py-2.5
                      text-left text-sm transition-colors hover:bg-primary-light
                      ${
                        typeFilter === "all"
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>All Types</span>
                    {typeFilter === "all" && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>

                  {SUBJECT_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setTypeFilter(opt.value);
                        setShowTypeDropdown(false);
                      }}
                      className={`
                        flex w-full items-center justify-between px-4 py-2.5
                        text-left text-sm transition-colors hover:bg-primary-light
                        ${
                          typeFilter === opt.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span>{opt.label}</span>
                      {typeFilter === opt.value && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((p) => !p);
                setShowTypeDropdown(false);
              }}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span>
                {statusFilter === "all"
                  ? "All Statuses"
                  : STATUS_OPTIONS.find((s) => s.value === statusFilter)
                      ?.label || "Status"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform ${
                  showStatusDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showStatusDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className="
                    absolute right-0 top-full z-30 mt-2 w-48 overflow-hidden
                    rounded-xl border border-border bg-background
                    shadow-card-hover
                  "
                >
                  {[{ value: "all", label: "All Statuses" }, ...STATUS_OPTIONS].map(
                    (opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setStatusFilter(opt.value);
                          setShowStatusDropdown(false);
                        }}
                        className={`
                          flex w-full items-center justify-between px-4 py-2.5
                          text-left text-sm transition-colors hover:bg-primary-light
                          ${
                            statusFilter === opt.value
                              ? "bg-primary-light font-semibold text-primary"
                              : "text-text"
                          }
                        `}
                      >
                        <span>{opt.label}</span>
                        {statusFilter === opt.value && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                inline-flex items-center justify-center gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-text-secondary transition-all duration-200
                hover:border-primary hover:text-primary
              "
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-border-light bg-background shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              All Filing Subjects
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredSubjects.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredSubjects.length} of {subjects.length} subjects
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading filing subjects...
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && (
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-border-light bg-background-soft">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Subject
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Type
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Identifiers
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Contact
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-light">
                {filteredSubjects.map((subject) => {
                  const typeStyle = getSubjectTypeStyles(subject.subject_type);
                  const statusStyle = getStatusStyles(subject.status);
                  const TypeIcon = typeStyle.icon;

                  return (
                    <tr
                      key={subject.id}
                      className="group transition-colors hover:bg-background-soft"
                    >
                      {/* Subject */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                              flex h-10 w-10 shrink-0 items-center justify-center
                              rounded-lg ${typeStyle.bg}
                            `}
                          >
                            <TypeIcon
                              className={`h-4 w-4 ${typeStyle.text}`}
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-heading">
                              {subject.name}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] text-text-muted">
                              {formatAddress(subject.address)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center gap-1.5 rounded-full
                            px-2.5 py-1 text-[10px] font-bold
                            ${typeStyle.bg} ${typeStyle.text}
                          `}
                        >
                          <TypeIcon className="h-3 w-3" strokeWidth={2.4} />
                          {typeStyle.label}
                        </span>
                      </td>

                      {/* Identifiers */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          {subject.company_number && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary">
                              <Briefcase className="h-3 w-3 text-text-muted" />
                              <span className="font-mono">
                                {subject.company_number}
                              </span>
                            </span>
                          )}
                          {subject.utr_number && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary">
                              <ShieldCheck className="h-3 w-3 text-text-muted" />
                              <span className="font-mono">
                                UTR {subject.utr_number}
                              </span>
                            </span>
                          )}
                          {subject.vat_number && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary">
                              <Landmark className="h-3 w-3 text-text-muted" />
                              <span className="font-mono">
                                {subject.vat_number}
                              </span>
                            </span>
                          )}
                          {!subject.company_number &&
                            !subject.utr_number &&
                            !subject.vat_number && (
                              <span className="text-[11px] text-text-muted">
                                —
                              </span>
                            )}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          {subject.email && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary">
                              <Mail className="h-3 w-3 text-text-muted" />
                              <span className="truncate max-w-[180px]">
                                {subject.email}
                              </span>
                            </span>
                          )}
                          {subject.phone && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary">
                              <Phone className="h-3 w-3 text-text-muted" />
                              <span>{subject.phone}</span>
                            </span>
                          )}
                          {!subject.email && !subject.phone && (
                            <span className="text-[11px] text-text-muted">
                              —
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center gap-1.5 rounded-full
                            px-2.5 py-1 text-[10px] font-bold
                            ${statusStyle.bg} ${statusStyle.text}
                          `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />
                          {statusStyle.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="relative px-5 py-4 text-right">
                        <div className="relative inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(subject)}
                            className="
                              inline-flex items-center gap-1 rounded-lg border
                              border-border bg-background px-3 py-1.5
                              text-[11px] font-semibold text-heading
                              transition-all duration-200 hover:border-primary
                              hover:bg-primary-light hover:text-primary
                            "
                          >
                            <Edit3 className="h-3 w-3" strokeWidth={2.4} />
                            <span>Edit</span>
                          </button>

                          <div className="relative" data-row-menu>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenRowMenu(
                                  openRowMenu === subject.id
                                    ? null
                                    : subject.id
                                )
                              }
                              className="
                                flex h-7 w-7 items-center justify-center
                                rounded-lg text-text-muted transition-colors
                                hover:bg-primary-light hover:text-primary
                              "
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>

                            <AnimatePresence>
                              {openRowMenu === subject.id && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                                  transition={{ duration: 0.18 }}
                                  className="
                                    absolute right-0 top-full z-20 mt-1 w-48
                                    overflow-hidden rounded-lg border
                                    border-border bg-background py-1
                                    shadow-card-hover
                                  "
                                >
                                  <button
                                    type="button"
                                    onClick={() => openEditModal(subject)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigator.clipboard?.writeText(
                                        String(subject.id)
                                      )
                                    }
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                  >
                                    <Hash className="h-3.5 w-3.5" />
                                    <span>Copy ID</span>
                                  </button>
                                  <div className="my-1 border-t border-border-light" />
                                  <button
                                    type="button"
                                    onClick={() => openDeleteModal(subject)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Delete</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && (
          <div className="divide-y divide-border-light lg:hidden">
            {filteredSubjects.map((subject) => {
              const typeStyle = getSubjectTypeStyles(subject.subject_type);
              const statusStyle = getStatusStyles(subject.status);
              const TypeIcon = typeStyle.icon;

              return (
                <div key={subject.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-lg ${typeStyle.bg}
                      `}
                    >
                      <TypeIcon
                        className={`h-5 w-5 ${typeStyle.text}`}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading">
                            {subject.name}
                          </p>
                          {subject.company_number && (
                            <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                              #{subject.company_number}
                            </code>
                          )}
                        </div>
                        <span
                          className={`
                            shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold
                            ${statusStyle.bg} ${statusStyle.text}
                          `}
                        >
                          {statusStyle.label}
                        </span>
                      </div>

                      <div className="mt-2">
                        <span
                          className={`
                            inline-flex items-center gap-1 rounded-full px-2
                            py-0.5 text-[10px] font-bold
                            ${typeStyle.bg} ${typeStyle.text}
                          `}
                        >
                          <TypeIcon className="h-2.5 w-2.5" />
                          {typeStyle.label}
                        </span>
                      </div>

                      {subject.email && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-text-secondary">
                          <Mail className="h-3 w-3 text-text-muted" />
                          <span className="truncate">{subject.email}</span>
                        </p>
                      )}

                      {subject.address && (
                        <p className="mt-1.5 inline-flex items-start gap-1.5 text-[11px] text-text-muted">
                          <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                          <span className="line-clamp-2">
                            {formatAddress(subject.address)}
                          </span>
                        </p>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(subject)}
                          className="
                            inline-flex flex-1 items-center justify-center gap-1.5
                            rounded-lg border border-border bg-background px-3
                            py-2 text-[11px] font-semibold text-heading
                            transition-all hover:border-primary hover:text-primary
                          "
                        >
                          <Edit3 className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(subject)}
                          className="
                            inline-flex items-center justify-center gap-1.5
                            rounded-lg border border-danger-light bg-background
                            px-3 py-2 text-[11px] font-semibold text-danger
                            transition-all hover:bg-danger-light
                          "
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredSubjects.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No filing subjects found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by creating your first filing subject."}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-5 inline-flex items-center gap-2 rounded-lg border
                  border-border bg-background px-4 py-2 text-xs font-semibold
                  text-heading transition-all hover:border-primary
                  hover:text-primary
                "
              >
                <X className="h-3 w-3" />
                Clear filters
              </button>
            ) : (
              <button
                type="button"
                onClick={openCreateModal}
                className="
                  mt-5 inline-flex items-center gap-2 rounded-lg bg-primary
                  px-4 py-2 text-xs font-bold text-text-white transition-all
                  hover:bg-primary-hover
                "
              >
                <Plus className="h-3.5 w-3.5" />
                Add Filing Subject
              </button>
            )}
          </div>
        )}
      </div>

      {/* MODALS */}
      <FilingSubjectFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingSubject(null);
        }}
        onSave={handleSaveSubject}
        subject={editingSubject}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingSubject(null);
        }}
        onConfirm={handleConfirmDelete}
        subject={deletingSubject}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   FILING SUBJECT FORM MODAL
============================================================ */

const FilingSubjectFormModal = ({
  isOpen,
  onClose,
  onSave,
  subject,
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(subject);

  const EMPTY_FORM = {
    subject_type: "organisation",
    name: "",
    company_number: "",
    company_type: "",
    utr_number: "",
    vat_number: "",
    email: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    county: "",
    postcode: "",
    country: "United Kingdom",
    status: "active",
    notes: "",
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  /* Reset form when modal opens */
  useEffect(() => {
    if (!isOpen) return;

    if (subject) {
      const addr = subject.address || {};
      setForm({
        subject_type: subject.subject_type || "organisation",
        name: subject.name || "",
        company_number: subject.company_number || "",
        company_type: subject.company_type || "",
        utr_number: subject.utr_number || "",
        vat_number: subject.vat_number || "",
        email: subject.email || "",
        phone: subject.phone || "",
        address_line_1: addr.line_1 || "",
        address_line_2: addr.line_2 || "",
        city: addr.city || "",
        county: addr.county || "",
        postcode: addr.postcode || "",
        country: addr.country || "United Kingdom",
        status: subject.status || "active",
        notes: subject.notes || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, subject]);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.subject_type) next.subject_type = "Subject type is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setServerError(null);

    try {
      // Build the API payload
      const payload = {
        subject_type: form.subject_type,
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        utr_number: form.utr_number.trim() || null,
        status: form.status,
        notes: form.notes.trim() || null,
      };

      // Company-only fields
      if (form.subject_type === "company") {
        payload.company_number = form.company_number.trim() || null;
        payload.company_type = form.company_type || null;
      } else {
        // organisation-only field
        payload.vat_number = form.vat_number.trim() || null;
      }

      // Address — flat fields (as per your API doc)
      if (form.address_line_1.trim())
        payload.address_line_1 = form.address_line_1.trim();
      if (form.address_line_2.trim())
        payload.address_line_2 = form.address_line_2.trim();
      if (form.city.trim()) payload.city = form.city.trim();
      if (form.county.trim()) payload.county = form.county.trim();
      if (form.postcode.trim()) payload.postcode = form.postcode.trim();
      if (form.country.trim()) payload.country = form.country.trim();

      await onSave(payload);
    } catch (err) {
      setServerError(
        err.response?.data?.message || err.message || "Failed to save."
      );
    } finally {
      setSaving(false);
    }
  };

  const isCompany = form.subject_type === "company";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-secondary/50 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: 10 }
            }
            transition={{ duration: 0.35, ease: premiumEase }}
            onClick={(e) => e.stopPropagation()}
            className="
              fixed left-1/2 top-1/2 z-[210] flex max-h-[90vh]
              w-[calc(100%-32px)] max-w-[680px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <User className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {isEdit ? "Edit Filing Subject" : "New Filing Subject"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update this filing subject's details."
                      : "Create a new organisation or company filing subject."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-background-soft hover:text-heading"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
            >
              {serverError && (
                <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-danger-light bg-danger-light px-3 py-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                  <p className="text-xs text-danger">{serverError}</p>
                </div>
              )}

              <div className="space-y-5">
                {/* Subject type — segmented control */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Subject Type <span className="text-danger">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SUBJECT_TYPE_OPTIONS.map((opt) => {
                      const OptIcon =
                        SUBJECT_TYPE_STYLES[opt.value]?.icon || Building2;
                      const isSelected = form.subject_type === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setField("subject_type", opt.value)}
                          className={`
                            flex items-center gap-2 rounded-lg border px-3 py-2.5
                            text-sm font-semibold transition-all duration-200
                            ${
                              isSelected
                                ? "border-primary bg-primary-light text-primary"
                                : "border-border bg-background text-text hover:border-primary/40"
                            }
                          `}
                        >
                          <OptIcon className="h-4 w-4" strokeWidth={2.2} />
                          <span>{opt.label}</span>
                          {isSelected && (
                            <CheckCircle2 className="ml-auto h-4 w-4" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder={
                      isCompany ? "e.g. XYZ Limited" : "e.g. ABC Tax & Accountants"
                    }
                    className={`
                      w-full rounded-lg border bg-background px-4 py-2.5
                      text-sm text-heading outline-none transition-all
                      placeholder:text-text-muted focus:ring-2
                      focus:ring-primary/10
                      ${
                        errors.name
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-primary"
                      }
                    `}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[11px] font-medium text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Company-only: Company number + type */}
                {isCompany && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Company Number
                      </label>
                      <input
                        type="text"
                        value={form.company_number}
                        onChange={(e) =>
                          setField("company_number", e.target.value)
                        }
                        placeholder="e.g. 12345678"
                        className="
                          w-full rounded-lg border border-border bg-background
                          px-4 py-2.5 font-mono text-sm text-heading outline-none
                          transition-all placeholder:text-text-muted
                          focus:border-primary focus:ring-2 focus:ring-primary/10
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Company Type
                      </label>
                      <div className="relative">
                        <select
                          value={form.company_type}
                          onChange={(e) =>
                            setField("company_type", e.target.value)
                          }
                          className="
                            w-full cursor-pointer appearance-none rounded-lg
                            border border-border bg-background px-4 py-2.5 pr-10
                            text-sm text-heading outline-none transition-all
                            focus:border-primary focus:ring-2 focus:ring-primary/10
                          "
                        >
                          {COMPANY_TYPE_OPTIONS.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Organisation-only: VAT number */}
                {!isCompany && (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      VAT Number
                    </label>
                    <input
                      type="text"
                      value={form.vat_number}
                      onChange={(e) => setField("vat_number", e.target.value)}
                      placeholder="e.g. GB123456789"
                      className="
                        w-full rounded-lg border border-border bg-background
                        px-4 py-2.5 font-mono text-sm text-heading outline-none
                        transition-all placeholder:text-text-muted
                        focus:border-primary focus:ring-2 focus:ring-primary/10
                      "
                    />
                  </div>
                )}

                {/* UTR (both) */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    UTR Number
                  </label>
                  <input
                    type="text"
                    value={form.utr_number}
                    onChange={(e) => setField("utr_number", e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="
                      w-full rounded-lg border border-border bg-background
                      px-4 py-2.5 font-mono text-sm text-heading outline-none
                      transition-all placeholder:text-text-muted
                      focus:border-primary focus:ring-2 focus:ring-primary/10
                    "
                  />
                </div>

                {/* Contact: email + phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="e.g. info@example.co.uk"
                      className="
                        w-full rounded-lg border border-border bg-background
                        px-4 py-2.5 text-sm text-heading outline-none
                        transition-all placeholder:text-text-muted
                        focus:border-primary focus:ring-2 focus:ring-primary/10
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="e.g. +44 20 1234 5678"
                      className="
                        w-full rounded-lg border border-border bg-background
                        px-4 py-2.5 text-sm text-heading outline-none
                        transition-all placeholder:text-text-muted
                        focus:border-primary focus:ring-2 focus:ring-primary/10
                      "
                    />
                  </div>
                </div>

                {/* Address section */}
                <div className="rounded-xl border border-border-light bg-background-soft p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" strokeWidth={2.2} />
                    <p className="text-xs font-bold text-heading">Address</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-heading">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        value={form.address_line_1}
                        onChange={(e) =>
                          setField("address_line_1", e.target.value)
                        }
                        placeholder="e.g. 10 High Street"
                        className="
                          w-full rounded-lg border border-border bg-background
                          px-4 py-2.5 text-sm text-heading outline-none
                          transition-all placeholder:text-text-muted
                          focus:border-primary focus:ring-2 focus:ring-primary/10
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-heading">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={form.address_line_2}
                        onChange={(e) =>
                          setField("address_line_2", e.target.value)
                        }
                        placeholder="Optional"
                        className="
                          w-full rounded-lg border border-border bg-background
                          px-4 py-2.5 text-sm text-heading outline-none
                          transition-all placeholder:text-text-muted
                          focus:border-primary focus:ring-2 focus:ring-primary/10
                        "
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-heading">
                          City
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => setField("city", e.target.value)}
                          placeholder="e.g. London"
                          className="
                            w-full rounded-lg border border-border bg-background
                            px-4 py-2.5 text-sm text-heading outline-none
                            transition-all placeholder:text-text-muted
                            focus:border-primary focus:ring-2 focus:ring-primary/10
                          "
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-heading">
                          County
                        </label>
                        <input
                          type="text"
                          value={form.county}
                          onChange={(e) => setField("county", e.target.value)}
                          placeholder="Optional"
                          className="
                            w-full rounded-lg border border-border bg-background
                            px-4 py-2.5 text-sm text-heading outline-none
                            transition-all placeholder:text-text-muted
                            focus:border-primary focus:ring-2 focus:ring-primary/10
                          "
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold text-heading">
                          Postcode
                        </label>
                        <input
                          type="text"
                          value={form.postcode}
                          onChange={(e) => setField("postcode", e.target.value)}
                          placeholder="e.g. SW1A 1AA"
                          className="
                            w-full rounded-lg border border-border bg-background
                            px-4 py-2.5 text-sm text-heading outline-none
                            transition-all placeholder:text-text-muted
                            focus:border-primary focus:ring-2 focus:ring-primary/10
                          "
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold text-heading">
                        Country
                      </label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => setField("country", e.target.value)}
                        placeholder="e.g. United Kingdom"
                        className="
                          w-full rounded-lg border border-border bg-background
                          px-4 py-2.5 text-sm text-heading outline-none
                          transition-all placeholder:text-text-muted
                          focus:border-primary focus:ring-2 focus:ring-primary/10
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STATUS_OPTIONS.map((opt) => {
                      const isSelected = form.status === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setField("status", opt.value)}
                          className={`
                            flex items-center justify-center gap-2 rounded-lg
                            border px-3 py-2.5 text-sm font-semibold
                            transition-all duration-200
                            ${
                              isSelected
                                ? opt.value === "active"
                                  ? "border-success/30 bg-success-light text-success"
                                  : "border-danger/30 bg-danger-light text-danger"
                                : "border-border bg-background text-text hover:border-primary/40"
                            }
                          `}
                        >
                          {opt.value === "active" ? (
                            <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                          ) : (
                            <XCircle className="h-4 w-4" strokeWidth={2.2} />
                          )}
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Notes
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    rows={3}
                    placeholder="Optional internal notes..."
                    className="
                      w-full resize-none rounded-lg border border-border
                      bg-background px-4 py-2.5 text-sm text-heading
                      outline-none transition-all placeholder:text-text-muted
                      focus:border-primary focus:ring-2 focus:ring-primary/10
                    "
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-border-light bg-background-soft px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="
                  inline-flex items-center justify-center rounded-lg border
                  border-border bg-background px-5 py-2.5 text-xs font-semibold
                  text-heading transition-all hover:border-primary
                  hover:text-primary disabled:opacity-60
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="
                  inline-flex items-center justify-center gap-2 rounded-lg
                  bg-primary px-5 py-2.5 text-xs font-bold text-text-white
                  shadow-button transition-all hover:bg-primary-hover
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                {saving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>
                      {isEdit ? "Save Changes" : "Create Filing Subject"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   DELETE CONFIRM MODAL
============================================================ */

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  subject,
  shouldReduceMotion,
  premiumEase,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-secondary/50 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: 10 }
            }
            transition={{ duration: 0.35, ease: premiumEase }}
            onClick={(e) => e.stopPropagation()}
            className="
              fixed left-1/2 top-1/2 z-[210] w-[calc(100%-32px)]
              max-w-[440px] -translate-x-1/2 -translate-y-1/2
              overflow-hidden rounded-2xl border border-border
              bg-background shadow-card-hover
            "
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-danger via-danger/60 to-transparent" />

            <div className="p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-light">
                <AlertCircle
                  className="h-7 w-7 text-danger"
                  strokeWidth={2}
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-heading">
                Delete "{subject?.name}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This will permanently remove this filing subject. Any filings
                or submissions attached to it may be affected. This action
                cannot be undone.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border-light bg-background-soft px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={deleting}
                className="
                  inline-flex items-center justify-center rounded-lg border
                  border-border bg-background px-5 py-2.5 text-xs font-semibold
                  text-heading transition-all hover:border-primary
                  hover:text-primary disabled:opacity-60
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={deleting}
                className="
                  inline-flex items-center justify-center gap-2 rounded-lg
                  bg-danger px-5 py-2.5 text-xs font-bold text-text-white
                  transition-all hover:opacity-90 disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>Delete Filing Subject</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrgManageFillingSubject;