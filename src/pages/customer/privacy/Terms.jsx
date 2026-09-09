import React from "react";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
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

  return (
    <div className="min-h-screen bg-white text-[#09263A]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F5FCF9]">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#65D9BB]/15" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full border border-[#65D9BB]/15" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-[#65D9BB]/15" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            {/* Label */}
            <div className="mb-5 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F7F0] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087F5B]">
                <FileText className="h-3.5 w-3.5" />
                Legal
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-[#09263A] sm:text-5xl lg:text-6xl">
              Terms &{" "}
              <span className="text-[#087F5B]">Conditions</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#687B78] sm:text-base">
              These terms explain the rules and conditions that apply when you
              use the ComplyTax UK website, platform and services.
            </p>

            {/* Updated date */}
            <div className="mt-7 inline-flex items-center gap-2 rounded-lg border border-[#DDEAE6] bg-white px-4 py-2.5 shadow-[0_4px_15px_rgba(0,62,62,0.04)]">
              <span className="text-xs text-[#71827F]">
                Last updated
              </span>
              <span className="text-xs font-semibold text-[#09263A]">
                09 September 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">

            {/* =================================================
                TABLE OF CONTENTS
            ================================================= */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">

                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#087F5B]">
                  On this page
                </p>

                <nav className="border-l border-[#DDEAE6]">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block border-l-2 border-transparent px-4 py-2 text-xs leading-5 text-[#71827F] transition-all duration-200 hover:border-[#087F5B] hover:bg-[#F5FCF9] hover:text-[#087F5B]"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>

                {/* Sidebar help card */}
                <div className="mt-8 rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">
                  <ShieldCheck className="mb-3 h-5 w-5 text-[#087F5B]" />

                  <h3 className="text-sm font-bold text-[#09263A]">
                    Need help?
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#71827F]">
                    If you have questions about these terms, our support team
                    can help.
                  </p>

                  <Link
                    to="/help"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#087F5B] hover:text-[#005E45]"
                  >
                    Visit Help Centre
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* =================================================
                TERMS CONTENT
            ================================================= */}
            <article className="max-w-3xl">

              {/* Mobile table of contents */}
              <div className="mb-10 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-5 lg:hidden">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#087F5B]">
                  On this page
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-xs text-[#687B78] hover:text-[#087F5B]"
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Introduction */}
              <div
                id="introduction"
                className="scroll-mt-28 border-b border-[#EDF3F1] pb-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  01
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Introduction
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  These Terms & Conditions govern your use of the ComplyTax UK
                  website, platform and services. By creating an account or
                  using our services, you agree to comply with these terms.
                </p>

                <div className="mt-5 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">
                  <p className="text-sm font-medium leading-6 text-[#4F6460]">
                    Please read these terms carefully before using our
                    services.
                  </p>
                </div>
              </div>

              {/* Definitions */}
              <div
                id="definitions"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  02
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
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
                    [
                      "Account",
                      "Your registered ComplyTax user account.",
                    ],
                  ].map(([term, definition]) => (
                    <div
                      key={term}
                      className="rounded-xl border border-[#DDEAE6] p-4"
                    >
                      <p className="text-sm font-semibold text-[#09263A]">
                        {term}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-[#687B78]">
                        {definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Using services */}
              <div
                id="using-services"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  03
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Using our services
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
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
                      className="flex items-start gap-3 text-sm leading-6 text-[#687B78]"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#087F5B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Account */}
              <div
                id="account"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  04
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Your account
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  When you create an account, you are responsible for keeping
                  your account information accurate and your login credentials
                  secure.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  You should notify us promptly if you believe your account has
                  been accessed without your permission or if you become aware
                  of any security issue.
                </p>

                <div className="mt-5 rounded-xl bg-[#F5FCF9] p-5">
                  <h3 className="text-sm font-bold text-[#09263A]">
                    Account security
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#687B78]">
                    Keep your login details confidential and contact us promptly
                    if you believe your account has been accessed without
                    permission.
                  </p>
                </div>
              </div>

              {/* Services */}
              <div
                id="services"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  05
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Our services
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  ComplyTax provides online tools and services intended to help
                  users manage tax and company compliance.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Our platform provides tools and information to assist with
                  compliance. You remain responsible for ensuring that
                  information submitted through the platform is complete and
                  accurate.
                </p>
              </div>

              {/* Payments */}
              <div
                id="payments"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  06
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Payments and pricing
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Subscription and product prices are displayed on our website
                  and may vary depending on the service or plan selected.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Where applicable, subscriptions may renew automatically until
                  cancelled in accordance with the applicable subscription
                  terms.
                </p>

                <div className="mt-5 rounded-xl border border-[#DDEAE6] bg-white p-5 shadow-[0_5px_20px_rgba(0,62,62,0.04)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                    Pricing
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#687B78]">
                    Prices for our services are displayed on our website and may
                    vary depending on the product or plan selected.
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div
                id="responsibilities"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  07
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
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
                      className="flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />
                      <span className="text-sm leading-6 text-[#4F6460]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intellectual property */}
              <div
                id="intellectual-property"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  08
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Intellectual property
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  The ComplyTax website, software, branding, logos, content,
                  graphics and other materials are owned by or licensed to
                  ComplyTax unless otherwise stated.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  You receive a limited right to use the platform for its
                  intended purpose. This does not transfer ownership of the
                  software or intellectual property to you.
                </p>
              </div>

              {/* Third party */}
              <div
                id="third-party"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  09
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Third-party services
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  ComplyTax may integrate with or rely on third-party services,
                  including payment providers, HMRC services, Companies House,
                  accounting platforms and other technology providers.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Your use of third-party services may also be subject to their
                  own terms and policies.
                </p>
              </div>

              {/* Privacy */}
              <div
                id="privacy"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  10
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Data and privacy
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We take the protection of personal information seriously.
                  Information collected through our services is handled in
                  accordance with our Privacy Policy.
                </p>

                <Link
                  to="/privacy"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#E5F7F0] px-4 py-2.5 text-xs font-bold text-[#087F5B] transition-colors hover:bg-[#DDF5EC]"
                >
                  Read our Privacy Policy
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Disclaimers */}
              <div
                id="disclaimers"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  11
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Disclaimers
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Information provided through the platform is intended to
                  assist users with tax and company compliance processes and
                  should not automatically be treated as professional advice.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Tax rules, filing requirements and regulations can change.
                  Users should review important information and obtain
                  professional advice where appropriate.
                </p>
              </div>

              {/* Liability */}
              <div
                id="liability"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  12
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Limitation of liability
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  To the extent permitted by applicable law, our liability in
                  connection with the services will be subject to the
                  limitations and exclusions set out in these Terms.
                </p>

                <div className="mt-5 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">
                  <p className="text-sm font-semibold text-[#09263A]">
                    Important
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#687B78]">
                    Nothing in these Terms is intended to exclude or limit
                    liability where doing so would be unlawful.
                  </p>
                </div>
              </div>

              {/* Termination */}
              <div
                id="termination"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  13
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Suspension and termination
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We may suspend or terminate access to an account or service
                  where reasonably necessary, including in circumstances
                  involving a breach of these Terms, fraudulent activity,
                  security concerns, non-payment or legal requirements.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  You may also cancel your account or subscription in accordance
                  with the applicable cancellation process.
                </p>
              </div>

              {/* Changes */}
              <div
                id="changes"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  14
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Changes to these terms
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We may update these Terms from time to time to reflect
                  changes to our services, legal requirements or business
                  practices.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Where appropriate, we will provide notice of material changes.
                  The latest version will be made available on this page.
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#F5FCF9] p-4">
                  <FileText className="h-5 w-5 text-[#087F5B]" />

                  <div>
                    <p className="text-xs font-semibold text-[#71827F]">
                      Last updated
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-[#09263A]">
                      09 September 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Governing law */}
              <div
                id="governing-law"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  15
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Governing law
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  These Terms are intended to be governed by the applicable
                  laws and jurisdiction specified by the legal entity operating
                  ComplyTax UK.
                </p>

                <div className="mt-5 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">
                  <p className="text-sm leading-6 text-[#687B78]">
                    The exact governing law and jurisdiction should be confirmed
                    based on the registered legal entity and business
                    structure.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div
                id="contact"
                className="scroll-mt-28 py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  16
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Contact us
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  If you have any questions about these Terms & Conditions,
                  please contact our support team.
                </p>

                <Link
                  to="/help"
                  className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#087F5B] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(8,127,91,0.15)] transition-all duration-200 hover:bg-[#005E45]"
                >
                  Contact support
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#004646] py-16 sm:py-20">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border border-[#65D9BB]/10" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-[#65D9BB]/10" />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#65D9BB]/10">
            <ShieldCheck className="h-5 w-5 text-[#65D9BB]" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Have questions about our terms?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
            If anything is unclear, our support team is here to help.
          </p>

          <Link
            to="/help"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-[#65D9BB] px-6 py-3.5 text-sm font-bold text-[#004646] transition-all duration-200 hover:bg-[#7BE5C9]"
          >
            Visit Help Centre
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Terms;