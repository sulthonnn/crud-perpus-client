import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCirculations,
  deleteCirculation,
  circulationSelectors,
} from "../../features/circulationSlice.jsx";
import { saveLog } from "../../features/logSlice.jsx";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import DeleteModal from "../DeleteModal";

const Circulations = () => {
  //const [circulation, setCirculations] = useState([]);
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [addToLog, setAddToLog] = useState("");
  const dispatch = useDispatch();

  const circulations = useSelector(circulationSelectors.selectAll);

  useEffect(() => {
    dispatch(getCirculations());
  }, [dispatch]);

  const createLog = async (data) => {
    await dispatch(saveLog(data));
  };

  const handleAddLog = (book, member, loanDate, returnDate) => {
    setAddToLog({ book, member, loanDate, returnDate });
    setShowDelete(true);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteUser = async (id) => {
    await dispatch(deleteCirculation(id));
    setShowDelete(false);
  };

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // useEffect(() => {
  //   getCirculations();
  // }, []);

  // const getCirculations = async () => {
  //   const response = await axios.get("http://localhost:8080/circulations");
  //   setCirculations(response.data);
  // };

  // const addLog = async (data) => {
  //   await axios.post("http://localhost:8080/add-log", data);
  // };

  // const handleClickDelete = (id) => {
  //   setDeleteId(id);
  //   setShowDelete(true);
  // };

  // const deleteCirculation = async (id) => {
  //   await axios.delete(`http://localhost:8080/delete-circulation/${id}`);
  //   setShowDelete(false);
  //   getCirculations();
  // };

  // console.log(addToLog);
  // console.log(deleteId);

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => createLog(addToLog) && handleDeleteUser(deleteId)}
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
                Circulations
              </h1>
              <div className="columns mb-0">
                <div className="column">
                  <Link to={"/add-circulation"} className="button is-primary">
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
              <p className="help mt-0">Total : {circulations.length}</p>
              <table className="table is-stripped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Book Name</th>
                    <th>Member Name</th>
                    <th>Loan Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {circulations
                    .filter((c) => {
                      return query.toLowerCase() === ""
                        ? c
                        : c.book.toLowerCase().includes(query) ||
                            c.member.toLowerCase().includes(query) ||
                            c.loanDate.toLowerCase().includes(query);
                    })
                    .map((c, index) => (
                      <tr key={c._id}>
                        <td>{index + 1}</td>
                        <td>{c.book}</td>
                        <td>{c.member}</td>
                        <td>{c.loanDate}</td>
                        {addDays(c.loanDate, 7) < new Date() ? (
                          <td className="has-text-weight-bold has-text-danger">
                            late return
                          </td>
                        ) : (
                          <td className="has-text-weight-bold has-text-success">
                            loan period
                          </td>
                        )}

                        <td>
                          <Link
                            to={`/circulation/${c._id}`}
                            className="button is-small is-info"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              handleClickDelete(c._id) &
                              handleAddLog(
                                c.book,
                                c.member,
                                c.loanDate,
                                new Date().toLocaleString()
                              )
                            }
                            className="button is-small is-danger"
                          >
                            Return
                          </button>
                        </td>
                      </tr>
                    ))
                    .splice(0, 10)}
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

export default Circulations;
