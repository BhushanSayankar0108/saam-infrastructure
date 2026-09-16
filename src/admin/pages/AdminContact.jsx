/* eslint-disable react-hooks/set-state-in-effect */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Trash2,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080/api";

/* =========================================================
   DEFAULT PAGE CONTENT
========================================================= */

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
  enquiryTitle:
    "Tell us about your project.",
  enquiryDescription:
    "Fill in the details below and our team will get back to you shortly.",

  nameLabel: "Full Name",
  namePlaceholder: "Enter your full name",

  phoneLabel: "Phone Number",
  phonePlaceholder: "10-digit mobile number",

  emailLabel: "Email Address",
  emailPlaceholder: "Enter your email",

  projectTypeLabel: "Project Type",
  projectTypePlaceholder:
    "Select project type",

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

/* =========================================================
   DEFAULT CONTACT INFO
========================================================= */

const DEFAULT_INFO_ITEMS = [
  {
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
    type: "address",
    icon: "MapPin",
    label: "Office Address",
    value:
      "Plot No. 2, Dhawale Building,\nOld Dighori Square, Umred Rd,\nDighori, Nagpur,\nMaharashtra 440034",
    description: "",
    link:
      DEFAULT_PAGE_CONTENT.googleMapsUrl,
    linkText:
      "Get Directions",
    ariaLabel:
      DEFAULT_PAGE_CONTENT.addressAriaLabel,
    enabled: true,
    displayOrder: 2,
  },
];

/* =========================================================
   DEFAULT WORKING HOURS
========================================================= */

const DEFAULT_WORKING_HOURS = [
  {
    dayLabel:
      "Monday – Saturday",
    timeText:
      "10:00 AM – 7:00 PM",
    statusText: "",
    enabled: true,
    displayOrder: 0,
  },

  {
    dayLabel: "Sunday",
    timeText: "",
    statusText: "Closed",
    enabled: true,
    displayOrder: 1,
  },
];

/* =========================================================
   DEFAULT PROJECT TYPES
========================================================= */

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
  name,
  enabled: true,
  displayOrder: index,
}));

/* =========================================================
   HELPERS
========================================================= */

const clone = (value) =>
  JSON.parse(JSON.stringify(value));

