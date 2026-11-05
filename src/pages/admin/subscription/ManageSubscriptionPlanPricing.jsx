import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  Layers,
  Hash,
  Inbox,
  CreditCard,
  ArrowLeft,
  ArrowUpDown,
  CalendarClock,
  Tag,
  Banknote,
  Repeat,
} from "lucide-react";
import api from "../../../services/api";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const BILLING_INTERVAL_OPTIONS = [
  { value: "day", label: "Day" },
  { value: "weekly", label: "Week" },
  { value: "monthly", label: "Month" },
  { value: "yearly", label: "Yearly" },
  { value: "year", label: "Year" },
];

const CURRENCY_OPTIONS = [
  { value: "GBP", label: "GBP — British Pound" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "EUR", label: "EUR — Euro" },
];

const PAYMENT_MODE_OPTIONS = [
  { value: "one_time", label: "One-time payment" },
  { value: "recurring", label: "Recurring" },
];

/* ============================================================
   MANAGE SUBSCRIPTION PLAN PRICING
============================================================ */

const ManageSubscriptionPlanPricing = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingPrice, setDeletingPrice] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH PRICES
  ============================================================ */

  const fetchPrices = useCallback(
    async ({ isRefresh = false, page = currentPage } = {}) => {
      if (!planId) {
        setError("Missing plan ID. Please navigate from a subscription plan.");
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get(
          `/admin/subscription-plans/${planId}/prices`,
          { params: { page } }
        );

        if (!response.data?.data) {
          throw new Error(
            response.data?.message || "Failed to load plan prices."
          );
        }

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const meta = response.data.meta || {};

        setPrices(data);
        setCurrentPage(meta.current_page || 1);
        setLastPage(meta.last_page || 1);
        setTotal(meta.total || data.length);
        setPerPage(meta.per_page || 15);
      } catch (err) {
        console.error("Fetch plan prices error:", err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [planId, currentPage]
  );

  useEffect(() => {
    fetchPrices({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

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
        setShowPerPageDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredPrices = useMemo(() => {
    return prices.filter((p) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.billing_interval?.toLowerCase().includes(query) ||
        p.currency?.toLowerCase().includes(query) ||
        p.formatted_price?.toLowerCase().includes(query) ||
        p.payment_mode?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && p.is_active) ||
        (statusFilter === "inactive" && !p.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [prices, search, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const active = prices.filter((p) => p.is_active).length;
    const inactive = prices.length - active;
    const currencies = new Set(prices.map((p) => p.currency).filter(Boolean))
      .size;

    return [
      {
        id: "total",
        label: "Total Prices",
        value: total,
        icon: CreditCard,
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
        id: "currencies",
        label: "Currencies",
        value: currencies,
        icon: Banknote,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [prices, total]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingPrice(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (price) => {
    setEditingPrice(price);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSavePrice = async (payload) => {
    if (!planId) {
      throw new Error("Missing plan ID.");
    }

    if (editingPrice) {
      const response = await api.put(
        `/admin/subscription-plans/${planId}/prices/${editingPrice.id}`,
        payload
      );

      if (!response.data?.data && !response.data?.success) {
        throw new Error(response.data?.message || "Failed to update price.");
      }

      await fetchPrices({ isRefresh: true, page: currentPage });
    } else {
      const response = await api.post(
        `/admin/subscription-plans/${planId}/prices`,
        payload
      );

      if (!response.data?.data && !response.data?.success) {
        throw new Error(response.data?.message || "Failed to create price.");
      }

      await fetchPrices({ isRefresh: true, page: 1 });
    }

    setShowFormModal(false);
    setEditingPrice(null);
  };

  /* ============================================================
     DELETE
  ============================================================ */

  const openDeleteModal = (price) => {
    setDeletingPrice(price);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPrice || !planId) return;

    await api.delete(
      `/admin/subscription-plans/${planId}/prices/${deletingPrice.id}`
    );

    if (prices.length === 1 && currentPage > 1) {
      await fetchPrices({ isRefresh: true, page: currentPage - 1 });
    } else {
      await fetchPrices({ isRefresh: true, page: currentPage });
    }

    setShowDeleteModal(false);
    setDeletingPrice(null);
  };

  /* ============================================================
     PAGINATION
  ============================================================ */

  const goToPage = (page) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    fetchPrices({ page });
  };

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

  const formatPrice = (price) => {
    if (!price) return "—";
    if (price.formatted_price) return price.formatted_price;

    const amount = (Number(price.amount_minor) || 0) / 100;
    const currency = price.currency || "GBP";
    return `${currency} ${amount.toFixed(2)}`;
  };

  const formatInterval = (price) => {
    if (!price) return "—";
    if (price.payment_mode === "one_time") return "one-time";
    const count = Number(price.interval_count) || 1;
    const interval = price.billing_interval || "";
    if (!interval) return "—";
    return count > 1 ? `every ${count} ${interval}` : `per ${interval}`;
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
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
              border border-border bg-background text-text-muted
              transition-all duration-200 hover:border-primary hover:text-primary
            "
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Plan Pricing
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage prices for plan{" "}
              <span className="font-mono font-bold text-heading">
                #{planId || "—"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fetchPrices({ isRefresh: true, page: currentPage })}
            disabled={refreshing || !planId}
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
            disabled={!planId}
            className="
              inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5
              text-sm font-semibold text-text-white shadow-button
              transition-all duration-200 hover:bg-primary-hover
              hover:-translate-y-0.5 disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
            <span>Add Price</span>
          </button>
        </div>
      </div>

      {/* MISSING PLAN ID WARNING */}
      {!planId && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-xl border border-warning-light bg-warning-light px-4 py-3"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <div className="flex-1">
            <p className="text-xs font-bold text-heading">No plan selected</p>
            <p className="mt-0.5 text-[11px] text-text-secondary">
              Navigate here from a subscription plan to manage its prices.
            </p>
          </div>
        </motion.div>
      )}

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
              placeholder="Search by interval, currency, mode or price..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Status Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown((p) => !p);
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
            <CreditCard className="h-4 w-4 text-primary" strokeWidth={2.2} />
            <h2 className="text-sm font-bold text-heading">All Plan Prices</h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredPrices.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredPrices.length} of {prices.length} on this page · {total}{" "}
            total
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">
              Loading prices...
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
                    Price
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Type
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Interval
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Currency
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Effective Dates
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
                {filteredPrices.map((price) => (
                  <tr
                    key={price.id}
                    className="group transition-colors hover:bg-background-soft"
                  >
                    {/* Price */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <CreditCard
                            className="h-4 w-4 text-primary"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-heading">
                            {formatPrice(price)}
                          </p>
                          <p className="mt-0.5 text-[11px] text-text-muted">
                            {Number(price.amount_minor)?.toLocaleString()}{" "}
                            minor units
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type (payment mode) */}
                    <td className="px-5 py-4">
                      {price.payment_mode === "recurring" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-info-light px-2.5 py-1 text-[10px] font-bold text-info">
                          <Repeat className="h-3 w-3" strokeWidth={2.4} />
                          Recurring
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-bold text-primary">
                          <CreditCard className="h-3 w-3" strokeWidth={2.4} />
                          One-time
                        </span>
                      )}
                    </td>

                    {/* Interval */}
                    <td className="px-5 py-4">
                      {price.payment_mode === "recurring" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-info-light px-2.5 py-1 text-[10px] font-bold text-info">
                          <Repeat className="h-3 w-3" strokeWidth={2.4} />
                          {formatInterval(price)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-text-muted">—</span>
                      )}
                    </td>

                    {/* Currency */}
                    <td className="px-5 py-4">
                      <code className="rounded-md bg-background-soft px-2 py-1 font-mono text-[11px] text-text-secondary">
                        {price.currency}
                      </code>
                    </td>

                    {/* Effective Dates */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 text-[11px] text-text-secondary">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarClock className="h-3 w-3 text-text-muted" />
                          <span>
                            From:{" "}
                            {price.effective_from
                              ? formatDate(price.effective_from)
                              : "—"}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarClock className="h-3 w-3 text-text-muted" />
                          <span>
                            Until:{" "}
                            {price.effective_until
                              ? formatDate(price.effective_until)
                              : "—"}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {price.is_active ? (
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
                          onClick={() => openEditModal(price)}
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
                                openRowMenu === price.id ? null : price.id
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
                            {openRowMenu === price.id && (
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
                                  onClick={() => openEditModal(price)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigator.clipboard?.writeText(
                                      String(price.id)
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
                                  onClick={() => openDeleteModal(price)}
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
            {filteredPrices.map((price) => (
              <div key={price.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <CreditCard
                      className="h-5 w-5 text-primary"
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-heading">
                          {formatPrice(price)}
                        </p>
                        <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                          {price.currency}
                        </code>
                      </div>
                      {price.is_active ? (
                        <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-[9px] font-bold text-success">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-danger-light px-2 py-0.5 text-[9px] font-bold text-danger">
                          Inactive
                        </span>
                      )}
                    </div>

                    <span
                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        price.payment_mode === "recurring"
                          ? "bg-info-light text-info"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      {price.payment_mode === "recurring" ? (
                        <>
                          <Repeat className="h-2.5 w-2.5" />
                          Recurring
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-2.5 w-2.5" />
                          One-time
                        </>
                      )}
                    </span>

                    {price.payment_mode === "recurring" && (
                      <span className="mt-1 ml-1 inline-flex items-center gap-1 rounded-full bg-info-light px-2 py-0.5 text-[10px] font-bold text-info">
                        <Repeat className="h-2.5 w-2.5" />
                        {formatInterval(price)}
                      </span>
                    )}

                    <div className="mt-2 flex flex-col gap-1 text-[10px] text-text-muted">
                      <span className="inline-flex items-center gap-1">
                        <CalendarClock className="h-3 w-3" />
                        From:{" "}
                        {price.effective_from
                          ? formatDate(price.effective_from)
                          : "—"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarClock className="h-3 w-3" />
                        Until:{" "}
                        {price.effective_until
                          ? formatDate(price.effective_until)
                          : "—"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(price)}
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
                        onClick={() => openDeleteModal(price)}
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
        {!loading && filteredPrices.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No prices found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by adding your first price for this plan."}
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
                Add Price
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
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Prev</span>
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
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      <PriceFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingPrice(null);
        }}
        onSave={handleSavePrice}
        price={editingPrice}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingPrice(null);
        }}
        onConfirm={handleConfirmDelete}
        price={deletingPrice}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   PRICE FORM MODAL
============================================================ */

const PriceFormModal = ({
  isOpen,
  onClose,
  onSave,
  price,
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(price);

  const [form, setForm] = useState({
    payment_mode: "one_time",
    billing_interval: "yearly",
    interval_count: 1,
    amount: "",
    currency: "GBP",
    is_active: true,
    effective_from: "",
    effective_until: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  /* Reset when opening */
  useEffect(() => {
    if (!isOpen) return;

    if (price) {
      setForm({
        payment_mode: price.payment_mode || "one_time",
        billing_interval: price.billing_interval || "yearly",
        interval_count: price.interval_count ?? 1,
        amount: price.amount_minor
          ? (Number(price.amount_minor) / 100).toFixed(2)
          : "",
        currency: price.currency || "GBP",
        is_active: price.is_active ?? true,
        effective_from: price.effective_from
          ? price.effective_from.split("T")[0]
          : "",
        effective_until: price.effective_until
          ? price.effective_until.split("T")[0]
          : "",
      });
    } else {
      setForm({
        payment_mode: "one_time",
        billing_interval: "yearly",
        interval_count: 1,
        amount: "",
        currency: "GBP",
        is_active: true,
        effective_from: "",
        effective_until: "",
      });
    }

    setErrors({});
    setServerError(null);
  }, [isOpen, price]);

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isRecurring = form.payment_mode === "recurring";

  const validate = () => {
    const next = {};

    if (!form.payment_mode) next.payment_mode = "Payment mode is required.";

    if (isRecurring) {
      if (!form.billing_interval)
        next.billing_interval = "Billing interval is required.";

      const intervalNum = Number(form.interval_count);
      if (
        !form.interval_count ||
        Number.isNaN(intervalNum) ||
        intervalNum < 1
      ) {
        next.interval_count = "Interval count must be 1 or greater.";
      }
    }

    const amountNum = Number(form.amount);
    if (form.amount === "" || Number.isNaN(amountNum) || amountNum < 0) {
      next.amount = "Amount must be 0 or greater.";
    }

    if (!form.currency) next.currency = "Currency is required.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setServerError(null);

    try {
      const amountMinor = Math.round(Number(form.amount) * 100);

      const payload = {
        payment_mode: form.payment_mode,
        amount_minor: amountMinor,
        currency: form.currency,
        is_active: form.is_active,
        effective_from: form.effective_from || null,
        effective_until: form.effective_until || null,
      };

      if (isRecurring) {
        payload.billing_interval = form.billing_interval;
        payload.interval_count = Number(form.interval_count) || 1;
      } else {
        payload.billing_interval = null;
        payload.interval_count = null;
      }

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
              w-[calc(100%-32px)] max-w-[620px] -translate-x-1/2
              -translate-y-1/2 flex-col overflow-hidden rounded-2xl
              border border-border bg-background shadow-card-hover
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
                    {isEdit ? "Edit Price" : "New Price"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update the details of this price."
                      : "Add a new price for this plan."}
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
                {/* PAYMENT MODE */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Payment Type
                  </h4>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-heading">
                      Payment Mode <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={form.payment_mode}
                        onChange={(e) =>
                          setField("payment_mode", e.target.value)
                        }
                        className={`
                          w-full cursor-pointer appearance-none rounded-lg
                          border bg-background px-4 py-2.5 pr-10 text-sm
                          text-heading outline-none transition-all
                          focus:ring-2 focus:ring-primary/10
                          ${
                            errors.payment_mode
                              ? "border-danger focus:border-danger"
                              : "border-border focus:border-primary"
                          }
                        `}
                      >
                        {PAYMENT_MODE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                    {errors.payment_mode && (
                      <p className="mt-1.5 text-[11px] font-medium text-danger">
                        {errors.payment_mode}
                      </p>
                    )}
                    <p className="mt-1.5 text-[11px] text-text-muted">
                      One-time = single charge. Recurring = bills every interval.
                    </p>
                  </div>
                </div>

                {/* BILLING — only when recurring */}
                {isRecurring && (
                  <div>
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                      Billing
                    </h4>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-heading">
                          Billing Interval{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={form.billing_interval}
                            onChange={(e) =>
                              setField("billing_interval", e.target.value)
                            }
                            className={`
                              w-full cursor-pointer appearance-none rounded-lg
                              border bg-background px-4 py-2.5 pr-10 text-sm
                              text-heading outline-none transition-all
                              focus:ring-2 focus:ring-primary/10
                              ${
                                errors.billing_interval
                                  ? "border-danger focus:border-danger"
                                  : "border-border focus:border-primary"
                              }
                            `}
                          >
                            {BILLING_INTERVAL_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        {errors.billing_interval && (
                          <p className="mt-1.5 text-[11px] font-medium text-danger">
                            {errors.billing_interval}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-heading">
                          Interval Count <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={form.interval_count}
                          onChange={(e) =>
                            setField("interval_count", e.target.value)
                          }
                          placeholder="1"
                          className={`
                            w-full rounded-lg border bg-background px-4 py-2.5
                            text-sm text-heading outline-none transition-all
                            placeholder:text-text-muted focus:ring-2
                            focus:ring-primary/10
                            ${
                              errors.interval_count
                                ? "border-danger focus:border-danger"
                                : "border-border focus:border-primary"
                            }
                          `}
                        />
                        {errors.interval_count && (
                          <p className="mt-1.5 text-[11px] font-medium text-danger">
                            {errors.interval_count}
                          </p>
                        )}
                        <p className="mt-1.5 text-[11px] text-text-muted">
                          e.g. 1 = every interval, 3 = every 3 intervals.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRICING */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Pricing
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_180px]">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Amount <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <Banknote className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={form.amount}
                          onChange={(e) => setField("amount", e.target.value)}
                          placeholder="59.00"
                          className={`
                            w-full rounded-lg border bg-background py-2.5
                            pl-10 pr-4 text-sm text-heading outline-none
                            transition-all placeholder:text-text-muted
                            focus:ring-2 focus:ring-primary/10
                            ${
                              errors.amount
                                ? "border-danger focus:border-danger"
                                : "border-border focus:border-primary"
                            }
                          `}
                        />
                      </div>
                      {errors.amount && (
                        <p className="mt-1.5 text-[11px] font-medium text-danger">
                          {errors.amount}
                        </p>
                      )}
                      <p className="mt-1.5 text-[11px] text-text-muted">
                        Decimal amount (e.g. 59.00). Converted to minor units on
                        save.
                      </p>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Currency <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={form.currency}
                          onChange={(e) =>
                            setField("currency", e.target.value)
                          }
                          className={`
                            w-full cursor-pointer appearance-none rounded-lg
                            border bg-background px-4 py-2.5 pr-10 text-sm
                            text-heading outline-none transition-all
                            focus:ring-2 focus:ring-primary/10
                            ${
                              errors.currency
                                ? "border-danger focus:border-danger"
                                : "border-border focus:border-primary"
                            }
                          `}
                        >
                          {CURRENCY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.value}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      </div>
                      {errors.currency && (
                        <p className="mt-1.5 text-[11px] font-medium text-danger">
                          {errors.currency}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* EFFECTIVE DATES */}
                <div>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                    Effective Dates (optional)
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Effective From
                      </label>
                      <input
                        type="date"
                        value={form.effective_from}
                        onChange={(e) =>
                          setField("effective_from", e.target.value)
                        }
                        className="
                          w-full rounded-lg border border-border bg-background
                          px-4 py-2.5 text-sm text-heading outline-none
                          transition-all focus:border-primary focus:ring-2
                          focus:ring-primary/10
                        "
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-heading">
                        Effective Until
                      </label>
                      <input
                        type="date"
                        value={form.effective_until}
                        onChange={(e) =>
                          setField("effective_until", e.target.value)
                        }
                        className="
                          w-full rounded-lg border border-border bg-background
                          px-4 py-2.5 text-sm text-heading outline-none
                          transition-all focus:border-primary focus:ring-2
                          focus:ring-primary/10
                        "
                      />
                    </div>
                  </div>
                  <p className="mt-1.5 text-[11px] text-text-muted">
                    Leave blank for immediate / no expiry.
                  </p>
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
                    <span>{isEdit ? "Save Changes" : "Create Price"}</span>
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
  price,
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
                Delete this price?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {price?.formatted_price
                  ? `"${price.formatted_price}" will be permanently removed from this plan.`
                  : "This price will be permanently removed from this plan."}{" "}
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
                    <span>Delete Price</span>
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

export default ManageSubscriptionPlanPricing;