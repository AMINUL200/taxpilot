import React, { useState } from "react";
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
      description:
        "Learn how to keep your company information up to date.",
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

  return (
    <div className="min-h-screen bg-white text-[#09263A]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F5FCF9]">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#DDF5EC] opacity-70 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#E7F8F2] opacity-80 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20">

          {/* Breadcrumb */}
          <div className="mb-8 flex items-center justify-center gap-2 text-[12px] text-[#71827F]">
            <Link
              to="/"
              className="transition-colors hover:text-[#087F5B]"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-[#087F5B]">
              Help Centre
            </span>
          </div>

          <div className="mx-auto max-w-3xl text-center">

            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9EDE1] bg-white px-4 py-2 shadow-sm">
              <HelpCircle className="h-4 w-4 text-[#087F5B]" />

              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#087F5B]">
                Help Centre
              </span>
            </div>

            <h1 className="text-[38px] font-bold leading-[1.12] tracking-[-0.035em] text-[#09263A] sm:text-[48px] lg:text-[54px]">
              How can we{" "}
              <span className="text-[#087F5B]">
                help?
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#687B78] sm:text-[16px]">
              Find answers, guides and helpful information about
              ComplyTax UK. Everything you need to stay on top of
              your tax and compliance.
            </p>

            {/* Search */}
            <div className="mx-auto mt-9 max-w-2xl">
              <div className="group flex h-[60px] items-center rounded-xl border border-[#D8E5E1] bg-white px-5 shadow-[0_10px_30px_rgba(0,62,62,0.07)] transition-all focus-within:border-[#087F5B] focus-within:shadow-[0_10px_35px_rgba(8,127,91,0.12)]">

                <Search className="mr-4 h-5 w-5 shrink-0 text-[#8A9B97]" />

                <input
                  type="text"
                  placeholder="Search for articles, guides or answers..."
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#09263A] outline-none placeholder:text-[#9AA9A6]"
                />

                <button
                  type="button"
                  className="hidden rounded-lg bg-[#087F5B] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#005E45] sm:block"
                >
                  Search
                </button>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-[#8A9B97]">
              Popular searches: Corporation Tax · VAT · Annual Accounts ·
              Filing
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HELP CATEGORIES
      ====================================================== */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Heading */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">
                Browse by topic
              </p>

              <h2 className="text-[30px] font-bold tracking-[-0.025em] text-[#09263A] sm:text-[34px]">
                What can we help with?
              </h2>

              <p className="mt-2 max-w-xl text-[14px] leading-6 text-[#71827F]">
                Choose a topic to find guides and answers to common
                questions.
              </p>
            </div>

            <Link
              to="/guides"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#087F5B]"
            >
              View all guides

              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Categories */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  to="/help"
                  key={category.title}
                  className="group rounded-2xl border border-[#E1ECE8] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#BBDDD2] hover:shadow-[0_12px_35px_rgba(0,62,62,0.08)]"
                >
                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F2] transition-colors group-hover:bg-[#087F5B]">
                      <Icon className="h-5 w-5 text-[#087F5B] transition-colors group-hover:text-white" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-[#A0AFAC] transition-all group-hover:translate-x-1 group-hover:text-[#087F5B]" />
                  </div>

                  <h3 className="mt-5 text-[16px] font-bold text-[#09263A]">
                    {category.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-[13px] leading-6 text-[#71827F]">
                    {category.description}
                  </p>

                  <p className="mt-4 text-[11px] font-semibold text-[#087F5B]">
                    {category.articles}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR ARTICLES
      ====================================================== */}
      <section className="bg-[#F5FCF9] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">

            {/* Left */}
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DFF5ED]">
                <BookOpen className="h-5 w-5 text-[#087F5B]" />
              </div>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">
                Popular articles
              </p>

              <h2 className="mt-2 text-[30px] font-bold leading-tight tracking-[-0.025em] text-[#09263A]">
                Start with our most helpful guides.
              </h2>

              <p className="mt-4 max-w-md text-[14px] leading-6 text-[#71827F]">
                New to ComplyTax UK? These articles cover the questions
                our customers ask most often.
              </p>
            </div>

            {/* Articles */}
            <div className="overflow-hidden rounded-2xl border border-[#DCEAE5] bg-white">
              {popularArticles.map((article, index) => (
                <Link
                  to="/help"
                  key={article}
                  className={`group flex items-center justify-between gap-5 px-5 py-5 transition-colors hover:bg-[#F8FCFA] sm:px-6 ${
                    index !== popularArticles.length - 1
                      ? "border-b border-[#E7EFEC]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF9F5]">
                      <FileText className="h-4 w-4 text-[#087F5B]" />
                    </div>

                    <span className="text-[13px] font-medium text-[#314D4A] group-hover:text-[#087F5B]">
                      {article}
                    </span>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-[#9EAEAA] transition-transform group-hover:translate-x-1 group-hover:text-[#087F5B]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">
              Frequently asked questions
            </p>

            <h2 className="text-[30px] font-bold tracking-[-0.025em] text-[#09263A] sm:text-[36px]">
              Common questions
            </h2>

            <p className="mt-3 text-[14px] leading-6 text-[#71827F]">
              Quick answers to some of the questions we hear most often.
            </p>
          </div>

          <div className="divide-y divide-[#E3ECE9] rounded-2xl border border-[#DDEAE6] bg-white">

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>

                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={`text-[14px] font-semibold transition-colors ${
                        isOpen
                          ? "text-[#087F5B]"
                          : "text-[#09263A]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#71827F] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#087F5B]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6">
                      <p className="max-w-3xl text-[13px] leading-6 text-[#71827F]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT SUPPORT CTA
      ====================================================== */}
      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#004646] px-7 py-10 sm:px-10 lg:px-14 lg:py-12">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full border border-[#27756F]/40" />

          <div className="pointer-events-none absolute -bottom-32 left-[35%] h-64 w-64 rounded-full border border-[#27756F]/30" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-xl">

              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#65D9BB]">
                Still need help?
              </p>

              <h2 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[30px]">
                Our support team is here for you.
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-[#C2DCD7]">
                Can't find what you're looking for? Get in touch and
                we'll help you find the right answer.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#65D9BB] px-5 py-3 text-[12px] font-bold text-[#003E3E] transition-colors hover:bg-[#7BE1C8]"
              >
                <MessageCircle className="h-4 w-4" />
                Contact support
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="mailto:support@complytax.co.uk"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#3C7772] px-5 py-3 text-[12px] font-semibold text-white transition-colors hover:border-[#65D9BB] hover:text-[#65D9BB]"
              >
                <Mail className="h-4 w-4" />
                Email us
              </a>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HelpPage;