import apiConfig from "./config/axios";

export const registerUser = (data: any) => {
  return apiConfig.post("/register", data);
};
