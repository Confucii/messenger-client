import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar/Sidebar";
import { useContext, useEffect } from "react";
import { socket } from "../socket";
import { useQueryClient } from "react-query";
import { ChatInterface } from "../interfaces";
import { AuthContext } from "../contexts/AuthContext";

function Layout() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  const context = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      context.dispatch({ type: "checkAuthStatus" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("authorize", auth);
    socket.on("newMessage", (msg) => {
      queryClient.setQueryData(
        ["chats"],
        (chats: ChatInterface[] | undefined) => {
          const newChats = chats?.map((chat: ChatInterface) => {
            if (chat.id === msg.chat) {
              return { ...chat, messages: [msg] };
            } else {
              return chat;
            }
          });
          return newChats || [];
        }
      );

      queryClient.setQueryData<ChatInterface | undefined>(
        ["chats", msg.chat],
        (chat: ChatInterface | undefined) => {
          if (chat) {
            return { ...chat, messages: chat.messages.concat(msg) };
          }
        }
      );
    });

    socket.on("newChat", (chat) => {
      queryClient.setQueryData(
        ["chats"],
        (chats: ChatInterface[] | undefined) => {
          const newChats = chats?.concat(chat);
          return newChats || [];
        }
      );
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [auth, queryClient]);

  return auth ? (
    <div className="grid grid-cols-[300px_1fr] bg-slate-100 min-h-screen">
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default Layout;
