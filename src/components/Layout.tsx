/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { socket } from "../socket";

function Layout() {
  const auth = useAuth();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (auth && !socketConnected) {
      socket.connect();
      setSocketConnected(true);
      socket.emit("authorize", auth);
      socket.on("sendConfirmation", () => {
        console.log("Confirmed");
      });
    }
    return () => {
      if (socketConnected) {
        socket.disconnect();
        setSocketConnected(false);
      }
    };
  }, []);

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
