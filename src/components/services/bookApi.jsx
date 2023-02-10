import { request } from "./apiCall";
import { BASE_URL } from "./helper";

export const getBooksFunc = async () => {
  return await request("GET", `${BASE_URL}/books`);
};

export const getBookByIdFunc = async (id) => {
  return await request("GET", `${BASE_URL}/book/${id}`);
};

export const getPaginatedBooksFunc = async (page, keyword) => {
  return await request(
    "GET",
    `${BASE_URL}/book?page=${page}&search=${keyword}`
  );
};

export const addBookFunc = async (data) => {
  return await request("POST", `${BASE_URL}/book`, data);
};

export const updateBookFunc = async (id, data) => {
  return await request("PATCH", `${BASE_URL}/book/${id}`, data);
};

export const deleteBookFunc = async (id) => {
  return await request("DELETE", `${BASE_URL}/book/${id}`);
};
