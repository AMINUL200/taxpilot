import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCw,
  ChevronDown,
  X,
  Check,
  FileText,
  Upload,
  CalendarDays,
  Pencil,
  ExternalLink,
  Archive,
  Building2,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Info,
  ShieldCheck,
  AlertTriangle,
  PauseCircle,
  User,
  UserCheck,
  Send,
  Briefcase,
  Plus,
  Bell,
  ArrowUpDown,
  ChevronRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* ============================================================
   DATA (same companies as before, written compactly)
============================================================ */

const P = (id, end, start, acc, status) => ({
  id,
  periodEnd: end,
  periodStart: start,
  profit: "—",
  tax: "—",
  accountsFiled: acc,
  ct600Filed: false,
  status,
});
const C = (
  id,
  name,
  num,
  status,
  end,
  start,
  acc,
  nextDue,
  dueType,
  periods,
  accountsOutside = false,
) => ({
  id,
  companyName: name,
  companyNumber: num,
  status,
  periodEnd: end,
  periodStart: start,
  profit: "—",
  tax: "—",
  accountsFiled: acc,
  ct600Filed: false,
  nextDue,
  dueType,
  periods,
  accountsOutside,
});

const INITIAL = [
  C(
    1,
    "SKIL FOUR LIMITED",
    "05513948",
    "Active",
    "31 Mar 2026",
    "1 Apr 2025",
    true,
    "CT600 in 6 months",
    "normal",
    [
      P(101, "31 Mar 2026", "1 Apr 2025", true, "Ready to file"),
      P(102, "31 Mar 2025", "1 Apr 2024", true, "Ready to file"),
      P(103, "31 Mar 2024", "1 Apr 2023", true, "Ready to file"),
    ],
    true,
  ),
  C(
    2,
    "GREEN TECH LTD",
    "07895432",
    "Active",
    "30 Jun 2026",
    "1 Jul 2025",
    false,
    "Accounts in 1.3 years",
    "early",
    [P(201, "30 Jun 2026", "1 Jul 2025", false, "Too early")],
  ),
  C(
    3,
    "BRIGHT IDEAS LTD",
    "11223344",
    "Active",
    "31 Dec 2025",
    "1 Jan 2025",
    true,
    "CT600 in 4 months",
    "normal",
    [P(301, "31 Dec 2025", "1 Jan 2025", true, "Ready to file")],
  ),
  C(
    4,
    "DIGITAL SOLUTIONS LTD",
    "99887766",
    "Action Required",
    "30 Jun 2025",
    "1 Jul 2024",
    false,
    "Overdue 12 days",
    "overdue",
    [P(401, "30 Jun 2025", "1 Jul 2024", false, "Overdue")],
  ),
  C(
    5,
    "OCEAN VIEW LTD",
    "66778899",
    "Active",
    "31 Mar 2027",
    "1 Apr 2026",
    false,
    "Accounts in 1.8 years",
    "early",
    [P(501, "31 Mar 2027", "1 Apr 2026", false, "Too early")],
  ),
  C(
    6,
    "SUNRISE TRADING LTD",
    "44556677",
    "Active",
    "31 Dec 2026",
    "1 Jan 2026",
    false,
    "CT600 in 9 months",
    "normal",
    [P(601, "31 Dec 2026", "1 Jan 2026", false, "Ready to file")],
  ),
];

const LANES = {
  overdue: {
    label: "Overdue",
    bar: "bg-danger",
    edge: "border-l-danger",
    pill: "bg-danger-light text-danger",
    icon: AlertCircle,
  },
  normal: {
    label: "Ready to file",
    bar: "bg-primary",
    edge: "border-l-primary",
    pill: "bg-success-light text-success",
    icon: CheckCircle2,
  },
  early: {
    label: "Too early",
    bar: "bg-warning",
    edge: "border-l-warning",
    pill: "bg-warning-light text-warning",
    icon: Clock3,
  },
};
const URGENCY = { overdue: 0, normal: 1, early: 2 };
const MONTHS = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
const toTime = (s) => {
  const [d, m, y] = s.split(" ");
  return new Date(+y, MONTHS[m], +d).getTime();
};
const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
const AVATARS = [
  "bg-primary-light text-primary",
  "bg-secondary-light text-secondary",
  "bg-accent-light text-accent",
  "bg-sky-light text-primary",
];

