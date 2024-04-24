import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
