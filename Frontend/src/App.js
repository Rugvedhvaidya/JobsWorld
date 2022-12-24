import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AllJobsSection from "./components/AllJobsSection";
import JobItemDetails from "./components/JobItemDetails";
import PostJobForm from "./components/PostJobForm";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Resume from "./components/Resume";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import AppliedApplicants from "./components/AppliedApplicants";
import ResumeDetails from "./components/ResumeDetails";
import EditJobForm from "./components/EditJobForm";
import EditResume from "./components/EditResume";
import AdminPage from "./components/AdminPage";
import ApplicantResume from "./components/ApplicantResume";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const App = () => {
  const history = useHistory();
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/postjobs"
          component={() => <PostJobForm history={history} />}
        />
        <ProtectedRoute
          exact
          path="/profile"
          component={() => <Profile history={history} />}
        />
        <ProtectedRoute
          exact
          path="/uploadresume"
          component={() => <Resume />}
        />
        <Route
          exact
          path="/jobs"
          component={({ match }) => <AllJobsSection match={match} />}
        />
        <Route
          exact
          path="/jobs/:id"
          component={({ match }) => <JobItemDetails match={match} />}
        />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/jobs/:id/applicants"
          component={AppliedApplicants}
        />
        <Route path="/user-resumes/:id" component={ResumeDetails} />
        <Route path="/applicant-resumes/:id" component={ApplicantResume} />
        <Route path="/edit-job/:id" component={EditJobForm} />
        <Route exact path="/edit-resume/:id" component={() => <EditResume />} />
        <Route exact path="/admin" component={AdminPage} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
