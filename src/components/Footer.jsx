import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {

  // =========================================================
  // GO TO TOP OF HOME PAGE
  // =========================================================
  const handleHomeClick = (e) => {
    e.preventDefault();

    // If already on Home page
    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Go to Home page
      window.location.href = "/";
    }
  };

  return (
    <footer className="bg-slate-950 text-white">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              COMPANY
          ================================================= */}
          <div>

            {/* Logo / Company Name */}
            <button
              type="button"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-3 text-left"
            >

              <div className="flex h-12 w-12 items-center justify-center border border-orange-500 text-xs font-bold text-orange-500">
                LOGO
              </div>

              <div>
                <div className="text-xl font-bold tracking-tight text-white">
                  SAAM
                </div>

                <div className="text-xs font-medium tracking-[0.2em] text-slate-400">
                  INFRASTRUCTURE
                </div>
              </div>

            </button>


            {/* Company Description */}
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Reliable construction and infrastructure solutions delivered
              with quality, precision, safety and long-term value.
            </p>


            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}
            <div className="mt-7">

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Follow Us
              </p>

              <div className="flex items-center gap-3">

                {/* ================= FACEBOOK ================= */}
                <a
                  href="https://www.facebook.com/saaminfrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group flex h-10 w-10 items-center justify-center border border-slate-800 text-slate-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
                  </svg>
                </a>


                {/* ================= INSTAGRAM ================= */}
                <a
                  href="https://www.instagram.com/saaminfrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group flex h-10 w-10 items-center justify-center border border-slate-800 text-slate-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.8"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>


                {/* ================= LINKEDIN ================= */}
                <a
                  href="https://www.linkedin.com/company/saam-infrastructure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group flex h-10 w-10 items-center justify-center border border-slate-800 text-slate-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v10H4V10Zm7 0h5v1.5c.8-1.1 2-1.9 3.7-1.9 3 0 4.3 2 4.3 5.3V20h-5v-4.5c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9V20h-5V10Z" />
                  </svg>
                </a>


                {/* ================= YOUTUBE ================= */}
                <a
                  href="https://www.youtube.com/@saaminfrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="group flex h-10 w-10 items-center justify-center border border-slate-800 text-slate-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23 12s0-3.4-.4-5a2.9 2.9 0 0 0-2-2c-1.7-.4-8.6-.4-8.6-.4s-6.9 0-8.6.4a2.9 2.9 0 0 0-2 2C1 8.6 1 12 1 12s0 3.4.4 5a2.9 2.9 0 0 0 2 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.9 2.9 0 0 0 2-2c.4-1.6.4-5 .4-5ZM10 15.5v-7l6 3.5-6 3.5Z" />
                  </svg>
                </a>

              </div>
            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Quick Links
            </h3>

            <nav className="mt-6 flex flex-col gap-4">

              <Link
                to="/"
                onClick={handleHomeClick}
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                About Us
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Services
              </Link>

              <Link
                to="/projects"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Projects
              </Link>

              <Link
                to="/gallery"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Contact
              </Link>

            </nav>

          </div>


          {/* =================================================
              OUR SERVICES
          ================================================= */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Our Services
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Civil Construction
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Commercial Projects
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Residential Construction
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Infrastructure Development
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Renovation & Development
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 transition hover:text-orange-500"
              >
                Engineering & Project Management
              </Link>

            </div>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              {/* Phone */}
              <a
                href="tel:+910000000000"
                className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-orange-500"
              >
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <span>
                  +91 00000 00000
                </span>
              </a>


              {/* Email */}
              <a
                href="mailto:info@saaminfrastructure.com"
                className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-orange-500"
              >
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <span className="break-all">
                  info@saaminfrastructure.com
                </span>
              </a>


              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-slate-400">

                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <span>
                  Your Office Address
                  <br />
                  Maharashtra, India
                </span>

              </div>

            </div>


            {/* Get Quote */}
            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-3 bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Get a Quote

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>
      </div>


      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}
      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          {/* Copyright */}
          <p>
            © {new Date().getFullYear()} Saam Infrastructure. All rights
            reserved.
          </p>


          {/* Designed and Developed */}
          <p>
            Designed and Developed by{" "}

            <button
              type="button"
              onClick={handleHomeClick}
              className="font-semibold text-slate-400 transition hover:text-orange-500"
            >
              Saam Infrastructure
            </button>
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;