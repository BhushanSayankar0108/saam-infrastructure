import {
  Home,
  Users,
  BriefcaseBusiness,
  FolderKanban,
  Images,
  ArrowUpRight,
  Eye,
  Menu,
  Mail,
  PanelBottom,
  RefreshCw,
  Clock3,
  MessageSquare,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const PROJECTS_API =
  `${API_BASE_URL}/api/projects-page`;

const GALLERY_API =
  `${API_BASE_URL}/api/gallery`;

const TEAM_API =
  `${API_BASE_URL}/api/about-page/team`;

const CONTACT_NEW_COUNT_API =
  `${API_BASE_URL}/api/contact-page/enquiries/new-count`;

const CONTACT_RECENT_API =
  `${API_BASE_URL}/api/contact-page/enquiries/recent`;


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard() {

  const navigate = useNavigate();


  /* =======================================================
     DASHBOARD COUNTS
  ======================================================= */

  const [counts, setCounts] = useState({
    pages: 6,
    projects: 0,
    team: 0,
    gallery: 0,
    newQueries: 0,
  });


  /* =======================================================
     RECENT CONTACT QUERIES
  ======================================================= */

  const [recentQueries, setRecentQueries] = useState([]);


  /* =======================================================
     LOADING
  ======================================================= */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     LOAD DASHBOARD DATA
  ======================================================= */

  const loadDashboardData = useCallback(
    async () => {

      setLoading(true);
      setError("");

      try {

        /* =================================================
           FETCH ALL DASHBOARD DATA
        ================================================= */

        const [
          projectsResponse,
          galleryResponse,
          teamResponse,
          newQueriesResponse,
          recentQueriesResponse,
        ] = await Promise.all([
          fetch(PROJECTS_API),
          fetch(GALLERY_API),
          fetch(TEAM_API),
          fetch(CONTACT_NEW_COUNT_API),
          fetch(CONTACT_RECENT_API),
        ]);


        /* =================================================
           PROJECTS
        ================================================= */

        let projectCount = 0;

        if (projectsResponse.ok) {

          const projectData =
            await projectsResponse.json();

          if (Array.isArray(projectData)) {

            projectCount =
              projectData.length;

          }
        }


        /* =================================================
           GALLERY
        ================================================= */

        let galleryCount = 0;

        if (galleryResponse.ok) {

          const galleryData =
            await galleryResponse.json();

          if (Array.isArray(galleryData)) {

            galleryCount =
              galleryData.length;

          }
        }


        /* =================================================
           TEAM MEMBERS
        ================================================= */

        let teamCount = 0;

        if (teamResponse.ok) {

          const teamData =
            await teamResponse.json();

          if (Array.isArray(teamData)) {

            teamCount =
              teamData.length;

          }
        }


        /* =================================================
           NEW CONTACT QUERIES
        ================================================= */

        let newQueryCount = 0;

        if (newQueriesResponse.ok) {

          const newQueryData =
            await newQueriesResponse.json();

          /*
           * Backend returns a number:
           *
           * 0
           * 1
           * 2
           * 3
           * etc.
           */

          if (
            typeof newQueryData === "number"
          ) {

            newQueryCount =
              newQueryData;

          } else if (
            typeof newQueryData === "string"
          ) {

            newQueryCount =
              Number(newQueryData) || 0;

          }
        }


        /* =================================================
           RECENT CONTACT QUERIES
        ================================================= */

        let recentQueryData = [];

        if (recentQueriesResponse.ok) {

          const data =
            await recentQueriesResponse.json();

          if (Array.isArray(data)) {

            recentQueryData = data;

          }
        }


        /* =================================================
           UPDATE DASHBOARD COUNTS
        ================================================= */

        setCounts({
          pages: 6,
          projects: projectCount,
          team: teamCount,
          gallery: galleryCount,
          newQueries: newQueryCount,
        });


        /* =================================================
           UPDATE RECENT QUERIES
        ================================================= */

        setRecentQueries(
          recentQueryData
        );

      } catch (err) {

        console.error(
          "Failed to load dashboard data:",
          err
        );

        setError(
          "Some dashboard data could not be loaded. Make sure the Spring Boot backend is running."
        );

      } finally {

        setLoading(false);

      }

    },
    []
  );


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    const timer =
      window.setTimeout(() => {

        loadDashboardData();

      }, 0);


    return () => {

      window.clearTimeout(timer);

    };

  }, [loadDashboardData]);


  /* =======================================================
     FORMAT COUNT
  ======================================================= */

  const getCount = (value) => {

    if (loading) {

      return "—";

    }

    return value;

  };


  /* =======================================================
     FORMAT DATE
  ======================================================= */

  const formatDate = (dateValue) => {

    if (!dateValue) {

      return "—";

    }

    try {

      const date =
        new Date(dateValue);

      if (Number.isNaN(date.getTime())) {

        return dateValue;

      }

      return date.toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    } catch {

      return dateValue;

    }
  };


  /* =======================================================
     STATUS BADGE
  ======================================================= */

  const getStatusClasses = (status) => {

    const normalizedStatus =
      String(status || "")
        .trim()
        .toUpperCase();


    switch (normalizedStatus) {

      case "NEW":

        return `
          bg-red-50
          text-red-700
          border-red-200
        `;


      case "CONTACTED":

        return `
          bg-blue-50
          text-blue-700
          border-blue-200
        `;


      case "IN_PROGRESS":

        return `
          bg-amber-50
          text-amber-700
          border-amber-200
        `;


      case "COMPLETED":

        return `
          bg-green-50
          text-green-700
          border-green-200
        `;


      default:

        return `
          bg-gray-50
          text-gray-700
          border-gray-200
        `;

    }
  };


  /* =======================================================
     STATUS LABEL
  ======================================================= */

  const getStatusLabel = (status) => {

    const normalizedStatus =
      String(status || "")
        .trim()
        .toUpperCase();


    switch (normalizedStatus) {

      case "IN_PROGRESS":
        return "In Progress";

      case "CONTACTED":
        return "Contacted";

      case "COMPLETED":
        return "Completed";

      case "NEW":
        return "New";

      default:
        return status || "Unknown";
    }
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="w-full">


      {/* =====================================================
          DASHBOARD CONTENT
      ===================================================== */}

      <div
        className="
          p-6
          lg:p-8
        "
      >


        {/* =================================================
            WELCOME
        ================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-6
            mb-8
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                  mb-2
                "
              >
                Welcome back 👋
              </p>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-[#1f2937]
                "
              >
                SAAM Infrastructure CMS
              </h1>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-2
                  max-w-2xl
                "
              >
                Manage every section of your website including
                content, images, projects, team members,
                leadership, gallery and enquiries.
              </p>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
              "
            >

              {/* =================================================
                  REFRESH
              ================================================= */}

              <button
                type="button"
                onClick={loadDashboardData}
                disabled={loading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                <RefreshCw
                  size={16}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>


              {/* =================================================
                  VIEW WEBSITE
              ================================================= */}

              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  transition
                "
              >

                View Website

                <ArrowUpRight
                  size={17}
                />

              </button>

            </div>

          </div>

        </div>


        {/* =================================================
            BACKEND ERROR
        ================================================= */}

        {error && (

          <div
            className="
              mb-6
              rounded-xl
              border
              border-amber-200
              bg-amber-50
              px-4
              py-3
              text-sm
              text-amber-800
            "
          >
            {error}
          </div>

        )}


        {/* =================================================
            WEBSITE STATISTICS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-5
            gap-5
            mb-8
          "
        >

          {/* =================================================
              WEBSITE PAGES
          ================================================= */}

          <DashboardCard
            icon={
              <Home size={22} />
            }
            title="Website Pages"
            value={getCount(counts.pages)}
            description="Pages available"
          />


          {/* =================================================
              PROJECTS
          ================================================= */}

          <DashboardCard
            icon={
              <FolderKanban
                size={22}
              />
            }
            title="Projects"
            value={getCount(counts.projects)}
            description="Manage projects"
          />


          {/* =================================================
              TEAM MEMBERS
          ================================================= */}

          <DashboardCard
            icon={
              <Users
                size={22}
              />
            }
            title="Team Members"
            value={getCount(counts.team)}
            description="Manage team"
          />


          {/* =================================================
              GALLERY
          ================================================= */}

          <DashboardCard
            icon={
              <Images
                size={22}
              />
            }
            title="Gallery Images"
            value={getCount(counts.gallery)}
            description="Manage gallery"
          />


          {/* =================================================
              NEW QUERIES
          ================================================= */}

          <DashboardCard
            icon={
              <MessageSquare
                size={22}
              />
            }
            title="New Queries"
            value={getCount(counts.newQueries)}
            description="New contact enquiries"
            onClick={() =>
              navigate("/admin/contact")
            }
          />

        </div>


        {/* =================================================
            RECENT CONTACT QUERIES
        ================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            mb-8
            overflow-hidden
          "
        >

          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <div
            className="
              px-6
              py-5
              border-b
              border-gray-200
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                    text-[#1f2937]
                  "
                >

                  <Mail
                    size={20}
                  />

                </div>


                <div>

                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-[#1f2937]
                    "
                  >
                    Recent Contact Queries
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Latest enquiries received from your website.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                VIEW ALL
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate("/admin/contact")
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                text-sm
                font-medium
                text-gray-700
                hover:text-black
                transition
              "
            >

              View All

              <ArrowUpRight
                size={16}
              />

            </button>

          </div>


          {/* =================================================
              QUERY LIST
          ================================================= */}

          {loading ? (

            <div
              className="
                px-6
                py-10
                text-center
                text-sm
                text-gray-500
              "
            >
              Loading recent queries...
            </div>

          ) : recentQueries.length === 0 ? (

            <div
              className="
                px-6
                py-12
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  w-12
                  h-12
                  rounded-full
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  mb-4
                "
              >

                <Mail
                  size={22}
                />

              </div>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-gray-800
                "
              >
                No contact queries yet
              </h3>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                "
              >
                New enquiries submitted from the Contact page
                will appear here.
              </p>

            </div>

          ) : (

            <div>

              {recentQueries.map(
                (query, index) => (

                  <div
                    key={
                      query.id ??
                      `query-${index}`
                    }
                    className="
                      px-6
                      py-5
                      border-b
                      border-gray-100
                      last:border-b-0
                      hover:bg-gray-50
                      transition
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-4
                      "
                    >

                      {/* =========================================
                          QUERY INFORMATION
                      ========================================= */}

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                            mb-2
                          "
                        >

                          <h3
                            className="
                              font-semibold
                              text-gray-800
                            "
                          >
                            {query.name || "Unknown"}

                          </h3>


                          <span
                            className={`
                              inline-flex
                              items-center
                              px-2.5
                              py-1
                              rounded-full
                              border
                              text-xs
                              font-medium
                              ${getStatusClasses(
                                query.status
                              )}
                            `}
                          >
                            {getStatusLabel(
                              query.status
                            )}
                          </span>

                        </div>


                        <div
                          className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:flex-wrap
                            gap-x-5
                            gap-y-1
                            text-sm
                            text-gray-500
                          "
                        >

                          <span>
                            {query.email || "No email"}
                          </span>

                          <span>
                            {query.phone || "No phone"}
                          </span>

                          <span>
                            {query.projectType ||
                              "No project type"}
                          </span>

                        </div>


                        {query.message && (

                          <p
                            className="
                              text-sm
                              text-gray-500
                              mt-2
                              line-clamp-2
                              max-w-3xl
                            "
                          >
                            {query.message}
                          </p>

                        )}

                      </div>


                      {/* =========================================
                          DATE + ACTION
                      ========================================= */}

                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          lg:flex-col
                          lg:items-end
                          gap-2
                          shrink-0
                        "
                      >

                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            text-gray-400
                          "
                        >

                          <Clock3
                            size={14}
                          />

                          {formatDate(
                            query.submittedAt
                          )}

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            navigate("/admin/contact")
                          }
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-gray-700
                            hover:text-black
                          "
                        >

                          View Query

                          <ArrowUpRight
                            size={14}
                          />

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* =================================================
            WEBSITE MANAGEMENT
        ================================================= */}

        <div className="mb-5">

          <h2
            className="
              text-lg
              font-semibold
              text-[#1f2937]
            "
          >
            Website Management
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Select a module to manage website content.
          </p>

        </div>


        {/* =================================================
            MODULE GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >

          {/* =================================================
              HOME
          ================================================= */}

          <ModuleCard
            icon={
              <Home
                size={22}
              />
            }
            title="Home Page"
            description="Manage hero, about, services, statistics and testimonials."
            onClick={() =>
              navigate("/admin/home")
            }
          />


          {/* =================================================
              ABOUT
          ================================================= */}

          <ModuleCard
            icon={
              <UserRoundIcon />
            }
            title="About Page"
            description="Manage company information, leadership and team members."
            onClick={() =>
              navigate("/admin/about")
            }
          />


          {/* =================================================
              SERVICES
          ================================================= */}

          <ModuleCard
            icon={
              <BriefcaseBusiness
                size={22}
              />
            }
            title="Services"
            description="Add, edit, delete and control visibility of services."
            onClick={() =>
              navigate("/admin/services")
            }
          />


          {/* =================================================
              PROJECTS
          ================================================= */}

          <ModuleCard
            icon={
              <FolderKanban
                size={22}
              />
            }
            title="Projects"
            description="Manage project details, images, descriptions and project status."
            onClick={() =>
              navigate("/admin/projects")
            }
          />


          {/* =================================================
              GALLERY
          ================================================= */}

          <ModuleCard
            icon={
              <Images
                size={22}
              />
            }
            title="Gallery"
            description="Manage gallery images, titles, descriptions and visibility."
            onClick={() =>
              navigate("/admin/gallery")
            }
          />


          {/* =================================================
              HEADER
          ================================================= */}

          <ModuleCard
            icon={
              <Menu
                size={22}
              />
            }
            title="Header"
            description="Manage logo, navigation menu and header call-to-action."
            onClick={() =>
              navigate("/admin/header")
            }
          />


          {/* =================================================
              FOOTER
          ================================================= */}

          <ModuleCard
            icon={
              <PanelBottom
                size={22}
              />
            }
            title="Footer"
            description="Manage footer content, links and contact information."
            onClick={() =>
              navigate("/admin/footer")
            }
          />


          {/* =================================================
              CONTACT
          ================================================= */}

          <ModuleCard
            icon={
              <Mail
                size={22}
              />
            }
            title="Contact"
            description="Manage contact information and enquiries."
            onClick={() =>
              navigate("/admin/contact")
            }
          />

        </div>


        {/* =================================================
            CONTENT VISIBILITY
        ================================================= */}

        <div
          className="
            mt-8
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-6
          "
        >

          <div
            className="
              flex
              items-start
              gap-4
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-lg
                bg-gray-100
                flex
                items-center
                justify-center
                text-gray-700
                shrink-0
              "
            >

              <Eye
                size={20}
              />

            </div>


            <div>

              <h3
                className="
                  font-semibold
                  text-[#1f2937]
                "
              >
                Dynamic Content Visibility
              </h3>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-1
                  leading-6
                "
              >
                Every CMS section will have an Active/Inactive
                status. Inactive sections will automatically be
                hidden from visitors on the public website.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   ICON HELPER
========================================================= */

function UserRoundIcon() {

  return (
    <Users
      size={22}
    />
  );
}


/* =========================================================
   DASHBOARD CARD
========================================================= */

function DashboardCard({
  icon,
  title,
  value,
  description,
  onClick,
}) {

  const CardContent = (

    <>

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div
          className="
            w-11
            h-11
            rounded-lg
            bg-gray-100
            flex
            items-center
            justify-center
            text-[#1f2937]
          "
        >

          {icon}

        </div>


        {onClick && (

          <ArrowUpRight
            size={17}
            className="text-gray-400"
          />

        )}

      </div>


      <p
        className="
          text-sm
          text-gray-500
          mt-5
        "
      >
        {title}
      </p>


      <p
        className="
          text-2xl
          font-bold
          text-[#1f2937]
          mt-1
        "
      >
        {value}
      </p>


      <p
        className="
          text-xs
          text-gray-400
          mt-1
        "
      >
        {description}
      </p>

    </>

  );


  if (onClick) {

    return (

      <button
        type="button"
        onClick={onClick}
        className="
          text-left
          bg-white
          border
          border-gray-200
          rounded-xl
          p-5
          hover:border-gray-400
          hover:shadow-md
          transition
          w-full
        "
      >

        {CardContent}

      </button>

    );
  }


  return (

    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-xl
        p-5
      "
    >

      {CardContent}

    </div>

  );
}


/* =========================================================
   MODULE CARD
========================================================= */

function ModuleCard({
  icon,
  title,
  description,
  onClick,
}) {

  return (

    <button
      type="button"
      onClick={onClick}
      className="
        text-left
        bg-white
        border
        border-gray-200
        rounded-xl
        p-5
        hover:border-gray-400
        hover:shadow-md
        transition
        group
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className="
            w-11
            h-11
            rounded-lg
            bg-gray-100
            flex
            items-center
            justify-center
            text-[#1f2937]
          "
        >

          {icon}

        </div>


        <ArrowUpRight
          size={18}
          className="
            text-gray-400
            group-hover:text-gray-700
            transition
          "
        />

      </div>


      <h3
        className="
          font-semibold
          text-[#1f2937]
          mt-5
        "
      >
        {title}
      </h3>


      <p
        className="
          text-sm
          text-gray-500
          leading-6
          mt-2
        "
      >
        {description}
      </p>

    </button>

  );
}


export default AdminDashboard;