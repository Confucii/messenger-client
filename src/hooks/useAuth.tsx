/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.dispatch({ type: "checkAuthStatus" });
  }, []);

  return context.user;
}

export default useAuth;
