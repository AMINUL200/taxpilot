import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  Search, RefreshCw, ChevronDown, ChevronRight, X, Building2, FileText,
  FileCheck2, AlertCircle, Clock3, CalendarDays, History, Calculator, Loader2,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuthStore from "../../stores/authStore";

// const ORG_ID = 1; // TODO: replace with org id from auth/context

/* ------------------------------------------------------------------
   Deterministic dummy meta — stable per subject id so UI doesn't
   flip on every render. Replace with real fields when API adds them.
------------------------------------------------------------------ */
const DUMMY_META = {
  statuses: ["Ready to file", "In progress", "Action Required", "Overdue", "Too early"],
  ct600States: ["Prepared", "Draft", "Missing information", "Not started", "Not available"],
  periods: [
    { start: "01 Apr 2025", end: "31 Mar 2026" },
    { start: "01 Jul 2025", end: "30 Jun 2026" },
    { start: "01 Jan 2025", end: "31 Dec 2025" },
    { start: "01 Jul 2024", end: "30 Jun 2025" },
    { start: "01 Apr 2026", end: "31 Mar 2027" },
    { start: "01 Jan 2026", end: "31 Dec 2026" },
  ],
  profits: ["£42,500", "£68,200", "£31,800", "£91,400", "—", "£54,700"],
  taxes: ["£8,075", "£12,958", "£6,042", "£17,366", "—", "£10,393"],
  dueDates: ["01 Jan 2027", "31 Mar 2027", "01 Oct 2026", "01 Apr 2026", "01 Jan 2028", "01 Oct 2027"],
};

function getDummyMeta(id) {
  const i = Math.abs(Number(id) || 1) % DUMMY_META.periods.length;
  return {
    periodStart: DUMMY_META.periods[i].start,
    periodEnd: DUMMY_META.periods[i].end,
    taxableProfit: DUMMY_META.profits[i],
    corporationTax: DUMMY_META.taxes[i],
    dueDate: DUMMY_META.dueDates[i],
    status: DUMMY_META.statuses[i],
    ct600: DUMMY_META.ct600States[i],
  };
}

/* Map API filing-subject → table row shape */
function mapSubjectToClient(subject) {
  const meta = getDummyMeta(subject.id);
  return {
    id: subject.id,
    clientName: subject.name,
    companyNumber: subject.company_number || "—",
    contact: subject.email || "—",
    companyType: subject.company_type || subject.subject_type,
    ...meta,
    raw: subject,
  };
}

