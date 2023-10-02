import axios from "axios";

export const registerUser = async (data: any) => {
  return await axios.post("/api/register", data);
};
