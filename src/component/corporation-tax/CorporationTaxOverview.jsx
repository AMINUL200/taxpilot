import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CheckCircle2, FileText, BarChart3 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const points = [
  "Calculate taxable profits",
  "Prepare Corporation Tax returns",
  "Generate tax computations",
  "Submit returns to HMRC",
  "Keep compliance information organised",
];

/* Counts up once the element scrolls into view, after an optional delay (ms) */
const CountUp = ({ to, delay = 0, duration = 1300, reduce }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) return setValue(to);
    if (!inView) return;
    let raf;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [inView, to, delay, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      £{value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
};

const CorporationTaxOverview = () => {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.65, delay, ease: EASE },
  });

  /* Card rows appear one by one after the card lands */
  const rowsParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.28, delayChildren: 0.75 } },
  };
  const row = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  };
  const line = {
    hidden: reduce ? { scaleX: 1 } : { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } },
  };

  /* Checklist items */
  const listParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.45 } },
  };
  const listItem = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
  };
  const tickPop = {
    hidden: reduce ? { scale: 1 } : { scale: 0.4 },
    show: { scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
  };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left text */}
          <div className="max-w-lg">
            <motion.h2
              {...fadeUp(0)}
              className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-heading sm:text-4xl"
            >
              Your Corporation Tax return, without the hassle
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              className="mt-4 text-[15px] leading-6 text-text-secondary"
            >
              TaxPilot brings everything your business needs for Corporation Tax into
              one place, so nothing gets missed and nothing needs a spreadsheet.
            </motion.p>

            <motion.ul
              className="mt-7 flex flex-col gap-3.5"
              variants={listParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              {points.map((point) => (
                <motion.li key={point} variants={listItem} className="flex items-center gap-3">
                  <motion.span
                    variants={tickPop}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </motion.span>
                  <span className="text-sm font-medium text-heading">{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right visual */}
          <motion.div
            className="relative mx-auto w-full max-w-[440px]"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
          >
            <motion.div
              className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-background-blue"
              initial={reduce ? false : { scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            />

            <div className="relative rounded-2xl border border-border-light bg-background p-6 shadow-[0_20px_45px_rgba(15,39,71,0.10)]">
              <motion.div
                className="mb-5 flex items-center gap-3"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-heading">CT600 return</p>
                  <p className="text-[11px] text-text-secondary">Auto-prepared from your figures</p>
                </div>
              </motion.div>

              <motion.div
                className="mb-5 flex flex-col gap-3"
                variants={rowsParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div variants={row} className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Taxable profit</span>
                  <span className="font-semibold text-heading">
                    <CountUp to={22400} delay={1000} reduce={reduce} />
                  </span>
                </motion.div>
                <motion.div variants={line} style={{ originX: 0 }} className="h-px w-full bg-border-light" />

                <motion.div variants={row} className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Corporation Tax rate</span>
                  <span className="font-semibold text-heading">19%</span>
                </motion.div>
                <motion.div variants={line} style={{ originX: 0 }} className="h-px w-full bg-border-light" />

                <motion.div variants={row} className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Tax due</span>
                  <span className="font-semibold text-primary">
                    <CountUp to={4256} delay={1900} reduce={reduce} />
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 rounded-lg bg-background-blue-pale px-3 py-2.5"
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 2.4, ease: EASE }}
              >
                <BarChart3 className="h-4 w-4 text-accent" />
                <span className="text-[11px] font-medium text-heading">
                  Computation generated automatically
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CorporationTaxOverview;