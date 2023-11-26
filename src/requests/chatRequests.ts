import axios from "axios";

export async function getChats() {
  const chats = await axios.get(`${import.meta.env.VITE_CLIENT_URL}/chats`, {
    withCredentials: true,
  });

  return chats;
}

export async function getChat(chatId: string) {
  const chat = await axios.get(
    `${import.meta.env.VITE_CLIENT_URL}/chats/${chatId}`,
    {
      withCredentials: true,
    }
  );

  return chat;
}
