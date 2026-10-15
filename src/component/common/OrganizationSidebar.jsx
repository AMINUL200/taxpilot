import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Building2,
  FileText,
  Percent,
  UserRound,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  User,
  Check,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

/* =========================================================
   NAV ITEM — RECURSIVE
========================================================= */

const NavItem = ({
  link,
  depth = 0,
  isCollapsed,
  shouldReduceMotion,
  premiumEase,
  isActivePath,
  handleNavClick,
  expandedMap,
  toggleExpand,
}) => {
  const Icon = link.icon;
  const hasChildren = Array.isArray(link.children) && link.children.length > 0;
  const isActive = isActivePath(link.path);
  const isExpanded = expandedMap[link.id] ?? false;

  // If sidebar is collapsed, sub-items can't show — force closed
  const showChildren = hasChildren && isExpanded && !isCollapsed;

  // Check if any child (recursively) is active
  const childIsActive = useMemo(() => {
    const check = (item) => {
      if (item.path && isActivePath(item.path)) return true;
      if (item.children?.length) return item.children.some(check);
      return false;
    };
    return hasChildren ? link.children.some(check) : false;
  }, [hasChildren, link.children, isActivePath]);

  const highlighted = isActive || childIsActive;

  /* Padding shifts with depth for nested items */
  const indentClass = isCollapsed
    ? "lg:justify-center"
    : depth === 0
      ? "pl-3 pr-3"
      : depth === 1
        ? "pl-9 pr-3"
        : depth === 2
          ? "pl-14 pr-3"
          : "pl-[72px] pr-3";

  return (
    <div>
      <motion.button
        type="button"
        onClick={() => {
          if (hasChildren) {
            // If collapsed, first expand the sidebar (handled by parent)
            if (isCollapsed) {
              // Let parent expand — caller passes toggleCollapse via onToggleCollapse
              // For simplicity, we just toggle the submenu anyway
              toggleExpand(link.id);
            } else {
              toggleExpand(link.id);
            }
          } else {
            handleNavClick(link.path);
          }
        }}
        title={isCollapsed && depth === 0 ? link.label : undefined}
        initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.35,
          ease: premiumEase,
          delay: shouldReduceMotion ? 0 : depth * 0.02,
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : { x: isCollapsed ? 0 : 2, transition: { duration: 0.2 } }
        }
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        className={`
          group
          relative
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          py-2.5
          text-left
          text-[15px]
          font-medium
          transition-colors
          duration-200
          ${indentClass}
          ${
            isActive && !hasChildren
              ? "bg-primary text-text-white shadow-button"
              : highlighted
                ? "text-text-white"
                : "text-dark-muted hover:bg-dark-soft hover:text-text-white"
          }
          ${hasChildren && isExpanded ? "text-text-white" : ""}
        `}
      >
        {/* Active indicator (only for leaf items that are active) */}
        {isActive && !hasChildren && (
          <motion.span
            layoutId={`org-active-indicator-${depth}`}
            className="
              absolute
              left-0
              top-1/2
              h-6
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-sky
            "
            transition={{ duration: 0.35, ease: premiumEase }}
          />
        )}

        {/* Child-active indicator for parents */}
        {hasChildren && childIsActive && !isExpanded && (
          <span
            className="
              absolute
              left-0
              top-1/2
              h-6
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-sky
            "
          />
        )}

        {Icon && (
          <Icon
            className={`
              shrink-0
              transition-colors
              duration-200
              ${depth === 0 ? "h-[20px] w-[20px]" : "h-[18px] w-[18px]"}
              ${
                isActive && !hasChildren
                  ? "text-text-white"
                  : highlighted
                    ? "text-sky"
                    : "text-dark-muted group-hover:text-text-white"
              }
            `}
            strokeWidth={2}
          />
        )}

        {!Icon && depth > 0 && (
          <span
            className={`
              h-1.5 w-1.5 shrink-0 rounded-full
              ${
                isActive
                  ? "bg-sky"
                  : highlighted
                    ? "bg-sky/60"
                    : "bg-dark-muted group-hover:bg-text-white"
              }
            `}
          />
        )}

        <span
          className={`
            min-w-0
            flex-1
            truncate
            ${isCollapsed && depth === 0 ? "lg:hidden" : ""}
          `}
        >
          {link.label}
        </span>

        {hasChildren && !isCollapsed && (
          <ChevronDown
            className={`
              h-3.5
              w-3.5
              shrink-0
              text-dark-muted
              transition-transform
              duration-200
              ${isExpanded ? "rotate-180 text-sky" : ""}
            `}
            strokeWidth={2.4}
          />
        )}
      </motion.button>

      {/* =====================================================
          CHILDREN (RECURSIVE)
      ====================================================== */}
      <AnimatePresence initial={false}>
        {showChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1">
              {link.children.map((child) => (
                <NavItem
                  key={child.id}
                  link={child}
                  depth={depth + 1}
                  isCollapsed={isCollapsed}
                  shouldReduceMotion={shouldReduceMotion}
                  premiumEase={premiumEase}
                  isActivePath={isActivePath}
                  handleNavClick={handleNavClick}
                  expandedMap={expandedMap}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================
   ORGANIZATION SIDEBAR
========================================================= */

const OrganizationSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showOrgSwitcher, setShowOrgSwitcher] = useState(false);

  // Track which nav groups are expanded
  const [expandedMap, setExpandedMap] = useState({});

  /* =========================================================
     REAL AUTH STORE
  ========================================================= */

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const selectedOrganisation = useAuthStore((s) => s.selectedOrganisation);
  const setSelectedOrganisation = useAuthStore(
    (s) => s.setSelectedOrganisation,
  );

  /* =========================================================
     DERIVED USER INFO
  ========================================================= */

  const getInitials = () => {
    const first = user?.first_name || user?.firstName || "";
    const last = user?.last_name || user?.lastName || "";

    if (first && last) return (first[0] + last[0]).toUpperCase();
    if (first) return first.slice(0, 2).toUpperCase();
    if (user?.name) {
      const parts = user.name.trim().split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const displayName = getDisplayName();
  const displayInitials = getInitials();

  const organisationName =
    selectedOrganisation?.name ||
    selectedOrganisation?.company_name ||
    "No Organisation";

  const organisations = user?.organisations || [];
  const hasMultipleOrgs = organisations.length > 1;

  /* =========================================================
     MAIN NAVIGATION — supports nested `children`
  ========================================================= */

  const mainLinks = [
    {
      id: "overview",
      label: "Overview",
      path: "/organization",
      icon: LayoutDashboard,
    },
    {
      id: "companies",
      label: "My Companies",
      path: "/organization/companies",
      icon: Building2,
    },
    {
      id: "accounts",
      label: "Accounts",
      path: "/organization/products/accounts",
      icon: FileText,
    },
    {
      id: "ct600",
      label: "CT600",
      path: "/organization/products/ct600",
      icon: FileText,
    },
    {
      id: "ct600-accounts",
      label: "CT600 & Accounts",
      path: "/organization/products/corporation-tax",
      icon: FileText,
    },
    {
      id: "payroll",
      label: "Payroll",
      path: "/organization/products/payroll",
      icon: Percent,
    },
    {
      id: "vat",
      label: "VAT",
      path: "/organization/products/mtd-vat",
      icon: Percent,
      // Example: nested children
      children: [
        {
          id: "vat-returns",
          label: "VAT Returns",
          path: "/organization/products/mtd-vat/returns",
        },
        {
          id: "vat-settings",
          label: "VAT Settings",
          path: "/organization/products/mtd-vat/settings",
        },
        {
          id: "vat-reports",
          label: "Reports",
          path: "/organization/products/mtd-vat/reports",
          children: [
            {
              id: "vat-reports-quarterly",
              label: "Quarterly",
              path: "/organization/products/mtd-vat/reports/quarterly",
            },
            {
              id: "vat-reports-annual",
              label: "Annual",
              path: "/organization/products/mtd-vat/reports/annual",
            },
          ],
        },
      ],
    },
    {
      id: "self-assessment",
      label: "Self Assessment",
      path: "/organization/products/self-assessment",
      icon: UserRound,
    },
  ];

  /* =========================================================
     BOTTOM NAVIGATION — also supports nested `children`
  ========================================================= */

  const bottomLinks = [
    {
      id: "billing",
      label: "Billing",
      path: "/organization/billing",
      icon: CreditCard,
      children: [
        {
          id: "billing-invoices",
          label: "Invoices",
          path: "/organization/billing/invoices",
        },
        {
          id: "billing-methods",
          label: "Payment Methods",
          path: "/organization/billing/methods",
        },
      ],
    },
    {
      id: "filing-process",
      label: "Filing Process",
      path: "/organization/filing-process",
      icon: FileText, // make sure FileText is imported
      children: [
        {
          id: "filing-type",
          label: "Filing Type",
          path: "/organization/filing-process/filing-types",
        },
        {
          id: "filing-subject",
          label: "Filing Subject",
          path: "/organization/filing-process/filing-subjects",
        },
        {
          id: "filing",
          label: "Filing",
          path: "/organization/filing-process/filings",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      path: "/organization/settings",
      icon: Settings,
    },
    {
      id: "help",
      label: "Help Centre",
      path: "/help",
      icon: HelpCircle,
    },
  ];

  /* =========================================================
     CLOSE SIDEBAR ON MOBILE ROUTE CHANGE
  ========================================================= */
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* =========================================================
     ACTIVE PATH
  ========================================================= */
  const isActivePath = (path) => {
    if (!path) return false;
    if (path === "/organization") {
      return location.pathname === "/organization";
    }
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  /* =========================================================
     AUTO-EXPAND PARENT GROUPS WHEN A CHILD IS ACTIVE
  ========================================================= */
  useEffect(() => {
    const next = {};

    const walk = (items) => {
      items.forEach((item) => {
        if (item.children?.length) {
          const childActive = item.children.some((c) => {
            if (c.path && isActivePath(c.path)) return true;
            if (c.children?.length)
              return c.children.some((gc) => gc.path && isActivePath(gc.path));
            return false;
          });
          if (childActive) next[item.id] = true;
          walk(item.children);
        }
      });
    };

    walk(mainLinks);
    walk(bottomLinks);

    if (Object.keys(next).length > 0) {
      setExpandedMap((prev) => ({ ...prev, ...next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* =========================================================
     NAVIGATION
  ========================================================= */
  const handleNavClick = (path) => {
    if (!path) return;
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /* =========================================================
     LOGOUT
  ========================================================= */
  const handleLogout = async () => {
    setShowUserMenu(false);

    try {
      if (window.innerWidth < 1024) onClose?.();

      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login", { replace: true });
    }
  };

  /* =========================================================
     ORGANISATION SWITCH
  ========================================================= */
  const handleOrgSwitch = (org) => {
    setSelectedOrganisation(org);
    setShowOrgSwitcher(false);
  };

  /* =========================================================
     CLICK OUTSIDE
  ========================================================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".organization-user-menu")) {
        setShowUserMenu(false);
      }
      if (!event.target.closest(".organization-org-switcher")) {
        setShowOrgSwitcher(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r border-dark-soft bg-dark
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:w-[76px]" : "lg:w-[264px]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-[280px]
        `}
      >
        {/* LOGO HEADER */}
        <div
          className={`
            flex h-[76px] shrink-0 items-center border-b border-dark-soft px-5
            ${isCollapsed ? "lg:justify-center" : "justify-between"}
          `}
        >
          <Link
            to="/organization"
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.06, transition: { duration: 0.2 } }
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.5 7C34.5 6.2 41.4 9.1 43 15.5C44.5 21.6 40.4 27.1 33.2 29.2C29.3 30.3 25.6 29.7 22.8 27.7C23.2 19.4 24.1 12.3 26.5 7Z"
                  fill="currentColor"
                  className="text-primary"
                />
                <path
                  d="M20.5 16.5C15.2 13.2 9.4 14 6.2 18.5C3.1 22.9 4.9 28.6 10 31.4C13.3 33.2 17.1 33.2 20.4 31.5C19.1 25.9 19.2 21 20.5 16.5Z"
                  fill="currentColor"
                  className="text-sky"
                />
                <path
                  d="M21.2 25.8C14.7 25.6 9.7 29 9.2 34C8.7 39.4 13.8 43.2 19.5 42.8C25.1 42.5 29.1 38.5 28.5 33.7C27.9 29.6 25.3 27 21.2 25.8Z"
                  fill="currentColor"
                  className="text-sky-light"
                />
              </svg>
            </motion.div>

            <div
              className={`
                leading-none transition-opacity duration-200
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <div className="whitespace-nowrap text-[25px] font-bold tracking-tight text-text-white">
                TaxPilot
                <span className="text-sky"> UK</span>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="
              flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
              text-dark-muted transition-colors hover:bg-dark-soft
              hover:text-text-white lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ORGANISATION SWITCHER */}
        {selectedOrganisation && !isCollapsed && (
          <div className="organization-org-switcher relative border-b border-dark-soft px-3 py-3">
            <button
              type="button"
              onClick={() => hasMultipleOrgs && setShowOrgSwitcher((p) => !p)}
              disabled={!hasMultipleOrgs}
              className={`
                group flex w-full items-center gap-2.5 rounded-xl border
                border-dark-soft bg-dark-soft/40 px-3 py-2.5
                transition-all duration-200
                ${
                  hasMultipleOrgs
                    ? "cursor-pointer hover:border-primary/40 hover:bg-dark-soft"
                    : "cursor-default"
                }
              `}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary">
                <Building2
                  className="h-3.5 w-3.5 text-text-white"
                  strokeWidth={2.2}
                />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-[11px] font-bold text-text-white">
                  {organisationName}
                </p>
                <p className="mt-0.5 truncate text-[9px] text-dark-muted">
                  {selectedOrganisation.company_number
                    ? `#${selectedOrganisation.company_number}`
                    : "Current organisation"}
                </p>
              </div>

              {hasMultipleOrgs && (
                <ChevronDown
                  className={`
                    h-3.5 w-3.5 shrink-0 text-dark-muted
                    transition-transform duration-200
                    ${showOrgSwitcher ? "rotate-180 text-sky" : ""}
                  `}
                />
              )}
            </button>

            <AnimatePresence>
              {showOrgSwitcher && hasMultipleOrgs && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: premiumEase }}
                  className="
                    absolute left-3 right-3 top-full z-50 mt-2 overflow-hidden
                    rounded-xl border border-dark-soft bg-dark shadow-card-hover
                  "
                >
                  <div className="border-b border-dark-soft px-3 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-dark-muted">
                      Switch organisation
                    </p>
                  </div>
                  <div className="max-h-[280px] overflow-y-auto py-1">
                    {organisations.map((org) => {
                      const isSelected = selectedOrganisation?.id === org.id;
                      return (
                        <button
                          key={org.id}
                          type="button"
                          onClick={() => handleOrgSwitch(org)}
                          className="
                            flex w-full items-center gap-2.5 px-3 py-2.5
                            text-left transition-colors hover:bg-dark-soft
                          "
                        >
                          <div
                            className={`
                              flex h-7 w-7 shrink-0 items-center justify-center rounded-md
                              ${
                                isSelected
                                  ? "bg-primary text-text-white"
                                  : "bg-dark-soft text-dark-muted"
                              }
                            `}
                          >
                            <Building2
                              className="h-3.5 w-3.5"
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-semibold text-text-white">
                              {org.name || org.company_name}
                            </p>
                            {org.company_number && (
                              <p className="mt-0.5 truncate text-[9px] text-dark-muted">
                                #{org.company_number}
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <Check
                              className="h-3.5 w-3.5 shrink-0 text-sky"
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <NavItem
                key={link.id}
                link={link}
                depth={0}
                isCollapsed={isCollapsed}
                shouldReduceMotion={shouldReduceMotion}
                premiumEase={premiumEase}
                isActivePath={isActivePath}
                handleNavClick={handleNavClick}
                expandedMap={expandedMap}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>

          <div className="my-5 border-t border-dark-soft" />

          <div className="space-y-1">
            {bottomLinks.map((link) => (
              <NavItem
                key={link.id}
                link={link}
                depth={0}
                isCollapsed={isCollapsed}
                shouldReduceMotion={shouldReduceMotion}
                premiumEase={premiumEase}
                isActivePath={isActivePath}
                handleNavClick={handleNavClick}
                expandedMap={expandedMap}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </nav>

        {/* USER PROFILE */}
        <div className="organization-user-menu relative shrink-0 border-t border-dark-soft p-3">
          <motion.button
            type="button"
            onClick={() => setShowUserMenu((prev) => !prev)}
            title={isCollapsed ? "Account" : undefined}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className={`
              group flex w-full items-center gap-3 rounded-xl p-2 text-left
              transition-colors hover:bg-dark-soft
              ${isCollapsed ? "lg:justify-center" : ""}
            `}
          >
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                bg-primary text-sm font-bold text-text-white shadow-button
              "
            >
              {displayInitials}
            </div>

            <div
              className={`
                min-w-0 flex-1
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <p className="truncate text-sm font-semibold text-text-white">
                {displayName}
              </p>
              <p className="mt-0.5 truncate text-xs text-dark-muted">
                {organisationName}
              </p>
            </div>

            {!isCollapsed && (
              <ChevronDown
                className={`
                  h-4 w-4 shrink-0 text-dark-muted transition-transform
                  duration-200
                  ${showUserMenu ? "rotate-180" : ""}
                `}
              />
            )}
          </motion.button>

          <AnimatePresence>
            {showUserMenu && !isCollapsed && (
              <motion.div
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 6,
                        scale: 0.98,
                        transition: { duration: 0.15 },
                      }
                }
                transition={{ duration: 0.22, ease: premiumEase }}
                className="
                  absolute bottom-[76px] left-3 right-3 overflow-hidden
                  rounded-xl border border-dark-soft bg-dark shadow-card-hover
                "
              >
                <div className="border-b border-dark-soft px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-text-white">
                      {displayInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-text-white">
                        {displayName}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-dark-muted">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/organization/profile");
                  }}
                  className="
                    flex w-full items-center gap-3 px-4 py-3 text-left text-sm
                    text-dark-muted transition-colors hover:bg-dark-soft
                    hover:text-text-white
                  "
                >
                  <User className="h-4 w-4" />
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/organization/settings");
                  }}
                  className="
                    flex w-full items-center gap-3 border-t border-dark-soft
                    px-4 py-3 text-left text-sm text-dark-muted
                    transition-colors hover:bg-dark-soft hover:text-text-white
                  "
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex w-full items-center gap-3 border-t border-dark-soft
                    px-4 py-3 text-left text-sm text-danger
                    transition-colors hover:bg-danger-light
                  "
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* COLLAPSE BUTTON */}
        <motion.button
          type="button"
          onClick={onToggleCollapse}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { scale: 1.1, transition: { duration: 0.2 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          className="
            absolute -right-3 top-[88px] z-[60] hidden h-6 w-6 items-center
            justify-center rounded-full border border-dark-soft bg-dark
            text-dark-muted shadow-card transition-colors hover:border-primary
            hover:bg-primary hover:text-text-white lg:flex
          "
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </motion.button>
      </aside>
    </>
  );
};

export default OrganizationSidebar;
