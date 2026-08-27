import {
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  ClipboardCheck,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock3,
  MessageCircle,
  Award,
} from "lucide-react";

import { Link } from "react-router-dom";

/* =========================================================
   SERVICES DATA
========================================================= */

const services = [
  {
    id: 1,
    icon: Building2,
    title: "Civil Construction",
    description:
      "Complete civil construction solutions delivered with quality workmanship, proper planning and dependable execution.",
    points: [
      "Structural construction",
      "Building development",
      "Site development",
      "Quality-controlled execution",
    ],
  },

  {
    id: 2,
    icon: Building2,
    title: "Commercial Projects",
    description:
      "Modern commercial construction solutions designed around functionality, durability and the specific requirements of every business.",
    points: [
      "Commercial buildings",
      "Office spaces",
      "Retail developments",
      "Project coordination",
    ],
  },

  {
    id: 3,
    icon: Home,
    title: "Residential Construction",
    description:
      "Thoughtfully planned residential construction focused on safety, comfort, quality and long-term value.",
    points: [
      "Residential buildings",
      "Individual homes",
      "Housing development",
      "Renovation work",
    ],
  },

  {
    id: 4,
    icon: Landmark,
    title: "Infrastructure Development",
    description:
      "Reliable infrastructure development services supported by careful planning, responsible execution and attention to detail.",
    points: [
      "Infrastructure projects",
      "Site development",
      "Civil works",
      "Project execution",
    ],
  },

  {
    id: 5,
    icon: Factory,
    title: "Industrial Construction",
    description:
      "Robust industrial construction solutions developed with a focus on performance, safety and operational requirements.",
    points: [
      "Industrial facilities",
      "Structural works",
      "Site development",
      "Safety-focused execution",
    ],
  },

  {
    id: 6,
    icon: Wrench,
    title: "Renovation & Development",
    description:
      "Renovation and development services that improve existing spaces while maintaining structural integrity and functionality.",
    points: [
      "Building renovation",
      "Structural improvements",
      "Space development",
      "Modernization",
    ],
  },

  {
    id: 7,
    icon: ClipboardCheck,
    title: "Engineering & Project Management",
    description:
      "Professional project coordination and management focused on planning, quality control, timelines and successful delivery.",
    points: [
      "Project planning",
      "Execution monitoring",
      "Quality management",
      "Coordination",
    ],
  },
];

/* =========================================================
   WHY CHOOSE US DATA
========================================================= */

const advantages = [
  {
    number: "01",
    icon: Award,
    title: "Quality Workmanship",
    text:
      "We maintain high standards of workmanship and attention to detail throughout every stage of construction.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Safety First",
    text:
      "Safety remains an important part of our planning, site management and project execution.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Transparent Communication",
    text:
      "We maintain clear and consistent communication with clients throughout the complete project lifecycle.",
  },
  {
    number: "04",
    icon: Clock3,
    title: "Timely Execution",
    text:
      "Careful planning and coordination help us maintain dependable project progress and delivery.",
  },
];

/* =========================================================
   SERVICES PAGE
========================================================= */

