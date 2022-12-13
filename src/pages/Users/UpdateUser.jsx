import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice.jsx";
import Layout from "../../Layout/layout.jsx";
import FormUpdateUser from "../../components/Users/UpdateUser.jsx";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

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
      <FormUpdateUser />
    </Layout>
  );
};

export default UpdateUser;
