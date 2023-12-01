import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getChat } from "../../requests/chatRequests";
import TextInput from "./TextInput";
import Message from "./Message";
import { MessageInterface } from "../../interfaces";

function Chat() {
  const { postId } = useParams();
  const chat = useQuery({
    queryKey: ["chats", postId],
    queryFn: async () => {
      if (postId) {
        const data = await getChat(postId);
        return data;
      }
    },
    enabled: !!postId,
    refetchOnWindowFocus: false,
  }).data;

  return (
    <div>
      {chat &&
        chat.messages.map((message: MessageInterface) => (
          <Message key={message.id} message={message} />
        ))}
      <TextInput chatId={chat?.id} />
    </div>
  );
}

export default Chat;
