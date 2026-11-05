import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  Info,
  Save,
  ShieldCheck,
  Loader2,
  RefreshCw,
  AlertCircle,
  X,
  Printer,
  Send,
  Pencil,
} from "lucide-react";
import api from "../../services/api";
import useAuthStore from "../../stores/authStore";

// const ORG_ID = 1; // TODO: from auth/context

const ICONS = {
  "company-details": Building2,
  "company-information": Building2,
  "accounts-and-supplementary-page": FileText,
  "income-chargeable-gains-and-deductions": FileText,
  "deductions-reliefs-and-tax-calculation": FileCheck2,
  "tax-calculation-and-reliefs": FileCheck2,
  "tax-outstanding-or-overpaid": FileCheck2,
  "tax-reconciliation-and-indicators": FileCheck2,
  "enhanced-expenditure-and-capital-allowances": FileText,
  "capital-allowances-continued": FileText,
  "losses-deficits-and-excess-amounts": FileText,
  "overpayments-and-repayments": FileCheck2,
  "bank-details-and-declaration": ShieldCheck,
};

/* ============================================================
   Helpers
============================================================ */
const getOptionLabel = (options, rawValue) => {
  if (!Array.isArray(options)) return rawValue;
  const found = options.find((o) => (o.value ?? o) === rawValue);
  if (!found) return rawValue;
  return found.label ?? found;
};

const formatValueForDisplay = (field, value) => {
  if (field.field_type === "checkbox") {
    return value ? "Yes" : "No";
  }
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (field.field_type === "select") {
    return getOptionLabel(field.options, value);
  }
  if (field.field_type === "number") {
    const n = Number(value);
    if (Number.isNaN(n)) return value;
    return `£${n.toLocaleString("en-GB")}`;
  }
  return String(value);
};

