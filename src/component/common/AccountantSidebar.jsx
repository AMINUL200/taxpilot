import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  CalendarClock,
  CheckSquare,
  FolderOpen,
  UsersRound,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const AccountantSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     SIDEBAR LINKS
  ============================================================ */

  const mainLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/accountant",
      icon: LayoutDashboard,
    },
    {
      id: "clients",
      label: "Clients",
      path: "/accountant/clients",
      icon: Users,
    },
    {
      id: "companies",
      label: "Companies",
      path: "/accountant/companies",
      icon: Building2,
    },
    {
      id: "filings",
      label: "Filings",
      path: "/accountant/filings",
      icon: FileText,
    },
    {
      id: "deadlines",
      label: "Deadlines",
      path: "/accountant/deadlines",
      icon: CalendarClock,
      badge: 3,
    },
    {
      id: "tasks",
      label: "Tasks",
      path: "/accountant/tasks",
      icon: CheckSquare,
    },
    {
      id: "documents",
      label: "Documents",
      path: "/accountant/documents",
      icon: FolderOpen,
    },
    {
      id: "team",
      label: "Team",
      path: "/accountant/team",
      icon: UsersRound,
    },
    {
      id: "billing",
      label: "Billing",
      path: "/accountant/billing",
      icon: CreditCard,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/accountant/settings",
      icon: Settings,
    },
  ];

  const bottomLinks = [
    {
      id: "help",
      label: "Help Centre",
      path: "/help",
      icon: HelpCircle,
    },
  ];

  /* ============================================================
     CLOSE SIDEBAR ON ROUTE CHANGE (MOBILE)
  ============================================================ */

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const isActivePath = (path) => {
    if (path === "/accountant") {
      return location.pathname === "/accountant";
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <>
      {/* ======================================================
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

      {/* ======================================================
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
        {/* ==================================================
            LOGO HEADER
        ================================================== */}
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
            to="/accountant"
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
              <p className="mt-1 text-[9px] font-medium uppercase tracking-wider text-dark-muted">
                Accountant Portal
              </p>
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
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ==================================================
            NAVIGATION
        ================================================== */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          <div className="space-y-1">
            {mainLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = isActivePath(link.path);

              return (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.path)}
                  title={isCollapsed ? link.label : undefined}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, x: -8 }
                  }
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
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
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
                      layoutId="accountant-active-indicator"
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
                    strokeWidth={2.2}
                  />

                  <span
                    className={`
                      truncate
                      ${isCollapsed ? "lg:hidden" : ""}
                    `}
                  >
                    {link.label}
                  </span>

                  {/* Badge */}
                  {link.badge && (
                    <motion.span
                      initial={
                        shouldReduceMotion ? false : { scale: 0.5 }
                      }
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.34, 1.56, 0.64, 1],
                        delay: shouldReduceMotion ? 0 : 0.3,
                      }}
                      className={`
                        ml-auto
                        flex
                        h-5
                        min-w-[20px]
                        items-center
                        justify-center
                        rounded-full
                        px-1.5
                        text-[10px]
                        font-bold
                        ${
                          isActive
                            ? "bg-text-white/20 text-text-white"
                            : "bg-danger-light text-danger"
                        }
                        ${
                          isCollapsed
                            ? "lg:absolute lg:right-2 lg:top-1.5 lg:ml-0 lg:h-4 lg:min-w-[16px] lg:px-1 lg:text-[9px]"
                            : ""
                        }
                      `}
                    >
                      {link.badge}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ==============================================
              BOTTOM LINKS
          ============================================== */}
          <div className="mt-6 border-t border-dark-soft pt-4">
            <div className="space-y-1">
              {bottomLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = isActivePath(link.path);

                return (
                  <motion.button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.path)}
                    title={isCollapsed ? link.label : undefined}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: -8 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: premiumEase,
                      delay: shouldReduceMotion
                        ? 0
                        : mainLinks.length * 0.03 + index * 0.03,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { x: 2, transition: { duration: 0.2 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
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
                    {isActive && (
                      <motion.span
                        layoutId="accountant-active-indicator"
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
                      strokeWidth={2.2}
                    />
                    <span
                      className={`truncate ${isCollapsed ? "lg:hidden" : ""}`}
                    >
                      {link.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ==================================================
            BOTTOM SECTION - USER + LOGOUT
        ================================================== */}
        <div className="shrink-0 border-t border-dark-soft p-3">
          {/* User card */}
          <div
            className={`
              mb-2
              flex
              items-center
              gap-3
              rounded-lg
              bg-dark-soft
              p-2.5
              ${
                isCollapsed
                  ? "lg:justify-center lg:bg-transparent lg:p-0"
                  : ""
              }
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
                shadow-button
              "
            >
              AJ
            </div>
            <div className={`min-w-0 flex-1 ${isCollapsed ? "lg:hidden" : ""}`}>
              <p className="truncate text-xs font-bold text-text-white">
                Alice Johnson
              </p>
              <p className="truncate text-[10px] text-dark-muted">
                alice@taxpilot.co.uk
              </p>
            </div>
          </div>

          {/* Logout */}
          <motion.button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : undefined}
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
              strokeWidth={2.2}
            />
            <span className={`truncate ${isCollapsed ? "lg:hidden" : ""}`}>
              Logout
            </span>
          </motion.button>
        </div>

        {/* ==================================================
            COLLAPSE TOGGLE (Desktop)
        ================================================== */}
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

export default AccountantSidebar;