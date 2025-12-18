import { Navigate } from "react-router-dom";
import { AuthUser } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { token, user } = AuthUser();

  const isAdmin = user?.roles.find((item) => item == "ROLE_ADMIN");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
