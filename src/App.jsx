import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

/* =========================================================
   ADMIN PAGES
========================================================= */

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminHome from "./admin/pages/AdminHome";
import AdminHeader from "./admin/pages/AdminHeader";
import AdminFooter from "./admin/pages/AdminFooter";
import AdminAbout from "./admin/pages/AdminAbout";
import AdminServices from "./admin/pages/AdminServices";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminGallery from "./admin/pages/AdminGallery";
import AdminContact from "./admin/pages/AdminContact";
import AdminManagement from "./admin/pages/AdminManagement";
import AdminChangePassword from "./admin/pages/AdminChangePassword";
import AdminContactEnquiries from "./admin/pages/AdminContactEnquiries";

/* =========================================================
   ADMIN LAYOUT
========================================================= */

import AdminLayout from "./admin/components/AdminLayout";


/* =========================================================
   ADMIN AUTHENTICATION HELPERS
========================================================= */

/*
 * Check whether a valid admin login session exists.
 *
 * The JWT itself is still validated by the Spring Boot
 * backend when protected API requests are made.
 *
 * This frontend check is only responsible for protecting
 * the admin UI routes.
 */

function isAdminLoggedIn() {

  const token =
    localStorage.getItem("adminToken");

  const loggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  return Boolean(
    token && loggedIn
  );
}


/*
 * Get logged-in admin information.
 */

function getLoggedInAdmin() {

  try {

    const storedUser =
      localStorage.getItem("adminUser");

    if (!storedUser) {

      return null;

    }

    return JSON.parse(
      storedUser
    );

  } catch (error) {

    console.error(
      "Unable to read logged-in admin:",
      error
    );

    return null;

  }
}


/* =========================================================
   PROTECTED ADMIN ROUTE
========================================================= */

function ProtectedAdminRoute({
  children,
}) {

  const location =
    useLocation();


  if (!isAdminLoggedIn()) {

    return (

      <Navigate
        to="/admin/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />

    );

  }


  return children;
}


/* =========================================================
   SUPER ADMIN PROTECTED ROUTE
========================================================= */

function SuperAdminRoute({
  children,
}) {

  const location =
    useLocation();


  /* =======================================================
     FIRST CHECK LOGIN
  ======================================================= */

  if (!isAdminLoggedIn()) {

    return (

      <Navigate
        to="/admin/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />

    );

  }


  /* =======================================================
     GET ADMIN
  ======================================================= */

  const adminUser =
    getLoggedInAdmin();


  /* =======================================================
     CHECK SUPER ADMIN
  ======================================================= */

  const isSuperAdmin =
    adminUser?.role ===
      "SUPER_ADMIN" ||
    localStorage.getItem(
      "adminRole"
    ) === "SUPER_ADMIN";


  /* =======================================================
     BLOCK NORMAL ADMIN
  ======================================================= */

  if (!isSuperAdmin) {

    return (

      <Navigate
        to="/admin/dashboard"
        replace
      />

    );

  }


  return children;
}


/* =========================================================
   PUBLIC WEBSITE
========================================================= */