const COLS =
  "lg:grid-cols-[minmax(230px,2.2fr)_1.3fr_0.7fr_0.7fr_1.3fr_1.4fr_auto]";

/* ============================================================
   SMALL PIECES
============================================================ */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors duration-200";
const btnGhost = `${btnBase} border border-border bg-background text-heading hover:border-primary hover:text-primary`;
const btnPrimary = `${btnBase} bg-primary text-text-white shadow-button hover:bg-primary-hover`;

const Menu = ({ items, align = "right" }) => (
  <motion.div
    initial={{ opacity: 0, y: -6, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -4, scale: 0.98 }}
    transition={{ duration: 0.18, ease: EASE }}
    className={`absolute top-[calc(100%+6px)] z-40 w-[270px] overflow-hidden rounded-xl border border-border bg-background py-1 text-left shadow-card-hover ${align === "right" ? "right-0" : "left-0"}`}
  >
    {items.map(({ label, icon: Icon, onClick, danger, divider }) => (
      <React.Fragment key={label}>
        {divider && <div className="my-1 border-t border-border" />}
        <button
          type="button"
          onClick={onClick}
          className={`flex w-full items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors ${
            danger
              ? "text-danger hover:bg-danger-light"
              : "text-heading hover:bg-primary-light hover:text-primary"
          }`}
        >
          <Icon
            className={`h-3.5 w-3.5 shrink-0 ${danger ? "" : "text-text-secondary"}`}
            strokeWidth={2.2}
          />
          {label}
        </button>
      </React.Fragment>
    ))}
  </motion.div>
);

const Switch = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={onChange}
    className="flex w-full items-center justify-between gap-3 py-2.5 text-left"
  >
    <span className="text-xs font-medium text-heading">{label}</span>
    <span
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-primary" : "bg-border"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-card transition-transform duration-200 ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`}
      />
    </span>
  </button>
);

