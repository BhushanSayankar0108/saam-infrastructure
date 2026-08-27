import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>

      {/* ================= SCROLL TO TOP ================= */}
      <ScrollToTop />

      <div className="min-h-screen bg-stone-50">

        {/* ================= NAVBAR ================= */}
        <Navbar />

        {/* ================= PAGE CONTENT ================= */}
        <Routes>

          <Route
  path="/projects/:id"
  element={<ProjectDetailsPage />}
/>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/services"
            element={<ServicesPage />}
          />

          <Route
            path="/projects"
            element={<ProjectsPage />}
          />

          <Route
            path="/gallery"
            element={<GalleryPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />

        </Routes>

        {/* ================= COMMON FOOTER ================= */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;