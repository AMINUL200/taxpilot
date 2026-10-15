import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  ChevronDown,
  Save,
  X,
  Layers,
  Hash,
  Inbox,
  ListTree,
  ArrowLeft,
  ArrowUpDown,
  Repeat,
  Lock,
  Info,
  ListChecks,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   MANAGE FORM SECTIONS
============================================================ */

const ManageFormSections = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const versionId = searchParams.get("versionid");

  /* ============================================================
     STATE
  ============================================================ */

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [repeatableFilter, setRepeatableFilter] = useState("all");
  const [showRepeatableDropdown, setShowRepeatableDropdown] = useState(false);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingSection, setDeletingSection] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH SECTIONS
  ============================================================ */

  const fetchSections = useCallback(
    async (isRefresh = false) => {
      if (!versionId) {
        setError("Missing version ID. Please navigate from a form version.");
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/form-versions/${versionId}/sections`
        );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load form sections."
          );
        }

        const data = response.data.data || [];
        const sorted = [...data].sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
        setSections(sorted);
      } catch (err) {
        console.error("Fetch form sections error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [versionId]
  );

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowRepeatableDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTERED SECTIONS
  ============================================================ */

  const filteredSections = useMemo(() => {
    return sections.filter((s) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        s.name?.toLowerCase().includes(query) ||
        s.slug?.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query);

      const matchesRepeatable =
        repeatableFilter === "all" ||
        (repeatableFilter === "yes" && s.is_repeatable) ||
        (repeatableFilter === "no" && !s.is_repeatable);

      return matchesSearch && matchesRepeatable;
    });
  }, [sections, search, repeatableFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const total = sections.length;
    const repeatable = sections.filter((s) => s.is_repeatable).length;
    const single = total - repeatable;
    const highest = sections.reduce(
      (max, s) => Math.max(max, s.sort_order || 0),
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
        id: "single",
        label: "Single-instance",
        value: single,
        icon: FileText,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "repeatable",
        label: "Repeatable",
        value: repeatable,
        icon: Repeat,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
      {
        id: "order",
        label: "Highest Order",
        value: highest,
        icon: ArrowUpDown,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
      },
    ];
  }, [sections]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingSection(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (section) => {
    setEditingSection(section);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSaveSection = async (payload) => {
    if (editingSection) {
      const response = await api.put(
        `/form-versions/${versionId}/sections/${editingSection.id}`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to update section.");
      }

      setSections((prev) => {
        const updated = prev.map((s) =>
          s.id === editingSection.id ? response.data.data : s
        );
        return updated.sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      });
    } else {
      const response = await api.post(
        `/form-versions/${versionId}/sections`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to create section.");
      }

      setSections((prev) => {
        const next = [...prev, response.data.data];
        return next.sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      });
    }

    setShowFormModal(false);
    setEditingSection(null);
  };

  /* ============================================================
     HANDLERS — DELETE
  ============================================================ */

  const openDeleteModal = (section) => {
    setDeletingSection(section);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingSection) return;

    await api.delete(
      `/form-versions/${versionId}/sections/${deletingSection.id}`
    );

    setSections((prev) => prev.filter((s) => s.id !== deletingSection.id));
    setShowDeleteModal(false);
    setDeletingSection(null);
  };

  /* ============================================================
     HANDLERS — MANAGE FIELDS
  ============================================================ */

  const handleManageFields = (section) => {
    navigate(
      `/admin/website/forms/fields?versionid=${versionId}&sectionid=${section.id}`
    );
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

  const clearFilters = () => {
    setSearch("");
    setRepeatableFilter("all");
  };

  const hasActiveFilters = search || repeatableFilter !== "all";

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
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-border
              bg-background
              text-text-muted
              transition-all
              duration-200
              hover:border-primary
              hover:text-primary
            "
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Form Sections
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage sections for version{" "}
              <span className="font-mono font-bold text-heading">
                #{versionId || "—"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fetchSections(true)}
            disabled={refreshing || !versionId}
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
            disabled={!versionId}
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
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
            <span>Add Section</span>
          </button>
        </div>
      </div>

      {/* ======================================================
          MISSING VERSION ID WARNING
      ====================================================== */}
      {!versionId && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-warning-light bg-warning-light px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div className="flex-1">
            <p className="text-xs font-bold text-heading">
              No version selected
            </p>
            <p className="mt-0.5 text-[11px] text-text-secondary">
              Navigate here from a form version to manage its sections.
            </p>
          </div>
        </motion.div>
      )}

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
              placeholder="Search sections by name, slug or description..."
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

          {/* Repeatable Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => setShowRepeatableDropdown((p) => !p)}
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
                {repeatableFilter === "all"
                  ? "All Sections"
                  : repeatableFilter === "yes"
                  ? "Repeatable"
                  : "Single-instance"}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-text-muted transition-transform ${
                  showRepeatableDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showRepeatableDropdown && (
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
                    w-52
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  {[
                    { value: "all", label: "All Sections" },
                    { value: "no", label: "Single-instance" },
                    { value: "yes", label: "Repeatable" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setRepeatableFilter(opt.value);
                        setShowRepeatableDropdown(false);
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
                          repeatableFilter === opt.value
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span>{opt.label}</span>
                      {repeatableFilter === opt.value && (
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
            <ListTree className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">All Sections</h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredSections.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredSections.length} of {sections.length} sections
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
                    Sort
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Section
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Slug
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Type
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
                {filteredSections.map((section) => (
                  <tr
                    key={section.id}
                    className="group transition-colors hover:bg-background-soft"
                  >
                    {/* Sort Order */}
                    <td className="px-5 py-4">
                      <span
                        className="
                          inline-flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          bg-background-soft
                          text-xs
                          font-bold
                          text-text-secondary
                        "
                      >
                        {section.sort_order ?? "—"}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <Layers
                            className="h-4 w-4 text-primary"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-heading">
                            {section.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-muted line-clamp-1">
                            {section.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-5 py-4">
                      <code className="rounded-md bg-background-soft px-2 py-1 font-mono text-[11px] text-text-secondary">
                        {section.slug}
                      </code>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      {section.is_repeatable ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-info-light px-2.5 py-1 text-[10px] font-bold text-info">
                          <Repeat className="h-3 w-3" strokeWidth={2.4} />
                          Repeatable
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-background-soft px-2.5 py-1 text-[10px] font-bold text-text-secondary">
                          <Lock className="h-3 w-3" strokeWidth={2.4} />
                          Single
                        </span>
                      )}
                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4">
                      <span className="text-xs text-text-secondary">
                        {formatDate(section.updated_at)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="relative px-5 py-4 text-right">
                      <div className="relative inline-flex items-center gap-1">
                        {/* Fields button */}
                        <button
                          type="button"
                          onClick={() => handleManageFields(section)}
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
                            text-primary
                            transition-all
                            duration-200
                            hover:bg-primary
                            hover:text-text-white
                            hover:border-primary
                          "
                        >
                          <ListChecks className="h-3 w-3" strokeWidth={2.4} />
                          <span>Fields</span>
                        </button>

                        {/* Edit button */}
                        <button
                          type="button"
                          onClick={() => openEditModal(section)}
                          className="
                            inline-flex
                            items-center
                            gap-1
                            rounded-lg
                            border
                            border-border
                            bg-background
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            text-heading
                            transition-all
                            duration-200
                            hover:border-primary
                            hover:bg-primary-light
                            hover:text-primary
                          "
                        >
                          <Edit3 className="h-3 w-3" strokeWidth={2.4} />
                          <span>Edit</span>
                        </button>

                        {/* Row menu */}
                        <div className="relative" data-row-menu>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowMenu(
                                openRowMenu === section.id
                                  ? null
                                  : section.id
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
                            {openRowMenu === section.id && (
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
                                {/* Manage Fields */}
                                <button
                                  type="button"
                                  onClick={() => handleManageFields(section)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
                                >
                                  <ListChecks className="h-3.5 w-3.5" />
                                  <span>Manage Fields</span>
                                </button>

                                {/* Edit */}
                                <button
                                  type="button"
                                  onClick={() => openEditModal(section)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </button>

                                {/* Copy ID */}
                                <button
                                  type="button"
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Hash className="h-3.5 w-3.5" />
                                  <span>Copy ID</span>
                                </button>

                                <div className="my-1 border-t border-border-light" />

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => openDeleteModal(section)}
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
            {filteredSections.map((section) => (
              <div key={section.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Layers
                      className="h-5 w-5 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-heading">
                          {section.name}
                        </p>
                        <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                          {section.slug}
                        </code>
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
                          ${
                            section.is_repeatable
                              ? "bg-info-light text-info"
                              : "bg-background-soft text-text-secondary"
                          }
                        `}
                      >
                        {section.is_repeatable ? "Repeatable" : "Single"}
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] text-text-muted line-clamp-2">
                      {section.description || "No description"}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
                      <span className="inline-flex items-center gap-1">
                        <ArrowUpDown className="h-3 w-3" />
                        Order {section.sort_order ?? "—"}
                      </span>
                      <span>·</span>
                      <span>{formatDate(section.updated_at)}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      {/* Fields button */}
                      <button
                        type="button"
                        onClick={() => handleManageFields(section)}
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
                        <ListChecks className="h-3 w-3" />
                        Fields
                      </button>

                      {/* Edit button */}
                      <button
                        type="button"
                        onClick={() => openEditModal(section)}
                        className="
                          inline-flex
                          flex-1
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          border
                          border-border
                          bg-background
                          px-3
                          py-2
                          text-[11px]
                          font-semibold
                          text-heading
                          transition-all
                          hover:border-primary
                          hover:text-primary
                        "
                      >
                        <Edit3 className="h-3 w-3" />
                        Edit
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => openDeleteModal(section)}
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
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredSections.length === 0 && (
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
                : "Get started by creating your first section."}
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
                Add Section
              </button>
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          FORM MODAL (Create/Edit)
      ====================================================== */}
      <SectionFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingSection(null);
        }}
        onSave={handleSaveSection}
        section={editingSection}
        versionId={versionId}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      {/* ======================================================
          DELETE MODAL
      ====================================================== */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingSection(null);
        }}
        onConfirm={handleConfirmDelete}
        section={deletingSection}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   SECTION FORM MODAL
