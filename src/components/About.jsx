import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import aboutConstruction from "../assets/images/about-construction.jpg";

function About() {
  return (
    <section
      id="about"
      className="bg-stone-50 px-6 py-24 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= SECTION HEADING ================= */}
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

          {/* Small Label */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500"></span>

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                About Us
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Building with purpose.
              <br />

              <span className="text-slate-400">
                Delivering with precision.
              </span>
            </h2>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ================= IMAGE ================= */}
          <div className="relative">

            {/* Orange Border */}
            <div className="absolute -bottom-5 -right-5 h-full w-full border border-orange-500/40"></div>

            {/* Image Container */}
            <div className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[560px]">

              <img
                src={aboutConstruction}
                alt="Saam Infrastructure construction site"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Image Text */}
              <div className="absolute bottom-0 left-0 p-7 sm:p-8">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                  Saam Infrastructure
                </p>

                <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  Built to stand strong.
                </p>
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="flex flex-col justify-center">

            {/* Introduction */}
            <p className="text-lg leading-8 text-slate-600">
              Saam Infrastructure is committed to delivering dependable
              construction and infrastructure solutions that combine
              engineering expertise, quality workmanship and thoughtful
              execution.
            </p>

            {/* Description */}
            <p className="mt-6 leading-7 text-slate-500">
              From planning and development to execution and completion, we
              focus on creating durable spaces and infrastructure that meet
              the needs of our clients and stand the test of time.
            </p>

            {/* ================= FEATURES ================= */}
            <div className="mt-9 grid gap-7 sm:grid-cols-2">

              {/* Quality Focus */}
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <h3 className="font-semibold text-slate-950">
                    Quality Focus
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    High standards at every stage of construction.
                  </p>
                </div>
              </div>

              {/* Reliable Execution */}
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <h3 className="font-semibold text-slate-950">
                    Reliable Execution
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Focused planning and dependable project delivery.
                  </p>
                </div>
              </div>

              {/* Safety First */}
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <h3 className="font-semibold text-slate-950">
                    Safety First
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Responsible practices with safety at the core.
                  </p>
                </div>
              </div>

              {/* Long-Term Value */}
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <h3 className="font-semibold text-slate-950">
                    Long-Term Value
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Solutions designed for durability and performance.
                  </p>
                </div>
              </div>
            </div>

            {/* ================= BUTTON ================= */}
            <div className="mt-10">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500"
              >
                <span>Discover Our Approach</span>

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;