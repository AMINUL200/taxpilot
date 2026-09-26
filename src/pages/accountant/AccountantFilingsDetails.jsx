import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Hash,
  Users,
  Calendar,
  Clock3,
  FileText,
  CheckCircle2,
  AlertCircle,
  Edit3,
  MoreVertical,
  Plus,
  Play,
  PauseCircle,
  Send,
  Download,
  Upload,
  Archive,
  Eye,
  Receipt,
  Shield,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Timer,
  UserCheck,
  MessageSquare,
  Activity,
  Paperclip,
  History,
  FileCheck2,
  Save,
  X,
  ChevronDown,
  Landmark,
  Info,
  AlertTriangle,
} from "lucide-react";

const AccountantFilingsDetails = () => {
  const { filingId } = useParams();
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

  const filing = {
    id: filingId || 1,
    type: "VAT Return",
    period: "Q3 2026",
    status: "In Progress",
    progress: 45,
    dueDate: "30 September 2026",
    daysLeft: 7,
    assignee: "Alice Johnson",
    assigneeInitials: "AJ",
    assigneeEmail: "alice@taxpilot.co.uk",
    createdAt: "15 Aug 2026",
    lastUpdated: "2 hours ago",
    company: {
      id: 1,
      name: "Imperial Thermal Ltd",
      number: "14803890",
      vrn: "GB449519458",
    },
    client: {
      id: 1,
      name: "Imperial Thermal Ltd",
      contactPerson: "James Mitchell",
      email: "james@imperialthermal.co.uk",
      initials: "IM",
      avatarColor: "bg-[#087F5B]",
    },
  };

  /* ============================================================
     VAT BOXES (HMRC MTD VAT Return)
  ============================================================ */

  const vatBoxes = [
    {
      box: 1,
      label: "VAT due on sales and other outputs",
      value: "£12,450.00",
      editable: true,
    },
    {
      box: 2,
      label: "VAT due on EC acquisitions",
      value: "£0.00",
      editable: true,
    },
    {
      box: 3,
      label: "Total VAT due (Box 1 + Box 2)",
      value: "£12,450.00",
      isTotal: true,
    },
    {
      box: 4,
      label: "VAT reclaimed on purchases",
      value: "£8,320.00",
      editable: true,
    },
    {
      box: 5,
      label: "Net VAT (Box 3 − Box 4)",
      value: "£4,130.00",
      isTotal: true,
      highlight: true,
    },
    {
      box: 6,
      label: "Total sales (excl. VAT)",
      value: "£62,250.00",
      editable: true,
    },
    {
      box: 7,
      label: "Total purchases (excl. VAT)",
      value: "£41,600.00",
      editable: true,
    },
    {
      box: 8,
      label: "Goods supplied to EC (excl. VAT)",
      value: "£0.00",
      editable: true,
    },
    {
      box: 9,
      label: "Acquisitions from EC (excl. VAT)",
      value: "£0.00",
      editable: true,
    },
  ];

  /* ============================================================
     TIMELINE
  ============================================================ */

  const timeline = [
    {
      id: 1,
      title: "Filing created",
      description: "VAT Return Q3 2026 started",
      time: "15 Aug 2026, 10:24",
      icon: Plus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      actor: "Alice Johnson",
    },
    {
      id: 2,
      title: "Documents uploaded",
      description: "3 files uploaded by client",
      time: "20 Aug 2026, 14:11",
      icon: Paperclip,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      actor: "James Mitchell",
    },
    {
      id: 3,
      title: "Figures entered",
      description: "VAT boxes 1-7 completed",
      time: "22 Aug 2026, 09:47",
      icon: Edit3,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      actor: "Alice Johnson",
    },
    {
      id: 4,
      title: "Awaiting client approval",
      description: "Draft sent to client for review",
      time: "23 Aug 2026, 16:32",
      icon: UserCheck,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      actor: "Alice Johnson",
    },
    {
      id: 5,
      title: "Client approved",
      description: "Client confirmed figures are correct",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      actor: "James Mitchell",
    },
  ];

  /* ============================================================
     ATTACHMENTS
  ============================================================ */

  const attachments = [
    {
      id: 1,
      name: "Q3-bank-statements.pdf",
      size: "2.4 MB",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
    },
    {
      id: 2,
      name: "Q3-sales-report.xlsx",
      size: "842 KB",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
    },
    {
      id: 3,
      name: "Q3-purchase-invoices.zip",
      size: "5.1 MB",
      uploadedBy: "James Mitchell",
      uploadedAt: "20 Aug 2026",
    },
  ];

  /* ============================================================
     NOTES
  ============================================================ */

  const notes = [
    {
      id: 1,
      author: "Alice Johnson",
      initials: "AJ",
      color: "bg-[#087F5B]",
      time: "2 days ago",
      text: "Bank statements reconciled. All figures look consistent with the quarterly report.",
    },
    {
      id: 2,
      author: "James Mitchell",
      initials: "JM",
      color: "bg-blue-500",
      time: "1 day ago",
      text: "Confirmed figures. Ready to submit whenever you are.",
    },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "boxes", label: "VAT Boxes", icon: Receipt },
    { id: "attachments", label: "Attachments", icon: Paperclip, count: attachments.length },
    { id: "timeline", label: "Timeline", icon: History },
  ];

  /* ============================================================
     HELPERS
  ============================================================ */

  const getStatusStyles = (status) => {
    switch (status) {
      case "Submitted":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          icon: CheckCircle2,
        };
      case "In Progress":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          dot: "bg-blue-500",
          icon: Timer,
        };
      case "Awaiting Client":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
          icon: UserCheck,
        };
      case "Overdue":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          dot: "bg-rose-500",
          icon: AlertCircle,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
          icon: Clock3,
        };
    }
  };

  const statusStyles = getStatusStyles(filing.status);
  const StatusIcon = statusStyles.icon;

  const getUrgencyStyles = (days) => {
    if (days < 0) {
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        badge: "bg-rose-100 text-rose-700",
        label: `${Math.abs(days)} days overdue`,
      };
    }
    if (days <= 7) {
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-700",
        label: `${days} days left`,
      };
    }
    if (days <= 30) {
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
        label: `${days} days left`,
      };
    }
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
      label: `${days} days left`,
    };
  };

  const urgency = getUrgencyStyles(filing.daysLeft);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        onClick={() => navigate("/accountant/filings")}
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
        <span>Back to Filings</span>
      </button>

      {/* ======================================================
          FILING HERO CARD
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8F8F2] opacity-50 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          {/* Top row */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#087F5B] shadow-sm">
                <FileText className="h-8 w-8 text-white" strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-[#09263A] sm:text-2xl">
                    {filing.type}
                  </h1>
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
                      ${statusStyles.bg}
                      ${statusStyles.text}
                    `}
                  >
                    <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                    {filing.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#687B78]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="h-3.5 w-3.5" />
                    Period: {filing.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    Due {filing.dueDate}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${urgency.badge}`}
                  >
                    {urgency.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
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
                <Save className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
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
                <Send className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Send to Client</span>
              </button>

              <button
                type="button"
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
                <Play className="h-3.5 w-3.5" strokeWidth={2.6} />
                <span>Submit to HMRC</span>
              </button>

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
                      <PauseCircle className="h-3.5 w-3.5" />
                      <span>Pause filing</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export draft</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Send message</span>
                    </button>
                    <div className="my-1 border-t border-[#DDEAE6]" />
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                      <Archive className="h-3.5 w-3.5" />
                      <span>Archive filing</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 border-t border-[#DDEAE6] pt-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#087F5B]
                    text-[11px]
                    font-bold
                    text-white
                  `}
                >
                  {filing.assigneeInitials}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Assigned to
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-[#09263A]">
                    {filing.assignee}
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                    Progress
                  </p>
                  <p className="text-xs font-bold text-[#09263A]">
                    {filing.progress}%
                  </p>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F1F3F5]">
                  <div
                    className="h-full rounded-full bg-[#087F5B] transition-all duration-500"
                    style={{ width: `${filing.progress}%` }}
                  />
                </div>
              </div>
            </div>
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
              {/* Company + Client cards */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Company */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Building2
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Company
                    </h3>
                  </div>

                  <div className="p-5">
                    <Link
                      to={`/accountant/companies/${filing.company.id}`}
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
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
                        <Building2
                          className="h-6 w-6 text-white"
                          strokeWidth={2}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#09263A] group-hover:text-[#087F5B]">
                          {filing.company.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#687B78]">
                          <span className="font-mono">
                            #{filing.company.number}
                          </span>
                          <span>·</span>
                          <span className="font-mono">
                            VRN {filing.company.vrn}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-[#687B78] transition-all group-hover:translate-x-0.5 group-hover:text-[#087F5B]"
                        strokeWidth={2.4}
                      />
                    </Link>
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
                      to={`/accountant/clients/${filing.client.id}`}
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
                          ${filing.client.avatarColor}
                        `}
                      >
                        {filing.client.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#09263A] group-hover:text-[#087F5B]">
                          {filing.client.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                          {filing.client.contactPerson}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                          {filing.client.email}
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

              {/* Filing Info grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard
                  icon={FileText}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                  label="Filing Type"
                  value={filing.type}
                />
                <InfoCard
                  icon={Calendar}
                  iconBg="bg-purple-100"
                  iconColor="text-purple-600"
                  label="Period"
                  value={filing.period}
                />
                <InfoCard
                  icon={Clock3}
                  iconBg="bg-amber-100"
                  iconColor="text-amber-600"
                  label="Due Date"
                  value={filing.dueDate}
                />
                <InfoCard
                  icon={Hash}
                  iconBg="bg-emerald-100"
                  iconColor="text-emerald-600"
                  label="Filing ID"
                  value={`#${filing.id}`}
                />
              </div>

              {/* Notes */}
              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <MessageSquare
                      className="h-4 w-4 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Notes
                  </h3>
                </div>

                <div className="divide-y divide-[#DDEAE6]">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-start gap-3 px-5 py-4"
                    >
                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-[10px]
                          font-bold
                          text-white
                          ${note.color}
                        `}
                      >
                        {note.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold text-[#09263A]">
                            {note.author}
                          </p>
                          <span className="text-[10px] text-[#687B78]">
                            {note.time}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-[#687B78]">
                          {note.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#DDEAE6] p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a note..."
                      className="
                        flex-1
                        rounded-lg
                        border
                        border-[#DDEAE6]
                        bg-[#F5FCF9]
                        px-3
                        py-2
                        text-xs
                        text-[#09263A]
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-[#687B78]
                        focus:border-[#087F5B]
                        focus:bg-white
                        focus:ring-2
                        focus:ring-[#087F5B]/10
                      "
                    />
                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-[#087F5B]
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#005E45]
                      "
                    >
                      <Send className="h-3 w-3" strokeWidth={2.6} />
                      <span>Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              VAT BOXES
          ================================================ */}
          {activeTab === "boxes" && (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    VAT Return Figures
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    All 9 HMRC boxes for the MTD VAT Return
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F3F5] px-2.5 py-1 text-[10px] font-bold text-[#687B78]">
                  <Info className="h-3 w-3" strokeWidth={2.4} />
                  Values are editable
                </div>
              </div>

              {/* Boxes */}
              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
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
                        ${item.isTotal ? "bg-[#E8F8F2]/40" : ""}
                        ${item.highlight ? "bg-[#E8F8F2]" : ""}
                      `}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`
                            flex
                            h-7
                            w-7
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

                      {item.editable ? (
                        <input
                          type="text"
                          defaultValue={item.value}
                          className="
                            w-[130px]
                            rounded-lg
                            border
                            border-[#DDEAE6]
                            bg-white
                            px-3
                            py-1.5
                            text-right
                            font-mono
                            text-xs
                            font-bold
                            text-[#09263A]
                            outline-none
                            transition-all
                            duration-200
                            focus:border-[#087F5B]
                            focus:ring-2
                            focus:ring-[#087F5B]/10
                          "
                        />
                      ) : (
                        <span
                          className={`
                            shrink-0
                            font-mono
                            text-xs
                            font-bold
                            ${
                              item.highlight
                                ? "text-[#087F5B]"
                                : "text-[#09263A]"
                            }
                          `}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info banner */}
              <div className="flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#E8F8F2]/50 p-4">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]"
                  strokeWidth={2.2}
                />
                <p className="text-[11px] leading-6 text-[#687B78]">
                  Boxes 3 and 5 are calculated automatically. Only enter values
                  for the other boxes. All amounts should be in GBP and rounded
                  to the nearest penny.
                </p>
              </div>
            </div>
          )}

          {/* ================================================
              ATTACHMENTS
          ================================================ */}
          {activeTab === "attachments" && (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Attachments
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    {attachments.length} files associated with this filing
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#005E45]">
                  <Upload className="h-3.5 w-3.5" strokeWidth={2.6} />
                  Upload
                </button>
              </div>

              {/* Dropzone */}
              <div className="
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                border-[#DDEAE6]
                bg-[#F5FCF9]
                px-5
                py-8
                text-center
              ">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F8F2] text-[#087F5B]">
                  <Upload className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <p className="mt-3 text-xs font-bold text-[#09263A]">
                  Drag and drop files here
                </p>
                <p className="mt-1 text-[11px] text-[#687B78]">
                  or{" "}
                  <button className="font-semibold text-[#087F5B] underline-offset-2 hover:underline">
                    browse
                  </button>
                </p>
                <p className="mt-2 text-[10px] text-[#687B78]">
                  PDF, Excel, CSV, ZIP up to 25 MB
                </p>
              </div>

              {/* File list */}
              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="divide-y divide-[#DDEAE6]">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-[#F5FCF9]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                          <FileText
                            className="h-4 w-4 text-[#087F5B]"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-[#09263A]">
                            {file.name}
                          </p>
                          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[10px] text-[#687B78]">
                            <span>{file.size}</span>
                            <span>·</span>
                            <span>Uploaded by {file.uploadedBy}</span>
                            <span>·</span>
                            <span>{file.uploadedAt}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <Eye className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              TIMELINE
          ================================================ */}
          {activeTab === "timeline" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#09263A]">
                  Filing Timeline
                </h3>
                <p className="mt-0.5 text-xs text-[#687B78]">
                  Complete history of this filing
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-[#DDEAE6]" />

                <div className="space-y-4">
                  {timeline.map((event) => {
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className="relative flex gap-4">
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
                            ${event.iconBg}
                          `}
                          style={{ zIndex: 1 }}
                        >
                          <Icon
                            className={`h-4 w-4 ${event.iconColor}`}
                            strokeWidth={2.4}
                          />
                        </div>

                        <div className="min-w-0 flex-1 pb-2">
                          <div className="rounded-xl border border-[#DDEAE6] bg-white p-3.5">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-[#09263A]">
                                  {event.title}
                                </p>
                                <p className="mt-0.5 text-[11px] text-[#687B78]">
                                  {event.description}
                                </p>
                              </div>
                              <span className="shrink-0 text-[10px] font-semibold text-[#687B78]">
                                {event.time}
                              </span>
                            </div>
                            {event.actor && (
                              <p className="mt-2 text-[10px] text-[#687B78]">
                                by{" "}
                                <span className="font-semibold">
                                  {event.actor}
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
   INFO CARD (Reusable)
============================================================ */

const InfoCard = ({ icon: Icon, iconBg, iconColor, label, value }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#DDEAE6] bg-white p-4">
      <div
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${iconBg}
        `}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-xs font-bold text-[#09263A]">
          {value}
        </p>
      </div>
    </div>
  );
};

export default AccountantFilingsDetails;