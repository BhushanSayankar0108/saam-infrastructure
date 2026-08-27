import {
  Building2,
  CalendarDays,
  Users,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const statistics = [
  {
    value: "15+",
    label: "Projects Delivered",
    description:
      "Construction and infrastructure projects completed with quality and precision.",
    icon: Building2,

    card:
      "bg-[#FFFDF7] border-[#E6D8AE] text-[#171815]",

    iconBox:
      "bg-[#F8F0D8] border-[#D7BC68] text-[#A98216]",

    hover:
      "hover:bg-[#FFF8DF]",
  },

  {
    value: "10+",
    label: "Years Experience",
    description:
      "Industry experience and expertise built through dependable project execution.",
    icon: CalendarDays,

    card:
      "bg-[#F1F5F2] border-[#CBD9D0] text-[#171815]",

    iconBox:
      "bg-white border-[#B8CBBE] text-[#496451]",

    hover:
      "hover:bg-[#E8F0EA]",
  },

  {
    value: "100%",
    label: "Commitment",
    description:
      "Quality, safety and dependable execution are at the heart of every project.",
    icon: ShieldCheck,

    card:
      "bg-[#FFF2D1] border-[#E3C875] text-[#171815]",

    iconBox:
      "bg-[#C9A227] border-[#C9A227] text-[#171815]",

    hover:
      "hover:bg-[#FFE9B0]",
  },

  {
    value: "50+",
    label: "Professionals",
    description:
      "Skilled people working together to deliver excellence on every project.",
    icon: Users,

    card:
      "bg-[#171815] border-[#34362F] text-white",

    iconBox:
      "bg-[#C9A227] border-[#C9A227] text-[#171815]",

    hover:
      "hover:bg-[#20221E]",
  },
];

function Statistics() {
  return (
    <section
      id="statistics"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F3F6F4]
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      {/* LEFT GOLD GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-10
          h-48
          w-48
          rounded-full
          bg-[#C9A227]/[0.07]
          blur-3xl
          sm:-left-32
          sm:h-80
          sm:w-80
        "
      />

      {/* RIGHT GOLD GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-10
          h-56
          w-56
          rounded-full
          bg-[#A98216]/[0.06]
          blur-3xl
          sm:-right-32
          sm:h-96
          sm:w-96
        "
      />

      {/* =====================================================
          ARCHITECTURAL GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(#171815_1px,transparent_1px),linear-gradient(90deg,#171815_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-12
          sm:px-6
          sm:py-16
          lg:px-8
          lg:py-20
        "
      >
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          {/* LABEL */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              sm:gap-3
            "
          >
            <span
              className="
                h-px
                w-6
                bg-[#C9A227]
                sm:w-10
                md:w-12
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.20em]
                text-[#A98216]
                sm:text-xs
                sm:tracking-[0.28em]
              "
            >
              Our Strength
            </span>

            <span
              className="
                h-px
                w-6
                bg-[#C9A227]
                sm:w-10
                md:w-12
              "
            />
          </div>

          {/* HEADING */}

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-[#171815]
              sm:mt-4
              sm:text-4xl
              md:text-5xl
            "
          >
            Built on Experience.
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              px-2
              text-xs
              leading-6
              text-[#686961]
              sm:mt-4
              sm:px-0
              sm:text-base
              sm:leading-7
            "
          >
            Our experience, expertise and commitment define the way
            we approach every project.
          </p>
        </div>

        {/* =====================================================
            STATISTICS CARDS
        ===================================================== */}

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-4
            sm:mt-10
            sm:grid-cols-2
            sm:gap-5
            lg:mt-12
            lg:grid-cols-4
            lg:gap-5
          "
        >
          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className={`
                  group
                  relative
                  flex
                  min-h-[285px]
                  flex-col
                  overflow-hidden
                  rounded-[22px]
                  border
                  p-5
                  shadow-[0_8px_25px_rgba(23,24,21,0.05)]
                  transition-all
                  duration-500
                  hover:-translate-y-1.5
                  hover:shadow-[0_20px_45px_rgba(15,16,14,0.12)]

                  sm:min-h-[310px]
                  sm:rounded-[26px]
                  sm:p-6

                  lg:min-h-[340px]
                  lg:rounded-[28px]
                  lg:p-7

                  ${stat.card}
                  ${stat.hover}
                `}
              >
                {/* =================================================
                    TOP ROW
                ================================================== */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  {/* ICON */}

                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3

                      sm:h-11
                      sm:w-11
                      sm:rounded-2xl

                      lg:h-12
                      lg:w-12

                      ${stat.iconBox}
                    `}
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="sm:h-5 sm:w-5"
                    />
                  </div>

                  {/* NUMBER */}

                  <span
                    className={`
                      text-[9px]
                      font-bold
                      tracking-[0.18em]

                      sm:text-[10px]
                      sm:tracking-[0.2em]

                      ${
                        index === 3
                          ? "text-[#C9A227]/60"
                          : "text-[#A98216]/40"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* =================================================
                    LARGE NUMBER
                ================================================== */}

                <div
                  className="
                    mt-7
                    sm:mt-8
                    lg:mt-9
                  "
                >
                  <div
                    className={`
                      text-5xl
                      font-bold
                      leading-none
                      tracking-[-0.05em]

                      sm:text-6xl

                      ${
                        index === 3
                          ? "text-white"
                          : "text-[#171815]"
                      }
                    `}
                  >
                    {stat.value}
                  </div>
                </div>

                {/* =================================================
                    LABEL
                ================================================== */}

                <div
                  className="
                    mt-2.5
                    sm:mt-3
                  "
                >
                  <h3
                    className={`
                      text-[10px]
                      font-bold
                      uppercase
                      leading-5
                      tracking-[0.13em]

                      sm:text-xs
                      sm:tracking-[0.15em]

                      lg:text-sm
                      lg:tracking-[0.16em]

                      ${
                        index === 3
                          ? "text-[#E0C45C]"
                          : "text-[#A98216]"
                      }
                    `}
                  >
                    {stat.label}
                  </h3>
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className={`
                    mt-3
                    max-w-[270px]
                    text-xs
                    leading-5

                    sm:mt-4
                    sm:text-sm
                    sm:leading-6

                    ${
                      index === 3
                        ? "text-slate-300"
                        : "text-[#686961]"
                    }
                  `}
                >
                  {stat.description}
                </p>

                {/* =================================================
                    BOTTOM ARROW
                ================================================== */}

                <div
                  className="
                    mt-auto
                    flex
                    items-end
                    justify-between
                    pt-5

                    sm:pt-6
                  "
                >
                  {/* LINE */}

                  <div
                    className={`
                      h-px
                      flex-1

                      ${
                        index === 3
                          ? "bg-white/15"
                          : "bg-[#D8C27A]/50"
                      }
                    `}
                  />

                  {/* ARROW */}

                  <div
                    className={`
                      ml-3
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-300
                      group-hover:translate-x-1

                      sm:ml-4
                      sm:h-9
                      sm:w-9

                      ${
                        index === 3
                          ? "border-white/20 text-[#C9A227]"
                          : "border-[#D8C27A] text-[#A98216]"
                      }
                    `}
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* =================================================
                    DECORATIVE GOLD CIRCLE
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-10
                    -right-10
                    h-24
                    w-24
                    rounded-full
                    border
                    border-[#C9A227]/15
                    transition-all
                    duration-500
                    group-hover:scale-125

                    sm:-bottom-12
                    sm:-right-12
                    sm:h-28
                    sm:w-28
                  "
                />
              </article>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          BOTTOM GOLD LINE
          KEPT AS REQUESTED
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          h-[3px]
          bg-[#C9A227]
        "
      />
    </section>
  );
}

export default Statistics;