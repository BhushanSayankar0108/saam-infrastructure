import { useEffect, useState } from "react";
import {
  Building2,
  CalendarDays,
  Users,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const API_BASE_URL = "http://localhost:8080/api";
const STATISTICS_API = `${API_BASE_URL}/statistics/enabled`;
const HOME_CONTENT_API = `${API_BASE_URL}/home-content`;

const DEFAULT_STATISTICS_CONTENT = {
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
};

const ICONS = [
  Building2,
  CalendarDays,
  ShieldCheck,
  Users,
];

/* =========================================================
   LOCAL STORAGE FALLBACK
========================================================= */

function getLocalStatisticsContent() {
  try {
    const saved = localStorage.getItem("saamHomeContent");

    if (!saved) {
      return DEFAULT_STATISTICS_CONTENT;
    }

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return DEFAULT_STATISTICS_CONTENT;
    }

    const statistics = Array.isArray(parsed.statistics)
      ? parsed.statistics.map((stat, index) => ({
          id: stat?.id ?? index + 1,
          value: stat?.value ?? "",
          label: stat?.label ?? "",
          description: stat?.description ?? "",
          enabled: stat?.enabled !== false,
        }))
      : DEFAULT_STATISTICS_CONTENT.statistics;

    return {
      ...DEFAULT_STATISTICS_CONTENT,
      ...parsed,
      statistics,
    };
  } catch {
    return DEFAULT_STATISTICS_CONTENT;
  }
}

/* =========================================================
   NORMALIZE BACKEND STATISTICS
========================================================= */

function normalizeStatistics(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter(Boolean)
    .map((stat, index) => ({
      id: stat?.id ?? index + 1,
      value: stat?.value ?? "",
      label: stat?.label ?? "",
      description: stat?.description ?? "",
      enabled: stat?.enabled !== false,
    }))
    .filter((stat) => stat.enabled !== false);
}

/* =========================================================
   COMPONENT
========================================================= */

