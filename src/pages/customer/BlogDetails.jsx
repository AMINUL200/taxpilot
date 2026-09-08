import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  UserRound,
  Share2,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const BlogDetails = () => {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState("");

  // Refs for each section
  const sectionRefs = {
    "what-is-corporation-tax": useRef(null),
    "who-needs-to-pay": useRef(null),
    "when-do-you-need-to-file": useRef(null),
    "make-compliance-simpler": useRef(null),
  };

  // Article data
  const article = {
    category: "TAX GUIDES",
    date: "12 Aug 2026",
    readTime: "8 min read",
    title: "A beginner's guide to Corporation Tax in the UK",
    excerpt:
      "Everything you need to know about Corporation Tax, from understanding your responsibilities to preparing and filing your Company Tax Return.",
    author: "TaxPilot UK",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop&crop=center",
  };

  const relatedArticles = [
    {
      category: "ACCOUNTING",
      date: "8 Aug 2026",
      title: "What small businesses need to know about annual accounts",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=500&fit=crop&crop=center",
      slug: "small-business-annual-accounts",
    },
    {
      category: "VAT",
      date: "5 Aug 2026",
      title: "Making Tax Digital for VAT: a simple guide",
      image: "https://images.unsplash.com/photo-1554224155-26032ffc0d07?w=800&h=500&fit=crop&crop=center",
      slug: "making-tax-digital-vat",
    },
    {
      category: "TAX GUIDES",
      date: "2 Aug 2026",
      title: "Understanding your company's tax deadlines",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop&crop=center",
      slug: "understanding-tax-deadlines",
    },
  ];

  // Table of contents sections
  const tableOfContents = [
    {
      id: "what-is-corporation-tax",
      label: "What is Corporation Tax?",
    },
    {
      id: "who-needs-to-pay",
      label: "Who needs to pay?",
    },
    {
      id: "when-do-you-need-to-file",
      label: "When do you need to file?",
    },
    {
      id: "make-compliance-simpler",
      label: "Make compliance simpler",
    },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId]?.current;
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      
      // Check each section's position
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          // If section is in view (top of section is above center of viewport)
          if (rect.top <= window.innerHeight / 2) {
            currentSection = id;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle share button
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.log("Unable to copy link");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#09263A]">

      {/* =====================================================
          ARTICLE HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F5FCF9]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#DDF5EC] opacity-70 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[#E7F8F2] opacity-80 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 lg:px-10 lg:pb-20">

          {/* Breadcrumb */}
          <div className="mb-10 flex items-center gap-2 text-[12px] text-[#71827F]">
            <Link
              to="/"
              className="transition-colors hover:text-[#087F5B]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              to="/blog"
              className="transition-colors hover:text-[#087F5B]"
            >
              Blog
            </Link>

            <span>/</span>

            <span className="max-w-[200px] truncate text-[#087F5B] sm:max-w-none">
              {article.category}
            </span>
          </div>

          <div className="mx-auto max-w-4xl text-center">

            {/* Category */}
            <div className="mb-5 inline-flex items-center rounded-full border border-[#C9EDE1] bg-white px-3 py-1.5">
              <span className="text-[10px] font-bold tracking-[0.12em] text-[#087F5B]">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[36px] font-bold leading-[1.12] tracking-[-0.035em] text-[#09263A] sm:text-[46px] lg:text-[54px]">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#687B78] sm:text-[16px]">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] text-[#71827F]">

              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-[#087F5B]" />
                <span>{article.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#087F5B]" />
                <span>{article.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#087F5B]" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED IMAGE
      ====================================================== */}
      <section className="px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl -translate-y-1">

          <div className="overflow-hidden rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] shadow-[0_20px_50px_rgba(0,62,62,0.10)]">
            <img
              src={article.image}
              alt={article.title}
              className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[500px]"
            />
          </div>

        </div>
      </section>

      {/* =====================================================
          ARTICLE CONTENT
      ====================================================== */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-12 lg:grid-cols-[1fr_260px]">

            {/* Main article */}
            <article className="mx-auto w-full max-w-3xl">

              {/* Intro */}
              <p className="text-[17px] font-medium leading-8 text-[#314D4A]">
                Corporation Tax is one of the key responsibilities for UK
                limited companies. Understanding what you need to pay,
                when you need to pay it and how to file your return can
                help you avoid unnecessary penalties and stay compliant.
              </p>

              <div className="my-10 h-px bg-[#E5EEEB]" />

              {/* Section 1 */}
              <div ref={sectionRefs["what-is-corporation-tax"]}>
                <h2 className="text-[26px] font-bold tracking-[-0.02em] text-[#09263A]">
                  What is Corporation Tax?
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-[#687B78]">
                  Corporation Tax is a tax on the profits made by companies
                  and certain other organisations. If you operate a limited
                  company in the UK, your company will generally need to
                  consider whether it has a Corporation Tax liability.
                </p>

                <p className="mt-4 text-[14px] leading-7 text-[#687B78]">
                  The amount your company pays depends on its taxable
                  profits and the applicable Corporation Tax rules. Keeping
                  accurate financial records throughout the year makes it
                  much easier to prepare your return when it is due.
                </p>
              </div>

              {/* Section 2 */}
              <div ref={sectionRefs["who-needs-to-pay"]}>
                <h2 className="mt-10 text-[26px] font-bold tracking-[-0.02em] text-[#09263A]">
                  Who needs to pay Corporation Tax?
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-[#687B78]">
                  Most UK limited companies are within the Corporation Tax
                  regime. Your responsibilities can depend on the structure
                  of your business, where it operates and the type of income
                  or profits it generates.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Limited companies",
                    "Some foreign companies operating in the UK",
                    "Certain clubs, societies and associations",
                    "Other organisations that fall within the Corporation Tax rules",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-lg bg-[#F5FCF9] px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#087F5B]" />

                      <span className="text-[13px] leading-6 text-[#526966]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key takeaway */}
              <div className="my-10 rounded-2xl border border-[#CFE9DF] bg-[#F1FBF7] p-6 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087F5B]">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#087F5B]">
                      Key takeaway
                    </p>

                    <p className="mt-2 text-[14px] leading-7 text-[#314D4A]">
                      Keeping your company records organised throughout
                      the year can make preparing your Corporation Tax
                      return considerably simpler.
                    </p>
                  </div>

                </div>
              </div>

              {/* Section 3 */}
              <div ref={sectionRefs["when-do-you-need-to-file"]}>
                <h2 className="mt-10 text-[26px] font-bold tracking-[-0.02em] text-[#09263A]">
                  When do you need to file?
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-[#687B78]">
                  Corporation Tax has separate deadlines for filing your
                  Company Tax Return and paying any Corporation Tax that
                  is due. It is important to understand both deadlines and
                  allow enough time to prepare your accounts and supporting
                  information.
                </p>

                {/* Numbered steps */}
                <div className="mt-7 space-y-5">

                  {[
                    {
                      number: "01",
                      title: "Prepare your accounts",
                      text: "Make sure your company's financial records are complete and accurate.",
                    },
                    {
                      number: "02",
                      title: "Calculate your taxable profit",
                      text: "Determine the profit that is subject to Corporation Tax.",
                    },
                    {
                      number: "03",
                      title: "Review your return",
                      text: "Check the information carefully before submitting your Company Tax Return.",
                    },
                    {
                      number: "04",
                      title: "File and pay",
                      text: "Submit the required information and make any payment that is due by the relevant deadline.",
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="flex gap-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5F7F0] text-[10px] font-bold text-[#087F5B]">
                        {step.number}
                      </div>

                      <div>
                        <h3 className="text-[14px] font-bold text-[#09263A]">
                          {step.title}
                        </h3>

                        <p className="mt-1 text-[13px] leading-6 text-[#71827F]">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Section 4 */}
              <div ref={sectionRefs["make-compliance-simpler"]}>
                <h2 className="mt-12 text-[26px] font-bold tracking-[-0.02em] text-[#09263A]">
                  Make compliance simpler
                </h2>

                <p className="mt-4 text-[14px] leading-7 text-[#687B78]">
                  Tax compliance does not need to be complicated. With the
                  right information and a clear process, businesses can
                  manage their obligations more confidently.
                </p>

                <p className="mt-4 text-[14px] leading-7 text-[#687B78]">
                  TaxPilot UK brings Corporation Tax, annual accounts and
                  other important compliance tasks together in one simple
                  platform, helping you spend less time dealing with
                  paperwork and more time running your business.
                </p>
              </div>

              {/* Share */}
              <div className="mt-12 flex flex-col gap-4 border-t border-[#E5EEEB] pt-7 sm:flex-row sm:items-center sm:justify-between">

                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#087F5B]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to blog
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#687B78] transition-colors hover:text-[#087F5B]"
                >
                  <Share2 className="h-4 w-4" />
                  Share article
                </button>

              </div>
            </article>

            {/* =================================================
                SIDEBAR - Table of Contents
            ================================================== */}
            <aside className="hidden lg:block">

              <div className="sticky top-8">

                <div className="rounded-2xl border border-[#DDEAE6] bg-[#F5FCF9] p-5">

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#087F5B]">
                    In this article
                  </p>

                  <div className="mt-4 space-y-3">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left border-l-2 pl-3 text-[12px] leading-5 transition-all hover:text-[#087F5B] ${
                          activeSection === item.id
                            ? "border-[#087F5B] text-[#087F5B] font-semibold"
                            : "border-transparent text-[#687B78]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Sidebar CTA */}
                <div className="mt-5 rounded-2xl bg-[#004646] p-6">

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#65D9BB]">
                    TaxPilot UK
                  </p>

                  <h3 className="mt-3 text-[19px] font-bold leading-6 text-white">
                    Make tax compliance simpler.
                  </h3>

                  <p className="mt-3 text-[12px] leading-5 text-[#BCD8D3]">
                    Prepare and manage your business compliance in one
                    simple platform.
                  </p>

                  <Link
                    to="/register"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#65D9BB] px-4 py-3 text-[11px] font-bold text-[#003E3E] transition-colors hover:bg-[#7BE1C8]"
                  >
                    Get started for free
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED ARTICLES
      ====================================================== */}
      <section className="bg-[#F5FCF9] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-10 flex items-end justify-between gap-5">

            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#087F5B]">
                Keep reading
              </p>

              <h2 className="text-[30px] font-bold tracking-[-0.025em] text-[#09263A]">
                Related articles
              </h2>
            </div>

            <Link
              to="/blog"
              className="group hidden items-center gap-2 text-[13px] font-semibold text-[#087F5B] sm:flex"
            >
              View all articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#DDEAE6] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,62,62,0.08)]"
              >

                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[190px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">

                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="font-bold tracking-[0.08em] text-[#087F5B]">
                      {item.category}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#B5C6C2]" />

                    <span className="text-[#8A9B97]">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[16px] font-bold leading-6 text-[#09263A] transition-colors group-hover:text-[#087F5B]">
                    {item.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-[#087F5B]">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#004646] px-7 py-10 sm:px-10 lg:px-14 lg:py-12">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full border border-[#27756F]/40" />

          <div className="pointer-events-none absolute -bottom-32 left-[40%] h-64 w-64 rounded-full border border-[#27756F]/30" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#65D9BB]">
                Ready to get started?
              </p>

              <h2 className="mt-2 text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[30px]">
                Make compliance one less thing to worry about.
              </h2>

              <p className="mt-2 text-[13px] text-[#C2DCD7]">
                Simple, secure and built for UK businesses.
              </p>
            </div>

            <Link
              to="/register"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#65D9BB] px-6 py-3.5 text-[12px] font-bold text-[#003E3E] transition-all hover:bg-[#7BE1C8]"
            >
              Get started for free

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogDetails;