import {
  Building2,
  Landmark,
  House,
  Share2,
  Wrench,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Civil Construction",
    description:
      "Reliable civil construction solutions built with quality materials, skilled workmanship and attention to every detail.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Commercial Projects",
    description:
      "Modern commercial spaces designed and executed with a focus on functionality, durability and long-term value.",
    icon: Landmark,
  },
  {
    number: "03",
    title: "Residential Construction",
    description:
      "Strong and thoughtfully planned residential projects created to provide comfortable and lasting spaces.",
    icon: House,
  },
  {
    number: "04",
    title: "Infrastructure Development",
    description:
      "Infrastructure development solutions focused on dependable execution, safety and sustainable growth.",
    icon: Share2,
  },
  {
    number: "05",
    title: "Renovation & Development",
    description:
      "Renovation and development services that improve existing spaces while maintaining quality and structural integrity.",
    icon: Wrench,
  },
  {
    number: "06",
    title: "Engineering & Project Management",
    description:
      "Professional planning and project management focused on efficient execution, coordination and timely delivery.",
    icon: Ruler,
  },
];

function Services() {
  return (
    <section
      id="services"
      className="bg-[#fff8f3] px-6 py-24 text-slate-950 sm:py-28 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-base font-bold uppercase tracking-[0.25em] text-orange-600 sm:text-lg">
                Our Services
              </span>
            </div>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
              Comprehensive construction and infrastructure solutions
              delivered with precision, quality and responsibility.
            </p>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Building solutions.
              <br />
              <span className="text-slate-400">
                Creating lasting value.
              </span>
            </h2>
          </div>

        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group relative flex min-h-[330px] flex-col border border-orange-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg"
              >

                {/* TOP */}
                <div className="flex items-start justify-between">

                  <span className="text-sm font-bold tracking-wider text-orange-500">
                    {service.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center border border-orange-200 bg-orange-50 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                    <Icon
                      size={24}
                      className="text-orange-500 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                </div>

                {/* CONTENT */}
                <div className="mt-8 flex flex-1 flex-col">

                  <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {service.description}
                  </p>

                </div>

                {/* BOTTOM */}
                <div className="mt-8 flex items-center justify-between border-t border-orange-100 pt-5">

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-orange-500">
                    Learn More
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

        {/* ================= CTA ================= */}
        <div className="mt-10 flex flex-col gap-5 border-t border-orange-200 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-2xl text-sm leading-7 text-slate-500">
            From planning to completion, we bring engineering expertise,
            quality workmanship and dependable execution to every project.
          </p>

          <a
            href="/services"
            className="group inline-flex w-fit items-center gap-3 bg-orange-500 px-6 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-orange-600"
          >
            View All Services

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>

        </div>

      </div>
    </section>
  );
}

export default Services;