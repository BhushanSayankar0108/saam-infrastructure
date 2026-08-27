import { useEffect, useState } from "react";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";

/* =========================================================
   GALLERY DATA
   ---------------------------------------------------------
   CMS READY STRUCTURE

   Later Admin CMS can manage:
   - id
   - title
   - category
   - description
   - image
   - sortOrder / status if required
========================================================= */

const galleryImages = [
  {
    id: 1,
    title: "Commercial Construction",
    category: "Commercial",
    description:
      "A modern commercial construction project focused on strong structural execution, quality materials and efficient project delivery.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 2,
    title: "Residential Development",
    category: "Residential",
    description:
      "A residential development designed with a balance of functionality, durability and modern architectural planning.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 3,
    title: "Infrastructure Work",
    category: "Infrastructure",
    description:
      "Infrastructure work delivered with careful planning, engineering precision and a strong focus on dependable execution.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 4,
    title: "Urban Development",
    category: "Infrastructure",
    description:
      "An urban development project combining practical infrastructure planning with modern construction standards.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 5,
    title: "Industrial Facility",
    category: "Industrial",
    description:
      "An industrial facility developed with emphasis on structural strength, operational requirements and long-term reliability.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 6,
    title: "Construction Planning",
    category: "Planning",
    description:
      "Detailed construction planning supporting accurate execution, coordinated engineering and efficient project management.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 7,
    title: "Project Development",
    category: "Development",
    description:
      "A project development process focused on coordinated planning, construction quality and successful project completion.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=85",
  },

  {
    id: 8,
    title: "Engineering Work",
    category: "Engineering",
    description:
      "Engineering work carried out with attention to technical accuracy, structural requirements and dependable construction practices.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85",
  },
];


