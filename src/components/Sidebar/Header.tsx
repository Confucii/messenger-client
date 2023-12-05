import Search from "./Search";
import profileImg from "../../assets/Profile.svg";

function Header({
  filter,
  setFilter,
  setProfileModal,
}: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex px-1 gap-2">
      <button
        onClick={() => {
          setProfileModal(true);
        }}
      >
        <img width={50} height={50} src={profileImg} alt="profile" />
      </button>
      <Search filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default Header;
