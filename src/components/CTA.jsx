import { ArrowUpRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#171815] px-5 py-16 text-[#F8F7F2] sm:px-6 sm:py-20 lg:px-8 lg:py-24">

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#C9A227]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#C9A227]/5 blur-3xl" />

      {/* Subtle gold line */}

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#C9A227] to-transparent opacity-70" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="max-w-3xl">

            {/* LABEL */}

            <div className="flex items-center gap-3">

              <span className="h-px w-10 bg-[#C9A227]" />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227] sm:text-sm">
                Start Your Project
              </p>

            </div>

            {/* HEADING */}

            <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#F8F7F2] sm:text-4xl md:text-5xl lg:text-6xl">
              Have a project
              <br className="hidden sm:block" />{" "}
              <span className="text-[#C9A227]">
                in mind?
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#B8B8AF] sm:text-base sm:leading-8 lg:text-lg">
              Let's discuss your construction and infrastructure
              requirements and find the right solution for your
              project.
            </p>

          </div>

          {/* =================================================
              RIGHT CTA
          ================================================== */}

          <div className="shrink-0">

            <Link
              to="/contact"
              className="group inline-flex w-full items-center justify-between gap-5 rounded-full border border-[#C9A227]/70 bg-[#C9A227] px-6 py-4 text-sm font-bold text-[#171815] shadow-[0_12px_35px_rgba(201,162,39,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E0C45C] hover:shadow-[0_18px_40px_rgba(201,162,39,0.28)] sm:w-auto sm:min-w-[190px] sm:px-7"
            >

              <span>
                Get a Quote
              </span>

              {/* CIRCULAR ARROW */}

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171815]/10 transition-all duration-300 group-hover:bg-[#171815]/20">

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />

              </span>

            </Link>

          </div>

        </div>

        {/* =================================================
            BOTTOM TRUST LINE
        ================================================== */}

        <div className="mt-12 border-t border-[#C9A227]/20 pt-7 sm:mt-14">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A227]/40 text-[#C9A227]">
                <Building2 size={18} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8F9088] sm:text-sm">
                Construction & Infrastructure
              </p>

            </div>

            {/* RIGHT */}

            <p className="text-xs text-[#77786F] sm:text-sm">
              Quality • Precision • Safety • Reliability
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CTA;