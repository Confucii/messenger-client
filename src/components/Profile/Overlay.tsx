function Overlay({
  setProfileModal,
}: {
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => {
        setProfileModal(false);
      }}
      className="w-screen h-screen bg-neutral-500 opacity-60"
    />
  );
}

export default Overlay;
