import React from "react";
import { ArrowRight } from "lucide-react";

const BlogSection = () => {
  const articles = [
    {
      category: "TAX GUIDES",
      date: "12 Aug 2026",
      title: "A beginner's guide to Corporation Tax in the UK",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center",
      url: "/blog/beginners-guide-corporation-tax",
    },
    {
      category: "ACCOUNTING",
      date: "8 Aug 2026",
      title: "What small businesses need to know about annual accounts",
      image:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=500&fit=crop&crop=center",
      url: "/blog/small-business-annual-accounts",
    },
    {
      category: "VAT",
      date: "5 Aug 2026",
      title: "Making Tax Digital for VAT: a simple guide",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop&crop=center",
      url: "/blog/making-tax-digital-vat",
    },
  ];
  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto
          max-w-7xl

          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-20
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          {/* LEFT */}

          <div className="max-w-2xl">
            {/* Label */}

            <div
              className="
                mb-3
                inline-flex
                items-center

                rounded-full

                border
                border-primary-soft

                bg-primary-light

                px-3
                py-1
              "
            >
              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-primary
                "
              >
                Latest from our blog
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                text-3xl
                font-bold
                leading-[1.05]
                tracking-[-0.035em]

                text-heading

                sm:text-4xl

                lg:text-[40px]
              "
            >
              Guides, tips and insights
            </h2>

            {/* Description */}

            <p
              className="
                mt-3

                text-sm
                leading-6

                text-text-secondary

                sm:text-[15px]
              "
            >
              Stay informed with the latest tax news, guides and advice for UK
              businesses.
            </p>
          </div>

          {/* =================================================
              VIEW ALL
          ================================================== */}

          <a
            href="/blog"
            className="
              btn-secondary

              shrink-0
              self-start

              px-5
              py-2.5

              text-xs

              md:self-end
            "
          >
            <span>View all articles</span>

            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* =====================================================
            ARTICLES
        ====================================================== */}

        <div
          className="
            mt-8

            grid
            grid-cols-1
            gap-5

            md:grid-cols-3
          "
        >
          {articles.map((article) => (
            <article
              key={article.title}
              className="
                group

                overflow-hidden

                rounded-xl

                border
                border-border-light

                bg-white

                shadow-[0_4px_18px_rgba(16,42,67,0.025)]

                transition-all
                duration-300

                hover:-translate-y-1

                hover:border-primary/20

                hover:shadow-[0_12px_30px_rgba(16,42,67,0.07)]
              "
            >
              {/* =================================================
                  IMAGE
              ================================================== */}

              <a
                href={article.url}
                className="
                  block
                  overflow-hidden
                "
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="
                    aspect-[1.9/1]
                    w-full

                    object-cover

                    transition-transform
                    duration-500

                    group-hover:scale-[1.035]
                  "
                />
              </a>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  px-5
                  pb-5
                  pt-4
                "
              >
                {/* Category + Date */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className="
                      rounded-full

                      bg-primary-light

                      px-2.5
                      py-1

                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.08em]

                      text-primary
                    "
                  >
                    {article.category}
                  </span>

                  <time
                    className="
                      shrink-0

                      text-[10px]

                      text-text-muted
                    "
                  >
                    {article.date}
                  </time>
                </div>

                {/* Title */}

                <a href={article.url}>
                  <h3
                    className="
                      mt-3

                      min-h-[42px]

                      text-[15px]
                      font-bold
                      leading-[1.35]

                      tracking-[-0.01em]

                      text-heading

                      transition-colors
                      duration-200

                      group-hover:text-primary
                    "
                  >
                    {article.title}
                  </h3>
                </a>

                {/* Read More */}

                <a
                  href={article.url}
                  className="
                    mt-4

                    inline-flex
                    items-center
                    gap-1.5

                    text-[11px]
                    font-semibold

                    text-primary

                    transition-all
                    duration-200

                    group-hover:gap-2
                  "
                >
                  <span>Read more</span>

                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
