import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const GALLERY_API =
  `${API_BASE_URL}/api/gallery`;

const PAGE_CONTENT_API =
  `${GALLERY_API}/page-content`;

const IMAGE_UPLOAD_API =
  `${API_BASE_URL}/api/images/upload`;

const MAX_IMAGE_SIZE =
  500 * 1024 * 1024;

/* =========================================================
   IMAGE DEFAULTS
========================================================= */

const DEFAULT_IMAGES = [
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=max&w=2400&q=95",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85",
    fullImage:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=max&w=2400&q=95",
  },
];

/* =========================================================
   DEFAULT GALLERY PAGE CONTENT
========================================================= */

const DEFAULT_PAGE_CONTENT = {
  heroEnabled: true,
  heroBrand: "Saam Infrastructure",
  heroTitleLine1: "Project",
  heroTitleLine2: "Gallery",
  heroShowcaseLabel: "Project Showcase",
  heroShowcaseTitle: "A closer look at",
  heroShowcaseHighlight: "our projects.",
  heroDescription:
    "Explore photographs from our construction, infrastructure and development work. Every project reflects our commitment to quality, precision and dependable execution.",

  projectsEnabled: true,
  projectsLabel: "Selected Projects",
  projectsTitle: "A collection of",
  projectsTitleHighlight: "our work.",
  projectsDescription:
    "Explore selected photographs representing our construction, engineering and infrastructure projects.",
  cardBrandText:
    "Saam Infrastructure",

  ctaEnabled: true,
  ctaLabel: "Start Your Project",
  ctaTitle:
    "Let's build something",
  ctaTitleHighlight:
    "great together.",
  ctaDescription:
    "Have a construction or infrastructure project in mind? Tell us about your requirements and let's discuss the possibilities.",
  ctaButtonEyebrow:
    "Let's talk",
  ctaButtonText:
    "Discuss Your Project",
  ctaButtonLink:
    "/contact",

  lightboxBrandText:
    "Saam Infrastructure",
  lightboxNavigationText:
    "← → Navigate",
  lightboxZoomText:
    "+ / − Zoom",
  lightboxCloseText:
    "ESC Close",
  lightboxMobileHelp:
    "Double tap to zoom • Drag to move • Use + / −",
};

function createDefaultPageContent() {
  return {
    ...DEFAULT_PAGE_CONTENT,
  };
}

/* =========================================================
   DEFAULT GALLERY ITEMS
========================================================= */

const DEFAULT_GALLERY = [
  {
    title: "Commercial Construction",
    category: "Commercial",
    description:
      "A modern commercial construction project focused on strong structural execution, quality materials and efficient project delivery.",
  },
  {
    title: "Residential Development",
    category: "Residential",
    description:
      "A residential development designed with a balance of functionality, durability and modern architectural planning.",
  },
  {
    title: "Infrastructure Work",
    category: "Infrastructure",
    description:
      "Infrastructure work delivered with careful planning, engineering precision and a strong focus on dependable execution.",
  },
  {
    title: "Urban Development",
    category: "Infrastructure",
    description:
      "An urban development project combining practical infrastructure planning with modern construction standards.",
  },
  {
    title: "Industrial Facility",
    category: "Industrial",
    description:
      "An industrial facility developed with emphasis on structural strength, operational requirements and long-term reliability.",
  },
  {
    title: "Construction Planning",
    category: "Planning",
    description:
      "Detailed construction planning supporting accurate execution, coordinated engineering and efficient project management.",
  },
  {
    title: "Project Development",
    category: "Development",
    description:
      "A project development process focused on coordinated planning, construction quality and successful project completion.",
  },
  {
    title: "Engineering Work",
    category: "Engineering",
    description:
      "Engineering work carried out with attention to technical accuracy, structural requirements and dependable construction practices.",
  },
].map((item, index) => ({
  id: `default-${index}`,
  ...item,
  image:
    DEFAULT_IMAGES[index].image,
  fullImage:
    DEFAULT_IMAGES[index].fullImage,
  imageAlt:
    `${item.title} project`,
  enabled: true,
  displayOrder: index,
  _template: true,
}));

/* =========================================================
   HELPERS
========================================================= */

function cloneDefaultGallery() {
  return DEFAULT_GALLERY.map(
    (item) => ({
      ...item,
    })
  );
}

function numericId(value) {
  const id = Number(value);

  return Number.isFinite(id) &&
    id > 0
    ? id
    : null;
}

function imageUrl(value) {
  if (!value) {
    return "";
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  if (
    value.startsWith(
      "/images/"
    )
  ) {
    return `${API_BASE_URL}${value}`;
  }

  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  return value;
}

function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return [...items]
    .filter(Boolean)
    .map((item, index) => ({
      ...item,
      id:
        item.id ??
        `new-${Date.now()}-${index}`,
      title:
        item.title ?? "",
      category:
        item.category ?? "",
      description:
        item.description ?? "",
      image:
        item.image ?? "",
      fullImage:
        item.fullImage ??
        item.image ??
        "",
      imageAlt:
        item.imageAlt ??
        item.title ??
        "",
      enabled:
        item.enabled !== false,
      displayOrder:
        Number.isFinite(
          Number(
            item.displayOrder
          )
        )
          ? Number(
              item.displayOrder
            )
          : index,
      _template: false,
    }))
    .sort(
      (a, b) => {
        const orderDiff =
          (Number(
            a.displayOrder
          ) || 0) -
          (Number(
            b.displayOrder
          ) || 0);

        if (orderDiff !== 0) {
          return orderDiff;
        }

        const aId =
          numericId(a.id);
        const bId =
          numericId(b.id);

        if (
          aId !== null &&
          bId !== null
        ) {
          return aId - bId;
        }

        return 0;
      }
    )
    .map(
      (item, index) => ({
        ...item,
        displayOrder: index,
      })
    );
}

