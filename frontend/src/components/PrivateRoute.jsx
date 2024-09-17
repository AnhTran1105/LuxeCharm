import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate href="/account/login" />;
}

export default PrivateRoute;
