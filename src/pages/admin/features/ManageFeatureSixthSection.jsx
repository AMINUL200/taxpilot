import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
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
  LayoutTemplate,
  ListOrdered,
  Workflow,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_TITLE_OPTIONS = [
  { value: "Corporation Tax", label: "Corporation Tax" },
  { value: "Annual Accounts", label: "Annual Accounts" },
  { value: "MTD VAT", label: "MTD VAT" },
  { value: "Self Assessment", label: "Self Assessment" },
  { value: "Confirmation Statement", label: "Confirmation Statement" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50];

/* ============================================================
   MANAGE FEATURE SIXTH SECTION
============================================================ */

const ManageFeatureSixthSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(15);

  // Filters
  const [search, setSearch] = useState("");
  const [pageTitleFilter, setPageTitleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPageTitleDropdown, setShowPageTitleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH
  ============================================================ */

  const fetchItems = useCallback(
    async ({ isRefresh = false, page = currentPage } = {}) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          "/admin/website-content/feature-six-section",
          { params: { page } }
        );

        if (!response.data?.data) {
          throw new Error(
            response.data?.message || "Failed to load feature steps."
          );
        }

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const meta = response.data.meta || {};

        // Sort by step_count ascending so steps appear in order
        const sorted = [...data].sort(
          (a, b) => (a.step_count ?? 0) - (b.step_count ?? 0)
        );

        setItems(sorted);
        setCurrentPage(meta.current_page || 1);
        setLastPage(meta.last_page || 1);
        setTotal(meta.total || sorted.length);
        setPerPage(meta.per_page || 15);
      } catch (err) {
        console.error("Fetch feature sixth section error:", err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    fetchItems({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowPageTitleDropdown(false);
        setShowStatusDropdown(false);
        setShowPerPageDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        it.page_title?.toLowerCase().includes(query) ||
        it.section_title?.toLowerCase().includes(query) ||
        it.title?.toLowerCase().includes(query) ||
        it.description?.toLowerCase().includes(query);

      const matchesTitle =
        pageTitleFilter === "all" || it.page_title === pageTitleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && it.is_active) ||
        (statusFilter === "inactive" && !it.is_active);

      return matchesSearch && matchesTitle && matchesStatus;
    });
  }, [items, search, pageTitleFilter, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const active = items.filter((i) => i.is_active).length;
    const inactive = items.length - active;
    const maxStep = items.reduce(
      (max, i) => Math.max(max, Number(i.step_count) || 0),
      0
    );

    return [
      {
        id: "total",
        label: "Total Steps",
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
        id: "maxStep",
        label: "Highest Step #",
        value: maxStep,
        icon: ListOrdered,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [items, total]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingItem(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSaveItem = async (payload) => {
    if (editingItem) {
      const response = await api.put(
        `/admin/website-content/feature-six-section/${editingItem.id}`,
        payload
      );

      if (!response.data?.success && !response.data?.data) {
        throw new Error(response.data?.message || "Failed to update.");
      }

      await fetchItems({ isRefresh: true, page: currentPage });
    } else {
      const response = await api.post(
        "/admin/website-content/feature-six-section",
        payload
      );

      if (!response.data?.success && !response.data?.data) {
        throw new Error(response.data?.message || "Failed to create.");
      }

      await fetchItems({ isRefresh: true, page: 1 });
    }

    setShowFormModal(false);
    setEditingItem(null);
  };

  /* ============================================================
     DELETE
  ============================================================ */

  const openDeleteModal = (item) => {
    setDeletingItem(item);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    await api.delete(
      `/admin/website-content/feature-six-section/${deletingItem.id}`
    );

    if (items.length === 1 && currentPage > 1) {
      await fetchItems({ isRefresh: true, page: currentPage - 1 });
    } else {
      await fetchItems({ isRefresh: true, page: currentPage });
    }

    setShowDeleteModal(false);
    setDeletingItem(null);
  };

  /* ============================================================
     PAGINATION
  ============================================================ */

  const goToPage = (page) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    fetchItems({ page });
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

  const clearFilters = () => {
    setSearch("");
    setPageTitleFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    search || pageTitleFilter !== "all" || statusFilter !== "all";

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
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
            <Workflow className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Feature Sixth Section
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage "How it works" step-by-step sections
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              fetchItems({ isRefresh: true, page: currentPage })
            }
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
            <span>Add Step</span>
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
              placeholder="Search by title, description or page..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Page Title Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowPageTitleDropdown((p) => !p);
                setShowStatusDropdown(false);
                setShowPerPageDropdown(false);
              }}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span className="truncate max-w-[160px]">
                {pageTitleFilter === "all"
                  ? "All Page Titles"
                  : pageTitleFilter}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
                  showPageTitleDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showPageTitleDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className="
                    absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden
                    rounded-xl border border-border bg-background
                    shadow-card-hover
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setPageTitleFilter("all");
                      setShowPageTitleDropdown(false);
                    }}
                    className={`
                      flex w-full items-center justify-between px-4 py-2.5
                      text-left text-sm transition-colors hover:bg-primary-light
                      ${
                        pageTitleFilter === "all"
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>All Page Titles</span>
                    {pageTitleFilter === "all" && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>

                  {PAGE_TITLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setPageTitleFilter(opt.value);
                        setShowPageTitleDropdown(false);
                      }}
                      className={`
                        flex w-full items-center justify-between px-4 py-2.5
                        text-left text-sm transition-colors hover:bg-primary-light
                        ${
                          pageTitleFilter === opt.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span>{opt.label}</span>
                      {pageTitleFilter === opt.value && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((p) => !p);
                setShowPageTitleDropdown(false);
                setShowPerPageDropdown(false);
              }}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span>
                {STATUS_OPTIONS.find((s) => s.value === statusFilter)?.label}
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
                  {STATUS_OPTIONS.map((opt) => (
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
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Per Page */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowPerPageDropdown((p) => !p);
                setShowPageTitleDropdown(false);
                setShowStatusDropdown(false);
              }}
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
            <Workflow className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              All Feature Steps
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredItems.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredItems.length} of {items.length} on this page · {total}{" "}
            total
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading steps...
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
                    Step
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Page Title
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Section
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Updated
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-light">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition-colors hover:bg-background-soft"
                  >
                    {/* Step */}
                    <td className="px-5 py-4 max-w-[360px]">
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            flex h-10 w-10 shrink-0 items-center justify-center
                            rounded-full bg-primary-light text-sm font-bold
                            text-primary
                          "
                        >
                          {item.step_count ?? "—"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-heading line-clamp-1">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-text-muted line-clamp-2">
                            {item.description || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Page Title */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-info-light px-2.5 py-1 text-[10px] font-bold text-info w-fit">
                          <LayoutTemplate
                            className="h-3 w-3"
                            strokeWidth={2.4}
                          />
                          {item.page_title}
                        </span>
                        <code className="font-mono text-[10px] text-text-muted">
                          {item.slug}
                        </code>
                      </div>
                    </td>

                    {/* Section */}
                    <td className="px-5 py-4 max-w-[220px]">
                      <p className="text-xs font-semibold text-heading line-clamp-1">
                        {item.section_title || "—"}
                      </p>
                      <p className="mt-0.5 text-[10px] text-text-muted line-clamp-2">
                        {item.section_description || "—"}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-2.5 py-1 text-[10px] font-bold text-success">
                          <span className="h-1.5 w-1.5 rounded-full bg-success" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-light px-2.5 py-1 text-[10px] font-bold text-danger">
                          <span className="h-1.5 w-1.5 rounded-full bg-danger" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-text-secondary">
                        {formatDate(item.updated_at)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="relative px-5 py-4 text-right">
                      <div className="relative inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
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
                                openRowMenu === item.id ? null : item.id
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
                            {openRowMenu === item.id && (
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
                                  onClick={() => openEditModal(item)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigator.clipboard?.writeText(
                                      String(item.id)
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
                                  onClick={() => openDeleteModal(item)}
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && (
          <div className="divide-y divide-border-light lg:hidden">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                    {item.step_count ?? "—"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-heading line-clamp-2">
                          {item.title}
                        </p>
                        <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                          {item.slug}
                        </code>
                      </div>
                      {item.is_active ? (
                        <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-[9px] font-bold text-success">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-danger-light px-2 py-0.5 text-[9px] font-bold text-danger">
                          Inactive
                        </span>
                      )}
                    </div>

                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-info-light px-2 py-0.5 text-[10px] font-bold text-info">
                      <LayoutTemplate className="h-2.5 w-2.5" />
                      {item.page_title}
                    </span>

                    {item.section_title && (
                      <p className="mt-2 text-[11px] font-semibold text-heading line-clamp-1">
                        {item.section_title}
                      </p>
                    )}

                    <p className="mt-1 text-[11px] text-text-muted line-clamp-2">
                      {item.description || "—"}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
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
                        onClick={() => openDeleteModal(item)}
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
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No steps found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by adding your first step."}
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
                Add Step
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
                Prev
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
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      <FeatureSixthSectionFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        item={editingItem}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
        existingItems={items}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingItem(null);
        }}
        onConfirm={handleConfirmDelete}
        item={deletingItem}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   FEATURE SIXTH SECTION FORM MODAL
============================================================ */

const FeatureSixthSectionFormModal = ({
  isOpen,
  onClose,
  onSave,
  item,
  shouldReduceMotion,
  premiumEase,
  existingItems = [],
}) => {
  const isEdit = Boolean(item);

  const EMPTY_FORM = {
    page_title: "Corporation Tax",
    section_title: "",
    section_description: "",
    step_count: 1,
    title: "",
    description: "",
    is_active: true,
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    if (item) {
      setForm({
        page_title: item.page_title || "Corporation Tax",
        section_title: item.section_title || "",
        section_description: item.section_description || "",
        step_count: item.step_count ?? 1,
        title: item.title || "",
        description: item.description || "",
        is_active: item.is_active ?? true,
      });
    } else {
      // Auto-suggest next step based on existing steps for the chosen page
      const samePageSteps = existingItems
        .filter((it) => it.page_title === EMPTY_FORM.page_title)
        .map((it) => Number(it.step_count) || 0);
      const nextStep =
        samePageSteps.length > 0 ? Math.max(...samePageSteps) + 1 : 1;

      setForm({
        ...EMPTY_FORM,
        step_count: nextStep,
      });
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, item, existingItems]);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /**
   * When the page_title changes, suggest the next step_count for that page.
   * Only auto-bump if we're on create, or if editing and the step number
   * hasn't been manually changed from the previous page's max.
   */
  const handlePageTitleChange = (value) => {
    setForm((prev) => {
      const samePageSteps = existingItems
        .filter(
          (it) => it.page_title === value && it.id !== item?.id
        )
        .map((it) => Number(it.step_count) || 0);
      const nextStep =
        samePageSteps.length > 0 ? Math.max(...samePageSteps) + 1 : 1;

      return {
        ...prev,
        page_title: value,
        step_count: isEdit ? prev.step_count : nextStep,
      };
    });
  };

  const validate = () => {
    const next = {};
    if (!form.page_title?.trim()) next.page_title = "Page title is required.";
    if (!form.section_title.trim())
      next.section_title = "Section title is required.";
    if (!form.title.trim()) next.title = "Step title is required.";
    if (
      form.step_count === "" ||
      Number.isNaN(Number(form.step_count)) ||
      Number(form.step_count) < 1
    ) {
      next.step_count = "Step number must be 1 or greater.";
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
        page_title: form.page_title.trim(),
        section_title: form.section_title.trim(),
        section_description: form.section_description.trim(),
        step_count: Number(form.step_count) || 1,
        title: form.title.trim(),
        description: form.description.trim(),
        is_active: form.is_active,
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message || err.message || "Failed to save."
      );
    } finally {
      setSaving(false);
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
              fixed left-1/2 top-1/2 z-[210] flex max-h-[92vh]
              w-[calc(100%-32px)] max-w-[720px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Workflow
                    className="h-5 w-5 text-primary"
                    strokeWidth={2.2}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {isEdit ? "Edit Feature Step" : "New Feature Step"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update this step's details."
                      : "Add a new step to the 'How it works' section."}
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

              <div className="space-y-6">
                {/* PAGE */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Page
                  </h4>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Page Title <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.page_title}
                        onChange={(e) =>
                          handlePageTitleChange(e.target.value)
                        }
                        className={`
                          w-full cursor-pointer appearance-none rounded-lg
                          border bg-background px-4 py-2.5 pr-10 text-sm
                          text-heading outline-none transition-all
                          focus:ring-2 focus:ring-primary/10
                          ${
                            errors.page_title
                              ? "border-danger focus:border-danger"
                              : "border-border focus:border-primary"
                          }
                        `}
                      >
                        {PAGE_TITLE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                    {errors.page_title && (
                      <p className="mt-1.5 text-[11px] font-medium text-danger">
                        {errors.page_title}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECTION HEADER (shared across steps) */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Section header
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Section Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.section_title}
                        onChange={(e) =>
                          setField("section_title", e.target.value)
                        }
                        placeholder="e.g. How it works"
                        className={`
                          w-full rounded-lg border bg-background px-4 py-2.5
                          text-sm text-heading outline-none transition-all
                          placeholder:text-text-muted focus:ring-2
                          focus:ring-primary/10
                          ${
                            errors.section_title
                              ? "border-danger focus:border-danger"
                              : "border-border focus:border-primary"
                          }
                        `}
                      />
                      {errors.section_title && (
                        <p className="mt-1.5 text-[11px] font-medium text-danger">
                          {errors.section_title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Section Description
                      </label>
                      <textarea
                        value={form.section_description}
                        onChange={(e) =>
                          setField("section_description", e.target.value)
                        }
                        rows={2}
                        placeholder="e.g. Complete your filing in a few simple steps."
                        className="
                          w-full resize-none rounded-lg border border-border
                          bg-background px-4 py-2.5 text-sm text-heading
                          outline-none transition-all placeholder:text-text-muted
                          focus:border-primary focus:ring-2 focus:ring-primary/10
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* STEP */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Step details
                  </h4>

                  <div className="space-y-4">
                    {/* Step number + title */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[120px_1fr]">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-heading">
                          Step #{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={form.step_count}
                          onChange={(e) =>
                            setField("step_count", e.target.value)
                          }
                          className={`
                            w-full rounded-lg border bg-background px-4 py-2.5
                            text-sm text-heading outline-none transition-all
                            placeholder:text-text-muted focus:ring-2
                            focus:ring-primary/10
                            ${
                              errors.step_count
                                ? "border-danger focus:border-danger"
                                : "border-border focus:border-primary"
                            }
                          `}
                        />
                        {errors.step_count && (
                          <p className="mt-1.5 text-[11px] font-medium text-danger">
                            {errors.step_count}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-heading">
                          Step Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.title}
                          onChange={(e) => setField("title", e.target.value)}
                          placeholder="e.g. Enter your company details"
                          className={`
                            w-full rounded-lg border bg-background px-4 py-2.5
                            text-sm text-heading outline-none transition-all
                            placeholder:text-text-muted focus:ring-2
                            focus:ring-primary/10
                            ${
                              errors.title
                                ? "border-danger focus:border-danger"
                                : "border-border focus:border-primary"
                            }
                          `}
                        />
                        {errors.title && (
                          <p className="mt-1.5 text-[11px] font-medium text-danger">
                            {errors.title}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Step Description
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) =>
                          setField("description", e.target.value)
                        }
                        rows={3}
                        placeholder="e.g. Provide your company information to get started."
                        className="
                          w-full resize-none rounded-lg border border-border
                          bg-background px-4 py-2.5 text-sm text-heading
                          outline-none transition-all placeholder:text-text-muted
                          focus:border-primary focus:ring-2 focus:ring-primary/10
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* STATUS */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setField("is_active", !form.is_active)}
                    className={`
                      group flex w-full items-center justify-between gap-3
                      rounded-lg border bg-background px-4 py-2.5 text-sm
                      transition-colors duration-200
                      ${
                        form.is_active
                          ? "border-success/30 hover:border-success/50"
                          : "border-border hover:border-text-muted/40"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-xs font-semibold transition-colors duration-200
                        ${
                          form.is_active ? "text-success" : "text-text-muted"
                        }
                      `}
                    >
                      {form.is_active ? "Active" : "Inactive"}
                    </span>

                    <span
                      className={`
                        relative inline-flex h-5 w-9 shrink-0 items-center
                        rounded-full transition-colors duration-300 ease-in-out
                        ${form.is_active ? "bg-success" : "bg-border"}
                      `}
                    >
                      <motion.span
                        layout
                        transition={{
                          type: "spring",
                          stiffness: 700,
                          damping: 30,
                        }}
                        className={`
                          absolute top-0.5 h-4 w-4 rounded-full bg-white
                          shadow-[0_1px_3px_rgba(0,0,0,0.15)]
                          ${form.is_active ? "right-0.5" : "left-0.5"}
                        `}
                      />
                    </span>
                  </button>
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
                    <span>{isEdit ? "Save Changes" : "Create Step"}</span>
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
  item,
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
                Delete step "{item?.title}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Step #{item?.step_count ?? "—"} will be permanently removed
                from "{item?.section_title || "this section"}". This action
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
                    <span>Delete Step</span>
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

export default ManageFeatureSixthSection;