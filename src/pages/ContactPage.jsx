/* eslint-disable react-hooks/set-state-in-effect */

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
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

/* ============================================================
   CONFIG
============================================================ */

const API_BASE_URL = "http://localhost:8080/api";

/* ============================================================
   DEFAULT PAGE CONTENT
============================================================ */

const DEFAULT_PAGE_CONTENT = {
  enabled: true,

  contactSectionEnabled: true,
  enquiryFormEnabled: true,
  mapSectionEnabled: true,
  bottomCtaEnabled: true,
  footerEnabled: true,

  introLabel: "Get In Touch",
  introTitle:
    "We're here to help with your next project.",
  introDescription:
    "Contact our team for construction, infrastructure, renovation, development or project management requirements.",
  enquiryDecorativeNumber: "01",

  contactPhoneLinkPrefix: "tel:",
  contactEmailLinkPrefix: "mailto:",
  addressAriaLabel:
    "Open Saam Infrastructure office location in Google Maps",
  addressDirectionText: "Get Directions",

  enquiryLabel: "Project Enquiry",
  enquiryTitle: "Tell us about your project.",
  enquiryDescription:
    "Fill in the details below and our team will get back to you shortly.",

  nameLabel: "Full Name",
  namePlaceholder: "Enter your full name",

  phoneLabel: "Phone Number",
  phonePlaceholder: "10-digit mobile number",

  emailLabel: "Email Address",
  emailPlaceholder: "Enter your email",

  projectTypeLabel: "Project Type",
  projectTypePlaceholder: "Select project type",

  messageLabel: "Project Details",
  messagePlaceholder:
    "Tell us about your project requirements...",

  nameRequiredError:
    "Please enter your full name.",
  nameMinLengthError:
    "Name must contain at least 2 characters.",

  phoneRequiredError:
    "Please enter your phone number.",
  phoneInvalidError:
    "Please enter a valid 10-digit mobile number.",

  emailRequiredError:
    "Please enter your email address.",
  emailInvalidError:
    "Please enter a valid email address.",

  projectTypeRequiredError:
    "Please select a project type.",

  messageRequiredError:
    "Please tell us about your project.",
  messageMinLengthError:
    "Project details should contain at least 10 characters.",

  successTitle:
    "Thank you for contacting us.",
  successDescription:
    "Your enquiry has been received successfully.",

  requiredFieldsText:
    "All fields are required.",
  responseTimeText:
    "We usually respond within 24 hours.",
  submitButtonText:
    "Send Project Enquiry",

  mapLabel: "Find Us",
  mapTitle: "Visit our office.",
  mapDescription:
    "Our office is conveniently located at Old Dighori Square, Umred Road, Dighori, Nagpur.",

  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Plot+No.+2,+Dhawale+Building,+Old+Dighori+Square,+Umred+Rd,+Dighori,+Nagpur,+Maharashtra+440034",

  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Plot+No.+2,+Dhawale+Building,+Old+Dighori+Square,+Umred+Rd,+Dighori,+Nagpur,+Maharashtra+440034&output=embed",

  mapIframeTitle:
    "Saam Infrastructure Office Location",

  mapAddressBrand:
    "Saam Infrastructure",

  mapOpenLocationText:
    "Open location",

  mapButtonText:
    "Open in Google Maps",

  ctaLabel:
    "Start Your Project",

  ctaTitle:
    "Ready to build something meaningful?",

  ctaDescription:
    "Talk to Saam Infrastructure about your construction, infrastructure or development requirements.",

  ctaButtonText:
    "Talk to Our Team",

  ctaButtonLink:
    "tel:9822735116",

  footerBrand:
    "Saam Infrastructure",

  footerDescription:
    "Quality construction. Reliable execution.",

  footerBackHomeText:
    "Back to Home",
};

/* ============================================================
   DEFAULT CONTACT INFORMATION
============================================================ */

const DEFAULT_INFO_ITEMS = [
  {
    id: "default-phone",
    type: "phone",
    icon: "Phone",
    label: "Phone",
    value: "9822735116",
    description:
      "Call us for project enquiries",
    link: "tel:9822735116",
    linkText: "",
    ariaLabel: "",
    enabled: true,
    displayOrder: 0,
  },
  {
    id: "default-email",
    type: "email",
    icon: "Mail",
    label: "Email",
    value:
      "saaminfrastructure@gmail.com",
    description:
      "Send us your project requirements",
    link:
      "mailto:saaminfrastructure@gmail.com",
    linkText: "",
    ariaLabel: "",
    enabled: true,
    displayOrder: 1,
  },
  {
    id: "default-address",
    type: "address",
    icon: "MapPin",
    label: "Office Address",
    value:
      "Plot No. 2, Dhawale Building,\nOld Dighori Square, Umred Rd,\nDighori, Nagpur,\nMaharashtra 440034",
    description: "",
    link:
      DEFAULT_PAGE_CONTENT.googleMapsUrl,
    linkText: "Get Directions",
    ariaLabel:
      DEFAULT_PAGE_CONTENT.addressAriaLabel,
    enabled: true,
    displayOrder: 2,
  },
];

/* ============================================================
   DEFAULT WORKING HOURS
============================================================ */

const DEFAULT_WORKING_HOURS = [
  {
    id: "default-hours-1",
    dayLabel: "Monday – Saturday",
    timeText: "10:00 AM – 7:00 PM",
    statusText: "",
    enabled: true,
    displayOrder: 0,
  },
  {
    id: "default-hours-2",
    dayLabel: "Sunday",
    timeText: "",
    statusText: "Closed",
    enabled: true,
    displayOrder: 1,
  },
];

/* ============================================================
   DEFAULT PROJECT TYPES
============================================================ */

const DEFAULT_PROJECT_TYPES = [
  "Civil Construction",
  "Commercial Project",
  "Residential Construction",
  "Infrastructure Development",
  "Industrial Construction",
  "Renovation & Development",
  "Engineering & Project Management",
  "Other",
].map((name, index) => ({
  id: `default-project-type-${index}`,
  name,
  enabled: true,
  displayOrder: index,
}));

/* ============================================================
   HELPERS
============================================================ */

const clone = (value) =>
  JSON.parse(JSON.stringify(value));

const normalizePageContent = (value) => ({
  ...clone(DEFAULT_PAGE_CONTENT),
  ...(value && typeof value === "object"
    ? value
    : {}),
});

const normalizeList = (
  value,
  fallback
) => {
  if (!Array.isArray(value)) {
    return clone(fallback);
  }

  return value.map((item, index) => ({
    ...item,
    displayOrder:
      Number.isFinite(item?.displayOrder)
        ? item.displayOrder
        : index,
  }));
};

const sortByDisplayOrder = (items = []) =>
  [...items].sort(
    (a, b) =>
      (a?.displayOrder ?? 0) -
      (b?.displayOrder ?? 0)
  );

const getInfoType = (item) =>
  String(item?.type || "").toLowerCase();

const isAddressItem = (item) =>
  getInfoType(item) === "address" ||
  item?.icon === "MapPin";

const getAddressLines = (value) =>
  String(value || "").split(
    /\r?\n/
  );

const getInfoLink = (
  item,
  pageContent
) => {
  if (item?.link) {
    return item.link;
  }

  const type = getInfoType(item);

  if (
    type === "phone" ||
    item?.icon === "Phone"
  ) {
    return `${
      pageContent.contactPhoneLinkPrefix ||
      "tel:"
    }${String(
      item?.value || ""
    ).replace(/\s+/g, "")}`;
  }

  if (
    type === "email" ||
    item?.icon === "Mail"
  ) {
    return `${
      pageContent.contactEmailLinkPrefix ||
      "mailto:"
    }${String(
      item?.value || ""
    ).trim()}`;
  }

  return (
    pageContent.googleMapsUrl ||
    "#"
  );
};

