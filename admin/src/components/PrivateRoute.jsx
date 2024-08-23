import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const access_token = localStorage.getItem("access_token");
  return access_token ? <Outlet /> : <Navigate to="/account/login" />;
}

export default PrivateRoute;
