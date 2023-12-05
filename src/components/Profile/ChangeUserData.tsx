import backImg from "../../assets/Back.svg";

function ChangeUserData({
  setChangeUserData,
}: {
  setChangeUserData: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-full h-full">
      <button
        onClick={() => setChangeUserData(false)}
        className="absolute top-2 left-2"
      >
        <img src={backImg} alt="back" width={40} height={40} />
      </button>
    </div>
  );
}

export default ChangeUserData;
