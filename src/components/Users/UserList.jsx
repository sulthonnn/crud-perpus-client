import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteUser,
  getUsers,
  userSelectors,
} from "../../features/userSlice.jsx";

import Layout from "../../Layout/layout.jsx";
import DeleteModal from "../DeleteModal";

const UserList = () => {
  //const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();

  const users = useSelector(userSelectors.selectAll);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteUser = async (id) => {
    await dispatch(deleteUser(id));
    setShowDelete(false);
  };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const handleClickDelete = (id) => {
  //   setDeleteId(id);
  //   setShowDelete(true);
  // };

  // const getUsers = async () => {
  //   const response = await axios.get("http://localhost:8080/users");
  //   setUsers(response.data);
  // };

  // const deleteUser = async (bookID) => {
  //   await axios.delete(`http://localhost:8080/delete-user/${bookID}`);
  //   setShowDelete(false);
  //   getUsers();
  // };

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => handleDeleteUser(deleteId)}
        />
      )}
      <Layout>
        <h1 className="title has-text-centered mt-3 mb-0">List of Users</h1>
        <div className="columns mb-0">
          <div className="column">
            <Link to={"/add-user"} className="button is-primary">
              Add New
            </Link>
          </div>
          <div className="column">
            <input
              className="input is-normal column is-6 is-offset-6"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>
        <p className="help mt-0">Total: {users.length}</p>
        <table className="table is-stripped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                return query.toLowerCase() === ""
                  ? user
                  : user.username.toLowerCase().includes(query) ||
                      user.email.toLowerCase().includes(query);
              })
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/user/${user._id}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleClickDelete(user._id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              .splice(0, 10)}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default UserList;
