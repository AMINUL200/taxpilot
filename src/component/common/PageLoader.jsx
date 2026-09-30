import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Check,
  PoundSterling,
  ShieldCheck,
  Send,
  Building2,
  Calculator,
} from "lucide-react";

/* ============================================================
   TaxPilot Loader — "Filing in Motion"
   Blue Brand Edition
   4-stage sequence:
   1. Prepare  → document opens
   2. Calculate → numbers stamp in
   3. Verify   → shield approves
   4. Submit   → sent to HMRC
   ============================================================ */

const TaxPilotLoader = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);

  /* ============================================================
     SEQUENCE TIMING
  ============================================================ */

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 450),  // document appears
      setTimeout(() => setStage(2), 1100), // numbers calculate
      setTimeout(() => setStage(3), 1750), // shield verifies
      setTimeout(() => setStage(4), 2400), // submission
    ];

    const complete = setTimeout(() => {
      onComplete?.();
    }, 3100);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(complete);
    };
  }, [onComplete]);

  const premiumEase = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#F6F9FF]
      "
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: premiumEase }}
    >
      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}

      {/* Primary blue glow */}
      <motion.div
        className="
          absolute
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#2563EB]/[0.08]
          blur-[100px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.9, 0.6],
              }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary light blue glow */}
      <motion.div
        className="
          absolute
          right-[18%]
          top-[22%]
          h-[280px]
          w-[280px]
          rounded-full
          bg-[#60A5FA]/[0.10]
          blur-[80px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Deep navy ambience on the left */}
      <motion.div
        className="
          absolute
          left-[12%]
          bottom-[18%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#0F2747]/[0.06]
          blur-[90px]
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.75, 0.5],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* Fine grid texture — subtle blue */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#2563EB 1px, transparent 1px),
            linear-gradient(90deg, #2563EB 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ============================================================
          MAIN STAGE
      ============================================================ */}

      <div className="relative z-10 flex w-[380px] flex-col items-center">

        {/* ============================================================
            SCENE — The Filing Document
        ============================================================ */}

        <div className="relative h-[240px] w-[320px]">

          {/* Concentric orbit rings — light blue */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-[#2563EB]/[0.10]
              "
              style={{
                width: 160 + ring * 45,
                height: 160 + ring * 45,
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [0.98, 1.03, 0.98],
                      opacity: [0.35, 0.7, 0.35],
                    }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.25,
              }}
            />
          ))}

          {/* Orbiting satellite dot — TaxPilot Blue */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            animate={
              shouldReduceMotion
                ? undefined
                : { rotate: 360 }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "0 0" }}
          >
            <div
              className="
                h-[8px]
                w-[8px]
                rounded-full
                bg-[#2563EB]
                shadow-[0_0_14px_rgba(37,99,235,0.55)]
              "
              style={{ marginLeft: 100 }}
            />
          </motion.div>

          {/* ============================================================
              CENTRAL TAX DOCUMENT
          ============================================================ */}

          <motion.div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-[150px]
              w-[118px]
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              overflow-hidden
              rounded-[16px]
              border
              border-[#DCE5F0]
              bg-white
              shadow-[0_24px_60px_rgba(37,99,235,0.14),0_4px_12px_rgba(15,39,71,0.06)]
            "
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.9, rotateX: 12 }
            }
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.75, ease: premiumEase }}
          >
            {/* Top brand strip — TaxPilot Blue gradient */}
            <div className="h-[6px] w-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6]" />

            <div className="flex flex-1 flex-col p-3.5">

              {/* Document header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#2563EB]">
                    <Building2 size={9} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="h-[6px] w-[36px] rounded-full bg-[#10233F]" />
                </div>

                <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-[#2563EB]">
                  CT600
                </span>
              </div>

              {/* Reference line */}
              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-[4px] w-[18px] rounded-full bg-[#60A5FA]/60" />
                <div className="h-[4px] w-[52px] rounded-full bg-[#E8EEF6]" />
              </div>

              {/* Form rows — cascade in */}
              <div className="mt-3 space-y-[6px]">
                {[0, 1, 2].map((row) => (
                  <motion.div
                    key={row}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.55 + row * 0.12,
                      duration: 0.4,
                      ease: premiumEase,
                    }}
                  >
                    <div className="h-[3px] w-[8px] rounded-full bg-[#2563EB]/40" />
                    <div
                      className="h-[3px] rounded-full bg-[#E8EEF6]"
                      style={{ width: `${58 - row * 10}%` }}
                    />
                    <div className="ml-auto h-[3px] w-[10px] rounded-full bg-[#60A5FA]/70" />
                  </motion.div>
                ))}
              </div>

              {/* Tax amount stamp */}
              <motion.div
                className="
                  mt-auto
                  flex
                  items-center
                  justify-between
                  rounded-[8px]
                  border
                  border-[#2563EB]/15
                  bg-[#EEF5FF]
                  px-2
                  py-1.5
                "
                initial={{ opacity: 0, scale: 0.85 }}
                animate={
                  stage >= 2
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                transition={{ duration: 0.45, ease: premiumEase }}
              >
                <div className="flex items-center gap-1">
                  <PoundSterling size={8} className="text-[#2563EB]" strokeWidth={3} />
                  <span className="text-[7px] font-bold uppercase tracking-wider text-[#10233F]">
                    Total tax
                  </span>
                </div>
                <span className="text-[9px] font-extrabold tracking-tight text-[#2563EB]">
                  £2,480
                </span>
              </motion.div>

              {/* VERIFIED stamp — deep navy border, gold-free */}
              <motion.div
                className="
                  absolute
                  right-2
                  bottom-2
                  rotate-[-12deg]
                  rounded
                  border-2
                  border-[#0F2747]
                  px-1.5
                  py-[2px]
                "
                initial={{ opacity: 0, scale: 1.4, rotate: -30 }}
                animate={
                  stage >= 3
                    ? { opacity: 1, scale: 1, rotate: -12 }
                    : { opacity: 0, scale: 1.4, rotate: -30 }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <span className="text-[6px] font-extrabold uppercase tracking-[0.12em] text-[#0F2747]">
                  Verified
                </span>
              </motion.div>

            </div>
          </motion.div>

          {/* ============================================================
              FLOATING STATUS CARD — Step 01
          ============================================================ */}

          <motion.div
            className="
              absolute
              left-[8px]
              top-[52px]
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#DCE5F0]
              bg-white
              px-2.5
              py-2
              shadow-[0_10px_28px_rgba(37,99,235,0.10)]
            "
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={
              stage >= 1
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: -20, scale: 0.9 }
            }
            transition={{ duration: 0.5, ease: premiumEase }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF5FF]">
              <Check size={11} strokeWidth={3} className="text-[#2563EB]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Step 01
              </span>
              <span className="text-[10px] font-bold text-[#10233F]">
                Records ready
              </span>
            </div>
          </motion.div>

          {/* ============================================================
              FLOATING STATUS CARD — Step 02
          ============================================================ */}

          <motion.div
            className="
              absolute
              right-[8px]
              top-[100px]
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#DCE5F0]
              bg-white
              px-2.5
              py-2
              shadow-[0_10px_28px_rgba(37,99,235,0.10)]
            "
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={
              stage >= 2
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 20, scale: 0.9 }
            }
            transition={{ duration: 0.5, ease: premiumEase }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8F0FA]">
              <Calculator size={11} strokeWidth={2.5} className="text-[#0F2747]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Step 02
              </span>
              <span className="text-[10px] font-bold text-[#10233F]">
                Tax calculated
              </span>
            </div>
          </motion.div>

          {/* ============================================================
              FLOATING STATUS CARD — Step 03
          ============================================================ */}

          <motion.div
            className="
              absolute
              right-[16px]
              bottom-[20px]
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#DCE5F0]
              bg-white
              px-2.5
              py-2
              shadow-[0_10px_28px_rgba(37,99,235,0.10)]
            "
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={
              stage >= 3
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 16, scale: 0.9 }
            }
            transition={{ duration: 0.5, ease: premiumEase }}
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF5FF]">
              <ShieldCheck size={11} strokeWidth={2.5} className="text-[#2563EB]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Step 03
              </span>
              <span className="text-[10px] font-bold text-[#10233F]">
                Compliance verified
              </span>
            </div>
          </motion.div>

          {/* ============================================================
              Submission pulse
          ============================================================ */}

          {stage >= 4 && (
            <motion.div
              className="
                absolute
                left-1/2
                top-1/2
                h-[60px]
                w-[60px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border-2
                border-[#2563EB]
              "
              initial={{ opacity: 0.8, scale: 0.5 }}
              animate={{ opacity: 0, scale: 3.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}

          {/* ============================================================
              Submission button
          ============================================================ */}

          <motion.div
            className="
              absolute
              bottom-[-6px]
              left-1/2
              flex
              -translate-x-1/2
              items-center
              gap-2
              rounded-full
              bg-[#2563EB]
              px-4
              py-2
              shadow-[0_12px_32px_rgba(37,99,235,0.35)]
            "
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={
              stage >= 4
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.5, y: 10 }
            }
            transition={{
              duration: 0.55,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : { x: [0, 2, 0], y: [0, -1, 0] }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Send size={12} className="text-white" strokeWidth={2.5} />
            </motion.div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white">
              Submitting to HMRC
            </span>
          </motion.div>

        </div>

        {/* ============================================================
            BRAND LOCKUP
        ============================================================ */}

        <motion.div
          className="mt-10 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: premiumEase }}
        >
          {/* Logo mark — Deep Navy background, blue icon */}
          <div className="relative">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-[11px]
                bg-[#0F2747]
                shadow-[0_8px_24px_rgba(15,39,71,0.28)]
              "
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                <path
                  d="M12 2L4 6V12C4 17 7.5 21 12 22C16.5 21 20 17 20 12V6L12 2Z"
                  stroke="#60A5FA"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="11" r="2.4" fill="#60A5FA" />
                <path
                  d="M12 13.4V17"
                  stroke="#60A5FA"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Blue pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-[11px] border-2 border-[#60A5FA]"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: [1, 1.35], opacity: [0.6, 0] }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>

          {/* Wordmark */}
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-[24px] font-black tracking-[-0.045em] text-[#10233F]">
                Tax
              </span>
              <span className="text-[24px] font-black tracking-[-0.045em] text-[#2563EB]">
                Pilot
              </span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#60A5FA]">
              UK Compliance
            </span>
          </div>
        </motion.div>

        {/* ============================================================
            PROGRESS + MESSAGE
        ============================================================ */}

        <motion.div
          className="mt-8 flex w-[280px] flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.55 }}
        >
          {/* Stage indicator dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((step) => (
              <motion.div
                key={step}
                className="h-1.5 rounded-full"
                style={{ width: 6 }}
                animate={
                  stage > step
                    ? {
                        backgroundColor: "#2563EB",
                        width: 24,
                      }
                    : stage === step
                    ? {
                        backgroundColor: "#60A5FA",
                        width: 24,
                      }
                    : {
                        backgroundColor: "#DCE5F0",
                        width: 6,
                      }
                }
                transition={{ duration: 0.4, ease: premiumEase }}
              />
            ))}
          </div>

          {/* Message */}
          <div className="mt-4 text-center">
            <motion.p
              key={stage}
              className="text-[12px] font-semibold tracking-tight text-[#10233F]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {stage === 0 && "Opening secure session"}
              {stage === 1 && "Gathering your records"}
              {stage === 2 && "Calculating tax liability"}
              {stage === 3 && "Verifying HMRC compliance"}
              {stage === 4 && "Submitting your filing"}
            </motion.p>

            <motion.p
              className="mt-1.5 text-[10px] font-medium tracking-wide text-[#94A3B8]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Bank-grade encryption · HMRC recognised
            </motion.p>
          </div>
        </motion.div>

        {/* ============================================================
            TRUST STRIP
        ============================================================ */}

        <motion.div
          className="mt-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#94A3B8]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <span>HMRC</span>
          <span className="h-1 w-1 rounded-full bg-[#60A5FA]" />
          <span>Companies House</span>
          <span className="h-1 w-1 rounded-full bg-[#60A5FA]" />
          <span>ICO Registered</span>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default TaxPilotLoader;