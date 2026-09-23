import React, { useEffect, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Building2,
  FileText,
  FileCheck2,
  Percent,
  UserRound,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const OrganizationSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserMenu, setShowUserMenu] = useState(false);

  // =========================================================
  // MAIN NAVIGATION
  // =========================================================

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
      id: "ct600-accounts",
      label: "CT600 & Accounts",
      path: "/organization/products/corporation-tax",
      icon: FileText,
    },

    {
      id: "confirmation-statement",
      label: "Confirmation Statement",
      path: "/organization/products/confirmation-statement",
      icon: FileCheck2,
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

  // =========================================================
  // BOTTOM NAVIGATION
  // =========================================================

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

  // =========================================================
  // CLOSE SIDEBAR ON MOBILE ROUTE CHANGE
  // =========================================================

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose?.();
    }
  }, [location.pathname]);

  // =========================================================
  // ACTIVE PATH
  // =========================================================

  const isActivePath = (path) => {
    if (path === "/organization") {
      return location.pathname === "/organization";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavClick = (path) => {
    navigate(path);

    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    setShowUserMenu(false);

    // Clear authentication data here
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    navigate("/login");

    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  // =========================================================
  // CLOSE USER MENU WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".organization-user-menu")
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // NAV ITEM COMPONENT
  // =========================================================

  const renderNavItem = (link) => {
    const Icon = link.icon;
    const isActive = isActivePath(link.path);

    return (
      <button
        key={link.id}
        type="button"
        onClick={() => handleNavClick(link.path)}
        title={isCollapsed ? link.label : undefined}
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
          transition-all
          duration-200
          ${
            isCollapsed
              ? "lg:justify-center"
              : ""
          }
          ${
            isActive
              ? "bg-[#E8F8F2] text-[#087F5B]"
              : "text-[#344A67] hover:bg-[#F5FCF9] hover:text-[#087F5B]"
          }
        `}
      >

        {/* Active indicator */}
        {isActive && !isCollapsed && (
          <span
            className="
              absolute
              left-0
              top-1/2
              h-6
              w-1
              -translate-y-1/2
              rounded-r-full
              bg-[#087F5B]
            "
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
                ? "text-[#087F5B]"
                : "text-[#71827F] group-hover:text-[#087F5B]"
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
            ${
              isCollapsed
                ? "lg:hidden"
                : ""
            }
          `}
        >
          {link.label}
        </span>

      </button>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={onClose}
      />

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
          border-[#E4E9E7]
          bg-white
          transition-all
          duration-300
          ease-in-out

          ${
            isCollapsed
              ? "lg:w-[76px]"
              : "lg:w-[264px]"
          }

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

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
            border-[#E8ECEB]
            px-5

            ${
              isCollapsed
                ? "lg:justify-center"
                : "justify-between"
            }
          `}
        >

          {/* Logo */}
          <Link
            to="/organization"
            className="
              flex
              items-center
              gap-2.5
              overflow-hidden
            "
          >

            {/* TaxPilot Logo */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center">

              <svg
                width="38"
                height="38"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M26.5 7C34.5 6.2 41.4 9.1 43 15.5C44.5 21.6 40.4 27.1 33.2 29.2C29.3 30.3 25.6 29.7 22.8 27.7C23.2 19.4 24.1 12.3 26.5 7Z"
                  fill="#087F5B"
                />

                <path
                  d="M20.5 16.5C15.2 13.2 9.4 14 6.2 18.5C3.1 22.9 4.9 28.6 10 31.4C13.3 33.2 17.1 33.2 20.4 31.5C19.1 25.9 19.2 21 20.5 16.5Z"
                  fill="#5ACBA8"
                />

                <path
                  d="M21.2 25.8C14.7 25.6 9.7 29 9.2 34C8.7 39.4 13.8 43.2 19.5 42.8C25.1 42.5 29.1 38.5 28.5 33.7C27.9 29.6 25.3 27 21.2 25.8Z"
                  fill="#8CDEC3"
                />

              </svg>

            </div>

            {/* Brand */}
            <div
              className={`
                leading-none
                transition-opacity
                duration-200
                ${
                  isCollapsed
                    ? "lg:hidden"
                    : ""
                }
              `}
            >

              <div className="whitespace-nowrap text-[25px] font-bold tracking-tight text-[#09263A]">
                TaxPilot
                <span className="text-[#087F5B]">
                  {" "}UK
                </span>
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
              text-[#71827F]
              transition
              hover:bg-[#F5FCF9]
              hover:text-[#087F5B]
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

            {mainLinks.map((link) =>
              renderNavItem(link)
            )}

          </div>


          {/* Divider */}

          <div className="my-5 border-t border-[#E5EAE8]" />


          {/* Bottom navigation */}

          <div className="space-y-1">

            {bottomLinks.map((link) =>
              renderNavItem(link)
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
            border-[#E5EAE8]
            p-3
          "
        >

          {/* User button */}

          <button
            type="button"
            onClick={() =>
              setShowUserMenu((prev) => !prev)
            }
            title={
              isCollapsed
                ? "Account"
                : undefined
            }
            className={`
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              p-2
              text-left
              transition
              hover:bg-[#F5FCF9]
              ${
                isCollapsed
                  ? "lg:justify-center"
                  : ""
              }
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
                bg-[#0AAF7D]
                text-sm
                font-bold
                text-white
              "
            >
              A
            </div>


            {/* User information */}

            <div
              className={`
                min-w-0
                flex-1
                ${
                  isCollapsed
                    ? "lg:hidden"
                    : ""
                }
              `}
            >

              <p className="truncate text-sm font-semibold text-[#09263A]">
                Alex Johnson
              </p>

              <p className="mt-0.5 truncate text-xs text-[#71827F]">
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
                  text-[#71827F]
                  transition-transform
                  duration-200
                  ${
                    showUserMenu
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            )}

          </button>


          {/* =================================================
              USER DROPDOWN
          ================================================== */}

          {showUserMenu && !isCollapsed && (
            <div
              className="
                absolute
                bottom-[76px]
                left-3
                right-3
                overflow-hidden
                rounded-xl
                border
                border-[#E0E8E5]
                bg-white
                shadow-[0_10px_30px_rgba(9,38,58,0.12)]
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
                  text-[#344A67]
                  transition
                  hover:bg-[#F5FCF9]
                  hover:text-[#087F5B]
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
                  border-[#E8ECEB]
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-[#C53030]
                  transition
                  hover:bg-[#FFF5F5]
                "
              >

                <LogOut className="h-4 w-4" />

                Log out

              </button>

            </div>
          )}

        </div>


        {/* ===================================================
            COLLAPSE BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="
            absolute
            -right-3
            top-[88px]
            hidden
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            border-[#DDE5E2]
            bg-white
            text-[#71827F]
            shadow-sm
            transition-all
            duration-200
            hover:border-[#087F5B]
            hover:text-[#087F5B]
            lg:flex
          "
          aria-label={
            isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >

          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}

        </button>

      </aside>
    </>
  );
};

export default OrganizationSidebar;