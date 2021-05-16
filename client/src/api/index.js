import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// const url = "https://dody-memories-mern.herokuapp.com/posts";

API.interceptors.request.use((req) => {
  const getLocalStorage = JSON.parse(localStorage.getItem("userDataMemories"));

  if (getLocalStorage !== null && getLocalStorage.result) {
    req.headers.Authorization = `Bearer ${getLocalStorage.token}`;
  }

  return req;
});

//Posts API
export const fetchPosts = () => {
  return API.get("/posts");
};

export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/like-post`);
};

//User API
export const signIn = (formData) => {
  return API.post("/user/sign-in", formData);
};

export const signUp = (formData) => {
  return API.post("/user/sign-up", formData);
};
