import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { saveCirculation } from "../../features/circulationSlice.jsx";
import { getBooks, bookSelectors } from "../../features/bookSlice.jsx";
import { getMembers, memberSelectors } from "../../features/memberSlice.jsx";

const AddCirculation = () => {
  // const [books, setBooks] = useState([]);
  // const [members, setMembers] = useState([]);
  const [loanDate, setLoanDate] = useState(new Date().toLocaleString());
  const [queryBook, setQueryBook] = useState("");
  const [queryMember, setQueryMember] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const books = useSelector(bookSelectors.selectAll);
  const members = useSelector(memberSelectors.selectAll);

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getMembers());
  }, [dispatch]);

  const createCirculation = async (e) => {
    e.preventDefault();
    await dispatch(
      saveCirculation({ book: queryBook, member: queryMember, loanDate })
    );
    navigate("/circulations");
  };

  // useEffect(() => {
  //   getBooks();
  //   getMembers();
  // }, []);

  // const getMembers = async () => {
  //   const response = await axios.get("http://localhost:8080/members");
  //   setMembers(response.data);
  // };

  // const getBooks = async () => {
  //   const response = await axios.get("http://localhost:8080/books");
  //   setBooks(response.data);
  // };

  // const saveCirculation = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:8080/add-circulation", {
  //       book: queryBook,
  //       member: queryMember,
  //       loanDate,
  //     });
  //     navigate("/circulations");
  //   } catch (error) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     return error;
  //   }
  // };

  // // console.log(bookName);

  // //console.log(queryMember);

  return (
    <div className="container is-fluid">
      <h1 className="title">Circulations</h1>
      <h2 className="subtitle">Add Circulation</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={createCirculation}>
              <div className="field">
                <label className="label">Book Name</label>
                <div className="control">
                  <input
                    className="input"
                    list={books}
                    type="text"
                    value={queryBook}
                    onChange={(e) => setQueryBook(e.target.value)}
                    required={true}
                  />
                  <datalist id={books}>
                    {books
                      .filter((book) => {
                        return queryBook.toLowerCase() === ""
                          ? book
                          : book.name.toLowerCase().includes(queryBook);
                      })
                      .map((book) => (
                        <option key={book._id} value={book.name}>
                          {book.name}
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
                    list={members}
                    type="text"
                    value={queryMember}
                    onChange={(e) => setQueryMember(e.target.value)}
                    required={true}
                  />
                  <datalist id={members}>
                    {members
                      .filter((member) => {
                        return queryMember.toLowerCase() === ""
                          ? member
                          : member.name.toLowerCase().includes(queryMember);
                      })
                      .map((member) => (
                        <option key={member._id} value={member.name}>
                          {member.name}
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

export default AddCirculation;
