import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../interfaces";

function FoundUser({
  setFilter,
  user,
}: {
  user: UserInterface;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigator = useNavigate();

  function handleClick() {
    setFilter("");
    navigator("/chat/new", {
      state: { interlocutor: user.displayName, id: user.id },
    });
  }

  return (
    <li onClick={handleClick} className="p-2 cursor-pointer hover:shadow-xl">
      <div className="truncate">{user.displayName}</div>
      <div className="truncate">{user.status || "Im a new user"}</div>
    </li>
  );
}

export default FoundUser;
