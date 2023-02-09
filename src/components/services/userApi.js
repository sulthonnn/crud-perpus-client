import { request } from "./apiCall";
import { BASE_URL } from "./helper";

export const getUsersFunc = async () => {
  return await request("GET", `${BASE_URL}/users`);
};

export const getUserByIdFunc = async (id) => {
  return await request("GET", `${BASE_URL}/user/${id}`);
};

export const getPaginatedUsersFunc = async (page, keyword) => {
  return await request(
    "GET",
    `${BASE_URL}/User?page=${page}&search=${keyword}`
  );
};

export const addUserFunc = async (data) => {
  return await request("POST", `${BASE_URL}/user`, data);
};

export const updateUserFunc = async (id, data) => {
  return await request("PATCH", `${BASE_URL}/user/${id}`, data);
};

export const deleteUserFunc = async (id) => {
  return await request("DELETE", `${BASE_URL}/user/${id}`);
};