function PublicLayout() {

  return (

    <div
      className="
        min-h-screen
        bg-stone-50
      "
    >

      <Navbar />


      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================================
            ABOUT
        ================================================= */}

        <Route
          path="/about"
          element={<AboutPage />}
        />


        {/* =================================================
            SERVICES
        ================================================= */}

        <Route
          path="/services"
          element={<ServicesPage />}
        />


        {/* =================================================
            PROJECTS
        ================================================= */}

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />


        {/* =================================================
            PROJECT DETAILS
        ================================================= */}

        <Route
          path="/projects/:id"
          element={
            <ProjectDetailsPage />
          }
        />


        {/* =================================================
            GALLERY
        ================================================= */}

        <Route
          path="/gallery"
          element={<GalleryPage />}
        />


        {/* =================================================
            CONTACT
        ================================================= */}

        <Route
          path="/contact"
          element={<ContactPage />}
        />


        {/* =================================================
            PUBLIC FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>


      <Footer />

    </div>

  );
}


/* =========================================================
   ADMIN WEBSITE
========================================================= */

function AdminRoutes() {

  return (

    <Routes>

      {/* =====================================================
          ADMIN LOGIN

          Login page does NOT use AdminLayout.
          Therefore sidebar/header will not appear on login.
      ===================================================== */}

      <Route
        path="/admin/login"
        element={

          isAdminLoggedIn() ? (

            <Navigate
              to="/admin/dashboard"
              replace
            />

          ) : (

            <AdminLogin />

          )

        }
      />


      {/* =====================================================
          COMMON ADMIN LAYOUT

          Every protected admin page is rendered inside
          AdminLayout.

          AdminLayout provides:
          - AdminSidebar
          - Common AdminHeader
          - <Outlet /> for current page
      ===================================================== */}

      <Route
        path="/admin"
        element={

          <ProtectedAdminRoute>

            <AdminLayout />

          </ProtectedAdminRoute>

        }
      >

        {/* ===================================================
            ADMIN ROOT

            /admin
            ↓
            /admin/dashboard
        =================================================== */}

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />


        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <Route
          path="dashboard"
          element={
            <AdminDashboard />
          }
        />


        {/* ===================================================
            HOME
        =================================================== */}

        <Route
          path="home"
          element={
            <AdminHome />
          }
        />


        {/* ===================================================
            ABOUT
        =================================================== */}

        <Route
          path="about"
          element={
            <AdminAbout />
          }
        />


        {/* ===================================================
            SERVICES
        =================================================== */}

        <Route
          path="services"
          element={
            <AdminServices />
          }
        />


        {/* ===================================================
            PROJECTS
        =================================================== */}

        <Route
          path="projects"
          element={
            <AdminProjects />
          }
        />


        {/* ===================================================
            GALLERY
        =================================================== */}

        <Route
          path="gallery"
          element={
            <AdminGallery />
          }
        />


        {/* ===================================================
            CONTACT
        =================================================== */}

        <Route
          path="contact"
          element={
            <AdminContact />
          }
        />

        {/* =======================================================
      CONTACT ENQUIRIES
      SEPARATE PAGE
  ======================================================= */}

  <Route
    path="contact/enquiries"
    element={
      <AdminContactEnquiries />
    }
  />


        {/* ===================================================
            HEADER CMS
        =================================================== */}

        <Route
          path="header"
          element={
            <AdminHeader />
          }
        />


        {/* ===================================================
            FOOTER CMS
        =================================================== */}

        <Route
          path="footer"
          element={
            <AdminFooter />
          }
        />


        {/* ===================================================
            CHANGE PASSWORD
        =================================================== */}

        <Route
          path="change-password"
          element={
            <AdminChangePassword />
          }
        />


        {/* ===================================================
            ADMIN MANAGEMENT

            SUPER ADMIN ONLY
        =================================================== */}

        <Route
          path="admin-management"
          element={

            <SuperAdminRoute>

              <AdminManagement />

            </SuperAdminRoute>

          }
        />


        {/* ===================================================
            UNKNOWN ADMIN PAGE

            Example:
            /admin/anything

            Redirect to dashboard.
        =================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

      </Route>


      {/* =====================================================
          LEGACY ADMIN URL

          Keeps the old URL working:
          /admin-dashboard
      ===================================================== */}

      <Route
        path="/admin-dashboard"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />


      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />

    </Routes>

  );
}


/* =========================================================
   APPLICATION CONTENT
========================================================= */

function AppContent() {

  const location =
    useLocation();


  /*
   * Any URL beginning with /admin is considered
   * an admin route.
   *
   * /admin-dashboard is also treated as admin because
   * it is the legacy admin URL.
   */

  const isAdminRoute =
    location.pathname.startsWith(
      "/admin"
    ) ||
    location.pathname.startsWith(
      "/admin-dashboard"
    );


  return (

    <>

      <ScrollToTop />


      {isAdminRoute ? (

        <AdminRoutes />

      ) : (

        <PublicLayout />

      )}

    </>

  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );
}


export default App;