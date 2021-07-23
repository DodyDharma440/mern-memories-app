import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
      dispatch({
        type: FETCH_ALL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchPosts = (seachQuery) => {
  return async (dispatch) => {
    try {
      const { data } = await api.searchPosts(seachQuery);

      dispatch({
        type: FETCH_BY_SEARCH,
        payload: data.searchResult,
      });
    } catch (error) {
      console.log(error.response.data.message || error.message);
    }
  };
};

export const createPost = (post, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({
        type: CREATE,
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
        type: UPDATE,
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
        type: DELETE,
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

export const likePost = (id, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({
        type: LIKE,
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
