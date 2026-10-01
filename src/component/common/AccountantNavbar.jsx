import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
} from "lucide-react";

const AccountantNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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

  const unreadCount = notifications.filter((n) => n.unread).length;

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

  /* ============================================================
     DROPDOWN ANIMATION VARIANTS
  ============================================================ */

  const dropdownVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -8, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.22, ease: premiumEase },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -6,
          scale: 0.97,
          transition: { duration: 0.15 },
        },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: premiumEase },
    },
  };

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
        border-border
        bg-background/95
        backdrop-blur-md
        transition-shadow
        duration-300
        ${scrolled ? "shadow-card" : ""}
      `}
    >
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* ==================================================
            LEFT - MENU + PAGE CONTEXT
        ================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: premiumEase }}
          className="flex items-center gap-3"
        >
          {/* Mobile menu */}
          <motion.button
            type="button"
            onClick={onMenuClick}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.05, transition: { duration: 0.15 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-heading
              transition-colors
              hover:bg-primary-light
              hover:text-primary
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          <div className="hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              Accountant Portal
            </p>
            <p className="mt-0.5 text-sm font-bold text-heading">
              Welcome back, {user.firstName}
            </p>
          </div>
        </motion.div>

        {/* ==================================================
            CENTER - SEARCH
        ================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: premiumEase,
            delay: shouldReduceMotion ? 0 : 0.05,
          }}
          className="hidden flex-1 justify-center px-4 md:flex"
        >
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search clients, companies, filings..."
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
                placeholder:text-text-secondary
                focus:border-primary
                focus:bg-background
                focus:ring-2
                focus:ring-primary/10
              "
            />
            <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 lg:flex">
              <kbd
                className="
                  rounded
                  border
                  border-border
                  bg-background
                  px-1.5
                  py-0.5
                  text-[10px]
                  font-semibold
                  text-text-secondary
                "
              >
                ⌘
              </kbd>
              <kbd
                className="
                  rounded
                  border
                  border-border
                  bg-background
                  px-1.5
                  py-0.5
                  text-[10px]
                  font-semibold
                  text-text-secondary
                "
              >
                K
              </kbd>
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            RIGHT - HELP, NOTIFICATIONS, USER
        ================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.45,
            ease: premiumEase,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
          className="flex items-center gap-1 sm:gap-2"
        >
          {/* Mobile search */}
          <motion.button
            type="button"
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.05, transition: { duration: 0.15 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-heading
              transition-colors
              hover:bg-primary-light
              hover:text-primary
              md:hidden
            "
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </motion.button>

          {/* Help */}
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { scale: 1.05, transition: { duration: 0.15 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          >
            <Link
              to="/help"
              className="
                hidden
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-heading
                transition-colors
                hover:bg-primary-light
                hover:text-primary
                sm:flex
              "
              aria-label="Help"
            >
              <HelpCircle className="h-[18px] w-[18px]" />
            </Link>
          </motion.div>

          {/* Notifications */}
          <div
            className="relative"
            ref={(el) => (dropdownRefs.current["notifications"] = el)}
          >
            <motion.button
              type="button"
              onClick={() => toggleDropdown("notifications")}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.05, transition: { duration: 0.15 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-heading
                transition-colors
                hover:bg-primary-light
                hover:text-primary
              "
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <motion.span
                  initial={
                    shouldReduceMotion ? false : { scale: 0.5 }
                  }
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="
                    absolute
                    right-1
                    top-1
                    flex
                    h-4
                    min-w-[16px]
                    items-center
                    justify-center
                    rounded-full
                    bg-danger
                    px-1
                    text-[9px]
                    font-bold
                    text-text-white
                  "
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
              {openDropdown === "notifications" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <p className="text-xs font-bold text-heading">
                      Notifications
                    </p>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        className="
                          text-[10px]
                          font-semibold
                          text-primary
                          transition-colors
                          hover:text-primary-hover
                        "
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((notif, index) => (
                      <motion.button
                        key={notif.id}
                        type="button"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{
                          delay: shouldReduceMotion
                            ? 0
                            : 0.05 + index * 0.05,
                        }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { x: 2, transition: { duration: 0.2 } }
                        }
                        className="
                          flex
                          w-full
                          items-start
                          gap-3
                          border-b
                          border-border
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
                            mt-1
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                            ${notif.unread ? "bg-primary" : "bg-transparent"}
                          `}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-heading">
                            {notif.title}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                            {notif.message}
                          </p>
                          <p className="mt-1 text-[10px] text-text-secondary">
                            {notif.time}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

          {/* User menu */}
          <div
            className="relative"
            ref={(el) => (dropdownRefs.current["user"] = el)}
          >
            <motion.button
              type="button"
              onClick={() => toggleDropdown("user")}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { transition: { duration: 0.15 } }
              }
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
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-[11px]
                  font-bold
                  text-text-white
                  shadow-button
                "
              >
                {user.initials}
              </div>
              <div className="hidden text-left lg:block">
                <p className="text-xs font-bold leading-tight text-heading">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] leading-tight text-text-secondary">
                  {user.role}
                </p>
              </div>
              <ChevronDown
                className={`
                  hidden
                  h-3.5
                  w-3.5
                  text-text-secondary
                  transition-transform
                  duration-200
                  lg:block
                  ${openDropdown === "user" ? "rotate-180 text-primary" : ""}
                `}
              />
            </motion.button>

            {/* User dropdown */}
            <AnimatePresence>
              {openDropdown === "user" && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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
                    border-border
                    bg-background
                    shadow-card-hover
                  "
                >
                  <div className="border-b border-border px-4 py-4">
                    <div className="flex items-center gap-3">
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
                          text-xs
                          font-bold
                          text-text-white
                          shadow-button
                        "
                      >
                        {user.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-heading">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="truncate text-[11px] text-text-secondary">
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
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-2.5
                        text-sm
                        text-heading
                        transition-colors
                        hover:bg-primary-light
                        hover:text-primary
                      "
                    >
                      <User className="h-4 w-4 text-text-secondary" />
                      <span>My Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate("/accountant/settings");
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
                        text-heading
                        transition-colors
                        hover:bg-primary-light
                        hover:text-primary
                      "
                    >
                      <Settings className="h-4 w-4 text-text-secondary" />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-border py-1">
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
                        text-heading
                        transition-colors
                        hover:bg-danger-light
                        hover:text-danger
                      "
                    >
                      <LogOut className="h-4 w-4 text-text-secondary" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default AccountantNavbar;