import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Layout from "../../Layout/layout.jsx";
import DeleteModal from "../DeleteModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user?page=${page}&search=${keyword}`
      );
      setUsers(response.data.users);
      setPage(response.data.page);
      setRows(response.data.totalRows);
      setPages(response.data.totalPages);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    setShowDelete(false);
    getUsers();
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteUser = async (id) => {
    deleteUser(id);
    setShowDelete(false);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 10) {
      setMessage(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMessage("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMessage("");
    setKeyword(query);
  };

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

        <div className="column">
          <Link to={"/add-user"} className="button is-primary">
            Add New
          </Link>
        </div>

        <div className="columns mb-0">
          <div className="column is-centered">
            <form onSubmit={searchData}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    type="text"
                    className="input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find something here..."
                  />
                </div>
                <div className="control">
                  <button type="submit" className="button is-info">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <p className="help mt-0">Total: {rows}</p>
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
            {users.map((user, index) => (
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
            ))}
          </tbody>
        </table>
        <p>
          Page:{rows ? page + 1 : page} of {pages}
        </p>
        <p className="has-text-centered has-text-danger">{message}</p>
        <nav
          className="pagination is-centered"
          key={rows}
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={Math.min(10, pages)}
            onPageChange={changePage}
            containerClassName={"pagination-list"}
            pageLinkClassName={"pagination-link"}
            previousLinkClassName={"pagination-previous"}
            nextLinkClassName={"pagination-next"}
            activeLinkClassName={"pagination-link is-current"}
            disabledLinkClassName={"pagination-link is-disabled"}
          />
        </nav>
      </Layout>
    </>
  );
};

export default UserList;
