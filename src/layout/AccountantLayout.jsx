import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AccountantSidebar from "../component/common/AccountantSidebar";
import AccountantNavbar from "../component/common/AccountantNavbar";

const AccountantLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen bg-[#F5FCF9]">
      {/* ======================================================
          SIDEBAR
      ====================================================== */}
      <AccountantSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* ======================================================
          MAIN CONTENT AREA
      ====================================================== */}
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
        <AccountantNavbar
          onMenuClick={toggleSidebar}
          onToggleCollapse={toggleCollapse}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#DDEAE6] bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-[11px] text-[#687B78] sm:flex-row">
            <p>
              © {new Date().getFullYear()} TaxPilot UK. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/privacy"
                className="transition-colors hover:text-[#087F5B]"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="transition-colors hover:text-[#087F5B]"
              >
                Terms
              </a>
              <a
                href="/help"
                className="transition-colors hover:text-[#087F5B]"
              >
                Help
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AccountantLayout;