import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = JSON.parse(localStorage.getItem("uid"));

  return auth ? <Outlet /> : <Navigate to="/register" />;
};

export default PrivateRoute;
