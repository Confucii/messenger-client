import { UserInterface } from "../../interfaces";
import FoundUser from "./FoundUser";

function FoundUsers({ users }: { users: UserInterface[] }) {
  return (
    <div>
      <div className="flex justify-center bg-gray-300">User search results</div>
      <ul className="flex flex-col gap-1 py-2">
        {users.map((user: UserInterface) => (
          <FoundUser user={user} />
        ))}
      </ul>
    </div>
  );
}

export default FoundUsers;
