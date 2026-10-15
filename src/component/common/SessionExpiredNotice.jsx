import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { AlertCircle, X, LogIn, Clock, ShieldAlert } from "lucide-react";

const SessionExpiredNotice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const [visible, setVisible] = useState(false);

  /* =========================================================
     SHOW WHEN ?session=expired IS PRESENT
  ========================================================= */

  useEffect(() => {
    if (searchParams.get("session") === "expired") {
      setVisible(true);
    }
  }, [searchParams]);

  /* =========================================================
     LOCK BODY SCROLL WHILE OPEN
  ========================================================= */

  useEffect(() => {
    if (visible) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [visible]);

  /* =========================================================
     CLOSE ON ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!visible) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") handleLater();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  /* =========================================================
     CLEAN QUERY PARAM
  ========================================================= */

  const cleanQueryParam = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("session");
    setSearchParams(next, { replace: true });
  };

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleLoginNow = () => {
    setVisible(false);
    cleanQueryParam();
    navigate("/login", { replace: true });
  };

  const handleLater = () => {
    setVisible(false);
    cleanQueryParam();
    navigate("/", { replace: true });
  };

  /* =========================================================
     ANIMATION VARIANTS
  ========================================================= */

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.94, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: premiumEase,
      },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.96,
          y: 10,
          transition: { duration: 0.22, ease: premiumEase },
        },
  };

  const iconWrapVariants = {
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
        delay: 0.15,
      },
    },
  };

  const contentStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const contentItem = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: premiumEase },
    },
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* =================================================
              BACKDROP
          ================================================== */}
          <motion.div
            key="session-expired-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: premiumEase }}
            className="
              fixed
              inset-0
              z-[400]
              bg-secondary/50
              backdrop-blur-[3px]
            "
            onClick={handleLater}
            aria-hidden="true"
          />

          {/* =================================================
              MODAL
          ================================================== */}
          <motion.div
            key="session-expired-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="session-expired-title"
            aria-describedby="session-expired-desc"
            onClick={(e) => e.stopPropagation()}
            className="
              fixed
              left-1/2
              top-1/2
              z-[410]
              w-[calc(100%-32px)]
              max-w-[440px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-background
              shadow-card-hover
            "
          >
            {/* =============================================
                HEADER STRIPE
            ============================================= */}
            <div className="h-1.5 w-full bg-gradient-to-r from-warning via-warning/60 to-transparent" />

            {/* =============================================
                CLOSE BUTTON
            ============================================= */}
            <button
              type="button"
              onClick={handleLater}
              className="
                absolute
                right-3
                top-3
                z-10
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                text-text-muted
                transition-colors
                hover:bg-background-soft
                hover:text-heading
              "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* =============================================
                CONTENT
            ============================================= */}
            <motion.div
              variants={contentStagger}
              initial="hidden"
              animate="visible"
              className="px-6 py-6 sm:px-7 sm:py-7"
            >
              {/* Icon */}
              <motion.div
                variants={iconWrapVariants}
                className="mx-auto flex h-16 w-16 items-center justify-center"
              >
                <div className="relative">
                  {/* Pulse ring */}
                  <motion.span
                    className="absolute inset-0 rounded-2xl border-2 border-warning/40"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.4],
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
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-warning-light
                      shadow-[0_10px_24px_rgba(217,119,6,0.18)]
                    "
                  >
                    <ShieldAlert
                      className="h-8 w-8 text-warning"
                      strokeWidth={1.9}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                variants={contentItem}
                id="session-expired-title"
                className="
                  mt-5
                  text-center
                  text-xl
                  font-bold
                  leading-tight
                  tracking-[-0.02em]
                  text-heading
                  sm:text-2xl
                "
              >
                Your session has expired
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={contentItem}
                id="session-expired-desc"
                className="
                  mx-auto
                  mt-3
                  max-w-[340px]
                  text-center
                  text-sm
                  leading-6
                  text-text-secondary
                "
              >
                For your security, we've signed you out after a period of
                inactivity. Please log in again to continue where you left off.
              </motion.p>

              {/* Info strip */}
              <motion.div
                variants={contentItem}
                className="
                  mt-5
                  flex
                  items-start
                  gap-2.5
                  rounded-xl
                  border
                  border-border-light
                  bg-background-soft
                  px-3.5
                  py-3
                "
              >
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                  strokeWidth={2.2}
                />
                <p className="text-[11px] leading-5 text-text-secondary">
                  Any unsaved changes may have been lost. Your data and
                  filings remain safe.
                </p>
              </motion.div>

              {/* =========================================
                  ACTIONS
              ========================================= */}
              <motion.div
                variants={contentItem}
                className="mt-6 flex flex-col gap-2.5 sm:flex-row"
              >
                {/* Log in now — primary */}
                <motion.button
                  type="button"
                  onClick={handleLoginNow}
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
                    flex-1
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-primary
                    px-5
                    text-sm
                    font-semibold
                    text-text-white
                    shadow-button
                    transition-colors
                    duration-200
                    hover:bg-primary-hover
                  "
                >
                  <LogIn className="h-4 w-4" strokeWidth={2.4} />
                  <span>Log in now</span>
                </motion.button>

                {/* Later — secondary */}
                <motion.button
                  type="button"
                  onClick={handleLater}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2, transition: { duration: 0.2 } }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
                  className="
                    inline-flex
                    flex-1
                    min-h-[46px]
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-border
                    bg-background
                    px-5
                    text-sm
                    font-semibold
                    text-heading
                    transition-colors
                    duration-200
                    hover:border-primary/40
                    hover:bg-background-soft
                    hover:text-primary
                  "
                >
                  <Clock className="h-4 w-4" strokeWidth={2.4} />
                  <span>Later</span>
                </motion.button>
              </motion.div>

              {/* Footer note */}
              <motion.p
                variants={contentItem}
                className="
                  mt-5
                  text-center
                  text-[10px]
                  font-medium
                  tracking-wide
                  text-text-muted
                "
              >
                Need help?{" "}
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
                  Contact support
                </a>
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SessionExpiredNotice;