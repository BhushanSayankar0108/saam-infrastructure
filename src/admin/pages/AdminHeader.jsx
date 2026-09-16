import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Upload,
  Trash2,
  Plus,
  GripVertical,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const HEADER_API = `${API_BASE_URL}/api/header`;
const MENU_API = `${API_BASE_URL}/api/header/menu`;
const UPLOAD_API = `${API_BASE_URL}/api/images/upload`;

/* =========================================================
   DEFAULT MENU
========================================================= */

const DEFAULT_MENU_ITEMS = [
  {
    name: "Home",
    path: "/",
    enabled: true,
    displayOrder: 0,
  },
  {
    name: "About",
    path: "/about",
    enabled: true,
    displayOrder: 1,
  },
  {
    name: "Services",
    path: "/services",
    enabled: true,
    displayOrder: 2,
  },
  {
    name: "Projects",
    path: "/projects",
    enabled: true,
    displayOrder: 3,
  },
  {
    name: "Gallery",
    path: "/gallery",
    enabled: true,
    displayOrder: 4,
  },
  {
    name: "Contact",
    path: "/contact",
    enabled: true,
    displayOrder: 5,
  },
];

/* =========================================================
   DEFAULT HEADER
========================================================= */

const DEFAULT_HEADER = {
  enabled: true,
  logoImage: "/saam-logo.png",
  logoAlt: "Saam Infrastructure",
  ctaEnabled: true,
  ctaText: "Start Your Project",
  ctaLink: "/contact",
};

/* =========================================================
   COMPONENT
========================================================= */

