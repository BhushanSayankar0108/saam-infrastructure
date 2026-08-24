import { ArrowUpRight } from "lucide-react";

function StartProject() {
  return (
    <section className="bg-slate-950 px-6 py-20 text-white sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

          {/* LEFT CONTENT */}
          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              Start Your Project
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Have a project in mind?
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Let's discuss your construction and infrastructure requirements
              and find the right solution for your project.
            </p>

          </div>

          {/* BUTTON */}
          <div className="shrink-0">

            <a
              href="/contact"
              className="group flex w-fit items-center gap-3 bg-orange-500 px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600"
            >
              Get a Quote

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default StartProject;