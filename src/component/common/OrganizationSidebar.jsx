import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

  /* =========================================================
     MAIN NAVIGATION
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
    },
    {
      id: "self-assessment",
      label: "Self Assessment",
      path: "/organization/products/self-assessment",
      icon: UserRound,
    },
  ];

  /* =========================================================
     BOTTOM NAVIGATION
  ========================================================= */
  const bottomLinks = [
    {
      id: "billing",
      label: "Billing",
      path: "/organization/billing",
      icon: CreditCard,
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
  }, [location.pathname]);

  /* =========================================================
     ACTIVE PATH
  ========================================================= */
  const isActivePath = (path) => {
    if (path === "/organization") {
      return location.pathname === "/organization";
    }
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */
  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */
  const handleLogout = () => {
    setShowUserMenu(false);
    navigate("/login");
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  /* =========================================================
     CLOSE USER MENU WHEN CLICKING OUTSIDE
  ========================================================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".organization-user-menu")) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     NAV ITEM COMPONENT
  ========================================================= */
  const renderNavItem = (link, index = 0) => {
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
          rounded-xl
          px-3
          py-2.5
          text-left
          text-[15px]
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
            layoutId="org-active-indicator"
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

        {/* Icon */}
        <Icon
          className={`
            h-[20px]
            w-[20px]
            shrink-0
            transition-colors
            duration-200
            ${
              isActive
                ? "text-text-white"
                : "text-dark-muted group-hover:text-text-white"
            }
          `}
          strokeWidth={2}
        />

        {/* Label */}
        <span
          className={`
            min-w-0
            flex-1
            truncate
            ${isCollapsed ? "lg:hidden" : ""}
          `}
        >
          {link.label}
        </span>
      </motion.button>
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
          h-screen
          flex-col
          border-r
          border-dark-soft
          bg-dark
          transition-all
          duration-300
          ease-in-out

          ${isCollapsed ? "lg:w-[76px]" : "lg:w-[264px]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-[280px]
        `}
      >
        {/* ===================================================
            LOGO HEADER
        ==================================================== */}
        <div
          className={`
            flex
            h-[76px]
            shrink-0
            items-center
            border-b
            border-dark-soft
            px-5
            ${isCollapsed ? "lg:justify-center" : "justify-between"}
          `}
        >
          <Link
            to="/organization"
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

            {/* Brand */}
            <div
              className={`
                leading-none
                transition-opacity
                duration-200
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <div
                className="
                  whitespace-nowrap
                  text-[25px]
                  font-bold
                  tracking-tight
                  text-text-white
                "
              >
                TaxPilot
                <span className="text-sky"> UK</span>
              </div>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-dark-muted
              transition-colors
              hover:bg-dark-soft
              hover:text-text-white
              lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {/* Main navigation */}
          <div className="space-y-1">
            {mainLinks.map((link, index) => renderNavItem(link, index))}
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-dark-soft" />

          {/* Bottom navigation */}
          <div className="space-y-1">
            {bottomLinks.map((link, index) =>
              renderNavItem(link, mainLinks.length + index)
            )}
          </div>
        </nav>

        {/* ===================================================
            USER PROFILE
        ==================================================== */}
        <div
          className="
            organization-user-menu
            relative
            shrink-0
            border-t
            border-dark-soft
            p-3
          "
        >
          {/* User button */}
          <motion.button
            type="button"
            onClick={() => setShowUserMenu((prev) => !prev)}
            title={isCollapsed ? "Account" : undefined}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className={`
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              p-2
              text-left
              transition-colors
              hover:bg-dark-soft
              ${isCollapsed ? "lg:justify-center" : ""}
            `}
          >
            {/* Avatar */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-primary
                text-sm
                font-bold
                text-text-white
                shadow-button
              "
            >
              A
            </div>

            {/* User info */}
            <div
              className={`
                min-w-0
                flex-1
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <p className="truncate text-sm font-semibold text-text-white">
                Alex Johnson
              </p>
              <p className="mt-0.5 truncate text-xs text-dark-muted">
                SKIL FOUR LIMITED
              </p>
            </div>

            {/* Arrow */}
            {!isCollapsed && (
              <ChevronDown
                className={`
                  h-4
                  w-4
                  shrink-0
                  text-dark-muted
                  transition-transform
                  duration-200
                  ${showUserMenu ? "rotate-180" : ""}
                `}
              />
            )}
          </motion.button>

          {/* =================================================
              USER DROPDOWN
          ================================================== */}
          <AnimatePresence>
            {showUserMenu && !isCollapsed && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 8, scale: 0.97 }
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
                  absolute
                  bottom-[76px]
                  left-3
                  right-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-dark-soft
                  bg-dark
                  shadow-card-hover
                "
              >
                {/* Account */}
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/organization/settings");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-dark-muted
                    transition-colors
                    hover:bg-dark-soft
                    hover:text-text-white
                  "
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </button>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-t
                    border-dark-soft
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-danger
                    transition-colors
                    hover:bg-danger-light
                  "
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
            top-[88px]
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
          aria-label={
            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
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