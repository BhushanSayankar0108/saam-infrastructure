import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner",
    project: "Commercial Project",
    initials: "RS",
    review:
      "Saam Infrastructure handled our project with excellent professionalism and attention to detail. The team maintained quality throughout the execution.",
  },
  {
    name: "Amit Patil",
    role: "Property Developer",
    project: "Residential Development",
    initials: "AP",
    review:
      "We were impressed with the planning, communication and quality of work. The project was handled smoothly from start to completion.",
  },
  {
    name: "Sanjay Deshmukh",
    role: "Project Consultant",
    project: "Infrastructure Project",
    initials: "SD",
    review:
      "A dependable team with a strong focus on execution and quality. Their approach gave us confidence throughout the project.",
  },
  {
    name: "Vikram Joshi",
    role: "Business Owner",
    project: "Commercial Construction",
    initials: "VJ",
    review:
      "The team demonstrated excellent coordination and professionalism throughout the project. We were very satisfied with the quality of execution.",
  },
  {
    name: "Neha Kulkarni",
    role: "Property Investor",
    project: "Residential Development",
    initials: "NK",
    review:
      "Saam Infrastructure provided reliable support from planning to completion. Their commitment to quality and timely execution was impressive.",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* =========================================================
     RESPONSIVE CARD COUNT
     
     Mobile  = 1
     Tablet  = 2
     Desktop = 3
  ========================================================= */

  const getVisibleCards = () => {
    if (typeof window === "undefined") {
      return 1;
    }

    if (window.innerWidth >= 1024) {
      return 3;
    }

    if (window.innerWidth >= 640) {
      return 2;
    }

    return 1;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards);

  /* =========================================================
     RESPONSIVE SCREEN SIZE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();

      setVisibleCards(newVisibleCards);

      const newMaxIndex = Math.max(
        testimonials.length - newVisibleCards,
        0
      );

      setCurrentIndex((previous) =>
        Math.min(previous, newMaxIndex)
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================================================
     MAXIMUM SLIDE INDEX
  ========================================================= */

  const maxIndex = Math.max(
    testimonials.length - visibleCards,
    0
  );

  const safeIndex = Math.min(currentIndex, maxIndex);

  /* =========================================================
     AUTOMATIC CAROUSEL
  ========================================================= */

  useEffect(() => {
    if (maxIndex <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((previous) => {
        if (previous >= maxIndex) {
          return 0;
        }

        return previous + 1;
      });
    }, 4500);

    return () => {
      clearInterval(interval);
    };
  }, [maxIndex]);

  return (
    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        bg-[#F7F1E6]
        px-4
        py-14
        text-[#17202A]
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
        xl:py-28
      "
    >
      {/* =====================================================
          BACKGROUND GOLD GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-10
          h-64
          w-64
          rounded-full
          bg-[#C9A227]/10
          blur-3xl
          sm:-right-40
          sm:h-96
          sm:w-96
        "
      />

      {/* =====================================================
          BACKGROUND SLATE GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          bottom-0
          h-64
          w-64
          rounded-full
          bg-[#718096]/10
          blur-3xl
          sm:-left-40
          sm:h-96
          sm:w-96
        "
      />

      {/* =====================================================
          ARCHITECTURAL GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-full
          w-[40%]
          opacity-[0.035]
          [background-image:linear-gradient(#17202A_1px,transparent_1px),linear-gradient(90deg,#17202A_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      {/* =====================================================
          DECORATIVE CIRCLE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[7%]
          top-[34%]
          hidden
          h-64
          w-64
          rounded-full
          border
          border-[#C9A227]/10
          lg:block
        "
      />

      {/* =====================================================
          RIGHT GOLD ACCENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-24
          hidden
          h-36
          w-1
          bg-[#C9A227]
          sm:block
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-end
            lg:gap-20
            xl:grid-cols-[0.9fr_1.1fr]
            xl:gap-24
          "
        >

          {/* =================================================
              LEFT — H1 CLIENT REVIEWS
          ================================================== */}

          <div className="min-w-0">

            {/* SMALL GOLD LINE + H1 */}

            <div
              className="
                flex
                items-center
                gap-3
                sm:gap-4
              "
            >

              <span
                className="
                  h-[2px]
                  w-8
                  shrink-0
                  bg-[#C9A227]
                  sm:w-12
                  lg:w-14
                "
              />

              <h1
                className="
                  min-w-0
                  text-[2.4rem]
                  font-extrabold
                  uppercase
                  leading-[0.95]
                  tracking-[-0.045em]
                  text-[#94700C]
                  sm:text-5xl
                  md:text-[3.5rem]
                  lg:text-[4rem]
                  xl:text-[4.35rem]
                "
              >
                Client Reviews
              </h1>

            </div>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-6
                text-[#52606D]
                sm:mt-6
                sm:text-base
                sm:leading-7
                lg:mt-7
              "
            >
              Trusted by clients for dependable execution,
              quality workmanship and professional project
              delivery.
            </p>

          </div>

          {/* =================================================
              RIGHT — H2
          ================================================== */}

          <div
            className="
              min-w-0
              lg:pb-1
            "
          >

            <h2
              className="
                max-w-3xl
                text-[2rem]
                font-bold
                leading-[1.08]
                tracking-[-0.035em]
                text-[#17202A]
                sm:text-4xl
                md:text-[2.7rem]
                lg:text-[3.15rem]
                xl:text-[3.5rem]
              "
            >
              What our clients.
              <br />

              <span className="text-[#7C8792]">
                say about us.
              </span>
            </h2>

            {/* GOLD H2 ACCENT */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-2
                sm:mt-6
                lg:mt-7
              "
            >

              <span
                className="
                  h-[2px]
                  w-10
                  bg-[#C9A227]
                  sm:w-12
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

        {/* =====================================================
            TRUST STRIP
        ====================================================== */}

        <div
          className="
            mt-10
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[#D8CFBE]
            bg-white/65
            px-4
            py-3
            backdrop-blur-sm
            sm:mt-12
            sm:items-center
            sm:px-5
            sm:py-3.5
            lg:mt-14
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#17202A]
              sm:h-9
              sm:w-9
            "
          >
            <Star
              size={14}
              className="fill-[#E0C45C] text-[#E0C45C]"
            />
          </div>

          <p
            className="
              text-xs
              leading-5
              text-[#52606D]
              sm:text-sm
              sm:leading-6
            "
          >
            Real experiences from clients who trusted us with
            their construction and infrastructure projects.
          </p>

        </div>

        {/* =====================================================
            TESTIMONIAL CAROUSEL
        ====================================================== */}

        <div
          className="
            mt-8
            w-full
            overflow-hidden
            sm:mt-10
            lg:mt-14
          "
        >

          <div
            className="
              flex
              transition-transform
              duration-1000
              ease-in-out
            "
            style={{
              transform: `translateX(-${
                safeIndex * (100 / visibleCards)
              }%)`,
            }}
          >

            {testimonials.map((testimonial, index) => (

              <article
                key={testimonial.name}
                className="
                  w-full
                  min-w-0
                  shrink-0
                  px-0
                  sm:w-1/2
                  sm:px-2
                  lg:w-1/3
                "
              >

                {/* =================================================
                    TESTIMONIAL CARD
                ================================================== */}

                <div
                  className="
                    group
                    relative
                    flex
                    min-h-[410px]
                    flex-col
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#D8CFBE]
                    bg-white
                    p-5
                    shadow-[0_10px_30px_rgba(23,32,42,0.07)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-[#C9A227]
                    hover:shadow-[0_22px_50px_rgba(23,32,42,0.14)]
                    sm:min-h-[420px]
                    sm:rounded-[28px]
                    sm:p-7
                    lg:p-8
                  "
                >

                  {/* TOP GOLD LINE */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-[3px]
                      w-0
                      bg-[#C9A227]
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />

                  {/* DECORATIVE CIRCLE */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-12
                      -top-12
                      h-32
                      w-32
                      rounded-full
                      border
                      border-[#C9A227]/10
                      bg-[#C9A227]/5
                      transition-all
                      duration-500
                      group-hover:scale-150
                      group-hover:bg-[#C9A227]/10
                    "
                  />

                  {/* TOP AREA */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-between
                    "
                  >

                    {/* QUOTE */}

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-tl-2xl
                        rounded-br-2xl
                        bg-[#17202A]
                        text-[#E0C45C]
                        shadow-md
                        transition-all
                        duration-300
                        group-hover:bg-[#C9A227]
                        group-hover:text-[#17202A]
                        sm:h-12
                        sm:w-12
                      "
                    >
                      <Quote size={19} />
                    </div>

                    {/* NUMBER */}

                    <span
                      className="
                        text-xs
                        font-bold
                        tracking-[0.2em]
                        text-[#C9A227]
                        sm:text-sm
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  {/* STARS */}

                  <div
                    className="
                      relative
                      z-10
                      mt-6
                      flex
                      gap-1
                      sm:mt-7
                    "
                  >

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={16}
                        className="
                          fill-[#C9A227]
                          text-[#C9A227]
                          sm:h-[17px]
                          sm:w-[17px]
                        "
                      />

                    ))}

                  </div>

                  {/* REVIEW */}

                  <p
                    className="
                      relative
                      z-10
                      mt-5
                      flex-1
                      text-sm
                      leading-6
                      text-[#52606D]
                      sm:mt-6
                      sm:text-[15px]
                      sm:leading-7
                    "
                  >
                    "{testimonial.review}"
                  </p>

                  {/* CLIENT INFORMATION */}

                  <div
                    className="
                      relative
                      z-10
                      mt-6
                      border-t
                      border-[#E0D8C9]
                      pt-5
                      sm:mt-7
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        sm:gap-4
                      "
                    >

                      {/* INITIALS */}

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#17202A]
                          text-[10px]
                          font-bold
                          text-[#E0C45C]
                          shadow-sm
                          transition-all
                          duration-300
                          group-hover:bg-[#C9A227]
                          group-hover:text-[#17202A]
                          sm:h-12
                          sm:w-12
                          sm:text-xs
                        "
                      >
                        {testimonial.initials}
                      </div>

                      {/* NAME / ROLE */}

                      <div className="min-w-0">

                        <h3
                          className="
                            truncate
                            text-sm
                            font-bold
                            text-[#17202A]
                            sm:text-base
                          "
                        >
                          {testimonial.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            truncate
                            text-xs
                            text-[#7C8792]
                            sm:text-sm
                          "
                        >
                          {testimonial.role}
                        </p>

                      </div>

                    </div>

                    {/* PROJECT TAG */}

                    <div className="mt-4">

                      <span
                        className="
                          inline-flex
                          max-w-full
                          truncate
                          rounded-full
                          bg-[#F7F1E6]
                          px-3
                          py-1.5
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.14em]
                          text-[#A9820F]
                          transition-colors
                          duration-300
                          group-hover:bg-[#C9A227]/15
                          sm:text-[10px]
                        "
                      >
                        {testimonial.project}
                      </span>

                    </div>

                  </div>

                  {/* CORNER ACCENT */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      right-0
                      h-14
                      w-14
                      rounded-tl-[28px]
                      bg-[#718096]/5
                      transition-all
                      duration-500
                      group-hover:h-20
                      group-hover:w-20
                      group-hover:bg-[#C9A227]/10
                    "
                  />

                </div>

              </article>

            ))}

          </div>

        </div>

        {/* =====================================================
            SLIDER INDICATOR
        ====================================================== */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            sm:mt-8
          "
        >

          {Array.from({
            length: maxIndex + 1,
          }).map((_, index) => (

            <div
              key={index}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-700
                ${
                  safeIndex === index
                    ? "w-8 bg-[#C9A227] sm:w-10"
                    : "w-4 bg-[#D8CFBE] sm:w-5"
                }
              `}
            />

          ))}

        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ====================================================== */}

        <div
          className="
            mt-8
            border-t
            border-[#D8CFBE]
            pt-6
            sm:mt-10
            sm:pt-8
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-6
            "
          >

            {/* STATEMENT */}

            <div>

              <p
                className="
                  max-w-2xl
                  text-sm
                  leading-6
                  text-[#687684]
                  sm:text-base
                  sm:leading-7
                "
              >
                Every project is an opportunity to build trust
                through quality, communication and dependable
                execution.
              </p>

            </div>

            {/* TRUSTED CLIENTS */}

            <div
              className="
                flex
                items-center
                gap-3
                self-start
                sm:self-auto
              "
            >

              <div className="flex -space-x-2">

                {/* RS */}

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#F7F1E6]
                    bg-[#17202A]
                    text-[9px]
                    font-bold
                    text-white
                    sm:h-9
                    sm:w-9
                    sm:text-[10px]
                  "
                >
                  RS
                </div>

                {/* AP */}

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#F7F1E6]
                    bg-[#C9A227]
                    text-[9px]
                    font-bold
                    text-[#17202A]
                    sm:h-9
                    sm:w-9
                    sm:text-[10px]
                  "
                >
                  AP
                </div>

                {/* SD */}

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#F7F1E6]
                    bg-[#52606D]
                    text-[9px]
                    font-bold
                    text-white
                    sm:h-9
                    sm:w-9
                    sm:text-[10px]
                  "
                >
                  SD
                </div>

                {/* VJ */}

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#F7F1E6]
                    bg-[#7C8792]
                    text-[9px]
                    font-bold
                    text-white
                    sm:h-9
                    sm:w-9
                    sm:text-[10px]
                  "
                >
                  VJ
                </div>

              </div>

              <span
                className="
                  text-xs
                  font-semibold
                  text-[#52606D]
                  sm:text-sm
                "
              >
                Trusted Clients
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM GOLD ACCENT
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[3px]
          bg-[#C9A227]
        "
      />

    </section>
  );
}

export default Testimonials;