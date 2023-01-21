import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const saveBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/book", {
        name,
        category,
        author,
        publisher,
        year,
      });
      navigate("/books");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Books</h1>
      <h2 className="subtitle">Add New Book</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBook}>
              <div className="field">
                <label className="label">Book Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Book Name"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Author</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Publisher</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Year</label>
                <div className="control">
                  <input
                    type="text"
                    pattern="\d*"
                    maxLength="4"
                    className="input"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="####"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                  <Link to={"/books"} className="button is-info ml-3">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
