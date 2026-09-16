import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8080";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      // =================================================
      // BACKEND LOGIN
      // =================================================

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );


      // =================================================
      // READ RESPONSE
      // =================================================

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }


      // =================================================
      // LOGIN FAILED
      // =================================================

      if (!response.ok) {

        if (response.status === 401) {
          throw new Error(
            "Invalid email or password."
          );
        }


        if (response.status === 403) {
          throw new Error(
            data?.message ||
              "Your admin account is disabled or not approved."
          );
        }


        if (response.status === 404) {
          throw new Error(
            "Admin account was not found."
          );
        }


        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to sign in. Please try again."
        );
      }


      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (!data || !data.token) {

        throw new Error(
          "Login was successful, but no authentication token was received."
        );
      }


      // =================================================
      // STORE JWT
      // =================================================

      localStorage.setItem(
        "adminToken",
        data.token
      );


      // =================================================
      // STORE LOGIN FLAG
      // =================================================

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );


      // =================================================
      // STORE USER INFORMATION
      // =================================================

      const adminUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      };


      localStorage.setItem(
        "adminUser",
        JSON.stringify(adminUser)
      );


      // =================================================
      // STORE INDIVIDUAL VALUES
      // =================================================

      if (
        data.id !== undefined &&
        data.id !== null
      ) {

        localStorage.setItem(
          "adminId",
          String(data.id)
        );
      }


      if (data.name) {

        localStorage.setItem(
          "adminName",
          data.name
        );
      }


      if (data.email) {

        localStorage.setItem(
          "adminEmail",
          data.email
        );
      }


      if (data.role) {

        localStorage.setItem(
          "adminRole",
          data.role
        );
      }


      // =================================================
      // LOGIN SUCCESS
      // =================================================

      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

    } catch (error) {

      console.error(
        "Admin login failed:",
        error
      );


      // =================================================
      // BACKEND NOT AVAILABLE
      // =================================================

      if (
        error instanceof TypeError &&
        error.message
          .toLowerCase()
          .includes("fetch")
      ) {

        setError(
          "Unable to connect to the server. Please make sure the Spring Boot backend is running on port 8080."
        );

      } else {

        setError(
          error instanceof Error &&
            error.message
            ? error.message
            : "Invalid email or password."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOGOUT CLEANUP
  // =====================================================

  /*
   * Login page itself does not normally need this,
   * but keeping authentication storage centralized
   * makes the authentication flow easier to understand.
   */


  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#f5f7fa]
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      <div className="w-full max-w-md">

        {/* =================================================
            LOGO / BRAND
        ================================================= */}

        <div className="mb-8 text-center">

          <div
            className="
              mb-5
              inline-flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#1f2937]
              shadow-lg
            "
          >

            <ShieldCheck
              size={32}
              strokeWidth={1.8}
              className="text-white"
            />

          </div>


          <h1
            className="
              text-2xl
              font-bold
              text-[#1f2937]
            "
          >
            SAAM Infrastructure
          </h1>


          <p
            className="
              mt-2
              text-sm
              text-gray-500
            "
          >
            Admin CMS
          </p>

        </div>


        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-7
            shadow-xl
            sm:p-8
          "
        >

          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div className="mb-7">

            <h2
              className="
                text-xl
                font-semibold
                text-[#1f2937]
              "
            >
              Admin Login
            </h2>


            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Sign in to manage your website content.
            </p>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                mb-5
                rounded-lg
                border
                border-red-200
                bg-red-50
                px-4
                py-3
              "
            >

              <p
                className="
                  text-sm
                  text-red-600
                "
              >
                {error}
              </p>

            </div>
          )}


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =================================================
                EMAIL
            ================================================= */}

            <div>

              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Email Address
              </label>


              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />


                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@saaminfrastructure.com"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-gray-800
                    outline-none
                    transition
                    focus:border-[#1f2937]
                    focus:ring-2
                    focus:ring-gray-200
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />

              </div>

            </div>


            {/* =================================================
                PASSWORD
            ================================================= */}

            <div>

              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Password
              </label>


              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />


                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-10
                    pr-11
                    text-sm
                    text-gray-800
                    outline-none
                    transition
                    focus:border-[#1f2937]
                    focus:ring-2
                    focus:ring-gray-200
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                  "
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  disabled={loading}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition
                    hover:text-gray-700
                    disabled:cursor-not-allowed
                  "
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


            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#1f2937]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#111827]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                    "
                  />

                  <span>
                    Signing In...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Sign In
                  </span>

                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>


          {/* =================================================
              SECURITY INFO
          ================================================= */}

          <div
            className="
              mt-7
              border-t
              border-gray-100
              pt-5
            "
          >

            <p
              className="
                text-center
                text-xs
                text-gray-400
              "
            >
              Secure Admin Content Management System
            </p>

          </div>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <p
          className="
            mt-6
            text-center
            text-xs
            text-gray-400
          "
        >
          © {new Date().getFullYear()} SAAM Infrastructure
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;