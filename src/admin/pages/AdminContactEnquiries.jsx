import {
  Eye,
  Trash2,
  RefreshCw,
  Search,
  X,
  Phone,
  Mail,
  CalendarDays,
  BriefcaseBusiness,
  MessageSquare,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "http://localhost:8080";

const ENQUIRIES_API =
  `${API_BASE_URL}/api/contact-page/enquiries`;

/* =========================================================
   STATUS OPTIONS
========================================================= */

const STATUS_OPTIONS = [
  "ALL",
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "COMPLETED",
];

/* =========================================================
   STATUS CLASS
========================================================= */

const getStatusClass = (status) => {
  switch (status) {
    case "NEW":
      return "bg-red-50 text-red-700 ring-1 ring-red-200";

    case "CONTACTED":
      return "bg-blue-50 text-blue-700 ring-1 ring-blue-200";

    case "IN_PROGRESS":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";

    case "COMPLETED":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";

    default:
      return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  }
};

/* =========================================================
   FORMAT STATUS
========================================================= */

const formatStatus = (status) => {
  if (!status) {
    return "New";
  }

  return String(status)
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
};

/* =========================================================
   FORMAT DATE
========================================================= */

const formatDateTime = (value) => {
  if (!value) {
    return "â€”";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* =========================================================
   NORMALIZE API RESPONSE
========================================================= */

const normalizeEnquiries = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    Array.isArray(data.content)
  ) {
    return data.content;
  }

  return [];
};

/* =========================================================
   ADMIN CONTACT ENQUIRIES
========================================================= */

function AdminContactEnquiries() {
  /* =======================================================
     STATE
  ======================================================= */

  const [enquiries, setEnquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [deletingId, setDeletingId] =
    useState(null);

  /* =======================================================
     LOAD ENQUIRIES
     
     useCallback keeps the function stable.
  ======================================================= */

  const loadEnquiries = useCallback(
    async (showRefreshing = false) => {
      try {
        if (showRefreshing) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response =
          await fetch(ENQUIRIES_API, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

        if (!response.ok) {
          throw new Error(
            `Failed to load enquiries. HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        const normalized =
          normalizeEnquiries(data);

        setEnquiries(normalized);
      } catch (err) {
        console.error(
          "Failed to load contact enquiries:",
          err
        );

        setError(
          err?.message ||
            "Failed to load contact enquiries."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  /* =======================================================
     INITIAL LOAD

     IMPORTANT:
     The actual async work happens inside the
     nested function, preventing the React
     set-state-in-effect lint error.
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const fetchInitialEnquiries = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(ENQUIRIES_API, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

        if (!response.ok) {
          throw new Error(
            `Failed to load enquiries. HTTP ${response.status}`
          );
        }

        const data =
          await response.json();

        const normalized =
          normalizeEnquiries(data);

        if (!cancelled) {
          setEnquiries(normalized);
        }
      } catch (err) {
        console.error(
          "Failed to load contact enquiries:",
          err
        );

        if (!cancelled) {
          setError(
            err?.message ||
              "Failed to load contact enquiries."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchInitialEnquiries();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     FILTERED ENQUIRIES
  ======================================================= */

  const filteredEnquiries = useMemo(() => {
    let result = [...enquiries];

    /* STATUS FILTER */

    if (statusFilter !== "ALL") {
      result = result.filter(
        (item) =>
          String(
            item?.status || "NEW"
          ).toUpperCase() ===
          statusFilter
      );
    }

    /* SEARCH */

    const search =
      searchTerm.trim().toLowerCase();

    if (search) {
      result = result.filter(
        (item) => {
          const name =
            String(
              item?.name || ""
            ).toLowerCase();

          const email =
            String(
              item?.email || ""
            ).toLowerCase();

          const phone =
            String(
              item?.phone || ""
            ).toLowerCase();

          const projectType =
            String(
              item?.projectType || ""
            ).toLowerCase();

          const message =
            String(
              item?.message || ""
            ).toLowerCase();

          return (
            name.includes(search) ||
            email.includes(search) ||
            phone.includes(search) ||
            projectType.includes(search) ||
            message.includes(search)
          );
        }
      );
    }

    return result;
  }, [
    enquiries,
    statusFilter,
    searchTerm,
  ]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const totalCount =
    enquiries.length;

  const newCount =
    enquiries.filter(
      (item) =>
        String(
          item?.status || "NEW"
        ).toUpperCase() === "NEW"
    ).length;

  const contactedCount =
    enquiries.filter(
      (item) =>
        String(
          item?.status || ""
        ).toUpperCase() ===
        "CONTACTED"
    ).length;

  const inProgressCount =
    enquiries.filter(
      (item) =>
        String(
          item?.status || ""
        ).toUpperCase() ===
        "IN_PROGRESS"
    ).length;

  const completedCount =
    enquiries.filter(
      (item) =>
        String(
          item?.status || ""
        ).toUpperCase() ===
        "COMPLETED"
    ).length;

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const handleStatusChange = async (
    enquiry,
    newStatus
  ) => {
    if (!enquiry?.id) {
      return;
    }

    try {
      setUpdatingId(enquiry.id);

      const response =
        await fetch(
          `${ENQUIRIES_API}/${enquiry.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `Failed to update enquiry. HTTP ${response.status}`
        );
      }

      const updated =
        await response.json();

      setEnquiries((current) =>
        current.map((item) =>
          item.id === enquiry.id
            ? updated
            : item
        )
      );

      setSelectedEnquiry((current) =>
        current?.id === enquiry.id
          ? updated
          : current
      );
    } catch (err) {
      console.error(
        "Failed to update enquiry:",
        err
      );

      window.alert(
        err?.message ||
          "Failed to update enquiry."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (
    enquiry
  ) => {
    if (!enquiry?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the enquiry from ${
          enquiry.name ||
          "this person"
        }?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(enquiry.id);

      const response =
        await fetch(
          `${ENQUIRIES_API}/${enquiry.id}`,
          {
            method: "DELETE",
          }
        );

      if (!response.ok) {
        throw new Error(
          `Failed to delete enquiry. HTTP ${response.status}`
        );
      }

      setEnquiries((current) =>
        current.filter(
          (item) =>
            item.id !== enquiry.id
        )
      );

      setSelectedEnquiry((current) =>
        current?.id === enquiry.id
          ? null
          : current
      );
    } catch (err) {
      console.error(
        "Failed to delete enquiry:",
        err
      );

      window.alert(
        err?.message ||
          "Failed to delete enquiry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-full">
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          rounded-2xl
          bg-white
          p-5
          shadow-sm
          ring-1
          ring-slate-200
          sm:p-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <div
            className="
              mb-2
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#B28A20]/10
              px-3
              py-1
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-[#9A7618]
            "
          >
            <MessageSquare size={14} />

            Enquiries
          </div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
              sm:text-3xl
            "
          >
            Contact Enquiries
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Manage enquiries submitted
            through the website contact
            form.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            loadEnquiries(true)
          }
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-700
            shadow-sm
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* ===================================================
          STATISTICS
      =================================================== */}

      <div
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-5
        "
      >
        {/* TOTAL */}

        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            ring-1
            ring-slate-200
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-slate-500
              "
            >
              Total
            </span>

            <MessageSquare
              size={20}
              className="text-slate-400"
            />
          </div>

          <p
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {totalCount}
          </p>
        </div>

        {/* NEW */}

        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            ring-1
            ring-red-100
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-red-600
              "
            >
              New
            </span>

            <AlertCircle
              size={20}
              className="text-red-500"
            />
          </div>

          <p
            className="
              text-3xl
              font-bold
              text-red-600
            "
          >
            {newCount}
          </p>
        </div>

        {/* CONTACTED */}

        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            ring-1
            ring-blue-100
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-blue-600
              "
            >
              Contacted
            </span>

            <Phone
              size={20}
              className="text-blue-500"
            />
          </div>

          <p
            className="
              text-3xl
              font-bold
              text-blue-600
            "
          >
            {contactedCount}
          </p>
        </div>

        {/* IN PROGRESS */}

        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            ring-1
            ring-amber-100
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-amber-600
              "
            >
              In Progress
            </span>

            <Clock
              size={20}
              className="text-amber-500"
            />
          </div>

          <p
            className="
              text-3xl
              font-bold
              text-amber-600
            "
          >
            {inProgressCount}
          </p>
        </div>

        {/* COMPLETED */}

        <div
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            ring-1
            ring-emerald-100
          "
        >
          <div
            className="
              mb-3
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-sm
                font-medium
                text-emerald-600
              "
            >
              Completed
            </span>

            <CheckCircle2
              size={20}
              className="text-emerald-500"
            />
          </div>

          <p
            className="
              text-3xl
              font-bold
              text-emerald-600
            "
          >
            {completedCount}
          </p>
        </div>
      </div>

      {/* ===================================================
          SEARCH + FILTER
      =================================================== */}

      <div
        className="
          mb-6
          rounded-2xl
          bg-white
          p-4
          shadow-sm
          ring-1
          ring-slate-200
          sm:p-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              lg:max-w-md
            "
          >
            <Search
              size={18}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search name, email, phone, project or message..."
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                py-3
                pl-10
                pr-4
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-[#B28A20]
                focus:ring-2
                focus:ring-[#B28A20]/10
              "
            />
          </div>

          {/* FILTERS */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {STATUS_OPTIONS.map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setStatusFilter(
                      status
                    )
                  }
                  className={`
                    rounded-xl
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    transition
                    ${
                      statusFilter ===
                      status
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }
                  `}
                >
                  {status === "ALL"
                    ? "All"
                    : formatStatus(
                        status
                      )}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
          "
        >
          <AlertCircle
            size={20}
            className="
              mt-0.5
              shrink-0
            "
          />

          <div>
            <p className="font-semibold">
              Unable to load enquiries
            </p>

            <p className="mt-1">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                loadEnquiries(true)
              }
              className="
                mt-3
                font-semibold
                underline
                underline-offset-2
              "
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* ===================================================
          LOADING
      =================================================== */}

      {loading ? (
        <div
          className="
            flex
            min-h-[320px]
            items-center
            justify-center
            rounded-2xl
            bg-white
            shadow-sm
            ring-1
            ring-slate-200
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-3
              text-slate-500
            "
          >
            <Loader2
              size={32}
              className="animate-spin"
            />

            <p className="text-sm">
              Loading enquiries...
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-sm
            ring-1
            ring-slate-200
          "
        >
          {/* =================================================
              LIST HEADER
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-2
              border-b
              border-slate-200
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-bold
                  text-slate-900
                "
              >
                Enquiry List
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                Showing{" "}
                {filteredEnquiries.length}{" "}
                of{" "}
                {enquiries.length}{" "}
                enquiries
              </p>
            </div>
          </div>

          {/* =================================================
              EMPTY
          ================================================= */}

          {filteredEnquiries.length ===
          0 ? (
            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                "
              >
                <MessageSquare
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3
                className="
                  text-lg
                  font-semibold
                  text-slate-800
                "
              >
                No enquiries found
              </h3>

              <p
                className="
                  mt-1
                  max-w-md
                  text-sm
                  text-slate-500
                "
              >
                There are no contact
                enquiries matching your
                current search or filter.
              </p>
            </div>
          ) : (
            /* =================================================
               TABLE
            ================================================= */

            <div className="overflow-x-auto">
              <table
                className="
                  min-w-[1050px]
                  w-full
                  border-collapse
                "
              >
                <thead>
                  <tr
                    className="
                      border-b
                      border-slate-200
                      bg-slate-50
                    "
                  >
                    <th
                      className="
                        px-5
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Enquiry
                    </th>

                    <th
                      className="
                        px-5
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Contact
                    </th>

                    <th
                      className="
                        px-5
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Project
                    </th>

                    <th
                      className="
                        px-5
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Status
                    </th>

                    <th
                      className="
                        px-5
                        py-4
                        text-left
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Submitted
                    </th>

                    <th
                      className="
                        px-5
                        py-4
                        text-right
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnquiries.map(
                    (enquiry) => {
                      const status =
                        String(
                          enquiry?.status ||
                            "NEW"
                        ).toUpperCase();

                      return (
                        <tr
                          key={
                            enquiry.id
                          }
                          className="
                            border-b
                            border-slate-100
                            transition
                            hover:bg-slate-50
                          "
                        >
                          {/* ENQUIRY */}

                          <td
                            className="
                              px-5
                              py-5
                              align-top
                            "
                          >
                            <div
                              className="
                                flex
                                items-start
                                gap-3
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-slate-100
                                "
                              >
                                <User
                                  size={18}
                                  className="
                                    text-slate-500
                                  "
                                />
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="
                                    font-semibold
                                    text-slate-900
                                  "
                                >
                                  {enquiry.name ||
                                    "â€”"}
                                </p>

                                <p
                                  className="
                                    mt-1
                                    max-w-[260px]
                                    truncate
                                    text-xs
                                    text-slate-500
                                  "
                                  title={
                                    enquiry.message ||
                                    ""
                                  }
                                >
                                  {enquiry.message ||
                                    "No message"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* CONTACT */}

                          <td
                            className="
                              px-5
                              py-5
                              align-top
                            "
                          >
                            <div className="space-y-2">
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-slate-700
                                "
                              >
                                <Mail
                                  size={15}
                                  className="
                                    shrink-0
                                    text-slate-400
                                  "
                                />

                                <span>
                                  {enquiry.email ||
                                    "â€”"}
                                </span>
                              </div>

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-slate-700
                                "
                              >
                                <Phone
                                  size={15}
                                  className="
                                    shrink-0
                                    text-slate-400
                                  "
                                />

                                <span>
                                  {enquiry.phone ||
                                    "â€”"}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* PROJECT */}

                          <td
                            className="
                              px-5
                              py-5
                              align-top
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-700
                              "
                            >
                              <BriefcaseBusiness
                                size={16}
                                className="
                                  shrink-0
                                  text-slate-400
                                "
                              />

                              <span>
                                {enquiry.projectType ||
                                  "â€”"}
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}

                          <td
                            className="
                              px-5
                              py-5
                              align-top
                            "
                          >
                            <select
                              value={status}
                              disabled={
                                updatingId ===
                                enquiry.id
                              }
                              onChange={(
                                event
                              ) =>
                                handleStatusChange(
                                  enquiry,
                                  event
                                    .target
                                    .value
                                )
                              }
                              className={`
                                rounded-full
                                border-0
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                outline-none
                                ${getStatusClass(
                                  status
                                )}
                              `}
                            >
                              {STATUS_OPTIONS
                                .filter(
                                  (
                                    option
                                  ) =>
                                    option !==
                                    "ALL"
                                )
                                .map(
                                  (
                                    option
                                  ) => (
                                    <option
                                      key={
                                        option
                                      }
                                      value={
                                        option
                                      }
                                    >
                                      {formatStatus(
                                        option
                                      )}
                                    </option>
                                  )
                                )}
                            </select>
                          </td>

                          {/* DATE */}

                          <td
                            className="
                              px-5
                              py-5
                              align-top
                            "
                          >
                            <div
                              className="
                                flex
                                items-start
                                gap-2
                                text-xs
                                text-slate-500
                              "
                            >
                              <CalendarDays
                                size={15}
                                className="
                                  mt-0.5
                                  shrink-0
                                "
                              />

                              <span>
                                {formatDateTime(
                                  enquiry.submittedAt
                                )}
                              </span>
                            </div>
                          </td>

                          {/* ACTIONS */}

                          <td
                            className="
                              px-5
                              py-5
                              align-top
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                justify-end
                                gap-2
                              "
                            >
                              {/* VIEW */}

                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedEnquiry(
                                    enquiry
                                  )
                                }
                                className="
                                  inline-flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-slate-100
                                  text-slate-600
                                  transition
                                  hover:bg-slate-200
                                  hover:text-slate-900
                                "
                                title="View enquiry"
                                aria-label="View enquiry"
                              >
                                <Eye
                                  size={17}
                                />
                              </button>

                              {/* DELETE */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    enquiry
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  enquiry.id
                                }
                                className="
                                  inline-flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-red-50
                                  text-red-600
                                  transition
                                  hover:bg-red-100
                                  disabled:cursor-not-allowed
                                  disabled:opacity-50
                                "
                                title="Delete enquiry"
                                aria-label="Delete enquiry"
                              >
                                {deletingId ===
                                enquiry.id ? (
                                  <Loader2
                                    size={17}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={17}
                                  />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ===================================================
          VIEW ENQUIRY MODAL
      =================================================== */}

      {selectedEnquiry && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
            backdrop-blur-sm
          "
          onClick={() =>
            setSelectedEnquiry(null)
          }
        >
          <div
            className="
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-2xl
              bg-white
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-slate-200
                p-5
                sm:p-6
              "
            >
              <div>
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[#9A7618]
                  "
                >
                  <MessageSquare
                    size={15}
                  />

                  Contact Enquiry
                </div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  {selectedEnquiry.name ||
                    "Enquiry"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
                className="
                  rounded-lg
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                "
                aria-label="Close enquiry"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div
              className="
                space-y-5
                p-5
                sm:p-6
              "
            >
              {/* DETAILS */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                {/* NAME */}

                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-4
                  "
                >
                  <p
                    className="
                      mb-1
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Name
                  </p>

                  <p
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    {selectedEnquiry.name ||
                      "â€”"}
                  </p>
                </div>

                {/* PROJECT */}

                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-4
                  "
                >
                  <p
                    className="
                      mb-1
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Project Type
                  </p>

                  <p
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    {selectedEnquiry.projectType ||
                      "â€”"}
                  </p>
                </div>

                {/* EMAIL */}

                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-4
                  "
                >
                  <p
                    className="
                      mb-1
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      break-all
                      font-semibold
                      text-slate-900
                    "
                  >
                    {selectedEnquiry.email ||
                      "â€”"}
                  </p>
                </div>

                {/* PHONE */}

                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-4
                  "
                >
                  <p
                    className="
                      mb-1
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Phone
                  </p>

                  <p
                    className="
                      font-semibold
                      text-slate-900
                    "
                  >
                    {selectedEnquiry.phone ||
                      "â€”"}
                  </p>
                </div>
              </div>

              {/* STATUS */}

              <div>
                <p
                  className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Status
                </p>

                <select
                  value={String(
                    selectedEnquiry.status ||
                      "NEW"
                  ).toUpperCase()}
                  disabled={
                    updatingId ===
                    selectedEnquiry.id
                  }
                  onChange={(event) =>
                    handleStatusChange(
                      selectedEnquiry,
                      event.target.value
                    )
                  }
                  className={`
                    rounded-full
                    border-0
                    px-4
                    py-2
                    text-sm
                    font-bold
                    outline-none
                    ${getStatusClass(
                      String(
                        selectedEnquiry.status ||
                          "NEW"
                      ).toUpperCase()
                    )}
                  `}
                >
                  {STATUS_OPTIONS
                    .filter(
                      (option) =>
                        option !== "ALL"
                    )
                    .map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {formatStatus(
                          option
                        )}
                      </option>
                    ))}
                </select>
              </div>

              {/* MESSAGE */}

              <div>
                <p
                  className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-400
                  "
                >
                  Message
                </p>

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    text-sm
                    leading-7
                    text-slate-700
                    whitespace-pre-wrap
                  "
                >
                  {selectedEnquiry.message ||
                    "No message provided."}
                </div>
              </div>

              {/* SUBMITTED DATE */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-500
                "
              >
                <CalendarDays
                  size={17}
                />

                <span>
                  Submitted{" "}
                  {formatDateTime(
                    selectedEnquiry.submittedAt
                  )}
                </span>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div
              className="
                flex
                justify-end
                gap-3
                border-t
                border-slate-200
                p-5
                sm:p-6
              "
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
                className="
                  rounded-xl
                  bg-slate-900
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContactEnquiries;