import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organisationType: "company",
    businessName: "",
    companyNumber: "",
    tradingName: "",
    accountancyFirm: "no",
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [companySearch, setCompanySearch] = useState("");
  const [isSearchingCompany, setIsSearchingCompany] = useState(false);
  const [companyFound, setCompanyFound] = useState(null);

  // ----------------------------------------
  // Handle input changes
  // ----------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ----------------------------------------
  // Organisation type
  // ----------------------------------------
  const handleOrganisationType = (type) => {
    setFormData((prev) => ({
      ...prev,
      organisationType: type,
      businessName: "",
      companyNumber: "",
      tradingName: "",
    }));

    setCompanySearch("");
    setCompanyFound(null);

    setErrors((prev) => ({
      ...prev,
      organisationType: "",
      businessName: "",
      companyNumber: "",
      tradingName: "",
    }));
  };

  // ----------------------------------------
  // Password strength
  // ----------------------------------------
  const getPasswordStrength = (password) => {
    if (!password) {
      return {
        strength: 0,
        label: "",
      };
    }

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "" },
      { strength: 1, label: "Weak" },
      { strength: 2, label: "Fair" },
      { strength: 3, label: "Good" },
      { strength: 4, label: "Strong" },
      { strength: 5, label: "Very Strong" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // ----------------------------------------
  // Search company
  // ----------------------------------------
  const handleCompanySearch = async () => {
    if (!companySearch.trim()) {
      setErrors((prev) => ({
        ...prev,
        companySearch: "Enter a company name or number",
      }));

      return;
    }

    setIsSearchingCompany(true);
    setCompanyFound(null);

    try {
      /*
       * Replace this section with your Companies House API.
       *
       * Example:
       *
       * const response = await api.get(
       *   `/companies/search?query=${companySearch}`
       * );
       *
       * setCompanyFound(response.data.data);
       */

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Demo result
      setCompanyFound({
        name: companySearch,
        number: "12345678",
      });

      setFormData((prev) => ({
        ...prev,
        businessName: companySearch,
        companyNumber: "12345678",
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        companySearch: "Unable to find the company. Please try again.",
      }));
    } finally {
      setIsSearchingCompany(false);
    }
  };

  // ----------------------------------------
  // Select company
  // ----------------------------------------
  const handleSelectCompany = () => {
    if (!companyFound) return;

    setFormData((prev) => ({
      ...prev,
      businessName: companyFound.name,
      companyNumber: companyFound.number,
    }));

    setCompanySearch(companyFound.name);

    setErrors((prev) => ({
      ...prev,
      companySearch: "",
    }));
  };

  // ----------------------------------------
  // Validate form
  // ----------------------------------------
  const validateForm = () => {
    const newErrors = {};

    // Company
    if (formData.organisationType === "company") {
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Please select your company";
      }

      if (!formData.companyNumber.trim()) {
        newErrors.companyNumber = "Company number is required";
      }
    }

    // Sole trader / partnership
    if (
      formData.organisationType === "soleTrader" ||
      formData.organisationType === "partnership"
    ) {
      if (!formData.tradingName.trim()) {
        newErrors.tradingName = "Trading name is required";
      }
    }

    // First name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name is too short";
    }

    // Surname
    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = "Surname is too short";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------------------
  // Submit
  // ----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      /*
       * Replace this with your real registration API.
       *
       * Example:
       *
       * const response = await api.post("/register", formData);
       *
       * if (response.data.success) {
       *   navigate("/verify-email", {
       *     state: { email: formData.email }
       *   });
       * }
       */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Register data:", formData);

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FCF9] text-[#09263A]">
      {/* =========================================
          HEADER
      ========================================= */}
      <header className="border-b border-[#DDEAE6] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004646] flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>

            <div>
              <span className="text-xl font-bold text-[#004646]">
                ComplyTax
              </span>
              <span className="text-xl font-bold text-[#087F5B] ml-1">
                UK
              </span>
            </div>
          </Link>

          {/* Login */}
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:block text-[#687B78]">
              Already have an account?
            </span>

            <Link
              to="/login"
              className="font-semibold text-[#087F5B] hover:text-[#005E45] transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN
      ========================================= */}
      <main className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#687B78] hover:text-[#087F5B] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          {/* =====================================
              TITLE
          ===================================== */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E5F7F0] flex items-center justify-center mb-5">
              <Building2 className="w-7 h-7 text-[#087F5B]" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#09263A]">
              Create your account
            </h1>

            <p className="mt-3 text-[#687B78]">
              Set up your organisation and get started with ComplyTax UK.
            </p>
          </div>

          {/* =====================================
              FORM CARD
          ===================================== */}
          <div className="bg-white rounded-2xl border border-[#DDEAE6] shadow-[0_12px_40px_rgba(0,70,70,0.08)] p-6 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit}>
              {/* =================================
                  ORGANISATION
              ================================= */}
              <div>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                    Step 1
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#09263A]">
                    Your organisation
                  </h2>

                  <p className="mt-1 text-sm text-[#71827F]">
                    Tell us how you will use ComplyTax.
                  </p>
                </div>

                {/* Organisation type */}
                <div>
                  <label className="block text-sm font-semibold text-[#09263A] mb-3">
                    Organisation type
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        value: "company",
                        label: "Company",
                      },
                      {
                        value: "soleTrader",
                        label: "Sole Trader",
                      },
                      {
                        value: "partnership",
                        label: "Partnership",
                      },
                    ].map((item) => {
                      const selected =
                        formData.organisationType === item.value;

                      return (
                        <button
                          type="button"
                          key={item.value}
                          onClick={() =>
                            handleOrganisationType(item.value)
                          }
                          className={`relative text-left rounded-xl border px-4 py-4 transition-all ${
                            selected
                              ? "border-[#087F5B] bg-[#E8F8F2] ring-1 ring-[#087F5B]"
                              : "border-[#DDEAE6] bg-white hover:border-[#65D9BB] hover:bg-[#F5FCF9]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                selected
                                  ? "border-[#087F5B]"
                                  : "border-[#AFC5BF]"
                              }`}
                            >
                              {selected && (
                                <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
                              )}
                            </span>

                            <span
                              className={`text-sm font-semibold ${
                                selected
                                  ? "text-[#004646]"
                                  : "text-[#09263A]"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Company */}
                {formData.organisationType === "company" && (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-[#09263A] mb-2">
                      Find your company
                    </label>

                    <p className="text-xs text-[#71827F] mb-3">
                      Search using your company name or Companies House
                      number.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={companySearch}
                        onChange={(e) => {
                          setCompanySearch(e.target.value);

                          setErrors((prev) => ({
                            ...prev,
                            companySearch: "",
                          }));
                        }}
                        placeholder="Search company name or number"
                        className={`flex-1 h-12 px-4 rounded-xl border bg-white text-sm text-[#09263A] outline-none transition-all placeholder:text-[#9AAEAA] ${
                          errors.companySearch
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-[#DDEAE6] focus:border-[#087F5B] focus:ring-4 focus:ring-[#087F5B]/10"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={handleCompanySearch}
                        disabled={isSearchingCompany}
                        className="h-12 px-5 rounded-xl bg-[#004646] text-white text-sm font-semibold hover:bg-[#005E45] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSearchingCompany
                          ? "Searching..."
                          : "Search"}
                      </button>
                    </div>

                    {errors.companySearch && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.companySearch}
                      </p>
                    )}

                    {/* Search result */}
                    {companyFound && (
                      <button
                        type="button"
                        onClick={handleSelectCompany}
                        className="w-full mt-3 text-left rounded-xl border border-[#BFE7D8] bg-[#F5FCF9] p-4 hover:bg-[#E8F8F2] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-[#09263A]">
                              {companyFound.name}
                            </p>

                            <p className="mt-1 text-sm text-[#687B78]">
                              Company number: {companyFound.number}
                            </p>
                          </div>

                          <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0" />
                        </div>
                      </button>
                    )}

                    {/* Hidden/selected company info */}
                    {formData.businessName && (
                      <div className="mt-4 grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#09263A] mb-2">
                            Business name
                          </label>

                          <input
                            type="text"
                            value={formData.businessName}
                            readOnly
                            className="w-full h-12 px-4 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] text-sm text-[#687B78] outline-none"
                          />

                          {errors.businessName && (
                            <p className="mt-2 text-xs text-red-600">
                              {errors.businessName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#09263A] mb-2">
                            Company number
                          </label>

                          <input
                            type="text"
                            value={formData.companyNumber}
                            readOnly
                            className="w-full h-12 px-4 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] text-sm text-[#687B78] outline-none"
                          />

                          {errors.companyNumber && (
                            <p className="mt-2 text-xs text-red-600">
                              {errors.companyNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sole trader / Partnership */}
                {(formData.organisationType === "soleTrader" ||
                  formData.organisationType === "partnership") && (
                  <div className="mt-6">
                    <CustomInput
                      label="Trading Name"
                      name="tradingName"
                      type="text"
                      value={formData.tradingName}
                      onChange={handleChange}
                      placeholder="Enter your trading name"
                      className={
                        errors.tradingName
                          ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                          : ""
                      }
                    />

                    {errors.tradingName && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.tradingName}
                      </p>
                    )}
                  </div>
                )}

                {/* Accountancy firm */}
                <div className="mt-7">
                  <label className="block text-sm font-semibold text-[#09263A] mb-3">
                    Are you an accountancy firm?
                  </label>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="accountancyFirm"
                        value="yes"
                        checked={formData.accountancyFirm === "yes"}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#087F5B]"
                      />

                      <span className="text-sm text-[#687B78]">
                        Yes — I file for clients
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="accountancyFirm"
                        value="no"
                        checked={formData.accountancyFirm === "no"}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#087F5B]"
                      />

                      <span className="text-sm text-[#687B78]">
                        No — Filing for myself
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* =================================
                  DIVIDER
              ================================= */}
              <div className="my-9 border-t border-[#DDEAE6]" />

              {/* =================================
                  PERSONAL DETAILS
              ================================= */}
              <div>
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                    Step 2
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#09263A]">
                    Your details
                  </h2>

                  <p className="mt-1 text-sm text-[#71827F]">
                    Enter the details you'll use to access your account.
                  </p>
                </div>

                {/* First + surname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <CustomInput
                      label="First Name"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className={
                        errors.firstName
                          ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                          : ""
                      }
                    />

                    {errors.firstName && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <CustomInput
                      label="Surname"
                      name="surname"
                      type="text"
                      autoComplete="family-name"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Surname"
                      className={
                        errors.surname
                          ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                          : ""
                      }
                    />

                    {errors.surname && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.surname}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mt-5">
                  <CustomInput
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={
                      errors.email
                        ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                        : ""
                    }
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* =================================
                  PASSWORD
              ================================= */}
              <div className="my-9 border-t border-[#DDEAE6] pt-9">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                    Step 3
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#09263A]">
                    Set your password
                  </h2>

                  <p className="mt-1 text-sm text-[#71827F]">
                    Choose a strong password to keep your account secure.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <CustomInput
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`pr-12 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                          : ""
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-[38px] text-[#71827F] hover:text-[#087F5B]"
                    >
                      
                    </button>
                  </div>

                  {/* Strength */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div
                            key={item}
                            className={`h-1.5 flex-1 rounded-full ${
                              item <= passwordStrength.strength
                                ? "bg-[#087F5B]"
                                : "bg-[#DDEAE6]"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-2 text-xs text-[#71827F]">
                        Password strength:{" "}
                        <span className="font-semibold text-[#087F5B]">
                          {passwordStrength.label}
                        </span>
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm */}
                <div className="mt-5">
                  <div className="relative">
                    <CustomInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`pr-12 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-200/50 focus:border-red-400"
                          : ""
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-[38px] text-[#71827F] hover:text-[#087F5B]"
                    >
                     
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* =================================
                  TERMS
              ================================= */}
              <div className="rounded-xl bg-[#F5FCF9] border border-[#DDEAE6] p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-[#AFC5BF] accent-[#087F5B]"
                  />

                  <span className="text-sm leading-6 text-[#687B78]">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-[#087F5B] hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold text-[#087F5B] hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* =================================
                  SUBMIT
              ================================= */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-[#087F5B] text-white font-semibold text-base shadow-lg shadow-[#087F5B]/15 hover:bg-[#005E45] focus:outline-none focus:ring-4 focus:ring-[#087F5B]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 pt-6 border-t border-[#DDEAE6] text-center">
              <p className="text-sm text-[#687B78]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#087F5B] hover:text-[#005E45] transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#71827F]">
            <CheckCircle2 className="w-4 h-4 text-[#087F5B]" />
            Your information is securely protected
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;