import { Link } from "react-router-dom";
import Search from "./Search";

function Header({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <Link to={"/profile"} /> <Search filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default Header;
