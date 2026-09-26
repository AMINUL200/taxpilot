import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  MoreVertical,
  Plus,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Building2,
  Briefcase,
  TrendingUp,
  Activity,
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
  Crown,
  UserCheck,
  User,
  Target,
  BarChart3,
  Award,
  Zap,
  Layers,
  Globe,
  Trash2,
  Settings,
  Link2,
} from "lucide-react";

const AccountantTeamDetails = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("overview");
  const [openMenu, setOpenMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  /* ============================================================
     DEMO DATA — keyed by memberId (replace with API later)
  ============================================================ */

  const member = {
    id: memberId || 1,
    name: "Alice Johnson",
    email: "alice@taxpilot.co.uk",
    phone: "+44 20 7946 0958",
    role: "Owner",
    title: "Senior Accountant",
    status: "Active",
    initials: "AJ",
    avatarColor: "bg-[#087F5B]",
    joinedDate: "15 January 2023",
    lastActive: "Today, 09:24",
    location: "London, UK",
    timezone: "Europe/London",
    bio: "Senior accountant with 10+ years of experience in UK tax compliance. Specialises in VAT returns, Corporation Tax and advisory services for growing businesses.",
    specialities: ["VAT", "CT600", "Advisory", "Payroll"],
    manager: {
      name: "Self",
      role: "Owner",
    },
  };

  /* ============================================================
     STATS
  ============================================================ */

  const stats = [
    {
      id: "clients",
      label: "Clients",
      value: 18,
      change: "+2 this month",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "tasks",
      label: "Active Tasks",
      value: 14,
      change: "3 due soon",
      icon: FileText,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: "completed",
      label: "Completed",
      value: 22,
      change: "This month",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "overdue",
      label: "Overdue",
      value: 1,
      change: "Requires attention",
      icon: AlertCircle,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
    },
  ];

  /* ============================================================
     ASSIGNED CLIENTS
  ============================================================ */

  const assignedClients = [
    {
      id: 1,
      name: "Imperial Thermal Ltd",
      companyNumber: "14803890",
      vrn: "GB449519458",
      type: "Limited Company",
      activeTasks: 3,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Green Tech Ltd",
      companyNumber: "07895432",
      vrn: "GB123456789",
      type: "Limited Company",
      activeTasks: 2,
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      name: "Skil Four Ltd",
      companyNumber: "05513948",
      vrn: "",
      type: "Limited Company",
      activeTasks: 4,
      lastActivity: "5 hours ago",
    },
    {
      id: 4,
      name: "Digital Solutions Ltd",
      companyNumber: "99887766",
      vrn: "GB887766554",
      type: "Limited Company",
      activeTasks: 3,
      lastActivity: "Yesterday",
    },
    {
      id: 5,
      name: "Bright Ideas Ltd",
      companyNumber: "11223344",
      vrn: "GB112233445",
      type: "Limited Company",
      activeTasks: 2,
      lastActivity: "3 hours ago",
    },
  ];

  /* ============================================================
     RECENT ACTIVITY
  ============================================================ */

  const recentActivity = [
    {
      id: 1,
      title: "Filed VAT Return for Imperial Thermal Ltd",
      description: "Q3 2026 · HMRC accepted",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: 2,
      title: "Created task: Prepare CT600 draft",
      description: "Digital Solutions Ltd · Due 5 Oct",
      time: "5 hours ago",
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Sent reminder to Skil Four Ltd",
      description: "Missing bank statements",
      time: "Yesterday",
      icon: Send,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Added new client",
      description: "Bright Ideas Ltd",
      time: "3 days ago",
      icon: UserPlus,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      id: 5,
      title: "Updated profile information",
      description: "Changed phone number and bio",
      time: "1 week ago",
      icon: Edit3,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  ];

  /* ============================================================
     PERFORMANCE DATA
  ============================================================ */

  const performanceData = [
    { month: "Apr", filings: 18, tasks: 24 },
    { month: "May", filings: 22, tasks: 28 },
    { month: "Jun", filings: 25, tasks: 30 },
    { month: "Jul", filings: 20, tasks: 26 },
    { month: "Aug", filings: 24, tasks: 32 },
    { month: "Sep", filings: 22, tasks: 30 },
  ];

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "clients", label: "Clients", icon: Users, count: assignedClients.length },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "performance", label: "Performance", icon: BarChart3 },
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

  const getRoleStyles = (role) => {
    switch (role) {
      case "Owner":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: Crown,
        };
      case "Admin":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: Shield,
        };
      case "Accountant":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          icon: UserCheck,
        };
      default:
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          icon: User,
        };
    }
  };

  const roleStyles = getRoleStyles(member.role);
  const RoleIcon = roleStyles.icon;

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
        onClick={() => navigate("/accountant/team")}
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
        <span>Back to Team</span>
      </button>

      {/* ======================================================
          MEMBER HERO CARD
      ====================================================== */}
      <div className="relative overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E8F8F2] opacity-50 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          {/* Top row */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
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
                  ${member.avatarColor}
                  shadow-sm
                `}
              >
                {member.initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-[#09263A] sm:text-2xl">
                    {member.name}
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
                      ${roleStyles.bg}
                      ${roleStyles.text}
                    `}
                  >
                    <RoleIcon className="h-3 w-3" strokeWidth={2.4} />
                    {member.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {member.status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-[#687B78]">{member.title}</p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#687B78]">
                  <button
                    type="button"
                    onClick={() => handleCopy(member.email)}
                    className="flex items-center gap-1.5 font-semibold transition-colors hover:text-[#087F5B]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {member.email}
                    {copied ? (
                      <Check
                        className="h-3 w-3 text-emerald-500"
                        strokeWidth={3}
                      />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {member.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {member.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/accountant/team/${member.id}/edit`}
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
                <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                <span>Assign Task</span>
              </button>

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
                      <Key className="h-3.5 w-3.5" />
                      <span>Reset password</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Change permissions</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Download className="h-3.5 w-3.5" />
                      <span>Export data</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#09263A] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>View activity log</span>
                    </button>
                    <div className="my-1 border-t border-[#DDEAE6]" />
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 transition-colors hover:bg-rose-50">
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove member</span>
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
                    <p className="text-[10px] text-[#687B78]">{stat.change}</p>
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
              {/* Bio */}
              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <User
                      className="h-4 w-4 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    About {member.name.split(" ")[0]}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-xs leading-6 text-[#687B78]">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Contact + Work info */}
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
                      icon={Mail}
                      label="Email"
                      value={member.email}
                      action="mailto"
                      href={`mailto:${member.email}`}
                    />
                    <InfoRow
                      icon={Phone}
                      label="Phone"
                      value={member.phone}
                      action="phone"
                      href={`tel:${member.phone}`}
                    />
                    <InfoRow
                      icon={MapPin}
                      label="Location"
                      value={member.location}
                    />
                    <InfoRow
                      icon={Globe}
                      label="Timezone"
                      value={member.timezone}
                    />
                  </div>
                </div>

                {/* Work Information */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Briefcase
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Work Information
                    </h3>
                  </div>

                  <div className="divide-y divide-[#DDEAE6]">
                    <InfoRow
                      icon={Briefcase}
                      label="Job Title"
                      value={member.title}
                    />
                    <InfoRow
                      icon={RoleIcon}
                      label="Role"
                      value={member.role}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Joined"
                      value={member.joinedDate}
                    />
                    <InfoRow
                      icon={Clock3}
                      label="Last Active"
                      value={member.lastActive}
                    />
                  </div>
                </div>
              </div>

              {/* Specialities + Manager */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {/* Specialities */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <Award
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Specialities
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      {member.specialities.map((spec) => (
                        <span
                          key={spec}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8F2] px-3 py-1.5 text-xs font-bold text-[#087F5B]"
                        >
                          <Star className="h-3 w-3 fill-current" strokeWidth={2.4} />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Manager */}
                <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                      <UserCheck
                        className="h-4 w-4 text-[#087F5B]"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-[#09263A]">
                      Reporting To
                    </h3>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-4 rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                        {member.manager.name === "Self" ? "★" : "MR"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#09263A]">
                          {member.manager.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                          {member.manager.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================
              CLIENTS
          ================================================ */}
          {activeTab === "clients" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Assigned Clients
                  </h3>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    {assignedClients.length} clients currently managed by{" "}
                    {member.name}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 self-start rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#005E45]">
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                  Assign Client
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#DDEAE6] bg-[#F5FCF9]">
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Client
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          VRN
                        </th>
                        <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Active Tasks
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Last Activity
                        </th>
                        <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDEAE6]">
                      {assignedClients.map((client) => (
                        <tr
                          key={client.id}
                          className="group transition-colors hover:bg-[#F5FCF9]"
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
                                <p className="truncate text-sm font-bold text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                                  {client.name}
                                </p>
                                <p className="mt-0.5 font-mono text-[10px] text-[#687B78]">
                                  #{client.companyNumber}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs text-[#687B78]">
                              {client.vrn || "—"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className="inline-flex items-center rounded-full bg-[#F5FCF9] px-2.5 py-1 text-[11px] font-bold text-[#09263A]">
                              {client.activeTasks}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs text-[#687B78]">
                              {client.lastActivity}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Link
                              to={`/accountant/clients/${client.id}`}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#DDEAE6] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#09263A] transition-all duration-200 hover:border-[#087F5B] hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                            >
                              <Eye className="h-3 w-3" strokeWidth={2.4} />
                              <span>View</span>
                            </Link>
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
              ACTIVITY
          ================================================ */}
          {activeTab === "activity" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#09263A]">
                  Recent Activity
                </h3>
                <p className="mt-0.5 text-xs text-[#687B78]">
                  Latest actions and updates from {member.name}
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-[#DDEAE6]" />

                <div className="space-y-4">
                  {recentActivity.map((activity) => {
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

          {/* ================================================
              PERFORMANCE
          ================================================ */}
          {activeTab === "performance" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#09263A]">
                  Performance Overview
                </h3>
                <p className="mt-0.5 text-xs text-[#687B78]">
                  Filings and tasks completed over the last 6 months
                </p>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Total Filings",
                    value: 131,
                    change: "+12%",
                    icon: FileText,
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                  },
                  {
                    label: "Tasks Completed",
                    value: 170,
                    change: "+18%",
                    icon: CheckCircle2,
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                  },
                  {
                    label: "Avg. Response Time",
                    value: "4.2h",
                    change: "-15%",
                    icon: Clock3,
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                  },
                ].map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={metric.label}
                      className="flex items-center gap-3 rounded-xl border border-[#DDEAE6] bg-white p-4"
                    >
                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${metric.iconBg}
                        `}
                      >
                        <Icon
                          className={`h-4 w-4 ${metric.iconColor}`}
                          strokeWidth={2.2}
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                          {metric.label}
                        </p>
                        <div className="mt-0.5 flex items-baseline gap-2">
                          <p className="text-xl font-bold text-[#09263A]">
                            {metric.value}
                          </p>
                          <span className="text-[10px] font-bold text-emerald-600">
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart */}
              <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
                <div className="flex items-center gap-2 border-b border-[#DDEAE6] px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F2]">
                    <BarChart3
                      className="h-4 w-4 text-[#087F5B]"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Monthly Performance
                  </h3>
                </div>

                <div className="p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#087F5B]" />
                      <span className="text-[10px] font-semibold text-[#687B78]">
                        Filings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#5ACBA8]" />
                      <span className="text-[10px] font-semibold text-[#687B78]">
                        Tasks
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {performanceData.map((data) => {
                      const maxValue = Math.max(
                        ...performanceData.flatMap((d) => [d.filings, d.tasks])
                      );
                      const filingsPercent = (data.filings / maxValue) * 100;
                      const tasksPercent = (data.tasks / maxValue) * 100;

                      return (
                        <div key={data.month} className="flex items-center gap-4">
                          <span className="w-8 shrink-0 text-xs font-bold text-[#09263A]">
                            {data.month}
                          </span>

                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 overflow-hidden rounded-full bg-[#F1F3F5]">
                                <div
                                  className="h-full rounded-full bg-[#087F5B] transition-all duration-500"
                                  style={{ width: `${filingsPercent}%` }}
                                />
                              </div>
                              <span className="w-8 text-right text-[10px] font-bold text-[#09263A]">
                                {data.filings}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 overflow-hidden rounded-full bg-[#F1F3F5]">
                                <div
                                  className="h-full rounded-full bg-[#5ACBA8] transition-all duration-500"
                                  style={{ width: `${tasksPercent}%` }}
                                />
                              </div>
                              <span className="w-8 text-right text-[10px] font-bold text-[#09263A]">
                                {data.tasks}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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

const InfoRow = ({ icon: Icon, label, value, action, href, isMono }) => {
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

export default AccountantTeamDetails;