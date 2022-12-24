// Component to display all jobs

import "./index.css";
import { Component } from "react";

//Importing Components
import FiltersGroup from "../FiltersGroup";
import JobCard from "../JobCard/";
import JobsHeader from "../JobsHeader";
import Cookies from "js-cookie";

// Array used to display sort filter
const sortByOptions = [
  {
    optionId: "",
    displayText: "Newest First",
  },
  {
    optionId: "asc",
    displayText: "Salary (High-Low)",
  },
  {
    optionId: "desc",
    displayText: "Salary (Low-High)",
  },
];

// Array used to display salary filter
const salaryFilters = [
  {
    salaryId: "2500000+",
    displayText: "25 Lakhs+",
    value: 2500000,
  },
  {
    salaryId: "2000000+",
    displayText: "20 Lakhs+",
    value: 2000000,
  },
  {
    salaryId: "1500000+",
    displayText: "15 Lakhs+",
    value: 1500000,
  },
  {
    salaryId: "1000000+",
    displayText: "10 Lakhs+",
    value: 1000000,
  },
  {
    salaryId: "500000+",
    displayText: "5 Lakhs+",
    value: 500000,
  },
  {
    salaryId: "300000+",
    displayText: "3 Lakhs+",
    value: 300000,
  },
];

// Array used to display location filter
const locationFilters = [
  {
    locationId: "",
    location: "No Specific Location",
  },
  {
    locationId: "Pune",
    location: "Pune",
  },
  {
    locationId: "Hyderabad",
    location: "Hyderabad",
  },
  {
    locationId: "Bangalore",
    location: "Bangalore",
  },
  {
    locationId: "Chennai",
    location: "Chennai",
  },
  {
    locationId: "Trivandrum",
    location: "Trivandrum",
  },
  {
    locationId: "Khammam",
    location: "Khammam",
  },
  {
    locationId: "Mumbai",
    location: "Mumbai",
  },
  {
    locationId: "Delhi",
    location: "Delhi",
  },
  {
    locationId: "Kolkata",
    location: "Kolkata",
  },
];

// Array used to display job type filter
const jobTypeFilters = [
  {
    jobTypeId: "FullTime",
    jobType: "FullTime",
  },
  {
    jobTypeId: "Contract",
    jobType: "Contract",
  },
  {
    jobTypeId: "Temporary",
    jobType: "Temporary",
  },
  {
    jobTypeId: "Fresher",
    jobType: "Fresher",
  },
  {
    jobTypeId: "Internship",
    jobType: "Internship",
  },
];

// Array used to display skill filter
const skillFilters = [
  {
    skillId: "",
    skill: "No Specific Skill",
  },
  {
    skillId: "C++",
    skill: "C++",
  },
  {
    skillId: "Java",
    skill: "Java",
  },
  {
    skillId: "Python",
    skill: "Python",
  },
  {
    skillId: "Javascript",
    skill: "JavaScript",
  },
  {
    skillId: "Angular",
    skill: "Angular",
  },
  {
    skillId: "ReactJS",
    skill: "ReactJS",
  },
  {
    skillId: "SQL",
    skill: "SQL",
  },
  {
    skillId: "JQuery",
    skill: "JQuery",
  },
];

// Array used to display education level filter
const educationLevelFilters = [
  {
    educationLevelId: "Bachelor's Degree",
    displayText: "Bachelor's Degree",
  },
  {
    educationLevelId: "Master's Degree",
    displayText: "Master's Degree",
  },
  {
    educationLevelId: "Doctoral Degree",
    displayText: "Doctoral Degree",
  },
  {
    educationLevelId: "Diploma",
    displayText: "Diploma",
  },
  {
    educationLevelId: "12th Pass",
    displayText: "12th Pass",
  },
  {
    educationLevelId: "10th pass",
    displayText: "10th pass",
  },
];

// Array used to display company filter
const companyFilters = [
  {
    companyId: "",
    companyName: "No Specific Company",
  },
  {
    companyId: "Oracle",
    companyName: "Oracle",
  },
  {
    companyId: "ICS Consultancy Services",
    companyName: "ICS Consultancy Services",
  },
  {
    companyId: "IBM",
    companyName: "IBM",
  },
  {
    companyId: "Microsoft",
    companyName: "Microsoft",
  },
  {
    companyId: "Deloitte",
    companyName: "Deloitte",
  },
  {
    companyId: "Meta",
    companyName: "Meta",
  },
  {
    companyId: "Swiggy",
    companyName: "Swiggy",
  },
  {
    companyId: "Uber",
    companyName: "Uber",
  },
  {
    companyId: "Dell",
    companyName: "Dell",
  },
];

