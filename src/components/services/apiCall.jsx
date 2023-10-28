import axios from "axios";

export const request = async (method, url, body) => {
  let config = {
    method,
    url,
    headers: {withCredentials: true},
    data: body,
  };

  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
