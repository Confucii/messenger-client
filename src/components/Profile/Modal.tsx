import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../contexts/AuthContext";
import { getUsers } from "../../requests/userRequests";
import closeImg from "../../assets/Close.svg";
import ChangePassword from "./ChangePassword";
import ChangeUserData from "./ChangeUserData";

function Modal({
  setProfileModal,
}: {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useContext(AuthContext);
  const userData = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUsers(user);
      return data;
    },
    refetchOnWindowFocus: false,
  }).data;
  const [changePassword, setChangePassword] = useState(false);
  const [changeUserData, setChangeUserData] = useState(false);

  return (
    <div className="rounded absolute top-1/2 left-1/2 w-3/5 h-3/5 translate-x-[-50%] translate-y-[-50%] bg-white">
      <button
        className="absolute top-2 right-2"
        onClick={() => {
          setProfileModal(false);
        }}
      >
        <img src={closeImg} alt="close" height={40} width={40} />
      </button>
      {changePassword && (
        <ChangePassword setChangePassword={setChangePassword} />
      )}
      {changeUserData && (
        <ChangeUserData setChangeUserData={setChangeUserData} />
      )}
      {!changePassword && !changeUserData && userData && (
        <div>
          <div>{userData.displayName}</div>
          <div>{userData.status || "No status yet"}</div>
          <button onClick={() => setChangeUserData(true)}>Edit account</button>
          <button onClick={() => setChangePassword(true)}>
            Change password
          </button>
        </div>
      )}
    </div>
  );
}

export default Modal;
