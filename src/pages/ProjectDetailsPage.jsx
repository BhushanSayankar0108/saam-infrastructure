import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Circle,
  UserRound,
  Building2,
  ShieldCheck,
  ChevronRight,
  Images,
  Camera,
} from "lucide-react";

import projects from "../data/projects";

// =========================================================
// STATUS CONFIG
// =========================================================

function getStatusConfig(status) {
  const value = String(status || "").toLowerCase().trim();

  if (value === "completed" || value.includes("completed")) {
    return {
      label: "Completed",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      icon: CheckCircle2,
    };
  }

  if (value === "ongoing" || value.includes("ongoing")) {
    return {
      label: "Ongoing",
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
      icon: Clock3,
    };
  }

  return {
    label: "Upcoming",
    className:
      "border-[#E6D49A] bg-[#FFF9E8] text-[#92751C]",
    icon: Circle,
  };
}

// =========================================================
// IMAGE FALLBACK
// =========================================================

function handleImageError(event) {
  event.currentTarget.style.display = "none";

  const fallback =
    event.currentTarget.parentElement?.querySelector(
      "[data-image-fallback]"
    );

  if (fallback) {
    fallback.style.display = "flex";
  }
}

// =========================================================
// PROJECT DETAILS PAGE
// =========================================================

function ProjectDetailsPage() {
  const { id } = useParams();

  const project = projects.find(
    (item) => String(item.id) === String(id)
  );

  // =======================================================
  // PROJECT NOT FOUND
  // =======================================================

  if (!project) {
    return (
      <main className="min-h-screen bg-[#F8F7F2] pt-[88px]">
        <section className="flex min-h-[75vh] items-center justify-center px-5 py-12">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#DDD9CC] bg-white p-8 text-center shadow-[0_20px_60px_rgba(23,24,21,0.08)] sm:p-12">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#C9A227]/10 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#C9A227]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C9A227] bg-[#FFF9E8] text-[#C9A227]">
                <Circle size={32} />
              </div>

              <p className="mt-7 text-xs font-black uppercase tracking-[0.25em] text-[#A98216]">
                Portfolio
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171815] sm:text-4xl">
                Project Not Found
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#686961] sm:text-base">
                The project you are looking for does not exist or may have
                been removed from our portfolio.
              </p>

              <Link
                to="/projects"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-6 py-3.5 text-sm font-black text-[#171815] shadow-[0_12px_30px_rgba(201,162,39,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E0C45C]"
              >
                <ArrowLeft size={17} />

                Back to Projects

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#171815] text-white">
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const status = getStatusConfig(project.status);
  const StatusIcon = status.icon;

  const progressImages =
    project.progressImages?.length > 0
      ? project.progressImages
      : [
          {
            id: 1,
            image: project.image,
            title: "Project Progress",
            description: "Current project construction progress.",
            status: project.status,
          },
        ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F7F2] pt-[88px] text-[#252621]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#11130F]">
        <div className="relative h-[430px] sm:h-[540px] lg:h-[650px]">

          <img
            src={project.image}
            alt={project.title}
            onError={handleImageError}
            className="h-full w-full object-cover"
          />

          <div
            data-image-fallback
            className="absolute inset-0 hidden items-center justify-center bg-[#252621] text-center"
          >
            <div className="px-6">
              <Camera
                size={42}
                className="mx-auto text-[#C9A227]"
              />

              <p className="mt-3 text-sm font-bold text-white/70">
                Project Image
              </p>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#11130F] via-[#11130F]/55 to-[#11130F]/10" />

          <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#C9A227]/10 blur-3xl sm:h-96 sm:w-96" />

          {/* TOP NAV */}

          <div className="absolute left-0 top-0 w-full">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-7 lg:px-8">

              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3.5 py-2.5 text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#171815] sm:px-5 sm:py-3 sm:text-sm"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                <span className="hidden xs:inline sm:inline">
                  Back to Projects
                </span>

                <span className="sm:hidden">
                  Back
                </span>
              </Link>

              <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:flex">
                <span className="h-2 w-2 rounded-full bg-[#C9A227]" />

                Project {String(project.id).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* HERO CONTENT */}

          <div className="absolute bottom-0 left-0 w-full">
            <div className="mx-auto max-w-7xl px-5 pb-7 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">

              <div className="max-w-5xl">

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#C9A227] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#171815] sm:px-4 sm:text-xs">
                    {project.category}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] ${status.className} sm:gap-2 sm:px-4 sm:text-xs`}
                  >
                    <StatusIcon size={12} />

                    {status.label}
                  </span>
                </div>

                <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,8vw,6rem)] font-black leading-[0.95] tracking-[-0.045em] text-white sm:mt-5">
                  {project.title}
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
                  {project.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK PROJECT INFO
      ===================================================== */}

      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">

          <div className="grid overflow-hidden border border-[#DDD9CC] bg-white shadow-[0_15px_50px_rgba(23,24,21,0.07)] sm:-mt-8 sm:rounded-[1.5rem] md:grid-cols-2 lg:grid-cols-4">

            <ProjectMeta
              icon={MapPin}
              label="Location"
              value={project.location}
            />

            <ProjectMeta
              icon={Building2}
              label="Category"
              value={project.category}
            />

            <ProjectMeta
              icon={UserRound}
              label="Client"
              value={project.client}
              highlight
            />

            <ProjectMeta
              icon={StatusIcon}
              label="Project Status"
              value={status.label}
              last
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT OVERVIEW
      ===================================================== */}

      <section className="bg-[#F8F7F2] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">

          <div>
            <SectionLabel text="Project Overview" />

            <h2 className="mt-5 text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1] tracking-[-0.04em] text-[#171815]">
              Built with purpose.

              <span className="mt-1 block text-[#C9A227]">
                Delivered with precision.
              </span>
            </h2>

            <div className="mt-8 hidden h-px w-28 bg-[#C9A227] lg:block" />
          </div>

          <div>
            <p className="text-base leading-8 text-[#565A54] sm:text-lg sm:leading-9">
              {project.shortDescription}
            </p>

            <div className="my-7 h-px bg-[#DDD9CC] sm:my-9" />

            <p className="text-sm leading-7 text-[#686961] sm:text-base sm:leading-8">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLIENT + PROJECT INFORMATION
      ===================================================== */}

      <section className="border-y border-[#DDD9CC] bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">

            <div>
              <SectionLabel text="Project Client" />

              <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-[#C9A227]/40 bg-[#171815] p-6 shadow-[0_20px_50px_rgba(23,24,21,0.10)] sm:p-8">

                <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-[#C9A227]/15 blur-2xl" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A227] text-[#171815]">
                    <UserRound size={25} />
                  </div>

                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-[#C9A227]">
                    Client
                  </p>

                  <h3 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
                    {project.client}
                  </h3>

                  <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-semibold text-white/55">
                    <ShieldCheck size={16} className="text-[#C9A227]" />
                    Professional project execution
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionLabel text="About This Project" />

              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#171815] sm:text-4xl">
                Project details
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#686961] sm:text-base sm:leading-8">
                {project.projectDetails}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="group flex items-start gap-3 rounded-2xl border border-[#E3DFD4] bg-[#F8F7F2] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227] hover:bg-[#FFF9E8]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#C9A227] shadow-sm">
                      <CheckCircle2 size={17} />
                    </span>

                    <span className="pt-1 text-sm font-semibold leading-6 text-[#252621]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT TIMELINE
      ===================================================== */}

      <section className="bg-[#F8F7F2] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <SectionLabel text="Project Timeline" />

          <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight text-[#171815] sm:text-4xl">
            From planning to completion.
          </h2>

          <div className="relative mt-10 grid gap-5 md:grid-cols-2">

            <TimelineCard
              icon={CalendarDays}
              label="Project Started"
              value={project.startDate}
              number="01"
            />

            <TimelineCard
              icon={CheckCircle2}
              label={
                project.status === "Completed"
                  ? "Project Completed"
                  : "Expected Completion"
              }
              value={project.completionDate}
              number="02"
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT PROGRESS
      ===================================================== */}

      <section className="border-y border-[#DDD9CC] bg-white px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <SectionLabel text="Project Progress" />

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#171815] sm:text-4xl lg:text-5xl">
                Current project status
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#686961] sm:text-base">
                Follow the latest progress and construction updates of this
                project.
              </p>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] ${status.className}`}
            >
              <StatusIcon size={14} />
              {status.label}
            </span>
          </div>

          {/* =================================================
              GALLERY
          ================================================= */}

          <div className="mt-10">

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF9E8] text-[#C9A227]">
                  <Images size={18} />
                </div>

                <div>
                  <p className="text-sm font-black text-[#171815]">
                    Progress Images
                  </p>

                  <p className="text-xs text-[#999990]">
                    {progressImages.length}{" "}
                    {progressImages.length === 1
                      ? "update"
                      : "updates"}
                  </p>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {progressImages.map((progress, index) => {

                const imageStatus = getStatusConfig(
                  progress.status || project.status
                );

                const ImageStatusIcon = imageStatus.icon;

                return (
                  <div
                    key={progress.id || index}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-[#DDD9CC] bg-[#F8F7F2] shadow-[0_10px_35px_rgba(23,24,21,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227] hover:shadow-[0_20px_45px_rgba(23,24,21,0.10)]"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD9CC]">

                      <img
                        src={progress.image}
                        alt={
                          progress.title ||
                          `${project.title} progress ${index + 1}`
                        }
                        onError={handleImageError}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* FALLBACK */}

                      <div
                        data-image-fallback
                        className="absolute inset-0 hidden items-center justify-center bg-[#E7E4DA]"
                      >
                        <div className="text-center">
                          <Camera
                            size={32}
                            className="mx-auto text-[#A98216]"
                          />

                          <p className="mt-2 px-4 text-xs font-bold text-[#686961]">
                            Image unavailable
                          </p>
                        </div>
                      </div>

                      {/* OVERLAY */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11130F]/70 via-transparent to-transparent opacity-80" />

                      {/* NUMBER */}

                      <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/35 text-xs font-black text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* STATUS */}

                      <div
                        className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.08em] backdrop-blur-md ${imageStatus.className}`}
                      >
                        <ImageStatusIcon size={11} />

                        {imageStatus.label}
                      </div>

                      {/* CAMERA */}

                      <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur-md">
                        <Camera size={14} />
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-4">

                      <h3 className="text-sm font-black text-[#171815] sm:text-base">
                        {progress.title ||
                          `Progress Update ${index + 1}`}
                      </h3>

                      {progress.description && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#686961]">
                          {progress.description}
                        </p>
                      )}

                      {progress.date && (
                        <div className="mt-3 flex items-center gap-2 border-t border-[#E3DFD4] pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#999990]">
                          <CalendarDays size={12} />
                          {progress.date}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              STATUS CARDS
          ================================================= */}

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <StatusCard
              active={status.label === "Upcoming"}
              icon={Circle}
              title="Upcoming"
              description="Project planned for future execution."
            />

            <StatusCard
              active={status.label === "Ongoing"}
              icon={Clock3}
              title="Ongoing"
              description="Construction work is currently in progress."
            />

            <StatusCard
              active={status.label === "Completed"}
              icon={CheckCircle2}
              title="Completed"
              description="Project construction has been successfully completed."
            />

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#171815] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#C9A227]/10 blur-3xl sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#C9A227]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-10 lg:p-14">

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

              <div className="max-w-2xl">

                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C9A227]" />

                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C9A227] sm:text-sm">
                    Start Your Project
                  </p>
                </div>

                <h2 className="mt-4 text-[clamp(2.2rem,6vw,4.5rem)] font-black leading-[0.98] tracking-[-0.04em] text-[#F8F7F2]">
                  Have a project

                  <span className="block text-[#C9A227]">
                    in mind?
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#B8B8AF] sm:text-base sm:leading-8">
                  Talk to Saam Infrastructure about your construction,
                  infrastructure, renovation or development requirements.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-[#C9A227] px-5 py-3 text-sm font-black text-[#171815] shadow-[0_15px_40px_rgba(201,162,39,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E0C45C] sm:w-fit sm:px-6 sm:py-3.5"
              >
                Discuss Your Project

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171815] text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#171815]">
                  <ArrowUpRight size={17} />
                </span>
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// =========================================================
// SECTION LABEL
// =========================================================

function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[3px] w-10 rounded-full bg-[#C9A227]" />

      <span className="text-xs font-black uppercase tracking-[0.24em] text-[#A98216] sm:text-sm">
        {text}
      </span>
    </div>
  );
}

// =========================================================
// PROJECT META
// =========================================================

function ProjectMeta({
  icon: Icon,
  label,
  value,
  highlight = false,
  last = false,
}) {
  return (
    <div
      className={`
        group
        flex
        items-start
        gap-4
        p-5
        sm:p-6
        lg:p-7
        ${
          !last
            ? "border-b border-[#E6E2D7] md:border-r md:last:border-r-0 lg:border-b-0 lg:border-r"
            : ""
        }
      `}
    >

      <div
        className={`
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          transition-all
          duration-300
          group-hover:bg-[#C9A227]
          group-hover:text-[#171815]
          ${
            highlight
              ? "border-[#C9A227] bg-[#FFF9E8] text-[#C9A227]"
              : "border-[#DDD9CC] bg-[#F8F7F2] text-[#A98216]"
          }
        `}
      >
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#999990] sm:text-xs">
          {label}
        </p>

        <p
          className={`
            mt-1.5
            break-words
            text-sm
            font-bold
            leading-6
            sm:text-base
            ${
              highlight
                ? "text-[#A98216]"
                : "text-[#252621]"
            }
          `}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// =========================================================
// TIMELINE CARD
// =========================================================

function TimelineCard({
  icon: Icon,
  label,
  value,
  number,
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-[#DDD9CC] bg-white p-6 shadow-[0_10px_35px_rgba(23,24,21,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227] hover:shadow-[0_20px_45px_rgba(23,24,21,0.08)] sm:p-8">

      <span className="absolute right-5 top-4 select-none text-6xl font-black leading-none text-[#C9A227]/[0.07] sm:text-7xl">
        {number}
      </span>

      <div className="relative flex items-center gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF9E8] text-[#C9A227]">
          <Icon size={21} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#999990]">
            {label}
          </p>

          <p className="mt-1.5 break-words text-xl font-black text-[#252621] sm:text-2xl">
            {value}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-2 text-xs font-bold text-[#686961]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />

        Saam Infrastructure

        <ChevronRight size={13} />

        Project Timeline
      </div>
    </div>
  );
}

// =========================================================
// STATUS CARD
// =========================================================

function StatusCard({
  active,
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[1.5rem]
        border
        p-6
        transition-all
        duration-300
        sm:p-7
        ${
          active
            ? "border-[#C9A227] bg-[#FFF9E8] shadow-[0_15px_40px_rgba(201,162,39,0.12)]"
            : "border-[#DDD9CC] bg-[#F8F7F2] hover:-translate-y-1 hover:border-[#C9A227] hover:bg-white"
        }
      `}
    >

      <div
        className={`
          absolute
          left-0
          top-0
          h-1
          w-full
          ${
            active
              ? "bg-[#C9A227]"
              : "bg-transparent group-hover:bg-[#C9A227]/40"
          }
        `}
      />

      <div
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          ${
            active
              ? "border-[#C9A227] bg-white text-[#C9A227]"
              : "border-[#DDD9CC] bg-white text-[#999990]"
          }
        `}
      >
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-xl font-black text-[#252621]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#686961]">
        {description}
      </p>

      {active && (
        <div className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#A98216] sm:text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#C9A227]" />

          Current Status
        </div>
      )}
    </div>
  );
}

export default ProjectDetailsPage;