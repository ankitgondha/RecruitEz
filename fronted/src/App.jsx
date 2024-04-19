import { Dashboard } from "./pages/dashboard";
import { JobDashboard } from "./pages/jobDashboard";
import { Navigate } from "react-router-dom";
import { CandidatesList } from "./pages/candidatesList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/RegisterInfo/Login";
import { SignUp } from "./pages/RegisterInfo/Signup";
import ForgotPassword from "./pages/RegisterInfo/ForgotPassword";
import RecruiterProfile from "./pages/Create-Profile/RecruiterProfile";
import CandidateProfile from "./pages/Create-Profile/CandidateProfile";
import { InterviewList } from "./pages/InterviewList";
import { CandidateDashboard } from "./pages/Candidate/CandidateDashboard";
import SearchJobs from "./pages/Candidate/SearchJobs";
import JobDescription from "./pages/Candidate/JobDescription";
import AppliedJobs from "./pages/JobInfo/AppliedJobs";
import ScheduledInterview from "./pages/JobInfo/ScheduledInterview";
import Offers from "./pages/JobInfo/Offers";
import Temppage from "./pages/Candidate/Temppage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobDashboard" element={<JobDashboard />} />
        <Route path="/candidateslist" element={<CandidatesList />} />
        <Route path="/interviewlist" element={<InterviewList />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/search-jobs" element={<SearchJobs />} />
        <Route path="/job-description" element={<JobDescription />} />
        <Route path="/jobs-applied" element={<AppliedJobs />} />
        <Route path="/scheduled-interviews" element={<ScheduledInterview />} />
        <Route path="/offered-jobs" element={<Offers />} />
        <Route path="/temppage" element={<Temppage />} />

      </Routes>
    </>
  );
}

export default App;
