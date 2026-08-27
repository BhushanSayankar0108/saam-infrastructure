import {
  Building2,
  Landmark,
  House,
  Share2,
  Wrench,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    slug: "civil-construction",
    title: "Civil Construction",
    description:
      "Reliable civil construction solutions built with quality materials, skilled workmanship and attention to every detail.",
    icon: Building2,
  },
  {
    number: "02",
    slug: "commercial-projects",
    title: "Commercial Projects",
    description:
      "Modern commercial spaces designed and executed with a focus on functionality, durability and long-term value.",
    icon: Landmark,
  },
  {
    number: "03",
    slug: "residential-construction",
    title: "Residential Construction",
    description:
      "Strong and thoughtfully planned residential projects created to provide comfortable and lasting spaces.",
    icon: House,
  },
  {
    number: "04",
    slug: "infrastructure-development",
    title: "Infrastructure Development",
    description:
      "Infrastructure development solutions focused on dependable execution, safety and sustainable growth.",
    icon: Share2,
  },
  {
    number: "05",
    slug: "renovation-development",
    title: "Renovation & Development",
    description:
      "Renovation and development services that improve existing spaces while maintaining quality and structural integrity.",
    icon: Wrench,
  },
  {
    number: "06",
    slug: "engineering-project-management",
    title: "Engineering & Project Management",
    description:
      "Professional planning and project management focused on efficient execution, coordination and timely delivery.",
    icon: Ruler,
  },
];

