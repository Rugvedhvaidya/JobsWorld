// This Component is used to render the whole details of a particular job.
import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faMapMarkerAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const JobDetailedView = (props) => {
  const { jobDetails } = props;
  // Collecting job details from the props.
  const {
    jobTitle,
    companyName,
    reviews = 7999,
    salary,
    jobDescription,
    companyLocation,
    posted = "2 days ago",
    workExperience,
    numberOfPostings,
    jobType,
    roleCategory,
    educationLevel,
    skills,
    companyDescription,
  } = jobDetails;

  const contractIcon = <FontAwesomeIcon icon={faBusinessTime} />;
  const locationIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />;
  const rupeeIcon = <FontAwesomeIcon icon={faRupeeSign} />;

  // This function is used to render the footer of the card.
  const renderCardFooter = () => {
    const { isAppliedJob, onClickApplyBtn } = props;
    return (
      <>
        <div className="job-summary-card-footer">
          <div className="postings-and-posted-container">
            <p className="job-summary-card-posted">{posted}</p>
            <p className="job-summary-card-postings">
              postings : {numberOfPostings}
            </p>
          </div>
          {isAppliedJob ? (
            <button
              className="job-detailed-view-apply-button"
              type="button"
              onClick={onClickApplyBtn}
            >
              Discard Application
            </button>
          ) : (
            <button
              className="job-detailed-view-apply-button"
              type="button"
              onClick={onClickApplyBtn}
            >
              Apply
            </button>
          )}
        </div>
      </>
    );
  };

  // Rendering the whole job details
  return (
    <>
      <div className="job-detailed-view-container">
        <div className="job-summary-card">
          <h1 className="job-summary-card-role">{jobTitle}</h1>
          <div className="job-summary-card-company-reviews">
            <p className="job-summary-card-company">{companyName}</p>
            <p className="job-summary-card-reviews">({reviews} reviews)</p>
          </div>
          <div className="job-summary-card-listing-container">
            {contractIcon}
            <p className="job-summary-card-listing">
              Minimum {workExperience} years.
            </p>
          </div>
          <div className="job-summary-card-listing-container">
            {rupeeIcon}
            <p className="job-summary-card-listing">{salary}/- per year</p>
          </div>
          <div className="job-summary-card-listing-container">
            {locationIcon}
            <p className="job-summary-card-listing">{companyLocation}</p>
          </div>
          {renderCardFooter()}
        </div>
        <div className="job-detailed-card">
          <h1 className="job-description-heading">Job Description</h1>
          <p className="job-detailed-card-description">{jobDescription}</p>
          <h1 className="education-heading">Education</h1>
          <p className="job-detailed-card-education">{educationLevel}</p>
          <h1 className="skills-heading">Required Skills</h1>
          <ul className="job-detailed-view-skills-container">
            {skills.map((eachItem) => (
              <li className="job-detailed-view-skill" key={eachItem}>
                {eachItem}
              </li>
            ))}
          </ul>
          <h1 className="employment-type-heading">Employment Type</h1>
          <p className="job-detailed-view-employment-type">{jobType}</p>
          <h1 className="role-category-heading">Role Category</h1>
          <p className="job-detailed-view-role-category">{roleCategory}</p>
          <h1 className="about-company-heading">About Company</h1>
          <p className="job-detailed-card-about-company">
            {companyDescription}
          </p>
        </div>
      </div>
    </>
  );
};

export default JobDetailedView;
