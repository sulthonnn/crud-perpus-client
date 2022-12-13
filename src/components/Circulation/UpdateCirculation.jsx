import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCirculation,
  circulationSelectors,
} from "../../features/circulationSlice.jsx";
import { getBooks, bookSelectors } from "../../features/bookSlice.jsx";
import { getMembers, memberSelectors } from "../../features/memberSlice.jsx";

const UpdateCirculation = () => {
  // const [books, setBooks] = useState([]);
  // const [members, setMembers] = useState([]);
  const [loanDate, setLoanDate] = useState(new Date().toLocaleString());
  const [queryBook, setQueryBook] = useState("");
  const [queryMember, setQueryMember] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const books = useSelector(bookSelectors.selectAll);
  const members = useSelector(memberSelectors.selectAll);
  const circulation = useSelector((state) =>
    circulationSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getMembers());
  }, [dispatch]);

  useEffect(() => {
    if (circulation) {
      setQueryBook(circulation.book);
      setQueryMember(circulation.member);
      setLoanDate(circulation.loanDate);
    }
  }, [circulation]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(
      updateCirculation({ id, book: queryBook, member: queryMember, loanDate })
    );
    navigate("/circulations");
  };

  // useEffect(() => {
  //   getBooks();
  //   getMembers();
  // }, []);

  // useEffect(() => {
  //   const getCircById = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/circulation/${id}`
  //       );
  //       setQueryBook(response.data.book);
  //       setQueryMember(response.data.member);
  //       setLoanDate(response.data.loanDate);
  //     } catch (error) {
  //       if (error) console.log(error);
  //     }
  //   };
  //   getCircById();
  // }, [id]);

  // const getMembers = async () => {
  //   const response = await axios.get("http://localhost:8080/members");
  //   setMembers(response.data);
  // };

  // const getBooks = async () => {
  //   const response = await axios.get("http://localhost:8080/books");
  //   setBooks(response.data);
  // };

  // const updateCirculation = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.patch(`http://localhost:8080/circulation/${id}`, {
  //       book: queryBook,
  //       member: queryMember,
  //       loanDate,
  //     });
  //     navigate("/circulations");
  //   } catch (error) {
  //     if (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <div className="container is-fluid">
      <h1 className="title">Circulations</h1>
      <h2 className="subtitle">Update Circulation</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleUpdate}>
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

export default UpdateCirculation;
