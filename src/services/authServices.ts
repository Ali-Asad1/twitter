import axios from "axios";

export const registerUser = async (data: any) => {
  return await axios.post("/api/register", data);
};

export const getCurrentUser = async () => {
  return await axios.get("/api/current");
};