function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ed] text-[#070b1c]">

      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <section
        className="
          relative overflow-hidden
          border-b border-[#e5dbc3]
          bg-[#f8f5ed]
          px-5
          pb-20
          pt-24
          sm:px-6
          sm:pb-24
          sm:pt-28
          lg:px-8
          lg:pb-28
          lg:pt-32
          xl:pb-32
        "
      >

        {/* BACKGROUND DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            -top-40
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#c9a03b]/10
            blur-3xl
            sm:h-[450px]
            sm:w-[450px]
            lg:h-[600px]
            lg:w-[600px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-[350px]
            w-[350px]
            rounded-full
            bg-[#c9a03b]/5
            blur-3xl
            sm:h-[450px]
            sm:w-[450px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-8
            top-1/2
            hidden
            h-48
            w-px
            -translate-y-1/2
            bg-gradient-to-b
            from-transparent
            via-[#c9a03b]/50
            to-transparent
            lg:block
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-20
            top-28
            hidden
            h-24
            w-24
            rotate-45
            border
            border-[#c9a03b]/15
            lg:block
          "
        />

        <div className="relative mx-auto max-w-7xl">

          {/* LABEL */}

          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">

            <span
              className="
                h-[3px]
                w-10
                shrink-0
                bg-[#c9a03b]
                sm:w-16
                lg:w-24
              "
            />

            <p
              className="
                text-[clamp(2rem,6vw,4.8rem)]
                font-black
                uppercase
                leading-[0.9]
                tracking-[0.08em]
                text-[#b28a20]
                sm:tracking-[0.1em]
                lg:tracking-[0.12em]
              "
            >
              Our Services
            </p>

          </div>

          {/* HERO HEADING */}

          <h1
            className="
              mt-7
              max-w-5xl
              text-[clamp(2.35rem,5vw,4.8rem)]
              font-black
              leading-[1.02]
              tracking-[-0.04em]
              text-[#070b1c]
              sm:mt-9
              lg:mt-11
            "
          >
            Construction solutions
            <span className="block text-[#a9925e]">
              built around your needs.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <div
            className="
              mt-8
              flex
              max-w-3xl
              items-stretch
              gap-4
              sm:mt-10
              sm:gap-5
              lg:mt-12
            "
          >

            <span className="w-[3px] shrink-0 bg-[#c9a03b]" />

            <p
              className="
                text-sm
                leading-7
                text-[#36506e]
                sm:text-base
                sm:leading-8
                lg:text-lg
                lg:leading-9
              "
            >
              From civil construction and residential development to
              infrastructure and project management, Saam Infrastructure
              provides dependable solutions focused on quality, safety and
              long-term value.
            </p>

          </div>

          {/* HERO ACCENT */}

          <div className="mt-10 flex items-center gap-2 sm:mt-12">

            <span className="h-1 w-12 rounded-full bg-[#c9a03b] sm:w-16" />
            <span className="h-1 w-2 rounded-full bg-[#c9a03b]/40" />
            <span className="h-1 w-2 rounded-full bg-[#c9a03b]/20" />

          </div>

        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-white
          px-5
          py-20
          sm:px-6
          sm:py-24
          lg:px-8
          lg:py-32
        "
      >

        {/* BACKGROUND NUMBER */}

        <span
          className="
            pointer-events-none
            absolute
            -right-5
            top-0
            hidden
            select-none
            text-[16rem]
            font-black
            leading-none
            text-[#c9a03b]/[0.035]
            lg:block
          "
        >
          01
        </span>

        <div className="relative mx-auto max-w-7xl">

          {/* SECTION TOP */}

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-4">

                <span className="h-[3px] w-12 bg-[#c9a03b] sm:w-16" />

                <p
                  className="
                    text-sm
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-[#b28a20]
                    sm:text-base
                  "
                >
                  What We Do
                </p>

              </div>

              <h2
                className="
                  mt-6
                  max-w-xl
                  text-[clamp(2.2rem,4vw,4rem)]
                  font-black
                  leading-[1.03]
                  tracking-[-0.04em]
                  text-[#070b1c]
                "
              >
                Reliable solutions
                <span className="block text-[#a9925e]">
                  from planning to completion.
                </span>
              </h2>

            </div>

            {/* RIGHT */}

            <div>

              <div
                className="
                  rounded-[1.5rem]
                  border
                  border-[#e6ddca]
                  bg-[#f8f5ed]
                  p-6
                  sm:p-8
                  lg:p-10
                "
              >

                <div className="mb-5 flex items-center gap-3">

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a03b] text-[#070b1c]">
                    <Sparkles size={17} />
                  </span>

                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#92751c]">
                    Built with purpose
                  </span>

                </div>

                <p
                  className="
                    text-base
                    leading-8
                    text-[#36506e]
                    sm:text-lg
                    sm:leading-9
                  "
                >
                  We combine practical experience, technical knowledge and
                  responsible project execution to deliver construction and
                  infrastructure solutions that meet our clients&apos;
                  requirements.
                </p>

                <p
                  className="
                    mt-5
                    text-sm
                    leading-7
                    text-[#64748b]
                    sm:text-base
                  "
                >
                  Every project is approached with attention to quality,
                  coordination, safety and long-term performance.
                </p>

              </div>

            </div>

          </div>

          {/* VALUE STRIP */}

          <div
            className="
              mt-12
              grid
              overflow-hidden
              rounded-[1.5rem]
              border
              border-[#e4dac4]
              sm:grid-cols-3
            "
          >

            <WhatWeDoItem
              number="01"
              title="Plan"
              text="Clear planning before execution."
            />

            <WhatWeDoItem
              number="02"
              title="Build"
              text="Quality-focused project execution."
            />

            <WhatWeDoItem
              number="03"
              title="Deliver"
              text="Dependable results built to last."
            />

          </div>

        </div>
      </section>

      {/* =====================================================
          OUR EXPERTISE
      ===================================================== */}

      <section
        className="
          border-y
          border-[#e5dbc3]
          bg-[#f8f5ed]
          px-5
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
          lg:py-32
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div
            className="
              mb-12
              flex
              flex-col
              gap-8
              sm:mb-14
              lg:mb-16
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div>

              <div className="flex items-center gap-4">

                <span className="h-[3px] w-12 bg-[#c9a03b] sm:w-16" />

                <p
                  className="
                    text-sm
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-[#b28a20]
                    sm:text-base
                  "
                >
                  Our Expertise
                </p>

              </div>

              <h2
                className="
                  mt-6
                  max-w-3xl
                  text-[clamp(2.2rem,4vw,4rem)]
                  font-black
                  leading-[1.04]
                  tracking-[-0.04em]
                  text-[#070b1c]
                "
              >
                Construction services
                <span className="block text-[#a9925e]">
                  built for real requirements.
                </span>
              </h2>

            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-7
                text-[#64748b]
                sm:text-base
                sm:leading-8
              "
            >
              From residential projects to large infrastructure works, our
              services are structured around practical execution, quality and
              long-term performance.
            </p>

          </div>

          {/* SERVICE GRID */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-[#dfd5bf]
                    bg-white
                    p-6
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-[#c9a03b]
                    hover:shadow-[0_25px_60px_rgba(7,11,28,0.10)]
                    sm:p-7
                    lg:p-8
                  "
                >

                  {/* GOLD TOP LINE */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-1
                      w-16
                      rounded-br-full
                      bg-[#c9a03b]
                      transition-all
                      duration-500
                      group-hover:w-32
                    "
                  />

                  {/* LARGE NUMBER */}

                  <span
                    className="
                      pointer-events-none
                      absolute
                      -right-3
                      -top-5
                      text-[7rem]
                      font-black
                      leading-none
                      text-[#c9a03b]/[0.055]
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                  >
                    {String(service.id).padStart(2, "0")}
                  </span>

                  {/* ICON */}

                  <div
                    className="
                      relative
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#c9a03b]
                      bg-[#f8f5ed]
                      text-[#b28a20]
                      transition-all
                      duration-500
                      group-hover:rotate-3
                      group-hover:bg-[#c9a03b]
                      group-hover:text-white
                    "
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  {/* NUMBER */}

                  <p
                    className="
                      relative
                      mt-7
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.22em]
                      text-[#b28a20]
                    "
                  >
                    Service {String(service.id).padStart(2, "0")}
                  </p>

                  {/* TITLE */}

                  <h3
                    className="
                      relative
                      mt-3
                      text-xl
                      font-black
                      leading-tight
                      text-[#070b1c]
                      sm:text-2xl
                    "
                  >
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      relative
                      mt-4
                      text-sm
                      leading-7
                      text-[#64748b]
                      sm:text-base
                    "
                  >
                    {service.description}
                  </p>

                  {/* FEATURES */}

                  <div
                    className="
                      mt-7
                      space-y-3
                      border-t
                      border-[#e7dfcf]
                      pt-6
                    "
                  >

                    {service.points.map((point) => (

                      <div
                        key={point}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          size={17}
                          className="
                            mt-0.5
                            shrink-0
                            text-[#c9a03b]
                          "
                        />

                        <span
                          className="
                            text-sm
                            leading-6
                            text-[#5f6f7f]
                          "
                        >
                          {point}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* =================================================
                      FIXED FOOTER NAVIGATION
                      ENTIRE FOOTER IS NOW CLICKABLE
                  ================================================= */}

                  <Link
                    to="/"
                    aria-label="Go to Saam Infrastructure home page"
                    className="
                      group/footer
                      mt-8
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-between
                      border-t
                      border-[#e7dfcf]
                      pt-5
                      no-underline
                    "
                  >

                    {/* BRAND */}

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-[#94a3b8]
                        transition-colors
                        duration-300
                        group-hover/footer:text-[#b28a20]
                        sm:text-xs
                      "
                    >
                      Saam Infrastructure
                    </span>

                    {/* ARROW */}

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d8c58f]
                        text-[#b28a20]
                        transition-all
                        duration-300
                        group-hover/footer:border-[#c9a03b]
                        group-hover/footer:bg-[#c9a03b]
                        group-hover/footer:text-white
                        group-hover/footer:translate-x-1
                        group-hover/footer:-translate-y-1
                      "
                    >
                      <ArrowUpRight size={17} />
                    </span>

                  </Link>

                </article>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#070b1c]
          px-5
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
          lg:py-32
        "
      >

        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-[#c9a03b]/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-96
            w-96
            rounded-full
            bg-[#c9a03b]/5
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl">

          {/* TOP CONTENT */}

          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

            {/* LEFT */}

            <div>

              <div className="flex items-center gap-4">

                <span className="h-[3px] w-12 bg-[#c9a03b] sm:w-16" />

                <p
                  className="
                    text-sm
                    font-black
                    uppercase
                    tracking-[0.3em]
                    text-[#d7b44d]
                    sm:text-base
                  "
                >
                  Why Choose Us
                </p>

              </div>

              <h2
                className="
                  mt-6
                  text-[clamp(2.2rem,4vw,4rem)]
                  font-black
                  leading-[1.04]
                  tracking-[-0.04em]
                  text-white
                "
              >
                A dependable partner
                <span className="block text-[#d7b44d]">
                  for your next project.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-md
                  text-sm
                  leading-7
                  text-slate-300
                  sm:text-base
                  sm:leading-8
                "
              >
                We believe successful construction is built on trust,
                communication, quality and responsible execution.
              </p>

              {/* MINI LINE */}

              <div className="mt-8 flex items-center gap-2">

                <span className="h-1 w-14 rounded-full bg-[#c9a03b]" />
                <span className="h-1 w-2 rounded-full bg-[#c9a03b]/50" />
                <span className="h-1 w-2 rounded-full bg-[#c9a03b]/25" />

              </div>

            </div>

            {/* RIGHT CARDS */}

            <div className="grid gap-4 sm:grid-cols-2">

              {advantages.map((item) => {

                const Icon = item.icon;

                return (
                  <WhyChooseCard
                    key={item.number}
                    number={item.number}
                    icon={Icon}
                    title={item.title}
                    text={item.text}
                  />
                );
              })}

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-t
          border-[#2d5146]
          bg-[#f8f5ed]
          px-5
          py-16
          sm:px-6
          sm:py-20
          lg:px-8
          lg:py-24
        "
      >

        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-[#c9a03b]/10
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl">

          <div
            className="
              flex
              flex-col
              gap-8
              rounded-[2rem]
              border
              border-[#dfd5bf]
              bg-[#070b1c]
              p-7
              sm:p-10
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:p-12
            "
          >

            {/* CONTENT */}

            <div>

              <div className="flex items-center gap-3">

                <Sparkles
                  size={16}
                  className="text-[#d7b44d]"
                />

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-[#d7b44d]
                    sm:text-sm
                  "
                >
                  Start Your Project
                </p>

              </div>

              <h2
                className="
                  mt-4
                  text-3xl
                  font-black
                  leading-tight
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Let&apos;s build something great
                <span className="block text-[#d7b44d]">
                  together.
                </span>
              </h2>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-300
                  sm:text-base
                "
              >
                Tell us about your construction or infrastructure requirements
                and our team will be ready to discuss the next steps.
              </p>

            </div>

            {/* BUTTON */}

            <Link
              to="/contact"
              className="
                group
                inline-flex
                w-full
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#c9a03b]
                bg-[#c9a03b]
                px-6
                py-3
                text-sm
                font-bold
                text-[#070b1c]
                shadow-[0_12px_30px_rgba(201,160,59,0.20)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#d7b44d]
                sm:w-fit
                sm:px-7
              "
            >
              Discuss Your Project

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#070b1c]
                  text-white
                  transition-all
                  duration-300
                  group-hover:rotate-45
                  group-hover:bg-white
                  group-hover:text-[#070b1c]
                "
              >
                <ArrowUpRight size={17} />
              </span>

            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

/* =========================================================
   WHAT WE DO ITEM
========================================================= */

function WhatWeDoItem({ number, title, text }) {
  return (
    <div
      className="
        group
        relative
        border-b
        border-[#e4dac4]
        bg-[#f8f5ed]
        p-6
        transition-all
        duration-300
        hover:bg-white
        sm:border-b-0
        sm:border-r
        sm:last:border-r-0
        sm:p-7
        lg:p-8
      "
    >

      <div className="flex items-start justify-between">

        <span
          className="
            text-xs
            font-black
            tracking-[0.2em]
            text-[#b28a20]
          "
        >
          {number}
        </span>

        <ArrowUpRight
          size={18}
          className="
            text-[#b28a20]
            transition-transform
            duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
          "
        />

      </div>

      <h3 className="mt-6 text-xl font-black text-[#070b1c]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#64748b]">
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   WHY CHOOSE US CARD
========================================================= */

function WhyChooseCard({
  number,
  icon: Icon,
  title,
  text,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[1.5rem]
        border
        border-white/10
        bg-white/[0.045]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#c9a03b]/60
        hover:bg-white/[0.08]
        sm:p-7
      "
    >

      {/* BACKGROUND NUMBER */}

      <span
        className="
          pointer-events-none
          absolute
          -right-2
          -top-5
          text-7xl
          font-black
          leading-none
          text-[#d7b44d]/[0.06]
          transition-transform
          duration-500
          group-hover:scale-110
        "
      >
        {number}
      </span>

      {/* ICON + NUMBER */}

      <div className="relative flex items-center justify-between">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-[#c9a03b]/50
            bg-[#c9a03b]/10
            text-[#d7b44d]
            transition-all
            duration-300
            group-hover:bg-[#c9a03b]
            group-hover:text-[#070b1c]
          "
        >
          <Icon size={21} strokeWidth={1.8} />
        </div>

        <span
          className="
            text-xs
            font-black
            tracking-[0.2em]
            text-[#d7b44d]
          "
        >
          {number}
        </span>

      </div>

      {/* TITLE */}

      <h3
        className="
          relative
          mt-6
          text-xl
          font-black
          leading-tight
          text-white
        "
      >
        {title}
      </h3>

      {/* TEXT */}

      <p
        className="
          relative
          mt-3
          text-sm
          leading-7
          text-slate-400
          sm:text-base
        "
      >
        {text}
      </p>

      {/* BOTTOM LINE */}

      <div className="relative mt-6 flex items-center gap-2">

        <span
          className="
            h-1
            w-8
            rounded-full
            bg-[#c9a03b]
            transition-all
            duration-500
            group-hover:w-14
          "
        />

        <span className="h-1 w-2 rounded-full bg-[#c9a03b]/30" />

        <span className="h-1 w-2 rounded-full bg-[#c9a03b]/15" />

      </div>

    </div>
  );
}

export default ServicesPage;