function isUnresizableFormat(file) {
  if (!file) {
    return false;
  }

  return (
    /image\/svg\+xml/i.test(
      file.type
    ) ||
    /image\/gif/i.test(
      file.type
    ) ||
    /\.svg$/i.test(
      file.name || ""
    ) ||
    /\.gif$/i.test(
      file.name || ""
    )
  );
}

function makeFileFromCanvas(
  canvas,
  originalName,
  mimeType = "image/jpeg"
) {
  return new Promise(
    (resolve, reject) => {
      const extension =
        mimeType ===
        "image/png"
          ? "png"
          : mimeType ===
              "image/webp"
            ? "webp"
            : "jpg";

      const safeBase =
        String(
          originalName ||
            "gallery-image"
        )
          .replace(
            /\.[^.]+$/,
            ""
          )
          .replace(
            /[^a-z0-9-_]+/gi,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            "") ||
        "gallery-image";

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Unable to process image."
              )
            );
            return;
          }

          resolve(
            new File(
              [blob],
              `${safeBase}-${Date.now()}.${extension}`,
              {
                type: mimeType,
                lastModified:
                  Date.now(),
              }
            )
          );
        },
        mimeType,
        0.92
      );
    }
  );
}

async function resizeImageFile(
  file,
  width,
  height,
  keepAspectRatio
) {
  if (!file) {
    throw new Error(
      "No image file selected."
    );
  }

  if (isUnresizableFormat(file)) {
    return file;
  }

  const objectUrl =
    URL.createObjectURL(
      file
    );

  try {
    const image =
      new Image();

    await new Promise(
      (resolve, reject) => {
        image.onload =
          resolve;

        image.onerror = () =>
          reject(
            new Error(
              "Unable to read image."
            )
          );

        image.src = objectUrl;
      }
    );

    let targetWidth =
      Math.max(
        1,
        Math.round(width)
      );

    let targetHeight =
      Math.max(
        1,
        Math.round(height)
      );

    if (
      keepAspectRatio
    ) {
      const sourceRatio =
        image.width /
        image.height;

      if (
        sourceRatio >
        targetWidth /
          targetHeight
      ) {
        targetHeight =
          Math.round(
            targetWidth /
              sourceRatio
          );
      } else {
        targetWidth =
          Math.round(
            targetHeight *
              sourceRatio
          );
      }
    }

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      targetWidth;

    canvas.height =
      targetHeight;

    const context =
      canvas.getContext(
        "2d"
      );

    if (!context) {
      throw new Error(
        "Canvas is not supported by this browser."
      );
    }

    context.imageSmoothingEnabled =
      true;

    context.imageSmoothingQuality =
      "high";

    context.drawImage(
      image,
      0,
      0,
      targetWidth,
      targetHeight
    );

    let mimeType =
      file.type;

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(
        mimeType
      )
    ) {
      mimeType =
        "image/jpeg";
    }

    return makeFileFromCanvas(
      canvas,
      file.name,
      mimeType
    );
  } finally {
    URL.revokeObjectURL(
      objectUrl
    );
  }
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  textarea = false,
  rows = 5,
}) {
  const baseClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20";

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>

      {textarea ? (
        <textarea
          value={value ?? ""}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={
            placeholder
          }
          rows={rows}
          className={`${baseClass} resize-y`}
        />
      ) : (
        <input
          value={value ?? ""}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={
            placeholder
          }
          className={baseClass}
        />
      )}
    </label>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  enabled,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(!enabled)
      }
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition ${
        enabled
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {enabled ? (
        <Eye size={15} />
      ) : (
        <EyeOff size={15} />
      )}

      {enabled
        ? "Enabled"
        : "Disabled"}
    </button>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusMessage({
  type,
  children,
}) {
  if (!children) {
    return null;
  }

  const classes =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : type === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${classes}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   COLLAPSIBLE SECTION
========================================================= */

function CmsSection({
  number,
  title,
  description,
  open,
  onToggle,
  children,
  className = "",
}) {
  return (
    <section
      className={`mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 border-b border-slate-200 bg-white p-5 text-left sm:p-6"
      >
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B28A20]">
            Section {number}
          </p>

          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            {description}
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600">
          <ChevronDown
            size={18}
            className={`transition-transform ${
              open
                ? "rotate-180"
                : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <div className="p-4 sm:p-6">
          {children}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   IMAGE EDITOR
========================================================= */

function ImageEditor({
  label,
  value,
  altValue,
  onImageChange,
  onAltChange,
}) {
  const inputRef =
    useRef(null);

  const [
    sizeMode,
    setSizeMode,
  ] = useState("original");

  const [
    customWidth,
    setCustomWidth,
  ] = useState("1920");

  const [
    customHeight,
    setCustomHeight,
  ] = useState("1080");

  const [
    keepAspectRatio,
    setKeepAspectRatio,
  ] = useState(true);

  const [
    processing,
    setProcessing,
  ] = useState(false);

  const [
    localError,
    setLocalError,
  ] = useState("");

  const uploadFile = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    setLocalError("");

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setLocalError(
        "Please select a valid image file."
      );
      return;
    }

    if (
      file.size >
      MAX_IMAGE_SIZE
    ) {
      setLocalError(
        "Image size must be 500 MB or less."
      );
      return;
    }

    setProcessing(true);

    try {
      let finalFile = file;

      if (
        sizeMode !==
          "original" &&
        !isUnresizableFormat(
          file
        )
      ) {
        let width = 1920;
        let height = 1080;

        if (
          sizeMode === "small"
        ) {
          width = 1280;
          height = 720;
        }

        if (
          sizeMode ===
          "medium"
        ) {
          width = 1920;
          height = 1080;
        }

        if (
          sizeMode === "large"
        ) {
          width = 2560;
          height = 1440;
        }

        if (
          sizeMode ===
          "custom"
        ) {
          width =
            Number(
              customWidth
            );

          height =
            Number(
              customHeight
            );

          if (
            !Number.isFinite(
              width
            ) ||
            !Number.isFinite(
              height
            ) ||
            width <= 0 ||
            height <= 0
          ) {
            throw new Error(
              "Custom width and height must both be greater than 0."
            );
          }
        }

        finalFile =
          await resizeImageFile(
            file,
            width,
            height,
            keepAspectRatio
          );
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        finalFile
      );

      formData.append(
        "folder",
        "gallery"
      );

      const response =
        await fetch(
          IMAGE_UPLOAD_API,
          {
            method: "POST",
            body: formData,
          }
        );

      if (!response.ok) {
        const message =
          await response.text();

        throw new Error(
          message ||
            `Image upload failed with status ${response.status}.`
        );
      }

      const result =
        await response.json();

      const uploadedUrl =
        result?.url ||
        result?.imageUrl ||
        result?.path;

      if (
        !uploadedUrl
      ) {
        throw new Error(
          "Image upload response did not contain a URL."
        );
      }

      onImageChange(
        uploadedUrl
      );
    } catch (error) {
      console.error(
        "Gallery image upload failed:",
        error
      );

      setLocalError(
        error?.message ||
          "Unable to upload image."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="w-full xl:w-[250px] xl:shrink-0">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-[4/3] bg-slate-100">
              {value ? (
                <img
                  src={imageUrl(value)}
                  alt={
                    altValue ||
                    label
                  }
                  className="h-full w-full object-cover"
                  onError={(
                    event
                  ) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <ImagePlus
                    size={34}
                  />
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 p-3">
              <button
                type="button"
                onClick={() =>
                  inputRef.current?.click()
                }
                disabled={
                  processing
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {processing ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <ImagePlus
                    size={17}
                  />
                )}

                {processing
                  ? "Uploading..."
                  : "Upload Image"}
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={
                  uploadFile
                }
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">
            {label}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Upload a card or full-resolution
            image. SVG and GIF files are kept
            unchanged when resizing is selected.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              [
                "original",
                "Original",
                "Keep original size",
              ],
              [
                "small",
                "Small",
                "1280 × 720",
              ],
              [
                "medium",
                "Medium",
                "1920 × 1080",
              ],
              [
                "large",
                "Large",
                "2560 × 1440",
              ],
            ].map(
              (option) => (
                <button
                  key={
                    option[0]
                  }
                  type="button"
                  onClick={() =>
                    setSizeMode(
                      option[0]
                    )
                  }
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    sizeMode ===
                    option[0]
                      ? "border-[#C9A03B] bg-[#FFF9E9]"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-xs font-bold text-slate-900">
                    {option[1]}
                  </span>

                  <span className="mt-1 block text-[11px] text-slate-500">
                    {option[2]}
                  </span>
                </button>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setSizeMode(
                "custom"
              )
            }
            className={`mt-2 w-full rounded-xl border px-3 py-3 text-left transition ${
              sizeMode ===
              "custom"
                ? "border-[#C9A03B] bg-[#FFF9E9]"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <span className="block text-xs font-bold text-slate-900">
              Custom
            </span>

            <span className="mt-1 block text-[11px] text-slate-500">
              Choose your own width and height
            </span>
          </button>

          {sizeMode ===
            "custom" && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="Width"
                  value={
                    customWidth
                  }
                  onChange={(
                    value
                  ) =>
                    setCustomWidth(
                      value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                <Field
                  label="Height"
                  value={
                    customHeight
                  }
                  onChange={(
                    value
                  ) =>
                    setCustomHeight(
                      value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />
              </div>

              <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                <input
                  type="checkbox"
                  checked={
                    keepAspectRatio
                  }
                  onChange={(
                    event
                  ) =>
                    setKeepAspectRatio(
                      event.target
                        .checked
                    )
                  }
                  className="h-4 w-4 accent-[#C9A03B]"
                />

                <span className="text-xs font-bold text-slate-700">
                  Keep aspect ratio
                </span>
              </label>
            </div>
          )}

          <div className="mt-4">
            <Field
              label="Image Alt Text"
              value={
                altValue
              }
              onChange={
                onAltChange
              }
              placeholder="Describe this image for accessibility"
            />
          </div>

          {localError && (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs font-medium text-red-700">
              {localError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GALLERY ITEM EDITOR
========================================================= */

function GalleryItemEditor({
  item,
  index,
  total,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
}) {
  const updateField = (
    field,
    value
  ) => {
    onChange({
      ...item,
      [field]: value,
      _template: false,
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-extrabold text-white">
            {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-slate-900">
              {item.title ||
                "Untitled Gallery Item"}
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Display order{" "}
              {index + 1}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Toggle
            enabled={
              item.enabled !==
              false
            }
            onChange={(value) =>
              updateField(
                "enabled",
                value
              )
            }
          />

          <button
            type="button"
            disabled={
              index === 0
            }
            onClick={
              onMoveUp
            }
            title="Move up"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowUp
              size={15}
            />
          </button>

          <button
            type="button"
            disabled={
              index ===
              total - 1
            }
            onClick={
              onMoveDown
            }
            title="Move down"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowDown
              size={15}
            />
          </button>

          <button
            type="button"
            onClick={
              onDelete
            }
            title="Delete Gallery item"
            className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
          >
            <Trash2
              size={15}
            />
          </button>
        </div>
      </div>

      <div className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Field
            label="Title"
            value={
              item.title
            }
            onChange={(
              value
            ) =>
              updateField(
                "title",
                value
              )
            }
            placeholder="Commercial Construction"
          />

          <Field
            label="Category"
            value={
              item.category
            }
            onChange={(
              value
            ) =>
              updateField(
                "category",
                value
              )
            }
            placeholder="Commercial"
          />
        </div>

        <Field
          label="Description"
          value={
            item.description
          }
          onChange={(
            value
          ) =>
            updateField(
              "description",
              value
            )
          }
          placeholder="Describe this Gallery item..."
          textarea
          rows={5}
        />

        <Field
          label="Image Alt Text"
          value={
            item.imageAlt
          }
          onChange={(
            value
          ) =>
            updateField(
              "imageAlt",
              value
            )
          }
          placeholder="Commercial construction project"
        />

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            Gallery Card Image
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            This image appears on the public Gallery card.
          </p>

          <div className="mt-4">
            <ImageEditor
              label="Gallery Card Image"
              value={
                item.image
              }
              altValue={
                item.imageAlt
              }
              onImageChange={(
                value
              ) =>
                updateField(
                  "image",
                  value
                )
              }
              onAltChange={(
                value
              ) =>
                updateField(
                  "imageAlt",
                  value
                )
              }
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-slate-900">
            Full Image / Lightbox Image
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            This image appears when the Gallery card is opened.
          </p>

          <div className="mt-4">
            <ImageEditor
              label="Full Resolution / Lightbox Image"
              value={
                item.fullImage
              }
              altValue={
                item.imageAlt
              }
              onImageChange={(
                value
              ) =>
                updateField(
                  "fullImage",
                  value
                )
              }
              onAltChange={(
                value
              ) =>
                updateField(
                  "imageAlt",
                  value
                )
              }
            />
          </div>

          {!item.fullImage &&
            item.image && (
              <button
                type="button"
                onClick={() =>
                  updateField(
                    "fullImage",
                    item.image
                  )
                }
                className="mt-3 w-full rounded-xl border border-[#C9A03B]/40 bg-[#FFF9E9] px-4 py-3 text-xs font-bold text-slate-800 transition hover:bg-[#FFF4D6]"
              >
                Use Card Image as Full Image
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function AdminGallery() {
  const navigate =
    useNavigate();

  const [
    pageContent,
    setPageContent,
  ] = useState(
    createDefaultPageContent
  );

  const [
    pageContentId,
    setPageContentId,
  ] = useState(null);

  const [
    items,
    setItems,
  ] = useState([]);

  const [
    backendIds,
    setBackendIds,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loadError,
    setLoadError,
  ] = useState("");

  const [
    saveError,
    setSaveError,
  ] = useState("");

  const [
    openSections,
    setOpenSections,
  ] = useState({
    hero: true,
    showcase: true,
    items: true,
    cta: true,
    lightbox: true,
  });

  const toggleSection = (
    section
  ) => {
    setOpenSections(
      (previous) => ({
        ...previous,
        [section]:
          !previous[
            section
          ],
      })
    );
  };

  const updatePageField = (
    field,
    value
  ) => {
    setPageContent(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

    setSaved(false);
    setMessage("");
    setSaveError("");
  };

  /* =========================================================
     LOAD ALL GALLERY CMS DATA
  ========================================================= */

  const loadGallery =
    useCallback(
      async (
        showRefreshState = false
      ) => {
        if (
          showRefreshState
        ) {
          setRefreshing(
            true
          );
        } else {
          setLoading(true);
        }

        setLoadError("");
        setSaveError("");
        setMessage("");

        try {
          const [
            contentResponse,
            itemsResponse,
          ] =
            await Promise.all([
              fetch(
                PAGE_CONTENT_API
              ),
              fetch(
                GALLERY_API
              ),
            ]);

          if (
            !itemsResponse.ok
          ) {
            throw new Error(
              `Unable to load Gallery items (${itemsResponse.status}).`
            );
          }

          let content =
            null;

          if (
            contentResponse.ok &&
            contentResponse.status !==
              204
          ) {
            content =
              await contentResponse.json();
          } else if (
            ![
              200,
              204,
            ].includes(
              contentResponse.status
            )
          ) {
            throw new Error(
              `Unable to load Gallery page content (${contentResponse.status}).`
            );
          }

          const data =
            await itemsResponse.json();

          setPageContent({
            ...createDefaultPageContent(),
            ...(content ||
              {}),
          });

          setPageContentId(
            numericId(
              content?.id
            )
          );

          const normalized =
            normalizeItems(
              data
            );

          if (
            normalized.length >
            0
          ) {
            setItems(
              normalized
            );

            setBackendIds(
              normalized
                .map((item) =>
                  numericId(
                    item.id
                  )
                )
                .filter(
                  (id) =>
                    id !== null
                )
            );
          } else {
            setItems(
              cloneDefaultGallery()
            );

            setBackendIds(
              []
            );
          }

          setSaved(false);

          setMessage(
            content ||
              normalized.length >
                0
              ? "Gallery page content and Gallery items loaded successfully."
              : "Gallery database is empty. Default Gallery page content and Gallery items are ready to edit."
          );
        } catch (error) {
          console.error(
            "Failed to load Gallery CMS:",
            error
          );

          setPageContent(
            createDefaultPageContent()
          );

          setItems(
            cloneDefaultGallery()
          );

          setBackendIds(
            []
          );

          setLoadError(
            error?.message ||
              "Unable to load Gallery CMS."
          );
        } finally {
          setLoading(
            false
          );
          setRefreshing(
            false
          );
        }
      },
      []
    );

  useEffect(() => {
    const timer =
      window.setTimeout(
        () => {
          loadGallery(
            false
          );
        },
        0
      );

    return () =>
      window.clearTimeout(
        timer
      );
  }, [
    loadGallery,
  ]);

  /* =========================================================
     ITEM UPDATE
  ========================================================= */

  const updateItem = (
    index,
    nextItem
  ) => {
    setItems(
      (previous) =>
        previous.map(
          (
            item,
            itemIndex
          ) =>
            itemIndex ===
            index
              ? {
                  ...nextItem,
                  displayOrder:
                    itemIndex,
                }
              : item
        )
    );

    setSaved(false);
    setMessage("");
    setSaveError("");
  };

  /* =========================================================
     ADD ITEM
  ========================================================= */

  const addItem = () => {
    setItems(
      (previous) => [
        ...previous,
        {
          id: `new-${Date.now()}`,
          title: "",
          category: "",
          description: "",
          image: "",
          fullImage: "",
          imageAlt: "",
          enabled: true,
          displayOrder:
            previous.length,
          _template: false,
        },
      ]
    );

    setSaved(false);

    setMessage(
      "New Gallery item added."
    );

    setSaveError("");

    setOpenSections(
      (previous) => ({
        ...previous,
        items: true,
      })
    );
  };

  /* =========================================================
     DELETE ITEM
  ========================================================= */

  const deleteItem = (
    index
  ) => {
    const item =
      items[index];

    if (
      !window.confirm(
        `Are you sure you want to delete "${
          item?.title ||
          "this Gallery item"
        }"?`
      )
    ) {
      return;
    }

    setItems(
      (previous) =>
        previous
          .filter(
            (
              _,
              itemIndex
            ) =>
              itemIndex !==
              index
          )
          .map(
            (
              entry,
              itemIndex
            ) => ({
              ...entry,
              displayOrder:
                itemIndex,
            })
          )
    );

    setSaved(false);

    setMessage(
      "Gallery item removed. Click Save All to apply it."
    );

    setSaveError("");
  };

  /* =========================================================
     MOVE ITEM
  ========================================================= */

  const moveItem = (
    index,
    direction
  ) => {
    setItems(
      (previous) => {
        const targetIndex =
          direction ===
          "up"
            ? index - 1
            : index + 1;

        if (
          targetIndex <
            0 ||
          targetIndex >=
            previous.length
        ) {
          return previous;
        }

        const reordered =
          [
            ...previous,
          ];

        [
          reordered[index],
          reordered[
            targetIndex
          ],
        ] = [
          reordered[
            targetIndex
          ],
          reordered[index],
        ];

        return reordered.map(
          (
            item,
            itemIndex
          ) => ({
            ...item,
            displayOrder:
              itemIndex,
          })
        );
      }
    );

    setSaved(false);

    setMessage(
      "Gallery order changed. Click Save All to apply the new order."
    );

    setSaveError("");
  };

  /* =========================================================
     VALIDATE
  ========================================================= */

  const validateGallery =
    () => {
      for (
        let index = 0;
        index < items.length;
        index += 1
      ) {
        const item =
          items[index];

        if (
          !String(
            item.title ||
              ""
          ).trim()
        ) {
          return `Please enter a title for Gallery item ${index + 1}.`;
        }

        if (
          !String(
            item.category ||
              ""
          ).trim()
        ) {
          return `Please enter a category for "${item.title}".`;
        }

        if (
          !String(
            item.image ||
              item.fullImage ||
              ""
          ).trim()
        ) {
          return `Please upload a Gallery image for "${item.title}".`;
        }
      }

      return "";
    };

  /* =========================================================
     SAVE ALL
  ========================================================= */

  const saveAll =
    async () => {
      if (saving) {
        return;
      }

      const validationError =
        validateGallery();

      if (
        validationError
      ) {
        setSaveError(
          validationError
        );
        setSaved(false);
        return;
      }

      setSaving(true);
      setSaved(false);
      setMessage("");
      setSaveError("");

      try {
        /* =========================
           SAVE PAGE CONTENT
        ========================= */

        const contentPayload = {
          ...pageContent,
          heroEnabled:
            pageContent.heroEnabled !==
            false,
          projectsEnabled:
            pageContent.projectsEnabled !==
            false,
          ctaEnabled:
            pageContent.ctaEnabled !==
            false,
        };

        let contentResponse;

        if (
          pageContentId !==
          null
        ) {
          contentResponse =
            await fetch(
              `${PAGE_CONTENT_API}/${pageContentId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body:
                  JSON.stringify(
                    contentPayload
                  ),
              }
            );
        } else {
          contentResponse =
            await fetch(
              PAGE_CONTENT_API,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body:
                  JSON.stringify(
                    contentPayload
                  ),
              }
            );
        }

        if (
          !contentResponse.ok
        ) {
          throw new Error(
            (await contentResponse.text()) ||
              `Unable to save Gallery page content (${contentResponse.status}).`
          );
        }

        const savedContent =
          await contentResponse.json();

        setPageContent(
          {
            ...createDefaultPageContent(),
            ...savedContent,
          }
        );

        setPageContentId(
          numericId(
            savedContent.id
          )
        );

        /* =========================
           SAVE GALLERY ITEMS
        ========================= */

        const normalized =
          normalizeItems(
            items
          );

        const savedItems =
          [];

        for (
          const item of normalized
        ) {
          const cardImage =
            String(
              item.image ||
                ""
            ).trim();

          const fullImage =
            String(
              item.fullImage ||
                ""
            ).trim();

          const resolvedCardImage =
            cardImage ||
            fullImage;

          const resolvedFullImage =
            fullImage ||
            cardImage;

          const payload = {
            title:
              String(
                item.title ||
                  ""
              ).trim(),
            category:
              String(
                item.category ||
                  ""
              ).trim(),
            description:
              item.description ||
              "",
            image:
              resolvedCardImage,
            fullImage:
              resolvedFullImage,
            imageAlt:
              String(
                item.imageAlt ||
                  ""
              ).trim() ||
              String(
                item.title ||
                  "Gallery project image"
              ).trim(),
            enabled:
              item.enabled !==
              false,
            displayOrder:
              Number(
                item.displayOrder
              ) || 0,
          };

          const id =
            numericId(
              item.id
            );

          let response;

          if (
            id !== null &&
            backendIds.includes(
              id
            )
          ) {
            response =
              await fetch(
                `${GALLERY_API}/${id}`,
                {
                  method:
                    "PUT",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body:
                    JSON.stringify(
                      payload
                    ),
                }
              );
          } else {
            response =
              await fetch(
                GALLERY_API,
                {
                  method:
                    "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body:
                    JSON.stringify(
                      payload
                    ),
                }
              );
          }

          if (
            !response.ok
          ) {
            throw new Error(
              (await response.text()) ||
                `Unable to save Gallery item "${item.title}".`
            );
          }

          savedItems.push(
            await response.json()
          );
        }

        /* =========================
           DELETE REMOVED BACKEND ITEMS
        ========================= */

        const savedIds =
          savedItems
            .map((item) =>
              numericId(
                item.id
              )
            )
            .filter(
              (id) =>
                id !== null
            );

        const removedIds =
          backendIds.filter(
            (id) =>
              !savedIds.includes(
                id
              )
          );

        for (
          const id of removedIds
        ) {
          const response =
            await fetch(
              `${GALLERY_API}/${id}`,
              {
                method:
                  "DELETE",
              }
            );

          if (
            !response.ok &&
            response.status !==
              404
          ) {
            throw new Error(
              (await response.text()) ||
                `Unable to delete Gallery item ${id}.`
            );
          }
        }

        const finalItems =
          normalizeItems(
            savedItems
          );

        setItems(
          finalItems
        );

        setBackendIds(
          savedIds
        );

        setSaved(true);

        setMessage(
          "Gallery page and Gallery items saved successfully."
        );
      } catch (error) {
        console.error(
          "Failed to save Gallery CMS:",
          error
        );

        setSaveError(
          error?.message ||
            "Failed to save Gallery content."
        );
      } finally {
        setSaving(false);
      }
    };

  /* =========================================================
     RESET DEFAULTS
  ========================================================= */

  const resetDefaults =
    () => {
      if (
        !window.confirm(
          "Reset the entire Gallery editor to the default Hero, Showcase, Gallery items, CTA and Lightbox values? Changes will not reach the website until you click Save All."
        )
      ) {
        return;
      }

      setPageContent(
        createDefaultPageContent()
      );

      setItems(
        cloneDefaultGallery()
      );

      setSaved(false);

      setMessage(
        "Default Gallery page content and Gallery items restored in the editor. Click Save All to apply them."
      );

      setSaveError("");

      setOpenSections(
        {
          hero: true,
          showcase: true,
          items: true,
          cta: true,
          lightbox: true,
        }
      );
    };

  /* =========================================================
     STATS
  ========================================================= */

  const visibleCount =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.enabled !==
            false
        ).length,
      [items]
    );

  const hiddenCount =
    items.length -
    visibleCount;

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <Loader2
              size={36}
              className="mx-auto animate-spin text-[#C9A03B]"
            />

            <p className="mt-4 font-extrabold text-slate-900">
              Loading Gallery
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Loading all Gallery page sections.
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
    <div className="min-h-screen overflow-x-hidden bg-[#F1F5F9]">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 pb-36 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin"
                  )
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                title="Back to Dashboard"
              >
                <ArrowLeft
                  size={18}
                />
              </button>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B28A20]">
                  Saam Infrastructure
                </p>

                <h1 className="truncate text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Gallery
                </h1>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Manage every section of the public Gallery page.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  loadGallery(
                    true
                  )
                }
                disabled={
                  refreshing ||
                  saving
                }
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
                Refresh
              </button>

              <button
                type="button"
                onClick={
                  saveAll
                }
                disabled={
                  saving
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Save
                    size={17}
                  />
                )}

                {saving
                  ? "Saving..."
                  : "Save All"}
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
            INTRO
        =================================================== */}

        <div className="mb-6 rounded-2xl bg-[#0F172A] p-5 text-white shadow-lg sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7B44D]">
                Website Management
              </p>

              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Gallery Content
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Control the complete Gallery page:
                Hero, Project Showcase, Gallery cards,
                CTA and Lightbox interface text.
                The public visual design remains unchanged.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Total
                </p>

                <p className="mt-1 text-2xl font-extrabold">
                  {items.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Visible
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#D7B44D]">
                  {visibleCount}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Hidden
                </p>

                <p className="mt-1 text-2xl font-extrabold">
                  {hiddenCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            MESSAGES
        =================================================== */}

        <div className="mb-6 space-y-3">
          <StatusMessage type="error">
            {loadError}
          </StatusMessage>

          <StatusMessage type="error">
            {saveError}
          </StatusMessage>

          <StatusMessage type="success">
            {saved
              ? message
              : ""}
          </StatusMessage>

          {!saved &&
            message && (
              <StatusMessage type="info">
                {message}
              </StatusMessage>
            )}
        </div>

        {/* ===================================================
            SECTION 01 - HERO
        =================================================== */}

        <CmsSection
          number="01"
          title="Hero Section"
          description="Manage all text displayed in the top Hero area of the public Gallery page."
          open={
            openSections.hero
          }
          onToggle={() =>
            toggleSection(
              "hero"
            )
          }
        >
          <div className="space-y-5">
            <Toggle
              enabled={
                pageContent.heroEnabled !==
                false
              }
              onChange={(value) =>
                updatePageField(
                  "heroEnabled",
                  value
                )
              }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Field
                label="Brand Text"
                value={
                  pageContent.heroBrand
                }
                onChange={(value) =>
                  updatePageField(
                    "heroBrand",
                    value
                  )
                }
              />

              <Field
                label="Hero Title Line 1"
                value={
                  pageContent.heroTitleLine1
                }
                onChange={(value) =>
                  updatePageField(
                    "heroTitleLine1",
                    value
                  )
                }
              />

              <Field
                label="Hero Title Line 2"
                value={
                  pageContent.heroTitleLine2
                }
                onChange={(value) =>
                  updatePageField(
                    "heroTitleLine2",
                    value
                  )
                }
              />

              <Field
                label="Showcase Label"
                value={
                  pageContent.heroShowcaseLabel
                }
                onChange={(value) =>
                  updatePageField(
                    "heroShowcaseLabel",
                    value
                  )
                }
              />

              <Field
                label="Showcase Title"
                value={
                  pageContent.heroShowcaseTitle
                }
                onChange={(value) =>
                  updatePageField(
                    "heroShowcaseTitle",
                    value
                  )
                }
              />

              <Field
                label="Showcase Highlight"
                value={
                  pageContent.heroShowcaseHighlight
                }
                onChange={(value) =>
                  updatePageField(
                    "heroShowcaseHighlight",
                    value
                  )
                }
              />
            </div>

            <Field
              label="Hero Description"
              value={
                pageContent.heroDescription
              }
              onChange={(value) =>
                updatePageField(
                  "heroDescription",
                  value
                )
              }
              textarea
              rows={5}
            />
          </div>
        </CmsSection>

        {/* ===================================================
            SECTION 02 - PROJECT SHOWCASE
        =================================================== */}

        <CmsSection
          number="02"
          title="Project Showcase Section"
          description="Manage the text displayed immediately above the Gallery cards."
          open={
            openSections.showcase
          }
          onToggle={() =>
            toggleSection(
              "showcase"
            )
          }
        >
          <div className="space-y-5">
            <Toggle
              enabled={
                pageContent.projectsEnabled !==
                false
              }
              onChange={(value) =>
                updatePageField(
                  "projectsEnabled",
                  value
                )
              }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Field
                label="Section Label"
                value={
                  pageContent.projectsLabel
                }
                onChange={(value) =>
                  updatePageField(
                    "projectsLabel",
                    value
                  )
                }
              />

              <Field
                label="Section Title"
                value={
                  pageContent.projectsTitle
                }
                onChange={(value) =>
                  updatePageField(
                    "projectsTitle",
                    value
                  )
                }
              />

              <Field
                label="Section Title Highlight"
                value={
                  pageContent.projectsTitleHighlight
                }
                onChange={(value) =>
                  updatePageField(
                    "projectsTitleHighlight",
                    value
                  )
                }
              />
            </div>

            <Field
              label="Section Description"
              value={
                pageContent.projectsDescription
              }
              onChange={(value) =>
                updatePageField(
                  "projectsDescription",
                  value
                )
              }
              textarea
              rows={4}
            />

            <Field
              label="Gallery Card Footer Brand Text"
              value={
                pageContent.cardBrandText
              }
              onChange={(value) =>
                updatePageField(
                  "cardBrandText",
                  value
                )
              }
            />
          </div>
        </CmsSection>

        {/* ===================================================
            SECTION 03 - GALLERY ITEMS
        =================================================== */}

        <CmsSection
          number="03"
          title="Gallery Items"
          description="Manage every Gallery card: title, category, description, images, visibility and display order."
          open={
            openSections.items
          }
          onToggle={() =>
            toggleSection(
              "items"
            )
          }
        >
          <div>
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Gallery Cards
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Add unlimited cards and arrange their public order.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  addItem
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                <Plus
                  size={17}
                />
                Add Gallery Item
              </button>
            </div>

            {items.length ===
            0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-14 text-center">
                <ImagePlus
                  size={34}
                  className="mx-auto text-slate-400"
                />

                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  No Gallery items
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Add your first Gallery item to manage the public Gallery.
                </p>

                <button
                  type="button"
                  onClick={
                    addItem
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-4 py-3 text-sm font-bold text-white"
                >
                  <Plus
                    size={17}
                  />
                  Add Gallery Item
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {items.map(
                  (
                    item,
                    index
                  ) => (
                    <GalleryItemEditor
                      key={
                        item.id
                      }
                      item={
                        item
                      }
                      index={
                        index
                      }
                      total={
                        items.length
                      }
                      onChange={(
                        nextItem
                      ) =>
                        updateItem(
                          index,
                          nextItem
                        )
                      }
                      onMoveUp={() =>
                        moveItem(
                          index,
                          "up"
                        )
                      }
                      onMoveDown={() =>
                        moveItem(
                          index,
                          "down"
                        )
                      }
                      onDelete={() =>
                        deleteItem(
                          index
                        )
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </CmsSection>

        {/* ===================================================
            SECTION 04 - CTA
        =================================================== */}

        <CmsSection
          number="04"
          title="CTA Section"
          description="Manage the complete Call To Action section displayed at the bottom of the public Gallery page."
          open={
            openSections.cta
          }
          onToggle={() =>
            toggleSection(
              "cta"
            )
          }
        >
          <div className="space-y-5">
            <Toggle
              enabled={
                pageContent.ctaEnabled !==
                false
              }
              onChange={(value) =>
                updatePageField(
                  "ctaEnabled",
                  value
                )
              }
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Field
                label="CTA Label"
                value={
                  pageContent.ctaLabel
                }
                onChange={(value) =>
                  updatePageField(
                    "ctaLabel",
                    value
                  )
                }
              />

              <Field
                label="CTA Title"
                value={
                  pageContent.ctaTitle
                }
                onChange={(value) =>
                  updatePageField(
                    "ctaTitle",
                    value
                  )
                }
              />

              <Field
                label="CTA Title Highlight"
                value={
                  pageContent.ctaTitleHighlight
                }
                onChange={(value) =>
                  updatePageField(
                    "ctaTitleHighlight",
                    value
                  )
                }
              />

              <Field
                label="Button Eyebrow"
                value={
                  pageContent.ctaButtonEyebrow
                }
                onChange={(value) =>
                  updatePageField(
                    "ctaButtonEyebrow",
                    value
                  )
                }
              />

              <Field
                label="Button Text"
                value={
                  pageContent.ctaButtonText
                }
                onChange={(value) =>
                  updatePageField(
                    "ctaButtonText",
                    value
                  )
                }
              />

              <Field
                label="Button Link"
                value={
                  pageContent.ctaButtonLink
                }
                onChange={(value) =>
                  updatePageField(
                    "ctaButtonLink",
                    value
                  )
                }
              />
            </div>

            <Field
              label="CTA Description"
              value={
                pageContent.ctaDescription
              }
              onChange={(value) =>
                updatePageField(
                  "ctaDescription",
                  value
                )
              }
              textarea
              rows={5}
            />
          </div>
        </CmsSection>

        {/* ===================================================
            SECTION 05 - LIGHTBOX
        =================================================== */}

        <CmsSection
          number="05"
          title="Lightbox & Gallery UI"
          description="Manage the text shown inside the Gallery lightbox and on mobile."
          open={
            openSections.lightbox
          }
          onToggle={() =>
            toggleSection(
              "lightbox"
            )
          }
          className="mb-32"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Field
                label="Lightbox Brand Text"
                value={
                  pageContent.lightboxBrandText
                }
                onChange={(value) =>
                  updatePageField(
                    "lightboxBrandText",
                    value
                  )
                }
              />

              <Field
                label="Navigation Text"
                value={
                  pageContent.lightboxNavigationText
                }
                onChange={(value) =>
                  updatePageField(
                    "lightboxNavigationText",
                    value
                  )
                }
              />

              <Field
                label="Zoom Text"
                value={
                  pageContent.lightboxZoomText
                }
                onChange={(value) =>
                  updatePageField(
                    "lightboxZoomText",
                    value
                  )
                }
              />

              <Field
                label="Close Text"
                value={
                  pageContent.lightboxCloseText
                }
                onChange={(value) =>
                  updatePageField(
                    "lightboxCloseText",
                    value
                  )
                }
              />
            </div>

            <Field
              label="Mobile Lightbox Help"
              value={
                pageContent.lightboxMobileHelp
              }
              onChange={(value) =>
                updatePageField(
                  "lightboxMobileHelp",
                  value
                )
              }
            />
          </div>
        </CmsSection>

        {/* ===================================================
            STICKY ACTION BAR
        =================================================== */}

        <div className="fixed inset-x-0 bottom-0 z-40">
          <div className="mx-auto max-w-7xl px-3 pb-3 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                {saved ? (
                  <>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check
                        size={15}
                      />
                    </span>

                    <span className="font-semibold text-emerald-700">
                      All Gallery changes are saved.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF9E9] text-[#B28A20]">
                      <Save
                        size={15}
                      />
                    </span>

                    <span>
                      Unsaved changes will not appear on the website until you click Save All.
                    </span>
                  </>
                )}
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <button
                  type="button"
                  onClick={
                    resetDefaults
                  }
                  disabled={
                    saving
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    size={16}
                  />
                  Reset Defaults
                </button>

                <button
                  type="button"
                  onClick={
                    saveAll
                  }
                  disabled={
                    saving
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Save
                      size={17}
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save All"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
