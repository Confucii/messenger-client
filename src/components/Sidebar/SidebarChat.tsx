import { useContext } from "react";
import { ChatInterface } from "../../interfaces";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SidebarChat({ chat }: { chat: ChatInterface }) {
  const { user } = useContext(AuthContext);
  const message = chat.messages[0];
  const navigator = useNavigate();

  return (
    <li
      className="p-2 hover:shadow-xl cursor-pointer"
      onClick={() => navigator(`/chat/${chat.id}`)}
    >
      <div className="flex justify-between">
        <span className="truncate mr-2">{chat.interlocutor}</span>
        <span className="shrink-0">{message.timestamp}</span>
      </div>
      <div className="flex">
        <span className="text-blue-400 truncate">
          {`${message.sender.id === user ? "You" : message.sender.displayName}`}
        </span>
        <span className="text-blue-400">:</span>
        <span className="ml-2 basis-1/2 shrink-0 truncate">{message.text}</span>
      </div>
    </li>
  );
}

export default SidebarChat;
