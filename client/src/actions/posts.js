import * as api from "../api";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
      dispatch({
        type: "FETCH_ALL",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createPost = (post, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({
        type: "CREATE",
        payload: data,
      });
      if (data) {
        callback();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updatePost = (id, post, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({
        type: "UPDATE",
        payload: data,
      });
      if (data) {
        callback();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deletePost = (id, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await api.deletePost(id);
      dispatch({
        type: "DELETE",
        payload: id,
      });
      if (data) {
        callback();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
