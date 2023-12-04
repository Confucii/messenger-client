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
    <li
      onClick={handleClick}
      className="transition transform duration-300 hover:bg-slate-300 p-2 cursor-pointer"
    >
      <div className="truncate">{user.displayName}</div>
      <div className="truncate">{user.status || "Im a new user"}</div>
    </li>
  );
}

export default FoundUser;
