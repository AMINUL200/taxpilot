import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit3,
  MoreVertical,
  Plus,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Users,
  Hash,
  Briefcase,
  TrendingUp,
  Activity,
  FolderOpen,
  Send,
  Download,
  UserPlus,
  Archive,
  Star,
  Shield,
  Key,
  Eye,
  MessageSquare,
  Receipt,
  CreditCard,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  X,
} from "lucide-react";

const AccountantClientsDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("overview");
  const [openMenu, setOpenMenu] = useState(false);

  /* ============================================================
     DEMO DATA — keyed by clientId (replace with API later)
  ============================================================ */

  const client = {
    id: clientId || 1,
    clientName: "Imperial Thermal Ltd",
    contactPerson: "James Mitchell",
    jobTitle: "Managing Director",
    email: "james@imperialthermal.co.uk",
    phone: "+44 20 7946 0123",
    website: "https://imperialthermal.co.uk",
    companyNumber: "14803890",
    type: "Limited Company",
    status: "Active",
    vatNumber: "GB449519458",
    utrNumber: "1234567890",
    incorporatedOn: "7 September 2022",
    joinedDate: "12 March 2024",
    initials: "IM",
    avatarColor: "bg-[#087F5B]",
    registeredAddress: {
      line1: "25 King Street",
      line2: "London",
      postcode: "EC2V 8AU",
      country: "United Kingdom",
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
      id: "companies",
      label: "Companies",
      value: 3,
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "open-filings",
      label: "Open Filings",
      value: 2,
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
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
      id: "tasks",
      label: "Open Tasks",
      value: 4,
      icon: CheckCircle2,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  /* ============================================================
     LINKED COMPANIES
  ============================================================ */

  const companies = [
    {
      id: 1,
      name: "Imperial Thermal Ltd",
      number: "14803890",
      type: "Private limited Company",
      status: "Active",
      nextFiling: "VAT Return",
      nextFilingDate: "30 Sep 2026",
      daysLeft: -2,
      urgency: "overdue",
    },
    {
      id: 2,
      name: "Imperial Holdings Ltd",
      number: "14803912",
      type: "Private limited Company",
      status: "Active",
      nextFiling: "Annual Accounts",
      nextFilingDate: "15 Dec 2026",
      daysLeft: 84,
      urgency: "low",
    },
    {
      id: 3,
      name: "Imperial Properties Ltd",
      number: "14803945",
      type: "Private limited Company",
      status: "Active",
      nextFiling: "Corporation Tax",
      nextFilingDate: "05 Nov 2026",
      daysLeft: 44,
      urgency: "medium",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "VAT return submitted",
      description: "Q2 2026 · Imperial Thermal Ltd",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      actor: "Alice J.",
    },
    {
      id: 2,
      title: "Documents uploaded",
      description: "4 files uploaded by client",
      time: "5 hours ago",
      icon: FolderOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      actor: "James M.",
    },
    {
      id: 3,
      title: "Email sent",
      description: "Reminder for Q3 VAT return",
      time: "1 day ago",
      icon: Send,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      actor: "Alice J.",
    },
    {
      id: 4,
      title: "Note added",
      description: "Waiting on bank statements",
      time: "2 days ago",
      icon: MessageSquare,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      actor: "John S.",
    },
    {
      id: 5,
      title: "Company added",
      description: "Imperial Properties Ltd linked",
      time: "5 days ago",
      icon: Building2,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      actor: "Alice J.",
    },
  ];

  /* ============================================================
     TASKS
  ============================================================ */

  const tasks = [
    {
      id: 1,
      title: "Review Q3 VAT return",
      status: "In Progress",
      dueDate: "01 Oct 2026",
      assignee: "Alice J.",
      priority: "high",
    },
    {
      id: 2,
      title: "Confirm year-end accounts",
      status: "Awaiting Client",
      dueDate: "15 Oct 2026",
      assignee: "John S.",
      priority: "medium",
    },
    {
      id: 3,
      title: "Chase outstanding invoices",
      status: "Pending",
      dueDate: "20 Oct 2026",
      assignee: "Alice J.",
      priority: "low",
    },
    {
      id: 4,
      title: "Update VAT registration details",
      status: "In Progress",
      dueDate: "05 Nov 2026",
      assignee: "Sarah M.",
      priority: "medium",
    },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "companies", label: "Companies", icon: Briefcase, count: companies.length },
    { id: "tasks", label: "Tasks", icon: CheckCircle2, count: tasks.length },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  /* ============================================================
     HELPERS
  ============================================================ */

  const getUrgencyStyles = (urgency) => {
    switch (urgency) {
      case "overdue":
        return {
          bg: "bg-rose-50",
          text: "text-rose-700",
          dot: "bg-rose-500",
          badge: "bg-rose-100 text-rose-700",
        };
      case "high":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          dot: "bg-amber-500",
          badge: "bg-amber-100 text-amber-700",
        };
      case "medium":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          dot: "bg-blue-500",
          badge: "bg-blue-100 text-blue-700",
        };
      default:
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          badge: "bg-emerald-100 text-emerald-700",
        };
    }
  };

  const getDaysLabel = (days) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
        };
      case "In Progress":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          dot: "bg-blue-500",
        };
      case "Awaiting Client":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          dot: "bg-amber-500",
        };
      case "Pending":
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          dot: "bg-gray-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: "bg-gray-400",
        };
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-emerald-100 text-emerald-700";
    }
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
        onClick={() => navigate("/accountant/clients")}
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
        <span>Back to Clients</span>
      </button>

      {/* ======================================================
          CLIENT HERO CARD
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8F8F2] opacity-50 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          {/* Top row */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Avatar + identity */}
            <div className="flex items-start gap-4">
              <div
                className={`
                  flex
                  h-16
                  w-16
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  text-xl
                  font-bold
                  text-white
                  ${client.avatarColor}
                  shadow-sm
                `}
              >
                {client.initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-[#09263A] sm:text-2xl">
                    {client.clientName}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {client.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[10px] font-bold text-[#687B78]">
                    {client.type}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#687B78]">
                  <span className="flex items-center gap-1.5 font-mono font-semibold">
                    <Hash className="h-3.5 w-3.5" />
                    {client.companyNumber}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserPlus className="h-3.5 w-3.5" />
                    {client.contactPerson}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Client since {client.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/accountant/clients/${client.id}/edit`}
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

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#087F5B]
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#087F5B]
                  transition-all
                  duration-200
                  hover:bg-[#087F5B]
                  hover:text-white
                "
              >
                <Send className="h-3.5 w-3.5" strokeWidth={2.4} />
                <span>Send Message</span>
              </button>

              <Link
                to="/accountant/filings/new"
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
                      <Receipt className="h-3.5 w-3.5" />
                      <span>View invoices</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Permissions</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Key className="h-3.5 w-3.5" />
                      <span>Reset access</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export data</span>
                    </button>
                    <div className="my-1 border-t border-[#DDEAE6]" />
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                      <Archive className="h-3.5 w-3.5" />
                      <span>Archive client</span>
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
              {/* Contact + Company details grid */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Contact Information */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Mail
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Contact Information
                    </h3>
                  </div>

                  <div className="divide-y divide-[#DDEAE6]">
                    <InfoRow
                      icon={UserPlus}
                      label="Contact Person"
                      value={client.contactPerson}
                      hint={client.jobTitle}
                    />
                    <InfoRow
                      icon={Mail}
                      label="Email"
                      value={client.email}
                      action="mailto"
                      href={`mailto:${client.email}`}
                    />
                    <InfoRow
                      icon={Phone}
                      label="Phone"
                      value={client.phone}
                      action="phone"
                      href={`tel:${client.phone}`}
                    />
                    <InfoRow
                      icon={Globe}
                      label="Website"
                      value={client.website}
                      action="external"
                      href={client.website}
                    />
                  </div>
                </div>

                {/* Company Details */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Building2
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Company Details
                    </h3>
                  </div>

                  <div className="divide-y divide-[#DDEAE6]">
                    <InfoRow
                      icon={Hash}
                      label="Company Number"
                      value={client.companyNumber}
                      isMono
                    />
                    <InfoRow
                      icon={Receipt}
                      label="VAT Number"
                      value={client.vatNumber}
                      isMono
                    />
                    <InfoRow
                      icon={CreditCard}
                      label="UTR Number"
                      value={client.utrNumber}
                      isMono
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Incorporated On"
                      value={client.incorporatedOn}
                    />
                  </div>
                </div>
              </div>

              {/* Registered Address + Accountant */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Address */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <MapPin
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Registered Address
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-4">
                      <p className="text-sm font-bold text-[#09263A]">
                        {client.registeredAddress.line1}
                      </p>
                      <p className="mt-1 text-xs text-[#09263A]">
                        {client.registeredAddress.line2}
                      </p>
                      <p className="mt-1 font-mono text-xs text-[#09263A]">
                        {client.registeredAddress.postcode}
                      </p>
                      <p className="mt-1 text-xs text-[#687B78]">
                        {client.registeredAddress.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accountant */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Users
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Assigned Accountant
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-4 rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#087F5B] text-sm font-bold text-white">
                        {client.accountant.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#09263A]">
                          {client.accountant.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                          {client.accountant.role}
                        </p>
                        <a
                          href={`mailto:${client.accountant.email}`}
                          className="mt-1 inline-flex items-center gap-1 truncate text-[11px] font-semibold text-[#087F5B] hover:text-[#005E45]"
                        >
                          {client.accountant.email}
                        </a>
                      </div>
                    </div>

                    <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2 text-xs font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]">
                      <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
                      <span>Reassign</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              COMPANIES
          ================================================ */}
          {activeTab === "companies" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Linked Companies
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    {companies.length} companies registered under this client
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#005E45]">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                  Link Company
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Company
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Type
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Next Filing
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
                      {companies.map((company) => {
                        const urgency = getUrgencyStyles(company.urgency);
                        return (
                          <tr
                            key={company.id}
                            className="transition-colors hover:bg-[#F5FCF9]"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                                  <Building2
                                    className="h-4 w-4 text-[#087F5B]"
                                    strokeWidth={2.2}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-bold text-[#09263A]">
                                    {company.name}
                                  </p>
                                  <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                                    #{company.number}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-xs text-[#687B78]">
                                {company.type}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div>
                                <p className="text-xs font-semibold text-[#09263A]">
                                  {company.nextFiling}
                                </p>
                                <p
                                  className={`mt-0.5 text-[10px] font-bold ${urgency.text}`}
                                >
                                  {company.nextFilingDate} ·{" "}
                                  {getDaysLabel(company.daysLeft)}
                                </p>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                {company.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <Link
                                to={`/accountant/companies/${company.id}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-[#DDEAE6] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                              >
                                <Eye className="h-3 w-3" strokeWidth={2.4} />
                                <span>View</span>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              TASKS
          ================================================ */}
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Open Tasks
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    {tasks.length} tasks associated with this client
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#005E45]">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                  New Task
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => {
                  const statusStyles = getStatusStyles(task.status);
                  return (
                    <div
                      key={task.id}
                      className="flex flex-col gap-3 rounded-xl border border-[#DDEAE6] bg-white p-4 transition-all duration-200 hover:border-[#087F5B]/30 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
                          <CheckCircle2
                            className="h-4 w-4 text-[#087F5B]"
                            strokeWidth={2.2}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-bold text-[#09263A]">
                              {task.title}
                            </p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getPriorityStyles(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#687B78]">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {task.dueDate}
                            </span>
                            <span className="hidden sm:inline">·</span>
                            <span>Assignee: {task.assignee}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles.bg} ${statusStyles.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
                          />
                          {task.status}
                        </span>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                          <ChevronRight
                            className="h-4 w-4"
                            strokeWidth={2.4}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                  Latest actions and updates from this client
                </p>
              </div>

              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-[#DDEAE6]" />

                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="relative flex gap-4">
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
                                by <span className="font-semibold">{activity.actor}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 text-center">
                <button className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2 text-xs font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:text-[#087F5B]">
                  <Activity className="h-3.5 w-3.5" strokeWidth={2.4} />
                  <span>View all activity</span>
                </button>
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

const InfoRow = ({ icon: Icon, label, value, hint, isMono, action, href }) => {
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
          {hint && (
            <p className="mt-0.5 truncate text-[10px] text-[#687B78]">
              {hint}
            </p>
          )}
        </div>
      </div>

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

export default AccountantClientsDetails;