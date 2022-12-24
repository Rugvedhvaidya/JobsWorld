// This component is used to render card of applied jobs by the user.
import "./index.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faFileAlt,
  faMapMarkerAlt,
  faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "react/cjs/react.production.min";

class AppliedJobItem extends Component {
  //This function is called when apply btn is clicked
  onClickApplyBtn = async () => {
    const { jobDetails } = this.props;
    const { id } = jobDetails;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/jobsapplied`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      body: JSON.stringify({ jobId: id }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const { getAppliedJobs } = this.props;
    getAppliedJobs();
  };

  render() {
    const { jobDetails } = this.props;
    const {
      id,
      jobTitle,
      companyName,
      reviews = 7999,
      salary,
      jobDescription,
      companyLocation,
      jobType,
      posted = "2 days ago",
    } = jobDetails;

    const contractIcon = <FontAwesomeIcon icon={faBusinessTime} />;
    const rupeeIcon = <FontAwesomeIcon icon={faRupeeSign} />;
    const locationIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />;
    const descriptionIcon = <FontAwesomeIcon icon={faFileAlt} />;

    return (
      <>
        <div className="job-card-container">
          <div className="job-card-container-header">
            <h1 className="job-card-role">{jobTitle}</h1>
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
            <p className="job-card-posted">{posted}</p>
            <div>
              <Link to={`jobs/${id}`}>
                <button className="job-card-view-details-btn" type="button">
                  View Details
                </button>
              </Link>
              <button
                className="job-card-apply-btn"
                type="button"
                onClick={this.onClickApplyBtn}
              >
                Discard Application
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AppliedJobItem;
