import { Link } from "react-router-dom";
import Search from "./Search";

function Header({
  setFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <Link to={"/profile"} /> <Search setFilter={setFilter} />
    </div>
  );
}

export default Header;
