import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/AuthProvider";

function AdminPage(properties) {
  const { backend } = properties;
  const [users, setUsers] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const auth = useAuth();
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

  return !auth.token ? null : (
    <div className="container">
      <table className="my-3 table table-light">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      updateUser(user.id);
                    }}
                    className="mx-3 btn btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="form-inline my-4">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="form-control mx-2"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="form-control mx-2"
          />
          <button className="btn btn-success" onClick={createUser}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
