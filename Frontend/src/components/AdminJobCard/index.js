// This component is used to render card in posted jobs in profile.
import "./index.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faFileAlt,
  faMapMarkerAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "react/cjs/react.production.min";

class PostedJobItem extends Component {
  //This function is used to delete the job which is posted by the user.
  onClickDeleteBtn = async () => {
    const { jobDetails } = this.props;
    const { id } = jobDetails;
    let apiUrl = `http://localhost:3004/shortlist`;
    let response = await fetch(apiUrl);
    let fetchedData = await response.json();
    fetchedData.map(async (eachObject) => {
      const { shortlisted_ids } = eachObject;
      if (shortlisted_ids.includes(id)) {
        const index = shortlisted_ids.indexOf(id);
        shortlisted_ids.splice(index, 1);
        const apiUrl = `http://localhost:3004/shortlist/${eachObject.id}`;
        const options = {
          method: "PUT",
          body: JSON.stringify(eachObject),
          headers: {
            "Content-type": "application/json",
          },
        };
        await fetch(apiUrl, options);
      }
    });
    apiUrl = `http://localhost:3004/user_applications`;
    response = await fetch(apiUrl);
    fetchedData = await response.json();
    fetchedData.map(async (eachObject) => {
      const { post_ids } = eachObject;
      if (post_ids.includes(id)) {
        const index = post_ids.indexOf(id);
        post_ids.splice(index, 1);
        const apiUrl = `http://localhost:3004/user_applications/${eachObject.id}`;
        const options = {
          method: "PUT",
          body: JSON.stringify(eachObject),
          headers: {
            "Content-type": "application/json",
          },
        };
        await fetch(apiUrl, options);
      }
    });
    apiUrl = `http://localhost:3004/applicants?post_id=${id}`;
    response = await fetch(apiUrl);
    fetchedData = await response.json();
    if (fetchedData.length !== 0) {
      const { id: applicantId } = fetchedData[0];
      apiUrl = `http://localhost:3004/applicants/${applicantId}`;
      const options = {
        method: "DELETE",
      };
      await fetch(apiUrl, options);
    }

    apiUrl = `http://localhost:3004/jobs/${id}`;
    const options = {
      method: "DELETE",
    };
    response = await fetch(apiUrl, options);
    if (response.ok) {
      alert("Deleted Successfuly");
      const { getAllJobs } = this.props;
      getAllJobs();
    }
  };

  render() {
    const { jobDetails, applicants } = this.props;
    const {
      id,
      jobTitle,
      companyName,
      reviews = 7999,
      salary,
      jobDescription,
      companyLocation,
      jobType,
      // posted = "2 days ago",
    } = jobDetails;

    const contractIcon = <FontAwesomeIcon icon={faBusinessTime} />;
    const rupeeIcon = <FontAwesomeIcon icon={faRupeeSign} />;
    const locationIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />;
    const descriptionIcon = <FontAwesomeIcon icon={faFileAlt} />;

    // Rendering card
    return (
      <>
        <div className="job-card-container">
          <div className="job-card-container-header">
            <h1 className="job-card-role">{jobTitle}</h1>
            <div>
              <Link to={`/edit-job/${id}`}>
                <i className="far fa-edit posted-job-edit-btn"></i>
              </Link>
              <i
                className="far fa-trash-alt posted-job-delete-btn"
                onClick={this.onClickDeleteBtn}
              ></i>
            </div>
          </div>
          <div className="job-card-company-reviews">
            <p className="job-card-company">{companyName}</p>
            <p className="job-card-reviews">{reviews} Reviews</p>
          </div>
          <div className="job-card-features-container">
            <div className="job-card-feature">
              {contractIcon}
              <p className="job-card-feature-value">{jobType}</p>
            </div>
            <div className="job-card-feature">
              {rupeeIcon}
              <p className="job-card-feature-value">{salary}</p>
            </div>
            <div className="job-card-feature">
              {locationIcon}
              <p className="job-card-feature-value">{companyLocation}</p>
            </div>
          </div>
          <div className="job-card-description-container">
            {descriptionIcon}
            <p className="job-card-description">
              {jobDescription.slice(0, 120)} ...
            </p>
          </div>
          <div className="job-card-footer">
            <p className="job-card-posted">Applicants : {applicants}</p>
            <div>
              <Link to={`jobs/${id}`}>
                <button className="job-card-view-details-btn" type="button">
                  View Details
                </button>
              </Link>
              <Link to={`/jobs/${id}/applicants`}>
                <button className="job-card-apply-btn" type="button">
                  Applicants
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PostedJobItem;
