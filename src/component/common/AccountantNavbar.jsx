import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Check,
} from "lucide-react";

const AccountantNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRefs = useRef({});

  /* ============================================================
     DUMMY DATA
  ============================================================ */

  const user = {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@taxpilot.co.uk",
    initials: "AJ",
    role: "Senior Accountant",
  };

  const notifications = [
    {
      id: 1,
      title: "VAT return due soon",
      message: "IMPERIAL THERMAL LTD · 3 days",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "New client assigned",
      message: "SKIL FOUR LIMITED",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Filing submitted",
      message: "BRIGHT IDEAS LTD · Confirmation Statement",
      time: "1 day ago",
      unread: false,
    },
  ];

  /* ============================================================
     SCROLL EFFECT
  ============================================================ */

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ============================================================
     CLICK OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;

      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside) setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <header
      className={`
        sticky
        top-0
        z-30
        w-full
        border-b
        border-[#DDEAE6]
        bg-white/95
        backdrop-blur-md
        transition-all
        duration-300
        ${scrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            LEFT - MENU + PAGE CONTEXT
        ================================================== */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
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
              text-[#09263A]
              transition-colors
              hover:bg-[#E8F8F2]
              hover:text-[#087F5B]
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
              Accountant Portal
            </p>
            <p className="mt-0.5 text-sm font-bold text-[#09263A]">
              Welcome back, {user.firstName}
            </p>
          </div>
        </div>

        {/* ==================================================
            CENTER - SEARCH
        ================================================== */}
        <div className="hidden flex-1 justify-center px-4 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            <input
              type="text"
              placeholder="Search clients, companies, filings..."
              className="
                w-full
                rounded-lg
                border
                border-[#DDEAE6]
                bg-[#F5FCF9]
                py-2.5
                pl-10
                pr-16
                text-sm
                text-[#09263A]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#687B78]
                focus:border-[#087F5B]
                focus:bg-white
                focus:ring-2
                focus:ring-[#087F5B]/10
              "
            />
            <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 lg:flex">
              <kbd className="rounded border border-[#DDEAE6] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#687B78]">
                ⌘
              </kbd>
              <kbd className="rounded border border-[#DDEAE6] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#687B78]">
                K
              </kbd>
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT - HELP, NOTIFICATIONS, USER
        ================================================== */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search */}
          <button
            type="button"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-[#09263A]
              transition-colors
              hover:bg-[#E8F8F2]
              hover:text-[#087F5B]
              md:hidden
            "
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

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
              text-[#09263A]
              transition-colors
              hover:bg-[#E8F8F2]
              hover:text-[#087F5B]
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
                text-[#09263A]
                transition-colors
                hover:bg-[#E8F8F2]
                hover:text-[#087F5B]
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

            {/* Dropdown */}
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
                  border-[#DDEAE6]
                  bg-white
                  shadow-2xl
                "
              >
                <div className="flex items-center justify-between border-b border-[#DDEAE6] px-4 py-3">
                  <p className="text-xs font-bold text-[#09263A]">
                    Notifications
                  </p>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      className="text-[10px] font-semibold text-[#087F5B] hover:text-[#005E45]"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      type="button"
                      className="
                        flex
                        w-full
                        items-start
                        gap-3
                        border-b
                        border-[#DDEAE6]
                        px-4
                        py-3
                        text-left
                        transition-colors
                        last:border-b-0
                        hover:bg-[#F5FCF9]
                      "
                    >
                      <div
                        className={`
                          mt-1
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          ${notif.unread ? "bg-[#087F5B]" : "bg-transparent"}
                        `}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#09263A]">
                          {notif.title}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                          {notif.message}
                        </p>
                        <p className="mt-1 text-[10px] text-[#687B78]">
                          {notif.time}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="mx-1 hidden h-6 w-px bg-[#DDEAE6] sm:block" />

          {/* User menu */}
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
                hover:bg-[#E8F8F2]
              "
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#087F5B] text-[11px] font-bold text-white">
                {user.initials}
              </div>
              <div className="hidden text-left lg:block">
                <p className="text-xs font-bold leading-tight text-[#09263A]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] leading-tight text-[#687B78]">
                  {user.role}
                </p>
              </div>
              <ChevronDown
                className={`
                  hidden
                  h-3.5
                  w-3.5
                  text-[#687B78]
                  transition-transform
                  duration-200
                  lg:block
                  ${openDropdown === "user" ? "rotate-180 text-[#087F5B]" : ""}
                `}
              />
            </button>

            {/* User dropdown */}
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
                  border-[#DDEAE6]
                  bg-white
                  shadow-2xl
                "
              >
                <div className="border-b border-[#DDEAE6] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#087F5B] text-xs font-bold text-white">
                      {user.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#09263A]">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="truncate text-[11px] text-[#687B78]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/accountant/profile");
                      setOpenDropdown(null);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                  >
                    <User className="h-4 w-4 text-[#687B78]" />
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate("/accountant/settings");
                      setOpenDropdown(null);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                  >
                    <Settings className="h-4 w-4 text-[#687B78]" />
                    <span>Settings</span>
                  </button>
                </div>

                <div className="border-t border-[#DDEAE6] py-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#09263A] transition-colors hover:bg-rose-50 hover:text-rose-600"
                  >
                    <LogOut className="h-4 w-4 text-[#687B78]" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AccountantNavbar;