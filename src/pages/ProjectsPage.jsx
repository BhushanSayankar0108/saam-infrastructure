import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Modern Commercial Complex",
    category: "Commercial",
    description:
      "A modern commercial development built with a strong focus on quality, functionality and long-term durability.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Residential Building",
    category: "Residential",
    description:
      "Thoughtfully planned residential construction designed to provide comfortable, safe and lasting spaces.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Infrastructure Development",
    category: "Infrastructure",
    description:
      "Infrastructure development delivered with dependable execution, safety standards and attention to detail.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Urban Development Project",
    category: "Infrastructure",
    description:
      "A carefully executed urban development project focused on efficient planning and sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Industrial Facility",
    category: "Industrial",
    description:
      "A robust industrial facility designed and constructed with a focus on performance, safety and reliability.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Renovation & Development",
    category: "Renovation",
    description:
      "Renovation and development work that improves existing spaces while maintaining structural integrity.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=85",
  },
];

const filters = [
  "All",
  "Commercial",
  "Residential",
  "Infrastructure",
  "Industrial",
  "Renovation",
];

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  return (
    <main className="min-h-screen bg-stone-50 pt-[86px] text-slate-950">

      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="border-b border-slate-200 bg-stone-50">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Our Projects
              </span>

            </div>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Projects built with
              <br />
              <span className="text-orange-500">
                purpose.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Explore our construction and infrastructure projects
              delivered with precision, quality workmanship and
              dependable execution.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FILTERS
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-wrap gap-3 py-6">

            {filters.map((filter) => {

              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:border-orange-500 hover:text-orange-600"
                  }`}
                >
                  {filter}
                </button>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECT GRID
      ====================================================== */}
      <section className="px-6 py-16 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          {filteredProjects.length > 0 ? (

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {filteredProjects.map((project) => (

                <article
                  key={project.id}
                  className="group overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-xl"
                >

                  {/* IMAGE */}
                  <div className="relative h-[280px] overflow-hidden">

                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Project Number */}
                    <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-orange-500 bg-slate-950/80 text-sm font-bold text-orange-400 backdrop-blur-sm">
                      {String(project.id).padStart(2, "0")}
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-5 left-5">

                      <span className="bg-orange-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                        {project.category}
                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}
                  <div className="p-6">

                    <h2 className="text-2xl font-bold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-orange-600">
                      {project.title}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      {project.description}
                    </p>


                    {/* Bottom */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">

                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Project
                      </span>

                      <button
                        type="button"
                        className="group/link flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-orange-600"
                      >
                        View Project

                        <ArrowUpRight
                          size={17}
                          className="transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                        />
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="border border-slate-200 bg-white py-20 text-center">

              <h2 className="text-2xl font-bold text-slate-950">
                No projects found
              </h2>

              <p className="mt-3 text-slate-500">
                Projects for this category will be displayed here.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Have a project in mind?
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Let's build something great.
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-500">
              Talk to our team about your construction,
              infrastructure or project management requirements.
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

export default ProjectsPage;