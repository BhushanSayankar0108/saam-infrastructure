import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  GripVertical,
  RotateCcw,
  BarChart3,
  Info,
  Building2,
  Landmark,
  House,
  Share2,
  Wrench,
  Ruler,
  MessageSquareQuote,
  Upload,
  LoaderCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   API
========================================================= */

const API_BASE_URL = "http://localhost:8080/api";
const HERO_SLIDES_API = `${API_BASE_URL}/home-content/hero-slides`;

/* =========================================================
   IMAGE UPLOAD / RESIZE CONFIG
========================================================= */

const MAX_IMAGE_SIZE = 500 * 1024 * 1024;

const IMAGE_SIZE_PRESETS = {
  original: {
    label: "Original — Keep original dimensions",
    width: null,
    height: null,
  },
  small: {
    label: "Small — Max 1280 × 720",
    width: 1280,
    height: 720,
  },
  medium: {
    label: "Medium — Max 1920 × 1080",
    width: 1920,
    height: 1080,
  },
  large: {
    label: "Large — Max 2560 × 1440",
    width: 2560,
    height: 1440,
  },
};

/* =========================================================
   DEFAULT HOME CONTENT
========================================================= */

const DEFAULT_HOME_CONTENT = {
  id: null,

  /* =========================
     HERO
  ========================= */

  heroEnabled: true,

  heroSecondaryHeading: "One Strong Foundation at a Time.",

  exploreButtonText: "Explore Projects",
  exploreButtonLink: "/projects",

  quoteButtonText: "Get a Quote",
  quoteButtonLink: "/contact",

  slides: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=90",
      label: "Built with Purpose",
      title: "Engineering Excellence",
      description:
        "Creating spaces that stand strong for generations with precision, quality and thoughtful engineering.",
      enabled: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=90",
      label: "Construction Excellence",
      title: "Building the Future",
      description:
        "Reliable construction solutions designed for lasting performance, safety and long-term value.",
      enabled: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=90",
      label: "Infrastructure",
      title: "Strong Foundations",
      description:
        "Infrastructure delivered with precision, responsibility and a commitment to creating better spaces.",
      enabled: true,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2200&q=90",
      label: "Project Execution",
      title: "Quality That Lasts",
      description:
        "From planning to completion, every detail matters. We focus on dependable execution and lasting quality.",
      enabled: true,
    },
  ],

  /* =========================
     STATISTICS
  ========================= */

  statisticsEnabled: true,

  statisticsLabel: "Our Strength",

  statisticsHeading: "Built on Experience.",

  statisticsDescription:
    "Our experience, expertise and commitment define the way we approach every project.",

  statistics: [
    {
      id: 1,
      value: "15+",
      label: "Projects Delivered",
      description:
        "Construction and infrastructure projects completed with quality and precision.",
      enabled: true,
    },
    {
      id: 2,
      value: "10+",
      label: "Years Experience",
      description:
        "Industry experience and expertise built through dependable project execution.",
      enabled: true,
    },
    {
      id: 3,
      value: "100%",
      label: "Commitment",
      description:
        "Quality, safety and dependable execution are at the heart of every project.",
      enabled: true,
    },
    {
      id: 4,
      value: "50+",
      label: "Professionals",
      description:
        "Skilled people working together to deliver excellence on every project.",
      enabled: true,
    },
  ],

  /* =========================
     SERVICES
  ========================= */

  servicesEnabled: true,

  servicesLabel: "Our Services",

  servicesDescription:
    "Comprehensive construction and infrastructure solutions delivered with precision, quality and responsibility.",

  servicesHeading: "Building solutions.",

  servicesHeadingHighlight: "Creating lasting value.",

  servicesIntro:
    "From concept and planning to execution and completion, we deliver dependable solutions built for the future.",

  servicesCtaLabel: "View All Services",

  servicesCtaLink: "/services",

  servicesCtaEyebrow: "Built for performance",

  servicesCtaDescription:
    "From planning to completion, we bring engineering expertise, quality workmanship and dependable execution to every project.",

  services: [
    {
      id: 1,
      number: "01",
      slug: "civil-construction",
      title: "Civil Construction",
      description:
        "Reliable civil construction solutions built with quality materials, skilled workmanship and attention to every detail.",
      icon: "building",
      enabled: true,
    },
    {
      id: 2,
      number: "02",
      slug: "commercial-projects",
      title: "Commercial Projects",
      description:
        "Modern commercial spaces designed and executed with a focus on functionality, durability and long-term value.",
      icon: "landmark",
      enabled: true,
    },
    {
      id: 3,
      number: "03",
      slug: "residential-construction",
      title: "Residential Construction",
      description:
        "Strong and thoughtfully planned residential projects created to provide comfortable and lasting spaces.",
      icon: "house",
      enabled: true,
    },
    {
      id: 4,
      number: "04",
      slug: "infrastructure-development",
      title: "Infrastructure Development",
      description:
        "Infrastructure development solutions focused on dependable execution, safety and sustainable growth.",
      icon: "share",
      enabled: true,
    },
    {
      id: 5,
      number: "05",
      slug: "renovation-development",
      title: "Renovation & Development",
      description:
        "Renovation and development services that improve existing spaces while maintaining quality and structural integrity.",
      icon: "wrench",
      enabled: true,
    },
    {
      id: 6,
      number: "06",
      slug: "engineering-project-management",
      title: "Engineering & Project Management",
      description:
        "Professional planning and project management focused on efficient execution, coordination and timely delivery.",
      icon: "ruler",
      enabled: true,
    },
  ],

  /* =========================
     TESTIMONIALS
  ========================= */

  testimonialsEnabled: true,

  testimonialsLabel: "Client Reviews",

  testimonialsDescription:
    "Trusted by clients for dependable execution, quality workmanship and professional project delivery.",

  testimonialsHeading: "What our clients.",

  testimonialsHeadingHighlight: "say about us.",

  testimonialsTrustStrip:
    "Real experiences from clients who trusted us with their construction and infrastructure projects.",

  testimonialsBottomStatement:
    "Every project is an opportunity to build trust through quality, communication and dependable execution.",

  testimonialsTrustedClientsText: "Trusted Clients",

  testimonials: [
    {
      id: 1,
      name: "Rajesh Sharma",
      role: "Business Owner",
      project: "Commercial Project",
      initials: "RS",
      review:
        "Saam Infrastructure handled our project with excellent professionalism and attention to detail. The team maintained quality throughout the execution.",
      enabled: true,
    },
    {
      id: 2,
      name: "Amit Patil",
      role: "Property Developer",
      project: "Residential Development",
      initials: "AP",
      review:
        "We were impressed with the planning, communication and quality of work. The project was handled smoothly from start to completion.",
      enabled: true,
    },
    {
      id: 3,
      name: "Sanjay Deshmukh",
      role: "Project Consultant",
      project: "Infrastructure Project",
      initials: "SD",
      review:
        "A dependable team with a strong focus on execution and quality. Their approach gave us confidence throughout the project.",
      enabled: true,
    },
    {
      id: 4,
      name: "Vikram Joshi",
      role: "Business Owner",
      project: "Commercial Construction",
      initials: "VJ",
      review:
        "The team demonstrated excellent coordination and professionalism throughout the project. We were very satisfied with the quality of execution.",
      enabled: true,
    },
    {
      id: 5,
      name: "Neha Kulkarni",
      role: "Property Investor",
      project: "Residential Development",
      initials: "NK",
      review:
        "Saam Infrastructure provided reliable support from planning to completion. Their commitment to quality and timely execution was impressive.",
      enabled: true,
    },
  ],

  /* =========================
     ABOUT
  ========================= */

  aboutEnabled: true,

  aboutLabel: "About Us",

  aboutDescription:
    "Engineering expertise, responsible execution and construction solutions designed for lasting value.",

  aboutHeading: "Building with purpose.",

  aboutHeadingHighlight: "Delivering with precision.",

  aboutImage: "",

  aboutImageAlt: "Saam Infrastructure construction site",

  aboutBadge: "Saam Infrastructure",

  aboutImageLabel: "Built to stand strong",

  aboutImageTitle: "Strength in every detail.",

  aboutWhoWeAre: "Who We Are",

  aboutParagraph1:
    "Saam Infrastructure is committed to delivering dependable construction and infrastructure solutions that combine engineering expertise, quality workmanship and thoughtful execution.",

  aboutParagraph2:
    "From planning and development to execution and completion, we focus on creating durable spaces and infrastructure that meet the needs of our clients and stand the test of time.",

  aboutCtaText: "Discover Our Approach",

  aboutCtaLink: "#services",

  aboutBrandItems: ["Engineering", "Quality", "Trust"],

  aboutFeatures: [
    {
      id: 1,
      title: "Quality",
      description: "High standards at every stage of construction.",
      icon: "quality",
      enabled: true,
    },
    {
      id: 2,
      title: "Reliability",
      description: "Dependable planning and project execution.",
      icon: "reliability",
      enabled: true,
    },
    {
      id: 3,
      title: "Safety",
      description: "Responsible practices with safety at the core.",
      icon: "safety",
      enabled: true,
    },
    {
      id: 4,
      title: "Long-Term Value",
      description: "Solutions designed for durability and performance.",
      icon: "value",
      enabled: true,
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

const cloneDefaults = () => ({
  ...DEFAULT_HOME_CONTENT,
  slides: DEFAULT_HOME_CONTENT.slides.map((item) => ({
    ...item,
  })),
  statistics: DEFAULT_HOME_CONTENT.statistics.map((item) => ({
    ...item,
  })),
  services: DEFAULT_HOME_CONTENT.services.map((item) => ({
    ...item,
  })),
  testimonials: DEFAULT_HOME_CONTENT.testimonials.map((item) => ({
    ...item,
  })),
  aboutFeatures: DEFAULT_HOME_CONTENT.aboutFeatures.map((item) => ({
    ...item,
  })),
  aboutBrandItems: [...DEFAULT_HOME_CONTENT.aboutBrandItems],
});

const mergeHomeContent = (backendContent, backendServices = []) => {
  const base = cloneDefaults();

  const merged = {
    ...base,
    ...(backendContent || {}),
  };

  if (Array.isArray(backendContent?.slides)) {
    merged.slides = backendContent.slides;
  }

  if (Array.isArray(backendContent?.statistics)) {
    merged.statistics = backendContent.statistics;
  }

  if (Array.isArray(backendContent?.testimonials)) {
    merged.testimonials = backendContent.testimonials;
  }

  if (Array.isArray(backendContent?.aboutFeatures)) {
    merged.aboutFeatures = backendContent.aboutFeatures;
  }

  if (Array.isArray(backendContent?.aboutBrandItems)) {
    merged.aboutBrandItems = backendContent.aboutBrandItems;
  }

  if (Array.isArray(backendServices) && backendServices.length > 0) {
    merged.services = backendServices;
  }

  return merged;
};

const getLocalContent = () => {
  try {
    const stored = localStorage.getItem("saamHomeContent");

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);

    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

/* =========================================================
   HOME CONTENT PAYLOAD
   Only scalar HomeContent fields are sent.
   Arrays are handled separately.
========================================================= */

const buildHomeContentPayload = (content) => ({
  id: content.id || undefined,

  heroEnabled: Boolean(content.heroEnabled),
  heroSecondaryHeading: content.heroSecondaryHeading || "",
  exploreButtonText: content.exploreButtonText || "",
  exploreButtonLink: content.exploreButtonLink || "",
  quoteButtonText: content.quoteButtonText || "",
  quoteButtonLink: content.quoteButtonLink || "",

  statisticsEnabled: Boolean(content.statisticsEnabled),
  statisticsLabel: content.statisticsLabel || "",
  statisticsHeading: content.statisticsHeading || "",
  statisticsDescription: content.statisticsDescription || "",

  servicesEnabled: Boolean(content.servicesEnabled),
  servicesLabel: content.servicesLabel || "",
  servicesDescription: content.servicesDescription || "",
  servicesHeading: content.servicesHeading || "",
  servicesHeadingHighlight: content.servicesHeadingHighlight || "",
  servicesIntro: content.servicesIntro || "",
  servicesCtaLabel: content.servicesCtaLabel || "",
  servicesCtaLink: content.servicesCtaLink || "",
  servicesCtaEyebrow: content.servicesCtaEyebrow || "",
  servicesCtaDescription: content.servicesCtaDescription || "",

  testimonialsEnabled: Boolean(content.testimonialsEnabled),
  testimonialsLabel: content.testimonialsLabel || "",
  testimonialsDescription: content.testimonialsDescription || "",
  testimonialsHeading: content.testimonialsHeading || "",
  testimonialsHeadingHighlight:
    content.testimonialsHeadingHighlight || "",
  testimonialsTrustStrip: content.testimonialsTrustStrip || "",
  testimonialsBottomStatement:
    content.testimonialsBottomStatement || "",
  testimonialsTrustedClientsText:
    content.testimonialsTrustedClientsText || "",

  aboutEnabled: Boolean(content.aboutEnabled),
  aboutLabel: content.aboutLabel || "",
  aboutDescription: content.aboutDescription || "",
  aboutHeading: content.aboutHeading || "",
  aboutHeadingHighlight: content.aboutHeadingHighlight || "",
  aboutImage: content.aboutImage || "",
  aboutImageAlt: content.aboutImageAlt || "",
  aboutBadge: content.aboutBadge || "",
  aboutImageLabel: content.aboutImageLabel || "",
  aboutImageTitle: content.aboutImageTitle || "",
  aboutWhoWeAre: content.aboutWhoWeAre || "",
  aboutParagraph1: content.aboutParagraph1 || "",
  aboutParagraph2: content.aboutParagraph2 || "",
  aboutCtaText: content.aboutCtaText || "",
  aboutCtaLink: content.aboutCtaLink || "",
});

/* =========================================================
   ADMIN HOME
========================================================= */

export default function AdminHome() {
  const navigate = useNavigate();

  const [homeContent, setHomeContent] = useState(cloneDefaults);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const [loadError, setLoadError] = useState("");

  const [saveError, setSaveError] = useState("");

  const [backendServiceIds, setBackendServiceIds] = useState([]);

  const [backendHeroSlideIds, setBackendHeroSlideIds] = useState([]);

  const [backendAboutFeatureIds, setBackendAboutFeatureIds] = useState([]);

  const [uploadingImage, setUploadingImage] = useState("");

  const [imageSizeSettings, setImageSizeSettings] = useState({});

  /* =======================================================
     LOAD HOME CONTENT
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const [
          homeResponse,
          servicesResponse,
          heroSlidesResponse,
          aboutFeaturesResponse,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/home-content`),
          fetch(`${API_BASE_URL}/home-content/services`),
          fetch(HERO_SLIDES_API),
          fetch(`${API_BASE_URL}/about-features`),
        ]);

        if (!homeResponse.ok) {
          throw new Error(
            `Home Content API returned ${homeResponse.status}`
          );
        }

        if (!servicesResponse.ok) {
          throw new Error(
            `Services API returned ${servicesResponse.status}`
          );
        }

        if (!heroSlidesResponse.ok) {
          throw new Error(
            `Hero Slides API returned ${heroSlidesResponse.status}`
          );
        }

        if (!aboutFeaturesResponse.ok) {
          throw new Error(
            `About Features API returned ${aboutFeaturesResponse.status}`
          );
        }

        const backendHome = await homeResponse.json();
        const backendServices = await servicesResponse.json();
        const backendHeroSlides = await heroSlidesResponse.json();
        const backendAboutFeatures =
          await aboutFeaturesResponse.json();

        if (cancelled) {
          return;
        }

        const serviceList = Array.isArray(backendServices)
          ? backendServices
          : [];

        const heroSlideList = Array.isArray(backendHeroSlides)
          ? backendHeroSlides
          : [];

        const aboutFeatureList = Array.isArray(
          backendAboutFeatures
        )
          ? backendAboutFeatures
          : [];

        const merged = mergeHomeContent(
          backendHome,
          serviceList
        );

        if (heroSlideList.length > 0) {
          merged.slides = heroSlideList;
        }

        // About features are stored in the about_features table,
        // so an empty backend list must also be respected.
        merged.aboutFeatures = aboutFeatureList;

        setHomeContent(merged);

        setBackendServiceIds(
          serviceList
            .map((service) => Number(service.id))
            .filter(Number.isFinite)
        );

        setBackendHeroSlideIds(
          heroSlideList
            .map((slide) => Number(slide.id))
            .filter(Number.isFinite)
        );

        setBackendAboutFeatureIds(
          aboutFeatureList
            .map((feature) => Number(feature.id))
            .filter(Number.isFinite)
        );

        try {
          localStorage.setItem(
            "saamHomeContent",
            JSON.stringify(merged)
          );
        } catch {
          // Local storage is only a cache.
        }
      } catch (error) {
        console.error("Failed to load Home CMS data:", error);

        if (cancelled) {
          return;
        }

        const localContent = getLocalContent();

        if (localContent) {
          const localMerged = mergeHomeContent(
            localContent,
            localContent.services
          );

          setHomeContent(localMerged);

          setBackendServiceIds(
            Array.isArray(localMerged.services)
              ? localMerged.services
                  .map((service) => Number(service.id))
                  .filter(Number.isFinite)
              : []
          );

          setBackendHeroSlideIds(
            Array.isArray(localMerged.slides)
              ? localMerged.slides
                  .map((slide) => Number(slide.id))
                  .filter(Number.isFinite)
              : []
          );

          setBackendAboutFeatureIds(
            Array.isArray(localMerged.aboutFeatures)
              ? localMerged.aboutFeatures
                  .map((feature) => Number(feature.id))
                  .filter(Number.isFinite)
              : []
          );

          setLoadError(
            "Backend could not be reached. Showing the last saved local copy."
          );
        } else {
          setHomeContent(cloneDefaults());
          setBackendServiceIds([]);
          setBackendHeroSlideIds([]);
          setBackendAboutFeatureIds([]);

          setLoadError(
            "Backend could not be reached. Showing default Home content."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     IMAGE RESIZE
  ======================================================= */

  const resizeImageFile = async (
    file,
    targetWidth,
    targetHeight,
    keepAspectRatio = true
  ) => {
    return new Promise((resolve, reject) => {
      // SVG and GIF are kept as-is because canvas resizing can
      // destroy SVG scalability or GIF animation.
      if (
        file.type === "image/svg+xml" ||
        file.type === "image/gif"
      ) {
        resolve(file);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        try {
          const originalWidth = image.naturalWidth;
          const originalHeight = image.naturalHeight;

          let width = Number(targetWidth);
          let height = Number(targetHeight);

          if (
            !Number.isFinite(width) ||
            !Number.isFinite(height) ||
            width <= 0 ||
            height <= 0
          ) {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Invalid image dimensions."));
            return;
          }

          // Never enlarge an image when a preset/custom size is
          // larger than the original dimensions.
          if (keepAspectRatio) {
            const scale = Math.min(
              width / originalWidth,
              height / originalHeight,
              1
            );

            width = Math.max(
              1,
              Math.round(originalWidth * scale)
            );

            height = Math.max(
              1,
              Math.round(originalHeight * scale)
            );
          } else {
            width = Math.max(1, Math.round(width));
            height = Math.max(1, Math.round(height));
          }

          // If the requested result is exactly the original,
          // avoid unnecessary canvas processing.
          if (
            width === originalWidth &&
            height === originalHeight
          ) {
            URL.revokeObjectURL(objectUrl);
            resolve(file);
            return;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext("2d");

          if (!context) {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Unable to create image canvas."));
            return;
          }

          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";

          // JPEG has no transparency, so use white background.
          if (file.type === "image/jpeg") {
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, width, height);
          }

          context.drawImage(
            image,
            0,
            0,
            width,
            height
          );

          const outputType =
            file.type === "image/webp"
              ? "image/webp"
              : file.type === "image/png"
                ? "image/png"
                : "image/jpeg";

          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(objectUrl);

              if (!blob) {
                reject(
                  new Error("Unable to create resized image.")
                );
                return;
              }

              const resizedFile = new File(
                [blob],
                file.name,
                {
                  type: outputType,
                  lastModified: Date.now(),
                }
              );

              resolve(resizedFile);
            },
            outputType,
            0.92
          );
        } catch (error) {
          URL.revokeObjectURL(objectUrl);
          reject(error);
        }
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(
          new Error("Unable to read the selected image.")
        );
      };

      image.src = objectUrl;
    });
  };

  /* =======================================================
     IMAGE SIZE CONTROLS
  ======================================================= */

  const updateImageSizeSettings = (
    uploadKey,
    field,
    value
  ) => {
    setImageSizeSettings((previous) => ({
      ...previous,
      [uploadKey]: {
        ...(previous[uploadKey] || {
          preset: "original",
          width: "",
          height: "",
          keepAspectRatio: true,
        }),
        [field]: value,
      },
    }));
  };

  const getImageSizeSettings = (uploadKey) => {
    return (
      imageSizeSettings[uploadKey] || {
        preset: "original",
        width: "",
        height: "",
        keepAspectRatio: true,
      }
    );
  };

  const renderImageSizeControls = (uploadKey) => {
    const settings = getImageSizeSettings(uploadKey);

    return (
      <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <label className="mb-2 block text-xs font-semibold text-gray-700">
          Image Size
        </label>

        <select
          value={settings.preset}
          onChange={(event) =>
            updateImageSizeSettings(
              uploadKey,
              "preset",
              event.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
        >
          {Object.entries(IMAGE_SIZE_PRESETS).map(
            ([key, preset]) => (
              <option key={key} value={key}>
                {preset.label}
              </option>
            )
          )}
          <option value="custom">
            Custom — Enter Width × Height
          </option>
        </select>

        {settings.preset === "custom" && (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Width (px)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20000"
                  placeholder="1920"
                  value={settings.width}
                  onChange={(event) =>
                    updateImageSizeSettings(
                      uploadKey,
                      "width",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  Height (px)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20000"
                  placeholder="1080"
                  value={settings.height}
                  onChange={(event) =>
                    updateImageSizeSettings(
                      uploadKey,
                      "height",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={settings.keepAspectRatio !== false}
                onChange={(event) =>
                  updateImageSizeSettings(
                    uploadKey,
                    "keepAspectRatio",
                    event.target.checked
                  )
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              Keep aspect ratio
            </label>
          </div>
        )}

        <div className="mt-3 space-y-1 text-[11px] leading-5 text-gray-500">
          <p>
            <span className="font-semibold text-gray-600">
              Maximum file size:
            </span>{" "}
            500 MB
          </p>
          <p>
            <span className="font-semibold text-gray-600">
              Original:
            </span>{" "}
            keeps the original dimensions.
          </p>
          <p>
            The selected size is applied before upload.
          </p>
        </div>
      </div>
    );
  };

  /* =======================================================
     IMAGE UPLOAD
     Files are uploaded to the Spring Boot backend and stored
     inside the React public/images directory. The database
     stores only the public URL, for example /images/about/x.jpg.
  ======================================================= */

  const uploadImage = async (file, folder, uploadKey) => {
    if (!file) {
      return null;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("Please select a valid image file.");
      return null;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      window.alert("Image size must be 500 MB or less.");
      return null;
    }

    const settings = getImageSizeSettings(uploadKey);
    let uploadFile = file;

    try {
      if (settings.preset !== "original") {
        if (settings.preset === "custom") {
          const width = Number(settings.width);
          const height = Number(settings.height);

          if (
            !Number.isFinite(width) ||
            !Number.isFinite(height) ||
            width <= 0 ||
            height <= 0
          ) {
            window.alert(
              "Please enter a valid custom width and height."
            );
            return null;
          }

          if (width > 20000 || height > 20000) {
            window.alert(
              "Custom image dimensions cannot exceed 20000 × 20000 pixels."
            );
            return null;
          }

          if (
            file.type === "image/svg+xml" ||
            file.type === "image/gif"
          ) {
            window.alert(
              "Custom resizing is not available for SVG or GIF files. Please choose Original or use JPG, PNG or WEBP."
            );
            return null;
          }

          uploadFile = await resizeImageFile(
            file,
            width,
            height,
            settings.keepAspectRatio !== false
          );
        } else {
          const preset = IMAGE_SIZE_PRESETS[settings.preset];

          if (preset) {
            if (
              file.type === "image/svg+xml" ||
              file.type === "image/gif"
            ) {
              // Preserve SVG/GIF instead of destroying its format.
              uploadFile = file;
            } else {
              uploadFile = await resizeImageFile(
                file,
                preset.width,
                preset.height,
                true
              );
            }
          }
        }
      }

      if (uploadFile.size > MAX_IMAGE_SIZE) {
        window.alert(
          "The resized image is larger than 500 MB."
        );
        return null;
      }

      setUploadingImage(uploadKey);
      setSaved(false);
      setSaveError("");

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("folder", folder);

      const response = await fetch(
        `${API_BASE_URL}/images/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        let message = "";

        try {
          const errorData = await response.json();
          message =
            errorData?.message ||
            errorData?.error ||
            "";
        } catch {
          try {
            message = await response.text();
          } catch {
            message = "";
          }
        }

        if (response.status === 413) {
          throw new Error(
            "Image is too large. Maximum allowed size is 500 MB."
          );
        }

        throw new Error(
          message ||
            `Image upload failed with ${response.status}`
        );
      }

      const result = await response.json();

      if (!result?.url) {
        throw new Error(
          "Image upload response did not contain a URL."
        );
      }

      return result.url;
    } catch (error) {
      console.error("Image upload failed:", error);

      window.alert(
        error instanceof Error && error.message
          ? error.message
          : "Unable to upload image. Please make sure the Spring Boot backend is running."
      );

      return null;
    } finally {
      setUploadingImage("");
    }
  };

  const handleAboutImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const uploadedUrl = await uploadImage(
      file,
      "about",
      "about-image"
    );

    if (uploadedUrl) {
      updateAboutField("aboutImage", uploadedUrl);
    }

    event.target.value = "";
  };

  const handleSlideImageUpload = async (event, slideId) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const uploadedUrl = await uploadImage(
      file,
      "hero",
      `hero-slide-${slideId}`
    );

    if (uploadedUrl) {
      updateSlide(slideId, "image", uploadedUrl);
    }

    event.target.value = "";
  };

  /* =======================================================
     COMMON FIELD
  ======================================================= */

  const updateField = (field, value) => {
    setHomeContent((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
    setSaveError("");
  };

  /* =======================================================
     SLIDES
  ======================================================= */

  const updateSlide = (slideId, field, value) => {
    setHomeContent((previous) => ({
      ...previous,
      slides: previous.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              [field]: value,
            }
          : slide
      ),
    }));

    setSaved(false);
  };

  const addSlide = () => {
    const ids = homeContent.slides
      .map((item) => Number(item.id))
      .filter(Number.isFinite);

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    setHomeContent((previous) => ({
      ...previous,
      slides: [
        ...previous.slides,
        {
          id: newId,
          image: "",
          label: "",
          title: "",
          description: "",
          enabled: true,
        },
      ],
    }));

    setSaved(false);
  };

  const deleteSlide = (slideId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this slide?"
      )
    ) {
      return;
    }

    setHomeContent((previous) => ({
      ...previous,
      slides: previous.slides.filter(
        (slide) => slide.id !== slideId
      ),
    }));

    setSaved(false);
  };

  const toggleSlide = (slideId) => {
    setHomeContent((previous) => ({
      ...previous,
      slides: previous.slides.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              enabled: !slide.enabled,
            }
          : slide
      ),
    }));

    setSaved(false);
  };

  /* =======================================================
     STATISTICS
  ======================================================= */

  const updateStatistic = (statId, field, value) => {
    setHomeContent((previous) => ({
      ...previous,
      statistics: previous.statistics.map((stat) =>
        stat.id === statId
          ? {
              ...stat,
              [field]: value,
            }
          : stat
      ),
    }));

    setSaved(false);
  };

  const addStatistic = () => {
    const ids = homeContent.statistics
      .map((item) => Number(item.id))
      .filter(Number.isFinite);

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    setHomeContent((previous) => ({
      ...previous,
      statistics: [
        ...previous.statistics,
        {
          id: newId,
          value: "",
          label: "",
          description: "",
          enabled: true,
        },
      ],
    }));

    setSaved(false);
  };

  const deleteStatistic = (statId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this statistic?"
      )
    ) {
      return;
    }

    setHomeContent((previous) => ({
      ...previous,
      statistics: previous.statistics.filter(
        (stat) => stat.id !== statId
      ),
    }));

    setSaved(false);
  };

  const toggleStatistic = (statId) => {
    setHomeContent((previous) => ({
      ...previous,
      statistics: previous.statistics.map((stat) =>
        stat.id === statId
          ? {
              ...stat,
              enabled: !stat.enabled,
            }
          : stat
      ),
    }));

    setSaved(false);
  };

  /* =======================================================
     SERVICES
  ======================================================= */

  const updateServiceField = (serviceId, field, value) => {
    setHomeContent((previous) => ({
      ...previous,
      services: previous.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              [field]: value,
            }
          : service
      ),
    }));

    setSaved(false);
  };

  const addService = () => {
    const ids = homeContent.services
      .map((item) => Number(item.id))
      .filter(Number.isFinite);

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    setHomeContent((previous) => ({
      ...previous,
      services: [
        ...previous.services,
        {
          id: `new-${Date.now()}`,
          number: String(newId).padStart(2, "0"),
          slug: `service-${newId}`,
          title: "",
          description: "",
          icon: "building",
          enabled: true,
        },
      ],
    }));

    setSaved(false);
  };

  const deleteService = (serviceId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this service?"
      )
    ) {
      return;
    }

    setHomeContent((previous) => ({
      ...previous,
      services: previous.services.filter(
        (service) => service.id !== serviceId
      ),
    }));

    setSaved(false);
  };

  const toggleService = (serviceId) => {
    setHomeContent((previous) => ({
      ...previous,
      services: previous.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              enabled: !service.enabled,
            }
          : service
      ),
    }));

    setSaved(false);
  };

  /* =======================================================
     TESTIMONIALS
  ======================================================= */

  const updateTestimonialField = (
    testimonialId,
    field,
    value
  ) => {
    setHomeContent((previous) => ({
      ...previous,
      testimonials: previous.testimonials.map(
        (testimonial) =>
          testimonial.id === testimonialId
            ? {
                ...testimonial,
                [field]: value,
              }
            : testimonial
      ),
    }));

    setSaved(false);
  };

  const addTestimonial = () => {
    const ids = homeContent.testimonials
      .map((item) => Number(item.id))
      .filter(Number.isFinite);

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    setHomeContent((previous) => ({
      ...previous,
      testimonials: [
        ...previous.testimonials,
        {
          id: newId,
          name: "New Client",
          role: "Client",
          project: "Construction Project",
          initials: "NC",
          review: "Add client review here.",
          enabled: true,
        },
      ],
    }));

    setSaved(false);
  };

  const deleteTestimonial = (testimonialId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this testimonial?"
      )
    ) {
      return;
    }

    setHomeContent((previous) => ({
      ...previous,
      testimonials: previous.testimonials.filter(
        (testimonial) =>
          testimonial.id !== testimonialId
      ),
    }));

    setSaved(false);
  };

  const toggleTestimonial = (testimonialId) => {
    setHomeContent((previous) => ({
      ...previous,
      testimonials: previous.testimonials.map(
        (testimonial) =>
          testimonial.id === testimonialId
            ? {
                ...testimonial,
                enabled: !testimonial.enabled,
              }
            : testimonial
      ),
    }));

    setSaved(false);
  };

  /* =======================================================
     ABOUT
  ======================================================= */

  const updateAboutField = (field, value) => {
    setHomeContent((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const updateAboutFeature = (
    featureId,
    field,
    value
  ) => {
    setHomeContent((previous) => ({
      ...previous,
      aboutFeatures: previous.aboutFeatures.map(
        (feature) =>
          feature.id === featureId
            ? {
                ...feature,
                [field]: value,
              }
            : feature
      ),
    }));

    setSaved(false);
  };

  const addAboutFeature = () => {
    const ids = homeContent.aboutFeatures
      .map((item) => Number(item.id))
      .filter(Number.isFinite);

    const newId = ids.length ? Math.max(...ids) + 1 : 1;

    setHomeContent((previous) => ({
      ...previous,
      aboutFeatures: [
        ...previous.aboutFeatures,
        {
          id: newId,
          title: "",
          description: "",
          icon: "quality",
          enabled: true,
        },
      ],
    }));

    setSaved(false);
  };

  const deleteAboutFeature = (featureId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this About feature?"
      )
    ) {
      return;
    }

    setHomeContent((previous) => ({
      ...previous,
      aboutFeatures: previous.aboutFeatures.filter(
        (feature) => feature.id !== featureId
      ),
    }));

    setSaved(false);
  };

  const toggleAboutFeature = (featureId) => {
    setHomeContent((previous) => ({
      ...previous,
      aboutFeatures: previous.aboutFeatures.map(
        (feature) =>
          feature.id === featureId
            ? {
                ...feature,
                enabled: !feature.enabled,
              }
            : feature
      ),
    }));

    setSaved(false);
  };

  /* =======================================================
     SAVE HERO SLIDES

     Hero images/content are stored in the hero_slides table.
     The image itself is already stored under public/images by
     the upload endpoint; only the public image path is saved here.
  ======================================================= */

  const saveHeroSlides = async () => {
    const currentSlides = Array.isArray(homeContent.slides)
      ? homeContent.slides
      : [];

    const savedSlides = [];

    for (const slide of currentSlides) {
      const numericId = Number(slide.id);
      const isExisting =
        Number.isFinite(numericId) &&
        backendHeroSlideIds.includes(numericId);

      const payload = {
        label: slide.label || "",
        title: slide.title || "",
        description: slide.description || "",
        image: slide.image || "",
        enabled: slide.enabled !== false,
      };

      let response;

      if (isExisting) {
        response = await fetch(`${HERO_SLIDES_API}/${numericId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(HERO_SLIDES_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          message || `Unable to save Hero slide ${slide.id ?? ""}`
        );
      }

      savedSlides.push(await response.json());
    }

    const savedIds = savedSlides
      .map((slide) => Number(slide.id))
      .filter(Number.isFinite);

    const removedIds = backendHeroSlideIds.filter(
      (id) => !savedIds.includes(id)
    );

    for (const id of removedIds) {
      const response = await fetch(`${HERO_SLIDES_API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 404) {
        throw new Error(`Unable to delete Hero slide ${id}`);
      }
    }

    setBackendHeroSlideIds(savedIds);
    return savedSlides;
  };

  /* =======================================================
     SAVE SERVICES
  ======================================================= */

  const saveServices = async () => {
    const currentServices = Array.isArray(
      homeContent.services
    )
      ? homeContent.services
      : [];

    const savedServices = [];

    for (const service of currentServices) {
      const numericId = Number(service.id);

      const isExistingBackendService =
        Number.isFinite(numericId) &&
        backendServiceIds.includes(numericId);

      if (isExistingBackendService) {
        const response = await fetch(
          `${API_BASE_URL}/home-content/services/${numericId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: service.number || "",
              slug: service.slug || "",
              title: service.title || "",
              description: service.description || "",
              icon: service.icon || "building",
              enabled: service.enabled !== false,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Unable to update service ${numericId}`
          );
        }

        const updated = await response.json();

        savedServices.push(updated);
      } else {
        const response = await fetch(
          `${API_BASE_URL}/home-content/services`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: service.number || "",
              slug: service.slug || "",
              title: service.title || "",
              description: service.description || "",
              icon: service.icon || "building",
              enabled: service.enabled !== false,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Unable to create service "${service.title || "Untitled"}"`
          );
        }

        const created = await response.json();

        savedServices.push(created);
      }
    }

    const currentNumericIds = savedServices
      .map((service) => Number(service.id))
      .filter(Number.isFinite);

    const removedBackendIds = backendServiceIds.filter(
      (backendId) => !currentNumericIds.includes(backendId)
    );

    for (const serviceId of removedBackendIds) {
      const response = await fetch(
        `${API_BASE_URL}/home-content/services/${serviceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok && response.status !== 404) {
        throw new Error(
          `Unable to delete service ${serviceId}`
        );
      }
    }

    setBackendServiceIds(currentNumericIds);

    return savedServices;
  };

  /* =======================================================
     SAVE ABOUT FEATURES

     About feature cards are stored in the about_features table.
     Existing records are updated, new records are created, and
     removed records are deleted from the backend.
  ======================================================= */

  const saveAboutFeatures = async () => {
    const currentFeatures = Array.isArray(
      homeContent.aboutFeatures
    )
      ? homeContent.aboutFeatures
      : [];

    const savedFeatures = [];

    for (const feature of currentFeatures) {
      const numericId = Number(feature.id);

      const isExistingBackendFeature =
        Number.isFinite(numericId) &&
        backendAboutFeatureIds.includes(numericId);

      const payload = {
        title: feature.title || "",
        description: feature.description || "",
        icon: feature.icon || "quality",
        enabled: feature.enabled !== false,
      };

      let response;

      if (isExistingBackendFeature) {
        response = await fetch(
          `${API_BASE_URL}/about-features/${numericId}`,
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
          `${API_BASE_URL}/about-features`,
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
        const message = await response.text();

        throw new Error(
          message ||
            `Unable to save About feature ${
              feature.title || "Untitled"
            }`
        );
      }

      savedFeatures.push(await response.json());
    }

    const savedIds = savedFeatures
      .map((feature) => Number(feature.id))
      .filter(Number.isFinite);

    const removedBackendIds =
      backendAboutFeatureIds.filter(
        (backendId) => !savedIds.includes(backendId)
      );

    for (const featureId of removedBackendIds) {
      const response = await fetch(
        `${API_BASE_URL}/about-features/${featureId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok && response.status !== 404) {
        throw new Error(
          `Unable to delete About feature ${featureId}`
        );
      }
    }

    setBackendAboutFeatureIds(savedIds);

    return savedFeatures;
  };

  /* =======================================================
     SAVE ALL
  ======================================================= */

  const handleSave = async () => {
    if (saving) {
      return;
    }

    setSaving(true);
    setSaved(false);
    setSaveError("");

    try {
      const payload =
        buildHomeContentPayload(homeContent);

      let response;

      if (homeContent.id) {
        response = await fetch(
          `${API_BASE_URL}/home-content/${homeContent.id}`,
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
          `${API_BASE_URL}/home-content`,
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
        throw new Error(
          `Home Content API returned ${response.status}`
        );
      }

      const savedHome = await response.json();

      const savedHeroSlides = await saveHeroSlides();
      const savedServices = await saveServices();
      const savedAboutFeatures = await saveAboutFeatures();

      const finalContent = {
        ...homeContent,
        ...savedHome,
        slides: savedHeroSlides,
        services: savedServices,
        aboutFeatures: savedAboutFeatures,
      };

      setHomeContent(finalContent);

      try {
        localStorage.setItem(
          "saamHomeContent",
          JSON.stringify(finalContent)
        );
      } catch {
        // Local storage is only a cache.
      }

      window.dispatchEvent(
        new Event("saamHomeContentUpdated")
      );

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to save Home Page:", error);

      setSaveError(
        "Unable to save Home Page. Please make sure the Spring Boot backend is running on port 8080."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    if (
      !window.confirm(
        "Reset Home Page content to default values?"
      )
    ) {
      return;
    }

    const resetContent = cloneDefaults();

    setHomeContent(resetContent);

    setSaved(false);

    setSaveError("");

    try {
      localStorage.removeItem("saamHomeContent");
    } catch {
      // Ignore local storage errors.
    }

    window.dispatchEvent(
      new Event("saamHomeContentUpdated")
    );
  };

  /* =======================================================
     ICON MAP
  ======================================================= */

  const serviceIconMap = {
    building: Building2,
    landmark: Landmark,
    house: House,
    share: Share2,
    wrench: Wrench,
    ruler: Ruler,
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#1f2937]" />

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading Home Page...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/dashboard")
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
              title="Back to Dashboard"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-[#1f2937] sm:text-xl">
                Home Page
              </h1>

              <p className="hidden text-sm text-gray-500 sm:block">
                Manage Home Page content and sections
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="hidden items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 sm:flex"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#1f2937] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* LOAD ERROR */}

        {loadError && (
          <div className="mb-6 border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {loadError}
          </div>
        )}

        {/* SAVE ERROR */}

        {saveError && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {saveError}
          </div>
        )}

        {/* SUCCESS */}

        {saved && (
          <div className="mb-6 border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Home Page changes saved successfully.
          </div>
        )}

        {/* =================================================
            HERO VISIBILITY
        ================================================= */}

        <section className="mb-6 border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                {homeContent.heroEnabled ? (
                  <Eye size={21} />
                ) : (
                  <EyeOff size={21} />
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">
                  Hero Section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Control the main Home Page hero carousel.
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle Hero Section"
              onClick={() =>
                updateField(
                  "heroEnabled",
                  !homeContent.heroEnabled
                )
              }
              className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
                homeContent.heroEnabled
                  ? "bg-[#1f2937]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`mt-1 inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  homeContent.heroEnabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <section className="mb-6 border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-[#1f2937]">
              Hero Content
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Content displayed across the Hero section.
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Secondary Heading
              </label>

              <input
                type="text"
                value={
                  homeContent.heroSecondaryHeading || ""
                }
                onChange={(event) =>
                  updateField(
                    "heroSecondaryHeading",
                    event.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Explore Projects Button
                </label>

                <input
                  type="text"
                  value={
                    homeContent.exploreButtonText || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "exploreButtonText",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  placeholder="Explore Projects"
                />

                <input
                  type="text"
                  value={
                    homeContent.exploreButtonLink || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "exploreButtonLink",
                      event.target.value
                    )
                  }
                  className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  placeholder="/projects"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Get a Quote Button
                </label>

                <input
                  type="text"
                  value={
                    homeContent.quoteButtonText || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "quoteButtonText",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  placeholder="Get a Quote"
                />

                <input
                  type="text"
                  value={
                    homeContent.quoteButtonLink || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "quoteButtonLink",
                      event.target.value
                    )
                  }
                  className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  placeholder="/contact"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            HERO SLIDES
        ================================================= */}

        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#1f2937]">
              Hero Slides
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add, edit, remove and control Hero carousel slides.
            </p>
          </div>

          <button
            type="button"
            onClick={addSlide}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Plus size={17} />
            Add Slide
          </button>
        </div>

        <div className="space-y-5">
          {homeContent.slides.map((slide, index) => (
            <section
              key={`slide-${slide.id}`}
              className="overflow-hidden border border-gray-200 bg-white"
            >
              <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-center gap-3">
                  <GripVertical
                    size={19}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-sm font-semibold text-[#1f2937]">
                      Slide {index + 1}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      ID: {slide.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      toggleSlide(slide.id)
                    }
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                      slide.enabled
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {slide.enabled ? (
                      <>
                        <Eye size={15} />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff size={15} />
                        Hidden
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteSlide(slide.id)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                    title="Delete slide"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[320px_1fr] lg:p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Hero Image
                  </label>

                  <div className="aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                    {slide.image ? (
                      <img
                        src={slide.image.startsWith("http") ? slide.image : `http://localhost:5173${slide.image}`}
                        alt={`Slide ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={32} />
                        <span className="mt-2 text-xs">No image selected</span>
                      </div>
                    )}
                  </div>

                  <label
                    htmlFor={`hero-image-${slide.id}`}
                    className={`mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#C9A227] hover:bg-[#FBF8EE] ${
                      uploadingImage === `hero-slide-${slide.id}`
                        ? "pointer-events-none opacity-60"
                        : ""
                    }`}
                  >
                    {uploadingImage === `hero-slide-${slide.id}` ? (
                      <>
                        <LoaderCircle size={17} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={17} />
                        Choose Image from Gallery
                      </>
                    )}
                  </label>

                  <input
                    id={`hero-image-${slide.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleSlideImageUpload(event, slide.id)
                    }
                  />

                  {renderImageSizeControls(
                    `hero-slide-${slide.id}`
                  )}

                  {slide.image && (
                    <p className="mt-2 break-all text-[11px] leading-5 text-gray-400">
                      Saved image: {slide.image}
                    </p>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Label
                    </label>

                    <input
                      type="text"
                      value={slide.label || ""}
                      onChange={(event) =>
                        updateSlide(
                          slide.id,
                          "label",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Main Heading
                    </label>

                    <input
                      type="text"
                      value={slide.title || ""}
                      onChange={(event) =>
                        updateSlide(
                          slide.id,
                          "title",
                          event.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      value={slide.description || ""}
                      onChange={(event) =>
                        updateSlide(
                          slide.id,
                          "description",
                          event.target.value
                        )
                      }
                      className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}

          {homeContent.slides.length === 0 && (
            <div className="border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <ImageIcon
                size={32}
                className="mx-auto text-gray-400"
              />

              <p className="mt-3 text-sm font-medium text-gray-600">
                No Hero slides added.
              </p>

              <button
                type="button"
                onClick={addSlide}
                className="mt-4 rounded-lg bg-[#1f2937] px-4 py-2 text-sm font-semibold text-white"
              >
                Add Slide
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            ABOUT
        ================================================= */}

        <section className="mt-10 overflow-hidden border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-5 border-b border-gray-200 px-5 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF8DF] text-[#A98216]">
                <Info size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">
                  About Section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage About Us content shown on the Home Page.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateAboutField(
                  "aboutEnabled",
                  !homeContent.aboutEnabled
                )
              }
              className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
                homeContent.aboutEnabled
                  ? "bg-[#1f2937]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`mt-1 inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  homeContent.aboutEnabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                ["aboutLabel", "Section Label"],
                ["aboutHeading", "Main Heading"],
                [
                  "aboutHeadingHighlight",
                  "Heading Highlight",
                ],
                ["aboutBadge", "Image Badge"],
                ["aboutImageLabel", "Image Label"],
                ["aboutImageTitle", "Image Title"],
                ["aboutWhoWeAre", "Who We Are Label"],
                ["aboutCtaText", "CTA Text"],
                ["aboutCtaLink", "CTA Link"],
                ["aboutImageAlt", "Image Alt Text"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                  </label>

                  <input
                    type="text"
                    value={homeContent[field] || ""}
                    onChange={(event) =>
                      updateAboutField(
                        field,
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-500"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  About Description
                </label>

                <textarea
                  rows={3}
                  value={
                    homeContent.aboutDescription || ""
                  }
                  onChange={(event) =>
                    updateAboutField(
                      "aboutDescription",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Paragraph 1
                </label>

                <textarea
                  rows={4}
                  value={
                    homeContent.aboutParagraph1 || ""
                  }
                  onChange={(event) =>
                    updateAboutField(
                      "aboutParagraph1",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Paragraph 2
                </label>

                <textarea
                  rows={4}
                  value={
                    homeContent.aboutParagraph2 || ""
                  }
                  onChange={(event) =>
                    updateAboutField(
                      "aboutParagraph2",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  About Section Image
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] sm:items-start">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                    {homeContent.aboutImage ? (
                      <img
                        src={homeContent.aboutImage.startsWith("http") ? homeContent.aboutImage : `http://localhost:5173${homeContent.aboutImage}`}
                        alt="About section preview"
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-gray-400">
                        <ImageIcon size={30} />
                        <span className="mt-2 text-xs">No image selected</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="about-image-upload"
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#C9A227] hover:bg-[#FBF8EE] ${
                        uploadingImage === "about-image"
                          ? "pointer-events-none opacity-60"
                          : ""
                      }`}
                    >
                      {uploadingImage === "about-image" ? (
                        <>
                          <LoaderCircle size={17} className="animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={17} />
                          Choose Image from Gallery
                        </>
                      )}
                    </label>

                    <input
                      id="about-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAboutImageUpload}
                    />

                    {renderImageSizeControls("about-image")}

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Select an image from your computer. The image will be uploaded to the website's public/images/about folder.
                    </p>

                    {homeContent.aboutImage && (
                      <p className="mt-2 break-all text-[11px] leading-5 text-gray-400">
                        Saved image: {homeContent.aboutImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT FEATURES */}

            <div>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-[#1f2937]">
                    About Features
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage feature cards shown in the About section.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addAboutFeature}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={17} />
                  Add Feature
                </button>
              </div>

              <div className="space-y-4">
                {homeContent.aboutFeatures.map(
                  (feature, index) => (
                    <div
                      key={`about-feature-${feature.id}`}
                      className="border border-gray-200 bg-gray-50 p-5"
                    >
                      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <p className="text-sm font-semibold text-[#1f2937]">
                          Feature {index + 1}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              toggleAboutFeature(
                                feature.id
                              )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                              feature.enabled
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {feature.enabled
                              ? "Active"
                              : "Hidden"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteAboutFeature(
                                feature.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Title
                          </label>

                          <input
                            type="text"
                            value={feature.title || ""}
                            onChange={(event) =>
                              updateAboutFeature(
                                feature.id,
                                "title",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Icon
                          </label>

                          <select
                            value={
                              feature.icon || "quality"
                            }
                            onChange={(event) =>
                              updateAboutFeature(
                                feature.id,
                                "icon",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                          >
                            <option value="quality">
                              Quality
                            </option>
                            <option value="reliability">
                              Reliability
                            </option>
                            <option value="safety">
                              Safety
                            </option>
                            <option value="value">
                              Long-Term Value
                            </option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Description
                          </label>

                          <textarea
                            rows={3}
                            value={
                              feature.description || ""
                            }
                            onChange={(event) =>
                              updateAboutFeature(
                                feature.id,
                                "description",
                                event.target.value
                              )
                            }
                            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* BRAND ITEMS */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Brand Items
              </label>

              <input
                type="text"
                value={(
                  homeContent.aboutBrandItems || []
                ).join(", ")}
                onChange={(event) =>
                  updateAboutField(
                    "aboutBrandItems",
                    event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none"
                placeholder="Engineering, Quality, Trust"
              />
            </div>
          </div>
        </section>

        {/* =================================================
            SERVICES
        ================================================= */}

        <section className="mt-10 overflow-hidden border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-5 border-b border-gray-200 px-5 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF8DF] text-[#A98216]">
                <Building2 size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">
                  Services Section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage services displayed on the public Home Page.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "servicesEnabled",
                  !homeContent.servicesEnabled
                )
              }
              className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
                homeContent.servicesEnabled
                  ? "bg-[#1f2937]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`mt-1 inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  homeContent.servicesEnabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                ["servicesLabel", "Section Label"],
                ["servicesHeading", "Main Heading"],
                [
                  "servicesHeadingHighlight",
                  "Heading Highlight",
                ],
                ["servicesCtaEyebrow", "CTA Eyebrow"],
                ["servicesCtaLabel", "CTA Button Text"],
                ["servicesCtaLink", "CTA Link"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                  </label>

                  <input
                    type="text"
                    value={homeContent[field] || ""}
                    onChange={(event) =>
                      updateField(
                        field,
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Section Description
                </label>

                <textarea
                  rows={3}
                  value={
                    homeContent.servicesDescription || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "servicesDescription",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Intro Strip Text
                </label>

                <textarea
                  rows={3}
                  value={homeContent.servicesIntro || ""}
                  onChange={(event) =>
                    updateField(
                      "servicesIntro",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  CTA Description
                </label>

                <textarea
                  rows={3}
                  value={
                    homeContent.servicesCtaDescription ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "servicesCtaDescription",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>
            </div>

            {/* SERVICE CARDS */}

            <div>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-[#1f2937]">
                    Service Cards
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Add, edit, delete and control visibility of each service.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={17} />
                  Add Service
                </button>
              </div>

              <div className="space-y-4">
                {homeContent.services.map(
                  (service, index) => {
                    const ServiceIcon =
                      serviceIconMap[
                        service.icon
                      ] || Building2;

                    return (
                      <div
                        key={`service-${service.id}`}
                        className="overflow-hidden border border-gray-200 bg-gray-50"
                      >
                        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF8DF] text-[#A98216]">
                              <ServiceIcon size={19} />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-[#1f2937]">
                                Service {index + 1}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                ID: {service.id}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                toggleService(
                                  service.id
                                )
                              }
                              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                                service.enabled
                                  ? "bg-green-50 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {service.enabled
                                ? "Active"
                                : "Hidden"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteService(
                                  service.id
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                              Number
                            </label>

                            <input
                              type="text"
                              value={
                                service.number || ""
                              }
                              onChange={(event) =>
                                updateServiceField(
                                  service.id,
                                  "number",
                                  event.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                              placeholder="01"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                              Icon
                            </label>

                            <select
                              value={
                                service.icon ||
                                "building"
                              }
                              onChange={(event) =>
                                updateServiceField(
                                  service.id,
                                  "icon",
                                  event.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                            >
                              <option value="building">
                                Civil / Building
                              </option>

                              <option value="landmark">
                                Commercial / Landmark
                              </option>

                              <option value="house">
                                Residential / House
                              </option>

                              <option value="share">
                                Infrastructure / Share
                              </option>

                              <option value="wrench">
                                Renovation / Wrench
                              </option>

                              <option value="ruler">
                                Engineering / Ruler
                              </option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                              Title
                            </label>

                            <input
                              type="text"
                              value={
                                service.title || ""
                              }
                              onChange={(event) =>
                                updateServiceField(
                                  service.id,
                                  "title",
                                  event.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                              Slug
                            </label>

                            <input
                              type="text"
                              value={
                                service.slug || ""
                              }
                              onChange={(event) =>
                                updateServiceField(
                                  service.id,
                                  "slug",
                                  event.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                              Description
                            </label>

                            <textarea
                              rows={3}
                              value={
                                service.description ||
                                ""
                              }
                              onChange={(event) =>
                                updateServiceField(
                                  service.id,
                                  "description",
                                  event.target.value
                                )
                              }
                              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}

                {homeContent.services.length === 0 && (
                  <div className="border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
                    No services added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <section className="mt-10 overflow-hidden border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-5 border-b border-gray-200 px-5 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF8DF] text-[#A98216]">
                <MessageSquareQuote size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">
                  Testimonials Section
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage client reviews displayed on the Home Page.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "testimonialsEnabled",
                  !homeContent.testimonialsEnabled
                )
              }
              className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
                homeContent.testimonialsEnabled
                  ? "bg-[#1f2937]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`mt-1 inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  homeContent.testimonialsEnabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                [
                  "testimonialsLabel",
                  "Section Label",
                ],
                [
                  "testimonialsHeading",
                  "Main Heading",
                ],
                [
                  "testimonialsHeadingHighlight",
                  "Heading Highlight",
                ],
                [
                  "testimonialsTrustedClientsText",
                  "Trusted Clients Text",
                ],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                  </label>

                  <input
                    type="text"
                    value={homeContent[field] || ""}
                    onChange={(event) =>
                      updateField(
                        field,
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none"
                  />
                </div>
              ))}

              {[
                [
                  "testimonialsDescription",
                  "Section Description",
                ],
                [
                  "testimonialsTrustStrip",
                  "Trust Strip Text",
                ],
                [
                  "testimonialsBottomStatement",
                  "Bottom Statement",
                ],
              ].map(([field, label]) => (
                <div
                  key={field}
                  className="md:col-span-2"
                >
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {label}
                  </label>

                  <textarea
                    rows={3}
                    value={homeContent[field] || ""}
                    onChange={(event) =>
                      updateField(
                        field,
                        event.target.value
                      )
                    }
                    className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                  />
                </div>
              ))}
            </div>

            {/* REVIEWS */}

            <div>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-[#1f2937]">
                    Client Reviews
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Add, edit, hide or remove testimonials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addTestimonial}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={17} />
                  Add Review
                </button>
              </div>

              <div className="space-y-4">
                {homeContent.testimonials.map(
                  (testimonial, index) => (
                    <div
                      key={`testimonial-${testimonial.id}`}
                      className="overflow-hidden border border-gray-200 bg-gray-50"
                    >
                      <div className="flex flex-col justify-between gap-3 border-b border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-sm font-semibold text-[#1f2937]">
                            Review {index + 1}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            ID: {testimonial.id}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              toggleTestimonial(
                                testimonial.id
                              )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                              testimonial.enabled !==
                              false
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {testimonial.enabled !==
                            false
                              ? "Active"
                              : "Hidden"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteTestimonial(
                                testimonial.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Client Name
                          </label>

                          <input
                            type="text"
                            value={
                              testimonial.name || ""
                            }
                            onChange={(event) =>
                              updateTestimonialField(
                                testimonial.id,
                                "name",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Initials
                          </label>

                          <input
                            type="text"
                            maxLength={3}
                            value={
                              testimonial.initials || ""
                            }
                            onChange={(event) =>
                              updateTestimonialField(
                                testimonial.id,
                                "initials",
                                event.target.value.toUpperCase()
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Role
                          </label>

                          <input
                            type="text"
                            value={
                              testimonial.role || ""
                            }
                            onChange={(event) =>
                              updateTestimonialField(
                                testimonial.id,
                                "role",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Project
                          </label>

                          <input
                            type="text"
                            value={
                              testimonial.project || ""
                            }
                            onChange={(event) =>
                              updateTestimonialField(
                                testimonial.id,
                                "project",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Review
                          </label>

                          <textarea
                            rows={4}
                            value={
                              testimonial.review || ""
                            }
                            onChange={(event) =>
                              updateTestimonialField(
                                testimonial.id,
                                "review",
                                event.target.value
                              )
                            }
                            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}

                {homeContent.testimonials.length ===
                  0 && (
                  <div className="border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
                    No testimonials added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="mt-10 overflow-hidden border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-5 border-b border-gray-200 px-5 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFF8DF] text-[#A98216]">
                <BarChart3 size={21} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#1f2937]">
                  Statistics / Our Strength
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage statistics displayed below the Home Page Hero.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "statisticsEnabled",
                  !homeContent.statisticsEnabled
                )
              }
              className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition ${
                homeContent.statisticsEnabled
                  ? "bg-[#1f2937]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`mt-1 inline-block h-5 w-5 rounded-full bg-white transition-transform ${
                  homeContent.statisticsEnabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-8 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Section Label
                </label>

                <input
                  type="text"
                  value={
                    homeContent.statisticsLabel || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "statisticsLabel",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Section Heading
                </label>

                <input
                  type="text"
                  value={
                    homeContent.statisticsHeading || ""
                  }
                  onChange={(event) =>
                    updateField(
                      "statisticsHeading",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Section Description
                </label>

                <textarea
                  rows={3}
                  value={
                    homeContent.statisticsDescription ||
                    ""
                  }
                  onChange={(event) =>
                    updateField(
                      "statisticsDescription",
                      event.target.value
                    )
                  }
                  className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none"
                />
              </div>
            </div>

            {/* STATISTIC CARDS */}

            <div>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-base font-semibold text-[#1f2937]">
                    Statistic Cards
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage values, labels and descriptions for each card.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addStatistic}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={17} />
                  Add Statistic
                </button>
              </div>

              <div className="space-y-5">
                {homeContent.statistics.map(
                  (stat, index) => (
                    <div
                      key={`stat-${stat.id}`}
                      className="overflow-hidden border border-gray-200 bg-gray-50"
                    >
                      <div className="flex flex-col justify-between gap-3 border-b border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <GripVertical
                            size={18}
                            className="text-gray-400"
                          />

                          <div>
                            <p className="text-sm font-semibold text-[#1f2937]">
                              Statistic {index + 1}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              ID: {stat.id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              toggleStatistic(
                                stat.id
                              )
                            }
                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                              stat.enabled
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {stat.enabled ? (
                              <>
                                <Eye size={15} />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff size={15} />
                                Hidden
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteStatistic(
                                stat.id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Value
                          </label>

                          <input
                            type="text"
                            value={stat.value || ""}
                            onChange={(event) =>
                              updateStatistic(
                                stat.id,
                                "value",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold outline-none"
                            placeholder="15+"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Label
                          </label>

                          <input
                            type="text"
                            value={stat.label || ""}
                            onChange={(event) =>
                              updateStatistic(
                                stat.id,
                                "label",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none"
                            placeholder="Projects Delivered"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Description
                          </label>

                          <textarea
                            rows={3}
                            value={
                              stat.description || ""
                            }
                            onChange={(event) =>
                              updateStatistic(
                                stat.id,
                                "description",
                                event.target.value
                              )
                            }
                            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm leading-6 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}

                {homeContent.statistics.length ===
                  0 && (
                  <div className="border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
                    No statistics added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            BOTTOM SAVE
        ================================================= */}

        <div className="mt-8 flex justify-end pb-10">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#1f2937] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />

            {saving
              ? "Saving Home Page..."
              : "Save Home Page"}
          </button>
        </div>
      </main>
    </div>
  );
}