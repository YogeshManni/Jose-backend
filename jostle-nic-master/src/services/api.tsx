import axios from "axios";

const baseURL = "https://localhost:4000";

export const addEventToDb = (data: any) => {
  axios.post(`${baseURL}/event/addEvent`, data).then((res) => {
    return res;
  });
};
