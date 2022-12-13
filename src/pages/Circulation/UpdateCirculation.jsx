import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice.jsx";
import Layout from "../../Layout/layout.jsx";
import FormUpdateCirculation from "../../components/Circulation/UpdateCirculation.jsx";

const UpdateCirculation = () => {
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
      <FormUpdateCirculation />
    </Layout>
  );
};

export default UpdateCirculation;
