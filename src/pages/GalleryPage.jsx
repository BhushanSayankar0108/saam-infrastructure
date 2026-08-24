import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Commercial Construction",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Residential Development",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Infrastructure Work",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Urban Development",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Industrial Facility",
    category: "Industrial",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Construction Planning",
    category: "Planning",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    title: "Project Development",
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    title: "Engineering Work",
    category: "Engineering",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
  },
];

function GalleryPage() {
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
                Project Gallery
              </span>

            </div>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              A closer look at
              <br />
              <span className="text-orange-500">
                our work.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Explore photographs from our construction, infrastructure
              and development work. Every project reflects our commitment
              to quality and dependable execution.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ====================================================== */}
      <section className="px-6 py-16 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {galleryImages.map((item) => (

              <article
                key={item.id}
                className="group overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative h-[320px] overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-80" />

                  {/* Number */}
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center border border-orange-500 bg-slate-950/80 text-sm font-bold text-orange-400 backdrop-blur-sm">
                    {String(item.id).padStart(2, "0")}
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <span className="inline-block bg-orange-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                      {item.category}
                    </span>

                    <h2 className="mt-3 text-2xl font-bold text-white">
                      {item.title}
                    </h2>

                  </div>

                </div>


                {/* CARD FOOTER */}
                <div className="flex items-center justify-between p-5">

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Saam Infrastructure
                  </span>

                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-orange-600"
                  >
                    View

                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />

                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Ready to start?
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Let's build your next project.
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-500">
              Tell us about your requirements and our team will help
              you take the next step.
            </p>

          </div>

          <a
            href="/contact"
            className="group inline-flex w-fit items-center gap-3 bg-orange-500 px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600"
          >
            Start Your Project

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />

          </a>

        </div>

      </section>

    </main>
  );
}

export default GalleryPage;