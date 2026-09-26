import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Hash,
  MapPin,
  Calendar,
  ExternalLink,
  Edit3,
  MoreVertical,
  Plus,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Users,
  Briefcase,
  TrendingUp,
  Activity,
  FolderOpen,
  Send,
  Download,
  Archive,
  Eye,
  Receipt,
  CreditCard,
  Shield,
  Copy,
  Check,
  ChevronRight,
  Landmark,
  UserCheck,
  Award,
  Phone,
  Mail,
  Globe,
  Star,
  ArrowRight,
} from "lucide-react";

const AccountantCompaniesDetails = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("overview");
  const [openMenu, setOpenMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ============================================================
     DEMO DATA
  ============================================================ */

  const company = {
    id: companyId || 1,
    name: "Imperial Thermal Ltd",
    number: "14803890",
    type: "Private limited Company",
    status: "Active",
    incorporatedOn: "07 September 2022",
    vrn: "GB449519458",
    utrNumber: "1234567890",
    sicCodes: [
      "43220 - Plumbing, heat and air-conditioning installation",
      "46740 - Wholesale of hardware, plumbing and heating equipment",
    ],
    registeredOffice: {
      line1: "25 King Street",
      line2: "London",
      postcode: "EC2V 8AU",
      country: "United Kingdom",
    },
    client: {
      id: 1,
      name: "Imperial Thermal Ltd",
      contactPerson: "James Mitchell",
      email: "james@imperialthermal.co.uk",
      initials: "IM",
      avatarColor: "bg-[#087F5B]",
    },
    accountant: {
      name: "Alice Johnson",
      role: "Senior Accountant",
      initials: "AJ",
      email: "alice@taxpilot.co.uk",
    },
  };

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "filings",
      label: "Filings This Year",
      value: 8,
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "open",
      label: "Open Filings",
      value: 2,
      icon: Clock3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 1,
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
    },
    {
      id: "officers",
      label: "Officers",
      value: 2,
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  /* ============================================================
     NEXT FILINGS
  ============================================================ */

  const nextFilings = [
    {
      id: 1,
      type: "VAT Return",
      period: "Q3 2026",
      dueDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
      status: "Overdue",
    },
    {
      id: 2,
      type: "Corporation Tax (CT600)",
      period: "FY 2025/26",
      dueDate: "05 Nov 2026",
      daysLeft: 44,
      urgency: "medium",
      status: "Ready to file",
    },
    {
      id: 3,
      type: "Annual Accounts",
      period: "FY 2025/26",
      dueDate: "15 Dec 2026",
      daysLeft: 84,
      urgency: "low",
      status: "Not started",
    },
  ];

  /* ============================================================
     FILING HISTORY
  ============================================================ */

  const filingHistory = [
    {
      id: 1,
      date: "02 Jul 2026",
      type: "VAT Return",
      period: "Q2 2026",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 2,
      date: "15 Jun 2026",
      type: "Corporation Tax (CT600)",
      period: "FY 2024/25",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 3,
      date: "28 Apr 2026",
      type: "Annual Accounts",
      period: "FY 2024/25",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 4,
      date: "05 Apr 2026",
      type: "VAT Return",
      period: "Q1 2026",
      status: "Filed",
      filedBy: "John S.",
    },
    {
      id: 5,
      date: "20 Jan 2026",
      type: "VAT Return",
      period: "Q4 2025",
      status: "Filed",
      filedBy: "Alice J.",
    },
    {
      id: 6,
      date: "15 Dec 2025",
      type: "Confirmation Statement",
      period: "Annual",
      status: "Filed",
      filedBy: "Sarah M.",
    },
  ];

  /* ============================================================
     OFFICERS
  ============================================================ */

  const officers = [
    {
      id: 1,
      name: "James Mitchell",
      role: "Director",
      status: "Active",
      appointedOn: "07 Sep 2022",
      nationality: "British",
      dateOfBirth: "March 1985",
      initials: "JM",
      avatarColor: "bg-[#087F5B]",
      email: "james@imperialthermal.co.uk",
    },
    {
      id: 2,
      name: "Sophie Mitchell",
      role: "Secretary",
      status: "Active",
      appointedOn: "07 Sep 2022",
      nationality: "British",
      dateOfBirth: "August 1987",
      initials: "SM",
      avatarColor: "bg-blue-500",
      email: "sophie@imperialthermal.co.uk",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "VAT return submitted",
      description: "Q2 2026 · HMRC accepted",
      time: "2 days ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      actor: "Alice J.",
    },
    {
      id: 2,
      title: "Documents uploaded",
      description: "Bank statements for Q3",
      time: "5 days ago",
      icon: FolderOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      actor: "James M.",
    },
    {
      id: 3,
      title: "CT600 draft created",
      description: "Awaiting approval",
      time: "1 week ago",
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      actor: "Alice J.",
    },
    {
      id: 4,
      title: "VAT number verified",
      description: "HMRC name: IMPERIAL THERMAL LTD",
      time: "2 weeks ago",
      icon: Shield,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      actor: "System",
    },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "filings", label: "Filings", icon: FileText, count: filingHistory.length },
    { id: "officers", label: "Officers", icon: Users, count: officers.length },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ============================================================
     HELPERS
  ============================================================ */

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "overdue":
        return {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-700",
          badge: "bg-rose-100 text-rose-700",
          dot: "bg-rose-500",
        };
      case "high":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          badge: "bg-amber-100 text-amber-700",
          dot: "bg-amber-500",
        };
      case "medium":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          badge: "bg-blue-100 text-blue-700",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
          badge: "bg-emerald-100 text-emerald-700",
          dot: "bg-emerald-500",
        };
    }
  };

  const getDaysLabel = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          BREADCRUMB
      ====================================================== */}
      <button
        type="button"
        onClick={() => navigate("/accountant/companies")}
        className="
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
        <span>Back to Companies</span>
      </button>

      {/* ======================================================
          COMPANY HERO CARD
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8F8F2] opacity-50 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          {/* Top row */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: identity */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#087F5B] shadow-sm">
                <Building2 className="h-8 w-8 text-white" strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-[#09263A] sm:text-2xl">
                    {company.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {company.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[10px] font-bold text-[#687B78]">
                    {company.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#687B78]">
                  <button
                    type="button"
                    onClick={() => handleCopy(company.number)}
                    className="flex items-center gap-1.5 font-mono font-semibold transition-colors hover:text-[#087F5B]"
                  >
                    <Hash className="h-3.5 w-3.5" />
                    {company.number}
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Incorporated {company.incorporatedOn}
                  </span>
                  <a
                    href={`https://find-and-update.company-information.service.gov.uk/company/${company.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-[#087F5B] transition-colors hover:text-[#005E45]"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Companies House
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/accountant/companies/${company.id}/edit`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#DDEAE6]
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#09263A]
                  transition-all
                  duration-200
                  hover:border-[#087F5B]
                  hover:bg-[#E8F8F2]
                  hover:text-[#087F5B]
                "
              >
                <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Edit</span>
              </Link>

              <Link
                to={`/accountant/filings/new?company=${company.number}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#087F5B]
                  px-4
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
                <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                <span>Start Filing</span>
              </Link>

              {/* More menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#DDEAE6]
                    bg-white
                    text-[#09263A]
                    transition-all
                    duration-200
                    hover:border-[#087F5B]
                    hover:text-[#087F5B]
                  "
                  aria-label="More actions"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {openMenu && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-[#DDEAE6] bg-white py-1 shadow-2xl">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export data</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <FolderOpen className="h-3.5 w-3.5" />
                      <span>Manage documents</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Permissions</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <RefreshCwIcon className="h-3.5 w-3.5" />
                      <span>Sync from CH</span>
                    </button>
                    <div className="my-1 border-t border-[#DDEAE6]" />
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                      <Archive className="h-3.5 w-3.5" />
                      <span>Archive company</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#DDEAE6] pt-5 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="flex items-center gap-3 rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-3"
                >
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${stat.iconBg}
                    `}
                  >
                    <Icon
                      className={`h-4 w-4 ${stat.iconColor}`}
                      strokeWidth={2.2}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-[#09263A]">
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================
          TABS
      ====================================================== */}
      <div className="rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        <div className="flex gap-1 overflow-x-auto border-b border-[#DDEAE6] px-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group
                  relative
                  flex
                  shrink-0
                  items-center
                  gap-2
                  px-4
                  py-4
                  text-sm
                  font-semibold
                  transition-colors
                  ${
                    isActive
                      ? "text-[#087F5B]"
                      : "text-[#687B78] hover:text-[#087F5B]"
                  }
                `}
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`
                      rounded-full
                      px-1.5
                      py-0.5
                      text-[9px]
                      font-bold
                      ${
                        isActive
                          ? "bg-[#087F5B] text-white"
                          : "bg-[#F5FCF9] text-[#687B78]"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-[#087F5B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ======================================================
            TAB CONTENT
        ====================================================== */}
        <div className="p-5 sm:p-6">
          {/* ================================================
              OVERVIEW
          ================================================ */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Next Filings */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <Clock3
                      className="h-4 w-4 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Upcoming Filings
                  </h3>
                </div>

                <div className="space-y-2">
                  {nextFilings.map((filing) => {
                    const urgency = getUrgencyStyles(filing.urgency);
                    return (
                      <div
                        key={filing.id}
                        className={`
                          flex
                          flex-col
                          gap-3
                          rounded-xl
                          border
                          p-4
                          transition-all
                          duration-200
                          hover:shadow-sm
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                          ${urgency.bg}
                          ${urgency.border}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-white
                              border
                              ${urgency.border}
                            `}
                          >
                            <FileText
                              className={`h-4 w-4 ${urgency.text}`}
                              strokeWidth={2.2}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#09263A]">
                              {filing.type}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#687B78]">
                              {filing.period}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-4 pl-13 sm:pl-0">
                          <div className="text-right">
                            <p className="text-xs font-bold text-[#09263A]">
                              {filing.dueDate}
                            </p>
                            <p
                              className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                            >
                              {getDaysLabel(filing.daysLeft)}
                            </p>
                          </div>
                          <Link
                            to="/accountant/filings/new"
                            className="
                              inline-flex
                              items-center
                              gap-1
                              rounded-lg
                              bg-[#087F5B]
                              px-3.5
                              py-2
                              text-[10px]
                              font-bold
                              text-white
                              shadow-sm
                              transition-all
                              duration-200
                              hover:bg-[#005E45]
                            "
                          >
                            <span>File</span>
                            <ArrowRight
                              className="h-3 w-3"
                              strokeWidth={2.6}
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Company Information */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Landmark
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Company Information
                    </h3>
                  </div>

                  <div className="divide-y divide-[#DDEAE6]">
                    <InfoRow
                      icon={Hash}
                      label="Company Number"
                      value={company.number}
                      isMono
                      onCopy={() => handleCopy(company.number)}
                    />
                    <InfoRow
                      icon={Receipt}
                      label="VAT Number"
                      value={company.vrn}
                      isMono
                      onCopy={() => handleCopy(company.vrn)}
                    />
                    <InfoRow
                      icon={CreditCard}
                      label="UTR Number"
                      value={company.utrNumber}
                      isMono
                    />
                    <InfoRow
                      icon={Briefcase}
                      label="Company Type"
                      value={company.type}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Incorporated On"
                      value={company.incorporatedOn}
                    />
                  </div>
                </div>

                {/* Registered Office + Client */}
                <div className="space-y-5">
                  {/* Registered Office */}
                  <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                    <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                        <MapPin
                          className="h-4 w-4 text-[#087F5B]"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-[#09263A]">
                        Registered Office
                      </h3>
                    </div>

                    <div className="p-5">
                      <div className="rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-4">
                        <p className="text-sm font-bold text-[#09263A]">
                          {company.registeredOffice.line1}
                        </p>
                        <p className="mt-1 text-xs text-[#09263A]">
                          {company.registeredOffice.line2}
                        </p>
                        <p className="mt-1 font-mono text-xs text-[#09263A]">
                          {company.registeredOffice.postcode}
                        </p>
                        <p className="mt-1 text-xs text-[#687B78]">
                          {company.registeredOffice.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Client */}
                  <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                    <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                        <Users
                          className="h-4 w-4 text-[#087F5B]"
                          strokeWidth={2.2}
                        />
                      </div>
                      <h3 className="text-sm font-bold text-[#09263A]">
                        Client
                      </h3>
                    </div>

                    <div className="p-5">
                      <Link
                        to={`/accountant/clients/${company.client.id}`}
                        className="
                          group
                          flex
                          items-center
                          gap-4
                          rounded-lg
                          border
                          border-[#DDEAE6]
                          bg-[#F5FCF9]
                          p-4
                          transition-all
                          duration-200
                          hover:border-[#087F5B]/30
                          hover:shadow-sm
                        "
                      >
                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-sm
                            font-bold
                            text-white
                            ${company.client.avatarColor}
                          `}
                        >
                          {company.client.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[#09263A] group-hover:text-[#087F5B]">
                            {company.client.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                            {company.client.contactPerson}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                            {company.client.email}
                          </p>
                        </div>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-[#687B78] transition-all group-hover:translate-x-0.5 group-hover:text-[#087F5B]"
                          strokeWidth={2.4}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIC Codes */}
              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <Globe
                      className="h-4 w-4 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Nature of Business (SIC Codes)
                  </h3>
                </div>

                <div className="divide-y divide-[#DDEAE6]">
                  {company.sicCodes.map((sic, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 px-5 py-3.5"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E8F8F2] text-[10px] font-bold text-[#087F5B]">
                        {idx + 1}
                      </span>
                      <p className="text-xs leading-5 text-[#09263A]">
                        {sic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              FILINGS
          ================================================ */}
          {activeTab === "filings" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Filing History
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    {filingHistory.length} filings submitted
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 text-xs font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]">
                  <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                  <span>Export</span>
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Date
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Filing
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Period
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Status
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Filed By
                        </th>
                        <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDEAE6]">
                      {filingHistory.map((filing) => (
                        <tr
                          key={filing.id}
                          className="transition-colors hover:bg-[#F5FCF9]"
                        >
                          <td className="px-5 py-4">
                            <span className="text-xs font-semibold text-[#09263A]">
                              {filing.date}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                                <FileText
                                  className="h-3.5 w-3.5 text-[#087F5B]"
                                  strokeWidth={2.2}
                                />
                              </div>
                              <span className="text-xs font-semibold text-[#09263A]">
                                {filing.type}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs text-[#687B78]">
                              {filing.period}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                              <CheckCircle2
                                className="h-3 w-3"
                                strokeWidth={2.4}
                              />
                              {filing.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs text-[#687B78]">
                              {filing.filedBy}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button className="inline-flex items-center gap-1 rounded-lg border border-[#DDEAE6] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                              <Eye className="h-3 w-3" strokeWidth={2.4} />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              OFFICERS
          ================================================ */}
          {activeTab === "officers" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Company Officers
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    Directors, secretaries and persons with significant control
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {officers.map((officer) => (
                  <div
                    key={officer.id}
                    className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white transition-all duration-200 hover:border-[#087F5B]/30 hover:shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 border-b border-[#DDEAE6] bg-[#F5FCF9] p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-sm
                            font-bold
                            text-white
                            ${officer.avatarColor}
                          `}
                        >
                          {officer.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-bold text-[#09263A]">
                              {officer.name}
                            </p>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                              <span className="h-1 w-1 rounded-full bg-emerald-500" />
                              {officer.status}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-[#687B78]">
                            {officer.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="divide-y divide-[#DDEAE6]">
                      <InfoRow
                        icon={Calendar}
                        label="Appointed On"
                        value={officer.appointedOn}
                      />
                      <InfoRow
                        icon={Calendar}
                        label="Date of Birth"
                        value={officer.dateOfBirth}
                      />
                      <InfoRow
                        icon={Globe}
                        label="Nationality"
                        value={officer.nationality}
                      />
                      <InfoRow
                        icon={Mail}
                        label="Email"
                        value={officer.email}
                        action="mailto"
                        href={`mailto:${officer.email}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================
              ACTIVITY
          ================================================ */}
          {activeTab === "activity" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#09263A]">
                  Recent Activity
                </h3>
                <p className="mt-0.5 text-xs text-[#687B78]">
                  Latest actions and updates for this company
                </p>
              </div>

              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-[#DDEAE6]" />

                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="relative flex gap-4"
                      >
                        <div
                          className={`
                            relative
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border-4
                            border-white
                            ${activity.iconBg}
                          `}
                          style={{ zIndex: 1 }}
                        >
                          <Icon
                            className={`h-4 w-4 ${activity.iconColor}`}
                            strokeWidth={2.4}
                          />
                        </div>

                        <div className="min-w-0 flex-1 pb-2">
                          <div className="rounded-xl border border-[#DDEAE6] bg-white p-3.5">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-[#09263A]">
                                  {activity.title}
                                </p>
                                <p className="mt-0.5 text-[11px] text-[#687B78]">
                                  {activity.description}
                                </p>
                              </div>
                              <span className="shrink-0 text-[10px] font-semibold text-[#687B78]">
                                {activity.time}
                              </span>
                            </div>
                            {activity.actor && (
                              <p className="mt-2 text-[10px] text-[#687B78]">
                                by{" "}
                                <span className="font-semibold">
                                  {activity.actor}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   INFO ROW (Reusable)
============================================================ */

const InfoRow = ({ icon: Icon, label, value, isMono, action, href, onCopy }) => {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-[#F5FCF9]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F5FCF9]">
          <Icon className="h-3.5 w-3.5 text-[#687B78]" strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
            {label}
          </p>
          <p
            className={`
              mt-0.5 truncate text-sm font-semibold text-[#09263A]
              ${isMono ? "font-mono" : ""}
            `}
          >
            {value}
          </p>
        </div>
      </div>

      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
          aria-label={`Copy ${label}`}
        >
          <Copy className="h-3.5 w-3.5" strokeWidth={2.4} />
        </button>
      )}

      {(action === "external" || action === "mailto" || action === "phone") && (
        <a
          href={href}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
          aria-label={`Open ${label}`}
        >
          {action === "external" ? (
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.4} />
          ) : (
            <Send className="h-3.5 w-3.5" strokeWidth={2.4} />
          )}
        </a>
      )}
    </div>
  );
};

/* Small inline fallback icon for RefreshCw */
const RefreshCwIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export default AccountantCompaniesDetails;