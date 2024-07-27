import { useEffect, useState } from "react";
import axios from "axios";

function AdminPage(properties) {
  const { backend } = properties;
  const [users, setUsers] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const fetchUsers = async () => {
    await axios
      .get(`${backend}/users/filter`)
      .then((res) => {
        setUsers(res.data); // Assuming setUsers is defined in your component state
      })
      .catch((err) => {
        if (err.response) {
          console.debug("Error Response Data:", err.response.data.message);
        } else if (err.request) {
          // The request was made but no response was received
          console.debug("Error Request:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.debug("Error Message:", err.message);
        }
      });
  };

  const deleteUser = async (userID) => {
    await axios
      .delete(`${backend}/users/${userID}`)
      .then((res) => {
        console.debug(res.data);
      })
      .catch((err) => {
        if (err.response) {
          alert(`Error while creating user: ${err.response.data.message}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.debug("Error Request:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.debug("Error Message:", err.message);
        }
      });
    fetchUsers();
  };

  const createUser = async () => {
    await axios
      .post(`${backend}/users`, {
        name: usernameInput,
        email: emailInput,
      })
      .then((res) => {
        console.debug(res.data);
      })
      .catch((err) => {
        if (err.response) {
          alert(`Error while creating user: ${err.response.data.message}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.debug("Error Request:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.debug("Error Message:", err.message);
        }
      });
    fetchUsers();
  };

  const updateUser = async (userID) => {
    await axios
      .put(`${backend}/users/${userID}`, {
        name: usernameInput,
        email: emailInput,
      })
      .then((res) => {
        console.debug(res.data);
      })
      .catch((err) => {
        if (err.response) {
          alert(`Error while creating user: ${err.response.data.message}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.debug("Error Request:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.debug("Error Message:", err.message);
        }
      });
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

export default AdminPage;
