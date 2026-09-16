import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   API CONFIGURATION
========================================================= */

const API_BASE_URL = "http://localhost:8080";

/* =========================================================
   DEFAULT HERO CONTENT
========================================================= */

const DEFAULT_HOME_CONTENT = {
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
};

/* =========================================================
   GET IMAGE URL
========================================================= */

function getImageUrl(image, cacheVersion = "") {
  if (!image) {
    return "";
  }

  const trimmedImage = String(image).trim();

  if (!trimmedImage) {
    return "";
  }

  /*
    External images such as Unsplash.
    Do not modify the URL unless cache busting is requested.
  */
  if (
    trimmedImage.startsWith("http://") ||
    trimmedImage.startsWith("https://") ||
    trimmedImage.startsWith("data:")
  ) {
    if (cacheVersion) {
      return `${trimmedImage}${
        trimmedImage.includes("?") ? "&" : "?"
      }v=${cacheVersion}`;
    }

    return trimmedImage;
  }

  /*
    Backend image.

    Example:
    /images/heroes/example.png

    becomes:
    http://localhost:8080/images/heroes/example.png
  */

  let finalUrl = trimmedImage.startsWith("/")
    ? `${API_BASE_URL}${trimmedImage}`
    : `${API_BASE_URL}/${trimmedImage}`;

  /*
    Cache busting.
    This is important when the backend keeps the same
    filename but the actual image file has been replaced.
  */

  if (cacheVersion) {
    finalUrl += `${
      finalUrl.includes("?") ? "&" : "?"
    }v=${cacheVersion}`;
  }

  return finalUrl;
}

/* =========================================================
   GET LOCAL STORAGE CONTENT
========================================================= */

function getHomeContent() {
  try {
    const savedContent = localStorage.getItem(
      "saamHomeContent"
    );

    if (!savedContent) {
      return DEFAULT_HOME_CONTENT;
    }

    const parsedContent = JSON.parse(savedContent);

    return {
      ...DEFAULT_HOME_CONTENT,
      ...parsedContent,

      slides:
        Array.isArray(parsedContent.slides) &&
        parsedContent.slides.length > 0
          ? parsedContent.slides
          : DEFAULT_HOME_CONTENT.slides,
    };
  } catch (error) {
    console.error(
      "Failed to load Hero content from localStorage:",
      error
    );

    return DEFAULT_HOME_CONTENT;
  }
}

/* =========================================================
   CREATE CONTENT SIGNATURE

   Used to detect whether backend content has actually changed.
========================================================= */

function createContentSignature(content) {
  try {
    return JSON.stringify({
      heroEnabled: content?.heroEnabled,

      heroSecondaryHeading:
        content?.heroSecondaryHeading,

      exploreButtonText:
        content?.exploreButtonText,

      exploreButtonLink:
        content?.exploreButtonLink,

      quoteButtonText:
        content?.quoteButtonText,

      quoteButtonLink:
        content?.quoteButtonLink,

      slides: Array.isArray(content?.slides)
        ? content.slides.map((slide) => ({
            id: slide.id,
            image: slide.image,
            label: slide.label,
            title: slide.title,
            description: slide.description,
            enabled: slide.enabled,
          }))
        : [],
    });
  } catch {
    return "";
  }
}

/* =========================================================
   HERO COMPONENT
========================================================= */

