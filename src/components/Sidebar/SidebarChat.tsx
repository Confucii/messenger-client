import { useContext } from "react";
import { ChatInterface } from "../../interfaces";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SidebarChat({ chat }: { chat: ChatInterface }) {
  const { user } = useContext(AuthContext);
  const message = chat.messages[0];
  const navigator = useNavigate();

  return (
    <li onClick={() => navigator(`/chat/${chat.id}`)}>
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
