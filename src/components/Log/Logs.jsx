import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLogs, logSelectors, deleteLog } from "../../features/logSlice.jsx";

import Layout from "../../Layout/layout.jsx";
import DeleteModal from "../DeleteModal";

const Logs = () => {
  //const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();

  const logs = useSelector(logSelectors.selectAll);

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteLog = async (id) => {
    await dispatch(deleteLog(id));
    setShowDelete(false);
  };

  // useEffect(() => {
  //   getLogs();
  // }, []);

  // const getLogs = async () => {
  //   const response = await axios.get("http://localhost:8080/logs");
  //   setLogs(response.data);
  // };

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => handleDeleteLog(deleteId)}
        />
      )}
      <Layout>
        <h1 className="title has-text-centered mt-3 mb-0">Log Data</h1>
        <div className="columns mb-0">
          <div className="column">
            <input
              className="input is-normal column is-4 is-offset-8"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>

        <p className="help mt-0">Total: {logs.length}</p>
        <table className="table is-stripped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Book Name</th>
              <th>Member Name</th>
              <th>Loan Date</th>
              <th>Return date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs
              .filter((log) => {
                return query.toLowerCase() === ""
                  ? log
                  : log.book.toLowerCase().includes(query) ||
                      log.member.toLowerCase().includes(query);
              })
              .map((log, index) => (
                <tr key={log._id}>
                  <td>{index + 1}</td>
                  <td>{log.book}</td>
                  <td>{log.member}</td>
                  <td>{log.loanDate}</td>
                  <td>{log.returnDate}</td>
                  <td>
                    <button
                      onClick={() => handleClickDelete(log._id)}
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

export default Logs;
