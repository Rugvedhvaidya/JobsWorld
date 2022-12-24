// This component is used to check if user is ligged in or not.
import { Route, Redirect } from "react-router-dom";

import Cookies from "js-cookie";
const jwtToken = Cookies.get("jwt_token");

const ProtectedRoute = (props) => {
  if (!jwtToken) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
