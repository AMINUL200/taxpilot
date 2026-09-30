import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Lock, Calculator, Building2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const items = [
  { icon: ShieldCheck, label: "HMRC compatible" },
  { icon: Lock, label: "Secure online filing" },
  { icon: Calculator, label: "Accurate tax calculations" },
  { icon: Building2, label: "Built for UK companies" },
];

const CorporationTaxTrust = () => {
  const reduce = useReducedMotion();

  // Heading first, then each item one by one (plays once when scrolled into view)
  const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
  };

  const entry = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const iconPop = {
    hidden: reduce ? { scale: 1 } : { scale: 0.5, rotate: -15 },
    show: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  return (
    <section className="border-y border-border-light bg-background-blue-pale">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <motion.p
          className="mb-6 text-center text-sm font-semibold text-heading sm:text-left"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          Everything you need to stay Corporation Tax compliant
        </motion.p>

        <motion.div
          className="grid grid-cols-2 gap-5 sm:grid-cols-4"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          {items.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={entry}
              className="group flex items-center gap-2.5"
            >
              <motion.span
                variants={iconPop}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-border-light transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:ring-primary"
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
              </motion.span>
              <span className="text-xs font-medium leading-tight text-heading">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CorporationTaxTrust;