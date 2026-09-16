import { useEffect, useState } from "react";

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  GripVertical,
  Image as ImageIcon,
  Images,
  Loader2,
  MapPin,
  Plus,
  Pencil,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  UserRound,
  Building2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const PROJECTS_API = `${API_BASE_URL}/api/projects-page`;
const UPLOAD_API = `${API_BASE_URL}/api/images/upload`;

/* =========================================================
   DEFAULT PROJECTS
========================================================= */

const DEFAULT_PROJECTS = [
  {
    title: "Modern Commercial Complex",
    category: "Commercial",
    status: "Completed",
    location: "Nagpur, Maharashtra, India",
    client: "Private Commercial Client",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Modern commercial complex",
    shortDescription:
      "A modern commercial development built with a strong focus on quality, functionality and long-term durability.",
    description:
      "A modern commercial development planned and executed with a strong focus on quality workmanship, functionality, safety and long-term durability. The project demonstrates our commitment to dependable construction and professional execution.",
    projectDetails:
      "The project includes modern commercial spaces designed to support business operations while maintaining high standards of construction, safety and accessibility.",
    startDate: "January 2024",
    completionDate: "December 2024",
    enabled: true,
    displayOrder: 0,
    features: [
      "Modern commercial architecture",
      "High-quality construction materials",
      "Professional structural execution",
      "Safety-focused construction",
      "Long-term durability",
    ],
    progressImages: [
      {
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Initial commercial construction",
        title: "Initial Construction",
        description:
          "Initial structural and construction work completed according to the project plan.",
        status: "Ongoing",
        date: "March 2024",
        enabled: true,
        displayOrder: 0,
      },
      {
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Commercial structural development",
        title: "Structural Development",
        description:
          "Major structural construction and building development progressed successfully.",
        status: "Ongoing",
        date: "June 2024",
        enabled: true,
        displayOrder: 1,
      },
      {
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Commercial finishing work",
        title: "Finishing Work",
        description:
          "Finishing, interior preparation and final construction activities were completed.",
        status: "Ongoing",
        date: "October 2024",
        enabled: true,
        displayOrder: 2,
      },
      {
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Completed commercial project",
        title: "Project Completed",
        description:
          "The commercial development was successfully completed and delivered.",
        status: "Completed",
        date: "December 2024",
        enabled: true,
        displayOrder: 3,
      },
    ],
  },

  {
    title: "Residential Building",
    category: "Residential",
    status: "Ongoing",
    location: "Nagpur, Maharashtra, India",
    client: "Private Residential Client",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Residential building project",
    shortDescription:
      "Thoughtfully planned residential construction designed to provide comfortable, safe and lasting spaces.",
    description:
      "This residential development is being executed with attention to structural quality, safety, comfort and long-term value. Every stage of construction is carefully coordinated to maintain dependable progress and quality standards.",
    projectDetails:
      "The residential project focuses on creating comfortable and functional living spaces with strong structural design, quality materials and modern construction practices.",
    startDate: "March 2025",
    completionDate: "Expected December 2026",
    enabled: true,
    displayOrder: 1,
    features: [
      "Residential building construction",
      "Modern living spaces",
      "Quality structural work",
      "Safety-focused design",
      "Professional project management",
    ],
    progressImages: [
      {
        image:
          "https://images.unsplash.com/photo-1504159506876-34c7c5f5f3c1?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Residential site preparation",
        title: "Site Preparation",
        description:
          "Site preparation and initial groundwork activities were completed.",
        status: "Completed",
        date: "April 2025",
        enabled: true,
        displayOrder: 0,
      },
      {
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Residential foundation work",
        title: "Foundation Work",
        description:
          "Foundation and early structural construction activities are progressing.",
        status: "Ongoing",
        date: "July 2025",
        enabled: true,
        displayOrder: 1,
      },
      {
        image:
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Residential structural work",
        title: "Structural Work",
        description:
          "Structural development and building construction are currently in progress.",
        status: "Ongoing",
        date: "February 2026",
        enabled: true,
        displayOrder: 2,
      },
      {
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Current residential progress",
        title: "Current Progress",
        description:
          "Latest construction progress showing the current development stage.",
        status: "Ongoing",
        date: "August 2026",
        enabled: true,
        displayOrder: 3,
      },
    ],
  },

  {
    title: "Infrastructure Development",
    category: "Infrastructure",
    status: "Ongoing",
    location: "Wardha, Maharashtra, India",
    client: "Infrastructure Development Client",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Infrastructure development project",
    shortDescription:
      "Infrastructure development delivered with dependable execution, safety standards and attention to detail.",
    description:
      "A comprehensive infrastructure development project focused on reliable execution, proper planning, safety and long-term performance. The project is being delivered through coordinated engineering and construction practices.",
    projectDetails:
      "The project involves infrastructure development with a strong focus on engineering quality, efficient execution, safety and dependable long-term performance.",
    startDate: "June 2025",
    completionDate: "Expected June 2027",
    enabled: true,
    displayOrder: 2,
    features: [
      "Infrastructure development",
      "Engineering planning",
      "Quality construction",
      "Safety standards",
      "Project execution management",
    ],
    progressImages: [
      {
        image:
          "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Infrastructure site development",
        title: "Site Development",
        description:
          "Initial site development and infrastructure preparation activities.",
        status: "Completed",
        date: "July 2025",
        enabled: true,
        displayOrder: 0,
      },
      {
        image:
          "https://images.unsplash.com/photo-1590644365607-1c5a3f4a0e7a?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Infrastructure work",
        title: "Infrastructure Work",
        description:
          "Major infrastructure development and engineering activities are progressing.",
        status: "Ongoing",
        date: "November 2025",
        enabled: true,
        displayOrder: 1,
      },
      {
        image:
          "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Infrastructure construction progress",
        title: "Construction Progress",
        description:
          "Construction activities continue according to the planned project schedule.",
        status: "Ongoing",
        date: "April 2026",
        enabled: true,
        displayOrder: 2,
      },
      {
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Latest infrastructure development",
        title: "Latest Development",
        description:
          "Latest infrastructure development update from the project site.",
        status: "Ongoing",
        date: "August 2026",
        enabled: true,
        displayOrder: 3,
      },
    ],
  },

  {
    title: "Urban Development Project",
    category: "Infrastructure",
    status: "Upcoming",
    location: "Maharashtra, India",
    client: "Upcoming Client",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Urban development project",
    shortDescription:
      "A carefully planned urban development project focused on efficient planning and sustainable growth.",
    description:
      "This upcoming project focuses on efficient urban planning, responsible development and sustainable infrastructure solutions designed to create long-term value.",
    projectDetails:
      "This upcoming development will focus on responsible planning, efficient infrastructure and sustainable construction practices.",
    startDate: "To Be Announced",
    completionDate: "To Be Announced",
    enabled: true,
    displayOrder: 3,
    features: [
      "Urban development",
      "Infrastructure planning",
      "Sustainable development",
      "Modern construction planning",
      "Efficient land utilization",
    ],
    progressImages: [
      {
        image:
          "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Urban project planning",
        title: "Project Planning",
        description:
          "Initial planning and development concept for the upcoming urban project.",
        status: "Upcoming",
        date: "Planning Stage",
        enabled: true,
        displayOrder: 0,
      },
      {
        image:
          "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Urban development planning",
        title: "Development Planning",
        description:
          "Urban development planning and infrastructure requirements are being evaluated.",
        status: "Upcoming",
        date: "Planning Stage",
        enabled: true,
        displayOrder: 1,
      },
      {
        image:
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Future urban development",
        title: "Future Development",
        description:
          "Planned development concept focused on efficient and sustainable growth.",
        status: "Upcoming",
        date: "To Be Announced",
        enabled: true,
        displayOrder: 2,
      },
    ],
  },

  {
    title: "Industrial Facility",
    category: "Industrial",
    status: "Upcoming",
    location: "Maharashtra, India",
    client: "Industrial Client",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Industrial facility project",
    shortDescription:
      "A robust industrial facility designed and constructed with a focus on performance, safety and reliability.",
    description:
      "An industrial construction project planned around operational requirements, safety, structural performance and reliable execution.",
    projectDetails:
      "The industrial facility is planned to provide a strong, safe and reliable environment suitable for industrial operations.",
    startDate: "To Be Announced",
    completionDate: "To Be Announced",
    enabled: true,
    displayOrder: 4,
    features: [
      "Industrial facility construction",
      "Strong structural design",
      "Operational efficiency",
      "Safety-focused planning",
      "Reliable construction",
    ],
    progressImages: [
      {
        image:
          "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Industrial project planning",
        title: "Industrial Planning",
        description:
          "Initial industrial facility planning and project preparation.",
        status: "Upcoming",
        date: "Planning Stage",
        enabled: true,
        displayOrder: 0,
      },
      {
        image:
          "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Industrial facility development planning",
        title: "Facility Development Plan",
        description:
          "Structural and operational requirements are being prepared for execution.",
        status: "Upcoming",
        date: "Planning Stage",
        enabled: true,
        displayOrder: 1,
      },
      {
        image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Future industrial construction",
        title: "Future Construction",
        description:
          "Planned construction approach for the upcoming industrial facility.",
        status: "Upcoming",
        date: "To Be Announced",
        enabled: true,
        displayOrder: 2,
      },
    ],
  },

  {
    title: "Renovation & Development",
    category: "Renovation",
    status: "Completed",
    location: "Maharashtra, India",
    client: "Private Client",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Renovation and development project",
    shortDescription:
      "Renovation and development work that improves existing spaces while maintaining structural integrity.",
    description:
      "Renovation and development work focused on improving existing spaces while maintaining structural integrity, functionality and long-term performance.",
    projectDetails:
      "The renovation project focused on improving existing spaces, upgrading functionality and maintaining structural integrity.",
    startDate: "February 2024",
    completionDate: "November 2024",
    enabled: true,
    displayOrder: 5,
    features: [
      "Building renovation",
      "Space improvement",
      "Structural maintenance",
      "Interior development",
      "Quality finishing",
    ],
    progressImages: [
      {
        image:
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Existing structure before renovation",
        title: "Existing Structure",
        description:
          "Initial assessment and preparation of the existing structure for renovation.",
        status: "Ongoing",
        date: "March 2024",
        enabled: true,
        displayOrder: 0,
      },
      {
        image:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Renovation work",
        title: "Renovation Work",
        description:
          "Renovation and improvement activities were carried out across the existing space.",
        status: "Ongoing",
        date: "June 2024",
        enabled: true,
        displayOrder: 1,
      },
      {
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Interior development",
        title: "Interior Development",
        description:
          "Interior development and finishing work progressed according to the project requirements.",
        status: "Ongoing",
        date: "September 2024",
        enabled: true,
        displayOrder: 2,
      },
      {
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Completed renovation",
        title: "Renovation Completed",
        description:
          "The renovation and development work was successfully completed and delivered.",
        status: "Completed",
        date: "November 2024",
        enabled: true,
        displayOrder: 3,
      },
    ],
  },
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

function withEditorKey(item, prefix, index = 0) {
  return {
    ...item,
    _editorKey:
      item?._editorKey ||
      (item?.id
        ? `${prefix}-db-${item.id}`
        : createEditorKey(`${prefix}-${index}`)),
  };
}

function normalizeOrder(items) {
  return [...items]
    .sort(
      (a, b) =>
        Number(a?.displayOrder ?? 0) -
        Number(b?.displayOrder ?? 0) ||
        Number(a?.id ?? 0) - Number(b?.id ?? 0)
    )
    .map((item, index) => ({
      ...item,
      displayOrder: index,
    }));
}

function resolveImageUrl(value) {
  if (!value) {
    return "";
  }

  const url = String(value).trim();

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  if (url.startsWith("/images/")) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
}

/* =========================================================
   PROJECT DATE HELPERS
========================================================= */

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(
    String(value || "").trim()
  );
}

