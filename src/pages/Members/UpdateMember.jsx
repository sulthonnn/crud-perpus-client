import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice.jsx";
import Layout from "../../Layout/layout.jsx";
import FormUpdateMember from "../../components/Members/updateMember.jsx";

const UpdateMember = () => {
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
      <FormUpdateMember />
    </Layout>
  );
};

export default UpdateMember;
