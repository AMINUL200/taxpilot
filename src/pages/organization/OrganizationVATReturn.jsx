import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  Play,
  Info,
  Hash,
  FileText,
  CheckCircle2,
  Link2,
  Upload,
  Download,
  Cloud,
  Sparkles,
  ChevronRight,
  Table2,
} from "lucide-react";

const OrganizationVATReturn = () => {
  const { companyNumber } = useParams();
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState(false);

  /* ============================================================
     DEMO DATA
  ============================================================ */

  const demoCompanyMap = {
    "14803890": {
      companyName: "IMPERIAL THERMAL LTD",
      companyNumber: "14803890",
      vrn: "449519458",
    },
    "05513948": {
      companyName: "SKIL FOUR LIMITED",
      companyNumber: "05513948",
      vrn: "",
    },
  };

  const company =
    demoCompanyMap[companyNumber] || {
      companyName: "Unknown Company",
      companyNumber,
      vrn: "",
    };

  /* ============================================================
     VAT BOXES (HMRC MTD VAT Return)
  ============================================================ */

  const vatBoxes = [
    {
      box: 1,
      label: "VAT due on sales and other outputs",
      value: "£0.00",
    },
    {
      box: 2,
      label: "VAT due on EC acquisitions",
      value: "£0.00",
    },
    {
      box: 3,
      label: "Total VAT due (Box 1 + Box 2)",
      value: "£0.00",
      isTotal: true,
    },
    {
      box: 4,
      label: "VAT reclaimed on purchases",
      value: "£0.00",
    },
    {
      box: 5,
      label: "Net VAT (Box 3 − Box 4)",
      value: "£0.00",
      isTotal: true,
    },
    {
      box: 6,
      label: "Total sales (excl. VAT)",
      value: "£0.00",
    },
    {
      box: 7,
      label: "Total purchases (excl. VAT)",
      value: "£0.00",
    },
    {
      box: 8,
      label: "Goods supplied to EC (excl. VAT)",
      value: "£0.00",
    },
    {
      box: 9,
      label: "Acquisitions from EC (excl. VAT)",
      value: "£0.00",
    },
  ];

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleBack = () => {
    navigate("/organization/products/mtd-vat");
  };

  const handleConnectHMRC = () => {
    console.log("Connect to HMRC for:", company.companyNumber);
  };

  const handleFileBrowse = () => {
    console.log("Browse file");
  };

  const handleDownloadTemplate = () => {
    console.log("Download CSV template");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log("Dropped file:", files[0]);
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#F5FCF9]">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ======================================================
            BACK
        ====================================================== */}
        <button
          type="button"
          onClick={handleBack}
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-[#687B78]
            transition-colors
            hover:text-[#087F5B]
          "
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
          <span>Back to VAT Returns</span>
        </button>

        {/* ======================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F2]">
            <FileText
              className="h-5 w-5 text-[#087F5B]"
              strokeWidth={2.2}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
              VAT Returns
            </h1>
            <p className="mt-0.5 text-sm text-[#687B78]">
              Prepare and submit your MTD VAT return to HMRC
            </p>
          </div>
        </div>

        {/* ======================================================
            VAT PERIODS / HMRC CONNECTION CARD
        ====================================================== */}
        <div className="mb-5 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          {/* Header */}
          <div className="border-b border-[#DDEAE6] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <CalendarDays
                className="h-4 w-4 text-[#087F5B]"
                strokeWidth={2.2}
              />
              <h2 className="text-sm font-bold text-[#09263A]">
                VAT periods
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F8F2]">
                  <Cloud
                    className="h-6 w-6 text-[#087F5B]"
                    strokeWidth={2.2}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#09263A]">
                    After you connect, your real VAT obligation periods come
                    straight from HMRC — nothing to set up by hand.
                  </p>
                  <p className="mt-1 text-xs text-[#687B78]">
                    File your next VAT return directly to HMRC.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleConnectHMRC}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#087F5B]
                    px-5
                    py-2.5
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
                  <Link2 className="h-3.5 w-3.5" strokeWidth={2.6} />
                  <span>Connect to HMRC</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            DIGITAL RECORD (9 VAT BOXES)
        ====================================================== */}
        <div className="mb-5 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-[#DDEAE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2">
              <Table2
                className="h-4 w-4 text-[#087F5B]"
                strokeWidth={2.2}
              />
              <h2 className="text-sm font-bold text-[#09263A]">
                Create digital record
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F3F5] px-2.5 py-1 text-[10px] font-bold text-[#687B78]">
              <Clock3 className="h-3 w-3" strokeWidth={2.4} />
              Not started
            </div>
          </div>

          {/* VAT boxes */}
          <div className="divide-y divide-[#DDEAE6]">
            {vatBoxes.map((item) => (
              <div
                key={item.box}
                className={`
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-5
                  py-3.5
                  transition-colors
                  hover:bg-[#F5FCF9]
                  sm:px-6
                  ${item.isTotal ? "bg-[#E8F8F2]/40" : ""}
                `}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      text-[11px]
                      font-bold
                      ${
                        item.isTotal
                          ? "bg-[#087F5B] text-white"
                          : "bg-[#E8F8F2] text-[#087F5B]"
                      }
                    `}
                  >
                    {item.box}
                  </span>
                  <p
                    className={`
                      truncate text-xs
                      ${
                        item.isTotal
                          ? "font-bold text-[#09263A]"
                          : "font-medium text-[#09263A]"
                      }
                    `}
                  >
                    {item.label}
                  </p>
                </div>

                <span className="shrink-0 font-mono text-xs font-semibold text-[#687B78]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="flex items-start gap-2 border-t border-[#DDEAE6] bg-[#F5FCF9] px-5 py-3.5 sm:px-6">
            <Info
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#087F5B]"
              strokeWidth={2.2}
            />
            <p className="text-[11px] leading-5 text-[#687B78]">
              Your VAT figures will be calculated from your accounting records.
              You can review and adjust before submitting to HMRC.
            </p>
          </div>
        </div>

        {/* ======================================================
            FILE UPLOAD
        ====================================================== */}
        <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          {/* Header */}
          <div className="border-b border-[#DDEAE6] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Upload
                className="h-4 w-4 text-[#087F5B]"
                strokeWidth={2.2}
              />
              <h2 className="text-sm font-bold text-[#09263A]">
                Or upload a file
              </h2>
            </div>
          </div>

          {/* Dropzone */}
          <div className="p-5 sm:p-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                px-5
                py-10
                text-center
                transition-all
                duration-200
                ${
                  isDragging
                    ? "border-[#087F5B] bg-[#E8F8F2]"
                    : "border-[#DDEAE6] bg-[#F5FCF9]"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  transition-colors
                  ${
                    isDragging
                      ? "bg-[#087F5B] text-white"
                      : "bg-[#E8F8F2] text-[#087F5B]"
                  }
                `}
              >
                <Upload className="h-6 w-6" strokeWidth={2.2} />
              </div>

              <p className="mt-4 text-sm font-bold text-[#09263A]">
                Drag and drop your file
              </p>

              <p className="mt-1 flex items-center gap-1 text-xs text-[#687B78]">
                or{" "}
                <button
                  type="button"
                  onClick={handleFileBrowse}
                  className="
                    font-semibold
                    text-[#087F5B]
                    underline-offset-2
                    transition-colors
                    hover:text-[#005E45]
                    hover:underline
                  "
                >
                  browse
                </button>
              </p>

              <p className="mt-3 text-[11px] font-medium text-[#687B78]">
                CSV or Excel (.xls, .xlsx)
              </p>
            </div>

            {/* Download template */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2 text-xs text-[#687B78]">
                <Sparkles
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#087F5B]"
                  strokeWidth={2.2}
                />
                <p className="leading-5">
                  Use our template to make sure your file is formatted
                  correctly.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-[#DDEAE6]
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-[#09263A]
                  transition-all
                  duration-200
                  hover:border-[#087F5B]
                  hover:bg-[#E8F8F2]
                  hover:text-[#087F5B]
                "
              >
                <Download className="h-3.5 w-3.5" strokeWidth={2.6} />
                <span>Download CSV template</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================
            COMPANY SUMMARY (Footer card — keeps context visible)
        ====================================================== */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
          <div className="flex flex-col gap-4 border-b border-[#DDEAE6] bg-gradient-to-r from-[#E8F8F2]/60 to-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
                <Building2 className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  Filing for
                </p>
                <h2 className="mt-0.5 truncate text-sm font-bold text-[#09263A]">
                  {company.companyName}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#687B78]">
                  <span className="flex items-center gap-1 font-mono">
                    <Hash className="h-3 w-3" />
                    {company.companyNumber}
                  </span>
                  {company.vrn && (
                    <span className="flex items-center gap-1 font-mono">
                      <FileText className="h-3 w-3" />
                      VRN {company.vrn}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5">
              <CheckCircle2
                className="h-3.5 w-3.5 text-emerald-600"
                strokeWidth={2.4}
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                MTD Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationVATReturn;