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
  ListChecks,
  ArrowLeft,
  ArrowUpDown,
  Type,
  Calendar,
  List,
  Circle,
  CheckSquare,
  AlignLeft,
  Upload,
  Link2,
  Mail,
  Phone,
  Eye,
  Copy,
  Info,
  Sparkles,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   CONSTANTS
============================================================ */

const FIELD_TYPES = [
  { value: "text", label: "Text", icon: Type, color: "text-primary" },
  { value: "textarea", label: "Long Text", icon: AlignLeft, color: "text-info" },
  { value: "number", label: "Number", icon: Hash, color: "text-warning" },
  { value: "email", label: "Email", icon: Mail, color: "text-success" },
  { value: "phone", label: "Phone", icon: Phone, color: "text-info" },
  { value: "date", label: "Date", icon: Calendar, color: "text-warning" },
  { value: "select", label: "Dropdown", icon: List, color: "text-primary" },
  { value: "radio", label: "Radio Group", icon: Circle, color: "text-info" },
  { value: "checkbox", label: "Checkbox", icon: CheckSquare, color: "text-success" },
  { value: "file", label: "File Upload", icon: Upload, color: "text-warning" },
  { value: "url", label: "URL", icon: Link2, color: "text-primary" },
];

const FIELD_TYPE_MAP = FIELD_TYPES.reduce((acc, ft) => {
  acc[ft.value] = ft;
  return acc;
}, {});

/* ============================================================
   MANAGE FORM FIELDS
============================================================ */

