// This component is used to render the filters.
import "./index.css";

const FiltersGroup = (props) => {
  // This function is used to change the state when search input is changed
  const onChangeSearchInput = (event) => {
    const { changeSearchInput } = props;
    changeSearchInput(event.target.value);
  };

  // This function is used to change the state when enter key is clicked.
  const onEnterSearchInput = (event) => {
    const { enterSearchInput } = props;
    if (event.key === "Enter") {
      enterSearchInput();
    }
  };

  // This function is used to render search input.
  const renderSearchInput = () => {
    const { searchInput } = props;
    return (
      <input
        type="search"
        className="filters-search-bar"
        placeholder="Search Job Name"
        value={searchInput}
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
    );
  };

  // This function is used to change the state when salary is changed
  const changeSalaryCategory = (salaryId) => {
    const { clickSalaryId } = props;
    clickSalaryId(salaryId);
  };

  // This function is used to render salary input.
  const renderSalaryFilters = () => {
    const { salaryFilters } = props;
    return salaryFilters.map((eachObject) => {
      const { salaryId, displayText } = eachObject;
      const { activeSalaryId } = props;
      const onClickSalaryId = () => changeSalaryCategory(salaryId);
      const listItemClassName =
        salaryId === activeSalaryId
          ? "each-salary-filter active-salary-filter"
          : "each-salary-filter";
      return (
        <li key={salaryId} onClick={onClickSalaryId}>
          <p className={listItemClassName}>{displayText}</p>
        </li>
      );
    });
  };

  const renderSalaries = () => {
    return (
      <>
        <h1 className="salary-estimate-heading">Salary Estimate</h1>
        <ul className="salary-filters">{renderSalaryFilters()}</ul>
      </>
    );
  };

  // This function is used to change the state when location input is changed
  const onChangeLocation = (event) => {
    const { changeLocation } = props;
    changeLocation(event.target.value);
  };

  // This function is used to render location filter.
  const renderLocations = () => {
    const { locationFilters, activeLocationId } = props;
    return (
      <>
        <h1 className="location-heading">Location</h1>
        <select
          className="select-location"
          value={activeLocationId}
          onChange={onChangeLocation}
        >
          {locationFilters.map((eachLocation) => {
            const { locationId, location } = eachLocation;
            return (
              <option
                className="option-location"
                key={locationId}
                value={locationId}
              >
                {location}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  // This function is used to change the state when jobType input is changed
  const onClickJobType = (jobTypeId) => {
    const { changeJobType } = props;
    changeJobType(jobTypeId);
  };

  const renderJobTypeFilters = () => {
    const { jobTypeFilters, activeJobTypeId } = props;

    return jobTypeFilters.map((eachObject) => {
      const { jobTypeId, jobType } = eachObject;
      const clickJobType = () => onClickJobType(jobTypeId);
      const jobTypeClassName =
        activeJobTypeId === jobTypeId
          ? "each-job-type-filter active-job-type-filter"
          : "each-job-type-filter";
      return (
        <li key={jobTypeId} onClick={clickJobType}>
          <p className={jobTypeClassName}>{jobType}</p>
        </li>
      );
    });
  };

  // This function is used to render job type filter.
  const renderJobType = () => {
    return (
      <>
        <h1 className="job-type-heading">Job Type</h1>
        <ul className="job-type-filters">{renderJobTypeFilters()}</ul>
      </>
    );
  };

  // This function is used to change the state when skill input is changed
  const onChangeSkillId = (event) => {
    const { changeSkill } = props;
    changeSkill(event.target.value);
  };

  // This function is used to render skills filter.
  const renderSkills = () => {
    const { skillFilters, activeSkillId } = props;

    return (
      <>
        <h1 className="skills-heading-1">Skills</h1>
        <select
          className="select-skill"
          value={activeSkillId}
          onChange={onChangeSkillId}
        >
          {skillFilters.map((eachSkill) => {
            const { skillId, skill } = eachSkill;
            return (
              <option className="option-skill" key={skillId} value={skillId}>
                {skill}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  // This function is used to change the state when education level input is changed
  const onClickEducationLevel = (educationLevelId) => {
    const { changeEducationLevel } = props;
    changeEducationLevel(educationLevelId);
  };

  // This function is used to render education level filter.
  const renderEducationLevelFilters = () => {
    const { educationLevelFilters, activeEducationLevelId } = props;

    return educationLevelFilters.map((eachObject) => {
      const { educationLevelId, displayText } = eachObject;
      const clickEducationLevel = () => onClickEducationLevel(educationLevelId);
      const educationLevelClassName =
        activeEducationLevelId === educationLevelId
          ? "each-education-level-filter active-education-level-filter"
          : "each-education-level-filter";
      return (
        <li key={educationLevelId} onClick={clickEducationLevel}>
          <p className={educationLevelClassName}>{displayText}</p>
        </li>
      );
    });
  };

  const renderEducationLevel = () => {
    return (
      <>
        <h1 className="education-level-heading">Education Level</h1>
        <ul className="education-level-filters">
          {renderEducationLevelFilters()}
        </ul>
      </>
    );
  };

  // This function is used to change the state when company input is changed
  const onChangeCompanyId = (event) => {
    const { changeCompany } = props;
    changeCompany(event.target.value);
  };

  // This function is used to render company filter.
  const renderCompanyFilters = () => {
    const { companyFilters, activeCompanyId } = props;

    return (
      <>
        <h1 className="company-heading">Company</h1>
        <select
          className="select-company"
          value={activeCompanyId}
          onChange={onChangeCompanyId}
        >
          {companyFilters.map((eachCompany) => {
            const { companyId, companyName } = eachCompany;
            return (
              <option
                className="option-company"
                key={companyId}
                value={companyId}
              >
                {companyName}
              </option>
            );
          })}
        </select>
      </>
    );
  };

  // This function is used to render clear btn which is used to clear all filters.
  const renderClearButton = () => {
    const { clearAllFilters } = props;
    return (
      <div className="filters-clear-button-container">
        <button
          type="button"
          className="filters-clear-button"
          onClick={clearAllFilters}
        >
          Clear
        </button>
      </div>
    );
  };

  // Displaying all filters
  return (
    <div className="filters-card">
      <div className="filters-header">
        <h1 className="filters-heading">Filters</h1>
        {renderClearButton()}
      </div>
      {renderSearchInput()}
      {renderSalaries()}
      {renderLocations()}
      {renderJobType()}
      {renderSkills()}
      {renderEducationLevel()}
      {renderCompanyFilters()}
    </div>
  );
};

export default FiltersGroup;
