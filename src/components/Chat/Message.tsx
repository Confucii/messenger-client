import { useContext } from "react";
import { MessageInterface } from "../../interfaces";
import { AuthContext } from "../../contexts/AuthContext";

function Message({ message }: { message: MessageInterface }) {
  const { user } = useContext(AuthContext);
  return (
    <div>{`${
      message.sender.id === user ? "You" : message.sender.displayName
    }: ${message.text} ${message.timestamp}`}</div>
  );
}

export default Message;
