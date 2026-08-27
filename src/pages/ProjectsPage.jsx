import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  FolderKanban,
  Sparkles,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import { useState } from "react";

import projects from "../data/projects";

const filters = [
  "All",
  "Commercial",
  "Residential",
  "Infrastructure",
  "Industrial",
  "Renovation",
];

function getStatusClass(status) {
  const value = String(status || "").toLowerCase();

  if (value.includes("completed")) {
    return "border-green-200 bg-green-50 text-green-700";
  }

  if (value.includes("ongoing")) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-[#E6D49A] bg-[#FFF9E8] text-[#92751C]";
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F7F2] pt-[88px] text-[#252621]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#DDD9CC] bg-[#F1EFE7]">

        {/* Decorative background */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-64
            w-64
            rounded-full
            bg-[#C9A227]/10
            blur-3xl
            sm:h-96
            sm:w-96
            lg:h-[520px]
            lg:w-[520px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-72
            w-72
            rounded-full
            bg-[#C9A227]/5
            blur-3xl
            sm:h-[420px]
            sm:w-[420px]
          "
        />

        <span
          className="
            pointer-events-none
            absolute
            -right-8
            bottom-[-50px]
            hidden
            select-none
            text-[15rem]
            font-black
            leading-none
            text-[#C9A227]/[0.035]
            lg:block
            xl:text-[20rem]
          "
        >
          01
        </span>

        <div
          className="
            pointer-events-none
            absolute
            right-12
            top-1/2
            hidden
            h-40
            w-px
            -translate-y-1/2
            bg-gradient-to-b
            from-transparent
            via-[#C9A227]/50
            to-transparent
            lg:block
          "
        />

        {/* Hero content */}

        <div
  className="
    relative
    mx-auto
    max-w-7xl
    px-5
    pb-12
    pt-10
    sm:px-6
    sm:pb-14
    sm:pt-12
    md:pb-16
    md:pt-14
    lg:px-8
    lg:pb-18
    lg:pt-16
  "
>

          <div className="max-w-6xl">

            {/* Small Label */}

            <div className="flex items-center gap-3 sm:gap-5">

              <span
                className="
                  h-[3px]
                  w-10
                  shrink-0
                  rounded-full
                  bg-[#C9A227]
                  sm:h-[4px]
                  sm:w-20
                  lg:w-28
                "
              />

              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-[#A98216]
                  sm:text-base
                  sm:tracking-[0.32em]
                "
              >
                Our Portfolio
              </span>

            </div>

            {/* =================================================
    MAIN H1
    OUR PROJECTS
    ================================================= */}

<h1
  className="
    mt-5
    text-4xl
    font-black
    uppercase
    leading-[0.95]
    tracking-[-0.04em]
    text-[#A98216]
    sm:mt-6
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    xl:text-7xl
  "
>
  Our Projects
</h1>

{/* =================================================
    SUPPORTING H2
    PROJECTS BUILT WITH PURPOSE
    ================================================= */}

<div
  className="
    mt-7
    max-w-3xl
    sm:mt-8
    md:mt-9
    lg:mt-10
  "
>
  <h2
    className="
      text-3xl
      font-black
      leading-[1.05]
      tracking-[-0.035em]
      text-[#171815]
      sm:text-4xl
      md:text-[2.65rem]
      lg:text-5xl
    "
  >
    Projects built with

    <span className="block text-[#C9A227]">
      purpose.
    </span>
  </h2>
</div>

            {/* Description */}

            <div
  className="
    mt-6
    flex
    max-w-2xl
    items-stretch
    gap-3
    sm:mt-7
    sm:gap-4
    lg:mt-8
  "
>
  <span className="w-[3px] shrink-0 rounded-full bg-[#C9A227]" />

  <p
    className="
      text-sm
      leading-6
      text-[#686961]
      sm:text-base
      sm:leading-7
      lg:text-lg
      lg:leading-8
    "
  >
    Explore our construction and infrastructure projects
    delivered with precision, quality workmanship and
    dependable execution.
  </p>
</div>

            {/* Accent */}

            <div className="mt-8 flex items-center gap-2 sm:mt-10">

              <span className="h-1 w-12 rounded-full bg-[#C9A227] sm:w-16" />

              <span className="h-1 w-3 rounded-full bg-[#C9A227]/50" />

              <span className="h-1 w-2 rounded-full bg-[#C9A227]/25" />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section
        className="
          sticky
          top-[88px]
          z-30
          border-b
          border-[#DDD9CC]
          bg-[#F8F7F2]/95
          shadow-[0_5px_20px_rgba(23,24,21,0.04)]
          backdrop-blur-md
        "
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div
            className="
              flex
              gap-2
              overflow-x-auto
              py-4
              scrollbar-none
              sm:flex-wrap
              sm:gap-3
              sm:overflow-visible
              sm:py-5
            "
          >

            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    shrink-0
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    transition-all
                    duration-300
                    active:scale-95
                    sm:px-6
                    sm:py-3
                    sm:text-sm

                    ${
                      isActive
                        ? `
                          border-[#C9A227]
                          bg-[#C9A227]
                          text-[#171815]
                          shadow-[0_8px_20px_rgba(201,162,39,0.20)]
                        `
                        : `
                          border-[#DDD9CC]
                          bg-white
                          text-[#686961]
                          hover:border-[#C9A227]
                          hover:text-[#A98216]
                          hover:shadow-sm
                        `
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          PORTFOLIO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#F8F7F2]
          px-5
          py-14
          sm:px-6
          sm:py-18
          lg:px-8
          lg:py-24
        "
      >

        {/* Background decoration */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-150px]
            top-40
            h-72
            w-72
            rounded-full
            bg-[#C9A227]/[0.035]
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl">

          {/* Portfolio heading */}

          <div
            className="
              mb-9
              flex
              flex-col
              gap-5
              sm:mb-12
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div className="flex items-center gap-3">

              <span
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#E0C45C]
                  bg-white
                  text-[#A98216]
                  shadow-[0_8px_20px_rgba(23,24,21,0.05)]
                "
              >
                <FolderKanban size={19} />
              </span>

              <div>

                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-[#A98216]
                  "
                >
                  Our Portfolio
                </p>

                <p className="mt-1 text-sm font-semibold text-[#686961]">
                  {filteredProjects.length}{" "}
                  {filteredProjects.length === 1
                    ? "Project"
                    : "Projects"}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <CircleDot
                size={13}
                className="text-[#C9A227]"
              />

              <span
                className="
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#999990]
                "
              >
                {activeFilter}
              </span>

            </div>

          </div>

          {/* Project grid */}

          {filteredProjects.length > 0 ? (

            <div
              className="
                grid
                gap-7
                sm:gap-8
                md:grid-cols-2
                lg:grid-cols-3
              "
            >

              {filteredProjects.map((project) => (

                <article
                  key={project.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-[#E1DDD1]
                    bg-white
                    shadow-[0_10px_35px_rgba(23,24,21,0.045)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-[#C9A227]
                    hover:shadow-[0_28px_65px_rgba(23,24,21,0.12)]
                  "
                >

                  {/* Gold corner accent */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-0
                      top-0
                      z-10
                      h-16
                      w-16
                      rounded-bl-[2rem]
                      bg-[#C9A227]/10
                      transition-all
                      duration-500
                      group-hover:h-20
                      group-hover:w-20
                    "
                  />

                  {/* IMAGE */}

                  <div
                    className="
                      relative
                      h-[230px]
                      overflow-hidden
                      sm:h-[275px]
                    "
                  >

                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    {/* Image overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#10110F]/90
                        via-[#171815]/25
                        to-transparent
                      "
                    />

                    {/* Number */}

                    <div
                      className="
                        absolute
                        left-5
                        top-5
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#E0C45C]
                        bg-[#171815]/80
                        text-sm
                        font-black
                        text-[#E0C45C]
                        shadow-lg
                        backdrop-blur-md
                        transition-all
                        duration-300
                        group-hover:bg-[#C9A227]
                        group-hover:text-[#171815]
                      "
                    >
                      {String(project.id).padStart(2, "0")}
                    </div>

                    {/* Category */}

                    <div
                      className="
                        absolute
                        bottom-5
                        left-5
                        right-5
                        flex
                        items-end
                        justify-between
                        gap-3
                      "
                    >

                      <span
                        className="
                          rounded-full
                          border
                          border-[#E0C45C]
                          bg-[#C9A227]
                          px-4
                          py-2
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.14em]
                          text-[#171815]
                          shadow-lg
                          sm:text-xs
                        "
                      >
                        {project.category}
                      </span>

                      <span
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/30
                          bg-black/25
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-300
                          group-hover:rotate-45
                          group-hover:bg-[#C9A227]
                          group-hover:text-[#171815]
                        "
                      >
                        <ArrowUpRight size={17} />
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5 sm:p-7">

                    {/* Status */}

                    <div className="mb-4 flex items-center justify-between">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          px-3
                          py-1.5
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          ${getStatusClass(project.status)}
                        `}
                      >

                        {String(project.status)
                          .toLowerCase()
                          .includes("completed") ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <CircleDot size={12} />
                        )}

                        {project.status}

                      </span>

                      <span
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          text-[#B1AEA3]
                        "
                      >
                        #{String(project.id).padStart(2, "0")}
                      </span>

                    </div>

                    {/* Title */}

                    <h2
                      className="
                        text-xl
                        font-black
                        leading-[1.15]
                        tracking-tight
                        text-[#252621]
                        transition-colors
                        duration-300
                        group-hover:text-[#A98216]
                        sm:text-2xl
                      "
                    >
                      {project.title}
                    </h2>

                    {/* Description */}

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-7
                        text-[#686961]
                      "
                    >
                      {project.shortDescription}
                    </p>

                    {/* Divider */}

                    <div
                      className="
                        my-6
                        h-px
                        bg-[#E5E1D7]
                      "
                    />

                    {/* Bottom */}

                    <div className="flex items-center justify-between">

                      <div>

                        <p
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.25em]
                            text-[#B0ADA2]
                          "
                        >
                          Featured
                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            font-bold
                            text-[#686961]
                          "
                        >
                          Project
                        </p>

                      </div>

                      <Link
                        to={`/projects/${project.id}`}
                        className="
                          group/link
                          inline-flex
                          items-center
                          gap-2
                          text-xs
                          font-black
                          uppercase
                          tracking-[0.08em]
                          text-[#252621]
                          transition-colors
                          hover:text-[#A98216]
                          sm:text-sm
                        "
                      >

                        View Project

                        <span
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#D9D5C9]
                            bg-[#F8F7F2]
                            transition-all
                            duration-300
                            group-hover/link:border-[#C9A227]
                            group-hover/link:bg-[#C9A227]
                            group-hover/link:text-[#171815]
                          "
                        >
                          <ArrowUpRight
                            size={16}
                            className="
                              transition-transform
                              duration-300
                              group-hover/link:-translate-y-1
                              group-hover/link:translate-x-1
                            "
                          />
                        </span>

                      </Link>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div
              className="
                rounded-[2rem]
                border
                border-[#DDD9CC]
                bg-white
                px-5
                py-20
                text-center
                shadow-sm
              "
            >

              <h2 className="text-2xl font-black text-[#252621]">
                No projects found
              </h2>

              <p className="mt-3 text-[#686961]">
                Projects for this category will be displayed here.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          CTA - HAVE A PROJECT IN MIND
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-[#2A2B27]
          bg-[#151613]
        "
      >

        {/* Decorative gold glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#C9A227]/10
            blur-3xl
            sm:h-96
            sm:w-96
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-64
            w-64
            rounded-full
            bg-[#C9A227]/5
            blur-3xl
          "
        />

        {/* Decorative border */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-1
            w-full
            bg-gradient-to-r
            from-transparent
            via-[#C9A227]
            to-transparent
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            py-16
            sm:px-6
            sm:py-20
            lg:px-8
            lg:py-24
          "
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-white/[0.025]
              px-6
              py-8
              shadow-[0_30px_80px_rgba(0,0,0,0.20)]
              sm:px-10
              sm:py-10
              lg:px-12
              lg:py-12
            "
          >

            {/* Inner gold accent */}

            <div
              className="
                absolute
                left-0
                top-0
                h-full
                w-1
                bg-[#C9A227]
              "
            />

            <div
              className="
                flex
                flex-col
                gap-8
                lg:flex-row
                lg:items-center
                lg:justify-between
                lg:gap-12
              "
            >

              {/* CTA Content */}

              <div className="max-w-2xl">

                {/* Small label */}

                <div className="flex items-center gap-3">

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#C9A227]/10
                      text-[#C9A227]
                    "
                  >
                    <Sparkles size={16} />
                  </span>

                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-[#C9A227]
                      sm:text-xs
                    "
                  >
                    Have a project in mind?
                  </p>

                </div>

                {/* Heading */}

                <h2
                  className="
                    mt-5
                    text-[clamp(2.2rem,5vw,4.2rem)]
                    font-black
                    leading-[1]
                    tracking-[-0.045em]
                    text-[#F8F7F2]
                  "
                >
                  Let&apos;s build

                  <span className="block text-[#C9A227]">
                    something great.
                  </span>
                </h2>

                {/* Description */}

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-sm
                    leading-7
                    text-[#B8B8AF]
                    sm:text-base
                    sm:leading-8
                  "
                >
                  Talk to our team about your construction,
                  infrastructure or project management requirements.
                  We&apos;re ready to turn your vision into reality.
                </p>

                {/* Small trust points */}

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-x-6
                    gap-y-3
                  "
                >

                  <div className="flex items-center gap-2">

                    <CheckCircle2
                      size={15}
                      className="text-[#C9A227]"
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                        text-[#B8B8AF]
                      "
                    >
                      Quality Execution
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <CheckCircle2
                      size={15}
                      className="text-[#C9A227]"
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                        text-[#B8B8AF]
                      "
                    >
                      Reliable Delivery
                    </span>

                  </div>

                </div>

              </div>

              {/* CTA Button */}

              <div className="shrink-0">

                <Link
                  to="/contact"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    rounded-full
                    border
                    border-[#C9A227]
                    bg-[#C9A227]
                    px-5
                    py-3
                    font-black
                    text-[#171815]
                    shadow-[0_15px_40px_rgba(201,162,39,0.20)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#E0C45C]
                    hover:bg-[#E0C45C]
                    hover:shadow-[0_20px_50px_rgba(201,162,39,0.28)]
                    sm:w-fit
                    sm:px-6
                    sm:py-3.5
                  "
                >

                  <span className="text-sm sm:text-base">
                    Discuss Your Project
                  </span>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#171815]
                      text-white
                      transition-all
                      duration-300
                      group-hover:rotate-45
                      group-hover:bg-white
                      group-hover:text-[#171815]
                    "
                  >
                    <ArrowUpRight size={18} />
                  </span>

                </Link>

                <p
                  className="
                    mt-3
                    text-center
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#77786F]
                    sm:text-left
                  "
                >
                  Start your conversation today
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProjectsPage;