import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Briefcase,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Search,
  MapPin,
  HelpCircle,
  Info,
} from "lucide-react";

const OrganizationSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    organisationName: "ABC Trading Ltd",
    organisationType: "Company",
    companyNumber: "12345678",
    addressSearch: "",
    addressLine1: "123 High Street",
    addressLine2: "London",
    postcode: "EC1A 1AA",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // STEPS CONFIGURATION
  // =========================================================

  const steps = [
    {
      id: 1,
      label: "Organisation",
      icon: Building2,
    },
    {
      id: 2,
      label: "Business",
      icon: Briefcase,
    },
    {
      id: 3,
      label: "Tax details",
      icon: FileText,
    },
    {
      id: 4,
      label: "Complete",
      icon: CheckCircle2,
    },
  ];

  // =========================================================
  // HANDLERS
  // =========================================================

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.organisationName.trim()) {
      newErrors.organisationName = "Organisation name is required";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address line 1 is required";
    }

    if (!formData.postcode.trim()) {
      newErrors.postcode = "Postcode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateStep1()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Move to next step or navigate
      // navigate("/dashboard/setup/business");
      setCurrentStep(2);
    } catch (error) {
      console.error("Error saving organisation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-background-soft">

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <header className="border-b border-border-light bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">

            <div className="relative flex h-9 w-9 items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.5 7C34.5 6.2 41.4 9.1 43 15.5C44.5 21.6 40.4 27.1 33.2 29.2C29.3 30.3 25.6 29.7 22.8 27.7C23.2 19.4 24.1 12.3 26.5 7Z"
                  fill="#087F5B"
                />
                <path
                  d="M20.5 16.5C15.2 13.2 9.4 14 6.2 18.5C3.1 22.9 4.9 28.6 10 31.4C13.3 33.2 17.1 33.2 20.4 31.5C19.1 25.9 19.2 21 20.5 16.5Z"
                  fill="#5ACBA8"
                />
                <path
                  d="M21.2 25.8C14.7 25.6 9.7 29 9.2 34C8.7 39.4 13.8 43.2 19.5 42.8C25.1 42.5 29.1 38.5 28.5 33.7C27.9 29.6 25.3 27 21.2 25.8Z"
                  fill="#8CDEC3"
                />
              </svg>
            </div>

            <div className="leading-none">
              <span className="text-base font-bold tracking-tight text-heading sm:text-lg">
                TaxPilot
                <span className="text-primary"> UK</span>
              </span>
            </div>

          </Link>

          {/* Right side */}
          <Link
            to="/help"
            className="hidden items-center gap-1.5 text-xs font-semibold text-text-secondary transition-colors hover:text-primary sm:inline-flex"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Need help?</span>
          </Link>

        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">

        {/* =================================================
            STEPPER
        ================================================== */}

        <div className="mb-10">

          <div className="flex items-center justify-between">

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <React.Fragment key={step.id}>

                  {/* Step */}
                  <div className="flex flex-col items-center gap-2">

                    {/* Circle */}
                    <div
                      className={`
                        relative
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        transition-all
                        duration-300
                        ${
                          isCompleted
                            ? "border-primary bg-primary text-white"
                            : isActive
                            ? "border-primary bg-white text-primary"
                            : "border-border bg-white text-text-muted"
                        }
                      `}
                    >

                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" strokeWidth={2.4} />
                      ) : (
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      )}

                      {/* Active pulse ring */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
                      )}

                    </div>

                    {/* Label */}
                    <span
                      className={`
                        text-[10px]
                        font-semibold
                        transition-colors
                        sm:text-[11px]
                        ${
                          isActive || isCompleted
                            ? "text-primary"
                            : "text-text-muted"
                        }
                      `}
                    >
                      {step.label}
                    </span>

                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        mx-2
                        h-0.5
                        flex-1
                        rounded-full
                        transition-colors
                        duration-500
                        ${
                          currentStep > step.id
                            ? "bg-primary"
                            : "bg-border"
                        }
                      `}
                    />
                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>

        {/* =================================================
            HEADING
        ================================================== */}

        <div className="mb-8 text-center">

          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            Set up your organisation
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
            This information helps us manage your filings and keeps
            your company details up to date.
          </p>

        </div>

        {/* =================================================
            FORM CARD
        ================================================== */}

        <div className="rounded-2xl border border-border-light bg-white shadow-[0_20px_50px_rgba(0,62,62,0.06)]">

          {/* Card header */}
          <div className="flex items-center gap-3 border-b border-border-light px-6 py-5 sm:px-8">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
              <Building2 className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-heading">
                Organisation details
              </h2>
              <p className="mt-0.5 text-[11px] text-text-muted">
                Step 1 of 4 · Takes about 2 minutes
              </p>
            </div>

          </div>

          {/* Card body */}
          <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">

            {/* Organisation name */}
            <div>

              <label
                htmlFor="organisationName"
                className="mb-1.5 block text-xs font-semibold text-heading"
              >
                Organisation name <span className="text-danger">*</span>
              </label>

              <input
                id="organisationName"
                type="text"
                value={formData.organisationName}
                onChange={(e) => handleChange("organisationName", e.target.value)}
                placeholder="e.g. ABC Trading Ltd"
                className={`
                  w-full
                  rounded-lg
                  border
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-heading
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                  ${
                    errors.organisationName
                      ? "border-danger focus:border-danger focus:ring-danger/10"
                      : "border-border"
                  }
                `}
              />

              {errors.organisationName && (
                <p className="mt-1.5 text-[11px] font-medium text-danger">
                  {errors.organisationName}
                </p>
              )}

            </div>

            {/* Organisation type */}
            <div>

              <label
                htmlFor="organisationType"
                className="mb-1.5 block text-xs font-semibold text-heading"
              >
                Organisation type
              </label>

              <div className="relative">

                <select
                  id="organisationType"
                  value={formData.organisationType}
                  onChange={(e) => handleChange("organisationType", e.target.value)}
                  className="
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    border-border
                    bg-white
                    px-4
                    py-3
                    pr-10
                    text-sm
                    text-heading
                    outline-none
                    transition-all
                    duration-200
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                    cursor-pointer
                  "
                >
                  <option value="Company">Company</option>
                  <option value="Sole Trader">Sole Trader</option>
                  <option value="Partnership">Partnership</option>
                  <option value="LLP">LLP</option>
                  <option value="Charity">Charity</option>
                </select>

                <ChevronRight
                  className="
                    pointer-events-none
                    absolute
                    right-3.5
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    rotate-90
                    text-text-muted
                  "
                />

              </div>

            </div>

            {/* Company number */}
            <div>

              <label
                htmlFor="companyNumber"
                className="mb-1.5 block text-xs font-semibold text-heading"
              >
                Company number
              </label>

              <input
                id="companyNumber"
                type="text"
                value={formData.companyNumber}
                onChange={(e) => handleChange("companyNumber", e.target.value)}
                placeholder="e.g. 12345678"
                className="
                  w-full
                  rounded-lg
                  border
                  border-border
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-heading
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                "
              />

              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-text-muted">
                <Info className="h-3 w-3" />
                You can find this on Companies House
              </p>

            </div>

            {/* Divider */}
            <div className="border-t border-border-light pt-1" />

            {/* Registered address section label */}
            <div className="flex items-center gap-2">

              <MapPin className="h-4 w-4 text-primary" />

              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Registered address
              </p>

            </div>

            {/* Address search */}
            <div>

              <label
                htmlFor="addressSearch"
                className="mb-1.5 block text-xs font-semibold text-heading"
              >
                Search address
              </label>

              <div className="relative">

                <Search
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  id="addressSearch"
                  type="text"
                  value={formData.addressSearch}
                  onChange={(e) => handleChange("addressSearch", e.target.value)}
                  placeholder="Start typing your postcode or address..."
                  className="
                    w-full
                    rounded-lg
                    border
                    border-border
                    bg-white
                    pl-10
                    pr-4
                    py-3
                    text-sm
                    text-heading
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-text-muted
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />

              </div>

            </div>

            {/* Address line 1 */}
            <div>

              <label
                htmlFor="addressLine1"
                className="mb-1.5 block text-xs font-semibold text-heading"
              >
                Address line 1 <span className="text-danger">*</span>
              </label>

              <input
                id="addressLine1"
                type="text"
                value={formData.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
                placeholder="e.g. 123 High Street"
                className={`
                  w-full
                  rounded-lg
                  border
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-heading
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/10
                  ${
                    errors.addressLine1
                      ? "border-danger focus:border-danger focus:ring-danger/10"
                      : "border-border"
                  }
                `}
              />

              {errors.addressLine1 && (
                <p className="mt-1.5 text-[11px] font-medium text-danger">
                  {errors.addressLine1}
                </p>
              )}

            </div>

            {/* Address line 2 + Postcode */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Town/City */}
              <div>

                <label
                  htmlFor="addressLine2"
                  className="mb-1.5 block text-xs font-semibold text-heading"
                >
                  Town / City
                </label>

                <input
                  id="addressLine2"
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => handleChange("addressLine2", e.target.value)}
                  placeholder="e.g. London"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-border
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-heading
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-text-muted
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                  "
                />

              </div>

              {/* Postcode */}
              <div>

                <label
                  htmlFor="postcode"
                  className="mb-1.5 block text-xs font-semibold text-heading"
                >
                  Postcode <span className="text-danger">*</span>
                </label>

                <input
                  id="postcode"
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => handleChange("postcode", e.target.value.toUpperCase())}
                  placeholder="e.g. EC1A 1AA"
                  className={`
                    w-full
                    rounded-lg
                    border
                    bg-white
                    px-4
                    py-3
                    text-sm
                    uppercase
                    text-heading
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-text-muted
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/10
                    ${
                      errors.postcode
                        ? "border-danger focus:border-danger focus:ring-danger/10"
                        : "border-border"
                    }
                  `}
                />

                {errors.postcode && (
                  <p className="mt-1.5 text-[11px] font-medium text-danger">
                    {errors.postcode}
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              CARD FOOTER - ACTIONS
          ================================================== */}

          <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-border-light px-6 py-5 sm:flex-row sm:px-8">

            {/* Back */}
            <button
              type="button"
              onClick={handleBack}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-border
                bg-white
                px-5
                py-3
                text-xs
                font-semibold
                text-text
                transition-all
                duration-200
                hover:border-primary
                hover:bg-primary-light
                hover:text-primary
                sm:w-auto
              "
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            {/* Continue */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={isSubmitting}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary
                px-5
                py-3
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
                disabled:cursor-not-allowed
                disabled:hover:translate-y-0
                sm:w-auto
              "
            >
              {isSubmitting ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>

          </div>

        </div>

        {/* =================================================
            HELP FOOTER
        ================================================== */}

        <div className="mt-8 text-center">

          <p className="text-xs text-text-muted">
            Need help?{" "}
            <Link
              to="/help"
              className="font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Visit Help Centre
            </Link>
          </p>

        </div>

      </main>

    </div>
  );
};

export default OrganizationSetup;