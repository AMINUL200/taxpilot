import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../component/common/AdminSidebar";
import AdminNavbar from "../component/common/AdminNavbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen bg-background-soft">

      {/* ============================================================
          SIDEBAR
      ============================================================ */}

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* ============================================================
          MAIN CONTENT AREA
      ============================================================ */}

      <div
        className={`
          flex
          min-h-screen
          flex-col
          transition-all
          duration-300
          ease-in-out
          ${isSidebarCollapsed ? "lg:pl-[76px]" : "lg:pl-[260px]"}
        `}
      >
        {/* Navbar */}
        <AdminNavbar
          onMenuClick={toggleSidebar}
          onToggleCollapse={toggleCollapse}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Page Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-[1440px]">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer
          className="
            border-t
            border-border-light
            bg-background
            px-4
            py-4
            sm:px-6
            lg:px-8
          "
        >
          <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 text-[11px] text-text-muted sm:flex-row">
            <p>
              © {new Date().getFullYear()} TaxPilot UK · Platform Admin. All
              rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/admin/system-status"
                className="transition-colors hover:text-primary"
              >
                System Status
              </a>
              <a
                href="/admin/changelog"
                className="transition-colors hover:text-primary"
              >
                Changelog
              </a>
              <a
                href="/admin/support"
                className="transition-colors hover:text-primary"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;