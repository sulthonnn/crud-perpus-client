import { request } from "./apiCall";
import { BASE_URL } from "./helper";

export const getMembersFunc = async () => {
  return await request("GET", `${BASE_URL}/members`);
};

export const getMemberByIdFunc = async (id) => {
  return await request("GET", `${BASE_URL}/member/${id}`);
};

export const getPaginatedMembersFunc = async (page, keyword) => {
  return await request(
    "GET",
    `${BASE_URL}/member?page=${page}&search=${keyword}`
  );
};

export const addMemberFunc = async (data) => {
  return await request("POST", `${BASE_URL}/member`, data);
};

export const updateMemberFunc = async (id, data) => {
  return await request("PATCH", `${BASE_URL}/member/${id}`, data);
};

export const deleteMemberFunc = async (id) => {
  return await request("DELETE", `${BASE_URL}/member/${id}`);
};
