import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=90",
    label: "Built with Purpose",
    title: "Engineering Excellence",
    description:
      "Creating spaces that stand strong for generations with precision, quality and thoughtful engineering.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=90",
    label: "Construction Excellence",
    title: "Building the Future",
    description:
      "Reliable construction solutions designed for lasting performance, safety and long-term value.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=90",
    label: "Infrastructure",
    title: "Strong Foundations",
    description:
      "Infrastructure delivered with precision, responsibility and a commitment to creating better spaces.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2200&q=90",
    label: "Project Execution",
    title: "Quality That Lasts",
    description:
      "From planning to completion, every detail matters. We focus on dependable execution and lasting quality.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];

  // ============================================================
  // AUTOMATIC CAROUSEL
  // Changes every 5 seconds
  // ============================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // DOT NAVIGATION
  // ============================================================

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
      {/* ============================================================
          FULL SCREEN BACKGROUND IMAGE CAROUSEL
      ============================================================ */}

      <div className="absolute inset-0 overflow-hidden">
        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            aria-hidden="true"
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
                currentSlide === index
                  ? "scale-105 opacity-100"
                  : "scale-100 opacity-0"
              }
            `}
          />
        ))}
      </div>

      {/* ============================================================
          LIGHT OVERLAY
          
          Reduced darkness so the construction image remains visible.
      ============================================================ */}

      <div
        className="
          absolute
          inset-0
          bg-black/15
        "
      />

      {/* ============================================================
          LEFT TEXT READABILITY
      ============================================================ */}

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

      {/* ============================================================
          BOTTOM READABILITY
      ============================================================ */}

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

      {/* ============================================================
          TOP READABILITY
      ============================================================ */}

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

      {/* ============================================================
          MOBILE LIGHT OVERLAY
          
          Keep image visible on mobile as well.
      ============================================================ */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
          md:hidden
        "
      />

      {/* ============================================================
          GOLD AMBIENT LIGHT
      ============================================================ */}

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

      {/* ============================================================
          MAIN HERO CONTENT
      ============================================================ */}

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
          {/* ========================================================
              DYNAMIC CONTENT
              
              This changes with every slide.
          ======================================================== */}

          <div
            key={currentSlide}
            className="
              max-w-4xl
              animate-[heroContent_0.8s_ease-out]
            "
          >
            {/* ======================================================
                LABEL
            ====================================================== */}

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

            {/* ======================================================
                MAIN HEADING
            ====================================================== */}

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

            {/* ======================================================
                SECONDARY HEADING
            ====================================================== */}

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
              One Strong Foundation at a Time.
            </h2>

            {/* ======================================================
                DESCRIPTION
            ====================================================== */}

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

          {/* ========================================================
              STATIC CTA BUTTONS

              These NEVER change when the carousel changes.
          ======================================================== */}

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
            {/* ======================================================
                EXPLORE PROJECTS
            ====================================================== */}

            <Link
              to="/projects"
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
              <span>Explore Projects</span>

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

            {/* ======================================================
                GET A QUOTE
            ====================================================== */}

            <Link
              to="/contact"
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
              <span>Get a Quote</span>

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

      {/* ============================================================
          LEFT SIDE CAROUSEL DOTS

          ONLY these 4 dots control the carousel.
          No previous/next buttons.
      ============================================================ */}

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
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? "true" : "false"}
            className={`
              rounded-full
              transition-all
              duration-500
              ${
                currentSlide === index
                  ? "h-2 w-9 bg-[#D1A82A] shadow-[0_0_12px_rgba(209,168,42,0.5)] sm:w-10"
                  : "h-2 w-2 bg-white/60 hover:bg-[#F0CC58]"
              }
            `}
          />
        ))}
      </div>

      {/* ============================================================
          SLIDE NUMBER
          
          Kept on the right, but NO slide buttons.
      ============================================================ */}

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
        {String(currentSlide + 1).padStart(2, "0")}
        {" / "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* ============================================================
          DESKTOP SCROLL INDICATOR
      ============================================================ */}

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

      {/* ============================================================
          GOLD BOTTOM LINE
      ============================================================ */}

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

      {/* ============================================================
          CONTENT ANIMATION
      ============================================================ */}

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