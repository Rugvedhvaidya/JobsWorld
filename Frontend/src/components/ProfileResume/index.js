//This component is used to render the resume in profile
import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";

class ResumeDetails2 extends Component {
  state = {
    resumeDetails: {
      skills: {},
    },
  };

  componentDidMount() {
    this.getresumeDetails();
  }

  // This function is used to get resume details of the user
  getresumeDetails = async () => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/resume`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    let resume = await response.json();
    const fetchedData = resume.resume;
    if (fetchedData === null) {
      return (
        <div className="empty-shortlist-container">
          <h1 className="empty-shortlist-heading">Oops...</h1>
          <p className="empty-shortlist-description">Upload your resume....</p>
        </div>
      );
    }
    const updatedData = {
      firstName: fetchedData.firstName,
      lastName: fetchedData.lastName,
      currentCity: fetchedData.currentCity,
      postalCode: fetchedData.postalCode,
      email: fetchedData.email,
      phone: fetchedData.phone,
      degree: fetchedData.degree,
      fieldOfStudy: fetchedData.fieldOfStudy,
      college: fetchedData.college,
      year: fetchedData.year,
      jobTitle: fetchedData.jobTitle,
      company: fetchedData.company,
      jobCity: fetchedData.jobCity,
      jobYear: fetchedData.jobYear,
      jobDesc: fetchedData.jobDesc,
      skills: fetchedData.skills,
      id: fetchedData._id,
    };
    this.setState({ resumeDetails: updatedData });
  };

  // This function is used to delete the resume of the user.
  deleteResume = () => {
    const { resumeDetails } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    alert("Resume deleted successfully");
    fetch(`${process.env.REACT_APP_SERVER_URL}/resume/${resumeDetails.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: null,
    });
    window.location = "/";
  };

  // This function is used to display the resume of the user.
  renderResume = () => {
    const { resumeDetails } = this.state;
    if (resumeDetails.id === undefined) {
      return (
        <div className="empty-shortlist-container">
          <h1 className="empty-shortlist-heading">Oops...</h1>
          <p className="empty-shortlist-description">Upload your resume....</p>
        </div>
      );
    } else {
      const {
        id,
        firstName,
        lastName,
        currentCity,
        postalCode,
        email,
        phone,
        degree,
        fieldOfStudy,
        college,
        year,
        jobTitle,
        company,
        jobCity,
        jobYear,
        jobDesc,
        skills,
      } = resumeDetails;
      return (
        <>
          <div className="resume2-detailed-view-container">
            <div className="resume2-summary-card">
              <div className="intro">
                <h1 className="resume2-summary-Name">
                  {firstName} {lastName}
                </h1>

                <p className="resume2-summary-card-city">
                  <b>City </b>&emsp;&emsp;&emsp;
                  {currentCity},{postalCode}
                </p>
                <p className="resume2-summary-card-phone">
                  <b>Phone </b>&emsp;&ensp;
                  {phone}
                </p>
                <p className="resume2-summary-card-email">
                  <b>Email </b>&emsp;&emsp;
                  {email}
                </p>
              </div>
              <hr
                style={{
                  width: "100%",
                  color: "black",
                  backgroundColor: "black",
                  height: "0.5px",
                  borderColor: "black",
                  opacity: "15%",
                }}
              />
              <div className="resume2-detailed-card-education">
                <h2 className="work-experience-heading">Education</h2>
                <div className="education">
                  <p className="resume2-summary-card-college">
                    <b>College </b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    {college}
                  </p>
                  <p className="resume2-summary-card-degree">
                    <b>Programe </b>&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&ensp;
                    {degree}
                  </p>
                  <p className="resume2-summary-card-fieldOfStudy">
                    <b>Field of study </b>&emsp;&emsp;&ensp;&ensp;
                    {fieldOfStudy}
                  </p>
                  <p className="resume2-summary-card-year">
                    <b>Timeline </b>&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                    {year}
                  </p>
                </div>
              </div>
              <hr
                style={{
                  width: "100%",
                  color: "black",
                  backgroundColor: "black",
                  height: "0.5px",
                  borderColor: "black",
                  opacity: "15%",
                }}
              />
              <div className="Work-Ex">
                <h2 className="work-experience-heading">Work Experience</h2>

                <div className="work-experience">
                  <p className="resume-company">
                    <b>Company name </b>&emsp;&emsp;&emsp;{company}{" "}
                  </p>
                  <p className="job-title-come-year">
                    <b>Job title </b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{" "}
                    {jobTitle}
                  </p>
                  <p>
                    <b>Work Experience </b>&emsp;&ensp;&ensp;{jobYear}
                  </p>
                  <p className="jobcity">
                    <b>Job City</b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                    {jobCity}
                  </p>

                  <p className="jobdesc">
                    <b>Job Description</b>&emsp;&emsp;&emsp;{jobDesc}
                  </p>
                </div>
              </div>
              <hr
                style={{
                  width: "100%",
                  color: "black",
                  backgroundColor: "black",
                  height: "0.5px",
                  borderColor: "black",
                  opacity: "15%",
                }}
              />
              <h2 className="skills-heading">Skills</h2>
              <ul className="resume2-detailed-view-skills-container">
                {Object.keys(skills).map((key) => {
                  if (skills[key] == true) {
                    return (
                      <div key={key}>
                        <li className="resume2-detailed-view-skill" key={key}>
                          <p className="skill-p">{key}</p>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
              <hr />
              <div className="resume-btns">
                <Link to={`/edit-resume/${id}`}>
                  <button className="resume-edit-btn">Edit Resume</button>
                </Link>

                <button
                  className="resume-delete-btn"
                  onClick={this.deleteResume}
                >
                  Delete Resume
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return this.renderResume();
  }
}

export default ResumeDetails2;
