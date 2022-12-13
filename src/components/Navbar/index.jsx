import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser, reset } from "../../features/authSlice.jsx";

import bookIcon from "../../assets/book.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-background-success"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={bookIcon} alt="logo" width="50" height="20" />
            <p className="is-6 has-text-justified has-text-weight-bold has-text-warning-light ml-0">
              STULIB
            </p>
          </NavLink>

          <section
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </section>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <p className="has-text-centered has-text-weight-bold has-text-warning-light mr-5">
                Library Management System v1.0
              </p>
              <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
