import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
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
  Inbox,
  Rocket,
  Clock,
  History,
  User as UserIcon,
  Eye,
  Calendar,
  ListTree,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   STATUS STYLES
============================================================ */

const STATUS_STYLES = {
  draft: {
    bg: "bg-warning-light",
    text: "text-warning",
    dot: "bg-warning",
    label: "Draft",
  },
  published: {
    bg: "bg-success-light",
    text: "text-success",
    dot: "bg-success",
    label: "Published",
  },
  archived: {
    bg: "bg-background-soft",
    text: "text-text-muted",
    dot: "bg-text-muted",
    label: "Archived",
  },
};

/* ============================================================
   MANAGE FORM VERSIONS
============================================================ */

const ManageFormVersions = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [versions, setVersions] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [definitionFilter, setDefinitionFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDefinitionDropdown, setShowDefinitionDropdown] = useState(false);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [activeVersion, setActiveVersion] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH VERSIONS
  ============================================================ */

  const fetchVersions = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await api.get("/form-versions");

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to load form versions."
        );
      }

      setVersions(response.data.data || []);
    } catch (err) {
      console.error("Fetch form versions error:", err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /* ============================================================
     FETCH FORM DEFINITIONS (for filter + create modal)
  ============================================================ */

  const fetchDefinitions = useCallback(async () => {
    try {
      const response = await api.get("/form-definitions");
      if (response.data?.success) {
        setDefinitions(response.data.data || []);
      }
    } catch (err) {
      console.error("Fetch form definitions error:", err);
    }
  }, []);

  useEffect(() => {
    fetchVersions();
    fetchDefinitions();
  }, [fetchVersions, fetchDefinitions]);

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
        setShowDefinitionDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTERED VERSIONS
  ============================================================ */

  const filteredVersions = useMemo(() => {
    return versions.filter((v) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        v.form_definition?.name?.toLowerCase().includes(query) ||
        v.form_definition?.slug?.toLowerCase().includes(query) ||
        v.created_by?.name?.toLowerCase().includes(query) ||
        String(v.version_number).includes(query);

      const matchesStatus =
        statusFilter === "all" || v.status === statusFilter;

      const matchesDefinition =
        definitionFilter === "all" ||
        String(v.form_definition_id) === String(definitionFilter);

      return matchesSearch && matchesStatus && matchesDefinition;
    });
  }, [versions, search, statusFilter, definitionFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const total = versions.length;
    const published = versions.filter((v) => v.status === "published").length;
    const draft = versions.filter((v) => v.status === "draft").length;
    const uniqueDefinitions = new Set(
      versions.map((v) => v.form_definition_id)
    ).size;

    return [
      {
        id: "total",
        label: "Total Versions",
        value: total,
        icon: History,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      },
      {
        id: "published",
        label: "Published",
        value: published,
        icon: CheckCircle2,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "draft",
        label: "Drafts",
        value: draft,
        icon: Clock,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
      },
      {
        id: "definitions",
        label: "Definitions",
        value: uniqueDefinitions,
        icon: Layers,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [versions]);

  /* ============================================================
     HANDLERS — CREATE
  ============================================================ */

  const openCreateModal = () => {
    setShowCreateModal(true);
    setOpenRowMenu(null);
  };

  const handleCreateVersion = async (payload) => {
    const response = await api.post("/form-versions", payload);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to create version.");
    }

    setVersions((prev) => [response.data.data, ...prev]);
    setShowCreateModal(false);
  };

  /* ============================================================
     HANDLERS — PUBLISH
  ============================================================ */

  const openPublishModal = (version) => {
    setActiveVersion(version);
    setShowPublishModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmPublish = async () => {
    if (!activeVersion) return;

    const response = await api.post(
      `/form-versions/${activeVersion.id}/publish`
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to publish version.");
    }

    setVersions((prev) =>
      prev.map((v) => (v.id === activeVersion.id ? response.data.data : v))
    );

    setShowPublishModal(false);
    setActiveVersion(null);
  };

  /* ============================================================
     HANDLERS — DELETE
  ============================================================ */

  const openDeleteModal = (version) => {
    setActiveVersion(version);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!activeVersion) return;

    await api.delete(`/form-versions/${activeVersion.id}`);

    setVersions((prev) => prev.filter((v) => v.id !== activeVersion.id));
    setShowDeleteModal(false);
    setActiveVersion(null);
  };

  /* ============================================================
     HANDLERS — MANAGE SECTIONS
  ============================================================ */

  const handleManageSections = (version) => {
    navigate(`/admin/website/forms/sections?versionid=${version.id}`);
    setOpenRowMenu(null);
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

  const formatDateTime = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDefinitionFilter("all");
  };

  const hasActiveFilters =
    search || statusFilter !== "all" || definitionFilter !== "all";

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
            <History className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Form Versions
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage, publish and track versions of your form definitions
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fetchVersions(true)}
            disabled={refreshing}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-4
              py-2.5
              text-sm
              font-semibold
              text-heading
              transition-all
              duration-200
              hover:border-primary
              hover:text-primary
              disabled:cursor-not-allowed
              disabled:opacity-60
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
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2.5
              text-sm
              font-semibold
              text-text-white
              shadow-button
              transition-all
              duration-200
              hover:bg-primary-hover
              hover:-translate-y-0.5
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
            <span>New Version</span>
          </button>
        </div>
      </div>

      {/* ======================================================
          STATS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="
                rounded-xl
                border
                border-border-light
                bg-background
                p-4
                shadow-card
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-card-hover
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

      {/* ======================================================
          ERROR BANNER
      ====================================================== */}
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

      {/* ======================================================
          FILTERS
      ====================================================== */}
      <div className="rounded-xl border border-border-light bg-background p-4 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by definition, author or version number..."
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-background-soft
                py-2.5
                pl-10
                pr-4
                text-sm
                text-heading
                outline-none
                transition-all
                placeholder:text-text-muted
                focus:border-primary
                focus:bg-background
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Definition Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowDefinitionDropdown((p) => !p);
                setShowStatusDropdown(false);
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                font-semibold
                text-heading
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
                lg:w-auto
              "
            >
              <span className="truncate max-w-[180px]">
                {definitionFilter === "all"
                  ? "All Definitions"
                  : definitions.find(
                      (d) => String(d.id) === String(definitionFilter)
                    )?.name || "Definition"}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
                  showDefinitionDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showDefinitionDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className="
                    absolute
                    right-0
                    top-full
                    z-30
                    mt-2
                    w-64
                    max-h-[320px]
                    overflow-y-auto
                    rounded-xl
                    border
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setDefinitionFilter("all");
                      setShowDefinitionDropdown(false);
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
                      hover:bg-primary-light
                      ${
                        definitionFilter === "all"
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>All Definitions</span>
                    {definitionFilter === "all" && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>

                  {definitions.map((def) => (
                    <button
                      key={def.id}
                      type="button"
                      onClick={() => {
                        setDefinitionFilter(String(def.id));
                        setShowDefinitionDropdown(false);
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
                        hover:bg-primary-light
                        ${
                          String(definitionFilter) === String(def.id)
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span className="truncate">{def.name}</span>
                      {String(definitionFilter) === String(def.id) && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
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
                setShowDefinitionDropdown(false);
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                font-semibold
                text-heading
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
                lg:w-auto
              "
            >
              <span>
                {statusFilter === "all"
                  ? "All Statuses"
                  : STATUS_STYLES[statusFilter]?.label || statusFilter}
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
                    absolute
                    right-0
                    top-full
                    z-30
                    mt-2
                    w-48
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  {[
                    { value: "all", label: "All Statuses" },
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setStatusFilter(opt.value);
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
                        hover:bg-primary-light
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

          {/* Clear */}
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
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                font-semibold
                text-text-secondary
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
              "
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================
          TABLE
      ====================================================== */}
      <div className="overflow-hidden rounded-xl border border-border-light bg-background shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">
              All Form Versions
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredVersions.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredVersions.length} of {versions.length} versions
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading versions...
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
                    Form Definition
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Version
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Created By
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Published
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-light">
                {filteredVersions.map((version) => {
                  const status =
                    STATUS_STYLES[version.status] || STATUS_STYLES.draft;
                  const isDraft = version.status === "draft";

                  return (
                    <tr
                      key={version.id}
                      className="group transition-colors hover:bg-background-soft"
                    >
                      {/* Definition */}
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
                              {version.form_definition?.name || "—"}
                            </p>
                            <p className="mt-0.5 truncate font-mono text-[10px] text-text-muted">
                              {version.form_definition?.slug || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Version */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-background-soft px-2.5 py-1 text-xs font-bold text-heading">
                          <Hash className="h-3 w-3 text-text-muted" />
                          v{version.version_number}
                        </span>
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
                            ${status.bg}
                            ${status.text}
                          `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </td>

                      {/* Created By */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background-soft text-[10px] font-bold text-text-secondary">
                            {version.created_by?.name
                              ? version.created_by.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()
                              : "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-heading">
                              {version.created_by?.name || "—"}
                            </p>
                            <p className="truncate text-[10px] text-text-muted">
                              {formatDate(version.created_at)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Published At */}
                      <td className="px-5 py-4">
                        <span className="text-xs text-text-secondary">
                          {formatDateTime(version.published_at)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="relative px-5 py-4 text-right">
                        <div className="relative inline-flex items-center gap-1">
                          {/* Sections — only for drafts */}
                          {isDraft && (
                            <button
                              type="button"
                              onClick={() => handleManageSections(version)}
                              className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-lg
                                border
                                border-primary/40
                                bg-primary-light
                                px-3
                                py-1.5
                                text-[11px]
                                font-bold
                                text-[var(--color-primary)]
                                transition-all
                                duration-200
                                hover:bg-primary
                                hover:text-text-white
                                hover:border-primary
                              "
                            >
                              <ListTree className="h-3 w-3" strokeWidth={2.4} />
                              <span>Sections</span>
                            </button>
                          )}

                          {/* Publish — only for drafts */}
                          {isDraft && (
                            <button
                              type="button"
                              onClick={() => openPublishModal(version)}
                              className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-lg
                                border
                                border-success/40
                                bg-success-light
                                px-3
                                py-1.5
                                text-[11px]
                                font-bold
                                text-success
                                transition-all
                                duration-200
                                hover:bg-success
                                hover:text-text-white
                                hover:border-success
                              "
                            >
                              <Rocket className="h-3 w-3" strokeWidth={2.4} />
                              <span>Publish</span>
                            </button>
                          )}

                          <div className="relative" data-row-menu>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenRowMenu(
                                  openRowMenu === version.id
                                    ? null
                                    : version.id
                                )
                              }
                              className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-lg
                                text-text-muted
                                transition-colors
                                hover:bg-primary-light
                                hover:text-primary
                              "
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>

                            <AnimatePresence>
                              {openRowMenu === version.id && (
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    y: -6,
                                    scale: 0.97,
                                  }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{
                                    opacity: 0,
                                    y: -5,
                                    scale: 0.97,
                                  }}
                                  transition={{ duration: 0.18 }}
                                  className="
                                    absolute
                                    right-0
                                    top-full
                                    z-20
                                    mt-1
                                    w-48
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-border
                                    bg-background
                                    py-1
                                    shadow-card-hover
                                  "
                                >
                                  {/* Manage Sections — drafts only */}
                                  {isDraft && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleManageSections(version)
                                      }
                                      className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
                                    >
                                      <ListTree className="h-3.5 w-3.5" />
                                      <span>Manage Sections</span>
                                    </button>
                                  )}

                                  {/* Publish — drafts only */}
                                  {isDraft && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openPublishModal(version)
                                      }
                                      className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-success transition-colors hover:bg-success-light"
                                    >
                                      <Rocket className="h-3.5 w-3.5" />
                                      <span>Publish Version</span>
                                    </button>
                                  )}

                                  {/* View details — published only */}
                                  {!isDraft && (
                                    <button
                                      type="button"
                                      className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                      <span>View Details</span>
                                    </button>
                                  )}

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
                                    onClick={() => openDeleteModal(version)}
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
            {filteredVersions.map((version) => {
              const status =
                STATUS_STYLES[version.status] || STATUS_STYLES.draft;
              const isDraft = version.status === "draft";

              return (
                <div key={version.id} className="p-4">
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
                            {version.form_definition?.name || "—"}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] font-bold text-text-secondary">
                              <Hash className="h-2.5 w-2.5" />
                              v{version.version_number}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`
                            shrink-0
                            inline-flex
                            items-center
                            gap-1
                            rounded-full
                            px-2
                            py-0.5
                            text-[9px]
                            font-bold
                            ${status.bg}
                            ${status.text}
                          `}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-[11px] text-text-muted">
                        <UserIcon className="h-3 w-3" />
                        <span className="truncate">
                          {version.created_by?.name || "—"}
                        </span>
                        <span>·</span>
                        <span>{formatDate(version.created_at)}</span>
                      </div>

                      {version.published_at && (
                        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-success">
                          <Rocket className="h-3 w-3" />
                          <span>
                            Published {formatDateTime(version.published_at)}
                          </span>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        {/* Sections — drafts only */}
                        {isDraft && (
                          <button
                            type="button"
                            onClick={() => handleManageSections(version)}
                            className="
                              inline-flex
                              flex-1
                              items-center
                              justify-center
                              gap-1.5
                              rounded-lg
                              border
                              border-primary/40
                              bg-primary-light
                              px-3
                              py-2
                              text-[11px]
                              font-bold
                              text-primary
                              transition-all
                              hover:bg-primary
                              hover:text-text-white
                            "
                          >
                            <ListTree className="h-3 w-3" />
                            Sections
                          </button>
                        )}

                        {/* Publish — drafts only */}
                        {isDraft && (
                          <button
                            type="button"
                            onClick={() => openPublishModal(version)}
                            className="
                              inline-flex
                              flex-1
                              items-center
                              justify-center
                              gap-1.5
                              rounded-lg
                              bg-success
                              px-3
                              py-2
                              text-[11px]
                              font-bold
                              text-text-white
                              transition-all
                              hover:opacity-90
                            "
                          >
                            <Rocket className="h-3 w-3" />
                            Publish
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openDeleteModal(version)}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            border
                            border-danger-light
                            bg-background
                            px-3
                            py-2
                            text-[11px]
                            font-semibold
                            text-danger
                            transition-all
                            hover:bg-danger-light
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
        {!loading && filteredVersions.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No form versions found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Create your first version to get started."}
            </p>
            {hasActiveFilters ? (
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
                  border-border
                  bg-background
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-heading
                  transition-all
                  hover:border-primary
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
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-text-white
                  transition-all
                  hover:bg-primary-hover
                "
              >
                <Plus className="h-3.5 w-3.5" />
                New Version
              </button>
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          MODALS
      ====================================================== */}

      <CreateVersionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateVersion}
        definitions={definitions}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <PublishConfirmModal
        isOpen={showPublishModal}
        onClose={() => {
          setShowPublishModal(false);
          setActiveVersion(null);
        }}
        onConfirm={handleConfirmPublish}
        version={activeVersion}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setActiveVersion(null);
        }}
        onConfirm={handleConfirmDelete}
        version={activeVersion}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   CREATE VERSION MODAL
============================================================ */

const CreateVersionModal = ({
  isOpen,
  onClose,
  onCreate,
  definitions,
  shouldReduceMotion,
  premiumEase,
}) => {
  const [form, setForm] = useState({ form_definition_id: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setForm({ form_definition_id: definitions?.[0]?.id || "" });
    setErrors({});
    setServerError(null);
  }, [isOpen, definitions]);

  const validate = () => {
    const next = {};
    if (!form.form_definition_id)
      next.form_definition_id = "Form definition is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setServerError(null);

    try {
      await onCreate({
        form_definition_id: form.form_definition_id,
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message || err.message || "Failed to create."
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
              fixed
              left-1/2
              top-1/2
              z-[210]
              flex
              max-h-[90vh]
              w-[calc(100%-32px)]
              max-w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-background
              shadow-card-hover
            "
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border-light px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Plus className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    New Form Version
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Create a new draft version of a form definition.
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

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-heading">
                  Form Definition <span className="text-danger">*</span>
                </label>
                <select
                  value={form.form_definition_id}
                  onChange={(e) =>
                    setForm({ form_definition_id: e.target.value })
                  }
                  className={`
                    w-full
                    cursor-pointer
                    rounded-lg
                    border
                    bg-background
                    px-4
                    py-2.5
                    text-sm
                    text-heading
                    outline-none
                    transition-all
                    focus:ring-2
                    focus:ring-primary/10
                    ${
                      errors.form_definition_id
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-primary"
                    }
                  `}
                >
                  <option value="">Select a definition...</option>
                  {definitions.map((def) => (
                    <option key={def.id} value={def.id}>
                      {def.name} ({def.slug})
                    </option>
                  ))}
                </select>
                {errors.form_definition_id && (
                  <p className="mt-1.5 text-[11px] font-medium text-danger">
                    {errors.form_definition_id}
                  </p>
                )}
                <p className="mt-2 text-[11px] leading-5 text-text-muted">
                  A new draft version will be created with the next version
                  number. You can publish it once ready.
                </p>
              </div>
            </form>

            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-border-light bg-background-soft px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  text-heading
                  transition-all
                  hover:border-primary
                  hover:text-primary
                  disabled:opacity-60
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-text-white
                  shadow-button
                  transition-all
                  hover:bg-primary-hover
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>Create Version</span>
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
   PUBLISH CONFIRM MODAL
============================================================ */

const PublishConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  version,
  shouldReduceMotion,
  premiumEase,
}) => {
  const [publishing, setPublishing] = useState(false);

  const handleConfirm = async () => {
    setPublishing(true);
    try {
      await onConfirm();
    } finally {
      setPublishing(false);
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
              fixed
              left-1/2
              top-1/2
              z-[210]
              w-[calc(100%-32px)]
              max-w-[440px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-background
              shadow-card-hover
            "
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-success via-success/60 to-transparent" />

            <div className="p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success-light">
                <Rocket className="h-7 w-7 text-success" strokeWidth={2} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-heading">
                Publish this version?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                <span className="font-semibold text-heading">
                  {version?.form_definition?.name} · v
                  {version?.version_number}
                </span>{" "}
                will be published and become the active version for this form
                definition. Any previously published version will be archived.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border-light bg-background-soft px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={publishing}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  text-heading
                  transition-all
                  hover:border-primary
                  hover:text-primary
                  disabled:opacity-60
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={publishing}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-success
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-text-white
                  transition-all
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {publishing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="h-3.5 w-3.5" strokeWidth={2.4} />
                    <span>Publish Version</span>
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
  version,
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
              fixed
              left-1/2
              top-1/2
              z-[210]
              w-[calc(100%-32px)]
              max-w-[440px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-background
              shadow-card-hover
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
                Delete this version?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                You're about to delete{" "}
                <span className="font-semibold text-heading">
                  {version?.form_definition?.name} · v{version?.version_number}
                </span>
                . This action cannot be undone.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border-light bg-background-soft px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={deleting}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  text-heading
                  transition-all
                  hover:border-primary
                  hover:text-primary
                  disabled:opacity-60
                "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={deleting}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-danger
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-text-white
                  transition-all
                  hover:opacity-90
                  disabled:cursor-not-allowed
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
                    <span>Delete Version</span>
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

export default ManageFormVersions;