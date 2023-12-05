import Modal from "./Modal";
import Overlay from "./Overlay";

function Profile({
  setProfileModal,
}: {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute top-0 left-0">
      <Overlay setProfileModal={setProfileModal} />
      <Modal setProfileModal={setProfileModal} />
    </div>
  );
}

export default Profile;
