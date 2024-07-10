import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import axios from "axios";

const AuthenticationContext = createContext();

/**
 * The code set up above is used for creating the authentication context in React using the Context API. It creates an AuthContext using createContext() to manage the authentication state.
 * The AuthProvider component is designed to wrap the application and provide the authentication context to its child components using the AuthContext.Provider.
 * @param {*} children
 * @returns
 */
const AuthProvider = (properties) => {
  const { children, BACKEND_URL } = properties;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("authorization_token") || ""
  );
  const navigate = useNavigate();

  //The login function handles user login by sending a POST request
  // to an authentication endpoint,
  // updating the user and token state upon a successful response,
  // and storing the token in local storage.
  const loginAction = async (data) => {
    try {
      // we need /auth/login endpoint
      const responseObject = await axios.post(
        `${BACKEND_URL}/auth/login`,
        data
      );
      if (responseObject.data) {
        setUser(responseObject.data.user);
        // token comes from the API
        setToken(responseObject.data.token);
        // set cookie as well for saving state between page reloads
        localStorage.setItem("site", responseObject.data.token);
        // usermanager?
        navigate(ROUTES.ADMIN);
        return;
      }
      throw new Error(responseObject.message);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthenticationContext.Provider
      value={{ token, user, loginAction, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthenticationContext);
};

export { AuthProvider, useAuth };
