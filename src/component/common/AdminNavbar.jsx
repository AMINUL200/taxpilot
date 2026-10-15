import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Activity,
  Command,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react";
import useAuthStore from "../../stores/authStore";

const AdminNavbar = ({ onMenuClick, onToggleCollapse, isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* =========================================================
     REAL AUTH DATA FROM ZUSTAND
  ========================================================= */

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const userType = useAuthStore((s) => s.userType);

  /* =========================================================
     DERIVED USER INFO
  ========================================================= */

  // Build initials from real user name
  const getInitials = () => {
    const first = user?.first_name || user?.firstName || "";
    const last = user?.last_name || user?.lastName || "";

    if (first && last) {
      return (first[0] + last[0]).toUpperCase();
    }
    if (first) return first.slice(0, 2).toUpperCase();
    if (user?.name) {
      const parts = user.name.trim().split(" ");
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return "SA";
  };

  // Build display name
  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "Super Admin";
  };

  // Determine role label
  const getRoleLabel = () => {
    if (user?.is_super_admin === true) return "Super Admin";
    if (userType === "super_admin") return "Super Admin";
    if (userType === "accountant") return "Accountant";
    if (userType === "organization_owner") return "Organization Owner";
    if (userType === "organization_user") return "Organization User";
    // Fallback: first role slug
    if (user?.roles?.[0]?.name) return user.roles[0].name;
    if (user?.roles?.[0]?.slug) {
      return user.roles[0].slug
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return "Admin";
  };

  const displayName = getDisplayName();
  const displayEmail = user?.email || "admin@taxpilot.co.uk";
  const displayInitials = getInitials();
  const displayRole = getRoleLabel();

  /* =========================================================
     STATE
  ========================================================= */

  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRefs = useRef({});

  /* =========================================================
     NOTIFICATIONS (still demo — swap for API later)
  ========================================================= */

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "New organization registered",
      message: "ABC Trading Ltd · 2 minutes ago",
      time: "2m",
      unread: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Payment failed",
      message: "Green Tech Ltd · Subscription renewal",
      time: "15m",
      unread: true,
    },
    {
      id: 3,
      type: "info",
      title: "System update completed",
      message: "Platform v2.4.1 deployed successfully",
      time: "1h",
      unread: true,
    },
    {
      id: 4,
      type: "success",
      title: "New admin user added",
      message: "sarah@taxpilot.co.uk",
      time: "3h",
      unread: false,
    },
  ];

  /* =========================================================
     SCROLL EFFECT
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================================================
     CLICK OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedInside = false;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =========================================================
     KEYBOARD SHORTCUTS
  ========================================================= */

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("admin-search")?.focus();
      }
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* =========================================================
     HANDLERS
  ========================================================= */

  const toggleDropdown = (id) =>
    setOpenDropdown((prev) => (prev === id ? null : id));

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setOpenDropdown(null);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      // Even if the API fails, the store is cleared — still redirect
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigate = (path) => {
    setOpenDropdown(null);
    navigate(path);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  /* =========================================================
     NOTIFICATION ICON
  ========================================================= */

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle2,
          bg: "bg-success-light",
          color: "text-success",
        };
      case "warning":
        return {
          icon: AlertCircle,
          bg: "bg-warning-light",
          color: "text-warning",
        };
      default:
        return {
          icon: Info,
          bg: "bg-info-light",
          color: "text-info",
        };
    }
  };

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Admin Dashboard";
    const segments = path.replace("/admin/", "").split("/");
    return segments
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" · ")
      .replace(/-/g, " ");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <motion.header
        className={`
          sticky
          top-0
          z-30
          w-full
          border-b
          bg-background/95
          backdrop-blur-md
          transition-all
          duration-300
          ${scrolled ? "border-border shadow-card" : "border-border-light"}
        `}
        initial={shouldReduceMotion ? false : { y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: premiumEase }}
      >
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

          {/* ============================================================
              LEFT SIDE
          ============================================================ */}

          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-text
                transition-colors
                hover:bg-primary-light
                hover:text-primary
                lg:hidden
              "
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden min-w-0 sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Platform Admin
              </p>
              <p className="mt-0.5 truncate text-sm font-bold text-heading">
                {getPageTitle()}
              </p>
            </div>
          </div>

          {/* ============================================================
              CENTER — SEARCH
          ============================================================ */}

          <div className="hidden flex-1 justify-center px-4 md:flex">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

              <input
                id="admin-search"
                type="text"
                placeholder="Search organizations, users, payments..."
                className="
                  w-full
                  rounded-lg
                  border
                  border-border
                  bg-background-soft
                  py-2.5
                  pl-10
                  pr-16
                  text-sm
                  text-heading
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-text-muted
                  focus:border-primary
                  focus:bg-background
                  focus:ring-2
                  focus:ring-primary/10
                "
              />

              <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 lg:flex">
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold text-text-muted">
                  <Command className="inline h-2.5 w-2.5" /> K
                </kbd>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT SIDE
          ============================================================ */}

          <div className="flex items-center gap-1 sm:gap-2">

            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((p) => !p)}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-text
                transition-colors
                hover:bg-primary-light
                hover:text-primary
                md:hidden
              "
              aria-label="Search"
            >
              {mobileSearchOpen ? (
                <X className="h-[18px] w-[18px]" />
              ) : (
                <Search className="h-[18px] w-[18px]" />
              )}
            </button>

            {/* Help */}
            <Link
              to="/admin/help"
              className="
                hidden
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-text
                transition-colors
                hover:bg-primary-light
                hover:text-primary
                sm:flex
              "
              aria-label="Help"
            >
              <HelpCircle className="h-[18px] w-[18px]" />
            </Link>

            {/* Notifications */}
            <div
              className="relative"
              ref={(el) => (dropdownRefs.current["notifications"] = el)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("notifications")}
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-text
                  transition-colors
                  hover:bg-primary-light
                  hover:text-primary
                "
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />

                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                    className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-text-white"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>

              <AnimatePresence>
                {openDropdown === "notifications" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: premiumEase }}
                    className="
                      absolute
                      right-0
                      top-full
                      z-50
                      mt-2
                      w-[360px]
                      max-w-[calc(100vw-32px)]
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-background
                      shadow-card-hover
                    "
                  >
                    <div className="flex items-center justify-between border-b border-border-light px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        <p className="text-xs font-bold text-heading">
                          Notifications
                        </p>
                        {unreadCount > 0 && (
                          <span className="rounded-full bg-primary-light px-2 py-0.5 text-[9px] font-bold text-primary">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-[10px] font-semibold text-primary transition-colors hover:text-primary-hover"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-[380px] overflow-y-auto">
                      {notifications.map((notif) => {
                        const styles = getNotificationIcon(notif.type);
                        const Icon = styles.icon;

                        return (
                          <button
                            key={notif.id}
                            type="button"
                            className="
                              flex
                              w-full
                              items-start
                              gap-3
                              border-b
                              border-border-light
                              px-4
                              py-3
                              text-left
                              transition-colors
                              last:border-b-0
                              hover:bg-background-soft
                            "
                          >
                            <div
                              className={`
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                ${styles.bg}
                              `}
                            >
                              <Icon
                                className={`h-4 w-4 ${styles.color}`}
                                strokeWidth={2.2}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="truncate text-xs font-bold text-heading">
                                  {notif.title}
                                </p>
                                {notif.unread && (
                                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                )}
                              </div>
                              <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                                {notif.message}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-border-light p-2">
                      <button
                        type="button"
                        onClick={() => handleNavigate("/admin/notifications")}
                        className="
                          block
                          w-full
                          rounded-lg
                          py-2
                          text-center
                          text-[11px]
                          font-semibold
                          text-primary
                          transition-colors
                          hover:bg-primary-light
                        "
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="mx-1 hidden h-6 w-px bg-border-light sm:block" />

            {/* User Menu */}
            <div
              className="relative"
              ref={(el) => (dropdownRefs.current["user"] = el)}
            >
              <button
                type="button"
                onClick={() => toggleDropdown("user")}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  p-1
                  transition-colors
                  hover:bg-primary-light
                "
              >
                {/* Avatar with real initials */}
                <div className="relative">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-text-white">
                    {displayInitials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" />
                </div>

                {/* Real name + role */}
                <div className="hidden text-left lg:block">
                  <p className="max-w-[140px] truncate text-xs font-bold leading-tight text-heading">
                    {displayName}
                  </p>
                  <p className="max-w-[140px] truncate text-[10px] leading-tight text-text-muted">
                    {displayRole}
                  </p>
                </div>

                <ChevronDown
                  className={`
                    hidden
                    h-3.5
                    w-3.5
                    text-text-muted
                    transition-transform
                    duration-200
                    lg:block
                    ${openDropdown === "user" ? "rotate-180 text-primary" : ""}
                  `}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: premiumEase }}
                    className="
                      absolute
                      right-0
                      top-full
                      z-50
                      mt-2
                      w-72
                      overflow-hidden
                      rounded-xl
                      border
                      border-border
                      bg-background
                      shadow-card-hover
                    "
                  >
                    {/* User Info Card — Real Data */}
                    <div className="border-b border-border-light bg-background-soft px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-text-white">
                            {displayInitials}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background-soft bg-success" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-heading">
                            {displayName}
                          </p>
                          <p className="truncate text-[11px] text-text-muted">
                            {displayEmail}
                          </p>
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-primary-light px-2 py-0.5 text-[9px] font-bold text-primary">
                            <ShieldCheck className="h-2.5 w-2.5" />
                            {displayRole}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => handleNavigate("/admin/profile")}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-4
                          py-2.5
                          text-sm
                          text-text
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <User className="h-4 w-4 text-text-muted" />
                        <span>My Profile</span>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-text-muted" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavigate("/admin/settings")}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-4
                          py-2.5
                          text-sm
                          text-text
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <Settings className="h-4 w-4 text-text-muted" />
                        <span>Platform Settings</span>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-text-muted" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavigate("/admin/activity")}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-4
                          py-2.5
                          text-sm
                          text-text
                          transition-colors
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <Activity className="h-4 w-4 text-text-muted" />
                        <span>Activity Log</span>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-text-muted" />
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border-light py-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          px-4
                          py-2.5
                          text-sm
                          text-text
                          transition-colors
                          hover:bg-danger-light
                          hover:text-danger
                          disabled:opacity-60
                        "
                      >
                        <LogOut className="h-4 w-4 text-text-muted" />
                        <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: premiumEase }}
              className="overflow-hidden border-t border-border-light md:hidden"
            >
              <div className="px-4 py-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search..."
                    autoFocus
                    className="
                      w-full
                      rounded-lg
                      border
                      border-border
                      bg-background-soft
                      py-2.5
                      pl-10
                      pr-4
                      text-sm
                      text-heading
                      outline-none
                      transition-all
                      placeholder:text-text-muted
                      focus:border-primary
                      focus:bg-background
                      focus:ring-2
                      focus:ring-primary/10
                    "
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default AdminNavbar;