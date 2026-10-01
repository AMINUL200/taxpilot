import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  ChevronDown,
  FileText,
  Calculator,
  Receipt,
  Building2,
  UserRound,
  ShieldCheck,
  BookOpen,
  MessageCircle,
  Mail,
  HelpCircle,
} from "lucide-react";

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  const categories = [
    {
      icon: FileText,
      title: "Corporation Tax",
      description:
        "Learn how to prepare and file your Company Tax Return with HMRC.",
      articles: "24 articles",
    },
    {
      icon: Building2,
      title: "Annual Accounts",
      description:
        "Everything you need to know about preparing and filing annual accounts.",
      articles: "18 articles",
    },
    {
      icon: Receipt,
      title: "MTD VAT",
      description:
        "Guides for connecting your VAT account and submitting VAT returns.",
      articles: "16 articles",
    },
    {
      icon: UserRound,
      title: "Self Assessment",
      description:
        "Helpful guides for understanding and completing Self Assessment.",
      articles: "12 articles",
    },
    {
      icon: ShieldCheck,
      title: "Confirmation Statement",
      description: "Learn how to keep your company information up to date.",
      articles: "10 articles",
    },
    {
      icon: Calculator,
      title: "Account & Billing",
      description:
        "Manage your account, subscriptions, payments and company settings.",
      articles: "15 articles",
    },
  ];

  const popularArticles = [
    "How do I get started with ComplyTax UK?",
    "How do I file my Corporation Tax Return?",
    "How do I connect my company to ComplyTax UK?",
    "How do I submit my annual accounts?",
    "How do I update my company information?",
    "How can I change or cancel my subscription?",
  ];

  const faqs = [
    {
      question: "What is ComplyTax UK?",
      answer:
        "ComplyTax UK is an online tax and compliance platform designed to help UK businesses prepare and file Corporation Tax, annual accounts, VAT returns and other compliance requirements.",
    },
    {
      question: "Do I need accounting knowledge to use ComplyTax UK?",
      answer:
        "No. ComplyTax UK is designed to make tax and compliance easier for business owners. The platform guides you through the information required at each stage.",
    },
    {
      question: "Can I file directly with HMRC?",
      answer:
        "Yes. Where supported, ComplyTax UK allows you to review your information and submit the relevant return directly to HMRC.",
    },
    {
      question: "Can I file annual accounts with Companies House?",
      answer:
        "Yes. ComplyTax UK supports the preparation and submission of eligible annual accounts to Companies House.",
    },
    {
      question: "Can I manage more than one company?",
      answer:
        "Yes. Portfolio plans are designed for users who need to manage multiple companies from one account.",
    },
    {
      question: "How secure is my information?",
      answer:
        "We take the security of your business and tax information seriously and use appropriate security measures to protect your account and information.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  /* Hero container */
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  /* Section heading reveal */
  const headingVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEase },
    },
  };

  /* Cards grid stagger */
  const gridVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: premiumEase },
    },
  };

  const iconVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.5, rotate: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1],
        delay: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  /* Article list stagger */
  const articleListVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const articleItemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: premiumEase },
    },
  };

  /* FAQ stagger */
  const faqContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const faqItemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: premiumEase },
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

  return (
    <div className="min-h-screen bg-background text-plum">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-background-mint-pale">
        {/* Decorative shapes */}
        <motion.div
          className="
            pointer-events-none
            absolute
            -left-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-mint
            opacity-70
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="
            pointer-events-none
            absolute
            -right-32
            top-20
            h-80
            w-80
            rounded-full
            bg-accent-soft
            opacity-80
            blur-3xl
          "
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div
            variants={heroItemVariants}
            className="
              mb-8
              flex
              items-center
              justify-center
              gap-2
              text-[12px]
              text-text-secondary
            "
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary">Help Centre</span>
          </motion.div>

          <div className="mx-auto max-w-3xl text-center">
            {/* Label */}
            <motion.div
              variants={heroItemVariants}
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-accent-light
                bg-background
                px-4
                py-2
                shadow-sm
              "
            >
              <HelpCircle className="h-4 w-4 text-primary" />
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-primary
                "
              >
                Help Centre
              </span>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="
                text-[38px]
                font-bold
                leading-[1.12]
                tracking-[-0.035em]
                text-plum
                sm:text-[48px]
                lg:text-[54px]
              "
            >
              How can we <span className="text-primary">help?</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-[15px]
                leading-7
                text-text-secondary
                sm:text-[16px]
              "
            >
              Find answers, guides and helpful information about ComplyTax UK.
              Everything you need to stay on top of your tax and compliance.
            </motion.p>

            {/* Search */}
            <motion.div
              variants={heroItemVariants}
              className="mx-auto mt-9 max-w-2xl"
            >
              <div
                className="
                  group
                  flex
                  h-[60px]
                  items-center
                  rounded-xl
                  border
                  border-soft-border
                  bg-background
                  px-5
                  shadow-card
                  transition-all
                  focus-within:border-primary
                  focus-within:shadow-card-hover
                "
              >
                <Search className="mr-4 h-5 w-5 shrink-0 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search for articles, guides or answers..."
                  className="
                    h-full
                    min-w-0
                    flex-1
                    bg-transparent
                    text-[14px]
                    text-plum
                    outline-none
                    placeholder:text-text-light
                  "
                />
                <motion.button
                  type="button"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -1, transition: { duration: 0.15 } }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.98 }
                  }
                  className="
                    hidden
                    rounded-lg
                    bg-primary
                    px-5
                    py-2.5
                    text-[12px]
                    font-semibold
                    text-text-white
                    transition-colors
                    hover:bg-primary-hover
                    sm:block
                  "
                >
                  Search
                </motion.button>
              </div>
            </motion.div>

            <motion.p
              variants={heroItemVariants}
              className="mt-4 text-[11px] text-text-muted"
            >
              Popular searches: Corporation Tax · VAT · Annual Accounts ·
              Filing
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          HELP CATEGORIES
      ====================================================== */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}
          <motion.div
            className="
              mb-10
              flex
              flex-col
              justify-between
              gap-5
              sm:flex-row
              sm:items-end
            "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={headingVariants}
          >
            <div>
              <p
                className="
                  mb-2
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-primary
                "
              >
                Browse by topic
              </p>
              <h2
                className="
                  text-[30px]
                  font-bold
                  tracking-[-0.025em]
                  text-plum
                  sm:text-[34px]
                "
              >
                What can we help with?
              </h2>
              <p
                className="
                  mt-2
                  max-w-xl
                  text-[14px]
                  leading-6
                  text-text-secondary
                "
              >
                Choose a topic to find guides and answers to common questions.
              </p>
            </div>

            <Link
              to="/guides"
              className="
                group
                inline-flex
                items-center
                gap-2
                text-[13px]
                font-semibold
                text-primary
              "
            >
              View all guides
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.title}
                  variants={cardVariants}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -6, transition: { duration: 0.25 } }
                  }
                >
                  <Link
                    to="/help"
                    className="
                      group
                      block
                      rounded-2xl
                      border
                      border-border-light
                      bg-background
                      p-6
                      transition-[border-color,box-shadow]
                      duration-300
                      hover:border-accent-light
                      hover:shadow-card-hover
                    "
                  >
                    <div className="flex items-start justify-between">
                      <motion.div
                        variants={iconVariants}
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-accent-soft
                          transition-colors
                          duration-300
                          group-hover:bg-primary
                        "
                      >
                        <Icon
                          className="
                            h-5
                            w-5
                            text-primary
                            transition-colors
                            duration-300
                            group-hover:text-text-white
                          "
                        />
                      </motion.div>
                      <ArrowRight
                        className="
                          h-4
                          w-4
                          text-text-muted
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-primary
                        "
                      />
                    </div>

                    <h3 className="mt-5 text-[16px] font-bold text-plum">
                      {category.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        min-h-[48px]
                        text-[13px]
                        leading-6
                        text-text-secondary
                      "
                    >
                      {category.description}
                    </p>

                    <p className="mt-4 text-[11px] font-semibold text-primary">
                      {category.articles}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          POPULAR ARTICLES
      ====================================================== */}
      <section className="bg-background-mint-pale py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={headingVariants}
            >
              <motion.div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-mint
                "
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.5, rotate: -12 }
                }
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <BookOpen className="h-5 w-5 text-primary" />
              </motion.div>

              <p
                className="
                  mt-6
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-primary
                "
              >
                Popular articles
              </p>

              <h2
                className="
                  mt-2
                  text-[30px]
                  font-bold
                  leading-tight
                  tracking-[-0.025em]
                  text-plum
                "
              >
                Start with our most helpful guides.
              </h2>

              <p
                className="
                  mt-4
                  max-w-md
                  text-[14px]
                  leading-6
                  text-text-secondary
                "
              >
                New to ComplyTax UK? These articles cover the questions our
                customers ask most often.
              </p>
            </motion.div>

            {/* Articles */}
            <motion.div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border-light
                bg-background
              "
              variants={articleListVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {popularArticles.map((article, index) => (
                <motion.div key={article} variants={articleItemVariants}>
                  <Link
                    to="/help"
                    className={`
                      group
                      flex
                      items-center
                      justify-between
                      gap-5
                      px-5
                      py-5
                      transition-colors
                      hover:bg-accent-soft
                      sm:px-6
                      ${
                        index !== popularArticles.length - 1
                          ? "border-b border-border-light"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-accent-soft
                        "
                      >
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span
                        className="
                          text-[13px]
                          font-medium
                          text-plum
                          transition-colors
                          group-hover:text-primary
                        "
                      >
                        {article}
                      </span>
                    </div>

                    <ArrowRight
                      className="
                        h-4
                        w-4
                        shrink-0
                        text-text-muted
                        transition-transform
                        group-hover:translate-x-1
                        group-hover:text-primary
                      "
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <motion.div
            className="mx-auto mb-12 max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={headingVariants}
          >
            <p
              className="
                mb-2
                text-[11px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-primary
              "
            >
              Frequently asked questions
            </p>
            <h2
              className="
                text-[30px]
                font-bold
                tracking-[-0.025em]
                text-plum
                sm:text-[36px]
              "
            >
              Common questions
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-text-secondary">
              Quick answers to some of the questions we hear most often.
            </p>
          </motion.div>

          <motion.div
            className="
              divide-y
              divide-border-light
              rounded-2xl
              border
              border-border-light
              bg-background
            "
            variants={faqContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div key={faq.question} variants={faqItemVariants}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-6
                      px-5
                      py-5
                      text-left
                      sm:px-6
                    "
                  >
                    <span
                      className={`
                        text-[14px]
                        font-semibold
                        transition-colors
                        ${isOpen ? "text-primary" : "text-plum"}
                      `}
                    >
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`
                        h-4
                        w-4
                        shrink-0
                        text-text-secondary
                        transition-all
                        duration-300
                        ${isOpen ? "rotate-180 text-primary" : ""}
                      `}
                    />
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="
                          max-w-3xl
                          px-5
                          pb-5
                          text-[13px]
                          leading-6
                          text-text-secondary
                          sm:px-6
                        "
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          CONTACT SUPPORT CTA
      ====================================================== */}
      <motion.section
        className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-24 bg-dark"
        variants={ctaVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-2xl
            bg-plum
            px-7
            py-10
            sm:px-10
            lg:px-14
            lg:py-12
          "
        >
          {/* Decorative circles */}
          <motion.div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-28
              h-64
              w-64
              rounded-full
              border
              border-dark-soft/60
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
              -bottom-32
              left-[35%]
              h-64
              w-64
              rounded-full
              border
              border-dark-soft/50
            "
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }
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
              relative
              flex
              flex-col
              justify-between
              gap-8
              lg:flex-row
              lg:items-center
            "
          >
            {/* Left — Text Content */}
            <div className="max-w-xl">
              <p
                className="
                  mb-2
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-accent
                "
              >
                Still need help?
              </p>

              <h2
                className="
                  text-[26px]
                  font-bold
                  tracking-[-0.02em]
                  text-text-white
                  sm:text-[30px]
                "
              >
                Our support team is here for you.
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-text-white/75">
                Can't find what you're looking for? Get in touch and we'll help
                you find the right answer.
              </p>
            </div>

            {/* Right — Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Primary CTA */}
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -2, transition: { duration: 0.2 } }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.98 }
                }
              >
                <Link
                  to="/contact"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-accent
                    px-5
                    py-3
                    text-[12px]
                    font-bold
                    text-text-white
                    transition-colors
                    hover:bg-accent-hover
                  "
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Secondary CTA — Outline */}
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -2, transition: { duration: 0.2 } }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.98 }
                }
              >
                <a
                  href="mailto:support@complytax.co.uk"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-text-white/30
                    px-5
                    py-3
                    text-[12px]
                    font-semibold
                    text-text-white
                    transition-colors
                    hover:border-accent
                    hover:text-accent
                  "
                >
                  <Mail className="h-4 w-4" />
                  Email us
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HelpPage;