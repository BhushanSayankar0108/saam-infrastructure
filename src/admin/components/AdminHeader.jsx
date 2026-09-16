import {
  Bell,
  UserCircle,
} from "lucide-react";


function AdminHeader() {

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">

      {/* ================= PAGE TITLE ================= */}

      <div className="pl-12 lg:pl-0">

        <p className="text-sm text-slate-500">
          SAAM Infrastructure
        </p>

        <h2 className="text-lg font-semibold text-slate-900">
          Admin CMS
        </h2>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="flex items-center gap-4">

        <button
          type="button"
          className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >

          <Bell size={21} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />

        </button>


        <div className="hidden h-8 w-px bg-slate-200 sm:block" />


        <div className="flex items-center gap-2">

          <UserCircle
            size={32}
            className="text-slate-600"
          />

          <div className="hidden sm:block">

            <p className="text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Content Manager
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;