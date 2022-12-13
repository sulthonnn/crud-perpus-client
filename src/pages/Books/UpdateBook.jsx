import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice.jsx";
import Layout from "../../Layout/layout.jsx";
import FormUpdateBook from "../../components/Books/UpdateBook.jsx";

const UpdateBook = () => {
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
      <FormUpdateBook />
    </Layout>
  );
};

export default UpdateBook;