class Jobs extends Component {
  //state is used to maintain all filters
  state = {
    pageNo: 1,
    jobs: [],
    renderJobs: [],
    shortlistedJobs: [],
    appliedJobs: [],
    searchInput: "",
    activeOptionId: "",
    activeSalaryId: "0+",
    activeLocationId: "",
    activeJobTypeId: "",
    activeSkillId: "",
    activeEducationLevelId: "",
    activeCompanyId: "",
  };

  componentDidMount() {
    this.getJobs();
    this.getShortlistedJobs();
    this.getAppliedJobs();
  }

  //This function is used to get all shortlisted jobs of the user
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

  //This function is used to get all applied jobs of the user
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

  //This function is used to get all jobs in database
  getJobs = async () => {
    const {
      searchInput,
      activeSalaryId,
      activeLocationId,
      activeJobTypeId,
      activeSkillId,
      activeEducationLevelId,
      activeCompanyId,
      activeOptionId,
    } = this.state;
    let apiUrl;
    if (activeOptionId === "") {
      apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobs?company_location=${activeLocationId}&job_title=${searchInput}&salary=${parseInt(
        activeSalaryId
      )}&job_type=${activeJobTypeId}&skills=${activeSkillId}&education_level=${activeEducationLevelId}&company_name=${activeCompanyId}`;
    } else {
      apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobs?company_location=${activeLocationId}&job_title=${searchInput}&salary=${parseInt(
        activeSalaryId
      )}&job_type=${activeJobTypeId}&skills=${activeSkillId}&education_level=${activeEducationLevelId}&company_name=${activeCompanyId}&sort=${activeOptionId}`;
    }
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const { jobs } = fetchedData;
    const updatedData = jobs.map((eachObject) => ({
      id: eachObject._id,
      companyDescription: eachObject.company_description,
      companyLocation: eachObject.company_location,
      companyName: eachObject.company_name,
      educationLevel: eachObject.education_level,
      jobDescription: eachObject.job_description,
      jobTitle: eachObject.job_title,
      jobType: eachObject.job_type,
      numberOfPostings: eachObject.number_of_postings,
      roleCategory: eachObject.role_category,
      salary: eachObject.salary,
      skills: eachObject.skills,
      workExperience: eachObject.work_experience,
    }));
    updatedData.reverse(); //to show the newest jobs first
    const renderJobs = updatedData.slice(0, 5);
    this.setState({
      jobs: [...updatedData],
      renderJobs: renderJobs,
      pageNo: 1,
    });
  };

  //This function is called when job search input is changed
  changeSearchInput = (value) => {
    this.setState({ searchInput: value }, this.getJobs);
  };

  enterSearchInput = () => {
    this.getJobs();
  };

  //The below functions are used to change the state when filters are changed
  clickSalaryId = (salaryId) => {
    const { activeSalaryId } = this.state;
    if (activeSalaryId === salaryId) {
      this.setState({ activeSalaryId: "0+" }, this.getJobs);
    } else {
      this.setState({ activeSalaryId: salaryId }, this.getJobs);
    }
  };

  changeLocation = (locationId) => {
    this.setState({ activeLocationId: locationId }, this.getJobs);
  };

  changeJobType = (jobTypeId) => {
    const { activeJobTypeId } = this.state;
    if (activeJobTypeId === jobTypeId) {
      this.setState({ activeJobTypeId: "" }, this.getJobs);
    } else {
      this.setState({ activeJobTypeId: jobTypeId }, this.getJobs);
    }
  };

  changeSkill = (skillId) => {
    this.setState({ activeSkillId: skillId }, this.getJobs);
  };

  changeEducationLevel = (educationLevelId) => {
    const { activeEducationLevelId } = this.state;
    if (activeEducationLevelId === educationLevelId) {
      this.setState({ activeEducationLevelId: "" }, this.getJobs);
    } else {
      this.setState({ activeEducationLevelId: educationLevelId }, this.getJobs);
    }
  };

  changeCompany = (companyId) => {
    this.setState({ activeCompanyId: companyId }, this.getJobs);
  };

  changeOptionId = (optionId) => {
    this.setState({ activeOptionId: optionId }, this.getJobs);
  };

  //This function is used to clear all filters
  clearAllFilters = () => {
    this.setState(
      {
        searchInput: "",
        activeOptionId: "",
        activeSalaryId: "0+",
        activeLocationId: "",
        activeJobTypeId: "",
        activeSkillId: "",
        activeEducationLevelId: "",
        activeCompanyId: "",
      },
      this.getJobs
    );
  };

