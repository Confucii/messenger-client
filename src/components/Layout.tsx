import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar/Sidebar";
import { useEffect } from "react";
import { socket } from "../socket";
import { useQueryClient } from "react-query";
import { ChatInterface } from "../interfaces";

function Layout() {
  const queryClient = useQueryClient();
  const auth = useAuth();

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

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [auth, queryClient]);

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
