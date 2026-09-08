import React from "react";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // =========================================================
  // FOOTER LINKS
  // =========================================================

  const footerLinks = {
    products: [
      {
        name: "Corporation Tax",
        url: "/corporation-tax",
      },
      {
        name: "Annual Accounts",
        url: "/annual-accounts",
      },
      {
        name: "VAT Returns",
        url: "/mtd-vat",
      },
      {
        name: "Confirmation Statement",
        url: "/confirmation-statement",
      },
      {
        name: "Self Assessment",
        url: "/self-assessment",
      },
    ],

    company: [
      {
        name: "About Us",
        url: "/about",
      },
      {
        name: "Careers",
        url: "/careers",
      },
      {
        name: "Contact",
        url: "/contact",
      },
      {
        name: "Pricing",
        url: "/pricing",
      },
      {
        name: "Security",
        url: "/security",
      },
    ],

    resources: [
      {
        name: "Blog",
        url: "/blog",
      },
      {
        name: "Guides",
        url: "/guides",
      },
      {
        name: "Help Centre",
        url: "/help",
      },
      {
        name: "API",
        url: "/api",
      },
      {
        name: "Integrations",
        url: "/integrations",
      },
    ],
  };

  // =========================================================
  // SOCIAL LINKS
  // =========================================================

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "#",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "#",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
    },
  ];

  return (
    <footer className="bg-white">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* =================================================
              BRAND
          ================================================== */}

          <div className="lg:col-span-4">

            <Link
              to="/"
              className="inline-flex items-center group"
            >

              {/* Logo Icon */}
              <div className="flex h-11 w-11 items-center justify-center">

                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top right leaf */}
                  <path
                    d="M26.5 7C34.5 6.2 41.4 9.1 43 15.5C44.5 21.6 40.4 27.1 33.2 29.2C29.3 30.3 25.6 29.7 22.8 27.7C23.2 19.4 24.1 12.3 26.5 7Z"
                    fill="#087F5B"
                  />

                  {/* Left leaf */}
                  <path
                    d="M20.5 16.5C15.2 13.2 9.4 14 6.2 18.5C3.1 22.9 4.9 28.6 10 31.4C13.3 33.2 17.1 33.2 20.4 31.5C19.1 25.9 19.2 21 20.5 16.5Z"
                    fill="#5ACBA8"
                  />

                  {/* Bottom leaf */}
                  <path
                    d="M21.2 25.8C14.7 25.6 9.7 29 9.2 34C8.7 39.4 13.8 43.2 19.5 42.8C25.1 42.5 29.1 38.5 28.5 33.7C27.9 29.6 25.3 27 21.2 25.8Z"
                    fill="#8CDEC3"
                  />
                </svg>

              </div>

              {/* Brand Name */}
              <div className="ml-2">

                <div className="text-xl font-bold leading-none tracking-tight text-heading">
                  ComplyTax{" "}
                  <span className="text-primary">
                    UK
                  </span>
                </div>

                <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-text-muted">
                  Simple Business Compliance
                </div>

              </div>

            </Link>


            {/* Social Icons */}

            <div className="mt-7 flex items-center gap-3">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center

                      rounded-full

                      bg-background-soft

                      text-text-secondary

                      border
                      border-border-light

                      transition-all
                      duration-200

                      hover:bg-primary
                      hover:text-white
                      hover:border-primary

                      hover:-translate-y-0.5
                    "
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}

            </div>

          </div>


          {/* =================================================
              PRODUCTS
          ================================================== */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold text-heading">
              Products
            </h3>

            <ul className="mt-5 space-y-3">

              {footerLinks.products.map((link) => (
                <li key={link.name}>

                  <Link
                    to={link.url}
                    className="
                      text-sm
                      text-text-secondary

                      transition-colors
                      duration-200

                      hover:text-primary
                    "
                  >
                    {link.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =================================================
              COMPANY
          ================================================== */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold text-heading">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              {footerLinks.company.map((link) => (
                <li key={link.name}>

                  <Link
                    to={link.url}
                    className="
                      text-sm
                      text-text-secondary

                      transition-colors
                      duration-200

                      hover:text-primary
                    "
                  >
                    {link.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =================================================
              RESOURCES
          ================================================== */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold text-heading">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">

              {footerLinks.resources.map((link) => (
                <li key={link.name}>

                  <Link
                    to={link.url}
                    className="
                      text-sm
                      text-text-secondary

                      transition-colors
                      duration-200

                      hover:text-primary
                    "
                  >
                    {link.name}
                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =================================================
              NEWSLETTER
          ================================================== */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold text-heading">
              Stay updated
            </h3>

            <p className="mt-4 text-sm leading-6 text-text-secondary">
              Get the latest tax news and product updates.
            </p>


            {/* Newsletter Input */}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5"
            >

              <div
                className="
                  flex
                  items-center

                  overflow-hidden

                  rounded-lg

                  border
                  border-border

                  bg-white

                  transition-all
                  duration-200

                  focus-within:border-primary
                  focus-within:ring-2
                  focus-within:ring-primary/10
                "
              >

                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="
                    min-w-0
                    flex-1

                    bg-transparent

                    px-4
                    py-2.5

                    text-sm
                    text-heading

                    placeholder:text-text-muted

                    outline-none
                  "
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0

                    items-center
                    justify-center

                    bg-primary
                    text-white

                    transition-colors
                    duration-200

                    hover:bg-primary-hover

                    cursor-pointer
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FOOTER
      ====================================================== */}

      <div className="border-t border-border-light">

        <div
          className="
            mx-auto
            max-w-7xl

            px-6
            py-6

            lg:px-8

            flex
            flex-col
            gap-5

            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* Copyright */}

          <p className="text-xs text-text-secondary">
            © {currentYear} ComplyTax UK. All rights reserved.
          </p>


          {/* Legal Links */}

          <div className="flex flex-wrap items-center gap-5">

            <Link
              to="/terms"
              className="
                text-xs
                text-text-secondary
                hover:text-primary
                transition-colors
              "
            >
              Terms
            </Link>

            <Link
              to="/privacy"
              className="
                text-xs
                text-text-secondary
                hover:text-primary
                transition-colors
              "
            >
              Privacy
            </Link>

            <Link
              to="/cookies"
              className="
                text-xs
                text-text-secondary
                hover:text-primary
                transition-colors
              "
            >
              Cookies
            </Link>

            <Link
              to="/accessibility"
              className="
                text-xs
                text-text-secondary
                hover:text-primary
                transition-colors
              "
            >
              Accessibility
            </Link>

          </div>


          {/* =================================================
              COUNTRY SELECTOR
          ================================================== */}

          <button
            type="button"
            className="
              flex
              items-center
              gap-2

              text-xs
              font-medium

              text-text-secondary

              hover:text-primary

              transition-colors
              duration-200

              cursor-pointer
            "
          >

            {/* UK Flag */}
            <span
              className="
                flex
                h-4
                w-5
                items-center
                justify-center

                overflow-hidden

                rounded-sm

                text-[13px]
              "
            >
              🇬🇧
            </span>

            <span>
              United Kingdom
            </span>

            <ChevronDown className="h-3.5 w-3.5" />

          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;