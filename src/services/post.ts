import axios from "axios";

export const getAllPosts = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};
