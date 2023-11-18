import { ReactElement, createContext, useReducer } from "react";
import { AuthContextInterface } from "../interfaces";
import getCookie from "../helpers/cookieHelper";

export const AuthContext = createContext<AuthContextInterface>({
  user: "",
  dispatch: () => {},
});

function authReducer(state: { user: string }, action: { type: string }) {
  const user = getCookie("auth");
  switch (action.type) {
    case "checkAuthStatus":
      return user ? { user } : { user: "" };
    case "logout":
      return { user: "" };
    default:
      return state;
  }
}

export function AuthContextProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: getCookie("auth"),
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
