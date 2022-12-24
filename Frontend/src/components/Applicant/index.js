//This Component is used to render each applicant details from the resume of the applicant
import "./index.css";

// Importing required Components
import { Component } from "react";
import { Link } from "react-router-dom";

class Applicant extends Component {
  state = { name: "", email: "" };

  componentDidMount() {
    this.getResume();
  }

  //This function is used to get the resume of the applicant
  getResume = async () => {
    const { userId } = this.props;
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/resume/${userId}`;
    const response = await fetch(apiUrl);
    const fetchedData = await response.json();
    const { resume } = fetchedData;
    const name = resume.firstName + " " + resume.lastName;
    const email = resume.email;
    this.setState({ name: name, email: email });
  };

  //Rendering the details of the applicant
  render() {
    const { name, email } = this.state;
    const { userId } = this.props;
    return (
      <>
        <div className="applicant-card">
          <p className="applicant-card-name">{name}</p>
          <p className="applicant-card-email">{email}</p>
          <Link to={`/applicant-resumes/${userId}`}>
            <button className="applicant-card-btn">View Resume</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Applicant;
