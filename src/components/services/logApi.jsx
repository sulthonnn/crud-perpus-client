import { request } from "./apiCall";
import { BASE_URL } from "./helper";

export const getLogsFunc = async () => {
  return await request("GET", `${BASE_URL}/logs`);
};

export const getPaginatedLogsFunc = async (page, keyword) => {
  return await request("GET", `${BASE_URL}/Log?page=${page}&search=${keyword}`);
};

export const addLogFunc = async (data) => {
  return await request("POST", `${BASE_URL}/Log`, data);
};

export const deleteLogFunc = async (id) => {
  return await request("DELETE", `${BASE_URL}/Log/${id}`);
};
