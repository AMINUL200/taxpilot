import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCw,
  Building2,
  AlertTriangle,
  Check,
  ArrowRight,
  Info,
  Plus,
} from "lucide-react";

/* ============================================================
   VRN STATUS BADGE
============================================================ */

const VrnStatusBadge = ({ status }) => {
  const statusStyles = {
    "added-unverified": {
      bg: "bg-[#FFF4CC]",
      text: "text-[#9A6700]",
      dot: "bg-[#E8A317]",
      label: "VRN added — unverified",
    },
    verified: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      label: "VRN verified",
    },
    missing: {
      bg: "bg-[#F1F3F5]",
      text: "text-[#687B78]",
      dot: "bg-[#B8C4C1]",
      label: "No VRN added",
    },
  };

  const styles = statusStyles[status] || statusStyles.missing;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-bold
        whitespace-nowrap
        ${styles.bg}
        ${styles.text}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {styles.label}
    </span>
  );
};

/* ============================================================
   MAIN PAGE
============================================================ */

const OrganizationVAT = () => {
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      companyName: "IMPERIAL THERMAL LTD",
      companyNumber: "14803890",
      vrn: "449519458",
      vrnStatus: "added-unverified",
      hmrcName: "FORWARD SUCCESS LIMITED",
      canFile: true,
    },
    {
      id: 2,
      companyName: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
      vrn: "",
      vrnStatus: "missing",
      hmrcName: "",
      canFile: false,
    },
  ]);

  const [vrnInputs, setVrnInputs] = useState({});
  const [vrnErrors, setVrnErrors] = useState({});
  const [savedRow, setSavedRow] = useState(null);

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleVrnInputChange = (companyId, value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 9);
    setVrnInputs((prev) => ({ ...prev, [companyId]: cleaned }));
    if (vrnErrors[companyId]) {
      setVrnErrors((prev) => ({ ...prev, [companyId]: "" }));
    }
  };

  const handleSaveVrn = (companyId) => {
    const value = vrnInputs[companyId] ?? "";
    setSavedRow(companyId);
    console.log("Save VRN:", { companyId, vrn: value });

    setTimeout(() => {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === companyId
            ? {
                ...c,
                vrn: value,
                vrnStatus: "added-unverified",
                canFile: true,
                hmrcName: c.hmrcName || "Pending verification",
              }
            : c
        )
      );
      setSavedRow(null);
    }, 400);
  };

  const handleAddVrn = (companyId) => {
    const value = vrnInputs[companyId] ?? "";

    if (!/^\d{9}$/.test(value)) {
      setVrnErrors((prev) => ({
        ...prev,
        [companyId]: "Please enter a valid 9-digit VRN.",
      }));
      return;
    }

    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId
          ? {
              ...c,
              vrn: value,
              vrnStatus: "added-unverified",
              canFile: true,
              hmrcName: "Pending verification",
            }
          : c
      )
    );

    setVrnInputs((prev) => ({ ...prev, [companyId]: "" }));
    setVrnErrors((prev) => ({ ...prev, [companyId]: "" }));
  };

  /* ============================================================
     START FILING → navigate to /products/mtd-vat/:companyNumber/start
  ============================================================ */

  const handleStartFiling = (company) => {
    // Route matches: products/mtd-vat/:companyNumber/start
    // (relative to /organization)
    navigate(
      `/organization/products/mtd-vat-return/${company.companyNumber}/start`
    );
  };

  /* ============================================================
     FILTERED COMPANIES
  ============================================================ */

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return companies;
    return companies.filter((c) =>
      `${c.companyName} ${c.companyNumber}`.toLowerCase().includes(query)
    );
  }, [search, companies]);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#F5FCF9]">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ======================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F2]">
              <Building2
                className="h-5 w-5 text-[#087F5B]"
                strokeWidth={2.2}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
                VAT Returns
              </h1>
              <p className="mt-0.5 text-sm text-[#687B78]">
                Manage and file VAT returns for your companies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-3 py-2 text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-[#687B78]">Synced 14d ago</span>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2
                text-xs
                font-semibold
                text-[#09263A]
                transition-all
                duration-200
                hover:border-[#087F5B]
                hover:text-[#087F5B]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          </div>
        </div>

        {/* ======================================================
            SEARCH
        ====================================================== */}
        <div className="mb-5">
          <div className="relative w-full lg:w-[395px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687B78]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies..."
              className="
                w-full
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                py-2.5
                pl-10
                pr-4
                text-sm
                text-[#09263A]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#687B78]
                focus:border-[#087F5B]
                focus:ring-2
                focus:ring-[#087F5B]/10
              "
            />
          </div>
        </div>

        {/* ======================================================
            TABLE
        ====================================================== */}
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-2 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#087F5B]" />
              <h2 className="text-sm font-bold text-[#09263A]">
                Companies
              </h2>
              <span className="rounded-full bg-[#E8F8F2] px-2 py-0.5 text-[10px] font-bold text-[#087F5B]">
                {filteredCompanies.length}
              </span>
            </div>
            <p className="text-[11px] text-[#687B78]">
              Add a VRN to enable filing
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Company
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    VRN
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#DDEAE6]">
                {filteredCompanies.map((company) => {
                  const hasVrn = Boolean(company.vrn);

                  return (
                    <tr
                      key={company.id}
                      className="transition-colors hover:bg-[#F5FCF9]"
                    >
                      {/* COMPANY */}
                      <td className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                            <Building2
                              className="h-4 w-4 text-[#087F5B]"
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#09263A]">
                              {company.companyName}
                            </p>
                            <p className="mt-0.5 font-mono text-[12px] text-[#687B78]">
                              {company.companyNumber}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* VRN */}
                      <td className="px-5 py-4 align-top">
                        <div className="min-w-[220px]">
                          {hasVrn ? (
                            <>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={vrnInputs[company.id] ?? company.vrn}
                                  onChange={(e) =>
                                    handleVrnInputChange(
                                      company.id,
                                      e.target.value
                                    )
                                  }
                                  maxLength={9}
                                  className="
                                    w-[130px]
                                    rounded-lg
                                    border
                                    border-[#DDEAE6]
                                    bg-white
                                    px-3
                                    py-1.5
                                    font-mono
                                    text-xs
                                    font-semibold
                                    text-[#09263A]
                                    outline-none
                                    transition-all
                                    duration-200
                                    focus:border-[#087F5B]
                                    focus:ring-2
                                    focus:ring-[#087F5B]/10
                                  "
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveVrn(company.id)}
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    border
                                    border-[#DDEAE6]
                                    bg-white
                                    px-3
                                    py-1.5
                                    text-[11px]
                                    font-bold
                                    text-[#09263A]
                                    transition-all
                                    duration-200
                                    hover:border-[#087F5B]
                                    hover:bg-[#E8F8F2]
                                    hover:text-[#087F5B]
                                  "
                                >
                                  {savedRow === company.id ? (
                                    <>
                                      <Check
                                        className="h-3 w-3"
                                        strokeWidth={2.6}
                                      />
                                      Saved
                                    </>
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                              </div>

                              {company.hmrcName && (
                                <div className="mt-2 flex items-start gap-1.5">
                                  <AlertTriangle
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A317]"
                                    strokeWidth={2.4}
                                  />
                                  <p className="text-[11px] leading-4 text-[#9A6700]">
                                    <span className="font-semibold">
                                      HMRC name:
                                    </span>{" "}
                                    {company.hmrcName}
                                  </p>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={vrnInputs[company.id] ?? ""}
                                  onChange={(e) =>
                                    handleVrnInputChange(
                                      company.id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="9-digit VRN"
                                  maxLength={9}
                                  className="
                                    w-[130px]
                                    rounded-lg
                                    border
                                    border-[#DDEAE6]
                                    bg-white
                                    px-3
                                    py-1.5
                                    font-mono
                                    text-xs
                                    text-[#09263A]
                                    outline-none
                                    transition-all
                                    duration-200
                                    placeholder:text-[#687B78]
                                    focus:border-[#087F5B]
                                    focus:ring-2
                                    focus:ring-[#087F5B]/10
                                  "
                                />
                                <button
                                  type="button"
                                  onClick={() => handleAddVrn(company.id)}
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-lg
                                    bg-[#087F5B]
                                    px-3
                                    py-1.5
                                    text-[11px]
                                    font-bold
                                    text-white
                                    shadow-sm
                                    transition-all
                                    duration-200
                                    hover:bg-[#005E45]
                                  "
                                >
                                  <Plus
                                    className="h-3 w-3"
                                    strokeWidth={2.8}
                                  />
                                  Add VRN
                                </button>
                              </div>

                              {vrnErrors[company.id] && (
                                <p className="mt-1.5 text-[11px] font-semibold text-rose-600">
                                  {vrnErrors[company.id]}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4 align-top">
                        <VrnStatusBadge status={company.vrnStatus} />
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4 text-right align-top">
                        {company.canFile ? (
                          <button
                            type="button"
                            onClick={() => handleStartFiling(company)}
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-lg
                              bg-[#087F5B]
                              px-4
                              py-2
                              text-xs
                              font-bold
                              text-white
                              shadow-sm
                              transition-all
                              duration-200
                              hover:bg-[#005E45]
                              hover:-translate-y-0.5
                              hover:shadow-md
                            "
                          >
                            <span>Start filing</span>
                            <ArrowRight
                              className="h-3.5 w-3.5"
                              strokeWidth={2.6}
                            />
                          </button>
                        ) : (
                          <span className="text-[11px] font-semibold text-[#687B78]">
                            Add VRN first
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F8F2]">
                <Building2
                  className="h-7 w-7 text-[#087F5B]"
                  strokeWidth={2}
                />
              </div>
              <p className="mt-4 text-sm font-bold text-[#09263A]">
                No companies found
              </p>
              <p className="mt-1 max-w-xs text-xs text-[#687B78]">
                Try searching by company name or registration number.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#E8F8F2]/50 p-4">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]"
            strokeWidth={2.2}
          />
          <p className="text-[11px] leading-6 text-[#687B78]">
            Add a 9-digit VAT Registration Number (VRN) to enable MTD VAT filing
            for a company. HMRC-provided names are shown for verification before
            you file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationVAT;