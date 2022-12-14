import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getBooks,
  bookSelectors,
  deleteBook,
} from "../../features/bookSlice.jsx";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import DeleteModal from "../DeleteModal";
import Footer from "../Footer";

const BookList = () => {
  //const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();

  const books = useSelector(bookSelectors.selectAll);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleDeleteBook = async (id) => {
    await dispatch(deleteBook(id));
    setShowDelete(false);
  };

  // const getBooks = async () => {
  //   const response = await axios.get(`http://localhost:8080/books`);
  //   setBooks(response.data);
  // };

  // const deleteBook = async (bookID) => {
  //   await axios.delete(`http://localhost:8080/delete-book/${bookID}`);
  //   setShowDelete(false);
  //   dispatch(getBooks());
  // };

  return (
    <>
      {showDelete && (
        <DeleteModal
          show={setShowDelete}
          onDelete={() => handleDeleteBook(deleteId)}
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
              <h1 className="title has-text-centered mt-3 mb-0">
                List of Books
              </h1>
              <div className="columns mb-0">
                <div className="column">
                  <Link to={"/add-book"} className="button is-primary">
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
              <p className="help mt-0">Total : {books.length}</p>

              <table className="table is-stripped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books
                    .filter((book) => {
                      return query.toLowerCase() === ""
                        ? book
                        : book.name.toLowerCase().includes(query) ||
                            book.category.toLowerCase().includes(query) ||
                            book.author.toLowerCase().includes(query) ||
                            book.publisher.toLowerCase().includes(query);
                    })
                    .map((book, index) => (
                      <tr key={book._id}>
                        <td>{index + 1}</td>
                        <td>{book.name}</td>
                        <td>{book.category}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.year}</td>
                        <td>
                          <Link
                            to={`/book/${book._id}`}
                            className="button is-small is-info"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleClickDelete(book._id)}
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
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookList;
