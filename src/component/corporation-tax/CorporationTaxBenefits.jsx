import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const benefits = [
  "Save time on compliance",
  "Reduce manual calculations",
  "Avoid unnecessary paperwork",
  "File online from anywhere",
  "Keep your company information organised",
  "Know what you need to file and when",
];

const CorporationTaxBenefits = () => {
  const reduce = useReducedMotion();

  const fadeRight = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  // Benefit cards appear one by one, row by row
  const grid = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.35 } },
  };

  const card = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
  };

  // Tick pops in just after its card lands
  const tick = {
    hidden: reduce ? { scale: 1 } : { scale: 0.3, rotate: -25 },
    show: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark">
      {/* Ambient glows, slow drift */}
      <motion.div
        className="pointer-events-none absolute right-[-120px] top-[-140px] h-[380px] w-[380px] rounded-full bg-accent opacity-[0.10] blur-3xl"
        animate={reduce ? undefined : { y: [0, 26, 0], x: [0, -18, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-160px] left-[-100px] h-[340px] w-[340px] rounded-full bg-accent opacity-[0.08] blur-3xl"
        animate={reduce ? undefined : { y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left content */}
          <div>
            <motion.h2
              {...fadeRight(0)}
              className="max-w-[420px] text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl"
            >
              Why businesses choose TaxPilot
            </motion.h2>

            <motion.p
              {...fadeRight(0.15)}
              className="mt-4 max-w-[420px] text-sm leading-6 text-dark-muted"
            >
              Built to take the manual work out of Corporation Tax, so you can file
              accurately and move on with running your business.
            </motion.p>

            {/* Line draws in under the intro */}
            <motion.div
              className="mt-6 h-[2px] w-16 rounded-full bg-sky"
              style={{ originX: 0 }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            />
          </div>

          {/* Benefits checklist cards */}
          <motion.div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit}
                variants={card}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-[background-color,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-sky/40 hover:bg-white/[0.07]"
              >
                <motion.span
                  variants={tick}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sky"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </motion.span>
                <span className="text-sm font-medium text-white">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxBenefits;