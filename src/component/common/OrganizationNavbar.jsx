import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  FileText,
  FileCheck2,
  Percent,
} from "lucide-react";
import useAuthStore from "../../stores/authStore";

const OrganizationNavbar = ({ onMenuClick, onToggleCollapse, isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [notifications] = useState([
    {
      id: 1,
      title: "Corporation Tax due soon",
      message: "ABC Ltd · Due 30 Sep 2026",
      time: "2 hours ago",
      unread: true,
      type: "deadline",
    },
    {
      id: 2,
      title: "Filing submitted",
      message: "XYZ Ltd · Annual Accounts",
      time: "1 day ago",
      unread: true,
      type: "success",
    },
    {
      id: 3,
      title: "Welcome to TaxPilot UK",
      message: "Complete your profile to get started",
      time: "3 days ago",
      unread: false,
      type: "info",
    },
  ]);

  const dropdownRefs = useRef({});

  /* =========================================================
     REAL AUTH STORE — USER DATA
  ========================================================= */

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const userType = useAuthStore((s) => s.userType);

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

  const getRoleLabel = () => {
    if (userType === "organization_owner") return "Administrator";
    if (userType === "organization_user") return "Team Member";
    if (user?.roles?.[0]?.name) return user.roles[0].name;
    return "Administrator";
  };

  const userInitials = getInitials();
  const userDisplayName = getDisplayName();
  const userEmail = user?.email || "";
  const userRole = getRoleLabel();

  // =========================================================
  // NAVIGATION LINKS
  // =========================================================

  const navLinks = [
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
  ];

  // =========================================================
  // SCROLL EFFECT
  // =========================================================

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =========================================================
  // CLICK OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;

      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================================================
  // HANDLERS
  // =========================================================

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  /* =========================================================
     LOGOUT — calls the real store logout
  ========================================================= */
  const handleLogout = async () => {
    setOpenDropdown(null);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API fails, the store is cleared — still redirect
      navigate("/login", { replace: true });
    }
  };

  const isActivePath = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <header
      className={`
        sticky
        top-0
        z-30
        w-full
        border-b
        border-border-light
        bg-white/95
        backdrop-blur-md
        transition-all
        duration-300
        ${scrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* =================================================
            LEFT SIDE
        ================================================== */}

        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onMenuClick}
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
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* =================================================
            CENTER - PRODUCT NAVIGATION LINKS
        ================================================== */}

        <nav className="hidden flex-1 items-center justify-center gap-1 px-4 md:flex">
          {navLinks.map((link) => {
            const isActive = isActivePath(link.path);

            return (
              <Link
                key={link.id}
                to={link.path}
                className={`
                  group
                  relative
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  px-3.5
                  py-2
                  text-sm
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-text hover:bg-primary-light hover:text-primary"
                  }
                `}
              >
                <span className="truncate">{link.label}</span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-[13px] left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Help */}
          <Link
            to="/help"
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
                <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {openDropdown === "notifications" && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-[340px]
                  max-w-[calc(100vw-32px)]
                  overflow-hidden
                  rounded-xl
                  border
                  border-border-light
                  bg-white
                  shadow-xl
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border-light px-4 py-3">
                  <p className="text-xs font-bold text-heading">
                    Notifications
                  </p>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      className="text-[10px] font-semibold text-primary hover:text-primary-hover"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center">
                      <Bell className="mx-auto h-8 w-8 text-text-muted/40" />
                      <p className="mt-2 text-xs text-text-muted">
                        No notifications
                      </p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
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
                          hover:bg-background-soft
                          last:border-b-0
                        "
                      >
                        <div
                          className={`
                            mt-1
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                            ${
                              notif.unread
                                ? "bg-primary"
                                : "bg-transparent"
                            }
                          `}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-heading">
                            {notif.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-text-secondary line-clamp-1">
                            {notif.message}
                          </p>
                          <p className="mt-1 text-[10px] text-text-muted">
                            {notif.time}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border-light p-2">
                  <Link
                    to="/dashboard/notifications"
                    onClick={() => setOpenDropdown(null)}
                    className="
                      block
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
                  </Link>
                </div>
              </div>
            )}
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
              {/* Avatar — real initials */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                {userInitials}
              </div>

              {/* Name + Role — real data */}
              <div className="hidden text-left lg:block">
                <p className="max-w-[140px] truncate text-xs font-bold leading-tight text-heading">
                  {userDisplayName}
                </p>
                <p className="max-w-[140px] truncate text-[10px] leading-tight text-text-muted">
                  {userRole}
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

            {/* User Dropdown */}
            {openDropdown === "user" && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  z-50
                  mt-2
                  w-64
                  overflow-hidden
                  rounded-xl
                  border
                  border-border-light
                  bg-white
                  shadow-xl
                "
              >
                {/* User info — real name + email */}
                <div className="border-b border-border-light px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {userInitials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-heading">
                        {userDisplayName}
                      </p>
                      <p className="truncate text-[11px] text-text-muted">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/dashboard/profile");
                      setOpenDropdown(null);
                    }}
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
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate("/dashboard/settings");
                      setOpenDropdown(null);
                    }}
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
                    <span>Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-border-light py-1">
                  <button
                    type="button"
                    onClick={handleLogout}
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
                    "
                  >
                    <LogOut className="h-4 w-4 text-text-muted" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          MOBILE NAVIGATION LINKS
      ================================================== */}

      <div className="border-t border-border-light bg-white md:hidden">
        <div className="flex gap-1 overflow-x-auto px-4 py-2">
          {navLinks.map((link) => {
            const isActive = isActivePath(link.path);

            return (
              <Link
                key={link.id}
                to={link.path}
                className={`
                  group
                  inline-flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-lg
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-text hover:bg-primary-light hover:text-primary"
                  }
                `}
              >
                <span className="whitespace-nowrap">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default OrganizationNavbar;