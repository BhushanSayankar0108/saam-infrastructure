import { useEffect, useState } from "react";

import {
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  ClipboardCheck,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock3,
  MessageCircle,
  Award,
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
   API CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const SERVICES_API =
  `${API_BASE_URL}/api/services-page`;

const SERVICE_ITEMS_API =
  `${SERVICES_API}/items/enabled`;

const VALUE_ITEMS_API =
  `${SERVICES_API}/values/enabled`;

const ADVANTAGES_API =
  `${SERVICES_API}/advantages/enabled`;

/* =========================================================
   DEFAULT PAGE CONTENT
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
  whatWeDoHeadingHighlight:
    "from planning to completion.",
  whatWeDoCardLabel: "Built with purpose",
  whatWeDoCardDescription:
    "We combine practical experience, technical knowledge and responsible project execution to deliver construction and infrastructure solutions that meet our clients' requirements.",
  whatWeDoSecondaryDescription:
    "Every project is approached with attention to quality, coordination, safety and long-term performance.",

  expertiseLabel: "Our Expertise",
  expertiseHeading: "Construction services",
  expertiseHeadingHighlight:
    "built for real requirements.",
  expertiseDescription:
    "From residential projects to large infrastructure works, our services are structured around practical execution, quality and long-term performance.",

  whyChooseLabel: "Why Choose Us",
  whyChooseHeading: "A dependable partner",
  whyChooseHeadingHighlight:
    "for your next project.",
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
   DEFAULT SERVICES
========================================================= */

const DEFAULT_SERVICES = [
  {
    id: 1,
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
  },

  {
    id: 2,
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
  },

  {
    id: 3,
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
  },

  {
    id: 4,
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
  },

  {
    id: 5,
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
  },

  {
    id: 6,
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
  },

  {
    id: 7,
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
  },
];

/* =========================================================
   DEFAULT VALUE ITEMS
========================================================= */

const DEFAULT_VALUES = [
  {
    id: 1,
    number: "01",
    title: "Plan",
    text: "Clear planning before execution.",
  },

  {
    id: 2,
    number: "02",
    title: "Build",
    text: "Quality-focused project execution.",
  },

  {
    id: 3,
    number: "03",
    title: "Deliver",
    text: "Dependable results built to last.",
  },
];

/* =========================================================
   DEFAULT ADVANTAGES
========================================================= */

const DEFAULT_ADVANTAGES = [
  {
    id: 1,
    number: "01",
    icon: "Award",
    title: "Quality Workmanship",
    text:
      "We maintain high standards of workmanship and attention to detail throughout every stage of construction.",
  },

  {
    id: 2,
    number: "02",
    icon: "ShieldCheck",
    title: "Safety First",
    text:
      "Safety remains an important part of our planning, site management and project execution.",
  },

  {
    id: 3,
    number: "03",
    icon: "MessageCircle",
    title: "Transparent Communication",
    text:
      "We maintain clear and consistent communication with clients throughout the complete project lifecycle.",
  },

  {
    id: 4,
    number: "04",
    icon: "Clock3",
    title: "Timely Execution",
    text:
      "Careful planning and coordination help us maintain dependable project progress and delivery.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function normalizeCollection(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter(Boolean)
    .filter(
      (item) =>
        item.enabled !== false
    )
    .map((item, index) => ({
      ...item,
      displayOrder:
        Number.isFinite(
          Number(item.displayOrder)
        )
          ? Number(item.displayOrder)
          : index,
    }))
    .sort((a, b) => {
      const orderA = Number(
        a.displayOrder ?? 0
      );

      const orderB = Number(
        b.displayOrder ?? 0
      );

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return (
        Number(a.id ?? 0) -
        Number(b.id ?? 0)
      );
    });
}

/* =========================================================
   ICON RENDERER
========================================================= */

function ServiceIcon({
  name,
  size = 26,
}) {
  switch (name) {
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

/* =========================================================
   SERVICES PAGE
========================================================= */

function ServicesPage() {
  const [content, setContent] =
    useState(DEFAULT_CONTENT);

  const [services, setServices] =
    useState(DEFAULT_SERVICES);

  const [values, setValues] =
    useState(DEFAULT_VALUES);

  const [advantages, setAdvantages] =
    useState(DEFAULT_ADVANTAGES);

  const [loading, setLoading] =
    useState(true);

  /* =========================================================
     LOAD SERVICES CMS DATA
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadServicesPage() {
      try {
        const responses =
          await Promise.all([
            fetch(SERVICES_API),
            fetch(SERVICE_ITEMS_API),
            fetch(VALUE_ITEMS_API),
            fetch(ADVANTAGES_API),
          ]);

        const [
          contentResponse,
          servicesResponse,
          valuesResponse,
          advantagesResponse,
        ] = responses;

        let backendContent = null;
        let backendServices = [];
        let backendValues = [];
        let backendAdvantages = [];

        /* =====================================================
           PAGE CONTENT
        ===================================================== */

        if (contentResponse.ok) {
          const contentType =
            contentResponse.headers.get(
              "content-type"
            ) || "";

          if (
            contentType.includes(
              "application/json"
            )
          ) {
            backendContent =
              await contentResponse.json();
          }
        }

        /* =====================================================
           SERVICE ITEMS
        ===================================================== */

        if (servicesResponse.ok) {
          const data =
            await servicesResponse.json();

          backendServices =
            Array.isArray(data)
              ? data
              : [];
        }

        /* =====================================================
           VALUE ITEMS
        ===================================================== */

        if (valuesResponse.ok) {
          const data =
            await valuesResponse.json();

          backendValues =
            Array.isArray(data)
              ? data
              : [];
        }

        /* =====================================================
           ADVANTAGES
        ===================================================== */

        if (advantagesResponse.ok) {
          const data =
            await advantagesResponse.json();

          backendAdvantages =
            Array.isArray(data)
              ? data
              : [];
        }

        if (cancelled) {
          return;
        }

        /* =====================================================
           CONTENT
        ===================================================== */

        if (
          backendContent &&
          typeof backendContent ===
            "object"
        ) {
          setContent({
            ...DEFAULT_CONTENT,
            ...backendContent,
          });
        } else {
          setContent(
            DEFAULT_CONTENT
          );
        }

        /* =====================================================
           SERVICES

           Once the Admin CMS has saved service records,
           those records are used directly.
        ===================================================== */

        if (
          backendServices.length > 0
        ) {
          setServices(
            normalizeCollection(
              backendServices
            )
          );
        } else {
          setServices(
            DEFAULT_SERVICES
          );
        }

        /* =====================================================
           VALUES
        ===================================================== */

        if (
          backendValues.length > 0
        ) {
          setValues(
            normalizeCollection(
              backendValues
            )
          );
        } else {
          setValues(
            DEFAULT_VALUES
          );
        }

        /* =====================================================
           ADVANTAGES
        ===================================================== */

        if (
          backendAdvantages.length > 0
        ) {
          setAdvantages(
            normalizeCollection(
              backendAdvantages
            )
          );
        } else {
          setAdvantages(
            DEFAULT_ADVANTAGES
          );
        }
      } catch (error) {
        console.error(
          "Failed to load Services page:",
          error
        );

        if (!cancelled) {
          setContent(
            DEFAULT_CONTENT
          );

          setServices(
            DEFAULT_SERVICES
          );

          setValues(
            DEFAULT_VALUES
          );

          setAdvantages(
            DEFAULT_ADVANTAGES
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadServicesPage();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     PAGE VISIBILITY
  ========================================================= */

  if (
    !loading &&
    content.enabled === false
  ) {
    return null;
  }

  /* =========================================================
     VISIBLE CONTENT
  ========================================================= */

  const visibleServices =
    services.filter(
      (service) =>
        service &&
        service.enabled !== false
    );

  const visibleValues =
    values.filter(
      (item) =>
        item &&
        item.enabled !== false
    );

  const visibleAdvantages =
    advantages.filter(
      (item) =>
        item &&
        item.enabled !== false
    );

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ed] text-[#070b1c]">

      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <section
        className="
          relative overflow-hidden
          border-b border-[#e5dbc3]
          bg-[#f8f5ed]
          px-5
          pb-20
          pt-24
          sm:px-6
          sm:pb-24
          sm:pt-28
          lg:px-8
          lg:pb-28
          lg:pt-32
          xl:pb-32
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            -top-40
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#c9a03b]/10
            blur-3xl
            sm:h-[450px]
            sm:w-[450px]
            lg:h-[600px]
            lg:w-[600px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-[350px]
            w-[350px]
            rounded-full
            bg-[#c9a03b]/5
            blur-3xl
            sm:h-[450px]
            sm:w-[450px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-8
            top-1/2
            hidden
            h-48
            w-px
            -translate-y-1/2
            bg-gradient-to-b
            from-transparent
            via-[#c9a03b]/50
            to-transparent
            lg:block
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-20
            top-28
            hidden
            h-24
            w-24
            rotate-45
            border
            border-[#c9a03b]/15
            lg:block
          "
        />

        <div className="relative mx-auto max-w-7xl">

          {/* LABEL */}

          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">

            <span
              className="
                h-[3px]
                w-10
                shrink-0
                bg-[#c9a03b]
                sm:w-16
                lg:w-24
              "
            />

            <p
              className="
                text-[clamp(2rem,6vw,4.8rem)]
                font-black
                uppercase
                leading-[0.9]
                tracking-[0.08em]
                text-[#b28a20]
                sm:tracking-[0.1em]
                lg:tracking-[0.12em]
              "
            >
              {content.heroLabel}
            </p>

          </div>

          {/* HERO HEADING */}

          <h1
            className="
              mt-7
              max-w-5xl
              text-[clamp(2.35rem,5vw,4.8rem)]
              font-black
              leading-[1.02]
              tracking-[-0.04em]
              text-[#070b1c]
              sm:mt-9
              lg:mt-11
            "
          >
            {content.heroHeading}

            <span className="block text-[#a9925e]">
              {content.heroHeadingHighlight}
            </span>
          </h1>

          {/* DESCRIPTION */}

          <div
            className="
              mt-8
              flex
              max-w-3xl
              items-stretch
              gap-4
              sm:mt-10
              sm:gap-5
              lg:mt-12
            "
          >

            <span className="w-[3px] shrink-0 bg-[#c9a03b]" />

            <p
              className="
                text-sm
                leading-7
                text-[#36506e]
                sm:text-base
                sm:leading-8
                lg:text-lg
                lg:leading-9
              "
            >
              {content.heroDescription}
            </p>

          </div>

          {/* HERO ACCENT */}

          <div className="mt-10 flex items-center gap-2 sm:mt-12">

            <span className="h-1 w-12 rounded-full bg-[#c9a03b] sm:w-16" />
            <span className="h-1 w-2 rounded-full bg-[#c9a03b]/40" />
            <span className="h-1 w-2 rounded-full bg-[#c9a03b]/20" />

          </div>

        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-white
          px-5
          py-20
          sm:px-6
          sm:py-24
          lg:px-8
          lg:py-32
        "
      >

        {/* BACKGROUND NUMBER */}

        <span
          className="
            pointer-events-none
            absolute
            -right-5
            top-0
            hidden
            select-none
            text-[16rem]
            font-black
            leading-none
            text-[#c9a03b]/[0.035]
            lg:block
          "
        >
          01
        </span>

        <div className="relative mx-auto max-w-7xl">

          {/* SECTION TOP */}

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-4">

                <span className="h-[3px] w-12 bg-[#c9a03b] sm:w-16" />

                <p
                  className="
                    text-sm
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-[#b28a20]
                    sm:text-base
                  "
                >
                  {content.whatWeDoLabel}
                </p>

              </div>

              <h2
                className="
                  mt-6
                  max-w-xl
                  text-[clamp(2.2rem,4vw,4rem)]
                  font-black
                  leading-[1.03]
                  tracking-[-0.04em]
                  text-[#070b1c]
                "
              >
                {content.whatWeDoHeading}

                <span className="block text-[#a9925e]">
                  {content.whatWeDoHeadingHighlight}
                </span>
              </h2>

            </div>

            {/* RIGHT */}

            <div>

              <div
                className="
                  rounded-[1.5rem]
                  border
                  border-[#e6ddca]
                  bg-[#f8f5ed]
                  p-6
                  sm:p-8
                  lg:p-10
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a03b] text-[#070b1c]">
                    <Sparkles size={17} />
                  </span>

                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#92751c]">
                    {content.whatWeDoCardLabel}
                  </span>

                </div>

                <p
                  className="
                    text-base
                    leading-8
                    text-[#36506e]
                    sm:text-lg
                    sm:leading-9
                  "
                >
                  {content.whatWeDoCardDescription}
                </p>

                <p
                  className="
                    mt-5
                    text-sm
                    leading-7
                    text-[#64748b]
                    sm:text-base
                  "
                >
                  {content.whatWeDoSecondaryDescription}
                </p>

              </div>

            </div>

          </div>

          {/* VALUE STRIP */}

          {visibleValues.length > 0 && (
            <div
              className="
                mt-12
                grid
                overflow-hidden
                rounded-[1.5rem]
                border
                border-[#e4dac4]
                sm:grid-cols-3
              "
            >

              {visibleValues.map(
                (item, index) => (
                  <WhatWeDoItem
                    key={
                      item.id ??
                      `${item.number}-${index}`
                    }
                    number={
                      item.number ||
                      String(index + 1).padStart(
                        2,
                        "0"
                      )
                    }
                    title={
                      item.title || ""
                    }
                    text={
                      item.text || ""
                    }
                  />
                )
              )}

            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          OUR EXPERTISE
      ===================================================== */}

      {visibleServices.length > 0 && (
        <section
          className="
            border-y
            border-[#e5dbc3]
            bg-[#f8f5ed]
            px-5
            py-20
            sm:px-6
            sm:py-28
            lg:px-8
            lg:py-32
          "
        >

          <div className="mx-auto max-w-7xl">

            {/* HEADER */}

            <div
              className="
                mb-12
                flex
                flex-col
                gap-8
                sm:mb-14
                lg:mb-16
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-[3px] w-12 bg-[#c9a03b] sm:w-16" />

                  <p
                    className="
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.3em]
                      text-[#b28a20]
                      sm:text-base
                    "
                  >
                    {content.expertiseLabel}
                  </p>

                </div>

                <h2
                  className="
                    mt-6
                    max-w-3xl
                    text-[clamp(2.2rem,4vw,4rem)]
                    font-black
                    leading-[1.04]
                    tracking-[-0.04em]
                    text-[#070b1c]
                  "
                >
                  {content.expertiseHeading}

                  <span className="block text-[#a9925e]">
                    {content.expertiseHeadingHighlight}
                  </span>
                </h2>

              </div>

              <p
                className="
                  max-w-md
                  text-sm
                  leading-7
                  text-[#64748b]
                  sm:text-base
                  sm:leading-8
                "
              >
                {content.expertiseDescription}
              </p>

            </div>

            {/* SERVICE GRID */}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {visibleServices.map(
                (service, index) => (

                  <article
                    key={
                      service.id ??
                      `${service.title}-${index}`
                    }
                    className="
                      group
                      relative
                      flex
                      h-full
                      flex-col
                      overflow-hidden
                      rounded-[1.5rem]
                      border
                      border-[#dfd5bf]
                      bg-white
                      p-6
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-[#c9a03b]
                      hover:shadow-[0_25px_60px_rgba(7,11,28,0.10)]
                      sm:p-7
                      lg:p-8
                    "
                  >

                    {/* GOLD TOP LINE */}

                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        h-1
                        w-16
                        rounded-br-full
                        bg-[#c9a03b]
                        transition-all
                        duration-500
                        group-hover:w-32
                      "
                    />

                    {/* LARGE BACKGROUND NUMBER */}

                    <span
                      className="
                        pointer-events-none
                        absolute
                        -right-3
                        -top-5
                        select-none
                        text-[7rem]
                        font-black
                        leading-none
                        text-[#c9a03b]/[0.055]
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    {/* ICON + SERVICE TITLE */}

                    <div
                      className="
                        relative
                        flex
                        min-h-[72px]
                        items-center
                        gap-4
                        pr-8
                        sm:gap-5
                      "
                    >

                      {/* ICON */}

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-[#c9a03b]
                          bg-[#f8f5ed]
                          text-[#b28a20]
                          transition-all
                          duration-500
                          group-hover:rotate-3
                          group-hover:bg-[#c9a03b]
                          group-hover:text-white
                          sm:h-16
                          sm:w-16
                        "
                      >
                        <ServiceIcon
                          name={service.icon}
                          size={26}
                        />
                      </div>

                      {/* SERVICE TITLE */}

                      <h3
                        className="
                          min-w-0
                          text-lg
                          font-black
                          leading-[1.15]
                          tracking-[-0.02em]
                          text-[#070b1c]
                          sm:text-xl
                          lg:text-2xl
                        "
                      >
                        {service.title}
                      </h3>

                    </div>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        relative
                        mt-6
                        text-sm
                        leading-7
                        text-[#64748b]
                        sm:text-base
                      "
                    >
                      {service.description}
                    </p>

                    {/* FEATURES */}

                    {Array.isArray(
                      service.points
                    ) &&
                      service.points.filter(
                        (point) =>
                          String(
                            point ?? ""
                          ).trim() !== ""
                      ).length > 0 && (
                        <div
                          className="
                            mt-7
                            space-y-3
                            border-t
                            border-[#e7dfcf]
                            pt-6
                          "
                        >

                          {service.points
                            .filter(
                              (point) =>
                                String(
                                  point ?? ""
                                ).trim() !== ""
                            )
                            .map(
                              (
                                point,
                                pointIndex
                              ) => (

                                <div
                                  key={
                                    `${service.id ?? index}-point-${pointIndex}`
                                  }
                                  className="
                                    flex
                                    items-start
                                    gap-3
                                  "
                                >

                                  <CheckCircle2
                                    size={17}
                                    className="
                                      mt-0.5
                                      shrink-0
                                      text-[#c9a03b]
                                    "
                                  />

                                  <span
                                    className="
                                      text-sm
                                      leading-6
                                      text-[#5f6f7f]
                                    "
                                  >
                                    {point}
                                  </span>

                                </div>

                              )
                            )}

                        </div>
                      )}

                  </article>

                )
              )}

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      {visibleAdvantages.length > 0 && (
        <section
          className="
            relative
            overflow-hidden
            bg-[#070b1c]
            px-5
            py-20
            sm:px-6
            sm:py-28
            lg:px-8
            lg:py-32
          "
        >

          {/* DECORATION */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-96
              w-96
              rounded-full
              bg-[#c9a03b]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-40
              h-96
              w-96
              rounded-full
              bg-[#c9a03b]/5
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-7xl">

            {/* TOP CONTENT */}

            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

              {/* LEFT */}

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-[3px] w-12 bg-[#c9a03b] sm:w-16" />

                  <p
                    className="
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.3em]
                      text-[#d7b44d]
                      sm:text-base
                    "
                  >
                    {content.whyChooseLabel}
                  </p>

                </div>

                <h2
                  className="
                    mt-6
                    text-[clamp(2.2rem,4vw,4rem)]
                    font-black
                    leading-[1.04]
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  {content.whyChooseHeading}

                  <span className="block text-[#d7b44d]">
                    {content.whyChooseHeadingHighlight}
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    max-w-md
                    text-sm
                    leading-7
                    text-slate-300
                    sm:text-base
                    sm:leading-8
                  "
                >
                  {content.whyChooseDescription}
                </p>

                {/* MINI LINE */}

                <div className="mt-8 flex items-center gap-2">

                  <span className="h-1 w-14 rounded-full bg-[#c9a03b]" />
                  <span className="h-1 w-2 rounded-full bg-[#c9a03b]/50" />
                  <span className="h-1 w-2 rounded-full bg-[#c9a03b]/25" />

                </div>

              </div>

              {/* RIGHT CARDS */}

              <div className="grid gap-4 sm:grid-cols-2">

                {visibleAdvantages.map(
                  (item, index) => (

                    <WhyChooseCard
                      key={
                        item.id ??
                        `${item.number}-${index}`
                      }
                      number={
                        item.number ||
                        String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )
                      }
                      icon={item.icon}
                      title={
                        item.title || ""
                      }
                      text={
                        item.text || ""
                      }
                    />

                  )
                )}

              </div>

            </div>

          </div>
        </section>
      )}

      {/* =====================================================
          CTA
      ===================================================== */}

      {content.ctaEnabled !== false && (
        <section
          className="
            relative
            overflow-hidden
            border-t
            border-[#2d5146]
            bg-[#f8f5ed]
            px-5
            py-16
            sm:px-6
            sm:py-20
            lg:px-8
            lg:py-24
          "
        >

          {/* DECORATION */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#c9a03b]/10
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-7xl">

            <div
              className="
                flex
                flex-col
                gap-8
                rounded-[2rem]
                border
                border-[#dfd5bf]
                bg-[#070b1c]
                p-7
                sm:p-10
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:p-12
              "
            >

              {/* CONTENT */}

              <div>

                <div className="flex items-center gap-3">

                  <Sparkles
                    size={16}
                    className="text-[#d7b44d]"
                  />

                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.28em]
                      text-[#d7b44d]
                      sm:text-sm
                    "
                  >
                    {content.ctaLabel}
                  </p>

                </div>

                <h2
                  className="
                    mt-4
                    text-3xl
                    font-black
                    leading-tight
                    text-white
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {content.ctaHeading}

                  <span className="block text-[#d7b44d]">
                    {content.ctaHeadingHighlight}
                  </span>
                </h2>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-7
                    text-slate-300
                    sm:text-base
                  "
                >
                  {content.ctaDescription}
                </p>

              </div>

              {/* BUTTON */}

              <a
                href={
                  content.ctaButtonLink ||
                  "/contact"
                }
                className="
                  group
                  inline-flex
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[#c9a03b]
                  bg-[#c9a03b]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-[#070b1c]
                  no-underline
                  shadow-[0_12px_30px_rgba(201,160,59,0.20)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#d7b44d]
                  sm:w-fit
                  sm:px-7
                "
              >
                {content.ctaButtonText ||
                  "Discuss Your Project"}

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#070b1c]
                    text-white
                    transition-all
                    duration-300
                    group-hover:rotate-45
                    group-hover:bg-white
                    group-hover:text-[#070b1c]
                  "
                >
                  <ArrowUpRight size={17} />
                </span>

              </a>

            </div>

          </div>
        </section>
      )}

    </main>
  );
}

/* =========================================================
   WHAT WE DO ITEM
========================================================= */

function WhatWeDoItem({
  number,
  title,
  text,
}) {
  return (
    <div
      className="
        group
        relative
        border-b
        border-[#e4dac4]
        bg-[#f8f5ed]
        p-6
        transition-all
        duration-300
        hover:bg-white
        sm:border-b-0
        sm:border-r
        sm:last:border-r-0
        sm:p-7
        lg:p-8
      "
    >

      <div className="flex items-start justify-between">

        <span
          className="
            text-xs
            font-black
            tracking-[0.2em]
            text-[#b28a20]
          "
        >
          {number}
        </span>

        <ArrowUpRight
          size={18}
          className="
            text-[#b28a20]
            transition-transform
            duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />

      </div>

      <h3 className="mt-6 text-xl font-black text-[#070b1c]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#64748b]">
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   WHY CHOOSE US CARD
========================================================= */

function WhyChooseCard({
  number,
  icon,
  title,
  text,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[1.5rem]
        border
        border-white/10
        bg-white/[0.045]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#c9a03b]/60
        hover:bg-white/[0.08]
        sm:p-7
      "
    >

      {/* BACKGROUND NUMBER */}

      <span
        className="
          pointer-events-none
          absolute
          -right-2
          -top-5
          text-7xl
          font-black
          leading-none
          text-[#d7b44d]/[0.06]
          transition-transform
          duration-500
          group-hover:scale-110
        "
      >
        {number}
      </span>

      {/* ICON + NUMBER */}

      <div className="relative flex items-center justify-between">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-[#c9a03b]/50
            bg-[#c9a03b]/10
            text-[#d7b44d]
            transition-all
            duration-300
            group-hover:bg-[#c9a03b]
            group-hover:text-[#070b1c]
          "
        >
          <ServiceIcon
            name={icon}
            size={21}
          />
        </div>

        <span
          className="
            text-xs
            font-black
            tracking-[0.2em]
            text-[#d7b44d]
          "
        >
          {number}
        </span>

      </div>

      {/* TITLE */}

      <h3
        className="
          relative
          mt-6
          text-xl
          font-black
          leading-tight
          text-white
        "
      >
        {title}
      </h3>

      {/* TEXT */}

      <p
        className="
          relative
          mt-3
          text-sm
          leading-7
          text-slate-400
          sm:text-base
        "
      >
        {text}
      </p>

      {/* BOTTOM LINE */}

      <div className="relative mt-6 flex items-center gap-2">

        <span
          className="
            h-1
            w-8
            rounded-full
            bg-[#c9a03b]
            transition-all
            duration-500
            group-hover:w-14
          "
        />

        <span className="h-1 w-2 rounded-full bg-[#c9a03b]/30" />

        <span className="h-1 w-2 rounded-full bg-[#c9a03b]/15" />

      </div>

    </div>
  );
}

export default ServicesPage;