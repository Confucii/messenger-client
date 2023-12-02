import { useQuery } from "react-query";
import { getChats } from "../../requests/chatRequests";
import SidebarChat from "./SidebarChat";
import { ChatInterface, UserInterface } from "../../interfaces";
import { useState } from "react";
import Header from "./Header";
import { getUsers } from "../../requests/userRequests";
import FoundUsers from "./FoundUsers";

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

  const chats = chatData?.filter((chat: ChatInterface) =>
    chat.interlocutor.toLowerCase().includes(filter.toLowerCase())
  );

  const chatIds = chats?.map(
    (chat: ChatInterface) => chat.messages[0].sender.id
  );

  const users = userData?.filter(
    (user: UserInterface) => !chatIds?.includes(user.id)
  );

  console.log(users);

  return (
    <div className="border-r-2 border-gray-400 py-2">
      <Header setFilter={setFilter} />
      <ul className="py-2">
        {chats?.length > 0 ? (
          chats.map((chat: ChatInterface) => (
            <SidebarChat key={chat.id} chat={chat} />
          ))
        ) : filter ? (
          !(users?.length > 0) && (
            <span className="flex justify-center">No search results</span>
          )
        ) : (
          <span className="flex justify-center">There are no chats yet</span>
        )}
      </ul>
      {users?.length > 0 && <FoundUsers users={users} />}
    </div>
  );
}

export default Sidebar;
