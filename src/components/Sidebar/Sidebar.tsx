import axios from "axios";

function Sidebar() {
  function testSubmit() {
    axios.post(
      `${import.meta.env.VITE_CLIENT_URL}/messages/6556baf8e4d2fe3dd39deabe`,
      { text: "boba" },
      { withCredentials: true }
    );
  }
  return (
    <>
      <button onClick={testSubmit}>Push me daddy</button>
    </>
  );
}

export default Sidebar;
