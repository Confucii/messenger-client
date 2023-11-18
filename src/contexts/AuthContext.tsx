import { ReactElement, createContext, useReducer } from "react";
import { AuthContextInterface } from "../interfaces";
import getCookie from "../helpers/cookieHelper";

export const AuthContext = createContext<AuthContextInterface>({
  user: false,
  dispatch: () => {},
});

function authReducer(state: { user: boolean }, action: { type: string }) {
  switch (action.type) {
    case "checkAuthStatus":
      return getCookie("auth") ? { user: true } : { user: false };
    case "logout":
      return { user: false };
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
