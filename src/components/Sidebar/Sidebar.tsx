import { useQuery } from "react-query";
import { getChats } from "../../requests/chatRequests";
import SidebarChat from "./SidebarChat";
import { Chat } from "../../interfaces";
import NoChats from "./NoChats";

function Sidebar() {
  const { data } = useQuery({ queryKey: ["chats"], queryFn: getChats });

  const chats = data?.data;

  return (
    <div>
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
