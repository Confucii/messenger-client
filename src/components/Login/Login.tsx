import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { isResponseError } from "../../helpers/typeGuard";
import { login } from "../../requests/userRequests";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
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
      await login(form, navigator, context).catch();
    } catch (error: unknown) {
      if (isResponseError(error)) {
        if (error.response.status === 400)
          setErrorMessage(error.response.data.error.errors["login"].message);
      }
    }
  }

  return context.user ? (
    <Navigate to={"/"} />
  ) : (
    <div className="h-screen flex flex-col justify-center items-center gap-1">
      <h2 className="flex justify-center">Login</h2>
      <form className="w-80 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <button className="p-1 bg-blue-300 hover:bg-slate-200 rounded w-full">
          Submit
        </button>
      </form>
      <div>
        Need an account? <Link to={"/register"}>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
