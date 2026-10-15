import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ShieldAlert,
  ArrowLeft,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Lock,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import useAuthStore from "../../stores/authStore";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     AUTH CONTEXT — figure out where to send the user back
  ============================================================ */

  const { isAuthenticated, userType, logout } = useAuthStore();

  const dashboardFor = {
    super_admin: "/admin",
    accountant: "/accountant",
    organization_owner: "/organization",
    organization_user: "/organization",
  };

  const correctDashboard = dashboardFor[userType] || "/";
  const attemptedPath = location.state?.from || null;

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(correctDashboard);
    }
  };

  const handleGoToDashboard = () => navigate(correctDashboard);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  const iconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.6, rotate: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: premiumEase, delay: 0.25 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background-soft">

      {/* ============================================================
          DECORATIVE GLOWS
      ============================================================ */}

      {/* Top-right warning-tinted glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -top-40
          right-[-140px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-warning/10
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom-left primary glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-40
          left-[-120px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-primary/10
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.9, 0.5],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          color: "var(--color-primary)",
        }}
      />

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <div className="relative flex min-h-screen items-center justify-center px-5 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-[560px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* ============================================================
              HERO CARD
          ============================================================ */}

          <motion.div
            variants={cardVariants}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-background
              p-8
              shadow-card-hover
              sm:p-10
            "
          >

            {/* Top warning stripe */}
            <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-warning via-warning/60 to-transparent" />

            {/* ============================================================
                ICON
            ============================================================ */}

            <div className="mb-6 flex justify-center">
              <motion.div
                variants={iconVariants}
                className="relative"
              >
                {/* Outer pulse ring */}
                <motion.div
                  className="
                    absolute
                    inset-0
                    rounded-2xl
                    border-2
                    border-warning/40
                  "
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.35],
                          opacity: [0.6, 0],
                        }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* Icon container */}
                <div
                  className="
                    relative
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-2xl
                    bg-warning-light
                    shadow-[0_12px_32px_rgba(217,119,6,0.18)]
                  "
                >
                  <ShieldAlert
                    className="h-10 w-10 text-warning"
                    strokeWidth={1.9}
                  />
                </div>
              </motion.div>
            </div>

            {/* ============================================================
                STATUS CODE
            ============================================================ */}

            <motion.p
              variants={fadeUpVariants}
              className="
                text-center
                text-[11px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-warning
              "
            >
              Error 403
            </motion.p>

            {/* ============================================================
                TITLE
            ============================================================ */}

            <motion.h1
              variants={fadeUpVariants}
              className="
                mt-2
                text-center
                text-2xl
                font-bold
                leading-[1.15]
                tracking-[-0.025em]
                text-heading
                sm:text-3xl
              "
            >
              You don't have access to this page
            </motion.h1>

            {/* ============================================================
                DESCRIPTION
            ============================================================ */}

            <motion.p
              variants={fadeUpVariants}
              className="
                mx-auto
                mt-3
                max-w-[420px]
                text-center
                text-sm
                leading-6
                text-text-secondary
              "
            >
              {isAuthenticated
                ? "Your account doesn't have permission to view this page. If you think this is a mistake, contact your administrator."
                : "Please log in to continue, or contact your administrator if you believe you should have access."}
            </motion.p>

            {/* ============================================================
                ATTEMPTED PATH (dev-friendly hint)
            ============================================================ */}

            {attemptedPath && (
              <motion.div
                variants={fadeUpVariants}
                className="
                  mx-auto
                  mt-5
                  flex
                  max-w-[420px]
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-border-light
                  bg-background-soft
                  px-3
                  py-2.5
                "
              >
                <Lock
                  className="h-3.5 w-3.5 shrink-0 text-text-muted"
                  strokeWidth={2.2}
                />
                <p className="min-w-0 flex-1 truncate text-[11px] text-text-secondary">
                  <span className="font-semibold text-heading">
                    Attempted:
                  </span>{" "}
                  <code className="font-mono">{attemptedPath}</code>
                </p>
              </motion.div>
            )}

            {/* ============================================================
                PRIMARY ACTIONS
            ============================================================ */}

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              {isAuthenticated ? (
                <>
                  <motion.button
                    type="button"
                    onClick={handleGoToDashboard}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2, transition: { duration: 0.2 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
                    className="
                      group
                      inline-flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-primary
                      px-6
                      text-sm
                      font-semibold
                      text-text-white
                      shadow-button
                      transition-all
                      duration-200
                      hover:bg-primary-hover
                      hover:shadow-[0_8px_22px_rgba(37,99,235,0.28)]
                    "
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Go to my dashboard</span>
                    <ChevronRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-0.5
                      "
                    />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleGoBack}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2, transition: { duration: 0.2 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
                    className="
                      group
                      inline-flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-6
                      text-sm
                      font-semibold
                      text-heading
                      transition-all
                      duration-200
                      hover:border-primary
                      hover:text-primary
                    "
                  >
                    <ArrowLeft
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:-translate-x-0.5
                      "
                    />
                    <span>Go back</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    type="button"
                    onClick={() => navigate("/login")}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2, transition: { duration: 0.2 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
                    className="
                      group
                      inline-flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-primary
                      px-6
                      text-sm
                      font-semibold
                      text-text-white
                      shadow-button
                      transition-all
                      duration-200
                      hover:bg-primary-hover
                      hover:shadow-[0_8px_22px_rgba(37,99,235,0.28)]
                    "
                  >
                    <Lock className="h-4 w-4" />
                    <span>Log in</span>
                    <ChevronRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-0.5
                      "
                    />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => navigate("/")}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2, transition: { duration: 0.2 } }
                    }
                    whileTap={
                      shouldReduceMotion ? undefined : { scale: 0.98 }
                    }
                    className="
                      group
                      inline-flex
                      min-h-[46px]
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-border
                      bg-background
                      px-6
                      text-sm
                      font-semibold
                      text-heading
                      transition-all
                      duration-200
                      hover:border-primary
                      hover:text-primary
                    "
                  >
                    <Home className="h-4 w-4" />
                    <span>Go home</span>
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* ============================================================
                SECONDARY LINKS
            ============================================================ */}

            <motion.div
              variants={fadeUpVariants}
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-3
                border-t
                border-border-light
                pt-6
                text-xs
                text-text-secondary
                sm:flex-row
                sm:justify-between
              "
            >
              <a
                href="/help"
                className="
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  font-semibold
                  text-text-secondary
                  transition-colors
                  hover:text-primary
                "
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Visit Help Centre</span>
                <ChevronRight
                  className="
                    h-3 w-3
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </a>

              <div className="flex items-center gap-4">
                <a
                  href="mailto:support@taxpilot.co.uk"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1.5
                    font-semibold
                    text-text-secondary
                    transition-colors
                    hover:text-primary
                  "
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact support</span>
                </a>

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-1.5
                      font-semibold
                      text-text-secondary
                      transition-colors
                      hover:text-danger
                    "
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log out</span>
                  </button>
                )}
              </div>
            </motion.div>

          </motion.div>

          {/* ============================================================
              FOOTER NOTE
          ============================================================ */}

          <motion.p
            variants={fadeUpVariants}
            className="
              mt-6
              text-center
              text-[11px]
              font-medium
              tracking-wide
              text-text-muted
            "
          >
            Need help? Email{" "}
            <a
              href="mailto:support@taxpilot.co.uk"
              className="
                font-semibold
                text-primary
                transition-colors
                hover:text-primary-hover
                hover:underline
              "
            >
              support@taxpilot.co.uk
            </a>
          </motion.p>

        </motion.div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;