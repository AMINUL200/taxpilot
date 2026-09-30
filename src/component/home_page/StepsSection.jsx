import { motion, useReducedMotion } from "motion/react";

export default function StepsSection() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      n: "01",
      title: "Add your details",
      desc: "Tell us about your business and keep your records organised.",
    },
    {
      n: "02",
      title: "Prepare and review",
      desc: "Use our tools to prepare your filings and check everything is ready.",
    },
    {
      n: "03",
      title: "Approve and submit",
      desc: "Review, get ready to submit and keep track of progress in one place.",
    },
  ];

  return (
    <section className="section-warm">
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
            className="font-extrabold text-3xl md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            From records to ready.
          </h2>

          <p className="text-center text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
            A simpler way to manage your filings, from start to finish.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-10 grid md:grid-cols-3 gap-7 items-start">
          {steps.map((s, idx) => (
            <motion.div
              key={s.n}
              className="relative"
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
                duration: 0.65,
                delay: shouldReduceMotion
                  ? 0
                  : 0.25 + idx * 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-start gap-4">

                {/* Step Number */}
                <motion.div
                  className="step-number"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.6,
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
                      : 0.35 + idx * 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {s.n}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 12,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion
                      ? 0
                      : 0.45 + idx * 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="font-extrabold text-lg text-[var(--heading)]">
                    {s.title}
                  </div>

                  <p className="text-sm text-muted mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              </div>

              {/* Connecting Arrow */}
              {idx !== steps.length - 1 && (
                <motion.div
                  className="
                    hidden
                    md:block
                    absolute
                    top-6
                    -right-8
                    text-[var(--primary)]
                    text-2xl
                  "
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -8,
                          scale: 0.8,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion
                      ? 0
                      : 0.75 + idx * 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}