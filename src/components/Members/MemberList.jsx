import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getMembers,
  memberSelectors,
  deleteMember,
} from "../../features/memberSlice.jsx";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import DeleteModal from "../DeleteModal";

const MemberList = () => {
  //const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();

  const members = useSelector(memberSelectors.selectAll);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteMember = async (id) => {
    await dispatch(deleteMember(id));
    setShowDelete(false);
  };

  // const getMembers = async () => {
  //   const response = await axios.get("http://localhost:8080/members");
  //   setMembers(response.data);
  // };

  // const deleteMember = async (memberID) => {
  //   await axios.delete(`http://localhost:8080/delete-member/${memberID}`);
  //   setShowDelete(false);
  //   getMembers();
  // };

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => handleDeleteMember(deleteId)}
        />
      )}
      <Navbar />
      <div className="columns mt-6 mb-0" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column has-background-light">
          <div className="container is-fluid">
            <main>
              <h1 className="title has-text-centered  mt-3 mb-0">
                List of Members
              </h1>
              <div className="columns mb-0">
                <div className="column">
                  <Link to={"/add-member"} className="button is-primary">
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
              <p className="help mt-0">Total : {members.length}</p>
              <table className="table is-stripped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members
                    .filter((member) => {
                      return query.toLowerCase() === ""
                        ? member
                        : member.name.toLowerCase().includes(query) ||
                            member.gender.toLowerCase().includes(query) ||
                            member.address.toLowerCase().includes(query) ||
                            member.email.toLowerCase().includes(query);
                    })
                    .map((member, index) => (
                      <tr key={member._id}>
                        <td>{index + 1}</td>
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
                    ))
                    .splice(0, 8)}
                </tbody>
              </table>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MemberList;
