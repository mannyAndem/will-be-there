import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import FAQ from "./pages/Faq/Faq";
import Tracker from "./pages/Tracker/Tracker";
import Events from "./pages/Events/Events";
import ProtectedRoute from "./shared-components/ProtectedRoute/ProtectedRoute";
import Rsvp from "./pages/RSVP/Rsvp";

function App() {
  return (
    <div className="routes app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tracker/*" element={<Tracker />} />
        <Route path="/tracker/:id" element={<Tracker />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rsvp"
          element={
            <ProtectedRoute>
              <Rsvp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
