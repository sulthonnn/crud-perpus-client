import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMembersFunc } from "../services/memberApi";
import { getBooksFunc } from "../services/bookApi";
import { getCirculationsFunc } from "../services/circulationApi";
import { getLogsFunc } from "../services/logApi";
import { getUsersFunc } from "../services/userApi";

import {
  AiFillBook,
  AiOutlineUsergroupAdd,
  AiOutlineSync,
  AiOutlineUser,
} from "react-icons/ai";
import { GrCatalog } from "react-icons/gr";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [circulations, setCirculations] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getBooks();
    getMembers();
    getCirculations();
    getLogs();
    getUsers();
  }, []);

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

  const getCirculations = async () => {
    try {
      const response = await getCirculationsFunc();
      setCirculations(response.data.circulations);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getLogs = async () => {
    try {
      const response = await getLogsFunc();
      setLogs(response.data.logs);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUsers = async () => {
    try {
      const response = await getUsersFunc();
      setUsers(response.data.users);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div
        className="is-flex is-flex-wrap-wrap is-flex-direction-row is-justify-content-flex-start"
        style={{ gap: "15px 15px" }}
      >
        <div className="card column is-one-quarter has-background-danger">
          <div className="card-content">
            <p className="subtitle is-5 has-text-warning-light mb-0">
              {books.length}
            </p>
            <AiFillBook className={styles.logo} />
            <h2 className="content title is-5 has-text-centered has-text-warning-light">
              Book
            </h2>
          </div>
          <footer className="card-footer">
            <Link
              to={"/books"}
              className="column has-text-centered has-text-warning-light has-text-weight-bold"
            >
              ----- More info -----
            </Link>
          </footer>
        </div>
        <div className="card column is-3 has-background-info">
          <div className="card-content">
            <p className="subtitle is-5 has-text-warning-light mb-0">
              {members.length}
            </p>
            <AiOutlineUsergroupAdd className={styles.logo} />
            <h2 className="content title is-5 has-text-centered has-text-warning-light">
              Member
            </h2>
          </div>
          <footer className="card-footer">
            <Link
              to={"/members"}
              className="column has-text-centered has-text-warning-light has-text-weight-bold"
            >
              ----- More info -----
            </Link>
          </footer>
        </div>
        <div className="card column is-3 has-background-primary-dark">
          <div className="card-content">
            <p className="subtitle is-5 has-text-warning-light mb-0">
              {circulations.length}
            </p>
            <AiOutlineSync className={styles.logo} />
            <h2 className="content title is-5 has-text-centered has-text-warning-light">
              Circulation
            </h2>
          </div>
          <footer className="card-footer">
            <Link
              to={"/circulations"}
              className="column has-text-centered has-text-warning-light has-text-weight-bold"
            >
              ----- More info -----
            </Link>
          </footer>
        </div>
        <div className="card column is-3 has-background-primary">
          <div className="card-content">
            <p className="subtitle is-5 has-text-warning-light mb-0">
              {logs.length}
            </p>
            <GrCatalog className={styles.logo} style={{ opacity: 0.6 }} />
            <h2 className="content title is-5 has-text-centered has-text-warning-light">
              Log Data
            </h2>
          </div>
          <footer className="card-footer">
            <Link
              to={"/logs"}
              className="column has-text-centered has-text-warning-light has-text-weight-bold"
            >
              ----- More info -----
            </Link>
          </footer>
        </div>
        <div className="card column is-3 has-background-grey">
          <div className="card-content">
            <p className="subtitle is-5 has-text-warning-light mb-0">
              {users.length}
            </p>
            <AiOutlineUser className={styles.logo} />
            <h2 className="content title is-5 has-text-centered has-text-warning-light">
              User
            </h2>
          </div>
          <footer className="card-footer">
            <Link
              to={"/users"}
              className="column has-text-centered has-text-warning-light has-text-weight-bold"
            >
              ----- More info -----
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
