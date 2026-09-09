import React from "react";
import { Link } from "react-router-dom";
import {
  Accessibility,
  ArrowRight,
  CheckCircle2,
  Eye,
  Keyboard,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const AccessibilityPage = () => {
  const sections = [
    { id: "commitment", label: "Our commitment" },
    { id: "accessibility", label: "Accessibility features" },
    { id: "website", label: "Website accessibility" },
    { id: "keyboard", label: "Keyboard navigation" },
    { id: "visual", label: "Visual accessibility" },
    { id: "content", label: "Accessible content" },
    { id: "assistive", label: "Assistive technologies" },
    { id: "limitations", label: "Known limitations" },
    { id: "feedback", label: "Accessibility feedback" },
    { id: "improvements", label: "Ongoing improvements" },
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
              <Accessibility className="w-4 h-4" />
              Accessibility
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#09263A]">
              Accessibility Statement
            </h1>

            <p className="mt-6 text-lg lg:text-xl leading-8 text-[#687B78] max-w-2xl">
              We want ComplyTax UK to be accessible and easy to use for
              everyone, including people who use assistive technologies or
              access the web in different ways.
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
              {/* Commitment */}
              <section id="commitment" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  1. Our commitment
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  ComplyTax UK is committed to making our website and digital
                  services accessible to as many people as possible. We aim to
                  provide a clear, consistent, and usable experience regardless
                  of how you access our services.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  We consider accessibility throughout the design, development,
                  content, and maintenance of our website.
                </p>
              </section>

              {/* Accessibility features */}
              <section id="accessibility" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  2. Accessibility features
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  We work to provide an accessible experience through features
                  and practices such as:
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    "Clear and consistent page structure",
                    "Readable typography and appropriate spacing",
                    "Keyboard-friendly interactive elements",
                    "Meaningful labels for controls and forms",
                    "Visible focus states for interactive elements",
                    "Alternative text for meaningful images",
                    "Clear headings and content hierarchy",
                    "Responsive layouts across different screen sizes",
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

              {/* Website */}
              <section id="website" className="scroll-mt-24 mb-14">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F7F0] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#087F5B]" />
                  </div>

                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                      3. Website accessibility
                    </h2>

                    <p className="mt-5 text-[#687B78] leading-7">
                      We aim for our website to work with commonly used
                      browsers, devices, and assistive technologies. We
                      regularly review our interfaces and content to identify
                      opportunities to improve accessibility.
                    </p>

                    <p className="mt-4 text-[#687B78] leading-7">
                      Accessibility can vary depending on your browser,
                      operating system, device, assistive technology, and
                      individual settings.
                    </p>
                  </div>
                </div>
              </section>

              {/* Keyboard */}
              <section id="keyboard" className="scroll-mt-24 mb-14">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F7F0] flex items-center justify-center shrink-0">
                    <Keyboard className="w-5 h-5 text-[#087F5B]" />
                  </div>

                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                      4. Keyboard navigation
                    </h2>

                    <p className="mt-5 text-[#687B78] leading-7">
                      We aim to make important interactive elements usable
                      without requiring a mouse or other pointing device.
                    </p>

                    <p className="mt-4 text-[#687B78] leading-7">
                      Where appropriate, users should be able to move through
                      links, buttons, form controls, menus, and other
                      interactive elements using standard keyboard controls.
                    </p>
                  </div>
                </div>
              </section>

              {/* Visual */}
              <section id="visual" className="scroll-mt-24 mb-14">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F7F0] flex items-center justify-center shrink-0">
                    <Eye className="w-5 h-5 text-[#087F5B]" />
                  </div>

                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                      5. Visual accessibility
                    </h2>

                    <p className="mt-5 text-[#687B78] leading-7">
                      We aim to present information in a way that is clear and
                      readable. This includes considering text size, spacing,
                      contrast, hierarchy, and the use of visual indicators.
                    </p>

                    <p className="mt-4 text-[#687B78] leading-7">
                      We avoid relying solely on colour to communicate
                      important information wherever practical.
                    </p>
                  </div>
                </div>
              </section>

              {/* Content */}
              <section id="content" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  6. Accessible content
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  We aim to write content using clear language, meaningful
                  headings, descriptive links, and logical page structures.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  Where images communicate meaningful information, we aim to
                  provide suitable alternative text or another accessible way
                  to understand the information.
                </p>
              </section>

              {/* Assistive */}
              <section id="assistive" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  7. Assistive technologies
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Our website is designed with common assistive technologies in
                  mind, including screen readers, keyboard navigation, browser
                  zoom, and other accessibility tools.
                </p>

                <div className="mt-6 rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-6">
                  <p className="font-semibold text-[#09263A]">
                    Accessibility may depend on your setup
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#687B78]">
                    Different combinations of browsers, devices, operating
                    systems, and assistive technologies can produce different
                    results. If you experience a barrier, please let us know so
                    we can investigate it.
                  </p>
                </div>
              </section>

              {/* Limitations */}
              <section id="limitations" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  8. Known limitations
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  We are continually working to improve accessibility, but some
                  parts of our website or third-party services may not yet
                  provide a fully accessible experience.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  Third-party content, integrations, documents, or services may
                  be outside our direct control. Where we become aware of an
                  accessibility issue, we will consider appropriate ways to
                  address or work around it.
                </p>
              </section>

              {/* Feedback */}
              <section id="feedback" className="scroll-mt-24 mb-14">
                <div className="rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-6 lg:p-8">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#DDEAE6] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#087F5B]" />
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                      9. Accessibility feedback
                    </h2>
                  </div>

                  <p className="mt-5 text-[#687B78] leading-7">
                    We welcome feedback about the accessibility of our website
                    and services. If you encounter a barrier, please tell us
                    what happened and, where possible, include the page or
                    feature involved.
                  </p>

                  <p className="mt-4 text-[#687B78] leading-7">
                    You can contact us by email:
                  </p>

                  <a
                    href="mailto:hello@complytax.co.uk"
                    className="inline-flex mt-4 text-[#087F5B] font-semibold hover:underline"
                  >
                    hello@complytax.co.uk
                  </a>
                </div>
              </section>

              {/* Improvements */}
              <section id="improvements" className="scroll-mt-24 mb-14">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  10. Ongoing improvements
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  Accessibility is an ongoing process. We may review our
                  website, design systems, content, and technology to identify
                  areas where the experience can be improved.
                </p>

                <p className="mt-4 text-[#687B78] leading-7">
                  Feedback from customers and website visitors helps us
                  understand where improvements are most useful.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24 mb-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#09263A]">
                  11. Contact us
                </h2>

                <p className="mt-5 text-[#687B78] leading-7">
                  If you need information in an alternative format or require
                  assistance accessing any part of our website or services,
                  please contact us.
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
                  We’re here to help
                </p>

                <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-white">
                  Having an accessibility issue?
                </h2>

                <p className="mt-3 text-[#B8D8D0] max-w-xl">
                  Let us know if you experience a barrier while using
                  ComplyTax UK. Our team will do its best to help.
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

export default AccessibilityPage;