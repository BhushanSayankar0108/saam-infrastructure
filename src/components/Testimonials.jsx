import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner",
    project: "Commercial Project",
    review:
      "Saam Infrastructure handled our project with excellent professionalism and attention to detail. The team maintained quality throughout the execution.",
  },
  {
    name: "Amit Patil",
    role: "Property Developer",
    project: "Residential Development",
    review:
      "We were impressed with the planning, communication and quality of work. The project was handled smoothly from start to completion.",
  },
  {
    name: "Sanjay Deshmukh",
    role: "Project Consultant",
    project: "Infrastructure Project",
    review:
      "A dependable team with a strong focus on execution and quality. Their approach gave us confidence throughout the project.",
  },

  // =========================================================
  // ADD MORE TESTIMONIALS HERE IN FUTURE
  // =========================================================

  // {
  //   name: "Client Name",
  //   role: "Client Role",
  //   project: "Project Type",
  //   review:
  //     "Client review goes here.",
  // },
];

function Testimonials() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasCarousel = testimonials.length > 3;

  // =========================================================
  // SCROLL FUNCTION
  // =========================================================

  const scrollTestimonials = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const cardWidth =
      slider.firstElementChild?.getBoundingClientRect().width || 0;

    const gap = 20;

    const scrollAmount = cardWidth + gap;

    if (direction === "next") {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) =>
        prev < testimonials.length - 1 ? prev + 1 : 0
      );
    } else {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) =>
        prev > 0 ? prev - 1 : testimonials.length - 1
      );
    }
  };

  // =========================================================
  // AUTO CAROUSEL
  // ONLY ACTIVE WHEN MORE THAN 3 TESTIMONIALS
  // =========================================================

  useEffect(() => {
    if (!hasCarousel) return;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;

      const cardWidth =
        slider.firstElementChild?.getBoundingClientRect().width || 0;

      const gap = 20;

      const scrollAmount = cardWidth + gap;

      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft + scrollAmount >= maxScroll - 10) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        setCurrentIndex(0);
      } else {
        slider.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });

        setCurrentIndex((prev) =>
          prev < testimonials.length - 1 ? prev + 1 : 0
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [hasCarousel]);

  // =========================================================
  // GO TO SPECIFIC SLIDE
  // =========================================================

  const goToSlide = (index) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const cardWidth =
      slider.firstElementChild?.getBoundingClientRect().width || 0;

    const gap = 20;

    slider.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="bg-stone-50 px-6 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

          {/* LEFT */}

          <div>
            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Client Reviews
              </span>

            </div>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
              Trusted by clients for dependable execution, quality
              workmanship and professional project delivery.
            </p>
          </div>

          {/* RIGHT */}

          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              What our clients
              <br />

              <span className="text-slate-400">
                say about us.
              </span>
            </h2>
          </div>

        </div>

        {/* =====================================================
            DESKTOP CAROUSEL CONTROLS
            ONLY SHOW WHEN MORE THAN 3
        ===================================================== */}

        {hasCarousel && (
          <div className="mt-8 hidden justify-end gap-2 lg:flex">

            <button
              type="button"
              onClick={() => scrollTestimonials("prev")}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollTestimonials("next")}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        )}

        {/* =====================================================
            MOBILE CONTROLS
        ===================================================== */}

        <div className="mt-8 flex justify-end gap-2 lg:hidden">

          <button
            type="button"
            onClick={() => scrollTestimonials("prev")}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => scrollTestimonials("next")}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* =====================================================
            TESTIMONIAL CARDS
        ===================================================== */}

        <div
          ref={sliderRef}
          className={`
            mt-8 flex gap-5 overflow-x-auto pb-4
            snap-x snap-mandatory
            scrollbar-hide
            lg:mt-16
            ${
              hasCarousel
                ? "lg:overflow-x-auto"
                : "lg:grid lg:grid-cols-3 lg:overflow-visible"
            }
          `}
        >

          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className={`
                group relative flex min-h-[360px]
                snap-center
                flex-col border border-slate-200
                bg-white p-7
                transition-all duration-300
                hover:-translate-y-1
                hover:border-orange-400
                hover:shadow-lg
                sm:p-8

                min-w-[88%]
                sm:min-w-[70%]
                md:min-w-[55%]

                ${
                  hasCarousel
                    ? "lg:min-w-[calc((100%-40px)/3)] lg:max-w-[calc((100%-40px)/3)]"
                    : "lg:min-w-0 lg:max-w-none"
                }
              `}
            >

              {/* =================================================
                  TOP
              ================================================= */}

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center bg-slate-950 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">

                  <Quote size={20} />

                </div>

                <span className="text-sm font-bold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>

              {/* =================================================
                  STARS
              ================================================= */}

              <div className="mt-7 flex gap-1">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="fill-orange-500 text-orange-500"
                  />
                ))}

              </div>

              {/* =================================================
                  REVIEW
              ================================================= */}

              <p className="mt-6 flex-1 text-base leading-7 text-slate-600">
                "{testimonial.review}"
              </p>

              {/* =================================================
                  CLIENT
              ================================================= */}

              <div className="mt-8 border-t border-slate-200 pt-5">

                <h3 className="font-bold text-slate-950">
                  {testimonial.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {testimonial.role}
                </p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                  {testimonial.project}
                </p>

              </div>

            </article>
          ))}

        </div>

        {/* =====================================================
            SLIDE INDICATORS
        ===================================================== */}

        {hasCarousel && (
          <div className="mt-5 flex justify-center gap-2">

            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`
                  h-1.5 transition-all duration-300
                  ${
                    currentIndex === index
                      ? "w-10 bg-orange-500"
                      : "w-5 bg-slate-300 hover:bg-orange-400"
                  }
                `}
              />
            ))}

          </div>
        )}

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div className="mt-10 border-t border-slate-200 pt-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <p className="max-w-2xl text-sm leading-7 text-slate-500">
              Every project is an opportunity to build trust through quality,
              communication and dependable execution.
            </p>

            {/* TRUSTED CLIENTS */}

            <div className="flex items-center gap-3">

              <div className="flex -space-x-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-50 bg-slate-950 text-xs font-bold text-white">
                  RS
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-50 bg-orange-500 text-xs font-bold text-white">
                  AP
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-50 bg-slate-700 text-xs font-bold text-white">
                  SD
                </div>

              </div>

              <span className="text-sm font-semibold text-slate-700">
                Trusted Clients
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;