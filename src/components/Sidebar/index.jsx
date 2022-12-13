import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LogoutUser, reset, getMe } from "../../features/authSlice.jsx";

import { IoBookSharp, IoPersonSharp, IoLogOutSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { FaSyncAlt } from "react-icons/fa";
import { GrCatalogOption } from "react-icons/gr";
import userIcon from "../../assets/user.svg";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const logout = () => {
    dispatch(LogoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow mt-0">
        <div className="columns pt-2 has-background-grey-lighter">
          <div className="column is-4">
            <img src={userIcon} alt="userIcon" width="55px" height="55px" />
          </div>
          <div className="column is-narrow">
            <p className="has-text-centered has-text-weight-bold">
              {user && user.username}
            </p>
            <p className="help subtitle is-6">Administrator</p>
          </div>
        </div>

        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <RiDashboardFill className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/books"}>
              <IoBookSharp className="mr-2" />
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to={"/members"}>
              <IoPersonSharp className="mr-2" />
              Members
            </NavLink>
          </li>
          <li>
            <NavLink to={"/circulations"}>
              <FaSyncAlt className="mr-2" />
              Circulations
            </NavLink>
          </li>
          <li>
            <NavLink to={"/logs"}>
              <GrCatalogOption className="mr-2" />
              Log Data
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Admin</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/users"}>
              <IoPersonSharp className="mr-2" />
              Users
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOutSharp className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