function toDateInputValue(value) {
  const raw = String(value || "").trim();

  if (!raw) return "";
  if (isIsoDate(raw)) return raw;

  const cleaned = raw.replace(/^expected\s+/i, "").trim();

  const match = cleaned.match(
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/i
  );

  if (match) {
    const months = [
      "january","february","march","april","may","june",
      "july","august","september","october","november","december",
    ];
    const monthIndex = months.indexOf(match[1].toLowerCase());
    if (monthIndex >= 0) {
      return `${match[2]}-${String(monthIndex + 1).padStart(2, "0")}-01`;
    }
  }

  const isoMatch = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  return isoMatch ? isoMatch[1] : "";
}

function formatDateForStorage(value, expected = false) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (!isIsoDate(raw)) return raw;

  const [year, month] = raw.split("-");
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const monthName = months[Number(month) - 1];

  if (!monthName) return raw;
  return `${expected ? "Expected " : ""}${monthName} ${year}`;
}

function compareProjectDates(startDate, completionDate) {
  const start = toDateInputValue(startDate);
  const completion = toDateInputValue(completionDate);

  if (!start || !completion) return 0;
  if (start < completion) return -1;
  if (start > completion) return 1;
  return 0;
}

function createEmptyProject(displayOrder = 0) {
  return withEditorKey(
    {
      title: "",
      category: "Commercial",
      status: "Upcoming",
      location: "",
      client: "",
      image: "",
      imageAlt: "",
      shortDescription: "",
      description: "",
      projectDetails: "",
      startDate: "",
      completionDate: "",
      enabled: true,
      displayOrder,
      features: [],
      progressImages: [],
      _featureBackendIds: [],
      _progressBackendIds: [],
    },
    "project"
  );
}

function createEmptyFeature(displayOrder = 0) {
  return withEditorKey(
    {
      feature: "",
      displayOrder,
    },
    "feature"
  );
}

function createEmptyProgressImage(displayOrder = 0) {
  return withEditorKey(
    {
      image: "",
      imageAlt: "",
      title: "",
      description: "",
      date: "",
      status: "Upcoming",
      enabled: true,
      displayOrder,
    },
    "progress"
  );
}

function prepareLoadedProject(project, features, progressImages) {
  return withEditorKey(
    {
      ...project,
      features: normalizeOrder(
        (features || []).map((item, index) =>
          withEditorKey(item, "feature", index)
        )
      ),
      progressImages: normalizeOrder(
        (progressImages || []).map((item, index) =>
          withEditorKey(item, "progress", index)
        )
      ),
      _featureBackendIds: (features || [])
        .map((item) => Number(item?.id))
        .filter(Number.isFinite),
      _progressBackendIds: (progressImages || [])
        .map((item) => Number(item?.id))
        .filter(Number.isFinite),
    },
    "project"
  );
}

