import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import TaxPilotLoader from "../../../component/common/PageLoader";

const Privacy = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "information", label: "Information we collect" },
    { id: "how-we-use", label: "How we use your information" },
    { id: "legal-basis", label: "Legal basis" },
    { id: "sharing", label: "Sharing information" },
    { id: "cookies", label: "Cookies" },
    { id: "security", label: "Data security" },
    { id: "retention", label: "Data retention" },
    { id: "rights", label: "Your rights" },
    { id: "transfers", label: "International transfers" },
    { id: "children", label: "Children's privacy" },
    { id: "changes", label: "Changes to this policy" },
    { id: "contact", label: "Contact us" },
  ];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  const sectionVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  const tocContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const tocItemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  const ctaVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

     const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if(loading){
    return <TaxPilotLoader/>
  }

  return (
    <div className="min-h-screen bg-background text-heading">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-background-soft">
        {/* Decorative circles */}
        <motion.div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            border
            border-sky/15
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="
            pointer-events-none
            absolute
            -left-10
            -top-10
            h-48
            w-48
            rounded-full
            border
            border-sky/15
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-20
            h-80
            w-80
            rounded-full
            border
            border-sky/15
          "
        />

        <motion.div
          className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mx-auto max-w-3xl text-center">

            {/* Label */}
            <motion.div
              variants={heroItemVariants}
              className="mb-5 flex justify-center"
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-primary-light
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-primary
                "
              >
                <LockKeyhole className="h-3.5 w-3.5" />
                Privacy
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={heroItemVariants}
              className="
                text-4xl
                font-bold
                tracking-tight
                text-heading
                sm:text-5xl
                lg:text-6xl
              "
            >
              Privacy{" "}
              <span className="text-primary">Policy</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-text-secondary
                sm:text-base
              "
            >
              We respect your privacy and are committed to protecting the
              personal information you share with ComplyTax UK.
            </motion.p>

            {/* Updated date */}
            <motion.div
              variants={heroItemVariants}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-border
                bg-background
                px-4
                py-2.5
                shadow-card
              "
            >
              <span className="text-xs text-text-secondary">
                Last updated
              </span>
              <span className="text-xs font-semibold text-heading">
                09 September 2026
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">

            {/* =================================================
                SIDEBAR
            ================================================= */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">

                <p
                  className="
                    mb-4
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-primary
                  "
                >
                  On this page
                </p>

                <motion.nav
                  className="border-l border-border"
                  variants={tocContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sections.map((section) => (
                    <motion.a
                      key={section.id}
                      href={`#${section.id}`}
                      variants={tocItemVariants}
                      className="
                        block
                        border-l-2
                        border-transparent
                        px-4
                        py-2
                        text-xs
                        leading-5
                        text-text-secondary
                        transition-all
                        duration-200
                        hover:border-primary
                        hover:bg-background-soft
                        hover:text-primary
                      "
                    >
                      {section.label}
                    </motion.a>
                  ))}
                </motion.nav>

                {/* Security card */}
                <motion.div
                  className="
                    mt-8
                    rounded-2xl
                    border
                    border-border
                    bg-background-soft
                    p-5
                  "
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: premiumEase,
                    delay: 0.8,
                  }}
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-primary-light
                    "
                  >
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-heading">
                    Your privacy matters
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-text-secondary">
                    We take reasonable steps to protect the information
                    entrusted to us.
                  </p>

                  <Link
                    to="/help"
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-1
                      text-xs
                      font-bold
                      text-primary
                      transition-colors
                      duration-200
                      hover:text-primary-hover
                    "
                  >
                    Contact support
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </div>
            </aside>

            {/* =================================================
                CONTENT
            ================================================= */}
            <article className="max-w-3xl">

              {/* Mobile navigation */}
              <motion.div
                className="
                  mb-10
                  rounded-xl
                  border
                  border-border
                  bg-background-soft
                  p-5
                  lg:hidden
                "
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: premiumEase }}
              >
                <p
                  className="
                    mb-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  On this page
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="
                        text-xs
                        text-text-secondary
                        transition-colors
                        duration-200
                        hover:text-primary
                      "
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* 1. INTRODUCTION */}
              <motion.div
                id="introduction"
                className="scroll-mt-28 border-b border-border/50 pb-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">01</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Introduction
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  This Privacy Policy explains how ComplyTax UK collects,
                  uses, stores and protects personal information when you use
                  our website, platform and services.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We aim to be transparent about the information we collect and
                  how it is used.
                </p>

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-border
                    bg-background-soft
                    p-5
                  "
                >
                  <p className="text-sm font-medium leading-6 text-text-secondary">
                    By using our services, you acknowledge that you have read
                    and understood this Privacy Policy.
                  </p>
                </div>
              </motion.div>

              {/* 2. INFORMATION */}
              <motion.div
                id="information"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">02</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Information we collect
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Depending on how you use our services, we may collect
                  information that you provide directly to us and information
                  generated through your use of our platform.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: "Account information",
                      text: "Name, email address, contact details and information required to create and manage your account.",
                    },
                    {
                      title: "Company information",
                      text: "Where relevant, information about your company, business activities and compliance requirements.",
                    },
                    {
                      title: "Tax and financial information",
                      text: "Information you provide when using our tax, accounting or compliance services.",
                    },
                    {
                      title: "Payment information",
                      text: "Payment and billing information required to process purchases or subscriptions.",
                    },
                    {
                      title: "Technical information",
                      text: "Device, browser, IP address, usage and diagnostic information that may be collected when you use our website or platform.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="
                        rounded-xl
                        border
                        border-border
                        p-4
                        transition-colors
                        duration-200
                        hover:border-primary/30
                      "
                    >
                      <h3 className="text-sm font-semibold text-heading">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-text-secondary">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 3. HOW WE USE */}
              <motion.div
                id="how-we-use"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">03</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  How we use your information
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We may use personal information for purposes including:
                </p>

                <ul className="mt-5 space-y-3">
                  {[
                    "Providing and operating our services.",
                    "Creating and managing your account.",
                    "Processing payments and managing subscriptions.",
                    "Providing customer support.",
                    "Improving our website, platform and services.",
                    "Communicating important service or account information.",
                    "Protecting the security and integrity of our systems.",
                    "Complying with applicable legal and regulatory obligations.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="
                        flex
                        items-start
                        gap-3
                        text-sm
                        leading-6
                        text-text-secondary
                      "
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 4. LEGAL BASIS */}
              <motion.div
                id="legal-basis"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">04</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Legal basis for processing
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Where applicable, we process personal information on the basis
                  of one or more lawful grounds, including the performance of a
                  contract, compliance with legal obligations, legitimate
                  interests and consent.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Where processing relies on consent, you may withdraw your
                  consent where applicable.
                </p>
              </motion.div>

              {/* 5. SHARING */}
              <motion.div
                id="sharing"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">05</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Sharing your information
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We may share information with trusted service providers and
                  other parties where necessary to operate our services,
                  process payments, provide technical infrastructure, comply
                  with legal obligations or protect our rights.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We aim to ensure that appropriate safeguards are in place when
                  information is shared with service providers.
                </p>
              </motion.div>

              {/* 6. COOKIES */}
              <motion.div
                id="cookies"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">06</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Cookies
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Our website may use cookies and similar technologies to
                  remember preferences, understand how visitors use our website
                  and improve the user experience.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Depending on your browser and applicable consent requirements,
                  you may be able to control or disable cookies through your
                  browser settings.
                </p>

                <div className="mt-5 rounded-xl bg-background-soft p-5">
                  <p className="text-sm font-semibold text-heading">
                    Cookie preferences
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    You can manage available cookie preferences through your
                    browser or any cookie-consent controls provided on our
                    website.
                  </p>
                </div>
              </motion.div>

              {/* 7. SECURITY */}
              <motion.div
                id="security"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">07</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Data security
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We take reasonable technical and organisational measures
                  designed to protect personal information against
                  unauthorised access, loss, misuse, alteration or disclosure.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Access controls",
                    "Secure systems",
                    "Account protection",
                    "Security monitoring",
                  ].map((item) => (
                    <div
                      key={item}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-border
                        bg-background-soft
                        p-4
                        transition-colors
                        duration-200
                        hover:border-primary/30
                      "
                    >
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          bg-primary-light
                        "
                      >
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-text-secondary">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-text-secondary">
                  No method of transmission or electronic storage can be
                  guaranteed to be completely secure, so we cannot guarantee
                  absolute security.
                </p>
              </motion.div>

              {/* 8. RETENTION */}
              <motion.div
                id="retention"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">08</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Data retention
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We retain personal information for as long as reasonably
                  necessary to provide our services, maintain business and
                  financial records, meet legal obligations, resolve disputes
                  and enforce our agreements.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Retention periods may vary depending on the type of
                  information and the purpose for which it was collected.
                </p>
              </motion.div>

              {/* 9. RIGHTS */}
              <motion.div
                id="rights"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">09</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Your privacy rights
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Depending on your circumstances and applicable law, you may
                  have rights relating to your personal information.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Request access to personal information we hold about you.",
                    "Ask us to correct inaccurate or incomplete information.",
                    "Request deletion of personal information where applicable.",
                    "Object to or request restriction of certain processing.",
                    "Request portability of certain information where applicable.",
                    "Withdraw consent where processing is based on consent.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-border
                        p-4
                        transition-colors
                        duration-200
                        hover:border-primary/30
                      "
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-6 text-text-secondary">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-text-secondary">
                  To exercise a privacy right, please contact us using the
                  details provided at the end of this policy.
                </p>
              </motion.div>

              {/* 10. TRANSFERS */}
              <motion.div
                id="transfers"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">10</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  International data transfers
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Some of our service providers or technology infrastructure may
                  process information outside the United Kingdom.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Where personal information is transferred internationally, we
                  will take appropriate steps to ensure that applicable legal
                  requirements and safeguards are considered.
                </p>
              </motion.div>

              {/* 11. CHILDREN */}
              <motion.div
                id="children"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">11</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Children's privacy
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Our services are intended for businesses, individuals and
                  other users who are legally able to use the relevant
                  services. We do not knowingly collect personal information
                  from children for purposes unrelated to providing our
                  services.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  If you believe a child has provided personal information to us
                  inappropriately, please contact us so that we can review the
                  situation.
                </p>
              </motion.div>

              {/* 12. CHANGES */}
              <motion.div
                id="changes"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">12</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Changes to this Privacy Policy
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our services, legal requirements, technology or
                  privacy practices.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  When appropriate, we will provide notice of material changes.
                  The latest version will always be made available on this page.
                </p>

                <div className="mt-5 rounded-xl bg-background-soft p-5">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-primary
                    "
                  >
                    Last updated
                  </p>
                  <p className="mt-1 text-sm font-bold text-heading">
                    09 September 2026
                  </p>
                </div>
              </motion.div>

              {/* 13. CONTACT */}
              <motion.div
                id="contact"
                className="scroll-mt-28 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">13</span>
                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Contact us
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  If you have questions about this Privacy Policy or how we
                  handle your personal information, please contact our support
                  team.
                </p>

                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2, transition: { duration: 0.2 } }
                  }
                  className="inline-block"
                >
                  <Link
                    to="/help"
                    className="
                      group
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-primary
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-text-white
                      shadow-button
                      transition-colors
                      duration-200
                      hover:bg-primary-hover
                    "
                  >
                    Contact support
                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <motion.section
        className="relative overflow-hidden bg-dark py-16 sm:py-20"
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Decorative circles */}
        <motion.div
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-64
            w-64
            rounded-full
            border
            border-sky/10
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -right-20
            h-72
            w-72
            rounded-full
            border
            border-sky/10
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
          <motion.div
            className="
              mx-auto
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-sky/10
            "
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }
            }
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2,
            }}
          >
            <LockKeyhole className="h-5 w-5 text-sky" />
          </motion.div>

          <h2 className="mt-5 text-2xl font-bold text-text-white sm:text-3xl">
            Have questions about your privacy?
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-7
              text-text-white/60
            "
          >
            If you have any questions about how we collect or use your
            information, our support team is here to help.
          </p>

          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -2, transition: { duration: 0.2 } }
            }
            className="inline-block"
          >
            <Link
              to="/help"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-sky
                px-6
                py-3.5
                text-sm
                font-bold
                text-dark
                shadow-button
                transition-colors
                duration-200
                hover:bg-sky-light
              "
            >
              Visit Help Centre
              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Privacy;