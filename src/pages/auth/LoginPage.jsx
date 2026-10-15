import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  LogIn,
  ArrowLeft,
} from "lucide-react";

import CustomInput from "../../component/form/CustomInput";
import useAuthStore from "../../stores/authStore";

const LoginPage = () => {
  // ============================================================
  // FORM STATE
  // ============================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ============================================================
  // ZUSTAND AUTH
  // ============================================================

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.loading);
  const storeError = useAuthStore((state) => state.error);

  // ============================================================
  // ROUTER
  // ============================================================

  const navigate = useNavigate();

  // ============================================================
  // MOTION
  // ============================================================

  const shouldReduceMotion = useReducedMotion();

  const premiumEase = [0.22, 1, 0.36, 1];

  // ============================================================
  // ANIMATION VARIANTS
  // ============================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          y: 20,
        },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        ease: premiumEase,
      },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          y: 32,
          scale: 0.97,
        },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.75,
        ease: premiumEase,
        delay: 0.15,
      },
    },
  };

  const logoVariants = {
    hidden: shouldReduceMotion
      ? {
          opacity: 0,
        }
      : {
          opacity: 0,
          scale: 0.6,
          rotate: -12,
        },

    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,

      transition: {
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.35,
      },
    },
  };

  // ============================================================
  // HANDLE INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear API error from Zustand when user starts typing
    if (storeError) {
      useAuthStore.getState().clearError();
    }
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Clear previous API error
    useAuthStore.getState().clearError();

    // Call Zustand login
    const result = await login({
      email: formData.email.trim(),
      password: formData.password,
    });

    // Login failed
    if (!result.success) {
      return;
    }

    // ============================================================
    // SUPER ADMIN / WEBSITE OWNER
    // ============================================================

    if (result.userType === "super_admin") {
      navigate("/admin", {
        replace: true,
      });

      return;
    }

    // ============================================================
    // ACCOUNTANT
    // ============================================================
    // This is already prepared for your future accountant role.

    if (result.userType === "accountant") {
      navigate("/accountant", {
        replace: true,
      });

      return;
    }

    // ============================================================
    // ORGANISATION OWNER
    // ============================================================

    if (result.userType === "organization_owner") {
      navigate("/organization", {
        replace: true,
      });

      return;
    }

    // ============================================================
    // ORGANISATION USER / EMPLOYEE
    // ============================================================

    if (result.userType === "organization_user") {
      navigate("/organization", {
        replace: true,
      });

      return;
    }

    // ============================================================
    // UNKNOWN USER
    // ============================================================

    navigate("/", {
      replace: true,
    });
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-background-soft
        via-background-blue-pale
        to-background-soft
        py-12
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* ========================================================
          BACKGROUND DECORATION
      ======================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Right Glow */}

        <motion.div
          className="
            absolute
            -top-40
            -right-40
            w-80
            h-80
            bg-sky/20
            rounded-full
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom Left Glow */}

        <motion.div
          className="
            absolute
            -bottom-40
            -left-40
            w-80
            h-80
            bg-primary/10
            rounded-full
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.5, 1, 0.5],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
      </div>

      {/* ========================================================
          LOGIN CONTAINER
      ======================================================== */}

      <motion.div
        className="max-w-md w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ======================================================
            BACK BUTTON
        ====================================================== */}

        <motion.button
          variants={itemVariants}
          type="button"
          onClick={() => navigate("/")}
          className="
            group
            mb-6
            flex
            items-center
            space-x-2
            text-text-secondary
            transition-colors
            hover:text-primary
          "
        >
          <ArrowLeft
            className="
              w-5
              h-5
              transition-transform
              group-hover:-translate-x-1
            "
          />

          <span className="font-medium">
            Back to Home
          </span>
        </motion.button>

        {/* ======================================================
            LOGIN CARD
        ====================================================== */}

        <motion.div
          variants={cardVariants}
          className="
            bg-background/90
            backdrop-blur-lg
            rounded-2xl
            shadow-card-hover
            p-8
            border
            border-border-light
          "
        >
          {/* ====================================================
              LOGO AND TITLE
          ==================================================== */}

          <div className="text-center mb-8">
            {/* Logo */}

            <motion.div
              variants={logoVariants}
              className="flex justify-center mb-4"
            >
              <div
                className="
                  p-3
                  bg-gradient-to-br
                  from-primary
                  to-primary-hover
                  rounded-2xl
                  shadow-button
                "
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="white"
                    strokeWidth="3"
                  />

                  <path
                    d="M16 24L24 14L32 24L24 34L16 24Z"
                    fill="white"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Heading */}

            <motion.h2
              variants={itemVariants}
              className="
                text-3xl
                font-bold
                text-heading
                mb-2
              "
            >
              Welcome Back
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary"
            >
              Sign in to continue to TaxPilot
            </motion.p>
          </div>

          {/* ====================================================
              API ERROR
          ==================================================== */}

          {storeError && (
            <motion.div
              variants={itemVariants}
              className="
                mb-5
                rounded-lg
                border
                border-danger/20
                bg-danger/5
                px-4
                py-3
                text-sm
                text-danger
              "
            >
              {storeError}
            </motion.div>
          )}

          {/* ====================================================
              LOGIN FORM
          ==================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* ==================================================
                EMAIL
            ================================================== */}

            <motion.div variants={itemVariants}>
              <CustomInput
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                disabled={isLoading}
                className={
                  errors.email
                    ? "border-danger focus:ring-danger/20 focus:border-danger"
                    : "border-border focus:ring-primary/20 focus:border-primary"
                }
              />

              {errors.email && (
                <p className="mt-2 text-sm text-danger flex items-center">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full mr-2" />

                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* ==================================================
                PASSWORD
            ================================================== */}

            <motion.div variants={itemVariants}>
              <CustomInput
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                disabled={isLoading}
                className={
                  errors.password
                    ? "border-danger focus:ring-danger/20 focus:border-danger"
                    : "border-border focus:ring-primary/20 focus:border-primary"
                }
              />

              {errors.password && (
                <p className="mt-2 text-sm text-danger flex items-center">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full mr-2" />

                  {errors.password}
                </p>
              )}
            </motion.div>

            {/* ==================================================
                REMEMBER ME + FORGOT PASSWORD
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isLoading}
                  className="
                    h-4
                    w-4
                    text-primary
                    focus:ring-primary
                    border-border
                    rounded
                    cursor-pointer
                    accent-primary
                  "
                />

                <label
                  htmlFor="remember-me"
                  className="
                    ml-2
                    block
                    text-sm
                    text-text-secondary
                    cursor-pointer
                  "
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="
                    font-semibold
                    text-primary
                    transition-colors
                    hover:text-primary-hover
                  "
                >
                  Forgot password?
                </a>
              </div>
            </motion.div>

            {/* ==================================================
                SUBMIT BUTTON
            ================================================== */}

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={
                  shouldReduceMotion || isLoading
                    ? undefined
                    : {
                        y: -2,
                        transition: {
                          duration: 0.2,
                        },
                      }
                }
                whileTap={
                  shouldReduceMotion || isLoading
                    ? undefined
                    : {
                        scale: 0.98,
                      }
                }
                className="
                  group
                  w-full
                  flex
                  justify-center
                  items-center
                  space-x-2
                  py-3
                  px-4
                  border
                  border-transparent
                  rounded-lg
                  shadow-button
                  text-text-white
                  bg-gradient-to-r
                  from-primary
                  to-primary-hover
                  hover:from-primary-hover
                  hover:to-primary
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-primary
                  transition-all
                  duration-300
                  font-semibold
                  text-lg
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {isLoading ? (
                  <>
                    <div
                      className="
                        animate-spin
                        rounded-full
                        h-5
                        w-5
                        border-b-2
                        border-white
                      "
                    />

                    <span>
                      Signing in...
                    </span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />

                    <span>
                      Sign In
                    </span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* ====================================================
              DIVIDER
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="mt-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-text-light">
                  Or continue with
                </span>
              </div>
            </div>
          </motion.div>

          {/* ====================================================
              SIGN UP
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <p className="text-sm text-text-secondary">
              Don't have an account?{" "}

              <a
                href="/register"
                className="
                  font-semibold
                  text-primary
                  transition-colors
                  hover:text-primary-hover
                "
              >
                Sign up now
              </a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;