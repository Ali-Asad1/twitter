import axios from "axios";

export const registerUser = async (data: any) => {
  return await axios.post("/api/register", data);
};

export const getCurrentUser = () => {
  return axios.get("/api/current").then((res) => res.data);
};
