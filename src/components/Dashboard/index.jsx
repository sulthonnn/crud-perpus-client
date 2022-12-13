import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/users");
    setUsers(response.data);
  };

  const getLogs = async () => {
    const response = await axios.get("http://localhost:8080/logs");
    setLogs(response.data);
  };

  const getCirculations = async () => {
    const response = await axios.get("http://localhost:8080/circulations");
    setCirculations(response.data);
  };

  const getMembers = async () => {
    const response = await axios.get("http://localhost:8080/members");
    setMembers(response.data);
  };

  const getBooks = async () => {
    const response = await axios.get(`http://localhost:8080/books`);
    setBooks(response.data);
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
              Books
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
              Members
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
              Circulations
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
              Logs
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
              Users
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
