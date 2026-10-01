import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

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

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const pageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, ease: premiumEase },
    },
  };

  const sectionVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

  const logoVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.6, rotate: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.25,
      },
    },
  };

  /* ============================================================
     HANDLERS
  ============================================================ */

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

  const getPasswordStrength = (password) => {
    if (!password) {
      return { strength: 0, label: "" };
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
      await new Promise((resolve) => setTimeout(resolve, 700));

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

  const validateForm = () => {
    const newErrors = {};

    if (formData.organisationType === "company") {
      if (!formData.businessName.trim()) {
        newErrors.businessName = "Please select your company";
      }
      if (!formData.companyNumber.trim()) {
        newErrors.companyNumber = "Company number is required";
      }
    }

    if (
      formData.organisationType === "soleTrader" ||
      formData.organisationType === "partnership"
    ) {
      if (!formData.tradingName.trim()) {
        newErrors.tradingName = "Trading name is required";
      }
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name is too short";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = "Surname is too short";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
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
    <div className="min-h-screen bg-background-soft text-heading">
      {/* =========================================
          HEADER
      ========================================= */}
      <motion.header
        className="border-b border-border bg-background"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: premiumEase }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.05, transition: { duration: 0.2 } }
              }
              className="
                w-10
                h-10
                rounded-xl
                bg-dark
                flex
                items-center
                justify-center
              "
            >
              <span className="text-text-white font-bold text-lg">C</span>
            </motion.div>

            <div>
              <span className="text-xl font-bold text-dark">ComplyTax</span>
              <span className="text-xl font-bold text-primary ml-1">UK</span>
            </div>
          </Link>

          {/* Login */}
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:block text-text-secondary">
              Already have an account?
            </span>

            <Link
              to="/login"
              className="
                font-semibold
                text-primary
                transition-colors
                hover:text-primary-hover
              "
            >
              Log in
            </Link>
          </div>
        </div>
      </motion.header>

      {/* =========================================
          MAIN
      ========================================= */}
      <main className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back */}
          <motion.button
            variants={fadeUpVariants}
            type="button"
            onClick={() => navigate("/")}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-text-secondary
              transition-colors
              hover:text-primary
              mb-8
            "
          >
            <ArrowLeft
              className="
                w-4
                h-4
                transition-transform
                group-hover:-translate-x-1
              "
            />
            Back to home
          </motion.button>

          {/* =====================================
              TITLE
          ===================================== */}
          <motion.div
            variants={fadeUpVariants}
            className="text-center mb-8"
          >
            <motion.div
              variants={logoVariants}
              className="
                w-14
                h-14
                mx-auto
                rounded-2xl
                bg-primary-light
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <Building2 className="w-7 h-7 text-primary" />
            </motion.div>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                tracking-tight
                text-heading
              "
            >
              Create your account
            </h1>

            <p className="mt-3 text-text-secondary">
              Set up your organisation and get started with ComplyTax UK.
            </p>
          </motion.div>

          {/* =====================================
              FORM CARD
          ===================================== */}
          <motion.div
            variants={cardVariants}
            className="
              bg-background
              rounded-2xl
              border
              border-border
              shadow-card-hover
              p-6
              sm:p-8
              lg:p-10
            "
          >
            <form onSubmit={handleSubmit}>
              {/* =================================
                  ORGANISATION
              ================================= */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="mb-6">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-primary
                    "
                  >
                    Step 1
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-heading">
                    Your organisation
                  </h2>

                  <p className="mt-1 text-sm text-text-secondary">
                    Tell us how you will use ComplyTax.
                  </p>
                </div>

                {/* Organisation type */}
                <div>
                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-heading
                      mb-3
                    "
                  >
                    Organisation type
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "company", label: "Company" },
                      { value: "soleTrader", label: "Sole Trader" },
                      { value: "partnership", label: "Partnership" },
                    ].map((item) => {
                      const selected =
                        formData.organisationType === item.value;

                      return (
                        <motion.button
                          type="button"
                          key={item.value}
                          onClick={() =>
                            handleOrganisationType(item.value)
                          }
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : { y: -2, transition: { duration: 0.2 } }
                          }
                          whileTap={
                            shouldReduceMotion
                              ? undefined
                              : { scale: 0.98 }
                          }
                          animate={{
                            backgroundColor: selected
                              ? "var(--color-primary-light)"
                              : "#ffffff",
                            borderColor: selected
                              ? "var(--color-primary)"
                              : "var(--color-border)",
                            boxShadow: selected
                              ? "0 0 0 1px var(--color-primary)"
                              : "none",
                          }}
                          transition={{ duration: 0.3, ease: premiumEase }}
                          className="
                            relative
                            text-left
                            rounded-xl
                            border
                            px-4
                            py-4
                            transition-all
                          "
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`
                                w-4
                                h-4
                                rounded-full
                                border
                                flex
                                items-center
                                justify-center
                                transition-colors
                                ${selected ? "border-primary" : "border-border-dark"}
                              `}
                            >
                              {selected && (
                                <motion.span
                                  layoutId="orgTypeDot"
                                  className="w-2 h-2 rounded-full bg-primary"
                                  transition={{
                                    duration: 0.25,
                                    ease: premiumEase,
                                  }}
                                />
                              )}
                            </span>

                            <span
                              className={`
                                text-sm
                                font-semibold
                                transition-colors
                                ${selected ? "text-primary" : "text-heading"}
                              `}
                            >
                              {item.label}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Company */}
                {formData.organisationType === "company" && (
                  <motion.div
                    className="mt-6"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                  >
                    <label
                      className="
                        block
                        text-sm
                        font-semibold
                        text-heading
                        mb-2
                      "
                    >
                      Find your company
                    </label>

                    <p className="text-xs text-text-secondary mb-3">
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
                        className={`
                          flex-1
                          h-12
                          px-4
                          rounded-xl
                          border
                          bg-background
                          text-sm
                          text-heading
                          outline-none
                          transition-all
                          placeholder:text-text-light
                          ${
                            errors.companySearch
                              ? "border-danger focus:ring-4 focus:ring-danger/10"
                              : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
                          }
                        `}
                      />

                      <motion.button
                        type="button"
                        onClick={handleCompanySearch}
                        disabled={isSearchingCompany}
                        whileHover={
                          shouldReduceMotion || isSearchingCompany
                            ? undefined
                            : { y: -2, transition: { duration: 0.2 } }
                        }
                        whileTap={
                          shouldReduceMotion || isSearchingCompany
                            ? undefined
                            : { scale: 0.98 }
                        }
                        className="
                          h-12
                          px-5
                          rounded-xl
                          bg-dark
                          text-text-white
                          text-sm
                          font-semibold
                          transition-colors
                          hover:bg-dark-hover
                          disabled:opacity-60
                          disabled:cursor-not-allowed
                        "
                      >
                        {isSearchingCompany ? "Searching..." : "Search"}
                      </motion.button>
                    </div>

                    {errors.companySearch && (
                      <p className="mt-2 text-xs text-danger">
                        {errors.companySearch}
                      </p>
                    )}

                    {/* Search result */}
                    {companyFound && (
                      <motion.button
                        type="button"
                        onClick={handleSelectCompany}
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: 8, scale: 0.97 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: premiumEase }}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -2, transition: { duration: 0.2 } }
                        }
                        className="
                          w-full
                          mt-3
                          text-left
                          rounded-xl
                          border
                          border-primary/30
                          bg-background-soft
                          p-4
                          transition-colors
                          hover:bg-primary-light
                        "
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-heading">
                              {companyFound.name}
                            </p>
                            <p className="mt-1 text-sm text-text-secondary">
                              Company number: {companyFound.number}
                            </p>
                          </div>

                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        </div>
                      </motion.button>
                    )}

                    {/* Selected company info */}
                    {formData.businessName && (
                      <motion.div
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, y: 8 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: premiumEase,
                          delay: 0.1,
                        }}
                        className="mt-4 grid sm:grid-cols-2 gap-4"
                      >
                        <div>
                          <label
                            className="
                              block
                              text-sm
                              font-semibold
                              text-heading
                              mb-2
                            "
                          >
                            Business name
                          </label>
                          <input
                            type="text"
                            value={formData.businessName}
                            readOnly
                            className="
                              w-full
                              h-12
                              px-4
                              rounded-xl
                              border
                              border-border
                              bg-background-soft
                              text-sm
                              text-text-secondary
                              outline-none
                            "
                          />
                          {errors.businessName && (
                            <p className="mt-2 text-xs text-danger">
                              {errors.businessName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className="
                              block
                              text-sm
                              font-semibold
                              text-heading
                              mb-2
                            "
                          >
                            Company number
                          </label>
                          <input
                            type="text"
                            value={formData.companyNumber}
                            readOnly
                            className="
                              w-full
                              h-12
                              px-4
                              rounded-xl
                              border
                              border-border
                              bg-background-soft
                              text-sm
                              text-text-secondary
                              outline-none
                            "
                          />
                          {errors.companyNumber && (
                            <p className="mt-2 text-xs text-danger">
                              {errors.companyNumber}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Sole trader / Partnership */}
                {(formData.organisationType === "soleTrader" ||
                  formData.organisationType === "partnership") && (
                  <motion.div
                    className="mt-6"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 12 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                  >
                    <CustomInput
                      label="Trading Name"
                      name="tradingName"
                      type="text"
                      value={formData.tradingName}
                      onChange={handleChange}
                      placeholder="Enter your trading name"
                      className={
                        errors.tradingName
                          ? "border-danger focus:ring-danger/20 focus:border-danger"
                          : ""
                      }
                    />

                    {errors.tradingName && (
                      <p className="mt-2 text-xs text-danger">
                        {errors.tradingName}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Accountancy firm */}
                <div className="mt-7">
                  <label
                    className="
                      block
                      text-sm
                      font-semibold
                      text-heading
                      mb-3
                    "
                  >
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
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-text-secondary">
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
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-text-secondary">
                        No — Filing for myself
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="my-9 border-t border-border" />

              {/* =================================
                  PERSONAL DETAILS
              ================================= */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="mb-6">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-primary
                    "
                  >
                    Step 2
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-heading">
                    Your details
                  </h2>

                  <p className="mt-1 text-sm text-text-secondary">
                    Enter the details you'll use to access your account.
                  </p>
                </div>

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
                          ? "border-danger focus:ring-danger/20 focus:border-danger"
                          : ""
                      }
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-xs text-danger">
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
                          ? "border-danger focus:ring-danger/20 focus:border-danger"
                          : ""
                      }
                    />
                    {errors.surname && (
                      <p className="mt-2 text-xs text-danger">
                        {errors.surname}
                      </p>
                    )}
                  </div>
                </div>

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
                        ? "border-danger focus:ring-danger/20 focus:border-danger"
                        : ""
                    }
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* =================================
                  PASSWORD
              ================================= */}
              <div className="my-9 border-t border-border pt-9">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="mb-6">
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-primary
                      "
                    >
                      Step 3
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-heading">
                      Set your password
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
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
                            ? "border-danger focus:ring-danger/20 focus:border-danger"
                            : ""
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="
                          absolute
                          right-4
                          top-[38px]
                          text-text-secondary
                          transition-colors
                          hover:text-primary
                        "
                      >
                       
                      </button>
                    </div>

                    {/* Strength */}
                    {formData.password && (
                      <motion.div
                        className="mt-3"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: -6 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: premiumEase }}
                      >
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <motion.div
                              key={item}
                              animate={{
                                backgroundColor:
                                  item <= passwordStrength.strength
                                    ? "var(--color-primary)"
                                    : "var(--color-border)",
                              }}
                              transition={{ duration: 0.3 }}
                              className="h-1.5 flex-1 rounded-full"
                            />
                          ))}
                        </div>

                        <p className="mt-2 text-xs text-text-secondary">
                          Password strength:{" "}
                          <span className="font-semibold text-primary">
                            {passwordStrength.label}
                          </span>
                        </p>
                      </motion.div>
                    )}

                    {errors.password && (
                      <p className="mt-2 text-xs text-danger">
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
                            ? "border-danger focus:ring-danger/20 focus:border-danger"
                            : ""
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        className="
                          absolute
                          right-4
                          top-[38px]
                          text-text-secondary
                          transition-colors
                          hover:text-primary
                        "
                      >
                        
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="mt-2 text-xs text-danger">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* =================================
                  TERMS
              ================================= */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="
                  rounded-xl
                  bg-background-soft
                  border
                  border-border
                  p-4
                "
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="
                      mt-1
                      w-4
                      h-4
                      rounded
                      border-border
                      accent-primary
                    "
                  />
                  <span className="text-sm leading-6 text-text-secondary">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="
                        font-semibold
                        text-primary
                        transition-colors
                        hover:underline
                      "
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="
                        font-semibold
                        text-primary
                        transition-colors
                        hover:underline
                      "
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </motion.div>

              {/* =================================
                  SUBMIT
              ================================= */}
              <motion.button
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                type="submit"
                disabled={isLoading}
                whileHover={
                  shouldReduceMotion || isLoading
                    ? undefined
                    : { y: -2, transition: { duration: 0.2 } }
                }
                whileTap={
                  shouldReduceMotion || isLoading
                    ? undefined
                    : { scale: 0.98 }
                }
                className="
                  mt-6
                  w-full
                  h-13
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-primary
                  text-text-white
                  font-semibold
                  text-base
                  shadow-button
                  hover:bg-primary-hover
                  focus:outline-none
                  focus:ring-4
                  focus:ring-primary/20
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition-colors
                "
              >
                {isLoading ? (
                  <>
                    <span
                      className="
                        w-5
                        h-5
                        rounded-full
                        border-2
                        border-text-white/30
                        border-t-text-white
                        animate-spin
                      "
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                    <ArrowRight
                      className="
                        w-4
                        h-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login */}
            <div
              className="
                mt-7
                pt-6
                border-t
                border-border
                text-center
              "
            >
              <p className="text-sm text-text-secondary">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="
                    font-semibold
                    text-primary
                    transition-colors
                    hover:text-primary-hover
                  "
                >
                  Log in
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            variants={fadeUpVariants}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-text-secondary
            "
          >
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Your information is securely protected
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterPage;