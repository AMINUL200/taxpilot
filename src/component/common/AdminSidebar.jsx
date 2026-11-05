import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  LayoutDashboard,
  Building2,
  Users,
  BriefcaseBusiness,
  FileText,
  CalendarClock,
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
  Menu,
  Home,
  MessageSquareQuote,
  LifeBuoy,
  Images,
  Globe,
  ClipboardList,
  ListChecks,
  Layers,
  History,
  Sparkles,
} from "lucide-react";
import useAuthStore from "../../stores/authStore";

const AdminSidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* =========================================================
     EXPANDED STATE — Sections + Nested items
  ========================================================= */

  const [expanded, setExpanded] = useState({
    platform: true,
    commerce: true,
    compliance: true,
    website: true,
    content: true,
    system: true,
    // Nested
    "website-forms": false,
  });

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* =========================================================
     AUTO-EXPAND SECTION + NESTED THAT CONTAINS ACTIVE ROUTE
  ========================================================= */

  useEffect(() => {
    const sections = {
      platform: [
        "/admin/organizations",
        "/admin/users",
        "/admin/companies",
        "/admin/filings",
        "/admin/deadlines",
      ],
      commerce: [
        "/admin/plans",
        "/admin/subscriptions",
        "/admin/payments",
        "/admin/invoices",
        "/admin/discounts",
      ],
      compliance: [
        "/admin/products/corporation-tax",
        "/admin/products/annual-accounts",
        "/admin/products/mtd-vat",
        "/admin/products/self-assessment",
        "/admin/products/confirmation-statement",
      ],
      website: [
        "/admin/website/pages",
        "/admin/website/navigation",
        "/admin/website/homepage",
        "/admin/website/faqs",
        "/admin/website/testimonials",
        "/admin/website/blog",
        "/admin/website/help-centre",
        "/admin/website/media-library",
        "/admin/website/forms",
      ],
      content: ["/admin/blog", "/admin/help", "/admin/pages"],
      system: [
        "/admin/notifications",
        "/admin/integrations",
        "/admin/settings",
        "/admin/admin-users",
      ],
    };

    const nested = {
      "website-forms": ["/admin/website/forms"],
    };

    const next = {};
    Object.entries(sections).forEach(([key, paths]) => {
      const isActive = paths.some(
        (p) => location.pathname === p || location.pathname.startsWith(`${p}/`),
      );
      if (isActive) next[key] = true;
    });

    Object.entries(nested).forEach(([key, paths]) => {
      const isActive = paths.some(
        (p) => location.pathname === p || location.pathname.startsWith(`${p}/`),
      );
      if (isActive) next[key] = true;
    });

    if (Object.keys(next).length > 0) {
      setExpanded((prev) => ({ ...prev, ...next }));
    }
  }, [location.pathname]);

  /* =========================================================
     REAL AUTH STORE
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
    return "SA";
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
    return "Super Admin";
  };

  const displayName = getDisplayName();
  const displayEmail = user?.email || "admin@taxpilot.co.uk";
  const displayInitials = getInitials();

  /* =========================================================
     MAIN LINKS
  ========================================================= */

  const mainLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
  ];

  /* =========================================================
     SECTION CONFIG — WITH NESTED DROPDOWNS
  ========================================================= */

  const sections = [
    {
      key: "platform",
      title: "Platform",
      icon: ShieldCheck,
      links: [
        {
          id: "organizations",
          label: "Organizations",
          path: "/admin/organizations",
          icon: Building2,
        },
        { id: "users", label: "Users", path: "/admin/users", icon: Users },
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
      ],
    },
    {
      key: "commerce",
      title: "Commerce",
      icon: CreditCard,
      links: [
        {
          id: "plans",
          label: "Plans & Pricing",
          path: "/admin/plans",
          icon: Calculator,
        },
        {
          id: "subscriptions",
          label: "Subscriptions",
          // path: "/admin/subscriptions",
          icon: BadgeDollarSign,
          children: [
            {
              id: "subscriptions-products",
              label: "Products", 
              path: "/admin/subscriptions/products",
              icon: BadgeDollarSign,
            },
            {
              id: "subscriptions-plans",
              label: "Plans",
              path: "/admin/subscriptions/plans",
              icon: BadgeDollarSign,
            }
          ]
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
        {
          id: "discounts",
          label: "Discounts",
          path: "/admin/discounts",
          icon: Percent,
        },
      ],
    },
    {
      key: "compliance",
      title: "Compliance",
      icon: FileCheck2,
      links: [
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
      ],
    },
    {
      key: "website",
      title: "Website",
      icon: Globe,
      links: [
        // {
        //   id: "website-pages",
        //   label: "Pages",
        //   path: "/admin/website/pages",
        //   icon: Files,
        // },
        // {
        //   id: "navigation",
        //   label: "Navigation",
        //   path: "/admin/website/navigation",
        //   icon: Menu,
        // },
        {
          id: "legal-page",
          label: "Legal Page",
          // path: "/admin/website/legal-page",
          icon: FileText,
          children: [
            {
              id: "terms",
              label: "Terms",
              path: "/admin/website/legal-page/terms",
              icon: FileText,
            },
            {
              id: "privacy",
              label: "Privacy",
              path: "/admin/website/legal-page/privacy",
              icon: FileText,
            },
          ],
        },

        {
          id: "faqs",
          label: "FAQs",
          path: "/admin/website/faqs",
          icon: HelpCircle,
        },
        {
          id: "features",
          label: "Features",
          // path: "/admin/website/features",
          icon: Sparkles,
          children: [
            {
              id: "feature-first-section",
              label: "Feature First Section",
              path: "/admin/website/features/first-section",
              icon: Sparkles,
            },
            {
              id: "feature-second-section",
              label: "Feature Second Section",
              path: "/admin/website/features/second-section",
              icon: Sparkles,
            },
            {
              id: "feature-third-section",
              label: "Feature Third Section",
              path: "/admin/website/features/third-section",
              icon: Sparkles,
            },
            {
              id: "feature-fourth-section",
              label: "Feature Fourth Section",
              path: "/admin/website/features/fourth-section",
              icon: Sparkles,
            },
            {
              id: "feature-fifth-section",
              label: "Feature Fifth Section",
              path: "/admin/website/features/fifth-section",
              icon: Sparkles,
            },
            {
              id: "feature-sixth-section",
              label: "Feature Sixth Section",
              path: "/admin/website/features/sixth-section",
              icon: Sparkles,
            }
          ]
        },
    
        {
          id: "website-forms",
          label: "Forms",
          icon: ClipboardList,
          children: [
            {
              id: "filling-processes",
              label: "Filling Type",
              path: "/admin/website/forms/filling-type",
              icon: FileText,
            },
            {
              id: "form-definitions",
              label: "Form Definitions",
              path: "/admin/website/forms/definitions",
              icon: Sparkles,
            },
            // { id: "form-fields", label: "Form Fields", path: "/admin/website/forms/fields", icon: ListChecks },
            // { id: "form-sections", label: "Form Sections", path: "/admin/website/forms/sections", icon: Layers },
            {
              id: "form-versions",
              label: "Form Versions",
              path: "/admin/website/forms/versions",
              icon: History,
            },
          ],
        },
        // nested filling processes
        // {
        //   id: "website-filling-processes",
        //   label: "Filling Processes",
        //   icon: FileText,
        //   children: [
        //     { id: "filling-processes", label: "Filling Type", path: "/admin/website/filling-type", icon: FileText },
        //     { id: "filling-steps", label: "Filling Steps", path: "/admin/website/filling-steps", icon: FileText },
        //   ],
        // }
      ],
    },
    {
      key: "content",
      title: "Content",
      icon: Newspaper,
      links: [
        {
          id: "content-blog",
          label: "Blog",
          path: "/admin/blog",
          icon: Newspaper,
        },
        {
          id: "content-help",
          label: "Help Centre",
          path: "/admin/help",
          icon: HelpCircle,
        },
        {
          id: "content-pages",
          label: "Pages",
          path: "/admin/pages",
          icon: Files,
        },
      ],
    },
    {
      key: "system",
      title: "System",
      icon: Settings,
      links: [
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
          label: "Settings",
          path: "/admin/settings",
          icon: Settings,
        },
        {
          id: "admin-users",
          label: "Admin Users",
          path: "/admin/admin-users",
          icon: UserCog,
        },
      ],
    },
  ];

  /* =========================================================
     MOBILE CLOSE ON NAVIGATE
  ========================================================= */

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* =========================================================
     ACTIVE PATH
  ========================================================= */

  const isActivePath = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) onClose();
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    try {
      if (window.innerWidth < 1024) onClose();
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login", { replace: true });
    }
  };

  /* =========================================================
     RENDER A LEAF LINK (no children)
  ========================================================= */

  const renderLeafLink = (link, index = 0, level = 2) => {
    const Icon = link.icon;
    const isActive = isActivePath(link.path);

    // indentation per level
    const indentClass =
      level === 2
        ? "pl-9 pr-3"
        : level === 3
          ? "pl-[52px] pr-3"
          : "pl-[68px] pr-3";

    return (
      <motion.button
        key={link.id}
        type="button"
        onClick={() => handleNavClick(link.path)}
        title={isCollapsed ? link.label : undefined}
        initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.35,
          ease: premiumEase,
          delay: shouldReduceMotion ? 0 : index * 0.03,
        }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : { x: 2, transition: { duration: 0.2 } }
        }
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        className={`
          group
          relative
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          py-2.5
          text-sm
          font-medium
          transition-colors
          duration-200
          ${indentClass}
          ${isCollapsed ? "lg:justify-center lg:pl-3 lg:pr-3" : ""}
          ${
            isActive
              ? "bg-primary text-text-white shadow-button"
              : "text-dark-muted hover:bg-dark-soft hover:text-text-white"
          }
        `}
      >
        {isActive && (
          <motion.span
            layoutId="admin-active-indicator"
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
            transition={{ duration: 0.35, ease: premiumEase }}
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
          strokeWidth={2.1}
        />

        <span
          className={`
            min-w-0 flex-1 truncate text-left
            ${isCollapsed ? "lg:hidden" : ""}
          `}
        >
          {link.label}
        </span>
      </motion.button>
    );
  };

  /* =========================================================
     RENDER A NESTED DROPDOWN ITEM (has children)
  ========================================================= */

  const renderNestedItem = (link) => {
    const Icon = link.icon;
    const isOpen = expanded[link.id];

    // Is any child active?
    const hasActiveChild = link.children?.some((c) => isActivePath(c.path));

    // If the sidebar is collapsed, we skip nested dropdowns entirely
    // and just show the parent as a normal link (navigates to first child)
    if (isCollapsed) {
      const firstChild = link.children?.[0];
      if (firstChild) {
        return renderLeafLink(
          { ...link, path: firstChild.path, children: undefined },
          0,
          2,
        );
      }
      return null;
    }

    return (
      <div key={link.id}>
        {/* Parent toggle button */}
        <motion.button
          type="button"
          onClick={() => toggleSection(link.id)}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { x: 2, transition: { duration: 0.2 } }
          }
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          className={`
            group
            relative
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            py-2.5
            pl-9
            pr-3
            text-sm
            font-medium
            transition-colors
            duration-200
            ${
              hasActiveChild
                ? "text-sky"
                : "text-dark-muted hover:bg-dark-soft hover:text-text-white"
            }
          `}
        >
          <Icon
            className={`
              h-[18px]
              w-[18px]
              shrink-0
              transition-colors
              duration-200
              ${
                hasActiveChild
                  ? "text-sky"
                  : "text-dark-muted group-hover:text-text-white"
              }
            `}
            strokeWidth={2.1}
          />

          <span className="min-w-0 flex-1 truncate text-left">
            {link.label}
          </span>

          {/* Chevron rotates */}
          <motion.span
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            className={`
              flex
              h-4
              w-4
              shrink-0
              items-center
              justify-center
              transition-colors
              ${hasActiveChild ? "text-sky" : "text-dark-muted"}
            `}
          >
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.4} />
          </motion.span>
        </motion.button>

        {/* Children (animated) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={`${link.id}-children`}
              initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: premiumEase,
                  opacity: { duration: 0.22 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.25, ease: premiumEase },
              }}
              className="overflow-hidden"
            >
              <div className="space-y-1 pt-1">
                {link.children.map((child, index) =>
                  renderLeafLink(child, index, 3),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  /* =========================================================
     COLLAPSIBLE SECTION RENDERER
  ========================================================= */

  const renderSection = ({ key, title, icon: SectionIcon, links }) => {
    const isOpen = expanded[key];
    const hasActiveChild = links.some(
      (l) =>
        (l.path && isActivePath(l.path)) ||
        l.children?.some((c) => isActivePath(c.path)),
    );

    return (
      <motion.div
        key={key}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        className="mt-6"
      >
        {!isCollapsed ? (
          <button
            type="button"
            onClick={() => toggleSection(key)}
            className="
              group
              mb-1
              flex
              w-full
              items-center
              justify-between
              gap-2
              rounded-lg
              px-3
              py-2
              transition-colors
              duration-200
              hover:bg-dark-soft/60
            "
          >
            <div className="flex items-center gap-2">
              {SectionIcon && (
                <SectionIcon
                  className={`
                    h-3.5
                    w-3.5
                    transition-colors
                    ${
                      hasActiveChild
                        ? "text-sky"
                        : "text-dark-muted group-hover:text-text-white"
                    }
                  `}
                  strokeWidth={2.2}
                />
              )}
              <p
                className={`
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  transition-colors
                  ${
                    hasActiveChild
                      ? "text-sky"
                      : "text-dark-muted group-hover:text-text-white"
                  }
                `}
              >
                {title}
              </p>
            </div>

            <motion.span
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.25, ease: premiumEase }}
              className="
                flex
                h-4
                w-4
                items-center
                justify-center
                text-dark-muted
                transition-colors
                group-hover:text-text-white
              "
            >
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.4} />
            </motion.span>
          </button>
        ) : (
          <div className="mb-2 hidden justify-center lg:flex">
            <div className="h-px w-8 bg-dark-soft" />
          </div>
        )}

        <AnimatePresence initial={false}>
          {(isOpen || isCollapsed) && (
            <motion.div
              key={`${key}-body`}
              initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: premiumEase,
                  opacity: { duration: 0.22 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.25, ease: premiumEase },
              }}
              className="overflow-hidden"
            >
              <div className="space-y-1 pt-1">
                {links.map((link, index) => {
                  // Nested dropdown item
                  if (link.children && link.children.length > 0) {
                    return renderNestedItem(link);
                  }
                  // Regular leaf link
                  return renderLeafLink(link, index, 2);
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
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
        {/* LOGO */}
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
            to="/admin"
            className="flex items-center gap-2.5 overflow-hidden"
          >
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
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-dark-muted">
                Platform Admin
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-dark-muted
              transition-colors
              hover:bg-dark-soft
              hover:text-text-white
              lg:hidden
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          <div className="space-y-1">{renderLeafLink(mainLinks[0], 0, 2)}</div>
          {sections.map((section) => renderSection(section))}
        </nav>

        {/* ADMIN PROFILE + LOGOUT */}
        <div className="shrink-0 border-t border-dark-soft p-3">
          <div
            className={`
              mb-2
              flex
              items-center
              gap-3
              rounded-lg
              bg-dark-soft
              p-2.5
              ${isCollapsed ? "lg:justify-center lg:bg-transparent lg:p-0" : ""}
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
              "
            >
              {displayInitials}
            </div>

            <div
              className={`
                min-w-0
                flex-1
                ${isCollapsed ? "lg:hidden" : ""}
              `}
            >
              <p className="truncate text-xs font-bold text-text-white">
                {displayName}
              </p>
              <p className="truncate text-[10px] text-dark-muted">
                {displayEmail}
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Log out" : undefined}
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
            />
            <span className={`truncate ${isCollapsed ? "lg:hidden" : ""}`}>
              Log out
            </span>
          </motion.button>
        </div>

        {/* COLLAPSE BUTTON */}
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

export default AdminSidebar;
