import { useEffect, useRef } from "react";

import {
  CheckCircle2,
  Eye,
  Target,
  ArrowUpRight,
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  Handshake,
  TrendingUp,
} from "lucide-react";

import aboutConstruction from "../assets/images/about-construction.jpg";

/* =========================================================
   LEADERSHIP DATA
========================================================= */

const leaders = [
  {
    name: "Sachin Lihitkar",
    role: "Managing Director & Founder",
    image: "https://i.pravatar.cc/900?img=12",
    imagePosition: "center center",
    description:
      "Leading Saam Infrastructure with a clear vision for quality construction, professional execution and long-term growth.",
    statement:
      "With a strong focus on quality, client satisfaction and responsible execution, Sachin provides strategic direction across projects and ensures that every decision reflects the values of reliability, safety and integrity.",
  },
  {
    name: "Ashwini Lihitkar",
    role: "Co-Founder",
    image: "https://i.pravatar.cc/900?img=47",
    imagePosition: "center center",
    description:
      "Supporting the growth of Saam Infrastructure through coordination, strong values and a commitment to dependable project delivery.",
    statement:
      "Ashwini contributes to the company's growth with a focus on collaboration, organisation and maintaining the professional standards that define the Saam Infrastructure approach.",
  },
];

/* =========================================================
   TEAM DATA
========================================================= */

