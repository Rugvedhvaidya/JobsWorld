// This component is used to render form which is used to edit the job details posted by the user.
import "./index.css";

import { Component } from "react";
import EditCompanyDetails from "../EditCompanyDetails";
import EditJobDetails from "../EditJobDetails";
import Cookies from "js-cookie";

// This array is used to render role in hiring process input field.
const roleInHiringProcessOptions = [
  {
    id: "1",
    role: "Hiring Manager",
  },
  {
    id: "2",
    role: "Owner / CEO",
  },
  {
    id: "3",
    role: "Assistant or Office Manager",
  },
  {
    id: "4",
    role: "Other",
  },
];

// This array is used to render job type input field.
const jobTypeInput = [
  {
    jobTypeId: "1",
    jobType: "FullTime",
  },
  {
    jobTypeId: "2",
    jobType: "Contract",
  },
  {
    jobTypeId: "3",
    jobType: "Temporary",
  },
  {
    jobTypeId: "4",
    jobType: "Fresher",
  },
  {
    jobTypeId: "5",
    jobType: "Internship",
  },
];

// This array is used to render skills input field.
const skillsInput = [
  {
    skillId: "1",
    skill: "Java",
  },
  {
    skillId: "2",
    skill: "Python",
  },
  {
    skillId: "3",
    skill: "JavaScript",
  },
  {
    skillId: "4",
    skill: "Angular",
  },
  {
    skillId: "5",
    skill: "ReactJS",
  },
];

// This array is used to render education level input field.
const educationLevelInput = [
  {
    educationLevelId: "1",
    displayText: "Bachelor's Degree",
  },
  {
    educationLevelId: "2",
    displayText: "Master's Degree",
  },
  {
    educationLevelId: "3",
    displayText: "Doctoral Degree",
  },
  {
    educationLevelId: "4",
    displayText: "Diploma",
  },
  {
    educationLevelId: "5",
    displayText: "12th Pass",
  },
  {
    educationLevelId: "6",
    displayText: "10th pass",
  },
];

class EditJobForm extends Component {
  state = {
    step: 1,
    companyName: "",
    isCompanyNameValid: true,
    activeRoleInHiringProcessId: "Hiring Manager",
    companyDescription: "",
    isCompanyDescriptionValid: true,
    companyLocation: "",
    isCompanyLocationValid: true,
    numberOfPostings: 1,
    jobTitle: "",
    isJobTitleValid: true,
    jobDescription: "",
    isJobDescriptionValid: true,
    roleCategory: "",
    isRoleCategoryValid: true,
    salary: "",
    isSalaryValid: true,
    workExperience: "",
    isWorkExperienceValid: true,
    activeJobTypeId: "FullTime",
    activeEducationLevelId: "Bachelor's Degree",
    selectedSkills: [],
    userId: "",
  };

  componentDidMount() {
    this.getJobDetails();
  }

