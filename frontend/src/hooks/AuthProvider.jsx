import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthenticationContext = createContext();

/**
 * The code set up above is used for creating the authentication context in React using the Context API. It creates an AuthContext using createContext() to manage the authentication state.
 * The AuthProvider component is designed to wrap the application and provide the authentication context to its child components using the AuthContext.Provider.
 * @param {*} children
 * @returns
 */
const AuthProvider = (properties) => {
  const { children } = properties;
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookies] = useCookies(["auth_token"]);
  const navigate = useNavigate();

  //The login function handles user login by sending a POST request
  // to an authentication endpoint,
  // updating the user and token state upon a successful response,
  // and storing the token in local storage.
  const loginAction = async (data) => {
    try {
      // we need /auth/login endpoint
      const res = await axios.post("/auth/login", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      navigate(ROUTES.ADMIN);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    removeCookies("auth_token", { path: "/", domain: "localhost" });
    console.debug("logout successfully");
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthenticationContext.Provider
      value={{ token: cookies.auth_token, user: user, loginAction, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthenticationContext);
};

export { AuthProvider, useAuth };
