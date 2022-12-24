// This component is used to render all shortlisted pages of the user.
import { Component } from "react/cjs/react.production.min";
import "./index.css";

import ShortlistItem from "../ShortlistItem";
import Cookies from "js-cookie";

class Shortlist extends Component {
  state = {
    jobs: [],
    shortlistedJobs: [],
    appliedJobs: [],
  };

  componentDidMount() {
    this.getShortlistedJobs();
    this.getAllJobs();
    this.getAppliedJobs();
  }

  // This function is used to get all jobs from db.
  getAllJobs = async () => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobs`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const { jobs } = fetchedData;
    this.setState({ jobs });
  };

  // This function is used to get the shortlisted jobs of the user
  getShortlistedJobs = async () => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/shortlist`;
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
    const { list } = fetchedData;
    this.setState({ shortlistedJobs: list.job_ids });
  };

  // This component is used to get applied jobs of the user.
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

  // This function is executed when a job is removed from the shortlist.
  onRemoveShortlistedJob = () => {
    this.getShortlistedJobs();
  };

  onClickApply = () => {
    this.getAppliedJobs();
  };

  // Renders all the shortlisted jobs.
  render() {
    const { shortlistedJobs, jobs, appliedJobs } = this.state;
    const filteredJobs = jobs.filter((eachJob) => {
      return shortlistedJobs.includes(eachJob._id);
    });
    const updatedData = filteredJobs.map((eachObject) => ({
      companyDescription: eachObject.company_description,
      companyLocation: eachObject.company_location,
      companyName: eachObject.company_name,
      educationLevel: eachObject.education_level,
      id: eachObject._id,
      jobDescription: eachObject.job_description,
      jobTitle: eachObject.job_title,
      jobType: eachObject.job_type,
      numberOfPostings: eachObject.number_of_postings,
      roleCategory: eachObject.role_category,
      salary: eachObject.salary,
      skills: eachObject.skills,
      workExperience: eachObject.work_experience,
    }));
    if (shortlistedJobs.length === 0) {
      return (
        <div className="empty-shortlist-container">
          <h1 className="empty-shortlist-heading">Oops...</h1>
          <p className="empty-shortlist-description">
            Your wishlist is empty...
          </p>
        </div>
      );
    }
    return updatedData.map((eachJob) => {
      return (
        <ShortlistItem
          onClickApply={this.onClickApply}
          isAppliedJob={appliedJobs.includes(eachJob.id)}
          jobDetails={eachJob}
          key={eachJob.id}
          onRemoveShortlistedJob={this.onRemoveShortlistedJob}
        />
      );
    });
  }
}

export default Shortlist;
