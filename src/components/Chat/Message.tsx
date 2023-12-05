import { useContext } from "react";
import { MessageInterface } from "../../interfaces";
import { AuthContext } from "../../contexts/AuthContext";

function Message({ message }: { message: MessageInterface }) {
  const { user } = useContext(AuthContext);

  const sender = message.sender.id === user;

  return (
    <div
      className={`ml-2 mr-2 px-4 py-4 md:max-w-sm l:max-w-lg xl:max-w-2xl rounded-lg flex flex-col gap-2  ${
        sender ? "bg-sky-500 self-end text-white" : "bg-white self-start"
      }`}
    >
      <div className="break-words">{message.text}</div>
      <div className={sender ? "text-sky-900" : "text-gray-500"}>
        {message.timestamp}
      </div>
    </div>
  );
}

export default Message;
