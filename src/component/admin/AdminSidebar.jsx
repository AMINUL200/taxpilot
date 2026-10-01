import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Building2,
  Users,
  BriefcaseBusiness,
  FileText,
  CalendarClock,
  Package,
  CreditCard,
  Receipt,
  BadgeDollarSign,
  Calculator,
  Landmark,
  Percent,
  UserRound,
  FileCheck2,
  Newspaper,
  HelpCircle,
  Files,
  Bell,
  Plug,
  Settings,
  ShieldCheck,
  LogOut,
  UserCog,
} from "lucide-react";

const AdminSidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* =========================================================
     MAIN LINKS
  ========================================================= */
  const mainLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
  ];

  /* =========================================================
     PLATFORM
  ========================================================= */
  const platformLinks = [
    {
      id: "organizations",
      label: "Organizations",
      path: "/admin/organizations",
      icon: Building2,
    },
    {
      id: "users",
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      id: "companies",
      label: "Companies",
      path: "/admin/companies",
      icon: BriefcaseBusiness,
    },
    {
      id: "filings",
      label: "Filings",
      path: "/admin/filings",
      icon: FileText,
    },
    {
      id: "deadlines",
      label: "Deadlines",
      path: "/admin/deadlines",
      icon: CalendarClock,
    },
  ];

  /* =========================================================
     COMMERCE
  ========================================================= */
  const commerceLinks = [
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      path: "/admin/subscriptions",
      icon: BadgeDollarSign,
    },
    {
      id: "plans",
      label: "Plans & Pricing",
      path: "/admin/plans",
      icon: Calculator,
    },
    {
      id: "payments",
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      id: "invoices",
      label: "Invoices",
      path: "/admin/invoices",
      icon: Receipt,
    },
  ];

  /* =========================================================
     COMPLIANCE PRODUCTS
  ========================================================= */
  const complianceLinks = [
    {
      id: "corporation-tax",
      label: "Corporation Tax",
      path: "/admin/products/corporation-tax",
      icon: Landmark,
    },
    {
      id: "annual-accounts",
      label: "Annual Accounts",
      path: "/admin/products/annual-accounts",
      icon: FileText,
    },
    {
      id: "mtd-vat",
      label: "MTD VAT",
      path: "/admin/products/mtd-vat",
      icon: Percent,
    },
    {
      id: "self-assessment",
      label: "Self Assessment",
      path: "/admin/products/self-assessment",
      icon: UserRound,
    },
    {
      id: "confirmation-statement",
      label: "Confirmation Statement",
      path: "/admin/products/confirmation-statement",
      icon: FileCheck2,
    },
  ];

  /* =========================================================
     CONTENT
  ========================================================= */
  const contentLinks = [
    {
      id: "blog",
      label: "Blog",
      path: "/admin/blog",
      icon: Newspaper,
    },
    {
      id: "help",
      label: "Help Centre",
      path: "/admin/help",
      icon: HelpCircle,
    },
    {
      id: "pages",
      label: "Pages",
      path: "/admin/pages",
      icon: Files,
    },
  ];

  /* =========================================================
     SYSTEM
  ========================================================= */
  const systemLinks = [
    {
      id: "notifications",
      label: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },
    {
      id: "integrations",
      label: "Integrations",
      path: "/admin/integrations",
      icon: Plug,
    },
    {
      id: "settings",
      label: "Platform Settings",
      path: "/admin/settings",
      icon: Settings,
    },
    {
      id: "admin-users",
      label: "Admin Users",
      path: "/admin/admin-users",
      icon: UserCog,
    },
  ];

  /* =========================================================
     MOBILE CLOSE ON NAVIGATE
  ========================================================= */
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
  }, [location.pathname]);

  /* =========================================================
     ACTIVE PATH
  ========================================================= */
  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */
  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */
  const handleLogout = () => {
    navigate("/login");
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  /* =========================================================
     LINK RENDERER
  ========================================================= */
  const renderLinks = (links) => {
    return links.map((link, index) => {
      const Icon = link.icon;
      const isActive = isActivePath(link.path);

      return (
        <motion.button
          key={link.id}
          type="button"
          onClick={() => handleNavClick(link.path)}
          title={isCollapsed ? link.label : undefined}
          initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: premiumEase,
            delay: shouldReduceMotion ? 0 : index * 0.03,
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { x: 2, transition: { duration: 0.2 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className={`
            group
            relative
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2.5
            text-sm
            font-medium
            transition-colors
            duration-200

            ${isCollapsed ? "lg:justify-center" : ""}

            ${
              isActive
                ? "bg-primary text-text-white shadow-button"
                : "text-dark-muted hover:bg-dark-soft hover:text-text-white"
            }
          `}
        >
          {/* Active indicator bar */}
          {isActive && (
            <motion.span
              layoutId="activeIndicator"
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
              transition={{
                duration: 0.35,
                ease: premiumEase,
              }}
            />
          )}

          <Icon
            className={`
              h-[18px]
              w-[18px]
              shrink-0
              transition-colors
              duration-200
              ${
                isActive
                  ? "text-text-white"
                  : "text-dark-muted group-hover:text-text-white"
              }
            `}
            strokeWidth={2.1}
          />

          <span
            className={`
              truncate
              ${isCollapsed ? "lg:hidden" : ""}
            `}
          >
            {link.label}
          </span>
        </motion.button>
      );
    });
  };

  /* =========================================================
     SECTION
  ========================================================= */
  const renderSection = (title, icon, links) => {
    const SectionIcon = icon;

    return (
      <motion.div
        className="mt-6"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
      >
        {!isCollapsed ? (
          <div className="mb-2 flex items-center gap-2 px-3">
            {SectionIcon && <SectionIcon className="h-3 w-3 text-dark-muted" />}
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-dark-muted
              "
            >
              {title}
            </p>
          </div>
        ) : (
          <div className="mb-2 hidden justify-center lg:flex">
            <div className="h-px w-8 bg-dark-soft" />
          </div>
        )}

        <div className="space-y-1">{renderLinks(links)}</div>
      </motion.div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="
              fixed
              inset-0
              z-40
              bg-dark/60
              backdrop-blur-sm
              lg:hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-full
          flex-col
          border-r
          border-dark-soft
          bg-dark
          transition-all
          duration-300
          ease-in-out

          ${isCollapsed ? "lg:w-[76px]" : "lg:w-[260px]"}

          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

          w-[280px]
        `}
      >
        {/* ===================================================
            LOGO
        ==================================================== */}
        <div
          className={`
            flex
            h-16
            shrink-0
            items-center
            border-b
            border-dark-soft
            px-4

            ${isCollapsed ? "lg:justify-center" : "justify-between"}
          `}
        >
          <Link
            to="/admin"
            className="flex items-center gap-2.5 overflow-hidden"
          >
            {/* Logo mark */}
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.06, transition: { duration: 0.2 } }
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center"
            >
              <svg
                width="36"
                height="36"
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

            {/* Brand */}
            <div
              className={`
                leading-none
                transition-opacity
                duration-200
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <span className="text-base font-bold tracking-tight text-text-white">
                TaxPilot
                <span className="text-sky"> UK</span>
              </span>
              <p
                className="
                  mt-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-dark-muted
                "
              >
                Platform Admin
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-dark-muted
              transition-colors
              hover:bg-dark-soft
              hover:text-text-white
              lg:hidden
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          {/* Main */}
          <div className="space-y-1">{renderLinks(mainLinks)}</div>

          {/* Platform */}
          {renderSection("Platform", ShieldCheck, platformLinks)}

          {/* Commerce */}
          {renderSection("Commerce", CreditCard, commerceLinks)}

          {/* Compliance */}
          {renderSection("Compliance", FileCheck2, complianceLinks)}

          {/* Content */}
          {renderSection("Content", Newspaper, contentLinks)}

          {/* System */}
          {renderSection("System", Settings, systemLinks)}
        </nav>

        {/* ===================================================
            ADMIN PROFILE + LOGOUT
        ==================================================== */}
        <div className="shrink-0 border-t border-dark-soft p-3">
          {/* Admin */}
          <div
            className={`
              mb-2
              flex
              items-center
              gap-3
              rounded-lg
              bg-dark-soft
              p-2.5

              ${isCollapsed ? "lg:justify-center lg:bg-transparent lg:p-0" : ""}
            `}
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-xs
                font-bold
                text-text-white
              "
            >
              SA
            </div>

            <div
              className={`
                min-w-0
                flex-1
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <p className="truncate text-xs font-bold text-text-white">
                Super Admin
              </p>
              <p className="truncate text-[10px] text-dark-muted">
                admin@taxpilot.co.uk
              </p>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Log out" : undefined}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { x: 2, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className={`
              group
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-sm
              font-medium
              text-dark-muted
              transition-colors
              duration-200
              hover:bg-danger-light
              hover:text-danger

              ${isCollapsed ? "lg:justify-center" : ""}
            `}
          >
            <LogOut
              className="
                h-[18px]
                w-[18px]
                shrink-0
                text-dark-muted
                transition-colors
                group-hover:text-danger
              "
            />
            <span
              className={`
                truncate
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              Log out
            </span>
          </motion.button>
        </div>

        {/* ===================================================
            COLLAPSE BUTTON
        ==================================================== */}
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
    absolute
    -right-3
    top-20
    z-[60]
    hidden
    h-6
    w-6
    items-center
    justify-center
    rounded-full
    border
    border-dark-soft
    bg-dark
    text-dark-muted
    shadow-card
    transition-colors
    hover:border-primary
    hover:bg-primary
    hover:text-text-white
    lg:flex
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

export default AdminSidebar;
