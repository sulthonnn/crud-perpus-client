import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBookById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/book/${id}`);
        setName(response.data.name);
        setCategory(response.data.category);
        setAuthor(response.data.author);
        setPublisher(response.data.publisher);
        setYear(response.data.year);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    getBookById();
  }, [id]);

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/book/${id}`, {
        name,
        category,
        author,
        publisher,
        year,
      });
      navigate("/books");
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Books</h1>
      <h2 className="subtitle">Update Book</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateBook}>
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
                    Update
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

export default UpdateBook;
