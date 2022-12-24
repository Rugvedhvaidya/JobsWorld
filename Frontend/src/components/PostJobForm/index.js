// This component is used to render form which is used to post the job details posted by the user.
import "./index.css";

import { Component } from "react";
import PostCompanyDetails from "../PostCompanyDetails";
import PostJobDetails from "../PostJobDetails";

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

// The below arrays are used to render respective input fileds.
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

class PostJobForm extends Component {
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
  };

  // The below functions are used to change state when the fields are changed and validate the fileds.

  changeCompanyName = (companyName) => {
    this.setState({ companyName });
  };

  validateCompanyName = () => {
    const { companyName } = this.state;
    companyName === ""
      ? this.setState({ isCompanyNameValid: false })
      : this.setState({ isCompanyNameValid: true });
  };

  changeRoleInHiringProcess = (activeRoleInHiringProcessId) => {
    this.setState({ activeRoleInHiringProcessId });
  };

  changeCompanyDescription = (companyDescription) => {
    this.setState({ companyDescription });
  };

  validateCompanyDescription = () => {
    const { companyDescription } = this.state;
    companyDescription.length >= 30
      ? this.setState({ isCompanyDescriptionValid: true })
      : this.setState({ isCompanyDescriptionValid: false });
  };

  changeCompanyLocation = (companyLocation) => {
    this.setState({ companyLocation });
  };

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

  changeJobTitle = (jobTitle) => {
    this.setState({ jobTitle });
  };

  validateJobTitle = () => {
    const { jobTitle } = this.state;
    jobTitle === ""
      ? this.setState({ isJobTitleValid: false })
      : this.setState({ isJobTitleValid: true });
  };

  changeJobDescription = (jobDescription) => {
    this.setState({ jobDescription });
  };

  validateJobDescription = () => {
    const { jobDescription } = this.state;
    jobDescription.length >= 30
      ? this.setState({ isJobDescriptionValid: true })
      : this.setState({ isJobDescriptionValid: false });
  };

  changeRoleCategory = (roleCategory) => {
    this.setState({ roleCategory });
  };

  validateRoleCategory = () => {
    const { roleCategory } = this.state;
    roleCategory === ""
      ? this.setState({ isRoleCategoryValid: false })
      : this.setState({ isRoleCategoryValid: true });
  };

  changeSalary = (salary) => {
    this.setState({ salary });
  };

  validateSalary = () => {
    const { salary } = this.state;
    salary >= 50000
      ? this.setState({ isSalaryValid: true })
      : this.setState({ isSalaryValid: false });
  };

  changeWorkExperience = (workExperience) => {
    this.setState({ workExperience });
  };

  validateWorkExperience = () => {
    const { workExperience } = this.state;
    workExperience < 0 || workExperience === ""
      ? this.setState({ isWorkExperienceValid: false })
      : this.setState({ isWorkExperienceValid: true });
  };

  changeJobType = (activeJobTypeId) => {
    this.setState({ activeJobTypeId });
  };

  changeEducationLevel = (activeEducationLevelId) => {
    this.setState({ activeEducationLevelId });
  };

  addSkill = (skillId) => {
    const { selectedSkills } = this.state;
    const updatedSkills = [...selectedSkills, skillId];
    this.setState({ selectedSkills: updatedSkills });
  };

  deleteSkill = (skillId) => {
    const { selectedSkills } = this.state;
    const updatedSkills = selectedSkills.filter(
      (eachSkillId) => eachSkillId !== skillId
    );
    this.setState({ selectedSkills: updatedSkills });
  };

  validateNext = () => {
    const { companyName, companyDescription, companyLocation } = this.state;
    return !(
      companyName === "" ||
      companyDescription.length < 30 ||
      companyLocation === ""
    );
  };

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
    //const { user } = this.props;
    const jwtToken = Cookies.get("jwt_token");
    if (this.validateForm()) {
      const {
        activeRoleInHiringProcessId,
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
      const newJobObject = {
        role: activeRoleInHiringProcessId,
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

      const options = {
        method: "POST",
        body: JSON.stringify(newJobObject),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      // making a post request to server
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/jobs`, options);
      if (response.ok === true) {
        const { history } = this.props;
        alert(
          "Form submitted successfully, You will be redirected to home page..."
        );
        window.location = "/";
      }
    } else {
      // updating error msgs
      this.validateJobTitle();
      this.validateJobDescription();
      this.validateRoleCategory();
      this.validateSalary();
      this.validateWorkExperience();
    }
  };

  // remdering post job details form.
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
          <PostCompanyDetails
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
          <PostJobDetails
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

export default PostJobForm;
