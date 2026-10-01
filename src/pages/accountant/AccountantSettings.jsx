import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@taxpilot.co.uk",
    phone: "+44 20 7946 0958",
    jobTitle: "Senior Accountant",
    bio: "Senior accountant with 10+ years of experience in UK tax compliance.",
    avatarColor: "bg-primary",

    practiceName: "TaxPilot Accountants Ltd",
    practiceSize: "6-20",
    practiceType: "Accountancy Firm",
    registeredAddress: "25 King Street, London, EC2V 8AU, United Kingdom",
    vatNumber: "GB123456789",
    companyNumber: "12345678",

    emailDeadlines: true,
    emailFilings: true,
    emailClientUpdates: true,
    emailMarketing: false,
    smsUrgent: true,
    pushNotifications: true,

    twoFactorAuth: true,
    sessionTimeout: "30",
    ipWhitelist: false,

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
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  const tabContentVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: premiumEase },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          transition: { duration: 0.2, ease: premiumEase },
        },
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
    <motion.div variants={fadeUpVariants}>
      <label className="mb-1.5 block text-xs font-semibold text-heading">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-secondary"
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
            border-border
            bg-background
            py-2.5
            pr-4
            ${Icon ? "pl-10" : "pl-4"}
            text-sm
            text-heading
            outline-none
            transition-all
            duration-200
            placeholder:text-text-secondary
            focus:border-primary
            focus:ring-2
            focus:ring-primary/10
          `}
        />
      </div>
      {hint && (
        <p className="mt-1.5 text-[11px] text-text-secondary">{hint}</p>
      )}
    </motion.div>
  );

  const SelectField = ({ label, field, options, hint }) => (
    <motion.div variants={fadeUpVariants}>
      <label className="mb-1.5 block text-xs font-semibold text-heading">
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
            border-border
            bg-background
            px-4
            py-2.5
            pr-10
            text-sm
            font-medium
            text-heading
            outline-none
            transition-all
            duration-200
            focus:border-primary
            focus:ring-2
            focus:ring-primary/10
          "
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronRight
          className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-text-secondary"
          strokeWidth={2.4}
        />
      </div>
      {hint && (
        <p className="mt-1.5 text-[11px] text-text-secondary">{hint}</p>
      )}
    </motion.div>
  );

  const Toggle = ({ label, description, field }) => (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-heading">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs leading-5 text-text-secondary">
            {description}
          </p>
        )}
      </div>
      <motion.button
        type="button"
        onClick={() => handleToggle(field)}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        animate={{
          backgroundColor: formData[field]
            ? "var(--color-primary)"
            : "var(--color-border)",
        }}
        transition={{ duration: 0.2, ease: premiumEase }}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
        `}
        aria-label={`Toggle ${label}`}
      >
        <motion.span
          className="
            absolute
            top-0.5
            h-5
            w-5
            rounded-full
            bg-background
            shadow-card
          "
          animate={{
            x: formData[field] ? 22 : 2,
          }}
          transition={{ duration: 0.25, ease: premiumEase }}
        />
      </motion.button>
    </div>
  );

  const SectionCard = ({ title, description, icon: Icon, children }) => (
    <motion.div
      variants={cardVariants}
      className="
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-background
        shadow-card
      "
    >
      {title && (
        <div className="flex items-start gap-3 border-b border-border px-5 py-4">
          {Icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-heading">{title}</h3>
            {description && (
              <p className="mt-0.5 text-[11px] text-text-secondary">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </motion.div>
  );

  /* ============================================================
     TAB CONTENT RENDERERS
  ============================================================ */

  const renderProfileTab = () => (
    <motion.div
      key="profile"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-5"
    >
      <SectionCard title="Profile photo" icon={User}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, scale: 0.6, rotate: -12 }
            }
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.15,
            }}
            className="relative"
          >
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
                text-text-white
                shadow-button
                ${formData.avatarColor}
              `}
            >
              {formData.firstName[0]}
              {formData.lastName[0]}
            </div>
            <motion.button
              type="button"
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.1, transition: { duration: 0.15 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
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
                border-background
                bg-primary
                text-text-white
                shadow-button
                transition-colors
                hover:bg-primary-hover
              "
              aria-label="Change avatar"
            >
              <Upload className="h-3.5 w-3.5" strokeWidth={2.6} />
            </motion.button>
          </motion.div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-heading">
              Profile picture
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">
              Upload a JPG or PNG, max 2 MB. Recommended 200x200px.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <motion.button
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-3.5
                  py-2
                  text-xs
                  font-bold
                  text-text-white
                  shadow-button
                  transition-colors
                  hover:bg-primary-hover
                "
              >
                <Upload className="h-3.5 w-3.5" strokeWidth={2.6} />
                Upload new
              </motion.button>
              <motion.button
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-3.5
                  py-2
                  text-xs
                  font-semibold
                  text-heading
                  transition-colors
                  hover:border-danger/30
                  hover:text-danger
                "
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      </SectionCard>

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

        <motion.div variants={fadeUpVariants} className="mt-5">
          <label className="mb-1.5 block text-xs font-semibold text-heading">
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
              border-border
              bg-background
              px-4
              py-2.5
              text-sm
              text-heading
              outline-none
              transition-all
              duration-200
              placeholder:text-text-secondary
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />
        </motion.div>
      </SectionCard>
    </motion.div>
  );

  const renderPracticeTab = () => (
    <motion.div
      key="practice"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-5"
    >
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

        <motion.div variants={fadeUpVariants} className="mt-5">
          <label className="mb-1.5 block text-xs font-semibold text-heading">
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
              border-border
              bg-background
              px-4
              py-2.5
              text-sm
              text-heading
              outline-none
              transition-all
              duration-200
              placeholder:text-text-secondary
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
            "
          />
        </motion.div>
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
    </motion.div>
  );

  const renderNotificationsTab = () => (
    <motion.div
      key="notifications"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-5"
    >
      <SectionCard
        title="Email notifications"
        description="Choose which emails you want to receive"
        icon={Mail}
      >
        <div className="divide-y divide-border">
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
        <div className="divide-y divide-border">
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
    </motion.div>
  );

  const renderTeamTab = () => {
    const teamMembers = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@taxpilot.co.uk",
        role: "Owner",
        initials: "AJ",
        color: "bg-primary",
        status: "Active",
      },
      {
        id: 2,
        name: "John Smith",
        email: "john@taxpilot.co.uk",
        role: "Accountant",
        initials: "JS",
        color: "bg-sky",
        status: "Active",
      },
      {
        id: 3,
        name: "Sarah Martin",
        email: "sarah@taxpilot.co.uk",
        role: "Accountant",
        initials: "SM",
        color: "bg-secondary",
        status: "Active",
      },
      {
        id: 4,
        name: "David Chen",
        email: "david@taxpilot.co.uk",
        role: "Junior Accountant",
        initials: "DC",
        color: "bg-warning",
        status: "Pending",
      },
    ];

    return (
      <motion.div
        key="team"
        variants={tabContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-5"
      >
        <SectionCard
          title="Team members"
          description={`${teamMembers.length} of 10 seats used`}
          icon={Users}
        >
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, x: -8 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: 0.45,
                  ease: premiumEase,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -2, transition: { duration: 0.2 } }
                }
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-lg
                  border
                  border-border
                  bg-background
                  p-3.5
                  transition-colors
                  hover:bg-background-soft
                "
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
                      text-text-white
                      shadow-button
                      ${member.color}
                    `}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-bold text-heading">
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
                              ? "bg-success-light text-success"
                              : "bg-warning-light text-warning"
                          }
                        `}
                      >
                        {member.status}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-text-secondary">
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className="
                      rounded-lg
                      bg-background-soft
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      text-text-secondary
                    "
                  >
                    {member.role}
                  </span>
                  <motion.button
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.1, transition: { duration: 0.15 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.95 }
                    }
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-text-secondary
                      transition-colors
                      hover:bg-primary-light
                      hover:text-primary
                    "
                  >
                    <MoreVertical className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
            <motion.button
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-4
                py-2.5
                text-xs
                font-bold
                text-text-white
                shadow-button
                transition-colors
                hover:bg-primary-hover
              "
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
              Invite team member
            </motion.button>
            <motion.button
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -1, transition: { duration: 0.2 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-xs
                font-semibold
                text-heading
                transition-colors
                hover:border-primary
                hover:text-primary
              "
            >
              <UserCog className="h-3.5 w-3.5" strokeWidth={2.4} />
              Manage permissions
            </motion.button>
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
                color: "bg-secondary-light text-secondary",
                count: 1,
              },
              {
                role: "Admin",
                desc: "Manage clients, filings and team members",
                color: "bg-primary-light text-primary",
                count: 0,
              },
              {
                role: "Accountant",
                desc: "Manage assigned clients and filings",
                color: "bg-success-light text-success",
                count: 2,
              },
              {
                role: "Junior Accountant",
                desc: "View and edit assigned tasks only",
                color: "bg-warning-light text-warning",
                count: 1,
              },
            ].map((r, index) => (
              <motion.div
                key={r.role}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, x: -8 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: 0.45,
                  ease: premiumEase,
                }}
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  rounded-lg
                  border
                  border-border
                  bg-background
                  p-3.5
                  transition-colors
                  hover:bg-background-soft
                "
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${r.color}`}
                    >
                      {r.role}
                    </span>
                    <span className="text-[11px] text-text-secondary">
                      {r.count} {r.count === 1 ? "member" : "members"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-text-secondary">
                    {r.desc}
                  </p>
                </div>
                <motion.button
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.1, transition: { duration: 0.15 } }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.95 }
                  }
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-text-secondary
                    transition-colors
                    hover:bg-primary-light
                    hover:text-primary
                  "
                >
                  <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </motion.div>
    );
  };

  const renderBillingTab = () => (
    <motion.div
      key="billing"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-5"
    >
      <SectionCard
        title="Current plan"
        description="Your practice subscription"
        icon={Crown}
      >
        <div
          className="
            rounded-xl
            border
            border-primary/20
            bg-gradient-to-br
            from-primary-light
            via-background
            to-primary-light
            p-5
          "
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.6, rotate: -12 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary
                  shadow-button
                "
              >
                <Crown className="h-6 w-6 text-text-white" strokeWidth={2} />
              </motion.div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-heading">
                    Practice Pro
                  </h3>
                  <span
                    className="
                      rounded-full
                      bg-success-light
                      px-2
                      py-0.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-success
                    "
                  >
                    Active
                  </span>
                </div>
                <p className="mt-1">
                  <span className="text-2xl font-bold text-heading">
                    £149
                  </span>
                  <span className="text-xs text-text-secondary">/month</span>
                </p>
                <p className="mt-1 text-[11px] text-text-secondary">
                  Next billing: 15 October 2026
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-text-white
                  shadow-button
                  transition-colors
                  hover:bg-primary-hover
                "
              >
                <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
                Upgrade plan
              </motion.button>
              <motion.button
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-border
                  bg-background
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-heading
                  transition-colors
                  hover:border-primary
                  hover:text-primary
                "
              >
                Manage
              </motion.button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
            {[
              { label: "Clients", used: 42, limit: "Unlimited" },
              { label: "Companies", used: 68, limit: "Unlimited" },
              { label: "Team seats", used: 4, limit: 10 },
              { label: "Filings/mo", used: 48, limit: "Unlimited" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  {stat.used}
                </p>
                <p className="text-[10px] text-text-secondary">
                  of {stat.limit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Payment method" icon={CreditCard}>
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            rounded-lg
            border
            border-border
            bg-background
            p-4
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-16
                items-center
                justify-center
                rounded-lg
                border
                border-border
                bg-background
              "
            >
              <span className="font-bold text-sm tracking-wider text-heading">
                VISA
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-heading">
                •••• •••• •••• 4242
              </p>
              <p className="mt-0.5 text-[11px] text-text-secondary">
                Expires 12/2027
              </p>
            </div>
          </div>
          <motion.button
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-3.5
              py-2
              text-xs
              font-semibold
              text-heading
              transition-colors
              hover:border-primary
              hover:text-primary
            "
          >
            <Edit3 className="h-3.5 w-3.5" strokeWidth={2.4} />
            Edit
          </motion.button>
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
    </motion.div>
  );

  const renderSecurityTab = () => (
    <motion.div
      key="security"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-5"
    >
      <SectionCard
        title="Change password"
        description="Update your account password"
        icon={Lock}
      >
        <div className="space-y-4">
          <motion.div variants={fadeUpVariants}>
            <label className="mb-1.5 block text-xs font-semibold text-heading">
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
                  border-border
                  bg-background
                  px-4
                  py-2.5
                  pr-10
                  text-sm
                  text-heading
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-text-secondary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
              <motion.button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 1.1, transition: { duration: 0.15 } }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.95 }
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-text-secondary
                  transition-colors
                  hover:text-primary
                "
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" strokeWidth={2.2} />
                ) : (
                  <Eye className="h-4 w-4" strokeWidth={2.2} />
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <label className="mb-1.5 block text-xs font-semibold text-heading">
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
                  border-border
                  bg-background
                  px-4
                  py-2.5
                  pr-10
                  text-sm
                  text-heading
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-text-secondary
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />
              <motion.button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { scale: 1.1, transition: { duration: 0.15 } }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.95 }
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-text-secondary
                  transition-colors
                  hover:text-primary
                "
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" strokeWidth={2.2} />
                ) : (
                  <Eye className="h-4 w-4" strokeWidth={2.2} />
                )}
              </motion.button>
            </div>
            <p className="mt-1.5 text-[11px] text-text-secondary">
              Minimum 8 characters with a mix of letters, numbers and symbols.
            </p>
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <label className="mb-1.5 block text-xs font-semibold text-heading">
              Confirm new password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="
                w-full
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                text-sm
                text-heading
                outline-none
                transition-all
                duration-200
                placeholder:text-text-secondary
                focus:border-primary
                focus:ring-2
                focus:ring-primary/10
              "
            />
          </motion.div>

          <motion.button
            variants={fadeUpVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2.5
              text-xs
              font-bold
              text-text-white
              shadow-button
              transition-colors
              hover:bg-primary-hover
            "
          >
            <Lock className="h-3.5 w-3.5" strokeWidth={2.4} />
            Update password
          </motion.button>
        </div>
      </SectionCard>

      <SectionCard
        title="Two-factor authentication"
        description="Add an extra layer of security to your account"
        icon={Shield}
      >
        <div
          className="
            rounded-lg
            border
            border-border
            bg-background-soft
            p-4
          "
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
              <Shield className="h-5 w-5 text-primary" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-heading">
                    Authenticator app
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Use an app like Google Authenticator or Authy
                  </p>
                </div>
                <Toggle field="twoFactorAuth" />
              </div>
              <AnimatePresence>
                {formData.twoFactorAuth && (
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.9 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                    className="
                      mt-3
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-success-light
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      text-success
                    "
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                    Enabled
                  </motion.div>
                )}
              </AnimatePresence>
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
        <div className="rounded-xl border border-danger/20 bg-danger-light p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-danger"
              strokeWidth={2.2}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-heading">
                Delete account
              </p>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                This will permanently delete your account, all client data,
                filings and team memberships. This action cannot be undone.
              </p>
              <motion.button
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -1, transition: { duration: 0.2 } }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-danger/30
                  bg-background
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-danger
                  transition-colors
                  hover:bg-danger
                  hover:text-text-white
                "
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.4} />
                Delete account
              </motion.button>
            </div>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );

  const renderIntegrationsTab = () => {
    const integrations = [
      {
        name: "Xero",
        description: "Sync accounting data, invoices and bank transactions",
        connected: true,
        color: "bg-sky",
        initial: "X",
      },
      {
        name: "QuickBooks",
        description: "Import transactions and reconcile accounts",
        connected: false,
        color: "bg-success",
        initial: "Q",
      },
      {
        name: "Companies House",
        description: "Auto-sync company details and filing history",
        connected: true,
        color: "bg-primary",
        initial: "CH",
      },
      {
        name: "HMRC MTD",
        description: "Submit VAT returns and CT600 directly to HMRC",
        connected: true,
        color: "bg-primary",
        initial: "H",
      },
      {
        name: "Stripe",
        description: "Accept payments from clients directly",
        connected: false,
        color: "bg-secondary",
        initial: "S",
      },
      {
        name: "Slack",
        description: "Get filing reminders in your team channels",
        connected: false,
        color: "bg-secondary",
        initial: "SL",
      },
    ];

    return (
      <motion.div
        key="integrations"
        variants={tabContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-5"
      >
        <SectionCard
          title="Connected apps"
          description="Integrate TaxPilot with your favourite tools"
          icon={Zap}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 12, scale: 0.96 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: 0.5,
                  ease: premiumEase,
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -3, transition: { duration: 0.25 } }
                }
                className="
                  flex
                  flex-col
                  gap-3
                  rounded-xl
                  border
                  border-border
                  bg-background
                  p-4
                  transition-[border-color,box-shadow]
                  duration-200
                  hover:border-primary/30
                  hover:shadow-card
                "
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
                        text-text-white
                        shadow-button
                        ${integration.color}
                      `}
                    >
                      {integration.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-heading">
                        {integration.name}
                      </p>
                      {integration.connected ? (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-success">
                          <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-success"
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : { scale: [1, 1.2, 1] }
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          Connected
                        </span>
                      ) : (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-bold text-text-secondary">
                          Not connected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-[11px] leading-5 text-text-secondary">
                  {integration.description}
                </p>

                <motion.button
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.2 } }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
                  className={`
                    mt-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    px-3.5
                    py-2
                    text-xs
                    font-bold
                    transition-colors
                    ${
                      integration.connected
                        ? "border border-border bg-background text-heading hover:border-danger/30 hover:text-danger"
                        : "bg-primary text-text-white shadow-button hover:bg-primary-hover"
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
                </motion.button>
              </motion.div>
            ))}
          </div>
        </SectionCard>
      </motion.div>
    );
  };

  const renderApiTab = () => (
    <motion.div
      key="api"
      variants={tabContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-5"
    >
      <motion.div
        variants={fadeUpVariants}
        className="
          rounded-xl
          border
          border-primary/20
          bg-primary-light
          p-4
        "
      >
        <div className="flex items-start gap-3">
          <Key
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            strokeWidth={2.2}
          />
          <div>
            <p className="text-xs font-bold text-heading">API access</p>
            <p className="mt-1 text-[11px] leading-5 text-text-secondary">
              Use these keys to integrate TaxPilot UK with your own tools and
              services. Keep them secure and never share them publicly.
            </p>
          </div>
        </div>
      </motion.div>

      <SectionCard title="Live API key" icon={Key}>
        <div
          className="
            rounded-lg
            border
            border-border
            bg-background-soft
            p-4
          "
        >
          <div className="flex items-center gap-2">
            <code
              className="
                min-w-0
                flex-1
                truncate
                rounded-lg
                bg-background
                px-3
                py-2
                font-mono
                text-xs
                text-heading
              "
            >
              {showApiKey
                ? "tp_live_abc123def456ghi789jkl012"
                : "tp_live_••••••••••••••••••••••••"}
            </code>
            <motion.button
              type="button"
              onClick={() => setShowApiKey((prev) => !prev)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.1, transition: { duration: 0.15 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-text-secondary
                transition-colors
                hover:bg-primary-light
                hover:text-primary
              "
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" strokeWidth={2.2} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2.2} />
              )}
            </motion.button>
            <motion.button
              type="button"
              onClick={() =>
                handleCopy("tp_live_abc123def456ghi789jkl012")
              }
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.1, transition: { duration: 0.15 } }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-text-secondary
                transition-colors
                hover:bg-primary-light
                hover:text-primary
              "
            >
              <Copy className="h-4 w-4" strokeWidth={2.2} />
            </motion.button>
          </div>
          <p className="mt-3 text-[11px] text-text-secondary">
            Created 15 Aug 2026 · Last used 2 hours ago
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <motion.button
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-4
              py-2.5
              text-xs
              font-semibold
              text-heading
              transition-colors
              hover:border-primary
              hover:text-primary
            "
          >
            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2.4} />
            Regenerate key
          </motion.button>
          <motion.button
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-border
              bg-background
              px-4
              py-2.5
              text-xs
              font-semibold
              text-heading
              transition-colors
              hover:border-primary
              hover:text-primary
            "
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
            Download docs
          </motion.button>
        </div>
      </SectionCard>

      <SectionCard
        title="Webhooks"
        description="Get notified when events happen in TaxPilot"
        icon={Webhook}
      >
        <div
          className="
            rounded-lg
            border-2
            border-dashed
            border-border
            bg-background-soft
            px-5
            py-8
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-primary-light
              text-primary
            "
          >
            <Webhook className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <p className="mt-3 text-sm font-bold text-heading">
            No webhooks configured
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Receive HTTP POST requests when filings are submitted, clients
            added or deadlines approach.
          </p>
          <motion.button
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -1, transition: { duration: 0.2 } }
            }
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2.5
              text-xs
              font-bold
              text-text-white
              shadow-button
              transition-colors
              hover:bg-primary-hover
            "
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
            Add webhook
          </motion.button>
        </div>
      </SectionCard>
    </motion.div>
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
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <motion.div
        variants={fadeUpVariants}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your account, practice and preferences
          </p>
        </div>

        {/* Save button - desktop */}
        <motion.button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          whileHover={
            shouldReduceMotion || isSaving
              ? undefined
              : { y: -1, transition: { duration: 0.2 } }
          }
          whileTap={
            shouldReduceMotion || isSaving ? undefined : { scale: 0.98 }
          }
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
            text-text-white
            shadow-button
            transition-colors
            duration-200
            hover:bg-primary-hover
            disabled:opacity-60
            sm:inline-flex
          "
        >
          {isSaving ? (
            <>
              <span
                className="
                  h-3.5
                  w-3.5
                  animate-spin
                  rounded-full
                  border-2
                  border-text-white/30
                  border-t-text-white
                "
              />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={2.4} />
              <span>Save changes</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Success message */}
      <AnimatePresence>
        {savedMessage && (
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={{ duration: 0.28, ease: premiumEase }}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-success/20
              bg-success-light
              px-4
              py-3
              text-xs
              font-semibold
              text-success
            "
          >
            <CheckCircle2 className="h-4 w-4" strokeWidth={2.4} />
            <span>{savedMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
                <motion.button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.97 }
                  }
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
                    transition-colors
                    ${
                      isActive
                        ? "border-primary bg-primary text-text-white shadow-button"
                        : "border-border bg-background text-heading hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Desktop: vertical list */}
          <motion.div
            variants={cardVariants}
            className="
              hidden
              overflow-hidden
              rounded-xl
              border
              border-border
              bg-background
              shadow-card
              lg:block
            "
          >
            <div className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { x: 2, transition: { duration: 0.2 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
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
                      transition-colors
                      duration-200
                      ${
                        isActive
                          ? "bg-primary text-text-white shadow-button"
                          : "text-heading hover:bg-primary-light hover:text-primary"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        h-4 w-4 shrink-0
                        ${
                          isActive
                            ? "text-text-white"
                            : "text-text-secondary group-hover:text-primary"
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
                            ? "text-text-white"
                            : "text-text-secondary opacity-0 group-hover:opacity-100 group-hover:text-primary"
                        }
                      `}
                      strokeWidth={2.4}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </aside>

        {/* ==================================================
            TAB CONTENT
        ================================================== */}
        <div>
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </div>
      </div>

      {/* Mobile save button */}
      <div className="flex sm:hidden">
        <motion.button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          whileTap={
            shouldReduceMotion || isSaving ? undefined : { scale: 0.98 }
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-primary
            px-5
            py-3
            text-sm
            font-semibold
            text-text-white
            shadow-button
            transition-colors
            duration-200
            hover:bg-primary-hover
            disabled:opacity-60
          "
        >
          {isSaving ? (
            <>
              <span
                className="
                  h-3.5
                  w-3.5
                  animate-spin
                  rounded-full
                  border-2
                  border-text-white/30
                  border-t-text-white
                "
              />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={2.4} />
              <span>Save changes</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AccountantSettings;