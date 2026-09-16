import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
  CheckCircle2,
  Sparkles,
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  ClipboardCheck,
  Award,
  ShieldCheck,
  MessageCircle,
  Clock3,
  Hammer,
  HardHat,
  Ruler,
  Settings,
  Building,
  BriefcaseBusiness,
  Trees,
  Layers3,
  Construction,
  PencilRuler,
  Handshake,
  CircleCheck,
  Star,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const SERVICES_API = `${API_BASE_URL}/api/services-page`;
const SERVICE_ITEMS_API = `${SERVICES_API}/items`;
const VALUE_ITEMS_API = `${SERVICES_API}/values`;
const ADVANTAGES_API = `${SERVICES_API}/advantages`;

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  enabled: true,

  heroLabel: "Our Services",
  heroHeading: "Construction solutions",
  heroHeadingHighlight: "built around your needs.",
  heroDescription:
    "From civil construction and residential development to infrastructure and project management, Saam Infrastructure provides dependable solutions focused on quality, safety and long-term value.",

  whatWeDoLabel: "What We Do",
  whatWeDoHeading: "Reliable solutions",
  whatWeDoHeadingHighlight: "from planning to completion.",
  whatWeDoCardLabel: "Built with purpose",
  whatWeDoCardDescription:
    "We combine practical experience, technical knowledge and responsible project execution to deliver construction and infrastructure solutions that meet our clients' requirements.",
  whatWeDoSecondaryDescription:
    "Every project is approached with attention to quality, coordination, safety and long-term performance.",

  expertiseLabel: "Our Expertise",
  expertiseHeading: "Construction services",
  expertiseHeadingHighlight: "built for real requirements.",
  expertiseDescription:
    "From residential projects to large infrastructure works, our services are structured around practical execution, quality and long-term performance.",

  whyChooseLabel: "Why Choose Us",
  whyChooseHeading: "A dependable partner",
  whyChooseHeadingHighlight: "for your next project.",
  whyChooseDescription:
    "We believe successful construction is built on trust, communication, quality and responsible execution.",

  ctaEnabled: true,
  ctaLabel: "Start Your Project",
  ctaHeading: "Let's build something great",
  ctaHeadingHighlight: "together.",
  ctaDescription:
    "Tell us about your construction or infrastructure requirements and our team will be ready to discuss the next steps.",
  ctaButtonText: "Discuss Your Project",
  ctaButtonLink: "/contact",
};

/* =========================================================
   DEFAULT SERVICE ITEMS
========================================================= */

const DEFAULT_SERVICE_ITEMS = [
  {
    icon: "Building2",
    title: "Civil Construction",
    description:
      "Complete civil construction solutions delivered with quality workmanship, proper planning and dependable execution.",
    points: [
      "Structural construction",
      "Building development",
      "Site development",
      "Quality-controlled execution",
    ],
    enabled: true,
    displayOrder: 0,
  },

  {
    icon: "Building2",
    title: "Commercial Projects",
    description:
      "Modern commercial construction solutions designed around functionality, durability and the specific requirements of every business.",
    points: [
      "Commercial buildings",
      "Office spaces",
      "Retail developments",
      "Project coordination",
    ],
    enabled: true,
    displayOrder: 1,
  },

  {
    icon: "Home",
    title: "Residential Construction",
    description:
      "Thoughtfully planned residential construction focused on safety, comfort, quality and long-term value.",
    points: [
      "Residential buildings",
      "Individual homes",
      "Housing development",
      "Renovation work",
    ],
    enabled: true,
    displayOrder: 2,
  },

  {
    icon: "Landmark",
    title: "Infrastructure Development",
    description:
      "Reliable infrastructure development services supported by careful planning, responsible execution and attention to detail.",
    points: [
      "Infrastructure projects",
      "Site development",
      "Civil works",
      "Project execution",
    ],
    enabled: true,
    displayOrder: 3,
  },

  {
    icon: "Factory",
    title: "Industrial Construction",
    description:
      "Robust industrial construction solutions developed with a focus on performance, safety and operational requirements.",
    points: [
      "Industrial facilities",
      "Structural works",
      "Site development",
      "Safety-focused execution",
    ],
    enabled: true,
    displayOrder: 4,
  },

  {
    icon: "Wrench",
    title: "Renovation & Development",
    description:
      "Renovation and development services that improve existing spaces while maintaining structural integrity and functionality.",
    points: [
      "Building renovation",
      "Structural improvements",
      "Space development",
      "Modernization",
    ],
    enabled: true,
    displayOrder: 5,
  },

  {
    icon: "ClipboardCheck",
    title: "Engineering & Project Management",
    description:
      "Professional project coordination and management focused on planning, quality control, timelines and successful delivery.",
    points: [
      "Project planning",
      "Execution monitoring",
      "Quality management",
      "Coordination",
    ],
    enabled: true,
    displayOrder: 6,
  },
];

/* =========================================================
   DEFAULT VALUE ITEMS
========================================================= */

const DEFAULT_VALUE_ITEMS = [
  {
    number: "01",
    title: "Plan",
    text: "Clear planning before execution.",
    enabled: true,
    displayOrder: 0,
  },
  {
    number: "02",
    title: "Build",
    text: "Quality-focused project execution.",
    enabled: true,
    displayOrder: 1,
  },
  {
    number: "03",
    title: "Deliver",
    text: "Dependable results built to last.",
    enabled: true,
    displayOrder: 2,
  },
];

/* =========================================================
   DEFAULT ADVANTAGES
========================================================= */

const DEFAULT_ADVANTAGES = [
  {
    number: "01",
    icon: "Award",
    title: "Quality Workmanship",
    text:
      "We maintain high standards of workmanship and attention to detail throughout every stage of construction.",
    enabled: true,
    displayOrder: 0,
  },
  {
    number: "02",
    icon: "ShieldCheck",
    title: "Safety First",
    text:
      "Safety remains an important part of our planning, site management and project execution.",
    enabled: true,
    displayOrder: 1,
  },
  {
    number: "03",
    icon: "MessageCircle",
    title: "Transparent Communication",
    text:
      "We maintain clear and consistent communication with clients throughout the complete project lifecycle.",
    enabled: true,
    displayOrder: 2,
  },
  {
    number: "04",
    icon: "Clock3",
    title: "Timely Execution",
    text:
      "Careful planning and coordination help us maintain dependable project progress and delivery.",
    enabled: true,
    displayOrder: 3,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter(Boolean)
    .map((item, index) => ({
      ...item,
      displayOrder:
        Number.isFinite(Number(item.displayOrder))
          ? Number(item.displayOrder)
          : index,
      enabled: item.enabled !== false,
    }))
    .sort((a, b) => {
      const orderA = Number(a.displayOrder ?? 0);
      const orderB = Number(b.displayOrder ?? 0);

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return Number(a.id ?? 0) - Number(b.id ?? 0);
    });
}

function createEditorKey(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function prepareCollection(items, prefix) {
  return normalizeCollection(items).map((item, index) => ({
    ...item,
    displayOrder: index,
    _editorKey: item._editorKey || createEditorKey(prefix),
  }));
}

/* =========================================================
   RESPONSE HELPERS
========================================================= */

async function readResponseMessage(response) {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const json = await response.json();

      return (
        json?.message ||
        json?.error ||
        json?.detail ||
        JSON.stringify(json)
      );
    }

    const text = await response.text();

    return text || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(await readResponseMessage(response));
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  return response.json();
}

/* =========================================================
   GENERIC UI COMPONENTS
========================================================= */

function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  open,
  onToggle,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        flex
        w-full
        items-start
        gap-4
        text-left
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-slate-900
          text-sm
          font-black
          text-[#d7b44d]
        "
      >
        {String(number).padStart(2, "0")}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-xs
            font-black
            uppercase
            tracking-[0.22em]
            text-[#b28a20]
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-black
            tracking-tight
            text-slate-900
            sm:text-xl
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mt-1
              max-w-3xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            {description}
          </p>
        )}
      </div>

      <div className="mt-1 shrink-0 text-slate-500">
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </button>
  );
}

