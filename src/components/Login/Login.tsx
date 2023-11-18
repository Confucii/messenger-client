import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { isLoginError } from "../../helpers/typeGuard";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
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
      const response = await axios.post(
        `${import.meta.env.VITE_CLIENT_URL}/users/login`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        context.dispatch({ type: "checkAuthStatus" });
        navigator("/", { replace: true });
      }
    } catch (error: unknown) {
      if (isLoginError(error)) {
        if (error.response.status === 400) setError(true);
      }
    }
  }

  return context.user ? (
    <Navigate to={"/"} />
  ) : (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        {error && (
          <span style={{ color: "red" }}>
            Username or password is incorrect
          </span>
        )}
        <button className="">Submit</button>
      </form>
    </div>
  );
}

export default Login;
