import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Layers,
  Hash,
  Inbox,
  ArrowLeft,
  FileText,
  Briefcase,
  Landmark,
  ShieldCheck,
  Building2,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50];

const CATEGORY_STYLES = {
  tax: {
    bg: "bg-primary-light",
    text: "text-primary",
    icon: Landmark,
  },
  companies_house: {
    bg: "bg-info-light",
    text: "text-info",
    icon: Building2,
  },
  vat: {
    bg: "bg-warning-light",
    text: "text-warning",
    icon: FileText,
  },
  payroll: {
    bg: "bg-success-light",
    text: "text-success",
    icon: Briefcase,
  },
  accounts: {
    bg: "bg-background-soft",
    text: "text-text-secondary",
    icon: FileText,
  },
  other: {
    bg: "bg-background-soft",
    text: "text-text-muted",
    icon: FileText,
  },
};

const AUTHORITY_STYLES = {
  hmrc: {
    bg: "bg-primary-light",
    text: "text-primary",
    label: "HMRC",
    icon: ShieldCheck,
  },
  companies_house: {
    bg: "bg-info-light",
    text: "text-info",
    label: "Companies House",
    icon: Building2,
  },
  other: {
    bg: "bg-background-soft",
    text: "text-text-muted",
    label: "Other",
    icon: FileText,
  },
};

/* ============================================================
   SHARED HELPERS — MODULE SCOPE
   (Available to ManageSubscriptionFillingTypeAssign AND all modals)
============================================================ */

const getCategoryStyles = (category) =>
  CATEGORY_STYLES[category] || CATEGORY_STYLES.other;

const getAuthorityStyles = (authority) =>
  AUTHORITY_STYLES[authority] || AUTHORITY_STYLES.other;

/* ============================================================
   MANAGE SUBSCRIPTION FILING TYPE ASSIGN
============================================================ */

