import { useContext } from "react";
import { Chat } from "../../interfaces";
import { AuthContext } from "../../contexts/AuthContext";

function SidebarChat({ chat }: { chat: Chat }) {
  const { user } = useContext(AuthContext);
  const message = chat.messages[0];

  return (
    <li>
      <div>{chat.interlocutor}</div>
      <div>
        <span>
          {`${
            message.sender.id === user ? "You" : message.sender.displayName
          }: ${message.text}`}
        </span>
        <span>{message.timestamp}</span>
      </div>
    </li>
  );
}

export default SidebarChat;
