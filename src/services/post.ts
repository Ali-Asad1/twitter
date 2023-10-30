import axios from "axios";

export const getAllPosts = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const addNewPost = async (body: string) => {
  return await axios.post(`/api/posts`, { body }).then((res) => res.data);
};
