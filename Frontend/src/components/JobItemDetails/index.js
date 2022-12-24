// This component is used to get the job details of the particular job from the backend.
import "./index.css";
import { Component } from "react";

import JobItem from "../JobItem";
import Cookies from "js-cookie";

class JobItemDetails extends Component {
  state = {
    jobDetails: {
      skills: [],
    },
    appliedJobs: [],
  };

  componentDidMount() {
    this.getJobDetails();
    this.getAppliedJobs();
  }

  //This function is used to get all applied jobs of the user.
  getAppliedJobs = async () => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobsapplied`;
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
    const { jobsApplied } = fetchedData;
    this.setState({ appliedJobs: jobsApplied.job_ids });
  };

  // This function is used to get job details of the partivular job.
  getJobDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params; // collecting the id from url
    
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobs/${id}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const { details } = fetchedData;
    const updatedData = {
      id: details._id,
      companyDescription: details.company_description,
      companyLocation: details.company_location,
      companyName: details.company_name,
      educationLevel: details.education_level,
      jobDescription: details.job_description,
      jobTitle: details.job_title,
      jobType: details.job_type,
      numberOfPostings: details.number_of_postings,
      roleCategory: details.role_category,
      salary: details.salary,
      skills: details.skills,
      workExperience: details.work_experience,
    };
    this.setState({ jobDetails: updatedData });
  };

  //This function is used to apply for the job
  onClickApplyBtn = async () => {
    const { jobDetails } = this.state;
    const { id } = jobDetails;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobsapplied`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      body: JSON.stringify({ jobId: id }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    // This will fetch the data again and re-render the component
    this.getAppliedJobs();
  };

  // Calling JobITtem to display the job.
  render() {
    const { jobDetails, appliedJobs } = this.state;
    return (
      <JobItem
        jobDetails={jobDetails}
        isAppliedJob={appliedJobs.includes(jobDetails.id)}
        onClickApplyBtn={this.onClickApplyBtn}
      />
    );
  }
}

export default JobItemDetails;
