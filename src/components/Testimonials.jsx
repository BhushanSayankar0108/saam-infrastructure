import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

/* =========================================================
   DEFAULT TESTIMONIALS
========================================================= */

const DEFAULT_TESTIMONIALS = [
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
];

/* =========================================================
   DEFAULT HOME CONTENT
========================================================= */

const DEFAULT_HOME_CONTENT = {
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

  testimonials: DEFAULT_TESTIMONIALS,
};

/* =========================================================
   LOAD HOME CONTENT
========================================================= */

function getHomeContent() {
  try {
    const savedContent =
      localStorage.getItem("saamHomeContent");

    if (!savedContent) {
      return DEFAULT_HOME_CONTENT;
    }

    const parsedContent = JSON.parse(savedContent);

    if (
      !parsedContent ||
      typeof parsedContent !== "object"
    ) {
      return DEFAULT_HOME_CONTENT;
    }

    return {
      ...DEFAULT_HOME_CONTENT,
      ...parsedContent,

      testimonials: Array.isArray(
        parsedContent.testimonials
      )
        ? parsedContent.testimonials
        : DEFAULT_TESTIMONIALS,
    };
  } catch (error) {
    console.error(
      "Failed to load Testimonials CMS content:",
      error
    );

    return DEFAULT_HOME_CONTENT;
  }
}

/* =========================================================
   RESPONSIVE CARD COUNT
========================================================= */

function getVisibleCardsFromWidth(width) {
  if (width >= 1024) {
    return 3;
  }

  if (width >= 640) {
    return 2;
  }

  return 1;
}

/* =========================================================
   TESTIMONIALS COMPONENT
========================================================= */

function Testimonials() {
  /* =======================================================
     HOME CONTENT
  ======================================================= */

  const [homeContent, setHomeContent] = useState(
    getHomeContent
  );

  /* =======================================================
     CURRENT SLIDE
  ======================================================= */

  const [currentIndex, setCurrentIndex] = useState(0);

  /* =======================================================
     VISIBLE CARDS
  ======================================================= */

  const [visibleCards, setVisibleCards] = useState(() => {
    if (typeof window === "undefined") {
      return 1;
    }

    return getVisibleCardsFromWidth(window.innerWidth);
  });

  /* =======================================================
     CMS CONTENT LISTENER

     IMPORTANT:
     This hook MUST stay before any conditional return.
  ======================================================= */

  useEffect(() => {
    const loadContent = () => {
      const updatedContent = getHomeContent();

      setHomeContent(updatedContent);
      setCurrentIndex(0);
    };

    /* Same-tab CMS update */
    window.addEventListener(
      "saamHomeContentUpdated",
      loadContent
    );

    /* Different-tab localStorage update */
    const handleStorage = (event) => {
      if (
        event.key === "saamHomeContent" ||
        event.key === null
      ) {
        loadContent();
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "saamHomeContentUpdated",
        loadContent
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  /* =======================================================
     RESPONSIVE CARD COUNT
  ======================================================= */

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(
        getVisibleCardsFromWidth(window.innerWidth)
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =======================================================
     GET TESTIMONIALS
  ======================================================= */

  const testimonials = (
    Array.isArray(homeContent.testimonials)
      ? homeContent.testimonials
      : DEFAULT_TESTIMONIALS
  ).filter(
    (testimonial) =>
      testimonial &&
      testimonial.enabled !== false
  );

  /* =======================================================
     MAXIMUM SLIDE INDEX
  ======================================================= */

  const maxIndex = Math.max(
    testimonials.length - visibleCards,
    0
  );

  /* =======================================================
     SAFE INDEX
  ======================================================= */

  const safeIndex = Math.min(
    currentIndex,
    maxIndex
  );

  /* =======================================================
     AUTOMATIC CAROUSEL

     IMPORTANT:
     This hook is BEFORE the visibility return.
  ======================================================= */

  useEffect(() => {
    if (maxIndex <= 0) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => {
        if (previousIndex >= maxIndex) {
          return 0;
        }

        return previousIndex + 1;
      });
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [maxIndex]);

  /* =======================================================
     NOW IT IS SAFE TO RETURN NULL

     ALL HOOKS ABOVE RUN ON EVERY RENDER.
  ======================================================= */

  if (homeContent.testimonialsEnabled === false) {
    return null;
  }

  /* =======================================================
     RENDER
  ======================================================= */

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

        {/* ===================================================
            HEADER
        ==================================================== */}

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
          {/* LEFT */}

          <div className="min-w-0">
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
                {homeContent.testimonialsLabel ||
                  "Client Reviews"}
              </h1>
            </div>

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
              {homeContent.testimonialsDescription ||
                DEFAULT_HOME_CONTENT.testimonialsDescription}
            </p>
          </div>

          {/* RIGHT */}

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
              {homeContent.testimonialsHeading ||
                "What our clients."}

              <br />

              <span className="text-[#7C8792]">
                {homeContent.testimonialsHeadingHighlight ||
                  "say about us."}
              </span>
            </h2>

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

        {/* ===================================================
            TRUST STRIP
        ==================================================== */}

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
              className="
                fill-[#E0C45C]
                text-[#E0C45C]
              "
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
            {homeContent.testimonialsTrustStrip ||
              DEFAULT_HOME_CONTENT.testimonialsTrustStrip}
          </p>
        </div>

        {/* ===================================================
            TESTIMONIAL CAROUSEL
        ==================================================== */}

        <div
          className="
            mt-8
            w-full
            overflow-hidden
            sm:mt-10
            lg:mt-14
          "
        >
          {testimonials.length > 0 ? (
            <div
              className="
                flex
                transition-transform
                duration-1000
                ease-in-out
              "
              style={{
                transform: `translateX(-${
                  safeIndex *
                  (100 / visibleCards)
                }%)`,
              }}
            >
              {testimonials.map(
                (testimonial, index) => (
                  <article
                    key={
                      testimonial.id ??
                      testimonial.name ??
                      index
                    }
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

                        <span
                          className="
                            text-xs
                            font-bold
                            tracking-[0.2em]
                            text-[#C9A227]
                            sm:text-sm
                          "
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
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
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
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
                          )
                        )}
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
                        "{testimonial.review || ""}"
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
                            {testimonial.initials ||
                              ""}
                          </div>

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
                              {testimonial.name ||
                                "Client"}
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
                              {testimonial.role ||
                                "Client"}
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
                            {testimonial.project ||
                              "Construction Project"}
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
                )
              )}
            </div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-[#D8CFBE]
                bg-white
                px-6
                py-12
                text-center
                text-sm
                text-[#52606D]
              "
            >
              No client reviews available.
            </div>
          )}
        </div>

        {/* ===================================================
            SLIDER INDICATOR
        ==================================================== */}

        {testimonials.length > 0 &&
          maxIndex > 0 && (
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
          )}

        {/* ===================================================
            BOTTOM STATEMENT
        ==================================================== */}

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
                {homeContent.testimonialsBottomStatement ||
                  DEFAULT_HOME_CONTENT.testimonialsBottomStatement}
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

                {/* CLIENT 1 */}

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
                  {testimonials[0]?.initials ||
                    "RS"}
                </div>

                {/* CLIENT 2 */}

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
                  {testimonials[1]?.initials ||
                    "AP"}
                </div>

                {/* CLIENT 3 */}

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
                  {testimonials[2]?.initials ||
                    "SD"}
                </div>

                {/* CLIENT 4 */}

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
                  {testimonials[3]?.initials ||
                    "VJ"}
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
                {homeContent.testimonialsTrustedClientsText ||
                  "Trusted Clients"}
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