const getInfoAriaLabel = (
  item,
  pageContent
) => {
  if (item?.ariaLabel) {
    return item.ariaLabel;
  }

  if (isAddressItem(item)) {
    return (
      pageContent.addressAriaLabel ||
      "Open office location in Google Maps"
    );
  }

  if (
    getInfoType(item) === "phone" ||
    item?.icon === "Phone"
  ) {
    return `Call ${
      item?.value || "Saam Infrastructure"
    }`;
  }

  if (
    getInfoType(item) === "email" ||
    item?.icon === "Mail"
  ) {
    return `Email ${
      item?.value || "Saam Infrastructure"
    }`;
  }

  return (
    item?.label ||
    "Contact"
  );
};

const getInfoDirectionText = (
  item,
  pageContent
) => {
  if (!isAddressItem(item)) {
    return "";
  }

  return (
    item.linkText ||
    pageContent.addressDirectionText ||
    ""
  );
};

/* ============================================================
   API
============================================================ */

const apiRequest = async (
  endpoint,
  options = {}
) => {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...(options.body
          ? {
              "Content-Type":
                "application/json",
            }
          : {}),
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();

    let message = text;

    try {
      const parsed = text
        ? JSON.parse(text)
        : null;

      if (
        parsed &&
        typeof parsed === "object"
      ) {
        message =
          parsed.message ||
          parsed.error ||
          parsed.detail ||
          text;
      }
    } catch {
      // Keep response text.
    }

    throw new Error(
      message ||
        `Request failed with status ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

/* ============================================================
   CONTACT INFO CONTENT
   This is intentionally a separate static component.
============================================================ */

function ContactInfoItemContent({
  item,
  pageContent,
}) {
  const address =
    isAddressItem(item);

  const type =
    getInfoType(item);

  const directionText =
    getInfoDirectionText(
      item,
      pageContent
    );

  return (
    <>
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
        {item?.icon === "Phone" ? (
          <Phone size={19} />
        ) : item?.icon === "Mail" ? (
          <Mail size={19} />
        ) : item?.icon === "MessageSquare" ? (
          <MessageSquare size={19} />
        ) : (
          <MapPin size={19} />
        )}
      </div>

      <div
        className={`min-w-0 ${
          address ? "flex-1" : ""
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98978F] sm:text-xs">
          {item?.label || "Contact"}
        </p>

        {address ? (
          <p className="mt-2 text-sm font-semibold leading-6 text-[#171916] sm:text-base sm:leading-7">
            {getAddressLines(
              item?.value
            ).map(
              (line, index) => (
                <span
                  key={`${line}-${index}`}
                >
                  {line}

                  {index <
                    getAddressLines(
                      item?.value
                    ).length -
                      1 && (
                    <br />
                  )}
                </span>
              )
            )}
          </p>
        ) : (
          <p
            className={`mt-1.5 ${
              type === "email"
                ? "break-all text-sm sm:text-lg"
                : "text-base sm:text-lg"
            } font-bold text-[#171916]`}
          >
            {item?.value || ""}
          </p>
        )}

        {item?.description && (
          <p className="mt-1 text-xs text-[#77776F] sm:text-sm">
            {item.description}
          </p>
        )}

        {directionText && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#B58A32] sm:text-sm">
            {directionText}

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
        )}
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
    </>
  );
}

/* ============================================================
   CONTACT INFO ITEM
   No dynamic component variables are created during render.
============================================================ */

function ContactInfoItemView({
  item,
  pageContent,
}) {
  const href = getInfoLink(
    item,
    pageContent
  );

  const ariaLabel =
    getInfoAriaLabel(
      item,
      pageContent
    );

  const address =
    isAddressItem(item);

  const externalLink =
    address ||
    /^https?:\/\//i.test(
      href || ""
    );

  const content = (
    <ContactInfoItemContent
      item={item}
      pageContent={pageContent}
    />
  );

  if (!href) {
    return (
      <div
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
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={
        externalLink
          ? "_blank"
          : undefined
      }
      rel={
        externalLink
          ? "noopener noreferrer"
          : undefined
      }
      aria-label={ariaLabel}
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
      {content}
    </a>
  );
}

/* ============================================================
   WORKING HOURS
============================================================ */

