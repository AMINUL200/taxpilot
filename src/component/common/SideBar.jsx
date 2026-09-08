import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronRight,
  Home,
  Package,
  DollarSign,
  HelpCircle,
  User,
  LogOut,
  LayoutDashboard,
  Search,
  FileText,
  Calculator,
  Receipt,
  ClipboardCheck,
} from "lucide-react";

const SideBar = ({ toggleMenu, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // SIDEBAR NAVIGATION LINKS - MATCHES NAVBAR
  // =========================================================

  const sidebarLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "products",
      label: "Products",
      icon: <Package className="w-5 h-5" />,
      dropdown: [
        {
          id: "corporation-tax",
          label: "Corporation Tax",
          path: "/corporation-tax",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          id: "annual-accounts",
          label: "Annual Accounts",
          path: "/annual-accounts",
          icon: <Calculator className="w-4 h-4" />,
        },
        {
          id: "mtd-vat",
          label: "MTD VAT",
          path: "/mtd-vat",
          icon: <Receipt className="w-4 h-4" />,
        },
        {
          id: "self-assessment",
          label: "Self Assessment",
          path: "/self-assessment",
          icon: <ClipboardCheck className="w-4 h-4" />,
        },
        {
          id: "confirmation-statement",
          label: "Confirmation Statement",
          path: "/confirmation-statement",
          icon: <FileText className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      path: "/pricing",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "help",
      label: "Help",
      path: "/help",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ];

  // =========================================================
  // AUTH STATE - MATCHES NAVBAR
  // =========================================================

  const isAuthenticated = false;
  const userData = { user_type: 2 };

  // =========================================================
  // CLOSE SIDEBAR ON ROUTE CHANGE
  // =========================================================

  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
  }, [location.pathname]);

  // =========================================================
  // TOGGLE DROPDOWN
  // =========================================================

  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  // =========================================================
  // HANDLE NAVIGATION
  // =========================================================

  const handleNavClick = (path) => {
    if (path) {
      navigate(path);
      setOpenDropdowns({});
    }
  };

  // =========================================================
  // HANDLE LOGOUT
  // =========================================================

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
    toggleMenu();
  };

  // =========================================================
  // CHECK ACTIVE PATH
  // =========================================================

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // =========================================================
  // RENDER DROPDOWN ITEMS (NESTED)
  // =========================================================

  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="relative">
        {hasSubDropdown ? (
          <div
            className={`
              flex
              items-center
              justify-between
              px-4
              py-3
              text-sm
              cursor-pointer
              transition-all
              duration-200
              ${level > 1 ? "pl-10" : "pl-6"}
              ${
                isOpen
                  ? "bg-primary-light text-primary"
                  : "text-text hover:bg-primary-light hover:text-primary"
              }
            `}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <div className="flex items-center gap-2">
              {item.icon && <span className="text-text-muted">{item.icon}</span>}
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronRight
              className={`
                w-4
                h-4
                text-text-muted
                transition-transform
                duration-300
                ${isOpen ? "rotate-90 text-primary" : ""}
              `}
            />
          </div>
        ) : (
          <div
            className={`
              flex
              items-center
              gap-2
              px-4
              py-3
              text-sm
              cursor-pointer
              transition-all
              duration-200
              ${level > 1 ? "pl-10" : "pl-6"}
              ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "text-text hover:bg-primary-light hover:text-primary"
              }
            `}
            onClick={() => handleNavClick(item.path)}
          >
            {item.icon && (
              <span className={isActive ? "text-white" : "text-text-muted"}>
                {item.icon}
              </span>
            )}
            <span className="font-medium">{item.label}</span>
          </div>
        )}

        {/* Nested dropdown */}
        {hasSubDropdown && (
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="bg-background-soft border-l-2 border-primary/30 ml-4">
              {item.dropdown.map((subItem) =>
                renderDropdownItem(subItem, level + 1)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // =========================================================
  // RENDER NAVIGATION ITEM
  // =========================================================

  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="mb-1">
        {hasDropdown ? (
          <div
            className={`
              flex
              items-center
              justify-between
              px-4
              py-3
              cursor-pointer
              transition-all
              duration-200
              rounded-lg
              mx-2
              ${
                isOpen
                  ? "bg-primary-light text-primary"
                  : "text-text hover:bg-primary-light hover:text-primary"
              }
            `}
            onClick={() => toggleDropdown(item.id)}
          >
            <div className="flex items-center gap-3">
              <span className={isOpen ? "text-primary" : "text-text-muted"}>
                {item.icon}
              </span>
              <span className="font-semibold">{item.label}</span>
            </div>
            <ChevronRight
              className={`
                w-5
                h-5
                text-text-muted
                transition-transform
                duration-300
                ${isOpen ? "rotate-90 text-primary" : ""}
              `}
            />
          </div>
        ) : (
          <div
            className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              cursor-pointer
              transition-all
              duration-200
              rounded-lg
              mx-2
              ${
                isActive
                  ? "bg-primary text-white font-semibold shadow-md"
                  : "text-text hover:bg-primary-light hover:text-primary"
              }
            `}
            onClick={() => handleNavClick(item.path)}
          >
            <span className={isActive ? "text-white" : "text-text-muted"}>
              {item.icon}
            </span>
            <span className="font-semibold">{item.label}</span>
          </div>
        )}

        {/* Dropdown menu */}
        {hasDropdown && (
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="mt-1">
              {item.dropdown.map((dropdownItem) =>
                renderDropdownItem(dropdownItem)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // =========================================================
  // SIDEBAR
  // =========================================================

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          z-40
          transition-opacity
          duration-300
          md:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          right-0
          h-full
          w-80
          bg-white
          shadow-2xl
          z-50
          transform
          transition-transform
          duration-300
          ease-in-out
          flex
          flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* =====================================================
            HEADER - TAXPILOT UK BRANDING
        ====================================================== */}

        <div className="flex items-center justify-between p-6 border-b border-border-light flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative flex items-center justify-center w-9 h-9">
              <svg
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Leaf 1 */}
                <path
                  d="M26.5 7C34.5 6.2 41.4 9.1 43 15.5C44.5 21.6 40.4 27.1 33.2 29.2C29.3 30.3 25.6 29.7 22.8 27.7C23.2 19.4 24.1 12.3 26.5 7Z"
                  fill="#087F5B"
                />
                {/* Leaf 2 */}
                <path
                  d="M20.5 16.5C15.2 13.2 9.4 14 6.2 18.5C3.1 22.9 4.9 28.6 10 31.4C13.3 33.2 17.1 33.2 20.4 31.5C19.1 25.9 19.2 21 20.5 16.5Z"
                  fill="#5ACBA8"
                />
                {/* Bottom leaf */}
                <path
                  d="M21.2 25.8C14.7 25.6 9.7 29 9.2 34C8.7 39.4 13.8 43.2 19.5 42.8C25.1 42.5 29.1 38.5 28.5 33.7C27.9 29.6 25.3 27 21.2 25.8Z"
                  fill="#8CDEC3"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-heading">
                TaxPilot
                <span className="text-primary"> UK</span>
              </h2>
              <p className="text-[9px] font-medium tracking-wide text-text-muted uppercase">
                Simple Business Compliance
              </p>
            </div>
          </div>

          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-primary-light rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-text" />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION LINKS
        ====================================================== */}

        <nav className="flex-1 overflow-y-auto pt-4 px-2 min-h-0">
          {sidebarLinks.map((item) => renderNavItem(item))}
        </nav>

        {/* =====================================================
            AUTH SECTION - MATCHES NAVBAR
        ====================================================== */}

        <div className="border-t border-border-light p-4 bg-background-soft flex-shrink-0">
          {/* Login */}
          {!isAuthenticated && (
            <button
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
              className="
                w-full
                bg-white
                text-primary
                border
                border-primary
                px-6
                py-3
                rounded-lg
                hover:bg-primary
                hover:text-white
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
                font-semibold
              "
            >
              <User className="w-5 h-5" />
              <span>Log in</span>
            </button>
          )}

          {/* Logout */}
          {isAuthenticated && userData?.user_type === 4 && (
            <button
              onClick={handleLogout}
              className="
                w-full
                bg-danger
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-red-600
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
                font-semibold
              "
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}

          {/* Dashboard */}
          {isAuthenticated && userData?.user_type !== 4 && (
            <button
              onClick={() => {
                navigate("/dashboard");
                toggleMenu();
              }}
              className="
                w-full
                bg-primary
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-primary-hover
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
                font-semibold
              "
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          )}

          {/* Get Started - Only show when not authenticated */}
          {!isAuthenticated && (
            <button
              onClick={() => {
                navigate("/register");
                toggleMenu();
              }}
              className="
                w-full
                mt-2
                bg-primary
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-primary-hover
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2
                font-semibold
                shadow-sm
              "
            >
              <span>Get started</span>
              <span className="text-base">→</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;