import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        border-b
        border-[#C9A24A]/25
        bg-[#F7F4EC]/95
        shadow-sm
        backdrop-blur-md
      "
    >
      {/* =====================================================
          NAVBAR CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[78px]
          w-full
          max-w-7xl
          items-center
          justify-between
          px-5
          sm:h-[84px]
          sm:px-6
          lg:h-[86px]
          lg:px-8
        "
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="
            group
            flex
            shrink-0
            items-center
            transition-transform
            duration-300
            hover:scale-[1.03]
          "
        >
          <img
            src="/saam-logo.png"
            alt="Saam Infrastructure"
            className="
              block
              h-[66px]
              w-auto
              max-w-[175px]
              object-contain
              sm:h-[70px]
              sm:max-w-[190px]
              lg:h-[74px]
              lg:max-w-[205px]
            "
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative py-2 text-[14px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-[#B58A32]"
                    : "text-[#3F403A] hover:text-[#B58A32]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`
                      absolute
                      -bottom-1
                      left-1/2
                      h-[2px]
                      -translate-x-1/2
                      rounded-full
                      bg-[#C9A24A]
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "w-7"
                          : "w-0 group-hover:w-5"
                      }
                    `}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* =================================================
            DESKTOP CTA
        ================================================= */}

        <Link
          to="/contact"
          className="
            group
            hidden
            items-center
            gap-3
            rounded-full
            bg-[#C9A24A]
            px-6
            py-3.5
            text-sm
            font-bold
            text-[#171916]
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#E0C36A]
            hover:shadow-lg
            lg:inline-flex
            xl:px-7
          "
        >
          Start Your Project

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-[#171916]/10
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            <ArrowUpRight size={16} />
          </span>
        </Link>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#C9A24A]
            bg-[#F7F4EC]
            text-[#171916]
            shadow-sm
            transition-all
            duration-300
            hover:bg-[#C9A24A]
            hover:text-[#171916]
            active:scale-95
            sm:h-12
            sm:w-12
            lg:hidden
          "
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* ===================================================
          MOBILE MENU
      ==================================================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-[#C9A24A]/20
          bg-[#F7F4EC]
          shadow-lg
          transition-all
          duration-300
          lg:hidden
          ${
            mobileMenuOpen
              ? "max-h-[620px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `
                    border-b
                    border-[#D9D2C1]
                    py-4
                    text-[15px]
                    font-semibold
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "text-[#B58A32]"
                        : "text-[#3F403A] hover:text-[#B58A32]"
                    }
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* =================================================
              MOBILE CTA
          ================================================= */}

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="
              group
              mt-5
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#C9A24A]
              px-6
              py-4
              text-sm
              font-bold
              text-[#171916]
              shadow-sm
              transition-all
              duration-300
              hover:bg-[#E0C36A]
              active:scale-[0.98]
            "
          >
            Start Your Project

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-[#171916]/10
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;