// This form is used by the user to login to the account.
import React, {  useState } from "react";

import "./index.css";
import Cookies from "js-cookie";

function Login() {
  const [isContainerActive, setIsContainerActive] = useState(false);
  const signUpButton = () => {
    setIsContainerActive(true);
  };
  const signInButton = () => {
    setIsContainerActive(false);
  };

  const [employeSignUp, setEmployeSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleEmployeSignUpNameChange = (event) => {
    setEmployeSignUp({ ...employeSignUp, name: event.target.value });
  };
  const handleEmployeSignUpEmailChange = (event) => {
    setEmployeSignUp({ ...employeSignUp, email: event.target.value });
  };
  const handleEmployeSignUpPasswordChange = (event) => {
    setEmployeSignUp({ ...employeSignUp, password: event.target.value });
  };

  const [employeLogin, setEmployeLogin] = useState({
    email: "",
    password: "",
  });
  const handleEmployeLoginEmailChange = (event) => {
    setEmployeLogin({ ...employeLogin, email: event.target.value });
  };
  const handleEmployeLoginPasswordChange = (event) => {
    setEmployeLogin({ ...employeLogin, password: event.target.value });
  };

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
  };

  // This function is executed when login is clicked.
  const handleSubmitLogin = (event) => {
    event.preventDefault();
  };
  // const history = useHistory();

  const loginUser = async () => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/login`;
    const userObject = {
      email: employeLogin.email,
      password: employeLogin.password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    const { jwtToken } = data;
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    window.location = "/";
  };

  const register = async () => {
   
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/signup`;
    const userObject = {
      user_name: employeSignUp.name,
      email: employeSignUp.email,
      password: employeSignUp.password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    window.location = "/login";
  };

  // Used to render login form
  return (
    <div className="loginbody">
      <div
        className={`logincontainer${
          isContainerActive ? " right-panel-active" : ""
        }`}
        id="logincontainer"
      >
        <div className="loginform-container sign-up-container">
          <form action="#" onSubmit={handleSubmitSignUp} className="loginform">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="/" className="social logina">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social logina">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="/" className="social logina">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="loginSpan">
              or use your email for registration
            </span>
            <input
              required
              type="text"
              className="logininput"
              name="name"
              id="name"
              placeholder="Name"
              onChange={handleEmployeSignUpNameChange}
            />
            <input
              required
              type="email"
              className="logininput"
              name="email"
              id="email-signup"
              placeholder="Email"
              onChange={handleEmployeSignUpEmailChange}
            />
            <input
              required
              type="password"
              className="logininput"
              name="password"
              id="password-signup"
              placeholder="Password"
              onChange={handleEmployeSignUpPasswordChange}
            />
            <button className="loginbutton" onClick={register}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="loginform-container sign-in-container">
          <form action="#" onSubmit={handleSubmitLogin} className="loginform">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/" className="social logina">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social logina">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="/" className="social logina">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="loginSpan">or use your account</span>
            <input
              required
              type="email"
              className="logininput"
              name="email"
              id="email-login"
              placeholder="Email"
              onChange={handleEmployeLoginEmailChange}
            />
            <input
              required
              type="password"
              className="logininput"
              name="password"
              id="password-login"
              placeholder="Password"
              onChange={handleEmployeLoginPasswordChange}
            />
            <a href="/reset" className="logina">
              Forgot your password?
            </a>
            <button className="loginbutton" onClick={loginUser}>
              Sign In
            </button>
          </form>
        </div>
        <div className="loginoverlay-container">
          <div className="loginoverlay">
            <div className="loginoverlay-panel loginoverlay-left">
              <h1>Welcome Back!</h1>
              <p className="loginPara">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost loginbutton"
                id="signIn"
                onClick={signInButton}
              >
                Sign In
              </button>
            </div>
            <div className="loginoverlay-panel loginoverlay-right">
              <h1>Hello, Friend!</h1>
              <p className="loginPara">
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost loginbutton"
                id="signUp"
                onClick={signUpButton}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
