import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/userStore";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  // If still loading user session, you can show a spinner or null
  if (loading) return <p>Loading...</p>;

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user exists, render the children (protected component)
  return children;
};

export default ProtectedRoute;
