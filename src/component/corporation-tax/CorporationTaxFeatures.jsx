import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Calculator, FileEdit, Send, FileBarChart2, FileCheck2, FolderLock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const features = [
  {
    title: "Calculate your tax",
    description: "Automatically calculate your Corporation Tax liability.",
    icon: Calculator,
  },
  {
    title: "Prepare your return",
    description: "Complete the information required for your CT600 return.",
    icon: FileEdit,
  },
  {
    title: "HMRC filing",
    description: "Submit your Corporation Tax return electronically.",
    icon: Send,
  },
  {
    title: "Tax computations",
    description: "Generate clear tax computations for your records.",
    icon: FileBarChart2,
  },
  {
    title: "iXBRL accounts",
    description: "Prepare compatible accounts for filing where required.",
    icon: FileCheck2,
  },
  {
    title: "Digital records",
    description: "Keep your tax information organised securely online.",
    icon: FolderLock,
  },
];

const CorporationTaxFeatures = () => {
  const reduce = useReducedMotion();

  // Cards appear one by one, row by row (plays once on scroll into view)
  const grid = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const card = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
  };

  // Icon pops in just after its card lands
  const icon = {
    hidden: reduce ? { scale: 1 } : { scale: 0.4, rotate: -20 },
    show: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.55, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  const text = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3, ease: EASE } },
  };

  return (
    <section className="bg-background-blue-pale">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-heading sm:text-4xl">
            Everything you need to file with confidence
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              variants={card}
              className="group rounded-xl border border-border-light bg-background p-6 shadow-[0_3px_14px_rgba(15,39,71,0.04)] transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_14px_30px_rgba(15,39,71,0.10)]"
            >
              <motion.div
                variants={icon}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
              >
                <Icon className="h-6 w-6" strokeWidth={2.1} />
              </motion.div>

              <motion.div variants={text}>
                <h3 className="text-[15px] font-bold leading-5 text-primary">{title}</h3>
                <p className="mt-2 text-[13px] leading-5 text-text-secondary">{description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CorporationTaxFeatures;