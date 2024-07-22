import { Navigate, Outlet } from "react-router-dom";

export const AuthorizedPage = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
