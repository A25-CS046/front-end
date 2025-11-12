import Layout from "@/components/Layout.jsx";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "@/pages/Dashboard";
import TicketAssignment from "@/pages/TicketAssignment";
import UserManagement from "@/pages/UserManagement";
import MaintenanceSchedule from "@/pages/MaintenanceSchedule";
import AiCopilot from "@/pages/AiCopilot";
import MachineDetails from "@/pages/MachineDetails";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import AiRecommendations from "@/pages/AiRecommendations";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Protected Route */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/aiRecommendations" element={<AiRecommendations />} />
        <Route path="/ticketAssignment" element={<TicketAssignment />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/maintenanceSchedule" element={<MaintenanceSchedule />} />
        <Route path="/aiCopilot" element={<AiCopilot />} />
        <Route path="/machineDetails" element={<MachineDetails />} />

        {/* Auth Route */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
