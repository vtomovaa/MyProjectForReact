import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../services/authService";
import usePersistedState from "../hooks/usePersistedState";
import Path from "../paths";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState("auth", {});
  const [serverErrors, setServerErrs] = useState({});
  let errors = {};

  const loginSubmitHandler = async (values) => {
    try {
      const result = await authService.login(values.email, values.password);

      setAuth(result);

      localStorage.setItem("accessToken", result.accessToken);

      navigate(Path.Home);
    } catch (error) {
      errors.login = error;
      setServerErrs(errors);
    }
  };

  const registerSubmitHandler = async (values) => {
    try {
      const result = await authService.register(values.email, values.password);

      setAuth({ ...result, avatar: values.avatar, username: values.username });

      localStorage.setItem("accessToken", result.accessToken);

      navigate(Path.Home);
    } catch (error) {
      errors.register = error;
      setServerErrs(errors);
    }
  };

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem("accessToken");
  };
  
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username,
    email: auth.email,
    userId: auth._id,
    isAuthenticated: !!auth.accessToken,
    avatar: auth.avatar,
    serverErrors,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
