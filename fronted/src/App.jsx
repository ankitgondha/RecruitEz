import { Login } from './pages/login'
import { Dashboard } from "./pages/dashboard"
import { JobDashboard } from './pages/jobDashboard'
import { Navigate, Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobDashboard" element={<JobDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
