import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { isResponseError } from "../../helpers/typeGuard";
import { register } from "../../requests/userRequests";
import ErrorMessage from "./ErrorMessage";
import { Dict } from "../../interfaces";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [errorMessage, setErrorMessage] = useState<Dict>({});
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
      if (isResponseError(error)) {
        if (error.response.status === 400) {
          const newErrorMessages: Dict = {};
          Object.entries(error.response.data.error.errors).forEach(
            ([key, value]) => {
              newErrorMessages[key] = value.message;
            }
          );
          setErrorMessage(newErrorMessages);
        }
      }
    }
  }

  return context.user ? (
    <Navigate to={"/"} />
  ) : (
    <div className="h-screen flex flex-col justify-center items-center gap-1">
      <h2>Register</h2>
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
          <ErrorMessage errorMessage={errorMessage["username"]} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={form.displayName}
            onChange={handleChange}
          />
          <ErrorMessage errorMessage={errorMessage["displayName"]} />
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
          <ErrorMessage errorMessage={errorMessage["password"]} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <ErrorMessage errorMessage={errorMessage["confirmPassword"]} />
        </div>
        <button className="p-1 bg-blue-300 hover:bg-slate-200 rounded w-full">
          Submit
        </button>
      </form>
      <div>
        Have an account? <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
}

export default Register;