const teamMembers = [
  {
    name: "Rajesh Sharma",
    role: "Project Director",
    image: "https://i.pravatar.cc/700?img=11",
    description:
      "Experienced in project planning, coordination and ensuring successful project execution.",
  },
  {
    name: "Amit Patil",
    role: "Project Manager",
    image: "https://i.pravatar.cc/700?img=13",
    description:
      "Focused on efficient project management, coordination and maintaining construction standards.",
  },
  {
    name: "Priya Deshmukh",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/700?img=47",
    description:
      "Responsible for smooth operations, team coordination and dependable project delivery.",
  },
  {
    name: "Sandeep Kulkarni",
    role: "Senior Project Engineer",
    image: "https://i.pravatar.cc/700?img=68",
    description:
      "Bringing technical expertise, attention to detail and practical engineering knowledge.",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5ED] text-[#070B1C]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#E5DBC3]
          bg-[#F8F5ED]
          px-4
          pb-16
          pt-14
          sm:px-6
          sm:pb-20
          sm:pt-20
          lg:px-8
          lg:pb-24
          lg:pt-24
          xl:pb-28
        "
      >

        {/* GOLD GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-[320px]
            w-[320px]
            rounded-full
            bg-[#C9A03B]/10
            blur-3xl
            sm:h-[480px]
            sm:w-[480px]
          "
        />

        {/* SECOND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#C9A03B]/5
            blur-3xl
          "
        />

        {/* ARCHITECTURAL GRID */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-full
            w-[38%]
            opacity-[0.035]
            [background-image:linear-gradient(#070B1C_1px,transparent_1px),linear-gradient(90deg,#070B1C_1px,transparent_1px)]
            [background-size:42px_42px]
          "
        />

        <div className="relative mx-auto max-w-7xl">

          {/* =================================================
              ABOUT US H1
          ================================================= */}

          <div className="flex items-center gap-3 sm:gap-5">

            <span
              className="
                h-[3px]
                w-8
                shrink-0
                bg-[#C9A03B]
                sm:w-14
                lg:w-20
              "
            />

            <h1
              className="
                text-[clamp(2.5rem,7vw,5.8rem)]
                font-black
                uppercase
                leading-[0.9]
                tracking-[0.06em]
                text-[#B28A20]
              "
            >
              About Us
            </h1>

          </div>

          {/* =================================================
              MAIN H2 HEADINGS
          ================================================= */}

          <div
            className="
              mt-10
              max-w-6xl
              sm:mt-12
              lg:mt-14
            "
          >

            <h2
              className="
                text-[clamp(2.2rem,5vw,4.5rem)]
                font-black
                leading-[1.04]
                tracking-[-0.04em]
                text-[#070B1C]
              "
            >
              Building with{" "}
              <span className="text-[#B28A20]">
                purpose.
              </span>
            </h2>

            <h2
              className="
                mt-5
                text-[clamp(2.2rem,5vw,4.5rem)]
                font-black
                leading-[1.04]
                tracking-[-0.04em]
                text-[#070B1C]
                sm:mt-6
              "
            >
              Delivering with precision.
            </h2>

          </div>

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

            <span className="w-[3px] shrink-0 bg-[#C9A03B]" />

            <p
              className="
                text-sm
                leading-7
                text-[#36506E]
                sm:text-base
                sm:leading-8
                lg:text-lg
                lg:leading-9
              "
            >
              Saam Infrastructure delivers dependable construction and
              infrastructure solutions with quality, precision, safety
              and long-term value at the core.
            </p>

          </div>

          {/* DECORATIVE MARKER */}

          <div className="mt-9 flex items-center gap-2 sm:mt-11">

            <span className="h-1 w-12 rounded-full bg-[#C9A03B]" />

            <span className="h-1 w-4 rounded-full bg-[#C9A03B]/35" />

            <span className="h-1 w-2 rounded-full bg-[#C9A03B]/20" />

          </div>

        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section
        className="
          bg-white
          px-4
          py-16
          sm:px-6
          sm:py-24
          lg:px-8
          lg:py-32
        "
      >

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-14
            lg:grid-cols-2
            lg:items-center
            lg:gap-20
          "
        >

          {/* IMAGE */}

          <div className="relative mx-auto w-full max-w-[620px]">

            <div
              className="
                absolute
                -bottom-5
                -right-5
                h-[88%]
                w-[88%]
                rounded-[2rem]
                rounded-tl-none
                border-2
                border-[#C9A03B]/40
                sm:-bottom-7
                sm:-right-7
              "
            />

            <div
              className="
                group
                relative
                z-10
                h-[360px]
                overflow-hidden
                rounded-[2rem]
                rounded-tl-none
                rounded-br-[4rem]
                bg-[#070B1C]
                shadow-[0_25px_60px_rgba(7,11,28,0.16)]
                sm:h-[500px]
                lg:h-[580px]
              "
            >

              <img
                src={aboutConstruction}
                alt="Saam Infrastructure construction site"
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#070B1C]/95
                  via-[#070B1C]/20
                  to-transparent
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-4
                  rounded-[1.5rem]
                  rounded-tl-none
                  border
                  border-white/20
                  sm:inset-6
                "
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">

                <div className="mb-4 h-1 w-14 bg-[#D7B44D]" />

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#D7B44D]
                    sm:text-sm
                  "
                >
                  Saam Infrastructure
                </p>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-2xl
                    font-black
                    leading-tight
                    text-white
                    sm:text-4xl
                  "
                >
                  Built to stand strong.
                </p>

              </div>

            </div>

            {/* QUALITY BADGE */}

            <div
              className="
                absolute
                -bottom-7
                left-4
                z-20
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#E3D6B8]
                bg-white
                px-4
                py-3
                shadow-[0_15px_35px_rgba(7,11,28,0.12)]
                sm:left-8
                sm:px-5
                sm:py-4
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C9A03B]
                  text-white
                "
              >
                <CheckCircle2 size={20} />
              </div>

              <div>

                <p className="text-sm font-black text-[#070B1C]">
                  Quality First
                </p>

                <p className="text-xs text-[#64748B]">
                  Every project. Every stage.
                </p>

              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div className="pt-5 lg:pt-0">

            <SectionLabel text="Who We Are" />

            <h2
              className="
                mt-5
                text-3xl
                font-black
                leading-[1.05]
                tracking-[-0.03em]
                text-[#070B1C]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Infrastructure built
              <span className="block text-[#A9925E]">
                for the future.
              </span>
            </h2>

            <p
              className="
                mt-7
                text-base
                leading-8
                text-[#36506E]
                sm:text-lg
              "
            >
              Saam Infrastructure is committed to delivering reliable
              construction and infrastructure solutions that combine
              engineering expertise, quality workmanship and thoughtful
              execution.
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#64748B]
                sm:text-base
              "
            >
              From planning and development to execution and completion,
              we focus on creating durable spaces and infrastructure that
              meet the needs of our clients and deliver lasting value.
            </p>

            <div className="mt-9 grid gap-7 sm:grid-cols-2">

              <Feature
                icon={CheckCircle2}
                title="Quality"
                text="High standards at every stage of construction."
              />

              <Feature
                icon={Award}
                title="Reliability"
                text="Dependable planning and project execution."
              />

              <Feature
                icon={ShieldCheck}
                title="Safety"
                text="Responsible practices with safety at the core."
              />

              <Feature
                icon={Target}
                title="Long-Term Value"
                text="Solutions designed for durability and performance."
              />

            </div>

            <div className="mt-10">

              <a
                href="#vision"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-between
                  gap-5
                  rounded-full
                  border
                  border-[#C9A03B]
                  bg-[#C9A03B]
                  py-2
                  pl-6
                  pr-2
                  text-sm
                  font-bold
                  text-[#070B1C]
                  shadow-[0_12px_30px_rgba(201,160,59,0.20)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#B28A20]
                  hover:text-white
                  sm:w-auto
                "
              >

                <span>
                  Our Vision & Mission
                </span>

                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#070B1C]
                    text-white
                    transition-all
                    duration-300
                    group-hover:rotate-45
                    group-hover:bg-white
                    group-hover:text-[#070B1C]
                  "
                >
                  <ArrowUpRight size={19} />
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          LEADERSHIP
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-y
          border-[#E5DBC3]
          bg-[#F8F5ED]
          px-4
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
          lg:py-32
        "
      >

        {/* BACKGROUND GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-20
            h-72
            w-72
            rounded-full
            bg-[#C9A03B]/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-0
            h-96
            w-96
            rounded-full
            bg-[#C9A03B]/5
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl">

          {/* LEADERSHIP HEADER */}

          <div className="mx-auto max-w-3xl text-center">

            <div className="flex items-center justify-center gap-3 sm:gap-4">

              <span className="h-[2px] w-8 bg-[#C9A03B] sm:w-12" />

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#B28A20]
                  sm:text-sm
                "
              >
                Leadership
              </p>

              <span className="h-[2px] w-8 bg-[#C9A03B] sm:w-12" />

            </div>

            <h2
              className="
                mt-5
                text-3xl
                font-black
                leading-[1.05]
                tracking-[-0.03em]
                text-[#070B1C]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Leadership that
              <span className="block text-[#A9925E]">
                drives excellence.
              </span>
            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#64748B]
                sm:text-base
                sm:leading-8
                lg:text-lg
              "
            >
              Strong leadership, clear vision and responsible execution
              form the foundation of Saam Infrastructure.
            </p>

          </div>

          {/* =================================================
              TWO LEADERS
          ================================================= */}

          <div
            className="
              mt-12
              grid
              gap-7
              sm:mt-16
              lg:grid-cols-2
              lg:gap-8
            "
          >

            {leaders.map((leader, index) => (
              <LeaderCard
                key={leader.name}
                leader={leader}
                index={index}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          VISION & MISSION
      ===================================================== */}

      <section
        id="vision"
        className="
          scroll-mt-20
          border-y
          border-[#E5DBC3]
          bg-white
          px-4
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
          lg:py-32
        "
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <SectionLabel text="Vision & Mission" />

            <h2
              className="
                mt-5
                text-3xl
                font-black
                leading-tight
                tracking-[-0.03em]
                text-[#070B1C]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Creating infrastructure
              <span className="block text-[#A9925E]">
                that makes a difference.
              </span>
            </h2>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#64748B]
                sm:text-base
                sm:leading-8
              "
            >
              Our vision and mission guide the way we approach every
              project, partnership and construction challenge.
            </p>

          </div>

          <div
            className="
              mt-12
              grid
              gap-6
              lg:mt-14
              lg:grid-cols-2
            "
          >

            <VisionCard
              number="01"
              icon={Eye}
              label="Our Vision"
              title="Building a stronger tomorrow."
              text="To become a trusted name in construction and infrastructure by creating high-quality, sustainable and dependable spaces that contribute to the growth and development of communities."
            />

            <VisionCard
              number="02"
              icon={Target}
              label="Our Mission"
              title="Delivering with purpose."
              text="To deliver construction and infrastructure projects with quality workmanship, responsible practices, transparent communication and dependable execution while creating lasting value for our clients."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR HISTORY
      ===================================================== */}

      <section
        className="
          border-y
          border-[#E5DBC3]
          bg-[#F8F5ED]
          px-4
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              grid
              gap-14
              lg:grid-cols-[0.75fr_1.25fr]
            "
          >

            <div>

              <SectionLabel text="Our History" />

              <h2
                className="
                  mt-5
                  text-3xl
                  font-black
                  leading-tight
                  text-[#070B1C]
                  sm:text-5xl
                "
              >
                Growing through
                <span className="block text-[#A9925E]">
                  every project.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-md
                  text-sm
                  leading-7
                  text-[#64748B]
                  sm:text-base
                "
              >
                Our journey is built around a simple commitment —
                delivering dependable construction solutions and
                building relationships that last.
              </p>

            </div>

            <div className="relative">

              <div
                className="
                  absolute
                  bottom-0
                  left-[10px]
                  top-0
                  w-[2px]
                  bg-[#DED4BD]
                "
              />

              <HistoryItem
                year="01"
                title="Foundation"
                text="Saam Infrastructure began with a focus on providing reliable construction and infrastructure solutions with quality at the centre of every project."
              />

              <HistoryItem
                year="02"
                title="Building Experience"
                text="With every project, we continued strengthening our capabilities through practical experience, responsible execution and close client collaboration."
              />

              <HistoryItem
                year="03"
                title="Expanding Capabilities"
                text="Our growing experience allowed us to take on diverse construction, development and infrastructure requirements."
              />

              <HistoryItem
                year="04"
                title="Looking Ahead"
                text="We continue to build towards a future focused on innovation, quality, sustainability and long-term value."
                last
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR APPROACH
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#E5DBC3]
          bg-white
          px-4
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
          lg:py-32
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            top-20
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#C9A03B]/[0.06]
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-7xl">

          <div
            className="
              grid
              gap-12
              lg:grid-cols-[0.72fr_1.28fr]
              lg:items-center
            "
          >

            <div>

              <SectionLabel text="Our Approach" />

              <h2
                className="
                  mt-5
                  text-3xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-[#070B1C]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Built on strong
                <span className="block text-[#A9925E]">
                  foundations.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-md
                  text-sm
                  leading-7
                  text-[#64748B]
                  sm:text-base
                  sm:leading-8
                "
              >
                Every project begins with careful planning,
                responsible execution and a clear understanding
                of our client's goals.
              </p>

              <div className="mt-8 flex items-center gap-3">

                <div className="h-1 w-16 rounded-full bg-[#C9A03B]" />

                <div className="h-1 w-5 rounded-full bg-[#C9A03B]/30" />

                <div className="h-1 w-2 rounded-full bg-[#C9A03B]/15" />

              </div>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <ApproachCard
                number="01"
                icon={Sparkles}
                title="Quality First"
                text="We maintain high standards of workmanship and attention to detail throughout every project."
              />

              <ApproachCard
                number="02"
                icon={Handshake}
                title="Client Focus"
                text="We work closely with our clients to understand their goals and deliver practical solutions."
              />

              <ApproachCard
                number="03"
                icon={Shield}
                title="Responsible Execution"
                text="Our projects are approached with safety, coordination and dependable execution at every stage."
              />

              <ApproachCard
                number="04"
                icon={TrendingUp}
                title="Lasting Value"
                text="We aim to create durable infrastructure that delivers value long after project completion."
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR TEAM
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#F8F5ED]
          px-4
          py-20
          sm:px-6
          sm:py-28
          lg:px-8
          lg:py-32
        "
      >

        <div className="relative mx-auto max-w-7xl">

          <div
            className="
              flex
              flex-col
              gap-8
              md:flex-row
              md:items-end
              md:justify-between
            "
          >

            <div className="max-w-3xl">

              <SectionLabel text="Our Team" />

              <h2
                className="
                  mt-5
                  text-3xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-[#070B1C]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                The people behind
                <span className="block text-[#A9925E]">
                  our projects.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-[#64748B]
                  sm:text-base
                  sm:leading-8
                "
              >
                Our team brings together experience, technical knowledge
                and a shared commitment to delivering dependable project
                outcomes.
              </p>

            </div>

            <div className="hidden items-center gap-2 lg:flex">

              <span className="h-2 w-8 rounded-full bg-[#C9A03B]" />

              <span className="h-2 w-2 rounded-full bg-[#C9A03B]/30" />

              <span className="h-2 w-2 rounded-full bg-[#C9A03B]/15" />

            </div>

          </div>

          <TeamCarousel />

        </div>

      </section>

      {/* =====================================================
          BOTTOM STATEMENT
      ===================================================== */}

      <section
        className="
          border-t
          border-[#E5DBC3]
          bg-[#070B1C]
          px-4
          py-14
          sm:px-6
          sm:py-16
          lg:px-8
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            justify-between
            gap-7
            md:flex-row
            md:items-center
          "
        >

          <div>

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#D7B44D]
              "
            >
              Saam Infrastructure
            </p>

            <h2
              className="
                mt-3
                max-w-3xl
                text-2xl
                font-black
                leading-tight
                text-white
                sm:text-4xl
              "
            >
              Built with purpose.
              <span className="block text-[#D7B44D]">
                Delivered with precision.
              </span>
            </h2>

          </div>

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#C9A03B]
              text-[#D7B44D]
            "
          >
            <ArrowUpRight size={22} />
          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">

      <span className="h-[2px] w-10 bg-[#C9A03B] sm:w-12" />

      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-[0.28em]
          text-[#B28A20]
          sm:text-sm
        "
      >
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="group flex items-start gap-4">

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-[#D8C58F]
          text-[#B28A20]
          transition-all
          duration-300
          group-hover:border-[#C9A03B]
          group-hover:bg-[#C9A03B]
          group-hover:text-white
        "
      >
        <Icon size={20} />
      </div>

      <div>

        <h3 className="font-bold text-[#070B1C]">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#64748B]">
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   LEADERSHIP CARD
========================================================= */

function LeaderCard({ leader, index }) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-[#DFD5BF]
        bg-white
        shadow-[0_18px_50px_rgba(7,11,28,0.08)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#C9A03B]
        hover:shadow-[0_28px_70px_rgba(7,11,28,0.15)]
      "
    >
      {/* =====================================================
          IMAGE SECTION
      ====================================================== */}

      <div
        className="
          relative
          flex
          aspect-[4/3]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-[#070B1C]
          sm:aspect-[16/10]
        "
      >
        {/* COMPLETE IMAGE FIT

            object-contain is intentional here.

            It displays the COMPLETE image selected/uploaded by
            the admin without cropping. Portrait, landscape,
            square and other aspect ratios are all supported.

            Any unused space is filled by the dark background.
        */}

        <img
          src={leader.image}
          alt={`${leader.name} - ${leader.role}`}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={{
            objectPosition: leader.imagePosition || "center center",
          }}
          className="
            block
            h-full
            w-full
            select-none
            object-contain
            object-center
          "
        />

        {/* SUBTLE BOTTOM GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#070B1C]/75
            via-[#070B1C]/5
            to-transparent
          "
        />

        {/* GOLD IMAGE FRAME */}

        <div
          className="
            pointer-events-none
            absolute
            inset-4
            rounded-[1.4rem]
            border
            border-[#D7B44D]/45
            sm:inset-5
            sm:rounded-[1.5rem]
          "
        />

        {/* LEADER NUMBER */}

        <span
          className="
            absolute
            right-5
            top-4
            text-6xl
            font-black
            leading-none
            text-white/15
            sm:right-7
            sm:top-5
            sm:text-7xl
          "
        >
          0{index + 1}
        </span>

        {/* IMAGE BOTTOM LABEL */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-5
            sm:p-7
          "
        >
          <div className="mb-3 h-[3px] w-12 bg-[#D7B44D]" />

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#D7B44D]
              sm:text-[10px]
            "
          >
            Saam Infrastructure
          </p>

          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-white/85
              sm:text-sm
            "
          >
            Leadership
          </p>
        </div>
      </div>

      {/* =====================================================
          DETAILS SECTION
      ====================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          p-6
          sm:p-7
          lg:p-8
        "
      >
        {/* TOP META */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <p
            className="
              max-w-[75%]
              text-[10px]
              font-bold
              uppercase
              leading-4
              tracking-[0.22em]
              text-[#B28A20]
              sm:text-xs
              sm:leading-5
            "
          >
            {leader.role}
          </p>

          <span
            className="
              shrink-0
              rounded-full
              bg-[#F8F5ED]
              px-3
              py-1.5
              text-[8px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#B28A20]
              sm:px-3.5
              sm:py-2
              sm:text-[9px]
            "
          >
            Leader 0{index + 1}
          </span>
        </div>

        {/* NAME */}

        <h3
          className="
            mt-4
            max-w-xl
            text-3xl
            font-black
            leading-[1.02]
            tracking-[-0.035em]
            text-[#070B1C]
            sm:mt-5
            sm:text-4xl
            lg:text-[2.6rem]
          "
        >
          {leader.name}
        </h3>

        {/* GOLD LINE */}

        <div
          className="
            mt-5
            h-[3px]
            w-16
            rounded-full
            bg-[#C9A03B]
            transition-all
            duration-500
            group-hover:w-24
          "
        />

        {/* DESCRIPTION */}

        <p
          className="
            mt-5
            text-base
            font-semibold
            leading-7
            text-[#36506E]
            sm:mt-6
            sm:text-lg
            sm:leading-8
          "
        >
          {leader.description}
        </p>

        {/* STATEMENT */}

        <p
          className="
            mt-4
            text-sm
            leading-7
            text-[#64748B]
            sm:mt-5
            sm:text-base
            sm:leading-8
          "
        >
          {leader.statement}
        </p>

        {/* =================================================
            LEADER STATS
        ================================================== */}

        <div
          className="
            mt-7
            grid
            grid-cols-3
            gap-3
            border-t
            border-[#E5DBC3]
            pt-6
            sm:mt-8
            sm:gap-5
            sm:pt-7
          "
        >
          <LeaderStat
            number={`0${index + 1}`}
            label="Leader"
          />

          <LeaderStat
            number="100%"
            label="Commitment"
          />

          <LeaderStat
            number="24/7"
            label="Focus"
          />
        </div>

        {/* BOTTOM GOLD DECORATION */}

        <div
          className="
            mt-7
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-[3px]
              w-12
              rounded-full
              bg-[#C9A03B]
              transition-all
              duration-500
              group-hover:w-20
            "
          />

          <span
            className="
              h-[3px]
              w-4
              rounded-full
              bg-[#C9A03B]/30
            "
          />

          <span
            className="
              h-[3px]
              w-2
              rounded-full
              bg-[#C9A03B]/15
            "
          />
        </div>
      </div>

      {/* HOVER GOLD CORNER */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-20
          w-20
          rounded-tl-[2rem]
          bg-[#C9A03B]/[0.04]
          transition-all
          duration-500
          group-hover:h-28
          group-hover:w-28
          group-hover:bg-[#C9A03B]/[0.08]
        "
      />
    </article>
  );
}

/* =========================================================
   LEADER STAT
========================================================= */

function LeaderStat({ number, label }) {
  return (
    <div>

      <p className="text-xl font-black text-[#B28A20] sm:text-2xl">
        {number}
      </p>

      <p
        className="
          mt-1
          text-[8px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-[#64748B]
          sm:text-[10px]
        "
      >
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   VISION CARD
========================================================= */

function VisionCard({
  number,
  icon: Icon,
  label,
  title,
  text,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-[#E2D9C5]
        bg-[#F8F5ED]
        p-7
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#C9A03B]
        hover:bg-white
        hover:shadow-[0_25px_60px_rgba(7,11,28,0.10)]
        sm:p-10
      "
    >

      <span
        className="
          pointer-events-none
          absolute
          -right-3
          -top-8
          text-[8rem]
          font-black
          leading-none
          text-[#C9A03B]/[0.07]
          transition-transform
          duration-500
          group-hover:scale-110
        "
      >
        {number}
      </span>

      <div
        className="
          absolute
          left-0
          top-0
          h-1.5
          w-24
          rounded-r-full
          bg-[#C9A03B]
          transition-all
          duration-500
          group-hover:w-40
        "
      />

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border-2
          border-[#C9A03B]
          bg-white
          text-[#B28A20]
          transition-all
          duration-500
          group-hover:rotate-6
          group-hover:bg-[#C9A03B]
          group-hover:text-white
        "
      >
        <Icon size={28} strokeWidth={1.8} />
      </div>

      <p
        className="
          relative
          mt-7
          text-xs
          font-bold
          uppercase
          tracking-[0.22em]
          text-[#B28A20]
        "
      >
        {label}
      </p>

      <h3
        className="
          relative
          mt-3
          text-2xl
          font-black
          leading-tight
          text-[#070B1C]
          sm:text-3xl
        "
      >
        {title}
      </h3>

      <p
        className="
          relative
          mt-5
          text-sm
          leading-7
          text-[#64748B]
          sm:text-base
        "
      >
        {text}
      </p>

      <div className="relative mt-8 flex items-center gap-3">

        <span className="h-1 w-10 rounded-full bg-[#C9A03B] transition-all duration-500 group-hover:w-16" />

        <span className="h-1 w-2 rounded-full bg-[#C9A03B]/30" />

        <span className="h-1 w-2 rounded-full bg-[#C9A03B]/15" />

      </div>

    </div>
  );
}

/* =========================================================
   HISTORY ITEM
========================================================= */

function HistoryItem({ year, title, text, last }) {
  return (
    <div
      className={`relative flex gap-5 sm:gap-7 ${
        last ? "" : "pb-12"
      }`}
    >

      <div
        className="
          relative
          z-10
          mt-1
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-[#C9A03B]
          bg-[#F8F5ED]
        "
      >
        <div className="h-2 w-2 rounded-full bg-[#C9A03B]" />
      </div>

      <div>

        <span
          className="
            text-sm
            font-black
            tracking-[0.2em]
            text-[#B28A20]
          "
        >
          {year}
        </span>

        <h3 className="mt-2 text-2xl font-black text-[#070B1C]">
          {title}
        </h3>

        <p
          className="
            mt-3
            max-w-2xl
            text-sm
            leading-7
            text-[#64748B]
            sm:text-base
          "
        >
          {text}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   APPROACH CARD
========================================================= */

function ApproachCard({
  number,
  title,
  text,
  icon: Icon,
}) {
  return (
    <div
      className="
        group
        relative
        min-h-[255px]
        overflow-hidden
        rounded-[2rem]
        rounded-br-[4rem]
        border
        border-[#E4DAC4]
        bg-[#F8F5ED]
        p-7
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#C9A03B]
        hover:bg-white
        hover:shadow-[0_25px_60px_rgba(7,11,28,0.12)]
        sm:p-8
      "
    >

      <span
        className="
          pointer-events-none
          absolute
          -right-2
          -top-7
          select-none
          text-[7rem]
          font-black
          leading-none
          text-[#C9A03B]/[0.08]
          transition-all
          duration-500
          group-hover:scale-110
        "
      >
        {number}
      </span>

      <div className="relative z-10 flex items-center justify-between">

        <span
          className="
            flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-full
            bg-[#070B1C]
            px-3
            text-xs
            font-black
            tracking-[0.15em]
            text-[#D7B44D]
          "
        >
          {number}
        </span>

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            border
            border-[#D9C99E]
            bg-white
            text-[#B28A20]
            transition-all
            duration-500
            group-hover:rotate-6
            group-hover:bg-[#C9A03B]
            group-hover:text-white
          "
        >
          <Icon size={19} />
        </div>

      </div>

      <div className="relative z-10 mt-8">

        <h3 className="text-xl font-black text-[#070B1C] sm:text-2xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#64748B]">
          {text}
        </p>

      </div>

      <div className="absolute bottom-6 left-7 right-7 flex items-center gap-2">

        <span className="h-[3px] w-10 rounded-full bg-[#C9A03B] transition-all duration-500 group-hover:w-20" />

        <span className="h-[3px] w-3 rounded-full bg-[#C9A03B]/30" />

        <span className="h-[3px] w-2 rounded-full bg-[#C9A03B]/15" />

      </div>

    </div>
  );
}

/* =========================================================
   TEAM CAROUSEL
========================================================= */

function TeamCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const interval = setInterval(() => {

      const maxScroll =
        carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {

        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });

      } else {

        carousel.scrollBy({
          left: carousel.clientWidth * 0.82,
          behavior: "smooth",
        });

      }

    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const scrollLeft = () => {

    carouselRef.current?.scrollBy({
      left: -carouselRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });

  };

  const scrollRight = () => {

    carouselRef.current?.scrollBy({
      left: carouselRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });

  };

  return (
    <div className="relative mt-12 sm:mt-14">

      {/* DESKTOP LEFT */}

      <button
        type="button"
        onClick={scrollLeft}
        aria-label="Previous team members"
        className="
          absolute
          -left-3
          top-1/2
          z-20
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#D8C89F]
          bg-white
          text-[#070B1C]
          shadow-lg
          transition-all
          hover:bg-[#C9A03B]
          hover:text-white
          lg:flex
        "
      >
        <ChevronLeft size={21} />
      </button>

      {/* CAROUSEL */}

      <div
        ref={carouselRef}
        className="
          flex
          gap-5
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          pb-6
          pr-3
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          sm:gap-6
        "
      >

        {teamMembers.map((member) => (

          <div
            key={member.name}
            className="
              w-[88%]
              shrink-0
              snap-start
              sm:w-[48%]
              lg:w-[31.5%]
            "
          >
            <TeamMember {...member} />
          </div>

        ))}

      </div>

      {/* DESKTOP RIGHT */}

      <button
        type="button"
        onClick={scrollRight}
        aria-label="Next team members"
        className="
          absolute
          -right-3
          top-1/2
          z-20
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#070B1C]
          text-white
          shadow-lg
          transition-all
          hover:bg-[#C9A03B]
          lg:flex
        "
      >
        <ChevronRight size={21} />
      </button>

      {/* MOBILE CONTROLS */}

      <div className="mt-3 flex items-center justify-between lg:hidden">

        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[#94A3B8]
            sm:text-xs
          "
        >
          Swipe to explore
        </p>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous team members"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#D8C89F]
              bg-white
              text-[#070B1C]
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next team members"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#070B1C]
              text-white
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   TEAM MEMBER
========================================================= */

function TeamMember({
  name,
  role,
  image,
  description,
}) {
  return (
    <article
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-[2rem]
        border
        border-[#DED3BA]
        bg-white
        shadow-[0_12px_35px_rgba(7,11,28,0.06)]
        transition-all
        duration-500
        hover:-translate-y-3
        hover:border-[#C9A03B]
        hover:shadow-[0_28px_65px_rgba(7,11,28,0.15)]
      "
    >

      <div
        className="
          relative
          h-[300px]
          overflow-hidden
          sm:h-[350px]
        "
      >

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            grayscale-[12%]
            transition-all
            duration-700
            group-hover:scale-110
            group-hover:grayscale-0
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#070B1C]
            via-[#070B1C]/15
            to-transparent
          "
        />

        <div className="absolute bottom-0 left-0 right-0 p-6">

          <div className="mb-3 h-[3px] w-12 bg-[#D7B44D]" />

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#D7B44D]
            "
          >
            Saam Infrastructure
          </p>

        </div>

      </div>

      <div className="p-6 sm:p-7">

        <h3 className="text-xl font-black text-[#070B1C] sm:text-2xl">
          {name}
        </h3>

        <p
          className="
            mt-2
            text-xs
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#B28A20]
          "
        >
          {role}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-[#C9A03B]/60 via-[#E7DFCF] to-transparent" />

        <p className="text-sm leading-7 text-[#64748B]">
          {description}
        </p>

      </div>

    </article>
  );
}

export default AboutPage;