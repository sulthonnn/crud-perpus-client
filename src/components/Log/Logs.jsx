import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Layout from "../../Layout/layout.jsx";
import DeleteModal from "../DeleteModal";
import { deleteLogFunc, getPaginatedLogsFunc } from "../services/logApi.js";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getLogs();
  }, [page, keyword]);

  const getLogs = async () => {
    const response = await getPaginatedLogsFunc(page, keyword);
    setLogs(response.data.logs);
    setPage(response.data.page);
    setRows(response.data.totalRows);
    setPages(response.data.totalPages);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteLog = async (id) => {
    await deleteLog(id);
    setShowDelete(false);
    getLogs();
  };

  const deleteLog = async (id) => {
    try {
      await deleteLogFunc(id);
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
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Member ID</th>
              <th>Member Name</th>
              <th>Loan Date</th>
              <th>Return date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log._id}>
                <td>{index + 1}</td>
                <td>{log.book.title}</td>
                <td>{log.book.author}</td>
                <td>{log.member.id}</td>
                <td>{log.member.name}</td>
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

export default Logs;
