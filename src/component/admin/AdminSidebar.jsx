import React, { useEffect } from "react";
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

const AdminSidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // MAIN LINKS
  // =========================================================

  const mainLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
  ];

  // =========================================================
  // PLATFORM
  // =========================================================

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

  // =========================================================
  // COMMERCE
  // =========================================================

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

  // =========================================================
  // COMPLIANCE PRODUCTS
  // =========================================================

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

  // =========================================================
  // CONTENT
  // =========================================================

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

  // =========================================================
  // SYSTEM
  // =========================================================

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

  // =========================================================
  // MOBILE CLOSE
  // =========================================================

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
  }, [location.pathname]);

  // =========================================================
  // ACTIVE PATH
  // =========================================================

  const isActivePath = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavClick = (path) => {
    navigate(path);

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    // Clear authentication here
    // localStorage.removeItem("token");

    navigate("/login");

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // =========================================================
  // LINK RENDERER
  // =========================================================

  const renderLinks = (links) => {
    return links.map((link) => {
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
            rounded-lg
            px-3
            py-2.5
            text-sm
            font-medium
            transition-all
            duration-200

            ${isCollapsed ? "lg:justify-center" : ""}

            ${
              isActive
                ? "bg-[#087F5B] text-white shadow-sm"
                : "text-[#425451] hover:bg-[#E8F8F2] hover:text-[#087F5B]"
            }
          `}
        >
          <Icon
            className={`
              h-[18px]
              w-[18px]
              shrink-0

              ${
                isActive
                  ? "text-white"
                  : "text-[#71827F] group-hover:text-[#087F5B]"
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
        </button>
      );
    });
  };

  // =========================================================
  // SECTION
  // =========================================================

  const renderSection = (title, icon, links) => {
    const SectionIcon = icon;

    return (
      <div className="mt-6">

        {!isCollapsed ? (
          <div className="mb-2 flex items-center gap-2 px-3">
            {SectionIcon && (
              <SectionIcon className="h-3 w-3 text-[#71827F]" />
            )}

            <p className="text-[10px] font-bold uppercase tracking-wider text-[#71827F]">
              {title}
            </p>
          </div>
        ) : (
          <div className="mb-2 hidden justify-center lg:flex">
            <div className="h-px w-8 bg-[#DDEAE6]" />
          </div>
        )}

        <div className="space-y-1">
          {renderLinks(links)}
        </div>

      </div>
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
          bg-black/50
          backdrop-blur-sm
          transition-opacity
          duration-300
          lg:hidden

          ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}
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
          h-full
          flex-col
          border-r
          border-[#DDEAE6]
          bg-white
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
            border-[#DDEAE6]
            px-4

            ${isCollapsed ? "lg:justify-center" : "justify-between"}
          `}
        >

          <Link
            to="/admin"
            className="flex items-center gap-2.5 overflow-hidden"
          >

            {/* Logo */}

            <div className="flex h-9 w-9 shrink-0 items-center justify-center">

              <svg
                width="36"
                height="36"
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
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <span className="text-base font-bold tracking-tight text-[#09263A]">
                TaxPilot
                <span className="text-[#087F5B]"> UK</span>
              </span>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-[#71827F]">
                Platform Admin
              </p>
            </div>

          </Link>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71827F] hover:bg-[#E8F8F2] hover:text-[#087F5B] lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">

          {/* Main */}

          <div className="space-y-1">
            {renderLinks(mainLinks)}
          </div>

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

        <div className="shrink-0 border-t border-[#DDEAE6] p-3">

          {/* Admin */}

          <div
            className={`
              mb-2
              flex
              items-center
              gap-3
              rounded-lg
              bg-[#F5FCF9]
              p-2.5

              ${isCollapsed ? "lg:justify-center lg:bg-transparent lg:p-0" : ""}
            `}
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#09263A] text-xs font-bold text-white">
              SA
            </div>

            <div
              className={`
                min-w-0
                flex-1
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <p className="truncate text-xs font-bold text-[#09263A]">
                Super Admin
              </p>

              <p className="truncate text-[10px] text-[#71827F]">
                admin@taxpilot.co.uk
              </p>
            </div>

          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Log out" : undefined}
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
              text-[#425451]
              transition-all
              duration-200
              hover:bg-[#FFF1F2]
              hover:text-[#E11D48]

              ${isCollapsed ? "lg:justify-center" : ""}
            `}
          >

            <LogOut className="h-[18px] w-[18px] shrink-0 text-[#71827F] group-hover:text-[#E11D48]" />

            <span
              className={`
                truncate
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              Log out
            </span>

          </button>

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
            top-20
            hidden
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            border-[#DDEAE6]
            bg-white
            text-[#71827F]
            shadow-sm
            transition-all
            hover:border-[#087F5B]
            hover:text-[#087F5B]
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
        </button>

      </aside>
    </>
  );
};

export default AdminSidebar;