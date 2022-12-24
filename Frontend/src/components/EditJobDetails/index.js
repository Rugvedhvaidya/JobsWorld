// This component is used to change the job details which is used to edit the job using EditJobForm

import "./index.css";
import postjob from "./Images/job-offer.webp";

const EditJobDetails = (props) => {
  // This function is used to change the state when job title input is changed
  const onChangeJobTitleInput = (event) => {
    const { changeJobTitle } = props;
    changeJobTitle(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about job title
  const renderJobTitleInput = () => {
    const { jobTitle, validateJobTitle, isJobTitleValid } = props;
    return (
      <>
        <label className="job-title-label" htmlFor="job-title">
          Job Title
        </label>
        <input
          type="text"
          id="job-title"
          className="post-job-title-input"
          placeholder="Job Title"
          value={jobTitle}
          onChange={onChangeJobTitleInput}
          onBlur={validateJobTitle}
          required
        />
        {!isJobTitleValid && (
          <p className="post-job-form-error-msg">*Job title cannot be empty</p>
        )}
      </>
    );
  };

  // This function is used to change the state when job desc  input is changed
  const onChangeJobDescriptionInput = (event) => {
    const { changeJobDescription } = props;
    changeJobDescription(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about job desc
  const renderJobDescriptionInput = () => {
    const { jobDescription, validateJobDescription, isJobDescriptionValid } =
      props;
    return (
      <>
        <label
          className="post-job-details-form-label"
          htmlFor="job-description"
        >
          Job Description
        </label>
        <textarea
          rows="10"
          type="text"
          id="job-description"
          className="post-job-description-input"
          placeholder="Job Description"
          value={jobDescription}
          onChange={onChangeJobDescriptionInput}
          onBlur={validateJobDescription}
        />
        {!isJobDescriptionValid && (
          <p className="post-job-form-error-msg">
            *Job Description must be atleat 30 characters
          </p>
        )}
      </>
    );
  };

  // This function is used to change the state when role category input is changed
  const onChangeRoleCategoryInput = (event) => {
    const { changeRoleCategory } = props;
    changeRoleCategory(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about role category
  const renderRoleCategoryInput = () => {
    const { roleCategory, validateRoleCategory, isRoleCategoryValid } = props;
    return (
      <>
        <label className="post-job-details-form-label" htmlFor="role-category">
          Role Category
        </label>
        <input
          type="text"
          id="role-category"
          className="post-role-category-input"
          placeholder="Category"
          value={roleCategory}
          onChange={onChangeRoleCategoryInput}
          onBlur={validateRoleCategory}
        />
        {!isRoleCategoryValid && (
          <p className="post-job-form-error-msg">*Category can not be empty</p>
        )}
      </>
    );
  };

  // This function is used to change the state when salary input is changed
  const onChangeSalaryInput = (event) => {
    const { changeSalary } = props;
    changeSalary(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about salary
  const renderSalaryInput = () => {
    const { salary, validateSalary, isSalaryValid } = props;
    return (
      <>
        <label className="post-job-details-form-label" htmlFor="salary">
          Salary
        </label>
        <input
          type="number"
          id="salary"
          className="post-job-salary-input"
          placeholder="Eg. 50000/-"
          value={salary}
          onChange={onChangeSalaryInput}
          onBlur={validateSalary}
          step={25000}
        />
        {!isSalaryValid && (
          <p className="post-job-form-error-msg">
            *Salary should be more than 50,000
          </p>
        )}
      </>
    );
  };

  // This function is used to change the state when work experience input is changed
  const onChangeWorkExperience = (event) => {
    const { changeWorkExperience } = props;
    changeWorkExperience(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about work experience
  const renderWorkExperienceInput = () => {
    const { workExperience, validateWorkExperience, isWorkExperienceValid } =
      props;
    return (
      <>
        <label
          className="post-job-details-form-label"
          htmlFor="work-experience"
        >
          Minimum work experience required(years)
        </label>
        <input
          type="number"
          id="work-experience"
          className="post-job-work-experience-input"
          placeholder="Min Work Experience Required"
          value={workExperience}
          onChange={onChangeWorkExperience}
          onBlur={validateWorkExperience}
        />
        {!isWorkExperienceValid && (
          <p className="post-job-form-error-msg">*Invalid work experience</p>
        )}
      </>
    );
  };

  // This function is used to change the state when job type input is changed
  const onChangeJobType = (event) => {
    const { changeJobType } = props;
    changeJobType(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about job type
  const renderJobTypeInput = () => {
    const { jobTypeInput, activeJobTypeId } = props;

    return (
      <>
        <label className="post-job-details-form-label" htmlFor="job-type">
          Job Type
        </label>
        <select
          id="job-type"
          className="select-job-type"
          value={activeJobTypeId}
          onChange={onChangeJobType}
        >
          {jobTypeInput.map((eachObject) => {
            const { jobTypeId, jobType } = eachObject;
            return (
              <option
                className="option-job-type"
                key={jobTypeId}
                value={jobType}
              >
                {jobType}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  // This function is used to change the state when education level input is changed
  const onChangeEducationLevel = (event) => {
    const { changeEducationLevel } = props;
    changeEducationLevel(event.target.value);
  };

  // This function is used to render the input element which is used to collect info about education level
  const renderEducationLevelInput = () => {
    const { educationLevelInput, activeEducationLevelId } = props;
    return (
      <>
        <label
          className="post-job-details-form-label"
          htmlFor="education-level"
        >
          Education Level
        </label>
        <select
          id="educationLevel"
          className="select-education-level"
          value={activeEducationLevelId}
          onChange={onChangeEducationLevel}
        >
          {educationLevelInput.map((eachObject) => {
            const { educationLevelId, displayText } = eachObject;
            return (
              <option
                className="option-education-level"
                key={educationLevelId}
                value={displayText}
              >
                {displayText}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  // This component is used to render skills
  const renderSkills = () => {
    const { skillsInput, selectedSkills, addSkill, deleteSkill } = props;
    return (
      <>
        {skillsInput.map((eachSkill) => {
          const { skillId, skill } = eachSkill;
          const onClickSkill = () => {
            selectedSkills.includes(skill)
              ? deleteSkill(skill)
              : addSkill(skill);
          };
          return selectedSkills.includes(skill) ? (
            <li
              className="post-job-form-skill post-job-form-selected-skill"
              onClick={onClickSkill}
              key={skillId}
              value={skill}
            >
              {skill}
            </li>
          ) : (
            <li
              className="post-job-form-skill post-job-form-non-selected-skill"
              onClick={onClickSkill}
              key={skillId}
              value={skill}
            >
              {skill}
            </li>
          );
        })}
      </>
    );
  };

  const renderSkillsInput = () => {
    return (
      <>
        <label
          className="post-job-details-form-label"
          htmlFor="required-skills"
        >
          Skills Required
        </label>
        <ul className="post-job-form-skills-list" id="required-skills">
          {renderSkills()}
        </ul>
      </>
    );
  };

  // This button to used to navigave to the prev page.
  const onClickPreviousBtn = () => {
    const { prevStep } = props;
    prevStep();
  };

  // This function is used to render previous btn.
  const renderPreviousBtn = () => {
    return (
      <>
        <button
          type="button"
          className="post-job-details-previous-button"
          onClick={onClickPreviousBtn}
        >
          Previous
        </button>
      </>
    );
  };

  // This function  is executed when we submit the form
  const onClickSubmitBtn = (event) => {
    const { submitForm } = props;
    submitForm(event);
  };

  // Thus func is used to render submit btn.
  const renderSubmitBtn = () => {
    return (
      <>
        <button
          type="submit"
          className="post-job-details-submit-button"
          onClick={onClickSubmitBtn}
        >
          Submit
        </button>
      </>
    );
  };
  // Thus function is used to render submit btn and previous btn.
  const renderPreviousAndSubmitBtn = () => {
    return (
      <>
        <div className="post-job-form-footer">
          {renderPreviousBtn()}
          {renderSubmitBtn()}
        </div>
      </>
    );
  };

  // Used to reneder all input fileds
  return (
    <div className="post-job-details-container">
      <div className="post-job-details-container-form">
        <h1 className="post-job-details-heading">JobsWorld For Employer</h1>
        {renderJobTitleInput()}
        {renderJobDescriptionInput()}
        {renderRoleCategoryInput()}
        {renderSalaryInput()}
        {renderWorkExperienceInput()}
        {renderJobTypeInput()}
        {renderEducationLevelInput()}
        {renderSkillsInput()}
        {renderPreviousAndSubmitBtn()}
      </div>
      <img className="post-job-details-image" src={postjob} alt="post-job" />
    </div>
  );
};

export default EditJobDetails;
