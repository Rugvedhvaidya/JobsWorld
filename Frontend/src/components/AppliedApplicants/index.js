// This component is used to render all the applicants of the particular job post
import { Component } from "react";
import "./index.css";

import Applicant from "../Applicant";

class Applicants extends Component {
  state = { applicantIds: [] };

  componentDidMount() {
    this.getApplicants();
  }

  //This function is used to redirect to resume page of the applicant
  // renderResume = async (userId) => {
  //   const { history } = this.props;
  //   const apiUrl = `http://localhost:5000/resume/${userId}`;
  //   const response = await fetch(apiUrl);
  //   const fetchedData = await response.json();
  //   const { resume } = fetchedData;
  //   const resumeId = resume._id;
  //   history.push(`/resumes/${resumeId}`);
  // };

  // This function is used to get all the applicants of the post
  getApplicants = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobs/${id}/applicants`;
    const response = await fetch(apiUrl);
    let fetchedData = await response.json();
    const { applicant_ids } = fetchedData;
    this.setState({ applicantIds: applicant_ids });
  };

  render() {
    const { applicantIds } = this.state;

    return (
      <>
        <div className="applied-applicants-container">
          <div className="applied-applicants-table-header">
            <p className="applicant-card-name-heading">Name</p>
            <p className="applicant-card-email-heading">Email</p>
            <p className="applicant-card-resume-heading">Resume</p>
          </div>
          <div className="applied-applicants-table">
            {applicantIds.map((eachId) => {
              // const onClickViewResume = () => {
              //   this.renderResume(eachId);
              // };
              return (
                //This component is used to render each applicant details
                <Applicant
                  userId={eachId}
                  key={eachId}
                  // renderResume={onClickViewResume}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Applicants;
