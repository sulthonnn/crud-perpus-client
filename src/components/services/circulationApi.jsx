import { request } from "./apiCall";
import { BASE_URL } from "./helper";

export const getCirculationsFunc = async () => {
  return await request("GET", `${BASE_URL}/circulations`);
};

export const getCirculationByIdFunc = async (id) => {
  return await request("GET", `${BASE_URL}/circulation/${id}`);
};

export const getPaginatedCirculationsFunc = async (page, keyword) => {
  return await request(
    "GET",
    `${BASE_URL}/circulation?page=${page}&search=${keyword}`
  );
};

export const addCirculationFunc = async (data) => {
  return await request("POST", `${BASE_URL}/circulation`, data);
};

export const updateCirculationFunc = async (id, data) => {
  return await request("PATCH", `${BASE_URL}/circulation/${id}`, data);
};

export const deleteCirculationFunc = async (id) => {
  return await request("DELETE", `${BASE_URL}/circulation/${id}`);
};
