import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  AlertCircle,
  FileText,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

/* ============================================================
   TERMS & CONDITIONS (Public, dynamic)
   Fetches: GET /legal-pages/terms
============================================================ */

const Terms = () => {
  const shouldReduceMotion = useReducedMotion();
  const premiumEase = [0.22, 1, 0.36, 1];

  /* ============================================================
     STATE
  ============================================================ */

  const [sections, setSections] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page_name: "", slug: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ============================================================
     FETCH
  ============================================================ */

  useEffect(() => {
    let cancelled = false;

    const fetchTerms = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/legal-pages/terms");

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load terms."
          );
        }

        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        // Filter active + sort by is_order ascending
        const sorted = data
          .filter((item) => item.is_active !== false)
          .sort((a, b) => (a.is_order ?? 0) - (b.is_order ?? 0));

        if (!cancelled) {
          setSections(sorted);
          setPageInfo({
            page_name: sorted[0]?.page_name || "Terms",
            slug: sorted[0]?.slug || "terms",
          });
        }
      } catch (err) {
        console.error("Fetch terms error:", err);
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Something went wrong."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTerms();

    return () => {
      cancelled = true;
    };
  }, []);

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
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 },
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

  /* ============================================================
     HELPERS
  ============================================================ */

  const slugify = (text) =>
    String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const buildId = (item, index) =>
    item.slug && item.title
      ? `${item.slug}-${slugify(item.title)}`
      : `section-${item.id ?? index + 1}`;

  const lastUpdated = () => {
    if (!sections.length) return "—";
    const dates = sections
      .map((s) => s.updated_at)
      .filter(Boolean)
      .map((d) => new Date(d).getTime());
    if (!dates.length) return "—";
    const latest = new Date(Math.max(...dates));
    return latest.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /* ============================================================
     RENDER — LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-3 text-sm text-text-secondary">
            Loading Terms &amp; Conditions...
          </p>
        </div>
      </div>
    );
  }

  /* ============================================================
     RENDER — ERROR
  ============================================================ */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md rounded-2xl border border-danger-light bg-background p-8 text-center shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-light">
            <AlertCircle className="h-7 w-7 text-danger" strokeWidth={2} />
          </div>
          <h2 className="mt-4 text-lg font-bold text-heading">
            Unable to load Terms
          </h2>
          <p className="mt-2 text-sm text-text-secondary">{error}</p>
          <Link
            to="/"
            className="
              mt-5 inline-flex items-center gap-2 rounded-lg bg-primary
              px-5 py-2.5 text-xs font-bold text-text-white shadow-button
              transition-all hover:bg-primary-hover
            "
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  /* ============================================================
     RENDER — MAIN
  ============================================================ */

  return (
    <div className="min-h-screen bg-background text-heading">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-background-soft">
        {/* Decorative circles */}
        <motion.div
          className="
            pointer-events-none absolute -left-24 -top-24 h-72 w-72
            rounded-full border border-sky/15
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
            pointer-events-none absolute -left-10 -top-10 h-48 w-48
            rounded-full border border-sky/15
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
            pointer-events-none absolute -bottom-32 -right-20 h-80 w-80
            rounded-full border border-sky/15
          "
        />

        <motion.div
          className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              variants={heroItemVariants}
              className="mb-5 flex justify-center"
            >
              <span
                className="
                  inline-flex items-center gap-2 rounded-full bg-primary-light
                  px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em]
                  text-primary
                "
              >
                <FileText className="h-3.5 w-3.5" />
                Legal
              </span>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="
                text-4xl font-bold tracking-tight text-heading
                sm:text-5xl lg:text-6xl
              "
            >
              Terms &amp; <span className="text-primary">Conditions</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="
                mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary
                sm:text-base
              "
            >
              These terms explain the rules and conditions that apply when you
              use the ComplyTax UK website, platform and services.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="
                mt-7 inline-flex items-center gap-2 rounded-lg border
                border-border bg-background px-4 py-2.5 shadow-card
              "
            >
              <span className="text-xs text-text-secondary">Last updated</span>
              <span className="text-xs font-semibold text-heading">
                {lastUpdated()}
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
                DESKTOP TABLE OF CONTENTS
            ================================================= */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p
                  className="
                    mb-4 text-[10px] font-bold uppercase tracking-[0.16em]
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
                  {sections.map((section, index) => {
                    const id = buildId(section, index);
                    return (
                      <motion.a
                        key={section.id ?? id}
                        href={`#${id}`}
                        variants={tocItemVariants}
                        className="
                          block border-l-2 border-transparent px-4 py-2
                          text-xs leading-5 text-text-secondary
                          transition-all duration-200
                          hover:border-primary hover:bg-background-soft
                          hover:text-primary
                        "
                      >
                        {section.title}
                      </motion.a>
                    );
                  })}
                </motion.nav>

                {/* Help card */}
                <motion.div
                  className="
                    mt-8 rounded-2xl border border-border bg-background-soft p-5
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
                  <h3 className="text-sm font-bold text-heading">
                    Need help?
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-text-secondary">
                    If you have questions about these terms, our support team
                    can help.
                  </p>
                  <Link
                    to="/help"
                    className="
                      mt-4 inline-flex items-center gap-1 text-xs font-bold
                      text-primary transition-colors duration-200
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
              {/* Mobile TOC */}
              <motion.div
                className="
                  mb-10 rounded-xl border border-border bg-background-soft p-5
                  lg:hidden
                "
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: premiumEase }}
              >
                <p
                  className="
                    mb-3 text-[10px] font-bold uppercase tracking-[0.15em]
                    text-primary
                  "
                >
                  On this page
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {sections.map((section, index) => {
                    const id = buildId(section, index);
                    return (
                      <a
                        key={section.id ?? id}
                        href={`#${id}`}
                        className="
                          text-xs text-text-secondary transition-colors
                          duration-200 hover:text-primary
                        "
                      >
                        {section.title}
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Dynamic sections */}
              {sections.length === 0 && (
                <div className="rounded-xl border border-border bg-background-soft p-8 text-center">
                  <p className="text-sm text-text-secondary">
                    No content available yet.
                  </p>
                </div>
              )}

              {sections.map((section, index) => {
                const id = buildId(section, index);
                const isLast = index === sections.length - 1;

                return (
                  <motion.div
                    key={section.id ?? id}
                    id={id}
                    className={`
                      scroll-mt-28 py-10
                      ${!isLast ? "border-b border-border/50" : ""}
                      ${index === 0 ? "pt-0" : ""}
                    `}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <span className="text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="mt-2 text-2xl font-bold text-heading">
                      {section.title}
                    </h2>

                    {/* Rich HTML content from API */}
                    <div
                      className="
                        mt-4 text-sm leading-7 text-text-secondary
                        [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-heading
                        [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-heading
                        [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-heading
                        [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-heading
                        [&_p]:mb-3 [&_p]:leading-7
                        [&_p:last-child]:mb-0
                        [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5
                        [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5
                        [&_li]:mb-1.5
                        [&_a]:text-primary [&_a]:underline [&_a]:font-semibold
                        hover:[&_a]:text-primary-hover
                        [&_strong]:font-bold [&_strong]:text-heading
                        [&_em]:italic
                        [&_blockquote]:my-3 [&_blockquote]:border-l-4
                        [&_blockquote]:border-primary/40
                        [&_blockquote]:bg-primary-light/40
                        [&_blockquote]:py-3 [&_blockquote]:pl-4
                        [&_blockquote]:italic [&_blockquote]:text-text-secondary
                        [&_code]:rounded [&_code]:bg-background-soft
                        [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono
                        [&_code]:text-[12px] [&_code]:text-text-secondary
                        [&_hr]:my-6 [&_hr]:border-border-light
                        [&_svg]:inline-block [&_svg]:align-text-bottom
                        [&_svg]:h-4 [&_svg]:w-4 [&_svg]:mr-1.5
                        [&_svg]:text-primary

                        /* Reset inline styles that came from the editor */
                        [&_*]:!bg-transparent
                        [&_*]:!border-0
                        [&_*]:!p-0 [&_*]:!m-0
                      "
                      dangerouslySetInnerHTML={{
                        __html: section.description || "",
                      }}
                    />
                  </motion.div>
                );
              })}
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
        <motion.div
          className="
            pointer-events-none absolute -left-20 -top-20 h-64 w-64
            rounded-full border border-sky/10
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
            pointer-events-none absolute -bottom-24 -right-20 h-72 w-72
            rounded-full border border-sky/10
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
              mx-auto flex h-11 w-11 items-center justify-center rounded-full
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
              mx-auto mt-3 max-w-xl text-sm leading-7 text-text-white/60
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
                group mt-7 inline-flex items-center gap-2 rounded-xl bg-sky
                px-6 py-3.5 text-sm font-bold text-dark shadow-button
                transition-colors duration-200 hover:bg-sky-light
              "
            >
              Visit Help Centre
              <ArrowRight
                className="
                  h-4 w-4 transition-transform group-hover:translate-x-1
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