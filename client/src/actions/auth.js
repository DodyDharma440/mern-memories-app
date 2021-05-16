import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signUp = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({
        type: AUTH,
        data,
      });
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signIn = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      dispatch({
        type: AUTH,
        data,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};
