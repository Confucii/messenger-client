import TextInput from "./TextInput";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function NewChat() {
  const { interlocutor, id } = useLocation().state;

  return (
    <div className="max-h-screen grid grid-rows-[50px_1fr_50px] grow">
      <Header interlocutor={interlocutor} />
      <div className="flex flex-col justify-center items-center">
        Start a dialogue!
      </div>
      <TextInput chatId={""} userId={id} />
    </div>
  );
}

export default NewChat;
