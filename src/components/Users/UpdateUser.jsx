import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        if (error) console.log(error);
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/user/${id}`, {
        username,
        email,
        password,
        confirmPassword,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  // console.log(password);
  // console.log(confirmPassword);
  // console.log(password !== confirmPassword);

  return (
    <div className="container is-fluid">
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*****"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="*****"
                  />
                </div>
                <p className="help has-text-danger">{message}</p>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                  <Link to={"/users"} className="button is-info ml-3">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
