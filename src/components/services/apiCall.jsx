import axios from "axios";

export const request = async (method, url, body, header) => {
  let config = {
    method,
    url,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
        },
    data: body,
  };

  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