function FieldLabel({ children, required = false }) {
  return (
    <label
      className="
        mb-2
        block
        text-xs
        font-black
        uppercase
        tracking-[0.14em]
        text-slate-600
      "
    >
      {children}
      {required && (
        <span className="ml-1 text-[#b28a20]">*</span>
      )}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-[#c9a03b]
          focus:ring-2
          focus:ring-[#c9a03b]/15
        "
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 5,
  required = false,
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-[#c9a03b]
          focus:ring-2
          focus:ring-[#c9a03b]/15
        "
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          text-slate-900
          outline-none
          transition
          focus:border-[#c9a03b]
          focus:ring-2
          focus:ring-[#c9a03b]/15
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  description = "",
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="
        flex
        w-full
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        text-left
      "
    >
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900">
          {label}
        </p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        )}
      </div>

      <span
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          ${
            checked
              ? "bg-[#c9a03b]"
              : "bg-slate-300"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow
            transition
            ${
              checked
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </span>
    </button>
  );
}

function IconPreview({
  icon,
  size = 22,
  fallback = "Building2",
}) {
  switch (icon || fallback) {
    case "Home":
      return (
        <Home
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Factory":
      return (
        <Factory
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Landmark":
      return (
        <Landmark
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Wrench":
      return (
        <Wrench
          size={size}
          strokeWidth={1.8}
        />
      );

    case "ClipboardCheck":
      return (
        <ClipboardCheck
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Award":
      return (
        <Award
          size={size}
          strokeWidth={1.8}
        />
      );

    case "ShieldCheck":
      return (
        <ShieldCheck
          size={size}
          strokeWidth={1.8}
        />
      );

    case "MessageCircle":
      return (
        <MessageCircle
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Clock3":
      return (
        <Clock3
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Hammer":
      return (
        <Hammer
          size={size}
          strokeWidth={1.8}
        />
      );

    case "HardHat":
      return (
        <HardHat
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Ruler":
      return (
        <Ruler
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Settings":
      return (
        <Settings
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Building":
      return (
        <Building
          size={size}
          strokeWidth={1.8}
        />
      );

    case "BriefcaseBusiness":
      return (
        <BriefcaseBusiness
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Trees":
      return (
        <Trees
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Layers3":
      return (
        <Layers3
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Construction":
      return (
        <Construction
          size={size}
          strokeWidth={1.8}
        />
      );

    case "PencilRuler":
      return (
        <PencilRuler
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Handshake":
      return (
        <Handshake
          size={size}
          strokeWidth={1.8}
        />
      );

    case "CircleCheck":
      return (
        <CircleCheck
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Star":
      return (
        <Star
          size={size}
          strokeWidth={1.8}
        />
      );

    case "Building2":
    default:
      return (
        <Building2
          size={size}
          strokeWidth={1.8}
        />
      );
  }
}

function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-slate-50
        p-8
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-slate-900
          text-[#d7b44d]
        "
      >
        <Sparkles size={21} />
      </div>

      <h3 className="mt-4 text-base font-black text-slate-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-slate-900
            px-4
            py-2.5
            text-sm
            font-bold
            text-white
            transition
            hover:bg-slate-800
          "
        >
          <Plus size={17} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* =========================================================
   SERVICE EDITOR
========================================================= */


function ServiceEditor({
  item,
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) {
  const update = (field, value) => {
    onChange({
      ...item,
      [field]: value,
    });
  };

  const updatePoint = (pointIndex, value) => {
    const points = Array.isArray(item.points)
      ? [...item.points]
      : [];

    points[pointIndex] = value;

    onChange({
      ...item,
      points,
    });
  };

  const addPoint = () => {
    onChange({
      ...item,
      points: [
        ...(Array.isArray(item.points)
          ? item.points
          : []),
        "",
      ],
    });
  };

  const removePoint = (pointIndex) => {
    onChange({
      ...item,
      points: (Array.isArray(item.points)
        ? item.points
        : []
      ).filter((_, currentIndex) => currentIndex !== pointIndex),
    });
  };

  const iconOptions = [
    ["Building2", "Building 2"],
    ["Home", "Home"],
    ["Factory", "Factory"],
    ["Landmark", "Landmark"],
    ["Wrench", "Wrench"],
    ["ClipboardCheck", "Clipboard Check"],
    ["Hammer", "Hammer"],
    ["HardHat", "Hard Hat"],
    ["Ruler", "Ruler"],
    ["Building", "Building"],
    ["BriefcaseBusiness", "Business"],
    ["Construction", "Construction"],
    ["PencilRuler", "Engineering"],
  ];

  return (
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
      {/* CARD HEADER */}

      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <GripVertical
            size={18}
            className="text-slate-400"
          />

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-slate-900
              text-xs
              font-black
              text-[#d7b44d]
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c9a03b]/40 bg-[#f8f5ed] text-[#b28a20]">
            <IconPreview icon={item.icon} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-black text-slate-900">
              {item.title || "New Service"}
            </p>
            <p className="text-xs text-slate-500">
              {item.enabled ? "Visible on website" : "Hidden on website"}
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            disabled={!canMoveUp}
            onClick={onMoveUp}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-[#c9a03b]
              hover:text-[#b28a20]
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowUp size={16} />
          </button>

          <button
            type="button"
            disabled={!canMoveDown}
            onClick={onMoveDown}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-[#c9a03b]
              hover:text-[#b28a20]
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowDown size={16} />
          </button>

          <button
            type="button"
            onClick={() => onChange({
              ...item,
              enabled: !item.enabled,
            })}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:border-[#c9a03b]
              hover:text-[#b28a20]
            "
            title={item.enabled ? "Hide" : "Show"}
          >
            {item.enabled ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-red-100
              bg-white
              text-red-500
              transition
              hover:border-red-300
              hover:bg-red-50
            "
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* CARD CONTENT */}

      <div className="space-y-6 p-5 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]">
          <SelectField
            label="Icon"
            value={item.icon}
            onChange={(value) =>
              update("icon", value)
            }
            options={iconOptions.map(
              ([value, label]) => ({
                value,
                label,
              })
            )}
          />

          <TextField
            label="Service Title"
            value={item.title}
            onChange={(value) =>
              update("title", value)
            }
            placeholder="Enter service title"
            required
          />
        </div>

        <TextArea
          label="Description"
          value={item.description}
          onChange={(value) =>
            update("description", value)
          }
          placeholder="Enter service description"
          rows={4}
        />

        {/* POINTS */}

        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <FieldLabel>Service Points</FieldLabel>
              <p className="-mt-1 text-xs text-slate-500">
                Add the bullet points shown inside this service card.
              </p>
            </div>

            <button
              type="button"
              onClick={addPoint}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#c9a03b]
                bg-[#f8f5ed]
                px-3
                py-2
                text-xs
                font-black
                text-[#92751c]
                transition
                hover:bg-[#c9a03b]
                hover:text-slate-900
              "
            >
              <Plus size={15} />
              Add Point
            </button>
          </div>

          <div className="space-y-3">
            {(Array.isArray(item.points)
              ? item.points
              : []
            ).map((point, pointIndex) => (
              <div
                key={`${item._editorKey}-point-${pointIndex}`}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8f5ed] text-[#b28a20]">
                  <CheckCircle2 size={17} />
                </div>

                <input
                  value={point ?? ""}
                  onChange={(event) =>
                    updatePoint(
                      pointIndex,
                      event.target.value
                    )
                  }
                  placeholder={`Point ${pointIndex + 1}`}
                  className="
                    min-w-0
                    flex-1
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-[#c9a03b]
                    focus:ring-2
                    focus:ring-[#c9a03b]/15
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    removePoint(pointIndex)
                  }
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-red-100
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {(!Array.isArray(item.points) ||
              item.points.length === 0) && (
              <p
                className="
                  rounded-xl
                  border
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  text-slate-500
                "
              >
                No points added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VALUE ITEM EDITOR
========================================================= */

function ValueItemEditor({
  item,
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
      "
    >
      <div className="flex flex-wrap items-center gap-3">
        <GripVertical
          size={18}
          className="text-slate-400"
        />

        <span className="text-xs font-black tracking-[0.2em] text-[#b28a20]">
          {item.number || String(index + 1).padStart(2, "0")}
        </span>

        <p className="mr-auto text-sm font-black text-slate-900">
          {item.title || "New Value Item"}
        </p>

        <button
          type="button"
          onClick={() =>
            onChange({
              ...item,
              enabled: !item.enabled,
            })
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-500
            transition
            hover:border-[#c9a03b]
            hover:text-[#b28a20]
          "
          title={item.enabled ? "Hide" : "Show"}
        >
          {item.enabled ? (
            <Eye size={16} />
          ) : (
            <EyeOff size={16} />
          )}
        </button>

        <button
          type="button"
          disabled={!canMoveUp}
          onClick={onMoveUp}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30"
        >
          <ArrowUp size={16} />
        </button>

        <button
          type="button"
          disabled={!canMoveDown}
          onClick={onMoveDown}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30"
        >
          <ArrowDown size={16} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-red-100
            text-red-500
            hover:bg-red-50
          "
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[100px_0.7fr_1.3fr]">
        <TextField
          label="Number"
          value={item.number}
          onChange={(value) =>
            onChange({
              ...item,
              number: value,
            })
          }
          placeholder="01"
        />

        <TextField
          label="Title"
          value={item.title}
          onChange={(value) =>
            onChange({
              ...item,
              title: value,
            })
          }
          placeholder="Plan"
          required
        />

        <TextField
          label="Text"
          value={item.text}
          onChange={(value) =>
            onChange({
              ...item,
              text: value,
            })
          }
          placeholder="Describe this step"
        />
      </div>
    </div>
  );
}

/* =========================================================
   ADVANTAGE EDITOR
========================================================= */

function AdvantageEditor({
  item,
  index,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) {
  const iconOptions = [
    ["Award", "Award"],
    ["ShieldCheck", "Shield Check"],
    ["MessageCircle", "Message Circle"],
    ["Clock3", "Clock"],
    ["CircleCheck", "Circle Check"],
    ["Star", "Star"],
    ["Handshake", "Handshake"],
    ["HardHat", "Hard Hat"],
  ];

  return (
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
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:px-5">
        <GripVertical
          size={18}
          className="text-slate-400"
        />

        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-slate-900
            text-xs
            font-black
            text-[#d7b44d]
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a03b]/10 text-[#d0ad43]">
          <IconPreview
            icon={item.icon}
            fallback={Award}
          />
        </div>

        <p className="mr-auto text-sm font-black text-slate-900">
          {item.title || "New Advantage"}
        </p>

        <button
          type="button"
          onClick={() =>
            onChange({
              ...item,
              enabled: !item.enabled,
            })
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:border-[#c9a03b]
            hover:text-[#b28a20]
          "
          title={item.enabled ? "Hide" : "Show"}
        >
          {item.enabled ? (
            <Eye size={16} />
          ) : (
            <EyeOff size={16} />
          )}
        </button>

        <button
          type="button"
          disabled={!canMoveUp}
          onClick={onMoveUp}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            disabled:opacity-30
          "
        >
          <ArrowUp size={16} />
        </button>

        <button
          type="button"
          disabled={!canMoveDown}
          onClick={onMoveDown}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            disabled:opacity-30
          "
        >
          <ArrowDown size={16} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-red-100
            bg-white
            text-red-500
            hover:bg-red-50
          "
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-[100px_0.7fr_1.3fr] sm:p-6">
        <TextField
          label="Number"
          value={item.number}
          onChange={(value) =>
            onChange({
              ...item,
              number: value,
            })
          }
          placeholder="01"
        />

        <div>
          <SelectField
            label="Icon"
            value={item.icon}
            onChange={(value) =>
              onChange({
                ...item,
                icon: value,
              })
            }
            options={iconOptions.map(
              ([value, label]) => ({
                value,
                label,
              })
            )}
          />
        </div>

        <TextField
          label="Title"
          value={item.title}
          onChange={(value) =>
            onChange({
              ...item,
              title: value,
            })
          }
          placeholder="Quality Workmanship"
          required
        />

        <div className="md:col-span-3">
          <TextArea
            label="Description"
            value={item.text}
            onChange={(value) =>
              onChange({
                ...item,
                text: value,
              })
            }
            placeholder="Describe this advantage"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN SERVICES
========================================================= */

export default function AdminServices() {
  const navigate = useNavigate();

  const [content, setContent] = useState(
    clone(DEFAULT_CONTENT)
  );

  const [contentId, setContentId] = useState(null);

  const [serviceItems, setServiceItems] = useState(
    prepareCollection(DEFAULT_SERVICE_ITEMS, "service")
  );

  const [valueItems, setValueItems] = useState(
    prepareCollection(DEFAULT_VALUE_ITEMS, "value")
  );

  const [advantages, setAdvantages] = useState(
    prepareCollection(DEFAULT_ADVANTAGES, "advantage")
  );

  const [backendServiceIds, setBackendServiceIds] = useState(
    []
  );

  const [backendValueIds, setBackendValueIds] = useState(
    []
  );

  const [backendAdvantageIds, setBackendAdvantageIds] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [openSections, setOpenSections] = useState({
    visibility: true,
    hero: true,
    whatWeDo: true,
    values: true,
    expertise: true,
    services: true,
    whyChoose: true,
    advantages: true,
    cta: true,
  });

  /* =========================================================
     LOAD DATA
  ========================================================= */

  const loadData = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const [
        backendContent,
        backendServices,
        backendValues,
        backendAdvantages,
      ] = await Promise.all([
        fetchJson(SERVICES_API),
        fetchJson(SERVICE_ITEMS_API),
        fetchJson(VALUE_ITEMS_API),
        fetchJson(ADVANTAGES_API),
      ]);

      if (
        backendContent &&
        typeof backendContent === "object"
      ) {
        setContent({
          ...clone(DEFAULT_CONTENT),
          ...backendContent,
        });

        setContentId(
          backendContent.id ?? null
        );
      } else {
        setContent(clone(DEFAULT_CONTENT));
        setContentId(null);
      }

      const services =
        Array.isArray(backendServices)
          ? backendServices
          : [];

      const values =
        Array.isArray(backendValues)
          ? backendValues
          : [];

      const backendAdvantagesList =
        Array.isArray(backendAdvantages)
          ? backendAdvantages
          : [];

      if (services.length > 0) {
        setServiceItems(
          prepareCollection(
            services,
            "service"
          )
        );

        setBackendServiceIds(
          services
            .map((item) => item.id)
            .filter(
              (id) => id !== null && id !== undefined
            )
        );
      } else {
        setServiceItems(
          prepareCollection(
            DEFAULT_SERVICE_ITEMS,
            "service"
          )
        );

        setBackendServiceIds([]);
      }

      if (values.length > 0) {
        setValueItems(
          prepareCollection(
            values,
            "value"
          )
        );

        setBackendValueIds(
          values
            .map((item) => item.id)
            .filter(
              (id) => id !== null && id !== undefined
            )
        );
      } else {
        setValueItems(
          prepareCollection(
            DEFAULT_VALUE_ITEMS,
            "value"
          )
        );

        setBackendValueIds([]);
      }

      if (backendAdvantagesList.length > 0) {
        setAdvantages(
          prepareCollection(
            backendAdvantagesList,
            "advantage"
          )
        );

        setBackendAdvantageIds(
          backendAdvantagesList
            .map((item) => item.id)
            .filter(
              (id) => id !== null && id !== undefined
            )
        );
      } else {
        setAdvantages(
          prepareCollection(
            DEFAULT_ADVANTAGES,
            "advantage"
          )
        );

        setBackendAdvantageIds([]);
      }
    } catch (loadError) {
      console.error(
        "Failed to load Services CMS data:",
        loadError
      );

      setError(
        loadError?.message ||
          "Unable to load Services data."
      );
    } finally {
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadData();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  /* =========================================================
     SECTION TOGGLE
  ========================================================= */

  const toggleSection = (key) => {
    setOpenSections((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  /* =========================================================
     SERVICE COLLECTION HELPERS
  ========================================================= */

  const updateService = (index, item) => {
    setServiceItems((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index
          ? item
          : entry
      )
    );
  };

  const addService = () => {
    setServiceItems((current) => [
      ...current,
      {
        _editorKey: createEditorKey("service"),
        icon: "Building2",
        title: "",
        description: "",
        points: [""],
        enabled: true,
        displayOrder: current.length,
      },
    ]);
  };

  const deleteService = (index) => {
    setServiceItems((current) =>
      current
        .filter((_, currentIndex) =>
          currentIndex !== index
        )
        .map((item, currentIndex) => ({
          ...item,
          displayOrder: currentIndex,
        }))
    );
  };

  const moveService = (index, direction) => {
    setServiceItems((current) => {
      const next = [...current];
      const targetIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= next.length
      ) {
        return current;
      }

      [
        next[index],
        next[targetIndex],
      ] = [
        next[targetIndex],
        next[index],
      ];

      return next.map((item, currentIndex) => ({
        ...item,
        displayOrder: currentIndex,
      }));
    });
  };

  /* =========================================================
     VALUE COLLECTION HELPERS
  ========================================================= */

  const updateValueItem = (index, item) => {
    setValueItems((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index
          ? item
          : entry
      )
    );
  };

  const addValueItem = () => {
    setValueItems((current) => [
      ...current,
      {
        _editorKey: createEditorKey("value"),
        number: String(current.length + 1).padStart(
          2,
          "0"
        ),
        title: "",
        text: "",
        enabled: true,
        displayOrder: current.length,
      },
    ]);
  };

  const deleteValueItem = (index) => {
    setValueItems((current) =>
      current
        .filter((_, currentIndex) =>
          currentIndex !== index
        )
        .map((item, currentIndex) => ({
          ...item,
          displayOrder: currentIndex,
        }))
    );
  };

  const moveValueItem = (index, direction) => {
    setValueItems((current) => {
      const next = [...current];
      const targetIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= next.length
      ) {
        return current;
      }

      [
        next[index],
        next[targetIndex],
      ] = [
        next[targetIndex],
        next[index],
      ];

      return next.map((item, currentIndex) => ({
        ...item,
        displayOrder: currentIndex,
      }));
    });
  };

  /* =========================================================
     ADVANTAGE COLLECTION HELPERS
  ========================================================= */

  const updateAdvantage = (index, item) => {
    setAdvantages((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index
          ? item
          : entry
      )
    );
  };

  const addAdvantage = () => {
    setAdvantages((current) => [
      ...current,
      {
        _editorKey: createEditorKey("advantage"),
        number: String(current.length + 1).padStart(
          2,
          "0"
        ),
        icon: "Award",
        title: "",
        text: "",
        enabled: true,
        displayOrder: current.length,
      },
    ]);
  };

  const deleteAdvantage = (index) => {
    setAdvantages((current) =>
      current
        .filter((_, currentIndex) =>
          currentIndex !== index
        )
        .map((item, currentIndex) => ({
          ...item,
          displayOrder: currentIndex,
        }))
    );
  };

  const moveAdvantage = (index, direction) => {
    setAdvantages((current) => {
      const next = [...current];
      const targetIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= next.length
      ) {
        return current;
      }

      [
        next[index],
        next[targetIndex],
      ] = [
        next[targetIndex],
        next[index],
      ];

      return next.map((item, currentIndex) => ({
        ...item,
        displayOrder: currentIndex,
      }));
    });
  };

  /* =========================================================
     PAYLOAD BUILDERS
  ========================================================= */

  const buildContentPayload = (source) => ({
    enabled: Boolean(source.enabled),

    heroLabel: source.heroLabel ?? "",
    heroHeading: source.heroHeading ?? "",
    heroHeadingHighlight:
      source.heroHeadingHighlight ?? "",
    heroDescription:
      source.heroDescription ?? "",

    whatWeDoLabel:
      source.whatWeDoLabel ?? "",
    whatWeDoHeading:
      source.whatWeDoHeading ?? "",
    whatWeDoHeadingHighlight:
      source.whatWeDoHeadingHighlight ?? "",
    whatWeDoCardLabel:
      source.whatWeDoCardLabel ?? "",
    whatWeDoCardDescription:
      source.whatWeDoCardDescription ?? "",
    whatWeDoSecondaryDescription:
      source.whatWeDoSecondaryDescription ?? "",

    expertiseLabel:
      source.expertiseLabel ?? "",
    expertiseHeading:
      source.expertiseHeading ?? "",
    expertiseHeadingHighlight:
      source.expertiseHeadingHighlight ?? "",
    expertiseDescription:
      source.expertiseDescription ?? "",

    whyChooseLabel:
      source.whyChooseLabel ?? "",
    whyChooseHeading:
      source.whyChooseHeading ?? "",
    whyChooseHeadingHighlight:
      source.whyChooseHeadingHighlight ?? "",
    whyChooseDescription:
      source.whyChooseDescription ?? "",

    ctaEnabled: Boolean(
      source.ctaEnabled
    ),
    ctaLabel: source.ctaLabel ?? "",
    ctaHeading: source.ctaHeading ?? "",
    ctaHeadingHighlight:
      source.ctaHeadingHighlight ?? "",
    ctaDescription:
      source.ctaDescription ?? "",
    ctaButtonText:
      source.ctaButtonText ?? "",
    ctaButtonLink:
      source.ctaButtonLink ?? "",
  });

  const cleanServiceItem = (item) => ({
    icon: item.icon || "Building2",
    title: item.title || "",
    description: item.description || "",
    points: Array.isArray(item.points)
      ? item.points.filter(
          (point) =>
            String(point ?? "").trim() !== ""
        )
      : [],
    enabled: Boolean(item.enabled),
    displayOrder: Number(
      item.displayOrder ?? 0
    ),
  });

  const cleanValueItem = (item) => ({
    number: item.number || "",
    title: item.title || "",
    text: item.text || "",
    enabled: Boolean(item.enabled),
    displayOrder: Number(
      item.displayOrder ?? 0
    ),
  });

  const cleanAdvantage = (item) => ({
    number: item.number || "",
    icon: item.icon || "Award",
    title: item.title || "",
    text: item.text || "",
    enabled: Boolean(item.enabled),
    displayOrder: Number(
      item.displayOrder ?? 0
    ),
  });

  /* =========================================================
     DELETE OLD RECORDS THAT WERE REMOVED
  ========================================================= */

  const deleteRemovedRecords = async (
    currentItems,
    previousIds,
    endpoint
  ) => {
    const currentIds = new Set(
      currentItems
        .map((item) => item.id)
        .filter(
          (id) =>
            id !== null &&
            id !== undefined
        )
    );

    const removedIds = previousIds.filter(
      (id) => !currentIds.has(id)
    );

    for (const id of removedIds) {
      await fetchJson(
        `${endpoint}/${id}`,
        {
          method: "DELETE",
        }
      );
    }
  };

  /* =========================================================
     SAVE COLLECTION
  ========================================================= */

  const saveCollection = async ({
    items,
    previousIds,
    endpoint,
    cleanItem,
    setItems,
    setBackendIds,
  }) => {
    await deleteRemovedRecords(
      items,
      previousIds,
      endpoint
    );

    const savedItems = [];

    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];

      const payload = cleanItem({
        ...item,
        displayOrder: index,
      });

      let saved;

      if (
        item.id !== null &&
        item.id !== undefined
      ) {
        saved = await fetchJson(
          `${endpoint}/${item.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        saved = await fetchJson(
          endpoint,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      savedItems.push({
        ...saved,
        _editorKey:
          item._editorKey ||
          createEditorKey("saved"),
      });
    }

    const ids = savedItems
      .map((item) => item.id)
      .filter(
        (id) =>
          id !== null &&
          id !== undefined
      );

    setItems(
      prepareCollection(
        savedItems,
        "saved"
      )
    );

    setBackendIds(ids);
  };

  /* =========================================================
     SAVE ALL
  ========================================================= */

  const saveEverything = async (
    overrideData = null
  ) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const nextContent =
        overrideData?.content ||
        content;

      const nextServices =
        overrideData?.serviceItems ||
        serviceItems;

      const nextValues =
        overrideData?.valueItems ||
        valueItems;

      const nextAdvantages =
        overrideData?.advantages ||
        advantages;

      const contentPayload =
        buildContentPayload(
          nextContent
        );

      let savedContent;

      if (
        contentId !== null &&
        contentId !== undefined
      ) {
        savedContent = await fetchJson(
          `${SERVICES_API}/${contentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              contentPayload
            ),
          }
        );
      } else {
        savedContent = await fetchJson(
          SERVICES_API,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              contentPayload
            ),
          }
        );
      }

      if (savedContent?.id !== undefined) {
        setContentId(savedContent.id);
      }

      await saveCollection({
        items: nextServices,
        previousIds:
          backendServiceIds,
        endpoint: SERVICE_ITEMS_API,
        cleanItem:
          cleanServiceItem,
        setItems:
          setServiceItems,
        setBackendIds:
          setBackendServiceIds,
      });

      await saveCollection({
        items: nextValues,
        previousIds:
          backendValueIds,
        endpoint: VALUE_ITEMS_API,
        cleanItem:
          cleanValueItem,
        setItems:
          setValueItems,
        setBackendIds:
          setBackendValueIds,
      });

      await saveCollection({
        items: nextAdvantages,
        previousIds:
          backendAdvantageIds,
        endpoint: ADVANTAGES_API,
        cleanItem:
          cleanAdvantage,
        setItems:
          setAdvantages,
        setBackendIds:
          setBackendAdvantageIds,
      });

      if (overrideData?.content) {
        setContent(
          clone(nextContent)
        );
      }

      if (overrideData?.serviceItems) {
        setServiceItems(
          clone(nextServices)
        );
      }

      if (overrideData?.valueItems) {
        setValueItems(
          clone(nextValues)
        );
      }

      if (overrideData?.advantages) {
        setAdvantages(
          clone(nextAdvantages)
        );
      }

      setMessage(
        "Services content saved successfully."
      );
    } catch (saveError) {
      console.error(
        "Failed to save Services CMS data:",
        saveError
      );

      setError(
        saveError?.message ||
          "Unable to save Services content."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     RESET DEFAULTS
  ========================================================= */

  const resetDefaults = async () => {
    const confirmed =
      window.confirm(
        "Reset the Services page to the original default content? This will replace your current Services content."
      );

    if (!confirmed) {
      return;
    }

    setResetting(true);
    setError("");
    setMessage("");

    try {
      const defaults = {
        content: clone(
          DEFAULT_CONTENT
        ),
        serviceItems:
          prepareCollection(
            DEFAULT_SERVICE_ITEMS,
            "service"
          ),
        valueItems:
          prepareCollection(
            DEFAULT_VALUE_ITEMS,
            "value"
          ),
        advantages:
          prepareCollection(
            DEFAULT_ADVANTAGES,
            "advantage"
          ),
      };

      /*
       * For reset, use the currently loaded backend IDs
       * as the old IDs. The collections have no IDs, so
       * all previous records are removed and recreated.
       */

      const resetServiceIds =
        [...backendServiceIds];
      const resetValueIds =
        [...backendValueIds];
      const resetAdvantageIds =
        [...backendAdvantageIds];

      await deleteRemovedRecords(
        [],
        resetServiceIds,
        SERVICE_ITEMS_API
      );

      await deleteRemovedRecords(
        [],
        resetValueIds,
        VALUE_ITEMS_API
      );

      await deleteRemovedRecords(
        [],
        resetAdvantageIds,
        ADVANTAGES_API
      );

      /*
       * Clear backend IDs so all defaults are created again.
       */

      setBackendServiceIds([]);
      setBackendValueIds([]);
      setBackendAdvantageIds([]);

      const contentPayload =
        buildContentPayload(
          defaults.content
        );

      let savedContent;

      if (
        contentId !== null &&
        contentId !== undefined
      ) {
        savedContent = await fetchJson(
          `${SERVICES_API}/${contentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              contentPayload
            ),
          }
        );
      } else {
        savedContent = await fetchJson(
          SERVICES_API,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              contentPayload
            ),
          }
        );
      }

      if (savedContent?.id !== undefined) {
        setContentId(savedContent.id);
      }

      const savedServices = [];

      for (
        let index = 0;
        index < defaults.serviceItems.length;
        index += 1
      ) {
        const saved =
          await fetchJson(
            SERVICE_ITEMS_API,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                cleanServiceItem({
                  ...defaults.serviceItems[
                    index
                  ],
                  displayOrder:
                    index,
                })
              ),
            }
          );

        savedServices.push({
          ...saved,
          _editorKey:
            defaults.serviceItems[
              index
            ]._editorKey,
        });
      }

      const savedValues = [];

      for (
        let index = 0;
        index < defaults.valueItems.length;
        index += 1
      ) {
        const saved =
          await fetchJson(
            VALUE_ITEMS_API,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                cleanValueItem({
                  ...defaults.valueItems[
                    index
                  ],
                  displayOrder:
                    index,
                })
              ),
            }
          );

        savedValues.push({
          ...saved,
          _editorKey:
            defaults.valueItems[
              index
            ]._editorKey,
        });
      }

      const savedAdvantages = [];

      for (
        let index = 0;
        index < defaults.advantages.length;
        index += 1
      ) {
        const saved =
          await fetchJson(
            ADVANTAGES_API,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                cleanAdvantage({
                  ...defaults.advantages[
                    index
                  ],
                  displayOrder:
                    index,
                })
              ),
            }
          );

        savedAdvantages.push({
          ...saved,
          _editorKey:
            defaults.advantages[
              index
            ]._editorKey,
        });
      }

      setContent(
        clone(defaults.content)
      );

      setServiceItems(
        prepareCollection(
          savedServices,
          "service"
        )
      );

      setValueItems(
        prepareCollection(
          savedValues,
          "value"
        )
      );

      setAdvantages(
        prepareCollection(
          savedAdvantages,
          "advantage"
        )
      );

      setBackendServiceIds(
        savedServices
          .map((item) => item.id)
          .filter(
            (id) =>
              id !== null &&
              id !== undefined
          )
      );

      setBackendValueIds(
        savedValues
          .map((item) => item.id)
          .filter(
            (id) =>
              id !== null &&
              id !== undefined
          )
      );

      setBackendAdvantageIds(
        savedAdvantages
          .map((item) => item.id)
          .filter(
            (id) =>
              id !== null &&
              id !== undefined
          )
      );

      setMessage(
        "Services defaults restored successfully."
      );
    } catch (resetError) {
      console.error(
        "Failed to reset Services defaults:",
        resetError
      );

      setError(
        resetError?.message ||
          "Unable to reset Services defaults."
      );
    } finally {
      setResetting(false);
    }
  };

  /* =========================================================
     STATS
  ========================================================= */

  const enabledServicesCount =
    useMemo(
      () =>
        serviceItems.filter(
          (item) => item.enabled
        ).length,
      [serviceItems]
    );

  const enabledValuesCount =
    useMemo(
      () =>
        valueItems.filter(
          (item) => item.enabled
        ).length,
      [valueItems]
    );

  const enabledAdvantagesCount =
    useMemo(
      () =>
        advantages.filter(
          (item) => item.enabled
        ).length,
      [advantages]
    );

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex min-h-screen items-center justify-center px-5">
          <div className="flex flex-col items-center text-center">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-slate-900
                text-[#d7b44d]
              "
            >
              <Loader2
                size={25}
                className="animate-spin"
              />
            </div>

            <h2 className="mt-5 text-lg font-black text-slate-900">
              Loading Services CMS
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fetching Services content from the backend...
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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-slate-200
          bg-white/95
          backdrop-blur
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1600px]
            flex-col
            gap-4
            px-4
            py-4
            sm:px-6
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/dashboard")
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                transition
                hover:border-[#c9a03b]
                hover:text-[#b28a20]
              "
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-base font-black text-slate-900 sm:text-lg">
                Saam Infrastructure
              </p>

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Services
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              disabled={saving || resetting}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-bold
                text-slate-700
                transition
                hover:border-[#c9a03b]
                hover:text-[#b28a20]
                disabled:opacity-50
              "
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={() =>
                saveEverything()
              }
              disabled={
                saving ||
                resetting
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-900
                px-4
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}
              {saving
                ? "Saving..."
                : "Save All"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {/* =====================================================
            PAGE INTRO
        ===================================================== */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            bg-slate-900
            shadow-xl
          "
        >
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-[#c9a03b]/10
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-32
                -left-20
                h-72
                w-72
                rounded-full
                bg-[#c9a03b]/5
                blur-3xl
              "
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="h-1 w-12 rounded-full bg-[#c9a03b]" />

                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d7b44d]">
                  Website Management
                </p>
              </div>

              <div className="mt-5 max-w-4xl">
                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Services Page CMS
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  Manage the complete Services page content,
                  service cards, service points, value strip,
                  advantages and CTA directly from the CMS.
                </p>
              </div>

              {/* SUMMARY */}

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d7b44d]">
                    Services
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {enabledServicesCount}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Visible service cards
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d7b44d]">
                    Value Steps
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {enabledValuesCount}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Visible value items
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d7b44d]">
                    Advantages
                  </p>

                  <p className="mt-2 text-2xl font-black text-white">
                    {enabledAdvantagesCount}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Visible advantages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MESSAGES
        ===================================================== */}

        {message && (
          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3
              text-sm
              text-emerald-700
            "
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{message}</p>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="ml-auto shrink-0"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {error && (
          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            "
          >
            <X
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto shrink-0"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* =====================================================
            CMS SECTIONS
        ===================================================== */}

        <div className="mt-6 space-y-5">
          {/* ===================================================
              01 VISIBILITY
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={1}
              eyebrow="Page Settings"
              title="Page Visibility"
              description="Control whether the Services page is visible on the public website."
              open={openSections.visibility}
              onToggle={() =>
                toggleSection("visibility")
              }
            />

            {openSections.visibility && (
              <div className="mt-6">
                <Toggle
                  label="Show Services Page"
                  checked={Boolean(
                    content.enabled
                  )}
                  onChange={(value) =>
                    setContent((current) => ({
                      ...current,
                      enabled: value,
                    }))
                  }
                  description="When disabled, the public Services page can be hidden without deleting its content."
                />
              </div>
            )}
          </section>

          {/* ===================================================
              02 HERO
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={2}
              eyebrow="Hero Section"
              title="Hero Content"
              description="Edit the main heading and introductory text shown at the top of the Services page."
              open={openSections.hero}
              onToggle={() =>
                toggleSection("hero")
              }
            />

            {openSections.hero && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextField
                  label="Hero Label"
                  value={
                    content.heroLabel
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        heroLabel: value,
                      })
                    )
                  }
                />

                <TextField
                  label="Hero Heading"
                  value={
                    content.heroHeading
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        heroHeading: value,
                      })
                    )
                  }
                />

                <div className="md:col-span-2">
                  <TextField
                    label="Hero Heading Highlight"
                    value={
                      content.heroHeadingHighlight
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          heroHeadingHighlight:
                            value,
                        })
                      )
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <TextArea
                    label="Hero Description"
                    value={
                      content.heroDescription
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          heroDescription:
                            value,
                        })
                      )
                    }
                    rows={5}
                  />
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              03 WHAT WE DO
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={3}
              eyebrow="What We Do"
              title="What We Do Content"
              description="Manage the heading, supporting card content and description for the What We Do section."
              open={openSections.whatWeDo}
              onToggle={() =>
                toggleSection("whatWeDo")
              }
            />

            {openSections.whatWeDo && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextField
                  label="Section Label"
                  value={
                    content.whatWeDoLabel
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        whatWeDoLabel:
                          value,
                      })
                    )
                  }
                />

                <TextField
                  label="Heading"
                  value={
                    content.whatWeDoHeading
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        whatWeDoHeading:
                          value,
                      })
                    )
                  }
                />

                <div className="md:col-span-2">
                  <TextField
                    label="Heading Highlight"
                    value={
                      content.whatWeDoHeadingHighlight
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          whatWeDoHeadingHighlight:
                            value,
                        })
                      )
                    }
                  />
                </div>

                <TextField
                  label="Card Label"
                  value={
                    content.whatWeDoCardLabel
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        whatWeDoCardLabel:
                          value,
                      })
                    )
                  }
                />

                <div />

                <div className="md:col-span-2">
                  <TextArea
                    label="Card Description"
                    value={
                      content.whatWeDoCardDescription
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          whatWeDoCardDescription:
                            value,
                        })
                      )
                    }
                    rows={5}
                  />
                </div>

                <div className="md:col-span-2">
                  <TextArea
                    label="Secondary Description"
                    value={
                      content.whatWeDoSecondaryDescription
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          whatWeDoSecondaryDescription:
                            value,
                        })
                      )
                    }
                    rows={4}
                  />
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              04 VALUE ITEMS
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={4}
              eyebrow="Value Strip"
              title="Plan • Build • Deliver"
              description="Manage the repeatable value items shown below the What We Do section."
              open={openSections.values}
              onToggle={() =>
                toggleSection("values")
              }
            />

            {openSections.values && (
              <div className="mt-6">
                <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {valueItems.length} Value Items
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Add, edit, reorder or hide individual items.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addValueItem}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-slate-900
                      px-4
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-slate-800
                    "
                  >
                    <Plus size={17} />
                    Add Value Item
                  </button>
                </div>

                <div className="space-y-4">
                  {valueItems.length === 0 ? (
                    <EmptyState
                      title="No value items"
                      description="Add a Plan, Build, Deliver item or another value item."
                      actionLabel="Add Value Item"
                      onAction={addValueItem}
                    />
                  ) : (
                    valueItems.map(
                      (item, index) => (
                        <ValueItemEditor
                          key={
                            item._editorKey
                          }
                          item={item}
                          index={index}
                          onChange={(next) =>
                            updateValueItem(
                              index,
                              next
                            )
                          }
                          onDelete={() =>
                            deleteValueItem(
                              index
                            )
                          }
                          onMoveUp={() =>
                            moveValueItem(
                              index,
                              "up"
                            )
                          }
                          onMoveDown={() =>
                            moveValueItem(
                              index,
                              "down"
                            )
                          }
                          canMoveUp={
                            index > 0
                          }
                          canMoveDown={
                            index <
                            valueItems.length -
                              1
                          }
                        />
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              05 EXPERTISE
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={5}
              eyebrow="Our Expertise"
              title="Expertise Content"
              description="Edit the heading and supporting text displayed above the Services grid."
              open={openSections.expertise}
              onToggle={() =>
                toggleSection("expertise")
              }
            />

            {openSections.expertise && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextField
                  label="Section Label"
                  value={
                    content.expertiseLabel
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        expertiseLabel:
                          value,
                      })
                    )
                  }
                />

                <TextField
                  label="Heading"
                  value={
                    content.expertiseHeading
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        expertiseHeading:
                          value,
                      })
                    )
                  }
                />

                <div className="md:col-span-2">
                  <TextField
                    label="Heading Highlight"
                    value={
                      content.expertiseHeadingHighlight
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          expertiseHeadingHighlight:
                            value,
                        })
                      )
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <TextArea
                    label="Description"
                    value={
                      content.expertiseDescription
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          expertiseDescription:
                            value,
                        })
                      )
                    }
                    rows={5}
                  />
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              06 SERVICES
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={6}
              eyebrow="Services Grid"
              title="Service Cards"
              description="Add unlimited service cards, choose their icons, edit descriptions and manage their individual points."
              open={openSections.services}
              onToggle={() =>
                toggleSection("services")
              }
            />

            {openSections.services && (
              <div className="mt-6">
                <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {serviceItems.length} Service Cards
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Drag/order controls, enable/disable and unlimited points are supported.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addService}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-slate-900
                      px-4
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-slate-800
                    "
                  >
                    <Plus size={17} />
                    Add Service
                  </button>
                </div>

                <div className="space-y-5">
                  {serviceItems.length === 0 ? (
                    <EmptyState
                      title="No services yet"
                      description="Add your first service card to start building the Services page."
                      actionLabel="Add Service"
                      onAction={addService}
                    />
                  ) : (
                    serviceItems.map(
                      (item, index) => (
                        <ServiceEditor
                          key={
                            item._editorKey
                          }
                          item={item}
                          index={index}
                          onChange={(next) =>
                            updateService(
                              index,
                              next
                            )
                          }
                          onDelete={() =>
                            deleteService(
                              index
                            )
                          }
                          onMoveUp={() =>
                            moveService(
                              index,
                              "up"
                            )
                          }
                          onMoveDown={() =>
                            moveService(
                              index,
                              "down"
                            )
                          }
                          canMoveUp={
                            index > 0
                          }
                          canMoveDown={
                            index <
                            serviceItems.length -
                              1
                          }
                        />
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              07 WHY CHOOSE
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={7}
              eyebrow="Why Choose Us"
              title="Why Choose Us Content"
              description="Manage the heading and supporting content for the dark Why Choose Us section."
              open={openSections.whyChoose}
              onToggle={() =>
                toggleSection("whyChoose")
              }
            />

            {openSections.whyChoose && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <TextField
                  label="Section Label"
                  value={
                    content.whyChooseLabel
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        whyChooseLabel:
                          value,
                      })
                    )
                  }
                />

                <TextField
                  label="Heading"
                  value={
                    content.whyChooseHeading
                  }
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        whyChooseHeading:
                          value,
                      })
                    )
                  }
                />

                <div className="md:col-span-2">
                  <TextField
                    label="Heading Highlight"
                    value={
                      content.whyChooseHeadingHighlight
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          whyChooseHeadingHighlight:
                            value,
                        })
                      )
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <TextArea
                    label="Description"
                    value={
                      content.whyChooseDescription
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          whyChooseDescription:
                            value,
                        })
                      )
                    }
                    rows={5}
                  />
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              08 ADVANTAGES
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={8}
              eyebrow="Why Choose Us Cards"
              title="Advantage Cards"
              description="Manage the individual cards such as Quality Workmanship, Safety First and Timely Execution."
              open={openSections.advantages}
              onToggle={() =>
                toggleSection("advantages")
              }
            />

            {openSections.advantages && (
              <div className="mt-6">
                <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {advantages.length} Advantage Cards
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Add unlimited advantages and control their order and visibility.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addAdvantage}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-slate-900
                      px-4
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-slate-800
                    "
                  >
                    <Plus size={17} />
                    Add Advantage
                  </button>
                </div>

                <div className="space-y-5">
                  {advantages.length === 0 ? (
                    <EmptyState
                      title="No advantages yet"
                      description="Add a card explaining why clients should choose Saam Infrastructure."
                      actionLabel="Add Advantage"
                      onAction={addAdvantage}
                    />
                  ) : (
                    advantages.map(
                      (item, index) => (
                        <AdvantageEditor
                          key={
                            item._editorKey
                          }
                          item={item}
                          index={index}
                          onChange={(next) =>
                            updateAdvantage(
                              index,
                              next
                            )
                          }
                          onDelete={() =>
                            deleteAdvantage(
                              index
                            )
                          }
                          onMoveUp={() =>
                            moveAdvantage(
                              index,
                              "up"
                            )
                          }
                          onMoveDown={() =>
                            moveAdvantage(
                              index,
                              "down"
                            )
                          }
                          canMoveUp={
                            index > 0
                          }
                          canMoveDown={
                            index <
                            advantages.length -
                              1
                          }
                        />
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </section>

          {/* ===================================================
              09 CTA
          =================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <SectionHeader
              number={9}
              eyebrow="CTA Section"
              title="Services CTA"
              description="Control the final call-to-action displayed at the bottom of the Services page."
              open={openSections.cta}
              onToggle={() =>
                toggleSection("cta")
              }
            />

            {openSections.cta && (
              <div className="mt-6 space-y-5">
                <Toggle
                  label="Show CTA Section"
                  checked={Boolean(
                    content.ctaEnabled
                  )}
                  onChange={(value) =>
                    setContent(
                      (current) => ({
                        ...current,
                        ctaEnabled:
                          value,
                      })
                    )
                  }
                  description="Hide the Services page CTA without deleting its content."
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="CTA Label"
                    value={
                      content.ctaLabel
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          ctaLabel:
                            value,
                        })
                      )
                    }
                  />

                  <TextField
                    label="Button Text"
                    value={
                      content.ctaButtonText
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          ctaButtonText:
                            value,
                        })
                      )
                    }
                  />

                  <TextField
                    label="CTA Heading"
                    value={
                      content.ctaHeading
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          ctaHeading:
                            value,
                        })
                      )
                    }
                  />

                  <TextField
                    label="CTA Heading Highlight"
                    value={
                      content.ctaHeadingHighlight
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          ctaHeadingHighlight:
                            value,
                        })
                      )
                    }
                  />

                  <TextField
                    label="Button Link"
                    value={
                      content.ctaButtonLink
                    }
                    onChange={(value) =>
                      setContent(
                        (current) => ({
                          ...current,
                          ctaButtonLink:
                            value,
                        })
                      )
                    }
                    placeholder="/contact"
                  />

                  <div />

                  <div className="md:col-span-2">
                    <TextArea
                      label="CTA Description"
                      value={
                        content.ctaDescription
                      }
                      onChange={(value) =>
                        setContent(
                          (current) => ({
                            ...current,
                            ctaDescription:
                              value,
                          })
                        )
                      }
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* =====================================================
            BOTTOM ACTIONS
        ===================================================== */}

        <section
          className="
            sticky
            bottom-4
            z-30
            mt-8
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white/95
            p-4
            shadow-xl
            backdrop-blur
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-5
          "
        >
          <div>
            <p className="text-sm font-black text-slate-900">
              Save your Services changes
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Save All updates the page content and all Services, Value Items and Advantage Cards.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={resetDefaults}
              disabled={
                saving ||
                resetting
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-bold
                text-red-600
                transition
                hover:bg-red-50
                disabled:opacity-50
              "
            >
              {resetting ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <RefreshCw size={16} />
              )}

              {resetting
                ? "Resetting..."
                : "Reset Defaults"}
            </button>

            <button
              type="button"
              onClick={() =>
                saveEverything()
              }
              disabled={
                saving ||
                resetting
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-slate-800
                disabled:opacity-60
              "
            >
              {saving ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              {saving
                ? "Saving..."
                : "Save All"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}