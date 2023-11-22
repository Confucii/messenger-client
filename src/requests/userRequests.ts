import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { AuthContextInterface } from "../interfaces";

export async function login(
  form: { username: string; password: string },
  navigator: NavigateFunction,
  context: AuthContextInterface
) {
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
}
