import React from "react";
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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

  return (
    <div className="min-h-screen bg-white text-[#09263A]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F5FCF9]">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#65D9BB]/15" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full border border-[#65D9BB]/15" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-[#65D9BB]/15" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            {/* Label */}
            <div className="mb-5 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F7F0] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087F5B]">
                <LockKeyhole className="h-3.5 w-3.5" />
                Privacy
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-[#09263A] sm:text-5xl lg:text-6xl">
              Privacy{" "}
              <span className="text-[#087F5B]">Policy</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#687B78] sm:text-base">
              We respect your privacy and are committed to protecting the
              personal information you share with ComplyTax UK.
            </p>

            {/* Updated */}
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
                SIDEBAR
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

                {/* Security card */}
                <div className="mt-8 rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5F7F0]">
                    <ShieldCheck className="h-4.5 w-4.5 text-[#087F5B]" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#09263A]">
                    Your privacy matters
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#71827F]">
                    We take reasonable steps to protect the information
                    entrusted to us.
                  </p>

                  <Link
                    to="/help"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#087F5B] hover:text-[#005E45]"
                  >
                    Contact support
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* =================================================
                CONTENT
            ================================================= */}
            <article className="max-w-3xl">

              {/* Mobile navigation */}
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

              {/* =================================================
                  1. INTRODUCTION
              ================================================= */}
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
                  This Privacy Policy explains how ComplyTax UK collects,
                  uses, stores and protects personal information when you use
                  our website, platform and services.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We aim to be transparent about the information we collect and
                  how it is used.
                </p>

                <div className="mt-5 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">
                  <p className="text-sm font-medium leading-6 text-[#4F6460]">
                    By using our services, you acknowledge that you have read
                    and understood this Privacy Policy.
                  </p>
                </div>
              </div>

              {/* =================================================
                  2. INFORMATION
              ================================================= */}
              <div
                id="information"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  02
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Information we collect
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
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
                      className="rounded-xl border border-[#DDEAE6] p-4"
                    >
                      <h3 className="text-sm font-semibold text-[#09263A]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-[#687B78]">
                        {item.text}
                      </p>
                    </div>
                  ))}

                </div>
              </div>

              {/* =================================================
                  3. HOW WE USE
              ================================================= */}
              <div
                id="how-we-use"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  03
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  How we use your information
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
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
                      className="flex items-start gap-3 text-sm leading-6 text-[#687B78]"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#087F5B]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* =================================================
                  4. LEGAL BASIS
              ================================================= */}
              <div
                id="legal-basis"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  04
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Legal basis for processing
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Where applicable, we process personal information on the basis
                  of one or more lawful grounds, including the performance of a
                  contract, compliance with legal obligations, legitimate
                  interests and consent.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Where processing relies on consent, you may withdraw your
                  consent where applicable.
                </p>
              </div>

              {/* =================================================
                  5. SHARING
              ================================================= */}
              <div
                id="sharing"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  05
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Sharing your information
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We may share information with trusted service providers and
                  other parties where necessary to operate our services,
                  process payments, provide technical infrastructure, comply
                  with legal obligations or protect our rights.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We aim to ensure that appropriate safeguards are in place when
                  information is shared with service providers.
                </p>
              </div>

              {/* =================================================
                  6. COOKIES
              ================================================= */}
              <div
                id="cookies"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  06
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Cookies
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Our website may use cookies and similar technologies to
                  remember preferences, understand how visitors use our website
                  and improve the user experience.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Depending on your browser and applicable consent requirements,
                  you may be able to control or disable cookies through your
                  browser settings.
                </p>

                <div className="mt-5 rounded-xl bg-[#F5FCF9] p-5">
                  <p className="text-sm font-semibold text-[#09263A]">
                    Cookie preferences
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#687B78]">
                    You can manage available cookie preferences through your
                    browser or any cookie-consent controls provided on our
                    website.
                  </p>
                </div>
              </div>

              {/* =================================================
                  7. SECURITY
              ================================================= */}
              <div
                id="security"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  07
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Data security
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
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
                      className="flex items-center gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E5F7F0]">
                        <ShieldCheck className="h-4 w-4 text-[#087F5B]" />
                      </div>

                      <span className="text-sm font-medium text-[#4F6460]">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

                <p className="mt-5 text-sm leading-7 text-[#687B78]">
                  No method of transmission or electronic storage can be
                  guaranteed to be completely secure, so we cannot guarantee
                  absolute security.
                </p>
              </div>

              {/* =================================================
                  8. RETENTION
              ================================================= */}
              <div
                id="retention"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  08
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Data retention
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We retain personal information for as long as reasonably
                  necessary to provide our services, maintain business and
                  financial records, meet legal obligations, resolve disputes
                  and enforce our agreements.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Retention periods may vary depending on the type of
                  information and the purpose for which it was collected.
                </p>
              </div>

              {/* =================================================
                  9. RIGHTS
              ================================================= */}
              <div
                id="rights"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  09
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Your privacy rights
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
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
                      className="flex items-start gap-3 rounded-xl border border-[#DDEAE6] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />

                      <span className="text-sm leading-6 text-[#687B78]">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

                <p className="mt-5 text-sm leading-7 text-[#687B78]">
                  To exercise a privacy right, please contact us using the
                  details provided at the end of this policy.
                </p>
              </div>

              {/* =================================================
                  10. TRANSFERS
              ================================================= */}
              <div
                id="transfers"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  10
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  International data transfers
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Some of our service providers or technology infrastructure may
                  process information outside the United Kingdom.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Where personal information is transferred internationally, we
                  will take appropriate steps to ensure that applicable legal
                  requirements and safeguards are considered.
                </p>
              </div>

              {/* =================================================
                  11. CHILDREN
              ================================================= */}
              <div
                id="children"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  11
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Children's privacy
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  Our services are intended for businesses, individuals and
                  other users who are legally able to use the relevant
                  services. We do not knowingly collect personal information
                  from children for purposes unrelated to providing our
                  services.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  If you believe a child has provided personal information to us
                  inappropriately, please contact us so that we can review the
                  situation.
                </p>
              </div>

              {/* =================================================
                  12. CHANGES
              ================================================= */}
              <div
                id="changes"
                className="scroll-mt-28 border-b border-[#EDF3F1] py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  12
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Changes to this Privacy Policy
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our services, legal requirements, technology or
                  privacy practices.
                </p>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  When appropriate, we will provide notice of material changes.
                  The latest version will always be made available on this page.
                </p>

                <div className="mt-5 rounded-xl bg-[#F5FCF9] p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B]">
                    Last updated
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#09263A]">
                    09 September 2026
                  </p>
                </div>
              </div>

              {/* =================================================
                  13. CONTACT
              ================================================= */}
              <div
                id="contact"
                className="scroll-mt-28 py-10"
              >
                <span className="text-xs font-bold text-[#087F5B]">
                  13
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#09263A]">
                  Contact us
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#687B78]">
                  If you have questions about this Privacy Policy or how we
                  handle your personal information, please contact our support
                  team.
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
            <LockKeyhole className="h-5 w-5 text-[#65D9BB]" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            Have questions about your privacy?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
            If you have any questions about how we collect or use your
            information, our support team is here to help.
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

export default Privacy;