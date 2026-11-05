import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Search,
  Hash,
  ToggleLeft,
  Type,
} from "lucide-react";
import api from "../../../services/api";


const VALUE_TYPES = [
  { value: "boolean", label: "Boolean", icon: ToggleLeft },
  { value: "integer", label: "Integer", icon: Hash },
  { value: "string", label: "String", icon: Type },
];

const ManageSubscriptionEntitlements = () => {
  const navigate = useNavigate();
  const { planId } = useParams(); // e.g. /admin/subscription-plans/:planId/entitlements
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const [entitlements, setEntitlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, object = edit
  const [form, setForm] = useState({
    entitlement_key: "",
    value_type: "boolean",
    value: "",
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  // deleting state
  const [deletingId, setDeletingId] = useState(null);

  /* ============================================================
     FETCH LIST
  ============================================================ */
  const fetchEntitlements = useCallback(async () => {
    if (!planId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(
        `/admin/subscription-plans/${planId}/entitlements`
      );
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      setEntitlements(data);
      console.log("[Entitlements] loaded:", data);
    } catch (err) {
      console.log("[Entitlements] fetch failed:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load entitlements"
      );
    } finally {
      setLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchEntitlements();
  }, [fetchEntitlements]);

  /* ============================================================
     OPEN MODAL — create / edit
  ============================================================ */
  const openCreate = () => {
    setEditing(null);
    setForm({ entitlement_key: "", value_type: "boolean", value: "" });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (ent) => {
    setEditing(ent);
    setForm({
      entitlement_key: ent.entitlement_key,
      value_type: ent.value_type,
      value:
        ent.value_type === "boolean"
          ? String(Boolean(ent.value))
          : String(ent.value ?? ""),
    });
    setFormError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditing(null);
    setFormError(null);
  };

  /* ============================================================
     SAVE (create or update)
  ============================================================ */
  const handleSave = async () => {
    setFormError(null);

    // basic validation
    if (!form.entitlement_key.trim()) {
      setFormError("Entitlement key is required.");
      return;
    }
    if (!form.value_type) {
      setFormError("Value type is required.");
      return;
    }

    // cast value by type
    let valueToSend = form.value;
    if (form.value_type === "boolean") {
      valueToSend = form.value === "true" || form.value === true;
    } else if (form.value_type === "integer") {
      const n = parseInt(form.value, 10);
      if (Number.isNaN(n)) {
        setFormError("Value must be a valid integer.");
        return;
      }
      valueToSend = n;
    } else {
      valueToSend = String(form.value ?? "");
    }

    const body = {
      entitlement_key: form.entitlement_key.trim(),
      value_type: form.value_type,
      value: valueToSend,
    };

    setSaving(true);
    try {
      if (editing) {
        const endpoint = `/admin/subscription-plans/${planId}/entitlements/${editing.id}`;
        console.log("[Entitlements] UPDATE ->", endpoint, body);
        const res = await api.put(endpoint, body);
        console.log("[Entitlements] update response:", res.data);
      } else {
        const endpoint = `/admin/subscription-plans/${planId}/entitlements`;
        console.log("[Entitlements] CREATE ->", endpoint, body);
        const res = await api.post(endpoint, body);
        console.log("[Entitlements] create response:", res.data);
      }

      await fetchEntitlements();
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.log("[Entitlements] save failed:", err);
      console.error("[Entitlements] error body:", err.response?.data);
      setFormError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save entitlement"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     DELETE (optional)
  ============================================================ */
  const handleDelete = async (ent) => {
    if (!window.confirm(`Delete "${ent.entitlement_key}"?`)) return;

    setDeletingId(ent.id);
    try {
      const endpoint = `/admin/subscription-plans/${planId}/entitlements/${ent.id}`;
      console.log("[Entitlements] DELETE ->", endpoint);
      await api.delete(endpoint);
      setEntitlements((prev) => prev.filter((e) => e.id !== ent.id));
    } catch (err) {
      console.log("[Entitlements] delete failed:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete entitlement"
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* ============================================================
     DERIVED
  ============================================================ */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return entitlements;
    return entitlements.filter(
      (e) =>
        e.entitlement_key.toLowerCase().includes(q) ||
        e.value_type.toLowerCase().includes(q)
    );
  }, [entitlements, search]);

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="min-h-screen bg-background-soft">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* HEADER */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: premiumEase }}
          className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-text-secondary transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-heading sm:text-2xl">
                Subscription Plan Entitlements
              </h1>
              <p className="mt-0.5 text-xs text-text-secondary">
                Plan #{planId} — manage feature flags and limits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchEntitlements}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-heading hover:border-primary hover:text-primary"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-text-white shadow-button hover:bg-primary-hover"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Entitlement
            </button>
          </div>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search entitlement key or type..."
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <span className="rounded-full bg-primary-light px-3 py-1.5 text-[11px] font-bold text-primary">
            {filtered.length} total
          </span>
        </div>

        {/* CARD */}
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
          {loading ? (
            <div className="flex items-center justify-center gap-3 px-5 py-16 text-sm text-text-secondary">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Loading entitlements...
            </div>
          ) : error ? (
            <div className="px-5 py-12 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-danger" />
              <p className="mt-3 text-sm font-bold text-heading">
                Could not load entitlements
              </p>
              <p className="mt-1 text-xs text-text-secondary">{error}</p>
              <button
                onClick={fetchEntitlements}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-text-white"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-4 text-sm font-bold text-heading">
                No entitlements yet
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Add your first entitlement to get started.
              </p>
              <button
                onClick={openCreate}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-text-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add Entitlement
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-border bg-background-soft">
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Key
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Type
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Value
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((ent, index) => {
                    const typeMeta =
                      VALUE_TYPES.find((t) => t.value === ent.value_type) ||
                      VALUE_TYPES[2];
                    const TypeIcon = typeMeta.icon;
                    return (
                      <motion.tr
                        key={ent.id}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, y: 6 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: shouldReduceMotion ? 0 : index * 0.03,
                          ease: premiumEase,
                        }}
                        className="hover:bg-primary-light/20"
                      >
                        <td className="px-5 py-4">
                          <span className="font-mono text-xs font-semibold text-heading">
                            {ent.entitlement_key}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-light px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                            <TypeIcon className="h-3 w-3" />
                            {ent.value_type}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <ValuePill value={ent.value} valueType={ent.value_type} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => openEdit(ent)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-text-secondary transition-colors hover:border-primary hover:text-primary"
                              title="Edit"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(ent)}
                              disabled={deletingId === ent.id}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-text-secondary transition-colors hover:border-danger hover:text-danger disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === ent.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <EntitlementModal
            editing={editing}
            form={form}
            setForm={setForm}
            formError={formError}
            saving={saving}
            onClose={closeModal}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ============================================================
   VALUE PILL
============================================================ */
const ValuePill = ({ value, valueType }) => {
  if (valueType === "boolean") {
    const on = value === true || value === "true" || value === 1;
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
          on
            ? "bg-success-light text-success"
            : "bg-background-soft text-text-secondary"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${on ? "bg-success" : "bg-text-secondary"}`}
        />
        {on ? "true" : "false"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-background-soft px-2 py-1 font-mono text-[11px] font-semibold text-heading">
      {String(value)}
    </span>
  );
};

/* ============================================================
   MODAL
============================================================ */
const EntitlementModal = ({
  editing,
  form,
  setForm,
  formError,
  saving,
  onClose,
  onSave,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const update = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Reset value when type changes
      if (key === "value_type") {
        next.value =
          value === "boolean"
            ? "true"
            : "";
      }
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.3, ease: premiumEase }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3 border-b border-border bg-gradient-to-r from-primary-light to-background px-5 py-4">
          <div>
            <h2 className="text-sm font-bold text-heading">
              {editing ? "Edit entitlement" : "Add entitlement"}
            </h2>
            <p className="mt-0.5 text-[11px] text-text-secondary">
              {editing
                ? `#${editing.id} · ${editing.entitlement_key}`
                : "Create a new entitlement for this plan"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-background hover:text-heading disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-4 px-5 py-5">
          {formError && (
            <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger-light p-3">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
              <p className="text-[11px] font-medium text-danger">{formError}</p>
            </div>
          )}

          {/* KEY */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-heading">
              Entitlement key <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={form.entitlement_key}
              onChange={(e) => update("entitlement_key", e.target.value)}
              placeholder="e.g. ct600.enabled, companies.limit"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-xs text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            <p className="mt-1 text-[10px] text-text-secondary">
              Dot notation recommended: <code>feature.flag</code> or{" "}
              <code>feature.limit</code>
            </p>
          </div>

          {/* TYPE */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-heading">
              Value type <span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VALUE_TYPES.map((t) => {
                const Icon = t.icon;
                const active = form.value_type === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => update("value_type", t.value)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-[11px] font-semibold transition-colors ${
                      active
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border bg-background text-text-secondary hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* VALUE */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold text-heading">
              Value <span className="text-danger">*</span>
            </label>

            {form.value_type === "boolean" ? (
              <div className="grid grid-cols-2 gap-2">
                {["true", "false"].map((v) => {
                  const active = form.value === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update("value", v)}
                      className={`rounded-lg border px-3 py-2.5 text-xs font-semibold transition-colors ${
                        active
                          ? "border-primary bg-primary-light text-primary"
                          : "border-border bg-background text-text-secondary hover:border-primary hover:text-primary"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            ) : form.value_type === "integer" ? (
              <input
                type="number"
                value={form.value}
                onChange={(e) => update("value", e.target.value)}
                placeholder="e.g. 10"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            ) : (
              <input
                type="text"
                value={form.value}
                onChange={(e) => update("value", e.target.value)}
                placeholder="Enter a string value"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-2 border-t border-border bg-background-soft px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-xs font-semibold text-heading hover:border-primary hover:text-primary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-text-white shadow-button hover:bg-primary-hover disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                {editing ? "Update" : "Create"}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManageSubscriptionEntitlements;