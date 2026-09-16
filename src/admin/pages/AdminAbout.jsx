import { useEffect, useState } from "react";

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
  Handshake,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import aboutConstruction from "../../assets/images/about-construction.jpg";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const ABOUT_API = `${API_BASE_URL}/api/about-page`;
const UPLOAD_API = `${API_BASE_URL}/api/images/upload`;

/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  enabled: true,

  heroLabel: "About Us",
  heroHeading: "Building with purpose.",
  heroHeadingHighlight: "Delivering with precision.",
  heroDescription:
    "Saam Infrastructure delivers dependable construction and infrastructure solutions with quality, precision, safety and long-term value at the core.",

  whoWeAreImage: "/about-construction.jpg",
  whoWeAreImageAlt: "Saam Infrastructure construction site",
  whoWeAreLabel: "Who We Are",
  whoWeAreHeading: "Infrastructure built for the future.",
  whoWeAreHeadingHighlight: "",
  whoWeAreParagraph1:
    "Saam Infrastructure is committed to delivering reliable construction and infrastructure solutions that combine engineering expertise, quality workmanship and thoughtful execution.",
  whoWeAreParagraph2:
    "From planning and development to execution and completion, we focus on creating durable spaces and infrastructure that meet the needs of our clients and deliver lasting value.",
  whoWeAreButtonText: "Our Vision & Mission",
  whoWeAreButtonLink: "#vision",

  visionMissionLabel: "Vision & Mission",
  visionMissionHeading: "Creating infrastructure",
  visionMissionHeadingHighlight: "that makes a difference.",
  visionMissionDescription:
    "Our vision and mission guide the way we approach every project, partnership and construction challenge.",

  historyLabel: "Our History",
  historyHeading: "Growing through",
  historyHeadingHighlight: "every project.",
  historyDescription:
    "Our journey is built around a simple commitment — delivering dependable construction solutions and building relationships that last.",

  approachLabel: "Our Approach",
  approachHeading: "Built on strong",
  approachHeadingHighlight: "foundations.",
  approachDescription:
    "Every project begins with careful planning, responsible execution and a clear understanding of our client's goals.",

  teamLabel: "Our Team",
  teamHeading: "The people behind",
  teamHeadingHighlight: "our projects.",
  teamDescription:
    "Our team brings together experience, technical knowledge and a shared commitment to delivering dependable project outcomes.",

  bottomStatementLabel: "Saam Infrastructure",
  bottomStatementHeading: "Built with purpose.",
  bottomStatementHighlight: "Delivered with precision.",
};

/* =========================================================
   DEFAULT FEATURES
========================================================= */

const DEFAULT_FEATURES = [
  {
    title: "Quality",
    description: "High standards at every stage of construction.",
    icon: "CheckCircle2",
    enabled: true,
    displayOrder: 0,
  },
  {
    title: "Reliability",
    description: "Dependable planning and project execution.",
    icon: "Award",
    enabled: true,
    displayOrder: 1,
  },
  {
    title: "Safety",
    description: "Responsible practices with safety at the core.",
    icon: "ShieldCheck",
    enabled: true,
    displayOrder: 2,
  },
  {
    title: "Long-Term Value",
    description: "Solutions designed for durability and performance.",
    icon: "Target",
    enabled: true,
    displayOrder: 3,
  },
];

/* =========================================================
   DEFAULT LEADERS
========================================================= */

const DEFAULT_LEADERS = [
  {
    name: "Sachin Lihitkar",
    role: "Managing Director & Founder",
    image: "https://i.pravatar.cc/900?img=12",
    imagePosition: "center center",
    description:
      "Leading Saam Infrastructure with a clear vision for quality construction, professional execution and long-term growth.",
    statement:
      "With a strong focus on quality, client satisfaction and responsible execution, Sachin provides strategic direction across projects and ensures that every decision reflects the values of reliability, safety and integrity.",
    enabled: true,
    displayOrder: 0,
  },
  {
    name: "Ashwini Lihitkar",
    role: "Co-Founder",
    image: "https://i.pravatar.cc/900?img=47",
    imagePosition: "center center",
    description:
      "Supporting the growth of Saam Infrastructure through coordination, strong values and a commitment to dependable project delivery.",
    statement:
      "Ashwini contributes to the company's growth with a focus on collaboration, organisation and maintaining the professional standards that define the Saam Infrastructure approach.",
    enabled: true,
    displayOrder: 1,
  },
];

/* =========================================================
   DEFAULT VISION / MISSION
========================================================= */

const DEFAULT_VISION_MISSION = [
  {
    type: "vision",
    label: "Our Vision",
    title: "Building a stronger tomorrow.",
    text:
      "To become a trusted name in construction and infrastructure by creating high-quality, sustainable and dependable spaces that contribute to the growth and development of communities.",
    icon: "Eye",
    enabled: true,
    displayOrder: 0,
  },
  {
    type: "mission",
    label: "Our Mission",
    title: "Delivering with purpose.",
    text:
      "To deliver construction and infrastructure projects with quality workmanship, responsible practices, transparent communication and dependable execution while creating lasting value for our clients.",
    icon: "Target",
    enabled: true,
    displayOrder: 1,
  },
];

/* =========================================================
   DEFAULT HISTORY
========================================================= */

const DEFAULT_HISTORY = [
  {
    year: "01",
    title: "Foundation",
    text:
      "Saam Infrastructure began with a focus on providing reliable construction and infrastructure solutions with quality at the centre of every project.",
    enabled: true,
    displayOrder: 0,
  },
  {
    year: "02",
    title: "Building Experience",
    text:
      "With every project, we continued strengthening our capabilities through practical experience, responsible execution and close client collaboration.",
    enabled: true,
    displayOrder: 1,
  },
  {
    year: "03",
    title: "Expanding Capabilities",
    text:
      "Our growing experience allowed us to take on diverse construction, development and infrastructure requirements.",
    enabled: true,
    displayOrder: 2,
  },
  {
    year: "04",
    title: "Looking Ahead",
    text:
      "We continue to build towards a future focused on innovation, quality, sustainability and long-term value.",
    enabled: true,
    displayOrder: 3,
  },
];

/* =========================================================
   DEFAULT APPROACH
========================================================= */

const DEFAULT_APPROACH = [
  {
    number: "01",
    title: "Quality First",
    text:
      "We maintain high standards of workmanship and attention to detail throughout every project.",
    icon: "Sparkles",
    enabled: true,
    displayOrder: 0,
  },
  {
    number: "02",
    title: "Client Focus",
    text:
      "We work closely with our clients to understand their goals and deliver practical solutions.",
    icon: "Handshake",
    enabled: true,
    displayOrder: 1,
  },
  {
    number: "03",
    title: "Responsible Execution",
    text:
      "Our projects are approached with safety, coordination and dependable execution at every stage.",
    icon: "Shield",
    enabled: true,
    displayOrder: 2,
  },
  {
    number: "04",
    title: "Lasting Value",
    text:
      "We aim to create durable infrastructure that delivers value long after project completion.",
    icon: "TrendingUp",
    enabled: true,
    displayOrder: 3,
  },
];

/* =========================================================
   DEFAULT TEAM
========================================================= */

const DEFAULT_TEAM = [
  {
    name: "Rajesh Sharma",
    role: "Project Director",
    image: "https://i.pravatar.cc/700?img=11",
    description:
      "Experienced in project planning, coordination and ensuring successful project execution.",
    enabled: true,
    displayOrder: 0,
  },
  {
    name: "Amit Patil",
    role: "Project Manager",
    image: "https://i.pravatar.cc/700?img=13",
    description:
      "Focused on efficient project management, coordination and maintaining construction standards.",
    enabled: true,
    displayOrder: 1,
  },
  {
    name: "Priya Deshmukh",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/700?img=47",
    description:
      "Responsible for smooth operations, team coordination and dependable project delivery.",
    enabled: true,
    displayOrder: 2,
  },
  {
    name: "Sandeep Kulkarni",
    role: "Senior Project Engineer",
    image: "https://i.pravatar.cc/700?img=68",
    description:
      "Bringing technical expertise, attention to detail and practical engineering knowledge.",
    enabled: true,
    displayOrder: 3,
  },
];

/* =========================================================
   ICON OPTIONS
========================================================= */

const ICON_OPTIONS = [
  "CheckCircle2",
  "Award",
  "ShieldCheck",
  "Target",
  "Eye",
  "Sparkles",
  "Handshake",
  "Shield",
  "TrendingUp",
];


/* =========================================================
   HELPERS
========================================================= */

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function createEditorKey(prefix = "item") {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function ensureEditorKey(item, prefix, index = 0) {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    _editorKey:
      item._editorKey ||
      (item.id
        ? `${prefix}-db-${item.id}`
        : createEditorKey(`${prefix}-${index}`)),
  };
}

function resolveImageUrl(value) {
  if (!value) return "";

  const url = String(value).trim();

  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  if (url === "/about-construction.jpg") {
    return aboutConstruction;
  }

  if (url.startsWith("/images/")) {
    return `${API_BASE_URL}${url}`;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return url;
}

function itemSignature(item) {
  if (!item || typeof item !== "object") return "";

  const keys = [
    "type",
    "label",
    "title",
    "text",
    "description",
    "statement",
    "name",
    "role",
    "image",
    "imagePosition",
    "year",
    "number",
    "icon",
  ];

  return keys
    .map((key) => String(item[key] ?? "").trim().toLowerCase())
    .join("|");
}

function cleanCollection(data) {
  if (!Array.isArray(data)) return { items: [], ids: [] };

  const ids = data
    .map((item) => Number(item?.id))
    .filter(Number.isFinite);

  const seen = new Set();
  const items = [];

  [...data]
    .filter((item) => item)
    .sort(
      (a, b) =>
        Number(a.displayOrder ?? 0) - Number(b.displayOrder ?? 0) ||
        Number(a.id ?? 0) - Number(b.id ?? 0)
    )
    .forEach((item) => {
      const signature = itemSignature(item);

      // Keep disabled items in Admin so the administrator can re-enable them.
      // Remove only exact duplicate records.
      if (signature && seen.has(signature)) return;

      if (signature) seen.add(signature);
      items.push(
        ensureEditorKey(
          item,
          "cms",
          items.length
        )
      );
    });

  return {
    items: normalizeOrder(items),
    ids,
  };
}

function sortItems(items) {
  return [...items].sort(
    (a, b) =>
      Number(a.displayOrder ?? 0) -
      Number(b.displayOrder ?? 0)
  );
}

function normalizeOrder(items) {
  if (!Array.isArray(items)) return [];

  return sortItems(items).map((item, index) => ({
    ...item,
    displayOrder: index,
  }));
}


/* =========================================================
   RESET / SELECT / ICON PREVIEW HELPERS
========================================================= */

function prepareCollection(items, prefix) {
  return cloneData(items).map((item, index) =>
    ensureEditorKey(item, prefix, index)
  );
}

function SelectField({
  label,
  value,
  options = [],
  onChange,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function IconPreview({ name }) {
  return (
    <div className="flex min-h-[46px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-[#B28A20]">
      <CmsIcon name={name} size={20} />
      <span className="text-sm font-bold text-slate-600">
        Icon Preview
      </span>
    </div>
  );
}

/* =========================================================
   ICON COMPONENT
========================================================= */

function CmsIcon({ name, size = 18 }) {
  switch (name) {
    case "Award":
      return <Award size={size} />;
    case "ShieldCheck":
      return <ShieldCheck size={size} />;
    case "Target":
      return <Target size={size} />;
    case "Eye":
      return <Eye size={size} />;
    case "Sparkles":
      return <Sparkles size={size} />;
    case "Handshake":
      return <Handshake size={size} />;
    case "Shield":
      return <Shield size={size} />;
    case "TrendingUp":
      return <TrendingUp size={size} />;
    case "CheckCircle2":
    default:
      return <CheckCircle2 size={size} />;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminAbout() {
  const navigate = useNavigate();

  const [content, setContent] = useState(
    cloneData(DEFAULT_CONTENT)
  );

  const [contentId, setContentId] = useState(null);

  const [features, setFeatures] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [visionMission, setVisionMission] = useState([]);
  const [history, setHistory] = useState([]);
  const [approach, setApproach] = useState([]);
  const [team, setTeam] = useState([]);

  // IDs currently present in the database. Used to reconcile deletions and
  // remove old duplicate rows after a Save All.
  const [backendIds, setBackendIds] = useState({
    features: [],
    leaders: [],
    visionMission: [],
    history: [],
    approach: [],
    team: [],
  });

  const [loading, setLoading] = useState(true);
  const [savingContent, setSavingContent] = useState(false);
  const [savingCollections, setSavingCollections] =
    useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [openSections, setOpenSections] = useState({
    general: true,
    hero: true,
    who: true,
    features: true,
    leadership: true,
    visionText: true,
    vision: true,
    historyText: true,
    history: true,
    approachText: true,
    approach: true,
    teamText: true,
    team: true,
    bottom: true,
  });

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    setError("");

    try {
      const responses = await Promise.all([
        fetch(ABOUT_API),
        fetch(`${ABOUT_API}/features`),
        fetch(`${ABOUT_API}/leaders`),
        fetch(`${ABOUT_API}/vision-mission`),
        fetch(`${ABOUT_API}/history`),
        fetch(`${ABOUT_API}/approach`),
        fetch(`${ABOUT_API}/team`),
      ]);

      const [
        contentResponse,
        featureResponse,
        leaderResponse,
        visionResponse,
        historyResponse,
        approachResponse,
        teamResponse,
      ] = responses;

      if (contentResponse.ok) {
        const data = await contentResponse.json();

        setContent({
          ...cloneData(DEFAULT_CONTENT),
          ...data,
        });

        setContentId(data.id ?? null);
      } else {
        setContent(cloneData(DEFAULT_CONTENT));
        setContentId(null);
      }

      const collectionResults = [
        featureResponse.ok
          ? await featureResponse.json()
          : [],
        leaderResponse.ok
          ? await leaderResponse.json()
          : [],
        visionResponse.ok
          ? await visionResponse.json()
          : [],
        historyResponse.ok
          ? await historyResponse.json()
          : [],
        approachResponse.ok
          ? await approachResponse.json()
          : [],
        teamResponse.ok
          ? await teamResponse.json()
          : [],
      ];

      const [
        featureResult,
        leaderResult,
        visionResult,
        historyResult,
        approachResult,
        teamResult,
      ] = collectionResults.map(cleanCollection);

      setFeatures(featureResult.items);
      setLeaders(leaderResult.items);
      setVisionMission(visionResult.items);
      setHistory(historyResult.items);
      setApproach(approachResult.items);
      setTeam(teamResult.items);

      setBackendIds({
        features: featureResult.ids,
        leaders: leaderResult.ids,
        visionMission: visionResult.ids,
        history: historyResult.ids,
        approach: approachResult.ids,
        team: teamResult.ids,
      });

    } catch (err) {
      console.error(err);

      setError(
        "Could not connect to the About Page backend. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     GENERAL HELPERS
  ======================================================= */

  function toggleSection(section) {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function updateContent(field, value) {
    setContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateItem(setter, item, field, value) {
    setter((prev) =>
      prev.map((x) => {
        const sameId =
          item?.id != null &&
          x?.id != null &&
          Number(x.id) === Number(item.id);

        const sameEditorKey =
          item?._editorKey &&
          x?._editorKey &&
          x._editorKey === item._editorKey;

        return sameId || sameEditorKey
          ? {
              ...x,
              [field]: value,
            }
          : x;
      })
    );
  }

  function moveItem(setter, items, index, direction) {
    const sorted = normalizeOrder(items);

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= sorted.length
    ) {
      return;
    }

    [sorted[index], sorted[targetIndex]] = [
      sorted[targetIndex],
      sorted[index],
    ];

    setter(
      sorted.map((item, itemIndex) => ({
        ...item,
        displayOrder: itemIndex,
      }))
    );
  }

  function removeLocalItem(setter, items, itemOrIndex) {
    const sorted = normalizeOrder(items);

    let index =
      typeof itemOrIndex === "number"
        ? itemOrIndex
        : sorted.findIndex((candidate) => {
            if (
              itemOrIndex?.id != null &&
              candidate?.id != null
            ) {
              return (
                Number(candidate.id) ===
                Number(itemOrIndex.id)
              );
            }

            return (
              candidate?._editorKey &&
              itemOrIndex?._editorKey &&
              candidate._editorKey ===
                itemOrIndex._editorKey
            );
          });

    if (index < 0 || index >= sorted.length) {
      return;
    }

    sorted.splice(index, 1);

    setter(
      sorted.map((item, itemIndex) => ({
        ...item,
        displayOrder: itemIndex,
      }))
    );
  }

  /* =======================================================
     SAVE COLLECTION
  ======================================================= */

  function isMeaningfulItem(item, endpoint) {
    if (!item || typeof item !== "object") return false;

    const fieldsByEndpoint = {
      features: ["title", "description", "icon"],
      leaders: ["name", "role", "image", "description", "statement"],
      "vision-mission": ["type", "label", "title", "text", "icon"],
      history: ["year", "title", "text"],
      approach: ["number", "title", "text", "icon"],
      team: ["name", "role", "image", "description"],
    };

    return (fieldsByEndpoint[endpoint] || []).some(
      (field) => String(item[field] ?? "").trim() !== ""
    );
  }

  async function saveCollection(items, endpoint, label, backendKey) {
    const ordered = normalizeOrder(items).filter((item) =>
      isMeaningfulItem(item, endpoint)
    );

    const savedItems = [];

    for (const item of ordered) {
      const numericId = Number(item?.id);
      const hasId = Number.isFinite(numericId);
      const itemData = { ...item };
      delete itemData._editorKey;

      const payload = {
        ...itemData,
        displayOrder: savedItems.length,
      };

      const response = await fetch(
        hasId
          ? `${ABOUT_API}/${endpoint}/${numericId}`
          : `${ABOUT_API}/${endpoint}`,
        {
          method: hasId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          body || `Failed to save ${label}. Server returned ${response.status}.`
        );
      }

      savedItems.push(await response.json());
    }

    const savedIds = savedItems
      .map((item) => Number(item?.id))
      .filter(Number.isFinite);

    // Delete database records that are no longer represented in the editor.
    // This also removes older duplicate rows left by previous CMS versions.
    const oldIds = backendIds[backendKey] || [];
    const idsToDelete = oldIds.filter((id) => !savedIds.includes(id));

    for (const id of idsToDelete) {
      const response = await fetch(`${ABOUT_API}/${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 404) {
        throw new Error(
          `Failed to remove old ${label} record (ID ${id}).`
        );
      }
    }

    setBackendIds((previous) => ({
      ...previous,
      [backendKey]: savedIds,
    }));

    return savedItems;
  }

  /* =======================================================
     CONTENT PAYLOAD
  ======================================================= */

  function buildContentPayload(value) {
    const source = value || {};

    return {
      enabled: Boolean(source.enabled),
      heroLabel: source.heroLabel || "",
      heroHeading: source.heroHeading || "",
      heroHeadingHighlight: source.heroHeadingHighlight || "",
      heroDescription: source.heroDescription || "",
      whoWeAreImage: source.whoWeAreImage || "",
      whoWeAreImageAlt: source.whoWeAreImageAlt || "",
      whoWeAreLabel: source.whoWeAreLabel || "",
      whoWeAreHeading: source.whoWeAreHeading || "",
      whoWeAreHeadingHighlight: source.whoWeAreHeadingHighlight || "",
      whoWeAreParagraph1: source.whoWeAreParagraph1 || "",
      whoWeAreParagraph2: source.whoWeAreParagraph2 || "",
      whoWeAreButtonText: source.whoWeAreButtonText || "",
      whoWeAreButtonLink: source.whoWeAreButtonLink || "",
      visionMissionLabel: source.visionMissionLabel || "",
      visionMissionHeading: source.visionMissionHeading || "",
      visionMissionHeadingHighlight: source.visionMissionHeadingHighlight || "",
      visionMissionDescription: source.visionMissionDescription || "",
      historyLabel: source.historyLabel || "",
      historyHeading: source.historyHeading || "",
      historyHeadingHighlight: source.historyHeadingHighlight || "",
      historyDescription: source.historyDescription || "",
      approachLabel: source.approachLabel || "",
      approachHeading: source.approachHeading || "",
      approachHeadingHighlight: source.approachHeadingHighlight || "",
      approachDescription: source.approachDescription || "",
      teamLabel: source.teamLabel || "",
      teamHeading: source.teamHeading || "",
      teamHeadingHighlight: source.teamHeadingHighlight || "",
      teamDescription: source.teamDescription || "",
      bottomStatementLabel: source.bottomStatementLabel || "",
      bottomStatementHeading: source.bottomStatementHeading || "",
      bottomStatementHighlight: source.bottomStatementHighlight || "",
    };
  }

  async function readResponseMessage(response) {
    const raw = await response.text();
    if (!raw) return `Server returned ${response.status} ${response.statusText}.`;
    try {
      const parsed = JSON.parse(raw);
      return parsed.message || parsed.error || parsed.detail || parsed.title || raw;
    } catch {
      return raw;
    }
  }

  /* =======================================================
     SAVE EVERYTHING
  ======================================================= */

  async function saveEverything(overrideData = null) {
    if (savingContent || savingCollections) return;

    setSavingContent(true);
    setSavingCollections(true);
    setMessage("");
    setError("");

    try {
      /*
       * React passes the click event to an onClick handler.
       * The Save All button uses onClick={saveEverything}, so the first
       * argument can be a MouseEvent rather than our optional override data.
       * Only accept an override object when it contains the About CMS shape.
       */
      const isAboutDataOverride =
        overrideData &&
        typeof overrideData === "object" &&
        !Array.isArray(overrideData) &&
        (Object.prototype.hasOwnProperty.call(overrideData, "content") ||
          Object.prototype.hasOwnProperty.call(overrideData, "features") ||
          Object.prototype.hasOwnProperty.call(overrideData, "leaders") ||
          Object.prototype.hasOwnProperty.call(overrideData, "visionMission") ||
          Object.prototype.hasOwnProperty.call(overrideData, "history") ||
          Object.prototype.hasOwnProperty.call(overrideData, "approach") ||
          Object.prototype.hasOwnProperty.call(overrideData, "team"));

      const dataToSave = isAboutDataOverride
        ? overrideData
        : {
            content,
            features,
            leaders,
            visionMission,
            history,
            approach,
            team,
          };

      const contentPayload = buildContentPayload(dataToSave.content);
      const numericContentId = Number(contentId);
      const hasContentId = Number.isFinite(numericContentId) && numericContentId > 0;

      let contentResponse;

      if (hasContentId) {
        contentResponse = await fetch(`${ABOUT_API}/${numericContentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(contentPayload),
        });

        if (contentResponse.status === 404) {
          contentResponse = await fetch(ABOUT_API, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(contentPayload),
          });
        }
      } else {
        contentResponse = await fetch(ABOUT_API, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(contentPayload),
        });
      }

      if (!contentResponse.ok) {
        const message = await readResponseMessage(contentResponse);
        throw new Error(`About Page content save failed: ${message}`);
      }

      const savedContent = await contentResponse.json();
      setContentId(savedContent.id ?? numericContentId ?? null);

      await saveCollection(dataToSave.features, "features", "features", "features");
      await saveCollection(dataToSave.leaders, "leaders", "leaders", "leaders");
      await saveCollection(dataToSave.visionMission, "vision-mission", "Vision & Mission", "visionMission");
      await saveCollection(dataToSave.history, "history", "history", "history");
      await saveCollection(dataToSave.approach, "approach", "approach cards", "approach");
      await saveCollection(dataToSave.team, "team", "team members", "team");

      await loadAll();
      window.dispatchEvent(new Event("saamAboutPageUpdated"));

      try {
        localStorage.setItem("saamAboutPageUpdated", String(Date.now()));
      } catch {
        // Local storage is only a cross-tab sync signal.
      }

      setMessage("About Page saved successfully.");
    } catch (err) {
      console.error("About Page save error:", err);
      setError(err?.message || "Failed to save About Page. Check the Spring Boot console for the exact server error.");
    } finally {
      setSavingContent(false);
      setSavingCollections(false);
    }
  }

  /* =======================================================
     DELETE
  ======================================================= */

  async function deleteItem(
    endpoint,
    item,
    setter,
    items
  ) {
    if (!item.id) {
      removeLocalItem(
        setter,
        items,
        item
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${ABOUT_API}/${endpoint}/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (
        !response.ok &&
        response.status !== 204
      ) {
        throw new Error("Delete failed.");
      }

      const nextItems = normalizeOrder(
        items.filter((x) => x.id !== item.id)
      );

      setter(nextItems);

      setMessage(
        "Item deleted successfully. Click Save All to sync the remaining CMS records."
      );
    } catch (err) {
      console.error(err);

      setError(
        "Could not delete this item."
      );
    }
  }

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  async function uploadImage(
    file,
    folder,
    callback
  ) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      return;
    }

    const maxSize =
      500 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Maximum image size is 500 MB."
      );

      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch(
        UPLOAD_API,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Image upload failed."
        );
      }

      const data = await response.json();

      const url =
        data.url ||
        data.imageUrl ||
        data.path;

      if (!url) {
        throw new Error(
          "Upload succeeded but no image URL was returned."
        );
      }

      callback(url);

      setMessage(
        "Image uploaded successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  /* =======================================================
     ADD ITEMS
  ======================================================= */

  function addFeature() {
    setFeatures((prev) => [
      ...normalizeOrder(prev),
      {
        title: "",
        description: "",
        icon: "CheckCircle2",
        enabled: true,
        displayOrder: prev.length,
        _editorKey: createEditorKey("feature"),
      },
    ]);
  }

  function addLeader() {
    setLeaders((prev) => [
      ...normalizeOrder(prev),
      {
        name: "",
        role: "",
        image: "",
        imagePosition: "center center",
        description: "",
        statement: "",
        enabled: true,
        displayOrder: prev.length,
        _editorKey: createEditorKey("leader"),
      },
    ]);
  }

  function addVisionMission() {
    setVisionMission((prev) => [
      ...normalizeOrder(prev),
      {
        type: "vision",
        label: "",
        title: "",
        text: "",
        icon: "Eye",
        enabled: true,
        displayOrder: prev.length,
        _editorKey: createEditorKey("vision"),
      },
    ]);
  }

  function addHistory() {
    setHistory((prev) => [
      ...normalizeOrder(prev),
      {
        year: "",
        title: "",
        text: "",
        enabled: true,
        displayOrder: prev.length,
        _editorKey: createEditorKey("history"),
      },
    ]);
  }

  function addApproach() {
    setApproach((prev) => [
      ...normalizeOrder(prev),
      {
        number: String(
          prev.length + 1
        ).padStart(2, "0"),
        title: "",
        text: "",
        icon: "Sparkles",
        enabled: true,
        displayOrder: prev.length,
        _editorKey: createEditorKey("approach"),
      },
    ]);
  }

  function addTeam() {
    setTeam((prev) => [
      ...normalizeOrder(prev),
      {
        name: "",
        role: "",
        image: "",
        description: "",
        enabled: true,
        displayOrder: prev.length,
        _editorKey: createEditorKey("team"),
      },
    ]);
  }

  /* =======================================================
     RESET DEFAULTS
  ======================================================= */

  async function resetDefaults() {
    const confirmed = window.confirm(
      "Reset the About Page to the original default values and save them to the public website?"
    );

    if (!confirmed) {
      return;
    }

    const defaultData = {
      content: cloneData(DEFAULT_CONTENT),
      features: prepareCollection(DEFAULT_FEATURES, "feature"),
      leaders: prepareCollection(DEFAULT_LEADERS, "leader"),
      visionMission: prepareCollection(
        DEFAULT_VISION_MISSION,
        "vision"
      ),
      history: prepareCollection(DEFAULT_HISTORY, "history"),
      approach: prepareCollection(DEFAULT_APPROACH, "approach"),
      team: prepareCollection(DEFAULT_TEAM, "team"),
    };

    setContent(defaultData.content);
    setFeatures(defaultData.features);
    setLeaders(defaultData.leaders);
    setVisionMission(defaultData.visionMission);
    setHistory(defaultData.history);
    setApproach(defaultData.approach);
    setTeam(defaultData.team);

    setError("");
    setMessage("Saving default About Page values...");

    // Save immediately so Reset Defaults affects the public website too.
    await saveEverything(defaultData);
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-sm">
            <Loader2
              size={22}
              className="animate-spin text-[#B28A20]"
            />

            <span className="text-sm font-bold text-slate-700">
              Loading About Page CMS...
            </span>
          </div>
        </div>
      </div>
    );
  }

  /*
    IMPORTANT:
    No React hooks are called after this point.
    This prevents the Rules of Hooks error.
  */

  const sortedFeatures =
    normalizeOrder(features);

  const sortedLeaders =
    normalizeOrder(leaders);

  const sortedVisionMission =
    normalizeOrder(visionMission);

  const sortedHistory =
    normalizeOrder(history);

  const sortedApproach =
    normalizeOrder(approach);

  const sortedTeam =
    normalizeOrder(team);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/dashboard")
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">

              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#B28A20]">
                Saam Infrastructure
              </p>

              <h1 className="truncate text-xl font-black sm:text-2xl">
                About Page
              </h1>

            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={loadAll}
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 sm:flex"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              type="button"
              disabled={
                savingContent ||
                savingCollections
              }
              onClick={saveEverything}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingContent ||
              savingCollections ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              Save All
            </button>

          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* SUCCESS */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700">
            <Check
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{message}</span>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700">
            <X
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}

        {/* INTRO */}

        <div className="mb-6 rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">

          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#D7B44D]">
            Website Management
          </p>

          <h2 className="mt-3 text-2xl font-black sm:text-4xl">
            Manage your About Page
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Manage all About Page content,
            leadership, team members, history,
            approach cards and Vision & Mission
            directly from the CMS.
          </p>

        </div>

        {/* =================================================
            GENERAL
        ================================================= */}

        <CmsSection
          id="general"
          number="01"
          title="Page Visibility"
          description="Control whether the complete About Page is visible."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div>
              <h3 className="font-black">
                About Page Visibility
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Disable this to hide the dedicated
                About Page.
              </p>
            </div>

            <Toggle
              enabled={Boolean(
                content.enabled
              )}
              onChange={(value) =>
                updateContent(
                  "enabled",
                  value
                )
              }
            />

          </div>
        </CmsSection>

        {/* =================================================
            HERO
        ================================================= */}

        <CmsSection
          id="hero"
          number="02"
          title="Hero Section"
          description="Main About Us introduction."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Field
              label="Hero Label"
              value={content.heroLabel}
              onChange={(value) =>
                updateContent(
                  "heroLabel",
                  value
                )
              }
            />

            <Field
              label="Hero Heading"
              value={content.heroHeading}
              onChange={(value) =>
                updateContent(
                  "heroHeading",
                  value
                )
              }
            />

            <Field
              label="Hero Heading Highlight"
              value={
                content.heroHeadingHighlight
              }
              onChange={(value) =>
                updateContent(
                  "heroHeadingHighlight",
                  value
                )
              }
            />

            <div className="md:col-span-2">
              <Field
                label="Hero Description"
                value={
                  content.heroDescription
                }
                textarea
                onChange={(value) =>
                  updateContent(
                    "heroDescription",
                    value
                  )
                }
              />
            </div>

          </div>
        </CmsSection>

        {/* =================================================
            WHO WE ARE
        ================================================= */}

        <CmsSection
          id="who"
          number="03"
          title="Who We Are"
          description="Image, introduction, paragraphs and CTA."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="space-y-6">

            <div className="grid gap-5 md:grid-cols-2">

              <Field
                label="Section Label"
                value={
                  content.whoWeAreLabel
                }
                onChange={(value) =>
                  updateContent(
                    "whoWeAreLabel",
                    value
                  )
                }
              />

              <Field
                label="Image Alt Text"
                value={
                  content.whoWeAreImageAlt
                }
                onChange={(value) =>
                  updateContent(
                    "whoWeAreImageAlt",
                    value
                  )
                }
              />

              <Field
                label="Heading"
                value={
                  content.whoWeAreHeading
                }
                onChange={(value) =>
                  updateContent(
                    "whoWeAreHeading",
                    value
                  )
                }
              />

              <Field
                label="Heading Highlight"
                value={
                  content.whoWeAreHeadingHighlight
                }
                onChange={(value) =>
                  updateContent(
                    "whoWeAreHeadingHighlight",
                    value
                  )
                }
              />

              <div className="md:col-span-2">

                <Field
                  label="Paragraph 1"
                  value={
                    content.whoWeAreParagraph1
                  }
                  textarea
                  onChange={(value) =>
                    updateContent(
                      "whoWeAreParagraph1",
                      value
                    )
                  }
                />

              </div>

              <div className="md:col-span-2">

                <Field
                  label="Paragraph 2"
                  value={
                    content.whoWeAreParagraph2
                  }
                  textarea
                  onChange={(value) =>
                    updateContent(
                      "whoWeAreParagraph2",
                      value
                    )
                  }
                />

              </div>

              <Field
                label="Button Text"
                value={
                  content.whoWeAreButtonText
                }
                onChange={(value) =>
                  updateContent(
                    "whoWeAreButtonText",
                    value
                  )
                }
              />

              <Field
                label="Button Link"
                value={
                  content.whoWeAreButtonLink
                }
                onChange={(value) =>
                  updateContent(
                    "whoWeAreButtonLink",
                    value
                  )
                }
              />

            </div>

            <ImageEditor
              title="Who We Are Image"
              image={
                content.whoWeAreImage
              }
              alt={
                content.whoWeAreImageAlt
              }
              uploading={uploading}
              onUpload={(file) =>
                uploadImage(
                  file,
                  "about-page",
                  (url) =>
                    updateContent(
                      "whoWeAreImage",
                      url
                    )
                )
              }
              onUrlChange={(value) =>
                updateContent(
                  "whoWeAreImage",
                  value
                )
              }
            />

          </div>
        </CmsSection>

        {/* =================================================
            FEATURES
        ================================================= */}

        <CollectionSection
          id="features"
          number="04"
          title="Who We Are Features"
          description="Add, edit, hide, delete and reorder feature cards."
          openSections={openSections}
          toggleSection={toggleSection}
          addLabel="Add Feature"
          onAdd={addFeature}
          emptyText="No features added yet."
        >
          {sortedFeatures.map(
            (item, index) => (
              <CollectionCard
                key={
                  item._editorKey ??
                  item.id ??
                  `feature-${index}`
                }
                label={`Feature ${
                  index + 1
                }`}
                item={item}
                index={index}
                total={
                  sortedFeatures.length
                }
                onToggle={() =>
                  updateItem(
                    setFeatures,
                    item,
                    "enabled",
                    !item.enabled
                  )
                }
                onUp={() =>
                  moveItem(
                    setFeatures,
                    features,
                    index,
                    "up"
                  )
                }
                onDown={() =>
                  moveItem(
                    setFeatures,
                    features,
                    index,
                    "down"
                  )
                }
                onDelete={() =>
                  deleteItem(
                    "features",
                    item,
                    setFeatures,
                    features
                  )
                }
              >
                <div className="grid gap-5 md:grid-cols-3">

                  <Field
                    label="Title"
                    value={item.title}
                    onChange={(value) =>
                      updateItem(
                        setFeatures,
                        item,
                        "title",
                        value
                      )
                    }
                  />

                  <SelectField
                    label="Icon"
                    value={item.icon}
                    options={
                      ICON_OPTIONS
                    }
                    onChange={(value) =>
                      updateItem(
                        setFeatures,
                        item,
                        "icon",
                        value
                      )
                    }
                  />

                  <IconPreview
                    name={item.icon}
                  />

                  <div className="md:col-span-3">

                    <Field
                      label="Description"
                      value={
                        item.description
                      }
                      textarea
                      onChange={(value) =>
                        updateItem(
                          setFeatures,
                          item,
                          "description",
                          value
                        )
                      }
                    />

                  </div>

                </div>
              </CollectionCard>
            )
          )}
        </CollectionSection>

        {/* =================================================
            LEADERSHIP
        ================================================= */}

        <CollectionSection
          id="leadership"
          number="05"
          title="Leadership"
          description="Unlimited leadership cards with image upload."
          helper="You can add as many leaders as required."
          openSections={openSections}
          toggleSection={toggleSection}
          addLabel="Add Leader"
          onAdd={addLeader}
          emptyText="No leaders added yet."
        >
          {sortedLeaders.map(
            (item, index) => (
              <CollectionCard
                key={
                  item._editorKey ??
                  item.id ??
                  `leader-${index}`
                }
                label={`Leader ${
                  index + 1
                }`}
                item={item}
                index={index}
                total={
                  sortedLeaders.length
                }
                onToggle={() =>
                  updateItem(
                    setLeaders,
                    item,
                    "enabled",
                    !item.enabled
                  )
                }
                onUp={() =>
                  moveItem(
                    setLeaders,
                    leaders,
                    index,
                    "up"
                  )
                }
                onDown={() =>
                  moveItem(
                    setLeaders,
                    leaders,
                    index,
                    "down"
                  )
                }
                onDelete={() =>
                  deleteItem(
                    "leaders",
                    item,
                    setLeaders,
                    leaders
                  )
                }
              >
                <div className="grid gap-6">

                  <ImageEditor
                    title="Leader Image"
                    image={item.image}
                    alt={
                      item.name ||
                      "Leader"
                    }
                    uploading={uploading}
                    objectContain
                    onUpload={(file) =>
                      uploadImage(
                        file,
                        "about-leaders",
                        (url) =>
                          updateItem(
                            setLeaders,
                            item,
                            "image",
                            url
                          )
                      )
                    }
                    onUrlChange={(value) =>
                      updateItem(
                        setLeaders,
                        item,
                        "image",
                        value
                      )
                    }
                  />

                  <div className="grid gap-5 md:grid-cols-2">

                    <Field
                      label="Name"
                      value={item.name}
                      onChange={(value) =>
                        updateItem(
                          setLeaders,
                          item,
                          "name",
                          value
                        )
                      }
                    />

                    <Field
                      label="Role"
                      value={item.role}
                      onChange={(value) =>
                        updateItem(
                          setLeaders,
                          item,
                          "role",
                          value
                        )
                      }
                    />

                    <Field
                      label="Image Position"
                      value={
                        item.imagePosition
                      }
                      placeholder="center center"
                      onChange={(value) =>
                        updateItem(
                          setLeaders,
                          item,
                          "imagePosition",
                          value
                        )
                      }
                    />

                    <Field
                      label="Image URL"
                      value={item.image}
                      onChange={(value) =>
                        updateItem(
                          setLeaders,
                          item,
                          "image",
                          value
                        )
                      }
                    />

                    <div className="md:col-span-2">

                      <Field
                        label="Short Description"
                        value={
                          item.description
                        }
                        textarea
                        onChange={(value) =>
                          updateItem(
                            setLeaders,
                            item,
                            "description",
                            value
                          )
                        }
                      />

                    </div>

                    <div className="md:col-span-2">

                      <Field
                        label="Leadership Statement"
                        value={
                          item.statement
                        }
                        textarea
                        onChange={(value) =>
                          updateItem(
                            setLeaders,
                            item,
                            "statement",
                            value
                          )
                        }
                      />

                    </div>

                  </div>

                </div>
              </CollectionCard>
            )
          )}
        </CollectionSection>

        {/* =================================================
            VISION & MISSION TEXT
        ================================================= */}

        <CmsSection
          id="visionText"
          number="06"
          title="Vision & Mission Text Editor"
          description="Edit the heading and description above the cards."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Field
              label="Section Label"
              value={
                content.visionMissionLabel
              }
              onChange={(value) =>
                updateContent(
                  "visionMissionLabel",
                  value
                )
              }
            />

            <Field
              label="Heading"
              value={
                content.visionMissionHeading
              }
              onChange={(value) =>
                updateContent(
                  "visionMissionHeading",
                  value
                )
              }
            />

            <Field
              label="Heading Highlight"
              value={
                content.visionMissionHeadingHighlight
              }
              onChange={(value) =>
                updateContent(
                  "visionMissionHeadingHighlight",
                  value
                )
              }
            />

            <div className="md:col-span-2">

              <Field
                label="Description"
                value={
                  content.visionMissionDescription
                }
                textarea
                onChange={(value) =>
                  updateContent(
                    "visionMissionDescription",
                    value
                  )
                }
              />

            </div>

          </div>
        </CmsSection>

        {/* =================================================
            VISION & MISSION CARDS
        ================================================= */}

        <CollectionSection
          id="vision"
          number="06B"
          title="Vision & Mission Cards"
          description="Manage Vision and Mission cards."
          openSections={openSections}
          toggleSection={toggleSection}
          addLabel="Add Card"
          onAdd={addVisionMission}
          emptyText="No Vision & Mission cards added yet."
        >
          {sortedVisionMission.map(
            (item, index) => (
              <CollectionCard
                key={
                  item._editorKey ??
                  item.id ??
                  `vision-${index}`
                }
                label={`Card ${
                  index + 1
                }`}
                item={item}
                index={index}
                total={
                  sortedVisionMission.length
                }
                onToggle={() =>
                  updateItem(
                    setVisionMission,
                    item,
                    "enabled",
                    !item.enabled
                  )
                }
                onUp={() =>
                  moveItem(
                    setVisionMission,
                    visionMission,
                    index,
                    "up"
                  )
                }
                onDown={() =>
                  moveItem(
                    setVisionMission,
                    visionMission,
                    index,
                    "down"
                  )
                }
                onDelete={() =>
                  deleteItem(
                    "vision-mission",
                    item,
                    setVisionMission,
                    visionMission
                  )
                }
              >
                <div className="grid gap-5 md:grid-cols-2">

                  <SelectField
                    label="Type"
                    value={item.type}
                    options={[
                      "vision",
                      "mission",
                    ]}
                    onChange={(value) =>
                      updateItem(
                        setVisionMission,
                        item,
                        "type",
                        value
                      )
                    }
                  />

                  <Field
                    label="Label"
                    value={item.label}
                    onChange={(value) =>
                      updateItem(
                        setVisionMission,
                        item,
                        "label",
                        value
                      )
                    }
                  />

                  <Field
                    label="Title"
                    value={item.title}
                    onChange={(value) =>
                      updateItem(
                        setVisionMission,
                        item,
                        "title",
                        value
                      )
                    }
                  />

                  <SelectField
                    label="Icon"
                    value={item.icon}
                    options={
                      ICON_OPTIONS
                    }
                    onChange={(value) =>
                      updateItem(
                        setVisionMission,
                        item,
                        "icon",
                        value
                      )
                    }
                  />

                  <div className="md:col-span-2">

                    <Field
                      label="Text"
                      value={item.text}
                      textarea
                      onChange={(value) =>
                        updateItem(
                          setVisionMission,
                          item,
                          "text",
                          value
                        )
                      }
                    />

                  </div>

                </div>
              </CollectionCard>
            )
          )}
        </CollectionSection>

        {/* =================================================
            HISTORY TEXT
        ================================================= */}

        <CmsSection
          id="historyText"
          number="07"
          title="Our History Text Editor"
          description="Edit the heading and description above the timeline."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Field
              label="Section Label"
              value={
                content.historyLabel
              }
              onChange={(value) =>
                updateContent(
                  "historyLabel",
                  value
                )
              }
            />

            <Field
              label="Heading"
              value={
                content.historyHeading
              }
              onChange={(value) =>
                updateContent(
                  "historyHeading",
                  value
                )
              }
            />

            <Field
              label="Heading Highlight"
              value={
                content.historyHeadingHighlight
              }
              onChange={(value) =>
                updateContent(
                  "historyHeadingHighlight",
                  value
                )
              }
            />

            <div className="md:col-span-2">

              <Field
                label="Description"
                value={
                  content.historyDescription
                }
                textarea
                onChange={(value) =>
                  updateContent(
                    "historyDescription",
                    value
                  )
                }
              />

            </div>

          </div>
        </CmsSection>

        {/* =================================================
            HISTORY
        ================================================= */}

        <CollectionSection
          id="history"
          number="07B"
          title="Our History"
          description="Manage timeline milestones."
          openSections={openSections}
          toggleSection={toggleSection}
          addLabel="Add History Item"
          onAdd={addHistory}
          emptyText="No history items added yet."
        >
          {sortedHistory.map(
            (item, index) => (
              <CollectionCard
                key={
                  item._editorKey ??
                  item.id ??
                  `history-${index}`
                }
                label={`Milestone ${
                  index + 1
                }`}
                item={item}
                index={index}
                total={
                  sortedHistory.length
                }
                onToggle={() =>
                  updateItem(
                    setHistory,
                    item,
                    "enabled",
                    !item.enabled
                  )
                }
                onUp={() =>
                  moveItem(
                    setHistory,
                    history,
                    index,
                    "up"
                  )
                }
                onDown={() =>
                  moveItem(
                    setHistory,
                    history,
                    index,
                    "down"
                  )
                }
                onDelete={() =>
                  deleteItem(
                    "history",
                    item,
                    setHistory,
                    history
                  )
                }
              >
                <div className="grid gap-5 md:grid-cols-2">

                  <Field
                    label="Year / Number"
                    value={item.year}
                    onChange={(value) =>
                      updateItem(
                        setHistory,
                        item,
                        "year",
                        value
                      )
                    }
                  />

                  <Field
                    label="Title"
                    value={item.title}
                    onChange={(value) =>
                      updateItem(
                        setHistory,
                        item,
                        "title",
                        value
                      )
                    }
                  />

                  <div className="md:col-span-2">

                    <Field
                      label="Description"
                      value={item.text}
                      textarea
                      onChange={(value) =>
                        updateItem(
                          setHistory,
                          item,
                          "text",
                          value
                        )
                      }
                    />

                  </div>

                </div>
              </CollectionCard>
            )
          )}
        </CollectionSection>

        {/* =================================================
            APPROACH TEXT
        ================================================= */}

        <CmsSection
          id="approachText"
          number="08"
          title="Our Approach Text Editor"
          description="Edit the heading and description above the approach cards."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Field
              label="Section Label"
              value={
                content.approachLabel
              }
              onChange={(value) =>
                updateContent(
                  "approachLabel",
                  value
                )
              }
            />

            <Field
              label="Heading"
              value={
                content.approachHeading
              }
              onChange={(value) =>
                updateContent(
                  "approachHeading",
                  value
                )
              }
            />

            <Field
              label="Heading Highlight"
              value={
                content.approachHeadingHighlight
              }
              onChange={(value) =>
                updateContent(
                  "approachHeadingHighlight",
                  value
                )
              }
            />

            <div className="md:col-span-2">

              <Field
                label="Description"
                value={
                  content.approachDescription
                }
                textarea
                onChange={(value) =>
                  updateContent(
                    "approachDescription",
                    value
                  )
                }
              />

            </div>

          </div>
        </CmsSection>

        {/* =================================================
            APPROACH
        ================================================= */}

        <CollectionSection
          id="approach"
          number="08B"
          title="Our Approach"
          description="Manage approach cards dynamically."
          openSections={openSections}
          toggleSection={toggleSection}
          addLabel="Add Approach Card"
          onAdd={addApproach}
          emptyText="No approach cards added yet."
        >
          {sortedApproach.map(
            (item, index) => (
              <CollectionCard
                key={
                  item._editorKey ??
                  item.id ??
                  `approach-${index}`
                }
                label={`Approach ${
                  index + 1
                }`}
                item={item}
                index={index}
                total={
                  sortedApproach.length
                }
                onToggle={() =>
                  updateItem(
                    setApproach,
                    item,
                    "enabled",
                    !item.enabled
                  )
                }
                onUp={() =>
                  moveItem(
                    setApproach,
                    approach,
                    index,
                    "up"
                  )
                }
                onDown={() =>
                  moveItem(
                    setApproach,
                    approach,
                    index,
                    "down"
                  )
                }
                onDelete={() =>
                  deleteItem(
                    "approach",
                    item,
                    setApproach,
                    approach
                  )
                }
              >
                <div className="grid gap-5 md:grid-cols-2">

                  <Field
                    label="Number"
                    value={item.number}
                    onChange={(value) =>
                      updateItem(
                        setApproach,
                        item,
                        "number",
                        value
                      )
                    }
                  />

                  <Field
                    label="Title"
                    value={item.title}
                    onChange={(value) =>
                      updateItem(
                        setApproach,
                        item,
                        "title",
                        value
                      )
                    }
                  />

                  <SelectField
                    label="Icon"
                    value={item.icon}
                    options={
                      ICON_OPTIONS
                    }
                    onChange={(value) =>
                      updateItem(
                        setApproach,
                        item,
                        "icon",
                        value
                      )
                    }
                  />

                  <IconPreview
                    name={item.icon}
                  />

                  <div className="md:col-span-2">

                    <Field
                      label="Description"
                      value={item.text}
                      textarea
                      onChange={(value) =>
                        updateItem(
                          setApproach,
                          item,
                          "text",
                          value
                        )
                      }
                    />

                  </div>

                </div>
              </CollectionCard>
            )
          )}
        </CollectionSection>

        {/* =================================================
            TEAM TEXT
        ================================================= */}

        <CmsSection
          id="teamText"
          number="09"
          title="Our Team Text Editor"
          description="Edit the heading and description above the team carousel."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Field
              label="Section Label"
              value={content.teamLabel}
              onChange={(value) =>
                updateContent(
                  "teamLabel",
                  value
                )
              }
            />

            <Field
              label="Heading"
              value={content.teamHeading}
              onChange={(value) =>
                updateContent(
                  "teamHeading",
                  value
                )
              }
            />

            <Field
              label="Heading Highlight"
              value={
                content.teamHeadingHighlight
              }
              onChange={(value) =>
                updateContent(
                  "teamHeadingHighlight",
                  value
                )
              }
            />

            <div className="md:col-span-2">

              <Field
                label="Description"
                value={
                  content.teamDescription
                }
                textarea
                onChange={(value) =>
                  updateContent(
                    "teamDescription",
                    value
                  )
                }
              />

            </div>

          </div>
        </CmsSection>

        {/* =================================================
            TEAM
        ================================================= */}

        <CollectionSection
          id="team"
          number="09B"
          title="Our Team"
          description="Unlimited team members with image upload."
          helper="Add as many team members as required."
          openSections={openSections}
          toggleSection={toggleSection}
          addLabel="Add Team Member"
          onAdd={addTeam}
          emptyText="No team members added yet."
        >
          {sortedTeam.map(
            (item, index) => (
              <CollectionCard
                key={
                  item._editorKey ??
                  item.id ??
                  `team-${index}`
                }
                label={`Team Member ${
                  index + 1
                }`}
                item={item}
                index={index}
                total={
                  sortedTeam.length
                }
                onToggle={() =>
                  updateItem(
                    setTeam,
                    item,
                    "enabled",
                    !item.enabled
                  )
                }
                onUp={() =>
                  moveItem(
                    setTeam,
                    team,
                    index,
                    "up"
                  )
                }
                onDown={() =>
                  moveItem(
                    setTeam,
                    team,
                    index,
                    "down"
                  )
                }
                onDelete={() =>
                  deleteItem(
                    "team",
                    item,
                    setTeam,
                    team
                  )
                }
              >
                <div className="grid gap-6">

                  <ImageEditor
                    title="Team Image"
                    image={item.image}
                    alt={
                      item.name ||
                      "Team member"
                    }
                    uploading={uploading}
                    onUpload={(file) =>
                      uploadImage(
                        file,
                        "about-team",
                        (url) =>
                          updateItem(
                            setTeam,
                            item,
                            "image",
                            url
                          )
                      )
                    }
                    onUrlChange={(value) =>
                      updateItem(
                        setTeam,
                        item,
                        "image",
                        value
                      )
                    }
                  />

                  <div className="grid gap-5 md:grid-cols-2">

                    <Field
                      label="Name"
                      value={item.name}
                      onChange={(value) =>
                        updateItem(
                          setTeam,
                          item,
                          "name",
                          value
                        )
                      }
                    />

                    <Field
                      label="Role"
                      value={item.role}
                      onChange={(value) =>
                        updateItem(
                          setTeam,
                          item,
                          "role",
                          value
                        )
                      }
                    />

                    <div className="md:col-span-2">

                      <Field
                        label="Image URL"
                        value={item.image}
                        onChange={(value) =>
                          updateItem(
                            setTeam,
                            item,
                            "image",
                            value
                          )
                        }
                      />

                    </div>

                    <div className="md:col-span-2">

                      <Field
                        label="Description"
                        value={
                          item.description
                        }
                        textarea
                        onChange={(value) =>
                          updateItem(
                            setTeam,
                            item,
                            "description",
                            value
                          )
                        }
                      />

                    </div>

                  </div>

                </div>
              </CollectionCard>
            )
          )}
        </CollectionSection>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <CmsSection
          id="bottom"
          number="10"
          title="Bottom Statement"
          description="Final statement displayed at the bottom of the About Page."
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <div className="grid gap-5 md:grid-cols-2">

            <Field
              label="Label"
              value={
                content.bottomStatementLabel
              }
              onChange={(value) =>
                updateContent(
                  "bottomStatementLabel",
                  value
                )
              }
            />

            <Field
              label="Heading"
              value={
                content.bottomStatementHeading
              }
              onChange={(value) =>
                updateContent(
                  "bottomStatementHeading",
                  value
                )
              }
            />

            <div className="md:col-span-2">

              <Field
                label="Heading Highlight"
                value={
                  content.bottomStatementHighlight
                }
                onChange={(value) =>
                  updateContent(
                    "bottomStatementHighlight",
                    value
                  )
                }
              />

            </div>

          </div>
        </CmsSection>

        {/* =================================================
            BOTTOM ACTION BAR
        ================================================= */}

        <div className="sticky bottom-4 mt-8 flex flex-wrap justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">

          <button
            type="button"
            onClick={resetDefaults}
            disabled={savingContent || savingCollections}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={saveEverything}
            disabled={
              savingContent ||
              savingCollections
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A03B] px-4 py-2.5 text-sm font-black text-slate-900 transition hover:bg-[#B28A20] hover:text-white disabled:opacity-60"
          >
            {savingContent ||
            savingCollections ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Save size={16} />
            )}

            Save All
          </button>

        </div>

      </main>
    </div>
  );
}

/* =========================================================
   CMS SECTION
========================================================= */

function CmsSection({
  id,
  number,
  title,
  description,
  openSections,
  toggleSection,
  children,
}) {
  const open = Boolean(
    openSections[id]
  );

  return (
    <section className="mb-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <button
        type="button"
        onClick={() =>
          toggleSection(id)
        }
        className="flex w-full items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 text-left transition hover:bg-slate-50"
      >

        <div className="flex items-center gap-4">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-[#D7B44D]">
            {number}
          </div>

          <div>

            <h2 className="font-black text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs text-slate-500">
                {description}
              </p>
            )}

          </div>

        </div>

        {open ? (
          <ChevronUp
            size={20}
            className="text-slate-500"
          />
        ) : (
          <ChevronDown
            size={20}
            className="text-slate-500"
          />
        )}

      </button>

      {open && (
        <div className="p-6">
          {children}
        </div>
      )}

    </section>
  );
}

/* =========================================================
   COLLECTION SECTION
========================================================= */

function CollectionSection({
  id,
  number,
  title,
  description,
  helper,
  openSections,
  toggleSection,
  addLabel,
  onAdd,
  emptyText,
  children,
}) {
  const items = Array.isArray(
    children
  )
    ? children
    : children
      ? [children]
      : [];

  return (
    <CmsSection
      id={id}
      number={number}
      title={title}
      description={description}
      openSections={openSections}
      toggleSection={toggleSection}
    >

      <div className="space-y-5">

        <div className="flex flex-wrap items-center justify-between gap-3">

          {helper ? (
            <div className="text-sm text-slate-500">
              {helper}
            </div>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C9A03B] px-4 py-2.5 text-sm font-black text-slate-900 transition hover:bg-[#B28A20] hover:text-white"
          >
            <Plus size={17} />
            {addLabel}
          </button>

        </div>

        {items.length === 0 ? (
          <EmptyState
            text={emptyText}
          />
        ) : (
          <div className="space-y-5">
            {children}
          </div>
        )}

      </div>

    </CmsSection>
  );
}

/* =========================================================
   COLLECTION CARD
========================================================= */

function CollectionCard({
  label,
  item,
  index,
  total,
  onToggle,
  onUp,
  onDown,
  onDelete,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">

        <div className="flex items-center gap-3">

          <GripVertical
            size={18}
            className="text-slate-400"
          />

          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            {label}
          </span>

        </div>

        <ItemActions
          enabled={Boolean(
            item.enabled
          )}
          onToggle={onToggle}
          onUp={onUp}
          onDown={onDown}
          onDelete={onDelete}
          first={index === 0}
          last={
            index === total - 1
          }
        />

      </div>

      <div className="p-5">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  textarea = false,
  placeholder = "",
}) {
  const commonProps = {
    value: value ?? "",
    onChange: (event) => onChange(event.target.value),
    placeholder,
    className: `w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20 ${
      textarea ? "min-h-32 resize-y" : ""
    }`,
  };

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      {textarea ? (
        <textarea {...commonProps} rows={6} />
      ) : (
        <input {...commonProps} />
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
   ITEM ACTIONS
========================================================= */

function ItemActions({
  enabled,
  onToggle,
  onUp,
  onDown,
  onDelete,
  first,
  last,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">

      <Toggle
        enabled={enabled}
        onChange={onToggle}
      />

      <button
        type="button"
        disabled={first}
        onClick={onUp}
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
        title="Move up"
      >
        <ArrowUp size={15} />
      </button>

      <button
        type="button"
        disabled={last}
        onClick={onDown}
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
        title="Move down"
      >
        <ArrowDown size={15} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
        title="Delete"
      >
        <Trash2 size={15} />
      </button>

    </div>
  );
}

function loadImageForResize(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to read the selected image."));
    };

    image.src = url;
  });
}

function calculateOutputDimensions(
  sourceWidth,
  sourceHeight,
  sizeMode,
  customWidth,
  customHeight,
  keepAspectRatio
) {
  if (!sourceWidth || !sourceHeight) {
    return { width: 1, height: 1 };
  }

  if (sizeMode === "original") {
    return {
      width: sourceWidth,
      height: sourceHeight,
    };
  }

  if (
    sizeMode === "small" ||
    sizeMode === "medium" ||
    sizeMode === "large"
  ) {
    const limits = {
      small: [1280, 720],
      medium: [1920, 1080],
      large: [2560, 1440],
    };

    const [maxWidth, maxHeight] = limits[sizeMode];

    // Fit the source inside the selected preset box while preserving
    // the original aspect ratio. Upscaling is intentionally allowed so
    // the selected size always has an effect when the source is smaller.
    const scale = Math.min(
      maxWidth / sourceWidth,
      maxHeight / sourceHeight
    );

    return {
      width: Math.max(1, Math.round(sourceWidth * scale)),
      height: Math.max(1, Math.round(sourceHeight * scale)),
    };
  }

  const requestedWidth = Math.max(1, Number(customWidth) || 1);
  const requestedHeight = Math.max(1, Number(customHeight) || 1);

  if (!keepAspectRatio) {
    return {
      width: requestedWidth,
      height: requestedHeight,
    };
  }

  const ratio = sourceWidth / sourceHeight;
  const widthBasedHeight = requestedWidth / ratio;
  const heightBasedWidth = requestedHeight * ratio;

  if (widthBasedHeight <= requestedHeight) {
    return {
      width: requestedWidth,
      height: Math.max(1, Math.round(widthBasedHeight)),
    };
  }

  return {
    width: Math.max(1, Math.round(heightBasedWidth)),
    height: requestedHeight,
  };
}

async function fileFromImageUrl(url, fallbackName = "image.jpg") {
  const resolvedUrl = resolveImageUrl(url);

  if (!resolvedUrl) {
    throw new Error("There is no existing image to resize.");
  }

  const response = await fetch(resolvedUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Could not read the current image. Server returned ${response.status}.`
    );
  }

  const blob = await response.blob();
  const extensionFromType =
    blob.type === "image/png"
      ? "png"
      : blob.type === "image/webp"
        ? "webp"
        : "jpg";

  const safeName = fallbackName.replace(
    /\.[^/.]+$/,
    ""
  );

  return new File(
    [blob],
    `${safeName}.${extensionFromType}`,
    {
      type: blob.type || "image/jpeg",
    }
  );
}

function ImageEditor({
  title,
  image,
  alt,
  uploading,
  onUpload,
  onUrlChange,
  objectContain = false,
}) {
  const [sizeMode, setSizeMode] = useState("original");
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [sourceDimensions, setSourceDimensions] = useState(null);
  const [outputDimensions, setOutputDimensions] = useState(null);

  const sizeOptions = [
    ["original", "Original", "Keep original dimensions"],
    ["small", "Small", "Fit within 1280 × 720"],
    ["medium", "Medium", "Fit within 1920 × 1080"],
    ["large", "Large", "Fit within 2560 × 1440"],
  ];

  function updatePlannedDimensions(
    nextSizeMode = sizeMode,
    nextWidth = customWidth,
    nextHeight = customHeight,
    nextAspect = keepAspectRatio
  ) {
    if (!sourceDimensions) {
      return;
    }

    setOutputDimensions(
      calculateOutputDimensions(
        sourceDimensions.width,
        sourceDimensions.height,
        nextSizeMode,
        nextWidth,
        nextHeight,
        nextAspect
      )
    );
  }

  async function resizeFile(file) {
    if (!file) {
      throw new Error("Please select an image.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Please select a valid image file.");
    }

    const maxSize = 500 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error("Maximum image size is 500 MB.");
    }

    // SVG and GIF should stay untouched because canvas resizing would
    // rasterize/flatten them.
    if (
      sizeMode === "original" ||
      file.type === "image/svg+xml" ||
      file.type === "image/gif"
    ) {
      const imageElement = await loadImageForResize(file).catch(() => null);

      if (imageElement) {
        const width =
          imageElement.naturalWidth || imageElement.width || 0;
        const height =
          imageElement.naturalHeight || imageElement.height || 0;

        if (width && height) {
          setSourceDimensions({ width, height });
          setOutputDimensions({ width, height });
        }
      }

      return file;
    }

    setProcessing(true);

    try {
      const imageElement = await loadImageForResize(file);
      const sourceWidth =
        imageElement.naturalWidth || imageElement.width;
      const sourceHeight =
        imageElement.naturalHeight || imageElement.height;

      if (!sourceWidth || !sourceHeight) {
        throw new Error("Could not determine the image dimensions.");
      }

      setSourceDimensions({
        width: sourceWidth,
        height: sourceHeight,
      });

      const { width: targetWidth, height: targetHeight } =
        calculateOutputDimensions(
          sourceWidth,
          sourceHeight,
          sizeMode,
          customWidth,
          customHeight,
          keepAspectRatio
        );

      setOutputDimensions({
        width: targetWidth,
        height: targetHeight,
      });

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Unable to prepare the image for upload."
        );
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      // White background prevents transparent PNG pixels from becoming
      // black when a PNG is converted to JPEG.
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        context.fillStyle = "#ffffff";
        context.fillRect(
          0,
          0,
          targetWidth,
          targetHeight
        );
      }

      context.drawImage(
        imageElement,
        0,
        0,
        targetWidth,
        targetHeight
      );

      const outputType =
        file.type === "image/png"
          ? "image/png"
          : file.type === "image/webp"
            ? "image/webp"
            : "image/jpeg";

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(
                new Error("Could not resize the image.")
              );
            }
          },
          outputType,
          0.92
        );
      });

      const extension =
        outputType === "image/png"
          ? "png"
          : outputType === "image/webp"
            ? "webp"
            : "jpg";

      const baseName = file.name.replace(
        /\.[^/.]+$/,
        ""
      );

      const resizedFile = new File(
        [blob],
        `${baseName}-${targetWidth}x${targetHeight}.${extension}`,
        {
          type: outputType,
        }
      );

      if (resizedFile.size > maxSize) {
        throw new Error(
          "The resized image is larger than the 500 MB upload limit."
        );
      }

      return resizedFile;
    } finally {
      setProcessing(false);
    }
  }

  async function processAndUpload(file) {
    try {
      const resizedFile = await resizeFile(file);
      onUpload(resizedFile);
    } catch (error) {
      console.error(error);
      setProcessing(false);
      window.alert(
        error.message ||
          "Unable to resize the selected image."
      );
    }
  }

  async function applySizeToCurrentImage() {
    if (!image) {
      window.alert(
        "Upload or enter an image first."
      );
      return;
    }

    if (
      !image.startsWith("http://") &&
      !image.startsWith("https://") &&
      !image.startsWith("/images/")
    ) {
      window.alert(
        "This image cannot be reprocessed automatically. Please upload the image again using the Upload Image button."
      );
      return;
    }

    try {
      setProcessing(true);

      const originalFile = await fileFromImageUrl(
        image,
        title || "about-image"
      );

      const resizedFile = await resizeFile(originalFile);

      onUpload(resizedFile);
    } catch (error) {
      console.error(error);
      window.alert(
        error.message ||
          "Unable to resize the current image."
      );
    } finally {
      setProcessing(false);
    }
  }

  const busy = uploading || processing;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-800">
            {title}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Maximum upload size: 500 MB. Choose the output size before uploading.
          </p>
        </div>

        <span className="rounded-xl bg-white px-3 py-2 text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
          Image Settings
        </span>
      </div>

      <div className="grid gap-5 xl:grid-cols-[240px_minmax(0,1fr)]">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
          {image ? (
            <img
              src={resolveImageUrl(image)}
              alt={alt}
              className={`h-full w-full ${
                objectContain
                  ? "object-contain"
                  : "object-cover"
              }`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              <ImageIcon size={32} />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Image Size
            </span>

            <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
              {sizeOptions.map(
                ([value, label, hint]) => (
                  <button
                    key={value}
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setSizeMode(value);
                      updatePlannedDimensions(
                        value
                      );
                    }}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      sizeMode === value
                        ? "border-[#C9A03B] bg-[#C9A03B]/10 text-slate-900 ring-2 ring-[#C9A03B]/20"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <span className="block text-xs font-black">
                      {label}
                    </span>

                    <span className="mt-1 block text-[10px] text-slate-400">
                      {hint}
                    </span>
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setSizeMode("custom");
                updatePlannedDimensions(
                  "custom"
                );
              }}
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-left transition ${
                sizeMode === "custom"
                  ? "border-[#C9A03B] bg-[#C9A03B]/10 ring-2 ring-[#C9A03B]/20"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <span className="block text-xs font-black text-slate-800">
                Custom Width × Height
              </span>

              <span className="mt-1 block text-[10px] text-slate-400">
                Choose exact custom output dimensions
              </span>
            </button>
          </div>

          {sizeMode === "custom" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Width (px)
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={customWidth}
                    disabled={busy}
                    onChange={(event) => {
                      const value = Math.max(
                        1,
                        Number(event.target.value) || 1
                      );

                      setCustomWidth(value);
                      updatePlannedDimensions(
                        "custom",
                        value,
                        customHeight
                      );
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20 disabled:bg-slate-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Height (px)
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={customHeight}
                    disabled={busy}
                    onChange={(event) => {
                      const value = Math.max(
                        1,
                        Number(event.target.value) || 1
                      );

                      setCustomHeight(value);
                      updatePlannedDimensions(
                        "custom",
                        customWidth,
                        value
                      );
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20 disabled:bg-slate-100"
                  />
                </label>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={keepAspectRatio}
                  disabled={busy}
                  onChange={(event) => {
                    const checked =
                      event.target.checked;

                    setKeepAspectRatio(checked);

                    updatePlannedDimensions(
                      "custom",
                      customWidth,
                      customHeight,
                      checked
                    );
                  }}
                  className="h-4 w-4 accent-[#C9A03B]"
                />

                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    Keep aspect ratio
                  </span>

                  <span className="block text-xs text-slate-500">
                    Prevents stretching or distortion.
                  </span>
                </span>
              </label>
            </div>
          )}

          {(sourceDimensions ||
            outputDimensions) && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Source dimensions
                </span>

                <span className="mt-1 block text-sm font-black text-slate-800">
                  {sourceDimensions
                    ? `${sourceDimensions.width} × ${sourceDimensions.height}px`
                    : "Select an image"}
                </span>
              </div>

              <div className="rounded-xl border border-[#C9A03B]/30 bg-[#C9A03B]/5 px-4 py-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Upload dimensions
                </span>

                <span className="mt-1 block text-sm font-black text-slate-800">
                  {outputDimensions
                    ? `${outputDimensions.width} × ${outputDimensions.height}px`
                    : "Select an image"}
                </span>
              </div>
            </div>
          )}

          <label
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 ${
              busy
                ? "cursor-not-allowed opacity-60"
                : ""
            }`}
          >
            {busy ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Upload size={16} />
            )}

            {processing
              ? "Preparing Image..."
              : uploading
                ? "Uploading Image..."
                : "Upload New Image"}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                processAndUpload(file);
                event.target.value = "";
              }}
            />
          </label>

          <button
            type="button"
            disabled={
              busy ||
              !image ||
              sizeMode === "original" ||
              image === "/about-construction.jpg"
            }
            onClick={applySizeToCurrentImage}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C9A03B] bg-white px-4 py-3 text-sm font-black text-slate-900 transition hover:bg-[#C9A03B]/10 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {processing ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <RefreshCw size={16} />
            )}

            Apply Selected Size to Current Image
          </button>

          <Field
            label="Image URL"
            value={image}
            onChange={onUrlChange}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  text,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm font-semibold text-slate-500">
      {text}
    </div>
  );
}