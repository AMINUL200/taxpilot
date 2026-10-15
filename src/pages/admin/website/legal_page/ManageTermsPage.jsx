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
  Scale,
  Tag,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import api from "../../../../services/api";
import CustomTextEditor from "../../../../component/form/CustomTextEditor";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_NAME = "Terms"; // fixed for this page
const SLUG = "terms";

/* ============================================================
   HELPERS
============================================================ */

const stripHtml = (html) => {
  if (!html) return "";
  return String(html)
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

/* ============================================================
   MANAGE TERMS PAGE
============================================================ */

const ManageTermsPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH  →  GET /legal-pages/terms
  ============================================================ */

  const fetchTerms = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/legal-pages/${SLUG}`);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to load terms."
        );
      }

      const data = response.data.data || [];
      // Sort by is_order ascending
      const sorted = [...data].sort(
        (a, b) => (a.is_order ?? 0) - (b.is_order ?? 0)
      );
      setItems(sorted);
    } catch (err) {
      console.error("Fetch terms error:", err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowStatusDropdown(false);
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
      const cleanDesc = stripHtml(it.description).toLowerCase();
      const matchesSearch =
        !query ||
        it.title?.toLowerCase().includes(query) ||
        cleanDesc.includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && it.is_active) ||
        (statusFilter === "inactive" && !it.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */
  const stats = useMemo(() => {
    const total = items.length;
    const active = items.filter((i) => i.is_active).length;
    const inactive = total - active;
    const maxOrder = items.reduce(
      (max, i) => Math.max(max, Number(i.is_order) || 0),
      0
    );

    return [
      {
        id: "total",
        label: "Total Sections",
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
        id: "order",
        label: "Sections",
        value: maxOrder,
        icon: ArrowUpDown,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [items]);

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
      // PUT /admin/legal-pages/{id}
      const response = await api.put(
        `/admin/legal-pages/${editingItem.id}`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to update.");
      }

      await fetchTerms(true);
    } else {
      // POST /admin/legal-pages
      const response = await api.post("/admin/legal-pages", payload);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to create.");
      }

      await fetchTerms(true);
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

    await api.delete(`/admin/legal-pages/${deletingItem.id}`);
    await fetchTerms(true);

    setShowDeleteModal(false);
    setDeletingItem(null);
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
    setStatusFilter("all");
  };

  const hasActiveFilters = search || statusFilter !== "all";

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
            <Scale className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage sections that appear on the Terms &amp; Conditions page
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fetchTerms(true)}
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
            <span>Add Section</span>
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
              placeholder="Search sections by title or content..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Status */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => setShowStatusDropdown((p) => !p)}
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
                  : statusFilter === "active"
                  ? "Active"
                  : "Inactive"}
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
                  {[
                    { value: "all", label: "All Statuses" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ].map((opt) => (
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

      {/* LIST */}
      <div className="overflow-hidden rounded-xl border border-border-light bg-background shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              Terms &amp; Conditions Sections
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredItems.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredItems.length} of {items.length} sections
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading sections...
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
                    Order
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
                    <td className="px-5 py-4">
                      <span
                        className="
                          inline-flex h-8 w-8 items-center justify-center
                          rounded-lg bg-background-soft text-xs font-bold
                          text-text-secondary
                        "
                      >
                        {item.is_order ?? "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4 max-w-[520px]">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Scale
                            className="h-4 w-4 text-primary"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-heading line-clamp-1">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-text-muted line-clamp-2">
                            {stripHtml(item.description) || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

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

                    <td className="px-5 py-4">
                      <span className="text-xs text-text-secondary">
                        {formatDate(item.updated_at)}
                      </span>
                    </td>

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
                                  absolute right-0 top-full z-20 mt-1 w-52
                                  overflow-hidden rounded-lg border
                                  border-border bg-background py-1
                                  shadow-card-hover
                                "
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPreviewItem(item);
                                    setOpenRowMenu(null);
                                  }}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  <span>Preview</span>
                                </button>
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
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Scale
                      className="h-5 w-5 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-heading line-clamp-2">
                          {item.title}
                        </p>
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

                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-background-soft px-2 py-0.5 text-[10px] font-bold text-text-secondary">
                      <ArrowUpDown className="h-2.5 w-2.5" />
                      Order {item.is_order ?? "—"}
                    </span>

                    <p className="mt-2 text-[11px] text-text-muted line-clamp-3">
                      {stripHtml(item.description) || "—"}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="
                          inline-flex items-center justify-center gap-1.5
                          rounded-lg border border-border bg-background px-3
                          py-2 text-[11px] font-semibold text-heading
                          transition-all hover:border-primary hover:text-primary
                        "
                      >
                        <Eye className="h-3 w-3" />
                      </button>
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
              No sections found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by adding your first Terms section."}
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
                Add Section
              </button>
            )}
          </div>
        )}
      </div>

      {/* MODALS */}
      <SectionFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        item={editingItem}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
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

      <PreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   SECTION FORM MODAL  (Create / Edit)
============================================================ */

const SectionFormModal = ({
  isOpen,
  onClose,
  onSave,
  item,
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(item);

  const [form, setForm] = useState({
    title: "",
    description: "",
    is_order: 1,
    is_active: true,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    if (item) {
      setForm({
        title: item.title || "",
        description: item.description || "",
        is_order: item.is_order ?? 1,
        is_active: item.is_active ?? true,
      });
    } else {
      setForm({
        title: "",
        description: "",
        is_order: 1,
        is_active: true,
      });
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, item]);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!stripHtml(form.description))
      next.description = "Description is required.";
    if (form.is_order === "" || Number.isNaN(Number(form.is_order)))
      next.is_order = "Order is required.";
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
        page_name: PAGE_NAME, // fixed for this page
        title: form.title.trim(),
        description: form.description,
        is_order: Number(form.is_order) || 1,
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
              w-[calc(100%-32px)] max-w-[820px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Scale className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {isEdit ? "Edit Terms Section" : "New Terms Section"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update this section's content."
                      : "Add a new section to the Terms & Conditions page."}
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

              <div className="space-y-4">
                {/* Title + Order */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px]">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setField("title", e.target.value)}
                      placeholder="e.g. Introduction"
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

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Order <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={form.is_order}
                      onChange={(e) => setField("is_order", e.target.value)}
                      placeholder="1"
                      className={`
                        w-full rounded-lg border bg-background px-4 py-2.5
                        text-sm text-heading outline-none transition-all
                        placeholder:text-text-muted focus:ring-2
                        focus:ring-primary/10
                        ${
                          errors.is_order
                            ? "border-danger focus:border-danger"
                            : "border-border focus:border-primary"
                        }
                      `}
                    />
                    {errors.is_order && (
                      <p className="mt-1.5 text-[11px] font-medium text-danger">
                        {errors.is_order}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description (Rich Text) */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Description / Content <span className="text-danger">*</span>
                  </label>

                  <div
                    className={`
                      custom-text-editor-wrapper rounded-lg border bg-background
                      transition-all focus-within:ring-2 focus-within:ring-primary/10
                      ${
                        errors.description
                          ? "border-danger focus-within:border-danger"
                          : "border-border focus-within:border-primary"
                      }
                    `}
                  >
                    <CustomTextEditor
                      value={form.description}
                      onChange={(html) => setField("description", html)}
                      placeholder="Write the full section content..."
                      height={360}
                      disabled={saving}
                    />
                  </div>

                  <div className="mt-1.5 flex items-center justify-between">
                    {errors.description ? (
                      <p className="text-[11px] font-medium text-danger">
                        {errors.description}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p className="text-[10px] text-text-muted">
                      {stripHtml(form.description).length} chars
                    </p>
                  </div>
                </div>

                {/* Status */}
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
                    <span>{isEdit ? "Save Changes" : "Create Section"}</span>
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
   PREVIEW MODAL
============================================================ */

const PreviewModal = ({ item, onClose, shouldReduceMotion, premiumEase }) => {
  const isOpen = Boolean(item);

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
              w-[calc(100%-32px)] max-w-[820px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Scale className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-heading line-clamp-1">
                    {item?.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-info-light px-2 py-0.5 text-[10px] font-bold text-info">
                      <Tag className="h-2.5 w-2.5" />
                      {item?.page_name}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-background-soft px-2 py-0.5 text-[10px] font-bold text-text-secondary">
                      <ArrowUpDown className="h-2.5 w-2.5" />
                      Order {item?.is_order ?? "—"}
                    </span>
                  </div>
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

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div
                className="
                  text-sm leading-7 text-text
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-heading
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-heading
                  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5 [&_h3]:text-heading
                  [&_p]:mb-3
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_a]:text-primary [&_a]:underline
                  [&_strong]:font-bold
                  [&_em]:italic
                  [&_blockquote]:border-l-4 [&_blockquote]:border-border
                  [&_blockquote]:pl-4 [&_blockquote]:italic
                  [&_blockquote]:text-text-secondary
                  [&_hr]:my-4 [&_hr]:border-border-light
                "
                dangerouslySetInnerHTML={{ __html: item?.description || "" }}
              />
            </div>

            <div className="flex shrink-0 justify-end border-t border-border-light bg-background-soft px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="
                  inline-flex items-center justify-center rounded-lg border
                  border-border bg-background px-5 py-2.5 text-xs font-semibold
                  text-heading transition-all hover:border-primary
                  hover:text-primary
                "
              >
                Close
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
                Delete "{item?.title}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This section will be permanently removed from the Terms page.
                This action cannot be undone.
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
                    <span>Delete Section</span>
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

export default ManageTermsPage;