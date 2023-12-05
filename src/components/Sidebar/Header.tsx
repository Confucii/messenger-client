import Search from "./Search";
import profileImg from "../../assets/Profile.svg";

function Header({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex px-1 gap-2">
      <button>
        <img width={50} height={50} src={profileImg} alt="profile" />
      </button>
      <Search filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default Header;
