import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "../../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;