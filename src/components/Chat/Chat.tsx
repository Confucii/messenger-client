import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getChat } from "../../requests/chatRequests";

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

  console.log(chat?.data);

  return <div></div>;
}

export default Chat;
