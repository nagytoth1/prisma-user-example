import { useEffect, useState } from "react";
import axios from "axios";

function UserManagerComponent(properties) {
  const BACKEND_URL = properties.backend;
  const [users, setUsers] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const fetchUsers = async () => {
    const response = await axios.get(`${BACKEND_URL}/users/filter`);
    console.debug(response.data);
    setUsers(response.data);
  };

  const deleteUser = async (userID) => {
    const response = await axios.delete(
      `${BACKEND_URL}/users/${userID}`
    );
    console.debug(response.data);
    fetchUsers();
  };

  const createUser = async () => {
    const response = await axios.post(`${BACKEND_URL}/users`, {
      name: usernameInput,
      email: emailInput,
    });
    fetchUsers();
  };

  const updateUser = async (userID) => {
    const response = await axios.put(`${BACKEND_URL}/users/${userID}`, {
      name: usernameInput,
      email: emailInput,
    });
    alert(response);
    fetchUsers();
  };

  // athis fetch will run only once, when the component is render
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      updateUser(user.id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        id="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button
        onClick={() => {
          createUser();
        }}
      >
        Create
      </button>
    </>
  );
}

export default UserManagerComponent;
