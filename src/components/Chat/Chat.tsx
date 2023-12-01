import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getChat } from "../../requests/chatRequests";
import TextInput from "./TextInput";
import Message from "./Message";
import { MessageInterface } from "../../interfaces";
import Header from "./Header";
import useChatScroll from "../../hooks/useChatScroll";

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

  const ref = useChatScroll(chat);

  return (
    <div className="max-h-screen grid grid-rows-[50px_1fr_50px] grow">
      {chat && <Header interlocutor={chat.interlocutor} />}
      <div
        className="h-full row-span-6 overflow-auto flex flex-col gap-2 py-4 scroll"
        ref={ref}
      >
        {chat &&
          chat.messages.map((message: MessageInterface) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
      <TextInput chatId={chat?.id} />
    </div>
  );
}

export default Chat;