function Statistics() {
  const [content, setContent] = useState(
    getLocalStatisticsContent
  );

  const [loading, setLoading] = useState(true);

  /* =======================================================
     LOAD FROM BACKEND
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadStatistics = async () => {
      const localContent = getLocalStatisticsContent();

      let finalContent = {
        ...localContent,
      };

      /* ---------------------------------------------------
         LOAD HOME SECTION SETTINGS
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

              statisticsEnabled:
                homeData.statisticsEnabled ??
                finalContent.statisticsEnabled,

              statisticsLabel:
                homeData.statisticsLabel ??
                finalContent.statisticsLabel,

              statisticsHeading:
                homeData.statisticsHeading ??
                finalContent.statisticsHeading,

              statisticsDescription:
                homeData.statisticsDescription ??
                finalContent.statisticsDescription,
            };
          }
        }
      } catch {
        // Keep local fallback.
      }

      /* ---------------------------------------------------
         LOAD STATISTICS FROM DATABASE
      --------------------------------------------------- */

      try {
        const response = await fetch(STATISTICS_API, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Statistics API returned ${response.status}`
          );
        }

        const backendStatistics = await response.json();

        if (Array.isArray(backendStatistics)) {
          /*
           * IMPORTANT:
           * Backend is the source of truth.
           *
           * If there are enabled records,
           * show those records.
           */
          finalContent = {
            ...finalContent,
            statistics: normalizeStatistics(
              backendStatistics
            ),
          };
        }
      } catch {
        /*
         * Backend unavailable.
         * Use localStorage fallback.
         */
        finalContent = {
          ...finalContent,
          statistics: Array.isArray(
            localContent.statistics
          )
            ? localContent.statistics.filter(
                (stat) => stat?.enabled !== false
              )
            : [],
        };
      }

      if (cancelled) {
        return;
      }

      setContent(finalContent);
      setLoading(false);
    };

    loadStatistics();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     LISTEN FOR ADMIN SAVE
  ======================================================= */

  useEffect(() => {
    const reloadFromBackend = async () => {
      try {
        const [
          homeResponse,
          statisticsResponse,
        ] = await Promise.all([
          fetch(HOME_CONTENT_API, {
            headers: {
              Accept: "application/json",
            },
          }),

          fetch(STATISTICS_API, {
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        const localContent =
          getLocalStatisticsContent();

        let updatedContent = {
          ...localContent,
        };

        if (homeResponse.ok) {
          const homeData =
            await homeResponse.json();

          if (
            homeData &&
            typeof homeData === "object"
          ) {
            updatedContent = {
              ...updatedContent,

              statisticsEnabled:
                homeData.statisticsEnabled ??
                updatedContent.statisticsEnabled,

              statisticsLabel:
                homeData.statisticsLabel ??
                updatedContent.statisticsLabel,

              statisticsHeading:
                homeData.statisticsHeading ??
                updatedContent.statisticsHeading,

              statisticsDescription:
                homeData.statisticsDescription ??
                updatedContent.statisticsDescription,
            };
          }
        }

        if (statisticsResponse.ok) {
          const statisticsData =
            await statisticsResponse.json();

          if (Array.isArray(statisticsData)) {
            updatedContent.statistics =
              normalizeStatistics(
                statisticsData
              );
          }
        }

        setContent(updatedContent);
      } catch {
        setContent(getLocalStatisticsContent());
      }
    };

    const reloadFromLocalStorage = () => {
      setContent(getLocalStatisticsContent());
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
        id="statistics"
        className="relative w-full overflow-hidden bg-[#F3F6F4]"
      >
        <div className="mx-auto flex min-h-[280px] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#C9A227] border-t-transparent" />

            <p className="mt-4 text-sm text-[#686961]">
              Loading statistics...
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-[#C9A227]" />
      </section>
    );
  }

  /* =======================================================
     SECTION DISABLED
  ======================================================= */

  if (content.statisticsEnabled === false) {
    return null;
  }

  /* =======================================================
     ENABLED STATISTICS
  ======================================================= */

  const statistics = Array.isArray(
    content.statistics
  )
    ? content.statistics.filter(
        (stat) => stat?.enabled !== false
      )
    : [];

  if (statistics.length === 0) {
    return null;
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <section
      id="statistics"
      className="relative w-full overflow-hidden bg-[#F3F6F4]"
    >
      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none absolute -left-24 top-10 h-48 w-48 rounded-full bg-[#C9A227]/[0.07] blur-3xl sm:-left-32 sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute -right-24 bottom-10 h-56 w-56 rounded-full bg-[#A98216]/[0.06] blur-3xl sm:-right-32 sm:h-96 sm:w-96" />

      {/* ARCHITECTURAL GRID */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(#171815_1px,transparent_1px),linear-gradient(90deg,#171815_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* SECTION HEADING */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <span className="h-px w-6 bg-[#C9A227] sm:w-10 md:w-12" />

            <span className="text-[9px] font-bold uppercase tracking-[0.20em] text-[#A98216] sm:text-xs sm:tracking-[0.28em]">
              {content.statisticsLabel ||
                DEFAULT_STATISTICS_CONTENT.statisticsLabel}
            </span>

            <span className="h-px w-6 bg-[#C9A227] sm:w-10 md:w-12" />
          </div>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#171815] sm:mt-4 sm:text-4xl md:text-5xl">
            {content.statisticsHeading ||
              DEFAULT_STATISTICS_CONTENT.statisticsHeading}
          </h2>

          <p className="mx-auto mt-3 max-w-xl px-2 text-xs leading-6 text-[#686961] sm:mt-4 sm:px-0 sm:text-base sm:leading-7">
            {content.statisticsDescription ||
              DEFAULT_STATISTICS_CONTENT.statisticsDescription}
          </p>
        </div>

        {/* STATISTICS CARDS */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-5">

          {statistics.map((stat, index) => {
            const Icon =
              ICONS[index % ICONS.length];

            const darkCard = index === 3;

            return (
              <article
                key={
                  stat.id ??
                  `${stat.label}-${index}`
                }
                className={`group relative flex min-h-[285px] flex-col overflow-hidden rounded-[22px] border p-5 shadow-[0_8px_25px_rgba(23,24,21,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(15,16,14,0.12)] sm:min-h-[310px] sm:rounded-[26px] sm:p-6 lg:min-h-[340px] lg:rounded-[28px] lg:p-7 ${
                  darkCard
                    ? "border-[#34362F] bg-[#171815] text-white hover:bg-[#20221E]"
                    : index === 0
                    ? "border-[#E6D8AE] bg-[#FFFDF7] text-[#171815] hover:bg-[#FFF8DF]"
                    : index === 1
                    ? "border-[#CBD9D0] bg-[#F1F5F2] text-[#171815] hover:bg-[#E8F0EA]"
                    : "border-[#E3C875] bg-[#FFF2D1] text-[#171815] hover:bg-[#FFE9B0]"
                }`}
              >
                {/* ICON */}

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 sm:h-11 sm:w-11 sm:rounded-2xl lg:h-12 lg:w-12 ${
                      darkCard
                        ? "border-[#C9A227] bg-[#C9A227] text-[#171815]"
                        : index === 0
                        ? "border-[#D7BC68] bg-[#F8F0D8] text-[#A98216]"
                        : index === 1
                        ? "border-[#B8CBBE] bg-white text-[#496451]"
                        : "border-[#C9A227] bg-[#C9A227] text-[#171815]"
                    }`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="sm:h-5 sm:w-5"
                    />
                  </div>

                  <span
                    className={`text-[9px] font-bold tracking-[0.18em] sm:text-[10px] sm:tracking-[0.2em] ${
                      darkCard
                        ? "text-[#C9A227]/60"
                        : "text-[#A98216]/40"
                    }`}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                {/* VALUE */}

                <div className="mt-7 sm:mt-8 lg:mt-9">
                  <div
                    className={`text-5xl font-bold leading-none tracking-[-0.05em] sm:text-6xl ${
                      darkCard
                        ? "text-white"
                        : "text-[#171815]"
                    }`}
                  >
                    {stat.value}
                  </div>
                </div>

                {/* LABEL */}

                <div className="mt-2.5 sm:mt-3">
                  <h3
                    className={`text-[10px] font-bold uppercase leading-5 tracking-[0.13em] sm:text-xs sm:tracking-[0.15em] lg:text-sm lg:tracking-[0.16em] ${
                      darkCard
                        ? "text-[#E0C45C]"
                        : "text-[#A98216]"
                    }`}
                  >
                    {stat.label}
                  </h3>
                </div>

                {/* DESCRIPTION */}

                <p
                  className={`mt-3 max-w-[270px] text-xs leading-5 sm:mt-4 sm:text-sm sm:leading-6 ${
                    darkCard
                      ? "text-slate-300"
                      : "text-[#686961]"
                  }`}
                >
                  {stat.description}
                </p>

                {/* BOTTOM LINE */}

                <div className="mt-auto flex items-end justify-between pt-5 sm:pt-6">

                  <div
                    className={`h-px flex-1 ${
                      darkCard
                        ? "bg-white/15"
                        : "bg-[#D8C27A]/50"
                    }`}
                  />

                  <div
                    className={`ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 sm:ml-4 sm:h-9 sm:w-9 ${
                      darkCard
                        ? "border-white/20 text-[#C9A227]"
                        : "border-[#D8C27A] text-[#A98216]"
                    }`}
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* DECORATIVE CIRCLE */}

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full border border-[#C9A227]/15 transition-all duration-500 group-hover:scale-125 sm:-bottom-12 sm:-right-12 sm:h-28 sm:w-28" />
              </article>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-[#C9A227]" />
    </section>
  );
}

export default Statistics;