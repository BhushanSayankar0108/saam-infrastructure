import {
  Building2,
  Home,
  Factory,
  Landmark,
  Wrench,
  ClipboardCheck,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

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

function ServicesPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">

      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-stone-100 px-6 pb-20 pt-[150px] sm:pb-24 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-orange-500" />

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Our Services
            </p>
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Construction solutions
            <br />
            <span className="text-orange-600">
              built around your needs.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            From civil construction and residential development to
            infrastructure and project management, Saam Infrastructure
            provides dependable solutions focused on quality, safety and
            long-term value.
          </p>

        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="bg-white px-6 py-20 sm:py-24 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              Reliable solutions from planning to completion.
            </h2>

          </div>

          <div>

            <p className="text-lg leading-8 text-slate-600">
              We combine practical experience, technical knowledge and
              responsible project execution to deliver construction and
              infrastructure solutions that meet our clients' requirements.
            </p>

            <p className="mt-5 leading-7 text-slate-500">
              Every project is approached with attention to quality,
              coordination, safety and long-term performance.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES GRID
      ====================================================== */}
      <section className="border-y border-slate-200 bg-stone-50 px-6 py-24 sm:py-28 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <article
                  key={service.id}
                  className="group border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-orange-400 hover:shadow-xl sm:p-8"
                >

                  {/* ICON */}
                  <div className="flex h-14 w-14 items-center justify-center border border-orange-500 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                    <Icon size={27} />
                  </div>


                  {/* NUMBER */}
                  <p className="mt-7 text-xs font-bold tracking-[0.25em] text-slate-400">
                    SERVICE {String(service.id).padStart(2, "0")}
                  </p>


                  {/* TITLE */}
                  <h3 className="mt-3 text-2xl font-bold text-slate-950">
                    {service.title}
                  </h3>


                  {/* DESCRIPTION */}
                  <p className="mt-4 leading-7 text-slate-500">
                    {service.description}
                  </p>


                  {/* FEATURES */}
                  <div className="mt-7 space-y-3 border-t border-slate-200 pt-6">

                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-orange-500"
                        />

                        <span className="text-sm text-slate-600">
                          {point}
                        </span>

                      </div>
                    ))}

                  </div>


                  {/* BOTTOM */}
                  <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">

                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Saam Infrastructure
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-500"
                    />

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="bg-white px-6 py-24 sm:py-28 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">

            {/* LEFT */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Why Choose Us
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                A dependable partner for your next project.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-500">
                We believe successful construction is built on trust,
                communication, quality and responsible execution.
              </p>

            </div>


            {/* RIGHT */}
            <div className="grid gap-5 sm:grid-cols-2">

              <WhyCard
                number="01"
                title="Quality Workmanship"
                text="We maintain high standards of workmanship and attention to detail throughout every stage."
              />

              <WhyCard
                number="02"
                title="Safety First"
                text="Safety remains an important part of our planning and project execution."
              />

              <WhyCard
                number="03"
                title="Transparent Communication"
                text="We maintain clear communication with clients throughout the project lifecycle."
              />

              <WhyCard
                number="04"
                title="Timely Execution"
                text="Careful planning and coordination help us maintain dependable project progress."
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="border-t border-slate-200 bg-slate-100 px-6 py-20 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Start Your Project
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Let's build something great together.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Tell us about your construction or infrastructure requirements
              and our team will be ready to discuss the next steps.
            </p>

          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-3 bg-orange-500 px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600"
          >
            Discuss Your Project

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   WHY CARD
========================================================= */

function WhyCard({ number, title, text }) {
  return (
    <div className="border border-slate-200 bg-stone-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-md">

      <span className="text-sm font-bold tracking-[0.2em] text-orange-500">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-950">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {text}
      </p>

    </div>
  );
}

export default ServicesPage;