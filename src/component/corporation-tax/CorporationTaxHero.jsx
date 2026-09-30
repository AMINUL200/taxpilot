import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  FileCheck2,
  Send,
  Calculator,
  Check,
  Loader2,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------
   Entrance choreography for the left column (plays once)
------------------------------------------------------------ */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Counts 0 → target once `active` is true */
function useCountUp(target, active, duration = 1400, skip = false) {
  const [value, setValue] = useState(skip ? target : 0);
  useEffect(() => {
    if (skip) return setValue(target);
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, skip]);
  return value;
}

/* One row of the filing checklist */
const StepRow = ({ icon: Icon, label, state, pendingText, doneText, reduce }) => {
  // state: "pending" | "working" | "done"
  const done = state === "done";
  return (
    <motion.div
      layout
      className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-500 ${
        done ? "bg-background-blue-pale" : "bg-background-soft"
      }`}
      animate={{ opacity: state === "pending" ? 0.65 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${done ? "text-primary" : "text-text-secondary"}`} />
        <span className="text-xs font-medium text-heading">{label}</span>
      </div>

      <div className="flex h-5 items-center">
        <AnimatePresence mode="wait" initial={false}>
          {state === "done" ? (
            <motion.span
              key="done"
              className="flex items-center gap-1.5"
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {doneText && (
                <span className="text-[10px] font-semibold text-success">{doneText}</span>
              )}
              <CheckCircle2 className="h-4 w-4 text-success" />
            </motion.span>
          ) : state === "working" ? (
            <motion.span
              key="working"
              className="flex items-center gap-1.5 text-[10px] font-semibold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.span
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex"
              >
                <Loader2 className="h-3.5 w-3.5" />
              </motion.span>
              Sending
            </motion.span>
          ) : (
            <motion.span
              key="pending"
              className="text-[10px] font-semibold text-text-secondary"
              exit={{ opacity: 0 }}
            >
              {pendingText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------
   Right side: the return completing itself (plays once)
------------------------------------------------------------ */
const FilingCard = ({ reduce }) => {
  const [stage, setStage] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    const t = [
      setTimeout(() => setStage(1), 1100), // calculation done
      setTimeout(() => setStage(2), 1800), // return ready
      setTimeout(() => setStage(3), 2900), // sending to HMRC
      setTimeout(() => setStage(4), 3900), // filed
    ];
    return () => t.forEach(clearTimeout);
  }, [reduce]);

  const amount = useCountUp(4280, stage >= 1, 1500, reduce);
  const filed = stage >= 4;

  return (
    <div className="relative rounded-2xl border border-border-light bg-background p-5 shadow-[0_24px_55px_rgba(15,39,71,0.12)]">
      {/* Progress hairline along the top edge */}
      <div className="absolute inset-x-5 top-0 h-[2px] overflow-hidden rounded-full bg-border-light">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(stage / 4) * 100}%` }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-heading">Corporation Tax</p>
          <p className="text-[11px] text-text-secondary">Year ending 31 Mar 2026</p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={filed ? "filed" : "ready"}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              filed ? "bg-success-light text-success" : "bg-accent-soft text-accent"
            }`}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
          >
            {filed ? "Filed with HMRC" : "Ready to file"}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mb-4 flex flex-col gap-2.5">
        <StepRow
          icon={Calculator}
          label="Tax calculation complete"
          state={stage >= 1 ? "done" : "pending"}
          pendingText="Calculating"
          reduce={reduce}
        />
        <StepRow
          icon={FileCheck2}
          label="Tax return ready"
          state={stage >= 2 ? "done" : "pending"}
          pendingText="Preparing"
          reduce={reduce}
        />
        <StepRow
          icon={Send}
          label="HMRC filing"
          state={stage >= 4 ? "done" : stage === 3 ? "working" : "pending"}
          pendingText="Pending"
          doneText="Filed"
          reduce={reduce}
        />
      </div>

      <div className="relative overflow-hidden rounded-xl bg-dark px-4 py-3.5">
        {/* One soft sheen sweeps across when the amount lands */}
        {!reduce && stage >= 2 && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "420%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
        <p className="text-[11px] font-medium text-sky">Amount due</p>
        <p className="mt-1 text-2xl font-bold tabular-nums text-white">
          £{amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------
   Hero
------------------------------------------------------------ */
const CorporationTaxHero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Ambient shapes, slow drift */}
      <motion.div
        className="pointer-events-none absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-accent-light blur-3xl"
        animate={reduce ? undefined : { y: [0, 24, 0], x: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-[320px] w-[320px] rounded-full bg-background-blue blur-2xl"
        animate={reduce ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
          {/* Left content */}
          <motion.div
            className="max-w-xl"
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.div
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-light bg-background-blue-pale px-3 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-semibold text-primary">Corporation Tax</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-heading sm:text-[48px] lg:text-[54px]"
            >
              Corporation Tax made simple
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-[520px] text-[15px] leading-6 text-text-secondary sm:text-base"
            >
              Prepare and file your UK Corporation Tax return without the paperwork
              headache. TaxPilot helps you calculate your tax, prepare your return and
              submit it to HMRC.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="group inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 text-sm font-semibold !text-white shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
              >
                <span>Start your Corporation Tax return</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/help"
                className="group inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border-light bg-background px-6 text-sm font-semibold !text-heading transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background-blue-pale"
              >
                <PlayCircle className="h-4 w-4 text-primary transition-transform duration-200 group-hover:scale-110" />
                <span>See how it works</span>
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 flex items-center gap-2 text-xs font-medium text-text-secondary"
            >
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Secure online filing for UK businesses</span>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:ml-auto"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <FilingCard reduce={reduce} />

            {/* Floating accent */}
            <motion.div
              className="absolute -left-6 -top-6 hidden h-16 w-16 items-center justify-center rounded-2xl border border-border-light bg-background shadow-[0_10px_25px_rgba(15,39,71,0.12)] sm:flex"
              initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -12 }}
              animate={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, rotate: 0, y: [0, -6, 0] }
              }
              transition={{
                opacity: { duration: 0.5, delay: 0.9 },
                scale: { duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] },
                rotate: { duration: 0.6, delay: 0.9 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
              }}
            >
              <FileCheck2 className="h-7 w-7 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxHero;