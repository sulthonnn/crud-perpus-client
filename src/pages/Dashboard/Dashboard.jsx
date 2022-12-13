import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice.jsx";
import Layout from "../../Layout/layout.jsx";
import DashboardComponent from "../../components/Dashboard";

const Dashboard = () => {
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

  return (
    <Layout>
      <div>
        <h1 className="title mt-2">Dashboard</h1>
        <h2 className="subtitle is-6 mb-3">
          Welcome Back, <strong>{user && user.username}</strong>
        </h2>
        <DashboardComponent />
      </div>
    </Layout>
  );
};

export default Dashboard;
