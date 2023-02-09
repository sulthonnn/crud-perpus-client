import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getBooksFunc } from "../services/bookApi";

import {
  getCirculationByIdFunc,
  updateCirculationFunc,
} from "../services/circulationApi";
import { getMembersFunc } from "../services/memberApi";

const UpdateCirculation = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loanDate, setLoanDate] = useState(new Date().toLocaleString());
  const [queryBook, setQueryBook] = useState("");
  const [queryBookAuthor, setQueryBookAuthor] = useState("");
  const [queryMemberId, setQueryMemberId] = useState("");
  const [queryMember, setQueryMember] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const data = {
    book: {
      title: queryBook,
      author: queryBookAuthor,
    },
    member: { id: queryMemberId, name: queryMember },
    loanDate,
  };

  useEffect(() => {
    const getCircById = async () => {
      try {
        const response = await getCirculationByIdFunc(id);
        setQueryBook(response.data.book.title);
        setQueryBookAuthor(response.data.book.author);
        setQueryMemberId(response.data.member.id);
        setQueryMember(response.data.member.name);
        setLoanDate(response.data.loanDate);
        console.log(queryBook);
      } catch (error) {
        if (error) console.log(error);
      }
    };
    getCircById();
    getBooks();
    getMembers();
  }, [id]);

  const updateCirculation = async (e) => {
    e.preventDefault();
    try {
      await updateCirculationFunc(id, data);
      navigate("/circulations");
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const getMembers = async () => {
    try {
      const response = await getMembersFunc();
      setMembers(response.data.members);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getBooks = async () => {
    try {
      const response = await getBooksFunc();
      setBooks(response.data.books);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container is-fluid">
      <h1 className="title">Circulations</h1>
      <h2 className="subtitle">Update Circulation</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateCirculation}>
              <div className="field">
                <label className="label">Book Name</label>
                <div className="control">
                  <input
                    className="input"
                    list="books-name"
                    type="text"
                    value={queryBook}
                    onChange={(e) => setQueryBook(e.target.value)}
                    placeholder="Book Name"
                    required={true}
                  />
                  <datalist id="books-name">
                    {books.map((book) => (
                      <option key={book._id} value={book.name}>
                        {book.author}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="field">
                <label className="label">Author</label>
                <div className="control">
                  <input
                    className="input"
                    list="books-author"
                    type="text"
                    value={queryBookAuthor}
                    onChange={(e) => setQueryBookAuthor(e.target.value)}
                    placeholder="Author"
                    required={true}
                  />
                  <datalist id="books-author">
                    {books.map((book) => (
                      <option key={book._id} value={book.author}>
                        {book.name}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="field">
                <label className="label">ID Member</label>
                <div className="control">
                  <input
                    className="input"
                    list="members-id"
                    type="text"
                    value={queryMemberId}
                    onChange={(e) => setQueryMemberId(e.target.value)}
                    placeholder="ID Member"
                    required={true}
                  />
                  <datalist id="members-id">
                    {members.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="field">
                <label className="label">Member Name</label>
                <div className="control">
                  <input
                    className="input"
                    list="members-name"
                    type="text"
                    value={queryMember}
                    onChange={(e) => setQueryMember(e.target.value)}
                    placeholder="Member Name"
                    required={true}
                  />
                  <datalist id="members-name">
                    {members.map((member) => (
                      <option key={member._id} value={member.name}>
                        {member._id}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="field">
                <label className="label">Loan Date</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={loanDate}
                    onChange={(e) => setLoanDate(e.target.value)}
                    placeholder="Date"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                  <Link to={"/circulations"} className="button is-info ml-3">
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

export default UpdateCirculation;
