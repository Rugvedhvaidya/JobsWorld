// This component is used to render profile of the user.
import "./index.css";
import { Component } from "react";

import Shortlist from "../Shortlist";
import PostedJobs from "../PostedJobs";
import AppliedJobs from "../AppliedJobs";
import ProfileResume from "../ProfileResume";
import ProfileImage from "../ProfileImage";
import Cookies from "js-cookie";
import profile from "./Images/profile.png";
import upload from "./Images/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFileUpload } from "@fortawesome/free-solid-svg-icons";

class Profile extends Component {
  state = { activeTab: "resume", user: {}, selectedFile: "" };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/user`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    const fetchedData = await response.json();
    const { user } = fetchedData;
    this.setState({ user: user });
  };

  onChangeSelectedFile = (event) => {
    this.setState({ selectedFile: event.target.value });
  };

  // To logout the user
  onCLickLogOutBtn = () => {
    Cookies.remove("jwt_token");
    window.location = "/login";
  };

  onClickResume = () => {
    this.setState({ activeTab: "resume" });
  };

  onClickShortlistedJobs = () => {
    this.setState({ activeTab: "shortlistedJobs" });
  };

  onClickPostedJobs = () => {
    this.setState({ activeTab: "postedJobs" });
  };

  onClickAppliedJobs = () => {
    this.setState({ activeTab: "appliedJobs" });
  };

  // To display resume of the user.
  renderResume = () => {
    const { user } = this.props;
    return <ProfileResume user={user} />;
  };

  // To display shortlisted jobs of the user.
  renderShortlistedJobs = () => {
    const { user } = this.props;
    return <Shortlist user={user} />;
  };

  // To display posted jobs of the user.
  renderPostedJobs = () => {
    const { user } = this.props;
    return <PostedJobs user={user} />;
  };

  uploadImage = () => {
    const { user } = this.state;
    return <ProfileImage user={user} />;
  };

  // To display applied jobs of the user.
  renderAppliedJobs = () => {
    return <AppliedJobs />;
  };

  renderSwitch = (activeTab) => {
    switch (activeTab) {
      case "resume":
        return this.renderResume();
      case "shortlistedJobs":
        return this.renderShortlistedJobs();
      case "postedJobs":
        return this.renderPostedJobs();
      case "appliedJobs":
        return this.renderAppliedJobs();
    }
  };

  deleteImage = async () => {
    const { user } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/upload/${user._id}`;
    const options = {
      method: "Delete",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    await fetch(apiUrl, options);
    window.location = "/profile";
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { user } = this.state;
    const data = new FormData(event.target);
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/upload/${user._id}`;
    const options = {
      method: "POST",
      body: data,
    };

    await fetch(apiUrl, options);
    window.location = "/profile";
  };

  render() {
    const { activeTab, user, selectedFile } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-left-container">
          <div className="profile-info">
            <div className="prf-img">
              {user.profilepic === "" ? (
                // <ProfileImage user={user} />
                <div className="profile-pic-container">
                  <img
                    src={profile}
                    alt="blank-profile-pic"
                    className="prf-img"
                  />

                  <form
                    action=""
                    enctype="multipart/form-data"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="image-upload">
                      {selectedFile === "" ? (
                        <label htmlFor="image">
                          <img
                            className="profile-pic-upload-img"
                            src={upload}
                          />
                        </label>
                      ) : (
                        <button
                          type="submit"
                          className="profile-pic-submit-btn"
                        >
                          <FontAwesomeIcon
                            icon={faFileUpload}
                            className="profile-pic-submit-icon"
                          />
                        </button>
                      )}
                      <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={this.onChangeSelectedFile}
                      />
                    </div>
                  </form>
                </div>
              ) : (
                <div className="profile-pic-container"> <img src={user.profilepic} alt="" className="prf-img" />
                  <button onClick={this.deleteImage} className="profile-pic-delete-btn">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="profile-pic-delete-icon"
                    />
                  </button></div>
              )}
            </div>
            <h4>
              {/* {user.email.charAt(0).toUpperCase() + user.email.slice(1, -10)} */}
            </h4>
          </div>
          <div className="profile-tabs">
            {activeTab === "resume" ? (
              <button className="profile-page-btns active-tab">Resume</button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickResume}
              >
                Resume
              </button>
            )}
            {activeTab === "shortlistedJobs" ? (
              <button className="profile-page-btns active-tab">
                Shortlisted Jobs
              </button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickShortlistedJobs}
              >
                Shortlisted Jobs
              </button>
            )}
            {activeTab === "postedJobs" ? (
              <button className="profile-page-btns active-tab">
                Posted jobs
              </button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickPostedJobs}
              >
                Posted Jobs
              </button>
            )}
            {activeTab === "appliedJobs" ? (
              <button className="profile-page-btns active-tab">
                Applied Jobs
              </button>
            ) : (
              <button
                className="profile-page-btns"
                onClick={this.onClickAppliedJobs}
              >
                Applied Jobs
              </button>
            )}

            <button
              className="profile-page-btns"
              onClick={this.onCLickLogOutBtn}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="profile-right-container">
          {this.renderSwitch(activeTab)}
        </div>
      </div>
    );
  }
}

export default Profile;
