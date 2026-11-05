import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
  Package,
  Sparkles,
  Repeat,
  Lock,
  ArrowUpDown,
  CreditCard,
  Tag,
  CalendarClock,
  Briefcase,
  ListChecks,
  DollarSign,
} from "lucide-react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50];

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

/* ============================================================
   MANAGE SUBSCRIPTION PLAN
============================================================ */

const ManageSubscriptionPlan = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [plans, setPlans] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(15);

  // Filters
  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState(null);

  // Row menu
  const [openRowMenu, setOpenRowMenu] = useState(null);

  /* ============================================================
     FETCH PLANS
  ============================================================ */

  const fetchPlans = useCallback(
    async ({ isRefresh = false, page = currentPage } = {}) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const response = await api.get("/admin/subscription-plans", {
          params: { page },
        });

        if (!response.data?.data) {
          throw new Error(
            response.data?.message || "Failed to load subscription plans.",
          );
        }

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const meta = response.data.meta || {};

        // Sort by sort_order ascending
        const sorted = [...data].sort(
          (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
        );

        setPlans(sorted);
        setCurrentPage(meta.current_page || 1);
        setLastPage(meta.last_page || 1);
        setTotal(meta.total || sorted.length);
        setPerPage(meta.per_page || 15);
      } catch (err) {
        console.error("Fetch subscription plans error:", err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [currentPage],
  );

  /* ============================================================
     FETCH PRODUCTS (for dropdown)
  ============================================================ */

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get("/admin/subscription-products");
      if (!response.data?.data) return;

      const data = Array.isArray(response.data.data) ? response.data.data : [];
      const sorted = [...data].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
      );
      setProducts(sorted);
    } catch (err) {
      console.error("Fetch subscription products error:", err);
    }
  }, []);

  useEffect(() => {
    fetchPlans({ page: 1 });
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-menu]")) {
        setOpenRowMenu(null);
      }
      if (!event.target.closest("[data-filter-dropdown]")) {
        setShowProductDropdown(false);
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

  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.slug?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query);

      const matchesProduct =
        productFilter === "all" ||
        String(p.subscription_product_id) === String(productFilter);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && p.is_active) ||
        (statusFilter === "inactive" && !p.is_active);

      return matchesSearch && matchesProduct && matchesStatus;
    });
  }, [plans, search, productFilter, statusFilter]);

  /* ============================================================
     STATS
  ============================================================ */

  const stats = useMemo(() => {
    const totalPlans = plans.length;
    const active = plans.filter((p) => p.is_active).length;
    const featured = plans.filter((p) => p.is_featured).length;
    const withPrices = plans.filter(
      (p) => Array.isArray(p.prices) && p.prices.length > 0,
    ).length;

    return [
      {
        id: "total",
        label: "Total Plans",
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
        id: "featured",
        label: "Featured",
        value: featured,
        icon: Sparkles,
        iconBg: "bg-warning-light",
        iconColor: "text-warning",
      },
      {
        id: "priced",
        label: "With Pricing",
        value: withPrices,
        icon: CreditCard,
        iconBg: "bg-info-light",
        iconColor: "text-info",
      },
    ];
  }, [plans, total]);

  /* ============================================================
     HANDLERS — CREATE / EDIT
  ============================================================ */

  const openCreateModal = () => {
    setEditingPlan(null);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setShowFormModal(true);
    setOpenRowMenu(null);
  };

  const handleSavePlan = async (payload) => {
    if (editingPlan) {
      const response = await api.put(
        `/admin/subscription-plans/${editingPlan.id}`,
        payload,
      );

      if (!response.data?.data && !response.data?.success) {
        throw new Error(response.data?.message || "Failed to update plan.");
      }

      await fetchPlans({ isRefresh: true, page: currentPage });
    } else {
      const response = await api.post("/admin/subscription-plans", payload);

      if (!response.data?.data && !response.data?.success) {
        throw new Error(response.data?.message || "Failed to create plan.");
      }

      await fetchPlans({ isRefresh: true, page: 1 });
    }

    setShowFormModal(false);
    setEditingPlan(null);
  };

  /* ============================================================
     DELETE
  ============================================================ */

  const openDeleteModal = (plan) => {
    setDeletingPlan(plan);
    setShowDeleteModal(true);
    setOpenRowMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPlan) return;

    await api.delete(`/admin/subscription-plans/${deletingPlan.id}`);

    if (plans.length === 1 && currentPage > 1) {
      await fetchPlans({ isRefresh: true, page: currentPage - 1 });
    } else {
      await fetchPlans({ isRefresh: true, page: currentPage });
    }

    setShowDeleteModal(false);
    setDeletingPlan(null);
  };

  /* ============================================================
     PAGINATION
  ============================================================ */

  const goToPage = (page) => {
    if (page < 1 || page > lastPage || page === currentPage) return;
    fetchPlans({ page });
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

  const clearFilters = () => {
    setSearch("");
    setProductFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    search || productFilter !== "all" || statusFilter !== "all";

  /* ============================================================
     RENDER
  ============================================================ */

  /* ============================================================
   HANDLERS — FEATURES
============================================================ */

  const handleManageFeatures = (plan) => {
    navigate(`/admin/subscriptions/plans/${plan.id}/features`);
    setOpenRowMenu(null);
  };

  const handleManagePricing = (plan) => {
    navigate(`/admin/subscriptions/plans/${plan.id}/pricing`);
    setOpenRowMenu(null);
  };

  const openManageFillingTypesModal = (plan) => {
    navigate(`/admin/subscriptions/plans/${plan.id}/filing-types`);
    setOpenRowMenu(null);
  };

  const openManageEntitlementsModal = (plan) => {
    navigate(`/admin/subscriptions/plans/${plan.id}/entitlements`);
    setOpenRowMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light">
            <CreditCard className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Subscription Plans
            </h1>
            <p className="mt-0.5 text-sm text-text-secondary">
              Manage pricing plans attached to your subscription products
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              fetchPlans({ isRefresh: true, page: currentPage });
              fetchProducts();
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
            <span>Add Plan</span>
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
              placeholder="Search plans by name, slug or description..."
              className="
                w-full rounded-lg border border-border bg-background-soft
                py-2.5 pl-10 pr-4 text-sm text-heading outline-none
                transition-all placeholder:text-text-muted
                focus:border-primary focus:bg-background focus:ring-2
                focus:ring-primary/10
              "
            />
          </div>

          {/* Product Filter */}
          <div className="relative" data-filter-dropdown>
            <button
              type="button"
              onClick={() => {
                setShowProductDropdown((p) => !p);
                setShowStatusDropdown(false);
                setShowPerPageDropdown(false);
              }}
              className="
                flex w-full items-center justify-between gap-2 rounded-lg
                border border-border bg-background px-4 py-2.5 text-sm
                font-semibold text-heading transition-all duration-200
                hover:border-primary hover:text-primary lg:w-auto
              "
            >
              <span className="truncate max-w-[180px]">
                {productFilter === "all"
                  ? "All Products"
                  : products.find((p) => String(p.id) === String(productFilter))
                      ?.name || "Product"}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
                  showProductDropdown ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showProductDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: premiumEase }}
                  className="
                    absolute right-0 top-full z-30 mt-2 w-64 overflow-hidden
                    rounded-xl border border-border bg-background
                    shadow-card-hover
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setProductFilter("all");
                      setShowProductDropdown(false);
                    }}
                    className={`
                      flex w-full items-center justify-between px-4 py-2.5
                      text-left text-sm transition-colors hover:bg-primary-light
                      ${
                        productFilter === "all"
                          ? "bg-primary-light font-semibold text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span>All Products</span>
                    {productFilter === "all" && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </button>

                  {products.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setProductFilter(String(product.id));
                        setShowProductDropdown(false);
                      }}
                      className={`
                        flex w-full items-center justify-between px-4 py-2.5
                        text-left text-sm transition-colors hover:bg-primary-light
                        ${
                          String(productFilter) === String(product.id)
                            ? "bg-primary-light font-semibold text-primary"
                            : "text-text"
                        }
                      `}
                    >
                      <span className="truncate">{product.name}</span>
                      {String(productFilter) === String(product.id) && (
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
                setShowProductDropdown(false);
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
                setShowProductDropdown(false);
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
            <h2 className="text-sm font-bold text-heading">
              All Subscription Plans
            </h2>
            <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
              {filteredPlans.length}
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            {filteredPlans.length} of {plans.length} on this page · {total}{" "}
            total
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-text-secondary">Loading plans...</p>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && (
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-border-light bg-background-soft">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Order
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Plan
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Prices
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Filing Types
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
                {filteredPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="group transition-colors hover:bg-background-soft"
                  >
                    {/* Sort Order */}
                    <td className="px-5 py-4">
                      <span
                        className="
                          inline-flex h-8 w-8 items-center justify-center
                          rounded-lg bg-background-soft text-xs font-bold
                          text-text-secondary
                        "
                      >
                        {plan.sort_order ?? "—"}
                      </span>
                    </td>

                    {/* Plan */}
                    <td className="px-5 py-4 max-w-[420px]">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                          <CreditCard
                            className="h-4 w-4 text-primary"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-bold text-heading">
                              {plan.name}
                            </p>
                            {plan.is_featured && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-warning-light px-2 py-0.5 text-[9px] font-bold text-warning">
                                <Sparkles
                                  className="h-2.5 w-2.5"
                                  strokeWidth={2.6}
                                />
                                Featured
                              </span>
                            )}
                          </div>
                          <code className="mt-0.5 inline-block font-mono text-[10px] text-text-muted">
                            {plan.slug}
                          </code>
                          <p className="mt-1 text-[11px] text-text-muted line-clamp-2">
                            {plan.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Prices */}
                    <td className="px-5 py-4">
                      {Array.isArray(plan.prices) && plan.prices.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {plan.prices.slice(0, 2).map((price, i) => (
                            <span
                              key={price.id || i}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-heading"
                            >
                              <CreditCard className="h-3 w-3 text-primary" />
                              {formatPrice(price)}
                              <span className="text-[10px] font-normal text-text-muted">
                                / {price.billing_interval}
                              </span>
                            </span>
                          ))}
                          {plan.prices.length > 2 && (
                            <span className="text-[10px] italic text-text-muted">
                              +{plan.prices.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-text-muted">—</span>
                      )}
                    </td>

                    {/* Filing Types */}
                    <td className="px-5 py-4">
                      {Array.isArray(plan.filing_types) &&
                      plan.filing_types.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {plan.filing_types.slice(0, 2).map((ft) => (
                            <span
                              key={ft.id}
                              className="inline-flex items-center gap-1 rounded-full bg-info-light px-2 py-0.5 text-[9px] font-bold text-info"
                            >
                              {ft.name}
                            </span>
                          ))}
                          {plan.filing_types.length > 2 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-background-soft px-2 py-0.5 text-[9px] font-bold text-text-secondary">
                              +{plan.filing_types.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-text-muted">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {plan.is_active ? (
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
                        {/* Features button — NEW */}
                        <button
                          type="button"
                          onClick={() => handleManageFeatures(plan)}
                          className="
        inline-flex items-center gap-1 rounded-lg border
        border-primary/40 bg-primary-light px-3 py-1.5
        text-[11px] font-bold text-[var(--color-primary)]
        transition-all duration-200 hover:bg-primary
        hover:text-text-white hover:border-primary
      "
                        >
                          <ListChecks className="h-3 w-3" strokeWidth={2.4} />
                          <span>Features</span>
                        </button>
                        {/* Pricing button — NEW */}
                        <button
                          type="button"
                          onClick={() => handleManagePricing(plan)}
                          className="
        inline-flex items-center gap-1 rounded-lg border
        border-primary/40 bg-primary-light px-3 py-1.5
        text-[11px] font-bold text-[var(--color-primary)]
        transition-all duration-200 hover:bg-primary
        hover:text-text-white hover:border-primary
      "
                        >
                          <ListChecks className="h-3 w-3" strokeWidth={2.4} />
                          <span>Pricing</span>
                        </button>

                        {/* Edit button */}
                        <button
                          type="button"
                          onClick={() => openEditModal(plan)}
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

                        {/* Row menu */}
                        <div className="relative" data-row-menu>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenRowMenu(
                                openRowMenu === plan.id ? null : plan.id,
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
                            {openRowMenu === plan.id && (
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
                                {/* Manage Features — NEW */}
                                <button
                                  type="button"
                                  onClick={() => handleManageFeatures(plan)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
                                >
                                  <ListChecks className="h-3.5 w-3.5" />
                                  <span>Manage Features</span>
                                </button>

                                {/* Manage Pricing — NEW */}
                                <button
                                  type="button"
                                  onClick={() => handleManagePricing(plan)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
                                >
                                  <DollarSign className="h-3.5 w-3.5" />
                                  <span>Manage Pricing</span>
                                </button>

                                {/* Manage Subscription Filling Types Assign */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    openManageFillingTypesModal(plan)
                                  }
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
                                >
                                  <ListChecks className="h-3.5 w-3.5" />
                                  <span>Manage Filling Types</span>
                                </button>

                                {/* Manage Subscription Entitlements Assign */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    openManageEntitlementsModal(plan)
                                  }
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-light"
                                >
                                  <ListChecks className="h-3.5 w-3.5" />
                                  <span>Manage Entitlements</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openEditModal(plan)}
                                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-text transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigator.clipboard?.writeText(
                                      String(plan.id),
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
                                  onClick={() => openDeleteModal(plan)}
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
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="p-4">
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
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-bold text-heading">
                            {plan.name}
                          </p>
                          {plan.is_featured && (
                            <Sparkles
                              className="h-3 w-3 shrink-0 text-warning"
                              strokeWidth={2.6}
                            />
                          )}
                        </div>
                        <code className="mt-1 inline-block rounded bg-background-soft px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
                          {plan.slug}
                        </code>
                      </div>
                      {plan.is_active ? (
                        <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-[9px] font-bold text-success">
                          Active
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-danger-light px-2 py-0.5 text-[9px] font-bold text-danger">
                          Inactive
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-[11px] text-text-muted line-clamp-2">
                      {plan.description || "No description"}
                    </p>

                    {/* Prices */}
                    {Array.isArray(plan.prices) && plan.prices.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {plan.prices.slice(0, 2).map((price, i) => (
                          <span
                            key={price.id || i}
                            className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2 py-0.5 text-[9px] font-bold text-primary"
                          >
                            <CreditCard className="h-2.5 w-2.5" />
                            {formatPrice(price)}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Filing Types */}
                    {Array.isArray(plan.filing_types) &&
                      plan.filing_types.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {plan.filing_types.slice(0, 3).map((ft) => (
                            <span
                              key={ft.id}
                              className="inline-flex items-center gap-1 rounded-full bg-info-light px-2 py-0.5 text-[9px] font-bold text-info"
                            >
                              <Briefcase className="h-2.5 w-2.5" />
                              {ft.name}
                            </span>
                          ))}
                          {plan.filing_types.length > 3 && (
                            <span className="inline-flex items-center rounded-full bg-background-soft px-2 py-0.5 text-[9px] font-bold text-text-secondary">
                              +{plan.filing_types.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(plan)}
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
                        onClick={() => openDeleteModal(plan)}
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
        {!loading && filteredPlans.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <Inbox className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
            <p className="mt-4 text-sm font-bold text-heading">
              No plans found
            </p>
            <p className="mt-1 max-w-xs text-xs text-text-muted">
              {hasActiveFilters
                ? "Try adjusting your search or filters."
                : "Get started by creating your first subscription plan."}
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
                Add Plan
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && lastPage > 1 && (
          <div className="flex flex-col items-center gap-3 border-t border-border-light bg-background-soft px-5 py-4 sm:flex-row sm:justify-between">
            <p className="text-[11px] text-text-muted">
              Page <span className="font-bold text-heading">{currentPage}</span>{" "}
              of <span className="font-bold text-heading">{lastPage}</span>
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
      <SubscriptionPlanFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingPlan(null);
        }}
        onSave={handleSavePlan}
        plan={editingPlan}
        products={products}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingPlan(null);
        }}
        onConfirm={handleConfirmDelete}
        plan={deletingPlan}
        shouldReduceMotion={shouldReduceMotion}
        premiumEase={premiumEase}
      />
    </div>
  );
};

/* ============================================================
   SUBSCRIPTION PLAN FORM MODAL
============================================================ */

const SubscriptionPlanFormModal = ({
  isOpen,
  onClose,
  onSave,
  plan,
  products = [],
  shouldReduceMotion,
  premiumEase,
}) => {
  const isEdit = Boolean(plan);

  const [form, setForm] = useState({
    subscription_product_id: "",
    name: "",
    slug: "",
    description: "",
    is_active: true,
    is_featured: false,
    sort_order: 1,
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Slug controls
  const [slugLocked, setSlugLocked] = useState(false);
  const [originalName, setOriginalName] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");

  /* Reset when opening */
  useEffect(() => {
    if (!isOpen) return;

    if (plan) {
      const initialName = plan.name || "";
      const initialSlug = plan.slug || "";

      setForm({
        subscription_product_id:
          plan.subscription_product_id ?? plan.subscription_product?.id ?? "",
        name: initialName,
        slug: initialSlug,
        description: plan.description || "",
        is_active: plan.is_active ?? true,
        is_featured: plan.is_featured ?? false,
        sort_order: plan.sort_order ?? 1,
      });

      setOriginalName(initialName);
      setOriginalSlug(initialSlug);
      setSlugLocked(false);
    } else {
      setForm({
        subscription_product_id: products[0]?.id || "",
        name: "",
        slug: "",
        description: "",
        is_active: true,
        is_featured: false,
        sort_order: 1,
      });

      setOriginalName("");
      setOriginalSlug("");
      setSlugLocked(false);
    }

    setErrors({});
    setServerError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, plan]);

  /* Auto-generate slug from name */
  useEffect(() => {
    if (!isOpen) return;
    if (slugLocked) return;

    // On edit — if user hasn't touched name, keep stored slug
    if (isEdit && form.name === originalName && form.slug === originalSlug) {
      return;
    }

    const generated = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setForm((prev) => {
      if (prev.slug === generated) return prev;
      return { ...prev, slug: generated };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name, slugLocked, isOpen]);

  const handleSlugChange = (value) => {
    setSlugLocked(true);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const handleSyncSlug = () => {
    const generated = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setSlugLocked(false);
    setForm((prev) => ({ ...prev, slug: generated }));
  };

  const handleToggleLock = () => {
    if (slugLocked) handleSyncSlug();
    else setSlugLocked(true);
  };

  const validate = () => {
    const next = {};
    if (!form.subscription_product_id)
      next.subscription_product_id = "Product is required.";
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
        subscription_product_id: Number(form.subscription_product_id),
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        is_active: form.is_active,
        is_featured: form.is_featured,
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
                    {isEdit ? "Edit Plan" : "New Plan"}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {isEdit
                      ? "Update the details of this subscription plan."
                      : "Create a new subscription plan."}
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

              <div className="space-y-4">
                {/* Subscription Product */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Subscription Product <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.subscription_product_id}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          subscription_product_id: e.target.value,
                        }))
                      }
                      className={`
                        w-full cursor-pointer appearance-none rounded-lg
                        border bg-background px-4 py-2.5 pr-10 text-sm
                        text-heading outline-none transition-all
                        focus:ring-2 focus:ring-primary/10
                        ${
                          errors.subscription_product_id
                            ? "border-danger focus:border-danger"
                            : "border-border focus:border-primary"
                        }
                      `}
                    >
                      <option value="">Select a product...</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  </div>
                  {errors.subscription_product_id && (
                    <p className="mt-1.5 text-[11px] font-medium text-danger">
                      {errors.subscription_product_id}
                    </p>
                  )}
                </div>

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
                    placeholder="e.g. Portfolio 3"
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
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <label className="block text-xs font-semibold text-heading">
                      Slug <span className="text-danger">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleToggleLock}
                      className={`
                        inline-flex items-center gap-1 rounded-full px-2 py-0.5
                        text-[10px] font-bold transition-colors
                        ${
                          slugLocked
                            ? "bg-warning-light text-warning hover:bg-warning/20"
                            : "bg-success-light text-success hover:bg-success/20"
                        }
                      `}
                      title={
                        slugLocked
                          ? "Slug is locked — click to sync from name"
                          : "Slug follows name automatically — click to lock"
                      }
                    >
                      {slugLocked ? (
                        <>
                          <Lock className="h-2.5 w-2.5" strokeWidth={2.6} />
                          Locked
                        </>
                      ) : (
                        <>
                          <Repeat className="h-2.5 w-2.5" strokeWidth={2.6} />
                          Auto
                        </>
                      )}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="e.g. ct600-portfolio-3"
                    className={`
                      w-full rounded-lg border bg-background px-4 py-2.5
                      font-mono text-sm text-heading outline-none
                      transition-all placeholder:text-text-muted focus:ring-2
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
                  <p className="mt-1.5 text-[11px] text-text-muted">
                    {slugLocked
                      ? "Slug is locked. Click Auto to re-sync from the name."
                      : "Slug updates automatically as you type the name."}
                  </p>
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
                    placeholder="Brief description of this subscription plan..."
                    className="
                      w-full resize-none rounded-lg border border-border
                      bg-background px-4 py-2.5 text-sm text-heading
                      outline-none transition-all placeholder:text-text-muted
                      focus:border-primary focus:ring-2 focus:ring-primary/10
                    "
                  />
                </div>

                {/* Grid: sort_order + status + featured */}
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
                    <p className="mt-1.5 text-[11px] text-text-muted">
                      Lower numbers appear first.
                    </p>
                  </div>

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
                        className={`
                          text-xs font-semibold transition-colors duration-200
                          ${form.is_active ? "text-success" : "text-text-muted"}
                        `}
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

                {/* Featured */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-heading">
                    Featured
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        is_featured: !prev.is_featured,
                      }))
                    }
                    className={`
                      group flex w-full items-center justify-between gap-3
                      rounded-lg border bg-background px-4 py-2.5 text-sm
                      transition-colors duration-200
                      ${
                        form.is_featured
                          ? "border-warning/30 hover:border-warning/50"
                          : "border-border hover:border-text-muted/40"
                      }
                    `}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Sparkles
                        className={`h-3.5 w-3.5 ${
                          form.is_featured ? "text-warning" : "text-text-muted"
                        }`}
                        strokeWidth={2.4}
                      />
                      <span
                        className={`
                          text-xs font-semibold transition-colors duration-200
                          ${
                            form.is_featured
                              ? "text-warning"
                              : "text-text-muted"
                          }
                        `}
                      >
                        {form.is_featured ? "Featured" : "Not featured"}
                      </span>
                    </span>

                    <span
                      className={`
                        relative inline-flex h-5 w-9 shrink-0 items-center
                        rounded-full transition-colors duration-300
                        ease-in-out
                        ${form.is_featured ? "bg-warning" : "bg-border"}
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
                          ${form.is_featured ? "right-0.5" : "left-0.5"}
                        `}
                      />
                    </span>
                  </button>
                  <p className="mt-1.5 text-[11px] text-text-muted">
                    Highlighted on the pricing page.
                  </p>
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
                    <span>{isEdit ? "Save Changes" : "Create Plan"}</span>
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
  plan,
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
                Delete "{plan?.name}"?
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-secondary">
                This subscription plan will be permanently removed. Any
                associated prices, entitlements, or subscriptions may be
                affected. This action cannot be undone.
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
                    <span>Delete Plan</span>
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

export default ManageSubscriptionPlan;