const ManageFormFields = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const versionId = searchParams.get("versionid");
  const sectionId = searchParams.get("sectionid");

  /* ============================================================
     STATE
  ============================================================ */

  const [fields, setFields] = useState([]);
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
  const [editingField, setEditingField] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingField, setDeletingField] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH FIELDS
  ============================================================ */

  const fetchFields = useCallback(
    async (isRefresh = false) => {
      if (!versionId || !sectionId) {
        setError(
          "Missing version or section ID. Please navigate from a section."
        );
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/admin/form-versions/${versionId}/sections/${sectionId}/fields`
        );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load form fields."
          );
        }

        const data = response.data.data || [];
        const sorted = [...data].sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
        setFields(sorted);
      } catch (err) {
        console.error("Fetch form fields error:", err);
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
    [versionId, sectionId]
  );

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

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
     FILTERED FIELDS
  ============================================================ */

  const filteredFields = useMemo(() => {
    return fields.filter((f) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        f.label?.toLowerCase().includes(query) ||
        f.field_key?.toLowerCase().includes(query) ||
        f.placeholder?.toLowerCase().includes(query) ||
        f.help_text?.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "all" || f.field_type === typeFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && f.is_active) ||
        (statusFilter === "inactive" && !f.is_active);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [fields, search, typeFilter, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const total = fields.length;
    const required = fields.filter((f) => f.is_required).length;
    const optional = total - required;
    const uniqueTypes = new Set(fields.map((f) => f.field_type)).size;

    return [
      {
        id: "total",
        label: "Total Fields",
        value: total,
        icon: ListChecks,
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      },
      {
        id: "required",
        label: "Required",
        value: required,
        icon: AlertCircle,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
      },
      {
        id: "optional",
        label: "Optional",
        value: optional,
        icon: CheckCircle2,
        iconBg: "bg-success-light",
        iconColor: "text-success",
      },
      {
        id: "types",
        label: "Field Types",
        value: uniqueTypes,
        icon: Layers,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [fields]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingField(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (field) => {
    setEditingField(field);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSaveField = async (payload) => {
    if (editingField) {
      const response = await api.put(
        `/admin/form-versions/${versionId}/sections/${sectionId}/fields/${editingField.id}`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to update field.");
      }

      setFields((prev) => {
        const updated = prev.map((f) =>
          f.id === editingField.id ? response.data.data : f
        );
        return updated.sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      });
    } else {
      const response = await api.post(
        `/admin/form-versions/${versionId}/sections/${sectionId}/fields`,
        payload
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to create field.");
      }

      setFields((prev) => {
        const next = [...prev, response.data.data];
        return next.sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      });
    }

    setShowFormModal(false);
    setEditingField(null);
  };

  /* ============================================================
     HANDLERS — DELETE
  ============================================================ */

  const openDeleteModal = (field) => {
    setDeletingField(field);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingField) return;

    await api.delete(
      `/admin/form-versions/${versionId}/sections/${sectionId}/fields/${deletingField.id}`
    );

    setFields((prev) => prev.filter((f) => f.id !== deletingField.id));
    setShowDeleteModal(false);
    setDeletingField(null);
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

  const getTypeMeta = (type) =>
    FIELD_TYPE_MAP[type] || {
      icon: Type,
      color: "text-text-muted",
      label: type,
    };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    search || typeFilter !== "all" || statusFilter !== "all";

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
              Form Fields
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage fields for section{" "}
              <span className="font-mono font-bold text-heading">
                #{sectionId || "—"}
              </span>{" "}
              · version{" "}
              <span className="font-mono font-bold text-heading">
                #{versionId || "—"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fetchFields(true)}
            disabled={refreshing || !versionId || !sectionId}
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
            disabled={!versionId || !sectionId}
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
            <span>Add Field</span>
          </button>
        </div>
      </div>

      {/* ======================================================
          MISSING ID WARNING
      ====================================================== */}
      {(!versionId || !sectionId) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-warning-light bg-warning-light px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div className="flex-1">
            <p className="text-xs font-bold text-heading">
              Missing context
            </p>
            <p className="mt-0.5 text-[11px] text-text-secondary">
              Navigate here from a form section to manage its fields.
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
              placeholder="Search fields by label, key, or placeholder..."
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

          {/* Type Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowTypeDropdown((p) => !p);
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
              <span className="truncate max-w-[140px]">
                {typeFilter === "all"
                  ? "All Types"
                  : FIELD_TYPE_MAP[typeFilter]?.label || "Type"}
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
                    absolute
                    right-0
                    top-full
                    z-30
                    mt-2
                    w-56
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
                      setTypeFilter("all");
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
                      hover:bg-primary-light
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

                  {FIELD_TYPES.map((ft) => {
                    const Icon = ft.icon;
                    return (
                      <button
                        key={ft.value}
                        type="button"
                        onClick={() => {
                          setTypeFilter(ft.value);
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
                          hover:bg-primary-light
                          ${
                            typeFilter === ft.value
                              ? "bg-primary-light font-semibold text-primary"
                              : "text-text"
                          }
                        `}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className={`h-3.5 w-3.5 ${ft.color}`} />
                          {ft.label}
                        </span>
                        {typeFilter === ft.value && (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    );
                  })}
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
            <ListChecks className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">All Fields</h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredFields.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredFields.length} of {fields.length} fields
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading fields...
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
                    Field
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Type
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Required
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
                {filteredFields.map((field) => {
                  const typeMeta = getTypeMeta(field.field_type);
                  const TypeIcon = typeMeta.icon;

                  return (
                    <tr
                      key={field.id}
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
                          {field.sort_order ?? "—"}
                        </span>
                      </td>

                      {/* Field */}
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
                              bg-primary-light
                            `}
                          >
                            <TypeIcon
                              className={`h-4 w-4 ${typeMeta.color}`}
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-bold text-heading">
                                {field.label}
                              </p>
                              {field.is_required && (
                                <span className="text-danger">*</span>
                              )}
                            </div>
                            <p className="mt-0.5 truncate font-mono text-[10px] text-text-muted">
                              {field.field_key}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-border-light
                            bg-background-soft
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            ${typeMeta.color}
                          `}
                        >
                          <TypeIcon className="h-3 w-3" strokeWidth={2.4} />
                          {typeMeta.label}
                        </span>
                      </td>

                      {/* Required */}
                      <td className="px-5 py-4">
                        {field.is_required ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-light px-2.5 py-1 text-[10px] font-bold text-warning">
                            <AlertCircle className="h-3 w-3" strokeWidth={2.4} />
                            Required
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-background-soft px-2.5 py-1 text-[10px] font-bold text-text-secondary">
                            Optional
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        {field.is_active ? (
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

                      {/* Actions */}
                      <td className="relative px-5 py-4 text-right">
                        <div className="relative inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(field)}
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

                          <div className="relative" data-row-menu>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenRowMenu(
                                  openRowMenu === field.id ? null : field.id
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
                              {openRowMenu === field.id && (
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
                                  <button
                                    type="button"
                                    onClick={() => openEditModal(field)}
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    <span>Edit Field</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigator.clipboard?.writeText(
                                        field.field_key
                                      )
                                    }
                                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                  >
                                    <Copy className="h-3.5 w-3.5" />
                                    <span>Copy Field Key</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigator.clipboard?.writeText(
                                        String(field.id)
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
                                    onClick={() => openDeleteModal(field)}
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
            {filteredFields.map((field) => {
              const typeMeta = getTypeMeta(field.field_type);
              const TypeIcon = typeMeta.icon;

              return (
                <div key={field.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                      <TypeIcon
                        className={`h-5 w-5 ${typeMeta.color}`}
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-sm font-bold text-heading">
                              {field.label}
                            </p>
                            {field.is_required && (
                              <span className="text-danger">*</span>
                            )}
                          </div>
                          <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                            {field.field_key}
                          </code>
                        </div>
                        {field.is_active ? (
                          <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-[9px] font-bold text-success">
                            Active
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-full bg-danger-light px-2 py-0.5 text-[9px] font-bold text-danger">
                            Inactive
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1
                            rounded-full
                            border
                            border-border-light
                            bg-background-soft
                            px-2
                            py-0.5
                            text-[10px]
                            font-bold
                            ${typeMeta.color}
                          `}
                        >
                          <TypeIcon className="h-2.5 w-2.5" />
                          {typeMeta.label}
                        </span>
                        {field.is_required && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-warning-light px-2 py-0.5 text-[10px] font-bold text-warning">
                            Required
                          </span>
                        )}
                      </div>

                      {field.help_text && (
                        <p className="mt-2 text-[11px] text-text-muted line-clamp-2">
                          {field.help_text}
                        </p>
                      )}

                      <div className="mt-2 flex items-center gap-3 text-[10px] text-text-muted">
                        <span className="inline-flex items-center gap-1">
                          <ArrowUpDown className="h-3 w-3" />
                          Order {field.sort_order ?? "—"}
                        </span>
                        <span>·</span>
                        <span>{formatDate(field.updated_at)}</span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(field)}
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
                        <button
                          type="button"
                          onClick={() => openDeleteModal(field)}
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
        {!loading && filteredFields.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No fields found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by creating your first field."}
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
                Add Field
              </button>
            )}
          </div>
        )}
      </div>

      {/* ======================================================
          MODALS
      ====================================================== */}

      <FieldFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingField(null);
        }}
        onSave={handleSaveField}
        field={editingField}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingField(null);
        }}
        onConfirm={handleConfirmDelete}
        field={deletingField}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   FIELD FORM MODAL
============================================================ */

const FieldFormModal = ({
  isOpen,
  onClose,
  onSave,
  field,
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(field);

  const [form, setForm] = useState({
    field_key: "",
    label: "",
    field_type: "text",
    placeholder: "",
    help_text: "",
    is_required: false,
    options: [],
    validation_rules: {},
    external_path: "",
    sort_order: 1,
    is_active: true,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  const needsOptions = form.field_type === "select" || form.field_type === "radio";
  const needsExternalPath = form.field_type === "file";

  /* Reset form when modal opens */
  useEffect(() => {
    if (!isOpen) return;

    if (field) {
      setForm({
        field_key: field.field_key || "",
        label: field.label || "",
        field_type: field.field_type || "text",
        placeholder: field.placeholder || "",
        help_text: field.help_text || "",
        is_required: field.is_required ?? false,
        options: Array.isArray(field.options) ? field.options : [],
        validation_rules:
          field.validation_rules && typeof field.validation_rules === "object"
            ? field.validation_rules
            : {},
        external_path: field.external_path || "",
        sort_order: field.sort_order ?? 1,
        is_active: field.is_active ?? true,
      });
    } else {
      setForm({
        field_key: "",
        label: "",
        field_type: "text",
        placeholder: "",
        help_text: "",
        is_required: false,
        options: [],
        validation_rules: {},
        external_path: "",
        sort_order: 1,
        is_active: true,
      });
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, field]);

  /* Auto-generate field_key from label */
  useEffect(() => {
    if (isEdit) return;
    if (form.field_key && form.field_key.length > 0) return;

    const key = form.label
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s_]/g, "")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_");

    setForm((prev) => ({ ...prev, field_key: key }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.label]);

  /* Options helpers */
  const addOption = () => {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, { label: "", value: "" }],
    }));
  };

  const updateOption = (index, key, value) => {
    setForm((prev) => {
      const next = [...prev.options];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, options: next };
    });
  };

  const removeOption = (index) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  /* Validate */
  const validate = () => {
    const next = {};
    if (!form.label.trim()) next.label = "Label is required.";
    if (!form.field_key.trim()) next.field_key = "Field key is required.";
    if (!form.field_type) next.field_type = "Field type is required.";

    if (needsOptions) {
      if (form.options.length === 0) {
        next.options = "At least one option is required.";
      } else {
        const invalid = form.options.some(
          (o) => !o.label.trim() || !o.value.trim()
        );
        if (invalid) next.options = "All options need a label and value.";
      }
    }

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
      const payload = {
        field_key: form.field_key.trim(),
        label: form.label.trim(),
        field_type: form.field_type,
        placeholder: form.placeholder.trim() || null,
        help_text: form.help_text.trim() || null,
        is_required: Boolean(form.is_required),
        options: needsOptions ? form.options : null,
        validation_rules: form.validation_rules || {},
        external_path: needsExternalPath ? form.external_path.trim() || null : null,
        sort_order: Number(form.sort_order) || 1,
        is_active: Boolean(form.is_active),
      };

      await onSave(payload);
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
              max-w-[640px]
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
                    <Sparkles className="h-5 w-5 text-primary" strokeWidth={2.2} />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {isEdit ? "Edit Field" : "New Field"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update the configuration of this field."
                      : "Add a new field to this form section."}
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
                {/* Label + Field Key */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Label <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.label}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, label: e.target.value }))
                      }
                      placeholder="e.g. Company name"
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
                          errors.label
                            ? "border-danger focus:border-danger"
                            : "border-border focus:border-primary"
                        }
                      `}
                    />
                    {errors.label && (
                      <p className="mt-1.5 text-[11px] font-medium text-danger">
                        {errors.label}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Field Key <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.field_key}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          field_key: e.target.value,
                        }))
                      }
                      placeholder="e.g. company_name"
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
                          errors.field_key
                            ? "border-danger focus:border-danger"
                            : "border-border focus:border-primary"
                        }
                      `}
                    />
                    {errors.field_key && (
                      <p className="mt-1.5 text-[11px] font-medium text-danger">
                        {errors.field_key}
                      </p>
                    )}
                  </div>
                </div>

                {/* Field Type */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Field Type <span className="text-danger">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {FIELD_TYPES.map((ft) => {
                      const Icon = ft.icon;
                      const isSelected = form.field_type === ft.value;

                      return (
                        <button
                          key={ft.value}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              field_type: ft.value,
                            }))
                          }
                          className={`
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-3
                            py-2.5
                            text-left
                            text-xs
                            font-semibold
                            transition-all
                            duration-200
                            ${
                              isSelected
                                ? "border-primary bg-primary-light text-primary"
                                : "border-border bg-background text-text hover:border-primary/40 hover:bg-primary-light/50"
                            }
                          `}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isSelected ? "text-primary" : ft.color
                            }`}
                          />
                          <span className="truncate">{ft.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Placeholder + Help Text */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Placeholder
                    </label>
                    <input
                      type="text"
                      value={form.placeholder}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          placeholder: e.target.value,
                        }))
                      }
                      placeholder="e.g. Enter company name"
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
                        placeholder:text-text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Help Text
                    </label>
                    <input
                      type="text"
                      value={form.help_text}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          help_text: e.target.value,
                        }))
                      }
                      placeholder="Optional guidance for the user"
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
                        placeholder:text-text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </div>
                </div>

                {/* External Path (file only) */}
                {needsExternalPath && (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      External Path
                    </label>
                    <input
                      type="text"
                      value={form.external_path}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          external_path: e.target.value,
                        }))
                      }
                      placeholder="/uploads/documents"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-background
                        px-4
                        py-2.5
                        font-mono
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
                )}

                {/* Options Builder */}
                {needsOptions && (
                  <div className="rounded-xl border border-border-light bg-background-soft p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <List className="h-4 w-4 text-primary" />
                        <p className="text-xs font-bold text-heading">
                          Options
                        </p>
                        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                          {form.options.length}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={addOption}
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
                          font-bold
                          text-heading
                          transition-all
                          hover:border-primary
                          hover:text-primary
                        "
                      >
                        <Plus className="h-3 w-3" strokeWidth={2.6} />
                        Add Option
                      </button>
                    </div>

                    {form.options.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border bg-background p-4 text-center">
                        <p className="text-[11px] text-text-muted">
                          No options yet. Click "Add Option" to add one.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {form.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2"
                          >
                            <span
                              className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-background
                                text-[10px]
                                font-bold
                                text-text-muted
                              "
                            >
                              {index + 1}
                            </span>

                            <input
                              type="text"
                              value={option.label}
                              onChange={(e) =>
                                updateOption(index, "label", e.target.value)
                              }
                              placeholder="Label (e.g. Accrual)"
                              className="
                                flex-1
                                rounded-lg
                                border
                                border-border
                                bg-background
                                px-3
                                py-2
                                text-xs
                                text-heading
                                outline-none
                                transition-all
                                placeholder:text-text-muted
                                focus:border-primary
                                focus:ring-2
                                focus:ring-primary/10
                              "
                            />

                            <input
                              type="text"
                              value={option.value}
                              onChange={(e) =>
                                updateOption(index, "value", e.target.value)
                              }
                              placeholder="Value (e.g. accrual)"
                              className="
                                flex-1
                                rounded-lg
                                border
                                border-border
                                bg-background
                                px-3
                                py-2
                                font-mono
                                text-xs
                                text-heading
                                outline-none
                                transition-all
                                placeholder:text-text-muted
                                focus:border-primary
                                focus:ring-2
                                focus:ring-primary/10
                              "
                            />

                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                text-text-muted
                                transition-colors
                                hover:bg-danger-light
                                hover:text-danger
                              "
                              aria-label="Remove option"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {errors.options && (
                      <p className="mt-3 text-[11px] font-medium text-danger">
                        {errors.options}
                      </p>
                    )}
                  </div>
                )}

                {/* Sort Order + Required + Status */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                  </div>

                  {/* Required Toggle */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Required
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          is_required: !prev.is_required,
                        }))
                      }
                      className={`
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
                        ${
                          form.is_required
                            ? "border-warning/30 hover:border-warning/50"
                            : "border-border hover:border-text-muted/40"
                        }
                      `}
                    >
                      <span
                        className={`
                          text-xs font-semibold transition-colors
                          ${
                            form.is_required
                              ? "text-warning"
                              : "text-text-muted"
                          }
                        `}
                      >
                        {form.is_required ? "Yes" : "No"}
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
                          ${form.is_required ? "bg-warning" : "bg-border"}
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
                              form.is_required
                                ? "right-0.5"
                                : "left-0.5"
                            }
                          `}
                        />
                      </span>
                    </button>
                  </div>

                  {/* Active Toggle */}
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
                        ${
                          form.is_active
                            ? "border-success/30 hover:border-success/50"
                            : "border-border hover:border-text-muted/40"
                        }
                      `}
                    >
                      <span
                        className={`
                          text-xs font-semibold transition-colors
                          ${
                            form.is_active
                              ? "text-success"
                              : "text-text-muted"
                          }
                        `}
                      >
                        {form.is_active ? "Active" : "Inactive"}
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
                            absolute
                            top-0.5
                            h-4
                            w-4
                            rounded-full
                            bg-white
                            shadow-[0_1px_3px_rgba(0,0,0,0.15)]
                            ${
                              form.is_active
                                ? "right-0.5"
                                : "left-0.5"
                            }
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
                    <span>{isEdit ? "Save Changes" : "Create Field"}</span>
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
  field,
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
                Delete "{field?.label}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This will permanently remove the field{" "}
                <code className="rounded bg-background-soft px-1.5 py-0.5 font-mono text-[11px] text-text">
                  {field?.field_key}
                </code>{" "}
                from this section. This action cannot be undone.
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
                    <span>Delete Field</span>
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

export default ManageFormFields;