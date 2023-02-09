import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import {
  deleteCirculationFunc,
  getPaginatedCirculationsFunc,
} from "../services/circulationApi.js";

import Layout from "../../Layout/layout.jsx";
import DeleteModal from "../DeleteModal";
import { addLogFunc } from "../services/logApi.js";

const Circulations = () => {
  const [circulations, setCirculations] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(0);
  const [pages, setPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [message, setMessage] = useState("");
  const [addToLog, setAddToLog] = useState("");

  useEffect(() => {
    getCirculations();
  }, [page, keyword]);

  const getCirculations = async () => {
    const response = await getPaginatedCirculationsFunc(page, keyword);
    setCirculations(response.data.circulations);
    setPage(response.data.page);
    setRows(response.data.totalRows);
    setPages(response.data.totalPages);
  };

  const addLog = async (data) => {
    await addLogFunc(data);
  };

  const handleAddLog = (
    title,
    author,
    memberId,
    memberName,
    loanDate,
    returnDate
  ) => {
    setAddToLog({
      book: {
        title,
        author,
      },
      member: { id: memberId, name: memberName },
      loanDate,
      returnDate,
    });
  };

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const deleteCirculation = async (id) => {
    await deleteCirculationFunc(id);
    setShowDelete(false);
    getCirculations();
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

  // console.log(addToLog);
  // console.log(deleteId);

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => addLog(addToLog) & deleteCirculation(deleteId)}
        />
      )}
      <Layout>
        <h1 className="title has-text-centered  mt-3 mb-0">Circulations</h1>
        <div className="column mb-0">
          <Link to={"/add-circulation"} className="button is-primary">
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
              <th>Book Name</th>
              <th>Author</th>
              <th>Member ID</th>
              <th>Member Name</th>
              <th>Loan Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {circulations.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>{c.book.title}</td>
                <td>{c.book.author}</td>
                <td>{c.member.id}</td>
                <td>{c.member.name}</td>
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
                        c.book.title,
                        c.book.author,
                        c.member.id,
                        c.member.name,
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

export default Circulations;
