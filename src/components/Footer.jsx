import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";
import saamLogo from "../assets/images/saam-logo.png";

function Footer() {
  const handleHomeClick = (e) => {
    e.preventDefault();

    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/";
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Civil Construction",
    "Commercial Projects",
    "Residential Construction",
    "Infrastructure Development",
    "Renovation & Development",
    "Engineering & Project Management",
  ];

  return (
    <footer className="overflow-hidden bg-[#171916] text-white">

      {/* =====================================================
          START YOUR PROJECT CTA
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-[#C9A24A]/20 bg-[#171916]">

        {/* Decorative glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-1/2
            h-72
            w-72
            -translate-y-1/2
            rounded-full
            bg-[#C9A24A]/5
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            bottom-[-120px]
            h-72
            w-72
            rounded-full
            bg-[#C9A24A]/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            py-14
            sm:px-6
            sm:py-16
            lg:px-8
            lg:py-24
          "
        >
          <div
            className="
              flex
              flex-col
              gap-9
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-12
            "
          >

            {/* CTA CONTENT */}

            <div className="max-w-3xl">

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A24A] sm:w-12" />

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#C9A24A]
                    sm:text-xs
                    md:text-sm
                  "
                >
                  Start Your Project
                </p>
              </div>

              <h2
                className="
                  mt-5
                  text-[2.5rem]
                  font-bold
                  leading-[1.02]
                  tracking-[-0.035em]
                  text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                Have a project
                <br />

                <span className="text-[#C9A24A]">
                  in mind?
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-[#B9B9B0]
                  sm:mt-6
                  sm:text-base
                  sm:leading-8
                  lg:text-lg
                "
              >
                Let's discuss your construction and infrastructure
                requirements and find the right solution for your project.
              </p>
            </div>

            {/* CTA BUTTON */}

            <Link
              to="/contact"
              className="
                group
                flex
                w-full
                items-center
                justify-between
                gap-4
                rounded-full
                border
                border-[#C9A24A]
                bg-[#C9A24A]
                px-5
                py-3
                text-sm
                font-bold
                text-[#171916]
                shadow-[0_12px_30px_rgba(201,162,74,0.18)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#E0C36A]
                hover:bg-[#E0C36A]
                hover:shadow-[0_18px_40px_rgba(201,162,74,0.28)]
                sm:w-fit
                sm:min-w-[185px]
                sm:justify-center
              "
            >
              <span className="pl-1">
                Get a Quote
              </span>

              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#171916]
                  text-[#C9A24A]
                  transition-all
                  duration-300
                  group-hover:rotate-45
                  group-hover:bg-[#11120F]
                "
              >
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>


      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

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
        <div
          className="
            grid
            grid-cols-1
            gap-12
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-10
            xl:gap-14
          "
        >

          {/* =================================================
              COMPANY
          ================================================== */}

          <div
            className="
              text-center
              md:col-span-2
              lg:col-span-1
              lg:text-left
            "
          >

            {/* =================================================
                TRANSPARENT PNG LOGO
            ================================================== */}

            <button
              type="button"
              onClick={handleHomeClick}
              aria-label="Go to homepage"
              className="
                group
                mx-auto
                block
                border-0
                bg-transparent
                p-0
                outline-none
                lg:mx-0
              "
            >
              <img
                src={saamLogo}
                alt="Saam Infrastructure"
                className="
                  mx-auto
                  block
                  h-auto
                  w-[185px]
                  max-w-full
                  object-contain
                  drop-shadow-[0_8px_20px_rgba(201,162,74,0.10)]
                  transition-all
                  duration-500
                  group-hover:scale-[1.04]
                  group-hover:drop-shadow-[0_12px_28px_rgba(201,162,74,0.18)]
                  sm:w-[205px]
                  md:w-[220px]
                  lg:mx-0
                  lg:w-[200px]
                  xl:w-[215px]
                "
              />
            </button>

            {/* Small gold accent */}

            <div
              className="
                mx-auto
                mt-5
                h-[2px]
                w-12
                rounded-full
                bg-[#C9A24A]
                lg:mx-0
              "
            />

            {/* COMPANY DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-5
                max-w-sm
                text-sm
                leading-7
                text-[#A9AAA2]
                sm:text-[15px]
                lg:mx-0
              "
            >
              Reliable construction and infrastructure solutions
              delivered with quality, precision, safety and
              long-term value.
            </p>


            {/* =================================================
                SOCIAL MEDIA
            ================================================== */}

            <div className="mt-7">

              <p
                className="
                  mb-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#77786F]
                  sm:text-xs
                "
              >
                Follow Us
              </p>

              <div className="flex items-center justify-center gap-2.5 lg:justify-start">

                {/* FACEBOOK */}

                <a
                  href="https://www.facebook.com/saaminfrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#393A34]
                    bg-transparent
                    text-[#A9AAA2]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A24A]
                    hover:bg-[#C9A24A]
                    hover:text-[#171916]
                  "
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
                  </svg>
                </a>


                {/* INSTAGRAM */}

                <a
                  href="https://www.instagram.com/saaminfrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#393A34]
                    bg-transparent
                    text-[#A9AAA2]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A24A]
                    hover:bg-[#C9A24A]
                    hover:text-[#171916]
                  "
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


                {/* LINKEDIN */}

                <a
                  href="https://www.linkedin.com/company/saam-infrastructure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#393A34]
                    bg-transparent
                    text-[#A9AAA2]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A24A]
                    hover:bg-[#C9A24A]
                    hover:text-[#171916]
                  "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v10H4V10Zm7 0h5v1.5c.8-1.1 2-1.9 3.7-1.9 3 0 4.3 2 4.3 5.3V20h-5v-4.5c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9V20h-5V10Z" />
                  </svg>
                </a>


                {/* YOUTUBE */}

                <a
                  href="https://www.youtube.com/@saaminfrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#393A34]
                    bg-transparent
                    text-[#A9AAA2]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C9A24A]
                    hover:bg-[#C9A24A]
                    hover:text-[#171916]
                  "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23 12s0-3.4-.4-5a2.9 2.9 0 0 0-2-2c-1.7-.4-8.6-.4-8.6-.4s-6.9 0-8.6.4a2.9 2.9 0 0 0-2 2C1 8.6 1 12 1 12s0 3.4.4 5a2.9 2.9 0 0 0 2 2c1.7.4 8.6.4 8.6.4s6.9 0 8.6-.4a2.9 2.9 0 0 0 2-2c.4-1.6.4-5 .4-5ZM10 15.5v-7l6 3.5-6 3.5Z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>


          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <div className="md:pt-2">

            <h3
              className="
                text-center
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#C9A24A]
                md:text-left
              "
            >
              Quick Links
            </h3>

            <nav
              className="
                mt-6
                flex
                flex-col
                items-center
                gap-4
                md:items-start
              "
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={
                    item.path === "/"
                      ? handleHomeClick
                      : undefined
                  }
                  className="
                    group
                    flex
                    w-fit
                    items-center
                    gap-2
                    text-sm
                    text-[#A9AAA2]
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-[#C9A24A]
                  "
                >
                  <span>{item.name}</span>

                  <ArrowUpRight
                    size={13}
                    className="
                      opacity-0
                      -translate-x-1
                      transition-all
                      duration-300
                      group-hover:translate-x-0
                      group-hover:opacity-100
                    "
                  />
                </Link>
              ))}
            </nav>
          </div>


          {/* =================================================
              SERVICES
          ================================================== */}

          <div className="md:pt-2">

            <h3
              className="
                text-center
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#C9A24A]
                md:text-left
              "
            >
              Our Services
            </h3>

            <div
              className="
                mt-6
                flex
                flex-col
                items-center
                gap-4
                md:items-start
              "
            >
              {services.map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="
                    group
                    flex
                    w-fit
                    items-center
                    gap-2
                    text-center
                    text-sm
                    leading-6
                    text-[#A9AAA2]
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-[#C9A24A]
                    md:text-left
                  "
                >
                  <span>{service}</span>

                  <ArrowUpRight
                    size={13}
                    className="
                      hidden
                      opacity-0
                      -translate-x-1
                      transition-all
                      duration-300
                      group-hover:translate-x-0
                      group-hover:opacity-100
                      sm:block
                    "
                  />
                </Link>
              ))}
            </div>
          </div>


          {/* =================================================
              CONTACT
          ================================================== */}

          <div className="md:pt-2">

            <h3
              className="
                text-center
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#C9A24A]
                md:text-left
              "
            >
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              {/* PHONE */}

              <a
                href="tel:+919822735116"
                className="
                  group
                  flex
                  items-start
                  justify-center
                  gap-3
                  text-sm
                  leading-6
                  text-[#A9AAA2]
                  transition-colors
                  duration-300
                  hover:text-[#C9A24A]
                  md:justify-start
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#393A34]
                    bg-[#1D1F1B]
                    transition-all
                    duration-300
                    group-hover:border-[#C9A24A]/50
                    group-hover:bg-[#C9A24A]/10
                  "
                >
                  <Phone
                    size={17}
                    className="text-[#C9A24A]"
                  />
                </span>

                <span className="pt-1.5">
                  +91 98227 35116
                </span>
              </a>


              {/* EMAIL */}

              <a
                href="mailto:saaminfrastructure@gmail.com"
                className="
                  group
                  flex
                  items-start
                  justify-center
                  gap-3
                  text-sm
                  leading-6
                  text-[#A9AAA2]
                  transition-colors
                  duration-300
                  hover:text-[#C9A24A]
                  md:justify-start
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#393A34]
                    bg-[#1D1F1B]
                    transition-all
                    duration-300
                    group-hover:border-[#C9A24A]/50
                    group-hover:bg-[#C9A24A]/10
                  "
                >
                  <Mail
                    size={17}
                    className="text-[#C9A24A]"
                  />
                </span>

                <span className="break-all pt-1.5">
                  saaminfrastructure@gmail.com
                </span>
              </a>


              {/* ADDRESS */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=Plot+No.+2%2C+Dhawale+Building%2C+Old+Dighori+Square%2C+Umred+Rd%2C+Dighori%2C+Nagpur%2C+Maharashtra+440034"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-start
                  justify-center
                  gap-3
                  text-sm
                  leading-6
                  text-[#A9AAA2]
                  transition-colors
                  duration-300
                  hover:text-[#C9A24A]
                  md:justify-start
                "
              >
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#393A34]
                    bg-[#1D1F1B]
                    transition-all
                    duration-300
                    group-hover:border-[#C9A24A]/50
                    group-hover:bg-[#C9A24A]/10
                  "
                >
                  <MapPin
                    size={17}
                    className="text-[#C9A24A]"
                  />
                </span>

                <span className="pt-1 text-left">
                  Plot No. 2, Dhawale Building,
                  <br />
                  Old Dighori Square, Umred Rd,
                  <br />
                  Dighori, Nagpur,
                  <br />
                  Maharashtra 440034
                </span>
              </a>
            </div>


            {/* CONTACT CTA */}

            <Link
              to="/contact"
              className="
                group
                mx-auto
                mt-7
                flex
                w-full
                max-w-[175px]
                items-center
                justify-between
                gap-4
                rounded-full
                border
                border-[#C9A24A]
                bg-[#C9A24A]
                px-4
                py-3
                text-sm
                font-bold
                text-[#171916]
                shadow-[0_10px_25px_rgba(201,162,74,0.16)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#E0C36A]
                hover:bg-[#E0C36A]
                hover:shadow-[0_15px_30px_rgba(201,162,74,0.25)]
                md:mx-0
              "
            >
              <span>
                Get a Quote
              </span>

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#171916]
                  text-[#C9A24A]
                  transition-all
                  duration-300
                  group-hover:rotate-45
                "
              >
                <ArrowUpRight size={16} />
              </span>
            </Link>

          </div>
        </div>
      </div>


      {/* =====================================================
          BOTTOM COPYRIGHT
      ====================================================== */}

      <div className="border-t border-[#393A34]">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-3
            px-5
            py-6
            text-xs
            text-[#77786F]
            sm:px-6
            sm:text-sm
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >

          <p className="text-center lg:text-left">
            © {new Date().getFullYear()} Saam Infrastructure.
            All rights reserved.
          </p>

          <p className="text-center lg:text-right">
            Designed and Developed by{" "}

            <button
              type="button"
              onClick={handleHomeClick}
              className="
                font-semibold
                text-[#A9AAA2]
                transition-colors
                duration-300
                hover:text-[#C9A24A]
              "
            >
              Saam Infrastructure
            </button>
          </p>

        </div>
      </div>


      {/* =====================================================
          GOLD BOTTOM ACCENT
      ====================================================== */}

      <div className="h-[3px] w-full bg-[#C9A24A]" />

    </footer>
  );
}

export default Footer;