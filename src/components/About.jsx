import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Award,
} from "lucide-react";

import aboutConstruction from "../assets/images/about-construction.jpg";

function About() {
  const features = [
    {
      title: "Quality",
      description: "High standards at every stage of construction.",
      icon: CheckCircle2,
    },
    {
      title: "Reliability",
      description: "Dependable planning and project execution.",
      icon: ShieldCheck,
    },
    {
      title: "Safety",
      description: "Responsible practices with safety at the core.",
      icon: Award,
    },
    {
      title: "Long-Term Value",
      description: "Solutions designed for durability and performance.",
      icon: Building2,
    },
  ];

  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        bg-[#F7F1E6]
        px-4
        py-12
        text-[#171815]
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
        xl:py-24
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
          -left-40
          top-24
          h-64
          w-64
          rounded-full
          bg-[#C9A227]/[0.07]
          blur-3xl
          sm:-left-48
          sm:h-80
          sm:w-80
        "
      />

      {/* Dark Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/3
          h-72
          w-72
          rounded-full
          bg-[#171815]/[0.025]
          blur-3xl
          sm:h-80
          sm:w-80
        "
      />

      {/* Architectural Grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.02]
          [background-image:linear-gradient(#171815_1px,transparent_1px),linear-gradient(90deg,#171815_1px,transparent_1px)]
          [background-size:42px_42px]
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
          h-24
          w-1
          bg-[#C9A227]
          sm:block
          lg:h-28
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
            gap-7
            lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
            lg:items-end
            lg:gap-12
            xl:gap-16
          "
        >
          {/* LEFT - ABOUT US */}

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
                  sm:w-10
                  lg:w-12
                "
              />

              {/* ABOUT US */}

              <h1
                className="
                  min-w-0
                  whitespace-nowrap
                  text-[2.35rem]
                  font-black
                  uppercase
                  leading-none
                  tracking-[-0.045em]
                  text-[#94700C]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-[3.8rem]
                  xl:text-[4.3rem]
                  2xl:text-[4.6rem]
                "
              >
                About Us
              </h1>
            </div>

            {/* Description */}

            <p
              className="
                mt-4
                max-w-lg
                text-sm
                leading-6
                text-[#5F625B]
                sm:mt-5
                sm:text-base
                sm:leading-7
              "
            >
              Engineering expertise, responsible execution and
              construction solutions designed for lasting value.
            </p>
          </div>

          {/* RIGHT - SUPPORTING HEADING */}

          <div
            className="
              min-w-0
              lg:pb-1
            "
          >
            <h2
              className="
                max-w-3xl
                text-[1.7rem]
                font-bold
                leading-[1.1]
                tracking-[-0.035em]
                text-[#171815]
                sm:text-3xl
                md:text-[2.2rem]
                lg:text-[2.5rem]
                xl:text-[2.9rem]
              "
            >
              Building with purpose.
              <br />

              <span className="text-[#7C8792]">
                Delivering with precision.
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
              "
            >
              <span
                className="
                  h-[2px]
                  w-7
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
            MAIN ABOUT AREA
        ====================================================== */}

        <div
          className="
            mt-9
            grid
            grid-cols-1
            gap-7
            sm:mt-12
            lg:mt-14
            lg:grid-cols-2
            lg:gap-0
            lg:items-stretch
          "
        >

          {/* =================================================
              IMAGE AREA
          ================================================== */}

          <div
            className="
              relative
              min-w-0
              pb-2
              pr-2
              sm:pb-3
              sm:pr-3
              lg:pb-3
              lg:pr-3
            "
          >

            {/* =================================================
                SMALL GOLD FRAME

                Reduced from the previous large frame.
                This is the yellow background/shadow requested
                by your manager.
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                left-2
                right-0
                top-2
                rounded-[25px]
                bg-[#C9A227]
                sm:left-3
                sm:top-3
                sm:rounded-[32px]
                lg:left-3
                lg:top-3
                lg:rounded-[34px]
              "
            />

            {/* =================================================
                IMAGE CARD
            ================================================== */}

            <div
              className="
                group
                relative
                z-10
                h-[290px]
                w-full
                overflow-hidden
                rounded-[23px]
                bg-[#CFC7B5]
                shadow-[0_18px_45px_rgba(23,24,21,0.15)]
                sm:h-[410px]
                sm:rounded-[30px]
                md:h-[460px]
                lg:h-full
                lg:min-h-[540px]
                lg:rounded-[34px]
                lg:rounded-br-[78px]
              "
            >

              {/* Image */}

              <img
                src={aboutConstruction}
                alt="Saam Infrastructure construction site"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.04]
                "
              />

              {/* Dark Overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-b
                  from-[#10110F]/5
                  via-transparent
                  to-[#10110F]/90
                "
              />

              {/* Gold Overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-tr
                  from-[#C9A227]/10
                  via-transparent
                  to-transparent
                  opacity-60
                "
              />

              {/* =================================================
                  TOP BRAND BADGE
              ================================================== */}

              <div
                className="
                  absolute
                  left-3
                  top-3
                  sm:left-5
                  sm:top-5
                  lg:left-6
                  lg:top-6
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-[#10110F]/60
                    px-2.5
                    py-1.5
                    shadow-[0_8px_25px_rgba(0,0,0,0.18)]
                    backdrop-blur-md
                    sm:px-3.5
                    sm:py-2
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-[#D7B63F]
                      shadow-[0_0_10px_rgba(215,182,63,0.7)]
                      sm:h-2
                      sm:w-2
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      sm:text-[9px]
                    "
                  >
                    Saam Infrastructure
                  </span>
                </div>
              </div>

              {/* =================================================
                  IMAGE DECORATION
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-4
                  h-12
                  w-12
                  rounded-full
                  border
                  border-[#DDBE4A]/35
                  sm:right-6
                  sm:top-6
                  sm:h-16
                  sm:w-16
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  right-7
                  top-7
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#DDBE4A]
                  sm:right-9
                  sm:top-9
                "
              />

              {/* =================================================
                  IMAGE BOTTOM CONTENT
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  p-4
                  sm:p-6
                  lg:p-8
                "
              >
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#DDBE4A]
                    sm:text-[10px]
                    lg:text-xs
                  "
                >
                  Built to stand strong
                </p>

                <div
                  className="
                    mt-2
                    flex
                    items-start
                    gap-2.5
                    sm:mt-3
                    sm:items-center
                    sm:gap-3
                  "
                >
                  <span
                    className="
                      mt-2
                      h-[2px]
                      w-6
                      shrink-0
                      bg-[#C9A227]
                      sm:mt-0
                      sm:w-9
                    "
                  />

                  <p
                    className="
                      max-w-[90%]
                      text-lg
                      font-bold
                      leading-tight
                      text-white
                      sm:text-2xl
                      lg:text-[1.7rem]
                    "
                  >
                    Strength in every detail.
                  </p>
                </div>
              </div>

              {/* Bottom Gold Line */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-20
                  bg-[#C9A227]
                  sm:w-28
                "
              />
            </div>
          </div>

          {/* =================================================
              DARK CONTENT PANEL
          ================================================== */}

          <div
            className="
              relative
              z-20
              min-w-0
              overflow-hidden
              rounded-[23px]
              bg-[#171815]
              p-5
              text-white
              shadow-[0_20px_50px_rgba(15,16,14,0.17)]
              sm:rounded-[30px]
              sm:p-7
              lg:flex
              lg:min-h-[540px]
              lg:flex-col
              lg:justify-center
              lg:rounded-l-none
              lg:rounded-r-[34px]
              lg:p-8
              xl:p-10
            "
          >

            {/* Decorative Circle - Top */}

            <div
              className="
                pointer-events-none
                absolute
                -right-14
                -top-14
                h-36
                w-36
                rounded-full
                border
                border-[#C9A227]/15
                sm:h-44
                sm:w-44
              "
            />

            {/* Decorative Circle - Bottom */}

            <div
              className="
                pointer-events-none
                absolute
                -bottom-16
                -left-16
                h-44
                w-44
                rounded-full
                border
                border-[#C9A227]/10
              "
            />

            {/* =================================================
                WHO WE ARE
            ================================================== */}

            <div
              className="
                relative
                z-10
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-7
                  bg-[#C9A227]
                  sm:w-9
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.23em]
                  text-[#DDBE4A]
                  sm:text-[10px]
                  md:text-xs
                "
              >
                Who We Are
              </span>
            </div>

            {/* =================================================
                TEXT
            ================================================== */}

            <div
              className="
                relative
                z-10
                mt-4
                sm:mt-5
              "
            >
              <p
                className="
                  text-[13px]
                  leading-6
                  text-slate-200
                  sm:text-[15px]
                  sm:leading-7
                  lg:text-[16px]
                  lg:leading-7
                "
              >
                Saam Infrastructure is committed to delivering
                dependable construction and infrastructure solutions
                that combine engineering expertise, quality
                workmanship and thoughtful execution.
              </p>

              <p
                className="
                  mt-3
                  text-[13px]
                  leading-6
                  text-slate-400
                  sm:mt-4
                  sm:text-sm
                  sm:leading-7
                  lg:text-[14px]
                "
              >
                From planning and development to execution and
                completion, we focus on creating durable spaces and
                infrastructure that meet the needs of our clients
                and stand the test of time.
              </p>
            </div>

            {/* =================================================
                FEATURES
            ================================================== */}

            <div
              className="
                relative
                z-10
                mt-5
                grid
                grid-cols-1
                gap-2.5
                sm:mt-7
                sm:grid-cols-2
                sm:gap-3
              "
            >
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="
                      group
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.035]
                      p-3
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#C9A227]/50
                      hover:bg-[#C9A227]/10
                      sm:rounded-2xl
                      sm:p-3.5
                    "
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3">

                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-[#C9A227]/40
                          bg-[#C9A227]/10
                          text-[#C9A227]
                          transition-all
                          duration-300
                          group-hover:bg-[#C9A227]
                          group-hover:text-[#171815]
                          sm:h-9
                          sm:w-9
                          sm:rounded-xl
                        "
                      >
                        <Icon size={16} />
                      </div>

                      {/* Content */}

                      <div className="min-w-0">
                        <h3
                          className="
                            text-[13px]
                            font-bold
                            text-white
                            sm:text-sm
                          "
                        >
                          {feature.title}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[11px]
                            leading-5
                            text-slate-400
                            sm:text-xs
                          "
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* =================================================
                CTA
            ================================================== */}

            <div
              className="
                relative
                z-10
                mt-5
                sm:mt-7
              "
            >
              <a
                href="#services"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-between
                  gap-4
                  rounded-full
                  bg-[#C9A227]
                  px-4
                  py-2.5
                  text-[13px]
                  font-bold
                  text-[#171815]
                  shadow-[0_10px_25px_rgba(201,162,39,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#E0C45C]
                  hover:shadow-[0_16px_32px_rgba(201,162,39,0.25)]
                  sm:w-fit
                  sm:justify-center
                  sm:px-5
                  sm:text-sm
                "
              >
                <span>
                  Discover Our Approach
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
                    bg-[#171815]
                    text-[#C9A227]
                    transition-all
                    duration-300
                    group-hover:rotate-45
                    sm:h-9
                    sm:w-9
                  "
                >
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>

            {/* =================================================
                BRAND LINE
            ================================================== */}

            <div
              className="
                relative
                z-10
                mt-5
                border-t
                border-white/10
                pt-4
                sm:mt-7
                sm:pt-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  sm:gap-3
                "
              >
                <span
                  className="
                    whitespace-nowrap
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-500
                    sm:text-[9px]
                  "
                >
                  Engineering
                </span>

                <span className="h-px flex-1 bg-white/10" />

                <span
                  className="
                    whitespace-nowrap
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-500
                    sm:text-[9px]
                  "
                >
                  Quality
                </span>

                <span className="h-px flex-1 bg-white/10" />

                <span
                  className="
                    whitespace-nowrap
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-500
                    sm:text-[9px]
                  "
                >
                  Trust
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM GOLD LINE
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-[2px]
          bg-[#C9A227]
        "
      />
    </section>
  );
}

export default About;