function getStatusClass(status) {
  const value = String(status || "").toLowerCase();

  if (value.includes("completed")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (value.includes("ongoing")) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AdminProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  // Counts below represent SAVED database projects only.
  // A newly added project is kept locally until Save All is clicked.
  const [savedProjectCount, setSavedProjectCount] = useState(0);
  const [savedEnabledCount, setSavedEnabledCount] = useState(0);
  const [savedProgressCount, setSavedProgressCount] = useState(0);
  const [loadedBackendIds, setLoadedBackendIds] = useState([]);

  const [openProjects, setOpenProjects] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(PROJECTS_API);

      if (!response.ok) {
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Projects response is invalid.");
      }

      // Keep the saved/database count separate from the editor state.
      // This prevents an unsaved project from changing the Projects count.
      setSavedProjectCount(data.length);
      setLoadedBackendIds(
        data
          .map((project) => Number(project?.id))
          .filter(Number.isFinite)
      );

      const projectResults = await Promise.all(
        data.map(async (project, index) => {
          let features = [];
          let progressImages = [];

          try {
            const response = await fetch(
              `${PROJECTS_API}/${project.id}/features`
            );

            if (response.ok) {
              const value = await response.json();

              if (Array.isArray(value)) {
                features = value;
              }
            }
          } catch {
            // Keep empty features if a child request fails.
          }

          try {
            const response = await fetch(
              `${PROJECTS_API}/${project.id}/progress-images`
            );

            if (response.ok) {
              const value = await response.json();

              if (Array.isArray(value)) {
                progressImages = value;
              }
            }
          } catch {
            // Keep empty progress images if a child request fails.
          }

          return prepareLoadedProject(
            {
              ...project,
              displayOrder: project.displayOrder ?? index,
            },
            features,
            progressImages
          );
        })
      );

      const normalizedProjects = normalizeOrder(projectResults);

      setProjects(normalizedProjects);
      setSavedEnabledCount(
        normalizedProjects.filter(
          (project) => project.enabled !== false
        ).length
      );
      setSavedProgressCount(
        normalizedProjects.reduce(
          (total, project) =>
            total + (project.progressImages?.length || 0),
          0
        )
      );

      const nextOpen = {};

      projectResults.forEach((project) => {
        if (project.id != null) {
          nextOpen[project._editorKey] = false;
        }
      });

      setOpenProjects(nextOpen);
    } catch (err) {
      console.error(err);

      setError(
        "Could not connect to the Projects backend. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =======================================================
     PROJECT HELPERS
  ======================================================= */

  function toggleProject(editorKey) {
    setOpenProjects((previous) => ({
      ...previous,
      [editorKey]: !previous[editorKey],
    }));
  }

  function openProjectEditor(editorKey) {
    // Keep the editor focused on one project at a time so the Admin
    // does not have to scroll through several expanded projects.
    setOpenProjects(() => ({
      [editorKey]: true,
    }));

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const element = document.getElementById(
          `project-card-${editorKey}`
        );

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  function updateProject(editorKey, field, value) {
    setProjects((previous) =>
      previous.map((project) =>
        project._editorKey === editorKey
          ? {
              ...project,
              [field]: value,
            }
          : project
      )
    );

    setMessage("");
    setError("");
  }

  function updateProjectChild(
    projectKey,
    childType,
    childKey,
    field,
    value
  ) {
    setProjects((previous) =>
      previous.map((project) => {
        if (project._editorKey !== projectKey) {
          return project;
        }

        const collection =
          childType === "feature"
            ? project.features || []
            : project.progressImages || [];

        const nextCollection = collection.map((item) =>
          item._editorKey === childKey
            ? {
                ...item,
                [field]: value,
              }
            : item
        );

        return childType === "feature"
          ? {
              ...project,
              features: nextCollection,
            }
          : {
              ...project,
              progressImages: nextCollection,
            };
      })
    );

    setMessage("");
    setError("");
  }

  function moveProject(projectKey, direction) {
    setProjects((previous) => {
      const ordered = normalizeOrder(previous);

      const currentIndex = ordered.findIndex(
        (project) => project._editorKey === projectKey
      );

      if (currentIndex === -1) {
        return previous;
      }

      const targetIndex =
        direction === "up"
          ? currentIndex - 1
          : currentIndex + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= ordered.length
      ) {
        return previous;
      }

      const reordered = [...ordered];

      [reordered[currentIndex], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[currentIndex],
      ];

      return reordered.map((project, nextIndex) => ({
        ...project,
        displayOrder: nextIndex,
      }));
    });

    setMessage(
      "Project order changed. Click Save All to apply the new order to the website."
    );
    setError("");
  }

  function moveChild(
    projectKey,
    childType,
    childIndex,
    direction
  ) {
    setProjects((previous) =>
      previous.map((project) => {
        if (project._editorKey !== projectKey) {
          return project;
        }

        const source =
          childType === "feature"
            ? project.features || []
            : project.progressImages || [];

        const ordered = normalizeOrder(source);

        const targetIndex =
          direction === "up"
            ? childIndex - 1
            : childIndex + 1;

        if (
          targetIndex < 0 ||
          targetIndex >= ordered.length
        ) {
          return project;
        }

        [ordered[childIndex], ordered[targetIndex]] = [
          ordered[targetIndex],
          ordered[childIndex],
        ];

        return childType === "feature"
          ? {
              ...project,
              features: ordered,
            }
          : {
              ...project,
              progressImages: ordered,
            };
      })
    );
  }

  function addProject() {
    const project = createEmptyProject(projects.length);

    setProjects((previous) => [
      ...normalizeOrder(previous),
      project,
    ]);

    setMessage("");
    setError("");

    // The new project is NOT a saved project yet, so the Projects count
    // intentionally remains unchanged until Save All succeeds.
    // Open it immediately and take the Admin directly to the new card.
    openProjectEditor(project._editorKey);
  }

  function deleteProjectLocal(project) {
    const confirmed = window.confirm(
      `Delete "${project.title || "this project"}"? This will remove the project and all of its details from the database after Save All.`
    );

    if (!confirmed) {
      return;
    }

    setProjects((previous) =>
      normalizeOrder(
        previous.filter(
          (item) =>
            item._editorKey !== project._editorKey
        )
      )
    );

    setMessage(
      "Project removed from the editor. Click Save All to apply the deletion."
    );
    setError("");
  }

  function addFeature(projectKey) {
    setProjects((previous) =>
      previous.map((project) => {
        if (project._editorKey !== projectKey) {
          return project;
        }

        const current = project.features || [];
        const item = createEmptyFeature(current.length);

        return {
          ...project,
          features: normalizeOrder([
            ...current,
            item,
          ]),
        };
      })
    );
  }

  function deleteFeature(projectKey, feature) {
    const confirmed = window.confirm(
      "Delete this feature?"
    );

    if (!confirmed) {
      return;
    }

    setProjects((previous) =>
      previous.map((project) => {
        if (project._editorKey !== projectKey) {
          return project;
        }

        return {
          ...project,
          features: normalizeOrder(
            (project.features || []).filter(
              (item) =>
                item._editorKey !==
                feature._editorKey
            )
          ),
        };
      })
    );
  }

  function addProgressImage(projectKey) {
    setProjects((previous) =>
      previous.map((project) => {
        if (project._editorKey !== projectKey) {
          return project;
        }

        const current = project.progressImages || [];
        const item =
          createEmptyProgressImage(current.length);

        return {
          ...project,
          progressImages: normalizeOrder([
            ...current,
            item,
          ]),
        };
      })
    );
  }

  function deleteProgressImage(
    projectKey,
    progressImage
  ) {
    const confirmed = window.confirm(
      "Delete this progress image?"
    );

    if (!confirmed) {
      return;
    }

    setProjects((previous) =>
      previous.map((project) => {
        if (project._editorKey !== projectKey) {
          return project;
        }

        return {
          ...project,
          progressImages: normalizeOrder(
            (project.progressImages || []).filter(
              (item) =>
                item._editorKey !==
                progressImage._editorKey
            )
          ),
        };
      })
    );
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
      setError("Please select a valid image file.");
      return;
    }

    const maxSize = 500 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Maximum image size is 500 MB.");
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
        let messageText =
          "Image upload failed.";

        try {
          const data =
            await response.json();

          if (data?.message) {
            messageText = data.message;
          }
        } catch {
          // Ignore parsing failure.
        }

        throw new Error(messageText);
      }

      const data = await response.json();

      const imageUrl =
        data?.url ||
        data?.imageUrl ||
        data?.path;

      if (!imageUrl) {
        throw new Error(
          "Upload succeeded but no image URL was returned."
        );
      }

      callback(imageUrl);

      setMessage(
        "Image uploaded successfully. Click Save All to save the project."
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleProjectImageUpload(
    file,
    projectKey
  ) {
    if (!file) {
      return;
    }

    await uploadImage(
      file,
      "projects",
      (url) => {
        updateProject(
          projectKey,
          "image",
          url
        );
      }
    );
  }

  async function handleProgressImageUpload(
    file,
    projectKey,
    progressKey
  ) {
    if (!file) {
      return;
    }

    await uploadImage(
      file,
      "projects/progress",
      (url) => {
        updateProjectChild(
          projectKey,
          "progress",
          progressKey,
          "image",
          url
        );
      }
    );
  }

  /* =======================================================
     SAVE HELPERS
  ======================================================= */

  function projectPayload(project) {
    return {
      title: String(project.title || "").trim(),
      category:
        String(project.category || "").trim(),
      status:
        String(project.status || "Upcoming").trim(),
      location:
        String(project.location || "").trim(),
      client:
        String(project.client || "").trim(),
      image:
        String(project.image || "").trim(),
      imageAlt:
        String(project.imageAlt || "").trim(),
      shortDescription:
        String(
          project.shortDescription || ""
        ).trim(),
      description:
        String(project.description || "").trim(),
      projectDetails:
        String(
          project.projectDetails || ""
        ).trim(),
      startDate: formatDateForStorage(
        project.startDate,
        false
      ),
      completionDate: formatDateForStorage(
        project.completionDate,
        String(project.status || "").trim() !==
          "Completed"
      ),
      enabled:
        project.enabled !== false,
      displayOrder:
        Number(project.displayOrder || 0),
    };
  }

  function isMeaningfulFeature(item) {
    return String(
      item?.feature || ""
    ).trim() !== "";
  }

  function isMeaningfulProgressImage(item) {
    return [
      item?.image,
      item?.title,
      item?.description,
      item?.date,
      item?.status,
    ].some(
      (value) =>
        String(value || "").trim() !== ""
    );
  }

  async function saveProjectChildren(
    savedProject,
    originalProject
  ) {
    const projectId = savedProject.id;

    const featureList = normalizeOrder(
      originalProject.features || []
    ).filter(isMeaningfulFeature);

    const progressList = normalizeOrder(
      originalProject.progressImages || []
    ).filter(isMeaningfulProgressImage);

    const savedFeatureIds = [];

    for (
      let index = 0;
      index < featureList.length;
      index += 1
    ) {
      const item = featureList[index];

      const numericId = Number(item?.id);
      const hasId = Number.isFinite(numericId);

      const payload = {
        feature: String(
          item.feature || ""
        ).trim(),
        displayOrder: index,
      };

      const response = await fetch(
        hasId
          ? `${PROJECTS_API}/${projectId}/features/${numericId}`
          : `${PROJECTS_API}/${projectId}/features`,
        {
          method: hasId ? "PUT" : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const body = await response.text();

        throw new Error(
          body ||
            `Failed to save project feature "${payload.feature}".`
        );
      }

      const saved = await response.json();

      if (saved?.id != null) {
        savedFeatureIds.push(
          Number(saved.id)
        );
      }
    }

    const existingFeatureIds =
      originalProject._featureBackendIds ||
      [];

    const featureIdsToDelete =
      existingFeatureIds.filter(
        (id) =>
          !savedFeatureIds.includes(
            Number(id)
          )
      );

    for (const id of featureIdsToDelete) {
      const response = await fetch(
        `${PROJECTS_API}/${projectId}/features/${id}`,
        {
          method: "DELETE",
        }
      );

      if (
        !response.ok &&
        response.status !== 404
      ) {
        throw new Error(
          `Failed to remove project feature ID ${id}.`
        );
      }
    }

    const savedProgressIds = [];

    for (
      let index = 0;
      index < progressList.length;
      index += 1
    ) {
      const item = progressList[index];

      const numericId = Number(item?.id);
      const hasId = Number.isFinite(numericId);

      const payload = {
        image:
          String(item.image || "").trim(),
        imageAlt:
          String(
            item.imageAlt || ""
          ).trim(),
        title:
          String(item.title || "").trim(),
        description:
          String(
            item.description || ""
          ).trim(),
        date:
          String(item.date || "").trim(),
        status:
          String(
            item.status || "Upcoming"
          ).trim(),
        enabled:
          item.enabled !== false,
        displayOrder: index,
      };

      const response = await fetch(
        hasId
          ? `${PROJECTS_API}/${projectId}/progress-images/${numericId}`
          : `${PROJECTS_API}/${projectId}/progress-images`,
        {
          method: hasId ? "PUT" : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const body = await response.text();

        throw new Error(
          body ||
            `Failed to save progress image "${payload.title}".`
        );
      }

      const saved = await response.json();

      if (saved?.id != null) {
        savedProgressIds.push(
          Number(saved.id)
        );
      }
    }

    const existingProgressIds =
      originalProject._progressBackendIds ||
      [];

    const progressIdsToDelete =
      existingProgressIds.filter(
        (id) =>
          !savedProgressIds.includes(
            Number(id)
          )
      );

    for (const id of progressIdsToDelete) {
      const response = await fetch(
        `${PROJECTS_API}/${projectId}/progress-images/${id}`,
        {
          method: "DELETE",
        }
      );

      if (
        !response.ok &&
        response.status !== 404
      ) {
        throw new Error(
          `Failed to remove progress image ID ${id}.`
        );
      }
    }

    return {
      savedFeatureIds,
      savedProgressIds,
    };
  }

  /* =======================================================
     SAVE ALL
  ======================================================= */

  async function saveAll() {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const orderedProjects =
        normalizeOrder(projects);

      // These are the project IDs that existed in the database when this
      // editor state was loaded. This is important for correctly deleting
      // a project that the Admin removed locally before clicking Save All.
      const currentBackendIds = loadedBackendIds;

      const savedProjects = [];

      for (
        let index = 0;
        index < orderedProjects.length;
        index += 1
      ) {
        const project =
          orderedProjects[index];

        const payload = {
          ...projectPayload(project),
          displayOrder: index,
        };

        // All project fields are optional. A new project can be
        // saved even when the Admin has not filled any details yet.
        // The only validation here protects the project timeline.
        const startInputDate = toDateInputValue(
          project.startDate
        );
        const completionInputDate =
          toDateInputValue(
            project.completionDate
          );

        const dateOrder = compareProjectDates(
          startInputDate,
          completionInputDate
        );

        if (
          startInputDate &&
          completionInputDate &&
          dateOrder >= 0
        ) {
          throw new Error(
            `Project ${index + 1}: Project Started date must be earlier than the Completion / Expected Completion date.`
          );
        }

        const numericId = Number(
          project?.id
        );

        const hasId =
          Number.isFinite(numericId);

        const response = await fetch(
          hasId
            ? `${PROJECTS_API}/${numericId}`
            : PROJECTS_API,
          {
            method: hasId
              ? "PUT"
              : "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              payload
            ),
          }
        );

        if (!response.ok) {
          const body = await response.text();

          throw new Error(
            body ||
              `Failed to save project "${payload.title}".`
          );
        }

        const savedProject =
          await response.json();

        const childResult =
          await saveProjectChildren(
            savedProject,
            project
          );

        savedProjects.push({
          ...savedProject,
          features: [],
          progressImages: [],
          _featureBackendIds:
            childResult.savedFeatureIds,
          _progressBackendIds:
            childResult.savedProgressIds,
          _editorKey:
            project._editorKey ||
            createEditorKey("project"),
        });
      }

      const savedIds =
        savedProjects
          .map((project) =>
            Number(project?.id)
          )
          .filter(Number.isFinite);

      const idsToDelete =
        currentBackendIds.filter(
          (id) =>
            !savedIds.includes(id)
        );

      for (const id of idsToDelete) {
        const response = await fetch(
          `${PROJECTS_API}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (
          !response.ok &&
          response.status !== 404
        ) {
          throw new Error(
            `Failed to delete removed project ID ${id}.`
          );
        }
      }

      await loadAll();

      setMessage(
        "Projects saved successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Failed to save Projects CMS."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     RESET DEFAULTS
  ======================================================= */

  async function resetDefaults() {
    const confirmed = window.confirm(
      "Reset Projects CMS to the default projects? This will replace the current Projects content in the database."
    );

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const current =
        await fetch(PROJECTS_API);

      if (current.ok) {
        const existing =
          await current.json();

        if (Array.isArray(existing)) {
          for (const project of existing) {
            const id = Number(
              project?.id
            );

            if (!Number.isFinite(id)) {
              continue;
            }

            const response =
              await fetch(
                `${PROJECTS_API}/${id}`,
                {
                  method: "DELETE",
                }
              );

            if (
              !response.ok &&
              response.status !== 404
            ) {
              throw new Error(
                `Failed to reset project ID ${id}.`
              );
            }
          }
        }
      }

      const defaults =
        cloneData(DEFAULT_PROJECTS);

      const savedProjects = [];

      for (
        let index = 0;
        index < defaults.length;
        index += 1
      ) {
        const defaultProject =
          defaults[index];

        const projectPayloadData = {
          ...defaultProject,
          displayOrder: index,
        };

        delete projectPayloadData.features;
        delete projectPayloadData.progressImages;

        const response = await fetch(
          PROJECTS_API,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              projectPayloadData
            ),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to recreate default projects."
          );
        }

        const savedProject =
          await response.json();

        for (
          let featureIndex = 0;
          featureIndex <
          defaultProject.features.length;
          featureIndex += 1
        ) {
          const response =
            await fetch(
              `${PROJECTS_API}/${savedProject.id}/features`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  feature:
                    defaultProject
                      .features[
                      featureIndex
                    ],
                  displayOrder:
                    featureIndex,
                }),
              }
            );

          if (!response.ok) {
            throw new Error(
              "Failed to recreate default project features."
            );
          }
        }

        for (
          let imageIndex = 0;
          imageIndex <
          defaultProject
            .progressImages.length;
          imageIndex += 1
        ) {
          const image =
            defaultProject
              .progressImages[
              imageIndex
            ];

          const response =
            await fetch(
              `${PROJECTS_API}/${savedProject.id}/progress-images`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  ...image,
                  displayOrder:
                    imageIndex,
                }),
              }
            );

          if (!response.ok) {
            throw new Error(
              "Failed to recreate default progress images."
            );
          }
        }

        savedProjects.push(
          savedProject
        );
      }

      await loadAll();

      setMessage(
        "Projects defaults restored successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Failed to reset Projects CMS."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     RENDER
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9]">
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <Loader2
                size={32}
                className="animate-spin text-[#C9A03B]"
              />
              <p className="text-sm font-semibold">
                Loading Projects CMS...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/home")
              }
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Back to admin home"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B28A20]">
                Saam Infrastructure
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Projects Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage project cards, complete
                project details, features, timeline
                information and progress galleries.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadAll}
              disabled={loading || saving}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              type="button"
              onClick={addProject}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              <Plus size={16} />
              Add Project
            </button>

            <button
              type="button"
              onClick={saveAll}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A03B] px-4 py-2.5 text-sm font-black text-slate-900 transition hover:bg-[#B28A20] hover:text-white disabled:opacity-60"
            >
              {saving ? (
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

        {/* ===================================================
            INTRO
        =================================================== */}

        <section className="mb-6 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-lg sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#D7B44D]">
                Website Management
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                Projects + Project Details
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Every project is managed as one record.
                The public Projects page and its
                corresponding Project Details page
                use the same project data.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatBox
                label="Projects"
                value={savedProjectCount}
              />

              <StatBox
                label="Enabled"
                value={savedEnabledCount}
              />

              <StatBox
                label="Progress"
                value={savedProgressCount}
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            MESSAGES
        =================================================== */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <X
              size={18}
              className="mt-0.5 shrink-0"
            />
            <span>{error}</span>
          </div>
        )}

        {/* ===================================================
            PROJECTS
        =================================================== */}

        {projects.length === 0 ? (
          <EmptyState onAdd={addProject} />
        ) : (
          <div className="space-y-5">
            {normalizeOrder(projects).map(
              (project, index) => {
                const open =
                  Boolean(
                    openProjects[
                      project._editorKey
                    ]
                  );

                return (
                  <ProjectEditor
                    key={
                      project._editorKey ||
                      project.id ||
                      index
                    }
                    project={project}
                    index={index}
                    open={open}
                    projects={projects}
                    uploading={uploading}
                    onToggle={() =>
                      toggleProject(
                        project._editorKey
                      )
                    }
                    onEdit={() =>
                      openProjectEditor(
                        project._editorKey
                      )
                    }
                    onUpdate={(field, value) =>
                      updateProject(
                        project._editorKey,
                        field,
                        value
                      )
                    }
                    onMove={(direction) =>
                      moveProject(
                        project._editorKey,
                        direction
                      )
                    }
                    onDelete={() =>
                      deleteProjectLocal(
                        project
                      )
                    }
                    onAddFeature={() =>
                      addFeature(
                        project._editorKey
                      )
                    }
                    onDeleteFeature={(feature) =>
                      deleteFeature(
                        project._editorKey,
                        feature
                      )
                    }
                    onMoveFeature={(
                      childIndex,
                      direction
                    ) =>
                      moveChild(
                        project._editorKey,
                        "feature",
                        childIndex,
                        direction
                      )
                    }
                    onUpdateFeature={(
                      childKey,
                      field,
                      value
                    ) =>
                      updateProjectChild(
                        project._editorKey,
                        "feature",
                        childKey,
                        field,
                        value
                      )
                    }
                    onAddProgress={() =>
                      addProgressImage(
                        project._editorKey
                      )
                    }
                    onDeleteProgress={(
                      progress
                    ) =>
                      deleteProgressImage(
                        project._editorKey,
                        progress
                      )
                    }
                    onMoveProgress={(
                      childIndex,
                      direction
                    ) =>
                      moveChild(
                        project._editorKey,
                        "progress",
                        childIndex,
                        direction
                      )
                    }
                    onUpdateProgress={(
                      childKey,
                      field,
                      value
                    ) =>
                      updateProjectChild(
                        project._editorKey,
                        "progress",
                        childKey,
                        field,
                        value
                      )
                    }
                    onProjectImageUpload={
                      handleProjectImageUpload
                    }
                    onProgressImageUpload={
                      handleProgressImageUpload
                    }
                  />
                );
              }
            )}
          </div>
        )}

        {/* ===================================================
            BOTTOM ACTION BAR
        =================================================== */}

        <section className="sticky bottom-4 z-30 mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="text-sm text-slate-500">
            <span className="font-black text-slate-800">
              {savedProjectCount}
            </span>{" "}
            {savedProjectCount === 1
              ? "saved project"
              : "saved projects"}{" "}
            in the database
            {projects.length !== savedProjectCount && (
              <span className="ml-2 font-semibold text-[#B28A20]">
                · {Math.max(
                  0,
                  projects.length - savedProjectCount
                )} unsaved change
                {projects.length - savedProjectCount === 1
                  ? ""
                  : "s"}
              </span>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={resetDefaults}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              Reset Defaults
            </button>

            <button
              type="button"
              onClick={saveAll}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A03B] px-4 py-2.5 text-sm font-black text-slate-900 transition hover:bg-[#B28A20] hover:text-white disabled:opacity-60"
            >
              {saving ? (
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
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   PROJECT EDITOR
========================================================= */

function ProjectEditor({
  project,
  index,
  open,
  projects,
  uploading,
  onToggle,
  onEdit,
  onUpdate,
  onMove,
  onDelete,
  onAddFeature,
  onDeleteFeature,
  onMoveFeature,
  onUpdateFeature,
  onAddProgress,
  onDeleteProgress,
  onMoveProgress,
  onUpdateProgress,
  onProjectImageUpload,
  onProgressImageUpload,
}) {
  const featureCount =
    project.features?.length || 0;

  const progressCount =
    project.progressImages?.length || 0;

  return (
    <section
      id={`project-card-${project._editorKey}`}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      {/* =====================================================
          PROJECT HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 items-center gap-4 text-left"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-[#D7B44D]">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate font-black text-slate-900 sm:text-lg">
                {project.title ||
                  "Untitled Project"}
              </h2>

              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${getStatusClass(
                  project.status
                )}`}
              >
                {project.status ||
                  "Upcoming"}
              </span>

              {project.enabled !==
                false ? (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700">
                  Enabled
                </span>
              ) : (
                <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
                  Disabled
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {project.category ||
                "No category"}{" "}
              · {featureCount}{" "}
              {featureCount === 1
                ? "feature"
                : "features"}{" "}
              · {progressCount}{" "}
              {progressCount === 1
                ? "progress image"
                : "progress images"}
            </p>
          </div>

          <div className="ml-auto shrink-0 lg:hidden">
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
          </div>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-black transition ${
              open
                ? "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
            aria-label={
              open
                ? "Close project editor"
                : "Edit project"
            }
          >
            <Pencil size={15} />
            {open ? "Close Editor" : "Edit Project"}
          </button>

          <button
            type="button"
            onClick={() =>
              onMove("up")
            }
            disabled={index === 0}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Move project up"
          >
            <ArrowUp size={16} />
          </button>

          <button
            type="button"
            onClick={() =>
              onMove("down")
            }
            disabled={index === projects.length - 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Move project down"
          >
            <ArrowDown size={16} />
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:inline-flex"
            aria-label={
              open
                ? "Collapse project"
                : "Expand project"
            }
          >
            {open ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
            aria-label="Delete project"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* =====================================================
          PROJECT CONTENT
      ===================================================== */}

      {open && (
        <div className="p-5 sm:p-6">
          {/* =================================================
              01 BASIC INFORMATION
          ================================================= */}

          <CmsSection
            number="01"
            title="Basic Information"
            description="Project details used by the project card and the Project Details page."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Project Title"
                value={project.title}
                onChange={(value) =>
                  onUpdate(
                    "title",
                    value
                  )
                }
                placeholder="Enter project title (optional)"
              />

              <SelectField
                label="Category"
                value={project.category}
                onChange={(value) =>
                  onUpdate(
                    "category",
                    value
                  )
                }
                options={[
                  "Commercial",
                  "Residential",
                  "Infrastructure",
                  "Industrial",
                  "Renovation",
                ]}
              />

              <SelectField
                label="Status"
                value={project.status}
                onChange={(value) =>
                  onUpdate(
                    "status",
                    value
                  )
                }
                options={[
                  "Upcoming",
                  "Ongoing",
                  "Completed",
                ]}
              />

              <Field
                label="Location"
                value={project.location}
                onChange={(value) =>
                  onUpdate(
                    "location",
                    value
                  )
                }
              />

              <Field
                label="Client"
                value={project.client}
                onChange={(value) =>
                  onUpdate(
                    "client",
                    value
                  )
                }
              />

              <DateField
                label="Project Started"
                value={project.startDate}
                max={toDateInputValue(
                  project.completionDate
                )}
                onChange={(value) =>
                  onUpdate(
                    "startDate",
                    value
                  )
                }
                helpText="Select the project start date from the calendar."
              />

              <DateField
                label="Completion / Expected Completion"
                value={
                  project.completionDate
                }
                min={toDateInputValue(
                  project.startDate
                )}
                onChange={(value) =>
                  onUpdate(
                    "completionDate",
                    value
                  )
                }
                helpText="Select a date later than the project start date."
              />
            </div>

            <div className="mt-5">
              <ToggleField
                label="Project Visible on Website"
                checked={
                  project.enabled !==
                  false
                }
                onChange={(value) =>
                  onUpdate(
                    "enabled",
                    value
                  )
                }
              />
            </div>
          </CmsSection>

          {/* =================================================
              02 MAIN IMAGE
          ================================================= */}

          <CmsSection
            number="02"
            title="Main / Hero Image"
            description="Main image used on the Projects card and Project Details hero."
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <ImageUploadField
                label="Project Image"
                value={project.image}
                altText={project.imageAlt}
                uploading={uploading}
                onUpload={(event) =>
                  onProjectImageUpload(
                    event,
                    project._editorKey
                  )
                }
                onClear={() =>
                  onUpdate(
                    "image",
                    ""
                  )
                }
              />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="mb-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Image Accessibility
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Add descriptive alt text for the main project image. This field stays directly beside the image upload.
                  </p>
                </div>

                <Field
                  label="Image Alt Text"
                  value={project.imageAlt}
                  onChange={(value) =>
                    onUpdate(
                      "imageAlt",
                      value
                    )
                  }
                  placeholder="Describe the project image"
                />
              </div>
            </div>
          </CmsSection>

          {/* =================================================
              03 PROJECT DETAILS CONTENT
          ================================================= */}

          <CmsSection
            number="03"
            title="Project Details Content"
            description="Edit the text shown in the Project Overview, Project Client and About This Project sections."
          >
            <div className="space-y-6">
              {/* PROJECT OVERVIEW */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="mb-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B28A20]">
                    Project Overview
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    These texts are displayed in the Project Overview section
                    on the public Project Details page.
                  </p>
                </div>

                <div className="space-y-5">
                  <TextAreaField
                    label="Project Overview Text"
                    value={project.shortDescription}
                    onChange={(value) =>
                      onUpdate(
                        "shortDescription",
                        value
                      )
                    }
                    rows={4}
                  />

                  <TextAreaField
                    label="Project Overview Detailed Text"
                    value={project.description}
                    onChange={(value) =>
                      onUpdate(
                        "description",
                        value
                      )
                    }
                    rows={6}
                  />
                </div>
              </div>

              {/* PROJECT CLIENT */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="mb-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B28A20]">
                    Project Client
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Edit the client text displayed in the Project Client
                    section on the public page.
                  </p>
                </div>

                <Field
                  label="Client Text"
                  value={project.client}
                  onChange={(value) =>
                    onUpdate(
                      "client",
                      value
                    )
                  }
                  icon={UserRound}
                />
              </div>

              {/* ABOUT THIS PROJECT */}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <div className="mb-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B28A20]">
                    About This Project
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Edit the Project Details text shown above the feature
                    list on the public Project Details page.
                  </p>
                </div>

                <TextAreaField
                  label="Project Details Text"
                  value={project.projectDetails}
                  onChange={(value) =>
                    onUpdate(
                      "projectDetails",
                      value
                    )
                  }
                  rows={6}
                />
              </div>
            </div>
          </CmsSection>

          {/* =================================================
              04 FEATURES
          ================================================= */}

          <CmsSection
            number="04"
            title="Project Features"
            description="Unlimited feature points displayed in the About This Project section."
            action={
              <button
                type="button"
                onClick={onAddFeature}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-black text-white transition hover:bg-slate-800"
              >
                <Plus size={16} />
                Add Feature
              </button>
            }
          >
            {featureCount === 0 ? (
              <InlineEmpty
                text="No features added yet."
                actionLabel="Add Feature"
                onAction={
                  onAddFeature
                }
              />
            ) : (
              <div className="space-y-3">
                {normalizeOrder(
                  project.features || []
                ).map(
                  (
                    feature,
                    featureIndex
                  ) => (
                    <div
                      key={
                        feature._editorKey ||
                        feature.id ||
                        featureIndex
                      }
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex shrink-0 items-center gap-2 text-slate-400">
                        <GripVertical
                          size={18}
                        />

                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-black text-slate-500 shadow-sm">
                          {String(
                            featureIndex +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>

                      <input
                        value={
                          feature.feature ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          onUpdateFeature(
                            feature._editorKey,
                            "feature",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="Feature name"
                        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
                      />

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onMoveFeature(
                              featureIndex,
                              "up"
                            )
                          }
                          disabled={
                            featureIndex ===
                            0
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30"
                        >
                          <ArrowUp
                            size={15}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onMoveFeature(
                              featureIndex,
                              "down"
                            )
                          }
                          disabled={
                            featureIndex ===
                            featureCount -
                              1
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30"
                        >
                          <ArrowDown
                            size={15}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onDeleteFeature(
                              feature
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2
                            size={15}
                          />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </CmsSection>

          {/* =================================================
              05 PROJECT TIMELINE
          ================================================= */}

          <CmsSection
            number="05"
            title="Project Timeline"
            description="Dates displayed in the Project Timeline section."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <DateField
                label="Project Started"
                value={project.startDate}
                max={toDateInputValue(
                  project.completionDate
                )}
                onChange={(value) =>
                  onUpdate(
                    "startDate",
                    value
                  )
                }
                helpText="Select the start date from the calendar."
              />

              <DateField
                label={
                  project.status ===
                  "Completed"
                    ? "Project Completed"
                    : "Expected Completion"
                }
                value={
                  project.completionDate
                }
                min={toDateInputValue(
                  project.startDate
                )}
                onChange={(value) =>
                  onUpdate(
                    "completionDate",
                    value
                  )
                }
                helpText="Select a completion date later than the start date."
              />
            </div>
          </CmsSection>

          {/* =================================================
              06 PROGRESS IMAGES
          ================================================= */}

          <CmsSection
            number="06"
            title="Project Progress Images"
            description="Unlimited progress updates displayed on the Project Details page."
            action={
              <button
                type="button"
                onClick={onAddProgress}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-black text-white transition hover:bg-slate-800"
              >
                <Plus size={16} />
                Add Progress
              </button>
            }
          >
            {progressCount === 0 ? (
              <InlineEmpty
                text="No progress images added yet."
                actionLabel="Add Progress Image"
                onAction={
                  onAddProgress
                }
              />
            ) : (
              <div className="space-y-5">
                {normalizeOrder(
                  project.progressImages ||
                    []
                ).map(
                  (
                    progress,
                    progressIndex
                  ) => (
                    <div
                      key={
                        progress._editorKey ||
                        progress.id ||
                        progressIndex
                      }
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                    >
                      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-[#D7B44D]">
                            {String(
                              progressIndex +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-black text-slate-900">
                              {progress.title ||
                                `Progress Update ${
                                  progressIndex +
                                  1
                                }`}
                            </p>

                            <p className="text-xs text-slate-500">
                              {progress.status ||
                                "Upcoming"}
                              {progress.date
                                ? ` · ${progress.date}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onMoveProgress(
                                progressIndex,
                                "up"
                              )
                            }
                            disabled={
                              progressIndex ===
                              0
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30"
                          >
                            <ArrowUp
                              size={15}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onMoveProgress(
                                progressIndex,
                                "down"
                              )
                            }
                            disabled={
                              progressIndex ===
                              progressCount -
                                1
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30"
                          >
                            <ArrowDown
                              size={15}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onDeleteProgress(
                                progress
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2
                              size={15}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
                          <div>
                            <ImageUploadField
                              label="Progress Image"
                              value={
                                progress.image
                              }
                              compact
                              uploading={
                                uploading
                              }
                              onUpload={(
                                event
                              ) =>
                                onProgressImageUpload(
                                  event,
                                  project._editorKey,
                                  progress._editorKey
                                )
                              }
                              onClear={() =>
                                onUpdateProgress(
                                  progress._editorKey,
                                  "image",
                                  ""
                                )
                              }
                            />
                          </div>

                          <div className="grid gap-5 md:grid-cols-2">
                            <Field
                              label="Title"
                              value={
                                progress.title
                              }
                              onChange={(
                                value
                              ) =>
                                onUpdateProgress(
                                  progress._editorKey,
                                  "title",
                                  value
                                )
                              }
                            />

                            <SelectField
                              label="Status"
                              value={
                                progress.status
                              }
                              onChange={(
                                value
                              ) =>
                                onUpdateProgress(
                                  progress._editorKey,
                                  "status",
                                  value
                                )
                              }
                              options={[
                                "Upcoming",
                                "Ongoing",
                                "Completed",
                              ]}
                            />

                            <Field
                              label="Date / Stage"
                              value={
                                progress.date
                              }
                              onChange={(
                                value
                              ) =>
                                onUpdateProgress(
                                  progress._editorKey,
                                  "date",
                                  value
                                )
                              }
                              icon={
                                CalendarDays
                              }
                            />

                            <Field
                              label="Image Alt Text"
                              value={
                                progress.imageAlt
                              }
                              onChange={(
                                value
                              ) =>
                                onUpdateProgress(
                                  progress._editorKey,
                                  "imageAlt",
                                  value
                                )
                              }
                            />

                            <div className="md:col-span-2">
                              <TextAreaField
                                label="Description"
                                value={
                                  progress.description
                                }
                                onChange={(
                                  value
                                ) =>
                                  onUpdateProgress(
                                    progress._editorKey,
                                    "description",
                                    value
                                  )
                                }
                                rows={4}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <ToggleField
                                label="Show This Progress Image"
                                checked={
                                  progress.enabled !==
                                  false
                                }
                                onChange={(
                                  value
                                ) =>
                                  onUpdateProgress(
                                    progress._editorKey,
                                    "enabled",
                                    value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </CmsSection>

          {/* =================================================
              07 PREVIEW INFO
          ================================================= */}

          <CmsSection
            number="07"
            title="Project Details Preview"
            description="Quick confirmation of the data connected to the public Project Details page."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard
                icon={MapPin}
                label="Location"
                value={
                  project.location ||
                  "Not set"
                }
              />

              <InfoCard
                icon={Building2}
                label="Category"
                value={
                  project.category ||
                  "Not set"
                }
              />

              <InfoCard
                icon={UserRound}
                label="Client"
                value={
                  project.client ||
                  "Not set"
                }
              />

              <InfoCard
                icon={Images}
                label="Progress Images"
                value={String(
                  progressCount
                )}
              />
            </div>

            <div className="mt-4 rounded-2xl border border-[#E6D49A] bg-[#FFF9E8] p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-[#B28A20]"
                />

                <div>
                  <p className="text-sm font-black text-slate-900">
                    Public Project Details URL
                  </p>

                  {project.id ? (
                    <p className="mt-1 break-all text-xs font-semibold text-slate-600">
                      /projects/{project.id}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs font-semibold text-slate-600">
                      A URL will be created after the
                      project is saved.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CmsSection>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   CMS SECTION
========================================================= */

function CmsSection({
  number,
  title,
  description,
  action,
  children,
}) {
  const [open, setOpen] =
    useState(true);

  return (
    <section className="mb-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm last:mb-0">
      <button
        type="button"
        onClick={() =>
          setOpen(
            (previous) => !previous
          )
        }
        className="flex w-full items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-[#D7B44D]">
            {number}
          </div>

          <div className="min-w-0">
            <h3 className="font-black text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {action && (
            <span
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {action}
            </span>
          )}

          {open ? (
            <ChevronUp
              size={18}
              className="text-slate-500"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-slate-500"
            />
          )}
        </div>
      </button>

      {open && (
        <div className="p-5 sm:p-6">
          {children}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type="text"
          value={value ?? ""}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={
            placeholder || ""
          }
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20 ${
            Icon ? "pl-10" : ""
          }`}
        />
      </div>
    </label>
  );
}

/* =========================================================
   DATE FIELD
========================================================= */

function DateField({
  label,
  value,
  onChange,
  min,
  max,
  helpText,
}) {
  const inputValue = toDateInputValue(value);

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>

      <div className="relative">
        <CalendarDays
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="date"
          value={inputValue}
          min={min || undefined}
          max={max || undefined}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 pr-11 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
        />
      </div>

      {helpText && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {helpText}
        </p>
      )}
    </label>
  );
}

/* =========================================================
   TEXT AREA
========================================================= */

function TextAreaField({
  label,
  value,
  onChange,
  rows = 5,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>

      <textarea
        value={value ?? ""}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        rows={rows}
        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
      />
    </label>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>

      <select
        value={value || ""}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function ToggleField({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex min-w-0 items-center gap-3">
        {checked ? (
          <Eye
            size={18}
            className="shrink-0 text-emerald-600"
          />
        ) : (
          <EyeOff
            size={18}
            className="shrink-0 text-slate-400"
          />
        )}

        <div>
          <p className="text-sm font-black text-slate-800">
            {label}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {checked
              ? "This item is visible on the website."
              : "This item is hidden from the website."}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange(!checked)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked
            ? "bg-[#C9A03B]"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </label>
  );
}

/* =========================================================
   IMAGE RESIZE HELPERS
========================================================= */

function loadImageElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(
        new Error(
          "Unable to read the selected image."
        )
      );
    };

    image.src = url;
  });
}

function calculateTargetDimensions({
  sourceWidth,
  sourceHeight,
  sizeMode,
  customWidth,
  customHeight,
  keepAspectRatio,
}) {
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

    const [maxWidth, maxHeight] =
      limits[sizeMode];

    const scale = Math.min(
      1,
      maxWidth / sourceWidth,
      maxHeight / sourceHeight
    );

    return {
      width: Math.max(
        1,
        Math.round(sourceWidth * scale)
      ),
      height: Math.max(
        1,
        Math.round(sourceHeight * scale)
      ),
    };
  }

  if (sizeMode === "custom") {
    const requestedWidth = Math.max(
      1,
      Number(customWidth) || 1
    );

    const requestedHeight = Math.max(
      1,
      Number(customHeight) || 1
    );

    if (keepAspectRatio) {
      const scale = Math.min(
        requestedWidth / sourceWidth,
        requestedHeight / sourceHeight
      );

      return {
        width: Math.max(
          1,
          Math.round(sourceWidth * scale)
        ),
        height: Math.max(
          1,
          Math.round(sourceHeight * scale)
        ),
      };
    }

    return {
      width: requestedWidth,
      height: requestedHeight,
    };
  }

  return {
    width: sourceWidth,
    height: sourceHeight,
  };
}

async function resizeImageFile(
  file,
  {
    sizeMode,
    customWidth,
    customHeight,
    keepAspectRatio,
  }
) {
  if (
    !file ||
    sizeMode === "original" ||
    file.type === "image/svg+xml" ||
    file.type === "image/gif"
  ) {
    return file;
  }

  const image =
    await loadImageElement(file);

  const sourceWidth =
    image.naturalWidth || image.width;

  const sourceHeight =
    image.naturalHeight || image.height;

  const target =
    calculateTargetDimensions({
      sourceWidth,
      sourceHeight,
      sizeMode,
      customWidth,
      customHeight,
      keepAspectRatio,
    });

  if (
    target.width === sourceWidth &&
    target.height === sourceHeight
  ) {
    return file;
  }

  const canvas =
    document.createElement("canvas");

  canvas.width = target.width;
  canvas.height = target.height;

  const context =
    canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "Your browser could not create an image canvas."
    );
  }

  /*
   * Use a high quality resize.
   */
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(
    image,
    0,
    0,
    target.width,
    target.height
  );

  const sourceType =
    file.type === "image/png"
      ? "image/png"
      : file.type === "image/webp"
        ? "image/webp"
        : "image/jpeg";

  const blob =
    await new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(
                new Error(
                  "Could not resize image."
                )
              );
            }
          },
          sourceType,
          0.92
        );
      }
    );

  const extension =
    sourceType === "image/png"
      ? "png"
      : sourceType === "image/webp"
        ? "webp"
        : "jpg";

  const baseName =
    file.name.replace(
      /\.[^/.]+$/,
      ""
    ) || "project-image";

  const resizedFile =
    new File(
      [blob],
      `${baseName}-${target.width}x${target.height}.${extension}`,
      {
        type: sourceType,
        lastModified: Date.now(),
      }
    );

  if (
    resizedFile.size >
    500 * 1024 * 1024
  ) {
    throw new Error(
      "The resized image is larger than the 500 MB limit."
    );
  }

  return resizedFile;
}

/* =========================================================
   IMAGE UPLOAD FIELD
========================================================= */

function ImageUploadField({
  label,
  value,
  uploading,
  onUpload,
  onClear,
  compact = false,
  altText,
}) {
  const [sizeMode, setSizeMode] = useState("medium");

  const [customWidth, setCustomWidth] = useState(1920);

  const [customHeight, setCustomHeight] = useState(1080);

  const [keepAspectRatio, setKeepAspectRatio] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [sourceDimensions, setSourceDimensions] = useState(null);

  const imageUrl = resolveImageUrl(value);

  async function processAndUpload(file) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("Please select a valid image file.");
      return;
    }

    const maxSize = 500 * 1024 * 1024;

    if (file.size > maxSize) {
      window.alert("Maximum image size is 500 MB.");
      return;
    }

    /*
     * Read original dimensions so the admin can
     * see exactly what will be uploaded.
     */
    if (
      file.type !== "image/svg+xml" &&
      file.type !== "image/gif"
    ) {
      try {
        const image = await loadImageElement(file);

        const width =
          image.naturalWidth || image.width;

        const height =
          image.naturalHeight || image.height;

        setSourceDimensions({
          width,
          height,
        });

        /*
         * For Custom mode, initialize the fields
         * from the selected image.
         */
        if (width > 0 && height > 0) {
          setCustomWidth(width);
          setCustomHeight(height);
        }
      } catch {
        /*
         * Let the upload continue. The backend will
         * still validate the actual file.
         */
      }
    }

    setProcessing(true);

    try {
      const resizedFile = await resizeImageFile(file, {
        sizeMode:
          file.type === "image/svg+xml" ||
          file.type === "image/gif"
            ? "original"
            : sizeMode,
        customWidth,
        customHeight,
        keepAspectRatio,
      });

      await onUpload(resizedFile);
    } catch (error) {
      console.error(error);

      window.alert(
        error?.message ||
          "Unable to prepare the selected image."
      );
    } finally {
      setProcessing(false);
    }
  }

  const busy = uploading || processing;

  const presetSizes = [
    ["original", "Original", "Keep original"],
    ["small", "Small", "Max 1280 × 720"],
    ["medium", "Medium", "Max 1920 × 1080"],
    ["large", "Large", "Max 2560 × 1440"],
  ];

  const selectedLabel =
    sizeMode === "original"
      ? "Original"
      : sizeMode === "small"
        ? "Small · 1280 × 720 max"
        : sizeMode === "medium"
          ? "Medium · 1920 × 1080 max"
          : sizeMode === "large"
            ? "Large · 2560 × 1440 max"
            : `Custom · ${customWidth} × ${customHeight}`;

  return (
    <div className="min-w-0">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>

      <div
        className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${
          compact ? "p-3" : "p-4 sm:p-5"
        }`}
      >
        {imageUrl ? (
          <div>
            <div
              className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${
                compact
                  ? "aspect-[4/3]"
                  : "aspect-[16/9]"
              }`}
            >
              <img
                src={imageUrl}
                alt={
                  String(altText || "").trim() ||
                  label
                }
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-black text-white transition hover:bg-slate-800 sm:w-auto">
                {busy ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Upload size={15} />
                )}

                {busy ? "Processing..." : "Replace Image"}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file =
                      event.target.files?.[0];

                    processAndUpload(file);

                    event.target.value = "";
                  }}
                  disabled={busy}
                />
              </label>

              <button
                type="button"
                onClick={onClear}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60 sm:w-auto"
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label
            className={`flex min-w-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-center transition hover:border-[#C9A03B] hover:bg-[#FFF9E8] ${
              compact
                ? "min-h-[180px] p-5"
                : "min-h-[240px] p-6"
            }`}
          >
            {busy ? (
              <>
                <Loader2
                  size={28}
                  className="animate-spin text-[#C9A03B]"
                />

                <p className="mt-4 text-sm font-black text-slate-800">
                  Preparing image...
                </p>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF9E9] text-[#C9A03B]">
                  <ImageIcon size={22} />
                </div>

                <p className="mt-4 text-sm font-black text-slate-800">
                  Upload image
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                  Choose the image size below before uploading.
                  JPG, JPEG, PNG, WEBP, GIF or SVG up to 500 MB.
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                processAndUpload(file);

                event.target.value = "";
              }}
              disabled={busy}
            />
          </label>
        )}

        {/* ===================================================
            IMAGE SIZE SETTINGS
        =================================================== */}

        <div
          className={`mt-4 min-w-0 overflow-hidden rounded-2xl border border-[#E6D49A] bg-[#FFF9E8] ${
            compact ? "p-3" : "p-4"
          }`}
        >
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#92751C]">
              Choose Image Size
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Select the output size before uploading.
            </p>

            {sourceDimensions && (
              <p className="mt-2 break-words text-[11px] font-bold text-slate-500">
                Original: {sourceDimensions.width} ×{" "}
                {sourceDimensions.height}px
              </p>
            )}
          </div>

          {/* PRESET SIZE GRID
              Always two columns so the compact Progress Image
              editor never squeezes four buttons into a narrow panel.
          */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {presetSizes.map(
              ([value, title, hint]) => {
                const active =
                  sizeMode === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setSizeMode(value)
                    }
                    disabled={busy}
                    className={`min-w-0 overflow-hidden rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-[#C9A03B] bg-white shadow-sm"
                        : "border-slate-200 bg-white hover:border-[#C9A03B]"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <p
                      className={`truncate text-xs font-black ${
                        active
                          ? "text-[#92751C]"
                          : "text-slate-700"
                      }`}
                    >
                      {title}
                    </p>

                    <p className="mt-1 break-words text-[10px] leading-4 text-slate-500">
                      {hint}
                    </p>
                  </button>
                );
              }
            )}
          </div>

          {/* CUSTOM SIZE */}
          <button
            type="button"
            onClick={() => setSizeMode("custom")}
            disabled={busy}
            className={`mt-2 w-full min-w-0 rounded-xl border p-3 text-left transition ${
              sizeMode === "custom"
                ? "border-[#C9A03B] bg-white shadow-sm"
                : "border-slate-200 bg-white hover:border-[#C9A03B]"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <p
              className={`text-xs font-black ${
                sizeMode === "custom"
                  ? "text-[#92751C]"
                  : "text-slate-700"
              }`}
            >
              Custom Size
            </p>

            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              Enter your own width and height.
            </p>
          </button>

          {sizeMode === "custom" && (
            <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
              <label className="min-w-0">
                <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                  Width (px)
                </span>

                <input
                  type="number"
                  min="1"
                  value={customWidth}
                  onChange={(event) => {
                    const width = Math.max(
                      1,
                      Number(event.target.value) || 1
                    );

                    setCustomWidth(width);

                    if (
                      keepAspectRatio &&
                      sourceDimensions
                    ) {
                      setCustomHeight(
                        Math.max(
                          1,
                          Math.round(
                            (width *
                              sourceDimensions.height) /
                              sourceDimensions.width
                          )
                        )
                      );
                    }
                  }}
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
                />
              </label>

              <label className="min-w-0">
                <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                  Height (px)
                </span>

                <input
                  type="number"
                  min="1"
                  value={customHeight}
                  onChange={(event) => {
                    const height = Math.max(
                      1,
                      Number(event.target.value) || 1
                    );

                    setCustomHeight(height);

                    if (
                      keepAspectRatio &&
                      sourceDimensions
                    ) {
                      setCustomWidth(
                        Math.max(
                          1,
                          Math.round(
                            (height *
                              sourceDimensions.width) /
                              sourceDimensions.height
                          )
                        )
                      );
                    }
                  }}
                  className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#C9A03B] focus:ring-2 focus:ring-[#C9A03B]/20"
                />
              </label>

              <label className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={keepAspectRatio}
                  onChange={(event) =>
                    setKeepAspectRatio(
                      event.target.checked
                    )
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#C9A03B] focus:ring-[#C9A03B]"
                />

                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-700">
                    Keep aspect ratio
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                    Prevents stretching or distortion.
                  </p>
                </div>
              </label>
            </div>
          )}

          {(sizeMode === "small" ||
            sizeMode === "medium" ||
            sizeMode === "large" ||
            sizeMode === "custom") &&
            sourceDimensions && (
              <p className="mt-3 text-[11px] leading-4 font-bold text-slate-500">
                Output will be resized proportionally without
                upscaling for preset sizes.
              </p>
            )}

          <div className="mt-3 flex min-w-0 flex-col gap-2 border-t border-[#E6D49A]/70 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Selected
            </span>

            <span className="min-w-0 max-w-full break-words rounded-lg bg-white px-3 py-2 text-[11px] font-black leading-4 text-[#92751C] ring-1 ring-[#E6D49A]">
              {selectedLabel}
            </span>
          </div>

          {sizeMode === "original" &&
            sourceDimensions && (
              <p className="mt-3 text-[11px] leading-4 text-slate-500">
                Original dimensions will be preserved.
              </p>
            )}

          <p className="mt-3 text-[10px] leading-4 text-slate-400">
            SVG and GIF files are uploaded unchanged because
            resizing them in a canvas can remove vector or animation
            information.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#B28A20] shadow-sm">
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-black text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAT BOX
========================================================= */

function StatBox({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   INLINE EMPTY
========================================================= */

function InlineEmpty({
  text,
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
      <p className="text-sm font-semibold text-slate-500">
        {text}
      </p>

      <button
        type="button"
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black text-white transition hover:bg-slate-800"
      >
        <Plus size={15} />
        {actionLabel}
      </button>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ onAdd }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF9E8] text-[#C9A03B]">
        <Images size={30} />
      </div>

      <h2 className="mt-5 text-2xl font-black text-slate-900">
        No projects yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Add your first project or restore the
        default Projects content.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-black text-white transition hover:bg-slate-800"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>
    </div>
  );
}
