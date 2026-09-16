import {
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Upload,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const FOOTER_API = `${API_BASE_URL}/api/footer`;
const UPLOAD_API = `${API_BASE_URL}/api/images/upload`;

/* =========================================================
   DEFAULT FOOTER
========================================================= */

const DEFAULT_FOOTER = {
  enabled: true,

  companyName: "Saam Infrastructure",

  description:
    "Reliable construction and infrastructure solutions delivered with quality, precision, safety and long-term value.",

  logoImage: "/saam-logo.png",

  logoAlt: "Saam Infrastructure",

  quickLinksTitle: "Quick Links",

  servicesTitle: "Our Services",

  contactTitle: "Contact Us",

  phone: "+91 98227 35116",

  email: "saaminfrastructure@gmail.com",

  address:
    "Plot No. 2, Dhawale Building, Old Dighori Square, Umred Rd, Dighori, Nagpur, Maharashtra 440034",

  facebookUrl:
    "https://www.facebook.com/saaminfrastructure",

  instagramUrl:
    "https://www.instagram.com/saaminfrastructure",

  linkedinUrl:
    "https://www.linkedin.com/company/saam-infrastructure/",

  youtubeUrl:
    "https://www.youtube.com/@saaminfrastructure",

  copyrightText:
    "© 2026 Saam Infrastructure. All rights reserved.",
};

/* =========================================================
   INPUT COMPONENT
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34352F]">
        {label}
      </label>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-[#D9D2C1]
          bg-white
          px-4
          py-3
          text-sm
          text-[#24251F]
          outline-none
          transition-all
          duration-200
          placeholder:text-[#9A9A91]
          focus:border-[#C9A24A]
          focus:ring-2
          focus:ring-[#C9A24A]/15
        "
      />
    </div>
  );
}

/* =========================================================
   TEXTAREA COMPONENT
========================================================= */

function TextareaField({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#34352F]">
        {label}
      </label>

      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-[#D9D2C1]
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-[#24251F]
          outline-none
          transition-all
          duration-200
          placeholder:text-[#9A9A91]
          focus:border-[#C9A24A]
          focus:ring-2
          focus:ring-[#C9A24A]/15
        "
      />
    </div>
  );
}

/* =========================================================
   SECTION CARD
========================================================= */

function SectionCard({ title, description, children }) {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#E0DBCE]
        bg-white
        shadow-sm
      "
    >
      <div className="border-b border-[#E9E5DA] px-5 py-4 sm:px-6">
        <h2 className="text-base font-bold text-[#24251F]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-xs leading-5 text-[#77786F]">
            {description}
          </p>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   ADMIN FOOTER
========================================================= */

function AdminFooter() {
  const navigate = useNavigate();

  const [footer, setFooter] = useState(DEFAULT_FOOTER);

  const [footerId, setFooterId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  /* =======================================================
     LOAD FOOTER
  ======================================================= */

  const loadFooter = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(FOOTER_API);

      if (response.status === 404) {
        setFooter({
          ...DEFAULT_FOOTER,
        });

        setFooterId(null);
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load footer: ${response.status}`
        );
      }

      const data = await response.json();

      setFooterId(data.id ?? null);

      setFooter({
        ...DEFAULT_FOOTER,
        ...data,
      });
    } catch (err) {
      console.error(
        "Admin footer load error:",
        err
      );

      setFooter({
        ...DEFAULT_FOOTER,
      });

      setError(
        "Unable to load footer from backend. Default values are being shown."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFooter();
  }, []);

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const updateField = (field, value) => {
    setFooter((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
    setError("");
  };

  /* =======================================================
     SAVE FOOTER
  ======================================================= */

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        enabled: footer.enabled,

        companyName: footer.companyName,
        description: footer.description,

        logoImage: footer.logoImage,
        logoAlt: footer.logoAlt,

        quickLinksTitle: footer.quickLinksTitle,
        servicesTitle: footer.servicesTitle,
        contactTitle: footer.contactTitle,

        phone: footer.phone,
        email: footer.email,
        address: footer.address,

        facebookUrl: footer.facebookUrl,
        instagramUrl: footer.instagramUrl,
        linkedinUrl: footer.linkedinUrl,
        youtubeUrl: footer.youtubeUrl,

        copyrightText: footer.copyrightText,
      };

      let response;

      if (footerId) {
        response = await fetch(
          `${FOOTER_API}/${footerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await fetch(
          FOOTER_API,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      if (!response.ok) {
        const text = await response.text();

        throw new Error(
          text ||
            `Footer save failed: ${response.status}`
        );
      }

      const data = await response.json();

      setFooterId(
        data.id ?? footerId
      );

      setFooter({
        ...DEFAULT_FOOTER,
        ...data,
      });

      setMessage(
        "Footer saved successfully."
      );
    } catch (err) {
      console.error(
        "Footer save error:",
        err
      );

      setError(
        err.message ||
          "Failed to save footer."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     LOGO UPLOAD
  ======================================================= */

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      return;
    }

    setUploadingLogo(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", "footer");

      const response = await fetch(
        UPLOAD_API,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const text =
          await response.text();

        throw new Error(
          text ||
            `Logo upload failed: ${response.status}`
        );
      }

      const data =
        await response.json();

      const imageUrl =
        data.url ||
        data.imageUrl ||
        data.path;

      if (!imageUrl) {
        throw new Error(
          "Image uploaded but backend did not return an image URL."
        );
      }

      updateField(
        "logoImage",
        imageUrl
      );

      setMessage(
        "Logo uploaded successfully."
      );
    } catch (err) {
      console.error(
        "Footer logo upload error:",
        err
      );

      setError(
        err.message ||
          "Failed to upload logo."
      );
    } finally {
      setUploadingLogo(false);
    }
  };

  /* =======================================================
     REMOVE LOGO
  ======================================================= */

  const handleRemoveLogo = () => {
    updateField(
      "logoImage",
      ""
    );

    setMessage(
      "Logo removed. Save Footer to apply the change."
    );
  };

  /* =======================================================
     RESET TO DEFAULT
  ======================================================= */

  const handleReset = () => {
    setFooter({
      ...DEFAULT_FOOTER,
    });

    setMessage(
      "Default values restored. Click Save Footer to apply them."
    );

    setError("");
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-[#F7F4EC]">
        <div className="flex items-center gap-3 text-sm font-medium text-[#77786F]">
          <Loader2
            size={20}
            className="animate-spin text-[#C9A24A]"
          />

          Loading Footer...
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F7F4EC]">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="border-b border-[#E1DCCD] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#C9A24A]/10
                    text-[#B58A32]
                  "
                >
                  <ImageIcon size={21} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#24251F]">
                    Footer
                  </h1>

                  <p className="mt-1 text-sm text-[#77786F]">
                    Manage your website footer content and settings.
                  </p>
                </div>

              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* =================================================
                  BACK TO DASHBOARD
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/dashboard")
                }
                disabled={
                  saving ||
                  uploadingLogo
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#D9D2C1]
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#3F403A]
                  transition-all
                  duration-200
                  hover:border-[#C9A24A]
                  hover:text-[#B58A32]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <ArrowLeft size={17} />

                Back to Dashboard
              </button>

              {/* =================================================
                  REFRESH
              ================================================== */}

              <button
                type="button"
                onClick={loadFooter}
                disabled={
                  loading ||
                  saving
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#D9D2C1]
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#3F403A]
                  transition-all
                  duration-200
                  hover:border-[#C9A24A]
                  hover:text-[#B58A32]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <RefreshCw size={17} />

                Refresh
              </button>

              {/* =================================================
                  SAVE FOOTER
              ================================================== */}

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#C9A24A]
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-[#171916]
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-[#E0C36A]
                  hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={17} />
                )}

                {saving
                  ? "Saving..."
                  : "Save Footer"}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-5 py-7 sm:px-6 lg:px-8">

        {/* ===================================================
            STATUS MESSAGES
        ==================================================== */}

        {message && (
          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              text-green-800
            "
          >
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{message}</span>
          </div>
        )}

        {error && (
          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-800
            "
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* =================================================
              LEFT / MAIN
          ================================================== */}

          <div className="space-y-6 xl:col-span-2">

            {/* =================================================
                VISIBILITY
            ================================================== */}

            <SectionCard
              title="Footer Visibility"
              description="Control whether the footer is displayed on the public website."
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  rounded-xl
                  border
                  border-[#E4DFD2]
                  bg-[#FAF8F2]
                  p-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        footer.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {footer.enabled ? (
                      <Eye size={19} />
                    ) : (
                      <EyeOff size={19} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#24251F]">
                      {footer.enabled
                        ? "Footer is enabled"
                        : "Footer is disabled"}
                    </p>

                    <p className="mt-1 text-xs text-[#77786F]">
                      {footer.enabled
                        ? "Visitors can see the footer."
                        : "The footer is hidden from visitors."}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "enabled",
                      !footer.enabled
                    )
                  }
                  className={`
                    relative
                    h-7
                    w-12
                    shrink-0
                    rounded-full
                    transition-colors
                    duration-200
                    ${
                      footer.enabled
                        ? "bg-[#C9A24A]"
                        : "bg-[#B8B6AD]"
                    }
                  `}
                  aria-label="Toggle footer visibility"
                >
                  <span
                    className={`
                      absolute
                      top-1
                      h-5
                      w-5
                      rounded-full
                      bg-white
                      shadow-sm
                      transition-transform
                      duration-200
                      ${
                        footer.enabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }
                    `}
                  />
                </button>

              </div>
            </SectionCard>

            {/* =================================================
                COMPANY
            ================================================== */}

            <SectionCard
              title="Company Information"
              description="Manage the company identity and description shown in the footer."
            >

              <div className="space-y-5">

                <InputField
                  label="Company Name"
                  value={footer.companyName}
                  onChange={(value) =>
                    updateField(
                      "companyName",
                      value
                    )
                  }
                  placeholder="Saam Infrastructure"
                />

                <TextareaField
                  label="Company Description"
                  value={footer.description}
                  onChange={(value) =>
                    updateField(
                      "description",
                      value
                    )
                  }
                  placeholder="Enter company description..."
                  rows={5}
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <InputField
                    label="Logo Alt Text"
                    value={footer.logoAlt}
                    onChange={(value) =>
                      updateField(
                        "logoAlt",
                        value
                      )
                    }
                    placeholder="Saam Infrastructure"
                  />

                </div>

              </div>
            </SectionCard>

            {/* =================================================
                LOGO
            ================================================== */}

            <SectionCard
              title="Footer Logo"
              description="Upload the logo displayed in the company section of the footer."
            >

              <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr] md:items-start">

                {/* PREVIEW */}

                <div
                  className="
                    flex
                    min-h-[150px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#D9D2C1]
                    bg-[#171916]
                    p-5
                  "
                >
                  {footer.logoImage ? (
                    <img
                      src={footer.logoImage}
                      alt={
                        footer.logoAlt ||
                        footer.companyName ||
                        "Footer Logo"
                      }
                      className="
                        max-h-[110px]
                        max-w-full
                        object-contain
                      "
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="text-center text-xs text-[#77786F]">
                      No logo selected
                    </div>
                  )}
                </div>

                {/* CONTROLS */}

                <div>

                  <div className="flex flex-wrap gap-3">

                    <label
                      className="
                        inline-flex
                        cursor-pointer
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#C9A24A]
                        px-4
                        py-3
                        text-sm
                        font-bold
                        text-[#171916]
                        transition-all
                        duration-200
                        hover:bg-[#E0C36A]
                      "
                    >
                      {uploadingLogo ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Upload size={17} />
                      )}

                      {uploadingLogo
                        ? "Uploading..."
                        : "Upload Logo"}

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={
                          uploadingLogo
                        }
                        onChange={
                          handleLogoUpload
                        }
                      />
                    </label>

                    {footer.logoImage && (
                      <button
                        type="button"
                        onClick={
                          handleRemoveLogo
                        }
                        disabled={
                          uploadingLogo
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-red-200
                          bg-white
                          px-4
                          py-3
                          text-sm
                          font-semibold
                          text-red-600
                          transition-all
                          duration-200
                          hover:bg-red-50
                          disabled:opacity-50
                        "
                      >
                        <Trash2 size={17} />

                        Remove Logo
                      </button>
                    )}

                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#77786F]">
                    Recommended: use a transparent PNG, WebP, or SVG
                    logo. The image upload system supports your existing
                    image upload limits.
                  </p>

                  {footer.logoImage && (
                    <div className="mt-4 rounded-lg bg-[#F7F4EC] px-3 py-2">
                      <p className="break-all text-xs text-[#77786F]">
                        <span className="font-semibold text-[#4A4B44]">
                          Current image:
                        </span>{" "}
                        {footer.logoImage}
                      </p>
                    </div>
                  )}

                </div>

              </div>
            </SectionCard>

            {/* =================================================
                COLUMN TITLES
            ================================================== */}

            <SectionCard
              title="Footer Column Titles"
              description="Change the headings displayed above each footer column."
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <InputField
                  label="Quick Links Title"
                  value={footer.quickLinksTitle}
                  onChange={(value) =>
                    updateField(
                      "quickLinksTitle",
                      value
                    )
                  }
                  placeholder="Quick Links"
                />

                <InputField
                  label="Services Title"
                  value={footer.servicesTitle}
                  onChange={(value) =>
                    updateField(
                      "servicesTitle",
                      value
                    )
                  }
                  placeholder="Our Services"
                />

                <InputField
                  label="Contact Title"
                  value={footer.contactTitle}
                  onChange={(value) =>
                    updateField(
                      "contactTitle",
                      value
                    )
                  }
                  placeholder="Contact Us"
                />

              </div>

            </SectionCard>

            {/* =================================================
                CONTACT
            ================================================== */}

            <SectionCard
              title="Contact Information"
              description="Manage the phone number, email address and physical address shown in the footer."
            >

              <div className="space-y-5">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <InputField
                    label="Phone"
                    value={footer.phone}
                    onChange={(value) =>
                      updateField(
                        "phone",
                        value
                      )
                    }
                    placeholder="+91 98227 35116"
                  />

                  <InputField
                    label="Email"
                    type="email"
                    value={footer.email}
                    onChange={(value) =>
                      updateField(
                        "email",
                        value
                      )
                    }
                    placeholder="saaminfrastructure@gmail.com"
                  />

                </div>

                <TextareaField
                  label="Address"
                  value={footer.address}
                  onChange={(value) =>
                    updateField(
                      "address",
                      value
                    )
                  }
                  placeholder="Enter company address..."
                  rows={5}
                />

              </div>
            </SectionCard>

            {/* =================================================
                SOCIAL MEDIA
            ================================================== */}

            <SectionCard
              title="Social Media"
              description="Enter the social media URLs. Leave a field empty to hide that social icon."
            >

              <div className="space-y-5">

                <InputField
                  label="Facebook URL"
                  value={footer.facebookUrl}
                  onChange={(value) =>
                    updateField(
                      "facebookUrl",
                      value
                    )
                  }
                  placeholder="https://www.facebook.com/..."
                />

                <InputField
                  label="Instagram URL"
                  value={footer.instagramUrl}
                  onChange={(value) =>
                    updateField(
                      "instagramUrl",
                      value
                    )
                  }
                  placeholder="https://www.instagram.com/..."
                />

                <InputField
                  label="LinkedIn URL"
                  value={footer.linkedinUrl}
                  onChange={(value) =>
                    updateField(
                      "linkedinUrl",
                      value
                    )
                  }
                  placeholder="https://www.linkedin.com/company/..."
                />

                <InputField
                  label="YouTube URL"
                  value={footer.youtubeUrl}
                  onChange={(value) =>
                    updateField(
                      "youtubeUrl",
                      value
                    )
                  }
                  placeholder="https://www.youtube.com/..."
                />

              </div>
            </SectionCard>

            {/* =================================================
                COPYRIGHT
            ================================================== */}

            <SectionCard
              title="Copyright"
              description="Manage the copyright text displayed at the bottom of the website."
            >

              <InputField
                label="Copyright Text"
                value={footer.copyrightText}
                onChange={(value) =>
                  updateField(
                    "copyrightText",
                    value
                  )
                }
                placeholder="© 2026 Saam Infrastructure. All rights reserved."
              />

            </SectionCard>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-6">

            {/* =================================================
                LIVE STATUS
            ================================================== */}

            <div
              className="
                sticky
                top-6
                rounded-2xl
                border
                border-[#E0DBCE]
                bg-white
                p-5
                shadow-sm
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    ${
                      footer.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {footer.enabled ? (
                    <Eye size={19} />
                  ) : (
                    <EyeOff size={19} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold text-[#24251F]">
                    Footer Status
                  </p>

                  <p className="text-xs text-[#77786F]">
                    {footer.enabled
                      ? "Visible on website"
                      : "Hidden on website"}
                  </p>
                </div>

              </div>

              <div className="mt-5 border-t border-[#E9E5DA] pt-5">

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#C9A24A]
                    px-4
                    py-3
                    text-sm
                    font-bold
                    text-[#171916]
                    transition-all
                    duration-200
                    hover:bg-[#E0C36A]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {saving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Save size={17} />
                  )}

                  {saving
                    ? "Saving Footer..."
                    : "Save Footer"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#D9D2C1]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-[#4A4B44]
                    transition-all
                    duration-200
                    hover:border-[#C9A24A]
                    hover:text-[#B58A32]
                    disabled:opacity-50
                  "
                >
                  <RefreshCw size={16} />

                  Reset Defaults
                </button>

              </div>

            </div>

            {/* =================================================
                CURRENT SETTINGS
            ================================================== */}

            <div
              className="
                rounded-2xl
                border
                border-[#E0DBCE]
                bg-white
                p-5
                shadow-sm
              "
            >

              <h3 className="text-sm font-bold text-[#24251F]">
                Current Settings
              </h3>

              <div className="mt-4 space-y-3">

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#77786F]">
                    Database ID
                  </span>

                  <span className="text-xs font-semibold text-[#34352F]">
                    {footerId ||
                      "Not created"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#77786F]">
                    Visibility
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-2.5
                      py-1
                      text-[11px]
                      font-bold
                      ${
                        footer.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {footer.enabled
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>

              </div>

            </div>

            {/* =================================================
                NOTE
            ================================================== */}

            <div
              className="
                rounded-2xl
                border
                border-[#C9A24A]/30
                bg-[#C9A24A]/5
                p-5
              "
            >

              <div className="flex gap-3">

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-[#B58A32]"
                />

                <div>
                  <p className="text-sm font-bold text-[#4A3A15]">
                    Important
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#6F613F]">
                    Changes are applied to the public footer after
                    you click <strong>Save Footer</strong>.
                  </p>
                </div>

              </div>

            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}

export default AdminFooter;