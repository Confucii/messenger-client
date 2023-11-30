import axios from "axios";

export async function postMessage(text: string, chatId: string) {
  const chat = await axios.post(
    `${import.meta.env.VITE_CLIENT_URL}/messages/${chatId}`,
    text,
    {
      withCredentials: true,
    }
  );

  return chat;
}