  // This function is used to get all jobs in db.
  getJobDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobs/edit/${id}`;
    const response = await fetch(apiUrl);
    const fethcedData = await response.json();
    const { jobDetails } = fethcedData;
    this.setState({
      userId: jobDetails.user_id,
      companyName: jobDetails.company_name,
      companyDescription: jobDetails.company_description,
      companyLocation: jobDetails.company_location,
      numberOfPostings: jobDetails.number_of_postings,
      jobTitle: jobDetails.job_title,
      jobDescription: jobDetails.job_description,
      roleCategory: jobDetails.role_category,
      salary: jobDetails.salary,
      workExperience: jobDetails.work_experience,
      activeJobTypeId: jobDetails.job_type,
      educationLevelId: jobDetails.education_level,
      selectedSkills: jobDetails.skills,
    });
  };

  // This function is used to update state when company name is changed
  changeCompanyName = (companyName) => {
    this.setState({ companyName });
  };

  // This function is used to validate company name
  validateCompanyName = () => {
    const { companyName } = this.state;
    companyName === ""
      ? this.setState({ isCompanyNameValid: false })
      : this.setState({ isCompanyNameValid: true });
  };

  // This function is used to update state when role in hiring process input is changed
  changeRoleInHiringProcess = (activeRoleInHiringProcessId) => {
    this.setState({ activeRoleInHiringProcessId });
  };

  // This function is used to update state when company desc is changed
  changeCompanyDescription = (companyDescription) => {
    this.setState({ companyDescription });
  };

  // This function is used to validate company desc
  validateCompanyDescription = () => {
    const { companyDescription } = this.state;
    companyDescription.length >= 30
      ? this.setState({ isCompanyDescriptionValid: true })
      : this.setState({ isCompanyDescriptionValid: false });
  };

  // This function is used to update state when company location input is changed
  changeCompanyLocation = (companyLocation) => {
    this.setState({ companyLocation });
  };

  // This function is used to validate company location
  validateCompanyLocation = () => {
    const { companyLocation } = this.state;
    companyLocation === ""
      ? this.setState({ isCompanyLocationValid: false })
      : this.setState({ isCompanyLocationValid: true });
  };

  incrementNumberOfPostings = () => {
    this.setState((prevState) => ({
      numberOfPostings: prevState.numberOfPostings + 1,
    }));
  };

  decrementNumberOfPostings = () => {
    const { numberOfPostings } = this.state;
    if (numberOfPostings > 1) {
      this.setState({ numberOfPostings: numberOfPostings - 1 });
    }
  };

  nextStep = () => {
    if (this.validateNext()) {
      this.setState((prevState) => ({ step: 2 }));
    } else {
      this.validateCompanyName();
      this.validateCompanyDescription();
      this.validateCompanyLocation();
    }
  };

  prevStep = () => {
    this.setState((prevState) => ({ step: 1 }));
  };

  // This function is used to update state when job title input is changed
  changeJobTitle = (jobTitle) => {
    this.setState({ jobTitle });
  };

  // This function is used to validate jobtitle
  validateJobTitle = () => {
    const { jobTitle } = this.state;
    jobTitle === ""
      ? this.setState({ isJobTitleValid: false })
      : this.setState({ isJobTitleValid: true });
  };

  // This function is used to update state when job desc input is changed
  changeJobDescription = (jobDescription) => {
    this.setState({ jobDescription });
  };

  // This function is used to validate job desc
  validateJobDescription = () => {
    const { jobDescription } = this.state;
    jobDescription.length >= 30
      ? this.setState({ isJobDescriptionValid: true })
      : this.setState({ isJobDescriptionValid: false });
  };

  // This function is used to update state when role category input is changed
  changeRoleCategory = (roleCategory) => {
    this.setState({ roleCategory });
  };

  // This function is used to validate role category
  validateRoleCategory = () => {
    const { roleCategory } = this.state;
    roleCategory === ""
      ? this.setState({ isRoleCategoryValid: false })
      : this.setState({ isRoleCategoryValid: true });
  };

  // This function is used to update state when salary input is changed
  changeSalary = (salary) => {
    this.setState({ salary });
  };

  // This function is used to validate salary
  validateSalary = () => {
    const { salary } = this.state;
    salary >= 50000
      ? this.setState({ isSalaryValid: true })
      : this.setState({ isSalaryValid: false });
  };

  // This function is used to update state when work experience input is changed
  changeWorkExperience = (workExperience) => {
    this.setState({ workExperience });
  };

  // This function is used to validate work experience
  validateWorkExperience = () => {
    const { workExperience } = this.state;
    workExperience < 0 || workExperience === ""
      ? this.setState({ isWorkExperienceValid: false })
      : this.setState({ isWorkExperienceValid: true });
  };

  // This function is used to update state when job type input is changed
  changeJobType = (activeJobTypeId) => {
    this.setState({ activeJobTypeId });
  };

  // This function is used to update state when educatoin level input is changed
  changeEducationLevel = (activeEducationLevelId) => {
    this.setState({ activeEducationLevelId });
  };

  // This function is used to update state when skill input is added
  addSkill = (skillId) => {
    const { selectedSkills } = this.state;
    const updatedSkills = [...selectedSkills, skillId];
    this.setState({ selectedSkills: updatedSkills });
  };

  // This function is used to update state when skill input is deleted
  deleteSkill = (skillId) => {
    const { selectedSkills } = this.state;
    const updatedSkills = selectedSkills.filter(
      (eachSkillId) => eachSkillId !== skillId
    );
    this.setState({ selectedSkills: updatedSkills });
  };

  // This function is used to validate all the input fields in company details page
  validateNext = () => {
    const { companyName, companyDescription, companyLocation } = this.state;
    return !(
      companyName === "" ||
      companyDescription.length < 30 ||
      companyLocation === ""
    );
  };

  // This function is used to validate complete form
  validateForm = () => {
    const { jobTitle, jobDescription, roleCategory, salary, workExperience } =
      this.state;
    return !(
      jobTitle === "" ||
      jobDescription.length < 30 ||
      roleCategory === "" ||
      salary < 50000 ||
      workExperience < 0
    );
  };

  //This function is called when the form is submitted
  submitForm = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const {
        companyName,
        companyDescription,
        companyLocation,
        numberOfPostings,
        jobTitle,
        jobDescription,
        roleCategory,
        salary,
        workExperience,
        activeJobTypeId,
        activeEducationLevelId,
        selectedSkills,
      } = this.state;
      const { match } = this.props;
      const { params } = match;
      const { id } = params;

      const newJobObject = {
        company_name: companyName,
        company_description: companyDescription,
        company_location: companyLocation,
        number_of_postings: numberOfPostings,
        job_title: jobTitle,
        job_description: jobDescription,
        role_category: roleCategory,
        salary: salary,
        work_experience: workExperience,
        job_type: activeJobTypeId,
        education_level: activeEducationLevelId,
        skills: selectedSkills,
      };

      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "PUT",
        body: JSON.stringify(newJobObject),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      // making a update request to server
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/jobs/edit/${id}`,
        options
      );
      if (response.ok === true) {
        const { history } = this.props;
        alert(
          "Job details edited successfully, You will be redirected to home page..."
        );
        history.push("/");
      }
    } else {
      this.validateJobTitle();
      this.validateJobDescription();
      this.validateRoleCategory();
      this.validateSalary();
      this.validateWorkExperience();
    }
  };

  render() {
    const {
      step,
      companyName,
      isCompanyNameValid,
      activeRoleInHiringProcessId,
      companyDescription,
      isCompanyDescriptionValid,
      companyLocation,
      isCompanyLocationValid,
      numberOfPostings,
      jobTitle,
      isJobTitleValid,
      jobDescription,
      isJobDescriptionValid,
      roleCategory,
      isRoleCategoryValid,
      salary,
      isSalaryValid,
      workExperience,
      isWorkExperienceValid,
      activeJobTypeId,
      activeEducationLevelId,
      selectedSkills,
    } = this.state;
    return (
      <form className="job-post-form" onSubmit={this.submitForm}>
        {step === 1 ? (
          <EditCompanyDetails
            companyName={companyName}
            changeCompanyName={this.changeCompanyName}
            isCompanyNameValid={isCompanyNameValid}
            validateCompanyName={this.validateCompanyName}
            roleInHiringProcess={roleInHiringProcessOptions}
            activeRoleInHiringProcessId={activeRoleInHiringProcessId}
            changeRoleInHiringProcess={this.changeRoleInHiringProcess}
            companyDescription={companyDescription}
            changeCompanyDescription={this.changeCompanyDescription}
            validateCompanyDescription={this.validateCompanyDescription}
            isCompanyDescriptionValid={isCompanyDescriptionValid}
            companyLocation={companyLocation}
            validateCompanyLocation={this.validateCompanyLocation}
            isCompanyLocationValid={isCompanyLocationValid}
            changeCompanyLocation={this.changeCompanyLocation}
            numberOfPostings={numberOfPostings}
            incrementNumberOfPostings={this.incrementNumberOfPostings}
            decrementNumberOfPostings={this.decrementNumberOfPostings}
            changeNumberOfPostings={this.changeNumberOfPostings}
            nextStep={this.nextStep}
          />
        ) : (
          <EditJobDetails
            jobTitle={jobTitle}
            validateJobTitle={this.validateJobTitle}
            isJobTitleValid={isJobTitleValid}
            changeJobTitle={this.changeJobTitle}
            jobDescription={jobDescription}
            validateJobDescription={this.validateJobDescription}
            isJobDescriptionValid={isJobDescriptionValid}
            changeJobDescription={this.changeJobDescription}
            roleCategory={roleCategory}
            validateRoleCategory={this.validateRoleCategory}
            isRoleCategoryValid={isRoleCategoryValid}
            changeRoleCategory={this.changeRoleCategory}
            salary={salary}
            validateSalary={this.validateSalary}
            isSalaryValid={isSalaryValid}
            changeSalary={this.changeSalary}
            workExperience={workExperience}
            changeWorkExperience={this.changeWorkExperience}
            validateWorkExperience={this.validateWorkExperience}
            isWorkExperienceValid={isWorkExperienceValid}
            jobTypeInput={jobTypeInput}
            activeJobTypeId={activeJobTypeId}
            changeJobType={this.changeJobType}
            educationLevelInput={educationLevelInput}
            activeEducationLevelId={activeEducationLevelId}
            changeEducationLevel={this.changeEducationLevel}
            skillsInput={skillsInput}
            addSkill={this.addSkill}
            deleteSkill={this.deleteSkill}
            selectedSkills={selectedSkills}
            prevStep={this.prevStep}
            submitForm={this.submitForm}
          />
        )}
      </form>
    );
  }
}

export default EditJobForm;
