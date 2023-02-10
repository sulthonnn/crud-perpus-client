import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import {
  getPaginatedMembersFunc,
  deleteMemberFunc,
} from "../services/memberApi";

import Layout from "../../Layout/layout.jsx";
import DeleteModal from "../DeleteModal";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMembers();
  }, [page, keyword]);

  const getMembers = async () => {
    try {
      const response = await getPaginatedMembersFunc(page, keyword);
      setMembers(response.data.members);
      setPage(response.data.page);
      setRows(response.data.totalRows);
      setPages(response.data.totalPages);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteMember = async (id) => {
    try {
      await deleteMemberFunc(id);
      setShowDelete(false);
      getMembers();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 10) {
      setMessage("If not found, please use search by keyword");
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

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteMember = async (id) => {
    await deleteMember(id);
    setShowDelete(false);
  };

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => handleDeleteMember(deleteId)}
        />
      )}
      <Layout>
        <h1 className="title has-text-centered  mt-3 mb-0">List of Members</h1>

        <div className="column mb-0">
          <Link to={"/add-member"} className="button is-primary">
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

        <p className="help mt-0">Total : {rows}</p>
        <table className="table is-stripped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member._id}</td>
                <td>{member.name}</td>
                <td>{member.gender}</td>
                <td>{member.address}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <Link
                    to={`/member/${member._id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleClickDelete(member._id)}
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
          Page: {rows ? page + 1 : page} of {pages}
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

export default MemberList;
