import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  MoreVertical,
  FileText,
  Building2,
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
  ArrowUpDown,
  Inbox,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   MANAGE FORM DEFINITIONS
============================================================ */

const ManageFormDefinitions = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [definitions, setDefinitions] = useState([]);
  const [filingTypes, setFilingTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filingTypeFilter, setFilingTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilingTypeDropdown, setShowFilingTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDefinition, setEditingDefinition] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingDefinition, setDeletingDefinition] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH DEFINITIONS
  ============================================================ */

  const fetchDefinitions = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await api.get("/form-definitions");

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to load definitions.",
        );
      }

      setDefinitions(response.data.data || []);
    } catch (err) {
      console.error("Fetch form definitions error:", err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* ============================================================
     FETCH FILING TYPES
  ============================================================ */

  const fetchFilingTypes = useCallback(async () => {
    try {
      const response = await api.get("/filing-types");

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to load filing types.",
        );
      }

      setFilingTypes(response.data.data || []);
    } catch (err) {
      console.error("Fetch filing types error:", err);
      // Don't set global error here — definitions may still load fine
    }
  }, []);

  useEffect(() => {
    fetchDefinitions();
    fetchFilingTypes();
  }, [fetchDefinitions, fetchFilingTypes]);

  /* ============================================================
     CLICK OUTSIDE ROW MENUS
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowFilingTypeDropdown(false);
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTERED DEFINITIONS
  ============================================================ */

  const filteredDefinitions = useMemo(() => {
    return definitions.filter((d) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        d.name?.toLowerCase().includes(query) ||
        d.slug?.toLowerCase().includes(query) ||
        d.description?.toLowerCase().includes(query);

      const matchesFilingType =
        filingTypeFilter === "all" ||
        String(d.filing_type_id) === String(filingTypeFilter);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && d.is_active) ||
        (statusFilter === "inactive" && !d.is_active);

      return matchesSearch && matchesFilingType && matchesStatus;
    });
  }, [definitions, search, filingTypeFilter, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const total = definitions.length;
    const active = definitions.filter((d) => d.is_active).length;
    const inactive = total - active;

    return [
      {
        id: "total",
        label: "Total Definitions",
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
        id: "filingTypes",
        label: "Filing Types",
        value: filingTypes.length,
        icon: FileText,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [definitions, filingTypes]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingDefinition(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (definition) => {
    setEditingDefinition(definition);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSaveDefinition = async (payload) => {
    try {
      if (editingDefinition) {
        const response = await api.put(
          `/form-definitions/${editingDefinition.id}`,
          payload,
        );
        if (!response.data?.success) throw new Error(response.data?.message);

        setDefinitions((prev) =>
          prev.map((d) =>
            d.id === editingDefinition.id ? { ...d, ...response.data.data } : d,
          ),
        );
      } else {
        const response = await api.post("/form-definitions", payload);
        if (!response.data?.success) throw new Error(response.data?.message);

        setDefinitions((prev) => [...prev, response.data.data]);
      }

      setShowFormModal(false);
      setEditingDefinition(null);
    } catch (err) {
      console.error("Save definition error:", err);
      throw err;
    }
  };

  /* ============================================================
     HANDLERS — DELETE
  ============================================================ */

  const openDeleteModal = (definition) => {
    setDeletingDefinition(definition);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingDefinition) return;

    try {
      await api.delete(`/form-definitions/${deletingDefinition.id}`);
      setDefinitions((prev) =>
        prev.filter((d) => d.id !== deletingDefinition.id),
      );
      setShowDeleteModal(false);
      setDeletingDefinition(null);
    } catch (err) {
      console.error("Delete definition error:", err);
      setError(err.response?.data?.message || "Failed to delete definition.");
    }
  };

  /* ============================================================
     HELPERS
  ============================================================ */

  const getFilingTypeBadge = (filingType) => {
    if (!filingType) return null;
    const colorMap = {
      ct600: "bg-primary-light text-primary",
      "companies-house": "bg-info-light text-info",
      "mtd-vat": "bg-warning-light text-warning",
      "annual-accounts": "bg-success-light text-success",
    };
    return (
      colorMap[filingType.slug] || "bg-background-soft text-text-secondary"
    );
  };

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
    setFilingTypeFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    search || filingTypeFilter !== "all" || statusFilter !== "all";

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
            <Layers className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Form Definitions
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage form templates for each filing type
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              fetchDefinitions(true);
              fetchFilingTypes();
            }}
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
            <span>Add Definition</span>
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

      {/* FILTERS BAR */}
      <div className="rounded-xl border border-border-light bg-background p-4 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search definitions by name, slug or description..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Filing Type Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowFilingTypeDropdown((p) => !p);
                setShowStatusDropdown(false);
              }}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span>
                {filingTypeFilter === "all"
                  ? "All Filing Types"
                  : filingTypes.find(
                      (t) => String(t.id) === String(filingTypeFilter),
                    )?.name || "Filing Type"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform ${
                  showFilingTypeDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showFilingTypeDropdown && (
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
                      setFilingTypeFilter("all");
                      setShowFilingTypeDropdown(false);
                    }}
                    className={`
                      flex w-full items-center justify-between px-4 py-2.5
                      text-left text-sm transition-colors hover:bg-primary-light
                      ${
                        filingTypeFilter === "all"
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>All Filing Types</span>
                    {filingTypeFilter === "all" && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>

                  {filingTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setFilingTypeFilter(String(type.id));
                        setShowFilingTypeDropdown(false);
                      }}
                      className={`
                        flex w-full items-center justify-between px-4 py-2.5
                        text-left text-sm transition-colors hover:bg-primary-light
                        ${
                          String(filingTypeFilter) === String(type.id)
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span>{type.name}</span>
                      {String(filingTypeFilter) === String(type.id) && (
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
                setShowFilingTypeDropdown(false);
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

          {/* Clear Filters */}
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
        {/* Table header info */}
        <div className="flex flex-col gap-2 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              All Form Definitions
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredDefinitions.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredDefinitions.length} of {definitions.length} definitions
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading definitions...
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && (
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border-light bg-background-soft">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Filing Type
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Slug
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
                {filteredDefinitions.map((definition) => (
                  <tr
                    key={definition.id}
                    className="group transition-colors hover:bg-background-soft"
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <FileText
                            className="h-4 w-4 text-primary"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading">
                            {definition.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-muted line-clamp-1">
                            {definition.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Filing Type */}
                    <td className="px-5 py-4">
                      {definition.filing_type ? (
                        <span
                          className={`
                            inline-flex items-center gap-1.5 rounded-full
                            px-2.5 py-1 text-[10px] font-bold
                            ${getFilingTypeBadge(definition.filing_type)}
                          `}
                        >
                          <Building2 className="h-3 w-3" strokeWidth={2.4} />
                          {definition.filing_type.name}
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>

                    {/* Slug */}
                    <td className="px-5 py-4">
                      <code className="rounded-md bg-background-soft px-2 py-1 font-mono text-[11px] text-text-secondary">
                        {definition.slug}
                      </code>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {definition.is_active ? (
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
                        {formatDate(definition.updated_at)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="relative px-5 py-4 text-right">
                      <div className="relative inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(definition)}
                          className="
                            inline-flex items-center gap-1 rounded-lg
                            border border-border bg-background px-3 py-1.5
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
                                openRowMenu === definition.id
                                  ? null
                                  : definition.id,
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
                            {openRowMenu === definition.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -5, scale: 0.97 }}
                                transition={{ duration: 0.18 }}
                                className="
                                  absolute right-0 top-full z-20 mt-1 w-44
                                  overflow-hidden rounded-lg border border-border
                                  bg-background py-1 shadow-card-hover
                                "
                              >
                                <button
                                  type="button"
                                  onClick={() => openEditModal(definition)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Hash className="h-3.5 w-3.5" />
                                  <span>Copy ID</span>
                                </button>
                                <div className="my-1 border-t border-border-light" />
                                <button
                                  type="button"
                                  onClick={() => openDeleteModal(definition)}
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
            {filteredDefinitions.map((definition) => (
              <div key={definition.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <FileText
                      className="h-5 w-5 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {definition.name}
                        </p>
                        <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                          {definition.slug}
                        </code>
                      </div>
                      {definition.is_active ? (
                        <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-[9px] font-bold text-success">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-danger-light px-2 py-0.5 text-[9px] font-bold text-danger">
                          Inactive
                        </span>
                      )}
                    </div>

                    {definition.filing_type && (
                      <div className="mt-2">
                        <span
                          className={`
                            inline-flex items-center gap-1 rounded-full
                            px-2 py-0.5 text-[10px] font-bold
                            ${getFilingTypeBadge(definition.filing_type)}
                          `}
                        >
                          <Building2 className="h-2.5 w-2.5" />
                          {definition.filing_type.name}
                        </span>
                      </div>
                    )}

                    <p className="mt-2 text-[11px] text-text-muted line-clamp-2">
                      {definition.description || "No description"}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(definition)}
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
                        onClick={() => openDeleteModal(definition)}
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

        {/* Empty State */}
        {!loading && filteredDefinitions.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No form definitions found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by creating your first form definition."}
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
                Add Definition
              </button>
            )}
          </div>
        )}
      </div>

      {/* FORM MODAL (Create/Edit) */}
      <FormDefinitionModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingDefinition(null);
        }}
        onSave={handleSaveDefinition}
        definition={editingDefinition}
        filingTypes={filingTypes}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      {/* DELETE MODAL */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingDefinition(null);
        }}
        onConfirm={handleConfirmDelete}
        definition={deletingDefinition}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   FORM DEFINITION MODAL
============================================================ */

const FormDefinitionModal = ({
  isOpen,
  onClose,
  onSave,
  definition,
  filingTypes,
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(definition);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    filing_type_id: "",
    is_active: true,
    sort_order: 1,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  /* Reset form when modal opens */
  useEffect(() => {
    if (!isOpen) return;

    if (definition) {
      setForm({
        name: definition.name || "",
        slug: definition.slug || "",
        description: definition.description || "",
        filing_type_id: definition.filing_type_id || "",
        is_active: definition.is_active ?? true,
        sort_order: definition.sort_order ?? 1,
      });
    } else {
      setForm({
        name: "",
        slug: "",
        description: "",
        filing_type_id: filingTypes?.[0]?.id || "",
        is_active: true,
        sort_order: 1,
      });
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, definition, filingTypes]);

  /* Auto-generate slug from name (only when creating) */
  useEffect(() => {
    if (isEdit) return;
    if (form.slug && form.slug.length > 0) return;

    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setForm((prev) => ({ ...prev, slug }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  /* Validate */
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.slug.trim()) next.slug = "Slug is required.";
    if (!form.filing_type_id) next.filing_type_id = "Filing type is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setServerError(null);

    try {
      await onSave({
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        filing_type_id: form.filing_type_id,
        is_active: form.is_active,
        sort_order: Number(form.sort_order) || 1,
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message || err.message || "Failed to save.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-secondary/50 backdrop-blur-[3px]"
            onClick={onClose}
          />

          {/* Modal */}
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
              w-[calc(100%-32px)] max-w-[540px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Layers className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {isEdit ? "Edit Form Definition" : "New Form Definition"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update the details of this form definition."
                      : "Create a new form definition for a filing type."}
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
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. CT600"
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

                {/* Slug */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="e.g. ct600"
                    className={`
                      w-full rounded-lg border bg-background px-4 py-2.5
                      font-mono text-sm text-heading outline-none transition-all
                      placeholder:text-text-muted focus:ring-2
                      focus:ring-primary/10
                      ${
                        errors.slug
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-primary"
                      }
                    `}
                  />
                  {errors.slug && (
                    <p className="mt-1.5 text-[11px] font-medium text-danger">
                      {errors.slug}
                    </p>
                  )}
                </div>

                {/* Filing Type */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Filing Type <span className="text-danger">*</span>
                  </label>
                  <select
                    value={form.filing_type_id}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        filing_type_id: e.target.value,
                      }))
                    }
                    className={`
                      w-full cursor-pointer rounded-lg border bg-background
                      px-4 py-2.5 text-sm text-heading outline-none
                      transition-all focus:ring-2 focus:ring-primary/10
                      ${
                        errors.filing_type_id
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-primary"
                      }
                    `}
                  >
                    <option value="">Select filing type...</option>
                    {filingTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {errors.filing_type_id && (
                    <p className="mt-1.5 text-[11px] font-medium text-danger">
                      {errors.filing_type_id}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Brief description of this form definition..."
                    className="
                      w-full resize-none rounded-lg border border-border
                      bg-background px-4 py-2.5 text-sm text-heading
                      outline-none transition-all placeholder:text-text-muted
                      focus:border-primary focus:ring-2 focus:ring-primary/10
                    "
                  />
                </div>

                {/* Grid: sort_order + is_active */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={form.sort_order}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          sort_order: e.target.value,
                        }))
                      }
                      className="
                        w-full rounded-lg border border-border bg-background
                        px-4 py-2.5 text-sm text-heading outline-none
                        transition-all focus:border-primary focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>

                  {/* Is Active Toggle */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Status
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          is_active: !prev.is_active,
                        }))
                      }
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
                        className={`text-xs font-semibold transition-colors duration-200 ${
                          form.is_active ? "text-success" : "text-text-muted"
                        }`}
                      >
                        {form.is_active ? "Active" : "Inactive"}
                      </span>

                      <span
                        className={`
                          relative inline-flex h-5 w-9 shrink-0 items-center
                          rounded-full transition-colors duration-300
                          ease-in-out
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
                    <span>{isEdit ? "Save Changes" : "Create Definition"}</span>
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
  definition,
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
              fixed left-1/2 top-1/2 z-[210] w-[calc(100%-32px)] max-w-[440px]
              -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
            "
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-danger via-danger/60 to-transparent" />

            <div className="p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-light">
                <AlertCircle className="h-7 w-7 text-danger" strokeWidth={2} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-heading">
                Delete "{definition?.name}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This action cannot be undone. Any form fields, sections, and
                versions attached to this definition will be permanently
                removed.
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
                    <span>Delete Definition</span>
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

export default ManageFormDefinitions;