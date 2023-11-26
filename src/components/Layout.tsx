import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import { socket } from "../socket";

function Layout() {
  const auth = useAuth();
  const [socketConnected, setSocketConnected] = useState(false);

  /*const chat = useQuery({
    queryKey: ["chats", "6556baf8e4d2fe3dd39deabe"],
    queryFn: async () => {
      const data = await getChat("6556baf8e4d2fe3dd39deabe");
      return data;
    },
  });*/

  if (auth && !socketConnected) {
    socket.connect();
    setSocketConnected(true);
    socket.emit("authorize", auth);
    socket.on("newMessage", (msg) => {
      console.log(msg);
    });
    socket.on("disconnect", () => {
      setSocketConnected(false);
    });
  }

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
