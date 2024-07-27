import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const handleLogin = (e) => {
    // prevent the default behaviour of a component
    // Prevent a submit button from submitting a form
    // We normally prevent submit behaviour to check some validation before submitting the form
    // or we need to change values of our input fields
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please provide your username and password!");
    }
    auth.loginAction({ username, password });
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

  return !auth.token ? (
    <div className="container my-3">
      <h5>Please, log in to continue</h5>
      <form onSubmit={handleLogin} className="form-group">
        <div>
          <label htmlFor="username-input">Username:</label>
          <input
            className="form-control"
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
            Please enter a valid username. It must contain at least 6
            characters.
          </div>
        </div>
        <div>
          <label htmlFor="password-input">Password:</label>
          <input
            className="form-control"
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
            Your password should be more than 6 character
          </div>
        </div>
        <input type="submit" className="btn btn-primary mt-3" value="Login" />
      </form>
    </div>
  ) : null;
};

export default LoginPage;
