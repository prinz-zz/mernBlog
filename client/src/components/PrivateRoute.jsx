import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet/> : <Navigate to='/login' replace/>;
}