function Services() {
  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#EAF0F5]
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
          BACKGROUND DECORATION
      ====================================================== */}

      {/* Gold Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-10
          h-72
          w-72
          rounded-full
          bg-[#C9A227]/10
          blur-3xl
          sm:-right-40
          sm:h-96
          sm:w-96
        "
      />

      {/* Blue Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          bottom-0
          h-72
          w-72
          rounded-full
          bg-[#6B8EAE]/10
          blur-3xl
          sm:-left-40
          sm:h-96
          sm:w-96
        "
      />

      {/* Architectural Grid */}
      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-full
          w-[35%]
          opacity-[0.035]
          [background-image:linear-gradient(#17202A_1px,transparent_1px),linear-gradient(90deg,#17202A_1px,transparent_1px)]
          [background-size:45px_45px]
        "
      />

      {/* Right Gold Accent */}
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
            lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
            lg:items-end
            lg:gap-10
            xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]
            xl:gap-14
          "
        >

          {/* =================================================
              LEFT — H1 OUR SERVICES
          ================================================== */}

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

              {/* Gold Line */}

              <span
                className="
                  h-[3px]
                  w-7
                  shrink-0
                  bg-[#C9A227]
                  sm:w-12
                  lg:w-14
                "
              />

              {/* H1 */}

              <h1
                className="
                  min-w-0
                  max-w-full
                  text-[clamp(2.65rem,7vw,4.7rem)]
                  font-black
                  uppercase
                  leading-[0.9]
                  tracking-[-0.055em]
                  text-[#94700C]
                  sm:text-[clamp(3.4rem,6vw,4.7rem)]
                  lg:text-[clamp(3.5rem,5vw,4.65rem)]
                  xl:text-[4.8rem]
                "
              >
                Our Services
              </h1>

            </div>

            {/* Description */}

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
              "
            >
              Comprehensive construction and infrastructure
              solutions delivered with precision, quality and
              responsibility.
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
                max-w-full
                text-[clamp(2rem,5vw,3.8rem)]
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-[#17202A]
                sm:text-[clamp(2.4rem,4vw,3.5rem)]
                lg:text-[3rem]
                xl:text-[3.2rem]
              "
            >
              Building solutions.
              <br />

              <span className="text-[#7C8792]">
                Creating lasting value.
              </span>
            </h2>

            {/* Gold Accent */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-2
                sm:mt-5
                lg:mt-6
              "
            >

              <span
                className="
                  h-[2px]
                  w-8
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

        {/* =====================================================
            INTRO STRIP
        ====================================================== */}

        <div
          className="
            mt-9
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[#CBD5DE]
            bg-white/70
            px-4
            py-3
            backdrop-blur-sm
            sm:mt-12
            sm:items-center
            sm:px-5
            sm:py-3.5
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
            <Ruler
              size={15}
              className="text-[#E0C45C]"
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
            From concept and planning to execution and completion,
            we deliver dependable solutions built for the future.
          </p>

        </div>

        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-4
            sm:mt-10
            sm:grid-cols-2
            sm:gap-5
            xl:grid-cols-3
          "
        >

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                id={service.slug}
                key={service.number}
                className="
                  group
                  relative
                  flex
                  min-h-[310px]
                  scroll-mt-24
                  flex-col
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#D0D9E1]
                  bg-white
                  p-5
                  text-[#17202A]
                  shadow-[0_8px_30px_rgba(23,32,42,0.06)]
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#C9A227]
                  hover:shadow-[0_20px_45px_rgba(23,32,42,0.12)]
                  sm:min-h-[335px]
                  sm:rounded-[28px]
                  sm:p-7
                "
              >

                {/* GOLD TOP ACCENT */}

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
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    border
                    border-[#C9A227]/10
                    transition-all
                    duration-500
                    group-hover:scale-125
                    group-hover:border-[#C9A227]/20
                  "
                />

                {/* TOP ROW */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                  "
                >

                  {/* NUMBER */}

                  <div
                    className="
                      flex
                      h-10
                      min-w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#C9A227]/60
                      bg-[#F3F6F8]
                      px-3
                      text-[11px]
                      font-bold
                      tracking-[0.12em]
                      text-[#A9820F]
                      transition-all
                      duration-300
                      group-hover:border-[#C9A227]
                      group-hover:bg-[#C9A227]
                      group-hover:text-[#17202A]
                    "
                  >
                    {service.number}
                  </div>

                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#D5DEE5]
                      bg-[#F3F6F8]
                      text-[#A9820F]
                      transition-all
                      duration-500
                      group-hover:-rotate-3
                      group-hover:scale-105
                      group-hover:border-[#C9A227]
                      group-hover:bg-[#C9A227]
                      group-hover:text-[#17202A]
                      group-hover:shadow-[0_8px_20px_rgba(201,162,39,0.25)]
                      sm:h-14
                      sm:w-14
                    "
                  >
                    <Icon
                      size={23}
                      strokeWidth={1.8}
                      className="
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    />
                  </div>

                </div>

                {/* CONTENT */}

                <div
                  className="
                    relative
                    z-10
                    mt-8
                    flex
                    flex-1
                    flex-col
                    sm:mt-10
                  "
                >

                  <h3
                    className="
                      max-w-sm
                      text-xl
                      font-bold
                      leading-tight
                      tracking-tight
                      text-[#17202A]
                      transition-colors
                      duration-300
                      group-hover:text-[#A9820F]
                      sm:text-2xl
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-md
                      text-sm
                      leading-6
                      text-[#52606D]
                      sm:mt-4
                      sm:leading-7
                    "
                  >
                    {service.description}
                  </p>

                </div>

                {/* BOTTOM */}

                <div
                  className="
                    relative
                    z-10
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#D8E0E6]
                    pt-4
                    sm:mt-7
                    sm:pt-5
                  "
                >

                  {/* LEARN MORE */}

                  <a
                    href={`/services#${service.slug}`}
                    aria-label={`Learn more about ${service.title}`}
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#7C8792]
                      transition-colors
                      duration-300
                      hover:text-[#A9820F]
                      sm:text-[10px]
                    "
                  >
                    Learn More
                  </a>

                  {/* ARROW */}

                  <a
                    href={`/services#${service.slug}`}
                    aria-label={`Open ${service.title}`}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D5DEE5]
                      text-[#7C8792]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:translate-x-1
                      hover:border-[#C9A227]
                      hover:bg-[#C9A227]
                      hover:text-[#17202A]
                      sm:h-10
                      sm:w-10
                    "
                  >
                    <ArrowUpRight size={17} />
                  </a>

                </div>

                {/* DECORATIVE CORNER */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    right-0
                    h-14
                    w-14
                    rounded-tl-[30px]
                    bg-[#6B8EAE]/5
                    transition-all
                    duration-500
                    group-hover:h-20
                    group-hover:w-20
                    group-hover:bg-[#C9A227]/10
                  "
                />

              </article>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-5
            rounded-2xl
            border
            border-[#CBD5DE]
            bg-[#17202A]
            p-5
            text-white
            shadow-[0_15px_40px_rgba(23,32,42,0.12)]
            sm:mt-10
            sm:gap-6
            sm:p-7
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* TEXT */}

          <div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#E0C45C]
                sm:text-xs
              "
            >
              Built for performance
            </p>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-300
                sm:text-base
                sm:leading-7
              "
            >
              From planning to completion, we bring engineering
              expertise, quality workmanship and dependable execution
              to every project.
            </p>

          </div>

          {/* BUTTON */}

          <a
            href="/services"
            className="
              group
              inline-flex
              w-full
              shrink-0
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#C9A227]
              px-6
              py-3.5
              text-sm
              font-bold
              text-[#17202A]
              shadow-[0_8px_25px_rgba(201,162,39,0.20)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#E0C45C]
              hover:shadow-[0_12px_30px_rgba(201,162,39,0.30)]
              sm:w-fit
              sm:px-7
              sm:py-4
            "
          >

            <span>
              View All Services
            </span>

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#17202A]/10
                transition-all
                duration-300
                group-hover:bg-[#17202A]/20
              "
            >
              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>

          </a>

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

export default Services;