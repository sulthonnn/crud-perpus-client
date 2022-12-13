import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs, logSelectors } from "../../features/logSlice.jsx";

const Logs = () => {
  //const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const logs = useSelector(logSelectors.selectAll);

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  // useEffect(() => {
  //   getLogs();
  // }, []);

  // const getLogs = async () => {
  //   const response = await axios.get("http://localhost:8080/logs");
  //   setLogs(response.data);
  // };

  return (
    <>
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
              </tr>
            ))
            .splice(0, 10)}
        </tbody>
      </table>
    </>
  );
};

export default Logs;
