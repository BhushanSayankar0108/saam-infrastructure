import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const HEADER_API = `${API_BASE_URL}/api/header`;
const MENU_API = `${API_BASE_URL}/api/header/menu/enabled`;

/* =========================================================
   DEFAULT HEADER
========================================================= */

const DEFAULT_HEADER = {
  enabled: true,
  logoImage: "/saam-logo.png",
  logoAlt: "Saam Infrastructure",
  ctaEnabled: true,
  ctaText: "Start Your Project",
  ctaLink: "/contact",
};

/* =========================================================
   DEFAULT NAVIGATION
========================================================= */

const DEFAULT_NAV_ITEMS = [
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

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (value) => {
  if (!value || !value.trim()) {
    return DEFAULT_HEADER.logoImage;
  }

  const image = value.trim();

  /*
   * Already an absolute URL
   */
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  /*
   * Backend image returned as:
   * /images/header/xxxxx.png
   */
  if (image.startsWith("/")) {
    return `${API_BASE_URL}${image}`;
  }

  return image;
};

/* =========================================================
   COMPONENT
========================================================= */

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [header, setHeader] = useState(DEFAULT_HEADER);

  const [navItems, setNavItems] = useState(DEFAULT_NAV_ITEMS);

  const [loaded, setLoaded] = useState(false);

  /* =======================================================
     LOAD HEADER + MENU
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadHeader = async () => {
      try {
        const [headerResponse, menuResponse] =
          await Promise.all([
            fetch(HEADER_API),
            fetch(MENU_API),
          ]);

        /*
         * HEADER
         */

        let headerData = DEFAULT_HEADER;

        if (headerResponse.ok) {
          const data = await headerResponse.json();

          headerData = {
            ...DEFAULT_HEADER,
            ...data,
          };
        }

        /*
         * MENU
         */

        let menuData = DEFAULT_NAV_ITEMS;

        if (menuResponse.ok) {
          const data = await menuResponse.json();

          if (Array.isArray(data) && data.length > 0) {
            menuData = data.map((item) => ({
              name: item.name,
              path: item.path,
            }));
          }
        }

        if (!cancelled) {
          setHeader(headerData);
          setNavItems(menuData);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Header load error:", error);

        if (!cancelled) {
          setHeader(DEFAULT_HEADER);
          setNavItems(DEFAULT_NAV_ITEMS);
          setLoaded(true);
        }
      }
    };

    loadHeader();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     HEADER DISABLED
  ======================================================= */

  if (loaded && header.enabled === false) {
    return null;
  }

  /* =======================================================
     HEADER VALUES
  ======================================================= */

  const logoUrl = getImageUrl(header.logoImage);

  const logoAlt =
    header.logoAlt ||
    DEFAULT_HEADER.logoAlt;

  const ctaEnabled =
    header.ctaEnabled !== false;

  const ctaText =
    header.ctaText ||
    DEFAULT_HEADER.ctaText;

  const ctaLink =
    header.ctaLink ||
    DEFAULT_HEADER.ctaLink;

  /* =======================================================
     HOME CLICK
  ======================================================= */

  const handleHomeClick = (e) => {
    /*
     * Only intercept the Home link.
     */

    e.preventDefault();

    setMobileMenuOpen(false);

    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/";
    }
  };

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

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
          onClick={handleHomeClick}
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
            src={logoUrl}
            alt={logoAlt}
            onError={(event) => {
              /*
               * If a backend image is unavailable,
               * fall back to the original logo.
               */

              if (
                event.currentTarget.src !==
                window.location.origin +
                  DEFAULT_HEADER.logoImage
              ) {
                event.currentTarget.src =
                  DEFAULT_HEADER.logoImage;
              }
            }}
            className="
              block
              h-[72px]
              w-auto
              max-w-[190px]
              object-contain
              sm:h-[76px]
              sm:max-w-[205px]
              lg:h-[82px]
              lg:max-w-[220px]
              xl:h-[86px]
              xl:max-w-[230px]
            "
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {navItems.map((item) => (
            <NavLink
              key={`${item.name}-${item.path}`}
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

        {ctaEnabled && (
          <Link
            to={ctaLink}
            onClick={closeMobileMenu}
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
            {ctaText}

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
        )}

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
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
            <X
              size={22}
              strokeWidth={2}
            />
          ) : (
            <Menu
              size={22}
              strokeWidth={2}
            />
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
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-6">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={`${item.name}-${item.path}-mobile`}
                to={item.path}
                onClick={closeMobileMenu}
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

          {ctaEnabled && (
            <Link
              to={ctaLink}
              onClick={closeMobileMenu}
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
              {ctaText}

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
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;