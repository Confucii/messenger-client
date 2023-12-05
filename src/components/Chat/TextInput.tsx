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
    <div className="px-4 py-1 gap-4 flex row-start-3">
      <input
        type="text"
        name="message-input"
        id="message-input"
        className="flex-auto w-full rounded"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        value={message}
      />
      <button
        className="px-4 w-64 flex-auto bg-blue-300 hover:bg-slate-200 rounded"
        onClick={handleMessageSubmit}
      >
        Send
      </button>
    </div>
  );
}

export default TextInput;