const ManageSubscriptionFillingTypeAssign = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [assignments, setAssignments] = useState([]);
  const [availableFilingTypes, setAvailableFilingTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  // Filters
  const [search, setSearch] = useState("");

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH ASSIGNMENTS
  ============================================================ */

  const fetchAssignments = useCallback(
    async ({ isRefresh = false, page = currentPage } = {}) => {
      if (!planId) {
        setError("Missing plan ID. Please navigate from a subscription plan.");
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/admin/subscription-plans/${planId}/filing-types`,
          { params: { page } }
        );

        if (!response.data?.data) {
          throw new Error(
            response.data?.message || "Failed to load filing type assignments."
          );
        }

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const meta = response.data.meta || {};

        setAssignments(data);
        setCurrentPage(meta.current_page || 1);
        setLastPage(meta.last_page || 1);
        setTotal(meta.total || data.length);
        setPerPage(meta.per_page || 15);
      } catch (err) {
        console.error("Fetch plan filing types error:", err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [planId, currentPage]
  );

  /* ============================================================
     FETCH AVAILABLE FILING TYPES (for dropdown)
  ============================================================ */

  const fetchAvailableFilingTypes = useCallback(async () => {
    try {
      const response = await api.get("/filing-types");
      if (!response.data?.success) return;

      const data = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      const sorted = [...data].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      );
      setAvailableFilingTypes(sorted);
    } catch (err) {
      console.error("Fetch filing types error:", err);
    }
  }, []);

  useEffect(() => {
    fetchAssignments({ page: 1 });
    fetchAvailableFilingTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowPerPageDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredAssignments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return assignments;

    return assignments.filter(
      (a) =>
        a.filing_type?.name?.toLowerCase().includes(query) ||
        a.filing_type?.slug?.toLowerCase().includes(query) ||
        a.filing_type?.category?.toLowerCase().includes(query) ||
        a.filing_type?.authority?.toLowerCase().includes(query)
    );
  }, [assignments, search]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const uniqueCategories = new Set(
      assignments.map((a) => a.filing_type?.category).filter(Boolean)
    ).size;
    const uniqueAuthorities = new Set(
      assignments.map((a) => a.filing_type?.authority).filter(Boolean)
    ).size;

    return [
      {
        id: "total",
        label: "Assigned Types",
        value: total,
        icon: Layers,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      },
      {
        id: "categories",
        label: "Categories",
        value: uniqueCategories,
        icon: FileText,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
      {
        id: "authorities",
        label: "Authorities",
        value: uniqueAuthorities,
        icon: ShieldCheck,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "available",
        label: "Available to Add",
        value: availableFilingTypes.length,
        icon: Plus,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
      },
    ];
  }, [assignments, total, availableFilingTypes]);

  /* ============================================================
     HELPERS — getCategoryStyles / getAuthorityStyles
     are now at module scope, not inside this component
  ============================================================ */

  /* Compute which filing types are NOT yet assigned (for the dropdown) */
  const unassignedFilingTypes = useMemo(() => {
    const assignedIds = new Set(
      assignments.map((a) => Number(a.filing_type_id))
    );
    return availableFilingTypes.filter(
      (ft) => !assignedIds.has(Number(ft.id))
    );
  }, [assignments, availableFilingTypes]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingAssignment(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSaveAssignment = async (payload) => {
    if (!planId) {
      throw new Error("Missing plan ID.");
    }

    if (editingAssignment) {
      const response = await api.put(
        `/admin/subscription-plans/${planId}/filing-types/${editingAssignment.id}`,
        payload
      );

      if (!response.data?.data && !response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to update filing type."
        );
      }

      await fetchAssignments({ isRefresh: true, page: currentPage });
    } else {
      const response = await api.post(
        `/admin/subscription-plans/${planId}/filing-types`,
        payload
      );

      if (!response.data?.data && !response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to assign filing type."
        );
      }

      await fetchAssignments({ isRefresh: true, page: 1 });
    }

    setShowFormModal(false);
    setEditingAssignment(null);
  };

  /* ============================================================
     DELETE
  ============================================================ */

  const openDeleteModal = (assignment) => {
    setDeletingAssignment(assignment);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingAssignment || !planId) return;

    await api.delete(
      `/admin/subscription-plans/${planId}/filing-types/${deletingAssignment.id}`
    );

    if (assignments.length === 1 && currentPage > 1) {
      await fetchAssignments({ isRefresh: true, page: currentPage - 1 });
    } else {
      await fetchAssignments({ isRefresh: true, page: currentPage });
    }

    setShowDeleteModal(false);
    setDeletingAssignment(null);
  };

  /* ============================================================
     PAGINATION
  ============================================================ */

  const goToPage = (page) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    fetchAssignments({ page });
  };

  const pageNumbers = useMemo(() => {
    const pages = [];
    const totalPages = lastPage;
    const current = currentPage;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let start = Math.max(1, current - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [currentPage, lastPage]);

  /* ============================================================
     DATE FORMAT
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

  const clearFilters = () => {
    setSearch("");
  };

  const hasActiveFilters = Boolean(search);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
              border border-border bg-background text-text-muted
              transition-all duration-200 hover:border-primary hover:text-primary
            "
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Filing Types
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage filing types assigned to plan{" "}
              <span className="font-mono font-bold text-heading">
                #{planId || "—"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              fetchAssignments({ isRefresh: true, page: currentPage });
              fetchAvailableFilingTypes();
            }}
            disabled={refreshing || !planId}
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
            disabled={!planId}
            className="
              inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5
              text-sm font-semibold text-text-white shadow-button
              transition-all duration-200 hover:bg-primary-hover
              hover:-translate-y-0.5 disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
            <span>Assign Filing Type</span>
          </button>
        </div>
      </div>

      {/* MISSING PLAN ID WARNING */}
      {!planId && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-warning-light bg-warning-light px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div className="flex-1">
            <p className="text-xs font-bold text-heading">No plan selected</p>
            <p className="mt-0.5 text-[11px] text-text-secondary">
              Navigate here from a subscription plan to assign filing types.
            </p>
          </div>
        </motion.div>
      )}

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

      {/* ERROR */}
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
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search filing types by name, slug, category or authority..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Per Page */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => setShowPerPageDropdown((p) => !p)}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span>{perPage} / page</span>
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform ${
                  showPerPageDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showPerPageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className="
                    absolute right-0 top-full z-30 mt-2 w-32 overflow-hidden
                    rounded-xl border border-border bg-background
                    shadow-card-hover
                  "
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setPerPage(size);
                        setShowPerPageDropdown(false);
                      }}
                      className={`
                        flex w-full items-center justify-between px-4 py-2.5
                        text-left text-sm transition-colors hover:bg-primary-light
                        ${
                          perPage === size
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span>{size} / page</span>
                      {perPage === size && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
        <div className="flex flex-col gap-2 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              Assigned Filing Types
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredAssignments.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredAssignments.length} of {assignments.length} on this page ·{" "}
            {total} total
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading filing types...
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && (
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-border-light bg-background-soft">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Filing Type
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Slug
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Category
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Authority
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Assigned
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-light">
                {filteredAssignments.map((assignment) => {
                  const ft = assignment.filing_type;
                  const catStyle = getCategoryStyles(ft?.category);
                  const authStyle = getAuthorityStyles(ft?.authority);
                  const CatIcon = catStyle.icon;
                  const AuthIcon = authStyle.icon;

                  return (
                    <tr
                      key={assignment.id}
                      className="group transition-colors hover:bg-background-soft"
                    >
                      {/* Filing Type */}
                      <td className="px-5 py-4 max-w-[360px]">
                        <div className="flex items-start gap-3">
                          <div
                            className={`
                              flex h-10 w-10 shrink-0 items-center justify-center
                              rounded-lg ${catStyle.bg}
                            `}
                          >
                            <CatIcon
                              className={`h-4 w-4 ${catStyle.text}`}
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-heading line-clamp-1">
                              {ft?.name || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-5 py-4">
                        <code className="rounded-md bg-background-soft px-2 py-1 font-mono text-[11px] text-text-secondary">
                          {ft?.slug || "—"}
                        </code>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        {ft?.category ? (
                          <span
                            className={`
                              inline-flex items-center gap-1.5 rounded-full
                              px-2.5 py-1 text-[10px] font-bold
                              ${catStyle.bg} ${catStyle.text}
                            `}
                          >
                            <CatIcon className="h-3 w-3" strokeWidth={2.4} />
                            {ft.category}
                          </span>
                        ) : (
                          <span className="text-[11px] text-text-muted">—</span>
                        )}
                      </td>

                      {/* Authority */}
                      <td className="px-5 py-4">
                        {ft?.authority ? (
                          <span
                            className={`
                              inline-flex items-center gap-1.5 rounded-full
                              px-2.5 py-1 text-[10px] font-bold
                              ${authStyle.bg} ${authStyle.text}
                            `}
                          >
                            <AuthIcon className="h-3 w-3" strokeWidth={2.4} />
                            {authStyle.label}
                          </span>
                        ) : (
                          <span className="text-[11px] text-text-muted">—</span>
                        )}
                      </td>

                      {/* Assigned date */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-text-secondary">
                          {formatDate(assignment.created_at)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="relative px-5 py-4 text-right">
                        <div className="relative inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(assignment)}
                            className="
                              inline-flex items-center gap-1 rounded-lg border
                              border-border bg-background px-3 py-1.5
                              text-[11px] font-semibold text-heading
                              transition-all duration-200 hover:border-primary
                              hover:bg-primary-light hover:text-primary
                            "
                          >
                            <Edit3 className="h-3 w-3" strokeWidth={2.4} />
                            <span>Change</span>
                          </button>

                          <div className="relative" data-row-menu>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenRowMenu(
                                  openRowMenu === assignment.id
                                    ? null
                                    : assignment.id
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
                              {openRowMenu === assignment.id && (
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
                                    onClick={() => openEditModal(assignment)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    <span>Change Filing Type</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigator.clipboard?.writeText(
                                        String(assignment.id)
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
                                    onClick={() =>
                                      openDeleteModal(assignment)
                                    }
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-danger transition-colors hover:bg-danger-light"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span>Remove</span>
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
            {filteredAssignments.map((assignment) => {
              const ft = assignment.filing_type;
              const catStyle = getCategoryStyles(ft?.category);
              const authStyle = getAuthorityStyles(ft?.authority);
              const CatIcon = catStyle.icon;
              const AuthIcon = authStyle.icon;

              return (
                <div key={assignment.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-lg ${catStyle.bg}
                      `}
                    >
                      <CatIcon
                        className={`h-5 w-5 ${catStyle.text}`}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-heading">
                        {ft?.name || "—"}
                      </p>
                      <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                        {ft?.slug || "—"}
                      </code>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {ft?.category && (
                          <span
                            className={`
                              inline-flex items-center gap-1 rounded-full
                              px-2 py-0.5 text-[9px] font-bold
                              ${catStyle.bg} ${catStyle.text}
                            `}
                          >
                            <CatIcon className="h-2.5 w-2.5" />
                            {ft.category}
                          </span>
                        )}
                        {ft?.authority && (
                          <span
                            className={`
                              inline-flex items-center gap-1 rounded-full
                              px-2 py-0.5 text-[9px] font-bold
                              ${authStyle.bg} ${authStyle.text}
                            `}
                          >
                            <AuthIcon className="h-2.5 w-2.5" />
                            {authStyle.label}
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-[10px] text-text-muted">
                        Assigned {formatDate(assignment.created_at)}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(assignment)}
                          className="
                            inline-flex flex-1 items-center justify-center gap-1.5
                            rounded-lg border border-border bg-background px-3
                            py-2 text-[11px] font-semibold text-heading
                            transition-all hover:border-primary hover:text-primary
                          "
                        >
                          <Edit3 className="h-3 w-3" />
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(assignment)}
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
        {!loading && filteredAssignments.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No filing types assigned
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search."
                : "Assign filing types to make them available for this plan."}
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
                Assign Filing Type
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && lastPage > 1 && (
          <div className="flex flex-col items-center gap-3 border-t border-border-light bg-background-soft px-5 py-4 sm:flex-row sm:justify-between">
            <p className="text-[11px] text-text-muted">
              Page{" "}
              <span className="font-bold text-heading">{currentPage}</span> of{" "}
              <span className="font-bold text-heading">{lastPage}</span>
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                  flex h-8 items-center justify-center gap-1 rounded-lg border
                  border-border bg-background px-3 text-[11px] font-semibold
                  text-heading transition-all hover:border-primary
                  hover:text-primary disabled:cursor-not-allowed
                  disabled:opacity-40 disabled:hover:border-border
                  disabled:hover:text-heading
                "
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-lg border
                    text-[11px] font-semibold transition-all
                    ${
                      page === currentPage
                        ? "border-primary bg-primary text-text-white shadow-button"
                        : "border-border bg-background text-heading hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="
                  flex h-8 items-center justify-center gap-1 rounded-lg border
                  border-border bg-background px-3 text-[11px] font-semibold
                  text-heading transition-all hover:border-primary
                  hover:text-primary disabled:cursor-not-allowed
                  disabled:opacity-40 disabled:hover:border-border
                  disabled:hover:text-heading
                "
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      <AssignFilingTypeModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingAssignment(null);
        }}
        onSave={handleSaveAssignment}
        assignment={editingAssignment}
        availableFilingTypes={availableFilingTypes}
        unassignedFilingTypes={unassignedFilingTypes}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingAssignment(null);
        }}
        onConfirm={handleConfirmDelete}
        assignment={deletingAssignment}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   ASSIGN FILING TYPE MODAL
============================================================ */

const AssignFilingTypeModal = ({
  isOpen,
  onClose,
  onSave,
  assignment,
  availableFilingTypes = [],
  unassignedFilingTypes = [],
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(assignment);

  const [form, setForm] = useState({
    filing_type_id: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  /* Build the list of options available in the dropdown */
  const options = useMemo(() => {
    if (isEdit && assignment?.filing_type) {
      const alreadyAssigned = assignment.filing_type;
      const others = unassignedFilingTypes.filter(
        (ft) => Number(ft.id) !== Number(alreadyAssigned.id)
      );
      return [alreadyAssigned, ...others];
    }
    return unassignedFilingTypes;
  }, [isEdit, assignment, unassignedFilingTypes]);

  /* Reset when opening */
  useEffect(() => {
    if (!isOpen) return;

    if (assignment) {
      setForm({
        filing_type_id:
          assignment.filing_type_id ?? assignment.filing_type?.id ?? "",
      });
    } else {
      setForm({
        filing_type_id: unassignedFilingTypes[0]?.id || "",
      });
    }

    setErrors({});
    setServerError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, assignment]);

  const validate = () => {
    const next = {};
    if (!form.filing_type_id) {
      next.filing_type_id = "Filing type is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setServerError(null);

    try {
      await onSave({
        filing_type_id: Number(form.filing_type_id),
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message || err.message || "Failed to save."
      );
    } finally {
      setSaving(false);
    }
  };

  const noOptionsAvailable = options.length === 0 && !isEdit;

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
              shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }
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
              w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  {isEdit ? (
                    <Edit3 className="h-5 w-5 text-primary" strokeWidth={2.2} />
                  ) : (
                    <Plus className="h-5 w-5 text-primary" strokeWidth={2.2} />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {isEdit ? "Change Filing Type" : "Assign Filing Type"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Replace this filing type with another one."
                      : "Add a filing type to this plan."}
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
                  <p className="whitespace-pre-line text-xs text-danger">
                    {serverError}
                  </p>
                </div>
              )}

              {noOptionsAvailable ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-warning-light">
                    <AlertCircle
                      className="h-7 w-7 text-warning"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="mt-4 text-sm font-bold text-heading">
                    All filing types assigned
                  </p>
                  <p className="mt-1 max-w-xs text-xs text-text-muted">
                    Every available filing type is already assigned to this
                    plan. Remove one first to add another.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Filing Type */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Filing Type <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.filing_type_id}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            filing_type_id: e.target.value,
                          }))
                        }
                        className={`
                          w-full cursor-pointer appearance-none rounded-lg
                          border bg-background px-4 py-2.5 pr-10 text-sm
                          text-heading outline-none transition-all
                          focus:ring-2 focus:ring-primary/10
                          ${
                            errors.filing_type_id
                              ? "border-danger focus:border-danger"
                              : "border-border focus:border-primary"
                          }
                        `}
                      >
                        <option value="">Select a filing type...</option>
                        {options.map((ft) => (
                          <option key={ft.id} value={ft.id}>
                            {ft.name} ({ft.slug})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                    {errors.filing_type_id && (
                      <p className="mt-1.5 text-[11px] font-medium text-danger">
                        {errors.filing_type_id}
                      </p>
                    )}
                    <p className="mt-1.5 text-[11px] text-text-muted">
                      {isEdit
                        ? "Selecting a different type will replace the current assignment."
                        : "Only filing types not already assigned are shown."}
                    </p>
                  </div>

                  {/* Preview of selected filing type */}
                  {form.filing_type_id && (
                    <div className="rounded-lg border border-border bg-background-soft p-4">
                      {(() => {
                        const selected = options.find(
                          (ft) => Number(ft.id) === Number(form.filing_type_id)
                        );
                        if (!selected) return null;
                        const catStyle = getCategoryStyles(selected.category);
                        const authStyle = getAuthorityStyles(
                          selected.authority
                        );
                        const CatIcon = catStyle.icon;
                        const AuthIcon = authStyle.icon;

                        return (
                          <>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                              Preview
                            </p>
                            <div className="mt-2 flex items-start gap-3">
                              <div
                                className={`
                                  flex h-10 w-10 shrink-0 items-center justify-center
                                  rounded-lg ${catStyle.bg}
                                `}
                              >
                                <CatIcon
                                  className={`h-4 w-4 ${catStyle.text}`}
                                  strokeWidth={2.2}
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-heading">
                                  {selected.name}
                                </p>
                                <code className="mt-0.5 inline-block font-mono text-[10px] text-text-muted">
                                  {selected.slug}
                                </code>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {selected.category && (
                                    <span
                                      className={`
                                        inline-flex items-center gap-1 rounded-full
                                        px-2 py-0.5 text-[9px] font-bold
                                        ${catStyle.bg} ${catStyle.text}
                                      `}
                                    >
                                      <CatIcon className="h-2.5 w-2.5" />
                                      {selected.category}
                                    </span>
                                  )}
                                  {selected.authority && (
                                    <span
                                      className={`
                                        inline-flex items-center gap-1 rounded-full
                                        px-2 py-0.5 text-[9px] font-bold
                                        ${authStyle.bg} ${authStyle.text}
                                      `}
                                    >
                                      <AuthIcon className="h-2.5 w-2.5" />
                                      {authStyle.label}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
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
                {noOptionsAvailable ? "Close" : "Cancel"}
              </button>
              {!noOptionsAvailable && (
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
                      <span>{isEdit ? "Save Changes" : "Assign"}</span>
                    </>
                  )}
                </button>
              )}
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
  assignment,
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
              shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }
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
                <AlertCircle className="h-7 w-7 text-danger" strokeWidth={2} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-heading">
                Remove "{assignment?.filing_type?.name}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This filing type will be unassigned from the plan. You can
                assign it again later. This action cannot be undone.
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
                    <span>Removing...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>Remove Filing Type</span>
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

export default ManageSubscriptionFillingTypeAssign;