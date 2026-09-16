import { useEffect, useState } from "react";
import {
  UserPlus,
  Users,
  ShieldCheck,
  ShieldOff,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Mail,
  User,
  LockKeyhole,
  AlertCircle,
  X,
} from "lucide-react";


/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const API_URL = `${API_BASE_URL}/api/admin-users`;


/* =========================================================
   AUTHORIZED API REQUEST
========================================================= */

async function authorizedFetch(url, options = {}) {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error(
      "Your session has expired. Please login again."
    );
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error(
      "Your session has expired. Please login again."
    );
  }

  if (response.status === 403) {
    throw new Error(
      "You do not have permission to perform this action."
    );
  }

  return response;
}


/* =========================================================
   GET CURRENT ADMIN
========================================================= */

function getCurrentAdmin() {

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
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

function AdminManagement() {

  const [admins, setAdmins] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  /* =========================================================
     CURRENT ADMIN / ROLE
  ========================================================= */

  const currentAdmin = getCurrentAdmin();

  const isSuperAdmin =
    currentAdmin?.role === "SUPER_ADMIN" ||
    localStorage.getItem("adminRole") === "SUPER_ADMIN";


  /* =========================================================
     LOAD ADMINS
  ========================================================= */

  useEffect(() => {

    let cancelled = false;

    const loadAdmins = async () => {

      if (!isSuperAdmin) {

        if (!cancelled) {
          setLoading(false);
        }

        return;
      }

      try {

        if (!cancelled) {
          setError("");
        }

        const response =
          await authorizedFetch(API_URL);

        if (!response.ok) {

          throw new Error(
            `Failed to load admins. Server returned ${response.status}.`
          );
        }

        const data =
          await response.json();

        if (!cancelled) {

          setAdmins(
            Array.isArray(data)
              ? data
              : []
          );
        }

      } catch (loadError) {

        console.error(
          "Failed to load admins:",
          loadError
        );

        if (!cancelled) {

          setError(
            loadError instanceof Error &&
            loadError.message
              ? loadError.message
              : "Unable to load admin accounts."
          );
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    loadAdmins();

    return () => {
      cancelled = true;
    };

  }, [isSuperAdmin]);


  /* =========================================================
     REFRESH ADMINS
  ========================================================= */

  const handleRefresh = async () => {

    if (refreshing) {
      return;
    }

    setRefreshing(true);

    setSuccess("");

    setError("");

    try {

      const response =
        await authorizedFetch(API_URL);

      if (!response.ok) {

        throw new Error(
          `Failed to refresh admins. Server returned ${response.status}.`
        );
      }

      const data =
        await response.json();

      setAdmins(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (refreshError) {

      console.error(
        "Failed to refresh admins:",
        refreshError
      );

      setError(
        refreshError instanceof Error &&
        refreshError.message
          ? refreshError.message
          : "Unable to refresh admin accounts."
      );

    } finally {

      setRefreshing(false);
    }
  };


  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");

    setSuccess("");
  };


  /* =========================================================
     CREATE ADMIN
  ========================================================= */

  const handleCreateAdmin = async (e) => {

    e.preventDefault();

    if (creating) {
      return;
    }

    setError("");

    setSuccess("");

    const name =
      formData.name.trim();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const password =
      formData.password;


    if (!name) {

      setError(
        "Please enter the admin name."
      );

      return;
    }


    if (!email) {

      setError(
        "Please enter the admin email."
      );

      return;
    }


    if (!password) {

      setError(
        "Please enter a password."
      );

      return;
    }


    if (password.length < 8) {

      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }


    setCreating(true);


    try {

      const response =
        await authorizedFetch(
          API_URL,
          {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );


      let data = null;

      try {

        data =
          await response.json();

      } catch {

        data = null;
      }


      if (!response.ok) {

        if (response.status === 409) {

          throw new Error(
            "An admin account with this email already exists."
          );
        }

        throw new Error(
          data?.message ||
          data?.error ||
          `Unable to create admin. Server returned ${response.status}.`
        );
      }


      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setShowPassword(false);

      setShowCreateForm(false);

      setSuccess(
        `Admin "${name}" was created successfully.`
      );


      /*
        Reload the list after creating.
      */

      const refreshResponse =
        await authorizedFetch(API_URL);

      if (refreshResponse.ok) {

        const refreshedData =
          await refreshResponse.json();

        setAdmins(
          Array.isArray(refreshedData)
            ? refreshedData
            : []
        );
      }

    } catch (createError) {

      console.error(
        "Failed to create admin:",
        createError
      );

      setError(
        createError instanceof Error &&
        createError.message
          ? createError.message
          : "Unable to create admin account."
      );

    } finally {

      setCreating(false);
    }
  };


  /* =========================================================
     ENABLE / DISABLE
  ========================================================= */

  const handleToggleEnabled = async (admin) => {

    if (
      !admin?.id ||
      admin.role === "SUPER_ADMIN"
    ) {
      return;
    }

    if (updatingId === admin.id) {
      return;
    }

    setUpdatingId(admin.id);

    setError("");

    setSuccess("");


    try {

      const response =
        await authorizedFetch(
          `${API_URL}/${admin.id}/enabled`,
          {
            method: "PUT",
            body: JSON.stringify({
              enabled: !admin.enabled,
            }),
          }
        );


      let data = null;

      try {

        data =
          await response.json();

      } catch {

        data = null;
      }


      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          `Unable to update admin status. Server returned ${response.status}.`
        );
      }


      setAdmins((previous) =>
        previous.map((item) =>
          item.id === admin.id
            ? {
                ...item,
                enabled: !admin.enabled,
              }
            : item
        )
      );


      setSuccess(
        admin.enabled
          ? `${admin.name} has been disabled.`
          : `${admin.name} has been enabled.`
      );

    } catch (toggleError) {

      console.error(
        "Failed to update admin status:",
        toggleError
      );

      setError(
        toggleError instanceof Error &&
        toggleError.message
          ? toggleError.message
          : "Unable to update admin status."
      );

    } finally {

      setUpdatingId(null);
    }
  };


  /* =========================================================
     APPROVE / UNAPPROVE
  ========================================================= */

  const handleToggleApproved = async (admin) => {

    if (
      !admin?.id ||
      admin.role === "SUPER_ADMIN"
    ) {
      return;
    }

    if (updatingId === admin.id) {
      return;
    }

    setUpdatingId(admin.id);

    setError("");

    setSuccess("");


    try {

      const response =
        await authorizedFetch(
          `${API_URL}/${admin.id}/approved`,
          {
            method: "PUT",
            body: JSON.stringify({
              approved: !admin.approved,
            }),
          }
        );


      let data = null;

      try {

        data =
          await response.json();

      } catch {

        data = null;
      }


      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          `Unable to update approval status. Server returned ${response.status}.`
        );
      }


      setAdmins((previous) =>
        previous.map((item) =>
          item.id === admin.id
            ? {
                ...item,
                approved: !admin.approved,
              }
            : item
        )
      );


      setSuccess(
        admin.approved
          ? `${admin.name} has been unapproved.`
          : `${admin.name} has been approved.`
      );

    } catch (approvalError) {

      console.error(
        "Failed to update admin approval:",
        approvalError
      );

      setError(
        approvalError instanceof Error &&
        approvalError.message
          ? approvalError.message
          : "Unable to update approval status."
      );

    } finally {

      setUpdatingId(null);
    }
  };


  /* =========================================================
     DELETE ADMIN
  ========================================================= */

  const handleDelete = async (admin) => {

    if (
      !admin?.id ||
      admin.role === "SUPER_ADMIN"
    ) {
      return;
    }

    if (deletingId === admin.id) {
      return;
    }


    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${admin.name}"?\n\nThis action cannot be undone.`
      );


    if (!confirmed) {
      return;
    }


    setDeletingId(admin.id);

    setError("");

    setSuccess("");


    try {

      const response =
        await authorizedFetch(
          `${API_URL}/${admin.id}`,
          {
            method: "DELETE",
          }
        );


      let data = null;

      try {

        data =
          await response.json();

      } catch {

        data = null;
      }


      if (!response.ok) {

        throw new Error(
          data?.message ||
          data?.error ||
          `Unable to delete admin. Server returned ${response.status}.`
        );
      }


      setAdmins((previous) =>
        previous.filter(
          (item) =>
            item.id !== admin.id
        )
      );


      setSuccess(
        `Admin "${admin.name}" was deleted successfully.`
      );

    } catch (deleteError) {

      console.error(
        "Failed to delete admin:",
        deleteError
      );

      setError(
        deleteError instanceof Error &&
        deleteError.message
          ? deleteError.message
          : "Unable to delete admin."
      );

    } finally {

      setDeletingId(null);
    }
  };


  /* =========================================================
     CLOSE CREATE FORM
  ========================================================= */

  const handleCloseCreateForm = () => {

    if (creating) {
      return;
    }

    setShowCreateForm(false);

    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setShowPassword(false);

    setError("");
  };


  /* =========================================================
     ACCESS DENIED
  ========================================================= */

  if (!isSuperAdmin) {

    return (
      <div className="min-h-screen bg-slate-50 p-6">

        <div className="mx-auto max-w-4xl">

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">

              <ShieldOff
                size={28}
                className="text-red-500"
              />

            </div>


            <h1 className="text-xl font-semibold text-slate-900">
              Access Denied
            </h1>


            <p className="mt-2 text-sm text-slate-500">
              Only a Super Admin can access Admin Management.
            </p>

          </div>

        </div>

      </div>
    );
  }


  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">

                <ShieldCheck size={22} />

              </div>


              <div>

                <h1 className="text-2xl font-bold text-slate-900">
                  Admin Management
                </h1>


                <p className="mt-1 text-sm text-slate-500">
                  Manage administrator accounts and permissions.
                </p>

              </div>

            </div>

          </div>


          <div className="flex items-center gap-2">

            {/* REFRESH */}

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-700
                shadow-sm
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              <span>
                Refresh
              </span>

            </button>


            {/* CREATE */}

            <button
              type="button"
              onClick={() => {
                setShowCreateForm(true);
                setError("");
                setSuccess("");
              }}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-slate-900
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-slate-800
              "
            >

              <UserPlus size={17} />

              <span>
                Create Admin
              </span>

            </button>

          </div>

        </div>


        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (

          <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-green-600"
            />


            <p className="text-sm text-green-700">
              {success}
            </p>


            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto text-green-500 hover:text-green-700"
              aria-label="Close success message"
            >
              <X size={17} />
            </button>

          </div>
        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0 text-red-600"
            />


            <p className="text-sm text-red-700">
              {error}
            </p>


            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700"
              aria-label="Close error message"
            >
              <X size={17} />
            </button>

          </div>
        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">


          {/* TOTAL */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Accounts
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {admins.length}
                </p>

              </div>


              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">

                <Users
                  size={20}
                  className="text-slate-700"
                />

              </div>

            </div>

          </div>


          {/* ACTIVE */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Active Admins
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {
                    admins.filter(
                      (admin) =>
                        admin.role === "ADMIN" &&
                        admin.enabled
                    ).length
                  }
                </p>

              </div>


              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">

                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />

              </div>

            </div>

          </div>


          {/* SUPER ADMIN */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Super Admin
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {
                    admins.filter(
                      (admin) =>
                        admin.role ===
                        "SUPER_ADMIN"
                    ).length
                  }
                </p>

              </div>


              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">

                <ShieldCheck
                  size={20}
                  className="text-blue-600"
                />

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            CREATE FORM
        ================================================= */}

        {showCreateForm && (

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Create New Admin
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create an administrator account for CMS access.
                </p>

              </div>


              <button
                type="button"
                onClick={handleCloseCreateForm}
                disabled={creating}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                aria-label="Close create admin form"
              >
                <X size={20} />
              </button>

            </div>


            <form
              onSubmit={handleCreateAdmin}
              className="p-5 sm:p-6"
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


                {/* NAME */}

                <div>

                  <label
                    htmlFor="admin-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>


                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />


                    <input
                      id="admin-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter admin name"
                      autoComplete="name"
                      required
                      disabled={creating}
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        focus:border-slate-700
                        focus:ring-2
                        focus:ring-slate-200
                        disabled:bg-slate-50
                      "
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>


                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />


                    <input
                      id="admin-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      autoComplete="email"
                      required
                      disabled={creating}
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-10
                        pr-4
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        focus:border-slate-700
                        focus:ring-2
                        focus:ring-slate-200
                        disabled:bg-slate-50
                      "
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="admin-password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>


                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />


                    <input
                      id="admin-password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      disabled={creating}
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-10
                        pr-11
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        focus:border-slate-700
                        focus:ring-2
                        focus:ring-slate-200
                        disabled:bg-slate-50
                      "
                    />


                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      disabled={creating}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >

                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}

                    </button>

                  </div>

                </div>

              </div>


              {/* FORM BUTTONS */}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={handleCloseCreateForm}
                  disabled={creating}
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={creating}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-slate-900
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-slate-800
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {creating ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      <span>
                        Creating...
                      </span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={17} />
                      <span>
                        Create Admin
                      </span>
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>
        )}


        {/* =================================================
            ADMIN LIST
        ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


          {/* HEADER */}

          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Administrator Accounts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Only Super Admin can manage these accounts.
                </p>

              </div>


              <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:block">

                {admins.length} Account
                {admins.length === 1
                  ? ""
                  : "s"}

              </div>

            </div>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="flex min-h-[280px] items-center justify-center">

              <div className="flex flex-col items-center gap-3">

                <span className="h-8 w-8 rounded-full border-[3px] border-slate-200 border-t-slate-900 animate-spin" />

                <p className="text-sm text-slate-500">
                  Loading administrator accounts...
                </p>

              </div>

            </div>

          ) : admins.length === 0 ? (

            /* EMPTY */

            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">

                <Users
                  size={25}
                  className="text-slate-500"
                />

              </div>


              <h3 className="text-base font-semibold text-slate-900">
                No administrator accounts
              </h3>


              <p className="mt-1 max-w-md text-sm text-slate-500">
                Create an Admin account to give someone access to the CMS.
              </p>

            </div>

          ) : (

            /* TABLE */

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] text-left">

                <thead>

                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Administrator
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Role
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Approval
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Created By
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {admins.map((admin) => {

                    const isSuperAdminAccount =
                      admin.role === "SUPER_ADMIN";

                    const isUpdating =
                      updatingId === admin.id;

                    const isDeleting =
                      deletingId === admin.id;


                    return (

                      <tr
                        key={admin.id}
                        className="transition hover:bg-slate-50"
                      >


                        {/* ADMIN */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div
                              className={`
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                  isSuperAdminAccount
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-700"
                                }
                              `}
                            >

                              {admin.name
                                ? admin.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "A"}

                            </div>


                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-slate-900">
                                {admin.name}
                              </p>

                              <p className="truncate text-sm text-slate-500">
                                {admin.email}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* ROLE */}

                        <td className="px-5 py-4">

                          {isSuperAdminAccount ? (

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">

                              <ShieldCheck size={13} />

                              SUPER ADMIN

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">

                              <Users size={13} />

                              ADMIN

                            </span>

                          )}

                        </td>


                        {/* STATUS */}

                        <td className="px-5 py-4">

                          {admin.enabled ? (

                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">

                              <CheckCircle2 size={16} />

                              Enabled

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">

                              <XCircle size={16} />

                              Disabled

                            </span>

                          )}

                        </td>


                        {/* APPROVAL */}

                        <td className="px-5 py-4">

                          {admin.approved ? (

                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">

                              <CheckCircle2 size={16} />

                              Approved

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600">

                              <AlertCircle size={16} />

                              Pending

                            </span>

                          )}

                        </td>


                        {/* CREATED BY */}

                        <td className="px-5 py-4">

                          <span className="text-sm text-slate-600">
                            {admin.createdBy || "SYSTEM"}
                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="px-5 py-4">

                          {isSuperAdminAccount ? (

                            <div className="flex justify-end">

                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">

                                <ShieldCheck size={14} />

                                Protected

                              </span>

                            </div>

                          ) : (

                            <div className="flex justify-end gap-2">


                              {/* ENABLE / DISABLE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleEnabled(
                                    admin
                                  )
                                }
                                disabled={
                                  isUpdating ||
                                  isDeleting
                                }
                                title={
                                  admin.enabled
                                    ? "Disable Admin"
                                    : "Enable Admin"
                                }
                                className={`
                                  inline-flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  transition
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                  ${
                                    admin.enabled
                                      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                                      : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                                  }
                                `}
                              >

                                {isUpdating ? (

                                  <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />

                                ) : admin.enabled ? (

                                  <ShieldOff size={16} />

                                ) : (

                                  <ShieldCheck size={16} />

                                )}

                              </button>


                              {/* APPROVE / UNAPPROVE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleApproved(
                                    admin
                                  )
                                }
                                disabled={
                                  isUpdating ||
                                  isDeleting
                                }
                                title={
                                  admin.approved
                                    ? "Remove Approval"
                                    : "Approve Admin"
                                }
                                className={`
                                  inline-flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  transition
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                  ${
                                    admin.approved
                                      ? "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
                                      : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
                                  }
                                `}
                              >

                                {admin.approved ? (

                                  <XCircle size={16} />

                                ) : (

                                  <CheckCircle2 size={16} />

                                )}

                              </button>


                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    admin
                                  )
                                }
                                disabled={
                                  isUpdating ||
                                  isDeleting
                                }
                                title="Delete Admin"
                                className="
                                  inline-flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  border-red-200
                                  bg-red-50
                                  text-red-600
                                  transition
                                  hover:bg-red-100
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                "
                              >

                                {isDeleting ? (

                                  <span className="h-4 w-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />

                                ) : (

                                  <Trash2 size={16} />

                                )}

                              </button>

                            </div>

                          )}

                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* =================================================
            SECURITY NOTE
        ================================================= */}

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">

          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-slate-600"
          />


          <div>

            <p className="text-sm font-medium text-slate-800">
              Super Admin protected area
            </p>


            <p className="mt-1 text-xs leading-5 text-slate-500">
              Admin accounts are protected by server-side
              role authorization. Only users with the
              SUPER_ADMIN role can create, approve, disable,
              or delete administrator accounts.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


export default AdminManagement;