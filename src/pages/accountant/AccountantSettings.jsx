import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Users,
  Key,
  Palette,
  Globe,
  ChevronRight,
  Save,
  Upload,
  Check,
  AlertCircle,
  Trash2,
  Plus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Download,
  RefreshCw,
  FileText,
  Clock3,
  Calendar,
  Star,
  Zap,
  Info,
  ExternalLink,
  LogOut,
  CheckCircle2,
  Crown,
  UserCog,
  Building,
  Settings2,
  Send,
  X,
  Edit3,
  MoreVertical,
  Search,
  Webhook,
} from "lucide-react";

const AccountantSettings = () => {
  /* ============================================================
     STATE
  ============================================================ */

  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  /* ============================================================
     TABS
  ============================================================ */

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "practice", label: "Practice", icon: Building2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "team", label: "Team", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "api", label: "API Access", icon: Key },
  ];

  /* ============================================================
     FORM STATE
  ============================================================ */

  const [formData, setFormData] = useState({
    // Profile
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@taxpilot.co.uk",
    phone: "+44 20 7946 0958",
    jobTitle: "Senior Accountant",
    bio: "Senior accountant with 10+ years of experience in UK tax compliance.",
    avatarColor: "bg-[#087F5B]",

    // Practice
    practiceName: "TaxPilot Accountants Ltd",
    practiceSize: "6-20",
    practiceType: "Accountancy Firm",
    registeredAddress: "25 King Street, London, EC2V 8AU, United Kingdom",
    vatNumber: "GB123456789",
    companyNumber: "12345678",

    // Notifications
    emailDeadlines: true,
    emailFilings: true,
    emailClientUpdates: true,
    emailMarketing: false,
    smsUrgent: true,
    pushNotifications: true,

    // Security
    twoFactorAuth: true,
    sessionTimeout: "30",
    ipWhitelist: false,

    // Preferences
    timezone: "Europe/London",
    dateFormat: "DD/MM/YYYY",
    currency: "GBP",
    language: "English",
  });

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSavedMessage("");

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSaving(false);
    setSavedMessage("Settings saved successfully");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSavedMessage("Copied to clipboard");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  /* ============================================================
     REUSABLE COMPONENTS
  ============================================================ */

  const InputField = ({
    label,
    field,
    type = "text",
    placeholder,
    required,
    hint,
    icon: Icon,
  }) => (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#687B78]"
            strokeWidth={2.2}
          />
        )}
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className={`
            w-full
            rounded-lg
            border
            border-[#DDEAE6]
            bg-white
            py-2.5
            pr-4
            ${Icon ? "pl-10" : "pl-4"}
            text-sm
            text-[#09263A]
            outline-none
            transition-all
            duration-200
            placeholder:text-[#687B78]
            focus:border-[#087F5B]
            focus:ring-2
            focus:ring-[#087F5B]/10
          `}
        />
      </div>
      {hint && (
        <p className="mt-1.5 text-[11px] text-[#687B78]">{hint}</p>
      )}
    </div>
  );

  const SelectField = ({ label, field, options, hint }) => (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
        {label}
      </label>
      <div className="relative">
        <select
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className="
            w-full
            cursor-pointer
            appearance-none
            rounded-lg
            border
            border-[#DDEAE6]
            bg-white
            px-4
            py-2.5
            pr-10
            text-sm
            font-medium
            text-[#09263A]
            outline-none
            transition-all
            duration-200
            focus:border-[#087F5B]
            focus:ring-2
            focus:ring-[#087F5B]/10
          "
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronRight
          className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-[#687B78]"
          strokeWidth={2.4}
        />
      </div>
      {hint && (
        <p className="mt-1.5 text-[11px] text-[#687B78]">{hint}</p>
      )}
    </div>
  );

  const Toggle = ({ label, description, field }) => (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#09263A]">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-5 text-[#687B78]">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleToggle(field)}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition-colors
          duration-200
          ${formData[field] ? "bg-[#087F5B]" : "bg-[#DDEAE6]"}
        `}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`
            absolute
            top-0.5
            h-5
            w-5
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            duration-200
            ${formData[field] ? "translate-x-[22px]" : "translate-x-0.5"}
          `}
        />
      </button>
    </div>
  );

  const SectionCard = ({ title, description, icon: Icon, children }) => (
    <div className="overflow-hidden rounded-xl border border-[#DDEAE6] bg-white">
      {title && (
        <div className="flex items-start gap-3 border-b border-[#DDEAE6] px-5 py-4">
          {Icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F8F2]">
              <Icon className="h-4 w-4 text-[#087F5B]" strokeWidth={2.2} />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#09263A]">{title}</h3>
            {description && (
              <p className="mt-0.5 text-[11px] text-[#687B78]">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );

  /* ============================================================
     TAB CONTENT RENDERERS
  ============================================================ */

  const renderProfileTab = () => (
    <div className="space-y-5">
      {/* Avatar + Basic Info */}
      <SectionCard title="Profile photo" icon={User}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative">
            <div
              className={`
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                text-2xl
                font-bold
                text-white
                ${formData.avatarColor}
              `}
            >
              {formData.firstName[0]}
              {formData.lastName[0]}
            </div>
            <button
              type="button"
              className="
                absolute
                -bottom-1
                -right-1
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-[#087F5B]
                text-white
                shadow-md
                transition-all
                hover:bg-[#005E45]
              "
              aria-label="Change avatar"
            >
              <Upload className="h-3.5 w-3.5" strokeWidth={2.6} />
            </button>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-[#09263A]">
              Profile picture
            </p>
            <p className="mt-0.5 text-xs text-[#687B78]">
              Upload a JPG or PNG, max 2 MB. Recommended 200x200px.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-[#005E45]">
                <Upload className="h-3.5 w-3.5" strokeWidth={2.6} />
                Upload new
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-3.5 py-2 text-xs font-semibold text-[#09263A] transition-all hover:border-rose-300 hover:text-rose-600">
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                Remove
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Personal Information */}
      <SectionCard
        title="Personal information"
        description="Your personal details and contact information"
        icon={User}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InputField
            label="First name"
            field="firstName"
            placeholder="e.g. Alice"
            required
          />
          <InputField
            label="Last name"
            field="lastName"
            placeholder="e.g. Johnson"
            required
          />
          <InputField
            label="Email address"
            field="email"
            type="email"
            placeholder="alice@taxpilot.co.uk"
            icon={Mail}
            required
          />
          <InputField
            label="Phone number"
            field="phone"
            type="tel"
            placeholder="+44 20 7946 0958"
            icon={Phone}
          />
          <InputField
            label="Job title"
            field="jobTitle"
            placeholder="e.g. Senior Accountant"
            icon={Briefcase}
          />
          <SelectField
            label="Timezone"
            field="timezone"
            options={[
              { value: "Europe/London", label: "London (GMT/BST)" },
              { value: "Europe/Paris", label: "Paris (CET)" },
              { value: "America/New_York", label: "New York (EST)" },
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={3}
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-[#DDEAE6]
              bg-white
              px-4
              py-2.5
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
      </SectionCard>
    </div>
  );

  const renderPracticeTab = () => (
    <div className="space-y-5">
      <SectionCard
        title="Practice details"
        description="Information about your accountancy practice"
        icon={Building2}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InputField
            label="Practice name"
            field="practiceName"
            placeholder="e.g. TaxPilot Accountants Ltd"
            icon={Building}
            required
          />
          <SelectField
            label="Practice type"
            field="practiceType"
            options={[
              { value: "Accountancy Firm", label: "Accountancy Firm" },
              { value: "Sole Practitioner", label: "Sole Practitioner" },
              { value: "Bookkeeping", label: "Bookkeeping" },
              { value: "Tax Advisor", label: "Tax Advisor" },
            ]}
          />
          <SelectField
            label="Practice size"
            field="practiceSize"
            options={[
              { value: "1-5", label: "1-5 employees" },
              { value: "6-20", label: "6-20 employees" },
              { value: "21-50", label: "21-50 employees" },
              { value: "50+", label: "50+ employees" },
            ]}
          />
          <InputField
            label="Company number"
            field="companyNumber"
            placeholder="12345678"
          />
          <InputField
            label="VAT number"
            field="vatNumber"
            placeholder="GB123456789"
          />
          <SelectField
            label="Preferred currency"
            field="currency"
            options={[
              { value: "GBP", label: "GBP (£)" },
              { value: "EUR", label: "EUR (€)" },
              { value: "USD", label: "USD ($)" },
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
            Registered address
          </label>
          <textarea
            value={formData.registeredAddress}
            onChange={(e) => handleChange("registeredAddress", e.target.value)}
            rows={2}
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-[#DDEAE6]
              bg-white
              px-4
              py-2.5
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
      </SectionCard>

      <SectionCard
        title="Regional preferences"
        description="Date formats, language and locale settings"
        icon={Globe}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SelectField
            label="Date format"
            field="dateFormat"
            options={[
              { value: "DD/MM/YYYY", label: "DD/MM/YYYY (31/12/2026)" },
              { value: "MM/DD/YYYY", label: "MM/DD/YYYY (12/31/2026)" },
              { value: "YYYY-MM-DD", label: "YYYY-MM-DD (2026-12-31)" },
            ]}
          />
          <SelectField
            label="Language"
            field="language"
            options={[
              { value: "English", label: "English" },
              { value: "Welsh", label: "Welsh" },
              { value: "Scottish Gaelic", label: "Scottish Gaelic" },
            ]}
          />
        </div>
      </SectionCard>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-5">
      <SectionCard
        title="Email notifications"
        description="Choose which emails you want to receive"
        icon={Mail}
      >
        <div className="divide-y divide-[#DDEAE6]">
          <Toggle
            label="Deadline reminders"
            description="Get notified before client filing deadlines"
            field="emailDeadlines"
          />
          <Toggle
            label="Filing updates"
            description="Notifications when filings are submitted or accepted"
            field="emailFilings"
          />
          <Toggle
            label="Client updates"
            description="When clients upload documents or respond"
            field="emailClientUpdates"
          />
          <Toggle
            label="Marketing emails"
            description="Product updates, tips and offers"
            field="emailMarketing"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="SMS & push notifications"
        description="Urgent alerts delivered instantly"
        icon={Bell}
      >
        <div className="divide-y divide-[#DDEAE6]">
          <Toggle
            label="SMS for urgent deadlines"
            description="Text alerts for overdue or high-priority filings"
            field="smsUrgent"
          />
          <Toggle
            label="Browser push notifications"
            description="Get alerts in your browser window"
            field="pushNotifications"
          />
        </div>
      </SectionCard>
    </div>
  );

  const renderTeamTab = () => {
    const teamMembers = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@taxpilot.co.uk",
        role: "Owner",
        initials: "AJ",
        color: "bg-[#087F5B]",
        status: "Active",
      },
      {
        id: 2,
        name: "John Smith",
        email: "john@taxpilot.co.uk",
        role: "Accountant",
        initials: "JS",
        color: "bg-blue-500",
        status: "Active",
      },
      {
        id: 3,
        name: "Sarah Martin",
        email: "sarah@taxpilot.co.uk",
        role: "Accountant",
        initials: "SM",
        color: "bg-purple-500",
        status: "Active",
      },
      {
        id: 4,
        name: "David Chen",
        email: "david@taxpilot.co.uk",
        role: "Junior Accountant",
        initials: "DC",
        color: "bg-amber-500",
        status: "Pending",
      },
    ];

    return (
      <div className="space-y-5">
        <SectionCard
          title="Team members"
          description={`${teamMembers.length} of 10 seats used`}
          icon={Users}
        >
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-[#DDEAE6] bg-white p-3.5 transition-colors hover:bg-[#F5FCF9]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-xs
                      font-bold
                      text-white
                      ${member.color}
                    `}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-bold text-[#09263A]">
                        {member.name}
                      </p>
                      <span
                        className={`
                          rounded-full
                          px-2
                          py-0.5
                          text-[9px]
                          font-bold
                          ${
                            member.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }
                        `}
                      >
                        {member.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-[#687B78]">
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-lg bg-[#F5FCF9] px-2.5 py-1 text-[10px] font-bold text-[#687B78]">
                    {member.role}
                  </span>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                    <MoreVertical className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-[#DDEAE6] pt-5 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#005E45]">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              Invite team member
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 text-xs font-semibold text-[#09263A] transition-all hover:border-[#087F5B] hover:text-[#087F5B]">
              <UserCog className="h-3.5 w-3.5" strokeWidth={2.4} />
              Manage permissions
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="Roles & permissions"
          description="Control what each role can access"
          icon={Shield}
        >
          <div className="space-y-3">
            {[
              {
                role: "Owner",
                desc: "Full access to all settings, billing and data",
                color: "bg-purple-100 text-purple-700",
                count: 1,
              },
              {
                role: "Admin",
                desc: "Manage clients, filings and team members",
                color: "bg-blue-100 text-blue-700",
                count: 0,
              },
              {
                role: "Accountant",
                desc: "Manage assigned clients and filings",
                color: "bg-emerald-100 text-emerald-700",
                count: 2,
              },
              {
                role: "Junior Accountant",
                desc: "View and edit assigned tasks only",
                color: "bg-amber-100 text-amber-700",
                count: 1,
              },
            ].map((r) => (
              <div
                key={r.role}
                className="flex items-start justify-between gap-4 rounded-lg border border-[#DDEAE6] bg-white p-3.5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${r.color}`}
                    >
                      {r.role}
                    </span>
                    <span className="text-[11px] text-[#687B78]">
                      {r.count} {r.count === 1 ? "member" : "members"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#687B78]">{r.desc}</p>
                </div>
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]">
                  <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    );
  };

  const renderBillingTab = () => (
    <div className="space-y-5">
      <SectionCard
        title="Current plan"
        description="Your practice subscription"
        icon={Crown}
      >
        <div className="rounded-xl border border-[#DDEAE6] bg-gradient-to-br from-[#E8F8F2] via-white to-[#E8F8F2] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
                <Crown className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-[#09263A]">
                    Practice Pro
                  </h3>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                    Active
                  </span>
                </div>
                <p className="mt-1">
                  <span className="text-2xl font-bold text-[#09263A]">
                    £149
                  </span>
                  <span className="text-xs text-[#687B78]">/month</span>
                </p>
                <p className="mt-1 text-[11px] text-[#687B78]">
                  Next billing: 15 October 2026
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#005E45]">
                <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
                Upgrade plan
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 text-xs font-semibold text-[#09263A] transition-all hover:border-[#087F5B] hover:text-[#087F5B]">
                Manage
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#DDEAE6] pt-5 sm:grid-cols-4">
            {[
              { label: "Clients", used: 42, limit: "Unlimited" },
              { label: "Companies", used: 68, limit: "Unlimited" },
              { label: "Team seats", used: 4, limit: 10 },
              { label: "Filings/mo", used: 48, limit: "Unlimited" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#687B78]">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-bold text-[#09263A]">
                  {stat.used}
                </p>
                <p className="text-[10px] text-[#687B78]">of {stat.limit}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Payment method" icon={CreditCard}>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-[#DDEAE6] bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-[#DDEAE6] bg-white">
              <span className="font-bold text-sm tracking-wider text-[#1A1F71]">
                VISA
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#09263A]">
                •••• •••• •••• 4242
              </p>
              <p className="mt-0.5 text-[11px] text-[#687B78]">
                Expires 12/2027
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-3.5 py-2 text-xs font-semibold text-[#09263A] transition-all hover:border-[#087F5B] hover:text-[#087F5B]">
            <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
            Edit
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Billing information"
        description="Invoice details for your practice"
        icon={FileText}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <InputField
            label="Billing name"
            field="practiceName"
            placeholder="TaxPilot Accountants Ltd"
          />
          <InputField
            label="Billing email"
            field="email"
            type="email"
            placeholder="billing@taxpilot.co.uk"
          />
          <InputField
            label="VAT number"
            field="vatNumber"
            placeholder="GB123456789"
          />
        </div>
      </SectionCard>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-5">
      <SectionCard
        title="Change password"
        description="Update your account password"
        icon={Lock}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="
                  w-full
                  rounded-lg
                  border
                  border-[#DDEAE6]
                  bg-white
                  px-4
                  py-2.5
                  pr-10
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
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687B78] transition-colors hover:text-[#087F5B]"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" strokeWidth={2.2} />
                ) : (
                  <Eye className="h-4 w-4" strokeWidth={2.2} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="
                  w-full
                  rounded-lg
                  border
                  border-[#DDEAE6]
                  bg-white
                  px-4
                  py-2.5
                  pr-10
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
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687B78] transition-colors hover:text-[#087F5B]"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" strokeWidth={2.2} />
                ) : (
                  <Eye className="h-4 w-4" strokeWidth={2.2} />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-[#687B78]">
              Minimum 8 characters with a mix of letters, numbers and symbols.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#09263A]">
              Confirm new password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="
                w-full
                rounded-lg
                border
                border-[#DDEAE6]
                bg-white
                px-4
                py-2.5
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

          <button className="inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#005E45]">
            <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
            Update password
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Two-factor authentication"
        description="Add an extra layer of security to your account"
        icon={Shield}
      >
        <div className="rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F8F2]">
              <Shield className="h-5 w-5 text-[#087F5B]" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#09263A]">
                    Authenticator app
                  </p>
                  <p className="mt-0.5 text-xs text-[#687B78]">
                    Use an app like Google Authenticator or Authy
                  </p>
                </div>
                <Toggle field="twoFactorAuth" />
              </div>
              {formData.twoFactorAuth && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                  Enabled
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <SelectField
            label="Session timeout"
            field="sessionTimeout"
            options={[
              { value: "15", label: "15 minutes" },
              { value: "30", label: "30 minutes" },
              { value: "60", label: "1 hour" },
              { value: "120", label: "2 hours" },
            ]}
            hint="Automatically log out after this period of inactivity"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Danger zone"
        description="Irreversible and destructive actions"
        icon={AlertCircle}
      >
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
              strokeWidth={2.2}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#09263A]">
                Delete account
              </p>
              <p className="mt-1 text-xs leading-5 text-[#687B78]">
                This will permanently delete your account, all client data,
                filings and team memberships. This action cannot be undone.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-600 transition-all hover:bg-rose-600 hover:text-white">
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                Delete account
              </button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderIntegrationsTab = () => {
    const integrations = [
      {
        name: "Xero",
        description: "Sync accounting data, invoices and bank transactions",
        connected: true,
        color: "bg-[#13B5EA]",
        initial: "X",
      },
      {
        name: "QuickBooks",
        description: "Import transactions and reconcile accounts",
        connected: false,
        color: "bg-[#2CA01C]",
        initial: "Q",
      },
      {
        name: "Companies House",
        description: "Auto-sync company details and filing history",
        connected: true,
        color: "bg-[#00539F]",
        initial: "CH",
      },
      {
        name: "HMRC MTD",
        description: "Submit VAT returns and CT600 directly to HMRC",
        connected: true,
        color: "bg-[#087F5B]",
        initial: "H",
      },
      {
        name: "Stripe",
        description: "Accept payments from clients directly",
        connected: false,
        color: "bg-[#635BFF]",
        initial: "S",
      },
      {
        name: "Slack",
        description: "Get filing reminders in your team channels",
        connected: false,
        color: "bg-[#4A154B]",
        initial: "SL",
      },
    ];

    return (
      <div className="space-y-5">
        <SectionCard
          title="Connected apps"
          description="Integrate TaxPilot with your favourite tools"
          icon={Zap}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex flex-col gap-3 rounded-xl border border-[#DDEAE6] bg-white p-4 transition-all hover:border-[#087F5B]/30 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-xs
                        font-bold
                        text-white
                        ${integration.color}
                      `}
                    >
                      {integration.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#09263A]">
                        {integration.name}
                      </p>
                      {integration.connected ? (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Connected
                        </span>
                      ) : (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-[#687B78]">
                          Not connected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] leading-5 text-[#687B78]">
                  {integration.description}
                </p>

                <button
                  className={`
                    mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition-all
                    ${
                      integration.connected
                        ? "border border-[#DDEAE6] bg-white text-[#09263A] hover:border-rose-300 hover:text-rose-600"
                        : "bg-[#087F5B] text-white hover:bg-[#005E45]"
                    }
                  `}
                >
                  {integration.connected ? (
                    <>Disconnect</>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" strokeWidth={2.6} />
                      Connect
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    );
  };

  const renderApiTab = () => (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#C9EDE1] bg-[#E8F8F2] p-4">
        <div className="flex items-start gap-3">
          <Key className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" strokeWidth={2.2} />
          <div>
            <p className="text-xs font-bold text-[#09263A]">API access</p>
            <p className="mt-1 text-[11px] leading-5 text-[#687B78]">
              Use these keys to integrate TaxPilot UK with your own tools and
              services. Keep them secure and never share them publicly.
            </p>
          </div>
        </div>
      </div>

      <SectionCard title="Live API key" icon={Key}>
        <div className="rounded-lg border border-[#DDEAE6] bg-[#F5FCF9] p-4">
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-2 font-mono text-xs text-[#09263A]">
              {showApiKey
                ? "tp_live_abc123def456ghi789jkl012"
                : "tp_live_••••••••••••••••••••••••"}
            </code>
            <button
              type="button"
              onClick={() => setShowApiKey((prev) => !prev)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" strokeWidth={2.2} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2.2} />
              )}
            </button>
            <button
              type="button"
              onClick={() =>
                handleCopy("tp_live_abc123def456ghi789jkl012")
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#687B78] transition-colors hover:bg-[#E8F8F2] hover:text-[#087F5B]"
            >
              <Copy className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
          <p className="mt-3 text-[11px] text-[#687B78]">
            Created 15 Aug 2026 · Last used 2 hours ago
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 text-xs font-semibold text-[#09263A] transition-all hover:border-[#087F5B] hover:text-[#087F5B]">
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2.4} />
            Regenerate key
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 text-xs font-semibold text-[#09263A] transition-all hover:border-[#087F5B] hover:text-[#087F5B]">
            <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
            Download docs
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Webhooks"
        description="Get notified when events happen in TaxPilot"
        icon={Webhook}
      >
        <div className="rounded-lg border border-dashed border-[#DDEAE6] bg-[#F5FCF9] px-5 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F8F2] text-[#087F5B]">
            <Webhook className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <p className="mt-3 text-sm font-bold text-[#09263A]">
            No webhooks configured
          </p>
          <p className="mt-1 text-xs text-[#687B78]">
            Receive HTTP POST requests when filings are submitted, clients
            added or deadlines approach.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#087F5B] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#005E45]">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
            Add webhook
          </button>
        </div>
      </SectionCard>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "practice":
        return renderPracticeTab();
      case "notifications":
        return renderNotificationsTab();
      case "team":
        return renderTeamTab();
      case "billing":
        return renderBillingTab();
      case "security":
        return renderSecurityTab();
      case "integrations":
        return renderIntegrationsTab();
      case "api":
        return renderApiTab();
      default:
        return renderProfileTab();
    }
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="space-y-6">
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#09263A] sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-sm text-[#687B78]">
            Manage your account, practice and preferences
          </p>
        </div>

        {/* Save button - desktop */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="
            hidden
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#087F5B]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-[#005E45]
            hover:-translate-y-0.5
            hover:shadow-md
            disabled:opacity-60
            sm:inline-flex
          "
        >
          {isSaving ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={2.4} />
              <span>Save changes</span>
            </>
          )}
        </button>
      </div>

      {/* Success message */}
      {savedMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* ======================================================
          LAYOUT
      ====================================================== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* ==================================================
            TABS (Left sidebar)
        ================================================== */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-2
                    rounded-lg
                    border
                    px-3.5
                    py-2
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      isActive
                        ? "border-[#087F5B] bg-[#087F5B] text-white"
                        : "border-[#DDEAE6] bg-white text-[#09263A] hover:border-[#087F5B] hover:text-[#087F5B]"
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical list */}
          <div className="hidden overflow-hidden rounded-xl border border-[#DDEAE6] bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)] lg:block">
            <div className="p-2">
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
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-[#087F5B] text-white shadow-sm"
                          : "text-[#09263A] hover:bg-[#E8F8F2] hover:text-[#087F5B]"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-4 w-4 shrink-0
                        ${
                          isActive
                            ? "text-white"
                            : "text-[#687B78] group-hover:text-[#087F5B]"
                        }
                      `}
                      strokeWidth={2.2}
                    />
                    <span className="truncate">{tab.label}</span>
                    <ChevronRight
                      className={`
                        ml-auto h-3.5 w-3.5 shrink-0 transition-all
                        ${
                          isActive
                            ? "text-white"
                            : "text-[#687B78] opacity-0 group-hover:opacity-100 group-hover:text-[#087F5B]"
                        }
                      `}
                      strokeWidth={2.4}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ==================================================
            TAB CONTENT
        ================================================== */}
        <div>{renderTabContent()}</div>
      </div>

      {/* Mobile save button */}
      <div className="flex sm:hidden">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#087F5B]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-[#005E45]
            disabled:opacity-60
          "
        >
          {isSaving ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={2.4} />
              <span>Save changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountantSettings;