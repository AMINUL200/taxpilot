import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import TaxPilotLoader from "../../../component/common/PageLoader";

const Terms = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "definitions", label: "Definitions" },
    { id: "using-services", label: "Using our services" },
    { id: "account", label: "Your account" },
    { id: "services", label: "Our services" },
    { id: "payments", label: "Payments & pricing" },
    { id: "responsibilities", label: "Your responsibilities" },
    { id: "intellectual-property", label: "Intellectual property" },
    { id: "third-party", label: "Third-party services" },
    { id: "privacy", label: "Data & privacy" },
    { id: "disclaimers", label: "Disclaimers" },
    { id: "liability", label: "Limitation of liability" },
    { id: "termination", label: "Suspension & termination" },
    { id: "changes", label: "Changes to these terms" },
    { id: "governing-law", label: "Governing law" },
    { id: "contact", label: "Contact us" },
  ];

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Hero container */
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

  /* Section reveal on scroll */
  const sectionVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: premiumEase },
    },
  };

  /* TOC items — stagger */
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
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: premiumEase },
    },
  };

  /* CTA reveal */
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

  if (loading) {
    return <TaxPilotLoader />;
  }

  return (
    <div className="min-h-screen bg-background text-heading">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-background-soft">
        {/* Decorative elements */}
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
                <FileText className="h-3.5 w-3.5" />
                Legal
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
              Terms & <span className="text-primary">Conditions</span>
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
              These terms explain the rules and conditions that apply when you
              use the ComplyTax UK website, platform and services.
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
              <span className="text-xs text-text-secondary">Last updated</span>
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
                TABLE OF CONTENTS
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

                {/* Sidebar help card */}
                <motion.div
                  className="
                    mt-8
                    rounded-2xl
                    border
                    border-border
                    bg-background-soft
                    p-5
                  "
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: premiumEase,
                    delay: 0.8,
                  }}
                >
                  <ShieldCheck className="mb-3 h-5 w-5 text-primary" />

                  <h3 className="text-sm font-bold text-heading">Need help?</h3>

                  <p className="mt-2 text-xs leading-5 text-text-secondary">
                    If you have questions about these terms, our support team
                    can help.
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
                    Visit Help Centre
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </div>
            </aside>

            {/* =================================================
                TERMS CONTENT
            ================================================= */}
            <article className="max-w-3xl">
              {/* Mobile table of contents */}
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
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
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

              {/* Introduction */}
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
                  These Terms & Conditions govern your use of the ComplyTax UK
                  website, platform and services. By creating an account or
                  using our services, you agree to comply with these terms.
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
                    Please read these terms carefully before using our services.
                  </p>
                </div>
              </motion.div>

              {/* Definitions */}
              <motion.div
                id="definitions"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">02</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Definitions
                </h2>

                <div className="mt-6 space-y-4">
                  {[
                    [
                      "ComplyTax, we, us or our",
                      "ComplyTax UK and its applicable operating entity.",
                    ],
                    [
                      "You or your",
                      "The person or organisation using our services.",
                    ],
                    [
                      "Services",
                      "The tax, accounting, company compliance and related services provided through our platform.",
                    ],
                    [
                      "Platform",
                      "The ComplyTax online website, software and related systems.",
                    ],
                    ["Account", "Your registered ComplyTax user account."],
                  ].map(([term, definition]) => (
                    <div
                      key={term}
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
                      <p className="text-sm font-semibold text-heading">
                        {term}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-text-secondary">
                        {definition}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Using services */}
              <motion.div
                id="using-services"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">03</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Using our services
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  You agree to use the platform lawfully and in accordance with
                  these terms. You must not misuse the platform or attempt to
                  interfere with its operation, security or availability.
                </p>

                <ul className="mt-5 space-y-3">
                  {[
                    "Use the platform only for lawful purposes.",
                    "Provide accurate and complete information.",
                    "Do not attempt to access another user's account.",
                    "Do not interfere with the security or operation of the platform.",
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

              {/* Account */}
              <motion.div
                id="account"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">04</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Your account
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  When you create an account, you are responsible for keeping
                  your account information accurate and your login credentials
                  secure.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  You should notify us promptly if you believe your account has
                  been accessed without your permission or if you become aware
                  of any security issue.
                </p>

                <div className="mt-5 rounded-xl bg-background-soft p-5">
                  <h3 className="text-sm font-bold text-heading">
                    Account security
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Keep your login details confidential and contact us promptly
                    if you believe your account has been accessed without
                    permission.
                  </p>
                </div>
              </motion.div>

              {/* Services */}
              <motion.div
                id="services"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">05</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Our services
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  ComplyTax provides online tools and services intended to help
                  users manage tax and company compliance.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Our platform provides tools and information to assist with
                  compliance. You remain responsible for ensuring that
                  information submitted through the platform is complete and
                  accurate.
                </p>
              </motion.div>

              {/* Payments */}
              <motion.div
                id="payments"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">06</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Payments and pricing
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Subscription and product prices are displayed on our website
                  and may vary depending on the service or plan selected.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Where applicable, subscriptions may renew automatically until
                  cancelled in accordance with the applicable subscription
                  terms.
                </p>

                <div
                  className="
                    mt-5
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-5
                    shadow-card
                  "
                >
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-primary
                    "
                  >
                    Pricing
                  </p>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Prices for our services are displayed on our website and may
                    vary depending on the product or plan selected.
                  </p>
                </div>
              </motion.div>

              {/* Responsibilities */}
              <motion.div
                id="responsibilities"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">07</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Your responsibilities
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Provide accurate information",
                    "Review information before submission",
                    "Keep records and supporting documents",
                    "Meet applicable filing deadlines",
                    "Keep account information up to date",
                    "Protect your account credentials",
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
                        bg-background-soft
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
              </motion.div>

              {/* Intellectual property */}
              <motion.div
                id="intellectual-property"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">08</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Intellectual property
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  The ComplyTax website, software, branding, logos, content,
                  graphics and other materials are owned by or licensed to
                  ComplyTax unless otherwise stated.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  You receive a limited right to use the platform for its
                  intended purpose. This does not transfer ownership of the
                  software or intellectual property to you.
                </p>
              </motion.div>

              {/* Third party */}
              <motion.div
                id="third-party"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">09</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Third-party services
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  ComplyTax may integrate with or rely on third-party services,
                  including payment providers, HMRC services, Companies House,
                  accounting platforms and other technology providers.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Your use of third-party services may also be subject to their
                  own terms and policies.
                </p>
              </motion.div>

              {/* Privacy */}
              <motion.div
                id="privacy"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">10</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Data and privacy
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We take the protection of personal information seriously.
                  Information collected through our services is handled in
                  accordance with our Privacy Policy.
                </p>

                <Link
                  to="/privacy"
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-primary-light
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-primary
                    transition-colors
                    duration-200
                    hover:bg-primary/20
                  "
                >
                  Read our Privacy Policy
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>

              {/* Disclaimers */}
              <motion.div
                id="disclaimers"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">11</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Disclaimers
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Information provided through the platform is intended to
                  assist users with tax and company compliance processes and
                  should not automatically be treated as professional advice.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Tax rules, filing requirements and regulations can change.
                  Users should review important information and obtain
                  professional advice where appropriate.
                </p>
              </motion.div>

              {/* Liability */}
              <motion.div
                id="liability"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">12</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Limitation of liability
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  To the extent permitted by applicable law, our liability in
                  connection with the services will be subject to the
                  limitations and exclusions set out in these Terms.
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
                  <p className="text-sm font-semibold text-heading">
                    Important
                  </p>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Nothing in these Terms is intended to exclude or limit
                    liability where doing so would be unlawful.
                  </p>
                </div>
              </motion.div>

              {/* Termination */}
              <motion.div
                id="termination"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">13</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Suspension and termination
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We may suspend or terminate access to an account or service
                  where reasonably necessary, including in circumstances
                  involving a breach of these Terms, fraudulent activity,
                  security concerns, non-payment or legal requirements.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  You may also cancel your account or subscription in accordance
                  with the applicable cancellation process.
                </p>
              </motion.div>

              {/* Changes */}
              <motion.div
                id="changes"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">14</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Changes to these terms
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  We may update these Terms from time to time to reflect changes
                  to our services, legal requirements or business practices.
                </p>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Where appropriate, we will provide notice of material changes.
                  The latest version will be made available on this page.
                </p>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-background-soft
                    p-4
                  "
                >
                  <FileText className="h-5 w-5 text-primary" />

                  <div>
                    <p className="text-xs font-semibold text-text-secondary">
                      Last updated
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-heading">
                      09 September 2026
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Governing law */}
              <motion.div
                id="governing-law"
                className="scroll-mt-28 border-b border-border/50 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">15</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Governing law
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  These Terms are intended to be governed by the applicable laws
                  and jurisdiction specified by the legal entity operating
                  ComplyTax UK.
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
                  <p className="text-sm leading-6 text-text-secondary">
                    The exact governing law and jurisdiction should be confirmed
                    based on the registered legal entity and business structure.
                  </p>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                id="contact"
                className="scroll-mt-28 py-10"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="text-xs font-bold text-primary">16</span>

                <h2 className="mt-2 text-2xl font-bold text-heading">
                  Contact us
                </h2>

                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  If you have any questions about these Terms & Conditions,
                  please contact our support team.
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
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2,
            }}
          >
            <ShieldCheck className="h-5 w-5 text-sky" />
          </motion.div>

          <h2 className="mt-5 text-2xl font-bold text-text-white sm:text-3xl">
            Have questions about our terms?
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
            If anything is unclear, our support team is here to help.
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

export default Terms;
