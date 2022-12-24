// This component is used to get the resume details from backend.
import "./index.css";
import { Component } from "react";

class ResumeDetails extends Component {
  state = {
    resumeDetails: {
      skills: {},
    },
  };

  componentDidMount() {
    this.getresumeDetails();
  }

  // This function is used to get details of the resume of the user.
  getresumeDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/resume/${id}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const { resume } = fetchedData;

    const updatedData = {
      firstName: resume.firstName,
      lastName: resume.lastName,
      currentCity: resume.currentCity,
      postalCode: resume.postalCode,
      email: resume.email,
      phone: resume.phone,
      degree: resume.degree,
      fieldOfStudy: resume.fieldOfStudy,
      college: resume.college,
      year: resume.year,
      jobTitle: resume.jobTitle,
      company: resume.company,
      jobCity: resume.jobCity,
      jobYear: resume.jobYear,
      jobDesc: resume.jobDesc,
      skills: resume.skills,
      id: resume.id,
    };
    this.setState({ resumeDetails: updatedData });
  };

  // This function is used to render the resume of the user
  renderResume = () => {
    const { resumeDetails } = this.state;
    const {
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
        <div className="resume-detailed-view-container">
          <div className="resume-summary-card">
            <div className="intro">
              <h1 className="resume-summary-Name">
                {firstName} {lastName}
              </h1>
              <div className="profileResume-personal-detail">
                <p className="resume-summary-card-city">
                  <b>City </b>&emsp;&emsp;&emsp;
                  {currentCity},{postalCode}
                </p>
                <p className="resume-summary-card-phone">
                  <b>Phone </b>&emsp;&ensp;
                  {phone}
                </p>
                <p className="resume-summary-card-email">
                  <b>Email </b>&emsp;&emsp;
                  {email}
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
            <div className="resume-detailed-card-education">
              <h2 className="work-experience-heading">Education</h2>
              <div className="education">
                <p className="resume-summary-card-college">
                  <b>College </b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  {college}
                </p>
                <p className="resume-summary-card-degree">
                  <b>Programe </b>&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;&ensp;
                  {degree}
                </p>
                <p className="resume-summary-card-fieldOfStudy">
                  <b>Field of study </b>&emsp;&emsp;&ensp;&ensp;
                  {fieldOfStudy}
                </p>
                <p className="resume-summary-card-year">
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
            <ul className="resume-detailed-view-skills-container">
              {Object.keys(skills).map((key) => {
                if (skills[key] === true) {
                  return (
                    <div key={key}>
                      <li className="resume-detailed-view-skill" key={key}>
                        <p className="skill-p">{key}</p>
                      </li>
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </>
    );
  };

  render() {
    return this.renderResume();
  }
}

export default ResumeDetails;
