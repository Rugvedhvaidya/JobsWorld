// This component is used to render a form which is used to upload the details of the resume.
import React, { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";

function Resume(props) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    currentCity: "",
    postalCode: "",
    email: "",
    phone: "",
    degree: "",
    fieldOfStudy: "",
    college: "",
    year: "",
    jobTitle: "",
    company: "",
    jobCity: "",
    jobYear: "",
    jobDesc: "",
    skills: {
      c: false,
      cpp: false,
      python: false,
      java: false,
    },
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // The below functions are used to update state when the respective input changes.
  const handleFirstNameInputChange = (event) => {
    setValues({ ...values, firstName: event.target.value });
  };
  const handleLastNameInputChange = (event) => {
    setValues({ ...values, lastName: event.target.value });
  };
  const handleCurrentCityInputChange = (event) => {
    setValues({ ...values, currentCity: event.target.value });
  };
  const handlePostalCodeInputChange = (event) => {
    setValues({ ...values, postalCode: event.target.value });
  };
  const handleEmailInputChange = (event) => {
    setValues({ ...values, email: event.target.value });
  };
  const handlePhoneInputChange = (event) => {
    setValues({ ...values, phone: event.target.value });
  };
  const handleDegreeInputChange = (event) => {
    setValues({ ...values, degree: event.target.value });
  };
  const handleFieldOfStudyInputChange = (event) => {
    setValues({ ...values, fieldOfStudy: event.target.value });
  };
  const handleCollegeInputChange = (event) => {
    setValues({ ...values, college: event.target.value });
  };
  const handleYearInputChange = (event) => {
    setValues({ ...values, year: event.target.value });
  };
  const handleJobTitleInputChange = (event) => {
    setValues({ ...values, jobTitle: event.target.value });
  };
  const handleCompanyInputChange = (event) => {
    setValues({ ...values, company: event.target.value });
  };
  const handleJobCityInputChange = (event) => {
    setValues({ ...values, jobCity: event.target.value });
  };
  const handleJobYearInputChange = (event) => {
    setValues({ ...values, jobYear: event.target.value });
  };
  const handleJobDescInputChange = (event) => {
    setValues({ ...values, jobDesc: event.target.value });
  };
  const handleSkillsInputChange = (event) => {
    let skill = values.skills;
    skill[event.target.value] = event.target.checked;
    setValues({ ...values, skills: skill });
  };

  // This function is executed when user submits the form.
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(values));

    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}/resume`;
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      async function fetchData() {
        const response = await fetch(apiUrl, options);
        if (response.ok === true) {
          alert(
            "Resume submitted successfully, You will be redirected to home page..."
          );
          window.location = "/";
        }
      }
      fetchData();
    }
  }, [formErrors]);

  // The below the function is used to validate the respective input fields.
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "*first name is required";
    }
    if (!values.lastName) {
      errors.lastName = "*last name is required";
    }
    if (!values.currentCity) {
      errors.currentCity = "*current city is required";
    }
    if (!values.postalCode) {
      errors.postalCode = "*pincode is required";
    } else if (values.postalCode.length !== 6) {
      errors.postalCode = "*6 digit postal code required";
    }
    if (!values.firstName) {
      errors.firstName = "*first name is required";
    }
    if (!values.email) {
      errors.email = "*email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "*required a valid email format";
    }
    if (!values.phone) {
      errors.phone = "*contact number is required";
    } else if (values.phone.length !== 10) {
      errors.phone = "*10 digit number required";
    }
    if (!values.degree) {
      errors.degree = "*degree is required";
    }
    if (!values.fieldOfStudy) {
      errors.fieldOfStudy = "*field of study is required";
    }
    if (!values.college) {
      errors.college = "*college name is required";
    }
    if (!values.year) {
      errors.year = "*year of study is required";
    }
    if (!values.jobTitle) {
      errors.jobTitle = "*job title is required";
    }
    if (!values.company) {
      errors.company = "*company name is required";
    }
    if (!values.jobCity) {
      errors.jobCity = "*job city is required";
    }
    if (!values.jobYear) {
      errors.jobYear = "*job year is required";
    }
    if (!values.jobDesc) {
      errors.jobDesc = "*description about job is required";
    } else if (values.jobDesc.length <= 30) {
      errors.jobDesc = "*30 letters required minimum";
    }
    if (
      !values.skills.c &&
      !values.skills.cpp &&
      !values.skills.python &&
      !values.skills.java
    ) {
      errors.skills = "*skills required";
    }
    return errors;
  };
  // Displaying the form
  return (
    <div className="grad">
      <form method="" onSubmit={handleSubmit}>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="resume-submit-msg">Submitted successfully</div>
        ) : (
          ""
        )}
        <div className="resume-card-container">
          <h1 className="resume-card-container-heading">
            Upload your Resume...
          </h1>
          <div className="resumeCard">
            <div className="resume-card-column">
              <div className="">
                <h3>Personal information</h3>
                <div className="resume-card-name">
                  <div className="resume-card-name-in">
                    <label>
                      firstName{" "}
                      <a
                        type="button "
                        className="hover-button firstname"
                        placeholder="i"
                      >
                        <i class="fas fa-info-circle" aria-hidden="true"></i>
                      </a>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className=" resume-fname-input"
                      value={values.firstName}
                      onChange={handleFirstNameInputChange}
                    />

                    <p className="resumeErrormsg">{formErrors.firstName}</p>
                  </div>
                  <div className="resume-card-name-in">
                    <label>
                      lastName{" "}
                      <a
                        type="button"
                        className="hover-button lastname"
                        placeholder="i"
                      >
                        <i class="fas fa-info-circle" aria-hidden="true"></i>
                      </a>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="resume-fname-input"
                      value={values.lastName}
                      onChange={handleLastNameInputChange}
                    />
                    <p className="resumeErrormsg">{formErrors.lastName} </p>
                  </div>
                </div>
                <div className="resume-card-name">
                  <div className="resume-card-city-1">
                    <label>
                      City{" "}
                      <a
                        type="button"
                        className="hover-button city"
                        placeholder="i"
                      >
                        <i class="fas fa-info-circle" aria-hidden="true"></i>
                      </a>
                    </label>
                    <input
                      type="text"
                      id="currentCity"
                      name="currentCity"
                      className="resume-fname-input"
                      value={values.currentCity}
                      onChange={handleCurrentCityInputChange}
                    />
                    <p className="resumeErrormsg">{formErrors.currentCity} </p>
                  </div>
                  <div className="resume-card-pincode">
                    <label>
                      zip code
                      <a
                        type="button"
                        className="hover-button zip"
                        placeholder="i"
                      >
                        <i class="fas fa-info-circle" aria-hidden="true"></i>
                      </a>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      className="resume-fname-input"
                      value={values.postalCode}
                      onChange={handlePostalCodeInputChange}
                    />
                    <p className="resumeErrormsg">{formErrors.postalCode} </p>
                  </div>
                </div>
                <div className="resume-card-marginbottom">
                  <label htmlFor="email" className="resume-label-marginbottom ">
                    Email address
                    <a
                      type="button"
                      className="hover-button email"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>{" "}
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="resume-email-input"
                    value={values.email}
                    onChange={handleEmailInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.email} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label htmlFor="phone" className="resume-label-marginbottom">
                    Contact Number
                    <a
                      type="button"
                      className="hover-button phone"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="resume-email-input"
                    value={values.phone}
                    onChange={handlePhoneInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.phone} </p>
                </div>
              </div>
              <div className="">
                <h3>Educational information</h3>
                <div className="resume-card-marginbottom">
                  <label htmlFor="degree" className="resume-label-marginbottom">
                    Degree
                    <a
                      type="button"
                      className="hover-button degree"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <select
                    className="form-select  resume-email-input"
                    aria-label="Default select example"
                    id="degree"
                    name="degree"
                    value={values.degree}
                    onChange={handleDegreeInputChange}
                  >
                    <option value="none">None</option>
                    <option value="10">Secondary (10th Pass)</option>
                    <option value="12">Higher Secondary(12th Pass)</option>
                    <option value="diplomo">Diplomo</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="doctorate">Doctorate</option>
                  </select>
                  <p className="resumeErrormsg">{formErrors.degree} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="fieldOfStudy"
                    className="resume-label-marginbottom"
                  >
                    Field Of Study
                    <a
                      type="button"
                      className="hover-button study"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="fieldOfStudy"
                    id="fieldOfStudy"
                    className="resume-email-input"
                    value={values.fieldOfStudy}
                    onChange={handleFieldOfStudyInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.fieldOfStudy} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="college"
                    className="resume-label-marginbottom"
                  >
                    College or University
                    <a
                      type="button"
                      className="hover-button collage"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="college"
                    id="college"
                    className="resume-email-input"
                    value={values.college}
                    onChange={handleCollegeInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.college} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label htmlFor="year" className="resume-label-marginbottom">
                    Year of study (mention as from XXXX to XXXX)
                    <a
                      type="button"
                      className="hover-button year"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="year"
                    id="year"
                    className="resume-email-input"
                    value={values.year}
                    onChange={handleYearInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.year} </p>
                </div>
              </div>
            </div>

            <div className="resume-card-column">
              <div className="">
                <h3>Work Experience</h3>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="jobTitle"
                    className="resume-label-marginbottom"
                  >
                    Job Title
                    <a
                      type="button"
                      className="hover-button jobTitle"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    className="resume-email-input"
                    value={values.jobTitle}
                    onChange={handleJobTitleInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.jobTitle} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="company"
                    className="resume-label-marginbottom"
                  >
                    Company
                    <a
                      type="button"
                      className="hover-button company"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="resume-email-input"
                    value={values.company}
                    onChange={handleCompanyInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.company} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="jobCity"
                    className="resume-label-marginbottom"
                  >
                    Job City
                    <a
                      type="button"
                      className="hover-button jobcity"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="jobCity"
                    name="jobCity"
                    className="resume-email-input"
                    value={values.jobCity}
                    onChange={handleJobCityInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.jobCity} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="jobYear"
                    className="resume-label-marginbottom"
                  >
                    Year of work (mention as from XXXX to XXXX)
                    <a
                      type="button"
                      className="hover-button jobtime"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="jobYear"
                    id="jobYear"
                    className="resume-email-input"
                    value={values.jobYear}
                    onChange={handleJobYearInputChange}
                  />
                  <p className="resumeErrormsg">{formErrors.jobYear} </p>
                </div>
                <div className="resume-card-marginbottom">
                  <label
                    htmlFor="jobDesc"
                    className="resume-label-marginbottom"
                  >
                    Job Description
                    <a
                      type="button"
                      className="hover-button desc"
                      placeholder="i"
                    >
                      <i class="fas fa-info-circle" aria-hidden="true"></i>
                    </a>
                  </label>
                  <br />
                  <textarea
                    name="jobDesc"
                    id="jobDesc"
                    cols="30"
                    rows="3"
                    className="resume-email-input"
                    value={values.jobDesc}
                    onChange={handleJobDescInputChange}
                  ></textarea>
                  <p className="resumeErrormsg">{formErrors.jobDesc} </p>
                </div>
              </div>
              <div className="resume-card-marginbottom">
                <h4>Skills</h4>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="c"
                    name="c"
                    value="c"
                    onChange={handleSkillsInputChange}
                    checked={values.skills.c}
                  />
                  <label className="form-check-label" htmlFor="c">
                    C Language
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="cpp"
                    name="cpp"
                    value="cpp"
                    onChange={handleSkillsInputChange}
                    checked={values.skills.cpp}
                  />
                  <label className="form-check-label" htmlFor="cpp">
                    C++ Language
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="python"
                    name="python"
                    value="python"
                    onChange={handleSkillsInputChange}
                    checked={values.skills.python}
                  />
                  <label className="form-check-label" htmlFor="python">
                    Python Language
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="java"
                    name="java"
                    value="java"
                    onChange={handleSkillsInputChange}
                    checked={values.skills.java}
                  />
                  <label className="form-check-label" htmlFor="java">
                    Java Language
                  </label>
                </div>
                <p className="resumeErrormsg">{formErrors.skills} </p>
              </div>
              <div className="mb-3 offset-5 resume-sub-btn-div">
                <button className="resumebtn btn btn-outline-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Resume;
