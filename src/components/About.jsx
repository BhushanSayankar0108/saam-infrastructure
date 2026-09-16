import { Fragment, useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Award,
} from "lucide-react";

import aboutConstruction from "../assets/images/about-construction.jpg";

/* =========================================================
   API
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const HOME_CONTENT_API = `${API_BASE_URL}/api/home-content`;
const ABOUT_FEATURES_API = `${API_BASE_URL}/api/about-features/enabled`;

/* =========================================================
   ICON MAP
========================================================= */

const ABOUT_ICONS = {
  quality: CheckCircle2,
  reliability: ShieldCheck,
  safety: Award,
  value: Building2,

  // Common alternative values are also supported so older database
  // records continue to display the correct icon.
  checkcircle2: CheckCircle2,
  checkcircle: CheckCircle2,
  shieldcheck: ShieldCheck,
  shield: ShieldCheck,
  award: Award,
  building2: Building2,
  building: Building2,
};

/* =========================================================
   DEFAULT ABOUT CONTENT
========================================================= */

const DEFAULT_ABOUT_CONTENT = {
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
   SAFE CONTENT NORMALIZER
========================================================= */

function normalizeAboutFeatures(features) {
  if (!Array.isArray(features)) {
    return [];
  }

  return features
    .filter(Boolean)
    .map((feature, index) => ({
      id: feature?.id ?? index + 1,
      title: feature?.title ?? "",
      description: feature?.description ?? "",
      icon: feature?.icon ?? "quality",
      enabled: feature?.enabled !== false,
    }))
    .filter((feature) => feature.enabled !== false);
}

/* =========================================================
   LOCAL STORAGE FALLBACK
========================================================= */

function getAboutContent() {
  try {
    const savedContent = localStorage.getItem("saamHomeContent");

    if (!savedContent) {
      return DEFAULT_ABOUT_CONTENT;
    }

    const parsed = JSON.parse(savedContent);

    if (!parsed || typeof parsed !== "object") {
      return DEFAULT_ABOUT_CONTENT;
    }

    const aboutFeatures = Array.isArray(parsed.aboutFeatures)
      ? parsed.aboutFeatures.map((feature, index) => ({
          id: feature?.id ?? index + 1,
          title: feature?.title ?? "",
          description: feature?.description ?? "",
          icon: feature?.icon ?? "quality",
          enabled: feature?.enabled !== false,
        }))
      : DEFAULT_ABOUT_CONTENT.aboutFeatures;

    return {
      ...DEFAULT_ABOUT_CONTENT,
      ...parsed,
      aboutFeatures,
    };
  } catch {
    return DEFAULT_ABOUT_CONTENT;
  }
}

/* =========================================================
   IMAGE HELPER
========================================================= */

function getAboutImage(image) {
  if (typeof image !== "string" || image.trim() === "") {
    return aboutConstruction;
  }

  const value = image.trim();

  // Base64/blob images can be used directly.
  if (
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  // Absolute URLs can be used directly.
  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  // Uploaded images are stored by the backend as public paths such as:
  // /images/about/about-image-123.jpg
  // The browser must request those files from Spring Boot, not Vite.
  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  return `${API_BASE_URL}/${value}`;
}

/* =========================================================
   ABOUT COMPONENT
========================================================= */

function About() {
  const [content, setContent] = useState(getAboutContent);
  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD BACKEND CONTENT
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadAboutContent = async () => {
      const localContent = getAboutContent();

      let finalContent = {
        ...DEFAULT_ABOUT_CONTENT,
        ...localContent,
      };

      /* ---------------------------------------------------
         LOAD HOME CONTENT
      --------------------------------------------------- */

      try {
        const response = await fetch(HOME_CONTENT_API, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const homeData = await response.json();

          if (homeData && typeof homeData === "object") {
            finalContent = {
              ...finalContent,

              aboutEnabled:
                homeData.aboutEnabled ?? finalContent.aboutEnabled,

              aboutLabel:
                homeData.aboutLabel ?? finalContent.aboutLabel,

              aboutDescription:
                homeData.aboutDescription ??
                finalContent.aboutDescription,

              aboutHeading:
                homeData.aboutHeading ?? finalContent.aboutHeading,

              aboutHeadingHighlight:
                homeData.aboutHeadingHighlight ??
                finalContent.aboutHeadingHighlight,

              aboutImage:
                homeData.aboutImage ?? finalContent.aboutImage,

              aboutImageAlt:
                homeData.aboutImageAlt ?? finalContent.aboutImageAlt,

              aboutImageLabel:
                homeData.aboutImageLabel ??
                finalContent.aboutImageLabel,

              aboutImageTitle:
                homeData.aboutImageTitle ??
                finalContent.aboutImageTitle,

              aboutWhoWeAre:
                homeData.aboutWhoWeAre ??
                finalContent.aboutWhoWeAre,

              aboutParagraph1:
                homeData.aboutParagraph1 ??
                finalContent.aboutParagraph1,

              aboutParagraph2:
                homeData.aboutParagraph2 ??
                finalContent.aboutParagraph2,

              aboutBadge:
                homeData.aboutBadge ?? finalContent.aboutBadge,

              aboutCtaText:
                homeData.aboutCtaText ?? finalContent.aboutCtaText,

              aboutCtaLink:
                homeData.aboutCtaLink ?? finalContent.aboutCtaLink,

              aboutBrandItems:
                Array.isArray(homeData.aboutBrandItems)
                  ? homeData.aboutBrandItems
                  : finalContent.aboutBrandItems,
            };
          }
        }
      } catch {
        console.warn(
          "About Home Content API unavailable. Using local fallback."
        );
      }

      /* ---------------------------------------------------
         LOAD ABOUT FEATURES
      --------------------------------------------------- */

      try {
        const response = await fetch(ABOUT_FEATURES_API, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `About Features API returned ${response.status}`
          );
        }

        const featureData = await response.json();

        if (Array.isArray(featureData)) {
          finalContent = {
            ...finalContent,
            aboutFeatures: normalizeAboutFeatures(featureData),
          };
        }
      } catch {
        console.warn(
          "About Features API unavailable. Using local fallback."
        );
      }

      if (cancelled) {
        return;
      }

      setContent(finalContent);
      setLoading(false);
    };

    loadAboutContent();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     LISTEN FOR ADMIN UPDATES
  ======================================================= */

  useEffect(() => {
    const reloadFromBackend = async () => {
      try {
        const [homeResponse, featuresResponse] = await Promise.all([
          fetch(HOME_CONTENT_API, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }),

          fetch(ABOUT_FEATURES_API, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        const localContent = getAboutContent();

        let updatedContent = {
          ...DEFAULT_ABOUT_CONTENT,
          ...localContent,
        };

        /* ---------------------------------------------------
           HOME CONTENT
        --------------------------------------------------- */

        if (homeResponse.ok) {
          const homeData = await homeResponse.json();

          if (homeData && typeof homeData === "object") {
            updatedContent = {
              ...updatedContent,

              aboutEnabled:
                homeData.aboutEnabled ??
                updatedContent.aboutEnabled,

              aboutLabel:
                homeData.aboutLabel ??
                updatedContent.aboutLabel,

              aboutDescription:
                homeData.aboutDescription ??
                updatedContent.aboutDescription,

              aboutHeading:
                homeData.aboutHeading ??
                updatedContent.aboutHeading,

              aboutHeadingHighlight:
                homeData.aboutHeadingHighlight ??
                updatedContent.aboutHeadingHighlight,

              aboutImage:
                homeData.aboutImage ??
                updatedContent.aboutImage,

              aboutImageAlt:
                homeData.aboutImageAlt ??
                updatedContent.aboutImageAlt,

              aboutImageLabel:
                homeData.aboutImageLabel ??
                updatedContent.aboutImageLabel,

              aboutImageTitle:
                homeData.aboutImageTitle ??
                updatedContent.aboutImageTitle,

              aboutWhoWeAre:
                homeData.aboutWhoWeAre ??
                updatedContent.aboutWhoWeAre,

              aboutParagraph1:
                homeData.aboutParagraph1 ??
                updatedContent.aboutParagraph1,

              aboutParagraph2:
                homeData.aboutParagraph2 ??
                updatedContent.aboutParagraph2,

              aboutBadge:
                homeData.aboutBadge ??
                updatedContent.aboutBadge,

              aboutCtaText:
                homeData.aboutCtaText ??
                updatedContent.aboutCtaText,

              aboutCtaLink:
                homeData.aboutCtaLink ??
                updatedContent.aboutCtaLink,

              aboutBrandItems:
                Array.isArray(homeData.aboutBrandItems)
                  ? homeData.aboutBrandItems
                  : updatedContent.aboutBrandItems,
            };
          }
        }

        /* ---------------------------------------------------
           ABOUT FEATURES
        --------------------------------------------------- */

        if (featuresResponse.ok) {
          const featuresData = await featuresResponse.json();

          if (Array.isArray(featuresData)) {
            updatedContent.aboutFeatures =
              normalizeAboutFeatures(featuresData);
          }
        }

        setContent(updatedContent);
      } catch {
        setContent(getAboutContent());
      }
    };

    const reloadFromLocalStorage = () => {
      setContent(getAboutContent());
    };

    window.addEventListener(
      "saamHomeContentUpdated",
      reloadFromBackend
    );

    window.addEventListener(
      "storage",
      reloadFromLocalStorage
    );

    return () => {
      window.removeEventListener(
        "saamHomeContentUpdated",
        reloadFromBackend
      );

      window.removeEventListener(
        "storage",
        reloadFromLocalStorage
      );
    };
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section
        id="about"
        className="relative w-full overflow-hidden bg-[#F7F1E6]"
      >
        <div className="mx-auto flex min-h-[300px] max-w-7xl items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#C9A227] border-t-transparent" />

            <p className="mt-4 text-sm text-[#686961]">
              Loading about section...
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227]" />
      </section>
    );
  }

  /* =======================================================
     HIDDEN SECTION
  ======================================================= */

  if (content.aboutEnabled === false) {
    return null;
  }

  /* =======================================================
     ENABLED FEATURES
  ======================================================= */

  const features = Array.isArray(content.aboutFeatures)
    ? content.aboutFeatures
        .filter((feature) => feature?.enabled !== false)
        .map((feature) => ({
          ...feature,
          icon:
            typeof feature?.icon === "string"
              ? feature.icon.trim().toLowerCase()
              : "quality",
        }))
    : [];

  /* =======================================================
     BRAND ITEMS
  ======================================================= */

  const brandItems =
    Array.isArray(content.aboutBrandItems) &&
    content.aboutBrandItems.length > 0
      ? content.aboutBrandItems
      : DEFAULT_ABOUT_CONTENT.aboutBrandItems;

  /* =======================================================
     IMAGE
  ======================================================= */

  const imageSrc = getAboutImage(content.aboutImage);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#F7F1E6]
        px-4
        py-12
        text-[#171815]
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
        xl:py-24
      "
    >
      {/* BACKGROUND DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-24
          h-64
          w-64
          rounded-full
          bg-[#C9A227]/[0.07]
          blur-3xl
          sm:-left-48
          sm:h-80
          sm:w-80
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/3
          h-72
          w-72
          rounded-full
          bg-[#171815]/[0.025]
          blur-3xl
          sm:h-80
          sm:w-80
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.02]
          [background-image:linear-gradient(#171815_1px,transparent_1px),linear-gradient(90deg,#171815_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-24
          hidden
          h-24
          w-1
          bg-[#C9A227]
          sm:block
          lg:h-28
        "
      />

      {/* MAIN CONTAINER */}

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}

        <div
          className="
            grid
            grid-cols-1
            gap-7
            lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
            lg:items-end
            lg:gap-12
            xl:gap-16
          "
        >
          {/* LEFT */}

          <div className="min-w-0">
            <div
              className="
                flex
                w-full
                min-w-0
                items-center
                gap-3
                sm:gap-4
              "
            >
              <span
                className="
                  h-[3px]
                  w-7
                  shrink-0
                  bg-[#C9A227]
                  sm:w-10
                  lg:w-12
                "
              />

              <h1
                className="
                  min-w-0
                  whitespace-nowrap
                  text-[2.35rem]
                  font-black
                  uppercase
                  leading-none
                  tracking-[-0.045em]
                  text-[#94700C]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[3.8rem]
                  xl:text-[4.3rem]
                  2xl:text-[4.6rem]
                "
              >
                {content.aboutLabel ||
                  DEFAULT_ABOUT_CONTENT.aboutLabel}
              </h1>
            </div>

            <p
              className="
                mt-4
                max-w-lg
                text-sm
                leading-6
                text-[#5F625B]
                sm:mt-5
                sm:text-base
                sm:leading-7
              "
            >
              {content.aboutDescription ||
                DEFAULT_ABOUT_CONTENT.aboutDescription}
            </p>
          </div>

          {/* RIGHT */}

          <div className="min-w-0 lg:pb-1">
            <h2
              className="
                max-w-3xl
                text-[1.7rem]
                font-bold
                leading-[1.1]
                tracking-[-0.035em]
                text-[#171815]
                sm:text-3xl
                md:text-[2.2rem]
                lg:text-[2.5rem]
                xl:text-[2.9rem]
              "
            >
              {content.aboutHeading ||
                DEFAULT_ABOUT_CONTENT.aboutHeading}

              <br />

              <span className="text-[#7C8792]">
                {content.aboutHeadingHighlight ||
                  DEFAULT_ABOUT_CONTENT.aboutHeadingHighlight}
              </span>
            </h2>

            <div
              className="
                mt-4
                flex
                items-center
                gap-2
                sm:mt-5
              "
            >
              <span
                className="
                  h-[2px]
                  w-7
                  bg-[#C9A227]
                  sm:w-10
                "
              />

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#C9A227]
                "
              />
            </div>
          </div>
        </div>

        {/* MAIN ABOUT AREA */}

        <div
          className="
            mt-9
            grid
            grid-cols-1
            gap-7
            sm:mt-12
            lg:mt-14
            lg:grid-cols-2
            lg:items-stretch
            lg:gap-0
          "
        >
          {/* IMAGE AREA */}

          <div
            className="
              relative
              min-w-0
              pb-2
              pr-2
              sm:pb-3
              sm:pr-3
              lg:pb-3
              lg:pr-3
            "
          >
            {/* GOLD FRAME */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-2
                right-0
                top-2
                rounded-[25px]
                bg-[#C9A227]
                sm:left-3
                sm:top-3
                sm:rounded-[32px]
                lg:left-3
                lg:top-3
                lg:rounded-[34px]
              "
            />

            {/* IMAGE CARD */}

            <div
              className="
                group
                relative
                z-10
                h-[290px]
                w-full
                overflow-hidden
                rounded-[23px]
                bg-[#CFC7B5]
                shadow-[0_18px_45px_rgba(23,24,21,0.15)]
                sm:h-[410px]
                sm:rounded-[30px]
                md:h-[460px]
                lg:h-full
                lg:min-h-[540px]
                lg:rounded-[34px]
                lg:rounded-br-[78px]
              "
            >
              {/* IMAGE */}

              <img
                src={imageSrc}
                alt={
                  content.aboutImageAlt ||
                  DEFAULT_ABOUT_CONTENT.aboutImageAlt
                }
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.04]
                "
                onError={(event) => {
                  const imageElement = event.currentTarget;

                  if (!imageElement.dataset.fallbackApplied) {
                    imageElement.dataset.fallbackApplied = "true";
                    imageElement.src = aboutConstruction;
                  }
                }}
              />

              {/* DARK OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-b
                  from-[#10110F]/5
                  via-transparent
                  to-[#10110F]/90
                "
              />

              {/* GOLD OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-tr
                  from-[#C9A227]/10
                  via-transparent
                  to-transparent
                  opacity-60
                "
              />

              {/* TOP BRAND BADGE */}

              <div
                className="
                  absolute
                  left-3
                  top-3
                  sm:left-5
                  sm:top-5
                  lg:left-6
                  lg:top-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-[#10110F]/60
                    px-2.5
                    py-1.5
                    shadow-[0_8px_25px_rgba(0,0,0,0.18)]
                    backdrop-blur-md
                    sm:px-3.5
                    sm:py-2
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-[#D7B63F]
                      shadow-[0_0_10px_rgba(215,182,63,0.7)]
                      sm:h-2
                      sm:w-2
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      sm:text-[9px]
                    "
                  >
                    {content.aboutBadge ||
                      DEFAULT_ABOUT_CONTENT.aboutBadge}
                  </span>
                </div>
              </div>

              {/* IMAGE DECORATION */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-4
                  h-12
                  w-12
                  rounded-full
                  border
                  border-[#DDBE4A]/35
                  sm:right-6
                  sm:top-6
                  sm:h-16
                  sm:w-16
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  right-7
                  top-7
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#DDBE4A]
                  sm:right-9
                  sm:top-9
                "
              />

              {/* IMAGE BOTTOM CONTENT */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  p-4
                  sm:p-6
                  lg:p-8
                "
              >
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#DDBE4A]
                    sm:text-[10px]
                    lg:text-xs
                  "
                >
                  {content.aboutImageLabel ||
                    DEFAULT_ABOUT_CONTENT.aboutImageLabel}
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-start
                    gap-2.5
                    sm:mt-3
                    sm:items-center
                    sm:gap-3
                  "
                >
                  <span
                    className="
                      mt-2
                      h-[2px]
                      w-6
                      shrink-0
                      bg-[#C9A227]
                      sm:mt-0
                      sm:w-9
                    "
                  />

                  <p
                    className="
                      max-w-[90%]
                      text-lg
                      font-bold
                      leading-tight
                      text-white
                      sm:text-2xl
                      lg:text-[1.7rem]
                    "
                  >
                    {content.aboutImageTitle ||
                      DEFAULT_ABOUT_CONTENT.aboutImageTitle}
                  </p>
                </div>
              </div>

              {/* BOTTOM GOLD LINE */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-20
                  bg-[#C9A227]
                  sm:w-28
                "
              />
            </div>
          </div>

          {/* DARK CONTENT PANEL */}

          <div
            className="
              relative
              z-20
              min-w-0
              overflow-hidden
              rounded-[23px]
              bg-[#171815]
              p-5
              text-white
              shadow-[0_20px_50px_rgba(15,16,14,0.17)]
              sm:rounded-[30px]
              sm:p-7
              lg:flex
              lg:min-h-[540px]
              lg:flex-col
              lg:justify-center
              lg:rounded-l-none
              lg:rounded-r-[34px]
              lg:p-8
              xl:p-10
            "
          >
            {/* DECORATIVE CIRCLE - TOP */}

            <div
              className="
                pointer-events-none
                absolute
                -right-14
                -top-14
                h-36
                w-36
                rounded-full
                border
                border-[#C9A227]/15
                sm:h-44
                sm:w-44
              "
            />

            {/* DECORATIVE CIRCLE - BOTTOM */}

            <div
              className="
                pointer-events-none
                absolute
                -bottom-16
                -left-16
                h-44
                w-44
                rounded-full
                border
                border-[#C9A227]/10
              "
            />

            {/* WHO WE ARE */}

            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-7
                  bg-[#C9A227]
                  sm:w-9
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.23em]
                  text-[#DDBE4A]
                  sm:text-[10px]
                  md:text-xs
                "
              >
                {content.aboutWhoWeAre ||
                  DEFAULT_ABOUT_CONTENT.aboutWhoWeAre}
              </span>
            </div>

            {/* TEXT */}

            <div
              className="
                relative
                z-10
                mt-4
                sm:mt-5
              "
            >
              <p
                className="
                  text-[13px]
                  leading-6
                  text-slate-200
                  sm:text-[15px]
                  sm:leading-7
                  lg:text-[16px]
                  lg:leading-7
                "
              >
                {content.aboutParagraph1 ||
                  DEFAULT_ABOUT_CONTENT.aboutParagraph1}
              </p>

              <p
                className="
                  mt-3
                  text-[13px]
                  leading-6
                  text-slate-400
                  sm:mt-4
                  sm:text-sm
                  sm:leading-7
                  lg:text-[14px]
                "
              >
                {content.aboutParagraph2 ||
                  DEFAULT_ABOUT_CONTENT.aboutParagraph2}
              </p>
            </div>

            {/* FEATURES */}

            {features.length > 0 && (
              <div
                className="
                  relative
                  z-10
                  mt-5
                  grid
                  grid-cols-1
                  gap-2.5
                  sm:mt-7
                  sm:grid-cols-2
                  sm:gap-3
                "
              >
                {features.map((feature) => {
                  const iconKey =
                    typeof feature.icon === "string"
                      ? feature.icon
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "")
                      : "quality";

                  const Icon =
                    ABOUT_ICONS[iconKey] ||
                    CheckCircle2;

                  return (
                    <div
                      key={feature.id}
                      className="
                        group
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-3
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[#C9A227]/50
                        hover:bg-[#C9A227]/10
                        sm:rounded-2xl
                        sm:p-3.5
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-2.5
                          sm:gap-3
                        "
                      >
                        {/* ICON */}

                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-[#C9A227]/40
                            bg-[#C9A227]/10
                            text-[#C9A227]
                            transition-all
                            duration-300
                            group-hover:bg-[#C9A227]
                            group-hover:text-[#171815]
                            sm:h-9
                            sm:w-9
                            sm:rounded-xl
                          "
                        >
                          <Icon size={16} />
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0">
                          <h3
                            className="
                              text-[13px]
                              font-bold
                              text-white
                              sm:text-sm
                            "
                          >
                            {feature.title}
                          </h3>

                          <p
                            className="
                              mt-1
                              text-[11px]
                              leading-5
                              text-slate-400
                              sm:text-xs
                            "
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA */}

            <div
              className="
                relative
                z-10
                mt-5
                sm:mt-7
              "
            >
              <a
                href={
                  content.aboutCtaLink ||
                  DEFAULT_ABOUT_CONTENT.aboutCtaLink
                }
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-between
                  gap-4
                  rounded-full
                  bg-[#C9A227]
                  px-4
                  py-2.5
                  text-[13px]
                  font-bold
                  text-[#171815]
                  shadow-[0_10px_25px_rgba(201,162,39,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#E0C45C]
                  hover:shadow-[0_16px_32px_rgba(201,162,39,0.25)]
                  sm:w-fit
                  sm:justify-center
                  sm:px-5
                  sm:text-sm
                "
              >
                <span>
                  {content.aboutCtaText ||
                    DEFAULT_ABOUT_CONTENT.aboutCtaText}
                </span>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#171815]
                    text-[#C9A227]
                    transition-all
                    duration-300
                    group-hover:rotate-45
                    sm:h-9
                    sm:w-9
                  "
                >
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>

            {/* BRAND LINE */}

            {brandItems.length > 0 && (
              <div
                className="
                  relative
                  z-10
                  mt-5
                  border-t
                  border-white/10
                  pt-4
                  sm:mt-7
                  sm:pt-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    sm:gap-3
                  "
                >
                  {brandItems.map((item, index) => (
                    <Fragment key={`${item}-${index}`}>
                      {index > 0 && (
                        <span
                          className="
                            h-px
                            flex-1
                            bg-white/10
                          "
                        />
                      )}

                      <span
                        className="
                          whitespace-nowrap
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.14em]
                          text-slate-500
                          sm:text-[9px]
                        "
                      >
                        {item}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM GOLD LINE */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[2px]
          bg-[#C9A227]
        "
      />
    </section>
  );
}

export default About;