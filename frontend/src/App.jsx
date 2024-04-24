import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import FAQ from "./pages/Faq/Faq";
import Tracker from "./pages/Tracker/Tracker";
import { useGetCurrentUser } from "./hooks/auth";
import Events from "./pages/Events/Events";
import ProtectedRoute from "./shared-components/ProtectedRoute/ProtectedRoute";

function App() {
  const { isPending } = useGetCurrentUser();

  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
