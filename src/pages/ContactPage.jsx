import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock3,
  CheckCircle2,
  AlertCircle,
  User,
  Building2,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // ============================================================
  // OFFICE ADDRESS
  // ============================================================

  const officeAddress =
    "Plot No. 2, Dhawale Building, Old Dighori Square, Umred Rd, Dighori, Nagpur, Maharashtra 440034";

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Plot+No.+2,+Dhawale+Building,+Old+Dighori+Square,+Umred+Rd,+Dighori,+Nagpur,+Maharashtra+440034";

  const googleMapsEmbedUrl =
    "https://www.google.com/maps?q=Plot+No.+2,+Dhawale+Building,+Old+Dighori+Square,+Umred+Rd,+Dighori,+Nagpur,+Maharashtra+440034&output=embed";

  // ============================================================
  // HANDLE INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setSubmitted(false);
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const validateForm = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // NAME
    if (!trimmedName) {
      newErrors.name = "Please enter your full name.";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    // PHONE
    if (!trimmedPhone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    // EMAIL
    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // PROJECT TYPE
    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type.";
    }

    // MESSAGE
    if (!trimmedMessage) {
      newErrors.message = "Please tell us about your project.";
    } else if (trimmedMessage.length < 10) {
      newErrors.message =
        "Project details should contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      message: "",
    });

    setErrors({});

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F8F5ED] text-[#171916]">

      {/* ============================================================
          CONTACT + FORM
      ============================================================ */}

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-24">

            {/* ======================================================
                LEFT - CONTACT INFORMATION
            ====================================================== */}

            <div className="min-w-0">

              {/* ==================================================
                  GET IN TOUCH LABEL
              ================================================== */}

              <div className="flex items-center gap-3 sm:gap-4">

                {/* GOLD LINE */}

                <span className="h-[2px] w-10 shrink-0 bg-[#C9A24A] sm:w-12 md:w-14" />

                {/* LABEL */}

                <p
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-[#C9A24A]/30
                    bg-[#C9A24A]/[0.08]
                    px-3
                    py-1.5
                    text-sm
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-[#9B7629]
                    shadow-sm
                    sm:px-4
                    sm:py-2
                    sm:text-base
                    sm:tracking-[0.26em]
                    md:text-lg
                    md:tracking-[0.28em]
                  "
                >
                  Get In Touch
                </p>

              </div>

              {/* ==================================================
                  HEADING
              ================================================== */}

              <h1
                className="
                  mt-6
                  max-w-lg
                  text-3xl
                  font-black
                  leading-[1.05]
                  text-[#171916]
                  sm:mt-7
                  sm:text-4xl
                  md:text-5xl
                  lg:text-[3.4rem]
                "
              >
                We're here to help with your next project.
              </h1>

              {/* ==================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  mt-5
                  max-w-lg
                  text-sm
                  leading-7
                  text-[#6F7069]
                  sm:text-base
                  sm:leading-8
                "
              >
                Contact our team for construction, infrastructure,
                renovation, development or project management
                requirements.
              </p>

              {/* ==================================================
                  CONTACT DETAILS
              ================================================== */}

              <div className="mt-8 sm:mt-12">

                {/* ==================================================
                    PHONE
                ================================================== */}

                <a
                  href="tel:9822735116"
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    border-t
                    border-[#DCD7CA]
                    py-5
                    transition-all
                    duration-300
                    hover:bg-[#FCFBF8]
                    hover:pl-2
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F8F5ED]
                      text-[#B58A32]
                      transition-all
                      duration-300
                      group-hover:bg-[#C9A24A]
                      group-hover:text-[#171916]
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Phone size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98978F] sm:text-xs">
                      Phone
                    </p>

                    <p className="mt-1.5 text-base font-bold text-[#171916] sm:text-lg">
                      9822735116
                    </p>

                    <p className="mt-1 text-xs text-[#77776F] sm:text-sm">
                      Call us for project enquiries
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="
                      ml-auto
                      mt-1
                      hidden
                      shrink-0
                      text-[#B58A32]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:opacity-100
                      sm:block
                    "
                  />
                </a>

                {/* ==================================================
                    EMAIL
                ================================================== */}

                <a
                  href="mailto:saaminfrastructure@gmail.com"
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    border-t
                    border-[#DCD7CA]
                    py-5
                    transition-all
                    duration-300
                    hover:bg-[#FCFBF8]
                    hover:pl-2
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F8F5ED]
                      text-[#B58A32]
                      transition-all
                      duration-300
                      group-hover:bg-[#C9A24A]
                      group-hover:text-[#171916]
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98978F] sm:text-xs">
                      Email
                    </p>

                    <p className="mt-1.5 break-all text-sm font-bold text-[#171916] sm:text-lg">
                      saaminfrastructure@gmail.com
                    </p>

                    <p className="mt-1 text-xs text-[#77776F] sm:text-sm">
                      Send us your project requirements
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="
                      ml-auto
                      mt-1
                      hidden
                      shrink-0
                      text-[#B58A32]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:opacity-100
                      sm:block
                    "
                  />
                </a>

                {/* ==================================================
                    ADDRESS
                ================================================== */}

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Saam Infrastructure office location in Google Maps"
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    border-t
                    border-[#DCD7CA]
                    py-5
                    transition-all
                    duration-300
                    hover:bg-[#FCFBF8]
                    hover:pl-2
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F8F5ED]
                      text-[#B58A32]
                      transition-all
                      duration-300
                      group-hover:bg-[#C9A24A]
                      group-hover:text-[#171916]
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <MapPin size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98978F] sm:text-xs">
                      Office Address
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-[#171916] sm:text-base sm:leading-7">
                      Plot No. 2, Dhawale Building,
                      <br />
                      Old Dighori Square, Umred Rd,
                      <br />
                      Dighori, Nagpur,
                      <br />
                      Maharashtra 440034
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#B58A32] sm:text-sm">
                      Get Directions

                      <ArrowUpRight
                        size={14}
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="
                      ml-auto
                      mt-1
                      hidden
                      shrink-0
                      text-[#B58A32]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:opacity-100
                      sm:block
                    "
                  />
                </a>

                {/* ==================================================
                    WORKING HOURS
                ================================================== */}

                <div
                  className="
                    flex
                    items-start
                    gap-4
                    border-y
                    border-[#DCD7CA]
                    py-5
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F8F5ED]
                      text-[#B58A32]
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Clock3 size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98978F] sm:text-xs">
                      Working Hours
                    </p>

                    <div className="mt-3 space-y-3">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                        <span className="text-sm font-medium text-[#555650]">
                          Monday – Saturday
                        </span>

                        <span className="text-sm font-bold text-[#171916]">
                          10:00 AM – 7:00 PM
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[#555650]">
                          Sunday
                        </span>

                        <span className="text-sm font-bold text-[#9B7629]">
                          Closed
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ======================================================
                RIGHT - FORM
            ====================================================== */}

            <div className="relative min-w-0">

              {/* DECORATIVE NUMBER */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-2
                  -top-6
                  select-none
                  text-[70px]
                  font-black
                  leading-none
                  text-[#F2EEE3]
                  sm:-right-5
                  sm:-top-12
                  sm:text-[130px]
                  lg:text-[150px]
                "
              >
                01
              </div>

              {/* FORM CARD */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#E3DDCF]
                  bg-[#FCFBF8]
                  p-5
                  shadow-[0_20px_60px_rgba(23,25,22,0.08)]
                  sm:rounded-[28px]
                  sm:p-8
                  lg:rounded-[32px]
                  lg:p-10
                "
              >

                {/* GOLD TOP LINE */}

                <div className="absolute left-0 right-0 top-0 h-1.5 bg-[#C9A24A]" />

                {/* FORM HEADER */}

                <div className="border-b border-[#E4DFD3] pb-6 sm:pb-7">

                  <div className="flex items-center gap-3">

                    <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-10" />

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B7629] sm:text-xs sm:tracking-[0.25em]">
                      Project Enquiry
                    </p>

                  </div>

                  <h2 className="mt-4 text-2xl font-black leading-tight text-[#171916] sm:text-4xl">
                    Tell us about your project.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#6F7069] sm:text-base sm:leading-7">
                    Fill in the details below and our team will
                    get back to you shortly.
                  </p>

                </div>

                {/* SUCCESS MESSAGE */}

                {submitted && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#668F3C]/20 bg-[#668F3C]/10 px-4 py-4">

                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-[#668F3C]"
                    />

                    <div>
                      <p className="font-semibold text-[#171916]">
                        Thank you for contacting us.
                      </p>

                      <p className="mt-1 text-sm text-[#66665F]">
                        Your enquiry has been received successfully.
                      </p>
                    </div>

                  </div>
                )}

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5 sm:mt-8 sm:space-y-6"
                  noValidate
                >

                  {/* ==================================================
                      NAME
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                    >
                      Full Name
                      <span className="text-[#B58A32]">*</span>
                    </label>

                    <div className="relative">

                      <User
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C988D]"
                      />

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className={`
                          h-14
                          w-full
                          rounded-xl
                          border
                          bg-white
                          pl-11
                          pr-4
                          text-sm
                          font-medium
                          text-[#171916]
                          outline-none
                          transition-all
                          duration-200
                          placeholder:text-[#A5A39B]
                          focus:ring-4
                          ${
                            errors.name
                              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                              : "border-[#D9D3C6] focus:border-[#C9A24A] focus:ring-[#C9A24A]/10"
                          }
                        `}
                      />

                    </div>

                    {errors.name && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                        <AlertCircle size={14} />
                        {errors.name}
                      </div>
                    )}

                  </div>

                  {/* ==================================================
                      PHONE + EMAIL
                  ================================================== */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* PHONE */}

                    <div>

                      <label
                        htmlFor="phone"
                        className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                      >
                        Phone Number
                        <span className="text-[#B58A32]">*</span>
                      </label>

                      <div className="relative">

                        <Phone
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C988D]"
                        />

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          autoComplete="tel"
                          inputMode="numeric"
                          maxLength={10}
                          className={`
                            h-14
                            w-full
                            rounded-xl
                            border
                            bg-white
                            pl-11
                            pr-4
                            text-sm
                            font-medium
                            text-[#171916]
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-[#A5A39B]
                            focus:ring-4
                            ${
                              errors.phone
                                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                : "border-[#D9D3C6] focus:border-[#C9A24A] focus:ring-[#C9A24A]/10"
                            }
                          `}
                        />

                      </div>

                      {errors.phone && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                          <AlertCircle size={14} />
                          {errors.phone}
                        </div>
                      )}

                    </div>

                    {/* EMAIL */}

                    <div>

                      <label
                        htmlFor="email"
                        className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                      >
                        Email Address
                        <span className="text-[#B58A32]">*</span>
                      </label>

                      <div className="relative">

                        <Mail
                          size={18}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C988D]"
                        />

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          autoComplete="email"
                          className={`
                            h-14
                            w-full
                            rounded-xl
                            border
                            bg-white
                            pl-11
                            pr-4
                            text-sm
                            font-medium
                            text-[#171916]
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-[#A5A39B]
                            focus:ring-4
                            ${
                              errors.email
                                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                : "border-[#D9D3C6] focus:border-[#C9A24A] focus:ring-[#C9A24A]/10"
                            }
                          `}
                        />

                      </div>

                      {errors.email && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                          <AlertCircle size={14} />
                          {errors.email}
                        </div>
                      )}

                    </div>

                  </div>

                  {/* ==================================================
                      PROJECT TYPE
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="projectType"
                      className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                    >
                      Project Type
                      <span className="text-[#B58A32]">*</span>
                    </label>

                    <div className="relative">

                      <Building2
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C988D]"
                      />

                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={`
                          h-14
                          w-full
                          appearance-none
                          rounded-xl
                          border
                          bg-white
                          pl-11
                          pr-11
                          text-sm
                          font-medium
                          text-[#171916]
                          outline-none
                          transition-all
                          duration-200
                          focus:ring-4
                          ${
                            errors.projectType
                              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                              : "border-[#D9D3C6] focus:border-[#C9A24A] focus:ring-[#C9A24A]/10"
                          }
                        `}
                      >

                        <option value="">
                          Select project type
                        </option>

                        <option value="Civil Construction">
                          Civil Construction
                        </option>

                        <option value="Commercial">
                          Commercial Project
                        </option>

                        <option value="Residential">
                          Residential Construction
                        </option>

                        <option value="Infrastructure">
                          Infrastructure Development
                        </option>

                        <option value="Industrial">
                          Industrial Construction
                        </option>

                        <option value="Renovation">
                          Renovation & Development
                        </option>

                        <option value="Project Management">
                          Engineering & Project Management
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                      <ChevronDown
                        size={19}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9B7629]"
                      />

                    </div>

                    {errors.projectType && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                        <AlertCircle size={14} />
                        {errors.projectType}
                      </div>
                    )}

                  </div>

                  {/* ==================================================
                      MESSAGE
                  ================================================== */}

                  <div>

                    <label
                      htmlFor="message"
                      className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                    >
                      Project Details
                      <span className="text-[#B58A32]">*</span>
                    </label>

                    <div className="relative">

                      <MessageSquare
                        size={18}
                        className="pointer-events-none absolute left-4 top-4 text-[#9C988D]"
                      />

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project requirements..."
                        className={`
                          min-h-[140px]
                          w-full
                          resize-none
                          rounded-xl
                          border
                          bg-white
                          py-4
                          pl-11
                          pr-4
                          text-sm
                          font-medium
                          leading-6
                          text-[#171916]
                          outline-none
                          transition-all
                          duration-200
                          placeholder:text-[#A5A39B]
                          focus:ring-4
                          ${
                            errors.message
                              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                              : "border-[#D9D3C6] focus:border-[#C9A24A] focus:ring-[#C9A24A]/10"
                          }
                        `}
                      />

                    </div>

                    {errors.message && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                        <AlertCircle size={14} />
                        {errors.message}
                      </div>
                    )}

                  </div>

                  {/* ==================================================
                      REQUIRED NOTE
                  ================================================== */}

                  <div className="flex flex-col gap-2 border-t border-[#E4DFD3] pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

                    <p className="text-xs leading-5 text-[#88877F]">
                      <span className="text-[#B58A32]">*</span>{" "}
                      All fields are required.
                    </p>

                    <p className="text-xs text-[#9B7629]">
                      We usually respond within 24 hours.
                    </p>

                  </div>

                  {/* ==================================================
                      SUBMIT BUTTON
                  ================================================== */}

                  <button
                    type="submit"
                    className="
                      group
                      flex
                      min-h-[54px]
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      bg-[#C9A24A]
                      px-6
                      py-4
                      text-sm
                      font-bold
                      text-[#171916]
                      shadow-[0_8px_20px_rgba(201,162,74,0.18)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#DDBB62]
                      hover:shadow-[0_15px_35px_rgba(201,162,74,0.25)]
                      active:translate-y-0
                    "
                  >
                    Send Project Enquiry

                    <ArrowUpRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                    />
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          MAP
      ============================================================ */}

      <section className="bg-[#F8F5ED] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {/* MAP HEADER */}

          <div className="mb-7 sm:mb-11">

            <div className="flex items-center gap-3">

              <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-10" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B7629] sm:text-xs sm:tracking-[0.25em]">
                Find Us
              </p>

            </div>

            <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

              <h2 className="text-3xl font-black text-[#171916] sm:text-4xl md:text-5xl">
                Visit our office.
              </h2>

              <p className="max-w-xl text-sm leading-7 text-[#6F7069] sm:text-base">
                Our office is conveniently located at Old Dighori
                Square, Umred Road, Dighori, Nagpur.
              </p>

            </div>
          </div>

          {/* RESPONSIVE MAP */}

          <div className="overflow-hidden rounded-[18px] bg-[#EDE8DB] shadow-[0_20px_50px_rgba(23,25,22,0.08)] sm:rounded-[24px]">

            <iframe
              title="Saam Infrastructure Office Location"
              src={googleMapsEmbedUrl}
              width="100%"
              height="450"
              style={{
                border: 0,
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="
                h-[260px]
                w-full
                sm:h-[380px]
                lg:h-[450px]
              "
            />

          </div>

          {/* ADDRESS BELOW MAP */}

          <div className="mt-6 flex flex-col gap-5 sm:mt-7 md:flex-row md:items-center md:justify-between">

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                -ml-2
                flex
                min-w-0
                items-start
                gap-4
                rounded-xl
                p-2
                transition-colors
                duration-300
                hover:bg-white/70
              "
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#B58A32] shadow-sm sm:h-12 sm:w-12">
                <MapPin size={19} />
              </div>

              <div className="min-w-0">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98978F] sm:text-xs">
                  Saam Infrastructure
                </p>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#555650] sm:text-base">
                  {officeAddress}
                </p>

                <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-[#B58A32] sm:text-sm">
                  Open location

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </p>

              </div>
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                min-h-[50px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#C9A24A]
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#171916]
                transition-all
                duration-300
                hover:bg-[#C9A24A]
                sm:w-fit
              "
            >
              Open in Google Maps

              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </a>

          </div>
        </div>
      </section>

      {/* ============================================================
          BOTTOM CTA
      ============================================================ */}

      <section className="relative overflow-hidden bg-[#171916] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

        <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full border border-[#C9A24A]/15 sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-56 w-56 rounded-full border border-[#C9A24A]/10" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div className="min-w-0">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A24A] sm:text-sm sm:tracking-[0.28em]">
              Start Your Project
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Ready to build something meaningful?
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9B9B0] sm:text-base sm:leading-8">
              Talk to Saam Infrastructure about your construction,
              infrastructure or development requirements.
            </p>

          </div>

          <a
            href="tel:9822735116"
            className="
              group
              inline-flex
              min-h-[52px]
              w-full
              shrink-0
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#C9A24A]
              px-7
              py-4
              text-sm
              font-bold
              text-[#171916]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#DDBB62]
              hover:shadow-[0_15px_35px_rgba(201,162,74,0.25)]
              sm:w-fit
            "
          >
            Talk to Our Team

            <Phone
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <section className="bg-white px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

          <div>

            <p className="text-sm font-bold text-[#171916]">
              Saam Infrastructure
            </p>

            <p className="mt-1 text-xs text-[#77776F] sm:text-sm">
              Quality construction. Reliable execution.
            </p>

          </div>

          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-[#9B7629]
              transition-colors
              hover:text-[#B58A32]
            "
          >
            Back to Home

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default ContactPage;