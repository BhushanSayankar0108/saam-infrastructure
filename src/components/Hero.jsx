import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=90",
    label: "Built with Purpose",
    title: "Engineering Excellence",
    description:
      "Creating spaces that stand strong for generations.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=90",
    label: "Construction Excellence",
    title: "Building the Future",
    description:
      "Reliable construction solutions designed for lasting performance.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=90",
    label: "Infrastructure",
    title: "Strong Foundations",
    description:
      "Infrastructure delivered with precision, safety and responsibility.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2000&q=90",
    label: "Project Execution",
    title: "Quality That Lasts",
    description:
      "From planning to completion, every detail matters.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ================= AUTO CAROUSEL ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= NEXT ================= */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /* ================= PREVIOUS ================= */
  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-950 pt-20"
    >
      {/* ===================================================== */}
      {/* FULL HERO CAROUSEL BACKGROUND */}
      {/* ===================================================== */}

      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* ===================================================== */}
      {/* LIGHT DARK OVERLAY */}
      {/* ===================================================== */}

      <div className="absolute inset-0 bg-slate-950/40" />

      {/* ===================================================== */}
      {/* LEFT GRADIENT - KEEPS TEXT READABLE */}
      {/* ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />

      {/* ===================================================== */}
      {/* BOTTOM GRADIENT */}
      {/* ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />

      {/* ===================================================== */}
      {/* HERO CONTENT */}
      {/* ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 pb-20 pt-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-16">

        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-orange-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 sm:text-sm">
                Construction & Infrastructure
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Building the{" "}
              <span className="text-orange-500">Future.</span>
            </h1>

            {/* Secondary Heading */}
            <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-white drop-shadow-lg sm:text-3xl lg:text-5xl">
              One Strong Foundation at a Time.
            </h2>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-100 drop-shadow-md sm:text-lg">
              Saam Infrastructure delivers dependable construction and
              infrastructure solutions with a focus on quality, precision,
              safety and long-term value.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              {/* Projects */}
              <a
                href="/projects"
                className="group flex w-full items-center justify-center gap-3 bg-orange-500 px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-600 sm:w-fit"
              >
                Explore Projects

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              {/* Contact */}
              <a
                href="/contact"
                className="group flex w-full items-center justify-center gap-3 border border-white/50 bg-slate-950/30 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-500/20 sm:w-fit"
              >
                Get a Quote

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/30 pt-7 sm:mt-14">

              <div>
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  15+
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-200 sm:text-xs">
                  Projects
                </div>
              </div>

              <div className="border-l border-white/30 pl-4 sm:pl-5">
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  10+
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-200 sm:text-xs">
                  Years Experience
                </div>
              </div>

              <div className="border-l border-white/30 pl-4 sm:pl-5">
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  100%
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-200 sm:text-xs">
                  Commitment
                </div>
              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SLIDE INFORMATION */}
          {/* ================================================= */}

          <div className="hidden justify-end lg:flex">

            <div className="relative w-full max-w-md">

              {/* Decorative Border */}
              <div className="absolute -right-4 -top-4 h-full w-full border border-orange-500/50" />

              {/* Information Card */}
              <div className="relative border border-white/30 bg-slate-950/30 p-8 backdrop-blur-md">

                {/* Slide Number */}
                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold tracking-[0.2em] text-orange-400">
                    PROJECT {String(currentSlide + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-white/70">
                    0{slides.length}
                  </span>
                </div>

                <div className="mt-8 h-px bg-white/20" />

                {/* Label */}
                <div className="mt-8 flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-orange-500" />

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                    {slide.label}
                  </span>

                </div>

                {/* Title */}
                <h3 className="mt-4 text-3xl font-bold leading-tight text-white">
                  {slide.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  {slide.description}
                </p>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-between">

                  <div className="flex gap-2">
                    {slides.map((item, index) => (
                      <button
                        key={item.image}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-1.5 transition-all duration-300 ${
                          currentSlide === index
                            ? "w-10 bg-orange-500"
                            : "w-5 bg-white/40 hover:bg-orange-400"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={previousSlide}
                      aria-label="Previous slide"
                      className="flex h-10 w-10 items-center justify-center border border-white/40 bg-slate-950/40 text-white backdrop-blur-sm transition hover:border-orange-500 hover:bg-orange-500"
                    >
                      <ChevronLeft size={19} />
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next slide"
                      className="flex h-10 w-10 items-center justify-center border border-white/40 bg-slate-950/40 text-white backdrop-blur-sm transition hover:border-orange-500 hover:bg-orange-500"
                    >
                      <ChevronRight size={19} />
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* MOBILE CONTROLS */}
      {/* ===================================================== */}

      <div className="absolute bottom-20 right-6 z-20 flex gap-2 lg:hidden">

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center border border-white/40 bg-slate-950/50 text-white backdrop-blur-sm transition hover:border-orange-500 hover:bg-orange-500"
        >
          <ChevronLeft size={19} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center border border-white/40 bg-slate-950/50 text-white backdrop-blur-sm transition hover:border-orange-500 hover:bg-orange-500"
        >
          <ChevronRight size={19} />
        </button>

      </div>

      {/* ===================================================== */}
      {/* MOBILE DOTS */}
      {/* ===================================================== */}

      <div className="absolute bottom-7 left-6 z-20 flex gap-2 lg:hidden">

        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 transition-all duration-300 ${
              currentSlide === index
                ? "w-10 bg-orange-500"
                : "w-5 bg-white/50 hover:bg-orange-400"
            }`}
          />
        ))}

      </div>

      {/* ===================================================== */}
      {/* SCROLL INDICATOR */}
      {/* ===================================================== */}

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/80 transition-colors hover:text-orange-400 md:flex"
      >
        Scroll to explore
        <ArrowDownRight size={16} />
      </a>
    </section>
  );
}

export default Hero;