import { ResponseError } from "../interfaces";

export function isResponseError(error: unknown): error is ResponseError {
  const verdict =
    typeof error === "object" &&
    error &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response &&
    "status" in error.response;
  return verdict === true;
}