function Hero() {
  const [homeContent, setHomeContent] = useState(() =>
    getHomeContent()
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  /*
    IMPORTANT:

    Do NOT use Date.now() directly inside useState.

    Start with 0 and update it only after backend data
    has successfully loaded.
  */

  const [imageCacheVersion, setImageCacheVersion] =
    useState(0);

  /*
    Used to determine whether backend content has changed.
  */

  const [contentSignature, setContentSignature] =
    useState(() =>
      createContentSignature(getHomeContent())
    );

  /* =========================================================
     LOAD BACKEND CONTENT
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadContent = async () => {
      try {
        console.log(
          "========================================"
        );

        console.log(
          "Loading latest Hero content from backend..."
        );

        console.log(
          "========================================"
        );

        const [homeResponse, heroSlidesResponse] =
          await Promise.all([
            fetch(
              `${API_BASE_URL}/api/home-content?_=${Date.now()}`,
              {
                method: "GET",
                cache: "no-store",
                headers: {
                  Accept: "application/json",
                  "Cache-Control": "no-cache",
                  Pragma: "no-cache",
                },
              }
            ),

            fetch(
              `${API_BASE_URL}/api/home-content/hero-slides/enabled?_=${Date.now()}`,
              {
                method: "GET",
                cache: "no-store",
                headers: {
                  Accept: "application/json",
                  "Cache-Control": "no-cache",
                  Pragma: "no-cache",
                },
              }
            ),
          ]);

        if (!homeResponse.ok) {
          throw new Error(
            `Home content request failed: ${homeResponse.status}`
          );
        }

        if (!heroSlidesResponse.ok) {
          throw new Error(
            `Hero slides request failed: ${heroSlidesResponse.status}`
          );
        }

        const backendHome =
          await homeResponse.json();

        const backendSlides =
          await heroSlidesResponse.json();

        console.log(
          "Backend Home Content:",
          backendHome
        );

        console.log(
          "Backend Hero Slides:",
          backendSlides
        );

        if (cancelled) {
          return;
        }

        /*
          Merge backend data.
        */

        const mergedContent = {
          ...DEFAULT_HOME_CONTENT,
          ...(backendHome || {}),

          slides:
            Array.isArray(backendSlides) &&
            backendSlides.length > 0
              ? backendSlides
              : getHomeContent().slides,
        };

        console.log(
          "Final Hero Content:",
          mergedContent
        );

        /*
          Determine whether content changed.
        */

        const newSignature =
          createContentSignature(mergedContent);

        /*
          Only update the image cache version when
          backend content has actually changed.

          This prevents unnecessary image reloads.
        */

        if (newSignature !== contentSignature) {
          console.log(
            "Hero content changed. Refreshing images..."
          );

          setImageCacheVersion(
            (previousVersion) =>
              previousVersion + 1
          );

          setContentSignature(newSignature);
        }

        /*
          Update React state.
        */

        setHomeContent(mergedContent);

        /*
          Save backend data locally as cache.
        */

        try {
          localStorage.setItem(
            "saamHomeContent",
            JSON.stringify(mergedContent)
          );
        } catch (storageError) {
          console.warn(
            "Could not save Hero content to localStorage:",
            storageError
          );
        }

        /*
          Make sure current slide remains valid.
        */

        setCurrentSlide((previousSlide) => {
          const slides =
            Array.isArray(mergedContent.slides)
              ? mergedContent.slides.filter(
                  (slide) =>
                    slide.enabled !== false
                )
              : [];

          if (slides.length === 0) {
            return 0;
          }

          if (previousSlide >= slides.length) {
            return 0;
          }

          return previousSlide;
        });
      } catch (error) {
        console.error(
          "Failed to load Hero content from backend:",
          error
        );
      }
    };

    /*
      Initial backend load.
    */

    loadContent();

    /*
      Refresh when browser tab becomes visible again.

      Example:
      User changes image in admin tab,
      then returns to website tab.
    */

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible"
      ) {
        loadContent();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /*
      Refresh when website window gets focus.
    */

    const handleWindowFocus = () => {
      loadContent();
    };

    window.addEventListener(
      "focus",
      handleWindowFocus
    );

    /*
      Listen for localStorage changes from another tab.
    */

    const handleStorageChange = (event) => {
      if (
        event.key === "saamHomeContent" ||
        event.key === null
      ) {
        loadContent();
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    /*
      Listen for custom event from AdminHome.

      This is useful when admin and website are open
      inside the same browser tab/application.
    */

    const handleCMSUpdate = () => {
      console.log(
        "CMS update event received. Reloading Hero..."
      );

      loadContent();
    };

    window.addEventListener(
      "saamHomeContentUpdated",
      handleCMSUpdate
    );

    /*
      Cleanup.
    */

    return () => {
      cancelled = true;

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "focus",
        handleWindowFocus
      );

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      window.removeEventListener(
        "saamHomeContentUpdated",
        handleCMSUpdate
      );
    };
  }, [contentSignature]);

  /* =========================================================
     BACKEND AUTO REFRESH

     Checks the backend every 10 seconds.

     This means the public website can detect a CMS
     update without manually refreshing the page.
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const checkForUpdates = async () => {
      if (cancelled) {
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/home-content/hero-slides/enabled?_=${Date.now()}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const backendSlides =
          await response.json();

        if (
          !Array.isArray(backendSlides) ||
          backendSlides.length === 0
        ) {
          return;
        }

        if (cancelled) {
          return;
        }

        /*
          Compare only slide data.
        */

        setHomeContent((previousContent) => {
          const oldSlidesSignature =
            JSON.stringify(
              Array.isArray(previousContent.slides)
                ? previousContent.slides.map(
                    (slide) => ({
                      id: slide.id,
                      image: slide.image,
                      label: slide.label,
                      title: slide.title,
                      description:
                        slide.description,
                      enabled:
                        slide.enabled,
                    })
                  )
                : []
            );

          const newSlidesSignature =
            JSON.stringify(
              backendSlides.map((slide) => ({
                id: slide.id,
                image: slide.image,
                label: slide.label,
                title: slide.title,
                description:
                  slide.description,
                enabled: slide.enabled,
              }))
            );

          if (
            oldSlidesSignature !==
            newSlidesSignature
          ) {
            console.log(
              "Hero slides changed. Updating website..."
            );

            /*
              Force browser to request new image.
            */

            setImageCacheVersion(
              (previousVersion) =>
                previousVersion + 1
            );

            const updatedContent = {
              ...previousContent,
              slides: backendSlides,
            };

            try {
              localStorage.setItem(
                "saamHomeContent",
                JSON.stringify(updatedContent)
              );
            } catch {
              // Ignore localStorage errors.
            }

            return updatedContent;
          }

          return previousContent;
        });
      } catch (error) {
        console.warn(
          "Hero auto-refresh failed:",
          error
        );
      }
    };

    /*
      Check every 10 seconds.
    */

    const interval = setInterval(
      checkForUpdates,
      10000
    );

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  /* =========================================================
     GET ENABLED SLIDES
  ========================================================= */

  const enabledSlides =
    Array.isArray(homeContent.slides)
      ? homeContent.slides.filter(
          (slide) =>
            slide.enabled !== false
        )
      : [];

  /* =========================================================
     SAFE CURRENT SLIDE
  ========================================================= */

  const safeCurrentSlide =
    enabledSlides.length === 0
      ? 0
      : currentSlide >=
        enabledSlides.length
        ? 0
        : currentSlide;

  /* =========================================================
     AUTOMATIC CAROUSEL
  ========================================================= */

  useEffect(() => {
    if (enabledSlides.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentSlide(
        (previousSlide) =>
          (previousSlide + 1) %
          enabledSlides.length
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [enabledSlides.length]);

  /* =========================================================
     HERO ENABLE / DISABLE
  ========================================================= */

  if (!homeContent.heroEnabled) {
    return null;
  }

  /* =========================================================
     NO ACTIVE SLIDES
  ========================================================= */

  if (enabledSlides.length === 0) {
    return (
      <section
        id="home"
        className="
          relative
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          bg-[#171815]
          pt-[86px]
          text-white
        "
      >
        <p className="text-lg text-white/70">
          No active Hero slides available.
        </p>
      </section>
    );
  }

  /* =========================================================
     CURRENT SLIDE
  ========================================================= */

  const slide =
    enabledSlides[safeCurrentSlide];

  /* =========================================================
     CURRENT IMAGE URL
  ========================================================= */

  const currentImageUrl = getImageUrl(
    slide.image,
    imageCacheVersion
  );

  console.log(
    "Current Hero Image:",
    currentImageUrl
  );

  /* =========================================================
     DOT NAVIGATION
  ========================================================= */

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#171815]
        pt-[86px]
      "
    >
      {/* =====================================================
          FULL SCREEN BACKGROUND IMAGE CAROUSEL
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        {enabledSlides.map((item, index) => {
          const imageUrl = getImageUrl(
            item.image,
            imageCacheVersion
          );

          return (
            <img
              key={`${item.id}-${item.image}-${imageCacheVersion}`}
              src={imageUrl}
              alt=""
              aria-hidden="true"
              draggable="false"
              className={`
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
                transition-all
                duration-[1600ms]
                ease-in-out
                ${
                  safeCurrentSlide === index
                    ? "scale-105 opacity-100"
                    : "scale-100 opacity-0"
                }
              `}
              onError={() => {
                console.error(
                  "Hero image failed to load:",
                  imageUrl
                );
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          LIGHT OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/15
        "
      />

      {/* =====================================================
          LEFT TEXT READABILITY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#11120F]/65
          via-[#11120F]/35
          to-transparent
        "
      />

      {/* =====================================================
          BOTTOM READABILITY
      ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[360px]
          bg-gradient-to-t
          from-[#11120F]/70
          via-[#11120F]/25
          to-transparent
        "
      />

      {/* =====================================================
          TOP READABILITY
      ===================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-32
          bg-gradient-to-b
          from-[#11120F]/35
          to-transparent
        "
      />

      {/* =====================================================
          MOBILE LIGHT OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
          md:hidden
        "
      />

      {/* =====================================================
          GOLD AMBIENT LIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[180px]
          -top-[140px]
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#D1A82A]/10
          blur-3xl
          sm:h-[450px]
          sm:w-[450px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-[160px]
          -left-[120px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#D1A82A]/8
          blur-3xl
          sm:h-[400px]
          sm:w-[400px]
        "
      />

      {/* =====================================================
          MAIN HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-86px)]
          max-w-7xl
          items-center
          px-5
          py-16
          sm:px-6
          sm:py-20
          md:px-8
          md:py-20
          lg:px-8
          lg:py-16
        "
      >
        <div className="w-full">

          {/* =================================================
              DYNAMIC CONTENT
          ================================================= */}

          <div
            key={`${slide.id}-${slide.title}-${slide.image}`}
            className="
              max-w-4xl
              animate-[heroContent_0.8s_ease-out]
            "
          >

            {/* =================================================
                LABEL
            ================================================= */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
                sm:mb-7
              "
            >
              <span
                className="
                  h-[2px]
                  w-8
                  shrink-0
                  bg-[#D2A92E]
                  sm:w-12
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#F0CC58]
                  sm:text-xs
                  sm:tracking-[0.28em]
                  md:text-sm
                "
              >
                {slide.label}
              </span>
            </div>

            {/* =================================================
                MAIN HEADING
            ================================================= */}

            <h1
              className="
                max-w-5xl
                text-[46px]
                font-bold
                leading-[0.95]
                tracking-[-0.045em]
                text-white
                drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]
                sm:text-6xl
                md:text-7xl
                lg:text-[78px]
                xl:text-[88px]
              "
            >
              {slide.title}
            </h1>

            {/* =================================================
                SECONDARY HEADING
            ================================================= */}

            <h2
              className="
                mt-5
                max-w-3xl
                text-[24px]
                font-semibold
                leading-[1.12]
                text-white
                drop-shadow-[0_3px_15px_rgba(0,0,0,0.55)]
                sm:mt-6
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
              "
            >
              {homeContent.heroSecondaryHeading}
            </h2>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-white/90
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
                sm:mt-7
                sm:text-base
                sm:leading-8
                md:text-lg
              "
            >
              {slide.description}
            </p>
          </div>

          {/* =================================================
              CTA BUTTONS
          ================================================= */}

          <div
            className="
              mt-8
              flex
              w-full
              flex-col
              gap-3
              sm:mt-9
              sm:flex-row
              sm:gap-4
            "
          >

            {/* =================================================
                EXPLORE PROJECTS
            ================================================= */}

            <Link
              to={
                homeContent.exploreButtonLink ||
                "/projects"
              }
              className="
                group
                inline-flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#D1A82A]
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#171815]
                shadow-[0_10px_30px_rgba(209,168,42,0.30)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#E3C04F]
                hover:shadow-[0_15px_40px_rgba(209,168,42,0.40)]
                sm:w-auto
                sm:px-7
                sm:py-4
              "
            >
              <span>
                {homeContent.exploreButtonText ||
                  "Explore Projects"}
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
                  bg-[#171815]/10
                  transition-all
                  duration-300
                  group-hover:bg-[#171815]/20
                "
              >
                <ArrowUpRight
                  size={17}
                  strokeWidth={2.2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </span>
            </Link>

            {/* =================================================
                GET A QUOTE
            ================================================= */}

            <Link
              to={
                homeContent.quoteButtonLink ||
                "/contact"
              }
              className="
                group
                inline-flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#E0C15B]
                bg-[#F7F4EC]
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#171815]
                shadow-[0_8px_25px_rgba(0,0,0,0.20)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#D1A82A]
                hover:bg-white
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                sm:w-auto
                sm:px-7
                sm:py-4
              "
            >
              <span>
                {homeContent.quoteButtonText ||
                  "Get a Quote"}
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
                  bg-[#D1A82A]/15
                  text-[#171815]
                  transition-all
                  duration-300
                  group-hover:bg-[#D1A82A]
                "
              >
                <ArrowUpRight
                  size={17}
                  strokeWidth={2.2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          LEFT SIDE CAROUSEL DOTS
      ===================================================== */}

      {enabledSlides.length > 1 && (
        <div
          className="
            absolute
            bottom-8
            left-5
            z-30
            flex
            items-center
            gap-2
            sm:left-6
            md:left-8
            lg:left-10
          "
        >
          {enabledSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${
                index + 1
              }`}
              aria-current={
                safeCurrentSlide === index
                  ? "true"
                  : "false"
              }
              className={`
                rounded-full
                transition-all
                duration-500
                ${
                  safeCurrentSlide === index
                    ? "h-2 w-9 bg-[#D1A82A] shadow-[0_0_12px_rgba(209,168,42,0.5)] sm:w-10"
                    : "h-2 w-2 bg-white/60 hover:bg-[#F0CC58]"
                }
              `}
            />
          ))}
        </div>
      )}

      {/* =====================================================
          SLIDE NUMBER
      ===================================================== */}

      {enabledSlides.length > 1 && (
        <div
          className="
            absolute
            bottom-8
            right-5
            z-30
            hidden
            rounded-full
            border
            border-white/25
            bg-black/25
            px-3
            py-2
            text-[10px]
            font-bold
            tracking-[0.2em]
            text-white
            backdrop-blur-md
            sm:block
            md:right-8
            lg:right-10
          "
        >
          {String(
            safeCurrentSlide + 1
          ).padStart(2, "0")}

          {" / "}

          {String(
            enabledSlides.length
          ).padStart(2, "0")}
        </div>
      )}

      {/* =====================================================
          DESKTOP SCROLL INDICATOR
      ===================================================== */}

      <a
        href="#about"
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          items-center
          gap-3
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.25em]
          text-white/80
          transition-colors
          hover:text-[#F0CC58]
          lg:flex
        "
      >
        Scroll to explore
        <ArrowDownRight size={16} />
      </a>

      {/* =====================================================
          GOLD BOTTOM LINE
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-40
          h-[3px]
          bg-[#D1A82A]
        "
      />

      {/* =====================================================
          CONTENT ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes heroContent {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;