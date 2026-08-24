import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Clock3,
} from "lucide-react";

function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">

      {/* =====================================================
          CONTACT PAGE CONTENT
      ====================================================== */}
      <div className="px-6 pb-24 pt-[150px] lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}
          <section className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                Contact Us
              </p>
            </div>

            <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl">
              Let's discuss
              <br />
              <span className="text-slate-400">
                your project.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Get in touch with Saam Infrastructure for construction,
              infrastructure and project management requirements. Our team is
              ready to understand your requirements and discuss the right
              solution for your project.
            </p>
          </section>

          {/* ================= CONTACT CONTENT ================= */}
          <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

            {/* ================= LEFT INFORMATION ================= */}
            <div className="bg-slate-950 p-8 text-white sm:p-10 lg:p-12">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Get In Touch
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Let's build something strong together.
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                Whether you are planning a new construction project,
                infrastructure development or renovation, we would be happy to
                discuss your requirements.
              </p>

              {/* Contact Details */}
              <div className="mt-10 space-y-7">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/40 text-orange-500">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone
                    </p>

                    <a
                      href="tel:+910000000000"
                      className="mt-1 block text-base font-semibold text-white transition hover:text-orange-500"
                    >
                      +91 00000 00000
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/40 text-orange-500">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </p>

                    <a
                      href="mailto:info@saaminfrastructure.com"
                      className="mt-1 block break-all text-base font-semibold text-white transition hover:text-orange-500"
                    >
                      info@saaminfrastructure.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/40 text-orange-500">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Office
                    </p>

                    <p className="mt-1 text-base font-semibold leading-6 text-white">
                      Your Office Address
                      <br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/40 text-orange-500">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Working Hours
                    </p>

                    <p className="mt-1 text-base font-semibold text-white">
                      Monday – Saturday
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>

              </div>

              {/* Decorative Element */}
              <div className="mt-12 border-t border-slate-800 pt-7">
                <p className="text-sm leading-6 text-slate-500">
                  Saam Infrastructure
                  <br />
                  Construction & Infrastructure Solutions
                </p>
              </div>

            </div>

            {/* ================= CONTACT FORM ================= */}
            <div className="border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                  Send An Enquiry
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Tell us about your project.
                </h2>

                <p className="mt-3 text-slate-500">
                  Fill out the form below and our team will get back to you.
                </p>
              </div>

              {/* Form */}
              <form className="mt-9 space-y-6">

                {/* Name + Phone */}
                <div className="grid gap-6 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Project Type
                  </label>

                  <select
                    id="projectType"
                    defaultValue=""
                    className="w-full border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                  >
                    <option value="" disabled>
                      Select project type
                    </option>

                    <option value="commercial">
                      Commercial Construction
                    </option>

                    <option value="residential">
                      Residential Construction
                    </option>

                    <option value="infrastructure">
                      Infrastructure
                    </option>

                    <option value="industrial">
                      Industrial Construction
                    </option>

                    <option value="renovation">
                      Renovation
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Project Details
                  </label>

                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us about your project..."
                    className="w-full resize-none border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500"
                >
                  Send Enquiry

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>

              </form>
            </div>
          </section>

          {/* ================= BOTTOM CTA ================= */}
          <section className="mt-20 border-t border-slate-200 pt-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
                  Saam Infrastructure
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Built with purpose. Delivered with precision.
                </h2>
              </div>

              <a
                href="mailto:info@saaminfrastructure.com"
                className="inline-flex w-fit items-center gap-3 border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:border-orange-500 hover:text-orange-500"
              >
                Email Our Team
                <ArrowUpRight size={18} />
              </a>

            </div>
          </section>

        </div>
      </div>

    </main>
  );
}

export default ContactPage;