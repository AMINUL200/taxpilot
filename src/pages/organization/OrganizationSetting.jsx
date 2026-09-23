import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  Shield,
  Bell,
  CreditCard,
  Users,
  Key,
  ChevronRight,
  Save,
  Upload,
  Check,
  AlertCircle,
  Search,
  Trash2,
  Plus,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";

const OrganizationSetting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    // General
    organisationName: "ABC Trading Ltd",
    organisationType: "Company",
    companyNumber: "12345678",
    vatNumber: "GB123456789",
    utrNumber: "1234567890",
    // Contact
    email: "contact@abctrading.co.uk",
    phone: "+44 20 7946 0958",
    website: "https://abctrading.co.uk",
    // Address
    addressLine1: "123 High Street",
    addressLine2: "London",
    postcode: "EC1A 1AA",
    country: "United Kingdom",
    // Preferences
    timezone: "Europe/London",
    currency: "GBP",
    dateFormat: "DD/MM/YYYY",
    // Notifications
    emailNotifications: true,
    deadlineReminders: true,
    filingUpdates: true,
    marketingEmails: false,
    smsNotifications: false,
    // Security
    twoFactorAuth: true,
    sessionTimeout: "30",
  });

  const [errors, setErrors] = useState({});

  // =========================================================
  // TABS CONFIGURATION
  // =========================================================

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
    { id: "api", label: "API Keys", icon: Key },
  ];

  // =========================================================
  // HANDLERS
  // =========================================================

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSavedMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSavedMessage("Settings saved successfully");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSavedMessage("Copied to clipboard");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  // =========================================================
  // REUSABLE COMPONENTS
  // =========================================================

  const InputField = ({ label, field, type = "text", placeholder, required, hint, prefix }) => (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-heading">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-muted">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className={`
            w-full rounded-lg border bg-white px-4 py-3 text-sm text-heading
            outline-none transition-all duration-200 placeholder:text-text-muted
            focus:border-primary focus:ring-2 focus:ring-primary/10
            ${prefix ? "pl-12" : ""}
            ${errors[field] ? "border-danger focus:border-danger focus:ring-danger/10" : "border-border"}
          `}
        />
      </div>
      {hint && !errors[field] && (
        <p className="mt-1.5 text-[11px] text-text-muted">{hint}</p>
      )}
      {errors[field] && (
        <p className="mt-1.5 text-[11px] font-medium text-danger">{errors[field]}</p>
      )}
    </div>
  );

  const ToggleSwitch = ({ label, description, field }) => (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-heading">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-5 text-text-muted">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleToggle(field)}
        className={`
          relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200
          ${formData[field] ? "bg-primary" : "bg-border"}
        `}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`
            absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${formData[field] ? "translate-x-[22px]" : "translate-x-0.5"}
          `}
        />
      </button>
    </div>
  );

  // =========================================================
  // RENDER TAB CONTENT
  // =========================================================

  const renderGeneralTab = () => (
    <div className="space-y-5">
      <InputField
        label="Organisation name"
        field="organisationName"
        placeholder="e.g. ABC Trading Ltd"
        required
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-heading">
            Organisation type
          </label>
          <div className="relative">
            <select
              value={formData.organisationType}
              onChange={(e) => handleChange("organisationType", e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option>Company</option>
              <option>Sole Trader</option>
              <option>Partnership</option>
              <option>LLP</option>
              <option>Charity</option>
            </select>
            <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-text-muted" />
          </div>
        </div>

        <InputField
          label="Company number"
          field="companyNumber"
          placeholder="e.g. 12345678"
          hint="As shown on Companies House"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label="VAT number"
          field="vatNumber"
          placeholder="GB123456789"
          hint="Optional"
        />
        <InputField
          label="UTR number"
          field="utrNumber"
          placeholder="1234567890"
          hint="Unique Taxpayer Reference"
        />
      </div>

      <div className="border-t border-border-light pt-5">
        <h3 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Registered address
        </h3>

        <div className="space-y-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search for your address..."
              className="w-full rounded-lg border border-border bg-white py-3 pl-10 pr-4 text-sm text-heading outline-none transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <InputField label="Address line 1" field="addressLine1" required />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InputField label="Town / City" field="addressLine2" />
            <InputField label="Postcode" field="postcode" required />
          </div>

          <InputField label="Country" field="country" />
        </div>
      </div>

      <div className="border-t border-border-light pt-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          Preferences
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-heading">
              Timezone
            </label>
            <div className="relative">
              <select
                value={formData.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
                <option value="America/New_York">America/New York (EST)</option>
              </select>
              <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-text-muted" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-heading">
              Currency
            </label>
            <div className="relative">
              <select
                value={formData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
              <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-text-muted" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-heading">
              Date format
            </label>
            <div className="relative">
              <select
                value={formData.dateFormat}
                onChange={(e) => handleChange("dateFormat", e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
              <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-text-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-5">
      <InputField
        label="Contact email"
        field="email"
        type="email"
        placeholder="contact@company.co.uk"
        required
      />

      <InputField
        label="Phone number"
        field="phone"
        type="tel"
        placeholder="+44 20 7946 0958"
      />

      <InputField
        label="Website"
        field="website"
        type="url"
        placeholder="https://company.co.uk"
      />

      <div className="rounded-xl border border-primary-soft bg-primary-light p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold text-heading">
              Why we need this
            </p>
            <p className="mt-1 text-[11px] leading-5 text-text-secondary">
              We use these details to send filing confirmations, deadline
              reminders and important compliance updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="divide-y divide-border-light">

      <ToggleSwitch
        label="Email notifications"
        description="Receive important updates via email"
        field="emailNotifications"
      />

      <ToggleSwitch
        label="Deadline reminders"
        description="Get reminded before filing deadlines"
        field="deadlineReminders"
      />

      <ToggleSwitch
        label="Filing updates"
        description="Notifications when filings are submitted or accepted"
        field="filingUpdates"
      />

      <ToggleSwitch
        label="SMS notifications"
        description="Receive urgent alerts via text message"
        field="smsNotifications"
      />

      <ToggleSwitch
        label="Marketing emails"
        description="Tips, product updates and special offers"
        field="marketingEmails"
      />

    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">

      <div className="rounded-xl border border-border-light bg-background-soft p-5">
        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
            <Lock className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-heading">
                  Two-factor authentication
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  Add an extra layer of security to your account
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle("twoFactorAuth")}
                className={`
                  relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200
                  ${formData.twoFactorAuth ? "bg-primary" : "bg-border"}
                `}
              >
                <span
                  className={`
                    absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm
                    transition-transform duration-200
                    ${formData.twoFactorAuth ? "translate-x-[22px]" : "translate-x-0.5"}
                  `}
                />
              </button>
            </div>

            {formData.twoFactorAuth && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                <Check className="h-3 w-3" />
                Enabled
              </div>
            )}

          </div>

        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-heading">
          Session timeout
        </label>
        <div className="relative max-w-xs">
          <select
            value={formData.sessionTimeout}
            onChange={(e) => handleChange("sessionTimeout", e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-lg border border-border bg-white px-4 py-3 pr-10 text-sm text-heading outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
          <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-text-muted" />
        </div>
        <p className="mt-1.5 text-[11px] text-text-muted">
          Automatically log out after this period of inactivity
        </p>
      </div>

      <div className="border-t border-border-light pt-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          Change password
        </h3>

        <div className="space-y-4">
          <InputField
            label="Current password"
            field="currentPassword"
            type="password"
            placeholder="Enter current password"
          />
          <InputField
            label="New password"
            field="newPassword"
            type="password"
            placeholder="Enter new password"
            hint="Minimum 8 characters with numbers and symbols"
          />
          <InputField
            label="Confirm new password"
            field="confirmPassword"
            type="password"
            placeholder="Re-enter new password"
          />
        </div>
      </div>

      <div className="border-t border-border-light pt-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-danger">
          Danger zone
        </h3>

        <div className="rounded-xl border border-danger/30 bg-danger-light p-5">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-heading">
                Delete organisation
              </p>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                This will permanently delete your organisation and all associated data. This action cannot be undone.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-danger bg-white px-4 py-2 text-xs font-bold text-danger transition-all hover:bg-danger hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete organisation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">

      <div className="rounded-xl border border-border-light bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Current plan
            </p>
            <p className="mt-2 text-2xl font-bold text-heading">
              Business Pro
            </p>
            <p className="mt-1 text-xs text-text-muted">
              £29/month · Billed monthly
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700">
            Active
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-all hover:bg-primary-hover">
            Upgrade plan
          </button>
          <button className="rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-text transition-all hover:border-primary hover:text-primary">
            View invoices
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          Payment method
        </h3>

        <div className="flex items-center justify-between rounded-xl border border-border-light bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-14 items-center justify-center rounded-md bg-background-soft font-bold text-xs text-heading">
              VISA
            </div>
            <div>
              <p className="text-sm font-semibold text-heading">
                •••• •••• •••• 4242
              </p>
              <p className="mt-0.5 text-[11px] text-text-muted">
                Expires 12/2027
              </p>
            </div>
          </div>
          <button className="text-xs font-semibold text-primary hover:text-primary-hover">
            Update
          </button>
        </div>
      </div>

    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-heading">Team members</h3>
          <p className="mt-0.5 text-xs text-text-muted">
            2 of 5 seats used
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary-hover">
          <Plus className="h-3.5 w-3.5" />
          Invite member
        </button>
      </div>

      <div className="divide-y divide-border-light overflow-hidden rounded-xl border border-border-light bg-white">

        {[
          {
            name: "John Smith",
            email: "john@abctrading.co.uk",
            role: "Owner",
            initials: "JS",
            active: true,
          },
          {
            name: "Sarah Johnson",
            email: "sarah@abctrading.co.uk",
            role: "Accountant",
            initials: "SJ",
            active: true,
          },
        ].map((member) => (
          <div
            key={member.email}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {member.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-heading">
                  {member.name}
                </p>
                <p className="truncate text-[11px] text-text-muted">
                  {member.email}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-bold text-primary">
              {member.role}
            </span>
          </div>
        ))}

      </div>

    </div>
  );

  const renderApiTab = () => (
    <div className="space-y-6">

      <div className="rounded-xl border border-primary-soft bg-primary-light p-4">
        <div className="flex items-start gap-3">
          <Key className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-bold text-heading">
              API access
            </p>
            <p className="mt-1 text-[11px] leading-5 text-text-secondary">
              Use these keys to integrate TaxPilot UK with your own tools
              and services. Keep them secure.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
          Live API key
        </h3>

        <div className="rounded-xl border border-border-light bg-white p-4">
          <div className="flex items-center gap-2">

            <code className="min-w-0 flex-1 truncate rounded-lg bg-background-soft px-3 py-2 font-mono text-xs text-text">
              {showApiKey ? "tp_live_abc123def456ghi789jkl012" : "tp_live_••••••••••••••••••••••••"}
            </code>

            <button
              type="button"
              onClick={() => setShowApiKey((prev) => !prev)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
              aria-label="Toggle visibility"
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => handleCopy("tp_live_abc123def456ghi789jkl012")}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
              aria-label="Copy API key"
            >
              <Copy className="h-4 w-4" />
            </button>

          </div>

          <p className="mt-3 text-[11px] text-text-muted">
            Created 15 Aug 2026 · Last used 2 hours ago
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-xs font-semibold text-text transition-all hover:border-primary hover:text-primary">
          <RefreshCw className="h-3.5 w-3.5" />
          Regenerate key
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-xs font-semibold text-text transition-all hover:border-primary hover:text-primary">
          <Download className="h-3.5 w-3.5" />
          Download docs
        </button>
      </div>

    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralTab();
      case "contact":
        return renderContactTab();
      case "notifications":
        return renderNotificationsTab();
      case "security":
        return renderSecurityTab();
      case "billing":
        return renderBillingTab();
      case "team":
        return renderTeamTab();
      case "api":
        return renderApiTab();
      default:
        return renderGeneralTab();
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Organisation Settings
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your organisation details, preferences and security.
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
            bg-primary
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-primary-hover
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
              <Save className="h-4 w-4" />
              <span>Save changes</span>
            </>
          )}
        </button>

      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
          <Check className="h-4 w-4" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* =====================================================
          MAIN LAYOUT
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">

        {/* =================================================
            SETTINGS TABS (Sidebar within page)
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
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-text hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

          </div>

          {/* Desktop: vertical list */}
          <div className="hidden overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)] lg:block">

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
                      text-sm
                      font-medium
                      text-left
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-text hover:bg-primary-light hover:text-primary"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-4 w-4 shrink-0
                        ${isActive ? "text-white" : "text-text-muted group-hover:text-primary"}
                      `}
                      strokeWidth={2.2}
                    />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}

            </div>

          </div>

        </aside>

        {/* =================================================
            TAB CONTENT
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-border-light bg-white shadow-[0_3px_14px_rgba(16,42,67,0.035)]">

          {/* Tab header */}
          <div className="flex items-center gap-3 border-b border-border-light px-5 py-4 sm:px-6">

            {(() => {
              const currentTab = tabs.find((t) => t.id === activeTab);
              const Icon = currentTab?.icon || Building2;
              return (
                <>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-heading">
                      {currentTab?.label} settings
                    </h2>
                    <p className="mt-0.5 text-[11px] text-text-muted">
                      Update your {currentTab?.label.toLowerCase()} information
                    </p>
                  </div>
                </>
              );
            })()}

          </div>

          {/* Tab body */}
          <div className="px-5 py-6 sm:px-6 sm:py-7">
            {renderTabContent()}
          </div>

          {/* Tab footer - Save button */}
          <div className="flex flex-col-reverse items-center justify-end gap-3 border-t border-border-light bg-background-soft px-5 py-4 sm:flex-row sm:px-6">

            <button
              type="button"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                rounded-lg
                border
                border-border
                bg-white
                px-5
                py-2.5
                text-xs
                font-semibold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:text-primary
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-5
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-primary-hover
                hover:-translate-y-0.5
                hover:shadow-md
                disabled:opacity-60
                sm:w-auto
              "
            >
              {isSaving ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save changes</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrganizationSetting;