import { useQuery } from "react-query";
import { getChats } from "../../requests/chatRequests";
import SidebarChat from "./SidebarChat";
import { Chat } from "../../interfaces";
import NoChats from "./NoChats";
import { useState } from "react";
import Header from "./Header";
import { getUsers } from "../../requests/userRequests";

function Sidebar() {
  const chatData = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    refetchOnWindowFocus: false,
  }).data;
  const [filter, setFilter] = useState("");
  const userData = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => {
      const data = await getUsers(filter);
      return data;
    },
    enabled: !!filter,
    refetchOnWindowFocus: false,
  }).data;

  console.log(userData);

  const chats = chatData?.data.filter((chat: Chat) =>
    chat.interlocutor.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Header setFilter={setFilter} />
      <ul>
        {chats?.length > 0 ? (
          chats.map((chat: Chat) => <SidebarChat key={chat.id} chat={chat} />)
        ) : (
          <NoChats />
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
