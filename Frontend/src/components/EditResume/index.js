import { Component } from "react";
import Resume from "./Resume";
import Cookies from "js-cookie";

class EditResume extends Component {
  state = {
    resumeDetails: {
      skills: {},
    },
  };

  componentDidMount() {
    this.getresumeDetails();
  }

  getresumeDetails = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/resume/edit`;
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    let resume = await response.json();
    const fetchedData = resume.resume;
    const updatedData = {
      user_id: fetchedData.user_id,
      firstName: fetchedData.firstName,
      lastName: fetchedData.lastName,
      currentCity: fetchedData.currentCity,
      postalCode: fetchedData.postalCode,
      email: fetchedData.email,
      phone: fetchedData.phone,
      degree: fetchedData.degree,
      fieldOfStudy: fetchedData.fieldOfStudy,
      college: fetchedData.college,
      year: fetchedData.year,
      jobTitle: fetchedData.jobTitle,
      company: fetchedData.company,
      jobCity: fetchedData.jobCity,
      jobYear: fetchedData.jobYear,
      jobDesc: fetchedData.jobDesc,
      skills: fetchedData.skills,
      id: fetchedData._id,
    };
    this.setState({ resumeDetails: updatedData });
  };

  renderResume = () => {
    const { resumeDetails } = this.state;
    return (
      <>
        <Resume resumeDetails={resumeDetails} />
      </>
    );
  };

  render() {
    return this.renderResume();
  }
}

export default EditResume;