function AdminHeader() {
  const navigate = useNavigate();

  /* =======================================================
     HEADER STATE
  ======================================================= */

  const [headerId, setHeaderId] = useState(null);

  const [header, setHeader] = useState({
    ...DEFAULT_HEADER,
  });

  /* =======================================================
     MENU STATE
  ======================================================= */

  const [menuItems, setMenuItems] = useState([]);

  /* =======================================================
     LOADING / SAVING STATE
  ======================================================= */

  const [loading, setLoading] = useState(true);
  const [savingHeader, setSavingHeader] = useState(false);
  const [savingMenu, setSavingMenu] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  /* =======================================================
     MESSAGE STATE
  ======================================================= */

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     LOAD HEADER DATA
  ========================================================= */

  const loadHeader = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const [headerResponse, menuResponse] = await Promise.all([
        fetch(HEADER_API),
        fetch(MENU_API),
      ]);

      /* =====================================================
         HEADER
      ===================================================== */

      if (headerResponse.ok) {
        const data = await headerResponse.json();

        setHeaderId(data.id ?? null);

        setHeader({
          enabled:
            data.enabled !== undefined &&
            data.enabled !== null
              ? data.enabled
              : true,

          logoImage:
            data.logoImage || "/saam-logo.png",

          logoAlt:
            data.logoAlt || "Saam Infrastructure",

          ctaEnabled:
            data.ctaEnabled !== undefined &&
            data.ctaEnabled !== null
              ? data.ctaEnabled
              : true,

          ctaText:
            data.ctaText ||
            "Start Your Project",

          ctaLink:
            data.ctaLink ||
            "/contact",
        });
      } else {
        setHeaderId(null);

        setHeader({
          ...DEFAULT_HEADER,
        });
      }

      /* =====================================================
         NAVIGATION MENU
      ===================================================== */

      if (menuResponse.ok) {
        const menuData = await menuResponse.json();

        if (
          Array.isArray(menuData) &&
          menuData.length > 0
        ) {
          const sortedMenu = [...menuData].sort(
            (a, b) =>
              (a.displayOrder ?? 0) -
              (b.displayOrder ?? 0)
          );

          setMenuItems(sortedMenu);
        } else {
          setMenuItems(
            DEFAULT_MENU_ITEMS.map((item) => ({
              ...item,
            }))
          );
        }
      } else {
        setMenuItems(
          DEFAULT_MENU_ITEMS.map((item) => ({
            ...item,
          }))
        );
      }
    } catch (err) {
      console.error(
        "Header loading error:",
        err
      );

      setError(
        "Unable to load Header settings. Please check that the backend is running."
      );

      setHeader({
        ...DEFAULT_HEADER,
      });

      setMenuItems(
        DEFAULT_MENU_ITEMS.map((item) => ({
          ...item,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOAD ON MOUNT
  ========================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadHeader();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================================
     RESET DEFAULTS
  ========================================================= */

  const handleReset = () => {
    setHeader({
      ...DEFAULT_HEADER,
    });

    setMenuItems(
      DEFAULT_MENU_ITEMS.map((item) => ({
        ...item,
      }))
    );

    setMessage(
      "Default values restored. Click Save Header and Save Navigation to apply them."
    );

    setError("");
  };

  /* =========================================================
     HEADER FIELD CHANGE
  ========================================================= */

  const handleHeaderChange = (field, value) => {
    setHeader((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
    setError("");
  };

  /* =========================================================
     LOGO UPLOAD
  ========================================================= */

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadingLogo(true);
      setError("");
      setMessage("");

      /* -----------------------------------------------------
         Basic validation
      ----------------------------------------------------- */

      if (!file.type.startsWith("image/")) {
        throw new Error(
          "Please select a valid image file."
        );
      }

      /* -----------------------------------------------------
         500 MB maximum
      ----------------------------------------------------- */

      const maxSize =
        500 * 1024 * 1024;

      if (file.size > maxSize) {
        throw new Error(
          "Logo file cannot be larger than 500 MB."
        );
      }

      /* -----------------------------------------------------
         FormData
      ----------------------------------------------------- */

      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", "header");

      /* -----------------------------------------------------
         Upload
      ----------------------------------------------------- */

      const response = await fetch(
        UPLOAD_API,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let errorMessage =
          "Logo upload failed.";

        try {
          const data =
            await response.json();

          if (data?.message) {
            errorMessage =
              data.message;
          }
        } catch {
          // Ignore JSON parsing error.
        }

        throw new Error(errorMessage);
      }

      const data =
        await response.json();

      const imageUrl =
        data?.url ||
        data?.imageUrl ||
        data?.path;

      if (!imageUrl) {
        throw new Error(
          "Upload succeeded but the server did not return an image URL."
        );
      }

      handleHeaderChange(
        "logoImage",
        imageUrl
      );

      setMessage(
        "Logo uploaded successfully. Click Save Header to save it."
      );
    } catch (err) {
      console.error(
        "Logo upload error:",
        err
      );

      setError(
        err?.message ||
          "Unable to upload logo."
      );
    } finally {
      setUploadingLogo(false);

      if (event.target) {
        event.target.value = "";
      }
    }
  };

  /* =========================================================
     MENU FIELD CHANGE
  ========================================================= */

  const updateMenuItem = (
    index,
    field,
    value
  ) => {
    setMenuItems((previous) =>
      previous.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: value,
              }
            : item
      )
    );

    setMessage("");
    setError("");
  };

  /* =========================================================
     ADD MENU ITEM
  ========================================================= */

  const addMenuItem = () => {
    setMenuItems((previous) => [
      ...previous,
      {
        name: "New Page",
        path: "/",
        enabled: true,
        displayOrder:
          previous.length,
      },
    ]);

    setMessage("");
    setError("");
  };

  /* =========================================================
     DELETE MENU ITEM
  ========================================================= */

  const deleteMenuItem = async (index) => {
    const item = menuItems[index];

    if (!item) {
      return;
    }

    try {
      setError("");
      setMessage("");

      /* -----------------------------------------------------
         Confirm database item deletion
      ----------------------------------------------------- */

      if (item.id) {
        const confirmed =
          window.confirm(
            `Delete "${item.name}" from the Header navigation?`
          );

        if (!confirmed) {
          return;
        }

        const response =
          await fetch(
            `${MENU_API}/${item.id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          let errorMessage =
            "Unable to delete menu item.";

          try {
            const data =
              await response.json();

            if (data?.message) {
              errorMessage =
                data.message;
            }
          } catch {
            // Ignore JSON parsing error.
          }

          throw new Error(
            errorMessage
          );
        }
      }

      /* -----------------------------------------------------
         Remove from local state
      ----------------------------------------------------- */

      setMenuItems((previous) =>
        previous
          .filter(
            (_, itemIndex) =>
              itemIndex !== index
          )
          .map(
            (menuItem, newIndex) => ({
              ...menuItem,
              displayOrder:
                newIndex,
            })
          )
      );

      setMessage(
        "Menu item removed."
      );
    } catch (err) {
      console.error(
        "Delete menu item error:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete menu item."
      );
    }
  };

  /* =========================================================
     MOVE MENU ITEM
  ========================================================= */

  const moveMenuItem = (
    index,
    direction
  ) => {
    const newIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      newIndex < 0 ||
      newIndex >= menuItems.length
    ) {
      return;
    }

    setMenuItems((previous) => {
      const updated = [
        ...previous,
      ];

      const temp =
        updated[index];

      updated[index] =
        updated[newIndex];

      updated[newIndex] =
        temp;

      return updated.map(
        (item, itemIndex) => ({
          ...item,
          displayOrder:
            itemIndex,
        })
      );
    });

    setMessage("");
    setError("");
  };

  /* =========================================================
     SAVE HEADER
  ========================================================= */

  const saveHeader = async () => {
    try {
      setSavingHeader(true);
      setError("");
      setMessage("");

      const payload = {
        enabled: Boolean(
          header.enabled
        ),

        logoImage:
          header.logoImage || "",

        logoAlt:
          header.logoAlt ||
          "Saam Infrastructure",

        ctaEnabled: Boolean(
          header.ctaEnabled
        ),

        ctaText:
          header.ctaText ||
          "Start Your Project",

        ctaLink:
          header.ctaLink ||
          "/contact",
      };

      let response;

      /* -----------------------------------------------------
         UPDATE
      ----------------------------------------------------- */

      if (headerId) {
        response = await fetch(
          `${HEADER_API}/${headerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );
      }

      /* -----------------------------------------------------
         CREATE
      ----------------------------------------------------- */

      else {
        response = await fetch(
          HEADER_API,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );
      }

      if (!response.ok) {
        let errorMessage =
          "Unable to save Header settings.";

        try {
          const data =
            await response.json();

          if (data?.message) {
            errorMessage =
              data.message;
          }
        } catch {
          // Ignore JSON parsing error.
        }

        throw new Error(
          errorMessage
        );
      }

      const saved =
        await response.json();

      setHeaderId(
        saved.id ?? null
      );

      setHeader({
        enabled:
          saved.enabled ?? true,

        logoImage:
          saved.logoImage ||
          "/saam-logo.png",

        logoAlt:
          saved.logoAlt ||
          "Saam Infrastructure",

        ctaEnabled:
          saved.ctaEnabled ??
          true,

        ctaText:
          saved.ctaText ||
          "Start Your Project",

        ctaLink:
          saved.ctaLink ||
          "/contact",
      });

      setMessage(
        "Header settings saved successfully."
      );
    } catch (err) {
      console.error(
        "Save header error:",
        err
      );

      setError(
        err?.message ||
          "Unable to save Header settings."
      );
    } finally {
      setSavingHeader(false);
    }
  };

  /* =========================================================
     SAVE NAVIGATION
  ========================================================= */

  const saveMenu = async () => {
    try {
      setSavingMenu(true);
      setError("");
      setMessage("");

      const normalizedItems =
        menuItems.map(
          (item, index) => ({
            ...item,
            displayOrder:
              index,
          })
        );

      const savedItems = [];

      /* -----------------------------------------------------
         Save each item
      ----------------------------------------------------- */

      for (const item of normalizedItems) {
        const payload = {
          name:
            item.name?.trim() ||
            "New Page",

          path:
            item.path?.trim() ||
            "/",

          enabled: Boolean(
            item.enabled
          ),

          displayOrder:
            item.displayOrder,
        };

        let response;

        /* ---------------------------------------------------
           UPDATE
        --------------------------------------------------- */

        if (item.id) {
          response =
            await fetch(
              `${MENU_API}/${item.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  payload
                ),
              }
            );
        }

        /* ---------------------------------------------------
           CREATE
        --------------------------------------------------- */

        else {
          response =
            await fetch(
              MENU_API,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify(
                  payload
                ),
              }
            );
        }

        if (!response.ok) {
          let errorMessage =
            `Unable to save menu item "${payload.name}".`;

          try {
            const data =
              await response.json();

            if (data?.message) {
              errorMessage =
                data.message;
            }
          } catch {
            // Ignore JSON parsing error.
          }

          throw new Error(
            errorMessage
          );
        }

        const saved =
          await response.json();

        savedItems.push(saved);
      }

      /* -----------------------------------------------------
         Sort saved items
      ----------------------------------------------------- */

      const sortedSavedItems =
        savedItems.sort(
          (a, b) =>
            (a.displayOrder ??
              0) -
            (b.displayOrder ??
              0)
        );

      setMenuItems(
        sortedSavedItems
      );

      setMessage(
        "Navigation menu saved successfully."
      );
    } catch (err) {
      console.error(
        "Save menu error:",
        err
      );

      setError(
        err?.message ||
          "Unable to save navigation menu."
      );
    } finally {
      setSavingMenu(false);
    }
  };

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-[#55564F]">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading Header settings...
          </span>
        </div>
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="space-y-6 pb-10">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="
          flex flex-col gap-4 rounded-2xl
          border border-[#E5E0D5]
          bg-white p-6 shadow-sm
          sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs font-bold uppercase
              tracking-[0.18em] text-[#B58A32]
            "
          >
            Website CMS
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#20211D]">
            Header
          </h1>

          <p className="mt-1 text-sm text-[#686960]">
            Manage your website Header and navigation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          {/* =================================================
              BACK TO DASHBOARD
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/dashboard")
            }
            disabled={
              savingHeader ||
              savingMenu ||
              uploadingLogo
            }
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-xl border
              border-[#D9D2C1]
              bg-white px-4 py-3
              text-sm font-semibold
              text-[#4A4B44]
              transition-all duration-200
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
          ================================================= */}

          <button
            type="button"
            onClick={loadHeader}
            disabled={
              loading ||
              savingHeader ||
              savingMenu
            }
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-xl border
              border-[#D9D2C1]
              bg-white px-4 py-3
              text-sm font-semibold
              text-[#4A4B44]
              transition-all duration-200
              hover:border-[#C9A24A]
              hover:text-[#B58A32]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          {/* =================================================
              SAVE HEADER
          ================================================= */}

          <button
            type="button"
            onClick={saveHeader}
            disabled={savingHeader}
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-xl bg-[#C9A24A]
              px-5 py-3 text-sm font-bold
              text-[#171916] shadow-sm
              transition hover:bg-[#E0C36A]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {savingHeader ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Save size={18} />
            )}

            {savingHeader
              ? "Saving..."
              : "Save Header"}
          </button>
        </div>
      </div>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      {message && (
        <div
          className="
            rounded-xl border border-green-200
            bg-green-50 px-4 py-3
            text-sm font-medium text-green-700
          "
        >
          {message}
        </div>
      )}

      {error && (
        <div
          className="
            rounded-xl border border-red-200
            bg-red-50 px-4 py-3
            text-sm font-medium text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* =====================================================
          HEADER VISIBILITY
      ===================================================== */}

      <section
        className="
          rounded-2xl border border-[#E5E0D5]
          bg-white p-6 shadow-sm
        "
      >
        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2 className="text-lg font-bold text-[#20211D]">
              Header Visibility
            </h2>

            <p className="mt-1 text-sm text-[#77786F]">
              Turn the public Header on or off.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              handleHeaderChange(
                "enabled",
                !header.enabled
              )
            }
            className={`
              inline-flex items-center gap-2
              rounded-full px-4 py-2
              text-sm font-bold transition
              ${
                header.enabled
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {header.enabled ? (
              <Eye size={17} />
            ) : (
              <EyeOff size={17} />
            )}

            {header.enabled
              ? "Enabled"
              : "Disabled"}
          </button>
        </div>
      </section>

      {/* =====================================================
          LOGO
      ===================================================== */}

      <section
        className="
          rounded-2xl border border-[#E5E0D5]
          bg-white p-6 shadow-sm
        "
      >
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#20211D]">
            Logo
          </h2>

          <p className="mt-1 text-sm text-[#77786F]">
            Change the logo displayed in the Header.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">

          {/* -------------------------------------------------
              LOGO PREVIEW
          ------------------------------------------------- */}

          <div
            className="
              flex min-h-[170px]
              items-center justify-center
              rounded-xl border border-dashed
              border-[#D8D1C2]
              bg-[#F7F4EC] p-5
            "
          >
            {header.logoImage ? (
              <img
                src={header.logoImage}
                alt={
                  header.logoAlt ||
                  "Saam Infrastructure"
                }
                className="
                  max-h-[130px]
                  max-w-[230px]
                  object-contain
                "
              />
            ) : (
              <span className="text-sm text-[#888980]">
                No logo selected
              </span>
            )}
          </div>

          {/* -------------------------------------------------
              LOGO CONTROLS
          ------------------------------------------------- */}

          <div className="space-y-5">

            {/* Upload */}

            <div>
              <label
                className="
                  mb-2 block text-sm
                  font-semibold text-[#363731]
                "
              >
                Logo Image
              </label>

              <div className="flex flex-wrap items-center gap-3">

                <label
                  className="
                    inline-flex cursor-pointer
                    items-center gap-2
                    rounded-xl border
                    border-[#D9D2C1]
                    bg-[#F7F4EC]
                    px-4 py-3
                    text-sm font-bold
                    text-[#34352F]
                    transition
                    hover:border-[#C9A24A]
                    hover:bg-[#FBF8F0]
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
                    onChange={
                      handleLogoUpload
                    }
                    disabled={
                      uploadingLogo
                    }
                  />
                </label>

                {header.logoImage && (
                  <button
                    type="button"
                    onClick={() =>
                      handleHeaderChange(
                        "logoImage",
                        ""
                      )
                    }
                    className="
                      inline-flex items-center gap-2
                      rounded-xl border border-red-200
                      px-4 py-3 text-sm font-bold
                      text-red-600
                      transition hover:bg-red-50
                    "
                  >
                    <Trash2 size={17} />

                    Remove
                  </button>
                )}
              </div>

              <p className="mt-2 text-xs text-[#888980]">
                Maximum file size: 500 MB.
              </p>
            </div>

            {/* Alt Text */}

            <div>
              <label
                className="
                  mb-2 block text-sm
                  font-semibold text-[#363731]
                "
              >
                Logo Alt Text
              </label>

              <input
                type="text"
                value={
                  header.logoAlt || ""
                }
                onChange={(event) =>
                  handleHeaderChange(
                    "logoAlt",
                    event.target.value
                  )
                }
                placeholder="Saam Infrastructure"
                className="
                  w-full rounded-xl
                  border border-[#D9D2C1]
                  bg-white px-4 py-3
                  text-sm outline-none
                  transition
                  focus:border-[#C9A24A]
                  focus:ring-2
                  focus:ring-[#C9A24A]/20
                "
              />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <section
        className="
          rounded-2xl border border-[#E5E0D5]
          bg-white p-6 shadow-sm
        "
      >
        <div
          className="
            mb-5 flex flex-col gap-4
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2 className="text-lg font-bold text-[#20211D]">
              Navigation Menu
            </h2>

            <p className="mt-1 text-sm text-[#77786F]">
              Manage menu labels, links, visibility and order.
            </p>
          </div>

          <button
            type="button"
            onClick={addMenuItem}
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-xl border
              border-[#C9A24A]
              px-4 py-3
              text-sm font-bold
              text-[#8D6B22]
              transition
              hover:bg-[#FBF8F0]
            "
          >
            <Plus size={17} />

            Add Menu Item
          </button>
        </div>

        <div className="space-y-3">

          {menuItems.length === 0 ? (
            <div
              className="
                rounded-xl border border-dashed
                border-[#D8D1C2]
                bg-[#F7F4EC]
                p-8 text-center
                text-sm text-[#77786F]
              "
            >
              No navigation items added.
            </div>
          ) : (
            menuItems.map(
              (item, index) => (
                <div
                  key={
                    item.id ||
                    `new-menu-${index}`
                  }
                  className="
                    rounded-xl border
                    border-[#E5E0D5]
                    bg-[#FBFAF7] p-4
                  "
                >
                  <div
                    className="
                      flex flex-col gap-4
                      xl:flex-row
                      xl:items-center
                    "
                  >

                    {/* ORDER */}

                    <div
                      className="
                        flex items-center gap-3
                        xl:w-[145px]
                      "
                    >
                      <GripVertical
                        size={19}
                        className="text-[#A09D94]"
                      />

                      <span
                        className="
                          flex h-8 w-8
                          items-center justify-center
                          rounded-full
                          bg-[#EEE9DD]
                          text-xs font-bold
                          text-[#6C6D65]
                        "
                      >
                        {index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          moveMenuItem(
                            index,
                            "up"
                          )
                        }
                        disabled={
                          index === 0
                        }
                        className="
                          rounded-lg p-1.5
                          text-[#55564F]
                          transition
                          hover:bg-[#EEE9DD]
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                        title="Move up"
                      >
                        <ArrowUp
                          size={16}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveMenuItem(
                            index,
                            "down"
                          )
                        }
                        disabled={
                          index ===
                          menuItems.length -
                            1
                        }
                        className="
                          rounded-lg p-1.5
                          text-[#55564F]
                          transition
                          hover:bg-[#EEE9DD]
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                        title="Move down"
                      >
                        <ArrowDown
                          size={16}
                        />
                      </button>
                    </div>

                    {/* MENU NAME */}

                    <div className="flex-1">
                      <label
                        className="
                          mb-1.5 block
                          text-xs font-bold
                          uppercase tracking-wide
                          text-[#77786F]
                        "
                      >
                        Menu Name
                      </label>

                      <input
                        type="text"
                        value={
                          item.name || ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateMenuItem(
                            index,
                            "name",
                            event.target
                              .value
                          )
                        }
                        className="
                          w-full rounded-lg
                          border border-[#D9D2C1]
                          bg-white px-3 py-2.5
                          text-sm outline-none
                          focus:border-[#C9A24A]
                        "
                      />
                    </div>

                    {/* PATH */}

                    <div className="flex-1">
                      <label
                        className="
                          mb-1.5 block
                          text-xs font-bold
                          uppercase tracking-wide
                          text-[#77786F]
                        "
                      >
                        Link
                      </label>

                      <input
                        type="text"
                        value={
                          item.path || ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateMenuItem(
                            index,
                            "path",
                            event.target
                              .value
                          )
                        }
                        className="
                          w-full rounded-lg
                          border border-[#D9D2C1]
                          bg-white px-3 py-2.5
                          text-sm outline-none
                          focus:border-[#C9A24A]
                        "
                      />
                    </div>

                    {/* VISIBILITY */}

                    <button
                      type="button"
                      onClick={() =>
                        updateMenuItem(
                          index,
                          "enabled",
                          !item.enabled
                        )
                      }
                      className={`
                        inline-flex h-10
                        items-center justify-center
                        gap-2 rounded-lg px-3
                        text-sm font-bold
                        transition
                        xl:w-[115px]
                        ${
                          item.enabled
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {item.enabled ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff
                          size={16}
                        />
                      )}

                      {item.enabled
                        ? "Visible"
                        : "Hidden"}
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        deleteMenuItem(
                          index
                        )
                      }
                      className="
                        inline-flex h-10
                        items-center justify-center
                        rounded-lg
                        border border-red-200
                        px-3 text-red-600
                        transition
                        hover:bg-red-50
                      "
                      title="Delete"
                    >
                      <Trash2
                        size={17}
                      />
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>

        {/* SAVE NAVIGATION */}

        <div
          className="
            mt-5 flex justify-end
            border-t border-[#E5E0D5]
            pt-5
          "
        >
          <button
            type="button"
            onClick={saveMenu}
            disabled={savingMenu}
            className="
              inline-flex items-center
              gap-2 rounded-xl
              bg-[#20211D]
              px-5 py-3
              text-sm font-bold
              text-white
              transition
              hover:bg-[#30312C]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {savingMenu ? (
              <Loader2
                size={17}
                className="animate-spin"
              />
            ) : (
              <Save size={17} />
            )}

            {savingMenu
              ? "Saving..."
              : "Save Navigation"}
          </button>
        </div>
      </section>

      {/* =====================================================
          HEADER CTA
      ===================================================== */}

      <section
        className="
          rounded-2xl border
          border-[#E5E0D5]
          bg-white p-6 shadow-sm
        "
      >
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#20211D]">
            Header CTA
          </h2>

          <p className="mt-1 text-sm text-[#77786F]">
            Manage the “Start Your Project” button.
          </p>
        </div>

        <div className="space-y-5">

          {/* CTA VISIBILITY */}

          <div
            className="
              flex items-center
              justify-between
              rounded-xl
              bg-[#F7F4EC] p-4
            "
          >
            <div>
              <p className="text-sm font-bold text-[#363731]">
                Show CTA Button
              </p>

              <p className="mt-1 text-xs text-[#77786F]">
                Display the project CTA on desktop and mobile.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleHeaderChange(
                  "ctaEnabled",
                  !header.ctaEnabled
                )
              }
              className={`
                inline-flex items-center
                gap-2 rounded-full
                px-4 py-2
                text-sm font-bold
                ${
                  header.ctaEnabled
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }
              `}
            >
              {header.ctaEnabled ? (
                <Eye size={16} />
              ) : (
                <EyeOff size={16} />
              )}

              {header.ctaEnabled
                ? "Enabled"
                : "Disabled"}
            </button>
          </div>

          {/* CTA FIELDS */}

          {header.ctaEnabled && (
            <div className="grid gap-5 md:grid-cols-2">

              {/* Button text */}

              <div>
                <label
                  className="
                    mb-2 block text-sm
                    font-semibold text-[#363731]
                  "
                >
                  Button Text
                </label>

                <input
                  type="text"
                  value={
                    header.ctaText ||
                    ""
                  }
                  onChange={(event) =>
                    handleHeaderChange(
                      "ctaText",
                      event.target.value
                    )
                  }
                  placeholder="Start Your Project"
                  className="
                    w-full rounded-xl
                    border border-[#D9D2C1]
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[#C9A24A]
                    focus:ring-2
                    focus:ring-[#C9A24A]/20
                  "
                />
              </div>

              {/* Button link */}

              <div>
                <label
                  className="
                    mb-2 block text-sm
                    font-semibold text-[#363731]
                  "
                >
                  Button Link
                </label>

                <input
                  type="text"
                  value={
                    header.ctaLink ||
                    ""
                  }
                  onChange={(event) =>
                    handleHeaderChange(
                      "ctaLink",
                      event.target.value
                    )
                  }
                  placeholder="/contact"
                  className="
                    w-full rounded-xl
                    border border-[#D9D2C1]
                    px-4 py-3
                    text-sm outline-none
                    focus:border-[#C9A24A]
                    focus:ring-2
                    focus:ring-[#C9A24A]/20
                  "
                />
              </div>

            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM SAVE + RESET
      ===================================================== */}

      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:justify-end
        "
      >

        {/* Save Header */}

        <button
          type="button"
          onClick={saveHeader}
          disabled={savingHeader}
          className="
            inline-flex items-center
            justify-center gap-2
            rounded-xl bg-[#C9A24A]
            px-6 py-3.5
            text-sm font-bold
            text-[#171916]
            shadow-sm transition
            hover:bg-[#E0C36A]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {savingHeader ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {savingHeader
            ? "Saving..."
            : "Save Header"}
        </button>

        {/* Reset Defaults */}

        <button
          type="button"
          onClick={handleReset}
          disabled={
            savingHeader ||
            savingMenu ||
            uploadingLogo
          }
          className="
            inline-flex items-center
            justify-center gap-2
            rounded-xl border
            border-[#D9D2C1]
            bg-white
            px-6 py-3.5
            text-sm font-semibold
            text-[#4A4B44]
            transition-all duration-200
            hover:border-[#C9A24A]
            hover:text-[#B58A32]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw size={17} />

          Reset Defaults
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;