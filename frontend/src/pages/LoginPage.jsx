import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticator = useAuth();
  const handleLogin = (e) => {
    // prevent the default behaviour of a component
    // Prevent a submit button from submitting a form
    // We normally prevent submit behaviour to check some validation before submitting the form
    // or we need to change values of our input fields
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please provide your username and password!");
    }
    authenticator.loginAction({ username, password });
  };

  // set the username from the input text field
  const handleUsernameInput = (e) => {
    const usernameInput = e.target.value;
    setUsername(usernameInput);
  };

  // set the password from the input text field
  const handlePasswordInput = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username-input">Username:</label>
        <input
          type="text"
          id="username-input"
          name="username"
          required={true}
          autoComplete="true"
          placeholder="abc123"
          aria-describedby="username"
          aria-invalid="false"
          onChange={handleUsernameInput}
        />
        <div id="username-input-description">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div>
        <label htmlFor="password-input">Password:</label>
        <input
          type="password"
          id="password-input"
          name="password"
          required={true}
          autoComplete="true"
          aria-describedby="password"
          aria-invalid="false"
          onChange={handlePasswordInput}
        />
        <div id="password-input-description">
          your password should be more than 6 character
        </div>
      </div>
      <input type="submit" className="login-button">Login</input>
    </form>
  );
};

export default LoginPage;
