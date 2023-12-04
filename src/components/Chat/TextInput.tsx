import { useState } from "react";
import { postMessage } from "../../requests/messageRequest";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../requests/chatRequests";
import { useMutation } from "react-query";

function TextInput({ chatId, userId }: { chatId: string; userId: string }) {
  const [message, setMessage] = useState("");
  const newChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: async (newChat) => {
      await postMessage(message, newChat.id);
      navigator(`/chat/${newChat.id}`);
    },
  });
  const navigator = useNavigate();

  async function handleMessageSubmit() {
    if (message.length > 0) {
      if (chatId) {
        await postMessage(message, chatId);
        setMessage("");
      } else {
        newChatMutation.mutate(userId);
        setMessage("");
      }
    }
  }

  return (
    <div className="row-start-3">
      <input
        type="text"
        name="message-input"
        id="message-input"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        value={message}
      />
      <button onClick={handleMessageSubmit}>Send</button>
    </div>
  );
}

export default TextInput;
