import React, { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  X,
  UserRound,
  Building2,
  ChevronRight,
  ArrowLeft,
  CalendarDays,
  FileText,
} from "lucide-react";

const OrganizationSelfAssessment = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [search, setSearch] = useState("");

  const [showAddPersonModal, setShowAddPersonModal] =
    useState(false);

  const [showPersonForm, setShowPersonForm] =
    useState(false);

  const [personType, setPersonType] =
    useState(null);

  const [people, setPeople] = useState([
    {
      id: 1,
      surname: "Cheng",
      firstName: "Mark Lim Chuan",
      age: 49,
      companies: ["SKIL FOUR LIMITED"],
      status: "Not started",
    },
    {
      id: 2,
      surname: "Kwek",
      firstName: "Eik Sheng",
      age: 45,
      companies: ["SKIL FOUR LIMITED"],
      status: "Not started",
    },
    {
      id: 3,
      surname: "MCGINTY",
      firstName: "NEIL ANDREW",
      age: 55,
      companies: ["SKIL FOUR LIMITED"],
      status: "Not started",
    },
    {
      id: 4,
      surname: "Ridgwell",
      firstName: "David Benjamin",
      age: 60,
      companies: ["SKIL FOUR LIMITED"],
      status: "Not started",
    },
    {
      id: 5,
      surname: "Shah",
      firstName: "Nikki Chandrakant",
      age: 47,
      companies: ["SKIL FOUR LIMITED"],
      status: "Not started",
    },
    {
      id: 6,
      surname: "Watson",
      firstName: "Stuart",
      age: 38,
      companies: ["SKIL FOUR LIMITED"],
      status: "Not started",
    },
  ]);

  /* =========================================================
     FORM
  ========================================================= */

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    dateOfBirth: "",
    company: "",
    utr: "",
  });

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredPeople = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return people;
    }

    return people.filter(
      (person) =>
        person.surname
          .toLowerCase()
          .includes(value) ||
        person.firstName
          .toLowerCase()
          .includes(value) ||
        person.companies.some((company) =>
          company.toLowerCase().includes(value)
        )
    );
  }, [search, people]);

  /* =========================================================
     OPEN ADD PERSON
  ========================================================= */

  const openAddPerson = () => {
    setPersonType(null);
    setShowPersonForm(false);
    setShowAddPersonModal(true);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    setShowAddPersonModal(false);
    setShowPersonForm(false);
    setPersonType(null);
  };

  /* =========================================================
     SELECT PERSON TYPE
  ========================================================= */

  const handlePersonType = (type) => {
    setPersonType(type);
    setShowAddPersonModal(false);
    setShowPersonForm(true);
  };

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     ADD PERSON
  ========================================================= */

  const handleAddPerson = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.surname
    ) {
      return;
    }

    const newPerson = {
      id: Date.now(),
      surname: formData.surname,
      firstName: formData.firstName,
      age: calculateAge(formData.dateOfBirth),
      companies: formData.company
        ? [formData.company]
        : [],
      status: "Not started",
    };

    setPeople((prev) => [
      ...prev,
      newPerson,
    ]);

    setFormData({
      firstName: "",
      surname: "",
      dateOfBirth: "",
      company: "",
      utr: "",
    });

    closeModal();
  };

  /* =========================================================
     FILE SELF ASSESSMENT
  ========================================================= */

  const handleFileSelfAssessment = (person) => {
    console.log(
      "Start Self Assessment:",
      person
    );

    // Later:
    // navigate(`/organization/self-assessment/${person.id}`);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-full bg-white">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-[#09263A]
              sm:text-3xl
            "
          >
            Self Assessment
          </h1>

        </div>


        {/* Sync */}

        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            text-[#71827F]
          "
        >

          <span>
            Synced 12d ago
          </span>

          <button
            type="button"
            onClick={() =>
              console.log(
                "Refreshing..."
              )
            }
            className="
              inline-flex
              items-center
              gap-1.5
              transition
              hover:text-[#087F5B]
            "
          >

            <RefreshCw
              className="h-4 w-4"
            />

            Refresh

          </button>

        </div>

      </div>


      {/* =====================================================
          SEARCH + ADD PERSON
      ====================================================== */}

      <div
        className="
          mb-10
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
        "
      >

        {/* Search */}

        <div
          className="
            relative
            w-full
            sm:w-[380px]
          "
        >

          <Search
            className="
              absolute
              left-3
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-[#A0AAA7]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search people..."
            className="
              h-10
              w-full
              rounded-lg
              border
              border-[#D7DFDC]
              bg-white
              pl-10
              pr-4
              text-sm
              text-[#344A67]
              outline-none
              placeholder:text-[#8A9693]
              focus:border-[#087F5B]
              focus:ring-2
              focus:ring-[#087F5B]/10
            "
          />

        </div>


        {/* Add person */}

        <button
          type="button"
          onClick={openAddPerson}
          className="
            inline-flex
            h-10
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-[#0AAF7D]
            px-4
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#087F5B]
          "
        >

          <Plus
            className="h-4 w-4"
          />

          Add a person

        </button>

      </div>


      {/* =====================================================
          PEOPLE TABLE
      ====================================================== */}

      <div
        className="
          overflow-hidden
          rounded-lg
          bg-white
        "
      >

        <div className="overflow-x-auto">

          <table
            className="
              w-full
              min-w-[900px]
              border-collapse
            "
          >

            {/* Header */}

            <thead>

              <tr
                className="
                  border-b
                  border-[#DDE4E1]
                "
              >

                <th
                  className="
                    px-4
                    pb-3
                    text-left
                    text-xs
                    font-bold
                    tracking-[0.08em]
                    text-[#71827F]
                  "
                >
                  SURNAME
                  <SortArrow />
                </th>

                <th
                  className="
                    px-4
                    pb-3
                    text-left
                    text-xs
                    font-bold
                    tracking-[0.08em]
                    text-[#71827F]
                  "
                >
                  FIRST NAME(S)
                  <SortArrow />
                </th>

                <th
                  className="
                    px-4
                    pb-3
                    text-left
                    text-xs
                    font-bold
                    tracking-[0.08em]
                    text-[#71827F]
                  "
                >
                  AGE
                  <SortArrow />
                </th>

                <th
                  className="
                    px-4
                    pb-3
                    text-left
                    text-xs
                    font-bold
                    tracking-[0.08em]
                    text-[#71827F]
                  "
                >
                  COMPANIES
                  <SortArrow />
                </th>

                <th
                  className="
                    px-4
                    pb-3
                    text-left
                    text-xs
                    font-bold
                    tracking-[0.08em]
                    text-[#71827F]
                  "
                >
                  SELF ASSESSMENT
                  <SortArrow />
                </th>

                <th
                  className="
                    px-4
                    pb-3
                    text-right
                    text-xs
                    font-bold
                    tracking-[0.08em]
                    text-[#71827F]
                  "
                >
                  &nbsp;
                </th>

              </tr>

            </thead>


            {/* Body */}

            <tbody>

              {filteredPeople.map(
                (person) => (
                  <tr
                    key={person.id}
                    className="
                      border-b
                      border-[#E7ECEA]
                      transition
                      hover:bg-[#F8FCFA]
                    "
                  >

                    {/* Surname */}

                    <td
                      className="
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-[#09263A]
                      "
                    >
                      {person.surname}
                    </td>


                    {/* First name */}

                    <td
                      className="
                        px-4
                        py-3
                        text-sm
                        text-[#344A67]
                      "
                    >
                      {person.firstName}
                    </td>


                    {/* Age */}

                    <td
                      className="
                        px-4
                        py-3
                        text-sm
                        text-[#344A67]
                      "
                    >
                      {person.age}
                    </td>


                    {/* Companies */}

                    <td
                      className="
                        px-4
                        py-3
                        text-sm
                        text-[#09263A]
                      "
                    >

                      {person.companies.length > 0
                        ? person.companies.map(
                            (company, index) => (
                              <span
                                key={index}
                                className="
                                  block
                                "
                              >
                                {company}
                              </span>
                            )
                          )
                        : (
                          <span className="text-[#8A9693]">
                            —
                          </span>
                        )}

                    </td>


                    {/* Status */}

                    <td
                      className="
                        px-4
                        py-3
                      "
                    >

                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          bg-[#F3F4F3]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-[#68736F]
                        "
                      >
                        {person.status}
                      </span>

                    </td>


                    {/* Action */}

                    <td
                      className="
                        px-4
                        py-3
                        text-right
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>
                          handleFileSelfAssessment(
                            person
                          )
                        }
                        className="
                          inline-flex
                          h-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#0AAF7D]
                          px-4
                          text-xs
                          font-semibold
                          text-white
                          transition
                          hover:bg-[#087F5B]
                        "
                      >
                        File Self Assessment
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>


        {/* Empty */}

        {filteredPeople.length === 0 && (
          <div
            className="
              py-16
              text-center
            "
          >

            <UserRound
              className="
                mx-auto
                h-10
                w-10
                text-[#AAB6B2]
              "
            />

            <p
              className="
                mt-3
                text-sm
                font-medium
                text-[#344A67]
              "
            >
              No people found
            </p>

            <p
              className="
                mt-1
                text-sm
                text-[#71827F]
              "
            >
              Try another search.
            </p>

          </div>
        )}

      </div>


      {/* =====================================================
          ADD PERSON MODAL
      ====================================================== */}

      {showAddPersonModal && (
        <AddPersonChoiceModal
          onClose={closeModal}
          onSelect={handlePersonType}
        />
      )}


      {/* =====================================================
          PERSON FORM MODAL
      ====================================================== */}

      {showPersonForm && (
        <PersonFormModal
          type={personType}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleAddPerson}
          onBack={() => {
            setShowPersonForm(false);
            setShowAddPersonModal(true);
          }}
          onClose={closeModal}
        />
      )}

    </div>
  );
};


/* =============================================================
   SORT ARROW
============================================================= */

const SortArrow = () => {
  return (
    <span
      className="
        ml-1
        text-[#B6C0BD]
      "
    >
      ↕
    </span>
  );
};


/* =============================================================
   ADD PERSON CHOICE MODAL
============================================================= */

const AddPersonChoiceModal = ({
  onClose,
  onSelect,
}) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        backdrop-blur-[2px]
      "
      onMouseDown={onClose}
    >

      {/* Modal */}

      <div
        className="
          w-full
          max-w-[540px]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.22)]
        "
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E1E6E4]
            px-8
            py-6
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-[#1C2945]
            "
          >
            Add a person
          </h2>


          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-1
              text-[#77736E]
              transition
              hover:bg-[#F2F3F2]
              hover:text-[#1C2945]
            "
          >
            <X
              className="
                h-5
                w-5
                stroke-[3]
              "
            />
          </button>

        </div>


        {/* ===================================================
            BODY
        ==================================================== */}

        <div
          className="
            px-8
            py-8
          "
        >

          <p
            className="
              mb-6
              text-base
              text-[#5F5D59]
            "
          >
            Who are you filing a Self Assessment
            for?
          </p>


          {/* Company director */}

          <button
            type="button"
            onClick={() =>
              onSelect(
                "company-director"
              )
            }
            className="
              group
              mb-3
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-[#DDE2E0]
              bg-white
              px-5
              py-5
              text-left
              transition
              hover:border-[#0AAF7D]
              hover:bg-[#F5FCF9]
              hover:shadow-sm
            "
          >

            <div className="flex gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#E7F8F1]
                  text-[#087F5B]
                "
              >

                <Building2
                  className="h-5 w-5"
                />

              </div>


              <div>

                <h3
                  className="
                    text-base
                    font-bold
                    text-[#1C2945]
                  "
                >
                  A company director
                </h3>

                <p
                  className="
                    mt-1
                    max-w-[390px]
                    text-sm
                    leading-5
                    text-[#64625E]
                  "
                >
                  Find their company at Companies
                  House — we'll add it and pull the
                  director in with their official name
                  and date of birth.
                </p>

              </div>

            </div>


            <ChevronRight
              className="
                ml-4
                h-5
                w-5
                shrink-0
                text-[#A4AAA7]
                transition
                group-hover:translate-x-1
                group-hover:text-[#087F5B]
              "
            />

          </button>


          {/* Someone else */}

          <button
            type="button"
            onClick={() =>
              onSelect(
                "someone-else"
              )
            }
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              border
              border-[#DDE2E0]
              bg-white
              px-5
              py-5
              text-left
              transition
              hover:border-[#0AAF7D]
              hover:bg-[#F5FCF9]
              hover:shadow-sm
            "
          >

            <div className="flex gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#EEF2F1]
                  text-[#344A67]
                "
              >

                <UserRound
                  className="h-5 w-5"
                />

              </div>


              <div>

                <h3
                  className="
                    text-base
                    font-bold
                    text-[#1C2945]
                  "
                >
                  Someone else
                </h3>

                <p
                  className="
                    mt-1
                    max-w-[390px]
                    text-sm
                    leading-5
                    text-[#64625E]
                  "
                >
                  A sole trader, landlord, accountant
                  client, or family member with side
                  income who isn't a director on your
                  account.
                </p>

              </div>

            </div>


            <ChevronRight
              className="
                ml-4
                h-5
                w-5
                shrink-0
                text-[#A4AAA7]
                transition
                group-hover:translate-x-1
                group-hover:text-[#087F5B]
              "
            />

          </button>

        </div>

      </div>

    </div>
  );
};


/* =============================================================
   PERSON FORM MODAL
============================================================= */

const PersonFormModal = ({
  type,
  formData,
  onChange,
  onSubmit,
  onBack,
  onClose,
}) => {
  const isDirector =
    type === "company-director";

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        backdrop-blur-[2px]
      "
      onMouseDown={onClose}
    >

      <div
        className="
          w-full
          max-w-[560px]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.22)]
        "
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E1E6E4]
            px-7
            py-5
          "
        >

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={onBack}
              className="
                rounded-lg
                p-1.5
                text-[#68736F]
                hover:bg-[#F1F4F2]
              "
            >
              <ArrowLeft
                className="h-5 w-5"
              />
            </button>

            <h2
              className="
                text-xl
                font-bold
                text-[#1C2945]
              "
            >
              Add a person
            </h2>

          </div>


          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-1.5
              text-[#77736E]
              hover:bg-[#F1F3F2]
            "
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {/* Body */}

        <form
          onSubmit={onSubmit}
          className="px-7 py-7"
        >

          <div
            className="
              mb-6
              rounded-lg
              bg-[#F1FAF6]
              px-4
              py-3
            "
          >

            <p
              className="
                text-sm
                font-semibold
                text-[#087F5B]
              "
            >
              {isDirector
                ? "Company director"
                : "Someone else"}
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#687B78]
              "
            >
              Add the person's details to start
              their Self Assessment.
            </p>

          </div>


          {/* First name */}

          <FormField
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="Enter first name"
            required
          />


          {/* Surname */}

          <FormField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={onChange}
            placeholder="Enter surname"
            required
          />


          {/* DOB */}

          <div className="mb-5">

            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#344A67]
              "
            >
              Date of birth
            </label>

            <div className="relative">

              <CalendarDays
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#899692]
                "
              />

              <input
                type="date"
                name="dateOfBirth"
                value={
                  formData.dateOfBirth
                }
                onChange={onChange}
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-[#D7DFDC]
                  bg-white
                  pl-10
                  pr-3
                  text-sm
                  text-[#344A67]
                  outline-none
                  focus:border-[#087F5B]
                  focus:ring-2
                  focus:ring-[#087F5B]/10
                "
              />

            </div>

          </div>


          {/* Company */}

          <FormField
            label="Company"
            name="company"
            value={formData.company}
            onChange={onChange}
            placeholder="Enter company name"
          />


          {/* UTR */}

          <FormField
            label="UTR"
            name="utr"
            value={formData.utr}
            onChange={onChange}
            placeholder="Enter UTR"
          />


          {/* Footer */}

          <div
            className="
              mt-7
              flex
              items-center
              justify-end
              gap-3
              border-t
              border-[#E6EBE9]
              pt-5
            "
          >

            <button
              type="button"
              onClick={onBack}
              className="
                rounded-lg
                border
                border-[#D4DEDA]
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-[#344A67]
                hover:bg-[#F6F8F7]
              "
            >
              Back
            </button>

            <button
              type="submit"
              className="
                rounded-lg
                bg-[#0AAF7D]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-[#087F5B]
              "
            >
              Add person
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


/* =============================================================
   FORM FIELD
============================================================= */

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-5">

      <label
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-[#344A67]
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          h-11
          w-full
          rounded-lg
          border
          border-[#D7DFDC]
          bg-white
          px-3
          text-sm
          text-[#344A67]
          outline-none
          placeholder:text-[#9AA5A2]
          focus:border-[#087F5B]
          focus:ring-2
          focus:ring-[#087F5B]/10
        "
      />

    </div>
  );
};


/* =============================================================
   AGE CALCULATOR
============================================================= */

const calculateAge = (date) => {
  if (!date) {
    return "—";
  }

  const birthDate = new Date(date);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        birthDate.getDate())
  ) {
    age--;
  }

  return age;
};


export default OrganizationSelfAssessment;