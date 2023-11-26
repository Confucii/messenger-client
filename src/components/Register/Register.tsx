import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { isResponseError } from "../../helpers/typeGuard";
import { register } from "../../requests/userRequests";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(AuthContext);

  const navigator = useNavigate();

  const handleChange = (
    event: React.SyntheticEvent & { target: HTMLInputElement }
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      await register(form, navigator);
    } catch (error: unknown) {
      console.log(error);

      if (isResponseError(error)) {
        if (error.response.status === 400)
          setErrorMessage(error.response.data.error);
      }
    }
  }

  return context.user ? (
    <Navigate to={"/"} />
  ) : (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={form.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <button className="">Submit</button>
      </form>
      <div>
        Have an account? <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
}

export default Register;
