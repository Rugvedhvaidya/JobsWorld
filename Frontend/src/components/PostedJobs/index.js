// This component renders all the jobs posted by the user.
import { Component } from "react/cjs/react.production.min";
import "./index.css";

import PostedJobItem from "../PostedJobItem";

import Cookies from "js-cookie";

class PostedJobs extends Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getAllJobs();
  }

  //This function is used to get all the jobs which are posted by user.
  getAllJobs = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/user-postings`;
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const { jobs } = fetchedData;
    this.setState({ jobs: jobs });
  };

  //This is used to display all the jobs posted by the user.
  render() {
    const { jobs } = this.state;
    const updatedData = jobs.map((eachObject) => ({
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
    if (updatedData.length === 0) {
      return (
        <div className="empty-shortlist-container">
          <h1 className="empty-shortlist-heading">Oops...</h1>
          <p className="empty-shortlist-description">
            You have not posted any Jobs...
          </p>
        </div>
      );
    } else {
      return updatedData.map((eachJob) => {
        return (
          <PostedJobItem
            jobDetails={eachJob}
            key={eachJob.id}
            getAllJobs={this.getAllJobs}
          />
        );
      });
    }
  }
}

export default PostedJobs;
