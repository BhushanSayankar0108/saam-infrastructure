import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";


/* =========================================================
   ADMIN LAYOUT
========================================================= */

function AdminLayout() {

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
      "
    >

      {/* =====================================================
          COMMON ADMIN SIDEBAR
          Appears on every protected admin page
      ===================================================== */}

      <AdminSidebar />


      {/* =====================================================
          MAIN ADMIN AREA
      ===================================================== */}

      <div
        className="
          min-h-screen
          lg:ml-64
        "
      >

        {/* ===================================================
            COMMON ADMIN HEADER
        =================================================== */}

        <AdminHeader />


        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main
          className="
            p-4
            sm:p-6
            lg:p-8
          "
        >

          <Outlet />

        </main>

      </div>

    </div>

  );
}


export default AdminLayout;