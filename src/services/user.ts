import axios from "axios";

export const getCurrentUser = async () => {
  return await axios.get("/api/current").then((res) => res.data);
};

export const getAllUsers = async () => {
  return await axios.get("/api/users").then((res) => res.data);
};

export const getUser = async (username: string) => {
  return await axios.get(`/api/users/${username}`).then((res) => res.data);
};

export const editUserProfile = async (avatar: string) => {
  return await axios.patch("/api/user/edit/avatar", { avatar }).then((res) => res.data);
};

export const editUserBanner = async (banner: string) => {
  return await axios.patch("/api/user/edit/banner", { banner }).then((res) => res.data);
};
