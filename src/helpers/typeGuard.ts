import { LoginError } from "../interfaces";

export function isLoginError(error: unknown): error is LoginError {
  const verdict =
    typeof error === "object" &&
    error &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response &&
    "status" in error.response;
  return verdict === true;
}
