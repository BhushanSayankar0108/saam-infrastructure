import {
  CheckCircle2,
  Eye,
  Target,
  ArrowUpRight,
} from "lucide-react";

import aboutConstruction from "../assets/images/about-construction.jpg";

function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
 
      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-stone-100 px-6 pb-20 pt-[150px] sm:pb-24 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-orange-500" />

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              About Us
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Building with purpose.
            <br />
            <span className="text-orange-600">
              Delivering with precision.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Saam Infrastructure delivers dependable construction and
            infrastructure solutions with quality, precision, safety and
            long-term value at the core.
          </p>

        </div>
      </section>


      {/* =====================================================
          WHO WE ARE
      ====================================================== */}
      <section className="bg-stone-50 px-6 py-24 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* IMAGE */}
          <div className="relative">

            <div className="absolute -bottom-5 -right-5 h-full w-full border border-orange-500/30" />

            <div className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[580px]">

              <img
                src={aboutConstruction}
                alt="Saam Infrastructure construction site"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-7 sm:p-9">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                  Saam Infrastructure
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  Built to stand strong.
                </p>

              </div>

            </div>
          </div>


          {/* CONTENT */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Who We Are
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Infrastructure built for the future.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Saam Infrastructure is committed to delivering reliable
              construction and infrastructure solutions that combine
              engineering expertise, quality workmanship and thoughtful
              execution.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              From planning and development to execution and completion, we
              focus on creating durable spaces and infrastructure that meet
              the needs of our clients and deliver lasting value.
            </p>


            {/* FEATURES */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <Feature
                title="Quality"
                text="High standards at every stage of construction."
              />

              <Feature
                title="Reliability"
                text="Dependable planning and project execution."
              />

              <Feature
                title="Safety"
                text="Responsible practices with safety at the core."
              />

              <Feature
                title="Long-Term Value"
                text="Solutions designed for durability and performance."
              />

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          VISION & MISSION
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white px-6 py-24 sm:py-28 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Vision & Mission
              </p>

            </div>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Creating infrastructure that makes a difference.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Our vision and mission guide the way we approach every project,
              partnership and construction challenge.
            </p>

          </div>


          <div className="mt-14 grid gap-6 lg:grid-cols-2">

            {/* VISION */}
            <div className="group border border-slate-200 bg-stone-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center border border-orange-500 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <Eye size={27} />
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                Our Vision
              </p>

              <h3 className="mt-3 text-3xl font-bold text-slate-950">
                Building a stronger tomorrow.
              </h3>

              <p className="mt-5 leading-7 text-slate-500">
                To become a trusted name in construction and infrastructure by
                creating high-quality, sustainable and dependable spaces that
                contribute to the growth and development of communities.
              </p>

            </div>


            {/* MISSION */}
            <div className="group border border-slate-200 bg-stone-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center border border-orange-500 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <Target size={27} />
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                Our Mission
              </p>

              <h3 className="mt-3 text-3xl font-bold text-slate-950">
                Delivering with purpose.
              </h3>

              <p className="mt-5 leading-7 text-slate-500">
                To deliver construction and infrastructure projects with
                quality workmanship, responsible practices, transparent
                communication and dependable execution while creating lasting
                value for our clients.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR HISTORY
      ====================================================== */}
      <section className="border-y border-slate-200 bg-slate-100 px-6 py-24 sm:py-28 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                  Our History
                </p>

              </div>

              <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                Growing through every project.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-600">
                Our journey is built around a simple commitment — delivering
                dependable construction solutions and building relationships
                that last.
              </p>

            </div>


            {/* TIMELINE */}
            <div className="relative">

              <div className="absolute bottom-0 left-[9px] top-0 w-px bg-slate-300" />

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
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white px-6 py-24 sm:py-28 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Our Approach
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                Built on strong foundations.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-500">
                Every project begins with careful planning, responsible
                execution and a clear understanding of our client's goals.
              </p>

            </div>


            <div className="grid gap-6 sm:grid-cols-2">

              <ApproachCard
                number="01"
                title="Quality First"
                text="We maintain high standards of workmanship and attention to detail throughout every project."
              />

              <ApproachCard
                number="02"
                title="Client Focus"
                text="We work closely with our clients to understand their goals and deliver practical solutions."
              />

              <ApproachCard
                number="03"
                title="Responsible Execution"
                text="Our projects are approached with safety, coordination and dependable execution at every stage."
              />

              <ApproachCard
                number="04"
                title="Lasting Value"
                text="We aim to create durable infrastructure that delivers value long after project completion."
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR TEAM
      ====================================================== */}
      <section className="bg-stone-50 px-6 py-24 sm:py-28 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Our Team
              </p>

            </div>

            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              The people behind our projects.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Our team brings together experience, technical knowledge and a
              shared commitment to delivering dependable project outcomes.
            </p>

          </div>


          {/* TEAM GRID */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <TeamMember
              initials="RS"
              name="Rajesh Sharma"
              role="Managing Director"
            />

            <TeamMember
              initials="AP"
              name="Amit Patil"
              role="Project Director"
            />

            <TeamMember
              initials="PD"
              name="Priya Deshmukh"
              role="Operations Manager"
            />

            <TeamMember
              initials="SK"
              name="Sandeep Kulkarni"
              role="Senior Project Engineer"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM STATEMENT
      ====================================================== */}
      <section className="border-t border-slate-200 bg-stone-100 px-6 py-16 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Saam Infrastructure
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Built with purpose. Delivered with precision.
            </h2>

          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-orange-500 text-orange-500">
            <ArrowUpRight size={22} />
          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ title, text }) {
  return (
    <div className="flex items-start gap-3">

      <CheckCircle2
        size={21}
        className="mt-0.5 shrink-0 text-orange-500"
      />

      <div>

        <h3 className="font-semibold text-slate-950">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   APPROACH CARD
========================================================= */

function ApproachCard({ number, title, text }) {
  return (
    <div className="border border-slate-200 bg-stone-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-md">

      <span className="text-sm font-bold text-orange-500">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-bold text-slate-950">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   HISTORY ITEM
========================================================= */

function HistoryItem({ year, title, text, last }) {
  return (
    <div className={`relative flex gap-7 ${last ? "" : "pb-12"}`}>

      <div className="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-orange-500 bg-slate-100">
        <div className="h-2 w-2 bg-orange-500" />
      </div>

      <div>

        <span className="text-sm font-bold tracking-[0.2em] text-orange-600">
          {year}
        </span>

        <h3 className="mt-2 text-2xl font-bold text-slate-950">
          {title}
        </h3>

        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          {text}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   TEAM MEMBER
========================================================= */

function TeamMember({ initials, name, role }) {
  return (
    <div className="group border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg">

      <div className="flex h-24 w-24 items-center justify-center border border-orange-500 bg-slate-950 text-2xl font-bold text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
        {initials}
      </div>

      <h3 className="mt-7 text-xl font-bold text-slate-950">
        {name}
      </h3>

      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-orange-600">
        {role}
      </p>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        Dedicated to delivering quality, reliable execution and successful
        project outcomes.
      </p>

    </div>
  );
}

export default AboutPage;