import { useContext } from "react";
import { ChatInterface } from "../../interfaces";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SidebarChat({
  chat,
  setFilter,
}: {
  chat: ChatInterface;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { user } = useContext(AuthContext);
  const message = chat.messages[0];
  const navigator = useNavigate();

  function handleClick() {
    navigator(`/chat/${chat.id}`);
    setFilter("");
  }

  return (
    message && (
      <li
        className="transition transform duration-300 hover:bg-slate-300 p-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between">
          <span className="truncate mr-2">{chat.interlocutor.name}</span>
          <span className="shrink-0">{message.timestamp}</span>
        </div>
        <div className="flex">
          <span className="text-blue-400 truncate">
            {`${
              message.sender.id === user ? "You" : message.sender.displayName
            }`}
          </span>
          <span className="text-blue-400">:</span>
          <span className="ml-2 basis-1/2 shrink-0 truncate">
            {message.text}
          </span>
        </div>
      </li>
    )
  );
}

export default SidebarChat;
