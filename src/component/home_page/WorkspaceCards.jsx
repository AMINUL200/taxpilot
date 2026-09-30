import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FileText,
  Database,
  UsersRound,
  Landmark,
} from "lucide-react";

export default function WorkspaceCards() {
  const shouldReduceMotion = useReducedMotion();

  const items = [
    {
      title: "Corporation Tax",
      desc: "Prepare CT600 returns and supporting accounts.",
      icon: FileText,
    },
    {
      title: "VAT",
      desc: "Organise records and review VAT returns.",
      icon: Database,
    },
    {
      title: "Payroll",
      desc: "Manage pay runs and employee records.",
      icon: UsersRound,
    },
    {
      title: "Companies House",
      desc: "Track accounts and confirmation statements.",
      icon: Landmark,
    },
  ];

  return (
    <section className="section-white">
      <div className="container-custom mx-auto px-4 py-14">

        {/* Heading */}
        <motion.div
          className="text-center"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2
            className="text-3xl md:text-[36px] font-extrabold text-[var(--heading)]"
            style={{
              letterSpacing: "-0.035em",
              lineHeight: "1.15",
            }}
          >
            One workspace. Every filing.
          </h2>

          <p className="mt-2 text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed">
            Everything you need to keep your business compliant, in a single,
            streamlined platform.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                className="
                  group
                  bg-white
                  border
                  border-[var(--border)]
                  rounded-[14px]
                  px-6
                  py-5
                  min-h-[166px]
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-[0_8px_24px_rgba(15,39,71,0.08)]
                  hover:border-[#c9d8eb]
                "
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                        scale: 0.97,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : 0.2 + index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Icon */}
                <motion.div
                  className="
                    flex
                    items-center
                    justify-start
                    h-11
                    w-11
                    text-[var(--primary)]
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.7,
                          rotate: -8,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion
                      ? 0
                      : 0.35 + index * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Icon
                    size={35}
                    strokeWidth={1.8}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className="
                    mt-3
                    text-[16px]
                    font-bold
                    text-[var(--heading)]
                  "
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-1
                    text-[14px]
                    leading-[1.45]
                    text-[var(--text-secondary)]
                    max-w-[210px]
                  "
                >
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}