function WorkingHoursView({
  items,
}) {
  const visibleItems =
    sortByDisplayOrder(items).filter(
      (item) =>
        item?.enabled !== false
    );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
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
          {visibleItems.map(
            (item, index) => (
              <div
                key={
                  item.id ||
                  `${item.dayLabel}-${index}`
                }
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
              >
                <span className="text-sm font-medium text-[#555650]">
                  {item.dayLabel}
                </span>

                <span
                  className={`text-sm font-bold ${
                    item.statusText
                      ? "text-[#9B7629]"
                      : "text-[#171916]"
                  }`}
                >
                  {item.statusText ||
                    item.timeText}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CONTACT PAGE
============================================================ */

function ContactPage() {
  const [pageContent, setPageContent] =
    useState(
      clone(DEFAULT_PAGE_CONTENT)
    );

  const [infoItems, setInfoItems] =
    useState(
      clone(DEFAULT_INFO_ITEMS)
    );

  const [workingHours, setWorkingHours] =
    useState(
      clone(DEFAULT_WORKING_HOURS)
    );

  const [projectTypes, setProjectTypes] =
    useState(
      clone(DEFAULT_PROJECT_TYPES)
    );

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      message: "",
    });

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  /* ==========================================================
     LOAD CONTACT CMS
  ========================================================== */

  const loadContactContent =
    useCallback(async () => {
      try {
        const [
          pageData,
          infoData,
          hoursData,
          typesData,
        ] = await Promise.all([
          apiRequest(
            "/contact-page"
          ),
          apiRequest(
            "/contact-page/info/enabled"
          ),
          apiRequest(
            "/contact-page/working-hours/enabled"
          ),
          apiRequest(
            "/contact-page/project-types/enabled"
          ),
        ]);

        if (pageData) {
          setPageContent(
            normalizePageContent(
              pageData
            )
          );
        }

        if (
          Array.isArray(infoData)
        ) {
          setInfoItems(
            normalizeList(
              infoData,
              DEFAULT_INFO_ITEMS
            )
          );
        }

        if (
          Array.isArray(
            hoursData
          )
        ) {
          setWorkingHours(
            normalizeList(
              hoursData,
              DEFAULT_WORKING_HOURS
            )
          );
        }

        if (
          Array.isArray(
            typesData
          )
        ) {
          setProjectTypes(
            normalizeList(
              typesData,
              DEFAULT_PROJECT_TYPES
            )
          );
        }
      } catch (error) {
        console.error(
          "Contact page CMS load error:",
          error
        );

        /*
          Keep the existing finalized page
          using local defaults if the backend
          is unavailable.
        */
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadContactContent();
  }, [loadContactContent]);

  /* ==========================================================
     VISIBLE DATA
  ========================================================== */

  const visibleInfoItems =
    useMemo(
      () =>
        sortByDisplayOrder(
          infoItems
        ).filter(
          (item) =>
            item?.enabled !== false
        ),
      [infoItems]
    );

  const visibleWorkingHours =
    useMemo(
      () =>
        sortByDisplayOrder(
          workingHours
        ).filter(
          (item) =>
            item?.enabled !== false
        ),
      [workingHours]
    );

  const visibleProjectTypes =
    useMemo(
      () =>
        sortByDisplayOrder(
          projectTypes
        ).filter(
          (item) =>
            item?.enabled !== false &&
            String(
              item?.name || ""
            ).trim()
        ),
      [projectTypes]
    );

  /* ==========================================================
     CTA PHONE
  ========================================================== */

  const phoneInfo =
    visibleInfoItems.find(
      (item) =>
        getInfoType(item) ===
          "phone" ||
        item?.icon === "Phone"
    );

  const ctaButtonLink =
    pageContent.ctaButtonLink ||
    (phoneInfo
      ? getInfoLink(
          phoneInfo,
          pageContent
        )
      : "tel:9822735116");

  /* ==========================================================
     INPUT CHANGE
  ========================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    const nextValue =
      name === "phone"
        ? value
            .replace(/\D/g, "")
            .slice(0, 10)
        : value;

    setFormData(
      (prev) => ({
        ...prev,
        [name]: nextValue,
      })
    );

    if (errors[name]) {
      setErrors(
        (prev) => ({
          ...prev,
          [name]: "",
        })
      );
    }

    setSubmitted(false);
    setSubmitError("");
  };

  /* ==========================================================
     VALIDATE
  ========================================================== */

  const validateForm = () => {
    const newErrors = {};

    const trimmedName =
      formData.name.trim();

    const trimmedPhone =
      formData.phone.trim();

    const trimmedEmail =
      formData.email.trim();

    const trimmedMessage =
      formData.message.trim();

    if (!trimmedName) {
      newErrors.name =
        pageContent.nameRequiredError;
    } else if (
      trimmedName.length < 2
    ) {
      newErrors.name =
        pageContent.nameMinLengthError;
    }

    if (!trimmedPhone) {
      newErrors.phone =
        pageContent.phoneRequiredError;
    } else if (
      !/^[6-9]\d{9}$/.test(
        trimmedPhone
      )
    ) {
      newErrors.phone =
        pageContent.phoneInvalidError;
    }

    if (!trimmedEmail) {
      newErrors.email =
        pageContent.emailRequiredError;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        trimmedEmail
      )
    ) {
      newErrors.email =
        pageContent.emailInvalidError;
    }

    if (!formData.projectType) {
      newErrors.projectType =
        pageContent.projectTypeRequiredError;
    }

    if (!trimmedMessage) {
      newErrors.message =
        pageContent.messageRequiredError;
    } else if (
      trimmedMessage.length < 10
    ) {
      newErrors.message =
        pageContent.messageMinLengthError;
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setSubmitted(false);

    try {
      await apiRequest(
        "/contact-page/enquiries",
        {
          method: "POST",
          body: JSON.stringify({
            name:
              formData.name.trim(),
            phone:
              formData.phone.trim(),
            email:
              formData.email.trim(),
            projectType:
              formData.projectType,
            message:
              formData.message.trim(),
          }),
        }
      );

      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        message: "",
      });

      setErrors({});

      window.setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error(
        "Contact enquiry submit error:",
        error
      );

      setSubmitError(
        error?.message ||
          "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ==========================================================
     PAGE DISABLED
  ========================================================== */

  if (
    !loading &&
    pageContent.enabled ===
      false
  ) {
    return null;
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F8F5ED] text-[#171916]">
      {/* ============================================================
          CONTACT + FORM
      ============================================================ */}

      {pageContent.contactSectionEnabled !==
        false && (
        <section className="bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-24">
              {/* LEFT */}

              <div className="min-w-0">
                {/* LABEL */}

                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="h-[2px] w-10 shrink-0 bg-[#C9A24A] sm:w-12 md:w-14" />

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
                    {pageContent.introLabel}
                  </p>
                </div>

                {/* HEADING */}

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
                  {pageContent.introTitle}
                </h1>

                {/* DESCRIPTION */}

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
                  {
                    pageContent.introDescription
                  }
                </p>

                {/* CONTACT DETAILS */}

                <div className="mt-8 sm:mt-12">
                  {visibleInfoItems.map(
                    (item, index) => (
                      <ContactInfoItemView
                        key={
                          item.id ||
                          `${item.type}-${index}`
                        }
                        item={item}
                        pageContent={
                          pageContent
                        }
                      />
                    )
                  )}

                  <WorkingHoursView
                    items={
                      visibleWorkingHours
                    }
                  />
                </div>
              </div>

              {/* RIGHT FORM */}

              {pageContent.enquiryFormEnabled !==
                false && (
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
                    {
                      pageContent.enquiryDecorativeNumber
                    }
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
                    <div className="absolute left-0 right-0 top-0 h-1.5 bg-[#C9A24A]" />

                    <div className="border-b border-[#E4DFD3] pb-6 sm:pb-7">
                      <div className="flex items-center gap-3">
                        <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-10" />

                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B7629] sm:text-xs sm:tracking-[0.25em]">
                          {
                            pageContent.enquiryLabel
                          }
                        </p>
                      </div>

                      <h2 className="mt-4 text-2xl font-black leading-tight text-[#171916] sm:text-4xl">
                        {
                          pageContent.enquiryTitle
                        }
                      </h2>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-[#6F7069] sm:text-base sm:leading-7">
                        {
                          pageContent.enquiryDescription
                        }
                      </p>
                    </div>

                    {/* SUCCESS */}

                    {submitted && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#668F3C]/20 bg-[#668F3C]/10 px-4 py-4">
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-[#668F3C]"
                        />

                        <div>
                          <p className="font-semibold text-[#171916]">
                            {
                              pageContent.successTitle
                            }
                          </p>

                          <p className="mt-1 text-sm text-[#66665F]">
                            {
                              pageContent.successDescription
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ERROR */}

                    {submitError && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                        <AlertCircle
                          size={20}
                          className="mt-0.5 shrink-0 text-red-600"
                        />

                        <div>
                          <p className="font-semibold text-[#171916]">
                            Unable to submit
                            your enquiry.
                          </p>

                          <p className="mt-1 text-sm text-red-700">
                            {submitError}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* FORM */}

                    <form
                      onSubmit={
                        handleSubmit
                      }
                      className="mt-7 space-y-5 sm:mt-8 sm:space-y-6"
                      noValidate
                    >
                      {/* NAME */}

                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                        >
                          {
                            pageContent.nameLabel
                          }
                          <span className="text-[#B58A32]">
                            *
                          </span>
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
                            value={
                              formData.name
                            }
                            onChange={
                              handleChange
                            }
                            placeholder={
                              pageContent.namePlaceholder
                            }
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
                            <AlertCircle
                              size={14}
                            />
                            {
                              errors.name
                            }
                          </div>
                        )}
                      </div>

                      {/* PHONE + EMAIL */}

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                          >
                            {
                              pageContent.phoneLabel
                            }
                            <span className="text-[#B58A32]">
                              *
                            </span>
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
                              value={
                                formData.phone
                              }
                              onChange={
                                handleChange
                              }
                              placeholder={
                                pageContent.phonePlaceholder
                              }
                              autoComplete="tel"
                              inputMode="numeric"
                              maxLength={
                                10
                              }
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
                              <AlertCircle
                                size={14}
                              />
                              {
                                errors.phone
                              }
                            </div>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                          >
                            {
                              pageContent.emailLabel
                            }
                            <span className="text-[#B58A32]">
                              *
                            </span>
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
                              value={
                                formData.email
                              }
                              onChange={
                                handleChange
                              }
                              placeholder={
                                pageContent.emailPlaceholder
                              }
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
                              <AlertCircle
                                size={14}
                              />
                              {
                                errors.email
                              }
                            </div>
                          )}
                        </div>
                      </div>

                      {/* PROJECT TYPE */}

                      <div>
                        <label
                          htmlFor="projectType"
                          className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                        >
                          {
                            pageContent.projectTypeLabel
                          }
                          <span className="text-[#B58A32]">
                            *
                          </span>
                        </label>

                        <div className="relative">
                          <Building2
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C988D]"
                          />

                          <select
                            id="projectType"
                            name="projectType"
                            value={
                              formData.projectType
                            }
                            onChange={
                              handleChange
                            }
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
                              {
                                pageContent.projectTypePlaceholder
                              }
                            </option>

                            {visibleProjectTypes.map(
                              (
                                type,
                                index
                              ) => (
                                <option
                                  key={
                                    type.id ||
                                    `${type.name}-${index}`
                                  }
                                  value={
                                    type.name
                                  }
                                >
                                  {
                                    type.name
                                  }
                                </option>
                              )
                            )}
                          </select>

                          <ChevronDown
                            size={19}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9B7629]"
                          />
                        </div>

                        {errors.projectType && (
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                            <AlertCircle
                              size={14}
                            />
                            {
                              errors.projectType
                            }
                          </div>
                        )}
                      </div>

                      {/* MESSAGE */}

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-[#30312D]"
                        >
                          {
                            pageContent.messageLabel
                          }
                          <span className="text-[#B58A32]">
                            *
                          </span>
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
                            value={
                              formData.message
                            }
                            onChange={
                              handleChange
                            }
                            placeholder={
                              pageContent.messagePlaceholder
                            }
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
                            <AlertCircle
                              size={14}
                            />
                            {
                              errors.message
                            }
                          </div>
                        )}
                      </div>

                      {/* REQUIRED NOTE */}

                      <div className="flex flex-col gap-2 border-t border-[#E4DFD3] pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <p className="text-xs leading-5 text-[#88877F]">
                          <span className="text-[#B58A32]">
                            *
                          </span>{" "}
                          {
                            pageContent.requiredFieldsText
                          }
                        </p>

                        <p className="text-xs text-[#9B7629]">
                          {
                            pageContent.responseTimeText
                          }
                        </p>
                      </div>

                      {/* SUBMIT */}

                      <button
                        type="submit"
                        disabled={
                          submitting
                        }
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
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                          disabled:hover:translate-y-0
                          disabled:hover:shadow-[0_8px_20px_rgba(201,162,74,0.18)]
                        "
                      >
                        {submitting
                          ? "Sending..."
                          : pageContent.submitButtonText}

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
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          MAP
      ============================================================ */}

      {pageContent.mapSectionEnabled !==
        false && (
        <section className="bg-[#F8F5ED] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 sm:mb-11">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#C9A24A] sm:w-10" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9B7629] sm:text-xs sm:tracking-[0.25em]">
                  {pageContent.mapLabel}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="text-3xl font-black text-[#171916] sm:text-4xl md:text-5xl">
                  {pageContent.mapTitle}
                </h2>

                <p className="max-w-xl text-sm leading-7 text-[#6F7069] sm:text-base">
                  {
                    pageContent.mapDescription
                  }
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] bg-[#EDE8DB] shadow-[0_20px_50px_rgba(23,25,22,0.08)] sm:rounded-[24px]">
              <iframe
                title={
                  pageContent.mapIframeTitle
                }
                src={
                  pageContent.googleMapsEmbedUrl
                }
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

            <div className="mt-6 flex flex-col gap-5 sm:mt-7 md:flex-row md:items-center md:justify-between">
              <a
                href={
                  pageContent.googleMapsUrl
                }
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
                    {
                      pageContent.mapAddressBrand
                    }
                  </p>

                  <p className="mt-1 max-w-2xl whitespace-pre-line text-sm leading-6 text-[#555650] sm:text-base">
                    {(
                      visibleInfoItems.find(
                        (item) =>
                          isAddressItem(
                            item
                          )
                      )?.value ||
                      ""
                    )}
                  </p>

                  <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-[#B58A32] sm:text-sm">
                    {
                      pageContent.mapOpenLocationText
                    }

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
                href={
                  pageContent.googleMapsUrl
                }
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
                {
                  pageContent.mapButtonText
                }

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
      )}

      {/* ============================================================
          BOTTOM CTA
      ============================================================ */}

      {pageContent.bottomCtaEnabled !==
        false && (
        <section className="relative overflow-hidden bg-[#171916] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full border border-[#C9A24A]/15 sm:h-96 sm:w-96" />

          <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-56 w-56 rounded-full border border-[#C9A24A]/10" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A24A] sm:text-sm sm:tracking-[0.28em]">
                {pageContent.ctaLabel}
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                {pageContent.ctaTitle}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#B9B9B0] sm:text-base sm:leading-8">
                {
                  pageContent.ctaDescription
                }
              </p>
            </div>

            <a
              href={
                ctaButtonLink
              }
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
              {pageContent.ctaButtonText}

              <Phone
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </section>
      )}

      {/* ============================================================
          FOOTER
      ============================================================ */}

      {pageContent.footerEnabled !==
        false && (
        <section className="bg-white px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold text-[#171916]">
                {
                  pageContent.footerBrand
                }
              </p>

              <p className="mt-1 text-xs text-[#77776F] sm:text-sm">
                {
                  pageContent.footerDescription
                }
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
              {
                pageContent.footerBackHomeText
              }

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
      )}
    </main>
  );
}

export default ContactPage;