const OrganizationCorporationTaxPage = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const selectedOrganisation = useAuthStore((s) => s.selectedOrganisation);
  const ORG_ID = selectedOrganisation?.id;


  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [periodFilter, setPeriodFilter] = useState("All periods");
  const [openMenu, setOpenMenu] = useState(null);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Filing types (lazy-loaded, cached)
  const [filingTypes, setFilingTypes] = useState(null);
  const [filingTypesLoading, setFilingTypesLoading] = useState(false);
  const filingTypesPromise = useRef(null);

  // Per-row filing-in-progress marker
  const [creatingFor, setCreatingFor] = useState(null);

  /* ---------------- Fetch filing subjects (via api) ---------------- */
  const fetchSubjects = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const response = await api.get(
        `/organisations/${ORG_ID}/filing-subjects`
      );
      console.log("Filing subjects response:", response);
      const data = Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      setClients(data.map(mapSubjectToClient));
    } catch (err) {
      // 401/403 handled globally by interceptor (logout + redirect)
      console.log("Fetch filing subjects failed:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load filing subjects"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching filing subjects...");
    fetchSubjects();
  }, [fetchSubjects]);

  /* ---------------- Fetch filing types (cached) -------------------- */
  const ensureFilingTypes = useCallback(async () => {
    if (filingTypes) return filingTypes;
    if (filingTypesPromise.current) return filingTypesPromise.current;

    setFilingTypesLoading(true);

    const promise = (async () => {
      try {
        const response = await api.get("/filing-types");
        const list = Array.isArray(response.data?.data)
          ? response.data.data
          : [];
        const active = list.filter((t) => t.is_active);
        setFilingTypes(active);
        return active;
      } catch (err) {
        filingTypesPromise.current = null; // allow retry
        throw err;
      } finally {
        setFilingTypesLoading(false);
      }
    })();

    filingTypesPromise.current = promise;
    return promise;
  }, [filingTypes]);

  /* ---------------- Create filing + redirect ----------------------- */
  const handleCreateFiling = useCallback(
    async (client, filingType) => {
      setCreatingFor(client.id);
      try {
        const response = await api.post(
          `/organisations/${ORG_ID}/filings`,
          {
            filing_subject_id: client.id,
            filing_type_id: filingType.id,
          }
        );

        const filingId = response.data?.data?.id;
        if (!filingId) {
          throw new Error("Filing created but no id returned");
        }

        setOpenMenu(null);

        // Route by filing type slug
        if (filingType.slug === "ct600") {
          navigate(`/organization/products/corporation-tax/ct600/${filingId}`);
        } else if (filingType.slug === "companies-house") {
          navigate(`/organization/products/companies-house/${filingId}`);
        } else {
          navigate(`/organization/filings/${filingId}`);
        }
      } catch (err) {
        console.error("Create filing failed:", err);
        alert(
          err.response?.data?.message ||
            err.message ||
            "Failed to create filing"
        );
      } finally {
        setCreatingFor(null);
      }
    },
    [navigate]
  );

  /* ---------------- Derived data ----------------------------------- */
  const filteredClients = useMemo(() => {
    const q = search.toLowerCase().trim();
    return clients.filter((c) => {
      const matchesSearch =
        !q ||
        c.clientName.toLowerCase().includes(q) ||
        c.companyNumber.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All statuses" || c.status === statusFilter;
      const matchesPeriod =
        periodFilter === "All periods" || c.periodEnd === periodFilter;
      return matchesSearch && matchesStatus && matchesPeriod;
    });
  }, [clients, search, statusFilter, periodFilter]);

  const stats = useMemo(() => {
    const ready = clients.filter((c) => c.status === "Ready to file").length;
    const inProgress = clients.filter((c) => c.status === "In progress").length;
    const action = clients.filter(
      (c) => c.status === "Action Required" || c.status === "Overdue"
    ).length;
    return [
      { id: "clients", label: "Corporation Tax Clients", value: clients.length, icon: Building2, iconBg: "bg-primary-light", iconColor: "text-primary" },
      { id: "ready", label: "Ready to File", value: ready, icon: FileCheck2, iconBg: "bg-success-light", iconColor: "text-success" },
      { id: "progress", label: "In Progress", value: inProgress, icon: Clock3, iconBg: "bg-warning-light", iconColor: "text-warning" },
      { id: "action", label: "Action Required", value: action, icon: AlertCircle, iconBg: "bg-danger-light", iconColor: "text-danger" },
    ];
  }, [clients]);

  const hasFilters =
    search || statusFilter !== "All statuses" || periodFilter !== "All periods";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All statuses");
    setPeriodFilter("All periods");
  };

  const handleRefresh = () => fetchSubjects(true);

  /* ---------------- Animation variants ----------------------------- */
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };
  const fadeUp = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } },
  };

  /* ---------------- Render ----------------------------------------- */
  return (
    <div className="relative min-h-full bg-background-soft">
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8"
      >
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <Calculator className="h-5 w-5 text-primary" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
                Corporation Tax debug
              </h1>
              <p className="mt-0.5 text-sm text-text-secondary">
                Manage CT600 returns and corporation tax filings for your clients.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              <span className="text-text-secondary">HMRC data synced</span>
            </div>
            <motion.button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-heading transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-background p-4 shadow-card transition-all duration-300 hover:border-primary/20 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-heading">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}>
                    <Icon className={`h-4 w-4 ${stat.iconColor}`} strokeWidth={2.2} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CLIENT LIST CARD */}
        <motion.div
          variants={fadeUp}
          className="overflow-visible rounded-xl border border-border bg-background shadow-card"
        >
          {/* Card header */}
          <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-heading">Corporation Tax Clients</h2>
              <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
                {filteredClients.length}
              </span>
            </div>
            <p className="text-[11px] text-text-secondary">CT600 filings only</p>
          </div>

          {/* FILTER BAR */}
          <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search client, company number or contact..."
                className="w-full rounded-lg border border-border bg-background-soft py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition-all duration-200 placeholder:text-text-secondary focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 min-w-[170px] cursor-pointer appearance-none rounded-lg border border-border bg-background px-4 pr-9 text-sm font-semibold text-heading outline-none transition-colors hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option>All statuses</option>
                <option>Ready to file</option>
                <option>In progress</option>
                <option>Action Required</option>
                <option>Overdue</option>
                <option>Too early</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            </div>
            <div className="relative">
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="h-10 min-w-[170px] cursor-pointer appearance-none rounded-lg border border-border bg-background px-4 pr-9 text-sm font-semibold text-heading outline-none transition-colors hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option>All periods</option>
                {[...new Set(clients.map((c) => c.periodEnd))].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            </div>
            <AnimatePresence>
              {hasFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Loading / error */}
          {loading && (
            <div className="flex items-center justify-center gap-3 px-5 py-16 text-sm text-text-secondary">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Loading clients...
            </div>
          )}
          {error && !loading && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-bold text-danger">{error}</p>
              <button
                onClick={() => fetchSubjects()}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-heading hover:border-primary hover:text-primary"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Retry
              </button>
            </div>
          )}

          {/* DESKTOP TABLE */}
          {!loading && !error && (
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-border bg-background-soft">
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">Client</th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">Accounting Period</th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">Taxable Profit</th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">Corporation Tax</th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">CT600</th>
                    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-secondary">Due Date</th>
                    <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredClients.map((client, index) => {
                    const isOverdue = client.status === "Overdue";
                    const isAction = client.status === "Action Required";
                    return (
                      <motion.tr
                        key={client.id}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.04, ease: premiumEase }}
                        className={`group transition-colors hover:bg-primary-light/20 ${
                          isOverdue ? "bg-danger-light/20" : isAction ? "bg-warning-light/20" : "bg-background"
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                              <Building2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-heading transition-colors group-hover:text-primary">
                                {client.clientName}
                              </p>
                              <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                                #{client.companyNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-xs font-bold text-heading">{client.periodEnd}</p>
                          <p className="mt-0.5 text-[10px] text-text-secondary">
                            {client.periodStart} → {client.periodEnd}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="text-xs font-semibold text-heading">{client.taxableProfit}</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="text-xs font-bold text-heading">{client.corporationTax}</span>
                        </td>
                        <td className="px-5 py-4">
                          <CT600Status status={client.ct600} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className={`h-3.5 w-3.5 ${isOverdue ? "text-danger" : "text-text-secondary"}`} />
                            <span className={`text-xs font-semibold ${isOverdue ? "text-danger" : "text-heading"}`}>
                              {client.dueDate}
                            </span>
                          </div>
                        </td>
                        <td className="relative px-5 py-4 text-right">
                          <div className="relative inline-block">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenu(openMenu === client.id ? null : client.id);
                                ensureFilingTypes().catch(() => {});
                              }}
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-bold transition-all duration-200 ${
                                openMenu === client.id
                                  ? "border-primary bg-primary-light text-primary"
                                  : "border-border bg-background text-heading hover:border-primary hover:text-primary"
                              }`}
                            >
                              Actions
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === client.id ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {openMenu === client.id && (
                                <CT600ActionMenu
                                  client={client}
                                  filingTypes={filingTypes}
                                  loading={filingTypesLoading}
                                  creating={creatingFor === client.id}
                                  onAction={handleCreateFiling}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* MOBILE LIST */}
          {!loading && !error && (
            <div className="divide-y divide-border lg:hidden">
              {filteredClients.map((client) => {
                const isOverdue = client.status === "Overdue";
                return (
                  <div key={client.id} className={`p-4 ${isOverdue ? "bg-danger-light/20" : "bg-background"}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-heading">{client.clientName}</p>
                            <p className="mt-0.5 font-mono text-[10px] text-text-secondary">#{client.companyNumber}</p>
                          </div>
                          <CT600Status status={client.ct600} />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-background-soft p-3">
                          <div>
                            <p className="text-[10px] text-text-secondary">Period End</p>
                            <p className="mt-0.5 text-[11px] font-bold text-heading">{client.periodEnd}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-text-secondary">CT600 Due</p>
                            <p className={`mt-0.5 text-[11px] font-bold ${isOverdue ? "text-danger" : "text-heading"}`}>
                              {client.dueDate}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenu(openMenu === client.id ? null : client.id);
                                ensureFilingTypes().catch(() => {});
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[10px] font-bold text-text-white shadow-button"
                            >
                              Actions
                              <ChevronDown className="h-3 w-3" />
                            </button>
                            <AnimatePresence>
                              {openMenu === client.id && (
                                <CT600ActionMenu
                                  client={client}
                                  filingTypes={filingTypes}
                                  loading={filingTypesLoading}
                                  creating={creatingFor === client.id}
                                  onAction={handleCreateFiling}
                                  mobile
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredClients.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-4 text-sm font-bold text-heading">No Corporation Tax clients found</p>
              <p className="mt-1 text-xs text-text-secondary">Try changing your search or filters.</p>
            </div>
          )}
        </motion.div>

        {/* Info note */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary-light/50 p-4"
        >
          <Calculator className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-[11px] leading-6 text-text-secondary">
            This workspace is dedicated to Corporation Tax and CT600 returns. Annual Accounts, VAT
            and other services are managed from their respective product areas. Rows missing
            period/profit/tax data are placeholders until the API exposes those fields.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ---------------- CT600 Status badge ---------------- */
const CT600Status = ({ status }) => {
  const config = {
    Prepared: { icon: FileCheck2, bg: "bg-success-light", color: "text-success" },
    Draft: { icon: FileText, bg: "bg-warning-light", color: "text-warning" },
    "Missing information": { icon: AlertCircle, bg: "bg-danger-light", color: "text-danger" },
    "Not started": { icon: Clock3, bg: "bg-background-soft", color: "text-text-secondary" },
    "Not available": { icon: Clock3, bg: "bg-background-soft", color: "text-text-secondary" },
  };
  const current = config[status] || config["Not started"];
  const Icon = current.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${current.bg} px-2.5 py-1 text-[10px] font-bold ${current.color}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
};

/* ---------------- Action menu (filing types) ---------------- */
const CT600ActionMenu = ({ client, filingTypes, loading, creating, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-[calc(100%+6px)] z-[200] w-[280px] overflow-hidden rounded-xl border border-border bg-background text-left shadow-card-hover"
    >
      <div className="border-b border-border bg-background-soft px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Start a filing</p>
        <p className="mt-1 truncate text-xs font-bold text-heading">{client.clientName}</p>
      </div>

      {loading && (
        <div className="flex items-center gap-2 px-4 py-3 text-xs text-text-secondary">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          Loading filing types...
        </div>
      )}

      {!loading && filingTypes && filingTypes.length === 0 && (
        <div className="px-4 py-3 text-xs text-text-secondary">No filing types available.</div>
      )}

      {!loading && filingTypes && filingTypes.map((ft) => (
        <ActionItem
          key={ft.id}
          icon={ft.slug === "ct600" ? Calculator : FileText}
          label={ft.name}
          description={ft.description || "Create a new filing"}
          onClick={() => !creating && onAction(client, ft)}
          primary={ft.slug === "ct600"}
          loading={creating}
        />
      ))}

      <div className="border-t border-border" />
      <ActionItem
        icon={History}
        label="Filing history"
        description="View previous filings"
        onClick={() => {}}
      />
    </motion.div>
  );
};

/* ---------------- Action item ---------------- */
const ActionItem = ({ icon: Icon, label, description, onClick, primary = false, loading = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-primary-light disabled:opacity-60"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-primary group-hover:text-text-white ${
          primary ? "bg-primary text-text-white" : "bg-primary-light text-primary"
        }`}
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold text-heading">{label}</span>
        <span className="mt-0.5 block text-[10px] leading-4 text-text-secondary">{description}</span>
      </span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  );
};

export default OrganizationCorporationTaxPage;