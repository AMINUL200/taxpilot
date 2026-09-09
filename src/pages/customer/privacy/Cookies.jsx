import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  ShieldCheck,
  Settings2,
} from "lucide-react";

const Cookies = () => {
  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "what-are-cookies", label: "What are cookies?" },
    { id: "how-we-use", label: "How we use cookies" },
    { id: "types", label: "Types of cookies" },
    { id: "essential", label: "Essential cookies" },
    { id: "analytics", label: "Analytics cookies" },
    { id: "preferences", label: "Preference cookies" },
    { id: "marketing", label: "Marketing cookies" },
    { id: "third-party", label: "Third-party cookies" },
    { id: "manage", label: "Managing cookies" },
    { id: "changes", label: "Changes to this policy" },
    { id: "contact", label: "Contact us" },
  ];

  return (
    <div className="min-h-screen bg-[#F5FCF9] text-[#09263A]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#F5FCF9]">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#E5F7F0] opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#DDF5EC] opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DDEAE6] text-[#087F5B] text-sm font-semibold mb-6 shadow-sm">
              <Cookie className="w-4 h-4" />
              Cookies
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#09263A]">
              Cookie Policy
            </h1>

            <p className="mt-6 text-lg lg:text-xl leading-8 text-[#687B78] max-w-2xl">
              This Cookie Policy explains how ComplyTax UK uses cookies and
              similar technologies when you visit or use our website.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-[#71827F]">
              <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
              Last updated: 09 September 2026
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="bg-white border-t border-[#DDEAE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-12 lg:gap-20">
            {/* ================= SIDEBAR ================= */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-[#F5FCF9] border border-[#DDEAE6] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#087F5B] mb-4">
                  On this page
                </p>

                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block px-3 py-2 rounded-lg text-sm text-[#687B78] hover:text-[#087F5B] hover:bg-white transition-colors"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ================= MAIN CONTENT ================= */}
            <main className="max-w-4xl">
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  1. Introduction
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  ComplyTax UK uses cookies and similar technologies to help
                  our website function correctly, understand how visitors use
                  our website, remember preferences, and improve your overall
                  experience.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  This Cookie Policy should be read together with our{" "}
                  <Link
                    to="/privacy"
                    className="text-[#087F5B] font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  . It explains what cookies are, why we use them, and the
                  choices available to you.
                </p>
              </section>

              {/* What are cookies */}
              <section id="what-are-cookies" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  2. What are cookies?
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Cookies are small text files that websites can place on your
                  computer, tablet, or mobile device. They allow a website to
                  recognise your device and remember certain information about
                  your visit.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  Cookies may be temporary and deleted when you close your
                  browser, or they may remain on your device for a defined
                  period of time.
                </p>
              </section>

              {/* How we use */}
              <section id="how-we-use" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  3. How we use cookies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  We may use cookies and similar technologies for purposes
                  including:
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    "Keeping our website secure and functional",
                    "Remembering your preferences and settings",
                    "Understanding website usage and performance",
                    "Improving our website and services",
                    "Helping us identify technical issues",
                    "Supporting relevant communications and marketing",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-[#DDEAE6] bg-[#F5FCF9] p-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                      <span className="text-sm leading-6 text-[#687B78]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Types */}
              <section id="types" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  4. Types of cookies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  The cookies used on our website may be grouped into several
                  categories depending on their purpose.
                </p>
              </section>

              {/* Essential */}
              <section id="essential" className="scroll-mt-24 mb-14">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F7F0] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#087F5B]" />
                  </div>

                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                      5. Essential cookies
                    </h2>

                    <p className="mt-5 text-[#687B78] leading-7">
                      Essential cookies are required for certain parts of the
                      website to work correctly. They may support functions
                      such as authentication, security, navigation, session
                      management, and other core website functionality.
                    </p>

                    <p className="mt-4 text-[#687B78] leading-7">
                      Because these cookies are necessary for the operation of
                      the website, they may not always be available for
                      opt-out through standard cookie preference controls.
                    </p>
                  </div>
                </div>
              </section>

              {/* Analytics */}
              <section id="analytics" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  6. Analytics cookies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Analytics cookies help us understand how visitors interact
                  with our website. They may provide information such as which
                  pages are visited, how users navigate the website, and
                  whether visitors encounter errors.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  This information can help us improve website performance,
                  content, usability, and the services we provide.
                </p>
              </section>

              {/* Preferences */}
              <section id="preferences" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  7. Preference cookies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Preference cookies allow the website to remember choices you
                  make, such as language, region, display preferences, or
                  other settings, so that you do not need to provide them
                  repeatedly.
                </p>
              </section>

              {/* Marketing */}
              <section id="marketing" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  8. Marketing cookies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Where used, marketing cookies may help us understand
                  interactions with our marketing communications and display
                  or measure relevant advertising.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  These cookies should only be used where permitted by
                  applicable law and, where required, after you have provided
                  the appropriate consent.
                </p>
              </section>

              {/* Third Party */}
              <section id="third-party" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  9. Third-party cookies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Some cookies may be placed by third-party services that
                  appear on or support our website. These third parties may
                  include analytics, payment, security, customer support, or
                  other technology providers.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  Third-party providers may process information collected
                  through their cookies in accordance with their own privacy
                  policies and terms.
                </p>
              </section>

              {/* Manage */}
              <section id="manage" className="scroll-mt-24 mb-14">
                <div className="rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-6 lg:p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#DDEAE6] flex items-center justify-center">
                      <Settings2 className="w-5 h-5 text-[#087F5B]" />
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                      10. Managing cookies
                    </h2>
                  </div>

                  <p className="mt-5 text-[#687B78] leading-7">
                    You can manage cookies through your browser settings. Most
                    browsers allow you to view, delete, block, or restrict
                    cookies.
                  </p>

                  <p className="mt-4 text-[#687B78] leading-7">
                    You may also be able to manage non-essential cookies
                    through the cookie preference tools provided on our
                    website.
                  </p>

                  <div className="mt-6 rounded-xl bg-white border border-[#DDEAE6] p-5">
                    <p className="text-sm font-semibold text-[#09263A]">
                      Please note
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#687B78]">
                      Blocking or deleting certain cookies may affect how parts
                      of our website function or may prevent some features from
                      working as intended.
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes */}
              <section id="changes" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  11. Changes to this Cookie Policy
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  We may update this Cookie Policy from time to time to reflect
                  changes to our website, technologies, services, or legal and
                  regulatory requirements.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  When we make changes, we will update the “Last updated” date
                  at the beginning of this policy.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24 mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  12. Contact us
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  If you have questions about this Cookie Policy or how we use
                  cookies, please contact our team.
                </p>

                <div className="mt-6 rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-6">
                  <p className="font-semibold text-[#09263A]">
                    ComplyTax UK
                  </p>

                  <p className="mt-2 text-[#687B78]">
                    Email:{" "}
                    <a
                      href="mailto:hello@complytax.co.uk"
                      className="text-[#087F5B] font-medium hover:underline"
                    >
                      hello@complytax.co.uk
                    </a>
                  </p>
                </div>
              </section>
            </main>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#004646]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-[#004646]">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-[#65D9BB]/20" />
            <div className="absolute -right-8 -bottom-32 w-72 h-72 rounded-full border border-[#65D9BB]/10" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#65D9BB]">
                  Need help?
                </p>

                <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-white">
                  Have questions about cookies?
                </h2>

                <p className="mt-3 text-[#B8D8D0] max-w-xl">
                  Visit our Help Centre or contact our team if you need more
                  information about how ComplyTax UK uses cookies.
                </p>
              </div>

              <Link
                to="/help"
                className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3.5 rounded-xl bg-[#65D9BB] text-[#004646] font-semibold hover:bg-white transition-colors"
              >
                Visit Help Centre
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;