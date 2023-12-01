import { useState } from "react";
import { postMessage } from "../../requests/messageRequest";

function TextInput({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState("");

  async function handleMessageSubmit() {
    if (message.length > 0) {
      await postMessage(message, chatId);
      setMessage("");
    }
  }

  return (
    <div>
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
