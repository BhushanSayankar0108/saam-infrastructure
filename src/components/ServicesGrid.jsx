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

function ServicesGrid({ preview = false }) {
  const displayedServices = preview
    ? services.slice(0, 3)
    : services;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {displayedServices.map((service) => {
        const Icon = service.icon;

        return (
          <article
            key={service.number}
            className="group relative flex min-h-[320px] flex-col border border-orange-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg"
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold tracking-wider text-orange-600">
                {service.number}
              </span>

              <div className="flex h-14 w-14 items-center justify-center border border-orange-200 bg-orange-50 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                <Icon
                  size={25}
                  className="text-orange-600 transition-colors duration-300 group-hover:text-white"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-8 flex flex-1 flex-col">
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                {service.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {service.description}
              </p>
            </div>

            {/* BOTTOM */}
            <div className="mt-8 flex items-center justify-between border-t border-orange-100 pt-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-orange-600">
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
  );
}

export default ServicesGrid;