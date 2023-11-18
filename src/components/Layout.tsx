import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar/Sidebar";

function Layout() {
  const auth = useAuth();

  return auth ? (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default Layout;
