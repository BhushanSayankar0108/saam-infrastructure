import {
  Home,
  Building2,
  BriefcaseBusiness,
  Images,
  Mail,
  Menu,
  PanelBottom,
  LogOut,
  X,
  FolderKanban,
  ShieldCheck,
  KeyRound,
  MessageSquare,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const NEW_QUERIES_API =
  `${API_BASE_URL}/api/contact-page/enquiries/new-count`;

/* =========================================================
   ADMIN SIDEBAR
========================================================= */

function AdminSidebar() {
  const navigate = useNavigate();

  /* =======================================================
     MOBILE SIDEBAR
  ======================================================= */

  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* =======================================================
     NEW CONTACT QUERY COUNT
  ======================================================= */

  const [newQueryCount, setNewQueryCount] =
    useState(0);

  const [queryCountLoading, setQueryCountLoading] =
    useState(true);

  /* =====================================================
     GET LOGGED-IN ADMIN
  ===================================================== */

  const getLoggedInAdmin = () => {
    try {
      const storedUser =
        localStorage.getItem("adminUser");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);
    } catch (error) {
      console.error(
        "Unable to read admin user:",
        error
      );

      return null;
    }
  };

  const adminUser = getLoggedInAdmin();

  /* =====================================================
     CHECK SUPER ADMIN
  ===================================================== */

  const isSuperAdmin =
    adminUser?.role === "SUPER_ADMIN" ||
    localStorage.getItem("adminRole") ===
      "SUPER_ADMIN";

  /* =====================================================
     LOAD NEW QUERY COUNT
  ===================================================== */

  useEffect(() => {
    let isMounted = true;

    const fetchNewQueryCount = async () => {
      try {
        const response =
          await fetch(NEW_QUERIES_API);

        if (!response.ok) {
          throw new Error(
            `Failed to load new query count. HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        let count = 0;

        /* -----------------------------------------------
           Backend can return:
           5
           "5"
           { count: 5 }
           { count: "5" }
        ----------------------------------------------- */

        if (typeof data === "number") {
          count = data;
        } else if (
          typeof data === "string"
        ) {
          count =
            Number(data) || 0;
        } else if (
          data &&
          typeof data === "object"
        ) {
          if (
            typeof data.count === "number"
          ) {
            count = data.count;
          } else if (
            typeof data.count === "string"
          ) {
            count =
              Number(data.count) || 0;
          }
        }

        if (isMounted) {
          setNewQueryCount(
            Math.max(0, count)
          );

          setQueryCountLoading(false);
        }
      } catch (error) {
        console.error(
          "Failed to load new contact query count:",
          error
        );

        if (isMounted) {
          setNewQueryCount(0);
          setQueryCountLoading(false);
        }
      }
    };

    fetchNewQueryCount();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =====================================================
     AUTO REFRESH QUERY COUNT

     Refresh every 30 seconds while AdminSidebar
     is mounted.

     IMPORTANT:
     setState is inside the async callback,
     NOT directly inside the effect body.
  ===================================================== */

  useEffect(() => {
    let isMounted = true;

    const refreshQueryCount = async () => {
      try {
        const response =
          await fetch(NEW_QUERIES_API);

        if (!response.ok) {
          return;
        }

        const data =
          await response.json();

        let count = 0;

        if (typeof data === "number") {
          count = data;
        } else if (
          typeof data === "string"
        ) {
          count =
            Number(data) || 0;
        } else if (
          data &&
          typeof data === "object"
        ) {
          if (
            typeof data.count === "number"
          ) {
            count = data.count;
          } else if (
            typeof data.count === "string"
          ) {
            count =
              Number(data.count) || 0;
          }
        }

        if (isMounted) {
          setNewQueryCount(
            Math.max(0, count)
          );
        }
      } catch (error) {
        console.error(
          "Unable to refresh query count:",
          error
        );
      }
    };

    const intervalId =
      window.setInterval(
        refreshQueryCount,
        30000
      );

    return () => {
      isMounted = false;
      window.clearInterval(
        intervalId
      );
    };
  }, []);

  /* =====================================================
     CONTENT MANAGEMENT MENU
  ===================================================== */

  const contentMenuItems = [
    {
      name: "Home",
      path: "/admin/home",
      icon: Home,
    },

    {
      name: "About",
      path: "/admin/about",
      icon: Building2,
    },

    {
      name: "Services",
      path: "/admin/services",
      icon: BriefcaseBusiness,
    },

    {
      name: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },

    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: Images,
    },

    {
      name: "Contact",
      path: "/admin/contact",
      icon: Mail,
    },
  ];

  /* =====================================================
     CONTACT ENQUIRIES
     SEPARATE FROM CONTACT CMS
  ===================================================== */

  const contactEnquiryItem = {
    name: "Contact Enquiries",
    path: "/admin/contact/enquiries",
    icon: MessageSquare,
  };

  /* =====================================================
     WEBSITE MANAGEMENT
  ===================================================== */

  const websiteMenuItems = [
    {
      name: "Header",
      path: "/admin/header",
      icon: Menu,
    },

    {
      name: "Footer",
      path: "/admin/footer",
      icon: PanelBottom,
    },
  ];

  /* =====================================================
     CHANGE PASSWORD
  ===================================================== */

  const changePasswordItem = {
    name: "Change Password",
    path: "/admin/change-password",
    icon: KeyRound,
  };

  /* =====================================================
     ADMIN MANAGEMENT
  ===================================================== */

  const adminManagementItem = {
    name: "Admin Management",
    path: "/admin/admin-management",
    icon: ShieldCheck,
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminUser"
    );

    localStorage.removeItem(
      "adminId"
    );

    localStorage.removeItem(
      "adminName"
    );

    localStorage.removeItem(
      "adminEmail"
    );

    localStorage.removeItem(
      "adminRole"
    );

    setMobileOpen(false);
    setNewQueryCount(0);

    navigate(
      "/admin/login",
      {
        replace: true,
      }
    );
  };

  /* =====================================================
     NORMAL NAV LINK CLASS

     IMPORTANT:
     Active item is DARK instead of WHITE.
  ===================================================== */

  const getNavLinkClass = ({
    isActive,
  }) => `
    group
    relative
    flex
    w-full
    min-h-[46px]
    items-center
    gap-3
    rounded-xl
    px-3
    py-3
    text-sm
    font-medium
    no-underline
    transition-all
    duration-200

    ${
      isActive
        ? "bg-slate-800 text-white shadow-sm ring-1 ring-white/10"
        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
    }
  `;

  /* =====================================================
     CONTACT ENQUIRY NAV LINK CLASS

     Uses subtle gold styling when active.
  ===================================================== */

  const getEnquiryLinkClass = ({
    isActive,
  }) => `
    group
    relative
    flex
    w-full
    min-h-[46px]
    items-center
    gap-3
    rounded-xl
    px-3
    py-3
    text-sm
    font-medium
    no-underline
    transition-all
    duration-200

    ${
      isActive
        ? "bg-[#B28A20]/15 text-[#D7B44D] ring-1 ring-[#B28A20]/30"
        : "text-slate-300 hover:bg-slate-800/60 hover:text-[#D7B44D]"
    }
  `;

  /* =====================================================
     ESC KEY

     This effect does NOT call setState synchronously
     inside the effect body.

     setMobileOpen is only called from the event handler.
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          MOBILE MENU BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        className="
          fixed
          left-4
          top-4
          z-50
          rounded-lg
          bg-slate-900
          p-3
          text-white
          shadow-lg
          lg:hidden
        "
        aria-label="Open admin menu"
      >
        <Menu size={22} />
      </button>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="
            fixed
            inset-0
            z-40
            bg-black/50
            lg:hidden
          "
          aria-hidden="true"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          bg-slate-900
          text-white
          shadow-xl
          transition-transform
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* =================================================
            LOGO
        ================================================= */}

        <div
          className="
            flex
            h-20
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-6
          "
        >
          <div>
            <h1
              className="
                text-xl
                font-bold
                tracking-wide
                text-white
              "
            >
              SAAM
            </h1>

            <p
              className="
                text-xs
                text-slate-400
              "
            >
              Infrastructure CMS
            </p>
          </div>

          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              text-slate-400
              transition
              hover:text-white
              lg:hidden
            "
            aria-label="Close admin menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-5
          "
        >
          {/* =================================================
              CONTENT MANAGEMENT
          ================================================= */}

          <p
            className="
              mb-3
              px-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Content Management
          </p>

          <div
            className="
              flex
              flex-col
              gap-1
            "
          >
            {contentMenuItems.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={
                      getNavLinkClass
                    }
                  >
                    <Icon
                      size={19}
                      strokeWidth={2}
                      className="
                        shrink-0
                      "
                    />

                    <span
                      className="
                        block
                        flex-1
                      "
                    >
                      {item.name}
                    </span>
                  </NavLink>
                );
              }
            )}
          </div>

          {/* =================================================
              CONTACT ENQUIRIES
          ================================================= */}

          <div className="mt-7">
            <p
              className="
                mb-3
                px-3
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Enquiries
            </p>

            <NavLink
              to={
                contactEnquiryItem.path
              }
              onClick={() =>
                setMobileOpen(false)
              }
              className={
                getEnquiryLinkClass
              }
            >
              <MessageSquare
                size={19}
                strokeWidth={2}
                className="shrink-0"
              />

              <span
                className="
                  block
                  flex-1
                "
              >
                Contact Enquiries
              </span>

              {/* =================================================
                  NEW QUERY BADGE
              ================================================= */}

              {queryCountLoading ? (
                <span
                  className="
                    inline-flex
                    h-[22px]
                    min-w-[22px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    px-1.5
                    text-[10px]
                    font-semibold
                    text-slate-400
                  "
                  aria-label="Loading new queries"
                >
                  ...
                </span>
              ) : newQueryCount > 0 ? (
                <span
                  className="
                    inline-flex
                    h-[22px]
                    min-w-[22px]
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1.5
                    text-[11px]
                    font-bold
                    leading-none
                    text-white
                    shadow-sm
                  "
                  title={`${newQueryCount} new contact ${
                    newQueryCount === 1
                      ? "query"
                      : "queries"
                  }`}
                  aria-label={`${newQueryCount} new contact ${
                    newQueryCount === 1
                      ? "query"
                      : "queries"
                  }`}
                >
                  {newQueryCount > 99
                    ? "99+"
                    : newQueryCount}
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    h-[22px]
                    min-w-[22px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white/5
                    px-1.5
                    text-[10px]
                    font-medium
                    text-slate-500
                  "
                  aria-label="No new queries"
                >
                  0
                </span>
              )}
            </NavLink>
          </div>

          {/* =================================================
              WEBSITE MANAGEMENT
          ================================================= */}

          <div className="mt-7">
            <p
              className="
                mb-3
                px-3
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Website Management
            </p>

            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              {websiteMenuItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className={
                        getNavLinkClass
                      }
                    >
                      <Icon
                        size={19}
                        strokeWidth={2}
                        className="shrink-0"
                      />

                      <span>
                        {item.name}
                      </span>
                    </NavLink>
                  );
                }
              )}
            </div>
          </div>

          {/* =================================================
              ACCOUNT
          ================================================= */}

          <p
            className="
              mb-3
              mt-8
              px-3
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-slate-500
            "
          >
            Account
          </p>

          <div
            className="
              flex
              flex-col
              gap-1
            "
          >
            <NavLink
              to={
                changePasswordItem.path
              }
              onClick={() =>
                setMobileOpen(false)
              }
              className={
                getNavLinkClass
              }
            >
              <KeyRound
                size={19}
                strokeWidth={2}
                className="shrink-0"
              />

              <span>
                Change Password
              </span>
            </NavLink>
          </div>

          {/* =================================================
              ADMINISTRATION
              SUPER ADMIN ONLY
          ================================================= */}

          {isSuperAdmin && (
            <>
              <p
                className="
                  mb-3
                  mt-8
                  px-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Administration
              </p>

              <div
                className="
                  flex
                  flex-col
                  gap-1
                "
              >
                <NavLink
                  to={
                    adminManagementItem.path
                  }
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={
                    getNavLinkClass
                  }
                >
                  <ShieldCheck
                    size={19}
                    strokeWidth={2}
                    className="shrink-0"
                  />

                  <span>
                    Admin Management
                  </span>
                </NavLink>
              </div>
            </>
          )}
        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-3
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-sm
              font-medium
              text-red-300
              transition-all
              duration-200
              hover:bg-red-500/10
              hover:text-red-200
            "
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;