  //This function is used to render Jobs
  renderAllJobs = () => {
    const { user } = this.props;
    const { activeOptionId, renderJobs, shortlistedJobs, appliedJobs } =
      this.state;
    return (
      <div className="jobs-container">
        <JobsHeader
          sortByOptions={sortByOptions}
          activeOptionId={activeOptionId}
          changeOptionId={this.changeOptionId}
        />
        <div>
          {renderJobs.map((eachJob) => (
            <JobCard
              getShortlistedJobs={this.getShortlistedJobs}
              getAppliedJobs={this.getAppliedJobs}
              isAppliedJob={appliedJobs.includes(eachJob.id)}
              jobDetails={eachJob}
              key={eachJob.id}
              user={user}
              isShortlisted={shortlistedJobs.includes(eachJob.id)}
            />
          ))}
        </div>
      </div>
    );
  };

  //This function is used to perform the pagination
  onClickPageNumber = (pageNumber) => {
    const { jobs } = this.state;
    let renderJobs = null;
    if (2 * pageNumber + 1 > jobs.length) {
      renderJobs = jobs.slice(5 * (pageNumber - 1));
    } else {
      renderJobs = jobs.slice(5 * (pageNumber - 1), 5 * pageNumber);
    }
    this.setState({ pageNo: pageNumber, renderJobs: renderJobs });
  };

  //This function is used to change the page when next btn is clicked
  onClickNextPage = () => {
    const { pageNo } = this.state;
    if (pageNo !== 6) {
      this.onClickPageNumber(pageNo + 1);
    }
  };

  //This function is used to change the page when prev btn is clicked
  onClickPrevPage = () => {
    const { pageNo } = this.state;
    if (pageNo !== 1) this.onClickPageNumber(pageNo - 1);
  };

  //This function is used to display page numbers
  renderPageNumbers = () => {
    const { jobs, pageNo } = this.state;
    const limit = 5;
    let numberOfPagesRequired;
    if (jobs.length % 2 === 0) {
      numberOfPagesRequired = jobs.length / limit;
    } else {
      numberOfPagesRequired = jobs.length / limit + 1;
    }
    const pageNumbers = [];
    for (let i = 1; i <= numberOfPagesRequired; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="page-numbers-container">
        <div className="page-numbers">
          <i className="fas fa-arrow-left" onClick={this.onClickPrevPage}></i>
          {pageNumbers.map((eachNumber) => {
            const clickPageNumber = () => {
              this.onClickPageNumber(eachNumber);
            };
            const className =
              eachNumber === pageNo
                ? "page-number-btn active-page-number"
                : "page-number-btn";
            return (
              <button
                className={className}
                key={eachNumber}
                onClick={clickPageNumber}
              >
                {eachNumber}
              </button>
            );
          })}
          <i className="fas fa-arrow-right" onClick={this.onClickNextPage}></i>
        </div>
      </div>
    );
  };

  render() {
    const {
      searchInput,
      activeSalaryId,
      activeLocationId,
      activeJobTypeId,
      activeSkillId,
      activeEducationLevelId,
      activeCompanyId,
    } = this.state;
    return (
      <>
        <div className="all-jobs-section">
          {
            //This Component is used to render filters
          }
          <FiltersGroup
            searchInput={searchInput}
            changeSearchInput={this.changeSearchInput}
            enterSearchInput={this.enterSearchInput}
            salaryFilters={salaryFilters}
            clickSalaryId={this.clickSalaryId}
            activeSalaryId={activeSalaryId}
            locationFilters={locationFilters}
            activeLocationId={activeLocationId}
            changeLocation={this.changeLocation}
            jobTypeFilters={jobTypeFilters}
            activeJobTypeId={activeJobTypeId}
            changeJobType={this.changeJobType}
            skillFilters={skillFilters}
            activeSkillId={activeSkillId}
            changeSkill={this.changeSkill}
            educationLevelFilters={educationLevelFilters}
            activeEducationLevelId={activeEducationLevelId}
            changeEducationLevel={this.changeEducationLevel}
            companyFilters={companyFilters}
            activeCompanyId={activeCompanyId}
            changeCompany={this.changeCompany}
            clearAllFilters={this.clearAllFilters}
          />
          {this.renderAllJobs()}
        </div>
        {this.renderPageNumbers()}
      </>
    );
  }
}

export default Jobs;