const createEditorKey = (
  prefix,
  item,
  index
) =>
  item?._editorKey ||
  `${prefix}-${item?.id || "new"}-${index}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;

const withEditorKeys = (
  items,
  prefix
) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => ({
    ...item,
    _editorKey: createEditorKey(
      prefix,
      item,
      index
    ),
  }));
};

const getIcon = (iconName) => {
  switch (iconName) {
    case "Phone":
      return Phone;

    case "Mail":
      return Mail;

    case "MapPin":
      return MapPin;

    case "MessageSquare":
      return MessageSquare;

    default:
      return Settings;
  }
};

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-[#B28A20] focus:ring-4 focus:ring-[#B28A20]/10";

const textareaClass =
  "mt-2 min-h-[105px] w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium leading-6 text-slate-900 outline-none transition focus:border-[#B28A20] focus:ring-4 focus:ring-[#B28A20]/10";

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

/* =========================================================
   API
========================================================= */

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

    throw new Error(
      text ||
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

/* =========================================================
   REUSABLE TOGGLE
========================================================= */

function AdminToggle({
  checked,
  onClick,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
        checked
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-50 text-slate-500"
      }`}
    >
      {checked ? (
        <Eye size={14} />
      ) : (
        <EyeOff size={14} />
      )}

      {checked
        ? "Enabled"
        : "Disabled"}
    </button>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  number,
  title,
  description,
  expanded,
  onToggle,
  hasVisibility,
  enabled,
  onVisibilityToggle,
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-black text-[#D7B44D] sm:h-10 sm:w-10">
          {String(number).padStart(
            2,
            "0"
          )}
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-black text-slate-900 sm:text-base">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            {description}
          </p>
        </div>
      </button>

      <div className="flex shrink-0 items-center gap-2">
        {hasVisibility && (
          <AdminToggle
            checked={enabled !== false}
            onClick={onVisibilityToggle}
            label={`${title} visibility`}
          />
        )}

        <button
          type="button"
          onClick={onToggle}
          aria-label={`Toggle ${title}`}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
        >
          {expanded ? (
            <ChevronUp size={19} />
          ) : (
            <ChevronDown
              size={19}
            />
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN CONTACT
========================================================= */

function AdminContact() {
  const [pageContent, setPageContent] =
    useState(
      clone(DEFAULT_PAGE_CONTENT)
    );

  const [pageContentId, setPageContentId] =
    useState(null);

  const [infoItems, setInfoItems] =
    useState(
      withEditorKeys(
        clone(DEFAULT_INFO_ITEMS),
        "info"
      )
    );

  const [workingHours, setWorkingHours] =
    useState(
      withEditorKeys(
        clone(DEFAULT_WORKING_HOURS),
        "hours"
      )
    );

  const [projectTypes, setProjectTypes] =
    useState(
      withEditorKeys(
        clone(DEFAULT_PROJECT_TYPES),
        "type"
      )
    );


  const [openSections, setOpenSections] =
    useState({
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: false,
      7: true,
      8: true,
    });

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [dirty, setDirty] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");



  const successTimerRef =
    useRef(null);

  /* =======================================================
     CLEANUP TIMER
  ======================================================= */

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(
          successTimerRef.current
        );
      }
    };
  }, []);

  /* =======================================================
     SUCCESS
  ======================================================= */

  const showSuccess = useCallback(
    (message) => {
      setSuccessMessage(message);
      setErrorMessage("");

      if (successTimerRef.current) {
        window.clearTimeout(
          successTimerRef.current
        );
      }

      successTimerRef.current =
        window.setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
    },
    []
  );

  /* =======================================================
     ERROR
  ======================================================= */

  const showError = useCallback(
    (message) => {
      setErrorMessage(message);
      setSuccessMessage("");
    },
    []
  );

  /* =======================================================
     DIRTY
  ======================================================= */

  const markDirty = useCallback(() => {
    setDirty(true);
    setSuccessMessage("");
  }, []);

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadAll = useCallback(
    async ({
      showLoader = true,
    } = {}) => {
      if (showLoader) {
        setLoading(true);
      }

      setRefreshing(true);
      setErrorMessage("");

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
            "/contact-page/info"
          ),
          apiRequest(
            "/contact-page/working-hours"
          ),
          apiRequest(
            "/contact-page/project-types"
          ),
        ]);

        const normalizedPage =
          pageData &&
          typeof pageData ===
            "object"
            ? {
                ...clone(
                  DEFAULT_PAGE_CONTENT
                ),
                ...pageData,
              }
            : clone(
                DEFAULT_PAGE_CONTENT
              );

        setPageContent(
          normalizedPage
        );

        setPageContentId(
          pageData?.id || null
        );

        setInfoItems(
          infoData &&
            Array.isArray(
              infoData
            ) &&
            infoData.length > 0
            ? withEditorKeys(
                infoData,
                "info"
              )
            : withEditorKeys(
                clone(
                  DEFAULT_INFO_ITEMS
                ),
                "info"
              )
        );

        setWorkingHours(
          hoursData &&
            Array.isArray(
              hoursData
            ) &&
            hoursData.length > 0
            ? withEditorKeys(
                hoursData,
                "hours"
              )
            : withEditorKeys(
                clone(
                  DEFAULT_WORKING_HOURS
                ),
                "hours"
              )
        );

        setProjectTypes(
          typesData &&
            Array.isArray(
              typesData
            ) &&
            typesData.length > 0
            ? withEditorKeys(
                typesData,
                "type"
              )
            : withEditorKeys(
                clone(
                  DEFAULT_PROJECT_TYPES
                ),
                "type"
              )
        );


        setDirty(false);
      } catch (error) {
        console.error(
          "Contact CMS load error:",
          error
        );

        showError(
          error?.message ||
            "Unable to load Contact CMS."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [showError]
  );

  useEffect(() => {
    void loadAll({
      showLoader: true,
    });
  }, [loadAll]);

  /* =======================================================
     PAGE FIELD
  ======================================================= */

  const updatePageField = useCallback(
    (field, value) => {
      setPageContent((prev) => ({
        ...prev,
        [field]: value,
      }));

      markDirty();
    },
    [markDirty]
  );

  /* =======================================================
     ARRAY FIELD
  ======================================================= */

  const updateArrayField = useCallback(
    (
      setter,
      editorKey,
      field,
      value
    ) => {
      setter((prev) =>
        prev.map((item) =>
          item._editorKey ===
          editorKey
            ? {
                ...item,
                [field]: value,
              }
            : item
        )
      );

      markDirty();
    },
    [markDirty]
  );

  /* =======================================================
     MOVE ITEM
  ======================================================= */

  const moveItem = useCallback(
    (
      setter,
      list,
      editorKey,
      direction
    ) => {
      const currentIndex =
        list.findIndex(
          (item) =>
            item._editorKey ===
            editorKey
        );

      if (currentIndex < 0) {
        return;
      }

      const targetIndex =
        direction === "up"
          ? currentIndex - 1
          : currentIndex + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= list.length
      ) {
        return;
      }

      const next = [...list];

      [
        next[currentIndex],
        next[targetIndex],
      ] = [
        next[targetIndex],
        next[currentIndex],
      ];

      setter(
        next.map(
          (item, index) => ({
            ...item,
            displayOrder: index,
          })
        )
      );

      markDirty();
    },
    [markDirty]
  );

  /* =======================================================
     ADD INFO
  ======================================================= */

  const addInfoItem = () => {
    setInfoItems((prev) => [
      ...prev,
      {
        _editorKey: `info-new-${Date.now()}`,
        type: "custom",
        icon: "Settings",
        label: "New Contact Item",
        value: "",
        description: "",
        link: "",
        linkText: "",
        ariaLabel: "",
        enabled: true,
        displayOrder: prev.length,
      },
    ]);

    markDirty();
  };

  /* =======================================================
     ADD HOURS
  ======================================================= */

  const addWorkingHour = () => {
    setWorkingHours((prev) => [
      ...prev,
      {
        _editorKey: `hours-new-${Date.now()}`,
        dayLabel: "New Day",
        timeText:
          "10:00 AM – 7:00 PM",
        statusText: "",
        enabled: true,
        displayOrder: prev.length,
      },
    ]);

    markDirty();
  };

  /* =======================================================
     ADD PROJECT TYPE
  ======================================================= */

  const addProjectType = () => {
    setProjectTypes((prev) => [
      ...prev,
      {
        _editorKey: `type-new-${Date.now()}`,
        name: "New Project Type",
        enabled: true,
        displayOrder: prev.length,
      },
    ]);

    markDirty();
  };

  /* =======================================================
     REMOVE INFO
  ======================================================= */

  const removeInfoItem = (
    editorKey
  ) => {
    setInfoItems((prev) =>
      prev.filter(
        (item) =>
          item._editorKey !==
          editorKey
      )
    );

    markDirty();
  };

  /* =======================================================
     REMOVE HOURS
  ======================================================= */

  const removeWorkingHour = (
    editorKey
  ) => {
    setWorkingHours((prev) =>
      prev.filter(
        (item) =>
          item._editorKey !==
          editorKey
      )
    );

    markDirty();
  };

  /* =======================================================
     REMOVE PROJECT TYPE
  ======================================================= */

  const removeProjectType = (
    editorKey
  ) => {
    setProjectTypes((prev) =>
      prev.filter(
        (item) =>
          item._editorKey !==
          editorKey
      )
    );

    markDirty();
  };

  /* =======================================================
     SAVE PAGE
  ======================================================= */

  const savePageContent = async () => {
    const payload = {
      ...pageContent,
    };

    delete payload.id;

    if (pageContentId) {
      return apiRequest(
        `/contact-page/${pageContentId}`,
        {
          method: "PUT",
          body: JSON.stringify(
            payload
          ),
        }
      );
    }

    return apiRequest(
      "/contact-page",
      {
        method: "POST",
        body: JSON.stringify(
          payload
        ),
      }
    );
  };

  /* =======================================================
     SAVE INFO
  ======================================================= */

  const saveInfoItems = async () => {
    /*
      IMPORTANT:
      Always synchronize the complete list from the editor.

      We intentionally remove the currently stored Contact Info
      records first and then recreate exactly what is in the
      editor. This prevents duplicates caused by Reset Defaults
      followed by Save All, and also removes stale deleted items.
    */
    const storedItems =
      await apiRequest(
        "/contact-page/info"
      );

    if (Array.isArray(storedItems)) {
      for (const storedItem of storedItems) {
        if (storedItem?.id) {
          await apiRequest(
            `/contact-page/info/${storedItem.id}`,
            {
              method: "DELETE",
            }
          );
        }
      }
    }

    const savedItems = [];

    for (
      let index = 0;
      index < infoItems.length;
      index += 1
    ) {
      const item =
        infoItems[index];

      const payload = {
        type:
          item.type ||
          "custom",
        icon:
          item.icon ||
          "Settings",
        label:
          item.label ||
          "",
        value:
          item.value ||
          "",
        description:
          item.description ||
          "",
        link:
          item.link ||
          "",
        linkText:
          item.linkText ||
          "",
        ariaLabel:
          item.ariaLabel ||
          "",
        enabled:
          item.enabled !==
          false,
        displayOrder: index,
      };

      const response =
        await apiRequest(
          "/contact-page/info",
          {
            method: "POST",
            body: JSON.stringify(
              payload
            ),
          }
        );

      savedItems.push({
        ...response,
        _editorKey:
          item._editorKey,
      });
    }

    return savedItems;
  };

  /* =======================================================
     SAVE HOURS
  ======================================================= */

  const saveWorkingHours =
    async () => {
      /*
        Rebuild the complete Working Hours list so Save All
        can never leave duplicate/default records behind.
      */
      const storedItems =
        await apiRequest(
          "/contact-page/working-hours"
        );

      if (Array.isArray(storedItems)) {
        for (const storedItem of storedItems) {
          if (storedItem?.id) {
            await apiRequest(
              `/contact-page/working-hours/${storedItem.id}`,
              {
                method: "DELETE",
              }
            );
          }
        }
      }

      const savedItems = [];

      for (
        let index = 0;
        index <
        workingHours.length;
        index += 1
      ) {
        const item =
          workingHours[index];

        const payload = {
          dayLabel:
            item.dayLabel ||
            "",
          timeText:
            item.timeText ||
            "",
          statusText:
            item.statusText ||
            "",
          enabled:
            item.enabled !==
            false,
          displayOrder: index,
        };

        const response =
          await apiRequest(
            "/contact-page/working-hours",
            {
              method: "POST",
              body: JSON.stringify(
                payload
              ),
            }
          );

        savedItems.push({
          ...response,
          _editorKey:
            item._editorKey,
        });
      }

      return savedItems;
    };

  /* =======================================================
     SAVE TYPES
  ======================================================= */

  const saveProjectTypes =
    async () => {
      /*
        Rebuild the complete Project Type list so old
        records can never accumulate after Reset Defaults.
      */
      const storedItems =
        await apiRequest(
          "/contact-page/project-types"
        );

      if (Array.isArray(storedItems)) {
        for (const storedItem of storedItems) {
          if (storedItem?.id) {
            await apiRequest(
              `/contact-page/project-types/${storedItem.id}`,
              {
                method: "DELETE",
              }
            );
          }
        }
      }

      const savedItems = [];

      for (
        let index = 0;
        index <
        projectTypes.length;
        index += 1
      ) {
        const item =
          projectTypes[index];

        const payload = {
          name:
            item.name || "",
          enabled:
            item.enabled !==
            false,
          displayOrder: index,
        };

        const response =
          await apiRequest(
            "/contact-page/project-types",
            {
              method: "POST",
              body: JSON.stringify(
                payload
              ),
            }
          );

        savedItems.push({
          ...response,
          _editorKey:
            item._editorKey,
        });
      }

      return savedItems;
    };

  /* =======================================================
     SAVE ALL
  ======================================================= */

  const saveAll = async () => {
    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const savedPage =
        await savePageContent();

      const savedInfo =
        await saveInfoItems();

      const savedHours =
        await saveWorkingHours();

      const savedTypes =
        await saveProjectTypes();

      if (savedPage) {
        setPageContent({
          ...clone(
            DEFAULT_PAGE_CONTENT
          ),
          ...savedPage,
        });

        setPageContentId(
          savedPage.id ||
            pageContentId
        );
      }

      setInfoItems(
        withEditorKeys(
          savedInfo || [],
          "info"
        )
      );

      setWorkingHours(
        withEditorKeys(
          savedHours || [],
          "hours"
        )
      );

      setProjectTypes(
        withEditorKeys(
          savedTypes || [],
          "type"
        )
      );

      setDirty(false);

      showSuccess(
        "Contact CMS saved successfully."
      );
    } catch (error) {
      console.error(
        "Contact CMS save error:",
        error
      );

      showError(
        error?.message ||
          "Unable to save Contact CMS."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     RESET DEFAULTS
  ======================================================= */

  const resetDefaults = () => {
    const confirmed =
      window.confirm(
        "Reset the Contact CMS editor to the default Contact page content? Your current unsaved changes will be replaced."
      );

    if (!confirmed) {
      return;
    }

    setPageContent(
      clone(DEFAULT_PAGE_CONTENT)
    );

    setInfoItems(
      withEditorKeys(
        clone(DEFAULT_INFO_ITEMS),
        "info"
      )
    );

    setWorkingHours(
      withEditorKeys(
        clone(
          DEFAULT_WORKING_HOURS
        ),
        "hours"
      )
    );

    setProjectTypes(
      withEditorKeys(
        clone(
          DEFAULT_PROJECT_TYPES
        ),
        "type"
      )
    );

    setDirty(true);
    setSuccessMessage("");
    setErrorMessage("");
  };

  /* =======================================================
     SECTION TOGGLE
  ======================================================= */

  const toggleSection = (
    number
  ) => {
    setOpenSections((prev) => ({
      ...prev,
      [number]: !prev[number],
    }));
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-[#0F172A] p-6 text-white shadow-lg sm:p-8">
            <div className="flex items-center gap-3">
              <RefreshCw
                size={20}
                className="animate-spin"
              />

              <span className="font-bold">
                Loading Contact CMS...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-28 text-slate-900">
      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-500">
              ← Saam Infrastructure
            </p>

            <h1 className="truncate text-lg font-black text-slate-900 sm:text-xl">
              Contact
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() =>
                void loadAll({
                  showLoader: false,
                })
              }
              disabled={
                refreshing ||
                saving
              }
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

            <button
              type="button"
              onClick={
                saveAll
              }
              disabled={saving}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#0F172A] px-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              {saving ? (
                <RefreshCw
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              <span className="hidden sm:inline">
                {saving
                  ? "Saving..."
                  : "Save All"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        {/* ===================================================
            INTRO
        =================================================== */}

        <section className="overflow-hidden rounded-3xl bg-[#0F172A] shadow-lg">
          <div className="relative px-5 py-7 sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full border border-[#D7B44D]/15" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D7B44D]/30 bg-[#D7B44D]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#D7B44D]">
                  <Settings size={14} />
                  Website Management
                </div>

                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Contact Page CMS
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                  Manage Contact content,
                  sections, contact
                  information, project
                  types, working hours,
                  map, CTA and footer.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Page Status
                </p>

                <div className="mt-2">
                  <AdminToggle
                    checked={
                      pageContent.enabled !==
                      false
                    }
                    onClick={() =>
                      updatePageField(
                        "enabled",
                        pageContent.enabled ===
                          false
                      )
                    }
                    label="Contact page visibility"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {successMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-sm">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span className="font-semibold">
              {successMessage}
            </span>
          </div>
        )}

        {/* ===================================================
            ERROR
        =================================================== */}

        {errorMessage && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span className="font-semibold">
              {errorMessage}
            </span>
          </div>
        )}

        {dirty && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            You have unsaved Contact
            page changes.
          </div>
        )}

        {/* ===================================================
            SECTION 01
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={1}
            title="Contact & Intro"
            description="Manage the introductory content and Contact section visibility."
            expanded={
              openSections[1]
            }
            onToggle={() =>
              toggleSection(1)
            }
            hasVisibility
            enabled={
              pageContent.contactSectionEnabled
            }
            onVisibilityToggle={() =>
              updatePageField(
                "contactSectionEnabled",
                !pageContent.contactSectionEnabled
              )
            }
          />

          {openSections[1] && (
            <div className="border-t border-slate-100 p-4 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Get In Touch Label
                  </label>

                  <input
                    value={
                      pageContent.introLabel ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "introLabel",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Decorative Number
                  </label>

                  <input
                    value={
                      pageContent.enquiryDecorativeNumber ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "enquiryDecorativeNumber",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Main Heading
                  </label>

                  <input
                    value={
                      pageContent.introTitle ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "introTitle",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={
                      pageContent.introDescription ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "introDescription",
                        event.target.value
                      )
                    }
                    className={textareaClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Phone Link Prefix
                  </label>

                  <input
                    value={
                      pageContent.contactPhoneLinkPrefix ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "contactPhoneLinkPrefix",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Email Link Prefix
                  </label>

                  <input
                    value={
                      pageContent.contactEmailLinkPrefix ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "contactEmailLinkPrefix",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Address ARIA Label
                  </label>

                  <input
                    value={
                      pageContent.addressAriaLabel ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "addressAriaLabel",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Address Direction Text
                  </label>

                  <input
                    value={
                      pageContent.addressDirectionText ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "addressDirectionText",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 02
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={2}
            title="Contact Information"
            description="Manage phone, email, address and additional contact information."
            expanded={
              openSections[2]
            }
            onToggle={() =>
              toggleSection(2)
            }
          />

          {openSections[2] && (
            <div className="space-y-4 border-t border-slate-100 p-4 sm:p-6">
              {infoItems.length ===
              0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    No contact
                    information items.
                  </p>
                </div>
              ) : (
                infoItems.map(
                  (item, index) => {
                    const Icon =
                      getIcon(
                        item.icon
                      );

                    return (
                      <div
                        key={
                          item._editorKey
                        }
                        className={
                          cardClass
                        }
                      >
                        <div className="grid gap-5 xl:grid-cols-[210px_1fr_auto]">
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8F5ED] text-[#B28A20]">
                              <Icon
                                size={20}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                Item{" "}
                                {index +
                                  1}
                              </p>

                              <p className="mt-1 break-words text-sm font-black text-slate-800">
                                {item.type ||
                                  "custom"}
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Type
                              </label>

                              <input
                                value={
                                  item.type ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "type",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  inputClass
                                }
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Icon
                              </label>

                              <select
                                value={
                                  item.icon ||
                                  "Settings"
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "icon",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  inputClass
                                }
                              >
                                <option value="Phone">
                                  Phone
                                </option>

                                <option value="Mail">
                                  Mail
                                </option>

                                <option value="MapPin">
                                  MapPin
                                </option>

                                <option value="MessageSquare">
                                  MessageSquare
                                </option>

                                <option value="Settings">
                                  Settings
                                </option>
                              </select>
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Label
                              </label>

                              <input
                                value={
                                  item.label ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "label",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  inputClass
                                }
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Value / Address
                              </label>

                              <textarea
                                value={
                                  item.value ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "value",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  textareaClass
                                }
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Description
                              </label>

                              <textarea
                                value={
                                  item.description ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "description",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  textareaClass
                                }
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Link
                              </label>

                              <input
                                value={
                                  item.link ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "link",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  inputClass
                                }
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                Link Text
                              </label>

                              <input
                                value={
                                  item.linkText ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "linkText",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  inputClass
                                }
                              />
                            </div>

                            <div>
                              <label className="text-xs font-bold text-slate-600">
                                ARIA Label
                              </label>

                              <input
                                value={
                                  item.ariaLabel ||
                                  ""
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateArrayField(
                                    setInfoItems,
                                    item._editorKey,
                                    "ariaLabel",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className={
                                  inputClass
                                }
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 xl:flex-col xl:items-end">
                            <AdminToggle
                              checked={
                                item.enabled !==
                                false
                              }
                              onClick={() =>
                                updateArrayField(
                                  setInfoItems,
                                  item._editorKey,
                                  "enabled",
                                  item.enabled ===
                                    false
                                )
                              }
                              label={`Contact information item ${
                                index +
                                1
                              }`}
                            />

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  moveItem(
                                    setInfoItems,
                                    infoItems,
                                    item._editorKey,
                                    "up"
                                  )
                                }
                                disabled={
                                  index ===
                                  0
                                }
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                <ArrowUp
                                  size={
                                    15
                                  }
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  moveItem(
                                    setInfoItems,
                                    infoItems,
                                    item._editorKey,
                                    "down"
                                  )
                                }
                                disabled={
                                  index ===
                                  infoItems.length -
                                    1
                                }
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                <ArrowDown
                                  size={
                                    15
                                  }
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  removeInfoItem(
                                    item._editorKey
                                  )
                                }
                                className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                              >
                                <Trash2
                                  size={
                                    15
                                  }
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
              )}

              <button
                type="button"
                onClick={
                  addInfoItem
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#B28A20] bg-[#B28A20]/5 px-4 py-3 text-sm font-bold text-[#8A691A] transition hover:bg-[#B28A20]/10"
              >
                <Plus size={17} />
                Add Contact
                Information
              </button>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 03
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={3}
            title="Working Hours"
            description="Manage all working-hour rows and their visibility."
            expanded={
              openSections[3]
            }
            onToggle={() =>
              toggleSection(3)
            }
          />

          {openSections[3] && (
            <div className="space-y-4 border-t border-slate-100 p-4 sm:p-6">
              {workingHours.map(
                (item, index) => (
                  <div
                    key={
                      item._editorKey
                    }
                    className={
                      cardClass
                    }
                  >
                    <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
                      <div>
                        <label className="text-xs font-bold text-slate-600">
                          Day / Period
                        </label>

                        <input
                          value={
                            item.dayLabel ||
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateArrayField(
                              setWorkingHours,
                              item._editorKey,
                              "dayLabel",
                              event
                                .target
                                .value
                            )
                          }
                          className={
                            inputClass
                          }
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-600">
                          Time Text
                        </label>

                        <input
                          value={
                            item.timeText ||
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateArrayField(
                              setWorkingHours,
                              item._editorKey,
                              "timeText",
                              event
                                .target
                                .value
                            )
                          }
                          className={
                            inputClass
                          }
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-600">
                          Status Text
                        </label>

                        <input
                          value={
                            item.statusText ||
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateArrayField(
                              setWorkingHours,
                              item._editorKey,
                              "statusText",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Example: Closed"
                          className={
                            inputClass
                          }
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 lg:flex-col">
                        <AdminToggle
                          checked={
                            item.enabled !==
                            false
                          }
                          onClick={() =>
                            updateArrayField(
                              setWorkingHours,
                              item._editorKey,
                              "enabled",
                              item.enabled ===
                                false
                            )
                          }
                          label={`Working hour ${
                            index + 1
                          }`}
                        />

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              moveItem(
                                setWorkingHours,
                                workingHours,
                                item._editorKey,
                                "up"
                              )
                            }
                            disabled={
                              index ===
                              0
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <ArrowUp
                              size={
                                15
                              }
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              moveItem(
                                setWorkingHours,
                                workingHours,
                                item._editorKey,
                                "down"
                              )
                            }
                            disabled={
                              index ===
                              workingHours.length -
                                1
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <ArrowDown
                              size={
                                15
                              }
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeWorkingHour(
                                item._editorKey
                              )
                            }
                            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2
                              size={
                                15
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={
                  addWorkingHour
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#B28A20] bg-[#B28A20]/5 px-4 py-3 text-sm font-bold text-[#8A691A] transition hover:bg-[#B28A20]/10"
              >
                <Plus size={17} />
                Add Working Hour
              </button>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 04
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={4}
            title="Project Enquiry Form"
            description="Control form labels, placeholders, validation messages and success content."
            expanded={
              openSections[4]
            }
            onToggle={() =>
              toggleSection(4)
            }
            hasVisibility
            enabled={
              pageContent.enquiryFormEnabled
            }
            onVisibilityToggle={() =>
              updatePageField(
                "enquiryFormEnabled",
                !pageContent.enquiryFormEnabled
              )
            }
          />

          {openSections[4] && (
            <div className="border-t border-slate-100 p-4 sm:p-6">
              <div className="space-y-8">
                <div className="grid gap-5 lg:grid-cols-3">
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Form Label
                    </label>

                    <input
                      value={
                        pageContent.enquiryLabel ||
                        ""
                      }
                      onChange={(event) =>
                        updatePageField(
                          "enquiryLabel",
                          event.target.value
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="text-sm font-bold text-slate-700">
                      Form Title
                    </label>

                    <input
                      value={
                        pageContent.enquiryTitle ||
                        ""
                      }
                      onChange={(event) =>
                        updatePageField(
                          "enquiryTitle",
                          event.target.value
                        )
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <label className="text-sm font-bold text-slate-700">
                      Form Description
                    </label>

                    <textarea
                      value={
                        pageContent.enquiryDescription ||
                        ""
                      }
                      onChange={(event) =>
                        updatePageField(
                          "enquiryDescription",
                          event.target.value
                        )
                      }
                      className={
                        textareaClass
                      }
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-800">
                    Field Labels &
                    Placeholders
                  </h3>

                  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      [
                        "nameLabel",
                        "Name Label",
                      ],
                      [
                        "namePlaceholder",
                        "Name Placeholder",
                      ],
                      [
                        "phoneLabel",
                        "Phone Label",
                      ],
                      [
                        "phonePlaceholder",
                        "Phone Placeholder",
                      ],
                      [
                        "emailLabel",
                        "Email Label",
                      ],
                      [
                        "emailPlaceholder",
                        "Email Placeholder",
                      ],
                      [
                        "projectTypeLabel",
                        "Project Type Label",
                      ],
                      [
                        "projectTypePlaceholder",
                        "Project Type Placeholder",
                      ],
                      [
                        "messageLabel",
                        "Message Label",
                      ],
                      [
                        "messagePlaceholder",
                        "Message Placeholder",
                      ],
                    ].map(
                      ([
                        field,
                        label,
                      ]) => (
                        <div
                          key={field}
                        >
                          <label className="text-xs font-bold text-slate-600">
                            {label}
                          </label>

                          {field ===
                          "messagePlaceholder" ? (
                            <textarea
                              value={
                                pageContent[
                                  field
                                ] ||
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updatePageField(
                                  field,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className={
                                textareaClass
                              }
                            />
                          ) : (
                            <input
                              value={
                                pageContent[
                                  field
                                ] ||
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updatePageField(
                                  field,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className={
                                inputClass
                              }
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-800">
                    Validation
                    Messages
                  </h3>

                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    {[
                      [
                        "nameRequiredError",
                        "Name Required",
                      ],
                      [
                        "nameMinLengthError",
                        "Name Minimum Length",
                      ],
                      [
                        "phoneRequiredError",
                        "Phone Required",
                      ],
                      [
                        "phoneInvalidError",
                        "Phone Invalid",
                      ],
                      [
                        "emailRequiredError",
                        "Email Required",
                      ],
                      [
                        "emailInvalidError",
                        "Email Invalid",
                      ],
                      [
                        "projectTypeRequiredError",
                        "Project Type Required",
                      ],
                      [
                        "messageRequiredError",
                        "Message Required",
                      ],
                      [
                        "messageMinLengthError",
                        "Message Minimum Length",
                      ],
                    ].map(
                      ([
                        field,
                        label,
                      ]) => (
                        <div
                          key={field}
                        >
                          <label className="text-xs font-bold text-slate-600">
                            {label}
                          </label>

                          <input
                            value={
                              pageContent[
                                field
                              ] ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updatePageField(
                                field,
                                event
                                  .target
                                  .value
                              )
                            }
                            className={
                              inputClass
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-800">
                    Success &
                    Submit Area
                  </h3>

                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Success Title
                      </label>

                      <input
                        value={
                          pageContent.successTitle ||
                          ""
                        }
                        onChange={(event) =>
                          updatePageField(
                            "successTitle",
                            event.target.value
                          )
                        }
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Success Description
                      </label>

                      <textarea
                        value={
                          pageContent.successDescription ||
                          ""
                        }
                        onChange={(event) =>
                          updatePageField(
                            "successDescription",
                            event.target.value
                          )
                        }
                        className={
                          textareaClass
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Required Fields Text
                      </label>

                      <input
                        value={
                          pageContent.requiredFieldsText ||
                          ""
                        }
                        onChange={(event) =>
                          updatePageField(
                            "requiredFieldsText",
                            event.target.value
                          )
                        }
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Response Time Text
                      </label>

                      <input
                        value={
                          pageContent.responseTimeText ||
                          ""
                        }
                        onChange={(event) =>
                          updatePageField(
                            "responseTimeText",
                            event.target.value
                          )
                        }
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-600">
                        Submit Button Text
                      </label>

                      <input
                        value={
                          pageContent.submitButtonText ||
                          ""
                        }
                        onChange={(event) =>
                          updatePageField(
                            "submitButtonText",
                            event.target.value
                          )
                        }
                        className={
                          inputClass
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 05
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={5}
            title="Project Type Options"
            description="Manage the dropdown options shown on the public Contact form."
            expanded={
              openSections[5]
            }
            onToggle={() =>
              toggleSection(5)
            }
          />

          {openSections[5] && (
            <div className="space-y-4 border-t border-slate-100 p-4 sm:p-6">
              {projectTypes.map(
                (item, index) => (
                  <div
                    key={
                      item._editorKey
                    }
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F172A] text-sm font-black text-[#D7B44D]">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <label className="text-xs font-bold text-slate-600">
                        Project Type
                      </label>

                      <input
                        value={
                          item.name ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateArrayField(
                            setProjectTypes,
                            item._editorKey,
                            "name",
                            event
                              .target
                              .value
                          )
                        }
                        className={
                          inputClass
                        }
                      />
                    </div>

                    <AdminToggle
                      checked={
                        item.enabled !==
                        false
                      }
                      onClick={() =>
                        updateArrayField(
                          setProjectTypes,
                          item._editorKey,
                          "enabled",
                          item.enabled ===
                            false
                        )
                      }
                      label={`Project type ${
                        index + 1
                      }`}
                    />

                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          moveItem(
                            setProjectTypes,
                            projectTypes,
                            item._editorKey,
                            "up"
                          )
                        }
                        disabled={
                          index ===
                          0
                        }
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowUp
                          size={15}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveItem(
                            setProjectTypes,
                            projectTypes,
                            item._editorKey,
                            "down"
                          )
                        }
                        disabled={
                          index ===
                          projectTypes.length -
                            1
                        }
                        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <ArrowDown
                          size={15}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeProjectType(
                            item._editorKey
                          )
                        }
                        className="rounded-lg border border-red-200 bg-white p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2
                          size={15}
                        />
                      </button>
                    </div>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={
                  addProjectType
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#B28A20] bg-[#B28A20]/5 px-4 py-3 text-sm font-bold text-[#8A691A] transition hover:bg-[#B28A20]/10"
              >
                <Plus size={17} />
                Add Project Type
              </button>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 06
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={6}
            title="Map / Location"
            description="Control the map heading, address and Google Maps URLs."
            expanded={
              openSections[6]
            }
            onToggle={() =>
              toggleSection(6)
            }
            hasVisibility
            enabled={
              pageContent.mapSectionEnabled
            }
            onVisibilityToggle={() =>
              updatePageField(
                "mapSectionEnabled",
                !pageContent.mapSectionEnabled
              )
            }
          />

          {openSections[6] && (
            <div className="border-t border-slate-100 p-4 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Find Us Label
                  </label>

                  <input
                    value={
                      pageContent.mapLabel ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapLabel",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Map Title
                  </label>

                  <input
                    value={
                      pageContent.mapTitle ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapTitle",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Map Description
                  </label>

                  <textarea
                    value={
                      pageContent.mapDescription ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapDescription",
                        event.target.value
                      )
                    }
                    className={
                      textareaClass
                    }
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Google Maps URL
                  </label>

                  <input
                    value={
                      pageContent.googleMapsUrl ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "googleMapsUrl",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />

                  <a
                    href={
                      pageContent.googleMapsUrl ||
                      "#"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#8A691A] hover:underline"
                  >
                    Test Google Maps
                    URL
                    <ExternalLink
                      size={13}
                    />
                  </a>
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    Google Maps Embed URL
                  </label>

                  <textarea
                    value={
                      pageContent.googleMapsEmbedUrl ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "googleMapsEmbedUrl",
                        event.target.value
                      )
                    }
                    className={
                      textareaClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Map Iframe Title
                  </label>

                  <input
                    value={
                      pageContent.mapIframeTitle ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapIframeTitle",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Address Brand
                  </label>

                  <input
                    value={
                      pageContent.mapAddressBrand ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapAddressBrand",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Open Location Text
                  </label>

                  <input
                    value={
                      pageContent.mapOpenLocationText ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapOpenLocationText",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Map Button Text
                  </label>

                  <input
                    value={
                      pageContent.mapButtonText ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "mapButtonText",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 07
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={7}
            title="Bottom CTA"
            description="Manage the final dark call-to-action content and link."
            expanded={
              openSections[7]
            }
            onToggle={() =>
              toggleSection(7)
            }
            hasVisibility
            enabled={
              pageContent.bottomCtaEnabled
            }
            onVisibilityToggle={() =>
              updatePageField(
                "bottomCtaEnabled",
                !pageContent.bottomCtaEnabled
              )
            }
          />

          {openSections[7] && (
            <div className="border-t border-slate-100 p-4 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    CTA Label
                  </label>

                  <input
                    value={
                      pageContent.ctaLabel ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "ctaLabel",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    CTA Button Text
                  </label>

                  <input
                    value={
                      pageContent.ctaButtonText ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "ctaButtonText",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    CTA Title
                  </label>

                  <input
                    value={
                      pageContent.ctaTitle ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "ctaTitle",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    CTA Description
                  </label>

                  <textarea
                    value={
                      pageContent.ctaDescription ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "ctaDescription",
                        event.target.value
                      )
                    }
                    className={
                      textareaClass
                    }
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="text-sm font-bold text-slate-700">
                    CTA Button Link
                  </label>

                  <input
                    value={
                      pageContent.ctaButtonLink ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "ctaButtonLink",
                        event.target.value
                      )
                    }
                    placeholder="tel:9822735116"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ===================================================
            SECTION 08
        =================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            number={8}
            title="Footer"
            description="Manage the Contact page footer content and visibility."
            expanded={
              openSections[8]
            }
            onToggle={() =>
              toggleSection(8)
            }
            hasVisibility
            enabled={
              pageContent.footerEnabled
            }
            onVisibilityToggle={() =>
              updatePageField(
                "footerEnabled",
                !pageContent.footerEnabled
              )
            }
          />

          {openSections[8] && (
            <div className="border-t border-slate-100 p-4 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-3">
                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Footer Brand
                  </label>

                  <input
                    value={
                      pageContent.footerBrand ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "footerBrand",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Footer Description
                  </label>

                  <input
                    value={
                      pageContent.footerDescription ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "footerDescription",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Back to Home Text
                  </label>

                  <input
                    value={
                      pageContent.footerBackHomeText ||
                      ""
                    }
                    onChange={(event) =>
                      updatePageField(
                        "footerBackHomeText",
                        event.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </section>
        </main>

      {/* =====================================================
          STICKY SAVE BAR
      ===================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-500">
              {dirty
                ? "Unsaved changes"
                : "Contact CMS is up to date"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={
                resetDefaults
              }
              disabled={saving}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              Reset Defaults
            </button>

            <button
              type="button"
              onClick={
                saveAll
              }
              disabled={saving}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              Save All
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminContact;
