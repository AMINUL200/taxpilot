import React, { useState, useEffect, useRef } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Search,
} from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // SCROLL EFFECT
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // NAVIGATION LINKS
  // =========================================================

  const navLinks = [
    {
      id: "products",
      label: "Products",
      dropdown: [
        {
          id: "corporation-tax",
          label: "Corporation Tax",
          path: "/corporation-tax",
        },
        {
          id: "annual-accounts",
          label: "Annual Accounts",
          path: "/annual-accounts",
        },
        {
          id: "mtd-vat",
          label: "MTD VAT",
          path: "/mtd-vat",
        },
        {
          id: "self-assessment",
          label: "Self Assessment",
          path: "/self-assessment",
        },
        {
          id: "confirmation-statement",
          label: "Confirmation Statement",
          path: "/confirmation-statement",
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing",
      path: "/pricing",
    },
    {
      id: "help",
      label: "Help",
      path: "/help",
    },
  ];

  // =========================================================
  // AUTH
  // =========================================================

  const isAuthenticated = false;
  const userData = { user_type: 2 };

  // =========================================================
  // DROPDOWN HELPERS
  // =========================================================

  const getParentDropdownId = (dropdownId) => {
    if (dropdownId.includes("-sub-")) {
      const parts = dropdownId.split("-sub-");
      return parts[0];
    }
    return null;
  };

  const isChildDropdown = (childId, parentId) => {
    return childId.startsWith(parentId + "-sub-");
  };

  // =========================================================
  // TOGGLE DROPDOWN
  // =========================================================

  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns((prev) => {
      const newState = { ...prev };

      // Parent dropdown
      if (!dropdownId.includes("-sub-")) {
        Object.keys(newState).forEach((key) => {
          if (key !== dropdownId && !key.includes("-sub-")) {
            newState[key] = false;

            Object.keys(newState).forEach((subKey) => {
              if (isChildDropdown(subKey, key)) {
                newState[subKey] = false;
              }
            });
          }
        });
      }
      // Child dropdown
      else {
        const parentId = getParentDropdownId(dropdownId);

        Object.keys(newState).forEach((key) => {
          if (
            key !== dropdownId &&
            getParentDropdownId(key) === parentId
          ) {
            newState[key] = false;

            Object.keys(newState).forEach((nestedKey) => {
              if (isChildDropdown(nestedKey, key)) {
                newState[nestedKey] = false;
              }
            });
          }
        });
      }

      newState[dropdownId] = !prev[dropdownId];
      return newState;
    });
  };

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
        setOpenDropdowns({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavClick = (path) => {
    navigate(path);
    setOpenDropdowns({});
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  // =========================================================
  // RENDER NESTED DROPDOWN
  // =========================================================

  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-sub-${level}`;
    const isOpen = openDropdowns[dropdownKey];

    return (
      <div key={item.id} className="relative">
        {hasSubDropdown ? (
          <div
            className={`
              flex
              items-center
              justify-between
              px-4
              py-2.5
              text-sm
              text-text
              hover:bg-primary-light
              hover:text-primary
              cursor-pointer
              transition-colors
              duration-200
              ${level > 1 ? "pl-8" : ""}
            `}
            onClick={() => toggleDropdown(dropdownKey)}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`
                w-4
                h-4
                text-text-muted
                transition-transform
                duration-200
                ${isOpen ? "rotate-180 text-primary" : ""}
              `}
            />
          </div>
        ) : (
          <RouterLink
            to={item.path}
            className={`
              block
              px-4
              py-2.5
              text-sm
              text-text
              hover:bg-primary-light
              hover:text-primary
              transition-colors
              duration-200
              ${level > 1 ? "pl-8" : ""}
            `}
            onClick={() => setOpenDropdowns({})}
          >
            {item.label}
          </RouterLink>
        )}

        {/* Nested dropdown */}
        {hasSubDropdown && isOpen && (
          <div
            className="
              bg-background-soft
              border-l-2
              border-primary
              ml-2
            "
          >
            {item.dropdown.map((subItem) =>
              renderDropdownItem(subItem, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  // =========================================================
  // RENDER NAV ITEM
  // =========================================================

  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = location.pathname === item.path;

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => {
          dropdownRefs.current[item.id] = el;
        }}
      >
        {hasDropdown ? (
          <button
            type="button"
            className={`
              relative
              flex
              items-center
              gap-1
              px-2
              py-2
              text-sm
              font-medium
              cursor-pointer
              transition-colors
              duration-200
              ${
                isOpen
                  ? "text-primary"
                  : "text-heading hover:text-primary"
              }
            `}
            onClick={() => toggleDropdown(item.id)}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`
                w-3.5
                h-3.5
                transition-transform
                duration-200
                ${
                  isOpen
                    ? "rotate-180 text-primary"
                    : "text-text-muted"
                }
              `}
            />
            {isOpen && (
              <span
                className="
                  absolute
                  left-2
                  right-2
                  -bottom-1
                  h-0.5
                  rounded-full
                  bg-primary
                "
              />
            )}
          </button>
        ) : (
          <button
            type="button"
            className={`
              relative
              px-2
              py-2
              text-sm
              font-medium
              cursor-pointer
              transition-colors
              duration-200
              ${
                isActive
                  ? "text-primary"
                  : "text-heading hover:text-primary"
              }
            `}
            onClick={() => handleNavClick(item.path)}
          >
            {item.label}
            {isActive && (
              <span
                className="
                  absolute
                  left-2
                  right-2
                  -bottom-1
                  h-0.5
                  rounded-full
                  bg-primary
                "
              />
            )}
          </button>
        )}

        {/* Dropdown */}
        {hasDropdown && isOpen && (
          <div
            className="
              absolute
              top-full
              left-0
              mt-3
              w-64
              bg-white
              border
              border-border-light
              rounded-xl
              shadow-lg
              z-50
              overflow-hidden
              animate-in
              fade-in
              slide-in-from-top-1
              duration-200
            "
          >
            <div className="py-2">
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
  // NAVBAR
  // =========================================================

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        w-full
        bg-white/95
        backdrop-blur-md
        border-b
        border-border-light
        transition-all
        duration-300
        ${scrolled ? "py-2.5 shadow-sm" : "py-4"}
      `}
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
        "
      >
        {/* =====================================================
            LOGO
        ====================================================== */}

        <div
          className="
            flex
            items-center
            cursor-pointer
            shrink-0
          "
          onClick={() => navigate("/")}
        >
          {/* Logo icon */}
          <div
            className="
              relative
              flex
              items-center
              justify-center
              w-10
              h-10
            "
          >
            <svg
              width="40"
              height="40"
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

          {/* Brand */}
          <div className="ml-2.5">
            <div
              className="
                text-xl
                sm:text-2xl
                font-bold
                tracking-tight
                text-heading
                leading-none
              "
            >
              TaxPilot
              <span className="text-primary"> UK</span>
            </div>
            <div
              className="
                mt-1
                text-[9px]
                sm:text-[10px]
                font-medium
                tracking-wide
                text-text-muted
                uppercase
              "
            >
              Simple Business Compliance
            </div>
          </div>
        </div>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav
          className="
            hidden
            lg:flex
            items-center
            gap-1
            ml-auto
            mr-8
          "
        >
          {navLinks.map((item) => renderNavItem(item))}
        </nav>

        {/* =====================================================
            DESKTOP RIGHT SIDE
        ====================================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-3
          "
        >
          {/* Search */}
          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              text-heading
              hover:text-primary
              hover:bg-primary-light
              transition-colors
              duration-200
              cursor-pointer
            "
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          {/* Login */}
          {!isAuthenticated && (
            <RouterLink
              to="/login"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-2.5
                rounded-lg
                bg-white
                text-primary
                border
                border-primary
                text-sm
                font-semibold
                transition-all
                duration-200
                hover:bg-primary
                hover:text-white
                hover:border-primary
                hover:-translate-y-0.5
              "
            >
              <User className="w-4 h-4" />
              <span>Log in</span>
            </RouterLink>
          )}

          {/* Logout */}
          {isAuthenticated &&
            userData?.user_type === 4 && (
              <button
                type="button"
                onClick={handleLogout}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-lg
                  bg-danger
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-red-600
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}

          {/* Dashboard */}
          {isAuthenticated &&
            userData?.user_type !== 4 && (
              <RouterLink
                to="/dashboard"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-lg
                  bg-primary
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-primary-hover
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                "
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </RouterLink>
            )}

          {/* Get Started */}
          {!isAuthenticated && (
            <RouterLink
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-2.5
                rounded-lg
                bg-primary
                text-white
                border
                border-primary
                text-sm
                font-semibold
                shadow-sm
                transition-all
                duration-200
                hover:bg-primary-hover
                hover:border-primary-hover
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              <span>Get started</span>
              <span className="text-base">→</span>
            </RouterLink>
          )}
        </div>

        {/* =====================================================
            MOBILE
        ====================================================== */}

        <div
          className="
            lg:hidden
            flex
            items-center
            gap-2
          "
        >
          {/* Mobile Login */}
          {!isAuthenticated && (
            <RouterLink
              to="/login"
              className="
                hidden
                sm:inline-flex
                items-center
                justify-center
                px-4
                py-2
                rounded-lg
                text-sm
                font-semibold
                text-primary
                border
                border-primary
                hover:bg-primary
                hover:text-white
                transition-all
                duration-200
              "
            >
              Log in
            </RouterLink>
          )}

          {/* Mobile menu */}
          <button
            type="button"
            onClick={toggleMenu}
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-lg
              text-heading
              hover:text-primary
              hover:bg-primary-light
              transition-colors
              duration-200
              cursor-pointer
              focus:outline-none
            "
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;