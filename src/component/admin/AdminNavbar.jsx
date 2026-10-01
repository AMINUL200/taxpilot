import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  UserCircle,
  Mail,
  ChevronDown,
} from "lucide-react";

const AdminNavbar = ({ setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     DUMMY DATA — replace with real data
  ============================================================ */
  const userData = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    avatar: null,
  };

  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "John Doe just signed up",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment received",
      message: "Payment of $299 received",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "System update",
      message: "System updated successfully",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  /* ============================================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ============================================================ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ============================================================
     HANDLERS
  ============================================================ */
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/signin");
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate("/admin/profile");
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate("/admin/settings");
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
      transition: {
        duration: 0.22,
        ease: premiumEase,
      },
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

  return (
    <header
      className="
        sticky
        top-0
        z-30
        bg-background
        shadow-card
        border-b
        border-border
      "
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* ======================================================
              LEFT SIDE
          ====================================================== */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.05, transition: { duration: 0.15 } }
              }
              whileTap={
                shouldReduceMotion ? undefined : { scale: 0.95 }
              }
              className="
                p-2
                rounded-lg
                text-text
                transition-colors
                hover:bg-background-soft
                lg:hidden
              "
            >
              <Menu className="w-5 h-5" />
            </motion.button>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search
                className="
                  w-4
                  h-4
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-text-light
                "
              />
              <input
                type="text"
                placeholder="Search..."
                className="
                  pl-10
                  pr-4
                  py-2
                  w-64
                  border
                  border-border
                  rounded-lg
                  bg-background
                  text-text
                  outline-none
                  transition-all
                  placeholder:text-text-light
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
            </div>
          </div>

          {/* ======================================================
              RIGHT SIDE
          ====================================================== */}
          <div className="flex items-center space-x-4">
            {/* ====================================================
                NOTIFICATIONS
            ==================================================== */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 1.05, transition: { duration: 0.15 } }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.95 }
                }
                className="
                  p-2
                  rounded-lg
                  text-text
                  transition-colors
                  hover:bg-background-soft
                  relative
                "
              >
                <Bell className="w-5 h-5" />

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
                      top-1
                      right-1
                      w-5
                      h-5
                      bg-danger
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-text-white
                      text-xs
                      font-bold
                    "
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="
                      absolute
                      right-0
                      mt-2
                      w-80
                      bg-background
                      rounded-lg
                      shadow-card-hover
                      border
                      border-border
                      overflow-hidden
                    "
                  >
                    {/* Header */}
                    <div
                      className="
                        bg-gradient-to-r
                        from-primary
                        to-primary-hover
                        px-4
                        py-3
                      "
                    >
                      <h3 className="text-text-white font-semibold">
                        Notifications
                      </h3>
                      <p className="text-text-white/80 text-xs">
                        {unreadCount} unread messages
                      </p>
                    </div>

                    {/* List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`
                            px-4
                            py-3
                            border-b
                            border-border-light
                            cursor-pointer
                            transition-colors
                            hover:bg-background-soft
                            ${notification.unread ? "bg-primary-light/50" : ""}
                          `}
                        >
                          <div className="flex items-start space-x-3">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-heading">
                                {notification.title}
                              </p>
                              <p className="text-xs text-text-secondary mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-text-light mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-background-soft text-center">
                      <button
                        className="
                          text-sm
                          text-primary
                          font-semibold
                          transition-colors
                          hover:text-primary-hover
                        "
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ====================================================
                USER PROFILE
            ==================================================== */}
            <div className="relative" ref={profileRef}>
              <motion.button
                onClick={() =>
                  setShowProfileMenu(!showProfileMenu)
                }
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { transition: { duration: 0.15 } }
                }
                className="
                  flex
                  items-center
                  space-x-3
                  p-2
                  rounded-lg
                  transition-colors
                  hover:bg-background-soft
                "
              >
                {/* Avatar */}
                <div
                  className="
                    w-9
                    h-9
                    bg-gradient-to-br
                    from-primary
                    to-primary-hover
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shadow-button
                  "
                >
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-text-white" />
                  )}
                </div>

                {/* Name */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-heading">
                    {userData.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {userData.role}
                  </p>
                </div>

                <ChevronDown
                  className={`
                    w-4
                    h-4
                    text-text-secondary
                    transition-transform
                    duration-200
                    hidden
                    sm:block
                    ${showProfileMenu ? "rotate-180" : ""}
                  `}
                />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="
                      absolute
                      right-0
                      mt-2
                      w-64
                      bg-background
                      rounded-lg
                      shadow-card-hover
                      border
                      border-border
                      overflow-hidden
                    "
                  >
                    {/* Header */}
                    <div
                      className="
                        bg-gradient-to-r
                        from-primary
                        to-primary-hover
                        px-4
                        py-4
                      "
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="
                            w-12
                            h-12
                            bg-text-white/20
                            backdrop-blur-sm
                            rounded-full
                            flex
                            items-center
                            justify-center
                          "
                        >
                          {userData.avatar ? (
                            <img
                              src={userData.avatar}
                              alt="Profile"
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-text-white font-semibold text-sm">
                            {userData.name}
                          </p>
                          <p className="text-text-white/80 text-xs">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="
                          w-full
                          px-4
                          py-3
                          flex
                          items-center
                          space-x-3
                          text-left
                          transition-colors
                          hover:bg-background-soft
                        "
                      >
                        <div
                          className="
                            w-8
                            h-8
                            bg-primary-light
                            rounded-lg
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <UserCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-heading">
                            My Profile
                          </p>
                          <p className="text-xs text-text-secondary">
                            View and edit profile
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={handleSettingsClick}
                        className="
                          w-full
                          px-4
                          py-3
                          flex
                          items-center
                          space-x-3
                          text-left
                          transition-colors
                          hover:bg-background-soft
                        "
                      >
                        <div
                          className="
                            w-8
                            h-8
                            bg-secondary-light
                            rounded-lg
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Settings className="w-4 h-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-heading">
                            Settings
                          </p>
                          <p className="text-xs text-text-secondary">
                            Manage preferences
                          </p>
                        </div>
                      </button>

                      <button
                        className="
                          w-full
                          px-4
                          py-3
                          flex
                          items-center
                          space-x-3
                          text-left
                          transition-colors
                          hover:bg-background-soft
                        "
                      >
                        <div
                          className="
                            w-8
                            h-8
                            bg-success-light
                            rounded-lg
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Mail className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-heading">
                            Messages
                          </p>
                          <p className="text-xs text-text-secondary">
                            View your messages
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border p-2">
                      <button
                        onClick={handleLogout}
                        className="
                          group
                          w-full
                          px-4
                          py-3
                          flex
                          items-center
                          space-x-3
                          text-left
                          rounded-lg
                          transition-colors
                          hover:bg-danger-light
                        "
                      >
                        <div
                          className="
                            w-8
                            h-8
                            bg-danger-light
                            group-hover:bg-danger/15
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            transition-colors
                          "
                        >
                          <LogOut className="w-4 h-4 text-danger" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-danger">
                            Logout
                          </p>
                          <p className="text-xs text-danger/70">
                            Sign out of your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;