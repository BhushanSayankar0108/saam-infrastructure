import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api/auth/change-password`;

function AdminChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");


  // =====================================================
  // GET CURRENT ADMIN
  // =====================================================

  const getCurrentAdmin = () => {
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


  const currentAdmin = getCurrentAdmin();


  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setSuccess("");


    // ===================================================
    // VALIDATE CURRENT PASSWORD
    // ===================================================

    if (!formData.currentPassword) {
      setError(
        "Please enter your current password."
      );

      return;
    }


    // ===================================================
    // VALIDATE NEW PASSWORD
    // ===================================================

    if (!formData.newPassword) {
      setError(
        "Please enter your new password."
      );

      return;
    }


    // ===================================================
    // MINIMUM PASSWORD LENGTH
    // ===================================================

    if (formData.newPassword.length < 8) {
      setError(
        "New password must contain at least 8 characters."
      );

      return;
    }


    // ===================================================
    // CONFIRM PASSWORD
    // ===================================================

    if (!formData.confirmPassword) {
      setError(
        "Please confirm your new password."
      );

      return;
    }


    // ===================================================
    // PASSWORD MATCH
    // ===================================================

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError(
        "New password and confirm password do not match."
      );

      return;
    }


    // ===================================================
    // CHECK JWT
    // ===================================================

    const token =
      localStorage.getItem("adminToken");


    if (!token) {
      setError(
        "Your session has expired. Please login again."
      );

      return;
    }


    setLoading(true);


    try {

      // =================================================
      // API REQUEST
      // =================================================

      const response = await fetch(
        API_URL,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            currentPassword:
              formData.currentPassword,

            newPassword:
              formData.newPassword,
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
      // UNAUTHORIZED
      // =================================================

      if (response.status === 401) {

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminUser"
        );

        localStorage.removeItem(
          "adminRole"
        );

        localStorage.removeItem(
          "adminLoggedIn"
        );

        navigate(
          "/admin/login",
          { replace: true }
        );

        return;
      }


      // =================================================
      // FORBIDDEN
      // =================================================

      if (response.status === 403) {

        setError(
          data?.message ||
            "You do not have permission to change the password."
        );

        return;
      }


      // =================================================
      // OTHER ERROR
      // =================================================

      if (!response.ok) {

        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to change password."
        );
      }


      // =================================================
      // SUCCESS
      // =================================================

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });


      setSuccess(
        "Your password has been changed successfully."
      );

    } catch (error) {

      console.error(
        "Change password error:",
        error
      );


      setError(
        error instanceof Error &&
          error.message
          ? error.message
          : "Unable to change password. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    navigate("/admin/dashboard");
  };


  // =====================================================
  // PASSWORD FIELD COMPONENT
  // =====================================================

  const renderPasswordInput = ({
    id,
    name,
    label,
    placeholder,
    value,
    showPassword,
    setShowPassword,
    autoComplete,
  }) => {

    return (
      <div>

        <label
          htmlFor={id}
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
        >
          {label}
        </label>


        <div className="relative">

          <LockKeyhole
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />


          <input
            id={id}
            name={name}
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required
            disabled={loading}
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
              disabled:cursor-not-allowed
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
            disabled={loading}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
              transition
              hover:text-slate-700
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
    );
  };


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        p-4
        sm:p-6
        lg:p-8
      "
    >

      <div
        className="
          mx-auto
          max-w-3xl
        "
      >

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={handleBack}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition
              hover:text-slate-900
            "
          >

            <ArrowLeft size={17} />

            <span>
              Back to Dashboard
            </span>

          </button>


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-slate-900
                text-white
                shadow-sm
              "
            >

              <LockKeyhole size={22} />

            </div>


            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                Change Password
              </h1>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Update your admin account password.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div
            className="
              border-b
              border-slate-100
              px-5
              py-5
              sm:px-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <ShieldCheck
                size={20}
                className="text-slate-600"
              />


              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-slate-900
                  "
                >
                  Account Security
                </h2>


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Change the password for your
                  administrator account.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              CURRENT USER
          ================================================= */}

          {currentAdmin && (
            <div
              className="
                border-b
                border-slate-100
                bg-slate-50
                px-5
                py-4
                sm:px-6
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Logged in as
              </p>


              <div
                className="
                  mt-1
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  {currentAdmin.name ||
                    "Administrator"}
                </span>


                <span
                  className="
                    text-sm
                    text-slate-400
                  "
                >
                  •
                </span>


                <span
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {currentAdmin.email || ""}
                </span>


                {currentAdmin.role && (
                  <span
                    className="
                      rounded-full
                      bg-slate-900
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      tracking-wide
                      text-white
                    "
                  >
                    {currentAdmin.role}
                  </span>
                )}

              </div>

            </div>
          )}


          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="px-5 pt-5 sm:px-6">

            {success && (
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-green-200
                  bg-green-50
                  px-4
                  py-3
                "
              >

                <CheckCircle2
                  size={19}
                  className="
                    mt-0.5
                    shrink-0
                    text-green-600
                  "
                />


                <p
                  className="
                    text-sm
                    text-green-700
                  "
                >
                  {success}
                </p>

              </div>
            )}


            {error && (
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                "
              >

                <AlertCircle
                  size={19}
                  className="
                    mt-0.5
                    shrink-0
                    text-red-600
                  "
                />


                <p
                  className="
                    text-sm
                    text-red-700
                  "
                >
                  {error}
                </p>

              </div>
            )}

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="
              space-y-5
              p-5
              sm:p-6
            "
          >

            {/* CURRENT PASSWORD */}

            {renderPasswordInput({
              id: "current-password",
              name: "currentPassword",
              label: "Current Password",
              placeholder: "Enter your current password",
              value: formData.currentPassword,
              showPassword:
                showCurrentPassword,
              setShowPassword:
                setShowCurrentPassword,
              autoComplete:
                "current-password",
            })}


            {/* NEW PASSWORD */}

            {renderPasswordInput({
              id: "new-password",
              name: "newPassword",
              label: "New Password",
              placeholder:
                "Enter your new password",
              value: formData.newPassword,
              showPassword:
                showNewPassword,
              setShowPassword:
                setShowNewPassword,
              autoComplete:
                "new-password",
            })}


            {/* CONFIRM PASSWORD */}

            {renderPasswordInput({
              id: "confirm-password",
              name: "confirmPassword",
              label: "Confirm New Password",
              placeholder:
                "Confirm your new password",
              value:
                formData.confirmPassword,
              showPassword:
                showConfirmPassword,
              setShowPassword:
                setShowConfirmPassword,
              autoComplete:
                "new-password",
            })}


            {/* PASSWORD REQUIREMENTS */}

            <div
              className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-4
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Password requirements
              </p>


              <ul
                className="
                  mt-2
                  space-y-1
                  text-xs
                  text-slate-500
                "
              >

                <li>
                  • At least 8 characters
                </li>

                <li>
                  • Must be different from your
                  current password
                </li>

                <li>
                  • Keep your password private
                </li>

              </ul>

            </div>


            {/* BUTTONS */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-slate-100
                pt-5
                sm:flex-row
                sm:justify-end
              "
            >

              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
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
                disabled={loading}
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
                      Changing Password...
                    </span>
                  </>
                ) : (
                  <>
                    <LockKeyhole size={17} />

                    <span>
                      Change Password
                    </span>
                  </>
                )}

              </button>

            </div>

          </form>

        </div>


        {/* =================================================
            SECURITY NOTE
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-4
            shadow-sm
          "
        >

          <ShieldCheck
            size={19}
            className="
              mt-0.5
              shrink-0
              text-slate-600
            "
          />


          <div>

            <p
              className="
                text-sm
                font-medium
                text-slate-800
              "
            >
              Secure password management
            </p>


            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500
              "
            >
              Your new password is securely
              encrypted on the server before it
              is stored. Your password is never
              stored in the browser.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminChangePassword;