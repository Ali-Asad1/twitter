import axios from "axios";

export const getPost = async (postId: string) => {
  return await axios.get(`/api/posts/${postId}`).then((res) => res.data);
};

export const getAllPosts = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const addNewPost = async (body: string) => {
  return await axios.post(`/api/posts`, { body }).then((res) => res.data);
};

export const addComment = async (body: string, postId: string) => {
  return await axios.post(`/api/posts/comment?postId=${postId}`, { body }).then((res) => res.data);
};
