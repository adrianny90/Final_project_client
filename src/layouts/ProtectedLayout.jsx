import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Spinner from "../components/Spinner.jsx";

const ProtectedLayout = () => {
  const { user,loading } = useAuth();

  if(loading) return <Spinner />;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
