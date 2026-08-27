import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function StartProject() {
  return (
    <section className="border-t border-[#C9A24A]/20 bg-[#171916]">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* ================= LEFT CONTENT ================= */}
          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-12 bg-[#C9A24A]" />

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A24A]">
                Start Your Project
              </p>

            </div>

            <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Have a project
              <br />
              <span className="text-[#C9A24A]">
                in mind?
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#B9B9B0] sm:text-lg sm:leading-8">
              Let's discuss your construction and infrastructure
              requirements and find the right solution for your project.
            </p>

          </div>

          {/* ================= BUTTON ================= */}
          <div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border border-[#C9A24A] bg-[#C9A24A] px-7 py-4 text-sm font-bold text-[#171916] transition-all duration-300 hover:border-[#E0C36A] hover:bg-[#E0C36A]"
            >
              Get a Quote

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default StartProject;