============================================================ */

const SectionFormModal = ({
  isOpen,
  onClose,
  onSave,
  section,
  versionId,
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(section);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 1,
    is_repeatable: false,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    if (section) {
      setForm({
        name: section.name || "",
        slug: section.slug || "",
        description: section.description || "",
        sort_order: section.sort_order ?? 1,
        is_repeatable: section.is_repeatable ?? false,
      });
    } else {
      setForm({
        name: "",
        slug: "",
        description: "",
        sort_order: 1,
        is_repeatable: false,
      });
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, section]);

  /* Auto-slug from name on create */
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

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.slug.trim()) next.slug = "Slug is required.";
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
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        sort_order: Number(form.sort_order) || 1,
        is_repeatable: Boolean(form.is_repeatable),
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
              max-w-[560px]
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
                    {isEdit ? "Edit Section" : "New Section"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update the details of this section."
                      : "Create a new section for this form version."}
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
                    placeholder="e.g. Company Details"
                    className={`
                      w-full
                      rounded-lg
                      border
                      bg-background
                      px-4
                      py-2.5
                      text-sm
                      text-heading
                      outline-none
                      transition-all
                      placeholder:text-text-muted
                      focus:ring-2
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
                    placeholder="e.g. company-details"
                    className={`
                      w-full
                      rounded-lg
                      border
                      bg-background
                      px-4
                      py-2.5
                      font-mono
                      text-sm
                      text-heading
                      outline-none
                      transition-all
                      placeholder:text-text-muted
                      focus:ring-2
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
                    placeholder="Brief description of this section..."
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-4
                      py-2.5
                      text-sm
                      text-heading
                      outline-none
                      transition-all
                      placeholder:text-text-muted
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>

                {/* Grid: sort_order + is_repeatable */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Sort Order */}
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
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-background
                        px-4
                        py-2.5
                        text-sm
                        text-heading
                        outline-none
                        transition-all
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                    <p className="mt-1.5 text-[11px] text-text-muted">
                      Lower numbers appear first.
                    </p>
                  </div>

                  {/* Repeatable Toggle */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Repeatable
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          is_repeatable: !prev.is_repeatable,
                        }))
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                        rounded-lg
                        border
                        bg-background
                        px-4
                        py-2.5
                        text-sm
                        transition-colors
                        duration-200
                        ${
                          form.is_repeatable
                            ? "border-info/30 hover:border-info/50"
                            : "border-border hover:border-text-muted/40"
                        }
                      `}
                    >
                      <span
                        className={`
                          text-xs font-semibold transition-colors duration-200
                          ${
                            form.is_repeatable
                              ? "text-info"
                              : "text-text-muted"
                          }
                        `}
                      >
                        {form.is_repeatable ? "Repeatable" : "Single"}
                      </span>

                      <span
                        className={`
                          relative
                          inline-flex
                          h-5
                          w-9
                          shrink-0
                          items-center
                          rounded-full
                          transition-colors
                          duration-300
                          ease-in-out
                          ${form.is_repeatable ? "bg-info" : "bg-border"}
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
                            absolute
                            top-0.5
                            h-4
                            w-4
                            rounded-full
                            bg-white
                            shadow-[0_1px_3px_rgba(0,0,0,0.15)]
                            ${
                              form.is_repeatable
                                ? "right-0.5"
                                : "left-0.5"
                            }
                          `}
                        />
                      </span>
                    </button>
                    <p className="mt-1.5 text-[11px] text-text-muted">
                      {form.is_repeatable
                        ? "Can be added multiple times."
                        : "Appears only once."}
                    </p>
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
   DELETE CONFIRM MODAL
============================================================ */

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  section,
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
                Delete "{section?.name}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This will permanently remove the section and any associated
                fields. This action cannot be undone.
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

export default ManageFormSections;