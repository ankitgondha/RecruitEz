
import { Dashboard } from "./pages/dashboard"
import { JobDashboard } from './pages/jobDashboard'
import { Navigate } from "react-router-dom";
import { CandidatesList } from './pages/candidatesList';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/RegisterInfo/Login";
import { SignUp } from "./pages/RegisterInfo/Signup";
import ForgotPassword from "./pages/RegisterInfo/ForgotPassword";
import RecruiterProfile from "./pages/Create-Profile/RecruiterProfile";
import CandidateProfile from "./pages/Create-Profile/CandidateProfile";
import { InterviewList } from "./pages/InterviewList";

//change
function App() {

  return (
    <>
      
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobDashboard" element={<JobDashboard />} />
        <Route path="/candidateslist" element={<CandidatesList />} />
        <Route path="/interviewlist" element={<InterviewList />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
      </Routes>
    </>
  )
}

export default App
