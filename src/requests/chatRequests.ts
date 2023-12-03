import axios from "axios";

export async function getChats() {
  const chats = await axios.get(`${import.meta.env.VITE_CLIENT_URL}/chats`, {
    withCredentials: true,
  });

  const chatsData = chats.data;

  return chatsData;
}

export async function getChat(chatId: string) {
  const chat = await axios.get(
    `${import.meta.env.VITE_CLIENT_URL}/chats/${chatId}`,
    {
      withCredentials: true,
    }
  );

  const chatData = chat.data;

  return chatData;
}

export async function createChat(interlocutorId: string) {
  const chat = await axios.post(
    `${import.meta.env.VITE_CLIENT_URL}/chats`,
    { recipient: interlocutorId },
    {
      withCredentials: true,
    }
  );

  const chatData = chat.data;

  return chatData;
}