/* =========================================================
   GALLERY PAGE
========================================================= */

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);


  /* =======================================================
     ESCAPE KEY FOR IMAGE MODAL
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);


  /* =======================================================
     OPEN IMAGE
  ======================================================= */

  const openImage = (item) => {
    setSelectedImage(item);
  };


  /* =======================================================
     CLOSE IMAGE
  ======================================================= */

  const closeImage = () => {
    setSelectedImage(null);
  };


  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F7F4EC] text-[#171916]">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#D8D3C4] bg-[#F3F0E6]">


        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-32 -top-32 hidden h-[520px] w-[520px] rounded-full border border-[#C9A24A]/20 lg:block" />

        <div className="pointer-events-none absolute -right-20 top-20 h-[240px] w-[240px] rounded-full border border-[#C9A24A]/15 sm:h-[300px] sm:w-[300px] lg:hidden" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full border border-[#C9A24A]/10 sm:h-[450px] sm:w-[450px]" />


        {/* Hero Container */}

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            pb-14
            pt-[90px]

            sm:px-6
            sm:pb-20
            sm:pt-[105px]

            lg:px-8
            lg:pb-24
            lg:pt-[120px]
          "
        >


          {/* Label */}

          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-12" />

            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#92751C] sm:text-xs sm:tracking-[0.32em]">
              Saam Infrastructure
            </p>
          </div>


          {/* Main Heading */}

          <h1
            className="
              mt-6
              max-w-6xl
              text-5xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[-0.045em]
              text-[#18201D]

              sm:mt-7
              sm:text-6xl

              md:text-7xl

              lg:text-8xl
            "
          >
            <span className="block">
              Project
            </span>

            <span className="block text-[#B58A32]">
              Gallery
            </span>
          </h1>


          {/* Supporting Content */}

          <div className="mt-9 max-w-4xl sm:mt-12">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-10" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#92751C] sm:text-xs">
                Project Showcase
              </span>
            </div>


            <h2
              className="
                max-w-4xl
                text-3xl
                font-bold
                leading-[1.08]
                tracking-[-0.025em]
                text-[#18201D]

                sm:text-4xl

                md:text-5xl

                lg:text-6xl
              "
            >
              A closer look at{" "}

              <span className="text-[#B58A32]">
                our projects.
              </span>
            </h2>


            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5F665F] sm:text-base sm:leading-8 lg:text-lg">
              Explore photographs from our construction,
              infrastructure and development work.
              Every project reflects our commitment to quality,
              precision and dependable execution.
            </p>


            {/* Decorative line */}

            <div className="mt-7 flex items-center gap-2 sm:mt-9">
              <span className="h-[3px] w-12 bg-[#C9A24A] sm:w-16" />

              <span className="h-[3px] w-3 bg-[#C9A24A]" />

              <span className="h-[3px] w-3 bg-[#18201D]" />
            </div>

          </div>

        </div>
      </section>



      {/* =====================================================
          SELECTED PROJECTS
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-y
          border-[#D1C8B5]
          bg-[#E9E2D2]

          px-5
          py-14

          sm:px-6
          sm:py-20

          lg:px-8
          lg:py-28
        "
      >


        {/* ===================================================
            BACKGROUND DECORATION
        =================================================== */}

        <div className="pointer-events-none absolute -right-32 top-10 h-[280px] w-[280px] rounded-full border border-[#C9A24A]/15 sm:h-[420px] sm:w-[420px]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[260px] w-[260px] rounded-full border border-[#18201D]/10 sm:h-[380px] sm:w-[380px]" />

        <div className="pointer-events-none absolute right-[12%] top-[18%] h-2 w-2 rounded-full bg-[#C9A24A]/70" />

        <div className="pointer-events-none absolute bottom-[20%] left-[8%] h-1.5 w-1.5 rounded-full bg-[#18201D]/20" />


        {/* ===================================================
            MAIN CONTAINER
        =================================================== */}

        <div className="relative mx-auto max-w-7xl">


          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <div className="mb-10 max-w-3xl sm:mb-14">

            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-10" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#92751C] sm:text-sm">
                Selected Projects
              </p>
            </div>


            <h2
              className="
                mt-5
                text-3xl
                font-black
                leading-tight
                tracking-tight
                text-[#18201D]

                sm:text-4xl

                md:text-5xl
              "
            >
              A collection of{" "}

              <span className="text-[#B58A32]">
                our work.
              </span>
            </h2>


            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-[#5E645D]

                sm:text-base
                sm:leading-8

                lg:text-lg
              "
            >
              Explore selected photographs representing our
              construction, engineering and infrastructure
              projects.
            </p>

          </div>



          {/* =================================================
              PROJECT CARDS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-6

              sm:grid-cols-2

              lg:grid-cols-3
              lg:gap-8
            "
          >

            {galleryImages.map((item, index) => (

              <article
                key={item.id}
                className={`
                  group
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#D2CAB9]
                  bg-[#F7F4EC]
                  shadow-[0_8px_30px_rgba(24,32,29,0.08)]
                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:border-[#C9A24A]
                  hover:shadow-[0_25px_55px_rgba(24,32,29,0.16)]

                  sm:rounded-[28px]

                  ${
                    index % 3 === 1
                      ? "lg:translate-y-8"
                      : ""
                  }
                `}
              >


                {/* =================================================
                    IMAGE
                ================================================= */}

                <button
                  type="button"
                  onClick={() => openImage(item)}
                  className="
                    relative
                    block
                    h-[250px]
                    w-full
                    cursor-zoom-in
                    overflow-hidden
                    text-left
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#C9A24A]
                    focus-visible:ring-offset-2

                    sm:h-[300px]

                    md:h-[320px]

                    lg:h-[360px]
                  "
                  aria-label={`View ${item.title}`}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out

                      group-hover:scale-110
                    "
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />


                  {/* Dark Gradient */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#18201D]/95
                      via-[#18201D]/20
                      to-transparent
                    "
                  />


                  {/* Number */}

                  <div
                    className="
                      absolute
                      left-3
                      top-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#E0C35B]/70
                      bg-[#18201D]/90
                      text-[10px]
                      font-bold
                      text-[#E0C35B]
                      backdrop-blur-md

                      sm:left-5
                      sm:top-5
                      sm:h-11
                      sm:w-11
                      sm:text-xs
                    "
                  >
                    {String(item.id).padStart(2, "0")}
                  </div>


                  {/* Zoom Button */}

                  <div
                    className="
                      absolute
                      right-3
                      top-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/30
                      bg-black/30
                      text-white
                      backdrop-blur-md
                      transition-all
                      duration-300

                      group-hover:bg-[#C9A24A]
                      group-hover:text-[#18201D]

                      sm:right-5
                      sm:top-5
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <ZoomIn
                      size={17}
                      className="sm:h-[18px] sm:w-[18px]"
                    />
                  </div>


                  {/* Card Content */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-4

                      sm:p-6
                    "
                  >

                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-[#C9A24A]
                        px-3
                        py-1.5
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.16em]
                        text-[#18201D]

                        sm:text-[10px]
                      "
                    >
                      {item.category}
                    </span>


                    <h3
                      className="
                        mt-2
                        text-lg
                        font-bold
                        leading-tight
                        text-white

                        sm:mt-3
                        sm:text-2xl
                      "
                    >
                      {item.title}
                    </h3>

                  </div>

                </button>



                {/* =================================================
                    CARD FOOTER
                ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    px-4
                    py-4

                    sm:px-6
                    sm:py-5
                  "
                >

                  <span
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[#858278]

                      sm:text-[10px]
                      sm:tracking-[0.2em]
                    "
                  >
                    Saam Infrastructure
                  </span>


                  <button
                    type="button"
                    onClick={() => openImage(item)}
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      gap-1.5
                      text-xs
                      font-bold
                      text-[#5F605A]
                      transition-colors
                      duration-300
                      hover:text-[#9B7629]

                      sm:text-sm
                    "
                  >
                    View

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>
      </section>



      {/* =====================================================
          PREMIUM CTA
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-[#C9A24A]/30
          bg-[#18201D]

          px-5
          py-14

          sm:px-6
          sm:py-20

          lg:px-8
          lg:py-24
        "
      >

        {/* Decorative Background */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-[320px] w-[320px] rounded-full border border-[#C9A24A]/10 sm:h-[460px] sm:w-[460px]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[260px] w-[260px] rounded-full border border-[#C9A24A]/10 sm:h-[380px] sm:w-[380px]" />

        <div className="pointer-events-none absolute right-[15%] top-[30%] h-2 w-2 rounded-full bg-[#C9A24A] shadow-[0_0_30px_10px_rgba(201,162,74,0.25)]" />


        {/* CTA Container */}

        <div className="relative mx-auto max-w-7xl">

          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[#C9A24A]/20
              bg-[#202923]
              px-5
              py-8
              shadow-2xl

              sm:rounded-[36px]
              sm:px-10
              sm:py-10

              lg:px-14
              lg:py-12
            "
          >

            {/* Inner Glow */}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(201,162,74,0.12),transparent_35%)]" />


            <div
              className="
                relative
                flex
                flex-col
                gap-8

                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:gap-12
              "
            >

              {/* CTA CONTENT */}

              <div className="max-w-3xl">

                <div className="flex items-center gap-3">

                  <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-12" />

                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A24A] sm:text-xs sm:tracking-[0.35em]">
                    Start Your Project
                  </p>

                </div>


                <h2
                  className="
                    mt-4
                    text-3xl
                    font-black
                    leading-[1.05]
                    tracking-tight
                    text-white

                    sm:mt-5
                    sm:text-4xl

                    md:text-5xl

                    lg:text-6xl
                  "
                >
                  Let's build something{" "}

                  <span className="text-[#C9A24A]">
                    great together.
                  </span>
                </h2>


                <p
                  className="
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-7
                    text-[#B9B9B0]

                    sm:mt-5
                    sm:text-base
                    sm:leading-8

                    lg:text-lg
                  "
                >
                  Have a construction or infrastructure project
                  in mind? Tell us about your requirements and
                  let's discuss the possibilities.
                </p>

              </div>


              {/* CTA BUTTON */}

              <div className="relative w-full shrink-0 sm:w-auto">

                <div className="pointer-events-none absolute -inset-3 rounded-full bg-[#C9A24A]/10 blur-xl" />

                <a
                  href="/contact"
                  className="
                    group
                    relative
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    overflow-hidden
                    rounded-full
                    border
                    border-[#D8B34F]
                    bg-[#C9A24A]
                    px-5
                    py-3
                    text-[#18201D]
                    shadow-[0_10px_35px_rgba(0,0,0,0.25)]
                    transition-all
                    duration-500

                    hover:-translate-y-1
                    hover:border-[#F0D06A]
                    hover:bg-[#E0C35B]
                    hover:shadow-[0_15px_45px_rgba(201,162,74,0.25)]

                    sm:w-auto
                    sm:min-w-[270px]
                    sm:px-6
                    sm:py-3.5
                  "
                >

                  {/* Shine Animation */}

                  <span className="absolute inset-y-0 -left-20 w-16 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[120%]" />


                  {/* Button Text */}

                  <span className="relative flex flex-col text-left">

                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-60">
                      Let's talk
                    </span>

                    <span className="mt-0.5 text-sm font-black sm:text-base">
                      Discuss Your Project
                    </span>

                  </span>


                  {/* Arrow */}

                  <span
                    className="
                      relative
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#18201D]
                      text-[#E0C35B]
                      transition-all
                      duration-500

                      group-hover:rotate-45
                      group-hover:scale-110
                    "
                  >
                    <ArrowUpRight
                      size={20}
                      strokeWidth={2.5}
                    />
                  </span>

                </a>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          IMAGE LIGHTBOX / ZOOM MODAL
      ===================================================== */}

      {selectedImage && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-[#0C100E]/95
            p-3
            backdrop-blur-md

            sm:p-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeImage();
            }
          }}
        >


          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image preview"
            className="
              fixed
              right-3
              top-3
              z-[10000]
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-md
              transition-all
              duration-300

              hover:rotate-90
              hover:bg-[#C9A24A]
              hover:text-[#18201D]

              sm:right-7
              sm:top-7
              sm:h-12
              sm:w-12
            "
          >
            <X size={22} />
          </button>



          {/* =================================================
              IMAGE + INFORMATION CONTAINER
          ================================================= */}

          <div
            className="
              relative
              flex
              w-full
              max-w-6xl
              flex-col
              items-center
              py-10

              sm:py-8
            "
          >


            {/* =================================================
                IMAGE
            ================================================= */}

            <div
              className="
                relative
                flex
                w-full
                items-center
                justify-center
              "
            >

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="
                  max-h-[58vh]
                  max-w-full
                  rounded-xl
                  object-contain
                  shadow-2xl

                  sm:max-h-[68vh]
                  sm:rounded-2xl

                  lg:max-h-[70vh]
                "
              />

            </div>



            {/* =================================================
                IMAGE INFORMATION
            ================================================= */}

            <div
              className="
                mt-4
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#202522]/95
                shadow-2xl
                backdrop-blur-xl

                sm:mt-5
                sm:rounded-3xl
              "
            >


              {/* Information Content */}

              <div
                className="
                  p-4

                  sm:p-6

                  md:p-7
                "
              >

                {/* Category */}

                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.22em]
                    text-[#E0C35B]

                    sm:text-[10px]
                    sm:tracking-[0.28em]
                  "
                >
                  {selectedImage.category}
                </p>


                {/* Title */}

                <h3
                  className="
                    mt-1.5
                    text-xl
                    font-black
                    leading-tight
                    text-white

                    sm:mt-2
                    sm:text-2xl

                    md:text-3xl
                  "
                >
                  {selectedImage.title}
                </h3>


                {/* Description */}

                <p
                  className="
                    mt-3
                    max-w-4xl
                    text-sm
                    leading-6
                    text-white/65

                    sm:mt-4
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {selectedImage.description}
                </p>

              </div>


              {/* Bottom Information Bar */}

              <div
                className="
                  flex
                  flex-col
                  gap-2
                  border-t
                  border-white/10
                  bg-black/10
                  px-4
                  py-3

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-6
                  sm:py-4
                "
              >

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-white/35

                    sm:text-[10px]
                  "
                >
                  Saam Infrastructure
                </span>


                <span
                  className="
                    text-[9px]
                    text-white/40

                    sm:text-xs
                  "
                >
                  Click outside or press ESC to close
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default GalleryPage;