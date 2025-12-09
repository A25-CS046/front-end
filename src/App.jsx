import Layout from "@/components/Layout.jsx";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "@/pages/Dashboard";
import TicketAssignment from "@/pages/TicketAssignment";
import UserManagement from "@/pages/UserManagement";
import MaintenanceSchedule from "@/pages/MaintenanceSchedule";
import AiCopilot from "@/pages/AiCopilot";
import MachineDetails from "@/pages/MachineDetails";
import SignIn from "@/pages/auth/Login";
import AiRecommendations from "@/pages/AiRecommendations";
import ProtectedRoute from "@/components/ProtectedRoute";
import ChangePassword from "@/pages/ChangePassword";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<SignIn />} />
        <Route element={<ProtectedRoute/>}>
          <Route element={<Layout/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-recommendations" element={<AiRecommendations />} />
            <Route path="/ticket-assignment" element={<TicketAssignment />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/maintenance-schedule" element={<MaintenanceSchedule />} />
            <Route path="/ai-copilot" element={<AiCopilot />} />
            <Route path="/machine-details" element={<MachineDetails />} />
            <Route path="/machine-details/:unitId" element={<MachineDetails />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