const OrganizationCorporationTaxCT600Page = () => {
  const navigate = useNavigate();
  const { filingId } = useParams();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

    const selectedOrganisation = useAuthStore((s) => s.selectedOrganisation);
    const ORG_ID = selectedOrganisation?.id;

  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filing, setFiling] = useState(null);
  const [formMeta, setFormMeta] = useState(null);
  const [saved, setSaved] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);

  // Review modal state
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sectionRefs = useRef({});
  const isScrollingRef = useRef(false);

  /* ============================================================
     FETCH FORM
  ============================================================ */
  const fetchForm = useCallback(async () => {
    if (!filingId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(
        `/organisations/${ORG_ID}/filings/${filingId}/form`,
      );

      const payload = response.data?.data;
      if (!payload) throw new Error("Empty response");

      const sortedSections = [...(payload.sections || [])]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((sec) => ({
          ...sec,
          fields: [...(sec.fields || [])].sort(
            (a, b) => a.sort_order - b.sort_order,
          ),
        }));

      const initial = {};
      sortedSections.forEach((sec) => {
        sec.fields.forEach((f) => {
          if (f.field_type === "checkbox") {
            initial[f.field_key] = Boolean(f.value);
          } else {
            initial[f.field_key] = f.value ?? "";
          }
        });
      });

      setSections(sortedSections);
      setFormData(initial);
      setFiling(payload.filing || null);
      setFormMeta(payload.filing_version || null);
      setActiveSectionId(sortedSections[0]?.id ?? null);

      console.log("[CT600] Form loaded:", {
        filing: payload.filing,
        form: payload.filing_version,
        sections: sortedSections.length,
      });
    } catch (err) {
      console.log("Fetch CT600 form failed:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load form",
      );
    } finally {
      setLoading(false);
    }
  }, [filingId]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  /* ============================================================
     CHANGE
  ============================================================ */
  const handleChange = (name, value) => {
    setSaved(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ============================================================
     SAVE DRAFT (local only for now)
  ============================================================ */
  const handleSave = async () => {
    console.log("CT600 FORM DATA:", formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  /* ============================================================
     BUILD VALUES PAYLOAD
  ============================================================ */
  const buildValuesPayload = () => {
    const values = [];
    sections.forEach((sec) => {
      sec.fields.forEach((field) => {
        let raw = formData[field.field_key];

        // checkbox → boolean
        if (field.field_type === "checkbox") {
          raw = Boolean(raw);
        }

        // Skip completely empty values (optional). Remove this if backend
        // needs every field present.
        if (raw === "" || raw === null || raw === undefined) {
          return;
        }

        values.push({
          form_field_id: field.id,
          value: raw,
        });
      });
    });
    return values;
  };

  /* ============================================================
     SUBMIT
  ============================================================ */
  const handleSubmit = async () => {
    if (!filing?.id || !formMeta?.id) {
      console.log(`[CT600] Cannot submit: missing filing or version id`, {
        filing,
        formMeta,
      });
      setSubmitError("Missing filing or version id.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = { values: buildValuesPayload() };
    const endpoint = `/organisations/${ORG_ID}/filings/${filing.id}/versions/${formMeta.id}/values`;

    console.log("[CT600] Submitting to:", endpoint);
    console.log("[CT600] Submit payload:", payload);

    try {
      const res = await api.post(endpoint, payload);
      console.log("[CT600] Submit response:", res.data);

      if (res.data?.success === true) {
        console.log("[CT600] Submit successful");

        // 1) show success state inside the modal
        setSubmitSuccess(true);

        // 2) after 2s, close modal and redirect
        setTimeout(() => {
          setReviewOpen(false);
          navigate("/organization/products/ct600");
        }, 2000);
      } else {
        // API responded but success !== true
        setSubmitError(
          res.data?.message || "Submission did not return success.",
        );
      }
    } catch (err) {
      console.log("[CT600] Submit failed:", err);
      console.error("[CT600] Submit error body:", err.response?.data);
      const msg =
        err.response?.data?.message || err.message || "Failed to submit form";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ============================================================
     SCROLL NAV
  ============================================================ */
  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (!el) return;
    isScrollingRef.current = true;
    setActiveSectionId(sectionId);
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => (isScrollingRef.current = false), 700);
  };

  useEffect(() => {
    if (!sections.length) return;
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      let currentId = sections[0].id;
      for (const section of sections) {
        const el = sectionRefs.current[section.id];
        if (!el) continue;
        if (el.getBoundingClientRect().top - 160 <= 0) currentId = section.id;
      }
      setActiveSectionId(currentId);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const activeIndex = sections.findIndex((s) => s.id === activeSectionId);

  /* ============================================================
     ANIMATIONS
  ============================================================ */
  const sectionVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };
  const fieldVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  /* ============================================================
     LOADING / ERROR
  ============================================================ */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-soft">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-sm font-semibold text-text-secondary">
            Loading CT600 form...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-soft px-4">
        <div className="max-w-md rounded-2xl border border-border bg-background p-6 text-center shadow-card">
          <AlertCircle className="mx-auto h-8 w-8 text-danger" />
          <p className="mt-3 text-sm font-bold text-heading">
            Could not load form
          </p>
          <p className="mt-1 text-xs text-text-secondary">{error}</p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-heading hover:border-primary hover:text-primary"
            >
              Go back
            </button>
            <button
              onClick={fetchForm}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <>
      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .ct600-print-area, .ct600-print-area * { visibility: visible !important; }
          .ct600-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 20px !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-background-soft">
        {/* HEADER */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: premiumEase }}
          className="sticky top-0 z-40 border-b border-border bg-background"
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() =>
                  navigate("/organization/products/corporation-tax")
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="hidden h-8 w-px bg-border sm:block" />
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-heading">
                    Corporation Tax — {formMeta?.name || "CT600"}
                  </p>
                  <p className="truncate text-[10px] text-text-secondary">
                    {filing?.reference || `Filing #${filingId}`} ·{" "}
                    {filing?.status || "draft"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <AnimatePresence>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, x: 8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                    className="hidden items-center gap-1.5 rounded-lg bg-primary-light px-3 py-2 text-[11px] font-semibold text-primary sm:flex"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Saved
                  </motion.span>
                )}
              </AnimatePresence>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-heading transition-colors hover:border-primary hover:text-primary"
              >
                <Save className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Save draft</span>
              </button>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setSubmitError(null);
                  setReviewOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-text-white shadow-button hover:bg-primary-hover"
              >
                Review <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mx-auto max-w-[1500px] px-5 pb-3 lg:px-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                Filing progress
              </span>
              <span className="text-[10px] font-bold text-primary">
                Section {activeIndex + 1} / {sections.length}
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-primary-light">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{
                  width: `${((activeIndex + 1) / Math.max(sections.length, 1)) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: premiumEase }}
              />
            </div>
          </div>
        </motion.div>

        {/* LAYOUT */}
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-[135px] lg:h-[calc(100vh-160px)]">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="flex h-full flex-col rounded-2xl border border-border bg-background shadow-card"
              >
                <div className="border-b border-border px-4 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                    {formMeta?.name || "CT600"} Return
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    Form sections
                  </p>
                  <p className="mt-1 text-[10px] text-text-secondary">
                    Click a section to jump to it
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {sections.map((item, index) => {
                    const Icon = ICONS[item.slug] || FileText;
                    const active = item.id === activeSectionId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          active
                            ? "bg-primary text-text-white shadow-button"
                            : "text-text-secondary hover:bg-primary-light hover:text-primary"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                            active ? "bg-text-white/15" : "bg-background-soft"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-[11px] font-bold ${
                              active ? "text-text-white" : "text-heading"
                            }`}
                          >
                            {item.name}
                          </span>
                          <span
                            className={`mt-0.5 block text-[9px] ${
                              active
                                ? "text-text-white/70"
                                : "text-text-secondary"
                            }`}
                          >
                            Section {index + 1}
                          </span>
                        </span>
                        {active && (
                          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-border p-3">
                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection(sections[sections.length - 1]?.id)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-[11px] font-bold text-text-white shadow-button hover:bg-primary-hover"
                  >
                    Jump to declaration <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            </aside>

            {/* CONTENT */}
            <main className="min-w-0 space-y-6">
              <div className="rounded-xl border border-border bg-primary-light p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
                    <Info className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">
                      Filing {filing?.reference || `#${filingId}`}
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-text-secondary">
                      All {sections.length} sections are shown on one page. Use
                      the sidebar navigation to jump between sections.
                    </p>
                  </div>
                </div>
              </div>

              {sections.map((section, index) => {
                const SectionIcon = ICONS[section.slug] || FileText;
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="overflow-hidden rounded-2xl border border-border bg-background shadow-card scroll-mt-[140px]"
                  >
                    <div className="border-b border-border bg-gradient-to-r from-primary-light to-background px-5 py-4 sm:px-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-text-white">
                            <SectionIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-sm font-bold text-heading">
                                {section.name}
                              </h2>
                              <span className="rounded-full bg-background px-2 py-0.5 text-[9px] font-semibold text-text-secondary ring-1 ring-border">
                                Section {index + 1} of {sections.length}
                              </span>
                            </div>
                            {section.description && (
                              <p className="mt-1 text-[11px] text-text-secondary">
                                {section.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      {section.fields.length === 0 ? (
                        <p className="text-xs italic text-text-secondary">
                          No fields defined for this section yet.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                          {section.fields.map((field, fieldIndex) => (
                            <motion.div
                              key={field.id}
                              variants={fieldVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{
                                delay: shouldReduceMotion
                                  ? 0
                                  : Math.min(fieldIndex * 0.02, 0.4),
                              }}
                              className={
                                field.field_type === "textarea"
                                  ? "xl:col-span-2"
                                  : ""
                              }
                            >
                              <DynamicField
                                field={field}
                                value={formData[field.field_key]}
                                onChange={handleChange}
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.section>
                );
              })}

              {/* BOTTOM BAR */}
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">
                      You've reached the end of the form
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Review all sections before submitting
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-xs font-semibold text-heading hover:border-primary hover:text-primary"
                  >
                    <Save className="h-3.5 w-3.5" /> Save draft
                  </button>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSubmitError(null);
                      setReviewOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-text-white shadow-button hover:bg-primary-hover"
                  >
                    Review {formMeta?.name || "CT600"}{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* ============================================================
            REVIEW MODAL
        ============================================================ */}
        <AnimatePresence>
          {reviewOpen && (
            <ReviewModal
              sections={sections}
              formData={formData}
              onChange={handleChange}
              filing={filing}
              formMeta={formMeta}
              submitting={submitting}
              submitError={submitError}
              submitSuccess={submitSuccess}
              onClose={() => {
                if (submitting) return;
                setReviewOpen(false);
              }}
              onSubmit={handleSubmit}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

/* ============================================================
   REVIEW MODAL
============================================================ */
const ReviewModal = ({
  sections,
  formData,
  onChange,
  filing,
  formMeta,
  submitting,
  submitError,
  submitSuccess,
  onClose,
  onSubmit,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const totalFields = sections.reduce((sum, s) => sum + s.fields.length, 0);
  const filledFields = sections.reduce(
    (sum, s) =>
      sum +
      s.fields.filter((f) => {
        const v = formData[f.field_key];
        return v !== "" && v !== null && v !== undefined && v !== false;
      }).length,
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={
          shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.3, ease: premiumEase }}
        className="ct600-print-area relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3 border-b border-border bg-gradient-to-r from-primary-light to-background px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-text-white">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-heading">
                Review {formMeta?.name || "CT600"} Return
              </h2>
              <p className="mt-0.5 text-[11px] text-text-secondary">
                {filing?.reference || "—"} · {filledFields}/{totalFields} fields
                completed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="no-print flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-background hover:text-heading disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {submitSuccess && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-success/30 bg-success-light p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <div>
                <p className="text-xs font-bold text-heading">
                  Submitted successfully
                </p>
                <p className="mt-0.5 text-[11px] text-text-secondary">
                  Your {formMeta?.name || "CT600"} has been submitted.
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-light p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
              <div>
                <p className="text-xs font-bold text-heading">
                  Submission failed
                </p>
                <p className="mt-0.5 text-[11px] text-text-secondary">
                  {submitError}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {sections.map((section, sIdx) => (
              <div key={section.id}>
                <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-text-white">
                    {sIdx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-heading">
                    {section.name}
                  </h3>
                  <span className="text-[10px] text-text-secondary">
                    ({section.fields.length} fields)
                  </span>
                </div>

                {section.fields.length === 0 ? (
                  <p className="text-[11px] italic text-text-secondary">
                    No fields in this section.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {section.fields.map((field) => (
                      <ReviewField
                        key={field.id}
                        field={field}
                        value={formData[field.field_key]}
                        onChange={onChange}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="no-print flex flex-col-reverse gap-2 border-t border-border bg-background-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-xs font-semibold text-heading hover:border-primary hover:text-primary disabled:opacity-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to edit
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-xs font-semibold text-heading hover:border-primary hover:text-primary"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
          </div>
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting || submitSuccess}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-text-white shadow-button hover:bg-primary-hover disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Submitting...
              </>
            ) : submitSuccess ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Submitted
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Submit {formMeta?.name || "CT600"}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   REVIEW FIELD (editable inside modal)
============================================================ */
const ReviewField = ({ field, value, onChange }) => {
  const isCheckbox = field.field_type === "checkbox";
  const isSelect = field.field_type === "select";
  const isTextarea = field.field_type === "textarea";
  const isNumber = field.field_type === "number";

  if (isCheckbox) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-border bg-background-soft p-3">
        <button
          type="button"
          onClick={() => onChange(field.field_key, !value)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
            value
              ? "border-primary bg-primary"
              : "border-border-dark bg-background"
          }`}
        >
          {value && (
            <Check className="h-3 w-3 text-text-white" strokeWidth={3} />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold leading-4 text-heading">
            {field.label}
          </p>
          {field.help_text && (
            <p className="mt-0.5 text-[9px] uppercase tracking-wider text-text-secondary">
              {field.help_text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background-soft p-3">
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <label className="text-[11px] font-semibold leading-4 text-heading">
          {field.label}
        </label>
        {field.help_text && (
          <span className="shrink-0 rounded bg-primary-light px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
            {field.help_text}
          </span>
        )}
      </div>

      {isSelect ? (
        <select
          value={value ?? ""}
          onChange={(e) => onChange(field.field_key, e.target.value)}
          className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-heading outline-none focus:border-primary"
        >
          <option value="">Select...</option>
          {(field.options || []).map((opt) => {
            const v = typeof opt === "string" ? opt : opt.value;
            const l = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={v} value={v}>
                {l}
              </option>
            );
          })}
        </select>
      ) : isTextarea ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(field.field_key, e.target.value)}
          rows={2}
          className="w-full resize-none rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-heading outline-none focus:border-primary"
        />
      ) : (
        <input
          type={
            isNumber ? "number" : field.field_type === "date" ? "date" : "text"
          }
          value={value ?? ""}
          onChange={(e) => onChange(field.field_key, e.target.value)}
          className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] text-heading outline-none focus:border-primary"
        />
      )}
    </div>
  );
};

/* ============================================================
   DYNAMIC FIELD (main form)
============================================================ */
const DynamicField = ({ field, value, onChange }) => {
  const boxLabel = field.help_text || null;
  const name = field.field_key;

  if (field.field_type === "radio" && Array.isArray(field.options)) {
    return (
      <div className="xl:col-span-2 rounded-xl border border-border bg-background-soft p-4">
        <div className="mb-3">
          <label className="text-xs font-bold text-heading">
            {field.label}
          </label>
          {boxLabel && (
            <span className="ml-2 rounded-md bg-primary-light px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
              {boxLabel}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {field.options.map((option) => {
            const optValue = typeof option === "string" ? option : option.value;
            const optLabel = typeof option === "string" ? option : option.label;
            const active = value === optValue;
            return (
              <button
                key={optValue}
                type="button"
                onClick={() => onChange(name, optValue)}
                className={`flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary-light"
                    : "border-border bg-background"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    active ? "border-primary" : "border-border-dark"
                  }`}
                >
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </span>
                <span className="text-[11px] font-semibold text-heading">
                  {optLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.field_type === "checkbox") {
    return (
      <label className="group flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background-soft p-4 transition-colors hover:border-primary hover:bg-primary-light">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(name, e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
            value
              ? "border-primary bg-primary"
              : "border-border-dark bg-background"
          }`}
        >
          {value && (
            <Check className="h-3 w-3 text-text-white" strokeWidth={3} />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold leading-5 text-heading">
            {field.label}
            {field.is_required && <span className="ml-1 text-danger">*</span>}
          </span>
          {boxLabel && (
            <span className="mt-1 block text-[9px] font-medium uppercase tracking-wider text-text-secondary">
              {boxLabel}
            </span>
          )}
        </span>
      </label>
    );
  }

  const isMultiline = field.field_type === "textarea";
  const isNumber = field.field_type === "number";
  const isSelect = field.field_type === "select";

  return (
    <div className={isMultiline ? "xl:col-span-2" : ""}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-[11px] font-bold text-heading">
          {field.label}
          {field.is_required && <span className="ml-1 text-danger">*</span>}
        </label>
        {boxLabel && (
          <span className="shrink-0 rounded-md bg-primary-light px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary">
            {boxLabel}
          </span>
        )}
      </div>

      <div className="relative">
        {isNumber && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-secondary">
            £
          </span>
        )}

        {isSelect ? (
          <select
            value={value ?? ""}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">Select...</option>
            {(field.options || []).map((opt) => {
              const v = typeof opt === "string" ? opt : opt.value;
              const l = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={v} value={v}>
                  {l}
                </option>
              );
            })}
          </select>
        ) : isMultiline ? (
          <textarea
            value={value ?? ""}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={field.placeholder || ""}
            rows={4}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        ) : (
          <input
            type={
              isNumber
                ? "number"
                : field.field_type === "date"
                  ? "date"
                  : "text"
            }
            value={value ?? ""}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={field.placeholder || ""}
            className={`w-full rounded-lg border border-border bg-background px-3 py-2.5 text-xs text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${
              isNumber ? "pl-8" : ""
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationCorporationTaxCT600Page;
