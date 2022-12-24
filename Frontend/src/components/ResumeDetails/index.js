// This component is used to get the resume details from backend.
import "./index.css";
import { Component } from "react";
import Cookies from "js-cookie";

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
    let fetchedData = await response.json();

    const updatedData = {
      firstName: fetchedData[0].firstName,
      lastName: fetchedData[0].lastName,
      currentCity: fetchedData[0].currentCity,
      postalCode: fetchedData[0].postalCode,
      email: fetchedData[0].email,
      phone: fetchedData[0].phone,
      degree: fetchedData[0].degree,
      fieldOfStudy: fetchedData[0].fieldOfStudy,
      college: fetchedData[0].college,
      year: fetchedData[0].year,
      jobTitle: fetchedData[0].jobTitle,
      company: fetchedData[0].company,
      jobCity: fetchedData[0].jobCity,
      jobYear: fetchedData[0].jobYear,
      jobDesc: fetchedData[0].jobDesc,
      skills: fetchedData[0].skills,
      id: fetchedData[0].id,
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
                if (skills[key] == true) {
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
