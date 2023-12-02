import { UserInterface } from "../../interfaces";

function FoundUser({ user }: { user: UserInterface }) {
  return (
    <li className="p-2 cursor-pointer hover:shadow-xl">
      <div className="truncate">{user.displayName}</div>
      <div className="truncate">{user.status || "Im a new user"}</div>
    </li>
  );
}

export default FoundUser;