const Chip = ({ done, label }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${done ? "bg-primary-light text-primary" : "bg-background-soft text-text-secondary"}`}
  >
    {done ? (
      <Check className="h-3 w-3" strokeWidth={3} />
    ) : (
      <span className="h-1.5 w-1.5 rounded-full border border-text-light" />
    )}
    {label}
  </span>
);

const MobileLabel = ({ children }) => (
  <p className="mb-1 text-[11px] text-text-light lg:hidden">{children}</p>
);

/* One generic dialog replaces the five near-identical modals */
const Dialog = ({
  icon: Icon,
  tone = "primary",
  title,
  children,
  note,
  actions,
  onClose,
}) => {
  const tones = {
    primary: "bg-primary-light text-primary",
    warning: "bg-warning-light text-warning",
    danger: "bg-danger-light text-danger",
  };
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center px-4">
      <motion.div
        className="absolute inset-0 bg-dark/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[500px] rounded-2xl border border-border bg-background p-6 shadow-card-hover"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-background-soft hover:text-heading"
        >
          <X className="h-4 w-4" />
        </button>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full ${tones[tone]}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
        <h3 className="mt-4 pr-8 text-lg font-bold leading-snug text-heading">
          {title}
        </h3>
        <div className="mt-2 text-sm leading-6 text-text-secondary">
          {children}
        </div>
        {note && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-background-soft p-3.5 text-xs leading-5 text-text-secondary">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>{note}</p>
          </div>
        )}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {actions.map(({ label, onClick, kind = "ghost", icon: AIcon }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={
                kind === "primary"
                  ? btnPrimary
                  : kind === "danger"
                    ? `${btnBase} bg-danger text-text-white hover:bg-danger/90`
                    : btnGhost
              }
            >
              {AIcon && <AIcon className="h-3.5 w-3.5" />}
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ============================================================
   COMPANY ROW (details open underneath, no drawer)
============================================================ */

const CompanyRow = ({
  company,
  index,
  expanded,
  onToggle,
  openMenu,
  setOpenMenu,
  onRowAction,
  onFilingAction,
  reminders,
  toggleReminder,
  reduce,
}) => {
  const lane = LANES[company.dueType];
  const [showAll, setShowAll] = useState(false);
  const periods = showAll ? company.periods : company.periods.slice(0, 3);
  const rowKey = `row-${company.id}`;
  const menuOpen =
    openMenu === rowKey || openMenu?.startsWith(`p-${company.id}-`);

  const rowItems = [
    {
      label: "CT600 only",
      icon: FileText,
      onClick: () => onRowAction("ct600", company),
    },
    {
      label: "Has this CT600 been sent to HMRC?",
      icon: Upload,
      onClick: () => onRowAction("sent", company),
    },
    {
      label: "Has HMRC asked for a CT600?",
      icon: ShieldCheck,
      onClick: () => onRowAction("requested", company),
    },
    {
      label: "View all years",
      icon: CalendarDays,
      onClick: () => onRowAction("years", company),
    },
    {
      label: "Remove this period from dashboard",
      icon: Archive,
      danger: true,
      divider: true,
      onClick: () => onRowAction("remove", company),
    },
  ];

  const filingLabels = [
    "CT600 only",
    "CT600 Filed Elsewhere",
    "CT600 with custom dates",
    "Amend Accounts",
  ];
  const filingIcons = [FileText, Upload, CalendarDays, Pencil];
  const filingItems = (period) =>
    filingLabels.map((label, i) => ({
      label,
      icon: filingIcons[i],
      onClick: () => onFilingAction(label, period),
    }));

  return (
    <motion.div
      layout={reduce ? false : "position"}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : 0.2 + index * 0.06,
        ease: EASE,
      }}
      className={`relative border-l-[3px] ${lane.edge} ${menuOpen ? "z-30" : "z-0"} ${expanded ? "bg-background-blue-pale" : "bg-background"}`}
    >
      {/* Main row */}
      <div
        onClick={onToggle}
        className={`grid cursor-pointer grid-cols-2 items-center gap-x-4 gap-y-4 px-5 py-4 transition-colors hover:bg-background-blue-pale ${COLS}`}
      >
        {/* Company */}
        <div className="col-span-2 flex items-center gap-3 lg:col-span-1">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${AVATARS[company.id % AVATARS.length]}`}
          >
            {initials(company.companyName)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-heading">
              {company.companyName}
            </p>
            <p className="mt-0.5 flex items-center gap-2 text-[11px] text-text-secondary">
              <span className="font-mono">#{company.companyNumber}</span>
              <span className="h-1 w-1 rounded-full bg-border-dark" />
              <span
                className={
                  company.status === "Active" ? "text-success" : "text-danger"
                }
              >
                {company.status}
              </span>
            </p>
          </div>
        </div>

        {/* Period */}
        <div>
          <MobileLabel>Period end</MobileLabel>
          <p className="text-xs font-semibold text-heading">
            {company.periodEnd}
          </p>
          <p className="mt-0.5 text-[11px] text-text-secondary">
            from {company.periodStart}
          </p>
        </div>

        {/* Profit */}
        <div>
          <MobileLabel>Profit</MobileLabel>
          <p className="text-xs tabular-nums text-text-secondary">
            {company.profit}
          </p>
        </div>

        {/* Tax */}
        <div>
          <MobileLabel>Tax</MobileLabel>
          <p className="text-xs tabular-nums text-text-secondary">
            {company.tax}
          </p>
        </div>

        {/* Filing */}
        <div>
          <MobileLabel>Filing</MobileLabel>
          <div className="flex flex-wrap gap-1.5">
            <Chip done={company.accountsFiled} label="Accounts" />
            <Chip done={company.ct600Filed} label="CT600" />
          </div>
        </div>

        {/* Next due */}
        <div className="col-span-2 lg:col-span-1">
          <MobileLabel>Next due</MobileLabel>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${lane.pill}`}
          >
            <lane.icon className="h-3 w-3" strokeWidth={2.4} />
            {company.nextDue}
          </span>
        </div>

        {/* Actions */}
        <div
          className="col-span-2 flex items-center justify-end gap-2 lg:col-span-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative" data-menu-root>
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === rowKey ? null : rowKey)}
              className={company.dueType === "early" ? btnGhost : btnPrimary}
            >
              {company.dueType === "early"
                ? "Too early"
                : company.dueType === "overdue"
                  ? "Start filing"
                  : "Continue"}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === rowKey ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {openMenu === rowKey && <Menu items={rowItems} />}
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? "Hide details" : "Show details"}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-primary-light hover:text-primary"
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Details: three columns side by side */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid gap-6 border-t border-border-light px-5 pb-6 pt-5 lg:grid-cols-3 lg:pl-[76px]"
          >
            {/* Filing history */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-heading">Filing history</p>
                {company.periods.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="text-[11px] font-semibold text-primary hover:underline"
                  >
                    {showAll
                      ? "Show fewer"
                      : `Show all ${company.periods.length}`}
                  </button>
                )}
              </div>
              <div className="divide-y divide-border-light rounded-xl border border-border bg-background">
                {periods.map((period) => {
                  const key = `p-${company.id}-${period.id}`;
                  return (
                    <div
                      key={period.id}
                      className="flex items-center justify-between gap-3 px-3.5 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-heading">
                          {period.periodEnd}
                        </p>
                        <div className="mt-1.5 flex gap-1.5">
                          <Chip done={period.accountsFiled} label="Acc." />
                          <Chip done={period.ct600Filed} label="CT600" />
                        </div>
                      </div>
                      <div className="relative shrink-0" data-menu-root>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(openMenu === key ? null : key)
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-primary-light px-3 py-1.5 text-[11px] font-semibold text-primary transition-colors hover:bg-primary-soft"
                        >
                          File <ChevronDown className="h-3 w-3" />
                        </button>
                        <AnimatePresence>
                          {openMenu === key && (
                            <Menu items={filingItems(period)} />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
              {company.accountsOutside && (
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-background px-3.5 py-3 ring-1 ring-border">
                  <p className="flex items-center gap-2 text-[11px] font-medium text-heading">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Accounts
                    filed outside TaxPilot
                  </p>
                  <button
                    type="button"
                    onClick={() => console.log("Open Companies House")}
                    className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Reminders */}
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-heading">
                <Bell className="h-3.5 w-3.5 text-primary" /> Email reminders
              </p>
              <div className="divide-y divide-border-light rounded-xl border border-border bg-background px-3.5">
                <Switch
                  checked={reminders.ct600}
                  onChange={() => toggleReminder("ct600")}
                  label="CT600 reminders"
                />
                <Switch
                  checked={reminders.accounts}
                  onChange={() => toggleReminder("accounts")}
                  label="Accounts reminders"
                />
                <Switch
                  checked={reminders.confirmation}
                  onChange={() => toggleReminder("confirmation")}
                  label="Confirmation statement"
                />
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <p className="mb-3 text-xs font-bold text-heading">
                Quick actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  [FileText, "CT600 only"],
                  [Upload, "Filed elsewhere"],
                  [CalendarDays, "Custom dates"],
                  [Pencil, "Amend accounts"],
                ].map(([QIcon, label]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => console.log(label)}
                    className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-background p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
                  >
                    <QIcon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                    <span className="text-[11px] font-semibold text-heading">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => console.log("Refresh from Companies House")}
                  className={`${btnGhost} flex-1 !py-2`}
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh
                </button>
                <button
                  type="button"
                  onClick={() => console.log("Archive company")}
                  className={`${btnBase} flex-1 !py-2 border border-danger/20 bg-background text-danger hover:bg-danger hover:text-text-white`}
                >
                  <Archive className="h-3.5 w-3.5" /> Archive
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ============================================================
   PAGE
============================================================ */

const OrganizationCorporationTax = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const [companies, setCompanies] = useState(INITIAL);
  const [search, setSearch] = useState("");
  const [lane, setLane] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("All periods");
  const [sort, setSort] = useState({ key: "due", dir: 1 });
  const [expandedId, setExpandedId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [actionState, setActionState] = useState({});
  const [reminders, setReminders] = useState({
    ct600: true,
    accounts: true,
    confirmation: true,
  });

  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest("[data-menu-root]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  /* Search and period apply first, so the overview bar always matches the search */
  const matches = useMemo(
    () =>
      companies.filter((c) => {
        const q = search.toLowerCase();
        return (
          (c.companyName.toLowerCase().includes(q) ||
            c.companyNumber.includes(search)) &&
          (periodFilter === "All periods" || c.periodEnd === periodFilter)
        );
      }),
    [companies, search, periodFilter],
  );

  const counts = useMemo(() => {
    const base = { overdue: 0, normal: 0, early: 0 };
    matches.forEach((c) => (base[c.dueType] += 1));
    return base;
  }, [matches]);

  const rows = useMemo(() => {
    const list = matches.filter((c) => lane === "all" || c.dueType === lane);
    const val = {
      name: (c) => c.companyName,
      period: (c) => toTime(c.periodEnd),
      due: (c) => URGENCY[c.dueType],
    }[sort.key];
    return [...list].sort(
      (a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sort.dir,
    );
  }, [matches, lane, sort]);

  const hasFilters = search || periodFilter !== "All periods" || lane !== "all";
  const clearFilters = () => {
    setSearch("");
    setPeriodFilter("All periods");
    setLane("all");
  };
  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: -s.dir } : { key, dir: 1 }));

  /* Handlers (same behaviour as before, now taking the company directly) */
  const close = () => setDialog(null);
  const record = (company, patch, message, log) => {
    const state = { companyNumber: company.companyNumber, ...patch };
    setActionState((prev) => ({ ...prev, [company.companyNumber]: state }));
    console.log(log, state);
    setToast(message);
    close();
  };

  const onRowAction = (action, company) => {
    setOpenMenu(null);
    if (action === "ct600")
      navigate(
        `/organization/products/corporation-tax/ct600/${company.companyNumber}`,
      );
    if (action === "sent") setDialog({ type: "sent", company });
    if (action === "requested") setDialog({ type: "hmrc", company });
    if (action === "remove") setDialog({ type: "remove", company });
    if (action === "years") setExpandedId(company.id);
  };

  const onFilingAction = (action, period) => {
    setOpenMenu(null);
    console.log("Filing action:", action, period);
  };

  const renderDialog = () => {
    if (!dialog) return null;
    const { type, company } = dialog;

    const configs = {
      sent: {
        icon: Send,
        title: "Has this Company Tax Return been sent to HMRC?",
        body: (
          <>
            This is about the{" "}
            <strong className="font-semibold text-heading">CT600 itself</strong>
            , not your accounts. Having accounts accepted by Companies House is
            not the same as filing a Corporation Tax return with HMRC.
          </>
        ),
        note: "If you are not sure, close this. Nothing changes and we will keep reminding you, which is the safe option.",
        actions: [
          {
            label: "No, not yet",
            onClick: () => setDialog({ type: "pause", company }),
          },
          {
            label: "Yes, it has been sent",
            kind: "primary",
            onClick: () => setDialog({ type: "who", company }),
          },
        ],
      },
      pause: {
        icon: PauseCircle,
        tone: "warning",
        title: "Pause CT600 reminders?",
        body: (
          <>
            The return is still due and this does{" "}
            <strong className="font-semibold text-heading">not</strong> file
            anything or mark the period complete. It only pauses our reminders
            while you get to it.
          </>
        ),
        note: "You can resume reminders at any time from the same menu.",
        actions: [1, 3].map((m) => ({
          label: `Pause for ${m} month${m > 1 ? "s" : ""}`,
          icon: Clock3,
          kind: m === 3 ? "primary" : "ghost",
          onClick: () =>
            record(
              company,
              { remindersPaused: true, pauseMonths: m },
              `CT600 reminders paused for ${m} month${m > 1 ? "s" : ""}.`,
              "Reminders paused:",
            ),
        })),
      },
      who: {
        icon: UserCheck,
        title: "Who sent it?",
        body: "We record this so support can see where the return came from if there is ever a query. We cannot verify it, so it is stored as your account of what happened.",
        note: "This will mark the CT600 as sent. You can change this later.",
        actions: [
          {
            label: "I did, another way",
            icon: User,
            onClick: () =>
              record(
                company,
                { sentToHmrc: true, sentBy: "self" },
                "Recorded. Thank you.",
                "CT600 sent:",
              ),
          },
          {
            label: "My accountant",
            icon: Briefcase,
            kind: "primary",
            onClick: () =>
              record(
                company,
                { sentToHmrc: true, sentBy: "accountant" },
                "Recorded. Thank you.",
                "CT600 sent:",
              ),
          },
        ],
      },
      hmrc: {
        icon: ShieldCheck,
        title: "Has HMRC asked you for a Company Tax Return?",
        body: (
          <>
            HMRC sends a{" "}
            <strong className="font-semibold text-heading">
              "notice to deliver a Company Tax Return"
            </strong>{" "}
            (form CT603) when it expects a CT600 for an accounting period. If
            you have had one for this period, a return is due even if the
            company was dormant.
          </>
        ),
        note: "If you are not sure, close this. We will keep treating the return as due and keep reminding you. This answer does not file anything or mark the period complete.",
        actions: [
          {
            label: "No notice has arrived",
            onClick: () =>
              record(
                company,
                { hmrcNoticeReceived: false },
                "No notice recorded.",
                "HMRC notice:",
              ),
          },
          {
            label: "Yes, I have a notice",
            kind: "primary",
            onClick: () =>
              record(
                company,
                { hmrcNoticeReceived: true },
                "Notice recorded. Return still due.",
                "HMRC notice:",
              ),
          },
        ],
      },
      remove: {
        icon: AlertTriangle,
        tone: "danger",
        title: "Remove this period?",
        body: (
          <>
            This will remove this accounting period from your dashboard. It will{" "}
            <strong className="font-semibold text-heading">not</strong> delete
            the company's records or file anything with HMRC.
          </>
        ),
        note: "You can re-add the period later from the company settings.",
        actions: [
          { label: "Cancel", onClick: close },
          {
            label: "Remove period",
            icon: Archive,
            kind: "danger",
            onClick: () => {
              setCompanies((prev) => prev.filter((c) => c.id !== company.id));
              setExpandedId(null);
              console.log("Removed period for:", company.companyNumber);
              setToast("Period removed from dashboard.");
              close();
            },
          },
        ],
      },
    };

    const { body, ...rest } = configs[type];
    return (
      <Dialog {...rest} onClose={close}>
        {body}
      </Dialog>
    );
  };

  const total = matches.length || 1;
  const SortHead = ({ k, children }) => (
    <button
      type="button"
      onClick={() => toggleSort(k)}
      className={`inline-flex items-center gap-1 text-left text-xs font-semibold transition-colors hover:text-primary ${sort.key === k ? "text-primary" : "text-text-secondary"}`}
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="min-h-full bg-background-soft">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="flex items-center gap-2 text-xs font-medium text-text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />{" "}
              Synced 12d ago
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
              Corporation Tax &amp; Accounts
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              All your companies and their filing periods in one list.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => console.log("Refreshing...")}
              className={btnGhost}
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              type="button"
              onClick={() => console.log("Add company")}
              className={btnPrimary}
            >
              <Plus className="h-4 w-4" /> Add company
            </button>
          </div>
        </motion.header>

        {/* Portfolio overview: one proportional bar that doubles as a filter */}
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="mt-7 rounded-2xl border border-border bg-background p-5 shadow-card"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-sm font-bold text-heading">
              {matches.length} {matches.length === 1 ? "company" : "companies"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                ["all", "All"],
                ...Object.entries(LANES).map(([k, v]) => [
                  k,
                  `${v.label} ${counts[k]}`,
                ]),
              ].map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setLane(k)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${lane === k ? "bg-dark text-text-white" : "bg-background-soft text-text-secondary hover:text-heading"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex h-2.5 gap-1 overflow-hidden rounded-full bg-background-soft">
            {Object.entries(LANES).map(([k, v]) => (
              <motion.div
                key={k}
                className={`h-full rounded-full ${v.bar} ${lane !== "all" && lane !== k ? "opacity-25" : ""} transition-opacity`}
                initial={{ width: 0 }}
                animate={{ width: `${(counts[k] / total) * 100}%` }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              />
            ))}
          </div>
        </motion.section>

        {/* Search + period */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name or number"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-heading outline-none transition placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="h-[42px] w-full cursor-pointer appearance-none rounded-xl border border-border bg-background pl-3.5 pr-9 text-xs font-semibold text-heading outline-none transition hover:border-primary focus:border-primary sm:w-auto"
            >
              <option>All periods</option>
              <option>31 Mar 2026</option>
              <option>30 Jun 2026</option>
              <option>31 Dec 2025</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          </div>
        </motion.div>

        {/* Company list */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-5 rounded-2xl border border-border bg-background shadow-card"
        >
          {/* Column headers (desktop) */}
          <div
            className={`hidden gap-x-4 rounded-t-2xl border-b border-border bg-background-soft px-5 py-3 pl-[23px] lg:grid ${COLS}`}
          >
            <SortHead k="name">Company</SortHead>
            <SortHead k="period">Period</SortHead>
            <span className="text-xs font-semibold text-text-secondary">
              Profit
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              Tax
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              Filing
            </span>
            <SortHead k="due">Next due</SortHead>
            <span className="w-[150px]" />
          </div>

          <div className="divide-y divide-border-light">
            <AnimatePresence initial={false}>
              {rows.map((company, i) => (
                <CompanyRow
                  key={company.id}
                  company={company}
                  index={i}
                  expanded={expandedId === company.id}
                  onToggle={() =>
                    setExpandedId(expandedId === company.id ? null : company.id)
                  }
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  onRowAction={onRowAction}
                  onFilingAction={onFilingAction}
                  reminders={reminders}
                  toggleReminder={(k) =>
                    setReminders((p) => ({ ...p, [k]: !p[k] }))
                  }
                  reduce={reduce}
                />
              ))}
            </AnimatePresence>
          </div>

          {rows.length === 0 && (
            <div className="flex flex-col items-center px-5 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                <Building2 className="h-6 w-6 text-primary" />
              </span>
              <p className="mt-4 text-sm font-bold text-heading">
                No companies found
              </p>
              <p className="mt-1 max-w-xs text-xs text-text-secondary">
                {hasFilters
                  ? "Try adjusting your search or filters."
                  : "No companies have been added yet."}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`${btnGhost} mt-5`}
                >
                  <X className="h-3.5 w-3.5" /> Clear filters
                </button>
              )}
            </div>
          )}
        </motion.div>

        <p className="mt-6 flex items-start gap-2.5 text-[11px] leading-5 text-text-secondary">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          Select a company to see its filing history, reminders and quick
          actions.
        </p>
      </div>

      <AnimatePresence>
        {dialog && (
          <React.Fragment key={dialog.type}>{renderDialog()}</React.Fragment>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed bottom-6 left-1/2 z-[600] -translate-x-1/2"
            role="status"
          >
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 shadow-card-hover">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-heading">
                {toast}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizationCorporationTax;
