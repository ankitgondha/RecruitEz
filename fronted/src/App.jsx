<<<<<<< Updated upstream
import { Login } from './pages/login'
import { Dashboard } from "./pages/dashboard"
import { JobDashboard } from './pages/jobDashboard'
import { Navigate, Route, Routes } from "react-router-dom";
import { CandidatesList } from './pages/candidatesList';

=======
import { Dashboard } from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/RegisterInfo/Login";
import { SignUp } from "./pages/RegisterInfo/Signup";
import ForgotPassword from "./pages/RegisterInfo/ForgotPassword";
import RecruiterProfile from "./pages/Create-Profile/RecruiterProfile";
import CandidateProfile from "./pages/Create-Profile/CandidateProfile";
>>>>>>> Stashed changes

function App() {

  return (
    <>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobDashboard" element={<JobDashboard />} />
        <Route path="/candidateslist" element={<CandidatesList />} />
        <Route path="*" element={<Navigate to="/" />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
>>>>>>> Stashed changes
      </Routes>
    </>
  )
}

export default App
