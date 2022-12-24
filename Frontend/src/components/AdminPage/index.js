import { Component } from "react";
import "./index.css";

import AdminJobCard from "../AdminJobCard";

class AdminPage extends Component {
  state = {
    postDetails: [],
    applicants: [],
  };

  componentDidMount() {
    this.getpostDetails();
    this.getapplicantDetails();
  }

  getpostDetails = async () => {
    const Url = `http://localhost:3004/jobs`;
    const res = await fetch(Url);
    const fetchedData = await res.json();
    this.setState({ postDetails: fetchedData });
  };

  getapplicantDetails = async () => {
    const Url = `http://localhost:3004/applicants`;
    const res = await fetch(Url);
    const fetchedData = await res.json();
    this.setState({ applicants: fetchedData });
  };

  renderJobs = () => {
    const { postDetails, applicants } = this.state;
    const updatedData = postDetails.map((eachObject) => ({
      companyDescription: eachObject.company_description,
      companyLocation: eachObject.company_location,
      companyName: eachObject.company_name,
      educationLevel: eachObject.education_level,
      id: eachObject.id,
      jobDescription: eachObject.job_description,
      jobTitle: eachObject.job_title,
      jobType: eachObject.job_type,
      numberOfPostings: eachObject.number_of_postings,
      roleCategory: eachObject.role_category,
      salary: eachObject.salary,
      skills: eachObject.skills,
      workExperience: eachObject.work_experience,
    }));
    return updatedData.map((eachObject) => {
      let number_of_applicants = 0;
      const isPresent = applicants.filter((each) => {
        return each.post_id === eachObject.id;
      });
      if (isPresent.length === 0) {
        number_of_applicants = 0;
      } else {
        number_of_applicants = isPresent[0].applicant_ids.length;
      }
      return (
        <AdminJobCard
          jobDetails={eachObject}
          key={eachObject.id}
          applicants={number_of_applicants}
        />
      );
    });
  };

  render() {
    return (
      <>
        <div className="admin-jobs-container">{this.renderJobs()}</div>;
      </>
    );
  }
}

export default AdminPage;
