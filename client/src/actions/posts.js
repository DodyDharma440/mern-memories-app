import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

export const getPosts = (page) => {
  return async (dispatch) => {
    dispatch({
      type: START_LOADING,
    });
    try {
      const { data } = await api.fetchPosts(page);
      console.log(data);
      dispatch({
        type: FETCH_ALL,
        payload: data,
      });
      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: END_LOADING,
      });
    }
  };
};

export const searchPosts = (seachQuery) => {
  return async (dispatch) => {
    dispatch({
      type: START_LOADING,
    });
    try {
      const { data } = await api.searchPosts(seachQuery);

      dispatch({
        type: FETCH_BY_SEARCH,
        payload: data.searchResult,
      });
      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: END_LOADING,
      });
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    dispatch({
      type: START_LOADING,
    });
    try {
      const { data } = await api.fetchPost(id);

      dispatch({
        type: FETCH_POST,
        payload: data,
      });
      dispatch({
        type: END_LOADING,
      });
    } catch (error) {
      console.log(error.response.data.message || error.message);
      dispatch({
        type: END_LOADING,
      });
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

export const likePost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
      dispatch({
        type: LIKE,
        payload: data,
      });
      // if (data) {
      //   callback();
      // }
    } catch (error) {
      console.log(error.message);
    }
  };
};
